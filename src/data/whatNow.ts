// "What this does now": after a change to a setting that has no picture of its own, a small panel says in
// plain words what the setting now does. It is an overlay at the bottom centre of the app window (see
// .whatnow in app.css), so it never takes layout space and nothing moves when it appears. One at a time:
// the next change replaces it. It stays 6 s (the timer restarts on each change; it waits while the pointer
// or keyboard focus is on it), and the × closes it. The region is aria-live="polite".

import { emailsHTML } from "./emails";

const HOLD_MS = 6000;
const w = window as any;
let timer = 0;

const card = () => document.querySelector<HTMLElement>("[data-whatnow]");

function hide() {
  clearTimeout(timer);
  const c = card();
  if (!c) return;
  c.classList.remove("show");
  // empty the live region once it has faded, so a screen reader doesn't find stale text
  window.setTimeout(() => { if (!c.classList.contains("show")) { c.querySelector(".wn-t")!.textContent = ""; c.querySelector(".wn-d")!.textContent = ""; } }, 400);
}

function arm() {
  clearTimeout(timer);
  timer = window.setTimeout(() => {
    const c = card();
    if (c && (c.matches(":hover") || c.matches(":focus-within"))) arm();   // hover keeps it
    else hide();
  }, HOLD_MS);
}

/** Shows "<setting> · <value>" (just "<setting>" without a value) in bold and the description under it. */
export function showWhatNow(setting: string, value: string, text: string) {
  const c = card();
  if (!c) return;
  // an address in either line reads "hidden address" while Show emails is off
  c.querySelector(".wn-t")!.innerHTML = emailsHTML(value ? `${setting} · ${value}` : setting);
  c.querySelector(".wn-d")!.innerHTML = emailsHTML(text);
  c.classList.add("show");
  arm();
}

export function initWhatNow() {
  if (w.__clWhatNow) return;
  w.__clWhatNow = true;
  document.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("[data-whatnow-close]")) hide(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && card()?.classList.contains("show")) hide(); });
  document.addEventListener("astro:before-swap", () => clearTimeout(timer));
}
