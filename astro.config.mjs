// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cl-audit.n-uf.com",
  integrations: [sitemap()],
  build: { inlineStylesheets: "always" },
  devToolbar: { enabled: false }, // it sits over the Dock
});
