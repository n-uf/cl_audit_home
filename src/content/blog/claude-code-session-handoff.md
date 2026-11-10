---
title: "Claude Code session handoff: fresh restarts on a new Mac"
description: "A Claude Code session handoff is a written note that a fresh session checks against git before it goes on. Do it by hand, or for many sessions at once."
h1: "How a Claude Code session handoff works, from one session to a whole Mac"
mainKeyword: "claude code session handoff"
kind: how-to
published: 2026-11-18
updated: 2026-11-18
author: n-uf
draft: true
takeaways:
  - "A Claude Code session handoff has three parts: the old session pushes its branches and writes a note, a fresh session checks every branch head against git, and only then does the new one carry on."
  - "The note lists scope, repos and worktrees with branch and head, work in flight, unpushed work, what waits on you, child sessions, scheduled tasks and services, local-only files, MCP servers and credentials. Files and credentials appear by name, never by value."
  - "The machine-transfer plugin (source-available, on GitHub) applies the same handoff to many sessions at once, one sidebar section at a time, with a freeze, a branch ledger and a script that prints MATCH, DIFF or MISSING per branch."
  - "Its notes treat a fresh restart as the default and copying session history as a heavier, separate job. Credentials never travel, and the old sessions stay idle as history."
faq:
  - q: "What is a Claude Code session handoff?"
    a: "It is handing one session's state to a fresh session. The old session pushes its branches and writes a note: where it stands, which repos and branches it holds, what is in flight and what waits on you. The new session reads the note, checks it against git and then continues."
  - q: "What should a handoff note contain?"
    a: "Scope, repos and worktrees with branch and head, work in flight, anything unpushed, what waits on you, child sessions, scheduled tasks, local-only files, MCP servers and the credentials the successor needs. The plugin's template says to list files and credentials by name and path only, never their secret values."
  - q: "Why does the new session check the note against git?"
    a: "A note can be out of date or wrong, and git is the evidence. The plugin's notes say that when two sides disagree, command output settles it, not either report. If a head does not match, the successor stops and reports the output rather than resetting a branch to force a match."
  - q: "Can I copy the old session's history instead of starting fresh?"
    a: "Yes, but the plugin's notes call it a different and heavier job. It needs the app quit on both Macs, identical absolute paths and user name, and several folders copied together in one sitting. The notes prefer it only for a few long sessions you need to scroll and resume, with nothing in flight."
  - q: "Does the plugin move my sign-ins or tokens?"
    a: "No. Its README says credentials never travel; they are made fresh on the new Mac. A handoff note names the credentials a successor needs and who creates them, never their values. Archives the plugin builds get a gitleaks scan that stops on any finding, though a scanner only catches the kinds of secrets it knows."
sources:
  - title: "claude-machine-transfer README (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/README.md"
    checked: 2026-11-10
    supports: "What the plugin is and the eight steps in outline; that a workspace is more than files; that it came out of a real move; install commands for the plugin and for a copy into ~/.claude/skills/; install on both machines; how to start it, including the plugin-prefixed command; the bash 3.2, git 2.31, gitleaks 8.19 and age requirements; scope (macOS to macOS with the Claude desktop app and Remote Control; fresh restart rather than session-history copy; credentials never travel); the PolyForm Perimeter 1.0.1 licence; the 'Not yet stable' caution at the top (young and still changing; read each script first, try one quiet sidebar section first, check the CHANGELOG before upgrading)."
    quote: "Copying the disk moves the files and loses the rest."
  - title: "claude-machine-transfer CHANGELOG (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/CHANGELOG.md"
    checked: 2026-11-10
    supports: "Versions are dates and any release may change how a move runs; the first public release and the later one adding Remote Control on successors and background services."
    quote: "Any release may change how a move runs."
  - title: "claude-machine-transfer: SKILL.md (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/SKILL.md"
    checked: 2026-11-10
    supports: "The principles (same absolute paths, nothing on one machine only, fresh restart, one wave at a time, old sessions retire and are not archived, credentials never travel, evidence over reports), the roles, the Claude Code specifics (the app will not start sessions or create scheduled tasks from another session's turn; Remote Control off means a handover file; turning Remote Control on from a session can fail quietly; duplicate titles and the [ref]; session id is not transcript id; memory keeps changing; settings arrive set aside; scheduled tasks and background services on one machine only; MCP servers are added again) and the Don'ts, including no SSH by default."
    quote: "Evidence over reports."
  - title: "claude-machine-transfer: glossary (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/glossary.md"
    checked: 2026-11-10
    supports: "Definitions of safe point, handoff note, branch ledger, handover message, wave, change freeze (self-publishing dated content keeps going), restored, retire, successor and sealed archive."
    quote: "A moment where nothing is half-done"
  - title: "claude-machine-transfer: stages (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/stages.md"
    checked: 2026-11-10
    supports: "What each lead session does at its safe point (wip/<slug> branches, one push without force, compare heads, turn stashes into branches, list scheduled tasks and services, stop dev servers by PID); a quiet wave first; the inventory of local-only files with git status --ignored --short; private repos for folders with no remote."
    quote: "Move a quiet wave first to prove the method."
  - title: "claude-machine-transfer: restart protocol (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/restart.md"
    checked: 2026-11-10
    supports: "The five steps (spawn, handover, verify, restore, retire) and their owners; that on any mismatch the successor stops and reports the exact output and does not reset; the handover goes into a file when Remote Control is off; how successors get Remote Control (the app setting or the toolbar switch); scheduled tasks are recreated disabled; why SSH is off by default."
    quote: "Five steps, one owner each"
  - title: "claude-machine-transfer: state copy (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/state-copy.md"
    checked: 2026-11-10
    supports: "What copying session history needs (the app quit on both machines, identical absolute paths and user name, the projects folder with transcripts, config files, the app's data folder of often several GB, the same commits), what it cannot carry, when the notes prefer it and when not."
    quote: "A state copy is all-or-nothing per data folder"
  - title: "claude-machine-transfer: file bridges (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/file-bridges.md"
    checked: 2026-11-10
    supports: "GitHub private repo for small non-secret files; a private release with age-encrypted archives, the private key made on the target and the public key sent over; Syncthing paired by device ID, LAN only, send-only on the source and receive-only on the target at the same path; AirDrop and USB as fallbacks; SSH ruled out; sealed archives (stage, gitleaks scan, manifest, check on unpack refusing absolute paths and '..', no symlinks)."
    quote: "The private key is made on the target and never leaves it."
  - title: "claude-machine-transfer: target setup (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/target-setup.md"
    checked: 2026-11-10
    supports: "Each item failed at least once in a real transfer; the read:packages scope that a fresh gh login lacks and the 403 it causes; opening Google Chrome once so headless runs work; the Remote Control setting for new sessions; MCP servers added again with fresh keys; settings.json.from-source reviewed before it is merged."
    quote: "Open Google Chrome once from Finder"
  - title: "claude-machine-transfer: credentials and scheduled tasks (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/secrets-and-schedules.md"
    checked: 2026-11-10
    supports: "Credentials never travel; every sealed archive passes a secret scan; handoff notes list which credentials a successor needs, never values; OAuth grants are revoked first and created second, swapped at cut-over when other sessions share the grant, with the order written into the owning session's handoff note; scheduled tasks run on one machine only and a moved task starts disabled."
    quote: "Never both enabled."
  - title: "claude-machine-transfer: background services (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/services.md"
    checked: 2026-11-10
    supports: "LaunchAgents, cron entries and login items run on one machine only and carry their state; prepare the target, stop on the source for good, carry the state, install on the target; the install is approved by the operator in the session that runs it."
    quote: "Like a scheduled task it must run on one machine only"
  - title: "claude-machine-transfer: coordination (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/references/coordination.md"
    checked: 2026-11-10
    supports: "Reconciling contradictory reports with command output (git ls-remote origin <branch>, git rev-parse <branch>), and that approvals do not travel between sessions."
    quote: "Approvals don't travel."
  - title: "claude-machine-transfer: handoff note template (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/templates/handoff-note.md"
    checked: 2026-11-10
    supports: "The sections of a handoff note: status, scope, repos and worktrees, in flight, waiting on the operator, child sessions with restart briefs, scheduled tasks and services, local-only files, MCP servers, credentials, sync points and files beside the note."
    quote: "Never their secret values."
  - title: "claude-machine-transfer: branch ledger template (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/templates/branch-ledger.md"
    checked: 2026-11-10
    supports: "The four-column ledger (repo path, branch, full commit, on remote) with sample paths, checked with git ls-remote; worktrees are not listed in it."
    quote: "One row per branch the successor needs."
  - title: "claude-machine-transfer: handover message template (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/templates/handover-message.md"
    checked: 2026-11-10
    supports: "What a successor's first message contains: the note and ledger to read, check-heads.sh with --fetch, reply ready, restore, the operator steps to expect (Remote Control switch, child sessions, scheduled tasks), and the freeze."
    quote: "The wave is frozen: nothing ships, merges, pushes or publishes until the"
  - title: "claude-machine-transfer: freeze brief template (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/templates/freeze-brief.md"
    checked: 2026-11-10
    supports: "What each lead session does at its safe point: land or park, one push without force, write the handoff, list scheduled tasks, stop dev servers by PID and go idle."
    quote: "whose commits exist only on this machine, in one push, no force."
  - title: "claude-machine-transfer: check-heads.sh header (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/scripts/check-heads.sh"
    checked: 2026-11-10
    supports: "check-heads.sh reads a branch ledger and prints MATCH, DIFF or MISSING per row, exits 1 unless every row is MATCH, and should run only over your own clones because a repo's git config can run programs."
    quote: "Exit 1 unless every row is MATCH."
  - title: "claude-machine-transfer: seal-archive.sh header (n-uf)"
    url: "https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/scripts/seal-archive.sh"
    checked: 2026-11-10
    supports: "A sealed archive is built with a gitleaks secret scan, a sha256 manifest, a tar of one named member and optional age encryption; it stops on any finding."
    quote: "Stops on any secret finding."
  - title: "User request on Claude Code's issue tracker: #11455, \"Feature Request: Session Handoff / Continuity Support\" (open, opened 12 Nov 2025)"
    url: "https://github.com/anthropics/claude-code/issues/11455"
    checked: 2026-11-10
    supports: "A user's request, not an Anthropic statement: a handoff file written at the end of a session and read at the start of the next. Open, labelled enhancement, has repro and area:core when we looked. A commenter (11 Oct 2026) notes a handoff file can be wrong, since a session out of context may write \"done\" for work it never committed, and suggests citing a commit hash or file path per \"done\" line."
    quote: "Feature Request: Session Handoff / Continuity Support"
related:
  - /settings/
  - /faq/
  - /install/
  - /blog/claude-code-switch-account/
---

A Claude Code session handoff means handing one session's state to a fresh session. The old session pushes its branches and writes down where it stands. The new one reads that note, checks it against git, and only then carries on. Nothing from the old session's history is copied: the note and the repository are the whole handover. That works between two sessions on one Mac, and it scales to a whole workspace moving to a new one: that's what machine-transfer, our Claude Code plugin, does. **[Source on GitHub](https://github.com/n-uf/claude-machine-transfer)** · [overview on n-uf.com](https://n-uf.com/claude-machine-transfer).

People ask Claude Code's issue tracker for this. [#11455](https://github.com/anthropics/claude-code/issues/11455), "Feature Request: Session Handoff / Continuity Support", was still open when we looked on 10 November 2026; it is a user's request, not an Anthropic statement. The by-hand version comes first, then the plugin.

## A workspace is more than files

Picture a busy day in Claude Code. A lead session is supervising two builders it started. Three branches hold commits that exist on this Mac alone. The sidebar is split into sections, `~/.claude` carries memory and skills, a scheduled task fires every Monday, and half a dozen tools are signed in. The plugin's README puts it bluntly: copying the disk moves the files and loses the rest.

A handoff is how the rest gets written down. Each session says what it owns and what it was in the middle of, and the next session starts from that, not from a transcript.

## A Claude Code session handoff by hand

You don't need the plugin for one session. The plugin's templates are the model for this list, cut down to what a single session needs. The cutting down is ours: the repository describes the full method, not this short form.

**1. Reach a safe point.** Land or park what's in flight. Commit work in progress on its own branch, or on `wip/<slug>`, so nothing is half-done in a working tree.

**2. Push first.** Every branch whose commits exist only on this machine goes up in one push, with no force. Then compare each local head with its remote:

```bash
git rev-parse feat/checkout-retry
git ls-remote origin feat/checkout-retry
```

Both should show the same commit hash; `ls-remote` prints it in front of the branch's full name. Stashes never reach a remote. With a clean working tree, `git stash branch <name>` checks out a new branch where the newest stash began, applies it there and drops it; commit that, push it, and repeat while `git stash list` shows anything. Or drop a stash on purpose. A folder with no remote at all needs a private repository before it counts as safe.

**3. Write the note.** One file. The plugin's handoff-note template has these sections, and they make a good checklist:

- status in one line, and the scope the session owns;
- repos and worktrees, each with branch and head;
- work in flight: what's built, what's reviewed on which head, what's next, what it waits on;
- what waits on you, with the words you'd reply;
- child sessions, each with a paste-ready restart brief;
- scheduled tasks and background services, and whether each keeps running;
- local-only files that git ignores (`git status --ignored --short` marks them `!!`), by name and path only;
- MCP servers in use, and the credentials the next session needs, by name only.

The template's rule for files and credentials: names and paths only, never their secret values.

**4. Add a branch ledger.** A table the successor can check line by line. The template keeps four columns, the full 40-character commit and the path of the main clone. Worktrees stay out of it and go in the note, because they don't exist yet when the check runs. Sample data, from the template:

| Repo path | Branch | Commit | On remote |
|---|---|---|---|
| /opt/work/web-app | main | 0123456789abcdef0123456789abcdef01234567 | yes |
| /opt/work/web-app | feat/checkout-retry | 89abcdef0123456789abcdef0123456789abcdef | yes |

**5. Start the successor.** Open a new session in the same folder and make its first message short: read the note and the ledger, check the heads, reply "ready", then restore. One line worth borrowing from the plugin's handover template: nothing ships, merges, pushes or publishes until you lift the freeze.

**6. Check before you trust.** For every row, the successor fetches and confirms that the local branch and `origin/<branch>` both equal the ledger's commit. Any mismatch: stop, report the exact output, and never reset a branch to force a match. The plugin's SKILL.md calls this principle evidence over reports. A commenter on #11455 makes the same point from experience: a session that ran out of context can write "done" for work it never committed, so the check starts from git.

**7. Restore, then retire the old session.** The successor installs dependencies, recreates the worktrees listed in the note and restarts its child sessions from their briefs. The old session takes no more work. The plugin's word is retire, not archive, so you can still scroll back through it.

### Why a fresh session, not the old history

A Claude Code session handoff starts the successor new. Copying session history is the other road, and the plugin's notes call it heavier: the app quit on both machines, the same absolute paths and user name, and the projects folder with every transcript, config files and the app's data folder (often several GB), all copied in one sitting. Running processes and sign-ins can't be carried. The notes still prefer it for a few long sessions you need to scroll and resume, with nothing in flight. For many sessions with work in flight, a fresh restart gives each successor a checked, written state, and a broken copy fails silently. {{live:/blog/export-claude-code-sessions/}}If you want the copy, [how to export Claude Code sessions](/blog/export-claude-code-sessions/) covers it.{{/live}}

## Many sessions at once with the machine-transfer plugin

Done by hand for every lead session, steps get skipped. The plugin is a Claude Code skill that runs the same handoff for each one and tracks who has reported what.

It moves one sidebar section at a time, called a wave, and the notes suggest a quiet section as the trial run. While a wave moves it is frozen: its sessions don't ship, merge, push or publish by hand until every successor reports restored. Dated content that publishes itself from a remote schedule keeps running, since it doesn't depend on either Mac.

Each lead session gets a freeze brief, then writes the three files of the handoff: the note, the ledger and a handover message for its successor. On the new Mac, `check-heads.sh` reads the ledger and prints one line per branch: MATCH, DIFF or MISSING. It exits 1 unless every row is MATCH, and its header says to run it only over your own clones, because a repo's git config can run programs. The handover message tells the successor to run it with `--fetch`.

The roles are few. You decide, sign in and type the go. A transfer coordinator on the old Mac runs the move, an entry session on the new one builds folders and starts each successor, lead sessions write their handoffs and retire, and successors check, restore and report.

Repositories come across as fresh clones. For the rest, the notes lean on two bridges, neither of them SSH. A private GitHub repository carries small files without secrets, and a private release carries `age`-encrypted archives, locked to a key generated on the new Mac that only hands out its public half. Syncthing takes bigger or still-changing folders, one way only: the old Mac sends, the new Mac receives at the same absolute path, paired by device ID and kept on the local network. AirDrop or a USB stick is the fallback. SSH stays off by default, because the notes count it as opening your whole macOS user account.

Anything that isn't a git clone travels as a sealed archive. The script behind it runs a `gitleaks` scan, writes a checksum manifest, packs one named file or folder and can encrypt it with `age`. It stops on any finding, and the unpack script refuses absolute paths, `..` and symlinks. Your `settings.json` arrives set aside as `settings.json.from-source`, so its hooks and paths don't act on the new Mac until you've read them.

## Snags the handoff has to plan for

The target checklist in the plugin's notes says each of its items failed at least once in a real transfer. These are the ones a handoff note or handover message has to account for:

- **Some steps are yours to type.** The Claude app won't start sessions or create scheduled tasks from a turn that another session's message began. A successor's first turn comes from its handover, so its child sessions and scheduled tasks become operator steps, and the handover lists them.
- **Remote Control decides how the handover arrives.** A predecessor with it off can't see sessions on the new Mac, so it writes the handover to a file. Turning it on from a session can fail quietly when a hook rewrites the call, so the notes plan for the app setting "Connect new sessions to Remote Control" or for you flipping each successor's toolbar switch.
- **Two sessions, one title.** A successor usually carries its predecessor's title: address it by its `[ref]`, and record the `local_…` session id, not the transcript's file name.
- **Memory keeps moving.** Memory written after the first `~/.claude` archive is sent again before each wave's successors start, never over a successor that has restored.
- **One machine at a time.** A scheduled task is recreated disabled, disabled on the old Mac, then enabled. A LaunchAgent or cron job also carries its state: stop it on the old Mac for good, carry the state, then install it, with your approval typed in that session.
- **Revoke, then create.** Some providers keep one OAuth grant per user and app, so revoking the old grant after creating the new one cuts off both. The order goes into the handoff note of the session that owns it.
- **Fresh logins miss things.** A new `gh auth login` lacks `read:packages`, so GitHub Packages installs fail with a 403, and headless Chrome won't run until Chrome has been opened once from Finder.

## When you don't need the plugin

A handoff between two sessions on one Mac needs only the by-hand steps above. If you want one Mac's setup and files on a new one, with no sessions in flight, that is a smaller job. {{live:/blog/move-claude-code-to-new-computer/}}The guide to [moving Claude Code to a new computer](/blog/move-claude-code-to-new-computer/) covers which files to copy and what to re-add.{{/live}}

cl_audit, n-uf's free Mac app for Claude usage, has **Move to another Mac** (26.11.10 or later on both Macs), which carries every profile's sessions and Claude Code setup, plus cl_audit's own profiles and settings, in one password-protected disk image. [The demo shows it](/settings/#move-to-another-mac). Project folders and rewind checkpoints don't travel with it, and sign-ins never do.

{{live:/blog/export-claude-code-sessions/}}Copying transcripts so old sessions resume is the other road above, and the [export article](/blog/export-claude-code-sessions/) is the place for it.{{/live}}

## Install it from GitHub

As a plugin, from inside Claude Code, these are the README's two commands:

```
/plugin marketplace add n-uf/claude-machine-transfer
/plugin install machine-transfer@n-uf-machine-transfer
```

Or copy the skill folder into your own skills:

```bash
git clone https://github.com/n-uf/claude-machine-transfer.git
cp -R claude-machine-transfer/skills/machine-transfer ~/.claude/skills/
```

Install it on both Macs: the entry session and the successors on the new one use the same scripts. Then, in the session that will coordinate the move, start with `/machine-transfer plan a move of this workspace to my new Mac`. Installed as a plugin, the command is `/machine-transfer:machine-transfer`, and asking Claude to plan a move loads the skill either way.

Requirements, from the README: macOS to macOS, with the Claude desktop app and Remote Control (the restart protocol assumes the desktop app). The scripts are plain bash and run on the stock bash 3.2, with git 2.31 or newer. Sealing needs `gitleaks` 8.19 or newer, and encryption needs `age`. The licence is PolyForm Perimeter 1.0.1, so it is source-available, not open source. Credentials never travel: the README has you make them fresh on the new Mac.

The plugin is young, and its README says so at the top: not yet stable, with steps, templates and scripts still changing. So read each script before you run it, try the method on one quiet sidebar section first, and check the [CHANGELOG](https://github.com/n-uf/claude-machine-transfer/blob/main/CHANGELOG.md) before you upgrade, since any release may change how a move runs.

The code and the full notes are in the [repository on GitHub](https://github.com/n-uf/claude-machine-transfer), and the method itself is in [SKILL.md](https://github.com/n-uf/claude-machine-transfer/blob/main/skills/machine-transfer/SKILL.md). n-uf is not affiliated with Anthropic.
