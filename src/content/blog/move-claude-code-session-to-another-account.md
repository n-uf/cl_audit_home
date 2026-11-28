---
title: "Move Claude Code session to another account on Mac"
description: "Move a Claude Code session to another account on a Mac with claude-transplant: back up first, what moves, what doesn't, and how to undo it."
h1: "How to move a Claude Code session to another account on a Mac"
mainKeyword: "move claude code session to another account"
kind: how-to
published: 2026-12-03
updated: 2026-12-03
author: n-uf
draft: true
actions: false
takeaways:
  - "claude-transplant is a community tool, MIT-licensed and not made by Anthropic or by us, that moves the Claude app's Code-tab session records from one of your accounts to another. Its README says it works on macOS 13 or newer with Node 22 or newer."
  - "The transcript files in ~/.claude/projects stay where they are and are shared by every account. Only the per-account records that build the Code-tab sidebar move, and the sessions keep their ids."
  - "Back up ~/.claude and ~/Library/Application Support/Claude first, run npx claude-transplant --dry-run to see the plan, and check the receipt afterwards. npx claude-transplant undo reverses the last move, unless a moved session has changed or is still open."
  - "Remote Control ownership, artifacts and their share links, Claude chats and Projects, and the VS Code extension's own session list are not moved."
  - "Anthropic's docs don't describe moving sessions between accounts. Do it for a real reason, such as work to personal or a new account, and check your organization's rules first if the sessions came from a work or Team account."
faq:
  - q: "How do I transfer a Claude Code session to another account?"
    a: "Back up your Claude folders, then run npx claude-transplant. It lists your accounts, you pick the ones to move from and the one to move to, and it moves the Code-tab records. Sign the Claude app in to the destination account afterwards. The transcripts themselves don't move, because every account shares them."
  - q: "Can I move a Claude conversation to another account?"
    a: "Anthropic's help pages say they don't support migrating data between personal accounts, and that exported data can't be imported into another personal account. A personal account can be moved into a Team or Enterprise organization, but that move can't be reversed and doesn't carry chats between email addresses. These pages cover claude.ai chats, not Code-tab sessions."
  - q: "Is it allowed to move sessions to another Claude account?"
    a: "Anthropic's pages don't mention moving sessions. Its Consumer Terms bar sharing your login or making your account available to others, and its Usage Policy bars creating multiple accounts to get around guardrails. A move for a real reason, such as a new account, isn't about limits. Read both pages for your own case."
  - q: "Can I undo a claude-transplant move?"
    a: "Yes, mostly. npx claude-transplant undo restores the last move from its receipt, and the originals are kept in a quarantine folder. Undo is refused if a moved session changed or is still open, if a new fork needs its parent, or if a source can't be restored. A backup covers the rest."
  - q: "Do I need to move anything to resume a session in Terminal?"
    a: "No. claude-transplant's README says the CLI doesn't have this problem: claude --resume reads the shared transcripts whatever you're signed in to. A move only matters for the Claude app's Code-tab sidebar, which lists sessions per account. Start claude --resume in the session's project folder with the same Claude Code folder."
sources:
  - title: "claude-transplant README at v4.2.2 (vitaliyhayda/claude-transplant)"
    url: "https://github.com/vitaliyhayda/claude-transplant/blob/v4.2.2/README.md"
    checked: 2026-11-28
    supports: "What the tool does and why the sidebar is empty after switching accounts (records per account and organization under claude-code-sessions, transcripts in ~/.claude/projects shared by every account); transcripts and sidecars stay on disk, sessions keep their ids, nothing is copied, undo reverses the move; running workers wait for an approved restart; macOS only, unofficial, not affiliated with Anthropic; Node 22 or newer, macOS 13 or newer with Claude Desktop; install and CLI commands (npx claude-transplant, --dry-run, accounts, --from/--to, undo, --cloud, menubar); the receipt and quarantine; what a move touches; Remote Control ownership, artifacts, chats and Projects not moved, VS Code extension not handled; personal history moved into a Team or Enterprise organization becomes that organization's data and moving history out of a Team organization is the organization's decision; the tested combinations table (4.2.2 with Claude Desktop 5.11492.5, Claude Code 2.1.325, macOS 27.0.1, 2026-11-14); MIT."
    quote: "Moves local Desktop session records to another account."
  - title: "claude-transplant v4.2.2 release (vitaliyhayda/claude-transplant)"
    url: "https://github.com/vitaliyhayda/claude-transplant/releases/tag/v4.2.2"
    checked: 2026-11-28
    supports: "v4.2.2 was published on 15 November 2026 and was the latest release on 28 November 2026; main had no commits beyond the tag."
    quote: "Validated with 508 tests."
  - title: "claude-transplant repository (vitaliyhayda/claude-transplant)"
    url: "https://github.com/vitaliyhayda/claude-transplant"
    checked: 2026-11-28
    supports: "The tool's home: MIT-licensed, by its own author, outside n-uf."
    quote: "Move Claude Code history between accounts in Claude Desktop."
  - title: "Claude Code docs: Manage sessions"
    url: "https://code.claude.com/docs/en/sessions.md"
    checked: 2026-11-28
    supports: "A session is a saved conversation tied to a project directory and stored locally; the desktop app, claude.ai/code and the VS Code extension each keep their own session list; claude --resume, the picker and Ctrl+A; resume by ID from any directory; transcripts at ~/.claude/projects/<project>/<session-id>.jsonl, CLAUDE_CONFIG_DIR moves storage; the page doesn't describe moving sessions between accounts."
    quote: "A session is a saved conversation tied to a project directory."
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory.md"
    checked: 2026-11-28
    supports: "Transcripts are plaintext and hold file contents, command output and pasted text; the 30-day default of cleanupPeriodDays; ~/.claude.json holds account details."
    quote: "These files are plaintext."
  - title: "Claude Code docs: Desktop application"
    url: "https://code.claude.com/docs/en/desktop"
    checked: 2026-11-28
    supports: "Desktop and the CLI each keep their own session list; the page doesn't describe moving sessions between accounts."
    quote: "Each keeps its own session list, and you can bring a CLI session into Desktop."
  - title: "Consumer Terms of Service (Anthropic)"
    url: "https://www.anthropic.com/legal/consumer-terms"
    checked: 2026-11-28
    supports: "Effective Oct 8, 2025 as shown: you may not share your Account login information, Anthropic API key or Account credentials, or make your Account available to anyone else; an account created with an employer's email address may be linked to the organization's enterprise account, whose administrator may be able to monitor and control it; nothing about moving data between accounts."
    quote: "You also may not make your Account available to anyone else."
  - title: "Usage Policy (Anthropic), effective Nov 12, 2026"
    url: "https://www.anthropic.com/legal/aup"
    checked: 2026-11-28
    supports: "Among things not to do: creating multiple accounts to avoid detection or circumvent product guardrails; circumventing a ban through a different account; intentionally bypassing or interfering with capabilities, restrictions or guardrails in Anthropic's products."
    quote: "Intentionally bypass or interfere with capabilities, restrictions, or guardrails"
  - title: "Anthropic help: Export your Claude data"
    url: "https://support.claude.com/en/articles/9450526-export-your-claude-data"
    checked: 2026-11-28
    supports: "Exported data can't be imported into another personal Claude account; Anthropic doesn't support migrating data between personal accounts; the export link expires 24 hours after it's created."
    quote: "we don't support migrating data between personal accounts"
  - title: "Anthropic help: Move your personal Claude account to a Team or Enterprise organization"
    url: "https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization"
    checked: 2026-11-28
    supports: "A move can't be reversed and not everything moves; chats are kept under the email address you log in with and can't move from one email address to another; Claude Code cloud sessions aren't moved; the page doesn't mention Code-tab sessions."
    quote: "A move can't be reversed, and not everything moves."
  - title: "cl_audit README at tag v26.11.88 (Moving a profile to another account; Experimental; Credits)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/README.md"
    checked: 2026-11-28
    supports: "cl_audit's account switch moves the Claude window's Code-tab sessions and scheduled tasks to the new account, with the window closed, a backup first, a receipt and Undo the move until Claude Code is on the new account; the move is adapted from claude-transplant 4.2.1 (MIT); account switching is experimental, can lose data and is for testing only; the manual route advises quitting every Claude window and backing up ~/.claude and ~/Library/Application Support/Claude without its caches, and warns that claude-transplant can quit the wrong Claude window when several are open."
    quote: "they are still unstable and can lose data"
related:
  - /blog/claude-sessions-lost-switching-accounts/
  - /blog/back-up-claude-code-sessions/
  - /blog/claude-code-switch-account/
  - /use-cases/switch-claude-accounts/
---

To move a Claude Code session to another account on a Mac, run [claude-transplant](https://github.com/vitaliyhayda/claude-transplant) on it. It's a command-line and menu bar tool that moves the Claude app's Code-tab records from one of your accounts to another, so the sessions show up in the new account's sidebar. It's someone else's open-source tool (MIT), and we're not affiliated with it. Back up first, quit the Claude app, and expect to sign in to the new account afterwards. Anthropic's docs don't describe a built-in way to do this.

## Why a session stays with the account that started it

The Code tab lists sessions per account. According to the README of [claude-transplant](https://github.com/vitaliyhayda/claude-transplant), the Claude app keeps one record per session under `~/Library/Application Support/Claude/claude-code-sessions/<account>/<organization>` and lists only the folder of the account you're signed in to. The conversations themselves are the transcripts in `~/.claude/projects`, and every account shares those. A personal plan and a Team seat on the same email are two organizations, so each has its own list.

Anthropic's session docs say a session is a conversation tied to a project directory and stored locally, and that the desktop app and the CLI each keep their own session list. They don't say what happens to the list when you change account, and neither the session docs nor the Desktop page describes moving sessions between accounts.

If you only need to read or continue an old session, you may not need a move at all. `claude --resume`, started in the session's project folder, opens it from Terminal; the guide on [Claude Code sessions lost after switching accounts](/blog/claude-sessions-lost-switching-accounts/) shows how. Move the records when you want the session in the new account's sidebar.

## Before you move: your reason, and whose data it is

People move sessions for ordinary reasons: from a work account to a personal one when they change jobs, from a Team plan to their own, or to a brand-new account. That's the job this page is for. It isn't a way to get more usage, and we don't write it as one.

Anthropic's rules are worth reading first. Its Consumer Terms (effective 8 October 2025, as shown when we checked) say you may not share your login or make your account available to anyone else. Its Usage Policy (effective 12 November 2026) lists, among things not to do, creating multiple accounts to avoid detection or get around product guardrails, and intentionally bypassing restrictions in its products. Neither page says anything about moving sessions. How they apply to you is for Anthropic to answer. {{live:/blog/claude-max-multiple-accounts/}}Our guide on [Claude Max with multiple accounts](/blog/claude-max-multiple-accounts/) goes through the same two pages in more detail.{{/live}}

If the sessions come from a work or Team account, check your organization's rules before moving them to a personal one. A transcript is plain text, and Anthropic's docs say anything that passes through a tool ends up in it: file contents, command output, pasted text. That can be your employer's code and data. The README of [claude-transplant](https://github.com/vitaliyhayda/claude-transplant) says the same from its side: personal history moved into a Team or Enterprise organization becomes that organization's data, and moving history out of a Team organization is the organization's decision. Ask first.

## Back up first

[claude-transplant](https://github.com/vitaliyhayda/claude-transplant) keeps the original records in a quarantine folder and writes a receipt for each move, so it can undo one. We'd still copy before you start, because a copy also covers a move that goes wrong in a way undo can't reverse.

1. Quit the Claude app, and every other Claude window if you run several.
2. Copy `~/.claude` and `~/Library/Application Support/Claude` to a folder outside both. cl_audit's README gives the same advice and leaves out the app's caches.
3. If you use a separate Claude Code folder through `CLAUDE_CONFIG_DIR`, copy that too.

Transcripts are plain files, so a plain copy is a working backup. The guide to [backing up Claude Code sessions](/blog/back-up-claude-code-sessions/) covers where they live and how long Claude Code keeps them.

## Move Claude Code session to another account with claude-transplant

This is the route we recommend. The commands below are from the [claude-transplant](https://github.com/vitaliyhayda/claude-transplant) [README at v4.2.2](https://github.com/vitaliyhayda/claude-transplant/blob/v4.2.2/README.md), its latest release when we checked. If you run a newer one, read its README first. You need macOS 13 or newer with the Claude app, and Node 22 or newer. Call it a move or a transfer of a Claude Code session to another account: the steps are the same.

1. **Close the Claude app.** The tool can quit and reopen it for you, but with several Claude windows open, cl_audit's README warns it can quit the wrong one.
2. **List your accounts:** `npx claude-transplant accounts`. It labels them from Claude Code's files and the Claude app's records.
3. **Plan the move without writing anything:** `npx claude-transplant --dry-run`. You pick From and To the same way as in a real run.
4. **Run it:** `npx claude-transplant`. Pick the account or accounts to take sessions from, then the one to land in. It prints the inventory, the move, a verify line and the path of a receipt.
5. **Approve a restart if it asks.** A session that a running Claude worker owns is held. The tool prints a plan naming what it will close, and `--restart-approved <token>` quits and reopens the Claude app around the move. Until you approve, those sessions wait, or they stay behind if you move only the rest.
6. **Sign the Claude app in to the destination account.** The README says to sign in to the target account to see the moved history.

| Command | What it does |
|---|---|
| `npx claude-transplant` | Pick From and To, move, print a receipt |
| `--dry-run` | Plan only, write nothing |
| `accounts` | List accounts |
| `--from <match> --to <match>` | Skip the picker; match on email, organization name or uuid prefix |
| `undo` | Restore the last move |
| `--cloud` | Also archive the source account's Remote Control copies |
| `menubar` | Install the menu bar app, which needs the Xcode command line tools |

The menu bar app does the same job with a panel: check the accounts to take from, pick the one to land in, click Move. One thing to read before you use it: its README says the Move button always passes `--cloud`. That reads the Claude app's claude.ai session from the Keychain in memory and sends it only to claude.ai, to reconcile the Remote Control copies. The CLI does that only if you add `--cloud`.

Moved sessions keep their ids. The next message in one goes through whichever account you're signed in to, with the whole conversation as context. The README says the move itself uses no tokens.

We've used it to move our own sessions between two accounts and it worked well. That's our two accounts, not a test of yours. The README lists the combination it was last tested with, claude-transplant 4.2.2, Claude app 5.11492.5, Claude Code 2.1.325 and macOS 27.0.1, on 14 November 2026. It also says file layouts, log wording and endpoints are undocumented and may change, so a newer Claude app can behave differently.

## What moves and what doesn't

| Moves | Stays, or isn't handled |
|---|---|
| The Code-tab session records, under the new account and organization | The transcripts: they stay in `~/.claude/projects`, and nothing is copied |
| Scheduled task registries | Remote Control ownership: re-enable it per session in the new account |
| | Artifact ownership, versions, comments and share links stay with the original account |
| | Claude chats and Projects: they live on claude.ai per organization and aren't touched |
| | The VS Code extension's own session index: untested and not handled |

The tool is macOS only. Anthropic's help pages describe a different move, from a personal claude.ai account into a Team or Enterprise organization, and say it can't be reversed and doesn't take Claude Code cloud sessions along. That one covers chats, not the Code tab's local sessions.

## Undo a move

`npx claude-transplant undo` restores the last move from its receipt. The README says it's refused if a moved session changed or is still open, if a new fork needs its parent, or if a source can't be restored. A move is a move, not a copy, so going back to the first account later means running it again the other way.

The quarantine folder and the receipts sit in `~/Library/Application Support/claude-transplant`. The README says to delete `quarantine` once you no longer want its receipts, not before. Open the Code tab in the new account and check a few sessions first, then keep your own backup a while longer.

## cl_audit can run the same move, but we don't suggest it yet

cl_audit is our own Mac app for watching Claude usage limits. It's an independent tool, not affiliated with Anthropic, and source-available rather than open source. Its account switcher can do this job: when you switch a profile to another account, it moves the Claude window's Code-tab sessions and scheduled tasks too, with a backup first, a receipt and an Undo. Its README says the move is adapted from [claude-transplant](https://github.com/vitaliyhayda/claude-transplant) 4.2.1.

That part of cl_audit is new and not yet proven, and its README marks account switching as experimental: it can lose data, so use it for testing only. So for now we suggest running [claude-transplant](https://github.com/vitaliyhayda/claude-transplant) directly, as above. If you want to see what the switcher does, [switching Claude accounts with cl_audit](/use-cases/switch-claude-accounts/) describes it.

## Other jobs that look like this one

Changing the account Claude Code itself uses is a separate step from moving the Code-tab records. [How to switch account in Claude Code](/blog/claude-code-switch-account/) covers `/logout` and `/login`. If both a personal plan and a Team seat are involved, [Claude Team and a personal account](/blog/claude-team-and-personal-account/) explains how they differ.

A new Mac is a different move again. {{live:/blog/move-claude-code-to-new-computer/}}[Moving Claude Code to a new computer](/blog/move-claude-code-to-new-computer/) covers what to copy.{{/live}} {{live:/blog/export-claude-code-sessions/}}The transcript files themselves are the subject of [exporting Claude Code sessions](/blog/export-claude-code-sessions/).{{/live}}
