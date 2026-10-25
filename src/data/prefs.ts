// The demo's Settings, per profile, remembered in this browser (like the app's accounts.json, but local
// to the visitor). Applied on every page: icon style and colour (Dock, cards, strip, launcher), profile colour, the card style, the
// Claude open dot, how long a Dock click shows the usage before opening Claude, and whether a profile has
// a Claude window at all.
import { accounts, type AccountId } from "./demo";
import { limitsHTML, type Design } from "./panelView";
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
const levelHex = (p: number) => (p >= 80 ? "#ef4444" : p >= 50 ? "#f59e0b" : "#22c55e");

export type Prefs = {
  name: string; label: string; color: keyof typeof colors | string; style: Style;
  click: string; peek: number; hold: boolean; window: string;
  refresh: string; notify: boolean; notifyAt: number; login: boolean; renew: boolean; panel: string;
  dataDir: string;         // the separate Claude window's data folder (a name under ~/Library/Application Support)
  iconColor: string;       // the icon's colour (Settings ▸ Icon): picks the rendered picture (see iconSrc)
  frame: string;           // "" = no frame, else a tile colour; drawn as a ring over the icons in CSS
  dot: boolean;            // Claude open dot: an orange dot on the icon while the profile's Claude window is open
  showInDock: boolean;     // Dock icon ▸ Show in the Dock
  iconFollows: boolean;    // Opening and closing: the Dock icon starts and quits with the Claude window
  windowFollows: boolean;  // Opening and closing: the Claude window opens and quits with the Dock icon
};

const defaults: Record<AccountId, Prefs> = {
  home: { name: "home", label: "HOME", color: "orange", style: "bars", click: "Usage, then Claude", peek: 3, hold: true, window: "Standard", refresh: "5 min", notify: true, notifyAt: 90, login: true, renew: false, panel: "segments", dataDir: "Claude", iconColor: "orange", frame: "", dot: true, showInDock: true, iconFollows: false, windowFollows: false },
  work: { name: "work", label: "WORK", color: "teal", style: "rings", click: "Usage, then Claude", peek: 3, hold: true, window: "Separate", refresh: "5 min", notify: true, notifyAt: 85, login: true, renew: true, panel: "rings", dataDir: "Claude-work", iconColor: "teal", frame: "", dot: true, showInDock: true, iconFollows: false, windowFollows: false },
  side: { name: "side", label: "SIDE", color: "purple", style: "statusBar", click: "Usage, then Claude", peek: 3, hold: false, window: "Separate", refresh: "10 min", notify: false, notifyAt: 90, login: false, renew: false, panel: "glow", dataDir: "Claude-side", iconColor: "purple", frame: "", dot: true, showInDock: true, iconFollows: false, windowFollows: false },
};

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

/** The app offers these refresh intervals. */
export const refreshChoices = ["2 min", "5 min", "10 min", "15 min"];

const KEY = "cl_audit.settings.v4"; // v4: the usage shows for 3 s by default

export function loadPrefs(): Record<AccountId, Prefs> {
  let saved: Partial<Record<AccountId, Partial<Prefs>>> = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const out = {} as Record<AccountId, Prefs>;
  for (const a of accounts) {
    out[a.id] = { ...defaults[a.id], ...(saved[a.id] ?? {}) };   // fields added later get their defaults
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
export const laneSrc = (id: AccountId, style: Style, i: number, color: string = defaults[id].iconColor) => `/img/acc/lane-${id}-${style}${colourPart(style, color)}-${i}.png`;
export const defaultStyle = (id: AccountId) => defaults[id].style;
export const defaultColor = (id: AccountId) => colors[defaults[id].color];

/** Puts the saved choices on the page: icons, profile colours, names. */
export function applyPrefs(p = loadPrefs()) {
  const root = document.documentElement;
  for (const a of accounts) {
    const pr = p[a.id];
    root.style.setProperty(`--acc-${a.id}`, colors[pr.color] ?? pr.color);
    root.classList.toggle(`dot-${a.id}`, pr.dot);
    root.style.setProperty(`--frame-${a.id}`, pr.frame ? (pr.frame === "usage" ? levelHex(a.five) : tileColors[pr.frame] ?? "transparent") : "transparent");
    // a profile without a Claude window has no window switch and no "Open window" on its card
    // every profile has a Claude window now (26.10.2); a choice of "None" saved by an older visit is ignored
    document.querySelectorAll<HTMLElement>(`.acc[data-account="${a.id}"]`).forEach((c) => c.classList.remove("no-window"));
    document.querySelectorAll<HTMLImageElement>(`img[data-acc-icon="${a.id}"]`).forEach((img) => {
      const src = iconSrc(a.id, pr.style, pr.iconColor);
      if (img.getAttribute("src") !== src) img.src = src;
    });
  }
  // the card style: every profile card draws its two limits in it
  const design = loadCardStyle();
  document.querySelectorAll<HTMLElement>("[data-card-limits]").forEach((el) => {
    if (el.dataset.design === design) return;
    el.dataset.design = design;
    el.innerHTML = limitsHTML(el.dataset.cardLimits as AccountId, design, false);
  });
  (window as any).clPeekMs = (id: AccountId) => Math.round((p[id]?.peek ?? 0.75) * 1000) + 400;
  (window as any).clClick = (id: AccountId) => p[id]?.click ?? "Usage, then Claude";
  let showEmails = true;
  try { showEmails = localStorage.getItem("cl_audit.showEmails") !== "0"; } catch {}
  root.classList.toggle("hide-emails", !showEmails);
}
