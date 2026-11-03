---
title: "Claude Code usage history by project and model | cl_audit"
description: "See your Claude Code usage history on a Mac: when you use Claude, tokens per day, and the split by project, model and surface, read from local files. Free."
h1: "Claude Code usage history on your Mac"
mainKeyword: "claude code usage history"
kind: use-case
published: 2026-11-02
updated: 2026-11-02
author: n-uf
order: 3
takeaways:
  - "cl_audit reads the session files Claude Code already writes on your Mac and charts your Claude Code usage history over 24 hours, 7 days or 30 days."
  - "It shows when you use Claude, tokens per day, and where they go by project, model and surface (Terminal, the desktop Code tab, VS Code, SDK apps)."
  - "The history is kept for each profile, so you can see one account or several together."
  - "Nothing is uploaded: only the time, model, token counts, project folder and surface of each reply are read, on your Mac."
  - "Usage from claude.ai chats, other computers and cloud sessions isn't in it, because those don't write session files on this Mac."
faq:
  - q: "Where does Claude Code store its usage history?"
    a: "In plain-text session files on your Mac, one per session, under a projects folder in Claude Code's folder (~/.claude by default, or your CLAUDE_CONFIG_DIR folder). Anthropic's docs say Claude Code deletes them after 30 days by default. cl_audit reads these files to draw the history."
  - q: "Can I see usage by project?"
    a: "Yes. The \"Where it goes\" chart splits the share of tokens in the period by project, by model and by surface, so you can see which project or which model used most. The profile chips next to the period keys filter it to one account or more."
  - q: "Does it count cache reads?"
    a: "No. The tokens chart counts input, cache writes and output, and says on the chart that cache reads are not counted. The totals are tokens and replies, not dollars."
  - q: "Is anything uploaded?"
    a: "No. The history is read from files on your Mac. cl_audit has no server and no analytics, and its only network requests go to Anthropic, to read each profile's limits and which account it is signed in to."
sources:
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-02
  - title: "Claude Code docs: Manage costs effectively (the /usage command)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
  - title: "Claude Code docs: Settings (CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-02
  - title: "ccusage README (ryoppippi/ccusage)"
    url: "https://github.com/ryoppippi/ccusage"
    checked: 2026-11-02
related:
  - /
  - /dashboard/
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-usage-limit-alerts/
---

cl_audit reads the session files Claude Code already writes on your Mac and shows your Claude Code usage history: when you use Claude, tokens per day, and where they go by project, model and surface (Terminal, the desktop Code tab, VS Code, SDK apps). Nothing is uploaded. cl_audit is an independent tool, not affiliated with Anthropic.

You pick a period, 24 hours, 7 days or 30 days, and the charts redraw. It is free, and it runs on Macs with Apple silicon and macOS 13 or later.

## What the history shows

The history sits below the profile cards on the dashboard, under the heading **Usage history**. It has three charts, and you can show or hide each one.

- **When you use Claude.** A heatmap of days against hours, so you can see which hours of the day you actually work with Claude, and which days you don't. It is the quickest way to notice that most of your usage is late in the evening, or that a weekend run used more than you expected.
- **Tokens per day.** A bar for each day, or each hour in the 24-hour view, stacked by profile. The note on the chart says what is counted: input, cache writes and output. Cache reads are not counted.
- **Where it goes.** The share of tokens in the period, split by project, by model and by surface. The project is the folder you worked in. The surface is where Claude Code ran: Terminal, the desktop Code tab, VS Code or an SDK app.

A display above the charts gives the totals for the period, in replies and tokens. The period keys and the **Show** chips next to them filter the charts, and your choice is kept between launches.

You can try all of it on the [demo dashboard](/dashboard/), which uses sample data for three made-up profiles. The Claude usage dashboard there works like the real one, so you can switch periods and chips without installing anything.

## Questions the charts answer

A few things are quicker to see than to work out:

- **Which project used most of my tokens this week?** Pick 7 d and read the project split in "Where it goes".
- **Did switching models change my usage?** Compare the model split in the 7 d and 30 d views.
- **When did that long run happen?** In the 24 h view the tokens chart switches to tokens per hour, so a long run shows up as one tall bar, and the heatmap shows the same hours across the days before it.
- **Is this a one-off or my usual week?** The 30 d view puts a heavy day next to the ordinary ones.

None of these needs a spreadsheet or a script: you open the dashboard and look.

## Where the data comes from

Claude Code writes a transcript of each session as a plain-text file on your Mac. Anthropic's docs list the path: under the projects folder in Claude Code's folder, one file per session, such as `projects/<project>/<session>.jsonl`. That folder is `~/.claude` unless you set `CLAUDE_CONFIG_DIR`, in which case Claude Code stores its settings, session history and plugins there instead.

cl_audit reads those files. From each reply it takes only five things: the time, the model, the token counts, the project folder and the surface. It does not read your prompts or Claude's answers for the history.

Two limits follow from where the data comes from.

First, it is the history of this Mac. Usage from claude.ai chats, from other computers and from cloud sessions isn't there, because those don't write session files here. Second, Claude Code doesn't keep the files forever: Anthropic's docs say it deletes them once they're older than `cleanupPeriodDays`, which is 30 days by default. cl_audit's longest view is 30 days.

The history is a record of tokens. It doesn't tell you how close a limit is: for that, cl_audit reads each profile's 5-hour and weekly limits from Anthropic, and shows them on the cards and in the Dock. See [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) for how those become alerts.

## History for each account

The history is kept for each profile, the same way the limits are. If you use [multiple Claude accounts](/use-cases/multiple-claude-accounts/), each profile has its own Claude Code folder, and so its own session files. cl_audit reads each folder separately and colours the bars by profile.

That lets you answer questions that one account's `/usage` screen can't:

- Which account do I use for which projects?
- Is my work seat getting the long agent runs, or is my personal plan?
- Did the weekend usage come from the account I thought it did?

The **Show** chips pick which profiles are in the charts: one, two or all. A profile that is "usage only", with both its Dock icon and Claude window off, is read too, so it appears in the history as well.

## How it compares with /usage and ccusage

Claude Code has a built-in `/usage` command, and there is a well-known open-source command-line tool called ccusage. All three read local data, but they answer different questions. This table is based on Anthropic's cost-management page and the ccusage README, both checked on 2 November 2026.

| | cl_audit | `/usage` in Claude Code | ccusage |
|---|---|---|---|
| What it is | A Mac app with a dashboard, Dock icons and alerts | A command inside Claude Code | A command-line tool, run with `npx ccusage@latest` |
| Where you see it | The dashboard in the cl_audit window | The terminal, in Claude Code | The terminal |
| Time range | 24 h, 7 d, 30 d | Last 24 hours or last 7 days for the plan breakdown | Daily, weekly, monthly and per-session reports, plus 5-hour blocks |
| Split by | Project, model and surface | Skills, subagents, plugins and MCP servers (plan breakdown) | Options include a project filter and a breakdown |
| Several accounts | One history per profile, shown together or one at a time | The account Claude Code is signed in to | Not covered on the README page |
| Plan limits | 5-hour and weekly limits in the Dock and on the cards | Plan usage bars for the account you're signed in to | Shows 5-hour billing windows and dollar costs; the README doesn't describe plan-limit percentages |
| Cost | Free, source-available (PolyForm Perimeter 1.0.1) | Part of Claude Code | Free, MIT licence |

Where each makes more sense:

- **`/usage`** is already there. If you just want to know where your plan usage went in the last day or week, and you are in the terminal anyway, it needs nothing installed. Anthropic's page says its breakdown is approximate and counts only this machine's sessions.
- **ccusage** suits people who want reports in the terminal or as JSON, want dollar figures from token prices, or use other coding agents as well; its README lists many besides Claude Code.
- **cl_audit** is for people who want a picture rather than a report, across several Claude profiles, with the limits showing in the Dock and alerts when they near. It is a Mac app and needs Apple silicon.

You don't have to choose. Each one answers a different question.

## What stays on your Mac

The history is read on your Mac and stays there. cl_audit has no server, no analytics and no sign-up. Its only network requests go to Anthropic's own server, to read each profile's usage limits and which account a profile is signed in to. The session files are not sent anywhere.

Because those files are plain text and can contain whatever passed through a session, Anthropic's docs suggest you shorten `cleanupPeriodDays` if you want them kept for less time. cl_audit only reads the five fields above, and saves the resulting usage figures for each profile, which are removed when you remove the profile.

If you want to check this for yourself, cl_audit's source is open to read, and the [FAQ](/faq/) explains what it reads and sends. To try the history on your own sessions, [download cl_audit](/install/) and add a profile for each Claude Code folder you use. The overall picture is on the [Claude usage tracker](/) page.
