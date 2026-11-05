#!/usr/bin/env node
// Scheduled publishing: go live by flipping `draft: true` to `draft: false`.
//
// How it works: a finished page is merged to main with `draft: true` and its go-live date in `published`
// (YYYY-MM-DD, UTC). Production builds don't render drafts. This script, run daily at 00:10 UTC by
// .github/workflows/publish.yml, looks at every .md under src/content/blog and src/content/use-cases and, for each
// one whose front matter has `draft: true` and a `published` date on or before today (UTC), changes that one
// line to `draft: false` and nothing else in the file. It prints one slug (the file name without .md) per line.
// The workflow commits the change as `publish: <slug>[, <slug>]` and pushes to main; Vercel then deploys it.
// Exit code 0 whether or not anything is due.
//
//   node scripts/publish-due.mjs [--dry-run] [--today YYYY-MM-DD] [--root <dir>]
//     --dry-run  list the due slugs, change nothing
//     --today    the date to compare with (default: today in UTC); for tests
//     --root     the folder that holds src/content/... (default: the repo root)
//
// To undo a publish: revert the publish commit, or set `draft: true` again in the page's front matter (a page
// whose date has passed flips back on the next run, so also move `published` to a future date to hold it).
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIRS = ["src/content/blog", "src/content/use-cases"];

function parseArgs(argv) {
  const opts = { dryRun: false, today: new Date().toISOString().slice(0, 10), root: resolve(dirname(fileURLToPath(import.meta.url)), "..") };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--today") opts.today = argv[++i] ?? "";
    else if (a === "--root") opts.root = resolve(argv[++i] ?? "");
    else throw new Error(`unknown option ${a}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.today)) throw new Error(`--today must be YYYY-MM-DD, got "${opts.today}"`);
  return opts;
}

/** The new text of a file whose draft is due, or null if it isn't a due draft. Only the `true` of the `draft:` line changes. */
export function flip(text, today) {
  const fm = text.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!fm) return null;
  const front = fm[1];
  const base = fm[0].indexOf("\n") + 1; // where the front matter body starts in the file
  const draft = front.match(/^(draft:[ \t]*)true[ \t]*(?:#.*)?\r?$/m);
  const published = front.match(/^published:[ \t]*["']?(\d{4}-\d{2}-\d{2})["']?[ \t]*(?:#.*)?\r?$/m);
  if (!draft || !published || published[1] > today) return null;
  const at = base + draft.index + draft[1].length;
  return text.slice(0, at) + "false" + text.slice(at + "true".length);
}

function main() {
  const { dryRun, today, root } = parseArgs(process.argv.slice(2));
  const due = [];
  for (const dir of DIRS) {
    const full = join(root, dir);
    if (!existsSync(full)) continue;
    for (const name of readdirSync(full).filter((f) => f.endsWith(".md")).sort()) {
      const file = join(full, name);
      // latin1 keeps every byte as it is, so the rest of the file is written back unchanged
      const next = flip(readFileSync(file, "latin1"), today);
      if (next === null) continue;
      if (!dryRun) writeFileSync(file, next, "latin1");
      due.push(name.slice(0, -3));
    }
  }
  for (const slug of due) console.log(slug);
}

// run only as a script, so the tests can import flip()
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (e) { console.error(`publish-due: ${e.message}`); process.exit(2); }
}
