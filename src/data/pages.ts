// The pages that are not in a content collection, with a short name and a one-line description each.
// Used for the Related cards (the target's title) and for /llms.txt. The meta tags of these pages live in the pages themselves.
export interface PageInfo { path: string; title: string; description: string }

export const pages: PageInfo[] = [
  { path: "/", title: "Claude usage tracker for Mac", description: "cl_audit is a free Claude usage tracker for Mac: each account's 5-hour and weekly limits on its own Dock icon and on one dashboard, plus usage history." },
  { path: "/dashboard/", title: "Claude usage dashboard (demo)", description: "A demo of cl_audit's Claude usage dashboard: each profile's 5-hour and weekly limits, plus Claude Code usage history by day, project and model." },
  { path: "/settings/", title: "Settings: usage alerts and Dock icons", description: "Set each Claude profile's usage alerts, refresh interval, Claude Code folder, Claude window and Dock icon, with 13 icon styles and 5 panel designs." },
  { path: "/install/", title: "Install cl_audit", description: "Download cl_audit for Apple silicon Macs (macOS 13 or later), allow it once, and add a profile for each Claude account. It's free and needs Claude Code." },
  { path: "/faq/", title: "FAQ: Claude accounts, usage limits, privacy", description: "Can you use two Claude accounts on one Mac? When is a full limit back? Answers on cl_audit's profiles, usage figures, alerts, privacy and plans." },
];
