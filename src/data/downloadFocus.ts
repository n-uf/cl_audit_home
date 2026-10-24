// Only one Download button is prominent at a time. While a download button on the page is in view (the
// first one, if several are), the others, the menu bar's included, look quiet; once the page buttons
// scroll out of view, the menu bar's button is the prominent one again. The page also starts in the
// likely state (see Desktop.astro and index.astro), so nothing flashes before this runs.

let cleanup: (() => void) | undefined;

export function initDownloadFocus() {
  cleanup?.();
  const content = document.querySelector<HTMLElement>(".content");
  const bar = document.querySelector<HTMLElement>(".mb-dl");
  const buttons = [...document.querySelectorAll<HTMLElement>(".content .pill.dl")];

  const update = () => {
    const area = content?.getBoundingClientRect();
    // in view = at least three quarters of the button inside the scrolling content
    const first = buttons.find((b) => {
      const r = b.getBoundingClientRect();
      if (!area || r.height === 0) return false;
      const visible = Math.min(r.bottom, area.bottom) - Math.max(r.top, area.top);
      return visible >= r.height * 0.75;
    });
    buttons.forEach((b) => b.classList.toggle("dim", b !== first));
    bar?.classList.toggle("dim", !!first);
  };

  update();
  if (!content) return;
  content.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  cleanup = () => {
    content.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}
