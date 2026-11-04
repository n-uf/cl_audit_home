// The dashboard's usage history as HTML, drawn the way the app draws it. Used by the server for the first
// render (so the page has full HTML) and by the browser whenever the Show chips change the profiles.
import { accounts, allIds, breakdown, formatTokens, modelShares, range, type AccountId, type Range } from "./demo";

// ── The cost estimate and the CSV (cl_audit 26.11.0) ──────────────────────────────────────────────────────────────
// What the same tokens would cost on Anthropic's API at list prices, per model, with cache writes and reads priced
// apart: "at API list prices, not your bill" (plan use is paid by the plan). The demo splits each profile's tokens
// into kinds and models with fixed shares; the app reads them from the session files.
const PRICE: Record<string, [number, number, number, number, number]> = {   // $ per million: input, output, cache write 5 min, 1 h, cache read
  Opus: [15, 75, 18.75, 30, 1.5], Sonnet: [3, 15, 3.75, 6, 0.3], Haiku: [1, 5, 1.25, 2, 0.1],
};
const SPLIT = { input: 0.04, output: 0.1, cw5: 0.62, cw1h: 0.24, readPerToken: 9 };   // shares of the counted tokens; cache reads as a multiple
type Row = { date: string; profile: string; model: string; replies: number; input: number; output: number; cw5: number; cw1h: number; read: number; total: number; cost: number };
function rowsFor(kind: Range, ids: AccountId[]): Row[] {
  const r = range(kind, ids);
  const allTokens = r.bars.reduce((s, b) => s + b.parts.reduce((t, p) => t + p.tokens, 0), 0) || 1;
  const out: Row[] = [];
  for (const b of r.bars) for (const p of b.parts) for (const [model, share] of modelShares(p.id as AccountId)) {
    const total = Math.round(p.tokens * share);
    if (!total) continue;
    const [pi, po, pw5, pw1, pr] = PRICE[model] ?? PRICE.Sonnet;
    const input = Math.round(total * SPLIT.input), output = Math.round(total * SPLIT.output), cw5 = Math.round(total * SPLIT.cw5), cw1h = total - input - output - cw5;
    const read = Math.round(total * SPLIT.readPerToken);
    const cost = (input * pi + output * po + cw5 * pw5 + cw1h * pw1 + read * pr) / 1e6;
    const name = accounts.find((a) => a.id === p.id)?.name ?? p.id;
    out.push({ date: b.label, profile: name, model, replies: Math.max(1, Math.round((r.replies * p.tokens * share) / allTokens)), input, output, cw5, cw1h, read, total, cost });
  }
  return out;
}
/** "≈ $129.23": the period's estimate at API list prices. */
export const costText = (kind: Range, ids: AccountId[] = allIds) => `≈ $${rowsFor(kind, ids).reduce((s, x) => s + x.cost, 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** The CSV the app's CSV key saves: one row per day, profile and model (made-up demo rows here). */
export function csvFor(kind: Range, ids: AccountId[] = allIds) {
  const head = "date,profile,model,replies,input,output,cache_write_5m,cache_write_1h,cache_read,total,cost_usd_list";
  return [head, ...rowsFor(kind, ids).map((x) => [x.date, x.profile, x.model, x.replies, x.input, x.output, x.cw5, x.cw1h, x.read, x.total, x.cost.toFixed(2)].join(","))].join("\n") + "\n";
}

const hourTicks = [0, 3, 6, 9, 12, 15, 18, 21];

function empty(title: string, note: string) {
  return `<div class="chart-card"><div class="cc-head"><b>${title}</b><span>${note}</span></div><div class="no-acc">No profile selected</div></div>`;
}

/** The heatmap and the tokens chart for one period. */
export function rangeHTML(kind: Range, ids: AccountId[] = allIds): string {
  const r = range(kind, ids);
  if (!ids.length) {
    return empty("When you use Claude", "replies per hour · colour mixes the profiles") +
      empty(r.title, "input + cache writes + output · cache reads not counted");
  }
  const heat = `
    <div class="chart-card" data-chart="heat">
      <div class="cc-head"><b>When you use Claude</b><span>replies per hour · colour mixes the profiles</span></div>
      <div class="heat-scroll"><div class="heat${r.days > 10 ? " dense" : ""}">
        <span></span>
        <div class="heat-hours">${hourTicks.map((h) => `<span style="grid-column:${h + 1}">${String(h).padStart(2, "0")}</span>`).join("")}</div>
        ${r.heat.map((row) => `<span class="heat-day">${row.label}</span><div class="heat-row">${row.cells.map((c) => (c ? `<i style="background:${c}"></i>` : "<i></i>")).join("")}</div>`).join("")}
      </div></div>
    </div>`;
  const total = (b: (typeof r.bars)[number]) => b.parts.reduce((a, p) => a + p.tokens, 0);
  const chart = `
    <div class="chart-card" data-chart="tokens">
      <div class="cc-head"><b>${r.title}</b><span>input + cache writes + output · cache reads not counted</span></div>
      <div class="tchart">
        <div class="tgrid">${[3, 2, 1, 0].map((k) => `<div class="tline"><span>${formatTokens((r.top / 3) * k)}</span></div>`).join("")}</div>
        <div class="tbars" style="--n:${r.bars.length}">${r.bars.map((b) => `
          <div class="tbar" title="${b.label}: ${formatTokens(total(b))} tokens"><div class="tstack" style="height:${(total(b) / r.top) * 100}%">${b.parts.map((p) => `<i style="flex:${p.tokens};background:${p.hex}"></i>`).join("")}</div></div>`).join("")}
        </div>
        <div class="tx" style="--n:${r.bars.length}">${r.bars.map((b) => `<span>${b.show ? b.label : ""}</span>`).join("")}</div>
      </div>
    </div>`;
  return heat + chart;
}

/** The totals as the app's display shows them: the replies lit, the tokens dim. */
export function totalsHTML(kind: Range, ids: AccountId[] = allIds): string {
  const [replies, tokens] = totalsText(kind, ids).split(" · ");
  // 26.11.0: the estimate at API list prices after the tokens (the display's title says it's not your bill)
  return `${replies} <em>· ${tokens} · ${costText(kind, ids)} at list prices</em>`;
}

/** "1,202 replies · 33.1M tokens" for one period. */
export function totalsText(kind: Range, ids: AccountId[] = allIds): string {
  const r = range(kind, ids);
  return `${r.replies.toLocaleString("en-US")} replies · ${formatTokens(r.total)} tokens`;
}

/** "Where it goes" for one period. */
export function sharesHTML(kind: Range, ids: AccountId[] = allIds): string {
  if (!ids.length) return `<div class="no-acc" style="grid-column:1/-1">No profile selected</div>`;
  const b = breakdown(kind, ids);
  const list = (title: string, rows: [string, number, string][]) => `
    <div><div class="share-title">${title}</div>${rows.map(([name, share, hex]) => `
      <div class="share"><span>${name}</span><span class="share-track"><i style="width:${Math.max(1, share * 100)}%;background:${hex}"></i></span><span class="sub">${Math.round(share * 100)}%</span></div>`).join("")}
    </div>`;
  return list("By project", b.projects) + list("By model", b.models) + list("By surface", b.surfaces);
}
