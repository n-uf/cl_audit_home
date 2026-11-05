<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/logo-light.svg">
    <img alt="cl_audit_home by n-uf" src="docs/logo-light.svg" height="60">
  </picture>
</p>

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
npm run build    # static site in dist/, then scripts/check-links.mjs (no live page may link to a missing page)
npm test         # scripts/publish-due.mjs on a fixture folder
```

Deployed by Vercel from `main` (GitHub connection).

**Scheduled publishing.** A finished use-case page or article merges to `main` with `draft: true` and its go-live
date (UTC) in `published`. A draft is built nowhere in production (no page, sitemap entry, list card, `llms.txt`
line or Related link; a live page linking to one fails the build); `npm run dev` and Vercel previews show it with a
"Scheduled for <date>" badge and `noindex`. `.github/workflows/publish.yml` runs daily at 00:10 UTC, sets
`draft: false` on every page whose date has come (`scripts/publish-due.mjs`, `--dry-run` lists them), builds the
site (a red build pushes nothing) and pushes `publish: <section>/<slug>` (e.g. `publish: blog/some-page`) to `main`,
retrying a rejected push up to 3 times. It pushes over SSH with the repo's write deploy key (secret
`PUBLISH_DEPLOY_KEY`), which may bypass `main`'s ruleset. To undo, revert that commit, or set `draft: true` again (with a future `published`).
A draft's `updated` must equal its `published` (the schema requires `updated >= published`, and the flip changes
only `draft`, so a draft dated ahead needs the same future date in both). `.github/workflows/ci.yml` runs the tests
and a plain build on every pull request, so a live page linking to a draft fails there, not after the merge.
To link to a page that is still a draft, wrap the sentence in the markdown body as `{{live:/blog/some-page/}}See
[some page](/blog/some-page/).{{/live}}`: it shows once that page is built (live, or a draft in dev and previews) and
production removes it until the flip day (`src/data/live.ts`). The build fails on a target that is no page, a nested or
stray marker, or a block that spans paragraphs; a bare link to a draft fails `scripts/check-links.mjs`.

---

Not affiliated with Anthropic. Claude is a trademark of Anthropic.
Licensed under [PolyForm Perimeter 1.0.1](LICENSE).
