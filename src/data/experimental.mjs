// The "Experimental" note: cl_audit 26.11.22 marks account switching, import, restore, export and Move to another Mac as
// experimental (they can lose data) and, before any of them runs, asks you to confirm the risk each time (its CHANGELOG,
// 26.11.22, also lists making the default profile among the confirmed ones). The site says it once per page, next to
// the first description of the flow, always in these words, so the wording lives here and nowhere else.
//
// In a markdown body: a paragraph of its own, `{{experimental}}` (the full list) or `{{experimental: move}}` (one flow;
// several: `{{experimental: switch, restore}}`). It becomes the note below at build time (withExperimental). In an
// .astro page: <Experimental flows={["move"]} />, which calls the same experimentalText.
//
// Plain JS with no Astro imports so that scripts/experimental.test.mjs can run it.

/** The flows the note can name, in the order it lists them. */
export const FLOWS = {
  switch: "account switching",
  import: "import",
  restore: "restore",
  export: "export",
  move: "Move to another Mac",
  default: "making a profile the default",
};
/** What the note says without a list: the five flows the app marks as experimental. */
export const ALL = ["switch", "import", "restore", "export", "move"];

const joinList = (items) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

/**
 * The note's words for some flows, as { lead, rest }: `lead` is the bold "Experimental:" and `rest` the sentences after it.
 * @param {string[]} [keys] keys of FLOWS (default ALL)
 */
export function experimentalParts(keys = ALL) {
  const wanted = Object.keys(FLOWS).filter((k) => keys.includes(k));
  const unknown = keys.filter((k) => !(k in FLOWS));
  if (unknown.length > 0 || wanted.length === 0) throw new Error(`experimental note: unknown flow ${JSON.stringify(unknown.length > 0 ? unknown : keys)}; use ${Object.keys(FLOWS).join(", ")}`);
  const one = wanted.length === 1;
  return {
    lead: "Experimental:",
    rest: `${joinList(wanted.map((k) => FLOWS[k]))} can lose data. Use ${one ? "it" : "them"} for testing, never on anything you can't afford to lose. cl_audit asks you to confirm the risk each time before ${one ? "it runs" : "they run"}.`,
  };
}

/** The note as plain text (for tests, tooltips and the demo). */
export function experimentalText(keys = ALL) {
  const { lead, rest } = experimentalParts(keys);
  return `${lead} ${rest}`;
}

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The note as HTML: a quiet bordered box (.exp-note in app.css). */
export function experimentalHTML(keys = ALL) {
  const { lead, rest } = experimentalParts(keys);
  return `<div class="exp-note" role="note"><p><strong>${lead}</strong> ${escape(rest)}</p></div>`;
}

const MARKER = /<p>\s*\{\{experimental(?::([^{}]*))?\}\}\s*<\/p>/g;
const STRAY = /\{\{\/?experimental/;

/**
 * The rendered markdown with each `{{experimental}}` paragraph replaced by the note. A marker that isn't alone in its
 * paragraph, a second one on a page, or a stray one is a build error naming `where` (the file).
 * @param {string} html the rendered markdown body
 * @param {string} where the file name, for error messages
 */
export function withExperimental(html, where) {
  let n = 0;
  const out = html.replace(MARKER, (_m, list) => {
    if (++n > 1) throw new Error(`${where}: more than one {{experimental}} note (once per page, next to the first description of the flow)`);
    const keys = list === undefined ? ALL : list.split(",").map((s) => s.trim()).filter(Boolean);
    try { return experimentalHTML(keys); } catch (e) { throw new Error(`${where}: ${e.message}`); }
  });
  if (STRAY.test(out)) throw new Error(`${where}: a {{experimental}} marker must be a paragraph of its own`);
  return out;
}
