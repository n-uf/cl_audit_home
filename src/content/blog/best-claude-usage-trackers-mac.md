---
title: "Best Claude usage trackers for Mac (2026) | cl_audit"
description: "The best Claude usage tracker for Mac depends on where you want to see it: menu bar, Dock, terminal or browser. Eight tools compared from their own pages."
h1: "Best Claude usage trackers for Mac (2026)"
mainKeyword: "best claude usage tracker"
kind: best-tools
published: 2026-11-02
updated: 2026-11-12
author: n-uf
takeaways:
  - "Which Claude usage tracker suits you depends on where you want to see your usage: the menu bar, the Dock, the terminal or the browser."
  - "Five of the eight tools here are menu bar apps (ClaudeUsageBar, Claude Usage Tracker, Usagebar, CodexBar and ClaudeBar); ccusage is a terminal tool and Claude Monitor is a browser extension."
  - "cl_audit shows each profile's 5-hour and weekly limits in its own Dock icon, and can add a menu bar icon per profile and a widget. It is our own tool, and mainly a Dock app."
  - "Claude Usage Tracker also handles several accounts: its README describes multiple profiles, all visible in the menu bar at once."
  - "You can check your usage without installing anything: Settings ▸ Usage on claude.ai, or /usage in Claude Code."
faq:
  - q: "What is the best Claude usage tracker for Mac?"
    a: "It depends on where you want to see your usage. A menu bar app suits a quick glance, ccusage suits terminal reports, and for several accounts there's Claude Usage Tracker in the menu bar or cl_audit in the Dock. cl_audit is our own tool, so check the others' pages too."
  - q: "Is there a Claude usage widget for Mac?"
    a: "Only cl_audit, our own tool, has one: \"Claude usage\" in the widget gallery on macOS 14 or later. The other tools here are not desktop widgets; most live in the menu bar. ClaudeBar's README also lists a Notch view and a Touch Bar view."
  - q: "Which Claude usage trackers are on GitHub?"
    a: "ClaudeUsageBar, Claude Usage Tracker, CodexBar, ClaudeBar, ccusage and cl_audit all publish their source on GitHub, and Claude Monitor's page says its source is there too. Usagebar's page doesn't mention a public repository."
  - q: "Do I need a tracker to see my Claude usage?"
    a: "No. Anthropic's help page says Settings ▸ Usage shows how much you have used and the time remaining, and its Claude Code docs say /usage shows plan usage bars to subscribers. A tracker saves you opening those, and some add history or alerts."
  - q: "Can a tracker show several Claude accounts at once?"
    a: "Some can. cl_audit's README describes profiles that each hold one or more Claude accounts, and Claude Usage Tracker's README describes multiple profiles in the menu bar. ClaudeBar lists several logins for Codex; the other pages don't mention several Claude accounts."
sources:
  - title: "cl_audit README (n-uf)"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-08
    supports: "no cl_audit server; nothing else goes over the network except what you type in Quick chat (26.11.3), which Claude Code sends to Anthropic"
  - title: "cl_audit home page"
    url: "https://cl-audit.n-uf.com/"
    checked: 2026-11-02
  - title: "cl_audit dashboard demo"
    url: "https://cl-audit.n-uf.com/dashboard/"
    checked: 2026-11-02
  - title: "ClaudeUsageBar README"
    url: "https://github.com/Artzainnn/ClaudeUsageBar"
    checked: 2026-11-02
  - title: "Claude Usage Tracker README"
    url: "https://github.com/hamed-elfayome/Claude-Usage-Tracker"
    checked: 2026-11-02
  - title: "Usagebar home page"
    url: "https://usagebar.com"
    checked: 2026-11-02
  - title: "CodexBar README"
    url: "https://github.com/steipete/CodexBar"
    checked: 2026-11-02
  - title: "ClaudeBar README"
    url: "https://github.com/tddworks/ClaudeBar"
    checked: 2026-11-02
  - title: "ccusage README"
    url: "https://github.com/ccusage/ccusage"
    checked: 2026-11-02
  - title: "ccusage documentation"
    url: "https://ccusage.com"
    checked: 2026-11-02
  - title: "Claude Monitor home page"
    url: "https://claude-monitor.com"
    checked: 2026-11-02
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Claude Code docs: Manage costs effectively (the /usage command)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
  - title: "cl_audit CHANGELOG, 26.11.18"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.18: before the sign-in a switch closes the profile's Claude window, makes a backup and moves its Code-tab sessions and scheduled tasks to the account switched to, each checked, with a receipt; a session a running Claude Code owns stays until a later switch."
    quote: "The switch moves the Claude window's sessions inside the one folder"
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
related:
  - /
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-code-usage-history/
  - /blog/ccusage-alternative/
---

The best Claude usage tracker for you depends on where you want to see your usage. For one account and a percentage in the menu bar, there are five menu bar apps to pick from. For reports in the terminal, there's ccusage. For several Claude accounts on one Mac, Claude Usage Tracker shows them in the menu bar, and cl_audit gives each one its own Dock icon. cl_audit is our tool, so read this list with that in mind. It is an independent tool, not affiliated with Anthropic.

## How we compared

We compared the tools by where and how they show usage, not by which is better. Every tool other than cl_audit is described only from its own README or home page, read on 2 November 2026 and linked below. We didn't install, test or benchmark them, and we don't rank them on accuracy or quality.

For each one we noted where it shows usage, whether its page describes more than one Claude account, whether you can look back at history, the price, the licence and the macOS version it needs. "Not stated" or "not mentioned" in the table means the page is silent on it. The tool may still do it.

Trackers answer one of two questions, and a few answer both. Some show your limits: how much of your 5-hour limit and weekly limit is used. Anthropic's help page says the 5-hour limit starts when you send your first message and resets in full five hours later, and that usage on claude.ai, Claude Code and Claude Desktop counts towards the same limit. Others count tokens and cost from the logs on your Mac.

You may not need a tracker at all. Anthropic's help page says Settings ▸ Usage shows how much you've used and the time remaining. Claude Code's docs say subscribers see plan usage bars in `/usage`. A tracker earns its place when you want the figure always in view, alerts, history, or several accounts side by side.

## At a glance

| Tool | Shows usage in | Several accounts | History | Price | Licence | Needs |
|---|---|---|---|---|---|---|
| cl_audit | Dock icons (one per profile) and a window | Yes, one or more accounts per profile | Yes: tokens per day from Claude Code's session files, over 24 h / 7 d / 30 d, with CSV export and a cost estimate at API list prices | Free | PolyForm Perimeter 1.0.1 (source-available) | Apple silicon, macOS 13+, Claude Code signed in |
| ClaudeUsageBar | Menu bar | Not mentioned | Not mentioned | Not stated | MIT | macOS 12+ |
| Claude Usage Tracker | Menu bar | Yes, "unlimited" profiles | Yes, charts over time | Not stated | MIT | macOS 14+ |
| Usagebar | Menu bar | Not mentioned | Not mentioned | $9 one-time, with a free tier | Not stated | macOS, no minimum stated |
| CodexBar | Menu bar | Not stated for Claude | Cost scans and a quota burndown | Not stated | MIT | macOS 14+ |
| ClaudeBar | Menu bar (also Notch and Touch Bar) | Listed for Codex; not stated for Claude | Daily cost and tokens, today next to yesterday | Not stated | Apache 2.0 | macOS 15+ |
| ccusage | Terminal | Not mentioned | Yes: daily, weekly, monthly and session reports | Not stated | MIT | No operating system named |
| Claude Monitor | Browser toolbar and a bar above the chat box | Not mentioned | Not mentioned | Free | MIT | Desktop Chrome, Firefox or Edge |

## The tools, one by one

### cl_audit

cl_audit is a free, source-available Mac app. Each profile is one Claude setup: a Claude Code folder with its sign-in, and optionally a Claude window and a Dock icon. Turn on **Usage in the Dock** and the profile gets its own small Dock icon showing its 5-hour limit and weekly limit. When a limit is full, the icon counts down to when the profile is back ("back at 15:28"), and with **Notify when back** on, cl_audit sends an alert at the reset. The dashboard shows every profile in one window.

![Dock icons showing three Claude profiles' usage limits](/img/guides/dock-profiles.webp "cl_audit's Dock icons: home at 34% of its 5-hour limit, work full and counting down, side at 12%. Sample data.")

The limits are read from Anthropic for each profile, with that profile's Claude Code sign-in. Usage history comes from Claude Code's session files on your Mac, so it covers the Terminal, the desktop Code tab, VS Code and SDK apps: tokens per day, by project, model and surface. The README says there is no cl_audit server and nothing else goes over the network, apart from what you type into its optional Quick chat, which Claude Code sends to Anthropic. You can [try the dashboard demo](/dashboard/) without installing.

Where it isn't the pick:

- It's still mainly a Dock app. A menu bar icon per profile is off by default ([how the menu bar icons work](/use-cases/claude-usage-menu-bar-mac/)), and the widget needs macOS 14 or later.
- It needs a Mac with Apple silicon and macOS 13 or later, plus Claude Code signed in for each profile. The Claude app is only needed for Claude windows.
- An API-key profile has no limits to show.
- It isn't signed with an Apple Developer ID yet, so the first time, macOS makes you click Open Anyway.

More: [track Claude usage on your Mac](/), [several Claude accounts on one Mac](/use-cases/multiple-claude-accounts/).

### ClaudeUsageBar

[ClaudeUsageBar](https://github.com/Artzainnn/ClaudeUsageBar) calls itself "a lightweight, open-source macOS menu bar application" for your Claude.ai session (5-hour) and weekly usage. A percentage sits next to a spark icon, and the README says it refreshes every five minutes. It is MIT licensed and needs macOS 12 or later. You install it from a DMG on the Releases page, or build it with the included script.

It reads your usage with your browser's session cookie: during setup you copy the Cookie value from the usage request in your browser's developer tools. The README warns that it relies on claude.ai's internal API endpoints, which "may change without notice". It doesn't mention several accounts or history.

### Claude Usage Tracker

[Claude Usage Tracker](https://github.com/hamed-elfayome/Claude-Usage-Tracker) is a native macOS menu bar app for the 5-hour session, the weekly limit and Opus-specific usage, with a popover for the details. Its README also lists:

- multiple profiles: "Manage unlimited Claude accounts with isolated credentials and settings", with all profiles visible in the menu bar at once;
- charts of session, weekly and billing data over time;
- a Claude Code status line in the terminal, and a `claude-<profile>` command per profile;
- automation, such as starting a new session when usage resets and switching to the next profile when a session limit is reached.

cl_audit has no such automation. It doesn't start sessions, and it never switches on its own. A profile can switch to another of your own accounts, but only when you ask it to, and the switch is meant to move that profile's Code sessions and scheduled tasks to the new account, after a backup. Switching is experimental and can lose data.

{{experimental: switch}}

Claude Usage Tracker signs in with your Claude Code credentials if you use Claude Code, through a built-in browser sign-in, or with a session key you paste. It is MIT licensed, needs macOS 14 or later, and installs with Homebrew, Nix, a zip or Xcode. The README states no price.

### Usagebar

[Usagebar](https://usagebar.com) is a menu bar app for Claude Code's 5-hour and weekly limits: the percentage used, reset timers and notifications. Its page says it reads the OAuth credentials Claude Code stores in the macOS Keychain and calls Anthropic's usage endpoint directly. The price is "$9 one-time, lifetime updates", and the page says there's a free tier too. It doesn't state a licence or a minimum macOS version, and doesn't mention several accounts or history.

### CodexBar

[CodexBar](https://github.com/steipete/CodexBar) is a macOS 14+ menu bar app for the limits of many AI coding tools, Codex and Claude among them. You get one status item per provider, or a merged icon with a provider switcher. For Claude, the README lists the OAuth API, browser cookies or a command-line fallback, with session and weekly usage "where available". It also does cost-usage scans for Claude and Codex, and ships a command-line tool for scripts. It is MIT licensed and installs with Homebrew or a download. The README states no price and doesn't say whether it tracks several Claude accounts.

### ClaudeBar

[ClaudeBar](https://github.com/tddworks/ClaudeBar) covers Claude, Codex, Gemini, Copilot, Cursor and more from the menu bar. For Claude it lists the 5-hour and weekly limits, model limits and Extra Usage. Up to three providers fit in the menu bar. There's also a Notch view, a Touch Bar view, forecasts and webhooks, and a daily view with today's cost and tokens next to yesterday's. Separate logins with independent quotas are listed for Codex. It is Apache 2.0 licensed, needs macOS 15 or later, and installs with Homebrew or a signed DMG.

### ccusage

[ccusage](https://github.com/ccusage/ccusage) is a command-line tool that, in its README's words, analyses coding-agent CLI token usage and costs from local data. Run `npx ccusage@latest` for daily, weekly, monthly and session reports. The `blocks` report covers Claude Code's 5-hour billing windows, and there's a status line for Claude Code, marked Beta. Costs are in USD, `--json` prints JSON, and it also reads Codex, OpenCode, Gemini CLI and many other tools. It is MIT licensed. The README doesn't name an operating system or describe several accounts. We compare the two more closely in [ccusage alternative](/blog/ccusage-alternative/).

### Claude Monitor

[Claude Monitor](https://claude-monitor.com) is a browser extension for desktop Chrome, Firefox and Edge; the page says it also works in Brave, Vivaldi and Opera. It shows your limits in the toolbar and, if you turn it on, in a bar above claude.ai's chat box. It reads five claude.ai usage paths with the session your browser already has, and the page says usage data stays in the browser's local storage. It is free and MIT licensed. The page doesn't mention macOS, several accounts or history.

## Which is the best Claude usage tracker for you?

How we'd choose, including when it isn't cl_audit:

- **One account, usage in the menu bar:** any of ClaudeUsageBar, Claude Usage Tracker, Usagebar, CodexBar or ClaudeBar. Decide by the macOS version you run, how the app signs in, and whether you'd pay.
- **Terminal reports, scripts or cost estimates:** ccusage. Our [ccusage alternative](/blog/ccusage-alternative/) article sets it against cl_audit.
- **Usage in the browser, no app:** Claude Monitor.
- **Claude and other AI coding tools in one place:** CodexBar or ClaudeBar.
- **Several accounts in the menu bar:** Claude Usage Tracker. Its README also lists usage charts, a `claude-<profile>` command for each profile and automatic profile switching.
- **Several accounts, each in its own Dock icon:** cl_audit, a [Claude usage tracker](/) built around profiles, with alerts per profile and [your Claude Code history by day](/use-cases/claude-code-usage-history/), split by project, model and surface. If that's what you want, [download cl_audit](/install/).
- **An occasional look:** Settings ▸ Usage or `/usage`, and skip the install.

## Is there a Claude usage widget for Mac?

Only cl_audit, our own tool. Its "Claude usage" widget is in the macOS widget gallery (macOS 14 or later) and shows every profile's 5-hour and weekly limits in three sizes. Its look is set in Settings ▸ General ▸ Widget. The five menu bar apps stay in the menu bar. ClaudeBar's README also lists a Notch view and a Touch Bar view. If you need a desktop widget from another tool, check each project's page, since they change. How to add it, what it draws for one profile or several, and how to set its look are on the [Claude usage widget for Mac](/use-cases/claude-usage-widget-mac/) page.

## Is there a Claude usage tracker on GitHub?

Yes, several. ClaudeUsageBar, Claude Usage Tracker, CodexBar, ClaudeBar and ccusage publish their source on GitHub, Claude Monitor's page says its source is there too, and cl_audit's is at github.com/n-uf/cl_audit. cl_audit's licence is source-available, not open source: you may use, change and share it, but not to build a product that competes with it. The others state MIT or Apache 2.0.

## What is a good ClaudeBar alternative?

That depends on why you're looking. ClaudeBar needs macOS 15 or later; Claude Usage Tracker needs 14, cl_audit 13 and ClaudeUsageBar 12. ClaudeBar covers many providers, so if you only use Claude, a Claude-only app may be simpler. If you'd rather have usage in the Dock than the menu bar, cl_audit is the one here that does that.

## Before you pick

Trackers depend on how Claude reports usage. cl_audit's README says it relies on Anthropic's usage figures, which aren't public interfaces, so a newer Claude version can change them. ClaudeUsageBar's README says the same about claude.ai's internal endpoints. If a tracker stops updating after a Claude update, look for a new version on the project's page.

Whichever you choose, whether you may use more than one Claude account is set by Anthropic's terms, not by any tracker. There's more on that in [managing multiple Claude accounts](/use-cases/multiple-claude-accounts/).
