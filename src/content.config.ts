// Content collections: the use-case pages and the blog. A file that breaks this schema fails the build.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sitePath = z.string().regex(/^\/(?:[a-z0-9-]+\/)*$/, "a site path in lower case with a trailing slash, e.g. /use-cases/x/");

const article = z.object({
  title: z.string().max(60),
  description: z.string().min(120).max(155),
  h1: z.string().min(10).max(90),
  mainKeyword: z.string().min(3),
  kind: z.enum(["use-case", "how-to", "what-is", "comparison", "best-tools"]),
  published: z.coerce.date(),         // the day the page goes live (UTC); for a draft, the day it is scheduled for
  updated: z.coerce.date(),
  draft: z.boolean().default(false),  // true: scheduled, not live yet; scripts/publish-due.mjs flips it on its date
  author: z.literal("n-uf"),
  takeaways: z.array(z.string().min(20)).min(3).max(5),
  faq: z.array(z.object({ q: z.string().endsWith("?"), a: z.string().min(40) })).min(4).max(5),
  sources: z.array(z.object({ title: z.string(), url: z.string().url(), checked: z.coerce.date() })).default([]),
  related: z.array(sitePath).min(2).max(4),
  order: z.number().int().optional(),   // optional: where a use case sits in the /use-cases/ list (lowest first); otherwise by title
}).refine((d) => d.updated >= d.published, { message: "updated is earlier than published", path: ["updated"] })
  // For a draft dated ahead (draft: true, published in the future) set `updated` equal to `published`: this rule needs
  // updated >= published, and scripts/publish-due.mjs changes only the `draft` line when the day comes.
  // a live page can't be dated in the future (UTC days); only a draft may wait for its date
  .refine((d) => d.draft || d.published.toISOString().slice(0, 10) <= new Date().toISOString().slice(0, 10),
    { message: "published is a future date but the page is not a draft: set draft: true (it goes live on that date)", path: ["published"] });

export const collections = {
  useCases: defineCollection({ loader: glob({ pattern: "*.md", base: "./src/content/use-cases" }), schema: article }),
  blog: defineCollection({ loader: glob({ pattern: "*.md", base: "./src/content/blog" }), schema: article }),
};
