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

export async function getUseCases() {
  return (await getCollection("useCases")).sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || a.data.title.localeCompare(b.data.title));
}
// Counted with a file glob first: asking Astro for an empty collection logs a warning on every page.
const blogFiles = Object.keys(import.meta.glob("/src/content/blog/*.md"));
export async function getPosts() {
  return blogFiles.length === 0 ? [] : (await getCollection("blog")).sort(byUpdated);
}
/** The Blog key and the /blog/ pages exist only once there is a first article. */
export async function hasBlog() {
  return blogFiles.length > 0;
}

export const pathOf = (section: Section, id: string) => `${sections[section].path}${id}/`;
/** "2026-11-02" date -> "2 Nov 2026" */
export const dateText = (d: Date) => releasedText(d.toISOString().slice(0, 10));

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
