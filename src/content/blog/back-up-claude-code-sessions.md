---
title: "Back up Claude Code sessions before the clean-up"
description: "How to back up Claude Code sessions on a Mac: what cleanupPeriodDays deletes and when, where transcripts live, and how to copy and restore them."
h1: "How to back up Claude Code sessions on a Mac and keep them past 30 days"
mainKeyword: "back up claude code sessions"
kind: how-to
published: 2026-11-27
updated: 2026-11-27
author: n-uf
draft: true
takeaways:
  - "Claude Code deletes session transcripts once they are older than cleanupPeriodDays: the default is 30 days, the minimum is 1, and 0 is rejected. The sweep runs in the background after a session starts and shows no message. From v2.1.248, sessions from Claude Desktop or Cowork are kept at any age unless a setting says otherwise."
  - "Transcripts are plain files at ~/.claude/projects/<project>/<session-id>.jsonl (under your CLAUDE_CONFIG_DIR folder if you set one), so a copy of that folder is a working backup."
  - "Raising cleanupPeriodDays keeps sessions longer, but it can't bring back a session the sweep has already deleted."
  - "A copy of the transcripts doesn't include the Claude app's Code-tab list, its groups and pins, or any sign-in."
  - "cl_audit 26.11.1 backs up a profile's sessions before every switch that moves them and with Back up now in its Sessions card, which also has Keep for; Restore… shows a preview first and never overwrites."
faq:
  - q: "Where does Claude Code store sessions?"
    a: "As JSONL files at ~/.claude/projects/<project>/<session-id>.jsonl, where <project> is the working directory's path with every non-alphanumeric character replaced by a dash. If you set CLAUDE_CONFIG_DIR, everything lives under that folder instead. Anthropic's docs say the entry format is internal and changes between versions."
  - q: "How long does Claude Code keep session history?"
    a: "30 days by default. Anthropic's settings reference says cleanupPeriodDays takes a whole number of days with a minimum of 1, and that Claude Code deletes older transcripts in a background sweep after a session starts. From Claude Code v2.1.248, transcripts of sessions started or most recently continued in Claude Desktop or Cowork are kept at any age, unless desktopSessionCleanupPeriodDays or a managed cleanupPeriodDays applies."
  - q: "Can I stop Claude Code deleting old sessions?"
    a: "Not with an off switch: Anthropic's page says setting cleanupPeriodDays to 0 fails validation and suggests a large value such as 3650 for long retention. An organisation's managed settings can set the value too, and then yours doesn't apply. Run /status to see which settings sources are active."
  - q: "Does copying ~/.claude/projects bring back my Code tab list?"
    a: "No. The copy holds the transcripts only. cl_audit's README describes the Code tab's list, with its scheduled tasks, and the sidebar records as separate records in the Claude app's own folder, which is why its backups take those too."
  - q: "Is restoring a Claude Code session the same as resuming it?"
    a: "No. Resuming (claude --resume or claude --continue) reopens a session whose transcript is still on disk. Restoring means putting a transcript back after it was deleted, from a copy or a backup, and then resuming it."
sources:
  - title: "Claude Code docs: All settings (cleanupPeriodDays)"
    url: "https://code.claude.com/docs/en/settings-reference#cleanupperioddays"
    checked: 2026-11-07
    supports: "cleanupPeriodDays: what it sets, whole number, minimum 1, default 30, 0 fails validation, 3650 as an example of long retention, background sweep after a session starts, no message, deleted sessions leave the /resume picker; desktopSessionCleanupPeriodDays gives Claude Desktop and Cowork transcripts a limit, deleting each once older than both keys (v2.1.248 or later)."
    quote: "Claude Code runs the deletion as a background sweep after a session starts"
  - title: "Claude Code docs: Explore the .claude directory (cleaned up automatically)"
    url: "https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically"
    checked: 2026-11-07
    supports: "The paths under ~/.claude the sweep deletes (projects/ transcripts, subagents, tool-results, file-history, plans, tasks and others); that sessions/ and auto memory are not swept; the exemption for Claude Desktop and Cowork transcripts (v2.1.248 or later) and when cleanupPeriodDays applies to them anyway; the cases where the sweep is skipped or paused."
    quote: "The default is 30 days and the minimum is 1"
  - title: "Claude Code docs: Explore the .claude directory (kept until you delete them)"
    url: "https://code.claude.com/docs/en/claude-directory#kept-until-you-delete-them"
    checked: 2026-11-07
    supports: "history.jsonl (prompts you typed) is not removed by the sweep; .credentials.json holds login credentials."
    quote: "Prompts you've typed, with timestamp and project path."
  - title: "Claude Code docs: Explore the .claude directory (plaintext storage)"
    url: "https://code.claude.com/docs/en/claude-directory#plaintext-storage"
    checked: 2026-11-07
    supports: "Transcripts and history are plaintext and can hold what tools read or print; lowering cleanupPeriodDays shortens how long they stay."
    quote: "Transcripts and history are not encrypted at rest."
  - title: "Claude Code docs: Manage sessions"
    url: "https://code.claude.com/docs/en/sessions"
    checked: 2026-11-07
    supports: "Where transcripts are stored and how the <project> folder name is built; claude --continue, claude --resume, --resume with a name, an ID or a .jsonl path, /resume; resuming by ID from any directory; a hand-copied duplicate makes the cross-project ID search report not-found."
    quote: "a hand-copied duplicate makes Claude Code report not-found rather than resume an arbitrary copy"
  - title: "Claude Code docs: CLI reference"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-07
    supports: "The --continue and --resume flags and what each loads."
    quote: "Resume a specific session by ID or name"
  - title: "Claude Code docs: Settings files and precedence"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-07
    supports: "~/.claude/settings.json is the user settings file; settings files are strict JSON; CLAUDE_CONFIG_DIR moves settings and session history; /status shows the settings sources, including a managed one; managed settings sit above user settings; ~/.claude.json holds account details."
    quote: "Claude Code then stores your settings, session history, and plugins there instead."
  - title: "Claude Code docs: Data usage (data retention)"
    url: "https://code.claude.com/docs/en/data-usage#data-retention"
    checked: 2026-11-07
    supports: "Local transcripts are kept in plaintext for 30 days by default and cleanupPeriodDays adjusts it; Claude Desktop and Cowork transcripts are exempt by default."
    quote: "store session transcripts locally in plaintext under `~/.claude/projects/` for 30 days by default"
  - title: "Claude-Session-Backup README (DazzleML)"
    url: "https://github.com/DazzleML/Claude-Session-Backup"
    checked: 2026-11-07
    supports: "One line on what the tool says it is: a git-backed session backup that can restore deleted sessions from git history; its platform badge lists macOS."
    quote: "Git-backed Claude Code session backup"
  - title: "claude-code-session-restorer README (sahol3)"
    url: "https://github.com/sahol3/claude-code-session-restorer"
    checked: 2026-11-07
    supports: "One line: a Windows PowerShell tool with a backup and restore script, and a script that rebuilds the Code tab's per-account session list."
    quote: "A safe, reversible Windows PowerShell tool"
  - title: "cl_audit README at tag v26.11.4"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.4/README.md"
    checked: 2026-11-08
    supports: "The Sessions card (Kept here, Keep for and how it writes cleanupPeriodDays, Back up now, backups list, Export… and Import… with Undo last import), General > Backups, what a backup holds and never holds, APFS clones, the Restore preview, merge-only rules, the receipt, Undo this restore, Undo this switch. Export…: a profile's sessions as one file, for another Mac or for keeping, saved where the Save panel says; None: a zip, or an AES-256 encrypted disk image with a password; sessions that hold keys are left out unless you choose Keep them: needs a password. Import…: a preview first, nothing is ever overwritten; Undo last import takes back what it added."
    quote: "Keep for: how long Claude Code keeps its own transcripts"
  - title: "cl_audit README at tag v26.11.6"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.6/README.md"
    checked: 2026-11-09
    supports: "Kept here ends with when Claude Code deletes the profile's sessions; Kept here and the note under Keep for say which case applies (managed settings included); cl_audit reads managed settings and never writes them; a Claude window session you deleted or archived there is cleaned up like the others (an archived one after a grace period); Restore's Would be deleted row counts only the transcripts Claude Code's own clean-up would delete again, and Keep for 90 days is shown only when it would save some of them."
    quote: "only the restored transcripts Claude Code's own clean-up would delete again"
  - title: "cl_audit CHANGELOG, 26.11.1"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.1/CHANGELOG.md"
    checked: 2026-11-07
    supports: "Backups before a switch that moves sessions, Back up now, Keep for, Restore and Undo this restore; Export and Import exist in Sessions."
    quote: "Backups of a profile's sessions."
  - title: "cl_audit CHANGELOG, 26.11.8"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.8/CHANGELOG.md"
    checked: 2026-11-09
    supports: "26.11.8 (9 November 2026): Export, Import, Backup and Restore carry Claude Code's setup (CLAUDE.md and the files it includes, skills, agents, commands, output styles, keybindings, settings.json with the scripts its hooks run, the list of installed plugins); Import and Restore leave it out until you pick Add them and add only what is missing, replacing nothing; Undo takes it back."
    quote: "Claude Code's setup travels: Export, Import, Backup and Restore carry it."
  - title: "cl_audit 26.11.1 release notes"
    url: "https://github.com/n-uf/cl_audit/releases/tag/v26.11.1"
    checked: 2026-11-07
    supports: "The 26.11.1 feature list and the Claude Code (2.1.318) and Claude app versions it was checked with."
    quote: "Restore a backup, and Undo this switch puts back from it."
related:
  - /use-cases/claude-code-usage-history/
  - /blog/claude-sessions-lost-switching-accounts/
  - /use-cases/switch-claude-accounts/
  - /install/
---

To back up Claude Code sessions, copy the `projects` folder inside `~/.claude` elsewhere before Claude Code deletes old transcripts. It deletes those older than `cleanupPeriodDays`, 30 days unless you change it, and doesn't tell you. Sessions from the Claude app are the exception: Claude Code 2.1.248 and later keep those. You can raise the number to keep sessions longer, and a plain copy of the folder is a real backup. What the copy leaves out is the Claude app's Code-tab list and sidebar.

If you only want to reopen an old conversation, you don't need a backup: skip to [resume, not restore](#do-you-mean-resume-not-restore).

cl_audit, our [Claude usage tracker for Mac](/), is independent and not affiliated with Anthropic. Since release 26.11.1 its Sessions card does this job with a button, Code-tab part included. Doing it by hand comes first, because you may not need more.

## What Claude Code deletes, and when

Anthropic's settings reference, read on 7 November 2026, says `cleanupPeriodDays` sets how many days Claude Code keeps session transcripts and other application data before deleting them: a whole number, 30 by default, minimum 1. Setting it to `0` fails validation, and the page suggests a large value such as `3650` for long retention.

The deletion is a background sweep after a session starts, with no message. A session you haven't used for longer than the period just stops appearing in the `/resume` picker.

The sweep takes more than transcripts. Anthropic's ".claude directory" page lists:

- the transcripts in `projects/`, with their subagent transcripts and spilled tool results;
- `file-history/`, the pre-edit snapshots that checkpoint restore uses;
- plan files, task lists, debug logs, the paste cache and a few smaller folders;
- the copies of `~/.claude.json` in `backups/`.

The exceptions:

- **Sessions from the Claude app.** The same page says Claude Code keeps the transcript of a session you started or most recently continued in Claude Desktop (the Claude app) or Cowork at any age, from Claude Code v2.1.248. A separate key, `desktopSessionCleanupPeriodDays`, gives them a limit; each goes once it's older than both keys. A session that only ever ran in Terminal is swept on the normal schedule.
- **Deleted or archived in the Claude app.** cl_audit's README adds that a Claude app session you deleted or archived there goes on the normal schedule, an archived one after a grace period.
- **Managed settings.** If your organisation sets `cleanupPeriodDays`, that value applies, to Claude app sessions too. `/status` lists your active settings sources.
- **Skipped or paused sweeps.** It doesn't run in `claude -p --bare`, and it pauses if Claude Code can't safely work out the retention period, for example when a settings file can't be parsed.

## Where Claude Code sessions are stored

Anthropic's sessions page puts the transcripts at `~/.claude/projects/<project>/<session-id>.jsonl`. The `<project>` part is the working directory's path with every character that isn't a letter or digit replaced by `-`. Anthropic warns that the entry format inside is internal and changes between versions, so copy the files; don't build on their contents.

If you set `CLAUDE_CONFIG_DIR`, all of this lives under that folder instead. A cl_audit profile's Claude Code folder is one, for example `~/.claude-work`. Everything below applies to whichever folder you use.

| Under `~/.claude/` | What it holds | Swept after `cleanupPeriodDays`? |
|---|---|---|
| `projects/<project>/<session-id>.jsonl` | The conversation transcript | Yes |
| `projects/<project>/<session-id>/` | Subagent transcripts, large tool results | Yes, with the transcript |
| `projects/<project>/memory/` | Auto memory | No |
| `file-history/` | Snapshots for checkpoint restore | Yes |
| `history.jsonl` | Prompts you typed | No |
| `settings.json` | Your settings, including `cleanupPeriodDays` | No |

`~/.claude.json` is a separate file with your account details, MCP servers and per-project state, not sessions.

These files are plaintext. Anthropic's page says a `.env` file a tool read, or a credential a command printed, ends up in the transcript. A backup is as sensitive as the sessions.

## Keep sessions longer with cleanupPeriodDays

Add the key to `~/.claude/settings.json`, or to the `settings.json` in your `CLAUDE_CONFIG_DIR` folder:

```json
{
  "cleanupPeriodDays": 365
}
```

Settings files are strict JSON, so a comment or a trailing comma is an error. After you save, `/status` shows which settings files Claude Code loaded.

Two cautions. A longer period only helps sessions that haven't been swept yet; raising the number doesn't bring a deleted one back. And plaintext transcripts then stay on disk longer, the opposite of Anthropic's advice for reducing exposure.

## Back up Claude Code sessions by hand

A longer period leaves the sessions in one place; a copy puts them in two. Copy them before they age out, and again from time to time. {{live:/blog/export-claude-code-sessions/}}Moving them to another Mac is a different job, covered in [how to export Claude Code sessions](/blog/export-claude-code-sessions/).{{/live}}

**Finder.** Choose Go ▸ Go to Folder (⇧⌘G) and type `~/.claude`. Select `projects`, choose Edit ▸ Copy (⌘C), then paste (⌘V) in your backup folder. Don't drag it to a folder on the same disk: that moves it out of Claude Code's reach. A synced folder works, but then the plaintext transcripts sit with that service too.

**A plain copy in Terminal.** `rsync` without `--delete` is a good fit, because a later run adds new sessions and never removes a copy of one that Claude Code has since deleted:

```bash
mkdir -p ~/Backups/claude-sessions
rsync -a ~/.claude/projects/ ~/Backups/claude-sessions/projects/
```

It only ever writes to the backup. Never run it the other way round: copying the backup back over `~/.claude/projects` would replace transcripts that have grown since with their older copies.

**Time Machine.** It backs up hidden folders too, so if you use it, `~/.claude` is probably covered already. To get a session back, copy its files out to another folder, then put them back by the steps below.

Copy `projects/`, and `file-history/` if you rewind a lot. Leave the rest of `~/.claude` alone: Anthropic's page lists `.credentials.json` there as login credentials, and you don't want a sign-in in a backup folder.

To put a session back by hand:

1. Raise `cleanupPeriodDays` first. Anthropic's page doesn't say which timestamp "older than" reads, so a restored old file may go in the next sweep.
2. Quit any Claude Code session in that project.
3. Copy its `.jsonl` file (and its same-named folder, if it has one) into the `projects/<project>/` folder it came from. If a file with that name is already there, leave it: that session wasn't deleted.
4. Keep one copy inside the Claude Code folder only. Anthropic's sessions page says a hand-copied duplicate in another project folder makes a resume by ID from elsewhere report not-found rather than pick one.

## What a copy of the transcripts doesn't cover

- **The Claude app's Code tab.** Per cl_audit's README, the app keeps the tab's list (with its scheduled tasks) and its sidebar records in its own folder, one folder per account and organisation. A restored transcript can be resumed with `claude --resume`; whether the tab lists it depends on those records.
- **Groups and pins.** cl_audit's README says claude.ai keeps the sidebar's groups, order and pins for each account, so copying files doesn't bring them back.
- **Chats and Projects on claude.ai,** and cloud sessions. They aren't files on your Mac.
- **A sign-in.** It belongs in neither a copy nor a backup.

![The Sessions card of a profile with its backups](/img/guides/sessions-card.webp "cl_audit's site demo: a profile's Sessions card, with Keep for and its backups. Sample data.")

## Do you mean resume, not restore?

"Restore a Claude Code session" often means "pick up where I left off". If the transcript is still on disk, that's resuming, per Anthropic's CLI reference and sessions page:

- `claude --continue` loads the most recent conversation in the current directory.
- `claude --resume` opens the session picker; give it a name, or the absolute path to a `.jsonl` file, to go straight to one.
- `claude --resume <session-id>` works from any directory: Claude Code looks in the current project and its worktrees, then in every other project on the machine.
- Inside a session, `/resume` switches to another one.

The picker shows the current worktree's sessions by default; `Ctrl+A` widens it to every project. If a session is missing, compare its age with `cleanupPeriodDays`. If it was swept, you need a copy.

## Back up Claude Code sessions with cl_audit's Sessions card

Since 26.11.1 a cl_audit profile's settings have a **Sessions** card after the Claude Code card. The app is free and needs a Mac with Apple silicon and macOS 13 or later; the [install steps](/install/) are short.

**Keep for.** A pop-up with 30 days (Claude Code's default), 90 days or a year. It writes `cleanupPeriodDays` into that profile's Claude Code folder, in `settings.json`, changing only that number. If the file isn't one it can safely edit (not a JSON object, or the key twice), it refuses and says to set the key by hand. It matters most for Terminal sessions: Claude Code already keeps Claude app ones, bar the exceptions above. If your organisation's managed settings set the number, Keep for shows theirs with a note that changing it here changes nothing; cl_audit reads those settings and never changes them. The "Kept here" line counts what the profile has: sessions in Claude Code, entries in the Claude window, size, and since when. It ends by saying which sessions Claude Code deletes and when.

**Back up now.** A backup is a copy of a profile's sessions on this Mac. It holds Claude Code's transcripts (on by default), the Claude window's Code-tab list with its scheduled tasks, the sidebar records (never the app's MCP settings) and cl_audit's own records. Since 26.11.8 it also holds Claude Code's setup: `CLAUDE.md` and the files it includes, skills, agents, commands, output styles, keybindings, `settings.json` with the scripts its hooks run, and the plugin list. It never holds a sign-in. With the Claude window open, **Back up now** leaves out the Code-tab list and sidebar records, because the window rewrites them from memory, and says to close it first.

Backups are APFS clones, so they take seconds and share space with the originals. On the same disk that protects you from the sweep and from mistakes, not from a dead disk. **General ▸ Backups** sets where they go (**Change…** picks a folder) and how many are kept: by default the last 3 of each profile, plus any made in the last 30 days. On another volume it's a full copy, and the list says so.

**A backup before every switch that moves sessions.** A profile can switch to another of your own accounts, and you start every switch yourself; each account's limits stay its own. If you choose to move the Claude window's sessions with it, cl_audit closes that profile's window, makes a backup, and only then moves anything. If the backup can't be made, nothing moves. The [Claude account switcher](/use-cases/switch-claude-accounts/) page covers the switch, and [Claude Code sessions lost after switching accounts](/blog/claude-sessions-lost-switching-accounts/) covers signing in to another account by hand. Whether you may hold more than one Claude account is up to Anthropic's terms.

**Restore…, with a preview.** **Restore…** on a backup opens a page that says "Preview · nothing written yet · nothing is ever overwritten". It counts what would happen, by session ID for the Code-tab list and by path for transcripts:

- back where it was, unchanged since;
- missing, restored;
- made after the backup, which stays;
- changed since, which stays as it is now, with the backup's copy only listed;
- in use, meaning a transcript a running Claude Code session holds, left alone;
- would be deleted, counting only the transcripts Claude Code's clean-up would delete again: Terminal sessions older than the profile's Keep for time, and Claude app ones only when a limit applies to them or you deleted or archived them there. A **Keep for 90 days** button shows when that would save some of them;
- Claude Code's setup, which stays out until you pick **Add them**; then only what's missing is added, and nothing is replaced.

Then **Close and restore N** closes only that profile's Claude window and writes what is missing, keeping a receipt as it goes. **Stop, keep what's back** halts it. If restored sessions sat in groups or were pinned, one Return in a session called "cl_audit · arrange sidebar" arranges the sidebar, as after a switch.

**Merge-only.** Files are only created, never written over a name that already exists and never through a link. Entries go into the folder of the account the profile works on now, not one it has left. A backup that holds anything other than plain files, or anything named like a sign-in, is refused whole.

**Undo this restore** takes back exactly what the restore put back, and only files unchanged since. A restored transcript that Claude Code has written to since stays, and the page says so. **Undo this switch…** on the Switch page is the switch back followed by a restore from the backup the switch made.

To keep a copy somewhere other than this Mac, **Export…** writes a profile's sessions as one file, saved where you choose: a zip, or an encrypted disk image with a password. Sessions that hold keys stay out unless you keep them, which needs the password. **Import…** adds such a file back after a preview and never overwrites anything; **Undo last import** takes back what it added.

cl_audit relies on how Claude Code lays out its folder, and the release notes say 26.11.1 was checked with Claude Code 2.1.318. If a newer Claude Code stops a backup or restore working, update cl_audit.

## Other tools, and when by hand is enough

From their READMEs, read on 7 November 2026: Claude-Session-Backup describes itself as a git-backed session backup that can restore deleted sessions from git history, and lists macOS among its platforms. claude-code-session-restorer is a Windows PowerShell tool with a backup and restore script, and a second script for sessions missing from the Code tab. We haven't tested either.

To back up Claude Code sessions on one Mac with one Claude Code folder, `rsync` and a longer `cleanupPeriodDays` do the job, and you don't need an app. cl_audit makes more sense if you use the Claude app's Code tab, if you keep several profiles, or if you switch accounts and want a backup made before sessions move. The same session files also feed cl_audit's charts; [Claude Code usage history](/use-cases/claude-code-usage-history/) covers that. Questions about the app are in [the FAQ](/faq/).
