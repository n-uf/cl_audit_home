---
title: "Claude Code switch account: /logout, /login and fixes"
description: "How to switch account in Claude Code: /logout and /login or claude auth login, what a running session does, and why the old account keeps showing up."
h1: "How to switch account in Claude Code, and what to check when it won't"
mainKeyword: "claude code switch account"
kind: how-to
published: 2026-11-22
updated: 2026-11-22
draft: true
author: n-uf
takeaways:
  - "To switch account in Claude Code, type /logout, start claude again and sign in with the other account; claude auth logout and claude auth login do the same from the shell."
  - "Signing in replaces the one login saved for that configuration folder. /status shows which account you're on."
  - "Anthropic's pages don't say what a conversation in progress does when the login changes, so finish the task first. Windows on the same folder share one saved login."
  - "When the old account keeps showing, look for an ANTHROPIC_API_KEY or other credential that outranks the login, a different CLAUDE_CONFIG_DIR, or a session that takes its login from the Claude app or an IDE."
  - "If you change account often, keep one folder per account instead; in cl_audit each profile is such a folder, opened in Terminal with ⌘↩."
faq:
  - q: "How do I switch accounts in Claude Code?"
    a: "Type /logout at the prompt, start claude again and sign in with the other account, then check /status. From the shell, claude auth logout and claude auth login do the same. It replaces the saved login rather than adding a second one."
  - q: "Can I switch account in the middle of a Claude Code session?"
    a: "You can run /login in a running session, but Anthropic's pages don't describe what a conversation in progress does when the account changes, so finish the task first. They do say that a Remote Control session stops when the signed-in account changes, and the local session keeps running. Other windows on the same configuration folder share the saved login."
  - q: "Why does Claude Code still use my old account after I log in?"
    a: "Something outranks the login. Anthropic's docs rank ANTHROPIC_AUTH_TOKEN, ANTHROPIC_API_KEY, an apiKeyHelper script and CLAUDE_CODE_OAUTH_TOKEN above the login from /login. Run /status to see which one is active, unset the variable, relaunch claude and sign in again. A different CLAUDE_CONFIG_DIR is the other usual cause."
  - q: "What's the difference between /login and claude auth login?"
    a: "/login runs inside a Claude Code session; claude auth login is the same sign-in from the shell, with --email to pre-fill your address and --sso to force SSO. Anthropic's docs note that signing in with claude auth login before your first session lets Claude Code skip the login prompt."
  - q: "Do I lose my history or settings when I switch account?"
    a: "Anthropic's troubleshooting page says logging out removes all stored credentials, including saved MCP server logins and plugin secrets, so expect to authorize those again. Settings and session transcripts are separate files in the configuration folder, and /resume opens the session picker."
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
related:
  - /blog/claude-code-multiple-accounts/
  - /blog/claude-code-vscode-multiple-accounts/
  - /blog/claude-team-and-personal-account/
  - /use-cases/multiple-claude-accounts/
---

To switch account in Claude Code, sign out and sign in again: type `/logout` at the prompt, start `claude` again and log in with the other account. From the terminal, `claude auth logout` and `claude auth login` do the same job. Either way you replace the one login Claude Code keeps for its configuration folder, so run `/status` afterwards to see which account you're on. If you swap every day, a second folder is less work than signing out each time, and [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) shows how.

What follows about Claude Code comes from Anthropic's docs and help pages as they read on 5 November 2026. [cl_audit](/) is our free Mac app that shows each Claude profile's limits in the Dock. It's an independent tool, not affiliated with Anthropic.

## Switch account inside Claude Code with /logout and /login

Anthropic's authentication page covers it in one line: to log out and re-authenticate, type `/logout` at the Claude Code prompt. Logging out also resets the first-launch setup, so the next `claude` takes you through login again.

1. Type `/logout`.
2. Close Claude Code and start it again with `claude`. This is the "Reset your login" sequence on Anthropic's troubleshooting page.
3. At the login prompt, choose **Claude account with subscription**, the option that signs in with a claude.ai account. The browser opens; if it doesn't, press `c` to copy the login URL.
4. Sign in with the account you want. The terminal shows `Login successful`; press Enter.
5. Type `/status`. It opens the Status tab with the version, model, account and connectivity.

You don't have to log out first. Anthropic's help page tells people on a Console login to run `/login` from within Claude Code to move to their subscription, and the error reference uses `/login` in another terminal as its example of changing account. Logging out first is the cleaner reset when something is off.

There's one cost. The troubleshooting page says logging out removes all stored credentials, including saved MCP server logins and plugin secrets, so you'll authorize those servers again.

Which account you pick matters most when one email has both a personal plan and a Team seat. The article on a [Claude Team and personal account](/blog/claude-team-and-personal-account/) covers how those two differ.

## Claude Code switch account commands for the terminal

The shell has its own `claude auth` commands, and you can use them before you've ever opened a session:

| Command | What Anthropic's CLI reference says | Worth knowing |
|---|---|---|
| `claude auth login` | Sign in to your Anthropic account | `--email` pre-fills your email address, `--sso` forces SSO |
| `claude auth logout` | Log out from your Anthropic account | Prints `Successfully logged out from your Anthropic account.` once the logout is saved |
| `claude auth status` | Show authentication status as JSON | `--text` for readable output; exit code 0 if logged in, 1 if not |

The JSON from `claude auth status` includes a `configDirectory` field (Claude Code 2.1.268 or later) naming the folder the CLI uses, which helps when the wrong account shows up. Anthropic also notes that running `claude auth login` before your first session lets Claude Code skip the login prompt.

## What happens to a session that's already running

This is the mid-session question, and Anthropic's pages say little about it. They don't describe what a conversation in progress does when the account under it changes, so finish the task first, or note where you were. Here's what they do say:

- **History lives in the folder.** Transcripts are files in the configuration folder, under `projects/<project>/`. Logging out removes credentials; the folder and its transcripts are a separate thing. `/resume` opens the session picker.
- **Windows on one folder share the login.** Parallel sessions on one machine share a saved login, says the troubleshooting page. A session showing `Not logged in · Please run /login` picks up a login you make in another window on the same folder by itself, without a restart (on macOS from v2.1.286).
- **Remote Control stops.** If you sign in to a different claude.ai account or organization while a Remote Control session is running, for example with `/login` in another terminal, Claude Code ends it with `Remote Control disconnected — signed-in claude.ai account or organization changed on this machine — run /remote-control to start a session for the current account, or /login to switch back, then /remote-control`. Your local session keeps running without it.
- **The environment is set at launch.** `CLAUDE_CONFIG_DIR` is set when you start `claude`, and after unsetting a leftover `ANTHROPIC_API_KEY` Anthropic says to relaunch. To change folder, start `claude` again.

If a limit message is what sent you here, [Claude usage limit reached](/blog/claude-usage-limit-reached/) explains each message and what Anthropic offers. This page is only about which account a setup signs in to.

## Claude Code switch account not working? What to check

When `/login` seems to work and the old account keeps showing up, go down this list. `/status` is the tool for all of it.

1. **A credential that outranks your login.** Anthropic's authentication page ranks cloud provider variables, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, an `apiKeyHelper` script and `CLAUDE_CODE_OAUTH_TOKEN` above the subscription login from `/login`. The error reference is blunt: environment variables and `apiKeyHelper` take precedence over `/login`, so running it alone doesn't help. Run `env | grep ANTHROPIC` in the same shell; direnv, dotenv plugins and IDE terminals can load a stale key from a project's `.env` file. Unset the variable, remove it from your shell profile, relaunch `claude` and sign in again. Anthropic's help page adds that a key in the environment is used instead of your subscription, with API usage charges. A `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token` is a special case: `/login` switches the current session, but new sessions use the token again until you remove it.
2. **A different folder.** Each `CLAUDE_CONFIG_DIR` has its own settings, session history and login. An alias, a line in `.zshrc` or a terminal profile that sets one means you're looking at another login. `claude auth status` names the folder in `configDirectory`.
3. **The Claude app is separate.** When the Claude app or an IDE hosts your session, the error reference says, Claude Code gets its login token from that app rather than from `/login`. In the app's Code tab the message is `Authentication required · Sign in again to continue`, and Anthropic's desktop page says to sign out and back in from the app menu.
4. **The account you want isn't offered.** Anthropic's help page has steps for this: `/logout`, `claude update`, restart the terminal completely, then run `claude` and select the account.
5. **The login won't stick.** If you're asked to log in again and again, the troubleshooting page points to the system clock and, on macOS, the Keychain. `claude doctor` reports a warning starting `macOS Keychain is not writable`, and Anthropic's unlock command is `security unlock-keychain ~/Library/Keychains/login.keychain-db`.
6. **An organization rule.** An administrator can require claude.ai logins to belong to specific organizations, and Claude Code reports an error for a login to any other. That's a managed setting, so ask your admin.

## Switching the account in VS Code

In the extension, sign out with **Sign out** in the panel's Settings section or with `/logout` (Claude Code v2.1.277 or later), then sign in with the other account. To skip that each time, [Claude Code in VS Code with multiple accounts](/blog/claude-code-vscode-multiple-accounts/) gives each account its own VS Code profile and folder.

## If you switch back and forth, use a folder per account

Signing out and in is fine once a week. If you move between a client account and your own, or work and home, several times a day, Anthropic's authentication page has the other route: give each account its own configuration directory and set `CLAUDE_CONFIG_DIR` when you start `claude`. Each directory keeps its own settings, session history and login. Nothing gets signed out, and the first account is still there when you come back. It's the easier way to switch accounts back and forth. The folders, aliases and traps are in the [multiple accounts article](/blog/claude-code-multiple-accounts/).

## Switching with cl_audit profiles

A cl_audit profile is one Claude setup: a Claude Code folder with its own sign-in, and optionally a Claude window and a Dock icon. The folder is signed in to one account at a time, the one in use, and the profile can remember your other accounts on standby, signed out. An account belongs to one profile, checked by account and organisation. So switching is either picking another profile, or switching one profile to another of its accounts.

{{experimental: switch}}

![The cl_audit launcher listing each profile with its limits](/img/guides/launcher-profiles.webp "The launcher: ⌘↩ opens Terminal with Claude Code set to that profile's folder. Sample data.")

On first run, **Set up cl_audit** takes a `~/.claude` that's already signed in (**Use**) or signs Claude Code in to it (**Sign in…**): that's the default profile. When you add a profile with **New profile**, Terminal runs `claude auth login` for its own folder. That's Claude's own sign-in, so cl_audit never sees your password. After that, ⌘↩ on a profile in the launcher opens Terminal with its folder, and its 5-hour and weekly limits show in the Dock, read with that profile's Claude Code sign-in.

Switching a profile is the same sign-in this article describes, run for that profile's folder. In **Settings ▸ the profile ▸ Claude Code ▸ Accounts**, the account in use has the **IN USE** box and the others are **STANDBY**. A standby account is remembered with its plan and when it was last in use, but it has no folder or sign-in of its own, so it shows no limits. There's no Add account: cl_audit finds your accounts on this Mac by itself, and **Sign in with another account…** runs Claude Code's own sign-in for one that isn't there yet.

The switch itself starts on the **Switch page**. You get there from a standby box's **Switch account** key in Settings, from the same key on the profile's dashboard card, from **Switch account ›** in the menu bar icon's and Dock icon's menus, or from **Switch account…** in the full-limit alert. Before anything else, the page says what changes: Claude Code in Terminal and editors on that folder moves to the new account, sessions running now included.

Say you switch to `ultra-2@example.com`. **Switch to ultra-2** first closes the profile's Claude window, makes a backup and moves the window's Code-tab sessions and scheduled tasks to ultra-2, with a receipt. A session that a running Claude Code has open stays with the old account until a later switch. Then Claude Code's own sign-in opens in Terminal: `claude auth login --claudeai --email` with the address filled in, and `CLAUDE_CONFIG_DIR` set to the profile's folder (or unset for `~/.claude`). Before it runs, cl_audit unsets `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` and the Bedrock, Vertex and Foundry switches, so a stray key from the checklist above can't outrank the login. You finish in the browser. cl_audit watches the folder for up to 10 minutes and says whether it reached ultra-2, signed in as another account (the browser's), or timed out.

**Undo the move** puts back what was moved until Claude Code is on the new account, though it may not bring everything back. After that, the way back is a switch the other way. The Claude app's own sign-in stays yours: the page tells you to sign the window in to the new account when you open it, and cl_audit never signs anything in or out.

If you sign in from Terminal yourself (`claude auth login` in the profile's folder), or in the Claude app, cl_audit shows the change within seconds, without a restart: the profile works on the account the folder signed in to, and the one before stands by.

The account box, and every other screen, shows the account the Claude app is signed in to. Without a Claude window, or with the app signed out or unreadable, it's Claude Code's, and a muted line says so. The numbers come through Claude Code's sign-in, so when the two differ, they aren't shown as the profile's. The card says "No usage for a…@example.com yet: Claude Code here is signed in to b…@example.com", offers "Log Claude Code in to a…@example.com…", and keeps Claude Code's own numbers on one muted line labelled "Claude Code in Terminal". That is how you can tell that only one of the two sign-ins has moved. Right after a switch, while the app still waits to be signed in to the new account, the card says "Switched to b…@example.com: sign the Claude app in to b…@example.com to finish", with no numbers and no key. cl_audit's notes say the app's account is worked out from the app's own files, not by running it. For a week after a switch, the line under Accounts says when it happened, which account it was and what stays with it. To watch the old account's limits at the same time, give it a profile of its own with **New profile**.

Each account's limits are its own, and cl_audit doesn't pool them. A profile moves to another of your accounts only when you start a switch or sign its folder in yourself, and whether you may use more than one Claude account is set by Anthropic's terms. cl_audit needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. The [Claude account switcher](/use-cases/switch-claude-accounts/) page has the whole switch, the backup and Undo the move included; for several profiles side by side, see [multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/). cl_audit is free, and you can [download cl_audit](/install/) to try it.
