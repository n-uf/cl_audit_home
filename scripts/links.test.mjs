// Tests for the external-link rule (src/data/links.mjs, src/data/external-links-plugin.mjs, ExtLink.astro; run: npm test).
// The rule (operator, 2026-11-11): a link to another host opens in a new tab with rel="noopener" and a screen-reader
// note; internal links and links to this site stay in the tab; the visible text is not changed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { markdownToHtml } from "satteri";
import { externalCheck, newTabNote, relWith } from "../src/data/links.mjs";
import externalLinksPlugin from "../src/data/external-links-plugin.mjs";

const isExternal = externalCheck("https://cl-audit.n-uf.com");

test("another host is external; this site, relative links, anchors and mail are not", () => {
  for (const href of ["https://n-uf.com", "https://github.com/n-uf/cl_audit/releases/latest/download/cl_audit.dmg", "http://example.com", "https://code.claude.com/docs/en/setup", "https://www.cl-audit.n-uf.com/"]) assert.equal(isExternal(href), true, href);
  for (const href of ["/faq/", "install/", "#a", "https://cl-audit.n-uf.com/faq/", "mailto:a@b.c", "tel:123"]) assert.equal(isExternal(href), false, href);
});

test("relWith adds noopener and keeps the rel it finds, as a string or a list", () => {
  assert.deepEqual(relWith(undefined), ["noopener"]);
  assert.deepEqual(relWith("nofollow"), ["nofollow", "noopener"]);
  assert.deepEqual(relWith(["nofollow", "ugc"]), ["nofollow", "ugc", "noopener"]);
  assert.deepEqual(relWith("noopener nofollow"), ["noopener", "nofollow"]);
});

const render = (md) => markdownToHtml(md, { hastPlugins: [externalLinksPlugin({ isExternal, note: newTabNote, relWith })] }).html;
const sr = `<span class="sr-only">${newTabNote}</span>`;

test("an external link in markdown opens in a new tab with rel noopener and a screen-reader note", () => {
  const html = render("See [n-uf](https://n-uf.com) and [the dmg](https://github.com/n-uf/cl_audit/releases/latest/download/cl_audit.dmg).");
  assert.ok(html.includes(`<a href="https://n-uf.com" target="_blank" rel="noopener">n-uf${sr}</a>`), html);
  assert.match(html, /<a href="https:\/\/github.com\/n-uf\/cl_audit\/releases\/latest\/download\/cl_audit.dmg" target="_blank" rel="noopener">the dmg/);
});

test("an internal link and a link to this site are left alone", () => {
  const html = render("[faq](/faq/) [same](https://cl-audit.n-uf.com/install/) [anchor](#top)");
  assert.doesNotMatch(html, /target=/);
  assert.doesNotMatch(html, /sr-only/);
});

test("in a heading the link opens in a new tab but gets no note", () => {
  const html = render("## About [n-uf](https://n-uf.com)");
  assert.match(html, /<a href="https:\/\/n-uf.com" target="_blank" rel="noopener">n-uf<\/a>/);
  assert.doesNotMatch(html, /sr-only/);
});

const astroFiles = [];
const walk = (dir) => { for (const name of readdirSync(dir)) { const p = join(dir, name); if (statSync(p).isDirectory()) walk(p); else if (p.endsWith(".astro")) astroFiles.push(p); } };
walk("src");

test("every link to the repo, the download or another host in the templates goes through ExtLink", () => {
  const hand = /<a\b[^>]*\bhref=(\{(download|downloadZip|repo|changelog|`\$\{repo\})|"https?:)/g;
  const found = astroFiles.flatMap((f) => [...readFileSync(f, "utf8").matchAll(hand)].map((m) => `${f}: ${m[0]}`));
  assert.deepEqual(found, [], "use <ExtLink> for these");
});

// The screen-reader note of an ExtLink is a .sr-only span inside the link: no display:none rule may reach it.
// (The menu-bar download link once hid every span inside it, for its arrow.)
const link = /(^|[\s>+~])a\b|\.(pill|key|mb-dl|mb-gh|dl|trust-more)\b/;
function rulesHidingLinkSpans(css) {
  const found = [];
  for (const [, selectors, body] of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/display\s*:\s*none/.test(body)) continue;
    for (const sel of selectors.split(",").map((s) => s.trim())) {
      const last = sel.split(/[\s>+~]+/).at(-1);
      const reachesNote = /^(span|\*|\.sr-only)$/.test(last) && !/:not\(\.sr-only\)/.test(sel);
      if (reachesNote && (last === ".sr-only" || link.test(sel))) found.push(sel);
    }
  }
  return found;
}
test("no display:none rule reaches the .sr-only note inside a link", () => {
  assert.deepEqual(rulesHidingLinkSpans(".mb-dl > span { display: none; } .a .dl-na { display: none; }"), [".mb-dl > span"], "the guard finds the old rule");
  assert.deepEqual(rulesHidingLinkSpans(".mb-dl > span:not(.sr-only) { display: none; } .x span { display: none; }"), []);
  const found = readdirSync("src/styles").filter((f) => f.endsWith(".css")).flatMap((f) => rulesHidingLinkSpans(readFileSync(join("src/styles", f), "utf8")).map((s) => `${f}: ${s}`));
  assert.deepEqual(found, [], "narrow these with :not(.sr-only)");
});
