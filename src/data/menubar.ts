// A profile's menu bar icon (cl_audit 26.11.0), drawn the way the app's MenuBar.swift draws it, for the Settings demo's
// Menu bar card and the site's own menu bar. Styles: Two bars (5-hour over week), Bars + number, Ring (week outside,
// 5-hour inside), Ring + number, Number (the fuller limit), Two numbers. Colours: the level colours, System (the menu
// bar's own colour), Accent (the Mac's accent colour) or the profile's colour. A full limit shows the countdown beside
// the icon ("1h 42m"), or only turns red; in System it's never red (the countdown shows it).
import { accounts, standby, offerOrder, type AccountId } from "./demo";
import { backWords, countdownWords, fableShown } from "./panelView";
import { addressRowHTML, shortText } from "./emails";
import { TERMINAL, SPLIT_WORDS, windowLineHTML } from "./split";
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

/** The profile's own menu, opened from its menu bar icon (26.11.88, MenuBar.swift): its row (name, the account in use,
 *  the limits), then the accounts and the actions, as the Dock icon's menu has them. `open`: its Claude window is open;
 *  `win`: the profile has one (Claude window on); `split`: the split by hand (data/split.ts). */
export function menuHTML(id: AccountId, name: string, o: { open?: boolean; win?: boolean; split?: boolean } = {}) {
  const a0 = accounts.find((x) => x.id === id)!;
  // in the split the numbers are Terminal's account's (the sample figures), read through Terminal's sign-in
  const a = o.split ? { ...a0, five: 34, week: 61, fiveLeftMin: 192, weekLeftMin: 3 * 1440, credits: null } : a0;
  // a limit's line (MenuBarRow): its name, its bar, its share and when it resets, "in 1h 42m", or "back at 15:28" when full
  const row = (n: string, p: number, minLeft: number) =>
    `<div class="mbm-row"><span>${n}</span><span class="mbm-bar"><i style="width:${Math.min(100, p)}%;background:${level(p)}"></i></span><b style="color:${level(p)}">${p}%</b>` +
    `<span class="mbm-when">${p >= 100 ? backWords(minLeft) : `in ${countdownWords(minLeft)}`}</span></div>`;   // words: SEO (the app's, TimeWords)
  // (26.11.87, SwitchMenu: a row naming an account shows its short name; while addresses are hidden the blurred
  // stand-in, and the address only while the row is highlighted (.arow))
  const sw = (s: { email: string }) => `<button type="button" class="mbm-it arow" data-mbm="switch" data-to="${s.email}">${addressRowHTML(s.email)}</button>`;
  // the accounts (DockTileMenu.accounts): the account in use ticked, each standby account in the order a full limit offers
  // them (a click opens the Switch page with it picked), Sign in to another account…. In the split, the key: Claude Code's
  // own sign-in in Terminal with the app's account filled in ("Sign Terminal in to …"). Terminal's account in the
  // demo's split is one the profile doesn't list, so it has no row of its own.
  const accountRows =
    `<div class="mbm-it cur arow"><span class="ck">✓</span><span>${addressRowHTML(a.email)}</span></div>` +
    (o.split ? `<button type="button" class="mbm-it arow lined" data-mbm="signin"><span>${SPLIT_WORDS.terminalKey} to</span><span class="ad">${addressRowHTML(a.email)}</span><span>…</span></button>` : "") +   // words: SEO (v26.11.88, DockMenu.swift)
    offerOrder(standby[id]).map(sw).join("") +
    `<button type="button" class="mbm-it" data-mbm="addaccount">Sign in to another account…</button><hr>`;   // words: SEO (v26.11.88)
  const full = a.five >= 100;
  // the profile's light before its name (26.11.81, ProfileLED), in its colour as set in Settings; a full limit at the
  // right, in crimson, with the time to its reset (no plan here)
  return `<div class="mbm-head"><i class="pled" style="--c:${a.color}" aria-hidden="true"></i><b>Claude ${name}</b>${full ? `<span class="hot">5-hour full · in ${countdownWords(a.fiveLeftMin)}</span>` : ""}</div>` +   // words: SEO (the app's, FullLimit.title)
    // the account in use under the name, with its lamp and its short name (plain text: the menu is built each time it
    // opens, so the short name reads as the setting says then); in the split by hand Terminal's account, " · Terminal",
    // and the amber line, a link to Settings ▸ Accounts, under the numbers (they are that account's)
    (o.split ? `<div class="mbm-acc split"><i></i>${shortText(TERMINAL.email)} · ${SPLIT_WORDS.terminal}</div>`   // words: SEO (v26.11.88)
      : `<div class="mbm-acc"><i></i>${shortText(a.email)}</div>`) +
    row("5-hour", a.five, a.fiveLeftMin) +
    row("Week", a.week, a.weekLeftMin) +
    (fableShown(id) ? row("Fable", a.fable!, a.fableLeftMin) : "") +
    (a.credits != null ? `<div class="mbm-sub credit">Using usage credits · $${a.credits.toFixed(2)} spent</div>` : "") +
    (o.split ? `<div class="mbm-split">${windowLineHTML(id)}</div>` : "") +
    `<hr>` + accountRows +
    // the actions, as the Dock icon's menu has them (DockTileMenu.actions): Claude window ▸ (Open while it's closed;
    // Show and Quit while it's open), Quick chat (cl_quick's: it opens cl_quick, here its site), Refresh now
    (o.win !== false ? `<button type="button" class="mbm-it" data-mbm="winsub" aria-expanded="false">Claude window<span class="chev">›</span></button>` +   // words: SEO (the app's)
      `<div class="mbm-wsub" hidden>${(o.open ? [["win-show", "Show"], ["win-quit", "Quit"]] : [["win-open", "Open"]]).map(([k, t]) => `<button type="button" class="mbm-it" data-mbm="${k}">${t}</button>`).join("")}</div>` : "") +   // words: SEO (the app's)
    `<a class="mbm-it" data-mbm="quickchat" href="https://cl-quick.n-uf.com/" target="_blank" rel="noopener">Quick chat<span class="sr-only"> (opens in a new tab)</span></a>` +   // words: SEO (the app's)
    `<button type="button" class="mbm-it" data-mbm="Refresh now">Refresh now</button><hr>` +
    ["Dashboard", "Profile settings…"].map((t) => `<button type="button" class="mbm-it" data-mbm="${t}">${t}</button>`).join("") +
    `<hr><button type="button" class="mbm-it" data-mbm="hide">Hide from the menu bar</button>`;
}
