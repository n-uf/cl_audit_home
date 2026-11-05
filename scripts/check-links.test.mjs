// Tests for scripts/check-links.mjs on small dist folders built by the test (run: npm test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "check-links.mjs");

/** a dist with / and /a/ built, plus a page /links/ whose body is `anchors` */
function dist(anchors) {
  const d = mkdtempSync(join(tmpdir(), "check-links-"));
  const page = (path, body) => {
    mkdirSync(join(d, path), { recursive: true });
    writeFileSync(join(d, path, "index.html"), `<!doctype html><body>${body}</body>`);
  };
  page("", "");
  page("a", "");
  page("links", anchors);
  return d;
}
const check = (d) => spawnSync("node", [script, d], { encoding: "utf8" });
const a = (href) => `<a href="${href}">x</a>`;

test("absolute links to this site's own host that resolve pass, and count as internal", () => {
  const r = check(dist([
    "https://cl-audit.n-uf.com/", "https://cl-audit.n-uf.com/a/", "https://cl-audit.n-uf.com/a/#top",
    "https://cl-audit.n-uf.com", "https://cl-audit.n-uf.com?x=1", "http://cl-audit.n-uf.com/a", "//cl-audit.n-uf.com/a/",
  ].map(a).join("")));
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /ok \(3 pages, \d+ internal links\)/);
});

test("an absolute link to this site's own host with no built page fails, naming the page and the link", () => {
  const r = check(dist(a("https://cl-audit.n-uf.com/draft-page/")));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /\/links\/ -> \/draft-page\//);
});

test("links to other hosts are ignored, including look-alike hosts", () => {
  const r = check(dist([
    "https://example.com/nope/", "https://cl-audit.n-uf.com.evil.example/nope/", "https://notcl-audit.n-uf.com/nope/",
    "https://docs.cl-audit.n-uf.com/nope/", "//example.com/nope/", "mailto:a@b.c",
  ].map(a).join("")));
  assert.equal(r.status, 0, r.stderr);
});

test("relative-to-root links still work: a built one passes, a missing one fails", () => {
  assert.equal(check(dist(a("/a/") + a("/a"))).status, 0);
  const r = check(dist(a("/missing/")));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /\/links\/ -> \/missing\//);
});
