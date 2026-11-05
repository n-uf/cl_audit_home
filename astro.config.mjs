// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync, existsSync } from "node:fs";

const site = "https://cl-audit.n-uf.com";

// lastmod only for the use-case pages and the blog, from the `updated` date in their front matter (a build time isn't a change date).
// Other pages get none.
const lastmod = new Map();
for (const [dir, section] of [["src/content/use-cases", "use-cases"], ["src/content/blog", "blog"]]) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(`${dir}/${file}`, "utf8");
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    if (/^draft:\s*true\s*$/m.test(front)) continue; // a draft isn't built in production, so it has no sitemap entry
    const m = front.match(/^updated:\s*["']?(\d{4}-\d{2}-\d{2})/m);
    if (m) lastmod.set(`${site}/${section}/${file.slice(0, -3)}/`, new Date(`${m[1]}T00:00:00Z`));
  }
}

export default defineConfig({
  site,
  integrations: [sitemap({
    serialize(item) {
      const d = lastmod.get(item.url);
      if (d) item.lastmod = d;
      return item;
    },
  })],
  build: { inlineStylesheets: "always" },
  devToolbar: { enabled: false }, // it sits over the Dock
});
