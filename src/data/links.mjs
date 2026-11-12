// n-uf's rule for external links (operator, 2026-11-11): a link to another host opens in a new tab, with rel="noopener"
// (no "noreferrer": the sites we link to may see the visit came from here) and a note for screen readers. The link's
// visible text stays as it is (no arrow here, unlike cl_quick_home).
// External = an http(s) link to another host than this site's (GitHub, n-uf.com, Anthropic's docs).
// Plain JS so that src/components/ExtLink.astro, src/data/actions.ts, astro.config.mjs and scripts/links.test.mjs can load it.

/** A function that is true for an http(s) link to a host other than the one of `siteUrl`. Relative links, links to the
 *  site itself and mailto: or tel: are not external. */
export function externalCheck(siteUrl) {
  const siteHost = new URL(siteUrl).host;
  return (href) => {
    try {
      const url = new URL(href, siteUrl);
      return (url.protocol === "http:" || url.protocol === "https:") && url.host !== siteHost;
    } catch {
      return false;
    }
  };
}

/** Text for screen readers after an external link's own text. */
export const newTabNote = " (opens in a new tab)";

/** A link's `rel` tokens (a string or a list, as hast and Astro give them) with "noopener" added; the ones it has
 *  already stay, in their order. */
export function relWith(rel) {
  const tokens = (Array.isArray(rel) ? rel : String(rel ?? "").split(/\s+/)).flatMap((t) => String(t).split(/\s+/)).filter(Boolean);
  if (!tokens.includes("noopener")) tokens.push("noopener");
  return tokens;
}
