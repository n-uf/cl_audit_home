// The dashboard cards' two switches, working in the demo (client side only): a profile's Claude window
// (open or quit) and its Dock icon (start or quit). A flipped switch shows its target at once, with a
// spinner for a moment ("opening…", "quitting…", "starting…"), then the final state. Opening and closing
// (Settings) is followed too: the Dock icon quits 10 s after the window, the window opens when the Dock
// icon starts, and so on. The state lives on window, so it survives page changes (not a reload).
import { accounts, type AccountId } from "./demo";
import { loadPrefs } from "./prefs";

type S = { win: boolean; dock: boolean; winBusy?: "opening" | "quitting"; dockBusy?: "starting" | "quitting"; quitAt?: number };

const BUSY_MS = 1200;
const QUIT_AFTER_S = 10;   // the Dock icon quits this long after its Claude window

const w = window as any;
const state: Record<string, S> = (w.__clState ??= Object.fromEntries(accounts.map((a) => [a.id, { win: !!a.winOpen, dock: true }])));
let ticker = 0;

const follows = (id: string) => loadPrefs()[id as AccountId];

function winSub(s: S) {
  return s.winBusy === "opening" ? "opening…" : s.winBusy === "quitting" ? "quitting…" : s.win ? "open" : "closed";
}
function dockSub(id: string, s: S) {
  if (s.dockBusy === "starting") return "starting…";
  if (s.dockBusy === "quitting") return "quitting…";
  if (s.dock && s.quitAt) {
    const t = (s.quitAt - Date.now()) / 1000;
    return t < 0.5 ? "quitting…" : `quits in ${Math.ceil(t)} s`;
  }
  if (s.dock) return "running";
  return follows(id).iconFollows && !s.win && !s.winBusy ? "waits for the window" : "stopped · no alerts";
}

function paint(chip: HTMLElement | null, sw: HTMLElement | null, on: boolean, busy: boolean, sub: string) {
  if (!chip || !sw) return;
  chip.classList.toggle("off", !on);
  sw.classList.toggle("on", on);
  sw.classList.toggle("busy", busy);
  sw.setAttribute("aria-checked", String(on));
  sw.toggleAttribute("aria-busy", busy);
  (sw as HTMLButtonElement).disabled = busy;
  const el = chip.querySelector<HTMLElement>("[data-sub]");
  if (el && el.textContent !== sub) el.textContent = sub;
}

export function renderCards() {
  const root = document.documentElement;
  for (const a of accounts) {
    const s = state[a.id];
    root.classList.toggle(`win-${a.id}`, s.win && !s.winBusy);
    document.querySelectorAll<HTMLElement>(`.acc[data-account="${a.id}"]`).forEach((card) => {
      const winOn = s.winBusy ? s.winBusy === "opening" : s.win;
      const dockOn = s.dockBusy ? s.dockBusy === "starting" : s.dock;
      paint(card.querySelector("[data-chip-w]"), card.querySelector("[data-win-switch]"), winOn, !!s.winBusy, winSub(s));
      paint(card.querySelector("[data-chip-d]"), card.querySelector("[data-dock-switch]"), dockOn, !!s.dockBusy, dockSub(a.id, s));
      const b = card.querySelector<HTMLElement>("[data-open-label]");
      const label = s.win ? "Show window" : "Open window";
      if (b && b.textContent !== label) b.textContent = label;
    });
    document.querySelectorAll<HTMLElement>(`[data-win-badge="${a.id}"]`).forEach((b) => (b.hidden = !(s.win && !s.winBusy)));
  }
}

function tick() {
  const any = Object.values(state).some((s) => s.quitAt);
  if (!any) { clearInterval(ticker); ticker = 0; }
  renderCards();
}
function startTicker() { if (!ticker) ticker = window.setInterval(tick, 500); }

export function setWin(id: string, on: boolean, byFollow = false) {
  const s = state[id];
  if (!s || s.winBusy || s.win === on) return;
  s.winBusy = on ? "opening" : "quitting";
  if (!on) document.querySelector(`.dapp[data-desktop="${id}"]`)?.setAttribute("hidden", "");
  renderCards();
  setTimeout(() => {
    s.win = on; s.winBusy = undefined;
    renderCards();
    if (byFollow) return;
    const pr = follows(id);
    if (on) {
      s.quitAt = undefined;   // opened again before the Dock icon quit
      if (pr.iconFollows && !s.dock && !s.dockBusy) setDock(id, true, true);
    } else if (pr.iconFollows && s.dock && !s.dockBusy) {
      s.quitAt = Date.now() + QUIT_AFTER_S * 1000;
      startTicker();
      setTimeout(() => { if (s.quitAt && Date.now() >= s.quitAt - 50) { s.quitAt = undefined; setDock(id, false, true); } }, QUIT_AFTER_S * 1000);
    }
    renderCards();
  }, BUSY_MS);
}

export function setDock(id: string, on: boolean, byFollow = false) {
  const s = state[id];
  if (!s || s.dockBusy || s.dock === on) return;
  s.quitAt = undefined;
  s.dockBusy = on ? "starting" : "quitting";
  renderCards();
  setTimeout(() => {
    s.dock = on; s.dockBusy = undefined;
    renderCards();
  }, BUSY_MS);
  if (!byFollow) {
    const pr = follows(id);
    if (pr.windowFollows && pr.window !== "None") setTimeout(() => setWin(id, on, true), 0);
  }
}

export const isWindowOpen = (id: string) => !!state[id]?.win;

/** Registers the click handling once and paints the cards of the page that just loaded. */
export function initCards() {
  if (!w.__clCardsInit) {
    w.__clCardsInit = true;
    document.addEventListener("click", (e) => {
      const t = e.target as HTMLElement;
      let b: HTMLElement | null;
      if ((b = t.closest("[data-win-switch]"))) { setWin(b.dataset.winSwitch!, !state[b.dataset.winSwitch!].win); return; }
      if ((b = t.closest("[data-dock-switch]"))) { setDock(b.dataset.dockSwitch!, !state[b.dataset.dockSwitch!].dock); return; }
      // Open window / Show window, the launcher rows and the Dock's Claude tiles open the demo window
      if ((b = t.closest("[data-open-desktop]"))) {
        const id = b.dataset.openDesktop!;
        setTimeout(() => {
          const panel = document.querySelector<HTMLElement>(`.dapp[data-desktop="${id}"]`);
          if (panel && !panel.hidden && !state[id].win) setWin(id, true);
        }, 0);
        return;
      }
      // "Profile settings…" opens Settings on that profile
      if ((b = t.closest("[data-profile-settings]"))) { try { sessionStorage.setItem("cl_audit.settingsProfile", b.dataset.profileSettings!); } catch {} }
      // the card's "⋯" menu
      const menuBtn = t.closest<HTMLElement>("[data-more]");
      document.querySelectorAll<HTMLElement>(".more-menu").forEach((m) => {
        const mine = menuBtn && menuBtn.parentElement === m.parentElement;
        const open = mine ? m.hidden : false;
        m.hidden = !open;
        m.parentElement?.querySelector("[data-more]")?.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") document.querySelectorAll<HTMLElement>(".more-menu").forEach((m) => (m.hidden = true));
    });
  }
  renderCards();
  if (Object.values(state).some((s) => s.quitAt)) startTicker();
}
