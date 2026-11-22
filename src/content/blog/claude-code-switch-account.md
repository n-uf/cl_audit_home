---
title: "Claude Code switch account: /logout, /login and fixes"
description: "How to switch account in Claude Code: /logout and /login or claude auth login, what a running session does, and why the old account keeps showing up."
h1: "How to switch account in Claude Code, and what to check when it won't"
mainKeyword: "claude code switch account"
kind: how-to
published: 2026-11-22
updated: 2026-11-22
draft: false
author: n-uf
takeaways:
  - "To switch account in Claude Code, type /logout, start claude again and sign in with the other account; claude auth logout and claude auth login do the same from the shell."
  - "Signing in replaces the one sign-in saved for that configuration folder. /status shows which account you're on."
  - "Anthropic's pages don't say what a conversation in progress does when the sign-in changes, so finish the task first. Windows on the same folder share one saved sign-in."
  - "When the old account keeps showing, look for an ANTHROPIC_API_KEY or other credential that outranks the sign-in, a different CLAUDE_CONFIG_DIR, or a session that takes its sign-in from the Claude app or an IDE."
  - "If you change account often, keep one folder per account instead; in cl_audit each profile is such a folder, opened in Terminal with ⌘↩."
faq:
  - q: "How do I change which account Claude Code uses?"
    a: "Type /logout at the prompt, start claude again and sign in with the other account, then check /status. From the shell, claude auth logout and claude auth login do the same. It replaces the saved sign-in rather than adding a second one."
  - q: "Can I switch account in the middle of a Claude Code session?"
    a: "You can run /login in a running session, but Anthropic's pages don't describe what a conversation in progress does when the account changes, so finish the task first. They do say that a Remote Control session stops when the signed-in account changes, and the local session keeps running. Other windows on the same configuration folder share the saved sign-in."
  - q: "Why does Claude Code still use my old account after I sign in?"
    a: "Something outranks the sign-in. Anthropic's docs rank ANTHROPIC_AUTH_TOKEN, ANTHROPIC_API_KEY, an apiKeyHelper script and CLAUDE_CODE_OAUTH_TOKEN above the sign-in from /login. Run /status to see which one is active, unset the variable, relaunch claude and sign in again. A different CLAUDE_CONFIG_DIR is the other usual cause."
  - q: "What's the difference between /login and claude auth login?"
    a: "/login runs inside a Claude Code session; claude auth login is the same sign-in from the shell, with --email to pre-fill your address and --sso to force SSO. Anthropic's docs note that signing in with claude auth login before your first session lets Claude Code skip the sign-in prompt."
  - q: "Do I lose my history or settings when I switch account?"
    a: "Anthropic's troubleshooting page says signing out removes all stored credentials, including saved MCP server sign-ins and plugin secrets, so expect to authorize those again. Settings and session transcripts are separate files in the configuration folder, and /resume opens the session picker."
sources:
  - title: "Claude Code docs: Authentication (Log in to Claude Code, Credential management, Authentication precedence, Restrict login to your organization)"
    url: "https://code.claude.com/docs/en/authentication"
    checked: 2026-11-05
  - title: "Claude Code docs: CLI reference (claude auth)"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-05
  - title: "Claude Code docs: Commands (/login, /logout, /status, /resume)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-05
  - title: "Claude Code docs: Error reference (Not logged in, Invalid API key, Remote Control and the signed-in account)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-05
  - title: "Claude Code docs: Troubleshoot installation and login (Reset your login, Not logged in or token expired)"
    url: "https://code.claude.com/docs/en/troubleshoot-install"
    checked: 2026-11-05
  - title: "Claude Code docs: Environment variables (CLAUDE_CONFIG_DIR, ANTHROPIC_API_KEY, CLAUDE_CODE_OAUTH_TOKEN)"
    url: "https://code.claude.com/docs/en/env-vars"
    checked: 2026-11-05
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-05
  - title: "Claude Code docs: Use Claude Code in VS Code"
    url: "https://code.claude.com/docs/en/vs-code"
    checked: 2026-11-05
  - title: "Claude Code docs: Desktop application (403 or authentication errors in the Code tab)"
    url: "https://code.claude.com/docs/en/desktop"
    checked: 2026-11-05
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-05
  - title: "Manage API key environment variables in Claude Code (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12304248-manage-api-key-environment-variables-in-claude-code"
    checked: 2026-11-05
  - title: "cl_audit CHANGELOG, 26.11.18"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/CHANGELOG.md"
    checked: 2026-11-11
    supports: "26.11.18: a profile is one Claude Code folder with one signed-in account, the one in use; standby accounts are signed out, with no folder or Keychain item, and show no usage; Switch to … opens Claude Code's own sign-in in Terminal for the folder with the address filled in and watches it for up to 10 minutes (reached, another account, timed out); the Switch page says first that Claude Code in Terminal and editors on that folder is affected, running sessions included; before the sign-in the window closes, a backup is made and its Code-tab sessions and scheduled tasks move with a receipt; a session a running Claude Code owns stays until a later switch; Undo the move until Claude Code is on the new account; Undo this switch is gone, the way back is a switch the other way; the Claude app's sign-in is yours and cl_audit never signs anything in or out; a sign-in made with claude auth login moves the profile within a second; no Add account, accounts found on the Mac, Sign in with another account…; the sign-in unsets ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN and the Bedrock, Vertex and Foundry switches first."
    quote: "A profile is one Claude Code folder, and switching signs in again on it."
  - title: "cl_audit README at tag v26.11.18 (Words used here; Which account is in use; When a limit is full; Profile settings, Accounts; First run; The default profile)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/README.md"
    checked: 2026-11-11
    supports: "In use and standby; the routes to the Switch page; the sign-in command (claude auth login --claudeai --email, CLAUDE_CONFIG_DIR unset for ~/.claude and set for any other folder); the Claude app's signed-in account comes first, then Claude Code's with a muted line; the numbers come through Claude Code's sign-in; a sign-in changed in Terminal or the Claude app shows within a few seconds; worked out from the Claude app's own files, not by running it; for a week after a switch, the line under Accounts; the first profile is the default profile, on ~/.claude, and first run offers Use or Sign in…; to watch an old account's limits, give it a profile of its own."
    quote: "The Claude app's signed-in account comes first."
  - title: "cl_audit CHANGELOG, 26.11.33"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.33/CHANGELOG.md"
    checked: 2026-11-15
    supports: "26.11.33: the dashboard card says why it has no numbers in one heading and one sentence, with one compact key; standby accounts no longer sit on the card, and while a limit is full a compact Switch account key opens a menu of them, by address only; after a switch the waiting line reads “Switching to … : one step left. Sign the Claude app in to … to finish.” instead of “Switched to …”; “Log in” is now “Sign in”."
    quote: "After a switch, the waiting line now reads"
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
  - title: "cl_audit CHANGELOG, 26.11.47"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.47/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.47: when Claude Code's folder is signed in to another profile's account and the profile's own account is also on its standby list, the switch menus list it once, ticked, as “ann · move Claude Code back here”, and choosing it still switches to it; Sign in… stays the lighter option that moves nothing."
    quote: "ann · move Claude Code back here"
  - title: "cl_audit CHANGELOG, 26.11.49"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.49/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.49: New profile refuses another profile's standby account, with “That's a standby account of “Work”. One profile per account.”"
    quote: "That's a standby account of “Work”. One profile per account."
  - title: "cl_audit CHANGELOG, 26.11.51"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.51/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.51: an account switch opens the profile's Claude window again once the switch is settled (Claude Code reaches the account, after Undo or Leave it as it is, or when the switch stopped before moving anything)."
    quote: "An account switch now opens the profile's Claude window again once the switch is settled"
  - title: "cl_audit CHANGELOG, 26.11.52"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.52/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.52: quick chat's header names Claude Code's account, the one it answers on, when the Claude app and Claude Code in Terminal are on different accounts; when Claude Code's folder is signed in to another profile's account, no plan shows for it any more."
    quote: "quick chat's header now names Claude Code's account"
  - title: "cl_audit CHANGELOG, 26.11.55"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.55/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.55: when Claude Code's folder is signed in to another profile's account, quick chat's header names the profile's own account and that other account's limit no longer shows it as full or holds what you type; when Claude Code hits a limit there, or while the Claude app and Claude Code are on different accounts, quick chat says “Claude Code's account here has hit its limit.”, and in the clash also whose account the folder is on and to move it back to the profile's own account on the Switch page (or to pick one there when the profile has none)."
    quote: "quick chat's header now names the profile's own account"
  - title: "cl_audit CHANGELOG, 26.11.61"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.61/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.61: when a switch leaves a profile's Claude Code on another profile's account, quick chat no longer sends the question that waited for the switch; it says why (the folder is now on that profile's account) and where to go on the Switch page, and keeps what you typed."
    quote: "quick chat no longer sends what you typed there; it says why and keeps it."
  - title: "cl_audit CHANGELOG, 26.11.76"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.76/CHANGELOG.md"
    checked: 2026-11-21
    supports: "26.11.76: a switch settles the scheduled tasks before any session moves; when they can't move, they stay together with their sessions, the other sessions move, and the switch goes on to the sign-in and says why the tasks stayed."
    quote: "A switch now settles the scheduled tasks before any session moves."
related:
  - /blog/claude-code-multiple-accounts/
  - /blog/claude-code-vscode-multiple-accounts/
  - /blog/claude-team-and-personal-account/
  - /use-cases/multiple-claude-accounts/
---

To switch account in Claude Code, sign out and sign in again: type `/logout` at the prompt, start `claude` again and sign in with the other account. From the terminal, `claude auth logout` and `claude auth login` do the same job. Either way you replace the one sign-in Claude Code keeps for its configuration folder, so run `/status` afterwards to see which account you're on. If you swap every day, a second folder is less work than signing out each time, and [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) shows how.

What follows about Claude Code comes from Anthropic's docs and help pages as they read on 5 November 2026. [cl_audit](/) is our free Mac app that shows each Claude profile's limits in the Dock. It's an independent tool, not affiliated with Anthropic.

## Switch account inside Claude Code with /logout and /login

Anthropic's authentication page covers it in one line: to sign out and re-authenticate, type `/logout` at the Claude Code prompt. Signing out also resets the first-launch setup, so the next `claude` takes you through sign-in again.

1. Type `/logout`.
2. Close Claude Code and start it again with `claude`. This is the "Reset your login" sequence on Anthropic's troubleshooting page.
3. At the sign-in prompt, choose **Claude account with subscription**, the option that signs in with a claude.ai account. The browser opens; if it doesn't, press `c` to copy the sign-in URL.
4. Sign in with the account you want. The terminal shows `Login successful`; press Enter.
5. Type `/status`. It opens the Status tab with the version, model, account and connectivity.

You don't have to sign out first. Anthropic's help page tells people on a Console sign-in to run `/login` from within Claude Code to move to their subscription, and the error reference uses `/login` in another terminal as its example of changing account. Signing out first is the cleaner reset when something is off.

There's one cost. The troubleshooting page says signing out removes all stored credentials, including saved MCP server sign-ins and plugin secrets, so you'll authorize those servers again.

Which account you pick matters most when one email has both a personal plan and a Team seat. The article on a [Claude Team and personal account](/blog/claude-team-and-personal-account/) covers how those two differ.

## Claude Code switch account commands for the terminal

The shell has its own `claude auth` commands, and you can use them before you've ever opened a session:

| Command | What Anthropic's CLI reference says | Worth knowing |
|---|---|---|
| `claude auth login` | Sign in to your Anthropic account | `--email` pre-fills your email address, `--sso` forces SSO |
| `claude auth logout` | Log out from your Anthropic account | Prints `Successfully logged out from your Anthropic account.` once the sign-out is saved |
| `claude auth status` | Show authentication status as JSON | `--text` for readable output; exit code 0 if signed in, 1 if not |

The JSON from `claude auth status` includes a `configDirectory` field (Claude Code 2.1.268 or later) naming the folder the CLI uses, which helps when the wrong account shows up. Anthropic also notes that running `claude auth login` before your first session lets Claude Code skip the sign-in prompt.

## What happens to a session that's already running

This is the mid-session question, and Anthropic's pages say little about it. They don't describe what a conversation in progress does when the account under it changes, so finish the task first, or note where you were. Here's what they do say:

- **History lives in the folder.** Transcripts are files in the configuration folder, under `projects/<project>/`. Signing out removes credentials; the folder and its transcripts are a separate thing. `/resume` opens the session picker.
- **Windows on one folder share the sign-in.** Parallel sessions on one machine share a saved sign-in, says the troubleshooting page. A session showing `Not logged in · Please run /login` picks up a sign-in you make in another window on the same folder by itself, without a restart (on macOS from v2.1.286).
- **Remote Control stops.** If you sign in to a different claude.ai account or organization while a Remote Control session is running, for example with `/login` in another terminal, Claude Code ends it with `Remote Control disconnected — signed-in claude.ai account or organization changed on this machine — run /remote-control to start a session for the current account, or /login to switch back, then /remote-control`. Your local session keeps running without it.
- **The environment is set at launch.** `CLAUDE_CONFIG_DIR` is set when you start `claude`, and after unsetting a leftover `ANTHROPIC_API_KEY` Anthropic says to relaunch. To change folder, start `claude` again.

If a limit message is what sent you here, [Claude usage limit reached](/blog/claude-usage-limit-reached/) explains each message and what Anthropic offers. This page is only about which account a setup signs in to.

## Claude Code switch account not working? What to check

When `/login` seems to work and the old account keeps showing up, go down this list. `/status` is the tool for all of it.

1. **A credential that outranks your sign-in.** Anthropic's authentication page ranks cloud provider variables, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, an `apiKeyHelper` script and `CLAUDE_CODE_OAUTH_TOKEN` above the subscription sign-in from `/login`. The error reference is blunt: environment variables and `apiKeyHelper` take precedence over `/login`, so running it alone doesn't help. Run `env | grep ANTHROPIC` in the same shell; direnv, dotenv plugins and IDE terminals can load a stale key from a project's `.env` file. Unset the variable, remove it from your shell profile, relaunch `claude` and sign in again. Anthropic's help page adds that a key in the environment is used instead of your subscription, with API usage charges. A `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token` is a special case: `/login` switches the current session, but new sessions use the token again until you remove it.
2. **A different folder.** Each `CLAUDE_CONFIG_DIR` has its own settings, session history and sign-in. An alias, a line in `.zshrc` or a terminal profile that sets one means you're looking at another sign-in. `claude auth status` names the folder in `configDirectory`.
3. **The Claude app is separate.** When the Claude app or an IDE hosts your session, the error reference says, Claude Code gets its sign-in token from that app rather than from `/login`. In the app's Code tab the message is `Authentication required · Sign in again to continue`, and Anthropic's desktop page says to sign out and back in from the app menu.
4. **The account you want isn't offered.** Anthropic's help page has steps for this: `/logout`, `claude update`, restart the terminal completely, then run `claude` and select the account.
5. **The sign-in won't stick.** If you're asked to sign in again and again, the troubleshooting page points to the system clock and, on macOS, the Keychain. `claude doctor` reports a warning starting `macOS Keychain is not writable`, and Anthropic's unlock command is `security unlock-keychain ~/Library/Keychains/login.keychain-db`.
6. **An organization rule.** An administrator can require claude.ai sign-ins to belong to specific organizations, and Claude Code reports an error for a sign-in to any other. That's a managed setting, so ask your admin.

## Switching the account in VS Code

In the extension, sign out with **Sign out** in the panel's Settings section or with `/logout` (Claude Code v2.1.277 or later), then sign in with the other account. To skip that each time, [Claude Code in VS Code with multiple accounts](/blog/claude-code-vscode-multiple-accounts/) gives each account its own VS Code profile and folder.

## If you switch back and forth, use a folder per account

Signing out and in is fine once a week. If you move between a client account and your own, or work and home, several times a day, Anthropic's authentication page has the other route: give each account its own configuration directory and set `CLAUDE_CONFIG_DIR` when you start `claude`. Each directory keeps its own settings, session history and sign-in. Nothing gets signed out, and the first account is still there when you come back. It's the easier way to switch accounts back and forth. The folders, aliases and traps are in the [multiple accounts article](/blog/claude-code-multiple-accounts/).

## Switching with cl_audit profiles

A cl_audit profile is one Claude setup: a Claude Code folder with its own sign-in, and optionally a Claude window and a Dock icon. The folder is signed in to one account at a time, the one in use, and the profile can remember your other accounts on standby, signed out. An account belongs to one profile, checked by account and organisation. So switching is either picking another profile, or switching one profile to another of its accounts.

{{experimental: switch}}

![The cl_audit launcher listing each profile with its limits](/img/guides/launcher-profiles.webp "The launcher: ⌘↩ opens Terminal with Claude Code set to that profile's folder. Sample data.")

On first run, **Set up cl_audit** takes a `~/.claude` that's already signed in (**Use**) or signs Claude Code in to it (**Sign in…**): that's the default profile. When you add a profile with **New profile**, Terminal runs `claude auth login` for its own folder. That's Claude's own sign-in, so cl_audit never sees your password. After that, ⌘↩ on a profile in the launcher opens Terminal with its folder, and its 5-hour and weekly limits show in the Dock, read with that profile's Claude Code sign-in.

Switching a profile is the same sign-in this article describes, run for that profile's folder. In **Settings ▸ the profile ▸ Claude Code ▸ Accounts**, the account in use has the **IN USE** box and the others are **STANDBY**. A standby account is remembered with its plan and when it was last in use, but it has no folder or sign-in of its own, so it shows no limits. There's no Add account: cl_audit finds your accounts on this Mac by itself, and **Sign in with another account…** runs Claude Code's own sign-in for one that isn't there yet.

The switch itself starts on the **Switch page**. You get there from a standby box's **Switch account** key in Settings, from the **Switch account** key on the profile's dashboard card while a limit is full (its menu lists your standby accounts by address), from **Switch account ›** in the menu bar icon's and Dock icon's menus, or from **Switch account…** in the full-limit alert. Before anything else, the page says what changes: Claude Code in Terminal and editors on that folder moves to the new account, sessions running now included.

Say you switch to `ultra-2@example.com`. **Switch to ultra-2** first closes the profile's Claude window, makes a backup and moves the window's Code-tab sessions and scheduled tasks to ultra-2, with a receipt. The scheduled tasks go first, before any session moves. If they can't move, they stay with their sessions on the old account, the other sessions move, and the switch goes on to the sign-in and says why. A session that a running Claude Code has open stays with the old account until a later switch. Then Claude Code's own sign-in opens in Terminal: `claude auth login --claudeai --email` with the address filled in, and `CLAUDE_CONFIG_DIR` set to the profile's folder (or unset for `~/.claude`). Before it runs, cl_audit unsets `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` and the Bedrock, Vertex and Foundry switches, so a stray key from the checklist above can't outrank the sign-in. You finish in the browser. cl_audit watches the folder for up to 10 minutes and says whether it reached ultra-2, signed in as another account (the browser's), or timed out.

**Undo the move** puts back what was moved until Claude Code is on the new account, though it may not bring everything back. After that, the way back is a switch the other way. The Claude app's own sign-in stays yours: cl_audit opens the window again once the switch is settled, and you sign it in to the new account there; cl_audit never signs anything in or out.

If you sign in from Terminal yourself (`claude auth login` in the profile's folder), or in the Claude app, cl_audit shows the change within seconds, without a restart: the profile works on the account the folder signed in to, and the one before stands by. An account another profile works on is refused: when Claude Code's folder is on one, the card says "Terminal is signed in to Work's account" and shows no plan, and quick chat's header names the profile's own account; if Claude Code hits a limit there, quick chat says whose account the folder is on and to move it back on the Switch page. If you pressed Switch account… in quick chat with a question typed, and the switch leaves the folder on such an account, quick chat doesn't send it: it says why, points to the Switch page and keeps your text. **Sign in…** signs Claude Code in to the profile's own account again, and "ann · move Claude Code back here" in the switch menus moves it back with a switch.

The account box, and every other screen, shows the account the Claude app is signed in to. Without a Claude window, or with the app signed out or unreadable, it's Claude Code's, and a muted line says so. The numbers come through Claude Code's sign-in, so when the two differ, they aren't shown as the profile's. The profile's dashboard card then shows no numbers. In red it says "Terminal is signed in to ben@example.com" and tells you to sign in as ann@example.com to read the profile's usage, with a **Sign in…** key first in the row. That is how you can tell that only one of the two sign-ins has moved. Right after a switch, while the app still waits to be signed in to the new account, the card says, in amber, "Switching to ultra-2@example.com: one step left" and "Sign the Claude app in to ultra-2@example.com to finish.", with no Sign in… key and no numbers. Settings, the menu bar, the widget, the Dock panel and quick chat say the same, in one line, or only "Switching to ultra-2@example.com: one step left" where space is short. It says so for up to 24 hours after the switch; after that the red message comes back. Quick chat answers on Claude Code's account, and its header names it; if Claude Code hits a limit there, it says "Claude Code's account here has hit its limit." cl_audit's notes say the app's account is worked out from the app's own files, not by running it. For a week after a switch, the line under Accounts says when it happened, which account it was and what stays with it. Since 26.11.49, **New profile** refuses an account that another profile keeps on standby ("That's a standby account of “Work”. One profile per account.").

Each account's limits are its own, and cl_audit doesn't pool them. A profile moves to another of your accounts only when you start a switch or sign its folder in yourself, and whether you may use more than one Claude account is set by Anthropic's terms. cl_audit needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. The [Claude account switcher](/use-cases/switch-claude-accounts/) page has the whole switch, the backup and Undo the move included; for several profiles side by side, see [multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/). cl_audit is free, and you can [download cl_audit](/install/) to try it.
