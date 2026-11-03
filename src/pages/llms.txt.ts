// /llms.txt: a plain-text summary of the site for AI tools, and every page with its address and a line about it.
import type { APIRoute } from "astro";
import { pages } from "../data/pages";
import { getUseCases, getPosts, pathOf } from "../data/content";
import { site, repo, requires } from "../data/site";

export const GET: APIRoute = async () => {
  const useCases = await getUseCases();
  const posts = await getPosts();
  const line = (path: string, title: string, description: string) => `- [${title}](${site}${path}): ${description}`;

  const out = [
    "# cl_audit",
    "",
    `> cl_audit is a free, source-available app for macOS (${requires}) that shows how much of each Claude profile's 5-hour and weekly usage limits is used, in the Dock, on a dashboard and in Mac notifications. Each profile can have its own Claude Code folder, Claude window and Dock icon, so several Claude accounts run side by side on one Mac. It also shows Claude Code usage history read from local session files. It is made by n-uf (https://n-uf.com) under the PolyForm Perimeter 1.0.1 licence, and it is not affiliated with, endorsed by or sponsored by Anthropic. Source: ${repo}`,
    "",
    "## Pages",
    "",
    ...pages.map((p) => line(p.path, p.title, p.description)),
    "",
    "## Use cases",
    "",
    line("/use-cases/", "All use cases", "What cl_audit is good for, one job at a time."),
    ...useCases.map((e) => line(pathOf("usecases", e.id), e.data.h1, e.data.description)),
  ];
  if (posts.length > 0) {
    out.push("", "## Blog", "", line("/blog/", "All articles", "Guides on Claude's usage limits and how to track them on a Mac."),
      ...posts.map((e) => line(pathOf("blog", e.id), e.data.h1, e.data.description)));
  }
  return new Response(out.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
