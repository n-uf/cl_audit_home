// Tests for scripts/publish-due.mjs on a copy of scripts/fixtures/publish (run: npm test).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const script = join(here, "publish-due.mjs");
const fixtures = join(here, "fixtures", "publish");
const TODAY = "2026-11-10";

const files = {
  past: "src/content/blog/past-draft.md",         // draft, dated before today: flips
  today: "src/content/blog/today-draft.md",       // draft, dated today: flips
  future: "src/content/blog/future-draft.md",     // draft, dated after today: stays
  live: "src/content/use-cases/live-page.md",     // draft: false: untouched
  noFlag: "src/content/use-cases/no-flag.md",     // no draft line: untouched
  crlf: "src/content/use-cases/crlf-draft.md",    // draft with CRLF line ends, due: flips
};

let root;
const read = (rel) => readFileSync(join(root, rel));
const original = (rel) => readFileSync(join(fixtures, rel));
const run = (...args) => execFileSync("node", [script, "--root", root, "--today", TODAY, ...args], { encoding: "utf8" });
/** the original bytes with only the first `draft: true` turned into `draft: false` */
const flipped = (rel) => Buffer.from(original(rel).toString("latin1").replace("draft: true", "draft: false"), "latin1");

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "publish-due-"));
  cpSync(fixtures, root, { recursive: true });
});

test("flips the past-dated and the today-dated drafts, and lists them", () => {
  const out = run();
  assert.deepEqual(out.split("\n").filter(Boolean), ["past-draft", "today-draft", "crlf-draft"]);
  assert.match(read(files.past).toString(), /^draft: false\r?$/m);
  assert.match(read(files.today).toString(), /^draft: false\r?$/m);
});

test("a future draft stays a draft", () => {
  run();
  assert.deepEqual(read(files.future), original(files.future));
});

test("a live page, with draft: false or with no draft line, is untouched", () => {
  run();
  assert.deepEqual(read(files.live), original(files.live));
  assert.deepEqual(read(files.noFlag), original(files.noFlag));
});

test("the only change in a flipped file is that one line (compared byte for byte)", () => {
  run();
  for (const key of ["past", "today", "crlf"]) {
    const before = original(files[key]);
    const after = read(files[key]);
    assert.notDeepEqual(after, before, key);
    assert.deepEqual(after, flipped(files[key]), key);
    assert.equal(after.length, before.length + 1, key); // "true" -> "false"
  }
  // the body's own "draft: true" line and the accent survive
  assert.match(read(files.past).toString(), /^draft: true$/m);
  assert.match(read(files.past).toString(), /café/);
});

test("--dry-run lists the due pages and changes nothing", () => {
  const out = run("--dry-run");
  assert.deepEqual(out.split("\n").filter(Boolean), ["past-draft", "today-draft", "crlf-draft"]);
  for (const rel of Object.values(files)) assert.deepEqual(read(rel), original(rel), rel);
});

test("a second run finds nothing due (exit 0, no output)", () => {
  run();
  assert.equal(run(), "");
});

test("with an earlier --today only the earlier drafts are due", () => {
  const out = execFileSync("node", [script, "--root", root, "--today", "2026-11-01", "--dry-run"], { encoding: "utf8" });
  assert.deepEqual(out.split("\n").filter(Boolean), ["past-draft"]);
});

test("an empty root exits 0 with no output", () => {
  const empty = mkdtempSync(join(tmpdir(), "publish-due-empty-"));
  assert.equal(execFileSync("node", [script, "--root", empty, "--today", TODAY], { encoding: "utf8" }), "");
});
