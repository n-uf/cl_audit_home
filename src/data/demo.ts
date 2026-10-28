// Demo data for the site's copy of the cl_audit window: three made-up profiles and their usage
// history. Generated at build time from a fixed seed, so it looks the same on every build, with dates
// that count back from the build day like the real app.
// "work" has its 5-hour limit full (26.10.11): its card shows when it's back, and its Dock icon is the countdown
// (public/img/acc/work-full.png, drawn by the app's Painter).

export type AccountId = "home" | "work" | "side";

export const accounts = [
  { id: "home" as AccountId, name: "home", label: "HOME", email: "you@example.com", plan: "Max", hex: "#d97757", color: "var(--acc-home)", tint: "t-orange",
    icon: "/img/acc/home-bars-orange.png", dir: "~/.claude", data: "~/Library/Application Support/Claude", five: 34, fiveWhen: "in 3 h 12 min", week: 12, weekWhen: "in 6 days", fiveLeftMin: 192, weekLeftMin: 6 * 1440 + 200, updated: "just now", winOpen: true },
  { id: "work" as AccountId, name: "work", label: "WORK", email: "you@work.example", plan: "Team", hex: "#14b8a6", color: "var(--acc-work)", tint: "t-teal",
    icon: "/img/acc/work-full.png", dir: "~/.claude-work", data: "~/Library/Application Support/Claude-work", five: 100, fiveWhen: "in 1h 42m", week: 61, weekWhen: "in 3 days", fiveLeftMin: 102, weekLeftMin: 3 * 1440 + 300, updated: "1 min ago", winOpen: true },
  { id: "side" as AccountId, name: "side", label: "SIDE", email: "side@example.com", plan: "Pro", hex: "#8b5cf6", color: "var(--acc-side)", tint: "t-purple",
    icon: "/img/acc/side-statusBar.png", dir: "~/.claude-side", data: "~/Library/Application Support/Claude-side", five: 12, fiveWhen: "in 4 h 40 min", week: 40, weekWhen: "in 5 days", fiveLeftMin: 280, weekLeftMin: 5 * 1440 + 90, updated: "2 min ago", winOpen: false },
];

// ── a small seeded random generator (mulberry32) ──────────────────────
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** How busy each profile is at each hour of the day (0…1). */
function profile(id: AccountId, hour: number, weekday: number): number {
  const weekend = weekday === 0 || weekday === 6;
  if (id === "work") return weekend ? 0 : hour >= 9 && hour <= 18 ? (hour === 13 ? 0.4 : 0.85) : hour >= 19 && hour <= 21 ? 0.15 : 0;
  if (id === "home") return hour >= 19 && hour <= 23 ? 0.8 : hour <= 1 ? 0.45 : weekend && hour >= 11 ? 0.6 : 0;
  return hour >= 21 || hour <= 1 ? 0.35 : weekend && hour >= 14 && hour <= 18 ? 0.5 : 0.03;
}

const TOKENS_PER_REPLY: Record<AccountId, number> = { home: 31000, work: 26000, side: 22000 };

export type Counts = Partial<Record<AccountId, number>>;

const DAY = 86400000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const today = startOfDay(new Date());
const nowHour = 10; // the demo "now": mid-morning, so today is partly filled

/** Replies per profile for each day (rows) and hour (columns), oldest day first. */
function history(days: number) {
  const r = rng(20261023);
  const rows: { date: Date; hours: Counts[] }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today.getTime() - i * DAY);
    const hours: Counts[] = [];
    for (let h = 0; h < 24; h++) {
      const c: Counts = {};
      if (i === 0 && h > nowHour) { hours.push(c); continue; }
      for (const a of accounts) {
        const p = profile(a.id, h, date.getDay());
        if (p > 0 && r() < p) c[a.id] = Math.round(4 + r() * 26 * p);
      }
      hours.push(c);
    }
    rows.push({ date, hours });
  }
  return rows;
}

const sum = (c: Counts) => Object.values(c).reduce((a, b) => a + (b ?? 0), 0);

/** The profiles' colours averaged by their reply counts, at a strength that follows the count. */
function cellColor(c: Counts, max: number): string | null {
  const total = sum(c);
  if (!total) return null;
  let r = 0, g = 0, b = 0;
  for (const a of accounts) {
    const n = c[a.id] ?? 0;
    if (!n) continue;
    r += parseInt(a.hex.slice(1, 3), 16) * n; g += parseInt(a.hex.slice(3, 5), 16) * n; b += parseInt(a.hex.slice(5, 7), 16) * n;
  }
  const alpha = 0.18 + 0.82 * Math.min(1, total / max);
  return `rgba(${Math.round(r / total)},${Math.round(g / total)},${Math.round(b / total)},${alpha.toFixed(2)})`;
}

export function formatTokens(n: number): string {
  return n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : `${n}`;
}

const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type Range = "24h" | "7d" | "30d";

let cached: ReturnType<typeof history> | null = null;
const pick = (c: Counts, ids: AccountId[]): Counts => Object.fromEntries(ids.filter((id) => c[id]).map((id) => [id, c[id]]));

export const allIds = accounts.map((a) => a.id);

/** Everything one range of the dashboard shows, for the selected profiles only. */
export function range(kind: Range, ids: AccountId[] = allIds) {
  const days = kind === "24h" ? 2 : kind === "7d" ? 7 : 30;
  cached ??= history(30);
  const rows = cached.slice(30 - days).map((d) => ({ date: d.date, hours: d.hours.map((c) => pick(c, ids)) }));
  const max = Math.max(1, ...rows.flatMap((d) => d.hours.map(sum)));
  const heat = rows.map((d) => ({
    label: days > 10 ? `${d.date.getDate()} ${MON[d.date.getMonth()]}` : `${WD[d.date.getDay()]} ${d.date.getDate()}`,
    cells: d.hours.map((c) => cellColor(c, max)),
  }));

  // bars: per day, or per hour for 24 h
  const bars = kind === "24h"
    ? rows.flatMap((d) => d.hours.map((c, h) => ({ label: `${String(h).padStart(2, "0")}`, show: h % 6 === 0, parts: tokens(c) })))
    : rows.map((d, i) => ({ label: `${WD[d.date.getDay()]} ${d.date.getDate()}`, show: days <= 7 || i % 3 === 0, parts: tokens(d.hours.reduce(add, {})) }));
  const top = niceMax(Math.max(1, ...bars.map((b) => b.parts.reduce((a, p) => a + p.tokens, 0))));
  const replies = rows.reduce((a, d) => a + d.hours.reduce((x, c) => x + sum(c), 0), 0);
  const total = bars.reduce((a, b) => a + b.parts.reduce((x, p) => x + p.tokens, 0), 0);
  return { kind, days, heat, bars, top, replies, total, title: kind === "24h" ? "Tokens per hour" : "Tokens per day" };
}

function add(a: Counts, b: Counts): Counts {
  const o: Counts = { ...a };
  for (const k of Object.keys(b) as AccountId[]) o[k] = (o[k] ?? 0) + (b[k] ?? 0);
  return o;
}

function tokens(c: Counts) {
  return accounts.map((a) => ({ id: a.id, hex: a.hex, tokens: (c[a.id] ?? 0) * TOKENS_PER_REPLY[a.id] })).filter((p) => p.tokens > 0);
}

/** A round axis top: 1, 2, 2.5 or 5 × 10^n, with three steps. */
function niceMax(v: number) {
  const step = v / 3, pow = 10 ** Math.floor(Math.log10(step));
  const m = [1, 2, 2.5, 5, 10].find((x) => x * pow >= step) ?? 10;
  return m * pow * 3;
}

/** "Where it goes" per demo profile; the dashboard combines the selected ones by their tokens. */
type Share = [string, number, string];
const perAccount: Record<AccountId, { projects: Share[]; models: Share[]; surfaces: Share[] }> = {
  home: {
    projects: [["recipe-site", 0.6, "#d97757"], ["notes", 0.25, "#d97757"], ["other", 0.15, "#8e8e93"]],
    models: [["Opus", 0.6, "#c026d3"], ["Sonnet", 0.35, "#3b82f6"], ["Haiku", 0.05, "#22c55e"]],
    surfaces: [["Desktop Code tab", 0.55, "#f59e0b"], ["Terminal", 0.35, "#3b82f6"], ["VS Code", 0.1, "#8e8e93"]],
  },
  work: {
    projects: [["web-app", 0.45, "#14b8a6"], ["api", 0.35, "#14b8a6"], ["infra", 0.2, "#14b8a6"]],
    models: [["Opus", 0.8, "#c026d3"], ["Sonnet", 0.18, "#3b82f6"], ["Haiku", 0.02, "#22c55e"]],
    surfaces: [["Terminal", 0.45, "#3b82f6"], ["Desktop Code tab", 0.35, "#f59e0b"], ["VS Code", 0.15, "#8e8e93"], ["SDK apps", 0.05, "#14b8a6"]],
  },
  side: {
    projects: [["plant-app", 0.7, "#8b5cf6"], ["landing-page", 0.2, "#8b5cf6"], ["other", 0.1, "#8e8e93"]],
    models: [["Sonnet", 0.6, "#3b82f6"], ["Opus", 0.3, "#c026d3"], ["Haiku", 0.1, "#22c55e"]],
    surfaces: [["Desktop Code tab", 0.6, "#f59e0b"], ["Terminal", 0.4, "#3b82f6"]],
  },
};

export function breakdown(kind: Range, ids: AccountId[] = allIds) {
  const r = range(kind, ids);
  const weight: Partial<Record<AccountId, number>> = {};
  for (const b of r.bars) for (const p of b.parts) weight[p.id as AccountId] = (weight[p.id as AccountId] ?? 0) + p.tokens;
  const total = Object.values(weight).reduce((a, b) => a + (b ?? 0), 0) || 1;
  const merge = (key: "projects" | "models" | "surfaces", top: number): Share[] => {
    const m = new Map<string, [number, string]>();
    for (const id of ids) for (const [name, share, hex] of perAccount[id][key]) {
      const w = ((weight[id] ?? 0) / total) * share;
      const prev = m.get(name);
      m.set(name, [(prev?.[0] ?? 0) + w, prev?.[1] ?? hex]);
    }
    return [...m.entries()].map(([name, [share, hex]]) => [name, share, hex] as Share).sort((a, b) => b[1] - a[1]).slice(0, top);
  };
  return { projects: merge("projects", 6), models: merge("models", 4), surfaces: merge("surfaces", 4) };
}

/** Demo conversations for each profile's Claude window and Claude Code (illustrations). */
export const chats: Record<AccountId, { desktop: { title: string; turns: [("you" | "claude"), string][] }; code: { ask: string; steps: string[]; done: string } }> = {
  home: {
    desktop: {
      title: "Weekend in Lviv",
      turns: [
        ["you", "Plan a relaxed weekend in Lviv for two: coffee, old town, one good dinner."],
        ["claude", "Saturday: start with coffee near Rynok Square, walk the old town and climb the Town Hall tower before lunch. Evening: book dinner somewhere small near the Opera House.\n\nSunday: a slow breakfast, the Lychakiv Cemetery walk, and the afternoon free."],
        ["you", "Make Sunday a bit lazier."],
      ],
    },
    code: { ask: "add dark mode to the recipe site", steps: ["Read src/styles/theme.css", "Edited src/styles/theme.css (+42 −3)", "Edited src/components/Header.tsx (+11)"], done: "Dark mode follows the system setting, with a toggle in the header." },
  },
  work: {
    desktop: {
      title: "Review comments on PR 214",
      turns: [
        ["you", "Summarise the review comments on PR 214 and group them by file."],
        ["claude", "api/billing.ts — two comments: handle a missing currency, and add a test for refunds.\n\nweb/Invoice.tsx — one comment: the total should use the shared money formatter.\n\nNothing blocking; all three are small."],
        ["you", "Draft replies for the billing ones."],
      ],
    },
    code: { ask: "fix the failing refund test in api/billing", steps: ["Ran npm test -- billing (1 failed)", "Read api/billing.ts", "Edited api/billing.ts (+6 −2)", "Ran npm test -- billing (24 passed)"], done: "Refunds without a currency now fall back to the invoice currency." },
  },
  side: {
    desktop: {
      title: "Names for a plant app",
      turns: [
        ["you", "Ten short names for an app that reminds you to water your plants."],
        ["claude", "Sprout, Drizzle, Leafy, Thirsty, Greenday, Potter, Dewdrop, Mossy, Bloomer, Sip."],
        ["you", "Which ones are easiest to say out loud?"],
      ],
    },
    code: { ask: "scaffold the plant reminder app", steps: ["Created app/ (Expo, TypeScript)", "Created app/src/plants.ts", "Ran npm install (312 packages)"], done: "The app starts with npx expo start; plants live in app/src/plants.ts." },
  },
};
