# cl_audit_home

The home site of [cl_audit](https://github.com/n-uf/cl_audit), live at **https://cl-audit.n-uf.com**.
The whole site is the app: a Mac desktop with a menu bar, one cl_audit window and the Dock. The
window's top-bar switch is the site navigation, and each page is its own address:

| Page | Address | What it shows |
| --- | --- | --- |
| Overview | `/` | the three features: several Claude accounts side by side, usage limits in the Dock, a usage dashboard read directly from Anthropic |
| Dashboard | `/dashboard` | the app's dashboard with demo accounts and usage history (24 h / 7 d / 30 d) |
| Settings | `/settings` | the app's Settings page: account, login, clicks, behaviour, icon styles, panels |
| Install | `/install` | build steps, requirements, adding accounts, update and uninstall |
| FAQ | `/faq` | questions and answers (also as FAQPage data) |

- [Astro](https://astro.build) with its client router: switching pages swaps only the window content, while the
  menu bar, window frame and Dock stay. Every page is pre-rendered HTML with its own title and description,
  plus a sitemap, robots.txt, an Open Graph image and structured data.
- The icons and panels in `public/img` are rendered by cl_audit itself with demo accounts
  (`UsageDock --render-preview` / `--render-panel`). The demo history in `src/data/demo.ts` is generated at
  build time from a fixed seed.

```bash
npm install
npm run dev      # http://localhost:5190
npm run build    # static site in dist/
```

Deployed by Vercel from `main` (GitHub connection).

---

Not affiliated with Anthropic. Claude is a trademark of Anthropic.
Licensed under [PolyForm Perimeter 1.0.1](LICENSE).
