---
title: "How to check Claude usage on a Mac (2026)"
description: "How to check Claude usage on a Mac: Settings > Usage, /usage in Claude Code, a status line or a Dock tracker, and what each one shows."
h1: "How to check Claude usage on a Mac"
mainKeyword: "how to check claude usage"
kind: how-to
published: 2026-11-02
updated: 2026-11-05
author: n-uf
takeaways:
  - "On a Pro, Max, Ultra, Team or seat-based Enterprise plan, Settings > Usage shows the weekly limits and, except on a verified Ultra account, the current 5-hour session, with reset times."
  - "In Claude Code, /usage shows plan usage bars for subscribers; /cost and /stats are aliases."
  - "Claude and Claude Code share one limit, so the same figures apply to claude.ai, the Claude app and Terminal."
  - "Anthropic's own views show one account at a time; a Dock tracker such as cl_audit shows each account's limits side by side."
  - "cl_audit is mainly a Dock app. It can also add a menu bar icon per profile and a \"Claude usage\" widget (macOS 14 or later)."
faq:
  - q: "How do I check my Claude usage?"
    a: "Open Settings > Usage in Claude (claude.ai/settings/usage in a browser). Under Current session it shows how much of your 5-hour limit you've used and how long is left, and it shows when your weekly limits reset. In Claude Code, type /usage."
  - q: "How do I check Claude usage in the terminal?"
    a: "Start claude and type /usage. On a Pro, Max, Ultra, Team or Enterprise plan it shows plan usage bars next to the session cost and activity stats. /cost and /stats are aliases for the same command."
  - q: "Is there a widget for tracking Claude usage on macOS?"
    a: "cl_audit has one: \"Claude usage\" in the widget gallery on macOS 14 or later, with every profile's 5-hour and weekly limits. It is mainly a Dock app, though: each profile's limits are on its own Dock icon and on a dashboard window, and a menu bar icon per profile is optional. Other tools live in the menu bar; the best-trackers article lists them."
  - q: "Does Claude Code use the same limit as claude.ai?"
    a: "Yes. Anthropic's help page says usage on claude.ai and Claude Desktop counts toward the same limit as Claude Code, and the Claude Code help article says activity in both tools counts against the same limits. One check covers all of them."
  - q: "Can I see usage for two Claude accounts at once?"
    a: "Not in Anthropic's own views, which show the account you're signed in to. A tracker that reads each account separately can show both. cl_audit does it with one profile per seat, each with its own Dock icon."
sources:
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Claude Code docs: Authentication (Log in with multiple accounts)"
    url: "https://code.claude.com/docs/en/authentication"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Usage limit best practices"
    url: "https://support.claude.com/en/articles/9797557-usage-limit-best-practices"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Claude Code docs: Commands"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-02
  - title: "Claude Code docs: Manage costs effectively (the /usage command)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
  - title: "Claude Code docs: Customize your status line"
    url: "https://code.claude.com/docs/en/statusline"
    checked: 2026-11-02
  - title: "Claude Code docs: Desktop application (Check usage)"
    url: "https://code.claude.com/docs/en/desktop"
    checked: 2026-11-02
  - title: "Claude Code docs: Use Claude Code in VS Code (Check account and usage)"
    url: "https://code.claude.com/docs/en/vs-code"
    checked: 2026-11-02
  - title: "cl_audit README (n-uf/cl_audit)"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-02
related:
  - /use-cases/claude-code-usage-history/
  - /blog/best-claude-usage-trackers-mac/
  - /use-cases/multiple-claude-accounts/
  - /
---

How to check Claude usage on a Mac comes down to two places. Open Settings > Usage in the Claude app, or go to claude.ai/settings/usage: the "Current session" bar is your 5-hour limit, and the weekly bars are below it. In Claude Code, type `/usage` for the same plan bars in Terminal. If you want the numbers in view without opening anything, a tracker can keep them in the Dock or the menu bar.

What follows about Claude's own screens and commands comes from Anthropic's help pages and the Claude Code docs, read on 2 November 2026. Those screens change. If a label on your Mac differs, trust the screen.

## Settings > Usage in the Claude app

To check Claude usage in the app, go to Settings and pick **Usage**. Anthropic's help page calls it "Settings > Usage" and doesn't give separate steps for the desktop app. The page shows:

- **Current session**: how much of your five-hour limit you've used and how much time remains.
- **Weekly limits**: how much of the weekly limit you've used, and when it resets. Each account has a fixed weekly reset time, the help page says.

It applies to paid plans with fixed allowances: Pro, Max, Ultra, Team and seat-based Enterprise. Usage-based Enterprise plans are billed by consumption instead. Verified Ultra accounts don't have a five-hour limit, according to the same page, so that bar won't be there. For what the two limits are, see [Claude usage limits explained](/blog/claude-usage-limits/).

The five-hour period starts when you send your first message, and the allowance comes back in full five hours later. Usage in Claude, Claude Desktop and Claude Code all counts toward the same limit, so the bar in Settings > Usage moves when you work in Terminal too. The article on [when Claude limits reset](/blog/claude-limit-reset-time/) covers the reset side.

The **Code** tab in the Claude app has its own way in. The Claude Code docs say the usage ring in the row under the prompt box opens your plan usage, shared across all your Claude Code surfaces. The context window figure next to it is something else. It shows how full this session's context is, not your plan limit.

## How to check Claude usage in Claude Code

Claude Code has three ways to show usage, and they answer different questions.

### /usage for plan limits

To check Claude usage in the terminal, start `claude` and type:

```text
/usage
```

The commands reference says `/usage` shows session cost, plan usage limits and activity stats. `/cost` and `/stats` are aliases; `/stats` opens on the Stats tab. On a Pro, Max, Ultra, Team or Enterprise plan you also get a breakdown of what counts against your plan limits, with recommendations. The dollar figure in the Session block is aimed at API users. On a subscription, the docs say, it isn't relevant for billing.

From the docs:

- The breakdown covers a window you switch with `d` (last 24 hours) and `w` (last 7 days).
- Its figures are approximate, computed from local session history on that machine. Usage from other devices or claude.ai isn't in the breakdown. The plan bars are your plan's limits, not that local count.
- If the request for your plan limits fails, `/usage` shows the last bars it loaded in the past 60 minutes, with a "Showing last-known usage" note. Press `r` to retry.
- "Rate limited until 3:14am" in `/usage` means Claude Code can't fetch your plan limits again until then. It doesn't mean your work with Claude is limited.

Claude Code runs `/status`, `/tasks` and `/usage` straight away, even while Claude is answering. You don't have to wait for the turn to finish.

In VS Code, `/usage` opens an "Account & usage" dialog with the same plan bars for a claude.ai plan.

### What /status shows

`/status` opens the Settings interface on the Status tab: version, model, account and connectivity, per the commands reference. Use it to see which account a session is signed in to.

Anthropic's help article on Claude Code with a Pro or Max plan still says to monitor your remaining allocation with `/status`. The commands reference puts plan limits under `/usage`, so that's the one to run.

### A status line under the prompt

If you want the numbers visible while you work, Claude Code can draw a status line under the prompt. You set it in `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

Or run `/statusline` and describe what you want; Claude Code writes the script and the setting for you. Your script receives JSON on stdin. For claude.ai subscribers that JSON can contain `rate_limits.five_hour` and `rate_limits.seven_day`, each with `used_percentage` and `resets_at`. A short script based on the one in Anthropic's docs:

```bash
#!/bin/bash
input=$(cat)
FIVE_H=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
WEEK=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')

LIMITS=""
[ -n "$FIVE_H" ] && LIMITS="5h: $(printf '%.0f' "$FIVE_H")%"
[ -n "$WEEK" ] && LIMITS="${LIMITS:+$LIMITS }7d: $(printf '%.0f' "$WEEK")%"
echo "$LIMITS"
```

It needs `jq`. Per the docs, `rate_limits` is only there for claude.ai Pro, Max and Ultra subscribers (or behind a Claude apps gateway), and only after the first API response in a session. So the line is empty when you start.

Status lines run in Terminal. cl_audit's README notes that the Claude app's Code tab doesn't run them.

{{live:/blog/claude-code-status-line/}}Our [Claude Code status line guide](/blog/claude-code-status-line/) has the setup, working examples and how to customize the line.{{/live}}

## On claude.ai in a browser

Go to claude.ai/settings/usage. It's the same page as in the app, and it shows only the account you're signed in to, so sign in to the right one first.

Team and Enterprise owners have a second view. The Claude Code docs describe a spend report in organization analytics and, for usage credits, **Organization settings > Usage**. Those are for admins and cover spend and adoption, not your seat's 5-hour bar. Members see their own seat in Settings > Usage like everyone else.

## With a usage tracker in the Dock or the menu bar

![Dock icons showing three Claude profiles' usage limits](/img/guides/dock-profiles.webp "cl_audit in the Dock: each profile's icon shows its 5-hour and weekly limits; the work profile is full and counts down. Sample data.")

Settings > Usage is a page, `/usage` is a command, and a status line only lives in Claude Code. Each one means opening something. A tracker app keeps the number on screen and can tell you when a limit is nearly full. The kinds:

| Kind | Where you see usage | What it reads | Good for |
|---|---|---|---|
| Anthropic's own views | Settings > Usage, `/usage`, the Code tab's usage ring | Your plan, directly | One account, nothing to install |
| A status line script | Under the Claude Code prompt | The JSON Claude Code passes it | Terminal-only work, a few lines of shell |
| A terminal report tool | Command output | Claude Code's local session files | Token counts and history, not live limits |
| A menu bar app | The macOS menu bar | Varies by tool | A permanent number in the top bar |
| A Dock app | A Dock icon per account | Anthropic's usage figures, per account | Several accounts, alerts, one glance |

The [best Claude usage trackers for Mac](/blog/best-claude-usage-trackers-mac/) compares specific tools from their own READMEs, including where each makes more sense.

cl_audit is our tool, and it's the Dock one: a free, source-available Mac app. It's an independent tool, not affiliated with Anthropic. cl_audit's background agent reads each profile's 5-hour and weekly usage from Anthropic with that profile's Claude Code sign-in, and each profile can have its own Dock icon showing the numbers. Double-click the icon for the details panel. With a [Claude usage tracker](/) in the Dock, there's no window to open.

The same agent sends a Mac notification when a limit reaches a level you choose, and another when a full limit is back (Notify when back). The page on [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) has the details.

It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. It relies on how Claude Code saves its login and on Anthropic's usage figures, and neither is a public interface. A newer Claude version can change them; the fix is to update cl_audit. The README lists the Claude Code version each release was checked with. cl_audit only reads usage. It doesn't change anything about your plan.

### Is there a widget for tracking Claude usage on macOS?

From cl_audit, yes. "Claude usage" appears in the macOS widget gallery (macOS 14 or later) and shows every profile's 5-hour and weekly limits, in three sizes. Its look is set in Settings ▸ General ▸ Widget. cl_audit itself is still mainly a Dock app, with Dock icons, one small app per profile, plus a dashboard window for the full picture. Each profile can also have its own menu bar icon, off by default (profile settings ▸ Menu bar). For other menu bar numbers, look at the best-trackers article. The [FAQ](/faq/) covers what else cl_audit does and doesn't do.

### Usage history

Limits tell you how full you are, not where it went. Claude Code writes session files on your Mac, and cl_audit reads them (only time, model, token counts, project folder and surface of each reply). From those it charts tokens per day and where they go by project, model and surface, over 24 hours, 7 days or 30 days. Nothing is uploaded. Usage from claude.ai chats, other computers or cloud sessions isn't in it. The totals add a cost estimate at API list prices, which isn't your bill, and the **CSV** key saves the period as a file. See [Claude Code usage history](/use-cases/claude-code-usage-history/), or the [demo dashboard](/dashboard/) with sample data.

## For several accounts at once

Anthropic's views show the account you're signed in to. With a personal plan and a work seat, you check one, sign out, sign in and check the other. In Claude Code you can run a separate account in each configuration folder with `CLAUDE_CONFIG_DIR`, as Anthropic's authentication docs describe, and each folder has its own `/usage`. You still look at them one at a time.

A tracker that reads each account separately shows them together. In cl_audit each Claude setup is a profile: one Claude Code folder with its sign-in, and optionally a Claude window and a Dock icon. Each profile is linked to one seat (an account plus an organisation), and no two profiles share one. A personal plan and a Team seat on the same email are two seats, so they're two profiles. Both limits for every profile show on the dashboard and on each Dock icon, and an alert names the profile that's full and says when it's back.

cl_audit doesn't pool limits or move work between accounts. It shows what each seat has used. Whether someone may use more than one Claude account is set by Anthropic's terms. The page on [multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) explains the setup.

## Which one to use

- **One account, now and then:** Settings > Usage. Nothing to install.
- **In Claude Code all day:** `/usage` for the detail, a status line if you want the number always visible.
- **Several accounts, or a warning before you hit a limit:** a tracker. If you're on a Mac with Apple silicon and want it in the Dock, you can [download cl_audit](/install/).
