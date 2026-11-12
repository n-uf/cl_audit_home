// A Sätteri (hast) step for the articles' markdown: a link to another host opens in a new tab (operator rule,
// 2026-11-11), with rel="noopener" added to whatever rel it has (no noreferrer: the sites we link to may see the visit
// came from here) and a note for screen readers, as the ExtLink component gives the hand-written links
// (src/components/ExtLink.astro). The link's visible text is not touched.
// Inside a heading (h1-h6) the link still opens in a new tab, but gets no note: the heading's id and the contents
// list are made from its text, and the note would end up in both.
// Plain JS with no imports, so that scripts/links.test.mjs can run it; astro.config.mjs passes in `isExternal`,
// `note` and `relWith` from src/data/links.mjs, the one definition of "external" for the site.
// (Astro 7's default markdown processor is Sätteri, so this is a hast plugin, not a rehype one.)

const isHeading = (node) => node.type === "element" && /^h[1-6]$/.test(node.tagName);

/**
 * @param {{ isExternal: (href: string) => boolean, note: string, relWith: (rel: unknown) => string[] }} options
 * @returns {() => object} a Sätteri hast plugin (a factory, as Astro's own heading-ids plugin is)
 */
export default function externalLinksPlugin({ isExternal, note, relWith }) {
  return () => ({
    name: "external-links",
    element: {
      filter: ["a"],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href !== "string" || !isExternal(href)) return;
        ctx.setProperty(node, "target", "_blank");
        ctx.setProperty(node, "rel", relWith(node.properties.rel));
        for (let up = ctx.parent(node); up; up = ctx.parent(up)) if (isHeading(up)) return;
        ctx.appendChild(node, { type: "element", tagName: "span", properties: { className: ["sr-only"] }, children: [{ type: "text", value: note }] });
      },
    },
  });
}
