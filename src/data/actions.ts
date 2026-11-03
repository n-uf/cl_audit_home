// Action buttons inside use-case pages and articles: one about every 2–3 minutes of reading, placed right after a
// paragraph that names the need (an "anchor"), chosen at build time. They are plain server HTML, so nothing moves
// after the page loads and search engines see the same page as readers.
//
// How a place is picked: walk the text block by block, counting words. Every ~575 words (2.5 min at 230 words a
// minute, ± 20 % with a jitter seeded by the page, so pages differ but a page never changes between builds) look for
// the best anchor paragraph within ±160 words: one that mentions cl_audit scores higher than one that only names the
// topic. With no anchor there, take the end of the section before the next ## heading. Never in the opening answer
// (first 300 words), never in the last 250 words (the Download card follows), at least 400 words apart, at most 3.
import { download } from "./site";

const WPM = 230;
const MEAN = 2.5 * WPM;
const JITTER = 0.2;
const HEAD = 300, TAIL = 250, MIN_GAP = 400, WINDOW = 160, MAX = 3;

type Kind = "alerts" | "accounts" | "history" | "general";
interface Action { why: string[]; second: [label: string, href: string] }

// two wordings per kind, used in turn, so a page with two buttons of one kind doesn't repeat itself
const ACTIONS: Record<Kind, Action> = {
  alerts: { why: ["Get a Mac notification before a Claude limit is full, and another when it's back.", "See the countdown to your next Claude reset in the Dock, for every account."], second: ["How the alerts work", "/use-cases/claude-usage-limit-alerts/"] },
  accounts: { why: ["Give each Claude account its own window and Dock icon, side by side.", "Keep work and personal Claude accounts apart on one Mac, each with its own limits."], second: ["Multiple accounts", "/use-cases/multiple-claude-accounts/"] },
  history: { why: ["See your Claude Code usage by day, project and model.", "Every account's limits and your Claude Code history on one dashboard."], second: ["Demo dashboard", "/dashboard/"] },
  general: { why: ["See every Claude account's 5-hour and weekly limits in your Dock.", "Track Claude usage limits for all your accounts on your Mac. It's free.", "A free Mac app for Claude usage limits: one Dock icon per account."], second: ["Demo dashboard", "/dashboard/"] },
};
// topic words for each kind; a paragraph that also names cl_audit is a stronger anchor
// (words every page uses, like "profile" or "seat", are left out: they would win everywhere)
const TOPICS: [Kind, RegExp][] = [
  ["alerts", /\b(notif\w*|alerts?|notify when back|count(s|ing)? down|countdown|back at \d|resets?)\b/i],
  ["accounts", /\b(claude windows?|work and personal|personal and work|(several|multiple|two) (claude )?accounts|side by side|team seat)\b/i],
  ["history", /\b(usage history|tokens? per (day|hour)|by project|by model|session files|dashboard)\b/i],
];
/** A page's own topic, from its main keyword. */
function topicOf(mainKeyword: string): Kind {
  if (/notif|alert|reset|limits?\b/i.test(mainKeyword)) return "alerts";
  if (/account|profile|switcher|team/i.test(mainKeyword)) return "accounts";
  if (/history|ccusage|check claude usage|code usage/i.test(mainKeyword)) return "history";
  return "general";
}
const MENTIONS = /\bcl_audit\b/;

interface Block { end: number; tag: string; text: string; cum: number; nextTag: string }

const BLOCK = /<(\/?)(p|ul|ol|table|pre|blockquote|h[1-6]|div|figure)\b[^>]*>/gi;
const words = (s: string) => (s.replace(/<[^>]+>/g, " ").match(/[\p{L}\p{N}][\p{L}\p{N}'’_-]*/gu) ?? []).length;

/** The top-level blocks of rendered markdown, with the word count up to each block's end. */
function blocks(html: string): Block[] {
  const out: Block[] = [];
  let depth = 0, start = 0, tag = "", cum = 0;
  for (const m of html.matchAll(BLOCK)) {
    const closing = m[1] === "/", name = m[2].toLowerCase();
    if (!closing) {
      if (depth === 0) { start = m.index!; tag = name; }
      depth++;
    } else if (--depth === 0) {
      const end = m.index! + m[0].length, text = html.slice(start, end);
      cum += words(text);
      out.push({ end, tag, text, cum, nextTag: "" });
    }
  }
  out.forEach((b, i) => { b.nextTag = out[i + 1]?.tag ?? ""; });
  return out;
}

/** A small seeded random number generator, so the jitter is the same on every build of a page. */
function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** How often each topic is named in a piece of text. */
function counts(text: string): Map<Kind, number> {
  const plain = text.replace(/<[^>]+>/g, " ");
  return new Map(TOPICS.map(([k, re]) => [k, (plain.match(new RegExp(re.source, "gi")) ?? []).length]));
}
/** The page's own topic when the paragraph names it at all (or names none); else the topic it names most. */
function kindOf(text: string, pageTopic: Kind): Kind {
  const c = counts(text), top = Math.max(0, ...c.values());
  if (top === 0 || (c.get(pageTopic) ?? 0) > 0) return pageTopic;
  return [...c].find(([, n]) => n === top)![0];
}
function score(b: Block): number {
  if (b.tag !== "p") return -1;
  const plain = b.text.replace(/<[^>]+>/g, " ");
  return (MENTIONS.test(plain) ? 2 : 0) + (TOPICS.some(([, re]) => re.test(plain)) ? 1 : 0);
}

function button(kind: Kind, page: string, nth: number): string {
  const a = ACTIONS[kind];
  // never point the second key at the page the reader is on
  const [label, href] = a.second[1] === page ? ACTIONS.history.second : a.second;
  return `<aside class="act" data-act="${kind}" aria-label="cl_audit">` +
    `<p class="act-why">${a.why[nth % a.why.length]}</p>` +
    `<div class="plate act-keys"><a class="pill dl" href="${download}"><span class="dl-l">Download for Mac</span><span class="dl-na">Mac only</span></a>` +
    `<a class="key" href="${href}">${label}</a></div></aside>`;
}

/** The rendered HTML of a page with its action buttons in place. `page` is its path, which also seeds the jitter;
 *  `mainKeyword` (from the front matter) sets the page's own topic. */
export function withActions(html: string, page: string, mainKeyword: string): string {
  const bs = blocks(html);
  const total = bs.at(-1)?.cum ?? 0;
  const rand = rng(page);
  const step = () => MEAN * (1 + (rand() * 2 - 1) * JITTER);
  const pageTopic = topicOf(mainKeyword);
  const picks: { at: number; kind: Kind }[] = [];
  let last = 0, target = step();
  const near = (b: Block) => Math.abs(b.cum - target);
  while (picks.length < MAX && target < total - TAIL) {
    // never between a sentence and the list, table, code or image it introduces ("…these:" then a list)
    const leadsIn = (b: Block) => ["ul", "ol", "table", "pre", "figure"].includes(b.nextTag) || /:\s*(<\/[^>]+>\s*)*$/.test(b.text.replace(/<\/p>\s*$/, "").trimEnd());
    const ok = (b: Block) => b.cum >= HEAD && b.cum <= total - TAIL && b.cum - last >= MIN_GAP && near(b) <= WINDOW && !leadsIn(b);
    // the best anchor paragraph near the mark; ties go to the one closest to it
    const anchors = bs.filter((b) => ok(b) && score(b) > 0).sort((x, y) => score(y) - score(x) || near(x) - near(y));
    // no anchor: the end of a section (just before the next ## heading), else any paragraph end, closest to the mark
    const pick = anchors[0]
      ?? bs.filter((b) => ok(b) && b.nextTag === "h2").sort((x, y) => near(x) - near(y))[0]
      ?? bs.filter((b) => ok(b) && b.tag === "p").sort((x, y) => near(x) - near(y))[0];
    if (!pick) { target += 100; continue; }
    picks.push({ at: pick.end, kind: anchors[0] ? kindOf(pick.text, pageTopic) : pageTopic });
    last = pick.cum;
    target = last + step();
  }
  let out = html;
  // each kind has two wordings; a third button of one kind takes the general wording instead of repeating
  const seen = new Map<Kind, number>();
  // the page's own topic gets at least one button: the first pick takes it when none has
  if (picks.length > 0 && !picks.some((p) => p.kind === pageTopic)) picks[0].kind = pageTopic;
  for (const p of picks) if ((seen.get(p.kind) ?? 0) >= 2 && p.kind !== "general") p.kind = "general"; else seen.set(p.kind, (seen.get(p.kind) ?? 0) + 1);
  seen.clear();
  const nth = picks.map((p) => { const n = seen.get(p.kind) ?? 0; seen.set(p.kind, n + 1); return n; });
  picks.map((p, i) => ({ ...p, n: nth[i] })).sort((x, y) => y.at - x.at)
    .forEach((p) => { out = out.slice(0, p.at) + button(p.kind, page, p.n) + out.slice(p.at); });
  return out;
}
