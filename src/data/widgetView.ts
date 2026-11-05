// The "Claude usage" widget (cl_audit 26.11.0), medium size, for General ▸ How usage looks ▸ Widget: with three
// profiles the app gives each a row (a dot and the name, then the 5-hour and weekly limits in the chosen design).
// Looks: System (the Mac's own widget background), Std, Black, Silver. A full limit is red; drawn from the demo.
import { accounts } from "./demo";
import { segLit, type Design } from "./panelView";
import { ordered } from "./prefs";   // the profiles' order (Settings strip)

const level = (p: number) => (p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");

function meter(design: Design, p: number, elapsed: number) {
  const c = level(p);
  if (design === "segments") {
    const lit = segLit(p);   // anything above 0 % lights the first segment
    return `<span class="wg-segs">${Array.from({ length: 12 }, (_, i) => { const z = ((i + 1) / 12) * 100; return i < lit ? `<i style="background:${z > 80 ? "#ef4444" : z > 50 ? "#f59e0b" : "#22c55e"}"></i>` : "<i></i>"; }).join("")}</span>`;
  }
  if (design === "rings") {
    const r = 6, cir = 2 * Math.PI * r;
    return `<svg class="wg-ring" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="${r}" fill="none" stroke="var(--wg-track)" stroke-width="2.5"/><circle cx="8" cy="8" r="${r}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${(cir * p) / 100} ${cir}" transform="rotate(-90 8 8)"/></svg>`;
  }
  if (design === "numbers") return "";
  const tick = design === "pace" ? `<b style="left:${elapsed}%"></b>` : "";
  return `<span class="wg-bar${design === "glow" ? " glow" : ""}"><i style="width:${p}%;background:${c};--c:${c}"></i>${tick}</span>`;
}

/** The medium widget as HTML: one row per profile. */
export function widgetHTML(design: Design, plate: string) {
  const rows = ordered(accounts).map((a) => {
    const lim = (tag: string, p: number, left: number, win: number) =>
      `<span class="wg-lim${design === "numbers" ? " big" : ""}"><span class="wg-tag">${tag}</span><b style="color:${level(p)}">${p}%</b>${meter(design, p, Math.round((1 - left / win) * 100))}</span>`;
    return `<div class="wg-row"><span class="wg-name"><i style="background:${a.hex}"></i>${a.name}</span>${lim("5h", a.five, a.fiveLeftMin, 300)}${lim("wk", a.week, a.weekLeftMin, 10080)}</div>`;
  }).join("");
  return `<div class="wg wg-${plate}" role="img" aria-label="The Claude usage widget, medium size">${rows}</div>`;
}
