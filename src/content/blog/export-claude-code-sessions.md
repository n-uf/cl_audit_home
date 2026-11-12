---
title: "Export Claude Code sessions: /export and moving by hand"
description: "How to export Claude Code sessions: what /export writes, where transcripts live, and how to copy them to another Mac by hand and resume them there."
h1: "How to export Claude Code sessions, or move them to another Mac"
mainKeyword: "export claude code sessions"
kind: how-to
published: 2026-12-11
updated: 2026-12-11
author: n-uf
draft: true
takeaways:
  - "/export writes the current conversation as plain text, to the clipboard or a file. It's a copy to read or share, not the transcript file that claude --resume opens."
  - "Sessions are .jsonl files at ~/.claude/projects/<project>/<session-id>.jsonl, where <project> is the working directory path with every non-alphanumeric character replaced by a dash. So the project's path decides where a copied session has to go."
  - "Raise cleanupPeriodDays on both Macs before you copy anything. It's 30 days by default, and raising it can't bring back a session that's already been deleted."
  - "Copy only the project's folder in ~/.claude/projects, with an external disk and Finder, and never replace a file that's already there. Sign in on the new Mac yourself; never copy the Keychain entry, .credentials.json or ~/.claude.json."
  - "Anthropic's docs describe each piece but not a move between two Macs, and we haven't run one. Try a single project first, at the same path on both Macs."
faq:
  - q: "How do I export a Claude Code session?"
    a: "Run /export inside the session. It opens a menu to copy the conversation to your clipboard or save it as a plain-text file; /export followed by a filename writes that file directly. To export an older session, open it with claude --resume first."
  - q: "Can I resume a session I exported with /export?"
    a: "No. Anthropic describes /export as a rendered transcript for a person to read. claude --resume loads the .jsonl transcript under ~/.claude/projects, so to carry on somewhere else you copy that file instead."
  - q: "How do I transfer Claude Code sessions to another computer?"
    a: "Raise cleanupPeriodDays on both computers, then copy the project's folder from ~/.claude/projects into the same place on the other one, without replacing anything already there. Keep the project at the same path, sign in to Claude Code on the new computer, and run claude --resume from the project folder. Anthropic's docs don't describe a built-in transfer, so this is a manual copy."
  - q: "Why doesn't claude --resume show the sessions I copied?"
    a: "Most often the folder name doesn't match: the picker starts with the sessions of the directory you're in, and a different project path gives a different folder name. Check ls ~/.claude/projects, press Ctrl+A in the picker to list every project on the Mac, or resume by session ID from any directory."
  - q: "Does Claude Code have a built-in export and import for sessions?"
    a: "Anthropic's docs describe /export, which writes plain text, and the session files under ~/.claude/projects, but no built-in way to move sessions between computers. Users have asked for one on Claude Code's issue tracker: #73639 was still open on 8 November 2026, and #18645 was closed as a duplicate. cl_audit, an independent Mac app, has its own Export… and Import… for a profile's sessions, and a Move to another Mac that takes Claude Code's setup along, described in this article. All three are experimental and can lose data."
sources:
  - title: "Claude Code docs: Manage sessions (export and locate session data)"
    url: "https://code.claude.com/docs/en/sessions#export-and-locate-session-data"
    checked: 2026-11-08
    supports: "What /export does: copies the current conversation to the clipboard or saves a plain-text file with messages and tool outputs rendered as readable text; a filename skips the menu. /export gives a rendered transcript for a person to read; scripts use claude -p --output-format json, or the transcript_path hooks and status line commands receive."
    quote: "save it as a plain-text file"
  - title: "Claude Code docs: Manage sessions (where transcripts are stored)"
    url: "https://code.claude.com/docs/en/sessions#where-transcripts-are-stored"
    checked: 2026-11-08
    supports: "Transcripts at ~/.claude/projects/<project>/<session-id>.jsonl; <project> is the working directory path with non-alphanumeric characters replaced by -, truncated to 200 characters plus a hash for very long paths; the entry format is internal and changes between versions; CLAUDE_CONFIG_DIR moves storage off ~/.claude."
    quote: "non-alphanumeric characters replaced by `-`"
  - title: "Claude Code docs: Manage sessions (resume a session; where the session picker looks; resume by session ID or name)"
    url: "https://code.claude.com/docs/en/sessions#resume-by-session-id-or-name"
    checked: 2026-11-08
    supports: "claude --continue reopens the most recent session in the current directory; claude --resume opens the picker (Enter resumes, Space previews, Ctrl+A widens to every project) or takes a .jsonl transcript path; the desktop app keeps its own session list; --resume <session-id> from any directory searches the current project then every other project; a hand-copied duplicate makes the lookup report not-found; a session picked from an unrelated project whose directory no longer exists resumes in the current directory; /cd relocates a session to the new directory's project storage; -p, Agent SDK and first-/loop sessions stay out of the picker but open by ID; resuming the same session in two terminals interleaves messages."
    quote: "a hand-copied duplicate makes Claude Code report not-found"
  - title: "Claude Code docs: Commands (/export, /cd)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-08
    supports: "/export [filename] exports the current conversation as plain text, to the given file or through a clipboard-or-file dialog; /cd moves the session to a new working directory, keeping the conversation."
    quote: "Export the current conversation as plain text."
  - title: "Claude Code docs: CLI reference (--resume, --continue, --teleport)"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-08
    supports: "--resume takes a session ID or name, or the absolute path of a session's .jsonl transcript file; given an ID it searches the current project directory and its worktrees, then every other project on the machine; --continue loads the most recent conversation in the current directory; --teleport resumes a cloud session in the local terminal."
    quote: "you can pass the absolute path to a session's `.jsonl` transcript file"
  - title: "Claude Code docs: All settings (cleanupPeriodDays)"
    url: "https://code.claude.com/docs/en/settings-reference#cleanupperioddays"
    checked: 2026-11-08
    supports: "cleanupPeriodDays: whole number, minimum 1, default 30, any settings file; the deletion is a background sweep after a session starts, with no message; 0 fails validation and 3650 is the suggested large value."
    quote: "Setting `0` fails validation, so pick a large value such as `3650` for long retention."
  - title: "Claude Code docs: Explore the .claude directory (cleaned up automatically, plaintext storage)"
    url: "https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically"
    checked: 2026-11-09
    supports: "Transcripts, their subagent and tool-result folders, and file-history/ are deleted once older than cleanupPeriodDays (default 30, minimum 1); auto memory under projects/<project>/memory/ isn't swept; Claude Desktop and Cowork transcripts are kept at any age from v2.1.248 unless desktopSessionCleanupPeriodDays applies, managed settings set cleanupPeriodDays or the HIPAA configuration applies to your sessions; the page doesn't say how a file's age is judged. Transcripts are plaintext, and a .env file a tool read or a credential a command printed is written into them; .credentials.json holds login credentials; ~/.claude.json holds account details; file-history/ holds pre-edit snapshots for checkpoint restore."
    quote: "Transcripts and history are not encrypted at rest."
  - title: "Claude Code docs: Explore the .claude directory (personal configuration)"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-09
    supports: "Files in ~/.claude are personal configuration that applies across all projects: CLAUDE.md, settings.json, skills/, agents/, commands/, output-styles/ and keybindings.json; installed plugins sit in ~/.claude/plugins, managed by claude plugin commands; ~/.claude.json holds app state, account details and personal MCP servers."
    quote: "files in `~/.claude` are personal configuration that applies across all your projects"
  - title: "Claude Code docs: Environment variables (CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/env-vars"
    checked: 2026-11-08
    supports: "CLAUDE_CONFIG_DIR overrides the configuration directory (default ~/.claude); settings, session history and plugins live under it; ~/.claude-work is the docs' example for a second account."
    quote: "All settings, session history, and plugins are stored under this path."
  - title: "Claude Code docs: Authentication (credential management)"
    url: "https://code.claude.com/docs/en/authentication#credential-management"
    checked: 2026-11-08
    supports: "On macOS, credentials are in the Keychain, with ~/.claude/.credentials.json as a fallback when the Keychain rejects the write; with CLAUDE_CONFIG_DIR set, the Keychain entry is keyed to that directory."
    quote: "keys the macOS Keychain entry to that directory too"
  - title: "Claude Code docs: Settings files and precedence"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-08
    supports: "~/.claude/settings.json is the user settings file; settings files are strict JSON (a comment or trailing comma is an error); /status shows the setting sources Claude Code loaded."
    quote: "Settings files are strict JSON"
  - title: "Claude Code docs: documentation index (Remote Control)"
    url: "https://code.claude.com/docs/llms.txt"
    checked: 2026-11-08
    supports: "Remote Control continues a local session from a phone, tablet or browser."
    quote: "Continue local sessions from any device with Remote Control"
  - title: "User request on Claude Code's issue tracker: #73639, \"[FEATURE] Transfer session to another claude code instance\" (open; opened 2 Jul 2026)"
    url: "https://github.com/anthropics/claude-code/issues/73639"
    checked: 2026-11-08
    supports: "A user's request, not an Anthropic statement: it says session transcripts are machine-local JSONL files with no built-in sync or export/import, and asks for a way to transfer a session. Open on the day read."
    quote: "no built-in sync or export/import"
  - title: "User request on Claude Code's issue tracker: #18645, \"[Feature Request] Session Export/Import for Cross-Machine Portability\" (closed as a duplicate, 20 Jan 2026; opened 16 Jan 2026)"
    url: "https://github.com/anthropics/claude-code/issues/18645"
    checked: 2026-11-08
    supports: "A user's request, not an Anthropic statement: it says there is no official way to export or import sessions between machines. Closed as a duplicate on 20 Jan 2026."
    quote: "There's no official way to export/import Claude Code sessions between machines."
  - title: "claude-code-migrate README (emreonal11)"
    url: "https://github.com/emreonal11/claude-code-migrate"
    checked: 2026-11-08
    supports: "What the tool says it is: scripts and commands that migrate Claude Code state between machines or rebind a project's session history to another path on the same machine; tested on macOS Tahoe with Claude Code v2.1.x; its steps copy ~/.claude.json and then run claude --login on the new machine."
    quote: "Migrate Claude Code state between machines"
  - title: "codex-claude-transfer README (ahmojo)"
    url: "https://github.com/ahmojo/codex-claude-transfer"
    checked: 2026-11-08
    supports: "What the tool says it is: an unofficial tool (command cct) that moves local Codex and Claude Code sessions between machines as a .codexbundle file; not affiliated with OpenAI or Anthropic; says bundles can contain prompts, code, command output, paths and secrets."
    quote: "Move local Codex and Claude Code sessions between machines."
  - title: "cl_audit README at tag v26.11.4"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.4/README.md"
    checked: 2026-11-08
    supports: "Settings ▸ the profile ▸ Sessions has Export… and Import…. Export makes the profile's sessions one file, for another Mac or for keeping, in a backup's format (export.json plus backup.json, the window's records, sidebar records, cl_audit's records, transcripts; at 26.11.4 no setup). Export: a preview first (Preview · nothing written yet); from the profile as it is now, one of its backups, or all profiles; sessions that hold keys counted by kind, Leave them out by default or Keep them: needs a password, which forces an AES-256 encrypted disk image; None: a zip, which Finder opens; never in it a sign-in (nor, at 26.11.4, the window's MCP settings); the accounts and addresses cl_audit knows appear as fingerprints, while any other id or address is content, copied as it is. Import: Choose… a .zip or .dmg (an image asks for its password), Into a profile, a preview of New, Already here and Grown on both sides; nothing is ever overwritten; Older than 30 days offers Keep for 90 days; at 26.11.4 the sessions a scheduled task ran were left out and the tasks themselves weren't imported; Undo last import opens Undo this import, which takes back what it added, only files unchanged since; Import restores by the same rules as Restore."
    quote: "makes the profile's sessions one file, for another Mac or for keeping"
  - title: "cl_audit README at tag v26.11.6"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.6/README.md"
    checked: 2026-11-09
    supports: "Import's (and Restore's) Would be deleted row counts only the transcripts Claude Code's own clean-up would delete again: terminal sessions older than cleanupPeriodDays, Claude window sessions only when a limit applies or they were deleted or archived in the window; Keep for 90 days is shown only when it would save some of them."
    quote: "only the restored transcripts Claude Code's own clean-up would delete again"
  - title: "cl_audit CHANGELOG, 26.11.8"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.8/CHANGELOG.md"
    checked: 2026-11-09
    supports: "26.11.8 (9 November 2026): Export, Import, Backup and Restore carry Claude Code's setup (CLAUDE.md and the files it includes, skills, agents, commands, output styles, keybindings, settings.json with the scripts its hooks run, the list of installed plugins); Export includes it by default; settings.json, its scripts and the plugin marketplaces travel only in the encrypted disk image, and so does a skill, agent or command that holds a script a hook runs; Import and Restore leave it out until you pick Add them and add only what is missing; Undo takes it back; an older cl_audit can't open an export made by this one."
    quote: "Claude Code's setup travels: Export, Import, Backup and Restore carry it."
  - title: "cl_audit CHANGELOG, 26.11.9"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.9/CHANGELOG.md"
    checked: 2026-11-09
    supports: "26.11.9 (9 November 2026): Export carries the Claude window's MCP settings (claude_desktop_config.json) in the encrypted disk image only, and a zip leaves them out; each scheduled task's prompt travels with its task; Import adds the MCP settings only when the profile has none yet, after Add them; imported scheduled tasks come back paused, with the sessions they ran; an export that holds MCP settings or a task's prompt can't be opened by 26.11.8 or older."
    quote: "The Claude window's MCP settings and scheduled tasks travel too."
  - title: "cl_audit README at tag v26.11.10"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    supports: "Moving to another Mac: a Move to another Mac key at the top of the Export page sets All profiles, the encrypted disk image, Claude Code's setup, the window's MCP settings and scheduled tasks, and cl_audit's own profiles and settings; a move keeps the real account and organisation ids and addresses (no fingerprints) because the Claude window files its Code-tab list and tasks by account folder, which is safe only in the encrypted image, so cl_audit refuses a move as a zip and every other export keeps its fingerprints; sign-ins don't travel (Add account on the new Mac). On the new Mac, Import: project folders at the same paths, or those sessions are added but wait; the cl_audit's profiles card lists the profiles it makes, those already here and the settings that differ (this Mac's kept by default, or Take the file's); Make 2 profiles makes them in folders of their own, not signed in, before Close and import; setup and MCP settings only after Add them; scheduled tasks arrive paused; Undo is two steps, Undo this import then Take back the profiles it made (those unchanged since). Never moves: sign-ins, the Keychain, settings.local.json; claude.ai chats and Projects follow the account. The What moves list names neither project folders nor rewind checkpoints (file-history). Export the profiles as they are now, not from a backup."
    quote: "Sign-ins don't travel. On the new Mac you sign in again to each account"
  - title: "cl_audit CHANGELOG, 26.11.10"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/CHANGELOG.md"
    checked: 2026-11-09
    supports: "26.11.10 (9 November 2026): the Move to another Mac key; cl_audit's own profiles and settings travel in the encrypted disk image only; Import makes the profiles that aren't on the new Mac, not signed in, and never changes one that is; Undo is two steps; a file with cl_audit's profiles, or a move, can't be opened by 26.11.9 or older, while every other export still opens there."
    quote: "a move is only ever the password-protected disk image, never a zip"
  - title: "cl_audit CHANGELOG, 26.11.11"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.11/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.11: before a backup writes Claude Code's setup, cl_audit runs the Export page's key check over settings.json, the scripts its hooks run (with the skills holding them) and the plugin marketplaces file; a hook or permission rule holding a key is left out whole, another value that looks like a key is blanked and its name kept, and a script, a skill whose script holds a key or a marketplaces file holding one is left out; Restore, and Export from a backup, say which; it finds only the Export page's key shapes (GitHub, AWS, sk-, JWTs and the like) and doesn't check CLAUDE.md or skills no hook runs."
    quote: "Backups leave out the keys they find in your Claude Code settings and scripts."
  - title: "cl_audit CHANGELOG, 26.11.12"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.12/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.12: Import lists each session whose folder isn't on this Mac (Folder not here) with Pick its folder on this Mac…, which points the saved chat and its Code-tab entry at the picked folder and drops a worktree that isn't on this Mac; the profile's Claude window closes for a moment; Undo this import takes it back, except for a session resumed since; later, Settings ▸ a profile ▸ Sessions ▸ Folder not here; the Export page's Code row reads each project with read-only git, warns about work only on this Mac and repos it couldn't read, and the list travels in the encrypted disk image only with user names, passwords and tokens taken out of remote addresses; the new Mac's Import page shows per project where to clone from, where it was, the branch and what wasn't pushed or committed, with commands to copy, and cl_audit never runs git there; memory files start as Add them in a move import, other imports leave them out unless added; a move file with the checklist is format 5, refused by 26.11.11 and older; Claude Code's folder naming, the Code tab running a re-pointed session and which worktree fields Claude Code reads were confirmed from the programs' own text, not by running them."
    quote: "A move brings a checklist of your code."
  - title: "cl_audit CHANGELOG, 26.11.13"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.13/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.13: a move brings each session's side files (task list, plan, typed prompts with pasted text, the project folder's trust and allowed tools) in the encrypted disk image only; Rewind's copies of edited files are their own Export row with their size, left out unless included; not carried: session environments, the image cache, shell snapshots, debug files, old to-do lists; Import puts them back as rows, on for a move, without overwriting; project MCP servers start left out; prompt history appended to history.jsonl and pointed at each session's folder here; trust written only when the folder has none; both only while Claude Code isn't running for the profile and its window is closed, and only for folders on this Mac; a Pick also points Rewind's saved paths at the new folder and its Undo takes back what it added; Undo this import takes it all back, leaving and naming anything changed since; side files stay with the imported backup while the import can be undone (30 days), then deleted; a file with side files is format 6, a move without them stays at 5 or 4 so 26.11.12 still opens it; five details confirmed only from Claude Code 2.1.318's program text."
    quote: "Import puts them back without overwriting anything."
  - title: "cl_audit README at tag v26.11.18 (Moving to another Mac; Profile settings, Accounts)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/README.md"
    checked: 2026-11-11
    supports: "There is no Add account since 26.11.18; on the new Mac you sign in again to each account with Accounts ▸ Sign in with another account…."
    quote: "There is no Add account"
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
related:
  - /blog/back-up-claude-code-sessions/
  - /blog/claude-sessions-lost-switching-accounts/
  - /blog/claude-code-multiple-accounts/
  - /install/
---

To export Claude Code sessions, first decide which copy you need. Inside a session, `/export` writes the conversation as plain text, to your clipboard or a file: a copy to read or share, which `claude --resume` can't open. To carry a session on to another Mac, copy its transcript files from `~/.claude/projects` into the same place there, with the project at the same path, after raising `cleanupPeriodDays` on both Macs. Then run `claude --resume`. Your sign-in doesn't travel with the files, and neither does the Claude app's Code-tab list.

The `/export` and copy steps below come from Anthropic's docs, which don't describe a move between computers. We haven't run this copy between two Macs ourselves, so try it with one project first.

## Which copy do you need?

| You want to | Use | What you get |
|---|---|---|
| Read or share one conversation | `/export` | A plain-text copy of that conversation |
| Carry on a session on another Mac | A copy of its transcript files | The same session, which `claude --resume` opens |
| Feed sessions to a script | `claude -p --output-format json`, or the `transcript_path` a hook receives | Structured data, per Anthropic's docs |
| Keep sessions on this Mac past the clean-up | A longer `cleanupPeriodDays` and a backup copy | Covered in a separate article, linked below |
| Move a profile's sessions as one file | cl_audit's Export… and Import…, or its Move to another Mac, near the end | A zip or an encrypted disk image (a move is only the image); Import is built to only add. All three are experimental and can lose data |

## Export Claude Code sessions one at a time with /export

Run `/export` in the session. Anthropic's docs say it opens a menu where you copy the current conversation to the clipboard or save it as a plain-text file, with messages and tool outputs rendered as readable text. Give it a filename, as in `/export shop-checkout.txt`, and it skips the menu and writes straight to that file.

It exports the conversation you're in. For an older one, open it with `claude --resume` first.

You can't resume from it: it's rendered for a person to read, not the `.jsonl` file that `claude --resume` loads. Tool outputs are in there, and the docs say a `.env` file that a tool read, or a credential that a command printed, ends up in the transcript.

## Where Claude Code keeps sessions

By default Claude Code writes each session as a JSONL file at `~/.claude/projects/<project>/<session-id>.jsonl`. The docs say `<project>` is the working directory path with non-alphanumeric characters replaced by `-`. A project at `/Users/you/my-project` gets a folder called `-Users-you-my-project`. Very long names are cut to 200 characters with a hash of the full path added.

So a different path gives a different folder name, and if your user name differs on the other Mac, so does the path. That's our reading of the rule; the docs don't spell out the user-name case.

Next to each `.jsonl` there may be a folder with the same name, holding its subagent transcripts and large tool results. Copy it with the file. The docs warn that the format inside is internal and changes between versions, so copy the files whole and don't edit them.

To see what you have, these only read:

```bash
ls ~/.claude/projects
ls ~/.claude/projects/-Users-you-my-project
```

If you set `CLAUDE_CONFIG_DIR`, the docs say settings and session history live under that folder instead, for example `~/.claude-work`. Use the same folder on both Macs and read it in place of `~/.claude` below. [Claude Code with multiple accounts](/blog/claude-code-multiple-accounts/) explains that variable.

## First, raise cleanupPeriodDays on both Macs

Claude Code deletes transcripts older than `cleanupPeriodDays`, 30 days by default, in a background sweep that shows no message. On the old Mac, a session can age out while you get ready. On the new Mac, the docs don't say how a copied file's age is judged, so an old session you copy in could go in the next sweep.

Add the key to `~/.claude/settings.json` (or the one in your `CLAUDE_CONFIG_DIR` folder). If the file already has settings, add this line to them; don't replace the file:

```json
{
  "cleanupPeriodDays": 365
}
```

Settings files are strict JSON, so a comment or a trailing comma is an error; `/status` shows which settings files loaded. A longer period can't bring back a session that's already gone. Claude Code 2.1.248 and later keep sessions you started or last continued in the Claude app at any age, unless `desktopSessionCleanupPeriodDays` or your organisation's settings say otherwise. What the sweep takes and how to keep a copy on one Mac is in [how to back up Claude Code sessions](/blog/back-up-claude-code-sessions/).

## Transfer Claude Code sessions to another Mac, step by step

This uses an external disk and Finder: copy and paste, nothing replaced, nothing deleted. Copy only the project folders you mean to move, from `~/.claude/projects`, and leave the rest of `~/.claude` alone.

1. **Compare the project's path.** In Terminal, `cd` into the project and run `pwd`, on both Macs. On the new Mac, clone the project to exactly the same path. If that path starts with `/Users/<name>` and your user name differs, read the next section first.
2. **Prepare the new Mac.** Install Claude Code, sign in the usual way, and raise `cleanupPeriodDays` as above.
3. **Quit Claude Code on both Macs.** Close running `claude` sessions and the Claude app, so nothing writes to a transcript while you copy.
4. **Copy from the old Mac to the disk.** In Finder, choose Go ▸ Go to Folder (⇧⌘G) and type `~/.claude/projects`. Select the folder named after your project, choose Edit ▸ Copy (⌘C), open the disk, and paste (⌘V). The old Mac keeps its own files, untouched; they're your fallback.
5. **Paste into the new Mac.** Go to `~/.claude/projects` the same way. If Finder can't find it, open `~/.claude` and make a new folder there called `projects`.
   - No folder with that name yet: paste the project's folder from the disk.
   - A folder with that name already exists (you've used Claude Code in this project here): don't paste the folder over it. Open both, copy all the files inside the disk's copy, and paste into the existing folder. If Finder says an item already exists, choose **Skip** or **Stop**. Never **Replace**, which throws away the new Mac's version, and not **Keep Both**, which leaves two copies of one session.
6. **Resume.** `cd` into the project and run `claude --resume`. Type to search, press Space to preview a session and Enter to resume it. `claude --continue` reopens the most recent session in that directory, and `claude --resume <session-id>` skips the picker; the ID is the file name without `.jsonl`.

The session runs on whichever account Claude Code is signed in to on that Mac; `/status` shows which.

Afterwards, don't copy files back from the new Mac over the old Mac's copy: a session grows where you carry it on, and an older copy pasted over it loses the newer part. Don't make a spare copy of a session inside `projects` on either Mac, either: the docs say a hand-copied duplicate makes a resume by ID report not-found. The copy on the disk is plaintext, like the originals, so keep that disk to yourself and remove the copy from it when you're done.

If the picker is empty, check these:

- `ls ~/.claude/projects` on the new Mac shows a folder named exactly as the `pwd` path converts.
- `CLAUDE_CONFIG_DIR` points at the folder you copied into, or isn't set on either Mac.
- The session wasn't started with `claude -p`, the Agent SDK or a `/loop` command. Those stay out of the picker, but the ID still opens them.
- `Ctrl+A` in the picker lists every project on the Mac, which shows a session sitting in a folder with another name.

## If the path or user name is different

When the user names differ, the same path isn't always possible, and the copied folder carries the old path's name.

What Anthropic's docs describe, for sessions in general:

- `claude --resume <session-id>` works from any directory. Claude Code looks in the current project, then every other project on the Mac, and finds the ID if exactly one other project holds it.
- `claude --resume` also takes the absolute path of a session's `.jsonl` file in place of an ID.
- In the picker, after `Ctrl+A`, picking a session from another project whose directory no longer exists resumes it in your current directory.
- `/cd <path>` moves a session to a new working directory, keeping the conversation, and relocates it to that directory's storage, so it shows in that directory's picker afterwards.

What they don't say is how any of this behaves for a session copied from another Mac, or whether paths recorded inside the transcript still point at the old user's folder. We haven't tried it. Resume one session, check which directory it's working in, and only then let it change files.

## What doesn't move this way

- **Your sign-in.** On a Mac, Anthropic's docs say Claude Code keeps credentials in the Keychain, keyed to the Claude Code folder, with `.credentials.json` as a fallback. Sign in on the new Mac; [switching the account in Claude Code](/blog/claude-code-switch-account/) covers the sign-in. Don't copy the Keychain entry, `.credentials.json` or `~/.claude.json` to skip it. The sessions aren't in any of them.
- **The Claude app's Code-tab list.** The docs say the desktop app keeps its own session list, so a copy of `projects` gives you the sessions in Terminal, not in the app's sidebar. [Claude Code sessions lost after switching accounts](/blog/claude-sessions-lost-switching-accounts/) covers that list.
- **Checkpoints.** The snapshots `/rewind` uses to restore files sit in `file-history/`, which this copy leaves out. Use git for your code, not rewind, on a copied session.
- **Your code.** A transcript records the conversation, not the project. Clone the repository.
- **Cloud sessions.** They aren't files on your Mac; the docs describe `claude --teleport` for resuming one locally.
- **Anyone else's sessions.** Transcripts hold prompts, file contents and whatever commands printed. Move your own.

If you only want to carry on from a phone or a browser while the Mac stays on, the docs describe Remote Control for that. Nothing moves. {{live:/blog/move-claude-code-to-new-computer/}}Your setup isn't in `projects` either: [moving Claude Code to a new computer](/blog/move-claude-code-to-new-computer/) covers copying `CLAUDE.md`, `settings.json`, skills and agents.{{/live}}

## Third-party tools

Two tools script this, and we haven't tested either. claude-code-migrate, by its README, migrates Claude Code state between machines or rebinds a project's history to another path; its steps copy `~/.claude.json` across before you log in again, which this page doesn't advise. codex-claude-transfer is an unofficial tool whose README describes moving local Codex and Claude Code sessions between machines as one `.codexbundle` file, and warns that a bundle can contain secrets.

## Export…, Import… and Move to another Mac in cl_audit

With cl_audit on both Macs, a profile's sessions can also travel as one file.

{{experimental: export, import, move}}

Since 26.11.8 it carries Claude Code's setup (`CLAUDE.md` and the files it includes, skills, agents, commands, output styles, keybindings, `settings.json` with its hooks' scripts, the plugin list), and since 26.11.9 the Claude window's MCP settings and scheduled tasks with their prompts. To take cl_audit's own profiles and settings along too, 26.11.10 adds **Move to another Mac**; the [settings demo](/settings/#move-to-another-mac) shows its page. Your code doesn't travel. Since 26.11.12 a move brings a checklist of your code instead, and a moved session whose folder isn't on the new Mac is listed under **Folder not here**, where you can pick the folder you cloned it to. Since 26.11.13 a move also carries each session's side files, and Rewind's copies of the files the sessions edited if you include them.

The move is a key at the top of the Export page that sets all profiles, the encrypted disk image and each of those parts. It keeps your accounts' real ids, so each Code-tab entry and task goes back under its own account; that's why it is only ever the password-protected disk image, never a zip. Its **Code** row reads each project with read-only git and warns about commits not pushed, files not committed and any repository it couldn't read; that list travels only in the image, with user names, passwords and tokens taken out of the remote addresses. The side files are each session's task list, plan, typed prompts (the up-arrow history, with pasted text) and its project folder's trust and allowed tools, in the image only; Rewind's copies are a row of their own, with their size, left out unless you include them. The check for keys searches the side files too. Session environments, which hold tokens, never travel, and neither do the image cache, shell snapshots, debug files or old to-do lists. A move with the side files needs 26.11.13 on both Macs: 26.11.12 opens only a move without them. 26.11.11 and older refuse one with the code checklist, 26.11.9 and older can't open a move or a file with cl_audit's profiles, and 26.11.8 and older can't open one with MCP settings or a task's prompt.

**Export…** (Settings ▸ the profile ▸ Sessions) starts as a preview. Export the profile as it is now, not a backup: backups keep neither the MCP settings nor the values under `env` in `settings.json`, and since 26.11.11 they leave out any hook, permission rule or script found to hold a key. Sessions that hold keys are left out unless you pick **Keep them: needs a password**, which makes the file an AES-256 encrypted disk image. Without a password it's a zip, which Finder opens. `settings.json`, its scripts, the plugin marketplaces, the MCP settings and any skill, agent or command holding a hook's script travel only in the image.

**Import…** on the other Mac takes the `.zip` or `.dmg` (an image asks for its password) and the profile to put it into. It is built to only add, after a preview, and not to overwrite anything. For a move, a **cl_audit's profiles** card lists the profiles it would make and the settings that differ. **Make 2 profiles** makes them, not signed in, since sign-ins never travel (sign in with **Sign in with another account…** under each profile's Accounts), and your settings stay unless you pick **Take the file's**. The setup, the MCP settings and the scheduled tasks stay out until you pick **Add them**, and then only what's missing is added: MCP settings only if the profile has none yet, and tasks paused, so nothing runs twice. **Undo last import** is meant to take back what it added, leaving any file changed since, though it may not bring everything back; after a move, **Take back the profiles it made** is the second step.

A move's import also lists each project from the checklist (where to clone it from, where it was, its branch and what wasn't pushed or committed) with the commands to copy; cl_audit never runs git on the new Mac. For each session under **Folder not here**, **Pick its folder on this Mac…** re-points the session to the folder you pick: its saved chat and Code-tab entry, with a worktree that isn't on this Mac dropped so it runs in the project folder. The profile's Claude window closes for a moment while that happens, and **Undo this import** takes it back unless you've resumed the session since. A session you skip can be pointed later from Settings ▸ the profile ▸ Sessions ▸ **Folder not here**. cl_audit's notes say three things here were confirmed from the programs' own text, not by running them: how Claude Code files a session under its folder, that the Code tab runs a re-pointed session, and which worktree fields Claude Code reads. Memory files start as **Add them** in a move; every other import leaves them out unless you add them.

The side files are rows on the import page too, on for a move, and the import is built not to replace anything already there. The prompt history goes at the end of `history.jsonl`, pointed at each session's folder on this Mac; a folder's trust is written only when it has no entry yet. Both are written only while Claude Code isn't running for that profile and its window is closed, and only for folders on this Mac, so a session whose folder you pick later gets them then. The pick also points Rewind's saved paths at the new folder, and that pick's Undo takes back what it added. A project's MCP servers travel but start left out, like the window's MCP settings.

**Undo this import** is meant to take all of it back, leaving and naming anything changed since, though it may not bring everything back. The side files are kept with the import's backup for its 30 days of undo, or until that backup is deleted, then deleted. cl_audit's notes say five details come from Claude Code 2.1.318's program text, not from running it: how it writes `history.jsonl` and `.claude.json`, which fields mean trust, how Rewind finds its copies, how a plan is named and where a task list is kept.

Not in an export: a sign-in or `settings.local.json`. Except in a move, accounts cl_audit knows appear as fingerprints, not addresses or ids; an address typed into a conversation stays as written. A zip also leaves out each Code-tab entry's connection settings; the image keeps them, so keep it to yourself. Import follows the same rules as the Restore… in [how to back up Claude Code sessions](/blog/back-up-claude-code-sessions/).

## About cl_audit

We make cl_audit, a free [Claude usage tracker for Mac](/) that shows each profile's 5-hour and weekly limits, and the [install steps](/install/) are short. It's an independent tool, not affiliated with Anthropic.

Questions about the app are in [the FAQ](/faq/).
