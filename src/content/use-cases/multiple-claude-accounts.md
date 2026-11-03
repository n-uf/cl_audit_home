---
title: "Multiple Claude accounts on one Mac, side by side | cl_audit"
description: "Run several Claude accounts at once on one Mac, such as work and personal, each with its own Claude window, Claude Code folder and Dock icon."
h1: "Multiple Claude accounts on one Mac"
mainKeyword: "multiple claude accounts"
kind: use-case
published: 2026-11-02
updated: 2026-11-02
author: n-uf
order: 1
takeaways:
  - "You can run multiple Claude accounts on one Mac at the same time: cl_audit gives each its own Claude window, Claude Code folder and Dock icon."
  - "Each profile is linked to one seat (account plus organisation), so a personal plan and a Team seat on the same email are two profiles."
  - "Each profile's 5-hour and weekly limits are read separately; cl_audit doesn't pool them or move work between accounts."
  - "Whether one person may hold more than one Claude account is set by Anthropic's terms, not by cl_audit."
  - "cl_audit is free, source-available and runs on Apple silicon Macs with macOS 13 or later."
faq:
  - q: "Can I have two Claude accounts on one computer?"
    a: "Yes. With cl_audit each account becomes a profile with its own Claude Code folder and sign-in, and, if you want, its own Claude window and Dock icon. The profile that uses ~/.claude opens the usual Claude app; every other profile gets a separate Claude window."
  - q: "How do I open several Claude windows on a Mac?"
    a: "Give each profile the Claude window switch. The profile using ~/.claude opens the usual Claude app, and every other profile opens its own Claude window with its own sign-in, chats and settings, side by side with the others. You can open or quit each window from its card on the dashboard, and open it from the launcher or its Dock icon."
  - q: "Do two accounts share usage limits?"
    a: "Not in cl_audit. Each profile shows the limits of its own seat, read from Anthropic with that profile's sign-in, and cl_audit doesn't pool them or move work between accounts. Anthropic's help page says Claude and Claude Code share the same limits on a plan, so chat and Claude Code draw on the same allowance."
  - q: "Can two profiles use the same email?"
    a: "Only if they are two different seats. A personal plan and a Team seat on the same email are two seats, so they can be two profiles. One profile per seat: a seat another profile already has is refused."
sources:
  - title: "GitHub issue anthropics/claude-code#18435: manage multiple Claude accounts in Claude Desktop"
    url: "https://github.com/anthropics/claude-code/issues/18435"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Move your personal Claude account to a Team or Enterprise organization"
    url: "https://support.claude.com/en/articles/9267400-can-individuals-with-pro-or-max-plan-accounts-migrate-them-to-team-or-enterprise-plan-organizations"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan"
    checked: 2026-11-02
  - title: "Claude Code docs: Settings (CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-02
  - title: "Anthropic Usage Policy"
    url: "https://www.anthropic.com/legal/aup"
    checked: 2026-11-02
  - title: "claude-fix README (sarhej/claude-fix)"
    url: "https://github.com/sarhej/claude-fix"
    checked: 2026-11-02
  - title: "claude-multiprofile README (jmdarre-v/claude-multiprofile)"
    url: "https://github.com/jmdarre-v/claude-multiprofile"
    checked: 2026-11-02
related:
  - /
  - /use-cases/claude-usage-limit-alerts/
  - /use-cases/claude-code-usage-history/
  - /install/
---

Yes, you can use multiple Claude accounts on one Mac at the same time. The Claude app signs in to one account at a time, so cl_audit gives each extra account its own Claude window and its own Claude Code folder, side by side, and shows each one's usage limits on its own Dock icon. cl_audit is an independent tool, not affiliated with Anthropic.

It is free and works on Macs with Apple silicon and macOS 13 or later. This page explains what you get for each account, how to set it up, and what to watch for.

## Why the Claude app shows one account at a time

The Claude app keeps one sign-in, with one set of chats and settings. To use another account you sign out and sign in again. People have asked Anthropic for a fix: [a GitHub issue on the Claude Code repository](https://github.com/anthropics/claude-code/issues/18435) asks for Slack- or Chrome-style profile switching inside Claude Desktop, for separate work, personal and client accounts. On 2 November 2026 it was still open, with 987 thumbs-up on the first post.

Anthropic's help page does describe one kind of switching. If you have a personal account and an organisation account on the same email, you can switch between them from your name or initials at the lower left. That is switching, though, not two accounts open at once. The same issue lists what people do instead: a browser for the second account, separate macOS users, or a launcher that starts a second copy of the app with its own data folder.

cl_audit takes the last route, and adds the parts around it: a Claude Code folder for each account, the usage limits in the Dock, and alerts.

## What each account gets: a Claude window, a Claude Code folder, a Dock icon

In cl_audit the unit is a **profile**: one Claude setup. A profile has a Claude Code folder with its own sign-in, and, if you want them, a Claude window and a Dock icon.

- **Claude Code folder.** Claude Code keeps its settings and session history in one folder. Anthropic's docs say that setting `CLAUDE_CONFIG_DIR` moves that folder, so Claude Code stores them there instead of in `~/.claude`. Each profile uses its own folder, and its own sign-in.
- **Claude window.** The profile that uses `~/.claude` opens the usual Claude app. Every other profile gets its own Claude window, with its own sign-in, chats and settings. Underneath, each window gets its own `--user-data-dir`, which is how cl_audit tells the windows apart.
- **Dock icon.** A small app named "cl_audit <profile>" that shows the profile's 5-hour and weekly usage. By default, a click shows the usage for a few seconds while the profile's Claude window opens.

A profile has exactly two switches: **Usage in the Dock** and **Claude window**. With both off it is "usage only": its limits still show on the [Claude usage dashboard](/dashboard/), in the launcher and in alerts, but nothing sits in the Dock and no window opens. That suits a third account you only want to watch.

An **account** in cl_audit means only the claude.ai account a profile signs in to. Each profile is linked to one **seat**: an account plus an organisation.

## Work and personal: a Team seat and a Pro or Max plan

The common case is a work seat and a personal plan. Say your employer has you on a Team seat and you pay for Max yourself, both on the same email address.

Anthropic's help page says those stay separate: they have their own conversations and projects. cl_audit treats them the same way. They are two seats, so they are two profiles, for example "work" and "home". Each profile gets its own Claude window, so work chats never land in the personal window.

The rule is one profile per seat. If you try to add a profile for a seat that another profile already has, cl_audit refuses it. You can still have a personal plan and a Team seat on one email, because those are two different seats.

cl_audit shows limits for plans that have them: Pro, Max and Team. A profile that signs in with an API key is billed per token and has no usage limits to show.

## Set it up in four steps

You need a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. The Claude app is only needed for Claude windows.

1. **Install cl_audit.** Download the zip, move cl_audit to Applications and open it. macOS asks once, because cl_audit isn't signed with an Apple Developer ID yet: allow it in System Settings ▸ Privacy & Security with **Open Anyway**. The [install page](/install/) has the steps, and how to build it from source instead.
2. **Add a profile.** In cl_audit, open Settings ▸ **New profile**. Choose its Claude Code folder: a new one (`~/.claude-<name>`, which can share instructions, agents, skills, commands or memory from another folder), or an existing one such as `~/.claude`.
3. **Choose what it includes.** Turn **Usage in the Dock** and **Claude window** on or off. If you want a Claude window, quit the Claude app until the folder is set up; while it is open, it writes its own sign-in and settings. The page lists any open Claude windows and checks every 2 seconds.
4. **Sign in, in two parts.** Claude Code first: cl_audit opens Terminal and runs `claude auth login` for that folder. Then, if the profile has a Claude window, that window, signed in to the same claude.ai account. "Finish now" leaves sign-in for later.

You sign in on Anthropic's own screens. cl_audit never sees the password.

Repeat for the second account. After that, the dashboard shows a card for each profile, with a switch for its Claude window and its Dock icon.

## Claude Code in Terminal for each account

Claude Code in Terminal follows the profile too. Each profile's folder is a `CLAUDE_CONFIG_DIR` folder, and Claude Code saves each folder's login separately in the macOS Keychain. So a Claude Code session started for the "work" profile uses the work seat, and one for "home" uses the personal plan.

On the dashboard, each card has a **Terminal** key; in the launcher, ⌘↩ does the same for the selected profile. 

Claude Code's `/usage` command shows plan usage bars for the account Claude Code is signed in to, and Settings ▸ Usage in the Claude app does the same for the app's account. cl_audit puts every profile's limits side by side, so you don't switch accounts just to look.

## What stays separate, and what can be shared

Kept apart for each profile:

- the sign-in, for Claude Code and for the Claude window;
- the Claude window's chats and settings;
- the Claude Code folder, with its own settings and session history;
- the usage limits, read for the profile's own seat.

You can share some Claude Code setup when you create a new folder: instructions, agents, skills, commands or memory, copied from another folder you pick. If the profile should start with your usual `CLAUDE.md` and skills, this saves redoing them.

Email addresses are visible in the launcher and on cards. Turn **Show emails** off in General settings if you share your screen, and they are left out or blurred.

## Is it allowed to use more than one Claude account?

cl_audit doesn't get around usage limits. It doesn't pool limits across accounts, and it doesn't move work from a full account to another one. Each profile shows its own seat's limits, and that is all. The [FAQ](/faq/) covers how the usage figures are read.

Whether you may hold more than one Claude account is set by Anthropic's terms. On 2 November 2026, Anthropic's Usage Policy listed, among things not to do, creating multiple accounts to avoid detection or to circumvent product guardrails, and getting around a ban with a different account. Keeping a work seat and a personal plan apart is a different thing, and it is what this page is about, but cl_audit can't give you a ruling on your own case. If you are unsure, read Anthropic's terms or ask Anthropic.

## Other ways to do it: two app installs, launchers

You don't need cl_audit to run a second Claude account. Here is how the options compare, from the GitHub issue and from each project's README (checked on 2 November 2026).

| Option | How it works | Covers | Where it makes more sense |
|---|---|---|---|
| A browser for the second account | Use claude.ai in a browser while the app has the first account | Chat, in the browser | An occasional second account. Commenters on the issue say it misses Desktop-only features such as Code |
| Separate macOS users | Each Claude account gets its own Mac user login | Everything, in separate sessions | Rarely. Commenters on the issue call it too heavy for frequent switching |
| claude-fix | Small launcher apps open the Claude app with a separate data folder, using `--user-data-dir` | Claude Desktop profiles. The README says nothing about Claude Code or usage | You only want launchers, and you prefer an MIT-licensed tool |
| claude-multiprofile | An npm command-line tool makes Desktop launchers and sets `CLAUDE_CONFIG_DIR` for Claude Code | Desktop and Claude Code, with a Dock icon and a terminal command per profile | You want a command-line tool with checks and repair commands, and no usage display. Needs Node 18 or newer |
| cl_audit | A Claude window and a Claude Code folder per profile, plus a Dock icon with the profile's limits | Desktop, Claude Code, limits, alerts and usage history | You want each account's usage visible at a glance. Free, source-available (PolyForm Perimeter 1.0.1), Apple silicon only |

All of these are community or third-party tools, and none is made by Anthropic. The READMEs of claude-fix and claude-multiprofile both say a future Claude update could affect them. cl_audit says the same of itself: it relies on how Claude Code saves its login and on Anthropic's usage figures, which aren't public interfaces. If something stops working after a Claude update, update cl_audit.

## Next

Once two accounts are running, the next thing most people want is to know when a limit is close. [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) covers the alerts, and [Claude Code usage history](/use-cases/claude-code-usage-history/) covers where the tokens go. For the overall picture, see the [Claude usage tracker for Mac](/) page, or [download cl_audit](/install/) and add your first profile.
