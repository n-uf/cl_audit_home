// The Overview's page display: a small live Dock after "OVERVIEW" (sketch 3i, R1 + C1). Three pairs, each a Claude
// window tile and its usage drawn like a phone's battery widget (a dark icon, a ring in the level colour, the figure).
// Launch: the pairs arrive one at a time, the frame widening for each (the width for all three is reserved, so the
// words after it never move). Live: every profile on its own clock, rising a little at irregular moments, a 5-hour
// window resetting after it fills; every change eases. With "reduce motion" the Dock is simply shown.

const NS = "http://www.w3.org/2000/svg";
const START = [34, 78, 12];   // the demo profiles' 5-hour figures
const level = (p: number) => (p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
let stop: (() => void) | undefined;

function usageIcon() {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  const r = 8.6, c = 2 * Math.PI * r;
  const circle = (cls: string) => {
    const el = document.createElementNS(NS, "circle");
    for (const [k, v] of Object.entries({ cx: 12, cy: 12, r, fill: "none", "stroke-width": 2.4, class: cls })) el.setAttribute(k, String(v));
    return el;
  };
  const track = circle("tr"), arc = circle("arc");
  arc.setAttribute("stroke-linecap", "round");
  arc.setAttribute("transform", "rotate(-90 12 12)");
  const text = document.createElementNS(NS, "text");
  for (const [k, v] of Object.entries({ x: 12, y: 12.3, "text-anchor": "middle", "dominant-baseline": "central" })) text.setAttribute(k, String(v));
  svg.append(track, arc, text);
  let shown = 0, raf = 0;
  const paint = (v: number) => {
    arc.setAttribute("stroke-dasharray", `${(c * v) / 100} ${c}`);
    arc.style.opacity = v < 0.6 ? "0" : "1";   // no round-cap dot at 0
    const n = Math.round(v), col = level(n);
    arc.setAttribute("stroke", col);
    arc.style.color = col;
    if (text.textContent !== String(n)) text.textContent = String(n);
  };
  paint(0);
  const to = (target: number, ms: number, still: boolean) => {
    cancelAnimationFrame(raf);
    const from = shown, t0 = performance.now();
    const step = (now: number) => {
      const k = still ? 1 : Math.min(1, (now - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      shown = from + (target - from) * e;
      paint(shown);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  return { svg, to, cancel: () => cancelAnimationFrame(raf) };
}

export function initDockLamps() {
  stop?.();
  stop = undefined;
  const slot = document.querySelector<HTMLElement>(".lslot");
  if (!slot) return;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const S = parseFloat(getComputedStyle(slot).getPropertyValue("--s")) || 18, g = S * 0.179, border = 1;
  const width = (k: number) => (k === 0 ? 2 * g : k * (2 * S + g) + (k - 1) * g + 2 * g) + 2 * border;
  slot.style.width = `${width(3)}px`;
  slot.innerHTML = "";
  const frame = document.createElement("span");
  frame.className = "lfr";
  frame.style.width = `${width(0)}px`;
  slot.append(frame);
  const pairs = START.map((five) => {
    const el = document.createElement("span");
    el.className = "lp";
    const tile = document.createElement("span");
    tile.className = "ltile";
    const u = document.createElement("span");
    u.className = "lu";
    const icon = usageIcon();
    u.append(icon.svg);
    el.append(tile, u);
    return { el, icon, five };
  });
  const timers: number[] = [];
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
  stop = () => { timers.forEach(clearTimeout); pairs.forEach((p) => p.icon.cancel()); };
  document.addEventListener("astro:before-swap", () => stop?.(), { once: true });

  if (still) {
    pairs.forEach((p) => { frame.append(p.el); p.el.classList.add("in"); p.icon.to(p.five, 0, true); });
    frame.style.width = `${width(3)}px`;
    return;
  }
  const live = (p: (typeof pairs)[number]) => {   // every profile on its own clock
    const tick = () => {
      if (p.five >= 100) {   // full: hold a while, then the 5-hour window resets
        later(() => { p.five = Math.round(rnd(3, 9)); p.icon.to(p.five, 2200, false); later(tick, rnd(3000, 6000)); }, rnd(3500, 6000));
        return;
      }
      p.five = Math.min(100, p.five + Math.round(rnd(1, 3)));
      p.icon.to(p.five, 1300, false);
      later(tick, rnd(2200, 5600));
    };
    later(tick, rnd(1500, 4000));
  };
  pairs.forEach((p, i) => later(() => {
    frame.append(p.el);
    frame.style.width = `${width(i + 1)}px`;   // the Dock opens a place
    later(() => { p.el.classList.add("in"); later(() => p.icon.to(p.five, 1600, false), 350); }, 260);   // the pair pops in, its usage fills
  }, 500 + i * 1500));
  pairs.forEach((p, i) => later(() => live(p), 500 + 3 * 1500 + 1500 + i * 900));
}
