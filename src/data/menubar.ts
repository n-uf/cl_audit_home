// A profile's menu bar icon (cl_audit 26.11.0), drawn the way the app's MenuBar.swift draws it, for the Settings demo's
// Menu bar card and the site's own menu bar. Styles: Two bars (5-hour over week), Bars + number, Ring (week outside,
// 5-hour inside), Ring + number, Number (the fuller limit), Two numbers. Colours: the level colours, System (the menu
// bar's own colour), Accent (the Mac's accent colour) or the profile's colour. A full limit shows the countdown beside
// the icon ("1h 42m"), or only turns red; in System it's never red (the countdown shows it).
import { accounts, standby, byRoom, shortName, type AccountId } from "./demo";
import { countdownWords, fableShown } from "./panelView";
import type { MenuBarLook } from "./prefs";

const level = (p: number) => (p >= 95 ? "#eb445b" : p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");
const RED = "#eb445b", ACCENT = "#0a84ff";   // a full limit is crimson (26.11.1: from 95 %)

/** The icon as HTML. `five`/`week` null = no numbers yet; `dark` = the menu bar it sits in. */
export function glyphHTML(look: MenuBarLook, five: number | null, week: number | null, o: { label?: string; hex?: string; dark: boolean; countdown?: string }) {
  const fg = o.dark ? "#f2f2f2" : "#1d1d1f";
  const track = o.dark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.2)";
  const full = (five ?? 0) >= 100 || (week ?? 0) >= 100;
  const sys = look.colours === "system";
  const col = (p: number | null) => {
    if (p == null) return track;
    if (p >= 100 && !sys) return RED;
    return look.colours === "levels" ? level(p) : sys ? fg : look.colours === "accent" ? ACCENT : (o.hex ?? ACCENT);
  };
  const top = Math.max(five ?? 0, week ?? 0);
  const numColor = five == null ? fg : col(top);
  const bar = (p: number | null) => `<u style="background:${track}"><i style="width:${Math.min(100, p ?? 0)}%;background:${col(p)}"></i></u>`;
  const bars = `<span class="mbg-bars">${bar(five)}${bar(week)}</span>`;
  const ring = (() => {
    const r = (rad: number, w: number, p: number | null) => {
      const c = 2 * Math.PI * rad;
      return `<circle cx="8" cy="8" r="${rad}" fill="none" stroke="${track}" stroke-width="${w}"/><circle cx="8" cy="8" r="${rad}" fill="none" stroke="${col(p)}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${(c * Math.min(100, p ?? 0)) / 100} ${c}" transform="rotate(-90 8 8)"/>`;
    };
    return `<svg class="mbg-ring" width="16" height="16" viewBox="0 0 16 16">${r(6.5, 2, week)}${r(3.2, 1.8, five)}</svg>`;
  })();
  const pctText = five == null ? "–" : `${Math.round(top)}%`;
  const num = `<span class="mbg-num" style="color:${numColor}">${pctText}</span>`;
  const two = `<span class="mbg-num" style="color:${col(five)}">${five == null ? "–" : Math.round(five)}</span><span class="mbg-dot" style="color:${fg}">·</span><span class="mbg-num" style="color:${col(week)}">${week == null ? "–" : Math.round(week)}</span>`;
  const cd = full && look.whenFull === "countdown" && o.countdown ? `<span class="mbg-cd" style="color:${sys ? fg : RED}">${o.countdown}</span>` : "";
  // full with the countdown: the number styles show only the countdown; the bars and rings keep their drawing
  const body = cd && (look.style === "number" || look.style === "twoNumbers") ? ""
    : cd && (look.style === "barsNumber" || look.style === "ringNumber") ? (look.style === "barsNumber" ? bars : ring)
    : { bars, barsNumber: bars + num, ring, ringNumber: ring + num, number: num, twoNumbers: two }[look.style];
  const label = look.label && o.label ? `<span class="mbg-lab" style="color:${fg}">${o.label}</span>` : "";
  return `<span class="mbg">${label}${body}${cd}</span>`;
}

/** A profile's icon with its demo numbers. */
export function profileGlyph(id: AccountId, look: MenuBarLook, label: string, hex: string, dark: boolean) {
  const a = accounts.find((x) => x.id === id)!;
  return glyphHTML(look, a.five, a.week, { label, hex, dark, countdown: a.five >= 100 ? countdownWords(a.fiveLeftMin) : undefined });
}

/** The preview lane: from "no numbers yet" to "full", as the app's card shows it. */
export const lane: [string, number | null, number | null, string | undefined][] = [
  ["no numbers yet", null, null, undefined], ["plenty left", 12, 20, undefined], ["half used", 55, 48, undefined],
  ["at limit", 88, 72, undefined], ["full", 100, 64, "1h 42m"],
];

/** The profile's own menu, opened from its menu bar icon: its limits, Fable's, usage credits, then the items. */
export function menuHTML(id: AccountId, name: string) {
  const a = accounts.find((x) => x.id === id)!;
  const row = (n: string, p: number, sub: string, hot: boolean) =>
    `<div class="mbm-row"><span>${n}</span><span class="mbm-bar"><i style="width:${Math.min(100, p)}%;background:${level(p)}"></i></span><b style="color:${level(p)}">${p}%</b></div><div class="mbm-sub${hot ? " hot" : ""}">${sub}</div>`;
  const when = (m: number) => (m >= 1440 ? `in ${Math.round(m / 1440)} days` : m >= 60 ? `in ${Math.floor(m / 60)} h ${m % 60} min` : `in ${m} min`);
  // a profile with other accounts (switch UX round 2): the account in use under its name, then "Switch account ›", a
  // submenu with the account in use ticked and every standby account, most room first, each with its week. While a
  // limit is full, the one with the most room also sits on the top level, right under the full line.
  const sb = byRoom(standby[id]), full = a.five >= 100 || a.week >= 100;
  const best = full ? sb.find((s) => s.five < 100 && s.week < 100) : undefined;
  const sw = (s: { email: string; week: number }, label: string) => `<button type="button" class="mbm-it" data-mbm="switch" data-to="${s.email}">${label}<span class="r">week ${s.week}%</span></button>`;
  const switching = sb.length
    ? (best ? sw(best, `Switch to ${shortName(best.email)}…`) : "") +
      `<button type="button" class="mbm-it" data-mbm="submenu" aria-expanded="false">Switch account<span class="chev">›</span></button>` +
      `<div class="mbm-subm" hidden><div class="mbm-it cur"><span class="ck">✓</span>${shortName(a.email)}<span class="r">in use · week ${a.week}%</span></div><hr>` +
      sb.map((s) => sw(s, `<span class="ck"></span>${shortName(s.email)}…`)).join("") + "</div><hr>"
    : "";
  return `<div class="mbm-head"><i style="background:${a.hex}"></i><b>Claude ${name}</b><span>${a.plan}</span></div>` +
    (sb.length ? `<div class="mbm-acc"><i></i>${shortName(a.email)} <span>· in use</span></div>` : "") +
    (a.five >= 100 ? `<div class="mbm-sub hot">5-hour full · in ${countdownWords(a.fiveLeftMin)}</div>` : "") +
    row("5-hour", a.five, a.five >= 100 ? "full" : `resets ${when(a.fiveLeftMin)}`, a.five >= 100) +
    row("Week", a.week, `resets ${when(a.weekLeftMin)}`, false) +
    (fableShown(id) ? row("Fable", a.fable!, `resets ${when(a.fableLeftMin)}`, false) : "") +
    (a.credits != null ? `<div class="mbm-sub credit">Using usage credits · $${a.credits.toFixed(2)} spent</div>` : "") +
    `<div class="mbm-sub">Read ${a.updated}</div><hr>` + switching +
    ["Open Claude window", "Refresh now"].map((t) => `<button type="button" class="mbm-it" data-mbm="${t}">${t}</button>`).join("") + "<hr>" +
    ["Dashboard", "Profile settings…"].map((t) => `<button type="button" class="mbm-it" data-mbm="${t}">${t}</button>`).join("") +
    `<hr><button type="button" class="mbm-it" data-mbm="hide">Hide from the menu bar</button>`;
}
