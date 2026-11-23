// The keys row of a dashboard card: Show window, Terminal, ⋯ and, while a limit is full, Switch account. Drawn from
// one spec, so the page (AccountCard.astro) and the script that changes a card's state use the same markup.
import { accounts, standby, offerOrder, rgbOf } from "./demo";
import { chevronHTML } from "./chevron";
import { emailHTML, emailsHTML, emailText, addressRowHTML, shortHTML } from "./emails";
import { SPLIT_WORDS } from "./split";

type Acc = (typeof accounts)[number];
export type KeysSpec = {
  lead?: "signin" | "refresh";     // a first key: the reddish Sign in…, or Refresh now (also in ⋯)
  keys: ("show" | "terminal")[];   // the keys after it, before ⋯
  /** What steps out of the row into ⋯. Refresh now and Profile settings… are always in ⋯, with a divider after what
   *  stepped out and one between them, as the app's menu has them. */
  more: ("show" | "terminal")[];
  terminalNote?: string;           // what Terminal's ⋯ item says about its sign-in, to its right
  switchMenu?: boolean;            // Switch account at the right end of the row, with its menu
};

/** Signed in: Show window and Terminal are keys, ⋯ holds Refresh now and Profile settings…. */
export const usualKeys: KeysSpec = { keys: ["show", "terminal"], more: [] };
/** A limit full: the row has no room for Terminal beside Switch account (the card is 340 pt wide in the app), so it
 *  steps into ⋯ meanwhile. */
export const fullKeys: KeysSpec = { keys: ["show"], more: ["terminal"], switchMenu: true };

/** Switch account, in cl_audit-quick's orange Download key face: at the right end of the row, under the full display and
 *  as wide as it. Its menu: the account in use (ticked, with its plan), the standby accounts by address only (they are
 *  never read, so nothing about their usage), then a way to sign in to one more. Picking a standby opens the Switch page
 *  with it picked. */
function switchMenuHTML(a: Acc) {
  const list = offerOrder(standby[a.id]);
  const sb = list.map((s) =>
    // (26.11.87, SwitchMenu: a standby row by its short name; hidden, the blurred stand-in, its address while highlighted)
    `<button type="button" role="menuitem" class="ni arow" data-card-switch="${a.id}" data-to="${s.email}"><span class="ck"></span><span class="nl">${addressRowHTML(s.email)}…</span><span class="nd"></span></button>`).join("");
  const title = list.length ? `Switch ${a.name} to another account` : `Sign in to another account for ${a.name}`;   // words: SEO
  return `<span class="offer2 under"><button type="button" class="disp xs trustlike sw-acc orangek" data-switch-menu aria-haspopup="menu" aria-expanded="false" title="${title}">Switch&nbsp;account&nbsp;${chevronHTML}</button>` +
    `<span class="nmenu" role="menu" hidden>` +
    `<div class="ni cur" role="menuitemradio" aria-checked="true"><span class="ck">✓</span><span class="nl">${shortHTML(a.email)}</span><span class="nd">${a.plan}</span></div>` +
    `<hr>${sb}${sb ? "<hr>" : ""}` +
    `<button type="button" role="menuitem" class="ni" data-card-signin-other="${a.id}"><span class="ck"></span><span class="nl">Sign in to another account…</span><span class="nd"></span></button>` +   // words: SEO
    `</span></span>`;
}

/** The card's account line: the lamp and the address (the stand-in while hidden: `.addr`); in the split, Terminal's
 *  account, named as whose the numbers are ("· Terminal", sketch 97ebf0a). */
export const inuseHTML = (email: string, terminal = false) =>
  `<i></i><span class="addr">${emailHTML(email)}</span>${terminal ? `<span class="inuse-tag">· ${SPLIT_WORDS.terminal}</span>` : ""}`;   // words: SEO (sketch 97ebf0a)

/** The row's markup. `open`: the profile's Claude window is open (the demo's starting state; cardState.ts keeps it up to
 *  date). `split`: the split by hand (data/split.ts): the window key is amber, since the window is what's out of line. */
export function cardKeysHTML(a: Acc, spec: KeysSpec, open = !!a.winOpen, split = false) {
  // its LED in the profile's own colour (26.11.85), lit while the window is open; the default colour until prefs apply
  const show = `<button type="button" class="pill small tint ${a.tint}${open ? "" : " unlit"}${split ? " amberk" : ""}" style="--tint:var(--acc-${a.id}-rgb, ${rgbOf(a.hex)})" data-open-desktop="${a.id}" data-open-label>${open ? "Show window" : "Open window"}</button>`;
  const terminal = `<button type="button" class="pill small" data-open-terminal="${a.id}">Terminal</button>`;
  // what stepped out of the row comes first, with its divider; a usage-only profile has neither a window nor Terminal,
  // so the group is hidden whole (app.css) and no divider is left behind
  const out = spec.more.map((m) => m === "show"
    ? `<button type="button" role="menuitem" data-open-desktop="${a.id}" data-open-label>${open ? "Show window" : "Open window"}</button>`
    : `<button type="button" role="menuitem" data-open-terminal="${a.id}">Terminal${spec.terminalNote ? `<small>${emailsHTML(spec.terminalNote)}</small>` : ""}</button>`).join("");
  const more = `<span class="more-wrap"><button type="button" class="pill small more-btn" data-more aria-haspopup="menu" aria-expanded="false" aria-label="More for ${a.name}" title="More for ${a.name}">⋯</button>` +
    `<span class="more-menu" role="menu" hidden>${out ? `<span class="more-out">${out}<hr></span>` : ""}` +
    `<button type="button" role="menuitem" data-refresh>Refresh now</button><hr><a role="menuitem" href="/settings/" data-profile-settings="${a.id}">Profile settings…</a></span></span>`;
  const lead = spec.lead === "signin" ? `<button type="button" class="pill small signin" data-card-signin="${a.id}" title="Sign Claude Code in Terminal in to ${emailText(a.email)}">Sign in</button>` :   // words: SEO (a key: no "…")
    spec.lead === "refresh" ? "<button type=\"button\" class=\"pill small\" data-refresh>Refresh now</button>" : "";
  return lead + spec.keys.map((k) => (k === "show" ? show : terminal)).join("") + more + (spec.switchMenu ? switchMenuHTML(a) : "");
}
