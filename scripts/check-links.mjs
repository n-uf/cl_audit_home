#!/usr/bin/env node
// Fails the build when a built page links to an internal address that has no built file.
// Why: a live page must never link to a draft, and production builds render no page for a draft, so such a link
// shows up here as a target without a file. Runs after `astro build` (see "build" in package.json).
//
//   node scripts/check-links.mjs [dist-dir]     (default: dist)
//
// Walks every .html file in the folder, collects every internal href (starting with "/", not "//"; "#..." and
// external links are ignored; ?query and #hash are cut off) and checks that a file exists for it:
// /x/ -> /x/index.html, /x -> /x.html or /x/index.html, /file.ext -> that file.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, relative, extname } from "node:path";

const dist = resolve(process.argv[2] ?? "dist");
if (!existsSync(dist)) {
  console.error(`check-links: ${dist} does not exist; run astro build first`);
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

function exists(href) {
  let path;
  try { path = decodeURIComponent(href.split(/[?#]/)[0]); } catch { path = href.split(/[?#]/)[0]; }
  const file = join(dist, path);
  if (path.endsWith("/")) return existsSync(join(file, "index.html"));
  if (extname(path)) return existsSync(file);
  return existsSync(`${file}.html`) || existsSync(join(file, "index.html"));
}

const missing = [];
let pages = 0, checked = 0;
for (const file of htmlFiles(dist)) {
  pages++;
  const page = "/" + relative(dist, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const seen = new Set();
  for (const m of readFileSync(file, "utf8").matchAll(/<a\b[^>]*?\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const href = (m[1] ?? m[2]).replace(/&amp;/g, "&").trim();
    if (!href.startsWith("/") || href.startsWith("//") || seen.has(href)) continue;
    seen.add(href);
    checked++;
    if (!exists(href)) missing.push(`${page} -> ${href}`);
  }
}

if (missing.length > 0) {
  console.error(`check-links: ${missing.length} internal link(s) point to no built page (a live page linking to a draft?):`);
  for (const line of missing) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`check-links: ok (${pages} pages, ${checked} internal links)`);
