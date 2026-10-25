// The Overview's page display: a small live Dock after "OVERVIEW". Three pairs, each the Claude window as a display
// pictogram and its usage as two rings (5-hour outside, week inside), each ring in its level colour.
// Launch: the pairs arrive one at a time, the frame widening for each (the width for all three is reserved, so the
// words after it never move). Live: every profile on its own clock, rising a little at irregular moments, a 5-hour
// window resetting after it fills; every change eases. With "reduce motion" the Dock is simply shown.

const NS = "http://www.w3.org/2000/svg";
const START: [number, number][] = [[34, 12], [78, 61], [12, 40]];   // the demo profiles: 5-hour, week
const NAMES = ["home", "work", "side"];
const level = (p: number) => (p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
let stop: (() => void) | undefined;

// the Claude window as a display pictogram: a chat bubble in a rounded-square frame (sketch 3j, P2 in the frame of P3)
function windowPictogram() {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.innerHTML =
    '<rect class="o" x="3" y="3" width="18" height="18" rx="4.2" stroke-width="1.5"/>' +
    '<path class="o" stroke-width="1.4" stroke-linejoin="round" d="M8.6 7.6h6.8a2 2 0 0 1 2 2v3.2a2 2 0 0 1-2 2h-3.3l-2.9 2.4v-2.4h-.6a2 2 0 0 1-2-2V9.6a2 2 0 0 1 2-2z"/>' +
    '<path class="o" stroke-width="1.3" stroke-linecap="round" d="M9.2 10.4h5.6M9.2 12.5h3.4"/>';
  return svg;
}

// the usage as two rings, bare on the glass (as the app's Twin rings icon): the 5-hour limit outside, the week inside
function usageRings() {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  const ring = (r: number) => {
    const c = 2 * Math.PI * r;
    const el = (cls: string) => {
      const e = document.createElementNS(NS, "circle");
      for (const [k, v] of Object.entries({ cx: 12, cy: 12, r, fill: "none", "stroke-width": 2.1, class: cls })) e.setAttribute(k, String(v));
      return e;
    };
    const track = el("tr"), arc = el("arc");
    arc.setAttribute("stroke-linecap", "round");
    arc.setAttribute("transform", "rotate(-90 12 12)");
    svg.append(track, arc);
    let shown = 0, raf = 0;
    const paint = (v: number) => {
      arc.setAttribute("stroke-dasharray", `${(c * v) / 100} ${c}`);
      arc.style.opacity = v < 0.6 ? "0" : "1";   // no round-cap dot at 0
      const col = level(Math.round(v));
      arc.setAttribute("stroke", col);
      arc.style.color = col;
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
    return { to, cancel: () => cancelAnimationFrame(raf), value: () => shown };
  };
  return { svg, five: ring(9.2), week: ring(5.4) };
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
  const pairs = START.map(([five, week]) => {
    const el = document.createElement("span");
    el.className = "lp";
    const win = document.createElement("span");
    win.className = "lpict";
    win.append(windowPictogram());
    const u = document.createElement("span");
    u.className = "lu";
    const rings = usageRings();
    u.append(rings.svg);
    el.append(win, u);
    return { el, rings, five, week };
  });
  const timers: number[] = [];
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
  // the alert at the right end of the display: while a usage is red (80 % and up), the highest one is named there
  const alert = document.querySelector<HTMLElement>(".lalert");
  const watch = window.setInterval(() => {
    if (!alert) return;
    let top: { name: string; limit: string; v: number } | null = null;
    pairs.forEach((p, i) => {
      for (const [limit, v] of [["5-hour", p.rings.five.value()], ["week", p.rings.week.value()]] as const) {
        const n = Math.round(v);
        if (n >= 80 && (!top || n > top.v)) top = { name: NAMES[i], limit, v: n };
      }
    });
    alert.classList.toggle("on", !!top);
    if (top) {
      const t = top as { name: string; limit: string; v: number };
      const text = `${t.name} · ${t.limit} ${t.v}%`;
      const label = alert.querySelector<HTMLElement>(".la-t");
      if (label) { if (label.textContent !== text) label.textContent = text; }
      else alert.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.6 21.4 20H2.6z" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 9.5v5M12 17.3v.1" stroke-width="2" stroke-linecap="round"/></svg>' + `<span class="la-t">${text}</span>`;
    }
  }, 400);
  stop = () => { timers.forEach(clearTimeout); clearInterval(watch); pairs.forEach((p) => { p.rings.five.cancel(); p.rings.week.cancel(); }); };
  document.addEventListener("astro:before-swap", () => stop?.(), { once: true });

  if (still) {
    pairs.forEach((p) => { frame.append(p.el); p.el.classList.add("in"); p.rings.five.to(p.five, 0, true); p.rings.week.to(p.week, 0, true); });
    frame.style.width = `${width(3)}px`;
    return;
  }
  const live = (p: (typeof pairs)[number]) => {   // every profile on its own clock
    const tick = () => {
      if (p.five >= 100) {   // full: hold a while, then the 5-hour window resets
        later(() => { p.five = Math.round(rnd(3, 9)); p.rings.five.to(p.five, 2200, false); later(tick, rnd(3000, 6000)); }, rnd(3500, 6000));
        return;
      }
      p.five = Math.min(100, p.five + Math.round(rnd(1, 3)));
      p.rings.five.to(p.five, 1300, false);
      if (p.week < 100 && Math.random() < 0.3) { p.week += 1; p.rings.week.to(p.week, 1800, false); }   // the week moves more slowly
      later(tick, rnd(2200, 5600));
    };
    later(tick, rnd(1500, 4000));
  };
  pairs.forEach((p, i) => later(() => {
    frame.append(p.el);
    frame.style.width = `${width(i + 1)}px`;   // the Dock opens a place
    later(() => { p.el.classList.add("in"); later(() => { p.rings.five.to(p.five, 1600, false); p.rings.week.to(p.week, 1900, false); }, 350); }, 260);   // the pair pops in, its usage fills
  }, 500 + i * 1500));
  pairs.forEach((p, i) => later(() => live(p), 500 + 3 * 1500 + 1500 + i * 900));
}
