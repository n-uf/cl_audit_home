// The dashboard's usage history as HTML, drawn the way the app draws it. Used by the server for the first
// render (so the page has full HTML) and by the browser whenever the Show chips change the profiles.
import { allIds, breakdown, formatTokens, range, type AccountId, type Range } from "./demo";

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
  return `${replies} <em>· ${tokens}</em>`;
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
