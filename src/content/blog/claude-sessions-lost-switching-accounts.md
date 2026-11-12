---
draft: true
title: "Claude Code sessions lost switching accounts: how to resume"
description: "Claude Code sessions lost switching accounts? The transcripts are usually still on disk. How to find them, resume with claude --resume, and what to avoid."
h1: "Claude Code sessions lost switching accounts? They're likely still on disk"
mainKeyword: "claude code sessions lost switching accounts"
kind: how-to
published: 2026-11-26
updated: 2026-11-26
author: n-uf
takeaways:
  - "Claude Code keeps each session's transcript as a file under ~/.claude/projects, tied to a project folder. User reports say switching accounts in the Claude app leaves those files where they are."
  - "The Code tab's sidebar is a separate list. User reports on Claude Code's issue tracker describe it as kept per account, so a different account shows a different list."
  - "claude --resume, started in the same project folder with the same Claude Code folder, opens a session by hand in Terminal. A user report says this doesn't make it show in the other account's sidebar."
  - "Don't delete ~/.claude/projects, run claude purge, or copy sign-in files. None of them brings a sidebar back."
  - "A cl_audit switch is experimental and can lose data. It moves a profile's Code sessions and scheduled tasks to another of your accounts before Claude Code signs in again: a backup first, a receipt, and Undo the move until Claude Code is on the new account, which may not bring everything back."
faq:
  - q: "Are my Claude Code sessions deleted when I sign in to another account?"
    a: "Not by signing in, as far as Anthropic's docs go: they say Claude Code stores transcripts as files under ~/.claude/projects, and nothing there says a sign-in removes them. Claude Code does delete transcripts older than cleanupPeriodDays (30 days by default). From v2.1.248 it keeps sessions you started or last continued in Claude Desktop at any age, unless you set desktopSessionCleanupPeriodDays, managed settings set cleanupPeriodDays, or the HIPAA configuration applies."
  - q: "How do I resume a Claude Code session after switching account?"
    a: "Open Terminal, cd into the project folder and run claude --resume to pick from the list. Press Ctrl+A in the picker to see sessions from every project on the Mac, or run claude --resume with a session ID from any directory. If the sessions lived in a Claude Code folder other than ~/.claude, set CLAUDE_CONFIG_DIR to that folder first."
  - q: "Can I move Claude Code sessions to another account's sidebar?"
    a: "Anthropic's docs don't describe a way to do it for sessions started in the Code tab, and a feature request for it on Claude Code's issue tracker was still open on 7 November 2026. The community tool claude-transplant moves the session records. cl_audit does it as part of a switch, which is experimental and can lose data: the Claude window's Code-tab sessions and scheduled tasks move from the account the profile is on to the one you switch to, after a backup."
  - q: "Does claude --resume work if I'm signed in to a different account?"
    a: "One user report says it does: a Desktop-created session resumed under either login, on Windows with Claude Code 2.1.201. Anthropic's docs tie a session to its project directory and don't mention the account. The resumed conversation runs on whichever account Claude Code in that folder is signed in to, which /status shows."
  - q: "Does cl_audit copy my sign-in when it switches a profile?"
    a: "No. A standby account has no sign-in kept anywhere. Claude Code's own sign-in opens in Terminal with the account's address filled in, you finish it in the browser, and cl_audit checks which account the folder is now signed in to. A backup never holds a sign-in, and cl_audit never signs the Claude app in or out."
sources:
  - title: "Claude Code docs: Manage sessions"
    url: "https://code.claude.com/docs/en/sessions.md"
    checked: 2026-11-07
    supports: "A session is tied to a project directory and stored locally; transcripts live at ~/.claude/projects/<project>/<session-id>.jsonl, with <project> the working directory path with non-alphanumeric characters replaced by -; claude --continue, claude --resume and the picker (Enter, Space to preview, Ctrl+A for all projects, Ctrl+W for all worktrees); -p, Agent SDK and /loop-first sessions left out of the picker but resumable by ID; --resume <session-id> works from any directory; a hand-copied duplicate makes the cross-project ID lookup report not-found; the desktop app, claude.ai/code and the VS Code extension each keep their own session list; resuming the same session in two terminals interleaves messages; --fork-session makes a copy; CLAUDE_CONFIG_DIR moves storage off ~/.claude."
    quote: "A session is a saved conversation tied to a project directory."
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory.md"
    checked: 2026-11-07
    supports: "Transcripts are deleted once older than cleanupPeriodDays (default 30, minimum 1); Claude Desktop and Cowork transcripts are kept at any age from v2.1.248 unless desktopSessionCleanupPeriodDays is set, managed settings set cleanupPeriodDays or the HIPAA configuration applies; claude purge deletes a project's transcripts and auto memory after a 'This cannot be undone' confirmation; deleting ~/.claude/projects loses resume, continue and rewind and auto memory; ~/.claude.json holds account details; transcripts are plaintext."
    quote: "keeps the transcript of a session you started or most recently continued in Claude Desktop"
  - title: "Claude Code docs: Authentication"
    url: "https://code.claude.com/docs/en/authentication.md"
    checked: 2026-11-07
    supports: "On macOS the login is stored in the macOS Keychain (falling back to .credentials.json only when the Keychain refuses the write); with CLAUDE_CONFIG_DIR the Keychain entry is keyed to that directory."
    quote: "On macOS, credentials are stored in the encrypted macOS Keychain."
  - title: "Claude Code docs: Desktop application"
    url: "https://code.claude.com/docs/en/desktop"
    checked: 2026-11-07
    supports: "In the Code tab each conversation is a session and the sidebar lists them; Desktop and the CLI each keep their own session list; /desktop moves a CLI session into Desktop; claude --desktop --resume <session-id> opens a CLI session in Desktop (Claude Code v2.1.285 or later); /resume in Desktop lists sessions started from the CLI on this computer; Desktop continues the same session, so claude --resume still finds it; the page does not say what happens to the Code tab's list when you sign in to another account."
    quote: "Each keeps its own session list, and you can bring a CLI session into Desktop."
  - title: "Claude Code docs: CLI reference"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-07
    supports: "claude -c continues the most recent conversation in the current directory; claude -r / --resume resumes by ID, name or transcript path or shows a picker; --fork-session creates a new session ID when resuming; --desktop with --resume <session-id> opens that session in Desktop, macOS and x64 Windows, Claude Code v2.1.285 or later."
    quote: "Resume a specific session by ID or name, or show an interactive picker"
  - title: "Claude Code docs: Settings files and precedence"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-07
    supports: "CLAUDE_CONFIG_DIR keeps the home-directory files somewhere else, and Claude Code then stores settings, session history and plugins there."
    quote: "Claude Code then stores your settings, session history, and plugins there instead."
  - title: "Claude Code docs: Commands"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-07
    supports: "/status shows version, model, account and connectivity; /resume resumes a conversation by ID or name or opens the picker."
    quote: "Open the Settings interface on the Status tab, showing version, model, account, and connectivity."
  - title: "Anthropic Usage Policy"
    url: "https://www.anthropic.com/legal/aup"
    checked: 2026-11-07
    supports: "The page, headed 'Effective Nov 12, 2026' when read on 7 November 2026, lists among things not to do: coordinating malicious activity across multiple accounts or creating multiple accounts to avoid detection or circumvent product guardrails, and circumventing a ban through a different account."
    quote: "Coordinate malicious activity across multiple accounts, or create multiple accounts, to avoid detection"
  - title: "User report on Claude Code's issue tracker: #48511, \"Desktop app: session history lost when switching accounts\" (closed as not planned by the tracker's bot after inactivity, 24 May 2026; opened 15 Apr 2026)"
    url: "https://github.com/anthropics/claude-code/issues/48511"
    checked: 2026-11-07
    supports: "A user's report, not an Anthropic statement: after switching accounts in the Desktop app, previous sessions disappear in Code (local) mode too; the reporter says the CLI keeps its data in ~/.claude regardless of account. Closed by github-actions for inactivity."
    quote: "Sessions are bound to the cloud account in ALL Desktop modes"
  - title: "User report on Claude Code's issue tracker: #60544, \"Desktop app: switching accounts loses all conversations and sidebar state\" (closed by the tracker's bot as a duplicate of #48511, 23 May 2026; opened 19 May 2026)"
    url: "https://github.com/anthropics/claude-code/issues/60544"
    checked: 2026-11-07
    supports: "A user's report, not an Anthropic statement: on a Mac, logging out and in with a different account leaves no conversations and a reset sidebar."
    quote: "Logout → Login with different account → all conversations gone, sidebar reset."
  - title: "User report on Claude Code's issue tracker: #74662, \"Claude Desktop: allow opening/resuming local sessions not present in the account's sidebar (multi-account support)\" (open, enhancement; opened 6 Jul 2026)"
    url: "https://github.com/anthropics/claude-code/issues/74662"
    checked: 2026-11-07
    supports: "A user's request, not an Anthropic statement: the sidebar list is per account, transcripts in ~/.claude/projects are account-agnostic, claude --resume <session-id> resumed a Desktop-created session under either login (Windows, Claude Code 2.1.201), and the resumed session never shows in the other account's sidebar. Comments disagree on claude://resume (the link behind claude --desktop --resume): one user (10 Oct 2026, one login with two workspaces) says it imports a session into the account shown; another (15 Oct 2026, two accounts on Windows) says it did for terminal-started sessions but not Desktop-started ones."
    quote: "`claude --resume <session-id>` happily resumes a Desktop-created session under either login"
  - title: "User report on Claude Code's issue tracker: #94507, \"[BUG] Desktop: switching organization on ONE account drops running Code sessions — session records are org-scoped but ~/.claude.json and the live connection are not\" (open, bug; opened 15 Sep 2026)"
    url: "https://github.com/anthropics/claude-code/issues/94507"
    checked: 2026-11-07
    supports: "A user's report, not an Anthropic statement: switching organization on one account empties the Code tab's sidebar and drops a running session, and switching back restores the sidebar; it describes Code-tab records at ~/Library/Application Support/Claude/claude-code-sessions/<accountUuid>/<orgUuid>/local_<sessionId>.json and transcripts in a flat ~/.claude/projects."
    quote: "Session records are keyed by account and organization"
  - title: "claude-transplant README (vitaliyhayda/claude-transplant)"
    url: "https://github.com/vitaliyhayda/claude-transplant"
    checked: 2026-11-07
    supports: "A community tool, menu bar or CLI, that moves Desktop Code session records to another account; transcripts stay on disk, sessions keep their ids, --dry-run plans only and undo reverses the move; macOS 13 or newer with Claude Desktop, Node 22 or newer; MIT; unofficial; personal history moved into a Team or Enterprise organization becomes that organization's data."
    quote: "Moves local Desktop session records to another account."
  - title: "cl_audit README at tag v26.11.18 (Install; Words used here; When a limit is full; Profile settings, Accounts and Sessions; Backups of a profile's sessions; How cl_audit tells what Claude Code deletes; Moving a profile to another account; Credits)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/README.md"
    checked: 2026-11-11
    supports: "In use and standby; accounts found on this Mac from the Claude window's claude-code-sessions/<account>/<org> folders, Claude Code's records and the transcripts; Sign in with another account…; the Switch page and What changes; the move (window closed, backup first, each entry written and checked before the original is set aside, nothing deleted, tasks with skips and retries, a session a running Claude Code owns held until a later switch, a receipt, Undo the move until Claude Code is on the new account); Claude Code's sign-in in Terminal, watched for up to 10 minutes; the Claude app's sign-in is yours; sessions show while the window is signed in to their account; a switch that stopped half way on the Sessions card with Undo it; what a backup holds and never holds; Restore… with a preview; a Claude app session you deleted goes on the normal schedule, an archived one after a grace period; the manual-move advice to quit every Claude window and back up ~/.claude and ~/Library/Application Support/Claude without its caches, and claude-transplant's From and To; the first profile is the default profile, on ~/.claude; the claude-transplant credit."
    quote: "the Claude app's sign-in is yours to change."
  - title: "cl_audit CHANGELOG, 26.11.18 (2026-11-11)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/CHANGELOG.md"
    checked: 2026-11-11
    supports: "26.11.18: a profile is one Claude Code folder and switching signs in again on it; the switch moves the Claude window's Code-tab sessions and scheduled tasks from the account in use to the one switched to, inside the one folder, the way claude-transplant does, with a backup and a receipt; Claude Code's transcripts stay in the folder; the Claude app's sign-in is yours; Undo this switch is gone and the way back is a switch the other way; the move adapts claude-transplant 4.2.1 (MIT)."
    quote: "Claude Code's transcripts stay in the folder."
  - title: "cl_audit 26.11.18 release notes (GitHub)"
    url: "https://github.com/n-uf/cl_audit/releases/tag/v26.11.18"
    checked: 2026-11-11
    supports: "Release 26.11.18 was checked with Claude Code 2.1.318 and the Claude app 5.1231.2; the same switch facts as the changelog."
    quote: "Checked with Claude Code 2.1.318 and the Claude app 5.1231.2."
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
related:
  - /use-cases/switch-claude-accounts/
  - /blog/claude-code-switch-account/
  - /use-cases/claude-code-usage-history/
  - /install/
---

If your Claude Code sessions were lost switching accounts in the Claude app, the conversations are most likely still on your Mac. Claude Code saves each one as a transcript file under `~/.claude/projects`, tied to a project folder. The Code tab's sidebar is a separate list, and user reports describe it as kept per account, so the new account just doesn't list the old sessions. You can open any of them in Terminal with `claude --resume`, started in the same project folder and with the same Claude Code folder. Getting them back into the new account's sidebar is a separate job, and it comes last.

## Check that the sessions are still there

If Claude Code tab sessions are missing, look before you change anything. Two commands, both read-only:

```bash
ls ~/.claude/projects | head
ls ~/Library/Application\ Support/Claude/claude-code-sessions
```

The first lists one folder per project. Anthropic's docs say a transcript is stored at `~/.claude/projects/<project>/<session-id>.jsonl`, where `<project>` is the working directory's path with every non-alphanumeric character replaced by `-`. A project at `/Users/you/work/shop` becomes `-Users-you-work-shop`, and each `.jsonl` file in it is one session. If you use a separate Claude Code folder through `CLAUDE_CONFIG_DIR`, as every cl_audit profile after the first does, `projects` sits in that folder instead, say `~/.claude-work/projects`. Anthropic's settings page says Claude Code then keeps its session history there. The first, default profile uses `~/.claude`.

The second command lists the Claude app's own Code-tab records. Anthropic doesn't document this folder. A user report (#94507) describes it as `claude-code-sessions/<account id>/<organization id>/local_<session id>.json`, one folder for each account and organization you've used, and cl_audit's README describes the same layout. These files are what the sidebar is built from, not the conversations.

A session can really be gone in two ways. Claude Code deletes transcripts older than `cleanupPeriodDays`, 30 days by default (the minimum is 1). Since Claude Code v2.1.248 it keeps a session you started or last continued in Claude Desktop at any age, unless you set `desktopSessionCleanupPeriodDays`, managed settings set `cleanupPeriodDays`, or the HIPAA configuration applies to your sessions. cl_audit's README adds that one you delete in the Claude app goes on the normal schedule, and one you archive goes after a grace period. The other way is a folder that you or a clean-up tool deleted. If `projects` is empty, a Time Machine backup is the next place to look.

## Why Claude Code sessions look lost after switching accounts

Anthropic's session docs describe a session as a conversation tied to a project directory, stored locally. They say the desktop app, claude.ai/code and the VS Code extension each keep their own session list. They don't say what the Code tab's list does when you sign in to a different account.

So the rest of this section is what users report on Claude Code's issue tracker, not what Anthropic says. If Claude Desktop lost your history when switching accounts, these four describe the same thing. Two were closed by the tracker's bot, which isn't a fix.

| Issue (Claude Code tracker) | Title as shown on 7 Nov 2026 | State | What it reports |
|---|---|---|---|
| #48511 | Desktop app: session history lost when switching accounts | Closed, not planned, by the bot after inactivity (24 May 2026) | Previous sessions disappear after switching accounts, in Code (local) mode too |
| #60544 | Desktop app: switching accounts loses all conversations and sidebar state | Closed by the bot as a duplicate of #48511 (23 May 2026) | After logout and login with another account, the conversations are gone and the sidebar is reset |
| #74662 | Claude Desktop: allow opening/resuming local sessions not present in the account's sidebar (multi-account support) | Open, enhancement (opened 6 Jul 2026) | The sidebar list is per account; transcripts are on disk; `claude --resume` opens them |
| #94507 | [BUG] Desktop: switching organization on ONE account drops running Code sessions — session records are org-scoped but ~/.claude.json and the live connection are not | Open, bug (opened 15 Sep 2026) | Switching organization, not account, also empties the sidebar and drops a running session; switching back restores it |

Read together, they say the transcripts are one flat set of files that doesn't depend on who is signed in, while the sidebar is built from records kept per account and organization. When Claude Code sessions are lost after switching accounts, then, it's the list that's missing, not the files. The first thing to try is signing back in to the account the sessions were started under. In #94507, switching back brought the sidebar back.

## Resume a session by hand with claude --resume

Anthropic's docs tie a session to its project directory and don't mention the account. On `claude --resume` after switching account, the one data point is the report in #74662: `claude --resume <session-id>` resumed a Desktop-created session under either login (Windows, Claude Code 2.1.201).

1. Open Terminal and `cd` into the project folder the session ran in. The picker starts with the sessions of the folder you're in.
2. Run `claude --resume`. You can search the list, press Space to preview a session and Enter to resume it. `Ctrl+A` widens the list to every project on the Mac; `Ctrl+W` widens it to the repository's other worktrees.
3. To skip the picker, run `claude --continue` for the most recent session in this directory, or `claude --resume <session-id>` from any directory. The ID is the transcript's file name without `.jsonl`. Sessions started with `claude -p`, the Agent SDK or a first `/loop` prompt never show in the picker, but the ID still opens them.
4. If the sessions lived in a Claude Code folder other than `~/.claude`, start Claude Code with that folder: `CLAUDE_CONFIG_DIR="$HOME/.claude-work" claude --resume`. The basics of that variable are in the [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) guide. A wrong folder would also explain a picker that looks empty.

A resumed session continues the conversation with its saved history. It runs on whichever account Claude Code in that folder is signed in to, and `/status` shows which. If that's the wrong one, [switching the account in Claude Code](/blog/claude-code-switch-account/) is a separate step.

Anthropic's docs warn that resuming the same session in two terminals mixes their messages into one transcript. If the Claude app still has that session open, close it there first, or add `--fork-session` to work on a copy.

This won't put the session back in the sidebar. The reporter in #74662 says a resumed session never shows in the other account's list. Anthropic documents ways into Desktop for sessions started in a terminal: `/desktop` inside a CLI session, `claude --desktop --resume <session-id>` from the shell (Claude Code v2.1.285 or later), and `/resume` in Desktop's prompt box, which lists sessions you started from the CLI. The docs don't say how any of them treats a session that began in the Code tab under another account. Comments on #74662 disagree: one user found the link behind `claude --desktop --resume` brought sessions across, and another, with two accounts, found it worked for sessions started in a terminal but not for ones started in Desktop. We haven't tried it.

## What not to do

- **Don't delete `~/.claude/projects`** to clear things up. Anthropic's docs list what you lose: resume, continue and rewind for past sessions, and auto memory for every project. `claude purge` does the same for one project, after a confirmation that says it can't be undone.
- **Don't copy sign-ins between folders.** Your sessions aren't in them. On a Mac, Anthropic's docs say the login sits in the Keychain, keyed to the Claude Code folder, and `~/.claude.json` holds account details. Neither is part of `projects`, so copying one does nothing for your sessions.
- **Don't copy a transcript to make a spare.** Anthropic's docs say a hand-copied duplicate makes the lookup by ID across projects report not-found instead of resuming either copy. `--fork-session` is the supported way to get a copy.
- **Don't edit the Code-tab record files by hand.** Anthropic doesn't document their format, and the report above shows they are keyed by account and organization.
- **Don't switch again without a copy.** Quit the Claude app, then copy `~/.claude` and `~/Library/Application Support/Claude` somewhere outside them. cl_audit's README gives the same advice before a manual move (leave out the app's caches). Transcripts are plain text files, so a plain copy is enough to start from.

## Move Claude Code sessions to another account

The sidebar is the part a hand-resume can't mend. The community tool claude-transplant moves the Code-tab records to another account. Its README says sessions keep their ids, transcripts stay on disk, `--dry-run` only plans and `undo` reverses the move. It needs macOS 13 or newer and Node 22 or newer, is MIT-licensed and unofficial, and notes that personal history moved into a Team or Enterprise organization becomes that organization's data.

cl_audit, our app, makes the same move part of a switch you start yourself. It's a free macOS app that shows each Claude profile's 5-hour and weekly limits. Its move is adapted from claude-transplant, and cl_audit's README credits it. In cl_audit a profile is one Claude Code folder, signed in to one account at a time; your other accounts wait on standby, signed out. Switching a profile signs Claude Code in again on that same folder, and before it does, the Claude window's Code sessions move to the new account. cl_audit is an independent tool, not affiliated with Anthropic.

{{experimental: switch}}

The move goes one way: from the account the profile is on to the account you switch to. So a switch is meant to change accounts without the sidebar going blank. For sessions already sitting under an old account, claude-transplant lets you pick the From and To accounts yourself.

![The Switch page for Work, with What changes and the steps](/img/guides/switch-page.webp "cl_audit's site demo: the Switch page for its sample Work profile (team-1 to team-2), with What changes and the steps.")

Here is what happens when you switch Work from `ultra-1@example.com` to `ultra-2@example.com` in cl_audit 26.11.18.

1. **Find the account.** In Settings ▸ the profile ▸ Claude Code ▸ **Accounts**, the account in use is marked IN USE and the others STANDBY. cl_audit finds your accounts on this Mac by itself, from the Claude window's session folders, Claude Code's records and the transcripts. **Sign in with another account…** is for one that isn't there yet.
2. **Open the Switch page** with the standby account's **Switch account** key. Under What changes it says that Claude Code on that folder moves to ultra-2, running sessions included, and how many of the window's Code-tab sessions and scheduled tasks move from ultra-1 to ultra-2. The window closes for the move, and you sign it in to ultra-2 yourself afterwards. The transcripts, the profile's name, Dock icon, folder and settings stay.
3. **Switch to ultra-2.** The profile's Claude window closes, and cl_audit makes a backup first. It's an APFS clone, so it takes seconds. It holds the Code-tab list with its scheduled tasks and their prompts, the sidebar records, cl_audit's own records and, by default, Claude Code's transcripts and setup, with `settings.json`'s env values blank. It never holds a sign-in or the Claude window's MCP settings. If the backup can't be made, nothing moves.
4. **The sessions move.** Each session record is written for ultra-2 and checked, and only then is the original set aside in cl_audit's folder, not deleted at that step. Scheduled tasks follow with their skips and retries. A session that a running Claude Code has open stays with ultra-1 until a later switch. A receipt notes every step.
5. **Claude Code signs in again.** Its own sign-in opens in Terminal for the profile's folder with ultra-2's address filled in. You finish it in the browser, and cl_audit watches the folder for up to 10 minutes. When it worked, the page says "Now on ultra-2 · ultra-1 on standby". It never copies a sign-in.
6. **Sign the window in yourself.** cl_audit never signs the Claude app in or out. When you open the window again, sign it in to ultra-2, and the moved sessions show there.

If the browser signs in as another account, or nothing signs in within the 10 minutes, the page says where the sessions are and offers **Undo the move**. It puts back what got done, as long as Claude Code isn't on the new account yet, though it may not bring everything back; once the switch has finished, the way back is a switch the other way. A switch that stopped half way shows on the profile's Sessions card, with how many sessions sit under which account and **Undo it**. Backups are listed there too, and **Restore…** shows a preview before it writes anything. Chats and Projects on claude.ai don't move; they belong to each account. The [FAQ](/faq/) has the switch in short.

Each account's limits stay its own, and cl_audit doesn't pool them or switch by itself. Whether one person may hold more than one Claude account is up to Anthropic's terms. On 7 November 2026, Anthropic's Usage Policy (headed "Effective Nov 12, 2026") listed, among things not to do, coordinating malicious activity across multiple accounts, creating accounts to avoid detection or get around product guardrails, and using a different account to get around a ban. cl_audit can't say how that applies to you. The Code-tab files are the Claude app's own, so the 26.11.18 release notes name the versions it was checked with: Claude Code 2.1.318 and the Claude app 5.1231.2.

| | By hand | cl_audit switch (26.11.18) |
|---|---|---|
| Conversation back | Yes, in Terminal with `claude --resume` | Meant to be, in the profile's Claude window |
| Back in the new account's sidebar | Not documented for Code-tab sessions; user reports differ | Meant to be, once the window is signed in to the new account; a session a running Claude Code has open stays until a later switch |
| Backup before anything moves | The copy you make | Made first; if it fails, nothing moves |
| Undo | Your copy | **Undo the move**, until Claude Code is on the new account (it may not bring everything back); then a switch back |
| Needs | Terminal | A Mac with Apple silicon, macOS 13 or later, Claude Code signed in, and the profile's Claude window |

If one account is all you use, nothing here changes for you. If you keep several side by side, [separate profiles](/use-cases/multiple-claude-accounts/) are the other way, and [switching one profile between accounts](/use-cases/switch-claude-accounts/) covers this one in full. Your history by project, model and surface is in the [usage history](/use-cases/claude-code-usage-history/). You can [download cl_audit](/install/) and try the switch for testing, never on sessions you can't afford to lose; it's experimental, and a backup is made before anything moves.
