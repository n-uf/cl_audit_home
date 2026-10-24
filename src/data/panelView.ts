// The app's usage panel in its five designs (Glow bars, Twin rings, Big numbers, Segmented, Pace bars),
// drawn from an account's figures. "large" is the full panel (Settings preview); otherwise the compact one
// the Dock shows on a click. Same layout rules as the app's PanelDesigns.swift.
import { accounts, type AccountId } from "./demo";

export type Design = "glow" | "rings" | "numbers" | "segments" | "pace";

const level = (p: number) => (p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");
const short = (min: number) => (min >= 1440 ? `${Math.round(min / 1440)} days` : min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`);

type L = { name: string; title: string; p: number; left: number; elapsed: number };
function limits(id: AccountId): L[] {
  const a = accounts.find((x) => x.id === id)!;
  return [
    { name: "5-hour", title: "5-hour session", p: a.five, left: a.fiveLeftMin, elapsed: Math.round((1 - a.fiveLeftMin / 300) * 100) },
    { name: "Week", title: "Week", p: a.week, left: a.weekLeftMin, elapsed: Math.round((1 - a.weekLeftMin / 10080) * 100) },
  ];
}

const pct = (l: L, size: number) => `<b class="pn-pct" style="color:${level(l.p)};font-size:${size}px">${l.p}%</b>`;
const bar = (l: L, h: number, glow = true, marker?: number) => `
  <div class="pn-bar" style="height:${h}px"><i style="width:${l.p}%;background:${level(l.p)};${glow ? `box-shadow:0 0 8px ${level(l.p)}` : ""}"></i>${marker != null ? `<b class="pn-mark" style="left:${marker}%"></b>` : ""}</div>`;
const resets = (l: L, large: boolean) => `<div class="pn-sub">${large ? "Resets" : "resets"} in ${short(l.left)}</div>`;

function glow(l: L, large: boolean) {
  return `<div class="pn-lim"><div class="pn-row"><span class="pn-name${large ? "" : " sm"}">${large ? l.title : l.name}</span>${pct(l, large ? 15 : 13)}</div>${bar(l, large ? 9 : 7)}${resets(l, large)}</div>`;
}
function ring(l: L, large: boolean) {
  const d = large ? 96 : 66, w = large ? 10 : 7, r = (d - w) / 2, c = 2 * Math.PI * r;
  return `<div class="pn-ring"><svg width="${d}" height="${d}" viewBox="0 0 ${d} ${d}">
    <circle cx="${d / 2}" cy="${d / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="${w}"/>
    <circle cx="${d / 2}" cy="${d / 2}" r="${r}" fill="none" stroke="${level(l.p)}" stroke-width="${w}" stroke-linecap="round"
      stroke-dasharray="${(c * l.p) / 100} ${c}" transform="rotate(-90 ${d / 2} ${d / 2})" style="filter:drop-shadow(0 0 4px ${level(l.p)}80)"/>
    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#fff" font-size="${large ? 21 : 15}" font-weight="700">${l.p}%</text>
  </svg><b class="pn-ring-name">${l.name}</b>${resets(l, large)}</div>`;
}
function number(l: L, large: boolean) {
  return `<div class="pn-num"><span class="pn-sub strong">${l.name}</span>
    <div class="pn-big" style="color:${level(l.p)}"><b style="font-size:${large ? 42 : 30}px">${l.p}</b><span style="font-size:${large ? 20 : 15}px">%</span></div>
    ${bar(l, 4, false)}${resets(l, large)}</div>`;
}
function segments(l: L, large: boolean) {
  const lit = Math.round((l.p / 100) * 12);
  const segs = Array.from({ length: 12 }, (_, i) => {
    const zone = ((i + 1) / 12) * 100, c = zone > 80 ? "#ef4444" : zone > 50 ? "#f59e0b" : "#22c55e";
    return i < lit ? `<i style="background:${c};box-shadow:0 0 5px ${c}80"></i>` : "<i></i>";
  }).join("");
  return `<div class="pn-lim"><div class="pn-row"><span class="pn-name strong${large ? "" : " sm"}">${large ? l.title : l.name}</span><span class="pn-sub">· in ${short(l.left)}</span><span class="spacer"></span>${pct(l, large ? 15 : 13)}</div>
    <div class="pn-segs" style="height:${large ? 11 : 9}px">${segs}</div></div>`;
}
function pace(l: L, large: boolean) {
  const d = l.p - l.elapsed;
  const [text, cls] = d > 10 ? ["ahead of pace", "red"] : d < -10 ? ["room to spare", "green"] : ["on pace", "gray"];
  return `<div class="pn-lim"><div class="pn-row"><span class="pn-name strong${large ? "" : " sm"}">${large ? l.title : l.name}</span><span class="pn-chip ${cls}">${text}</span><span class="spacer"></span>${pct(l, large ? 15 : 13)}</div>
    <div style="padding:4px 0">${bar(l, large ? 10 : 8, true, l.elapsed)}</div>
    <div class="pn-sub small">resets in ${short(l.left)} · ${l.elapsed}% of the window gone</div></div>`;
}

/** The limits part of a panel in one design. */
export function limitsHTML(id: AccountId, design: Design, large: boolean) {
  const ls = limits(id);
  const draw = { glow, rings: ring, numbers: number, segments, pace }[design];
  const cls = design === "rings" ? "pn-limits rings" : design === "numbers" ? "pn-limits numbers" : "pn-limits";
  return `<div class="${cls}${large ? " large" : ""}">${ls.map((l) => draw(l, large)).join("")}</div>`;
}

/** A whole panel: header (icon, name, email, plan), the limits in the chosen design, and the footer. */
export function panelHTML(id: AccountId, design: Design, opts: { large: boolean; name?: string; icon?: string; note?: string }) {
  const a = accounts.find((x) => x.id === id)!;
  const name = opts.name ?? a.name;
  const head = opts.large
    ? `<div class="pn-head"><span class="ico" data-ico="${id}"><img src="${opts.icon ?? a.icon}" alt="" width="56" height="56"></span><div class="pn-who"><div class="pn-title"><span class="dot" style="background:${a.color}"></span>Claude ${name}</div><div class="pn-sub email">${a.email}</div><span class="pn-plan">${a.plan} plan</span></div><span class="pn-close" aria-hidden="true">✕</span></div>`
    : `<div class="pn-head small"><span class="dot" style="background:${a.color}"></span><b>Claude ${name}</b><span class="pn-plan">${a.plan}</span></div>`;
  const foot = opts.large
    ? `<div class="pn-foot"><span class="pill small tint ${a.tint}">Claude</span><span class="pill small">Dashboard</span><span class="spacer"></span><span class="pn-sub">Updated just now</span><span class="pn-gear" aria-hidden="true">⚙︎</span></div>`
    : `<div class="pn-sub pn-note">${opts.note ?? ""}</div>`;
  return `<div class="pn${opts.large ? " large" : ""}">${head}${limitsHTML(id, design, opts.large)}${foot}</div>`;
}
