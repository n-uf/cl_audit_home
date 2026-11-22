---
title: "Claude account switcher for Mac, with a backup first"
description: "cl_audit is a free Claude account switcher for Mac: a profile signs in again as another of your accounts, and its sessions move after a backup."
h1: "Claude account switcher: move a profile between your accounts"
mainKeyword: "claude account switcher"
kind: use-case
draft: false
published: 2026-11-19
updated: 2026-11-22
author: n-uf
order: 6
takeaways:
  - "A cl_audit profile is one Claude Code folder, signed in to one account at a time: the one in use. Your other accounts wait on standby, signed out, and show no limits."
  - "A switch is Claude Code's own sign-in again on the same folder, unless Claude Code is already on that account. cl_audit checks which account came back. It never copies or moves a sign-in, and a standby account has none kept."
  - "Before the sign-in, the profile's Claude window closes, a backup is made, and the window's Code sessions and scheduled tasks move to the new account, with a receipt and Undo the move."
  - "You sign the Claude app in to the new account yourself. cl_audit doesn't pool limits, and it never switches by itself."
  - "One account needs none of this. Two accounts open at once are two profiles instead."
faq:
  - q: "Will I lose my sessions when I switch Claude accounts?"
    a: "It can happen: switching is experimental and can lose data, so don't rely on it for sessions you can't afford to lose. A switch is meant to move the window's Code-tab sessions and scheduled tasks to the new account after a backup. Transcripts stay in the folder, and a session a running Claude Code has open stays behind."
  - q: "Does cl_audit pool the limits of my accounts?"
    a: "No. Each account's limits are its own, and cl_audit reads only the account in use, so nothing is added up or shared. A standby account shows its plan and when it was last in use, never limits. A switch happens only when you start it, never by itself."
  - q: "Is my sign-in copied between accounts?"
    a: "No. A standby account has no sign-in kept anywhere. Switching opens Claude Code's own sign-in in Terminal with the address filled in, you finish it in the browser, and cl_audit checks which account the folder is now signed in to."
  - q: "What happens to the Claude app when I switch?"
    a: "The profile's Claude window closes for the move, and cl_audit opens it again once the switch is settled. cl_audit never signs it in or out: you sign it in to the new account yourself. Until then, the account box shows the app's account, says the switch waits for the app's sign-in, and shows no numbers."
  - q: "Can I undo a switch?"
    a: "Until Claude Code is on the new account, Undo the move puts back what moved, though maybe not all. After that, the way back is a switch the other way. A switch that stopped half way shows two choices on the Sessions card: Undo it puts the sessions back, and Leave it as it is keeps them where they are."
sources:
  - title: "cl_audit CHANGELOG, 26.11.80"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.80/CHANGELOG.md"
    checked: 2026-11-21
    supports: "26.11.80: Switch account keeps the scheduled tasks (and their sessions) with the old account, and says why, when the new account's tasks file, or the old one's while it has tasks to move, holds task state it can't read, or when the new account has the same task with enabled set to anything but false."
    quote: "Switch account keeps the scheduled tasks (and their sessions) with the old account, and says why"
  - title: "cl_audit CHANGELOG, 26.11.76"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.76/CHANGELOG.md"
    checked: 2026-11-21
    supports: "26.11.76: a switch settles the scheduled tasks before any session moves; when they can't move (the new account got a differing copy since you pressed Switch, its tasks file can't be written, or the old account's file changed), they stay together with their sessions, the other sessions move, and the switch goes on to the sign-in and says why the tasks stayed; in Settings ▸ Accounts, the row of the account Claude Code in Terminal is signed in to also selects when that account isn't on the standby list, and Switch account then moves the sessions to it and opens no sign-in, since Claude Code is on it already; a finished move of this kind has no Undo (the backup made first keeps a copy)."
    quote: "A switch now settles the scheduled tasks before any session moves."
  - title: "cl_audit CHANGELOG, 26.11.61"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.61/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.61: when a switch leaves a profile's Claude Code on another profile's account, quick chat no longer sends the question that waited for the switch; it says why (the folder is now on that profile's account) and where to go on the Switch page, and keeps what you typed."
    quote: "quick chat no longer sends what you typed there; it says why and keeps it."
  - title: "cl_audit CHANGELOG, 26.11.55"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.55/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.55: when Claude Code's folder is signed in to another profile's account, quick chat's header names the profile's own account and that other account's limit no longer shows it as full or holds what you type; when Claude Code hits a limit there, or while the Claude app and Claude Code are on different accounts, quick chat says “Claude Code's account here has hit its limit.”, and in the clash also whose account the folder is on and to move it back to the profile's own account on the Switch page (or to pick one there when the profile has none)."
    quote: "quick chat's header now names the profile's own account"
  - title: "cl_audit CHANGELOG, 26.11.52"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.52/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.52: quick chat's header names Claude Code's account, the one it answers on, when the Claude app and Claude Code in Terminal are on different accounts; when Claude Code's folder is signed in to another profile's account (Work, say), the Dock icon's panel says “No usage: Terminal is on Work's account”, no plan shows for it any more, and the Switch page says “Move Claude Code back to …” only before the move starts."
    quote: "No usage: Terminal is on Work's account"
  - title: "cl_audit CHANGELOG, 26.11.51"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.51/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.51: an account switch opens the profile's Claude window again once the switch is settled (Claude Code reaches the account, after Undo or Leave it as it is, or when the switch stopped before moving anything); while moved sessions wait, the window stays closed, the Dock icon, the menu bar and the card open that switch's page, and the Switch page says so."
    quote: "An account switch now opens the profile's Claude window again once the switch is settled"
  - title: "cl_audit CHANGELOG, 26.11.48"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.48/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.48: when Claude Code's folder is signed in to another profile's account and you move it back to the profile's own account, the Switch page says the other account stays with the profile it belongs to."
    quote: "the other account stays with the profile it belongs to"
  - title: "cl_audit README at tag v26.11.87 (Show emails)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.87/README.md"
    checked: 2026-11-22
    supports: "Show emails (General settings) off leaves email addresses out of the launcher, the dashboard's account lines and the panels, writes \"hidden address\" in their place in menus and sentences, and draws one fixed blurred stand-in in Settings, the address only while the pointer is on it."
    quote: "writes \"hidden address\" in their place in menus and sentences"
  - title: "cl_audit CHANGELOG, 26.11.87"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.87/CHANGELOG.md"
    checked: 2026-11-22
    supports: "26.11.87: with Show emails off, an address in a sentence, a menu row, an alert or a tooltip reads \"hidden address\"; a fresh install starts hidden and stays so."
    quote: "a fresh install starts hidden and stays so"
  - title: "cl_audit CHANGELOG, 26.11.47"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.47/CHANGELOG.md"
    checked: 2026-11-15
    supports: "26.11.47: before you press Switch the Switch page says “Will stay with ann: …” for the files named like a Code-tab session that stay behind, and keeps “Left with ann: …” for after something has moved; when Claude Code's folder is on another profile's account and the profile's own account is on its standby list, the switch menus list it once, ticked, as “ann · move Claude Code back here”, and choosing it still switches to it."
    quote: "ann · move Claude Code back here"
  - title: "cl_audit CHANGELOG, 26.11.44"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.44/CHANGELOG.md"
    checked: 2026-11-15
    supports: "26.11.44: when Claude Code's folder is signed in to another profile's account, the dashboard card, the Switch page, the Dock icon's usage panel and menu and the menu bar menu name the profile's own account instead of the other profile's, or none when it has none of its own; the Switch page says before you press Switch which files named like a Code-tab session will stay with the old account (“Left with ann: 2 files named like a Code-tab session that aren't one…”; 26.11.47 reworded it before the switch to “Will stay with …”)."
    quote: "which files named like a Code-tab session will stay with the old account"
  - title: "cl_audit CHANGELOG, 26.11.33"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.33/CHANGELOG.md"
    checked: 2026-11-15
    supports: "26.11.33: a profile with no numbers to show says why in one heading and one sentence, with one compact key (Terminal signed out, its sign-in expired, Terminal on another account or on another profile's account, the Keychain not handing the sign-in over, a switch with one step left); standby accounts no longer sit on the card, and while a limit is full a compact Switch account key opens a menu of them, by address only; after a switch the waiting line reads “Switching to … : one step left. Sign the Claude app in to … to finish.” instead of “Switched to …”; menus no longer say “· in use”, the account in use is ticked; Settings ▸ Accounts shows In use and Standby; “Log in” is now “Sign in”."
    quote: "a compact Switch account key opens a menu of them, by address only"
  - title: "cl_audit source at v26.11.33, Sources/CardParts.swift (UsageNotice)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.33/Sources/CardParts.swift#L22-L58"
    checked: 2026-11-15
    supports: "The card's headings and sentences for each state without numbers (“Terminal is signed in to …”, “Terminal is signed in to another account”, “Terminal's sign-in has expired”, “Terminal is signed out”, “Can't read Terminal's sign-in yet”, “Can't read Terminal's sign-in”), amber for the last two and for a switch with one step left, with the keys each one has."
    quote: "The Keychain didn't hand it over: unlock it, then Refresh now."
  - title: "cl_audit source at v26.11.33, Sources/AccountResolver.swift (switchWaits)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.33/Sources/AccountResolver.swift#L72-L78"
    checked: 2026-11-15
    supports: "A switch waiting for the Claude app (the one-step-left state) lasts 24 hours after the switch linked; a switch linked more than a day ago waits no more, and then the card shows the split."
    quote: "a switch linked more than a day ago waits no more"
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
  - title: "cl_audit CHANGELOG, 26.11.29"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.29/CHANGELOG.md"
    checked: 2026-11-14
    supports: "26.11.29: when the Claude app and Claude Code in Terminal are on different accounts, cl_audit says it can't read the app account's usage and which account Terminal is on, with “Log Claude Code in Terminal in to …” to fix it."
    quote: "Log Claude Code in Terminal in to"
  - title: "cl_audit source at v26.11.29, Sources/AccountResolver.swift (SplitUsage)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.29/Sources/AccountResolver.swift#L127-L175"
    checked: 2026-11-14
    supports: "At v26.11.29, the card's words when the Claude app and Claude Code in Terminal are on different accounts (“cl_audit can't read …'s usage: Claude Code in Terminal is signed in to …”, the “Log in to … in Terminal…” button) and right after a switch (“Switched to …: sign the Claude app in to … to finish”, no key); Claude Code's own numbers on one labelled line, “Claude Code in Terminal”."
    quote: "Claude Code in Terminal is signed in to"
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
    supports: "At v26.11.18: in use and standby; the IN USE box shows the Claude app's account first, else Claude Code's; standby boxes show the plan and Last in use, no limits; accounts found on this Mac, listed as address · organisation; Switch to it… and Forget…; the trays, the menus and the alert line; the Switch page (NOW, TO, What changes, Switch to …); the move, held sessions and the receipt; Reached, another account, timed out; the switch is waiting for you alert; a switch that stopped half way; within a second after claude auth login; for a week after a switch, the line under Accounts; Folders from before; what a backup holds and never holds; the default profile on ~/.claude; what stays with the old account; the claude-transplant credit."
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

The IN USE box shows the account the profile's Claude app is signed in to, or Claude Code's while the app is signed out or can't be read. Every screen shows that same account. The numbers always come through Claude Code's sign-in, so when Claude Code is on another account than the app, they aren't shown as the profile's. The profile's dashboard card then shows no numbers. In red it says "Terminal is signed in to ben@example.com" and "Sign in as ann@example.com to read Main's usage.", with a **Sign in…** key first in the row. Settings ▸ Accounts still shows Claude Code's own numbers for the account Terminal is on. You can select that account's row even when it isn't on the standby list, say because Claude Code was switched to it elsewhere, for example in cl_quick. **Switch account** then closes the Claude window and moves its sessions to that account with no sign-in, since Claude Code is on it already. A finished move of this kind has no Undo, though the backup made first keeps a copy.

## Where the accounts come from

There is no Add account. cl_audit finds your accounts on this Mac by itself: in the Claude window's session folders, in Claude Code's records and their backups, and in the transcripts. It reads only ids, dates and a few named fields, never a token. Each account no profile has goes on standby, listed once as "address · organisation". Until it has been seen signed in, it shows as "account" and the first 8 characters of its id.

- **Sign in with another account…** runs Claude Code's own sign-in for an account that isn't on this Mac yet. The account that signs in becomes the one in use, and the one before goes on standby.
- **Forget…**, in a standby account's address pop-up, takes it off the profile for good. Nothing on the Mac changes.

An account belongs to one profile. One that another profile works on is never listed here or offered as a switch.

## Where a switch starts

Every route opens the same Switch page. None switches by itself.

- **Settings.** Click a standby box to select it, and a **Switch account** key takes the place of STANDBY. Its address pop-up also has **Switch to it…**.
- **The dashboard card.** While a limit is full, the card shows an orange **Switch account** key at the right end of its keys row, under the full display. It selects nothing for you. Its menu ticks the account in use with its plan, lists your standby accounts by address only and ends with "Sign in to another account…". The key shows even when there's no standby account. Picking an account opens the Switch page with it picked.
- **The menus.** The Dock icon's menu, and the [menu bar icon](/use-cases/claude-usage-menu-bar-mac/) if you turned it on, have **Switch account ›**: the account in use is ticked, and your standby accounts are listed by address only. While a limit is full, "Switch to ultra-2…" also sits on the top level.
- **The alert.** When a limit is full, the alert adds "You can switch to another of its accounts: Claude Code signs in again on this profile's folder." with **Switch account…** and **Later**. Like every cl_audit alert, it names no account. See [how the alerts work](/use-cases/claude-usage-limit-alerts/).

## What the Switch page tells you first

The page shows the account in use under NOW, with its limits, and the account you picked under TO, with your other accounts below it. Before any button, **What changes** spells out what the switch touches:

- Claude Code in Terminal and editors using the profile's folder moves to ultra-2, sessions running now included.
- The Claude window's Code-tab sessions and scheduled tasks on ultra-1 move to ultra-2 inside the folder. The page says how many, and a backup comes first.
- The window closes for the move. cl_audit opens it again once the switch is settled, and you sign it in to ultra-2 there.
- Claude Code's transcripts stay in the folder. So do the profile's name, Dock icon, look and settings, and ultra-1 stays on the profile as a standby account.

If the old account's folder holds files named like a Code-tab session that aren't one, the page also says so before you press Switch: "Will stay with ultra-1: 2 files named like a Code-tab session that aren't one (a link, a file not named by an id)." It keeps saying so until something has moved, also after a Cancel. Once something has moved, the line reads "Left with ultra-1: …" instead. Those files are never moved.

Then come the steps and **Switch to ultra-2**.

![The Switch page for the profile Work](/img/guides/switch-page.webp "The site's demo of the Switch page, with its sample profile Work about to switch from team-1 to team-2.")

## What happens when you switch, step by step

1. The profile's Claude window closes, with the app's own quit. cl_audit opens it again once the switch is settled: Claude Code reached the account, you chose Undo or Leave it as it is, or nothing moved. While moved sessions wait, it stays closed, and the Dock icon, the menu bar and the card open the Switch page instead.
2. A backup is made. If it can't be made, the switch stops and nothing moves.
3. The scheduled tasks move to ultra-2 first, then the Code-tab sessions. If the tasks can't move just then, they stay on ultra-1 together with their sessions. That happens, for example, when ultra-2 got a differing copy since you pressed Switch, when ultra-2 already has the same task switched on, or when a tasks file can't be read or written. The other sessions still move, and the switch goes on to the sign-in and says why the tasks stayed. Each session or task that moves is written for the new account and checked before its original is set aside in cl_audit's own folder, not deleted at that step. Scheduled tasks keep their skips and retries. A session that a running Claude Code has open is held: it stays with ultra-1 until a later switch.
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

cl_audit never signs the Claude app in or out. cl_audit opens the window again once the switch is settled, and you sign it in to the new account there. Until you do, the Switch page's account box shows the app's account and says "Switching to ultra-2@example.com: one step left. Sign the Claude app in to ultra-2@example.com to finish." The dashboard card says the same, in amber, as a heading ("Switching to ultra-2@example.com: one step left") and a sentence ("Sign the Claude app in to ultra-2@example.com to finish."), with no Sign in… key and no numbers. Settings, the menu bar, the widget, the Dock panel and quick chat say it too, in one line, or only "Switching to ultra-2@example.com: one step left" where space is short. It says so for up to 24 hours after the switch; after that the card falls back to the red message about Terminal's sign-in. In Settings ▸ Accounts, the account in use says "In use until the switch to ultra-2@example.com finishes.", and the account you are switching to is lit SWITCHING TO. For a week after a switch, the line under Accounts says when it happened, which account it was and what stays with it.

You can also switch without the Switch page: run `claude auth login` yourself for the profile's folder. Within a second the profile works on the account that signed in, and the one before stands by. cl_audit moves the window's sessions as part of its own switch, not for a sign-in you run yourself. An account that another profile works on is refused.

## What the card says when it shows no numbers

A profile's card shows numbers only when Claude Code in Terminal, on the profile's folder, is signed in to the same account as the Claude app. Otherwise it shows a bold heading about Terminal's sign-in and one sentence on what to do. Red means the sign-in is on the wrong account or gone. Amber means it can't be read yet, or a switch is under way. With **Show emails** off in General settings, as on a fresh install and in the site's [demo](/settings/), addresses in menus and sentences read "hidden address". The examples and pictures on this page spell them out as they read with it on.

### Terminal is signed in to ben@example.com

The Claude app is on ann@example.com, but Claude Code in Terminal is signed in to ben@example.com, so the card shows no numbers and turns red. Its sentence reads "Sign in as ann@example.com to read Main's usage." Press **Sign in…** and sign Terminal in as ann@example.com. Terminal moves into the ⋯ menu, where it says which account it is on.

Quick chat answers on ben@example.com, Claude Code's account, and its header names it. If Claude Code hits a limit there, quick chat says "Claude Code's account here has hit its limit."

### Terminal is signed out

The profile's folder holds no Claude Code sign-in, so cl_audit has nothing to read. The card is red and says "Sign in as ann@example.com to read Main's usage." If cl_audit doesn't know the address, it says "Sign in to read Main's usage." Press **Sign in…**. Show window and Terminal move into the ⋯ menu, where Terminal says it "asks to sign in first".

### Terminal's sign-in has expired

The folder had a sign-in, but it ran out. The card is red and gives the same sentence as the signed-out card: "Sign in as ann@example.com to read Main's usage." Press **Sign in…**. In the ⋯ menu, Terminal again says it asks to sign in first. To keep it from running out again, turn on **Renew sign-in by itself** in the account's address menu under Settings ▸ Accounts.

### Terminal is signed in to Work's account

Terminal on Main's folder is signed in to ben@example.com, the account in use on your Work profile. Its numbers show only on Work's card. Main's card shows no plan, is red and names Main's own account: "Sign in as ann@example.com to read Main's usage." With no account of its own, it says "Sign in to read Main's usage." Press **Sign in…**. In the ⋯ menu, Terminal says it is on Work's account, and the Dock icon's panel says "No usage: Terminal is on Work's account". Quick chat's header names Main's own account, or none when Main has none. If Claude Code hits a limit there, quick chat says whose account the folder is on and to move it back to Main's own account on the Switch page, or to pick an account for Main there when it has none. If you pressed Switch account… in quick chat with a question typed, and the switch leaves the folder on Work's account, quick chat doesn't send it. It says "Main's Claude Code folder is now on Work's account, so what you typed wasn't sent. Move it back to Main's own account on the Switch page." and keeps your text in the field.

If ann@example.com is also on Main's standby list, the switch menus list it once, ticked, as "ann · move Claude Code back here" (the card's Switch account menu spells out ann@example.com). Choosing it still switches to it, which moves Claude Code back; the Switch page says "Move Claude Code back to ann" until the move starts, and says ben@example.com stays with Work, the profile it belongs to. **Sign in…** is the lighter way: it signs Claude Code in as ann@example.com again and moves nothing.

### Terminal is signed in to another account

This one mostly shows on usage-only profiles, which have no Claude app account to compare with. Terminal's sign-in differs from the account the profile's record names, so the card is red. Its sentence gives the account the record names: "Sign in as ann@example.com to read Main's usage." A usage-only card has no window key and no Terminal key, only **Sign in…** and ⋯.

### Can't read Terminal's sign-in yet

cl_audit asked the Keychain for Claude Code's sign-in, and macOS refused or didn't answer in time. A locked Keychain is the usual cause, and cl_audit shows no prompt of its own. Numbers it read earlier stay. With none to show, the card is amber and says "The Keychain didn't hand it over: unlock it, then Refresh now." **Refresh now** leads the row, Show window stays, and Terminal is in the ⋯ menu.

### Can't read Terminal's sign-in

Claude Code saved its sign-in in a form cl_audit doesn't know, so the card says exactly that: "Claude Code saved it in a form cl_audit doesn't know." It is amber, not red: the sign-in itself may be fine. The row has **Refresh now**, Show window and ⋯, and no **Sign in…** key.

### Switching to ben@example.com: one step left

A switch to ben@example.com has moved Claude Code in Terminal and waits for the Claude app. The card is amber and says "Sign the Claude app in to ben@example.com to finish." It has no **Sign in…** key, because cl_audit can't sign the app in: cl_audit opens the window again once Claude Code is on ben@example.com (or use Show window), and you sign in there. After 24 hours, the card falls back to the red message.

## Cancel it, or undo it

**Cancel** stops the waiting. Sessions that already moved stay where they went until you undo the move. **Undo the move** puts them back as long as Claude Code isn't on the new account yet. Once the switch has finished there's no undo: the way back is a switch the other way, and the Reached screen offers **Switch back…**, whose hover text says "Switch back to ultra-1@example.com".

A switch that stopped half way, now or in 26.11.16 and earlier, shows on the profile's Sessions card: how many sessions sit under which account. **Undo it** puts them back, and **Leave it as it is** keeps them where they are. Its backup isn't pruned meanwhile.

## Folders from before

Up to 26.11.16, cl_audit kept each standby account's sign-in in a small Claude Code folder of its own, such as `~/.claude-ultra-2`. Those folders aren't used any more. Each one still there is listed under the profile's Accounts, in **Folders from before**, with **Move to Trash…** and **Keep it**.

Move to Trash asks first, says what's in the folder and names its Keychain item, such as "Claude Code-credentials-1a2b3c4d". cl_audit never touches that item: delete it in Keychain Access if you no longer need it. A folder that holds sessions is never offered for the Trash, only **Show in Finder**. Nothing is deleted by itself.

## What a switch is meant to leave as it is

A switch changes the account, not the profile. Its name, Dock icon and look stay, and so does its Claude Code folder, with projects, settings, MCP and `CLAUDE.md`.

Your Claude Code history lives in that folder, so a switch isn't meant to change it. Anthropic's settings page says Claude Code keeps its settings, session history and plugins in `~/.claude`, or in the `CLAUDE_CONFIG_DIR` folder when that's set: the default profile uses the first, every other profile a folder of its own. Claude Code stores sessions per project directory, and `claude --continue` and `claude --resume` read them from there. Anthropic's sessions page also says the desktop app keeps its own session list. That separate list is the one the switch moves.

## Limits stay per account

Anthropic's help page says all activity in Claude and Claude Code counts against the same limits. A profile's Claude window and its Claude Code usually sit on the same account, so they share that account's limits.

cl_audit reads only the account in use and doesn't pool or add limits. A switch changes which account the profile works on. It doesn't change any account's limits, and it doesn't happen unless you start it. A Team seat and a personal plan on the same email are two accounts, each with its own limits; the guide to a [Claude team and personal account](/blog/claude-team-and-personal-account/) goes through what Anthropic keeps separate.

Whether you may hold more than one Claude account is up to Anthropic's terms. When we checked on 7 November 2026, Anthropic's Usage Policy page read "Effective Nov 12, 2026" and listed, among things not to do: coordinating malicious activity across multiple accounts, creating multiple accounts to avoid detection or get around product guardrails, and using a different account to get around a ban. This page is about moving one profile between accounts that are yours, for example a personal account and a second seat. If you're unsure how the terms apply to you, read them or ask Anthropic.

## Other Claude account switchers

Other switchers do a related job for Claude Code alone. By their READMEs, checked 7 November 2026, claude-swap is a command-line tool and CCSwitcher a menu bar app.

| Tool | What it swaps | Where it makes more sense |
|---|---|---|
| cl_audit | The profile's account. Claude Code signs in again on the same folder, on Anthropic's own screen, and no sign-in is copied. The Claude window's Code sessions and scheduled tasks move too, after a backup | You use the Claude app and Claude Code in one profile and want the sessions to go with the account |
| claude-swap | The account-specific Claude sign-in for Claude Code, in the CLI and the VS Code extension. It has an optional automatic mode and an optional macOS menu bar app | You work in the terminal, on macOS, Linux or Windows, and want a command to swap sign-ins |
| CCSwitcher | A menu bar app (macOS 14 or later) that keeps a backup of each Claude Code account's credentials and swaps the Keychain entry and `~/.claude.json` | You want a small menu bar switcher for Claude Code alone |

The two READMEs don't mention the Claude app's Code tab or sidebar. For a wider comparison of tools that keep several Claude setups apart, see [Claude profile switchers for Mac](/blog/claude-profile-switchers-mac/).

## Who needs a Claude account switcher

It suits you if you use the Claude app and Claude Code in one profile, have more than one account of your own, and switch between Claude accounts from time to time.

You don't need it with one account. Nothing changes for you, and the Accounts card just shows the one in use. If you want two accounts open at once, make a profile for each. [Several Claude accounts side by side](/use-cases/multiple-claude-accounts/) explains that, and the [FAQ](/faq/) has the switch in short.

cl_audit needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in. The [install page](/install/) has the download and the steps.
