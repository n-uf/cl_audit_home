// The Overview's page display: a small Dock (Claude window lamp, its usage, three times) after "OVERVIEW". A calm
// loop: the lamps fade on, the three usages climb together from 0 to 100 (easing out), their colour following the
// level as everywhere on the site, hold, fade out, rest, again. With "reduce motion" the lamps are simply lit.

const level = (p: number) => (p >= 80 ? "239,68,68" : p >= 50 ? "245,158,11" : "74,222,128");
const FADE = 1100, CLIMB = 6000, HOLD = 3000, REST = 2200;
let stop: (() => void) | undefined;

export function initDockLamps() {
  stop?.();
  stop = undefined;
  const row = document.querySelector<HTMLElement>(".dk-lamps");
  if (!row) return;
  const us = [...row.querySelectorAll<HTMLElement>(".us")];
  const set = (v: number) => us.forEach((u) => { if (u.textContent !== String(v)) u.textContent = String(v); u.style.setProperty("--lv", level(v)); });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { set(34); row.classList.add("on"); return; }
  let live = true, raf = 0, timer = 0;
  const cycle = () => {
    if (!live) return;
    set(0);
    row.classList.add("on");
    const t0 = performance.now() + FADE;
    const step = (now: number) => {
      if (!live) return;
      const k = Math.min(1, Math.max(0, (now - t0) / CLIMB));
      set(Math.round(100 * (1 - (1 - k) ** 2)));
      if (k < 1) raf = requestAnimationFrame(step);
      else timer = window.setTimeout(() => { row.classList.remove("on"); timer = window.setTimeout(cycle, REST); }, HOLD);
    };
    raf = requestAnimationFrame(step);
  };
  cycle();
  stop = () => { live = false; cancelAnimationFrame(raf); clearTimeout(timer); };
  document.addEventListener("astro:before-swap", () => stop?.(), { once: true });
}
