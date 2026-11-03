// The pages that are not in a content collection, with a short name and a one-line description each.
// Used for the Related cards (the target's title) and for /llms.txt. The meta tags of these pages live in the pages themselves.
export interface PageInfo { path: string; title: string; description: string }

export const pages: PageInfo[] = [
  { path: "/", title: "cl_audit: Claude usage tracker for Mac", description: "What cl_audit is: a free Mac app that shows each Claude profile's 5-hour and weekly limits in the Dock, with a dashboard and usage history." },
  { path: "/dashboard/", title: "Demo dashboard", description: "A demo of the dashboard with sample data: a card per profile with its limits and switches, and Claude Code usage history." },
  { path: "/settings/", title: "Settings", description: "Per-profile settings in a demo: usage alerts, refresh interval, Claude Code folder, Claude window and Dock icon, plus General settings." },
  { path: "/install/", title: "Install", description: "How to download and install cl_audit, build it from source, add a profile, update and uninstall." },
  { path: "/faq/", title: "FAQ", description: "Answers about profiles and accounts, Claude windows, where the figures come from, privacy, plans and requirements." },
];
