---
title: "ccusage alternative for Mac: cl_audit vs ccusage (2026)"
description: "A ccusage alternative for Mac: cl_audit shows each account's 5-hour and weekly limits in the Dock, while ccusage reports tokens and cost in the terminal."
h1: "ccusage alternative for Mac: cl_audit vs ccusage"
mainKeyword: "ccusage alternative"
kind: comparison
published: 2026-11-02
updated: 2026-11-12
author: n-uf
takeaways:
  - "ccusage reports token use and estimated cost from local logs in the terminal; cl_audit shows how much of each profile's 5-hour and weekly limits is used, in the Dock."
  - "cl_audit covers limits and several accounts. It doesn't replace ccusage's reports or JSON output; its cost figure is an estimate at API list prices."
  - "ccusage's README lists many coding agents besides Claude Code; cl_audit is for Claude on a Mac with Apple silicon."
  - "The two can run side by side, but their token totals will not match exactly."
faq:
  - q: "What is a good ccusage alternative for Mac?"
    a: "cl_audit, if what you want is your 5-hour and weekly limits per account in Dock icons. It's a Mac app and also keeps a token history. If you want terminal reports, JSON or cost estimates, ccusage itself is still the tool for that."
  - q: "Does cl_audit replace ccusage?"
    a: "No, they do different jobs. cl_audit reads your limits from Anthropic and shows tokens per day from Claude Code's session files, while ccusage prints reports with costs from local data. cl_audit's README describes no terminal reports or JSON export."
  - q: "Is there a ccusage Mac app?"
    a: "ccusage's README describes a command-line tool you run with npx, not a Mac app. cl_audit is a Mac app, but it's a different tool, not a graphical version of ccusage."
  - q: "Does cl_audit show cost in dollars?"
    a: "As an estimate, yes. The usage history's totals show what the same tokens would cost at API list prices (for example \"≈ $123 at list prices\"), and so does the CSV export. It isn't your bill, and models without a published price are left out. ccusage's README says it shows costs in USD for each day, month and session."
  - q: "Why don't the token totals in cl_audit and ccusage match?"
    a: "They count differently. cl_audit's dashboard says its tokens are input plus cache writes plus output, with cache reads not counted. ccusage's README says it tracks cache creation and cache read tokens separately."
sources:
  - title: "ccusage README"
    url: "https://github.com/ccusage/ccusage"
    checked: 2026-11-02
  - title: "ccusage documentation"
    url: "https://ccusage.com"
    checked: 2026-11-02
  - title: "cl_audit README (n-uf)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    quote: "The default profile is the one on `~/.claude` with the usual Claude app"
  - title: "cl_audit home page"
    url: "https://cl-audit.n-uf.com/"
    checked: 2026-11-02
  - title: "cl_audit dashboard demo"
    url: "https://cl-audit.n-uf.com/dashboard/"
    checked: 2026-11-02
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Claude Code docs: Manage costs effectively (the /usage command)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
related:
  - /use-cases/claude-code-usage-history/
  - /
  - /dashboard/
  - /blog/best-claude-usage-trackers-mac/
---

cl_audit is a ccusage alternative if what you want on a Mac is your 5-hour and weekly limits in the Dock, one set per Claude account, rather than reports in the terminal. The two answer different questions. ccusage prints token use and estimated cost from the logs on your machine. cl_audit reads how much of each limit is used from Anthropic, and keeps a token history from Claude Code's session files. It doesn't replace ccusage's reports, and plenty of people will want both.

cl_audit is our tool. It's independent and not affiliated with Anthropic.

## What each one does

We describe ccusage here only from [its README](https://github.com/ccusage/ccusage) and its [documentation site](https://ccusage.com), which we read on 2 November 2026. We haven't run it for this article, so where its pages are silent, we say so. If you already use ccusage, nothing here is a reason to stop.

### ccusage

ccusage is a command-line tool. Its README describes it as a way to "analyze coding (agent) CLI token usage and costs from local data". You don't need a global install: the quick start is `npx ccusage@latest`, and the README also lists `bunx`, `pnpm dlx` and `nix run`.

For Claude Code, the README lists:

- Reports: `daily`, `weekly`, `monthly` and `session` cover every source it detects; `ccusage claude daily` is Claude Code alone.
- A `blocks` report for Claude Code's 5-hour billing windows, with active block monitoring.
- Costs in USD for each day, month or session, estimated from token counts and pricing data. `--no-cost` hides them, `--offline` uses cached pricing, and a `ccusage.json` file can override the price per model.
- Breakdowns per model with `--breakdown`, and by project with `--instances` and `--project`.
- `--json`, `--since` and `--until`, `--last 1`, `--timezone`, and configuration files.
- A compact status line for Claude Code's status bar hooks, marked Beta.
- Cache creation and cache read tokens, tracked and shown separately.

It isn't only for Claude. The same tool reads Codex, OpenCode, Amp, Gemini CLI and the other agent CLIs in its README's table, 17 besides Claude Code. Its site says it reads those local logs without uploading your data.

It's MIT licensed. Three things its README doesn't cover: which operating systems it runs on, tracking several Claude accounts, and reading your limit percentages from Anthropic.

### cl_audit

cl_audit is a free, source-available Mac app built around profiles. A profile is one Claude setup: a Claude Code folder with its sign-in and, optionally, a Claude window and a Dock icon. A profile has one or more Claude accounts and works on one at a time, and an account belongs to one profile. A personal plan and a Team seat on the same email are two accounts.

![Claude Code usage history by hour, day and project](/img/guides/usage-history.webp "cl_audit's Claude Code usage history: when, tokens per day, and where they go by project, model and surface. Sample data.")

cl_audit's background agent reads each profile's 5-hour limit and weekly limit from Anthropic, using that profile's Claude Code sign-in. The cl_audit FAQ says these are the same figures Claude shows in Settings ▸ Usage, with their reset times.

- Dock icons: a profile with **Usage in the Dock** on gets its own icon with both limits. When a limit is full, the icon counts down to when the profile is back.
- Alerts: a notification when a limit reaches a level you set, and another when it resets (Notify when back).
- History: tokens per day, and where they go by project, model and surface, over 24 h, 7 d and 30 d. It's read from Claude Code's session files on your Mac, and the dashboard demo names the Terminal, the desktop Code tab, VS Code and SDK apps as surfaces. You can see it in the [Claude usage dashboard demo](/dashboard/), or read more about how to [see where your Claude Code tokens go](/use-cases/claude-code-usage-history/).

Its README says there's no cl_audit server, no analytics and nothing to sign up for. It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. A profile that uses an API key is billed per token and has no limits to show.

It isn't signed with an Apple Developer ID yet, so the first time you open it, macOS asks you to click Open Anyway. The [Claude usage tracker for Mac](/) page has the overview.

## At a glance

| | ccusage | cl_audit |
|---|---|---|
| What it is | Command-line tool | Mac app with a background agent |
| Where you use it | Terminal | Dock icons, a dashboard window, a launcher |
| What it reads | Local usage data from coding-agent tools | Limits from Anthropic; history from Claude Code's local session files |
| 5-hour and weekly limits | Not described as read from Anthropic; `blocks` reports Claude Code's 5-hour windows | Yes, read from Anthropic for each profile |
| Token history | Daily, weekly, monthly and session reports | Tokens per day over 24 h / 7 d / 30 d, by project, model and surface |
| Cost in dollars | Yes, estimated in USD | An estimate at API list prices, not your bill |
| Several Claude accounts | Not described (custom data directories are supported) | Yes, one or more accounts per profile |
| Alerts | Not described | Yes, at a level you set and when a limit is back |
| Scripts and JSON | Yes, `--json` and filters | No JSON described in its README; the usage history exports as CSV |
| Other agents | Codex, OpenCode, Gemini CLI and many more | Claude only |
| Needs | No operating system named | Apple silicon, macOS 13+, Claude Code signed in |
| Licence | MIT | PolyForm Perimeter 1.0.1 (source-available) |

"Not described" means the README or page we read doesn't say. It doesn't mean the feature is missing.

## Where ccusage still makes sense

We'd pick ccusage over cl_audit for any of these, and for some there's no cl_audit equivalent at all.

- **Scripting and reports.** `--json`, date filters, timezones and configuration files make ccusage easy to put in a script or a weekly routine. cl_audit's README describes a window and Dock icons, not terminal reports or JSON; its history only exports as CSV.
- **Cost estimates.** If you want a dollar figure per day or per project from a report, ccusage gives you one. cl_audit's usage history also shows an estimate at API list prices, in its totals and in the CSV, but it's a side note to the tokens. On a subscription plan either figure is an estimate from token counts and model pricing, not a bill. Anthropic's Claude Code docs say much the same of the session cost in `/usage`: it's computed locally from token counts and, for Pro, Max and Ultra subscribers, isn't relevant for billing.
- **Other coding agents.** ccusage reads Codex, OpenCode, Amp, Gemini CLI and many more. cl_audit is only about Claude.
- **Other platforms.** cl_audit needs a Mac with Apple silicon and macOS 13 or later. ccusage's README names no operating system, so check it for yours.
- **Nothing to install.** `npx ccusage@latest` runs it from the terminal. cl_audit installs an app, a background agent and, if you ask for them, Dock icon apps in `/Applications`.
- **Project and session detail.** `--instances`, `--project` and the `session` report give you a per-project and per-session view in the terminal.

## When is cl_audit the better ccusage alternative?

- **You care about the limit, not the token count.** The 5-hour and weekly limits are what stop your work. Anthropic's help page (read on 2 November 2026) says usage across claude.ai, Claude Code and Claude Desktop counts towards the same limit. A report built from Claude Code's local logs leaves out claude.ai chats and other devices, and Claude Code's docs say the same of their own local figures. cl_audit's history has that boundary too (its README says usage from claude.ai chats, other computers and cloud sessions isn't there), but its limit bars come from Anthropic.
- **You have more than one Claude account.** Each profile has its own sign-in and, if you want them, a Dock icon and a Claude window. The first profile is the default one, on `~/.claude` with the usual Claude app; the rest get their own Claude Code folder and window. The page on [using several Claude accounts on a Mac](/use-cases/multiple-claude-accounts/) shows how that works. cl_audit doesn't pool limits: each account's limits are its own. A profile can also switch to another of your accounts on its Switch page, and its Code sessions are meant to move with it, but switching is experimental and can lose data. Whether you may use more than one account is set by Anthropic's terms.

{{experimental: switch}}
- **You want it in view all day.** cl_audit is [a Claude usage tracker in the Dock](/). Each Dock icon shows both limits without a terminal open, and a full limit turns into a countdown.
- **You want to know when you're back.** With Notify when back on (the default), cl_audit sends one notification when a full limit resets.

## Is there a ccusage Mac app?

Not according to its README, which describes a command-line tool run with `npx`, `bunx`, `pnpm dlx` or `nix run`, with no Mac app and no menu bar item. If you were looking for a ccusage alternative with a window, cl_audit is a Mac app. It isn't a graphical front end for ccusage, though: it has no terminal reports or JSON, and its history is mostly tokens, with only a dollar estimate at API list prices beside them.

## Is there another Claude Code usage monitor?

Yes, several. Some live in the menu bar, one is a browser extension, and one covers many AI coding tools. We compared eight Claude usage trackers, ccusage and cl_audit among them, from their own pages in [the best Claude usage trackers for Mac](/blog/best-claude-usage-trackers-mac/). If you're after a Claude Code usage monitor alternative that sits in the menu bar rather than the Dock, start there.

## Using both

They don't conflict. Both read local data on your Mac (cl_audit also asks Anthropic for the limits), and neither needs the other. One way to split it:

1. **cl_audit for the live question:** how much of my 5-hour and weekly limits is left on each account, and when am I back?
2. **ccusage for the report:** what did I use last month, on which project, and what would it have cost?

Run ccusage when you want it:

```bash
npx ccusage@latest daily
npx ccusage@latest blocks
npx ccusage@latest daily --since 2026-10-01 --until 2026-10-31 --json
```

That's the daily report, the 5-hour blocks report and a JSON export for October. They follow the README's examples, which use `bunx`; the dates are ours.

Expect the token totals to differ. The cl_audit dashboard counts input plus cache writes plus output and leaves out cache reads, while ccusage's README says it tracks cache creation and cache read tokens separately. Compare the two on trends, not on the last digit.

For the history side, the page on [tokens by project and model](/use-cases/claude-code-usage-history/) shows what cl_audit keeps and where it comes from. If you want to try cl_audit, you can [install it](/install/).
