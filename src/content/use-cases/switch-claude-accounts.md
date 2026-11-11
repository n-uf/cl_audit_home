---
title: "Claude account switcher for Mac, with a backup first"
description: "cl_audit is a free Claude account switcher for Mac: one profile, several of your own accounts, a backup before the sessions move, and an Undo afterwards."
h1: "Claude account switcher: move a profile between your accounts"
mainKeyword: "claude account switcher"
kind: use-case
draft: true
published: 2026-11-19
updated: 2026-11-19
author: n-uf
order: 6
takeaways:
  - "A cl_audit profile can hold several of your own accounts and works on one at a time: the one in use is marked IN USE, the others STANDBY, each with its limits."
  - "A switch closes only that profile's Claude window. You answer Move them? every time, nothing is chosen for you, and a backup is made before any session moves."
  - "Each sign-in is checked against the account you picked, and no sign-in is ever copied. Cancel switch works until Claude Code has signed in, and Undo this switch… afterwards."
  - "cl_audit doesn't pool limits or switch by itself. Each account's limits are its own, and you start every switch."
  - "One account needs none of this. Several accounts used side by side are separate profiles instead."
faq:
  - q: "Can I switch Claude accounts without losing my sessions?"
    a: "Yes, and you choose what happens to them. The Switch page asks Move them? every time, and if they move, a backup is made first. Claude Code's own history stays in the profile's folder either way."
  - q: "Does cl_audit pool the limits of my accounts?"
    a: "No. cl_audit reads each account's limits separately and shows them side by side. Switching only changes which account the profile works on, and it never happens without you starting it."
  - q: "Is my sign-in copied between accounts?"
    a: "No. Claude Code's own sign-in opens in Terminal with the address filled in, you finish it in the browser, and cl_audit checks it is the account you picked. A backup never holds a sign-in."
  - q: "Can I undo a switch?"
    a: "Yes. Cancel switch works while the window closes and until Claude Code has signed in, and puts everything back. Once the profile is on the new account, Undo this switch… switches it back and, if the sessions moved, restores them from the backup the switch made."
  - q: "How is this different from running two accounts side by side?"
    a: "Side by side means two profiles. The first uses ~/.claude and the usual Claude app; the second gets its own Claude window and Claude Code folder. A switch is one profile changing from one of your accounts to another. Use separate profiles when you need both accounts open at once."
sources:
  - title: "cl_audit README at v26.11.1 (n-uf)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.1/README.md"
    checked: 2026-11-07
    supports: "Accounts boxes (IN USE, STANDBY), Add account, Sign in to another account…, unlit trays, the Switch page (NOW, TO, Move them?, Backup card), the five steps, Cancel switch, Undo this switch…, alerts and menus, what stays, and that no sign-in is copied."
    quote: "cl_audit never copies or moves a stored sign-in."
  - title: "cl_audit README at v26.11.10 (n-uf): The default profile, Backups"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    supports: "The first profile is the default profile, on ~/.claude with the usual Claude app, run with CLAUDE_CONFIG_DIR unset; a backup also holds Claude Code's setup and each task's prompt, with settings.json's env values blank; never a sign-in or the window's MCP settings."
    quote: "The default profile is the one on `~/.claude` with the usual Claude app"
  - title: "cl_audit CHANGELOG, 26.11.11"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.11/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.11: before a backup writes Claude Code's setup, cl_audit runs the Export page's key check over settings.json, the scripts its hooks run (with the skills holding them) and the plugin marketplaces file; a hook or permission rule holding a key is left out whole, another value that looks like a key is blanked and its name kept, and a script, a skill whose script holds a key or a marketplaces file holding one is left out; Restore, and Export from a backup, say which; it finds only the Export page's key shapes (GitHub, AWS, sk-, JWTs and the like) and doesn't check CLAUDE.md or skills no hook runs."
    quote: "Backups leave out the keys they find in your Claude Code settings and scripts."
  - title: "cl_audit CHANGELOG, 26.11.1"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.1/CHANGELOG.md"
    checked: 2026-11-07
    supports: "The release that added several accounts per profile, the Switch page, backups before a switch and Undo this switch…."
    quote: "No sign-in is ever copied."
  - title: "cl_audit 26.11.1 release notes (GitHub)"
    url: "https://github.com/n-uf/cl_audit/releases/tag/v26.11.1"
    checked: 2026-11-07
    supports: "Every switch that moves the sessions makes a backup first; what a backup holds and that it never holds a sign-in; Move them? asked every time."
    quote: "Never a sign-in."
  - title: "Anthropic Usage Policy"
    url: "https://www.anthropic.com/legal/aup"
    checked: 2026-11-07
    supports: "The three lines on multiple accounts and a different account under 'Do Not Abuse Our Platform'. The page read 'Effective Nov 12, 2026' when checked."
    quote: "Circumvent a ban through the use of a different account"
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-07
    supports: "Limits are shared across Claude and Claude Code, so a profile's Claude window and its Claude Code count against the same limits."
    quote: "all activity in both tools counts against the same limits"
  - title: "Claude Code docs: Manage sessions"
    url: "https://code.claude.com/docs/en/sessions"
    checked: 2026-11-07
    supports: "claude --continue and claude --resume; sessions are stored per project directory, as transcripts under ~/.claude/projects by default; CLAUDE_CONFIG_DIR moves that storage; the desktop app keeps its own session list."
    quote: "The desktop app, claude.ai/code, and the VS Code extension each keep their own session list"
  - title: "Claude Code docs: Settings"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-07
    supports: "CLAUDE_CONFIG_DIR makes Claude Code keep its settings, session history and plugins in another folder, as every cl_audit profile but the default does."
    quote: "Claude Code then stores your settings, session history, and plugins there instead."
  - title: "Claude Code docs: CLI reference"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-07
    supports: "claude auth login signs in to an Anthropic account and --email pre-fills the address, which is how cl_audit opens Claude Code's own sign-in."
    quote: "Sign in to your Anthropic account. Use `--email` to pre-fill your email address"
  - title: "claude-swap README (realiti4/claude-swap)"
    url: "https://github.com/realiti4/claude-swap"
    checked: 2026-11-07
    supports: "A command-line switcher for Claude Code accounts that works with the CLI and the VS Code extension; swaps only the account-specific login; has an optional automatic mode and an optional macOS menu bar app; the README doesn't mention the Claude app's Code tab."
    quote: "Works with both the Claude Code CLI and the VS Code extension."
  - title: "CCSwitcher README (XueshiQiao/CCSwitcher)"
    url: "https://github.com/XueshiQiao/CCSwitcher"
    checked: 2026-11-07
    supports: "A macOS menu bar app (macOS 14 or later) that keeps a backup of each Claude Code account's credentials and swaps the Keychain entry and ~/.claude.json on switch; the README doesn't mention the Claude app's Code tab."
    quote: "atomically swaps the keychain entry and `~/.claude.json` on switch"
related:
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-usage-limit-alerts/
  - /blog/claude-profile-switchers-mac/
  - /install/
---

cl_audit is a free Claude account switcher for Mac that moves one profile between accounts of your own. A profile can hold several accounts and works on one at a time. When you start a switch, cl_audit closes only that profile's Claude window, asks whether its Code sessions come along, makes a backup if they do, and checks each sign-in against the account you picked. cl_audit is an independent tool, not affiliated with Anthropic.

Say your profile Main has a personal account, `ultra-1@example.com`, and a second one, `ultra-2@example.com`. Both accounts' limits show on Main's card. A switch changes which of the two Main works on, and only when you ask for it.

## A profile with more than one account

In cl_audit a **profile** is one Claude setup: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon. Since release 26.11.1 a profile has one or more **accounts**. You find them in Settings ▸ Main ▸ Claude Code ▸ **Accounts**.

Each account gets a box with its address, its plan and organisation ("Ultra · Personal"), and every limit its plan has, drawn as bars like the cards on the [dashboard demo](/dashboard/). The account Main works on is marked **IN USE**. The others are **STANDBY**.

![Accounts boxes in a profile's Claude Code card](/img/guides/accounts-card.webp "The site's demo of the Accounts boxes: one account in use, two on standby. Sample data.")

A standby account's limits keep showing. cl_audit reads them from a sign-in kept for that account in a small Claude Code folder of its own, say `~/.claude-ultra-2`, and renews it by itself, so you can see which account has room before you switch.

To add an account you have two choices:

- **Add account** opens macOS's own menu of the accounts cl_audit finds on this Mac: signed in in a Claude Code folder no profile uses, or used by this profile's Claude window. One click adds one.
- **Sign in to another account…** makes a folder for a new account (say `~/.claude-ultra-3`) and opens Claude Code's own sign-in in Terminal, with the address filled in. Main keeps working meanwhile.

An account belongs to one profile, checked by account and organisation. A new profile still starts with one account, and profiles from before 26.11.1 keep theirs, in use.

## Where a switch starts

Every route opens the same Switch page. None switches by itself, and each account's limits stay its own.

- **Settings.** Click a standby box in the Accounts card, and a **Switch account** key takes the place of STANDBY.
- **The dashboard card.** Standby accounts sit in unlit trays under the limits, most room first. Click one to select it. While a limit is full, the tray with the most room is already selected, and its key reads **Switch account**. An account whose sign-in ran out, or whose numbers are old, isn't preselected.
- **The menus.** The Dock icon's menu, and the [menu bar icon](/use-cases/claude-usage-menu-bar-mac/) if you turned it on, have **Switch account ›** with every account and its week. While a limit is full, "Switch to ultra-2…" also sits on the top level.
- **The alerts.** When a limit is full and another account has room, the alert says "The other account has 92% of its week left" and offers **Switch account…** or **Later**. Like every cl_audit alert, it names no account. See [how the alerts work](/use-cases/claude-usage-limit-alerts/).

## What the Switch page shows

The page lists the account in use (NOW) and, under TO, every standby account with its limits, most room first. It also shows what stays as it is, the sessions question, the Backup card and the steps.

![The Switch page for the profile Work](/img/guides/switch-page.webp "The site's demo of the Switch page for the profile Work, before a switch. Sample data.")

The [Settings demo](/settings/) lets you click through the same page. It changes nothing on your Mac.

## What happens when you switch, step by step

Press **Close and switch**. The switch goes in order, and each step is checked before the next.

1. Only that profile's Claude window closes, gracefully. It may ask about work under way. If it doesn't close, nothing moves.
2. If the sessions come along, a backup is made, then the Code sessions and scheduled tasks move.
3. Claude Code's own sign-in opens in Terminal for the profile's folder, with the new address filled in. You finish it in the browser. Anthropic's CLI reference describes the `--email` option that pre-fills it.
4. Once the folder is signed in as the new account, the profile works on it. The old account joins standby.
5. The window opens again, and you sign in there as the new account. If the sessions moved, a session called "cl_audit · arrange sidebar" opens in it. Press Return there.

Each sign-in is compared by account, never by name. If the browser signed in as another account, the step turns red and says so, and nothing goes on. The first time, macOS asks to let cl_audit control Claude.

## Switch Claude accounts without losing sessions

The question **Move them?** is asked every time, and nothing is chosen for you. The answers are **Move to ultra-2** and **Leave with ultra-1**.

Leave keeps the sessions with the account they belong to. The window shows ultra-2's own, and switching back shows them again. Move takes the window's Code sessions, their scheduled tasks and the sidebar's sections, groups and pins. The sessions keep their ids. cl_audit never overwrites one, and the originals are parked in its own folder, not deleted.

The backup comes first, after the window is known closed and before anything moves. It is an APFS clone, so it takes seconds. It holds the Code-tab list with its scheduled tasks and their prompts, the sidebar records, cl_audit's own records and, on by default, Claude Code's transcripts. It also holds Claude Code's setup: `CLAUDE.md`, skills, agents, commands, `settings.json` with its env values left blank, and the plugin list. A hook, permission rule or script found to hold a key is left out of it, and Restore says which. It never holds a sign-in or the Claude window's MCP settings. If it can't be made, the switch stops and nothing moves.

Groups and pins live on claude.ai, per account. So cl_audit notes which group each session sat in, and the "arrange sidebar" session puts them back with the Claude app's own sidebar tools. Chats and Projects on claude.ai don't move. They belong to each account.

## Cancel it, or undo it

**Cancel switch** is always in sight on the Switch page. It works while the window closes and until Claude Code has signed in, and it puts everything back from the switch's receipt. After that there is nothing to cancel, and **Undo this switch…** appears once the profile is on the new account. It is the switch the other way and, if the sessions moved, a restore from the backup the switch made. The page says so before it starts.

A switch that stopped half way, even after a crash, shows beside the profile's tile as "Stopped half way · Undo it", and a new switch waits for it.

If the account you left is full and its limit resets, one alert says "the other account is back" and offers **Switch back…** or **Stay**. It follows the profile's Notify when back.

## What stays the same

A switch changes the account, not the profile. Its name, Dock icon and look stay, and so does its Claude Code folder, with projects, settings, MCP and `CLAUDE.md`.

To switch a Claude Code account and keep its history, that folder is the part that matters. Anthropic's settings page says Claude Code keeps its settings, session history and plugins in `~/.claude`, or in the `CLAUDE_CONFIG_DIR` folder when that's set: the default profile uses the first, every other profile a folder of its own. Claude Code stores sessions per project directory, and `claude --continue` and `claude --resume` read them from there. Anthropic's sessions page also says the desktop app keeps its own session list. So the Code tab's sessions are a separate question, and the Switch page asks it.

## Limits stay per account

Anthropic's help page says all activity in Claude and Claude Code counts against the same limits. A profile's Claude window and its Claude Code are meant to be on the same account, so they share that account's limits.

cl_audit reads each account's limits separately and doesn't pool or add them. A switch changes which account the profile works on. It doesn't change any account's limits, and it doesn't happen unless you start it.

Whether you may hold more than one Claude account is up to Anthropic's terms. When we checked on 7 November 2026, Anthropic's Usage Policy page read "Effective Nov 12, 2026" and listed, among things not to do: coordinating malicious activity across multiple accounts, creating multiple accounts to avoid detection or get around product guardrails, and using a different account to get around a ban. This page is about moving one profile between accounts that are yours, for example a personal account and a second seat. If you're unsure how the terms apply to you, read them or ask Anthropic.

## Other Claude account switchers

Other switchers do a related job for Claude Code alone. By their READMEs, checked 7 November 2026, claude-swap is a command-line tool and CCSwitcher a menu bar app.

| Tool | What it swaps | Where it makes more sense |
|---|---|---|
| cl_audit | The profile's account. Claude Code signs in on Anthropic's own screen and no sign-in is copied. If you say so, the Claude window's Code sessions, scheduled tasks and sidebar move too | You use the Claude app and Claude Code in one profile and want the sessions to go with the account |
| claude-swap | The account-specific Claude login for Claude Code, in the CLI and the VS Code extension. It has an optional automatic mode and an optional macOS menu bar app | You work in the terminal, on macOS, Linux or Windows, and want a command to swap logins |
| CCSwitcher | A menu bar app (macOS 14 or later) that keeps a backup of each Claude Code account's credentials and swaps the Keychain entry and `~/.claude.json` | You want a small menu bar switcher for Claude Code alone |

The two READMEs don't mention the Claude app's Code tab or sidebar. For a wider comparison of tools that keep several Claude setups apart, see [Claude profile switchers for Mac](/blog/claude-profile-switchers-mac/).

## Who needs a Claude account switcher

It suits you if you use the Claude app and Claude Code in one profile, have more than one account of your own, and switch between Claude accounts from time to time.

You don't need it with one account. Nothing changes for you, and the Accounts card just shows the one in use. If you want two accounts open at once, make a profile for each. [Several Claude accounts side by side](/use-cases/multiple-claude-accounts/) explains that, and the [FAQ](/faq/) has the switch step by step.

cl_audit needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in. The [install page](/install/) has the download and the steps.
