// The split by hand, in two names (cl_audit's approved Accounts sketch, docs/design/accounts-two-apps-sketch.html at
// 97ebf0a): the Claude app (its window, Code tab included) is on the profile's account, while Terminal (the claude
// command: Claude Code's own sign-in on the profile's folder, the one cl_audit reads usage through) is signed in to
// another. An amber warning, not red: Terminal's numbers still work, they are just another account's.
//
// A demo state, kept on window like the cards' switches (so it survives page changes, not a reload): Settings ▸ Accounts,
// the dashboard card, the menu bar menu and the Dock icon's panel all show it at once. Only "work" can be put in it: the
// demo's Switch page is work's, and its "Sign the app in" opens the Switch page's finish line on Terminal's account.
// Sample data only.
import type { AccountId, Standby } from "./demo";

/** The profile the demo's Split key puts in the split. */
export const SPLIT_PROFILE: AccountId = "work";
/** Terminal's account in the split: one the profile doesn't list on standby (the finish line's target). */
export const TERMINAL: Standby = { email: "team-4@work.example", plan: "Team", lastInUse: "", lastWeek: 0 };

/** The sketch's words (the final branch head is re-mirrored before the merge). */
export const SPLIT_WORDS = {
  head: "The Claude app and Terminal are signed in to different accounts.",   // words: SEO (v26.11.88)
  why: "cl_audit can read usage only through Terminal's sign-in, so the Claude app's account shows no numbers.",   // words: SEO (v26.11.88)
  fix: "Use the key on either account to put both on the same account.",   // words: SEO (v26.11.88)
  appKey: "Sign the app in",   // words: SEO (v26.11.88)
  terminalKey: "Sign Terminal in",   // words: SEO (v26.11.88)
  windowLine: "Claude window on another account",   // words: SEO (v26.11.88)
  panelKey: "Sign in",   // words: SEO (v26.11.88)
  terminal: "Terminal",   // words: SEO (v26.11.88)
  app: "App",   // words: SEO (v26.11.88)
};

const w = (typeof window !== "undefined" ? window : {}) as any;
const state = (): Record<string, boolean> => (w.__clSplit ??= {});
/** Whether a profile is in the split now. */
export const isSplit = (id: string) => !!state()[id];
/** Puts a profile in the split or takes it out; every surface hears it ("cl:split"). */
export function setSplit(id: string, on: boolean) {
  if (isSplit(id) === on) return;
  state()[id] = on;
  document.dispatchEvent(new CustomEvent("cl:split", { detail: id }));
}

/** The TERMINAL | APP badge: which of the two is signed in to this row's account (bright green), and which isn't (bright
 *  red, pointing at the exact app). `on`: "terminal" for Terminal's account, "app" for the Claude app's. */
export const twoNamesBadgeHTML = (on: "terminal" | "app") =>
  `<span class="disp xs tn-badge" role="img" aria-label="${on === "terminal" ? "Terminal signed in, the Claude app not" : "The Claude app signed in, Terminal not"}">` +
  `<span class="${on === "terminal" ? "g" : "r"}">${SPLIT_WORDS.terminal}</span><i aria-hidden="true"></i><span class="${on === "app" ? "g" : "r"}">${SPLIT_WORDS.app}</span></span>`;

/** The amber line on the dashboard card, the menu bar menu and the Dock panel: a link to the profile's Settings ▸ Accounts. */
export const windowLineHTML = (id: string) =>
  `<a class="amber-link" href="/settings/#accounts" data-profile-settings="${id}">${SPLIT_WORDS.windowLine} ›</a>`;   // words: SEO (v26.11.88)
