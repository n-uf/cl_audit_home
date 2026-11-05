#!/usr/bin/env python3
"""Check the patch the scheduled publish job hands over, BEFORE it is applied.

.github/workflows/publish.yml runs in two jobs. `build` (no secret) flips due drafts with scripts/publish-due.mjs,
builds the site and uploads the flip as `git diff` output plus a page list. `push` (holds the write deploy key, runs
no node) downloads both and runs this script on them first. The patch comes from a job that ran third-party code
(npm install and build scripts), so it is treated as untrusted: it is accepted only if it is exactly what
publish-due.mjs writes, a `draft: true` -> `draft: false` change on pages that already exist, and nothing else.

Python 3 standard library only (no repo-installed tooling runs in the job that has the key).

    python3 -I scripts/check-publish-patch.py [--root <repo>] <patch-file> <pages-file>

  patch-file  `git diff --no-color` output of the flip
  pages-file  one `<section>/<slug>` per line (what publish-due.mjs prints), e.g. `blog/claude-usage-credits`
  --root      the checkout the patch will be applied to (default: the current directory)

Exit 0: the patch is acceptable (one line per page on stdout). Exit 1: refused, with the reason on stderr
(`check-publish-patch: refused: ...`). Exit 2: wrong usage or an unreadable input file.

The rules, all of which must hold:
  1. Every file in the patch is a plain modification (no new, deleted, renamed or copied file, no mode change, no
     binary patch) of an existing regular file src/content/blog/<slug>.md or src/content/use-cases/<slug>.md.
     Anything the parser does not know is refused.
  2. Each file has exactly one hunk, and the hunk removes exactly one line, a top-level `draft:` line whose value
     is true (true, True or TRUE, optional trailing comment), and adds exactly one line directly after it: the same
     line with the value written as `false`. Context lines (changed nothing) are fine. The hunk must match the existing
     file exactly once, with the removed line inside its front matter (not in the body).
  3. The page list matches the files in the patch exactly, each page once.
"""
import os
import re
import sys

SECTIONS = ("blog", "use-cases")
SLUG = r"[A-Za-z0-9][A-Za-z0-9_-]*"
PATH_RE = re.compile(r"^src/content/(%s)/(%s)\.md$" % ("|".join(SECTIONS), SLUG))
PAGE_RE = re.compile(r"^(%s)/(%s)$" % ("|".join(SECTIONS), SLUG))
INDEX_RE = re.compile(r"^index [0-9a-f]{7,64}\.\.[0-9a-f]{7,64} 100644$")
HUNK_RE = re.compile(r"^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@(?: .*)?$")
# the line publish-due.mjs flips: a top-level `draft:` key (optionally quoted), a true value, an optional comment
DRAFT_TRUE_RE = re.compile(r"""^(?P<key>(?P<q>["']?)draft(?P=q)[ \t]*:[ \t]+)(?P<value>true|True|TRUE)(?P<rest>(?:[ \t]+#.*)?[ \t]*\r?)$""")


class Refused(Exception):
    pass


def refuse(msg):
    raise Refused(msg)


def read_bytes(path):
    try:
        with open(path, "rb") as f:
            return f.read()
    except OSError as e:
        print("check-publish-patch: cannot read %s: %s" % (path, e.strerror), file=sys.stderr)
        sys.exit(2)


def split_lines(data):
    """Lines without their `\\n`, byte for byte (latin1), so a CRLF file keeps its `\\r`; no phantom last line."""
    text = data.decode("latin1")
    if text == "":
        return []
    lines = text.split("\n")
    if lines[-1] == "":
        lines.pop()
    return lines


def parse_pages(data):
    text = data.decode("utf-8", "replace")
    if "\0" in text:
        refuse("the page list contains a NUL byte")
    lines = text.split("\n")
    if lines and lines[-1] == "":
        lines.pop()
    pages = []
    for n, line in enumerate(lines, 1):
        if not PAGE_RE.match(line):
            refuse("page list line %d is not <section>/<slug> (blog or use-cases): %r" % (n, line[:80]))
        if line in pages:
            refuse("page list names %s twice" % line)
        pages.append(line)
    if not pages:
        refuse("the page list is empty")
    return pages


def load_page(root, rel):
    """(lines, close): the existing file's lines (byte for byte) and the index of the `---` that closes its front matter."""
    path = os.path.join(root, rel)
    if os.path.islink(path) or not os.path.isfile(path):
        refuse("%s is not an existing regular file in the checkout" % rel)
    real_root = os.path.realpath(root)
    if os.path.commonpath([real_root, os.path.realpath(path)]) != real_root:
        refuse("%s resolves outside the checkout" % rel)
    lines = split_lines(read_bytes(path))
    first = lines[0][3:] if lines and lines[0].startswith("\u00ef\u00bb\u00bf") else (lines[0] if lines else "")  # a UTF-8 BOM, read as latin1
    if not re.match(r"^---[ \t]*\r?$", first):
        refuse("%s has no front matter" % rel)
    for i in range(1, len(lines)):
        if re.match(r"^---[ \t]*\r?$", lines[i]):
            return lines, i
    refuse("%s has no closing --- of its front matter" % rel)


def in_front_matter(root, rel, old_side, at):
    """True if the hunk's old side (context and removed lines) is found exactly once in the existing file, and its
    line number `at` (an index into old_side) falls inside the front matter. Tolerates main having moved a few lines."""
    lines, close = load_page(root, rel)
    size = len(old_side)
    found = [p for p in range(len(lines) - size + 1) if lines[p:p + size] == old_side]
    return len(found) == 1 and 0 < found[0] + at < close


def parse_patch(data, root):
    if b"\0" in data:
        refuse("the patch contains a NUL byte (binary content)")
    lines = split_lines(data)
    if not lines:
        refuse("the patch is empty")
    files = []  # (relative path, removed line)
    i, n = 0, len(lines)
    while i < n:
        # --- the file header: exactly diff --git, index (mode 100644), ---, +++
        m = re.match(r"^diff --git a/(\S+) b/(\S+)$", lines[i])
        if not m:
            refuse("line %d is not a plain `diff --git a/<path> b/<path>` header: %r" % (i + 1, lines[i][:80]))
        a, b = m.group(1), m.group(2)
        if a != b:
            refuse("line %d: a rename or copy (%s -> %s)" % (i + 1, a, b))
        if not PATH_RE.match(a):
            refuse("line %d: %s is not src/content/blog/<slug>.md or src/content/use-cases/<slug>.md" % (i + 1, a))
        if a in [f[0] for f in files]:
            refuse("%s appears twice in the patch" % a)
        i += 1
        if i >= n or not INDEX_RE.match(lines[i]):
            refuse("%s: expected an `index <hash>..<hash> 100644` line (a new, deleted, binary or mode-changed file is refused), got %r"
                   % (a, lines[i][:80] if i < n else "end of patch"))
        i += 1
        if i >= n or lines[i] != "--- a/" + a:
            refuse("%s: expected `--- a/%s`" % (a, a))
        i += 1
        if i >= n or lines[i] != "+++ b/" + a:
            refuse("%s: expected `+++ b/%s`" % (a, a))
        i += 1

        # --- exactly one hunk
        if i >= n:
            refuse("%s: no hunk" % a)
        h = HUNK_RE.match(lines[i])
        if not h:
            refuse("%s: line %d is not a hunk header: %r" % (a, i + 1, lines[i][:80]))
        old_count = int(h.group(2)) if h.group(2) is not None else 1
        new_count = int(h.group(4)) if h.group(4) is not None else 1
        i += 1
        seen_old = seen_new = 0
        old_side, removed_at = [], -1  # the context and removed lines, and where the removed one is
        removed, added, tags = [], [], []  # `tags`: the first character of every hunk line, in order
        prev = ""
        while (seen_old < old_count or seen_new < new_count) and i < n:
            line = lines[i]
            if line.startswith("\\ "):  # `\ No newline at end of file`: only after a context line
                if prev != " " or not line.startswith("\\ No newline at end of file"):
                    refuse("%s: line %d: a no-newline marker is only accepted after a context line" % (a, i + 1))
                i += 1
                continue
            tag, body = line[:1], line[1:]
            if tag == " ":
                seen_old += 1
                seen_new += 1
                old_side.append(body)
            elif tag == "-":
                seen_old += 1
                removed.append(body)
                removed_at = len(old_side)
                old_side.append(body)
            elif tag == "+":
                seen_new += 1
                added.append(body)
            else:
                refuse("%s: line %d is not a hunk line: %r" % (a, i + 1, line[:80]))
            prev = tag
            tags.append(tag)
            i += 1
        if seen_old != old_count or seen_new != new_count:
            refuse("%s: the hunk is shorter than its header says" % a)
        if i < n and lines[i].startswith("\\ "):  # a marker after the last hunk line
            if prev != " " or not lines[i].startswith("\\ No newline at end of file"):
                refuse("%s: line %d: a no-newline marker is only accepted after a context line" % (a, i + 1))
            i += 1
        if i < n and not lines[i].startswith("diff --git "):
            refuse("%s: more than one hunk, or text after the hunk (line %d: %r); a page has one `draft:` line" % (a, i + 1, lines[i][:80]))

        # --- the change itself: one `draft: true` line becomes the same line with `false`
        if len(removed) != 1 or len(added) != 1:
            refuse("%s: the hunk must remove exactly one line and add exactly one (removes %d, adds %d)" % (a, len(removed), len(added)))
        if "-+" not in "".join(tags):
            refuse("%s: the added line must come directly after the removed `draft:` line" % a)
        d = DRAFT_TRUE_RE.match(removed[0])
        if not d:
            refuse("%s: the removed line is not a `draft: true` line: %r" % (a, removed[0][:80]))
        expected = d.group("key") + "false" + d.group("rest")
        if added[0] != expected:
            refuse("%s: the added line must be %r, got %r" % (a, expected[:80], added[0][:80]))
        if not in_front_matter(root, a, old_side, removed_at):
            refuse("%s: the hunk does not match the front matter of the file in the checkout (once, with the removed line before its closing ---)" % a)
        files.append((a, removed[0]))
    return [f[0] for f in files]


def main(argv):
    root = os.getcwd()
    args = argv[1:]
    if len(args) >= 2 and args[0] == "--root":
        root, args = args[1], args[2:]
    if len(args) != 2 or any(a.startswith("--") for a in args):
        print("usage: check-publish-patch.py [--root <repo>] <patch-file> <pages-file>", file=sys.stderr)
        return 2
    patch_path, pages_path = args
    patch, pages_raw = read_bytes(patch_path), read_bytes(pages_path)
    try:
        pages = parse_pages(pages_raw)
        files = parse_patch(patch, root)
        from_patch = sorted(re.sub(r"^src/content/", "", p)[:-3] for p in files)
        if from_patch != sorted(pages):
            refuse("the page list (%s) does not match the files in the patch (%s)" % (", ".join(sorted(pages)), ", ".join(from_patch)))
    except Refused as e:
        print("check-publish-patch: refused: %s" % e, file=sys.stderr)
        return 1
    for p in pages:
        print(p)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
