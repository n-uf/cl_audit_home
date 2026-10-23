# cl_audit_home

The home site of [cl_audit](https://github.com/n-uf/cl_audit), live at **https://cl-audit.n-uf.com**.
It reproduces the look of the app: its dark window, cards, pill buttons and limit bars.

The page is built around cl_audit's three features:
1. **Several Claude accounts, side by side**: a separate Claude desktop app per account.
2. **Usage limits, right in the Dock**: one live icon per account.
3. **A usage dashboard you can rely on**: limits read directly from Anthropic.

- [Astro](https://astro.build): every page is plain, pre-rendered HTML with no JavaScript, with a sitemap,
  robots.txt, Open Graph image and structured data (SoftwareApplication, FAQPage).
- The icons and panels in `public/img` are rendered by cl_audit itself with demo accounts
  (`UsageDock --render-preview` / `--render-panel`), so they match the app exactly.

```bash
npm install
npm run dev      # http://localhost:5190
npm run build    # static site in dist/
```

Deployed by Vercel from `main` (GitHub connection).

---

Not affiliated with Anthropic. Claude is a trademark of Anthropic.
Licensed under [PolyForm Perimeter 1.0.1](LICENSE).
