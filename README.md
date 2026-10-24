# cl_audit_home

The home site of [cl_audit](https://github.com/n-uf/cl_audit), live at **https://cl-audit.n-uf.com**.
The whole site is the app: a Mac desktop with a menu bar, one cl_audit window and the Dock. The
window's top-bar switch is the site navigation, and each page is its own address:

| Page | Address | What it shows |
| --- | --- | --- |
| Overview | `/` | the three features: several Claude profiles side by side, usage limits in the Dock, a dashboard read directly from Anthropic; the switches, adding a profile and the words used |
| Dashboard | `/dashboard` | the app's dashboard with demo profiles: a card each with working Claude window and Dock icon switches, and usage history (24 h / 7 d / 30 d) |
| Settings | `/settings` | the app's Settings page, working: General and each profile's settings (Profile, Claude Code and window, Updates and alerts, Clicking and panels, Icon, Dock icon, Opening and closing), with a note saying what a changed setting now does |
| Install | `/install` | build steps, the latest version, requirements, adding a profile, update and uninstall |
| FAQ | `/faq` | questions and answers (also as FAQPage data) |

A **profile** is one Claude setup in cl_audit (Claude Code folder and sign-in, Claude window, Dock icon);
an **account** is only the claude.ai account a profile is signed in to. The site uses the app's words:
Claude window, Dock icon, profile settings, General settings, New profile, Remove profile…, Sign in….

- [Astro](https://astro.build) with its client router: switching pages swaps only the window content, while the
  menu bar, window frame and Dock stay. Every page is pre-rendered HTML with its own title and description,
  plus a sitemap, robots.txt, an Open Graph image and structured data.
- The icons and panels in `public/img` are rendered by cl_audit itself with demo profiles
  (`UsageDock --render-preview` / `--render-panel`). The demo history in `src/data/demo.ts` is generated at
  build time from a fixed seed.
- **Profile icons** (`public/img/acc`, 1,872 small PNGs, about 4.4 MB) are drawn by the app's own painter for
  every profile, icon style, icon colour and preview-lane step, so Settings ▸ Icon ▸ Colour redraws them
  everywhere (`iconSrc` / `laneSrc` in `src/data/prefs.ts`). Only styles whose look depends on the colour get
  a picture per colour; the others have one for every colour. After the app's painter changes, regenerate
  them (and `src/data/icon-manifest.json`, which lists the colour-dependent styles):

  ```bash
  (cd ../cl_audit && ./build.sh --no-install)   # builds ./build/UsageDock only, installs nothing
  scripts/render-icons.sh                       # needs macOS (sips) and, for small files, pngquant
  ```

  The frame and the Claude open dot are drawn in CSS.
- **Open Graph image:** `public/og.png` is drawn by `scripts/render-og.py` (Pillow + numpy, no browser) in
  Inter. The font file stays out of the repo: pass Inter's variable font from Google Fonts or the
  rsms/inter release with `--font`. Edit the wording at the top of the script.
- The demo is client side only: a profile's settings and the dashboard card style (General settings) are kept in this browser (`src/data/prefs.ts`), and
  the dashboard switches keep their state while you move between pages (`src/data/cardState.ts`). The
  "What this does now" panel (`src/data/whatNow.ts`) is an overlay that takes no layout space.
- **Version:** `src/data/site.ts` holds the current cl_audit `version` and `released` date. Update both on
  each cl_audit release (the number is in the app's `VERSION`, the date in its `CHANGELOG.md`); the footer on
  the Overview, the Install page and the structured data read them.

```bash
npm install
npm run dev      # http://localhost:5190
npm run build    # static site in dist/
```

Deployed by Vercel from `main` (GitHub connection).

---

Not affiliated with Anthropic. Claude is a trademark of Anthropic.
Licensed under [PolyForm Perimeter 1.0.1](LICENSE).
