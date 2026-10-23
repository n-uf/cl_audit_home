// Demo data for the site's copy of the cl_audit window: three made-up accounts and their usage
// history. Generated at build time from a fixed seed, so it looks the same on every build, with dates
// that count back from the build day like the real app.

export type AccountId = "home" | "work" | "side";

export const accounts = [
  { id: "home" as AccountId, name: "home", label: "HOME", email: "you@example.com", plan: "Max", hex: "#d97757", color: "var(--orange)", tint: "t-orange",
    icon: "/img/dock-home.png", dir: "~/.claude", five: 34, fiveWhen: "in 3 h 12 min", week: 12, weekWhen: "in 6 days", updated: "just now" },
  { id: "work" as AccountId, name: "work", label: "WORK", email: "you@work.example", plan: "Team", hex: "#14b8a6", color: "var(--teal)", tint: "t-teal",
    icon: "/img/dock-work.png", dir: "~/.claude-work", five: 78, fiveWhen: "in 41 min", week: 61, weekWhen: "in 3 days", updated: "1 min ago" },
  { id: "side" as AccountId, name: "side", label: "SIDE", email: "side@example.com", plan: "Pro", hex: "#8b5cf6", color: "var(--purple)", tint: "t-purple",
    icon: "/img/dock-side.png", dir: "~/.claude-side", five: 12, fiveWhen: "in 4 h 40 min", week: 40, weekWhen: "in 5 days", updated: "2 min ago" },
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

/** How busy each account is at each hour of the day (0…1). */
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

/** Replies per account for each day (rows) and hour (columns), oldest day first. */
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

/** The accounts' colours averaged by their reply counts, at a strength that follows the count. */
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

/** Everything one range of the dashboard shows. */
export function range(kind: Range) {
  const days = kind === "24h" ? 2 : kind === "7d" ? 7 : 30;
  const rows = history(30).slice(30 - days);
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

/** "Where it goes": shares of tokens in the period (demo projects, models and apps). */
export const breakdown = {
  projects: [["web-app", 0.41, "#d97757"], ["api", 0.22, "#14b8a6"], ["infra", 0.12, "#14b8a6"], ["side-project", 0.11, "#8b5cf6"], ["docs", 0.08, "#d97757"], ["other", 0.06, "#8e8e93"]],
  models: [["Opus", 0.71, "#c026d3"], ["Sonnet", 0.24, "#3b82f6"], ["Haiku", 0.05, "#22c55e"]],
  surfaces: [["Desktop Code tab", 0.48, "#f59e0b"], ["Terminal", 0.37, "#3b82f6"], ["VS Code", 0.11, "#8e8e93"], ["SDK apps", 0.04, "#14b8a6"]],
} as const;
