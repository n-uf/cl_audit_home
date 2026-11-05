// Helpers for the content collections (use cases and blog).
import { getCollection, type CollectionEntry } from "astro:content";
import { pages } from "./pages";
import { releasedText } from "./site";

export type Entry = CollectionEntry<"useCases"> | CollectionEntry<"blog">;
export type Section = "usecases" | "blog";

export const sections = {
  usecases: { label: "Use cases", path: "/use-cases/", collection: "useCases" as const },
  blog: { label: "Blog", path: "/blog/", collection: "blog" as const },
};

export const kindLabel: Record<string, string> = {
  "use-case": "Use case", "how-to": "How-to", "what-is": "Explainer", "comparison": "Comparison", "best-tools": "Best tools",
};

const byUpdated = (a: Entry, b: Entry) => +b.data.updated - +a.data.updated || +b.data.published - +a.data.published;

/** The one rule for "live": a page is live unless its front matter says `draft: true`. */
export const isLive = (entry: Entry) => entry.data.draft !== true;
/** Dev and Vercel previews also show drafts (with a "Scheduled for" badge and noindex), so a try sees the whole batch.
 *  Production builds, and a plain local `astro build`, hide them. */
export const showDrafts = import.meta.env.DEV || process.env.VERCEL_ENV === "preview";
const visible = <T extends Entry>(entries: T[]) => (showDrafts ? entries : entries.filter(isLive));

export async function getUseCases() {
  return visible(await getCollection("useCases")).sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || a.data.title.localeCompare(b.data.title));
}
// Counted with a file glob first: asking Astro for an empty collection logs a warning on every page.
const blogFiles = Object.keys(import.meta.glob("/src/content/blog/*.md"));
export async function getPosts() {
  return blogFiles.length === 0 ? [] : visible(await getCollection("blog")).sort(byUpdated);
}
/** The Blog key and the /blog/ pages exist only once there is a first live article (a draft doesn't count in production). */
export async function hasBlog() {
  return (await getPosts()).length > 0;
}

export const pathOf = (section: Section, id: string) => `${sections[section].path}${id}/`;
/** "2026-11-02" date -> "2 Nov 2026" */
export const dateText = (d: Date) => releasedText(d.toISOString().slice(0, 10));

/** Is a site path a page of this build? "built": a fixed page, or an entry that is live (or a draft, where drafts are
 *  shown); "unbuilt": an entry whose draft is hidden in this build; "none": no page at all. For {{live:}} blocks (live.ts). */
export async function pageStatus(path: string): Promise<"built" | "unbuilt" | "none"> {
  if (pages.some((p) => p.path === path)) return "built";
  // the section indexes: /use-cases/ always; /blog/ once it has an article in this build (a draft-only blog isn't built yet)
  if (path === sections.usecases.path) return "built";
  if (path === sections.blog.path) return (await getPosts()).length > 0 ? "built" : blogFiles.length > 0 ? "unbuilt" : "none";
  for (const section of ["usecases", "blog"] as const) {
    if (!path.startsWith(sections[section].path)) continue;
    const all: Entry[] = section === "usecases" ? await getCollection("useCases") : blogFiles.length === 0 ? [] : await getCollection("blog");
    const e = all.find((x) => pathOf(section, x.id) === path);
    if (e) return showDrafts || isLive(e) ? "built" : "unbuilt";
  }
  return "none";
}

/** The title and description of a site path, for the Related cards. Throws on a path that doesn't exist, so a broken link fails the build. */
export async function pageInfo(path: string): Promise<{ title: string; description: string }> {
  const fixed = pages.find((p) => p.path === path);
  if (fixed) return fixed;
  for (const section of ["usecases", "blog"] as const) {
    if (!path.startsWith(sections[section].path)) continue;
    const entries = section === "usecases" ? await getUseCases() : await getPosts();
    const e = entries.find((x) => pathOf(section, x.id) === path);
    if (e) return { title: e.data.h1, description: e.data.description };
  }
  throw new Error(`related link "${path}" points to no page on this site`);
}
