---
title: "Claude Code multiple accounts with CLAUDE_CONFIG_DIR"
description: "Claude Code multiple accounts on a Mac: one CLAUDE_CONFIG_DIR folder per account, zsh aliases, where each login is stored, and cl_audit profiles."
h1: "Claude Code multiple accounts with CLAUDE_CONFIG_DIR"
mainKeyword: "claude code multiple accounts"
kind: how-to
published: 2026-11-02
updated: 2026-11-02
author: n-uf
takeaways:
  - "Anthropic's docs give one way to stay signed in to several Claude Code accounts: a separate configuration directory per account, chosen with CLAUDE_CONFIG_DIR."
  - "Each directory has its own settings, session history and login; on macOS Claude Code keys the Keychain entry to the directory."
  - "A zsh alias per account is the whole switch: claude-work and claude-personal can run in two Terminal windows at once."
  - "A new folder starts empty, so CLAUDE.md, agents and skills have to be copied or shared."
  - "cl_audit builds the folders for you as profiles and shows each profile's 5-hour and weekly limits; it is one profile per seat and doesn't pool limits."
faq:
  - q: "Can Claude Code use two accounts at the same time?"
    a: "Yes, with one configuration folder per account. Anthropic's authentication docs say to set CLAUDE_CONFIG_DIR to the directory of the account you want when you start claude. Each directory has its own settings, session history and login, so two Terminal windows can run two accounts."
  - q: "What is CLAUDE_CONFIG_DIR?"
    a: "It is an environment variable that overrides Claude Code's configuration directory, which is ~/.claude by default. Anthropic's docs say all settings, session history and plugins are stored under that path, and describe it as useful for running multiple accounts side by side."
  - q: "How do I switch accounts in Claude Code?"
    a: "Run the alias for the account you want, such as claude-work. There is no switch command: the folder you start claude with decides the account. Without folders you can use /logout and /login, but that signs the first account out."
  - q: "Where does Claude Code store its login on a Mac?"
    a: "In the macOS Keychain. Anthropic's docs say that with CLAUDE_CONFIG_DIR set, Claude Code keys the Keychain entry to that directory. cl_audit's README gives the names: Claude Code-credentials for ~/.claude, and Claude Code-credentials plus eight characters for another folder."
  - q: "Does this let me get more usage?"
    a: "No. Each account has its own plan and its own limits, and cl_audit only shows them. It doesn't pool limits or move work between accounts. Whether you may use more than one Claude account is set by Anthropic's terms."
sources:
  - title: "Claude Code docs: Authentication (Log in with multiple accounts, Credential management)"
    url: "https://code.claude.com/docs/en/authentication"
    checked: 2026-11-02
  - title: "Claude Code docs: Environment variables (CLAUDE_CONFIG_DIR, ANTHROPIC_API_KEY)"
    url: "https://code.claude.com/docs/en/env-vars"
    checked: 2026-11-02
  - title: "Claude Code docs: CLI reference (claude auth)"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-02
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-02
  - title: "Claude Code docs: Commands"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-02
  - title: "Claude Code docs: Desktop (Environment variables in local sessions, CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/desktop"
    checked: 2026-11-02
  - title: "anthropics/claude-code issue #20131: Multi-Account Profile Support (closed 17 Aug 2026)"
    url: "https://github.com/anthropics/claude-code/issues/20131"
    checked: 2026-11-02
  - title: "anthropics/claude-code issue #22872: Switching between personal and work Claude Code accounts"
    url: "https://github.com/anthropics/claude-code/issues/22872"
    checked: 2026-11-02
  - title: "anthropics/claude-code issue #20553: OAuth credentials shared across CLAUDE_CONFIG_DIR profiles"
    url: "https://github.com/anthropics/claude-code/issues/20553"
    checked: 2026-11-02
  - title: "anthropics/claude-code issue #18435: multiple accounts in the Claude Desktop app"
    url: "https://github.com/anthropics/claude-code/issues/18435"
    checked: 2026-11-02
  - title: "cl_audit README (n-uf/cl_audit): Adding a profile, How it works"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-02
related:
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-code-usage-history/
  - /blog/claude-team-and-personal-account/
  - /
---

Claude Code multiple accounts come down to one folder per account. Give each account its own configuration folder and tell Claude Code which one to use with the `CLAUDE_CONFIG_DIR` environment variable. Anthropic's authentication docs describe this setup: each directory has its own settings, session history and claude.ai login or API key. Put one `CLAUDE_CONFIG_DIR=...` in front of `claude`, or wrap it in a shell alias, and a work account and a personal account stay signed in side by side.

Below are the steps, where macOS keeps each login, and the traps. At the end is [cl_audit](/), our free Mac app, which builds the same folders as profiles and works as a Claude usage tracker for each one. cl_audit is an independent tool, not affiliated with Anthropic. Everything about Claude Code here comes from Anthropic's docs, read on 2 November 2026, or from the GitHub issues named in the text.

## Why Claude Code keeps one login

By default Claude Code keeps its settings, session history and plugins in `~/.claude`. On macOS it saves your login in the encrypted Keychain, in an item called `Claude Code-credentials`. One folder, one login. To change account, you sign out and sign in again.

That is the friction people describe. The request for multi-account profiles in [anthropics/claude-code#20131](https://github.com/anthropics/claude-code/issues/20131) says users must "fully log out and re-authenticate" to switch. Issue #22872 is titled "Switching between personal and work Claude Code accounts is abysmal" and is still open. The `/login` and `/logout` commands exist, and `claude auth login` and `claude auth logout` do the same from the shell, but they replace the one login rather than add a second.

The reply that closed #20131 on 17 August 2026 points to the folder approach below: side-by-side accounts today, each with its own config directory, and a shell alias per account. The commands reference lists no profile or switch-account command, so the folder is the documented answer. (If the Claude app is what you need to run twice, the page on [using multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) covers that.) When people search for "Claude Code profiles", this is usually what they end up with.

## One folder per account with CLAUDE_CONFIG_DIR

The variable is documented in two places. The authentication docs have a section called "Log in with multiple accounts". The environment variables table describes it as overriding the configuration directory (default `~/.claude`), with all settings, session history and plugins stored under that path, and as "useful for running multiple accounts side by side".

The steps:

1. Pick a folder per account, for example `~/.claude-work` and `~/.claude-personal`. They don't need to exist yet.
2. Start Claude Code with the variable set:

   ```bash
   CLAUDE_CONFIG_DIR=~/.claude-work claude
   ```

3. The first time, Claude Code walks you through login and setup for the new directory, per the docs. Sign in with the account that belongs to that folder.
4. Next time you run the same line, you're already signed in.

To check which folder a session uses, run `claude auth status` with the same variable set. It prints JSON that includes a `configDirectory` field (Claude Code 2.1.268 or later) and exits with code 0 if you're logged in, 1 if not:

```bash
CLAUDE_CONFIG_DIR=~/.claude-work claude auth status
```

Two rules from the docs are easy to miss:

- **In a settings file, write the absolute path.** Claude Code copies `env` values as written, with no shell, so `~` and `$HOME` stay as typed. Write it in the form the docs show: `"CLAUDE_CONFIG_DIR": "/Users/you/.claude-work"`.
- **Project and local settings can't set it.** It is ignored in a project's `.claude/settings.json`, so you can't pin one repository to one account that way. Set it in your shell, user settings or managed settings.

Inside the folder you'll find what you'd find in `~/.claude`: the docs say every `~/.claude` path lives under the new directory, including `.claude.json`, which otherwise sits at `~/.claude.json`.

## Shell aliases for switching

Typing the variable every time gets old. Anthropic's docs suggest an alias in `~/.bashrc` or `~/.zshrc`; if your shell is zsh, add one per account to `~/.zshrc`:

```zsh
# ~/.zshrc
alias claude-work='CLAUDE_CONFIG_DIR=$HOME/.claude-work claude'
alias claude-personal='CLAUDE_CONFIG_DIR=$HOME/.claude-personal claude'
```

Open a new Terminal window, or run `source ~/.zshrc`, and use the names:

```bash
claude-work       # the work account
claude-personal   # the personal account
```

To switch account in Claude Code, you pick the alias: there is no switch step, and the folder you start with decides the account. That is how a Claude Code personal and work account run side by side: one Terminal window on each, each with its own `/usage`, its own history and its own settings. The article on a [Claude Team and personal account](/blog/claude-team-and-personal-account/) covers what differs between the two kinds of seat. The alias for `claude` itself can stay as it is, so plain `claude` keeps using `~/.claude`. Anthropic's own example works this way: `claude-work` uses the work account while `claude` keeps your personal one.

To see which account a session is on, type `/status` inside Claude Code. The commands reference says it shows version, model, account and connectivity. Check it before a long task.

## Where each login is stored

On macOS the login is in the Keychain. Anthropic's docs say that with `CLAUDE_CONFIG_DIR` set, Claude Code keeps credentials keyed to that directory, so a session with a different directory reads a different entry. If the Keychain rejects the write, for example when it's locked in an SSH session, Claude Code falls back to a `.credentials.json` file in the same directory, with mode `0600`.

cl_audit's README, in its "How it works" section, says how the item is named: `Claude Code-credentials` for the default `~/.claude`, and `Claude Code-credentials-<first 8 hex of SHA-256 of the folder path>` for a `CLAUDE_CONFIG_DIR` folder. So each folder you create gets its own Keychain item. The README also notes that any app running under your macOS user can read Claude Code's saved login the same way; that is how Claude Code stores it, so install only software you trust.

One history note. In January 2026 a bug report, [#20553](https://github.com/anthropics/claude-code/issues/20553), said Claude Code used the same Keychain item for every `CLAUDE_CONFIG_DIR` profile, so one account's tokens overwrote the other's. That issue is still open. Anthropic's current docs describe the per-directory key, and cl_audit's README describes the hashed name, so the behaviour has probably changed since. If two folders ever log each other out, update Claude Code first, and mention #20553 if you report it.

## Sharing CLAUDE.md, agents and skills

A fresh folder starts empty. The files that make Claude Code feel like yours live in the config directory: your global `CLAUDE.md`, agents, skills and commands, plus settings and memory. Anthropic's docs put these global files in `~/.claude`, so a second folder doesn't see them.

A commenter on #22872 summed up the gap in June 2026: what people want is "shared config, separate credentials", and giving each account its own directory "isolates everything". By hand, that means copying the files you want into each folder and keeping the copies in sync. Anthropic's docs don't describe a sharing option.

cl_audit handles this when it creates a profile. In **Settings ▸ New profile** you choose a new Claude Code folder (`~/.claude-<name>`) and can share instructions, agents, skills, commands or memory from another Claude Code folder. Credentials stay separate, because the login is per folder. Your first folder, `~/.claude`, usually holds the files you've built up, so it's the natural source.

## Doing it with cl_audit profiles

A profile in cl_audit is one Claude setup: a Claude Code folder with its sign-in, and optionally a Claude window and a Dock icon. Each profile points at one Claude Code folder, so the folders you made above can become profiles.

![cl_audit launcher with three Claude profiles and limits](/img/guides/launcher-profiles.webp "The launcher: ⌘↩ opens Terminal with Claude Code set to that profile's folder. Sample data.")

**New profile** takes you through the setup on one page:

1. Where it lives: a new folder, or an existing one, including `~/.claude`, the `~/.claude-work` you made by hand, or one you pick in Finder. cl_audit compares folders after resolving `~`, links and letter case, so the same folder can't be added twice.
2. The two switches. **Usage in the Dock** gives the profile a Dock icon with its usage. **Claude window** gives it a Claude app window signed in to the same account. With both off, the profile is usage only: its limits show on the dashboard and in alerts, with nothing in the Dock.
3. Sign in. Terminal runs `claude auth login` for the folder. Claude's own sign-in does the work, and cl_audit never sees the password. With a Claude window, you then sign that window in to the same account.

An account another profile already has is refused: each profile is linked to one seat (account plus organisation), and no two profiles share one. A personal plan and a Team seat on one email are two seats, so they're two profiles. A profile only shows the limits its own seat already has.

After setup, the pieces you'd otherwise script yourself are in the app (see [your Claude Code history by day](/use-cases/claude-code-usage-history/) for the numbers):

- Press ⌘↩ in cl_audit's launcher to open Terminal for the profile you've highlighted, with its Claude Code folder, so you don't have to remember which alias goes with which account.
- Each profile's Dock icon shows its 5-hour and weekly limits, which cl_audit's background agent reads from Anthropic with that profile's Claude Code sign-in. The agent also sends the alerts. The [demo dashboard](/dashboard/) shows what the cards and Dock icons look like, and the [FAQ](/faq/) covers what the agent reads and where it sends it.
- Usage history comes from the session files Claude Code writes in each folder: tokens per day, and where they go by project, model and surface. Nothing leaves your Mac.

The page on multiple Claude accounts on one Mac covers the Claude app side, where each extra account gets its own Claude window. cl_audit is free and source-available; if you want to try it you can [download cl_audit](/install/). It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile.

cl_audit doesn't pool limits or move work between accounts. It shows what each seat has used. Whether someone may use more than one Claude account is set by Anthropic's terms, so read them before you set up a second account.

## Gotchas with Claude Code multiple accounts

Each of these comes from Anthropic's docs, cl_audit's README or a linked issue.

- **`ANTHROPIC_API_KEY` beats your subscription.** Anthropic's environment variable docs say that when it is set, the key is used instead of your Pro, Max, Ultra, Team or Enterprise subscription, even if you're logged in. A key exported in your shell profile reaches every alias, so every folder's session would use that key instead of its login. In interactive mode Claude Code asks you to approve the key once before it overrides your subscription; with `-p` the key is always used when present. Run `unset ANTHROPIC_API_KEY` to go back to the subscription. A commenter on #22872 describes the same trap and asks for `/status` to show the auth source.
- **Console sign-ins aren't kept apart.** The authentication docs say separate directories don't keep two Claude Console sign-ins without an API key apart, because Claude Code stores that kind of sign-in outside the configuration directory.
- **The Claude app is separate.** `CLAUDE_CONFIG_DIR` is for Claude Code. The Claude app signs in to one account at a time, and a feature request for switching accounts in it, [#18435](https://github.com/anthropics/claude-code/issues/18435), was still open with nearly 1,000 thumbs-up when this was written. The Code tab inside the Claude app has its own instructions for setting `CLAUDE_CONFIG_DIR` in Anthropic's desktop docs: set it where they say, then quit and reopen the app. cl_audit's Claude windows handle the app side with a separate Claude window per profile, as described for [running several Claude accounts side by side](/use-cases/multiple-claude-accounts/).
- **VS Code doesn't use your aliases.** An alias only changes the `claude` you type in a terminal. The VS Code extension's panel can take the folder from its own `claudeCode.environmentVariables` setting instead, written as an absolute path, because the extension doesn't expand `~`. [Claude Code in VS Code with multiple accounts](/blog/claude-code-vscode-multiple-accounts/) has the steps, with one VS Code profile per account.
- **Some files have lived outside the folder.** Commenters on #20131 pointed to issues about `~/.claude.json` and config temp files in `~/`; both are now closed as completed. If two accounts seem to share something, check both folders before assuming.
- **Updates can change things.** cl_audit relies on how Claude Code saves its login and on Anthropic's usage figures, which aren't public interfaces. Its README lists the Claude Code version each release was checked with, and says that if something stops working after a Claude update, you should update cl_audit.
- **Deleting a folder deletes that account's history and settings.** In cl_audit, **Remove profile…** keeps the folder unless you choose **Delete its folders too**, which signs the folder out first (its Keychain login goes) and never touches `~/.claude`.

So for two accounts: two folders, two aliases, and, if you want both sets of limits in one place, a [Claude usage tracker](/).
