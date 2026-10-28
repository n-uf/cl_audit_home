// The app's usage panel in its five designs (Glow bars, Twin rings, Big numbers, Segmented, Pace bars),
// drawn from a profile's figures. "large" is the full panel (Settings preview); otherwise the compact one
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

/** The app's sample figures for the General settings preview: 34 % of the 5-hour limit, 61 % of the week. */
const sample: L[] = [
  { name: "5-hour", title: "5-hour session", p: 34, left: 192, elapsed: 36 },
  { name: "Week", title: "Week", p: 61, left: 3 * 1440, elapsed: 57 },
];

/** The limits part of a panel in one design (`"sample"`: the app's sample figures, for the card style preview). */
export function limitsHTML(id: AccountId | "sample", design: Design, large: boolean) {
  if (id !== "sample" && fullLimit(id)) return fullHTML(id, design);
  const ls = id === "sample" ? sample : limits(id);
  const draw = { glow, rings: ring, numbers: number, segments, pace }[design];
  const cls = design === "rings" ? "pn-limits rings" : design === "numbers" ? "pn-limits numbers" : "pn-limits";
  return `<div class="${cls}${large ? " large" : ""}">${ls.map((l) => draw(l, large)).join("")}</div>`;
}

export const designs: [Design, string][] = [["glow", "Glow"], ["rings", "Rings"], ["numbers", "Numbers"], ["segments", "Segments"], ["pace", "Pace"]];

// ── When a limit is full (100 %): the limits on the left and one box on the right, as the app's AtLimit.swift ──
/** "15:28" today, "Thu 09:00" within 6 days, "11 Nov" this year, "12 Jan 2027" another year (TimeWords.when). */
export function whenWords(d: Date, now = new Date()) {
  const day = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round(Math.abs(day(d) - day(now)) / 86400000);
  const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const mon = d.toLocaleString("en-GB", { month: "short" }), wd = d.toLocaleString("en-GB", { weekday: "short" });
  return days === 0 ? hm : days <= 6 ? `${wd} ${hm}` : d.getFullYear() === now.getFullYear() ? `${d.getDate()} ${mon}` : `${d.getDate()} ${mon} ${d.getFullYear()}`;
}
/** "back at 15:28" today, else "back Thu 09:00", "back 11 Nov" (TimeWords.back); the demo counts from now. */
export function backWords(minLeft: number, now = new Date()) {
  const d = new Date(now.getTime() + minLeft * 60000);
  return (day0(d) === day0(now) ? "back at " : "back ") + whenWords(d, now);
}
const day0 = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
/** "19m", "1h 42m", "2d 19h", "16 days" (TimeWords.countdown). */
export const countdownWords = (m: number) => (m < 60 ? `${m}m` : m < 1440 ? `${Math.floor(m / 60)}h ${m % 60}m` : m < 8 * 1440 ? `${Math.floor(m / 1440)}d ${Math.floor((m % 1440) / 60)}h` : `${Math.floor(m / 1440)} days`);
/** The full limit that holds a profile back (of the full ones, the one that resets last), or none. */
export function fullLimit(id: AccountId) {
  const ls = limits(id).filter((l) => l.p >= 100).sort((a, b) => b.left - a.left);
  if (!ls.length) return null;
  return { name: ls[0].name, other: ls[1]?.name, left: ls[0].left };
}
function fullHTML(id: AccountId, design: Design) {
  const f = fullLimit(id)!;
  const rows = limits(id).map((l) => {
    const hot = l.p >= 100;
    const words = hot ? (l.name === f.name ? "full" : `full · resets ${whenWords(new Date(Date.now() + l.left * 60000))}`) : `in ${short(l.left)}`;
    const meter = design === "segments"
      ? `<div class="pn-segs fl-segs">${Array.from({ length: 12 }, (_, i) => { const z = ((i + 1) / 12) * 100, c = z > 80 ? "#ef4444" : z > 50 ? "#f59e0b" : "#22c55e"; return i < Math.round((l.p / 100) * 12) ? `<i style="background:${c};box-shadow:0 0 5px ${c}80"></i>` : "<i></i>"; }).join("")}</div>`
      : bar(l, 6, true);
    return `<div class="fl-row"><div class="fl-name"><b>${l.name}</b><span class="${hot ? "fl-hot" : ""}">${words}</span></div>${meter}${pct(l, 12.5)}</div>`;
  }).join("");
  const title = `${f.name} full${f.other ? ` · ${f.other} too` : ""}`;
  return `<div class="fl"><div class="fl-rows">${rows}</div><div class="fl-box"><b class="fl-title">${title}</b><span class="fl-in"><small>in</small> ${countdownWords(f.left)}</span><span class="fl-back" data-back-min="${f.left}">${backWords(f.left)}</span></div></div>`;
}

/** The profile's two limits as a dashboard card draws them: the small panel design, one for every card; while a
 *  limit is full, the limits on the left and the box saying when it's back on the right. */
export function cardLimitsHTML(id: AccountId, design: Design) {
  const a = accounts.find((x) => x.id === id)!;
  return `<div class="card-limits" data-card-limits="${id}" data-design="${design}" role="img" aria-label="5-hour limit ${a.five}% used, week ${a.week}% used">${limitsHTML(id, design, false)}</div>`;
}

/** A whole panel: header (icon, name, email, plan), the limits in the chosen design, and the footer. */
export function panelHTML(id: AccountId, design: Design, opts: { large: boolean; name?: string; icon?: string; note?: string }) {
  const a = accounts.find((x) => x.id === id)!;
  const name = opts.name ?? a.name;
  const head = opts.large
    ? `<div class="pn-head"><span class="ico" data-ico="${id}"><img src="${opts.icon ?? a.icon}" data-acc-icon="${id}" alt="" width="56" height="56"></span><div class="pn-who"><div class="pn-title"><span class="dot" style="background:${a.color}"></span>Claude ${name}</div><div class="pn-sub email">${a.email}</div><span class="pn-plan">${a.plan} plan</span></div><span class="pn-close" aria-hidden="true">✕</span></div>`
    : `<div class="pn-head small"><span class="dot" style="background:${a.color}"></span><b>Claude ${name}</b><span class="pn-plan">${a.plan}</span></div>`;
  const foot = opts.large
    ? `<div class="pn-foot"><span class="pill small tint ${a.tint}">Claude</span><span class="pill small">Dashboard</span><span class="spacer"></span><span class="pn-sub">Updated just now</span><span class="pn-gear" aria-hidden="true">⚙︎</span></div>`
    : `<div class="pn-sub pn-note">${opts.note ?? ""}</div>`;
  return `<div class="pn${opts.large ? " large" : ""}">${head}${limitsHTML(id, design, opts.large)}${foot}</div>`;
}
