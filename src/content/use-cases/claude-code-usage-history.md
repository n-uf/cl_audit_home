---
title: "Claude Code usage history by project and model | cl_audit"
description: "See your Claude Code usage history on a Mac: when you use Claude, tokens per day, and the split by project, model and surface, read from local files. Free."
h1: "Claude Code usage history on your Mac"
mainKeyword: "claude code usage history"
kind: use-case
published: 2026-11-02
updated: 2026-11-09
author: n-uf
order: 3
takeaways:
  - "cl_audit reads the session files Claude Code already writes on your Mac and charts your Claude Code usage history over 24 hours, 7 days or 30 days."
  - "It shows when you use Claude, tokens per day, and where they go by project, model and surface (Terminal, the desktop Code tab, VS Code, SDK apps)."
  - "The history is kept for each profile, so you can see one account or several together, and the CSV key saves it as a file."
  - "Nothing is uploaded: only the time, model, token counts, project folder and surface of each reply are read, on your Mac."
  - "Usage from claude.ai chats, other computers and cloud sessions isn't in it, because those don't write session files on this Mac."
faq:
  - q: "Where does Claude Code store its usage history?"
    a: "In plain-text session files on your Mac, one per session, under a projects folder in Claude Code's folder (~/.claude by default, or your CLAUDE_CONFIG_DIR folder). Anthropic's docs say Claude Code deletes most of them after 30 days by default, though from v2.1.248 it keeps sessions started or last continued in Claude Desktop or Cowork unless you set desktopSessionCleanupPeriodDays, your organisation's managed settings set cleanupPeriodDays, or HIPAA applies. cl_audit reads these files to draw the history."
  - q: "Can I see usage by project?"
    a: "Yes. The \"Where it goes\" chart splits the share of tokens in the period by project, by model and by surface, so you can see which project or which model used most. The profile chips next to the period keys filter it to one account or more."
  - q: "Does it count cache reads?"
    a: "Not in the tokens chart: it counts input, cache writes and output, and says on the chart that cache reads are not counted. The cost estimate in the totals does include them, priced apart at the API's cache-read rate. The CSV export lists each kind of token separately, cache reads included."
  - q: "Can I export the history?"
    a: "Yes. The CSV key next to the period saves one row per day, profile and model, with each kind of token and the cost estimate, and it can split rows by project."
  - q: "Is anything uploaded?"
    a: "Not the history: it is read from files on your Mac. cl_audit has no server and no analytics. It asks Anthropic for each profile's limits and which account it is signed in to, and what you type in its optional Quick chat goes to Anthropic through Claude Code."
sources:
  - title: "Claude Code docs: Explore the .claude directory (Cleaned up automatically)"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-07
    supports: "cleanupPeriodDays defaults to 30 days; Desktop and Cowork transcripts kept from v2.1.248"
    quote: "Requires Claude Code v2.1.248 or later; earlier versions delete them after cleanupPeriodDays."
  - title: "Claude Code docs: All settings (cleanupPeriodDays, desktopSessionCleanupPeriodDays)"
    url: "https://code.claude.com/docs/en/settings-reference"
    checked: 2026-11-07
    supports: "desktopSessionCleanupPeriodDays sets an age limit for Claude Desktop and Cowork transcripts"
    quote: "Set an age limit in days for Claude Desktop and Cowork transcripts"
  - title: "Claude Code docs: Manage costs effectively (the /usage command)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-05
  - title: "Claude Code docs: Settings (CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-02
  - title: "ccusage README (ryoppippi/ccusage)"
    url: "https://github.com/ccusage/ccusage"
    checked: 2026-11-02
  - title: "cl_audit README at v26.11.3 (n-uf): Quick chat"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.3/README.md#quick-chat"
    checked: 2026-11-08
    supports: "what you type in Quick chat goes to Anthropic through Claude Code"
    quote: "Nothing but your messages is sent, and only through Claude Code."
  - title: "cl_audit README at v26.11.10 (n-uf): The default profile, How cl_audit tells what Claude Code deletes"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    supports: "The first profile is the default profile, on ~/.claude; a session deleted or archived in the Claude window is cleaned up like the others."
    quote: "The default profile is the one on `~/.claude` with the usual Claude app"
related:
  - /
  - /dashboard/
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-usage-limit-alerts/
---

cl_audit shows your Claude Code usage history from the session files Claude Code already writes on your Mac: when you use Claude, tokens per day, and where they go by project, model and surface (Terminal, the desktop Code tab, VS Code, SDK apps). Your usage history isn't uploaded. cl_audit is an independent tool, not affiliated with Anthropic.

Pick 24 h, 7 d or 30 d and the charts redraw. It's free, and it runs on a Mac with Apple silicon and macOS 13 or later.

## What the history shows

**Usage history** sits below the profile cards on the dashboard. It has three charts, and a key for each turns it on or off.

![Claude Code usage history by hour, day and project](/img/guides/usage-history.webp "Claude Code usage history, read from session files on the Mac: when, tokens per day, and where they go. Sample data.")

- **When you use Claude.** A heatmap of replies per hour, days against hours. Evening-heavy weeks and quiet weekends stand out at once.
- **Tokens per day.** A bar for each day, per profile; in the 24 h view it becomes tokens per hour. The note on the chart says what's counted: input + cache writes + output. Cache reads are not counted.
- **Where it goes.** The share of tokens in the period by project, by model and by surface. The project is the folder you worked in. The surface is where Claude Code ran.

Above the charts, a small display gives the period's totals: replies, tokens and a cost estimate, such as "1,242 replies · 34.2M tokens · ≈ $982.12 at list prices". The estimate is what the same tokens would cost on Anthropic's API at list prices, per model. It isn't your bill, and models without a published price are left out. The **CSV** key next to the period saves the history as a file, one row per day, profile and model. The period you pick and the **Show** chips are kept between launches.

You can click through all of it on the [demo dashboard](/dashboard/), which runs on sample data for three made-up profiles: home, work and side.

## Export the history to CSV

The CSV file has one row per day, profile and model, with the replies, each kind of token (input, output, 5-minute and 1-hour cache writes, cache reads) and the cost estimate. Rows can also be split by project, by folder name only.

The estimate prices cache writes and cache reads apart. The prices are built into cl_audit, dated, and updated with its releases.

## How do you check Claude usage history by project or model?

Open the dashboard, pick a period and read the chart. Some questions this answers quickly:

- **Which project used most of my tokens this week?** Pick 7 d and read the project split in "Where it goes".
- **Did switching models change my usage?** Compare the model split in the 7 d and 30 d views. That's your Claude token usage by model, as a share of the period.
- **When did that long run happen?** In 24 h the tokens chart goes per hour, so a long run is one tall bar, and the heatmap shows the hours it covered.
- **Is this a one-off or an ordinary week?** The 30 d view puts a heavy day next to the ordinary ones.

## Where the history comes from

Claude Code writes a transcript of each session as a plain-text file on your Mac. Anthropic's docs give the path: `projects/<project>/<session>.jsonl`, one file per session, inside Claude Code's folder. That folder is `~/.claude`, unless you set `CLAUDE_CONFIG_DIR`; then Claude Code keeps its settings, session history and plugins there instead.

cl_audit reads those session logs. From each reply it takes the time, the model, the token counts, the project folder and the surface. Nothing else from the file goes into the history.

That source sets two limits.

It's the history of this Mac only. claude.ai chats, other computers and cloud sessions don't write session files here, so their usage isn't in it.

And Claude Code doesn't keep the files forever. Anthropic's docs say it deletes most of them once they're older than `cleanupPeriodDays`, 30 days by default. Since Claude Code v2.1.248, sessions you started or last continued in Claude Desktop or Cowork are kept at any age, unless `desktopSessionCleanupPeriodDays` or your organisation's managed settings set a limit, or the HIPAA configuration applies. A session you deleted or archived in the Claude app is cleaned up like the rest. cl_audit's longest view is 30 days.

The history counts tokens. It doesn't say how close you are to a limit: for that, cl_audit reads each profile's 5-hour and weekly limits from Anthropic and shows them on the cards and in the Dock. [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) covers how those turn into alerts.

## Claude Code usage history for each account

The history is kept per profile, like the limits. If you use [multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/), each profile has its own Claude Code folder, and so its own session files: `~/.claude` for the first, default profile, and one such as `~/.claude-work` for each profile you add. cl_audit reads each folder separately and colours the charts by profile.

So you can ask things about your accounts together:

- Which account do I use for which projects?
- Is the work seat getting the long agent runs, or the personal plan?
- Did the weekend usage come from the account I thought it did?

The **Show** chips choose which profiles are in the charts. A "usage only" profile, with Usage in the Dock and Claude window both off, is still read, so it's in the history too.

## How it compares with /usage and ccusage

Claude Code has a built-in `/usage` command, and ccusage is a well-known open-source command-line tool. All three read local data, but they answer different questions. The table is based on Anthropic's cost-management page (checked on 5 November 2026) and the ccusage README (2 November 2026).

| | cl_audit | `/usage` in Claude Code | ccusage |
|---|---|---|---|
| What it is | A Mac app with a dashboard, Dock icons and alerts | A command inside Claude Code | A command-line tool, run with `npx ccusage@latest` |
| Where you see it | The dashboard in the cl_audit window | Claude Code, in the terminal | The terminal |
| Time range | 24 h, 7 d, 30 d | Last 24 hours or last 7 days for the plan breakdown | Daily, weekly, monthly and per-session reports, plus 5-hour blocks |
| Split by | Project, model and surface | Skills, subagents, plugins and MCP servers (plan breakdown) | Project (`--instances`, `--project`) and model (`--breakdown`) |
| Several accounts | One history per profile, shown together or one at a time | The account Claude Code is signed in to | Not covered on the README page |
| Plan limits | 5-hour and weekly limits in the Dock and on the cards | Plan usage bars for the account you're signed in to | 5-hour billing windows and dollar costs; the README doesn't describe plan-limit percentages |
| Dollar figures | An estimate at API list prices in the totals and the CSV; not a bill | A session cost, which Anthropic's docs say isn't relevant for billing for Pro, Max and Ultra subscribers | Costs in USD, estimated from token counts |
| Price | Free, source-available (PolyForm Perimeter 1.0.1) | Part of Claude Code | Free, MIT licence |

Where each makes more sense:

- **`/usage`** is already there. If you're in the terminal and want to know where your plan usage went in the last day or week, it needs nothing installed. Anthropic's page says its breakdown is approximate and counts only this machine's sessions.
- **ccusage** suits you if you want reports in the terminal or as JSON, dollar figures from token prices, or one report across other coding agents too; its README lists many besides Claude Code.
- **cl_audit** fits if you'd rather see a chart than read a report, use several Claude profiles, and want the limits in the Dock with alerts as they near. It's a Mac app and needs Apple silicon.

Nothing stops you using two of them, or all three.

## What stays on your Mac

The history is read on your Mac and stays there. cl_audit has no server, no analytics and no sign-up. It makes two kinds of request, both to Anthropic's own server: each profile's usage limits, and which account the profile is signed in to. Besides those, what you type in its optional Quick chat goes to Anthropic through Claude Code, like any Claude Code prompt. Session files aren't sent anywhere.

Those files are plain text and hold whatever passed through a session, so Anthropic's docs suggest lowering `cleanupPeriodDays` if you want them kept for less time, and setting `desktopSessionCleanupPeriodDays` to limit Claude Desktop and Cowork sessions too. cl_audit reads only the five fields above. It saves the resulting usage figures per profile, and **Remove profile…** deletes them with the profile.

If you'd rather it didn't read the session files at all, turn off Settings ▸ General ▸ Privacy ▸ **Usage history**. cl_audit then opens none of them, and the dashboard shows the limits only. The limits come from Anthropic either way.

The source is open to read, and the [FAQ](/faq/) lists what cl_audit reads and sends. To see the history for your own sessions, [download cl_audit](/install/) and add a profile for each Claude Code folder you use. The page on [cl_audit's Dock icons](/) has the rest of the app.
