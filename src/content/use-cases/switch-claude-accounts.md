---
title: "Claude account switcher for Mac, with a backup first"
description: "cl_audit is a free Claude account switcher for Mac: a profile signs in again as another of your accounts, and its sessions move after a backup."
h1: "Claude account switcher: move a profile between your accounts"
mainKeyword: "claude account switcher"
kind: use-case
draft: true
published: 2026-11-19
updated: 2026-11-19
author: n-uf
order: 6
takeaways:
  - "A cl_audit profile is one Claude Code folder, signed in to one account at a time: the one in use. Your other accounts wait on standby, signed out, and show no limits."
  - "A switch is Claude Code's own sign-in again on the same folder. cl_audit checks which account came back. It never copies or moves a sign-in, and a standby account has none kept."
  - "Before the sign-in, the profile's Claude window closes, a backup is made, and the window's Code sessions and scheduled tasks move to the new account, with a receipt and Undo the move."
  - "You sign the Claude app in to the new account yourself. cl_audit doesn't pool limits, and it never switches by itself."
  - "One account needs none of this. Two accounts open at once are two profiles instead."
faq:
  - q: "Will I lose my sessions when I switch Claude accounts?"
    a: "It can happen: switching is experimental and can lose data, so don't rely on it for sessions you can't afford to lose. A switch is meant to move the Claude window's Code-tab sessions and scheduled tasks to the new account, after a backup, and Claude Code's transcripts stay in the profile's folder. A session that a running Claude Code has open stays with the old account until a later switch."
  - q: "Does cl_audit pool the limits of my accounts?"
    a: "No. Each account's limits are its own, and cl_audit reads only the account in use. A standby account shows its plan and when it was last in use, never limits. A switch happens only when you start it."
  - q: "Is my sign-in copied between accounts?"
    a: "No. A standby account has no sign-in kept anywhere. Switching opens Claude Code's own sign-in in Terminal with the address filled in, you finish it in the browser, and cl_audit checks which account the folder is now signed in to."
  - q: "What happens to the Claude app when I switch?"
    a: "The profile's Claude window closes for the move. cl_audit never signs it in or out: when you open it again, you sign it in to the new account yourself. Until then, the account box shows the app's account, says the switch waits for the app's sign-in, and shows no numbers."
  - q: "Can I undo a switch?"
    a: "Until Claude Code is on the new account, Undo the move puts back what was moved, though it may not bring everything back. After that, the way back is a switch the other way. A switch that stopped half way offers Undo it on the profile's Sessions card."
sources:
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
  - title: "cl_audit CHANGELOG, 26.11.25"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.25/CHANGELOG.md"
    checked: 2026-11-13
    supports: "26.11.25: when the Claude app is on another account than Claude Code, cl_audit no longer shows Claude Code's usage as the profile's; it offers to log Claude Code in to the app's account."
    quote: "cl_audit no longer shows Claude Code's usage as the profile's"
  - title: "cl_audit source at commit 59b3dbf, Sources/AccountResolver.swift (SplitUsage)"
    url: "https://github.com/n-uf/cl_audit/blob/59b3dbf/Sources/AccountResolver.swift#L125-L160"
    checked: 2026-11-13
    supports: "The card's words when the Claude app and Claude Code are on different accounts (“No usage for … yet”, the Log Claude Code in to … key) and right after a switch (“Switched to …: sign the Claude app in to … to finish”, no key); Claude Code's own numbers on one labelled line, “Claude Code in Terminal”."
    quote: "Claude Code here is signed in to"
  - title: "cl_audit README at commit 4cb6007 (Experimental: switching, import, export, restore and the default profile)"
    url: "https://github.com/n-uf/cl_audit/blob/4cb6007/README.md#experimental-switching-import-export-restore-and-the-default-profile"
    checked: 2026-11-12
    supports: "Account switching, import, restore, export, Move to another Mac and making the default profile are experimental, still unstable and can lose data; each of their pages starts with an Experimental: may lose data panel; before one runs, cl_audit asks for consent every time, with a box to tick and Cancel as the default; the No Liability clause of the PolyForm Perimeter 1.0.1 licence applies."
    quote: "can lose data, so use them for testing only"
  - title: "cl_audit CHANGELOG, 26.11.18"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/CHANGELOG.md"
    checked: 2026-11-11
    supports: "26.11.18: a profile is one Claude Code folder with one signed-in account, the one in use; standby accounts are remembered (address, plan, when last in use), signed out, with no folder or Keychain item, show no usage; Switch to … opens Claude Code's own sign-in in Terminal with the address filled in and cl_audit watches the folder for up to 10 minutes; before the sign-in the window closes, a backup is made, and its Code-tab sessions and scheduled tasks (with their skips and retries) move with a receipt; a session a running Claude Code owns stays until a later switch; Undo the move until Claude Code is on the new account; Undo it for a switch that stopped half way; transcripts stay; the Claude app's sign-in is yours; no Add account, accounts found on the Mac, Forget…, Sign in with another account…; the standby account offered when a limit is full; Undo this switch and the standby numbers gone; Folders from before with Move to Trash… and Keep it; the sign-in unsets API keys and provider switches first; the move adapts claude-transplant 4.2.1 (MIT)."
    quote: "A profile is one Claude Code folder, and switching signs in again on it."
  - title: "cl_audit README at tag v26.11.18 (Words used here; Which account is in use; When a limit is full; Profile settings, Accounts; Backups; The default profile; Moving a profile to another account; Credits)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/README.md"
    checked: 2026-11-11
    supports: "In use and standby; the IN USE box shows the Claude app's account first, else Claude Code's; standby boxes show the plan and Last in use, no limits; accounts found on this Mac, listed as address · organisation; Switch to it… and Forget…; the trays, the menus and the alert line; the Switch page (NOW, TO, What changes, Switch to …); the move, held sessions and the receipt; Reached, another account, timed out; the switch is waiting for you alert; a switch that stopped half way; within a second after claude auth login; for a week after a switch, the line under Accounts; Folders from before; what a backup holds and never holds; the default profile on ~/.claude; what stays with the old account; the claude-transplant credit."
    quote: "There is no Add account"
  - title: "cl_audit 26.11.18 release notes (GitHub)"
    url: "https://github.com/n-uf/cl_audit/releases/tag/v26.11.18"
    checked: 2026-11-11
    supports: "The same switch facts as the changelog, published 11 November 2026."
    quote: "cl_audit never signs anything in or out."
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

cl_audit is a free Claude account switcher for Mac that moves one profile between accounts of your own. A profile is one Claude Code folder, signed in to one account at a time. A switch signs Claude Code in again on that same folder, as another of your accounts. Before it does, cl_audit closes the profile's Claude window, makes a backup and moves the window's Code sessions to the new account. cl_audit is an independent tool, not affiliated with Anthropic.

{{experimental: switch}}

Say your profile Main works on `ultra-1@example.com`, and you also have `ultra-2@example.com`. Main's card shows ultra-1's limits. ultra-2 waits on standby until you switch to it.

## One folder, one account in use

In cl_audit a **profile** is one Claude setup: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon. The folder holds one signed-in account at a time, the one **in use**. Your other accounts are **standby**. The profile remembers each one's address, plan and when it was last in use, but they stay signed out, with no folder or Keychain item of their own.

You find them in Settings ▸ Main ▸ Claude Code ▸ **Accounts**. The account in use gets a lit **IN USE** box with its plan and organisation ("Ultra · Personal") and every limit its plan has, drawn as bars like the cards on the [dashboard demo](/dashboard/). A **STANDBY** box shows no limits, because nothing reads a standby account. It says when the account was last in use ("Last in use on Main 3 days ago").

![Accounts in a profile's Claude Code card](/img/guides/accounts-card.webp "The site's demo, with its own sample profile Work and team accounts: one in use, two on standby, and two folders from before.")

The IN USE box shows the account the profile's Claude app is signed in to, or Claude Code's while the app is signed out or can't be read. Every screen shows that same account. The numbers always come through Claude Code's sign-in, so when Claude Code is on another account than the app, they aren't shown as the profile's. The card says "No usage for a…@example.com yet: Claude Code here is signed in to b…@example.com", offers "Log Claude Code in to a…@example.com…", and keeps Claude Code's own numbers on one muted line labelled "Claude Code in Terminal".

## Where the accounts come from

There is no Add account. cl_audit finds your accounts on this Mac by itself: in the Claude window's session folders, in Claude Code's records and their backups, and in the transcripts. It reads only ids, dates and a few named fields, never a token. Each account no profile has goes on standby, listed once as "address · organisation". Until it has been seen signed in, it shows as "account" and the first 8 characters of its id.

- **Sign in with another account…** runs Claude Code's own sign-in for an account that isn't on this Mac yet. The account that signs in becomes the one in use, and the one before goes on standby.
- **Forget…**, in a standby account's address pop-up, takes it off the profile for good. Nothing on the Mac changes.

An account belongs to one profile. One that another profile works on is never listed here or offered as a switch.

## Where a switch starts

Every route opens the same Switch page. None switches by itself.

- **Settings.** Click a standby box to select it, and a **Switch account** key takes the place of STANDBY. Its address pop-up also has **Switch to it…**.
- **The dashboard card.** Standby accounts sit in unlit trays under the limits, each with its plan and when it was last in use. While a limit is full, one is selected already: of the accounts not known to be full, the one that had the most of its week left when it was last in use.
- **The menus.** The Dock icon's menu, and the [menu bar icon](/use-cases/claude-usage-menu-bar-mac/) if you turned it on, have **Switch account ›** with each account and when it was last in use. While a limit is full, "Switch to ultra-2…" also sits on the top level.
- **The alert.** When a limit is full, the alert adds "You can switch to another of its accounts: Claude Code signs in again on this profile's folder." with **Switch account…** and **Later**. Like every cl_audit alert, it names no account. See [how the alerts work](/use-cases/claude-usage-limit-alerts/).

## What the Switch page tells you first

The page shows the account in use under NOW, with its limits, and the account you picked under TO, with your other accounts below it. Before any button, **What changes** spells out what the switch touches:

- Claude Code in Terminal and editors using the profile's folder moves to ultra-2, sessions running now included.
- The Claude window's Code-tab sessions and scheduled tasks on ultra-1 move to ultra-2 inside the folder. The page says how many, and a backup comes first.
- The window closes for the move. When you open it again, you sign it in to ultra-2 yourself.
- Claude Code's transcripts stay in the folder. So do the profile's name, Dock icon, look and settings, and ultra-1 stays on the profile as a standby account.

Then come the steps and **Switch to ultra-2**.

![The Switch page for the profile Work](/img/guides/switch-page.webp "The site's demo of the Switch page, with its sample profile Work about to switch from team-1 to team-2.")

## What happens when you switch, step by step

1. The profile's Claude window closes, with the app's own quit, and stays closed until the sign-in ends.
2. A backup is made. If it can't be made, the switch stops and nothing moves.
3. The Code-tab sessions and scheduled tasks move to ultra-2. Each one is written for the new account and checked before its original is set aside in cl_audit's own folder, not deleted at that step. Scheduled tasks keep their skips and retries. A session that a running Claude Code has open is held: it stays with ultra-1 until a later switch.
4. Claude Code's own sign-in opens in Terminal for the profile's folder, with ultra-2's address filled in, and you finish it in the browser. Anthropic's CLI reference describes the `--email` option that fills it in.
5. cl_audit watches the folder for up to 10 minutes and says how it ended.

The browser's claude.ai account decides which account signs in, so there are three endings:

- **Reached:** "Now on ultra-2 · ultra-1 on standby".
- **Another account:** "Signed in as ultra-3 · not ultra-2". The profile now works on ultra-3, and ultra-1 stands by. Switch the browser's account and sign in as ultra-2 again, or keep ultra-3.
- **Timed out:** "No sign-in · sessions on ultra-2", with **Try again** and **Undo the move**.

Before the sign-in starts, cl_audit unsets `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` and the Bedrock, Vertex and Foundry switches for it, so a key in your shell's settings can't sign the folder in another way. A switch never sees your password, and it never copies or moves a sign-in. If the browser covers the Switch page while the sign-in waits, one alert says the switch is waiting for you, with **Show switch** and **Cancel switch**.

## What happens to your sessions when you switch Claude accounts

Switching is experimental and can lose data, so keep your own copy of anything you can't afford to lose. Claude Code's own history doesn't need to move. Its transcripts stay in the profile's folder, where `claude --resume` looks for them. The part the Claude app keeps per account is the window's list of Code sessions, and that is what a switch moves.

The move is adapted from claude-transplant, a community tool under the MIT licence, and cl_audit's README credits it. Every step goes on a receipt, so **Undo the move** can put back what got done, as long as Claude Code isn't on the new account yet. It may not bring everything back.

The backup comes after the window has closed and before anything moves. It's an APFS clone, so it takes seconds. It holds the window's Code-tab list with its scheduled tasks and their prompts, the sidebar records, cl_audit's own records and, on by default, Claude Code's transcripts and setup, with `settings.json`'s env values left blank. It never holds a sign-in or the Claude window's MCP settings. Switches' backups stay listed under Settings ▸ the profile ▸ Sessions, where **Restore…** shows a preview before it writes anything.

Chats and Projects on claude.ai don't move. They belong to each account, and so do a CI token from `claude setup-token`, claude.ai connectors and MCP servers, cloud sessions and environments, synced plugins, and the plan and billing.

## The Claude app's sign-in stays yours

cl_audit never signs the Claude app in or out. The Switch page tells you to sign the window in to the new account when you open it. Until you do, the account box shows the app's account and says "Switched to b…@example.com: sign the Claude app in to b…@example.com to finish", with no numbers and no key. For a week after a switch, the line under Accounts says when it happened, which account it was and what stays with it.

You can also switch without the Switch page: run `claude auth login` yourself for the profile's folder. Within a second the profile works on the account that signed in, and the one before stands by. cl_audit moves the window's sessions as part of its own switch, not for a sign-in you run yourself. An account that another profile works on is refused.

## Cancel it, or undo it

**Cancel** stops the waiting. Sessions that already moved stay where they went until you undo the move. **Undo the move** puts them back as long as Claude Code isn't on the new account yet. Once the switch has finished there's no undo: the way back is a switch the other way, and the Reached screen offers **Switch back to ultra-1…**.

A switch that stopped half way, now or in 26.11.16 and earlier, shows on the profile's Sessions card: how many sessions sit under which account, with **Undo it**. Its backup isn't pruned meanwhile.

## Folders from before

Up to 26.11.16, cl_audit kept each standby account's sign-in in a small Claude Code folder of its own, such as `~/.claude-ultra-2`. Those folders aren't used any more. Each one still there is listed under the profile's Accounts, in **Folders from before**, with **Move to Trash…** and **Keep it**.

Move to Trash asks first, says what's in the folder and names its Keychain item, such as "Claude Code-credentials-1a2b3c4d". cl_audit never touches that item: delete it in Keychain Access if you no longer need it. A folder that holds sessions is never offered for the Trash, only **Show in Finder**. Nothing is deleted by itself.

## What a switch is meant to leave as it is

A switch changes the account, not the profile. Its name, Dock icon and look stay, and so does its Claude Code folder, with projects, settings, MCP and `CLAUDE.md`.

Your Claude Code history lives in that folder, so a switch isn't meant to change it. Anthropic's settings page says Claude Code keeps its settings, session history and plugins in `~/.claude`, or in the `CLAUDE_CONFIG_DIR` folder when that's set: the default profile uses the first, every other profile a folder of its own. Claude Code stores sessions per project directory, and `claude --continue` and `claude --resume` read them from there. Anthropic's sessions page also says the desktop app keeps its own session list. That separate list is the one the switch moves.

## Limits stay per account

Anthropic's help page says all activity in Claude and Claude Code counts against the same limits. A profile's Claude window and its Claude Code usually sit on the same account, so they share that account's limits.

cl_audit reads only the account in use and doesn't pool or add limits. A switch changes which account the profile works on. It doesn't change any account's limits, and it doesn't happen unless you start it.

Whether you may hold more than one Claude account is up to Anthropic's terms. When we checked on 7 November 2026, Anthropic's Usage Policy page read "Effective Nov 12, 2026" and listed, among things not to do: coordinating malicious activity across multiple accounts, creating multiple accounts to avoid detection or get around product guardrails, and using a different account to get around a ban. This page is about moving one profile between accounts that are yours, for example a personal account and a second seat. If you're unsure how the terms apply to you, read them or ask Anthropic.

## Other Claude account switchers

Other switchers do a related job for Claude Code alone. By their READMEs, checked 7 November 2026, claude-swap is a command-line tool and CCSwitcher a menu bar app.

| Tool | What it swaps | Where it makes more sense |
|---|---|---|
| cl_audit | The profile's account. Claude Code signs in again on the same folder, on Anthropic's own screen, and no sign-in is copied. The Claude window's Code sessions and scheduled tasks move too, after a backup | You use the Claude app and Claude Code in one profile and want the sessions to go with the account |
| claude-swap | The account-specific Claude login for Claude Code, in the CLI and the VS Code extension. It has an optional automatic mode and an optional macOS menu bar app | You work in the terminal, on macOS, Linux or Windows, and want a command to swap logins |
| CCSwitcher | A menu bar app (macOS 14 or later) that keeps a backup of each Claude Code account's credentials and swaps the Keychain entry and `~/.claude.json` | You want a small menu bar switcher for Claude Code alone |

The two READMEs don't mention the Claude app's Code tab or sidebar. For a wider comparison of tools that keep several Claude setups apart, see [Claude profile switchers for Mac](/blog/claude-profile-switchers-mac/).

## Who needs a Claude account switcher

It suits you if you use the Claude app and Claude Code in one profile, have more than one account of your own, and switch between Claude accounts from time to time.

You don't need it with one account. Nothing changes for you, and the Accounts card just shows the one in use. If you want two accounts open at once, make a profile for each. [Several Claude accounts side by side](/use-cases/multiple-claude-accounts/) explains that, and the [FAQ](/faq/) has the switch in short.

cl_audit needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in. The [install page](/install/) has the download and the steps.
