// Structured data (JSON-LD) builders for the use-case pages, the blog and their index pages.
// The Organization node is the same one every n-uf site uses (id https://n-uf.com/#org); the app node is the
// SoftwareApplication on the home page (id #app).
import { site } from "./site";

const ctx = "https://schema.org";

/** A reference to the shared n-uf Organization node. */
export const orgRef = { "@id": "https://n-uf.com/#org" };
/** The full Organization node; include it once on every page that refers to orgRef. */
export const orgNode = {
  "@context": ctx,
  "@type": "Organization",
  "@id": "https://n-uf.com/#org",
  name: "n-uf",
  url: "https://n-uf.com",
  sameAs: ["https://github.com/n-uf"],
};
/** A reference to the home page's SoftwareApplication node. */
export const appRef = { "@id": `${site}/#app` };

/** "/use-cases/x/" -> "https://cl-audit.n-uf.com/use-cases/x/" */
export const abs = (path: string) => new URL(path, site).href;
const day = (d: Date) => d.toISOString().slice(0, 10);

export interface Crumb { name: string; path: string }

export function breadcrumbs(items: Crumb[]) {
  return {
    "@context": ctx,
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function faqPage(faq: { q: string; a: string }[]) {
  return {
    "@context": ctx,
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

interface PageInfo { path: string; name: string; description: string; type?: "WebPage" | "CollectionPage"; published?: Date; updated?: Date }

export function webPage({ path, name, description, type = "WebPage", published, updated }: PageInfo) {
  return {
    "@context": ctx,
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: "en",
    ...(published && { datePublished: day(published) }),
    ...(updated && { dateModified: day(updated) }),
    about: appRef,
    author: orgRef,
    publisher: orgRef,
  };
}

interface ArticleInfo { path: string; headline: string; description: string; published: Date; updated: Date; image?: string }

export function article({ path, headline, description, published, updated, image }: ArticleInfo) {
  return {
    "@context": ctx,
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    headline,
    description,
    // the article's first image, else the site's share image (Google prefers articles with an image)
    image: abs(image ?? "/og.png"),
    datePublished: day(published),
    dateModified: day(updated),
    inLanguage: "en",
    author: orgRef,
    publisher: orgRef,
    about: appRef,
    mainEntityOfPage: abs(path),
  };
}
