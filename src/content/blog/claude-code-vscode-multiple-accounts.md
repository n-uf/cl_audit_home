---
title: "Claude Code VSCode multiple accounts: one profile each"
description: "Use multiple Claude accounts with Claude Code in VSCode: one VS Code profile per account, each with its own CLAUDE_CONFIG_DIR. Steps and a known bug."
h1: "Claude Code in VS Code with multiple accounts"
mainKeyword: "claude code vscode multiple accounts"
kind: how-to
published: 2026-11-03
updated: 2026-11-12
author: n-uf
takeaways:
  - "Out of the box, changing account in the Claude Code panel means signing out (Sign out, or /logout) and signing in again."
  - "Anthropic's VS Code page documents CLAUDE_CONFIG_DIR in the extension's environmentVariables setting, but only as an absolute path: the extension doesn't expand ~."
  - "That setting has the machine scope, so VS Code reads it from user settings only: the account follows the VS Code profile, not the project's .vscode folder."
  - "VS Code remembers which profile a folder uses, so after the first time you just open the project."
  - "An open bug report says the extension may still read ~/.claude for its session list and settings, and one commenter says the setting doesn't always reach Claude, so check your setup once."
faq:
  - q: "Can I use two Claude accounts in VS Code at the same time?"
    a: "Going by the docs, yes: one VS Code window per profile, each profile with its own CLAUDE_CONFIG_DIR folder in the extension's setting. That combines Anthropic's documented setting with VS Code profiles; we haven't tested it end to end, and an open bug report says some extension data may still go to ~/.claude."
  - q: "How do I switch accounts in the Claude Code VS Code extension?"
    a: "The simplest way is Sign out in the panel's Settings section, or /logout, then sign in with the other account. To skip that each time, give each account its own VS Code profile with its own CLAUDE_CONFIG_DIR folder."
  - q: "Can I set CLAUDE_CONFIG_DIR in a project's .vscode/settings.json?"
    a: "Not for the chat panel. The extension's manifest gives claudeCode.environmentVariables the machine scope, and VS Code doesn't read machine-scoped settings from workspace settings. For the integrated terminal you can use terminal.integrated.env.osx in the project's settings instead."
  - q: "Why does the extension ignore my CLAUDE_CONFIG_DIR?"
    a: "First check that the value is an absolute path: Anthropic's page says the extension ignores a relative value and doesn't expand ~. If /status shows the wrong account, or the panel still lists sessions from ~/.claude, you may have hit the open bug report anthropics/claude-code#30538. A commenter there sets the variable in a wrapper script instead, which the extension's claudeProcessWrapper setting can launch."
  - q: "Do VS Code and Terminal share the same usage limits?"
    a: "Yes, for the same account. Anthropic's help page says IDE usage counts toward the same usage limits shared across Claude and Claude Code. Two accounts have two sets of limits."
sources:
  - title: "Claude Code docs: Use Claude Code in VS Code (extension settings, sign-in and sign-out, /status, /usage, CLI on PATH)"
    url: "https://code.claude.com/docs/en/vs-code"
    checked: 2026-11-02
  - title: "Claude Code extension manifest, version 2.1.317 (Open VSX): claudeCode.environmentVariables, type and machine scope"
    url: "https://open-vsx.org/api/Anthropic/claude-code/alpine-arm64/2.1.317/file/package.json"
    checked: 2026-11-02
  - title: "Claude Code extension on Open VSX (latest version: 2.1.317)"
    url: "https://open-vsx.org/api/Anthropic/claude-code/latest"
    checked: 2026-11-02
  - title: "VS Code docs: Profiles (New Profile, Empty Profile, folder association, New Window with Profile)"
    url: "https://code.visualstudio.com/docs/configure/profiles"
    checked: 2026-11-02
  - title: "VS Code docs: Settings (user settings JSON, profile-scoped user settings)"
    url: "https://code.visualstudio.com/docs/configure/settings"
    checked: 2026-11-02
  - title: "VS Code docs: Workspace Trust (workspace settings in Restricted Mode, .vscode shared with the repository)"
    url: "https://code.visualstudio.com/docs/editing/workspaces/workspace-trust"
    checked: 2026-11-02
  - title: "VS Code API docs: Contribution points, configuration scopes (machine)"
    url: "https://code.visualstudio.com/api/references/contribution-points#Configuration-property-schema"
    checked: 2026-11-02
  - title: "VS Code source: configurationRegistry.ts (machine scope; restricted settings not read from untrusted workspace settings)"
    url: "https://github.com/microsoft/vscode/blob/main/src/vs/platform/configuration/common/configurationRegistry.ts"
    checked: 2026-11-02
  - title: "VS Code source: workbench configuration.ts (WORKSPACE_SCOPES leave out machine; PROFILE_SCOPES include it)"
    url: "https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/configuration/common/configuration.ts"
    checked: 2026-11-02
  - title: "VS Code source: terminalConfiguration.ts (terminal.integrated.env.osx)"
    url: "https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/terminal/common/terminalConfiguration.ts"
    checked: 2026-11-02
  - title: "anthropics/claude-code issue #30538: VS Code extension ignores CLAUDE_CONFIG_DIR environment variable"
    url: "https://github.com/anthropics/claude-code/issues/30538"
    checked: 2026-11-02
  - title: "Claude Code docs: Authentication (multiple accounts, ANTHROPIC_API_KEY precedence)"
    url: "https://code.claude.com/docs/en/authentication"
    checked: 2026-11-02
  - title: "Claude Code docs: Environment variables (CLAUDE_CONFIG_DIR, absolute path in settings files)"
    url: "https://code.claude.com/docs/en/env-vars"
    checked: 2026-11-02
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "cl_audit README (n-uf/cl_audit): profiles, Claude Code folder, usage history"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    quote: "The default profile is the one on `~/.claude` with the usual Claude app"
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
  - /blog/claude-code-multiple-accounts/
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-code-usage-history/
  - /install/
---

The setup this guide walks through for Claude Code VSCode multiple accounts is one VS Code profile per Claude account. In each profile's user settings you point the extension's `claudeCode.environmentVariables` setting at that account's `CLAUDE_CONFIG_DIR` folder, written as an absolute path such as `/Users/you/.claude-work`, and you open each project in its profile. Without it, changing account in the Claude Code panel means signing out and signing in again.

Everything below about the extension and VS Code comes from Anthropic's VS Code page, the extension's manifest, and VS Code's own docs and source, read on 2 November 2026. We haven't run the whole setup end to end: it's those documented pieces put together. One open bug report, covered below, says the extension may still read `~/.claude` for some things. cl_audit, our free Mac app, is an independent tool, not affiliated with Anthropic.

## Why the panel keeps one account

The first time you open the Claude Code panel, a sign-in screen appears. You click **Sign in** and finish in the browser. To sign out, Anthropic's VS Code page says, you pick **Sign out** in the Settings section of the panel's command menu, or type `/logout`; both need Claude Code v2.1.277 or later. Then you sign in with the other account.

That works. It also means a full sign-out every time you change client.

Each account spends its own allowance. Anthropic's help page on using Claude Code with a Pro, Max or Ultra plan says IDE usage counts toward the same usage limits shared across Claude and Claude Code. Whatever the panel is signed in to is whose limits you use; [how Claude usage limits work](/blog/claude-usage-limits/) explains those.

The `CLAUDE_CONFIG_DIR` basics and the shell aliases for Terminal are in [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/). This page stays in VS Code.

## How to switch accounts in the Claude Code VS Code extension

| Way | What it switches | Where you set it | The catch |
|---|---|---|---|
| Sign out and sign in | The Claude Code panel, one account at a time | **Sign out** in the panel, or `/logout` | You repeat it every time you change account |
| One VS Code profile per account | The panel, through `CLAUDE_CONFIG_DIR` in the extension's environment | `claudeCode.environmentVariables` in that profile's user settings | Absolute path only; set up once per profile; an open bug report (below) |
| Per-project terminal setting | `claude` run in that project's integrated terminal | `terminal.integrated.env.osx` in the project's `.vscode/settings.json` | Doesn't touch the panel; needs the standalone CLI; the folder must be trusted |

Changing account a few times a week? Signing out is fine. If you move between client projects all day, the second way saves the sign-in. And if you only ever type `claude` in the terminal, the third is the lightest.

## One VS Code profile per account

This joins two things: VS Code profiles, which hold their own settings and extensions, and the extension's `claudeCode.environmentVariables` setting.

**1. Have a folder for the account.** It's a `CLAUDE_CONFIG_DIR` folder, for example `~/.claude-work`, signed in once. In the steps below you write it as an absolute path, `/Users/you/.claude-work`. Anthropic's VS Code page is explicit here: the extension applies a `CLAUDE_CONFIG_DIR` entry only when its value is an absolute path, doesn't expand `~`, and ignores a relative value. The environment variables page says the same for settings files.

**2. Create a VS Code profile for the account.** Open the Profiles editor, select **New Profile**, and name it "Work". Keep settings in the new profile's own contents: VS Code's profiles page says a profile can take some parts, settings included, from the Default Profile instead, and then it wouldn't have settings of its own. An Empty Profile has no settings or extensions at all, so install the Claude Code extension in it.

**3. Add the setting to that profile's user settings.** With the profile active, run **Preferences: Open User Settings (JSON)** from the Command Palette. VS Code's settings page says that when you switch to a profile, the user settings are scoped to that profile. Add:

```json
{
  "claudeCode.environmentVariables": [
    { "name": "CLAUDE_CONFIG_DIR", "value": "/Users/you/.claude-work" }
  ]
}
```

The shape, an array of objects with `name` and `value`, is the one in the extension's manifest (version 2.1.317 on Open VSX). Do the same in a "Personal" or "Client" profile with that account's own folder.

**4. Open the project in that profile.** Use **File ▸ New Window with Profile**, pick the profile, then open the folder. VS Code's profiles page says a profile you create or select is associated with the current folder, and whenever you open that folder, the workspace's profile becomes active. After the first time, you just open the folder.

**5. Open the panel and check the account.** The manifest says these variables are set when Claude is launched, so if the panel was already open, run **Developer: Reload Window**. If the sign-in screen appears, sign in with this profile's account. Then type `/status` in the panel (v2.1.280 or later), which shows the session's Claude Code version, account and model. `/usage` opens the Account & usage dialog.

Anthropic's authentication page says each folder keeps its own claude.ai login. So if you signed the folder in from Terminal already, the panel may not ask you again. `/status` tells you either way.

### Why not the project's settings?

It would be tidier if a repository could pick its own account. For the panel, it can't. The extension's manifest gives `claudeCode.environmentVariables` the `machine` scope, which VS Code's source describes as configurable "only in local and remote user settings". The list of scopes VS Code reads from workspace settings leaves `machine` out, while the list for profile settings includes it. So a value in `.vscode/settings.json` is ignored, and a profile's user settings can hold one.

A project's `.claude/settings.json` doesn't help either: the environment variables page says Claude Code ignores `CLAUDE_CONFIG_DIR` in project and local settings.

That's why the account follows the VS Code profile, and the profile follows the folder.

## A per-project setting for the terminal

The integrated terminal works differently. VS Code's `terminal.integrated.env.osx` adds environment variables for terminals on macOS. It has no `machine` scope, so it can go in a project's `.vscode/settings.json`. It is marked `restricted`, though, and VS Code's source says a restricted value isn't read from workspace settings while the workspace isn't trusted. So trust the folder.

```json
{
  "terminal.integrated.env.osx": {
    "CLAUDE_CONFIG_DIR": "/Users/you/.claude-work"
  }
}
```

After that, `claude` started in a terminal in that project uses the work folder. It doesn't change the chat panel, which reads the extension setting above. You also need the standalone CLI: Anthropic's page says the extension bundles a private copy of the CLI for the panel and doesn't put `claude` on your PATH.

One more thing about this file. The Workspace Trust page points out that `.vscode` settings are shared by anyone who clones the repository. If the project's `.vscode/settings.json` is committed, your home folder path goes with it.

## What to check if the panel ignores the folder

In March 2026 a bug report, [anthropics/claude-code#30538](https://github.com/anthropics/claude-code/issues/30538), said the extension ignored `CLAUDE_CONFIG_DIR`, even when it was set through `claudeCode.environmentVariables`. The CLI honoured it, the reporter wrote, while the extension kept reading and writing `~/.claude`. The issue was still open on 2 November 2026.

Anthropic's VS Code page now documents the setting, with the absolute-path rule. The thread isn't settled, though. In June 2026 a commenter on extension 2.1.181 (Windows) corrected an earlier "it works": the setting reached the Claude process the extension starts, so that session ran on the right account, but the extension's own session list, `settings.json` and `.claude.json` still came from `~/.claude`. Older sessions opened empty, another commenter added. In August 2026 another commenter went further: the setting doesn't consistently reach the process the extension starts, so they set the variable in a wrapper script instead. The extension has a setting for that, `claudeCode.claudeProcessWrapper`, which Anthropic's page describes as the "Executable used to launch the Claude process. The bundled binary path is passed as an argument when present." (The comment names `claudeCode.executablePath`, which isn't in version 2.1.317.) No comment says how 2.1.317, the current version on Open VSX, behaves.

So check your own setup once:

- Run `/status` in the panel and read the account line.
- Send one message, then look for a new session file under `projects` in your folder.
- Open the list of past conversations. If it shows your `~/.claude` sessions, or older ones open empty, you've hit the part of the bug that's still reported.
- Make sure the path is absolute and spelled exactly as the folder is on disk.

If the checks fail, the thread's other routes are that wrapper script, direnv, and starting VS Code from Terminal with the variable set. We haven't tried them.

## An API key can override the folder

Whatever folder the panel uses, `ANTHROPIC_API_KEY` can still decide the sign-in. Anthropic's authentication page ranks that key above a subscription login once you approve it, and says it applies to the CLI and the surfaces that wrap it, the VS Code extension included. `/status` shows which method is active.

Whether a key from your shell reaches the panel depends on how VS Code started. The VS Code page notes that VS Code may not inherit your shell environment, and suggests starting it from a terminal with `code .` when you do want it to. The [Terminal article's gotchas](/blog/claude-code-multiple-accounts/) cover the key in more detail.

## Where cl_audit fits

A cl_audit profile is a Claude Code folder with its own sign-in. The first, default profile is on `~/.claude`, so its VS Code profile needs no `CLAUDE_CONFIG_DIR` at all. Each profile you add gets a folder such as `~/.claude-work`, signed in through Terminal, and that's the folder you point VS Code at.

cl_audit doesn't change VS Code settings and has no VS Code button. You paste the folder path into the VS Code profile's settings yourself, as in the steps above.

What it adds is the view across accounts. Each profile's 5-hour and weekly limits show on its Dock icon and on the [Claude usage dashboard](/dashboard/), read from Anthropic with that profile's Claude Code sign-in, so you see every account's limits without running `/usage` in each window. It can also notify you when a profile nears a limit, and again when it's back; [the alerts page](/use-cases/claude-usage-limit-alerts/) shows how.

[Claude Code usage history](/use-cases/claude-code-usage-history/) reads each profile's folder separately and counts VS Code as a surface next to Terminal. A VS Code session counts for the profile whose folder it was written to, so if the bug above sends files to `~/.claude`, they count for the profile that uses `~/.claude`.

![cl_audit usage history by project, model and surface](/img/guides/usage-history.webp "Usage history: tokens per day, and where they go by project, model and surface. Sample data.")

For the Claude app side, see [running several Claude accounts on one Mac](/use-cases/multiple-claude-accounts/). cl_audit doesn't pool limits. Switching a profile to another of your accounts is something you start yourself, and the switch is meant to move the profile's Code sessions with it, after a backup.

{{experimental: switch}}

Whether you may use more than one Claude account is set by Anthropic's terms. It's a free [Claude usage tracker](/) for Macs with Apple silicon and macOS 13 or later, and needs Claude Code signed in for each profile. To try it, [install cl_audit](/install/).
