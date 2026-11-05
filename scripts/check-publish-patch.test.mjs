// Tests for scripts/check-publish-patch.py, the check the `push` job of publish.yml runs on the flip patch before
// applying it (run: npm test). The checker is spawned as the workflow runs it: `python3 -I`, on a patch file, a page
// list and the checkout (here scripts/fixtures/publish-patch/root, the pages as they were before the flip).
//
// The *.patch fixtures are real: made by running scripts/publish-due.mjs on a copy of root and `git diff --no-color`
// (the tamper-* ones are the same with one hand edit). The last tests do that round trip live, CRLF included.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync, execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const checker = join(here, "check-publish-patch.py");
const publishDue = join(here, "publish-due.mjs");
const fx = join(here, "fixtures", "publish-patch");
const root = join(fx, "root");
const TODAY = "2026-11-10"; // the day the checker compares `published` with; the workflow never passes --today
const GIT_DIFF = ["diff", "--no-color", "--no-ext-diff", "--no-renames", "--src-prefix=a/", "--dst-prefix=b/"];

const tmp = (prefix) => mkdtempSync(join(tmpdir(), prefix));
/** Runs the checker; returns { status, stdout, stderr }. */
function check(patchPath, pagesPath, checkout = root, today = TODAY) {
  const r = spawnSync("python3", ["-I", checker, "--root", checkout, "--today", today, patchPath, pagesPath], { encoding: "utf8" });
  assert.equal(r.error, undefined, "python3 must be available");
  return r;
}
const fixture = (name) => check(join(fx, `${name}.patch`), join(fx, `${name}.pages`));
/** Writes a patch and a page list to a temp dir, runs the checker on them. */
function checkText(patch, pages, checkout = root) {
  const dir = tmp("check-patch-");
  writeFileSync(join(dir, "p.patch"), patch, "latin1");
  writeFileSync(join(dir, "p.pages"), pages);
  return check(join(dir, "p.patch"), join(dir, "p.pages"), checkout);
}
const accepted = (r) => { assert.equal(r.status, 0, r.stderr); assert.equal(r.stderr, ""); };
const refused = (r, re) => { assert.equal(r.status, 1, `expected a refusal, got ${r.status}: ${r.stdout}${r.stderr}`); assert.match(r.stderr, /^check-publish-patch: refused: /); assert.match(r.stderr, re); assert.equal(r.stdout, ""); };
const single = () => readFileSync(join(fx, "single.patch"), "latin1");

// ---- accepted
test("a valid single-file flip is accepted, and the commit message is the one line printed", () => {
  const r = fixture("single");
  accepted(r);
  assert.equal(r.stdout, "publish: blog/alpha\n");
});

test("a valid two-file flip is accepted", () => {
  const r = fixture("two");
  accepted(r);
  assert.equal(r.stdout, "publish: blog/alpha, blog/beta\n");
});

test("a flip across both sections is accepted", () => {
  accepted(fixture("three"));
});

test("`draft: True   # comment` flipped to `draft: false   # comment` is accepted", () => {
  accepted(fixture("comment"));
});

test("the page list may name the pages in another order", () => {
  accepted(checkText(readFileSync(join(fx, "two.patch"), "latin1"), "blog/beta\nblog/alpha\n"));
});

// ---- refused
test("a hunk that also changes another line is refused", () => {
  refused(fixture("tamper-extra-line"), /remove exactly one line and add exactly one \(removes 2, adds 2\)/);
});

test("a separate second hunk is refused", () => {
  const second = ["@@ -9,3 +9,3 @@", " ---", " ", "-Body of alpha.", "+Body of evil.", ""].join("\n");
  refused(checkText(single() + second, "blog/alpha\n"), /more than one hunk/);
});

test("`draft: false` -> `draft: true` is refused", () => {
  refused(fixture("tamper-false-to-true"), /not a `draft: true` line/);
});

test("a new file is refused", () => {
  refused(fixture("tamper-new-file"), /expected an `index <hash>\.\.<hash> 100644` line/);
});

test("a file outside src/content, next to a valid flip, is refused", () => {
  refused(fixture("tamper-outside-content"), /\.github\/workflows\/ci\.yml is not src\/content\/blog\/<slug>\.md or src\/content\/use-cases/);
});

test("a page list that does not match the patch is refused", () => {
  refused(check(join(fx, "single.patch"), join(fx, "mismatch.pages")), /does not match the files in the patch/);
});

test("a page list that names a page twice, an empty one and a malformed one are refused", () => {
  refused(checkText(single(), "blog/alpha\nblog/alpha\n"), /twice/);
  refused(checkText(single(), ""), /page list is empty/);
  refused(checkText(single(), "blog/alpha\n\n"), /page list line 2/);
  refused(checkText(single(), "src/content/blog/alpha.md\n"), /page list line 1/);
});

test("an empty patch is refused", () => {
  refused(checkText("", "blog/alpha\n"), /patch is empty/);
});

test("deleted, renamed and mode-changed files, and a binary patch, are refused", () => {
  const head = "diff --git a/src/content/blog/alpha.md b/src/content/blog/alpha.md\n";
  refused(checkText(head + "deleted file mode 100644\nindex 64dcc87..0000000\n--- a/src/content/blog/alpha.md\n+++ /dev/null\n", "blog/alpha\n"), /expected an `index/);
  refused(checkText("diff --git a/src/content/blog/alpha.md b/src/content/blog/gamma.md\nsimilarity index 90%\nrename from src/content/blog/alpha.md\nrename to src/content/blog/gamma.md\n", "blog/alpha\n"), /rename or copy/);
  refused(checkText(head + "old mode 100644\nnew mode 100755\n", "blog/alpha\n"), /expected an `index/);
  refused(checkText(single().replace(/(index \w+\.\.\w+) 100644/, "$1 100755"), "blog/alpha\n"), /expected an `index/);
  refused(checkText(head + "index 64dcc87..3f9f4b2 100644\nBinary files a/src/content/blog/alpha.md and b/src/content/blog/alpha.md differ\n", "blog/alpha\n"), /expected `--- a\//);
  refused(checkText(head + "index 64dcc87..3f9f4b2 100644\nGIT binary patch\nliteral 0\n", "blog/alpha\n"), /expected `--- a\//);
});

test("a flip that changes the comment, or does not write `false`, is refused", () => {
  const comment = readFileSync(join(fx, "comment.patch"), "latin1");
  refused(checkText(comment.replace("+draft: false   # scheduled by hand", "+draft: false   # evil"), "blog/beta\n"), /the added line must be/);
  refused(checkText(single().replace("+draft: false", "+draft: false  "), "blog/alpha\n"), /the added line must be/);
  refused(checkText(single().replace("+draft: false", "+draft: no"), "blog/alpha\n"), /the added line must be/);
  refused(checkText(single().replace("+draft: false", "+draft: false\n+evil: 1").replace("@@ -2,7 +2,7 @@", "@@ -2,7 +2,8 @@"), "blog/alpha\n"), /remove exactly one line and add exactly one \(removes 1, adds 2\)/);
  // the order of the pair: added before removed
  refused(checkText(single().replace("-draft: true\n+draft: false\n", "+draft: false\n-draft: true\n"), "blog/alpha\n"), /directly after the removed/);
});

test("a removed line that is not in the checkout's front matter, or a file the checkout lacks, is refused", () => {
  const missing = single().replaceAll("src/content/blog/alpha.md", "src/content/blog/gone.md");
  refused(checkText(missing, "blog/gone\n"), /not an existing regular file/);
  const indented = single().replace("-draft: true", "- draft: true").replace("+draft: false", "+ draft: false");
  refused(checkText(indented, "blog/alpha\n"), /not a `draft: true` line/);
  const absent = single().replace("-draft: true", "-draft: true # other").replace("+draft: false", "+draft: false # other");
  refused(checkText(absent, "blog/alpha\n"), /the hunk does not match the file in the checkout at line 2/);
});

test("a flip of the `draft: true` line in the body, not the front matter, is refused", () => {
  const body = ["diff --git a/src/content/blog/alpha.md b/src/content/blog/alpha.md", "index 64dcc87..3f9f4b2 100644", "--- a/src/content/blog/alpha.md", "+++ b/src/content/blog/alpha.md",
    "@@ -11,5 +11,5 @@", " Body of alpha. A line that says draft: true in the body must stay.", " ", "-draft: true", "+draft: false", " ", " More text.", ""].join("\n");
  refused(checkText(body.replace("@@ -11,5 +11,5 @@", "@@ -11,5 +11,5 @@"), "blog/alpha\n"), /the changed line \(13\) is outside the front matter \(lines 2-8\)/);
});

test("a hunk that is not where its header says (main moved, or a forged header) is refused", () => {
  refused(checkText(single().replace("@@ -2,7 +2,7 @@", "@@ -9,7 +9,7 @@"), "blog/alpha\n"), /the hunk does not match the file in the checkout at line 9/);
});

test("a patch of 64 KB or more is refused, one just under it is read", () => {
  refused(checkText(single() + " ".repeat(65536), "blog/alpha\n"), /too large to be a flip/);
  refused(checkText(single() + "\n".repeat(60000), "blog/alpha\n"), /more than one hunk, or text after the hunk|not a hunk line/); // under the cap: refused by the grammar instead
});

test("a page that is not due yet is refused, one due today is accepted", () => {
  // alpha is published 2026-11-01
  refused(check(join(fx, "single.patch"), join(fx, "single.pages"), root, "2026-10-31"), /src\/content\/blog\/alpha\.md isn't due: published 2026-11-01 is after today, 2026-10-31 \(UTC\)/);
  accepted(check(join(fx, "single.patch"), join(fx, "single.pages"), root, "2026-11-01"));
});

test("a file that is a symlink in the checkout is refused", () => {
  const dir = tmp("check-patch-link-");
  mkdirSync(join(dir, "src/content/blog"), { recursive: true });
  writeFileSync(join(dir, "target.md"), readFileSync(join(root, "src/content/blog/alpha.md")));
  symlinkSync(join(dir, "target.md"), join(dir, "src/content/blog/alpha.md"));
  refused(checkText(single(), "blog/alpha\n", dir), /not an existing regular file/);
});

test("text outside the grammar (leading junk, a stray line after a hunk) is refused", () => {
  refused(checkText("From: evil\n" + single(), "blog/alpha\n"), /not a plain `diff --git/);
  refused(checkText(single() + "+echo hi\n", "blog/alpha\n"), /more than one hunk, or text after the hunk/);
  refused(checkText(single().replace(" author: n-uf\n", " author: n-uf\n\\ weird marker\n"), "blog/alpha\n"), /no-newline marker/);
});

test("a patch with a NUL byte is refused", () => {
  refused(checkText(single() + "\0", "blog/alpha\n"), /NUL/);
});

test("usage errors exit 2", () => {
  assert.equal(spawnSync("python3", ["-I", checker], { encoding: "utf8" }).status, 2);
  assert.equal(spawnSync("python3", ["-I", checker, join(fx, "nope.patch"), join(fx, "single.pages")], { encoding: "utf8" }).status, 2);
});

// ---- the real round trip: publish-due on a copy, git diff, then the checker, as the two jobs do
/** A git repo with the fixture root committed; returns its path. */
function repoCopy() {
  const dir = tmp("check-patch-repo-");
  cpSync(root, dir, { recursive: true });
  const git = (...a) => execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...a], { cwd: dir, encoding: "utf8" });
  git("init", "-q", ".");
  git("add", "-A");
  git("commit", "-qm", "base");
  return { dir, git };
}

test("round trip: what publish-due writes and git diff shows is accepted (all three due pages)", () => {
  const { dir, git } = repoCopy();
  const pages = execFileSync("node", [publishDue, "--root", dir, "--today", "2026-11-03"], { encoding: "utf8" });
  const out = tmp("check-patch-out-");
  const patchPath = join(out, "p.patch"), pagesPath = join(out, "p.pages");
  writeFileSync(patchPath, git(...GIT_DIFF));
  writeFileSync(pagesPath, pages);
  // the checker reads the checkout as it was before the flip: a second copy
  const before = tmp("check-patch-before-");
  cpSync(root, before, { recursive: true });
  const r = check(patchPath, pagesPath, before);
  accepted(r);
  assert.equal(r.stdout, "publish: " + pages.trim().split("\n").join(", ") + "\n");
  // and git itself agrees the patch applies to the untouched checkout
  execFileSync("git", ["apply", "--check", patchPath], { cwd: before });
  // a git work tree is read at HEAD, not as it is on disk: `dir` is flipped on disk, its HEAD is not
  accepted(check(patchPath, pagesPath, dir));
});

test("round trip: a CRLF page and a page with a byte-order mark are accepted", () => {
  const { dir, git } = repoCopy();
  const crlf = "---\r\ntitle: \"Crlf\"\r\npublished: 2026-11-01\r\nupdated: 2026-11-01\r\ndraft: true\r\nauthor: n-uf\r\n---\r\n\r\nBody café.\r\n";
  const bom = "﻿---\ntitle: \"Bom\"\npublished: 2026-11-01\nupdated: 2026-11-01\ndraft: TRUE # held\nauthor: n-uf\n---\n\nBody.\n";
  writeFileSync(join(dir, "src/content/use-cases/crlf.md"), crlf, "latin1");
  writeFileSync(join(dir, "src/content/blog/bom.md"), bom, "utf8");
  git("add", "-A");
  git("commit", "-qm", "more");
  const before = tmp("check-patch-before-");
  cpSync(dir, before, { recursive: true });
  rmSync(join(before, ".git"), { recursive: true });
  const pages = execFileSync("node", [publishDue, "--root", dir, "--today", "2026-11-01"], { encoding: "utf8" });
  assert.match(pages, /use-cases\/crlf/);
  assert.match(pages, /blog\/bom/);
  const out = tmp("check-patch-out-");
  writeFileSync(join(out, "p.patch"), git(...GIT_DIFF), "latin1");
  writeFileSync(join(out, "p.pages"), pages);
  accepted(check(join(out, "p.patch"), join(out, "p.pages"), before));
});

// ---- the same cases as debugsy's guard tests (n-uf/debugsy, apps/web/scripts/check-flip-patch.test.mjs), on a git
// repo made per test: the pages are read at its HEAD, the patch is `git diff` of the edit, and `today` is passed in
const page = (draft, extra = "", body = "") =>
  `---\ntitle: "A page"\npublished: 2026-11-09\nupdated: 2026-11-09\ndraft: ${draft}\nauthor: n-uf\n---\n\nBody text.${extra}\n${body}`;
const SAMPLE = "\n```yaml\ndraft: true\n```\n";
const DUE_DAY = "2026-11-09";
const A = "src/content/blog/a-post.md", B = "src/content/use-cases/b-case.md", LIVE = "src/content/blog/live-post.md";

/** A git repo with a due blog draft, a due use-case draft, a live page with a `draft: true` code sample, and a non-content file. */
function scratch() {
  const dir = tmp("check-patch-git-");
  const git = (...a) => execFileSync("git", ["-c", "core.hooksPath=/dev/null", "-c", "user.name=t", "-c", "user.email=t@t", ...a], { cwd: dir, encoding: "utf8" });
  const write = (rel, text) => { mkdirSync(dirname(join(dir, rel)), { recursive: true }); writeFileSync(join(dir, rel), text); };
  git("init", "-q", "-b", "main");
  write(A, page("true"));
  write(B, page("true"));
  write(LIVE, page("false", "", SAMPLE));
  write("src/pages/index.astro", "---\n---\n<h1>x</h1>\n");
  git("add", ".");
  git("commit", "-qm", "fixture");
  return { dir, git, write };
}
/** Makes the edits, saves them as the build job does (git diff), restores the tree, and returns the patch path. */
function makePatch({ dir, git }, edit) {
  edit();
  const patch = join(tmp("check-patch-p-"), "flip.patch");
  git("add", "-N", ".");
  writeFileSync(patch, git(...GIT_DIFF));
  git("reset", "-q", "--hard");
  git("clean", "-q", "-fd");
  return patch;
}
const pagesFile = (text) => { const f = join(tmp("check-patch-pg-"), "pages.txt"); writeFileSync(f, text); return f; };
const flip = (edit, pages, today = DUE_DAY) => { const s = scratch(); return check(makePatch(s, () => edit(s.write)), pagesFile(pages), s.dir, today); };

test("[debugsy] accepts a draft flip and prints the commit message", () => {
  const r = flip((w) => w(A, page("false")), "blog/a-post\n");
  accepted(r);
  assert.equal(r.stdout, "publish: blog/a-post\n");
});

test("[debugsy] accepts flips in two sections, in path order", () => {
  const r = flip((w) => { w(A, page("false")); w(B, page("false")); }, "use-cases/b-case\nblog/a-post\n");
  accepted(r);
  assert.equal(r.stdout, "publish: blog/a-post, use-cases/b-case\n");
});

test("[debugsy] refuses a flip that also changes the body (a non-draft hunk)", () => {
  refused(flip((w) => w(A, page("false", " Injected.")), "blog/a-post\n"), /remove exactly one line and add exactly one/);
});

test("[debugsy] refuses a change to a line that isn't the draft line", () => {
  refused(flip((w) => w(A, page("true").replace("author: n-uf", "author: evil")), "blog/a-post\n"), /not a `draft: true` line/);
});

test("[debugsy] refuses turning a live page back into a draft", () => {
  refused(flip((w) => w(LIVE, page("true", "", SAMPLE)), "blog/live-post\n"), /not a `draft: true` line/);
});

test("[debugsy] refuses a page that isn't due yet", () => {
  refused(flip((w) => w(A, page("false")), "blog/a-post\n", "2026-11-08"), /isn't due: published 2026-11-09 is after today, 2026-11-08/);
});

test("[debugsy] refuses flipping a `draft: true` line in the body (a code sample), not the front matter", () => {
  refused(flip((w) => w(LIVE, page("false", "", SAMPLE.replace("draft: true", "draft: false"))), "blog/live-post\n"), /outside the front matter/);
});

test("[debugsy] refuses a change outside the content pages", () => {
  refused(flip((w) => { w(A, page("false")); w("src/pages/index.astro", "---\n---\n<h1>y</h1>\n"); }, "blog/a-post\n"), /src\/pages\/index\.astro is not src\/content\/blog/);
});

test("[debugsy] refuses a new file, even one that looks like a flip", () => {
  refused(flip((w) => w("src/content/blog/new-post.md", page("false")), "blog/new-post\n"), /expected an `index <hash>\.\.<hash> 100644` line/);
});

test("[debugsy] refuses pages other than the ones the build reported", () => {
  refused(flip((w) => w(A, page("false")), "use-cases/b-case\n"), /does not match the files in the patch/);
});

test("[debugsy] accepts a flip on a page larger than 100 KB (the patch is only the hunk)", () => {
  const s = scratch();
  const long = `\n${"A long paragraph of text that makes the page big. ".repeat(3000)}\n`;
  s.write(A, page("true", "", long));
  s.git("commit", "-qam", "long page");
  const r = check(makePatch(s, () => s.write(A, page("false", "", long))), pagesFile("blog/a-post\n"), s.dir, DUE_DAY);
  assert.ok(readFileSync(join(s.dir, A)).length > 100_000);
  accepted(r);
  assert.equal(r.stdout, "publish: blog/a-post\n");
});

test("[debugsy] accepts a quoted published day and refuses a flip with no published day", () => {
  const s = scratch();
  s.write(A, page("true").replace("published: 2026-11-09", 'published: "2026-11-09"'));
  s.write(B, page("true").replace("published: 2026-11-09\n", ""));
  s.git("commit", "-qam", "quoted and missing dates");
  const ok = check(makePatch(s, () => s.write(A, page("false").replace("published: 2026-11-09", 'published: "2026-11-09"'))), pagesFile("blog/a-post\n"), s.dir, DUE_DAY);
  accepted(ok);
  const bad = check(makePatch(s, () => s.write(B, page("false").replace("published: 2026-11-09\n", ""))), pagesFile("use-cases/b-case\n"), s.dir, DUE_DAY);
  refused(bad, /has no published day/);
});

test("[debugsy] refuses an empty patch", () => {
  const s = scratch();
  refused(check(makePatch(s, () => {}), pagesFile("blog/a-post\n"), s.dir, DUE_DAY), /patch is empty/);
});

// ---- more guard cases of the same kind
test("a published timestamp counts by its UTC day", () => {
  const s = scratch();
  const stamped = (draft) => page(draft).replace("published: 2026-11-09", "published: 2026-11-09T23:30:00-05:00"); // = 2026-11-10 04:30 UTC
  s.write(A, stamped("true"));
  s.git("commit", "-qam", "timestamp");
  const patch = makePatch(s, () => s.write(A, stamped("false")));
  refused(check(patch, pagesFile("blog/a-post\n"), s.dir, "2026-11-09"), /isn't due: published 2026-11-10 is after today, 2026-11-09/);
  accepted(check(patch, pagesFile("blog/a-post\n"), s.dir, "2026-11-10"));
});

test("an unreadable published day is refused", () => {
  const s = scratch();
  s.write(A, page("true").replace("published: 2026-11-09", "published: soon"));
  s.git("commit", "-qam", "bad date");
  refused(check(makePatch(s, () => s.write(A, page("false").replace("published: 2026-11-09", "published: soon"))), pagesFile("blog/a-post\n"), s.dir, DUE_DAY), /can't read its published day/);
});

test("the page is judged at HEAD, not by what is on disk", () => {
  const s = scratch();
  const future = (draft) => page(draft).replace("published: 2026-11-09", "published: 2026-12-01");
  s.write(A, future("true"));
  s.git("commit", "-qam", "future page");
  const patch = makePatch(s, () => s.write(A, future("false")));
  s.write(A, page("true")); // a due date on disk, not committed
  refused(check(patch, pagesFile("blog/a-post\n"), s.dir, DUE_DAY), /isn't due: published 2026-12-01/);
});

test("a flip of a file that is not a regular file at HEAD (a symlink) is refused", () => {
  const s = scratch();
  rmSync(join(s.dir, A));
  symlinkSync(join(s.dir, B), join(s.dir, A));
  s.git("add", "-A");
  s.git("commit", "-qm", "a symlink");
  const patch = join(tmp("check-patch-p-"), "flip.patch");
  writeFileSync(patch, readFileSync(join(fx, "single.patch"), "latin1").replaceAll("alpha", "a-post"), "latin1");
  refused(check(patch, pagesFile("blog/a-post\n"), s.dir, DUE_DAY), /not an existing regular file in HEAD/);
});
