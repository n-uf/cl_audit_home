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
  frame.style.width = `${width(1)}px`;   // the Dock starts with one pair in place
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
  // the alert at the right end of the display. When a usage first turns red (80 %) and when it reaches 100 %, the
  // message is typed in ("work · 5-hour 80%") and stays 3 s; then it shrinks to a compact sign, the warning icon with
  // the profile's name under it, which stays while that profile is red. A 5-hour reset below 80 % clears it, and it
  // can alert again. Several messages at once wait their turn.
  const alert = document.querySelector<HTMLElement>(".lalert");
  // a warning sign drawn with care: a triangle with rounded corners, an exclamation bar and a round dot
  const ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M10.27 4.1a2 2 0 0 1 3.46 0l7.74 13.4a2 2 0 0 1-1.73 3H4.26a2 2 0 0 1-1.73-3z" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 9.3v4.6" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.15" stroke="none"/></svg>';
  // the alert takes space only while it shows: once faded, it is emptied, so the title has the whole display again
  const clearWhenOff = () => later(() => { if (alert && !alert.classList.contains("on")) alert.innerHTML = ""; }, 750);
  const last = new Map<string, number>();
  const queue: { name: string; limit: string; mark: number }[] = [];
  let busy = false, shownSigns = "";
  const red = () => pairs.map((p, i) => (Math.round(Math.max(p.rings.five.value(), p.rings.week.value())) >= 80 ? NAMES[i] : "")).filter(Boolean);
  const showSigns = () => {   // the compact signs: one per red profile
    if (!alert || busy) return;
    const names = red(), key = names.join(",");
    if (key === shownSigns) return;
    shownSigns = key;
    alert.classList.add("signs");
    if (names.length) { alert.innerHTML = names.map((n) => `<span class="la-sign">${ICON}<span>${n}</span></span>`).join(""); alert.classList.add("on"); }
    else { alert.classList.remove("on"); clearWhenOff(); }
  };
  const showNext = () => {
    if (!alert || busy || !queue.length) return;
    busy = true;
    const m = queue.shift()!;
    alert.classList.remove("signs");
    // the longest wording that fits the free space on the display (measured, so the title is never cut)
    const title = document.querySelector<HTMLElement>(".page-disp .pd-t");
    const fits = (t: string) => {
      alert.innerHTML = `${ICON}<span class="la-t">${t}</span>`;
      return !title || title.scrollWidth <= title.clientWidth;
    };
    const words = [`${m.name} · ${m.limit} ${m.mark}%`, `${m.name} ${m.limit === "week" ? "wk" : "5h"} ${m.mark}%`, `${m.mark}%`];
    const text = words.find(fits) ?? "";
    alert.innerHTML = `${ICON}<span class="la-t"></span>`;
    const label = alert.querySelector<HTMLElement>(".la-t")!;
    label.style.minWidth = "0";
    alert.classList.add("on");
    let k = 0;
    const type = () => {   // typed in, one character at a time
      label.textContent = text.slice(0, ++k);
      if (k < text.length) later(type, 45);
      else later(() => { alert.classList.remove("on"); later(() => { alert.innerHTML = ""; busy = false; shownSigns = "-"; if (queue.length) showNext(); else showSigns(); }, 700); }, 3000);   // 3 s, then the compact sign
    };
    later(type, 350);
  };
  const watch = window.setInterval(() => {
    pairs.forEach((p, i) => {
      for (const [limit, v] of [["5-hour", p.rings.five.value()], ["week", p.rings.week.value()]] as const) {
        const key = `${i}:${limit}`, n = Math.round(v), prev = last.get(key) ?? n;
        last.set(key, n);
        for (const mark of [80, 100]) if (prev < mark && n >= mark) queue.push({ name: NAMES[i], limit, mark });
      }
    });
    showNext();
    showSigns();
  }, 200);
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
  // the first pair is there from the start (its usage fills); the others launch into the Dock one at a time
  frame.append(pairs[0].el);
  pairs[0].el.classList.add("in");
  later(() => { pairs[0].rings.five.to(pairs[0].five, 1600, false); pairs[0].rings.week.to(pairs[0].week, 1900, false); }, 400);
  pairs.slice(1).forEach((p, j) => later(() => {
    frame.append(p.el);
    frame.style.width = `${width(j + 2)}px`;   // the Dock opens a place
    later(() => { p.el.classList.add("in"); later(() => { p.rings.five.to(p.five, 1600, false); p.rings.week.to(p.week, 1900, false); }, 350); }, 260);   // the pair pops in, its usage fills
  }, 1800 + j * 1500));
  pairs.forEach((p, i) => later(() => live(p), 1800 + 2 * 1500 + 1500 + i * 900));
}
