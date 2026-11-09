---
title: "cl_audit: Move to another Mac, with every profile"
description: "cl_audit's Move to another Mac puts every profile, its sessions, Claude Code's setup, MCP settings and scheduled tasks in one encrypted file."
h1: "Move to another Mac: every cl_audit profile in one file"
mainKeyword: "cl_audit move to another mac"
kind: use-case
published: 2026-11-09
updated: 2026-11-09
author: n-uf
order: 8
takeaways:
  - "Export ▸ Move to another Mac sets everything in one click: all profiles, the encrypted disk image, Claude Code's setup, the Claude window's MCP settings and scheduled tasks, and cl_audit's own profiles and settings."
  - "A move keeps your accounts' real identifiers, so each Code-tab entry and scheduled task goes back under its own account on the new Mac. That is why a move is only ever the password-protected disk image, never a zip."
  - "Sign-ins never travel. After the import you sign in to each account with Add account; the import page lists which."
  - "The import only adds what is missing. A profile, a settings.json, MCP settings or a task file that is already on the new Mac stays as it is, and Undo takes the import back in two steps."
  - "Both Macs need cl_audit 26.11.10 or later: 26.11.9 and older can't open a move file."
faq:
  - q: "Does Move to another Mac carry my sign-ins?"
    a: "No. Sign-ins never travel, neither Claude Code's nor the Claude window's, and cl_audit never reads the Keychain. After the import, sign in to each account with Settings ▸ the profile ▸ Claude Code ▸ Accounts ▸ Add account."
  - q: "Will my scheduled tasks run twice after the move?"
    a: "No. They come with their prompts but arrive paused, so nothing runs on both Macs. Turn each one on in the profile's Claude window, under Scheduled tasks, once that profile is signed in."
  - q: "Does the import overwrite anything on the new Mac?"
    a: "No. It only adds what is missing. A profile that is already there, your settings.json, your MCP settings and any task file stay as they are, and your cl_audit settings stay unless you pick Take the file's."
  - q: "Do my hooks, skills and MCP servers come along?"
    a: "Yes, in the encrypted disk image. The import leaves Claude Code's setup and the MCP settings out until you pick Add them, because hooks and MCP servers run commands on their own, and then adds them only where none exist yet."
  - q: "Can an older cl_audit open the move file?"
    a: "No. A move, or any file with cl_audit's profiles in it, can't be opened by 26.11.9 or older: it says the file is from a newer cl_audit. Install 26.11.10 or later on both Macs."
sources:
  - title: "cl_audit README at v26.11.10: Moving to another Mac"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md#moving-to-another-mac"
    checked: 2026-11-09
    supports: "The steps on both Macs: Export… then Move to another Mac, the password, copying the .dmg; on the new Mac the first run, project folders at the same paths, Import…, the cl_audit's profiles card and Make 2 profiles, Into and Close and import for each profile, Add account, the Dock, the paused scheduled tasks, Add them; what moves and what never moves; Undo in two steps; export the profiles as they are now, not from a backup."
    quote: "Yes, everything but the sign-ins."
  - title: "cl_audit CHANGELOG, 26.11.10"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/CHANGELOG.md"
    checked: 2026-11-09
    supports: "Move to another Mac on the Export page; real account identifiers kept, so a move is only the encrypted disk image; cl_audit's own profiles and settings travel and are made on the new Mac, not signed in and without a Dock icon; a made profile works in folders of its own; Undo is two steps; 26.11.9 and older can't open a move."
    quote: "A new key on the Export page sets everything a new Mac needs in one click"
  - title: "cl_audit CHANGELOG, 26.11.9"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.9/CHANGELOG.md"
    checked: 2026-11-09
    supports: "The Claude window's MCP settings travel in the encrypted disk image only and are added only where the profile has none; scheduled tasks travel with their prompts and come back paused; backups keep neither the MCP settings nor settings.json's env values."
    quote: "The Claude window's MCP settings and scheduled tasks travel too."
  - title: "cl_audit CHANGELOG, 26.11.8"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.8/CHANGELOG.md"
    checked: 2026-11-09
    supports: "Claude Code's setup travels: CLAUDE.md and its includes, skills, agents, commands, output styles, keybindings, settings.json with the scripts its hooks run, and the plugin list; Import adds it only after Add them, and only what is missing."
    quote: "Claude Code's setup travels: Export, Import, Backup and Restore carry it."
related:
  - /use-cases/multiple-claude-accounts/
  - /settings/
  - /install/
---

**Move to another Mac** is how cl_audit takes everything to a new Mac: export with it on the old Mac, copy the one file across, and import it on the new Mac. The file is a password-protected disk image with every profile's sessions, Claude Code's setup, the Claude window's MCP settings and scheduled tasks, and cl_audit's own profiles and settings. Sign-ins stay behind: you sign in to each account again on the new Mac. cl_audit, a free [Claude usage tracker for Mac](/), is an independent tool, not affiliated with Anthropic.

The examples below use the site's sample profiles: **home** on `~/.claude`, **work** with three Team accounts, and **side**. The names and addresses are made up.

## What moves to the new Mac, and what doesn't

| | Moves? | How it arrives |
|---|---|---|
| Claude Code's sessions | Yes | With their sub-agent files. Sessions that hold keys stay out unless you keep them |
| The Claude window's Code-tab list and sidebar | Yes | Each entry goes back under its own account |
| Scheduled tasks | Yes | With their prompts and the sessions they ran, paused |
| Claude Code's setup | Yes | `CLAUDE.md` and the files it includes, skills, agents, commands, output styles, keybindings, `settings.json` with its hook scripts, and the plugin list. Added only when you pick **Add them** |
| The Claude window's MCP settings | Yes | Added only when you pick **Add them**, and only where the profile has none yet |
| cl_audit's profiles and settings | Yes | Names, looks, Dock places, accounts and the one in use; the General and backup settings |
| Sign-ins | No | Sign in again on the new Mac |
| The Keychain and `settings.local.json` | No | |
| claude.ai chats and Projects | No | They already follow the account |

A move keeps your accounts' real identifiers and addresses. An ordinary export turns them into fingerprints, but the Claude window files its Code-tab list and scheduled tasks by account, so the new Mac needs the real ones to put each entry back where the window looks. That is why a move is only ever the encrypted disk image, never a zip.

## On the old Mac: export with Move to another Mac

1. Open Settings ▸ any profile ▸ Sessions ▸ **Export…**, then press **Move to another Mac** at the top of the page. It sets **All profiles**, the encrypted disk image, Claude Code's setup, the window's MCP settings and scheduled tasks, and cl_audit's own profiles and settings. You can still change any row.
2. Close the profiles' Claude windows first, or their Code-tab lists are left out; the page tells you per profile. Your choice under **Keys found** stays as you set it.
3. Type a password twice. It isn't stored anywhere, so if you lose it, the file can't be opened. Then press **Export** and choose where the file goes.
4. Copy the `.dmg` to the new Mac: a disk, AirDrop or a shared folder.

![Export ▸ Move to another Mac in the settings demo](/img/guides/move-export.webp "The site's demo of Export ▸ Move to another Mac: all profiles, the setup, the MCP settings and cl_audit's profiles in one encrypted disk image. Sample data.")

Export the profiles as they are now, not from a backup. Backups keep neither the window's MCP settings nor the values in `settings.json`'s `env`.

## On the new Mac: install, then import

1. Install cl_audit 26.11.10 or later ([download and install steps](/install/)) and go through its first run. It sets up your first profile on `~/.claude`, with its sign-in. In the example, that's home.
2. Put your project folders at the same paths as on the old Mac. Sessions whose folder isn't there yet are added but wait ("Folder not here") until it is.
3. In that profile's settings, open Sessions ▸ **Import…**, choose the file and type its password. The page says it is a move. Its **cl_audit's profiles** card lists the profiles it will make, the ones already on this Mac, and any setting that differs, with both values.
4. Press **Make 2 profiles** first. Each made profile works in folders of its own (`~/.claude-work`, with a Claude window of its own), whatever the file says. Your settings stay unless you pick **Take the file's**.
5. Pick **Into**: the page offers the profile's own part ("Into home"), and never picks it for you. **Close and import** puts that profile's sessions in, each Code-tab entry and scheduled task back into the folder of its own account.
6. Do the same for each other profile: its Sessions ▸ **Import…**, the same file.

![The import of a move after Make 2 profiles](/img/guides/move-import.webp "The site's demo of the import on the new Mac: work and side made, with the next steps for each. Sample data.")

The [settings demo](/settings/#move-to-another-mac) opens on the first page; to click through both, it's Export… then Move to another Mac, and Import… with "a move from another Mac" as the file. Nothing on your Mac changes there.

## After the import: sign in, the Dock, scheduled tasks

The import never signs anything in and never touches the Dock, so three things are left to you. The done page lists them per profile.

- **Sign in to each account** of each made profile: Settings ▸ the profile ▸ Claude Code ▸ Accounts ▸ **Add account**. cl_audit never reads the Keychain, so there's nothing it could carry over.
- **Put the profiles in the Dock** with the key on the page, or Settings ▸ the profile ▸ Dock icon ▸ **Usage in the Dock**.
- **Turn on the scheduled tasks** you want, in each profile's Claude window under Scheduled tasks, once it is signed in. They arrive paused, so nothing runs on both Macs.

Claude Code's setup and the MCP settings come only if you pick **Add them** on the import page. Hooks and MCP servers run commands on their own, and nothing in a file can prove it was made for a move on your Mac, so cl_audit asks.

## Nothing on the new Mac is replaced

The import only adds what is missing. A profile counts as already on the new Mac when it has one of the file's accounts, and it never changes. Your own `settings.json`, MCP settings and task files stay exactly as they are, and a file's are added only where none exist.

Undo is two steps. **Undo this import** on the done page takes back the sessions. Then **Take back the profiles it made** removes the made profiles that are unchanged since, their empty folders and any settings it took.

## Both Macs need cl_audit 26.11.10

A move file, or any export with cl_audit's profiles in it, can't be opened by 26.11.9 or older. Those versions say the file is from a newer cl_audit. Every other export still opens there.

## Without cl_audit

Claude Code keeps its transcripts as files, so you can copy them to another Mac yourself, with the projects at the same paths. A plain copy doesn't bring the Claude window's Code-tab list, its scheduled tasks or the way it files them by account. {{live:/blog/export-claude-code-sessions/}}[How to export Claude Code sessions](/blog/export-claude-code-sessions/) walks through the manual copy and `/export`.{{/live}}

If you run several Claude accounts on one Mac, each profile keeps its own folder, sign-in and Claude window; [using multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) covers that setup. A move carries all of those profiles at once. Other questions about the app are in the [FAQ](/faq/).
