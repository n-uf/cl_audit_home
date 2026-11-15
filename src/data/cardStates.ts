// The states a dashboard card shows no numbers in. The rule behind them: the account in use is the Claude app's, and
// the card reads usage only through Claude Code in Terminal on the profile's one folder, so it shows numbers only when
// that is signed in to the same account. In every other state the usage slot says why, in a bold one-line heading about
// Terminal's sign-in and one sentence saying what to do, and the keys row changes to match. Red: the sign-in is on the
// wrong account or gone. Amber: the sign-in is fine but can't be read yet, or a switch is under way.
// Sample data only; every address is written in full, so Show emails off can mask it (data/emails.ts).
import { accounts } from "./demo";
import { blurEmails } from "./emails";
import { usualKeys, type KeysSpec } from "./cardKeys";

type Acc = (typeof accounts)[number];
export type CardStateKey = "split" | "out" | "expired" | "clash" | "mismatch" | "denied" | "unreadable" | "switching";
export type CardState = {
  label: string;                 // the demo row's key
  tone: "red" | "amber";         // the plan badge takes it
  out?: boolean;                 // signed out or expired: the account line gets a red lamp and a red address
  heading: (a: Acc) => string;
  sentence: (a: Acc) => string;
  keys: KeysSpec;
};

/** The demo's profile whose card the "Demo: other states" row changes. */
export const demoProfile = "home";

const OTHER = "other@example.com";   // an account the profile doesn't use: the one Terminal is on, or a switch is moving to
const work = accounts.find((x) => x.id === "work")!;   // another profile, whose account is in use there
const signInAs = (a: Acc) => `Sign in as ${a.email} to read ${a.name}'s usage.`;   // words: SEO

// ⋯ holds Show window and Terminal (then Refresh now and Profile settings…) while Sign in… leads the row
const signedOutKeys: KeysSpec = { lead: "signin", keys: [], more: ["show", "terminal"], terminalNote: "asks to sign in first" };   // words: SEO

export const cardStates: Record<CardStateKey, CardState> = {
  split: {
    label: "Split",   // words: SEO
    tone: "red",
    heading: () => `Terminal is signed in to ${OTHER}`,   // words: SEO
    sentence: signInAs,
    keys: { lead: "signin", keys: ["show"], more: ["terminal"], terminalNote: `signed in as ${OTHER}` },   // words: SEO
  },
  out: {
    label: "Signed out",   // words: SEO
    tone: "red",
    out: true,
    heading: () => "Terminal is signed out",   // words: SEO
    sentence: signInAs,
    keys: signedOutKeys,
  },
  expired: {
    label: "Expired",   // words: SEO
    tone: "red",
    out: true,
    heading: () => "Terminal's sign-in has expired",   // words: SEO
    sentence: signInAs,
    keys: signedOutKeys,
  },
  clash: {
    label: "Another profile's account",   // words: SEO
    tone: "red",
    heading: () => `Terminal is signed in to ${work.name}'s account`,   // words: SEO
    sentence: signInAs,
    keys: { lead: "signin", keys: ["show"], more: ["terminal", "-", "refresh", "settings"], terminalNote: `signed in as ${work.email} (${work.name})` },   // words: SEO
  },
  mismatch: {
    label: "Different account",   // words: SEO
    tone: "red",
    heading: () => "Terminal is signed in to another account",   // words: SEO
    sentence: signInAs,
    // the demo shows it on home, which has a window: Sign in…, Show window, and Terminal in ⋯ (a usage-only profile has
    // neither, and its ⋯ hides both); no note on Terminal, since the account it is signed in to isn't one the profile knows
    keys: { lead: "signin", keys: ["show"], more: ["terminal"] },
  },
  denied: {
    label: "Keychain denied",   // words: SEO
    tone: "amber",
    heading: () => "Can't read Terminal's sign-in yet",   // words: SEO
    sentence: () => "The Keychain didn't hand it over: unlock it, then Refresh now.",   // words: SEO
    keys: { lead: "refresh", keys: ["show"], more: ["terminal"] },
  },
  unreadable: {
    label: "Unreadable",   // words: SEO
    tone: "amber",
    heading: () => "Can't read Terminal's sign-in",   // words: SEO
    sentence: () => "Claude Code saved it in a form cl_audit doesn't know.",   // words: SEO
    keys: { lead: "refresh", keys: ["show"], more: ["terminal"] },
  },
  switching: {
    label: "One step left",   // words: SEO
    tone: "amber",
    heading: () => `Switching to ${OTHER}: one step left`,   // words: SEO
    sentence: () => `Sign the Claude app in to ${OTHER} to finish.`,   // words: SEO
    keys: usualKeys,   // no Sign in: cl_audit can't sign the app in
  },
};

/** The demo row's keys, in the table's order. */
export const cardStateKeys = Object.keys(cardStates) as CardStateKey[];

/** The usage slot's content: the heading, then the sentence. */
export const stateSlotHTML = (a: Acc, s: CardState) => `<p class="redline"><b>${blurEmails(s.heading(a))}</b><span>${blurEmails(s.sentence(a))}</span></p>`;
