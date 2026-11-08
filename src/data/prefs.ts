// The demo's Settings, per profile, remembered in this browser (like the app's accounts.json, but local
// to the visitor). Applied on every page: icon style and colour (Dock, cards, strip, launcher), profile colour, the card style, the
// Claude open dot, how long a Dock click shows the usage before opening Claude, and what a profile includes
// (Usage in the Dock, Claude window).
import { accounts, type AccountId } from "./demo";
import { limitsHTML, backWords, cardExtrasHTML, type Design } from "./panelView";
import manifest from "./icon-manifest.json";   // written by scripts/render-icons.sh

export const styles = [
  ["bars", "Two numbers"], ["rings", "Rings"], ["number", "Big number"],
  ["twinRings", "Twin rings"], ["segmented", "Segmented"], ["pace", "Pace bars"],
  ["statusTile", "Tile"], ["gauge", "Gauge"], ["worst", "Worst"], ["statusBar", "Tile + bar"],
  ["thinBars", "Bars"], ["batteries", "Batteries"], ["gaugeBar", "Gauge + bar"],
] as const;
export type Style = (typeof styles)[number][0];

// The ten profile colours (hue order, no plain red or green: those mean usage levels), as in the app.
export const colors: Record<string, string> = {
  orange: "#d97757", yellow: "#eab308", lime: "#84cc16", teal: "#14b8a6", cyan: "#06b6d4",
  blue: "#3b82f6", indigo: "#6366f1", purple: "#8b5cf6", fuchsia: "#d946ef", pink: "#ec4899",
};
// The icon's own colour and frame: the same plus graphite and "by usage" (follows the 5-hour level).
export const tileColors: Record<string, string> = { ...colors, graphite: "#3f3f46", usage: "usage" };
const levelHex = (p: number) => (p >= 95 ? "#eb445b" : p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");

export type Prefs = {
  name: string; label: string; color: keyof typeof colors | string; style: Style;
  click: string; peek: number; hold: boolean; window: string;
  refresh: string; notify: boolean; notifyAt: number; login: boolean; renew: boolean; panel: string;
  dataDir: string;         // the separate Claude window's data folder (a name under ~/Library/Application Support)
  iconColor: string;       // the icon's colour (Settings ▸ Dock icon ▸ Colour): picks the rendered picture (see iconSrc)
  frame: string;           // "" = no frame, else a tile colour; drawn as a ring over the icons in CSS
  dot: boolean;            // Claude open dot: an orange dot on the icon while the profile's Claude window is open
  showInDock: boolean;     // Dock icon ▸ Usage in the Dock: a Dock icon shows the usage (off: read in the background)
  win: boolean;            // Claude window ▸ Claude window: the profile has one (off: none; both off = usage only)
  dockRuns: DockRuns;      // Dock icon ▸ Runs: At login, With its window, When started (26.10.11)
  windowFollows: boolean;  // Claude window ▸ With Dock icon: opens and quits with the Dock icon
  opensFromDock: boolean;  // Claude window ▸ Opens from: Dock click too (true) or Only when asked (26.11.0)
  notifyBack: boolean;     // Alerts ▸ Notify when back: one alert when a full limit resets
  iconFollows?: boolean;   // before 26.10.11 (read once to carry it over into dockRuns)
  showFable: boolean;      // Profile ▸ Fable's limit: shown and alerted (only where the plan has one; 26.11.0)
  mb: MenuBarLook;         // Menu bar (26.11.0)
};
export type DockRuns = "login" | "window" | "started";
/** A profile's menu bar icon, as the app's MenuBar card: on or off, a style, colours, label and what a full limit shows. */
export type MenuBarStyle = "bars" | "barsNumber" | "ring" | "ringNumber" | "number" | "twoNumbers";
export type MenuBarLook = { on: boolean; style: MenuBarStyle; colours: "levels" | "system" | "accent" | "profile"; label: boolean; whenFull: "countdown" | "red" };
export const menuBarFamilies: [string, [MenuBarStyle, string][]][] = [
  ["Bars", [["bars", "Two bars"], ["barsNumber", "Bars + number"]]],
  ["Rings", [["ring", "Ring"], ["ringNumber", "Ring + number"]]],
  ["Numbers", [["number", "Number"], ["twoNumbers", "Two numbers"]]],
];
const mbOn = (on: boolean): MenuBarLook => ({ on, style: "bars", colours: "levels", label: true, whenFull: "countdown" });
export const dockRunsChoices: [DockRuns, string][] = [["login", "At login"], ["window", "With its window"], ["started", "When started"]];

const defaults: Record<AccountId, Prefs> = {
  home: { name: "home", label: "HOME", color: "orange", style: "bars", click: "Usage, then Claude", peek: 3, hold: true, window: "Standard", refresh: "5 min", notify: true, notifyAt: 90, login: true, renew: false, panel: "segments", dataDir: "Claude", iconColor: "orange", frame: "", dot: true, showInDock: true, win: true, dockRuns: "login", windowFollows: false, opensFromDock: true, notifyBack: true, showFable: true, mb: mbOn(true) },
  work: { name: "work", label: "WORK", color: "teal", style: "rings", click: "Usage, then Claude", peek: 3, hold: true, window: "Separate", refresh: "5 min", notify: true, notifyAt: 85, login: true, renew: true, panel: "rings", dataDir: "Claude-work", iconColor: "teal", frame: "", dot: true, showInDock: true, win: true, dockRuns: "login", windowFollows: false, opensFromDock: true, notifyBack: true, showFable: true, mb: mbOn(true) },
  side: { name: "side", label: "SIDE", color: "purple", style: "statusBar", click: "Usage, then Claude", peek: 3, hold: false, window: "Separate", refresh: "10 min", notify: false, notifyAt: 90, login: false, renew: false, panel: "glow", dataDir: "Claude-side", iconColor: "purple", frame: "", dot: true, showInDock: true, win: true, dockRuns: "started", windowFollows: false, opensFromDock: true, notifyBack: true, showFable: true, mb: mbOn(false) },
};

/** The profiles' order (26.11.0): set by dragging a profile's tile along the Settings strip. The dashboard, the
 *  launcher, the menu bar icons, the widget and the history follow it; the Dock icons stay where they are. */
const ORDER_KEY = "cl_audit.order";
export function loadOrder(): AccountId[] {
  const ids = accounts.map((a) => a.id);
  try {
    const v = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
    if (Array.isArray(v)) return [...v.filter((x) => ids.includes(x)), ...ids.filter((x) => !v.includes(x))] as AccountId[];
  } catch {}
  return ids;
}
export function saveOrder(o: AccountId[]) { try { localStorage.setItem(ORDER_KEY, JSON.stringify(o)); } catch {} }
/** A list of profiles (anything with an id) in the chosen order. */
export function ordered<T extends { id: string }>(list: T[]): T[] {
  const o = loadOrder();
  return [...list].sort((a, b) => o.indexOf(a.id as AccountId) - o.indexOf(b.id as AccountId));
}
/** Puts the elements matching sel (siblings in a row, each with its profile id in attr) in the chosen order. */
function reorder(sel: string, attr: string, after?: (el: HTMLElement, i: number) => void) {
  const o = loadOrder(), groups = new Map<Element, HTMLElement[]>();
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    const g = groups.get(el.parentElement!) ?? []; g.push(el); groups.set(el.parentElement!, g);
  });
  for (const els of groups.values()) {
    const anchor = els[els.length - 1].nextSibling, parent = els[0].parentElement!;
    const rank = (el: HTMLElement) => o.indexOf(el.getAttribute(attr) as AccountId);
    [...els].sort((a, b) => rank(a) - rank(b)).forEach((el, i) => { parent.insertBefore(el, anchor); after?.(el, i); });
  }
}

/** General ▸ How usage looks ▸ Widget: how the "Claude usage" widget draws the limits, and its look (26.11.0). */
export type WidgetLook = { design: Design; plate: "system" | "std" | "black" | "silver" };
const WIDGET_KEY = "cl_audit.widget";
export function loadWidget(): WidgetLook {
  try { const v = JSON.parse(localStorage.getItem(WIDGET_KEY) || "null"); if (v && typeof v === "object") return { design: "segments", plate: "std", ...v }; } catch {}
  return { design: "segments", plate: "std" };
}
export function saveWidget(w: WidgetLook) { try { localStorage.setItem(WIDGET_KEY, JSON.stringify(w)); } catch {} }

/** General settings ▸ Dashboard cards: one card style for every profile card (dashboard and Overview). */
const CARD_KEY = "cl_audit.cardStyle";
const cardDesigns = ["glow", "rings", "numbers", "segments", "pace"];
export function loadCardStyle(): Design {
  try { const v = localStorage.getItem(CARD_KEY); if (v && cardDesigns.includes(v)) return v as Design; } catch {}
  return "segments";
}
export function saveCardStyle(d: Design) {
  try { localStorage.setItem(CARD_KEY, d); } catch {}
}

/** General settings ▸ App icon: cl_audit's own icon (images drawn by the app: build/UsageDock --render-app-icon). */
export const appIconStyles: [string, string][] = [["panel", "Front panel"], ["stack", "Stack"], ["meter", "VU meter"], ["levels", "Level meter"], ["knob", "Knob"], ["monogram", "Monogram"]];
export const panelChoices: [keyof AppIcon, string, [string, string][]][] = [
  ["plate", "Plate", [["grey", "Grey"], ["greyLit", "Lit frame"], ["orange", "Orange"]]],
  ["display", "Display", [["cyan", "Cyan"], ["bluish", "Bluish"], ["orange", "Orange"], ["levels", "Levels"]]],
  ["keys", "Keys", [["classic", "Classic"], ["graphite", "Graphite"], ["strip", "Strip"], ["round", "Round"], ["tonal", "Plate"], ["wide", "Wide"]]],
  ["slot", "Slot", [["lit", "Lit"], ["light", "Light"], ["dark", "Dark"]]],
];
export type AppIcon = { style: string; plate: string; display: string; keys: string; slot: string };
const APP_ICON_KEY = "cl_audit.appIcon";
export const appIconDefault: AppIcon = { style: "panel", plate: "grey", display: "cyan", keys: "classic", slot: "lit" };
export function loadAppIcon(): AppIcon {
  try { const v = JSON.parse(localStorage.getItem(APP_ICON_KEY) || "null"); if (v && typeof v === "object") return { ...appIconDefault, ...v }; } catch {}
  return { ...appIconDefault };
}
export function saveAppIcon(a: AppIcon) { try { localStorage.setItem(APP_ICON_KEY, JSON.stringify(a)); } catch {} }
export const appIconSrc = (a: AppIcon) =>
  `/img/app-icons/${a.style === "panel" ? `panel-${a.plate}-${a.display}-${a.keys}-${a.slot}` : a.style}.png`;

/** The app offers these refresh intervals. */
export const refreshChoices = ["2 min", "5 min", "10 min", "15 min"];

const KEY = "cl_audit.settings.v4"; // v4: the usage shows for 3 s by default

export function loadPrefs(): Record<AccountId, Prefs> {
  let saved: Partial<Record<AccountId, Partial<Prefs>>> = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const out = {} as Record<AccountId, Prefs>;
  for (const a of accounts) {
    const sv = saved[a.id] ?? {};
    out[a.id] = { ...defaults[a.id], ...sv };   // fields added later get their defaults
    out[a.id].mb = { ...defaults[a.id].mb, ...(sv.mb ?? {}) };
    // carried over as the app does (26.10.11): Open at login on → At login; "start or quit the Dock icon too" → With
    // its window; both off → When started ("open or quit the Claude window too" stays the window switch)
    if (sv.dockRuns === undefined && (sv.login !== undefined || sv.iconFollows !== undefined))
      out[a.id].dockRuns = sv.login ? "login" : sv.iconFollows ? "window" : "started";
    if (!refreshChoices.includes(out[a.id].refresh)) out[a.id].refresh = "2 min";   // earlier versions offered 1 min
  }
  return out;
}

export function savePrefs(p: Record<AccountId, Prefs>) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

/**
 * The icon pictures are rendered by the app (scripts/render-icons.sh), one per colour for the styles the
 * colour changes (the manifest lists them); the other styles have one picture for every colour. "By usage"
 * and graphite draw the same picture, except for a style whose tile follows the 5-hour level.
 */
const tintStyles: string[] = manifest.tintStyles;
const usageStyles: string[] = manifest.usageStyles;
const colourPart = (style: Style, color: string) =>
  !tintStyles.includes(style) ? "" : `-${color === "usage" && !usageStyles.includes(style) ? "graphite" : color in tileColors ? color : "orange"}`;
export const iconSrc = (id: AccountId, style: Style, color: string = defaults[id].iconColor) => `/img/acc/${id}-${style}${colourPart(style, color)}.png`;
export const laneSrc = (id: AccountId, style: Style, i: number | string, color: string = defaults[id].iconColor) => `/img/acc/lane-${id}-${style}${colourPart(style, color)}-${i}.png`;
export const defaultStyle = (id: AccountId) => defaults[id].style;
export const defaultColor = (id: AccountId) => colors[defaults[id].color];

/** Puts the saved choices on the page: icons, profile colours, names. */
export function applyPrefs(p = loadPrefs()) {
  const root = document.documentElement;
  // the Dock's cl_audit tile shows the chosen app icon, as in the app while it runs
  document.querySelectorAll<HTMLImageElement>("[data-front-app] img").forEach((img) => (img.src = appIconSrc(loadAppIcon())));
  for (const a of accounts) {
    const pr = p[a.id];
    root.style.setProperty(`--acc-${a.id}`, colors[pr.color] ?? pr.color);
    root.classList.toggle(`dot-${a.id}`, pr.dot && pr.win);   // no window, no Claude open dot
    root.style.setProperty(`--frame-${a.id}`, a.five >= 100 ? "transparent" : pr.frame ? (pr.frame === "usage" ? levelHex(a.five) : tileColors[pr.frame] ?? "transparent") : "transparent");
    // the two switches in Profile: without a Claude window a card has no window switch and no Open/Show window;
    // with both off (usage only) one display says so instead of the switches, and only "⋯" is left.
    // In the Dock: no Dock icon tile without Usage in the Dock, no Claude tile without a Claude window.
    const usageOnly = !pr.showInDock && !pr.win;
    document.querySelectorAll<HTMLElement>(`.acc[data-account="${a.id}"]`).forEach((c) => {
      c.classList.toggle("no-window", !pr.win && !usageOnly);
      c.classList.toggle("usage-only", usageOnly);
    });
    document.querySelectorAll<HTMLElement>(`.dock-item[data-pop="${a.id}"]`).forEach((t) => (t.hidden = !pr.showInDock));
    document.querySelectorAll<HTMLElement>(`.dock-item[data-open-desktop="${a.id}"]`).forEach((t) => (t.hidden = !pr.win));
    document.querySelectorAll<HTMLImageElement>(`img[data-acc-icon="${a.id}"]`).forEach((img) => {
      // while a limit is full the Dock icon is the countdown, whatever the style (the demo's full profile)
      const src = a.five >= 100 ? a.icon : iconSrc(a.id, pr.style, pr.iconColor);
      if (img.getAttribute("src") !== src) img.src = src;
    });
  }
  // the card style: every profile card draws its two limits in it
  // Profile ▸ Fable's limit: published for panelView (which draws the Fable row) before anything is redrawn
  (window as any).clShowFable = Object.fromEntries(accounts.map((a) => [a.id, p[a.id].showFable]));
  const design = loadCardStyle();
  document.querySelectorAll<HTMLElement>("[data-card-limits]").forEach((el) => {
    const id = el.dataset.cardLimits as AccountId, key = `${design}:${p[id].showFable ? 1 : 0}`;
    if (el.dataset.design === key) return;
    el.dataset.design = key;
    el.innerHTML = limitsHTML(id, design, false) + cardExtrasHTML(id, design);
  });
  // the profiles' order (26.11.0): dashboard keys and cards, the history's legend, the launcher (its ⌘1, ⌘2… follow)
  // and the Settings strip; never the Dock
  reorder(".dash-bar [data-chip]", "data-chip");
  reorder(".dash-cards > [data-account]", "data-account");
  reorder(".legend-item[data-account]", "data-account");
  reorder(".mini-palette > .row[data-open-desktop]", "data-open-desktop", (el, i) => { const k = el.querySelector(".kbd"); if (k) k.textContent = `⌘${i + 1}`; el.classList.toggle("sel", i === 0); });
  reorder(".settings .strip [data-select-acc]:not([data-select-acc='general'])", "data-select-acc");
  // the profiles' menu bar icons in the site's menu bar (26.11.0)
  (window as any).clMenuBar?.(p);
  // "back at 15:28": counted from the visitor's clock (the demo's full limit resets this many minutes from now)
  document.querySelectorAll<HTMLElement>("[data-back-min]").forEach((el) => (el.textContent = backWords(+el.dataset.backMin!)));
  (window as any).clPeekMs = (id: AccountId) => Math.round((p[id]?.peek ?? 0.75) * 1000) + 400;
  (window as any).clClick = (id: AccountId) => p[id]?.click ?? "Usage, then Claude";
  let showEmails = true;
  try { showEmails = localStorage.getItem("cl_audit.showEmails") !== "0"; } catch {}
  root.classList.toggle("hide-emails", !showEmails);
  // General ▸ Privacy ▸ Usage history (26.11.0): off, no session file is read, so the dashboard's history is hidden
  let history = true;
  try { history = localStorage.getItem("cl_audit.usageHistory") !== "0"; } catch {}
  root.classList.toggle("no-history", !history);
}
