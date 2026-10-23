// The demo's Settings, per account, remembered in this browser (like the app's accounts.json, but local
// to the visitor). Applied on every page: icon style (Dock, cards, strip, launcher), account colour, and
// how long a Dock click shows the usage before opening Claude.
import { accounts, type AccountId } from "./demo";

export const styles = [
  ["bars", "Two numbers"], ["rings", "Rings"], ["number", "Big number"],
  ["twinRings", "Twin rings"], ["segmented", "Segmented"], ["pace", "Pace bars"],
  ["statusTile", "Tile"], ["gauge", "Gauge"], ["worst", "Worst"], ["statusBar", "Tile + bar"],
  ["thinBars", "Bars"], ["batteries", "Batteries"], ["gaugeBar", "Gauge + bar"],
] as const;
export type Style = (typeof styles)[number][0];

export const colors: Record<string, string> = { orange: "#d97757", blue: "#3b82f6", purple: "#8b5cf6", teal: "#14b8a6", pink: "#ec4899" };

export type Prefs = {
  name: string; label: string; color: keyof typeof colors | string; style: Style;
  click: string; peek: number; hold: boolean; window: string;
  refresh: string; notify: boolean; notifyAt: number; login: boolean; renew: boolean; panel: string;
};

const defaults: Record<AccountId, Prefs> = {
  home: { name: "home", label: "HOME", color: "orange", style: "bars", click: "Usage, then Claude", peek: 3, hold: true, window: "Standard", refresh: "5 min", notify: true, notifyAt: 90, login: true, renew: false, panel: "segments" },
  work: { name: "work", label: "WORK", color: "teal", style: "rings", click: "Usage, then Claude", peek: 3, hold: true, window: "Separate", refresh: "5 min", notify: true, notifyAt: 85, login: true, renew: true, panel: "rings" },
  side: { name: "side", label: "SIDE", color: "purple", style: "statusBar", click: "Usage, then Claude", peek: 3, hold: false, window: "Separate", refresh: "10 min", notify: false, notifyAt: 90, login: false, renew: false, panel: "glow" },
};

const KEY = "cl_audit.settings.v4"; // v4: the usage shows for 3 s by default

export function loadPrefs(): Record<AccountId, Prefs> {
  let saved: Partial<Record<AccountId, Partial<Prefs>>> = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const out = {} as Record<AccountId, Prefs>;
  for (const a of accounts) out[a.id] = { ...defaults[a.id], ...(saved[a.id] ?? {}) };
  return out;
}

export function savePrefs(p: Record<AccountId, Prefs>) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

export const iconSrc = (id: AccountId, style: Style) => `/img/acc/${id}-${style}.png`;
export const laneSrc = (id: AccountId, style: Style, i: number) => `/img/acc/lane-${id}-${style}-${i}.png`;
export const defaultStyle = (id: AccountId) => defaults[id].style;
export const defaultColor = (id: AccountId) => colors[defaults[id].color];

/** Puts the saved choices on the page: icons, account colours, names. */
export function applyPrefs(p = loadPrefs()) {
  const root = document.documentElement;
  for (const a of accounts) {
    const pr = p[a.id];
    root.style.setProperty(`--acc-${a.id}`, colors[pr.color] ?? pr.color);
    document.querySelectorAll<HTMLImageElement>(`img[data-acc-icon="${a.id}"]`).forEach((img) => {
      const src = iconSrc(a.id, pr.style);
      if (img.getAttribute("src") !== src) img.src = src;
    });
  }
  (window as any).clPeekMs = (id: AccountId) => Math.round((p[id]?.peek ?? 0.75) * 1000) + 400;
  (window as any).clClick = (id: AccountId) => p[id]?.click ?? "Usage, then Claude";
  let showEmails = true;
  try { showEmails = localStorage.getItem("cl_audit.showEmails") !== "0"; } catch {}
  root.classList.toggle("hide-emails", !showEmails);
}
