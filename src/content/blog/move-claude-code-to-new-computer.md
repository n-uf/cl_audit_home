---
title: "Move Claude Code to a new computer: what to copy"
description: "How to move Claude Code to a new computer: sign in again, copy CLAUDE.md, settings, skills and agents, reinstall plugins and re-add MCP servers."
h1: "How to move Claude Code to a new computer: setup, plugins and MCP servers"
mainKeyword: "move claude code to new computer"
kind: how-to
published: 2026-12-15
updated: 2026-12-15
author: n-uf
draft: true
takeaways:
  - "Install Claude Code on the new Mac and sign in there, then copy from ~/.claude only what you wrote: CLAUDE.md, settings.json and the scripts it points to, skills/, agents/, commands/, output-styles/ and keybindings.json. Leave the rest of the folder behind."
  - "Plugins come back by themselves: settings.json names them and their marketplaces, and Claude Code fetches whatever isn't cached yet. MCP servers in a project's .mcp.json travel with the repository; the ones you added for yourself are re-added with claude mcp add."
  - "User and local MCP servers sit in ~/.claude.json, which also holds app state and account details, so it isn't a file to copy. The Claude app's claude_desktop_config.json is a separate file and a separate job."
  - "A sign-in never moves: not the Keychain entry, not .credentials.json. Sign in on the new Mac, and keep the old Mac untouched until the new one has done a day's work."
  - "Anthropic's docs describe each file but not a move, and we haven't run this copy ourselves. With cl_audit on both Macs, Move to another Mac (experimental, and it can lose data) carries the setup, the sessions with their task lists, plans and typed prompts, and cl_audit's own profiles in one password-protected disk image, plus a checklist of your code to clone. Rewind's copies of edited files (Claude Code's checkpoints) come only if you include them. Your code doesn't travel, and neither do sign-ins."
faq:
  - q: "How do I move Claude Code to a new computer?"
    a: "Install Claude Code on the new computer and sign in. Then copy your CLAUDE.md, settings.json with the scripts it runs, and the skills, agents, commands and output-styles folders from ~/.claude, and let plugins reinstall from their marketplaces. Re-add MCP servers with claude mcp add, and copy your sessions separately if you want them."
  - q: "Can I copy the whole ~/.claude folder to the new Mac?"
    a: "Better not. Anthropic's docs say the folder also holds plaintext transcripts, caches, plugin copies and, as a fallback, your login in .credentials.json. Copy the named files and folders instead, and sign in on the new Mac."
  - q: "Will my plugins and MCP servers come with me?"
    a: "Plugins mostly do: settings.json lists them, and Claude Code clones the marketplaces and downloads the plugins on the new machine. MCP servers in a project's .mcp.json come with the repository. Servers you added for yourself are stored in ~/.claude.json, so you add them again, and the programs they run need to be installed on the new Mac."
  - q: "Is there a built-in way to keep two computers in step?"
    a: "Not for the whole setup, in the Anthropic pages we read; only the skills and plugins tied to your claude.ai account follow you. A user asked Claude Code's issue tracker for one in #36693, which was closed as not planned on 30 April 2026; that's a user report, not an Anthropic statement. A private git repository of the files you wrote is the usual workaround."
  - q: "Does Move to another Mac in cl_audit carry my sign-in?"
    a: "No. cl_audit's README says sign-ins never travel, and that cl_audit never reads the Keychain. You sign in to each account again on the new Mac with Sign in with another account…, and scheduled tasks arrive paused. Your code doesn't travel either: clone it before or after the import, and since 26.11.12 you can pick the folder for any moved session whose folder isn't on the new Mac."
sources:
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-09
    supports: "What ~/.claude holds: CLAUDE.md, rules/, settings.json, skills/, commands/, output-styles/, agents/, keybindings.json (all global scope), ~/.claude.json for app state, account details and personal MCP servers, created when you start a session if it's missing; project files (.mcp.json, .claude/) are committed to git; CLAUDE.local.md and settings.local.json are personal and not committed; ~/.claude/plugins holds cloned marketplaces, installed plugin versions and the install record; transcripts and other application data are plaintext; .credentials.json is listed among the state files to keep."
    quote: "App state, account details, UI toggles, personal MCP servers."
  - title: "Claude Code docs: Explore the .claude directory (application data are plaintext)"
    url: "https://code.claude.com/docs/en/claude-directory#application-data"
    checked: 2026-11-09
    supports: "The data Claude Code writes in ~/.claude (transcripts, caches, history) is plaintext, and anything that passes through a tool, such as file contents or command output, is written to a transcript."
    quote: "These files are plaintext."
  - title: "Claude Code docs: How Claude remembers your project (CLAUDE.md and auto memory)"
    url: "https://code.claude.com/docs/en/memory"
    checked: 2026-11-09
    supports: "~/.claude/CLAUDE.md holds personal instructions for all projects; ~/.claude/rules/ holds personal rules; auto memory is at ~/.claude/projects/<project>/memory/, derived from the git repository, and is machine-local, not shared across machines."
    quote: "Auto memory is machine-local."
  - title: "Claude Code docs: Settings files and precedence"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-09
    supports: "~/.claude/settings.json is the user file; .claude/settings.local.json holds personal overrides for one project and Claude Code keeps it out of git; the first approval 'Yes, and don't ask again' is saved there; settings files are strict JSON, so a comment or trailing comma is an error."
    quote: "Settings files are strict JSON"
  - title: "Claude Code docs: Extend Claude with skills (personal skills, synced skills)"
    url: "https://code.claude.com/docs/en/skills"
    checked: 2026-11-09
    supports: "Personal skills live at ~/.claude/skills/<skill-name>/SKILL.md; when you sign in with a claude.ai account, Claude Code downloads the account's skills into ~/.claude/skills/synced/ (v2.1.273 or later), so that folder isn't one you copy."
    quote: "downloads your account's skills into `~/.claude/skills/synced/` in the background"
  - title: "Claude Code docs: Create custom subagents"
    url: "https://code.claude.com/docs/en/sub-agents"
    checked: 2026-11-09
    supports: "Personal subagents live in ~/.claude/agents/; a running session doesn't detect a newly created agents directory, so restart Claude Code after adding it."
    quote: "a running session doesn't detect a newly created `agents` directory"
  - title: "Claude Code docs: Output styles"
    url: "https://code.claude.com/docs/en/output-styles"
    checked: 2026-11-09
    supports: "User-level custom output styles live in ~/.claude/output-styles."
    quote: "User: `~/.claude/output-styles`"
  - title: "Claude Code docs: Customize keyboard shortcuts"
    url: "https://code.claude.com/docs/en/keybindings"
    checked: 2026-11-09
    supports: "/keybindings creates or opens ~/.claude/keybindings.json."
    quote: "configuration file at `~/.claude/keybindings.json`"
  - title: "Claude Code docs: Customize your status line"
    url: "https://code.claude.com/docs/en/statusline"
    checked: 2026-11-09
    supports: "The status line is a statusLine field in user settings (~/.claude/settings.json) whose command points to a script, for example ~/.claude/statusline.sh; /statusline generates a script in ~/.claude/."
    quote: "Add a `statusLine` field to your user settings"
  - title: "Claude Code docs: Plugin loading and troubleshooting (declared, fetched and loaded plugins)"
    url: "https://code.claude.com/docs/en/plugins/loading"
    checked: 2026-11-09
    supports: "enabledPlugins and extraKnownMarketplaces in settings declare plugins and marketplaces; a marketplace that settings declare but known_marketplaces.json lacks is cloned and enabled plugins that aren't cached are downloaded; the cache lives under ~/.claude/plugins; /reload-plugins applies changes; plugins turned on in a claude.ai account load as <name>@synced; dependencies are installed at session start when a plugin isn't cached yet, such as on a new machine."
    quote: "downloads enabled plugins that aren't cached yet"
  - title: "Claude Code docs: Install and manage plugins"
    url: "https://code.claude.com/docs/en/plugins/install"
    checked: 2026-11-09
    supports: "User-scope plugins are recorded in enabledPlugins in ~/.claude/settings.json; /plugin marketplace add and claude plugin install work from a session or a shell; plugins installed with /plugin or claude plugin install stay on the machine and aren't added to the claude.ai account."
    quote: "plugins you install with `/plugin` or `claude plugin install` stay on this machine"
  - title: "Claude Code docs: Connect Claude Code to tools via MCP (installation scopes)"
    url: "https://code.claude.com/docs/en/mcp#mcp-installation-scopes"
    checked: 2026-11-09
    supports: "Three scopes: local (default; ~/.claude.json under the project's path), project (.mcp.json in the project root, shared through version control) and user (~/.claude.json); a project-scoped server needs approval in an interactive session; claude mcp list and claude mcp get show servers; the same server name in two scopes is resolved by precedence (local, project, user)."
    quote: "User-scoped servers are stored in `~/.claude.json`"
  - title: "Claude Code docs: Connect to MCP servers (find your configuration on disk)"
    url: "https://code.claude.com/docs/en/mcp-quickstart#find-your-configuration-on-disk"
    checked: 2026-11-09
    supports: "claude mcp add writes to one of three scopes across two files (~/.claude.json and .mcp.json); claude mcp get <name> shows which scope holds a server; with CLAUDE_CONFIG_DIR set, .claude.json is read from inside that directory."
    quote: "Run `claude mcp get claude-code-docs` to see which scope holds a server's definition."
  - title: "Claude Code docs: Connect Claude Code to tools via MCP (project approval)"
    url: "https://code.claude.com/docs/en/mcp#project-scope"
    checked: 2026-11-09
    supports: "Claude Code asks for approval in interactive sessions before using servers from a project's .mcp.json."
    quote: "Claude Code prompts for approval in interactive sessions before using project-scoped servers"
  - title: "Claude Code docs: Connect Claude Code to tools via MCP (remote servers and claude.ai connectors)"
    url: "https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers"
    checked: 2026-11-09
    supports: "Remote servers that need OAuth are authenticated with /mcp; their tokens are stored securely and not in the config; connectors added in claude.ai are available in Claude Code when you're logged in with a claude.ai account."
    quote: "Authentication tokens are stored securely and refreshed automatically"
  - title: "Claude Code docs: Desktop application (MCP servers from the Claude Desktop chat app)"
    url: "https://code.claude.com/docs/en/desktop#mcp-servers-from-the-claude-desktop-chat-app"
    checked: 2026-11-09
    supports: "The standalone CLI doesn't read claude_desktop_config.json; on macOS and WSL, claude mcp add-from-claude-desktop copies those servers into ~/.claude.json (interactive choice, --scope user available); the Desktop app loads claude_desktop_config.json servers into local Code tab sessions."
    quote: "The standalone CLI does not read `claude_desktop_config.json`."
  - title: "Claude Help Center: Getting Started with Local MCP Servers on Claude Desktop"
    url: "https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop"
    checked: 2026-11-09
    supports: "Desktop extensions are installed and managed in Settings > Desktop app, Manage next to Extensions (Settings > Extensions in the older layout); fields an extension marks sensitive are encrypted in the operating system's secure storage (Keychain on macOS); that they are entered again on a new Mac is our inference, since the Keychain doesn't move. The page doesn't name claude_desktop_config.json or its location; it names Settings > Developer, under This computer, for the older Settings layout, and the Local MCP servers section of the Extensions page for the newer one."
    quote: "automatically encrypt these values using the operating system's secure storage"
  - title: "Model Context Protocol docs: Connect to local MCP servers (Claude Desktop quickstart, not Anthropic's help page)"
    url: "https://modelcontextprotocol.io/docs/develop/connect-local-servers"
    checked: 2026-11-09
    supports: "In Claude Desktop, Settings, then the Developer tab, then Edit Config opens claude_desktop_config.json, creating it if it doesn't exist; on macOS it is at ~/Library/Application Support/Claude/claude_desktop_config.json; quit and restart Claude Desktop after saving."
    quote: "creates a new configuration file if one doesn't exist, or opens your existing configuration"
  - title: "Claude Code docs: Authentication (credential management)"
    url: "https://code.claude.com/docs/en/authentication#credential-management"
    checked: 2026-11-09
    supports: "On macOS, credentials are in the encrypted Keychain, with ~/.claude/.credentials.json as a fallback when the Keychain rejects the write; with CLAUDE_CONFIG_DIR set, the Keychain entry is keyed to that directory; on first launch Claude Code opens a browser window to log in."
    quote: "On macOS, credentials are stored in the encrypted macOS Keychain."
  - title: "Claude Code docs: Set up Claude Code (install)"
    url: "https://code.claude.com/docs/en/setup"
    checked: 2026-11-09
    supports: "The native installer command (curl -fsSL https://claude.ai/install.sh | bash) and the Homebrew cask (brew install --cask claude-code), which doesn't auto-update; claude doctor prints read-only installation and settings diagnostics."
    quote: "Homebrew installations do not auto-update."
  - title: "Claude Code docs: Commands (/status, /mcp, /memory, /skills, /hooks, /plugin)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-09
    supports: "/status shows version, model, account and connectivity; /mcp manages MCP connections and authentication; /memory edits CLAUDE.md files; /skills lists skills; /hooks views hook configurations; /plugin manages plugins; /reload-plugins applies pending plugin changes."
    quote: "showing version, model, account, and connectivity"
  - title: "Claude Code docs: Debug your configuration"
    url: "https://code.claude.com/docs/en/debug-your-config"
    checked: 2026-11-09
    supports: "Inspection commands: /memory shows memory file locations, /skills available skills, /hooks active hook configurations, /mcp connected servers and their status, /status the active settings sources."
    quote: "Connected MCP servers and their status"
  - title: "Claude Code docs: Environment variables (CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/env-vars"
    checked: 2026-11-09
    supports: "CLAUDE_CONFIG_DIR overrides the configuration directory (default ~/.claude); settings, session history and plugins live under it."
    quote: "All settings, session history, and plugins are stored under this path."
  - title: "Claude Code docs: Manage sessions"
    url: "https://code.claude.com/docs/en/sessions"
    checked: 2026-11-09
    supports: "claude --resume opens the session picker; sessions are saved conversations tied to a project directory; the desktop app, claude.ai/code and the VS Code extension each keep their own session list, so a copy of the transcripts doesn't fill the Code tab (the export article covers the copy)."
    quote: "each keep their own session list"
  - title: "User request on Claude Code's issue tracker: #36693, \"No native way to sync Claude Code config and skills across machines\" (closed as not planned, 30 Apr 2026; opened 20 Mar 2026)"
    url: "https://github.com/anthropics/claude-code/issues/36693"
    checked: 2026-11-09
    supports: "A user's request, not an Anthropic statement: it says there is no built-in way to keep configuration, hooks and skills synchronized across machines, and describes keeping them in a git repository. Closed as not planned on 30 April 2026."
    quote: "no built-in way to keep Claude Code configuration, hooks, and skills synchronized"
  - title: "claude-nomad README (funkadelic)"
    url: "https://github.com/funkadelic/claude-nomad"
    checked: 2026-11-09
    supports: "What the tool says it is: syncs a Claude Code setup (skills, settings, session history) across machines through a private git repository you control, with path remapping, per-host overrides and a secret scan before each push."
    quote: "keeps all of it in sync through a private Git repo you control"
  - title: "CCSnapshot README (keithmackay)"
    url: "https://github.com/keithmackay/CCSnapshot"
    checked: 2026-11-09
    supports: "What the tool says it is: scripts that collect CLAUDE.md files, configurations, plugins, commands, agents and skills into a repository and restore them on another machine; secrets are recorded by name, never by value; a restore step launches Claude to adapt paths and shell config."
    quote: "Collect, version, and restore Claude Code personalizations across machines."
  - title: "cl_audit README at tag v26.11.10 (Moving to another Mac; First run; The default profile)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    supports: "Export ▸ Move to another Mac sets all profiles, the encrypted disk image, Claude Code's setup, the window's MCP settings and scheduled tasks, and cl_audit's own profiles and settings; a password typed twice, not stored; Close the profiles' Claude windows first; copy the .dmg over; on the new Mac Import makes the profiles that aren't there (in folders of their own, not signed in), then imports each profile's sessions; Add account for each sign-in; scheduled tasks arrive paused; setup and MCP settings come only with Add them; nothing is overwritten; Undo is two steps; what moves and what never moves (sign-ins, the Keychain, settings.local.json; claude.ai chats and Projects follow the account); export the profiles as they are now, not from a backup; the first profile is the default profile on ~/.claude; project folders go at the same paths as on the old Mac first, or those sessions wait (\"Folder not here\"). The site's FAQ and Settings demo (n-uf/cl_audit_home#46) add that project folders and rewind checkpoints don't travel."
    quote: "Put your project folders at the same paths as on the old Mac"
  - title: "cl_audit CHANGELOG, 26.11.10"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/CHANGELOG.md"
    checked: 2026-11-09
    supports: "26.11.10 (9 November 2026): Move to another Mac, a move is only ever the password-protected disk image, never a zip; a move keeps accounts' real identifiers; sign-ins don't travel; cl_audit's own profiles and settings travel in the encrypted image; Undo is two steps; 26.11.9 or older can't open a file with cl_audit's profiles or a move. 26.11.8 and 26.11.9 entries: setup, MCP settings and tasks travel; backups drop env values and MCP settings."
    quote: "Sign-ins don't travel: you sign in again on the new Mac."
  - title: "cl_audit CHANGELOG, 26.11.11"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.11/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.11: before a backup writes Claude Code's setup, cl_audit runs the Export page's key check over settings.json, the scripts its hooks run (with the skills holding them) and the plugin marketplaces file; a hook or permission rule holding a key is left out whole, another value that looks like a key is blanked and its name kept, and a script, a skill whose script holds a key or a marketplaces file holding one is left out; Restore, and Export from a backup, say which; it finds only the Export page's key shapes (GitHub, AWS, sk-, JWTs and the like) and doesn't check CLAUDE.md or skills no hook runs."
    quote: "Backups leave out the keys they find in your Claude Code settings and scripts."
  - title: "cl_audit CHANGELOG, 26.11.12"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.12/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.12: Import lists each session whose folder isn't on this Mac (Folder not here) with Pick its folder on this Mac…, which points the saved chat and its Code-tab entry at the picked folder and drops a worktree that isn't on this Mac; the profile's Claude window closes for a moment; Undo this import takes it back, except for a session resumed since; later, Settings ▸ a profile ▸ Sessions ▸ Folder not here with Pick its folder…; the Export page's Code row reads each project with read-only git, warns about work only on this Mac and repos it couldn't read, never runs a program a repo's settings name, and the list travels in the encrypted disk image only with user names, passwords and tokens taken out of remote addresses; the new Mac's Import page shows per project where to clone from, where it was, the branch and what wasn't pushed or committed, with commands to copy, and cl_audit never runs git there; memory files start as Add them in a move import; a move file with the checklist is format 5, refused by 26.11.11 and older; Claude Code's folder naming, the Code tab running a re-pointed session and the worktree fields were confirmed from the programs' own text, not by running them."
    quote: "A moved session opens in the right folder."
  - title: "cl_audit CHANGELOG, 26.11.13"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.13/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.13: a move brings each session's side files (task list, plan, typed prompts with pasted text, the project folder's trust and allowed tools) in the encrypted disk image only; Rewind's copies of edited files are their own Export row with their size, left out unless included; Keys found searches these too; not carried: session environments, the image cache, shell snapshots, debug files, old to-do lists; Import puts them back as rows, on for a move, without overwriting; project MCP servers start left out; prompt history appended to history.jsonl and pointed at each session's folder here; trust written only when the folder has none; both only while Claude Code isn't running for the profile and its window is closed, and only for folders on this Mac; a Pick also points Rewind's saved paths at the new folder; Undo this import takes it all back, leaving and naming anything changed since; side files stay with the imported backup while the import can be undone (30 days), then deleted; a file with side files is format 6, a move without them stays at 5 or 4 so 26.11.12 still opens it; five details confirmed only from Claude Code 2.1.318's program text."
    quote: "A move brings each session's side files."
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
  - title: "cl_audit CHANGELOG, 26.11.23"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.23/CHANGELOG.md"
    checked: 2026-11-13
    supports: "26.11.23: restore, import, the default profile and Undo no longer promise that nothing is ever overwritten or that Undo takes back exactly everything; the app's strings now say built not to overwrite and Undo is meant to take back what it added, and may not bring everything back."
    quote: "no longer promise that nothing is ever overwritten"
related:
  - /blog/export-claude-code-sessions/
  - /blog/back-up-claude-code-sessions/
  - /settings/
  - /faq/
---

To move Claude Code to a new computer, install it there, sign in again, and then copy the files you wrote: `CLAUDE.md`, `settings.json` with the scripts it runs, and the `skills`, `agents`, `commands` and `output-styles` folders from `~/.claude`, plus `keybindings.json`. Plugins reinstall from their marketplaces, MCP servers you added for yourself are added again, and a project's own `.claude` folder, `CLAUDE.md` and `.mcp.json` arrive with the repository. Your sessions are a separate copy, and your sign-in never goes with any of it.

Anthropic's docs describe each of these files, though none walks through a migration to a new computer, and we haven't run this copy ourselves. Each step below is what the docs say. The old Mac stays untouched as your fallback until the new one has done real work. {{live:/blog/claude-code-session-handoff/}}This page covers one Mac's setup. For a busy workspace, with many sessions and unpushed branches in flight, see [Claude Code session handoff](/blog/claude-code-session-handoff/).{{/live}}

## What to copy when you move Claude Code to a new computer

| Piece | Where it lives | How it gets to the new Mac |
|---|---|---|
| Your instructions | `~/.claude/CLAUDE.md`, `~/.claude/rules/` | Copy the file and the folder |
| Settings | `~/.claude/settings.json` | Copy it, then read it (below) |
| Hook and status line scripts | Wherever `settings.json` points | Copy each script, and install what it calls |
| Skills, agents, commands | `~/.claude/skills/`, `agents/`, `commands/` | Copy the folders, not `skills/synced/` |
| Output styles, keybindings | `~/.claude/output-styles/`, `keybindings.json` | Copy |
| Plugins | `~/.claude/plugins/` | Don't copy; settings name them and Claude Code fetches them |
| MCP servers, project | `.mcp.json` in the repository | Comes with a clone |
| MCP servers, yours | `~/.claude.json` | Add them again with `claude mcp add` |
| Claude app MCP servers | `claude_desktop_config.json` | Copy that one file, or re-enter them |
| Auto memory | `~/.claude/projects/<project>/memory/` | Machine-local; comes only if you copy that folder |
| Sessions | `~/.claude/projects/` | A separate job; see the sessions part below |
| Sign-in | The macOS Keychain | Never copied; sign in again |

If you set `CLAUDE_CONFIG_DIR` for a second account, such as `~/.claude-work`, read that folder wherever this page says `~/.claude`; [Claude Code with multiple accounts](/blog/claude-code-multiple-accounts/) explains the variable.

## Before you copy anything

Copy; don't cut. Nothing below deletes a file on the old Mac, and none of it needs the old Mac to be signed out.

`settings.json` can hold an `env` block with tokens in it, so decide how the files travel: an external disk or AirDrop is fine, a public repository is not. And `~/.claude` also holds transcripts, caches and logs; the docs say those files are plaintext and that anything a tool read, such as a `.env` file, ends up in them. That is the main reason to copy named files instead of the whole folder.

## Step 1: install Claude Code and sign in

Install it the way the docs describe: the native installer, `curl -fsSL https://claude.ai/install.sh | bash`, or Homebrew with `brew install --cask claude-code`. Homebrew installs don't update themselves.

Run `claude` once and sign in when the browser opens. On a Mac, Claude Code keeps the login in the Keychain, with `~/.claude/.credentials.json` as a fallback if the Keychain refuses the write. Don't copy the Keychain entry or `.credentials.json` from the old Mac to skip this step; [switching the account in Claude Code](/blog/claude-code-switch-account/) covers signing in with a different account. Claude Code makes a fresh `~/.claude.json` there when you start a session, so the old one stays where it is.

## Step 2: copy what you wrote from `~/.claude`

In Terminal on the old Mac, this lists the folder and changes nothing:

```bash
ls -1 ~/.claude
```

Then copy the names you recognise to a disk you can transfer to the other computer; here it's called `Transfer`, so put your disk's name in its place. `cp` complains about any name you don't have, which is fine:

```bash
mkdir -p /Volumes/Transfer/claude-setup
cd ~/.claude && cp -Rn CLAUDE.md rules settings.json skills agents commands output-styles keybindings.json /Volumes/Transfer/claude-setup/
```

`skills/synced/` isn't yours to carry: after you sign in with a claude.ai account, Claude Code downloads that account's skills into it. If it comes along, leave it be.

On the new Mac, copy in with `-n`, so that nothing already there is replaced. The slash after `claude-setup` copies what's inside the folder, not the folder itself:

```bash
cp -Rn /Volumes/Transfer/claude-setup/ ~/.claude/
```

`-n` skips any file that exists. If the new Mac already has a `settings.json` (Claude Code writes one the first time you change an option in `/config`), the copy leaves yours alone. Open both and add the old keys to the new file by hand. Settings files are strict JSON, so a comment or a trailing comma is an error.

Then read `settings.json` once, because it points outside itself:

- **Scripts.** A `hooks` entry runs a command, and the `statusLine` field points to a script, for example `~/.claude/statusline.sh`. Copy each script to the same path, and install the programs it calls (`jq`, Python, Node and so on) on the new Mac.
- **Paths with the old user name.** A command written as `/Users/oldname/...` won't exist under a different user name. Our caution, not a rule from the docs.
- **The `env` block.** Check which values are secrets and where you keep them. Don't paste them into chat or a repository.

Quit and start Claude Code again after the copy. A running session doesn't notice an `agents` folder that didn't exist when it started.

## Plugins: reinstall, don't copy

Installed plugins live in `~/.claude/plugins`: cloned marketplaces, installed versions and the install records. `settings.json` declares plugins under `enabledPlugins` and marketplaces under `extraKnownMarketplaces`, and Claude Code fetches the rest.

When a session starts and a declared marketplace isn't on the machine, Claude Code clones it and downloads the enabled plugins that aren't cached yet; `/reload-plugins` applies the change without a restart. If one doesn't show up, the Errors tab in `/plugin` says why. By hand, `claude plugin marketplace add owner/repo` and `claude plugin install name@marketplace` work from a shell.

Plugins you turned on in your claude.ai account load as `name@synced` once you sign in with that account. Those you installed with `/plugin` stay on the machine, so the list in `settings.json` is what brings them back.

## MCP servers: re-add them, don't copy `~/.claude.json`

Claude Code has three MCP scopes, and where a server is stored depends on which one you used:

| Scope | Stored in | On the new Mac |
|---|---|---|
| Project | `.mcp.json` in the repository | Comes with the clone; Claude Code asks you to approve it |
| User | `~/.claude.json` | Add again with `claude mcp add --scope user` |
| Local (the default) | `~/.claude.json`, under the project's path | Add again from that project's folder |

`~/.claude.json` is the awkward one: the docs list app state, account details and UI toggles in it beside your servers, so it isn't a file to copy across.

On the old Mac, `claude mcp list` shows your servers, and `claude mcp get <name>` shows one and which scope holds it. Both only read. On the new Mac, add each with `claude mcp add`, passing `--scope user` for the ones you want in every project. `claude mcp add-json` takes a server's JSON, which helps with a long definition. A server's `env` or `headers` can hold a key: check what a command prints before you paste it anywhere, and put the key back from your password manager.

Three things the add doesn't cover:

- **The program a server runs.** A stdio server is a command (`npx`, `uvx`, a binary, a script path), so it has to exist on the new Mac, at the same path if the config writes it out in full.
- **Sign-ins to remote servers.** Their tokens are stored by Claude Code, not in the config. Run `/mcp` and authenticate each one again.
- **claude.ai connectors.** Connectors you added in claude.ai are available in Claude Code when you're logged in with that account, so there's nothing to copy.

{{live:/blog/claude-code-mcp-config-location/}}Where each of these files sits, scope by scope, is in [Claude Code MCP config file location](/blog/claude-code-mcp-config-location/).{{/live}}

### The Claude app has its own MCP file

The Claude app keeps its servers in `claude_desktop_config.json`, a different file from `~/.claude.json`. Anthropic's help pages don't give its path, so this comes from the Model Context Protocol's quickstart: on a Mac the file is in `~/Library/Application Support/Claude/`, and Settings ▸ Developer ▸ Edit Config opens it, creating it if it doesn't exist. Anthropic's help article on local MCP servers calls Settings ▸ Developer the older Settings layout; in the newer one it puts server status and logs under Settings ▸ Desktop app, then Manage next to Extensions, and doesn't say where Edit Config sits. We haven't checked.

If the new Mac's app has none yet, copy the old file there, quit the Claude app completely and open it again. If it has one, merge by hand. The file can hold keys in `env`, so treat it like `settings.json`. Extensions you installed from the app's directory are another matter: Anthropic's help says the fields they mark sensitive sit in the Keychain, which stays behind, so expect to reinstall them and enter those keys again.

The command-line Claude Code doesn't read `claude_desktop_config.json`. On macOS, `claude mcp add-from-claude-desktop` lets you pick servers from it and copies them into `~/.claude.json`.

## Projects, and what doesn't come with them

Clone your repositories on the new Mac, ideally to the same paths as before; session folders are named after the project path. What you committed arrives with the clone: the project's `.claude/` folder (skills, agents, `settings.json`), its `CLAUDE.md` and `.mcp.json`.

What you didn't commit doesn't. The docs describe `CLAUDE.local.md` as your private preferences for a project, and `.claude/settings.local.json` as personal overrides that Claude Code keeps out of git, so neither is in the clone. The approvals you gave with "Yes, and don't ask again" live in that second file. Give them again as they come up, or read the file and copy it over yourself.

The docs say auto memory, Claude's notes to itself under `~/.claude/projects/<project>/memory/`, is machine-local, so it reaches the new Mac only if you copy that project's folder with its sessions. [How to export Claude Code sessions](/blog/export-claude-code-sessions/) covers that copy, and [how to back up Claude Code sessions](/blog/back-up-claude-code-sessions/) covers what the clean-up deletes.

The Claude app's Code tab keeps a session list of its own, so copied transcripts show up in Terminal, not in the tab; [Claude Code sessions lost after switching accounts](/blog/claude-sessions-lost-switching-accounts/) covers that list, which a copy by hand doesn't move.

## Check the new Mac

From a project folder:

1. `/status` shows the version, model, account and connectivity. Check that the account is the one you meant.
2. `claude doctor` runs read-only checks of the install and the settings files, including invalid JSON.
3. `/memory`, `/skills`, `/hooks`, `/plugin` and `/mcp` show what loaded: your `CLAUDE.md` files, skills, hooks, plugins and servers with their status.
4. If you copied sessions, `claude --resume` opens the picker, and a session from the old Mac should be in it.

Keep the old Mac as it is for a few days of real work. If something is missing, the file is still there.

## Keep two Macs in step

Apart from the skills and plugins tied to your claude.ai account, we found no built-in sync for Claude Code's setup in Anthropic's docs. A user asked for one on Claude Code's issue tracker: #36693, "No native way to sync Claude Code config and skills across machines", was closed as not planned on 30 April 2026. That's a user report, not an Anthropic statement.

If you'll use both Macs, the usual answer is dotfiles for Claude Code: a private git repository holding only the files you wrote, which doubles as a backup of your Claude Code settings. Make it a separate folder, not `~/.claude` itself, so that a stray `git add` can't pick up the transcripts, `.credentials.json` or `~/.claude.json`. A `.gitignore` that allows only a list keeps it that way:

```gitignore
# ~/claude-setup/.gitignore: ignore everything except this list
*
!.gitignore
!CLAUDE.md
!keybindings.json
!rules/
!rules/**
!skills/
!skills/**
skills/synced/
!agents/
!agents/**
!commands/
!commands/**
!output-styles/
!output-styles/**
# settings.json only if its env block holds no secrets
```

Copy files in and out with `cp`, and run `diff -r` against `~/.claude` before you overwrite anything; git's history keeps the old version, a plain copy doesn't.

Two tools do this for you, and we haven't tried either. By its README, claude-nomad keeps a Claude Code setup in sync through a private git repository you control, with a secret scan before each push. CCSnapshot's README describes scripts that collect your Claude Code files into a repository and restore them on another machine, recording secrets by name and never by value.

## Move it with cl_audit's Move to another Mac

cl_audit is our free [Claude usage tracker for Mac](/), an independent tool, not affiliated with Anthropic. Since 26.11.10 its **Move to another Mac** puts Claude Code's setup, every profile's sessions with their Code-tab lists, the Claude window's MCP settings and scheduled tasks, and cl_audit's own profiles and settings in one password-protected disk image. Since 26.11.12 a move also brings a checklist of your code, and since 26.11.13 each session's side files. A move with the side files needs 26.11.13 on both Macs: 26.11.12 opens only a move without them, and 26.11.11 and older refuse one with the checklist, saying it's from a newer cl_audit. The [install page](/install/) has the download.

{{experimental: move}}

Your code doesn't travel. What comes instead is a checklist. On the old Mac, the Export page's **Code** row reads each project with read-only git and warns about work that exists only there (commits not pushed, files not committed) and about any repository it couldn't read. Push and commit before you export. The list goes into the encrypted disk image only, with any user name, password or token taken out of the remote addresses.

Each session's side files travel too, also in the image only: its task list, its plan, the prompts you typed in it (the up-arrow history, with pasted text) and its project folder's trust and allowed tools. Rewind's copies of the files the sessions edited are a row of their own on the Export page, with their size, and stay out unless you include them. The check for keys searches the side files as well. Session environments never travel, since they hold tokens, and neither do the image cache, shell snapshots, debug files or old to-do lists.

On the old Mac, open Settings ▸ any profile ▸ Sessions ▸ **Export…** and press **Move to another Mac** at the top of the page ([the demo shows that page](/settings/#move-to-another-mac)). Type a password twice. cl_audit doesn't store it, so a lost one means a file nobody can open. Close the profiles' Claude windows so their Code-tab lists are included, export, and copy the `.dmg` to the new Mac.

![Move to another Mac on cl_audit's Export page](/img/guides/move-export.webp "cl_audit's site demo: the Export page set to Move to another Mac, with all profiles, Claude Code's setup, the MCP settings and cl_audit's profiles. Sample data.")

On the new Mac, install cl_audit and go through its first run, which sets up the first profile on `~/.claude`. Then open Settings ▸ that profile ▸ Sessions ▸ **Import…**, choose the file and type the password; the page says it's a move ([the demo's import](/settings/#import-a-move)). Make the profiles that aren't on this Mac yet, each in folders and a Claude window of its own, then **Close and import** that profile's sessions and do the same in each other profile. Afterwards, sign in to each account with **Sign in with another account…** under the profile's Accounts, and put the profiles in the Dock.

![Importing a move on the new Mac](/img/guides/move-import.webp "cl_audit's site demo: a move's import on the new Mac, with the profiles it made and what to do next for each. Sample data.")

The import page lists each project from the checklist: where to clone it from, where it was, its branch and what wasn't pushed or committed on the old Mac, with the commands to copy. cl_audit never runs git on the new Mac; you clone, before the import or after it.

A session whose folder isn't on the new Mac shows under **Folder not here**. Clone the project to the path it had and the session should need nothing more. Cloned somewhere else, press **Pick its folder on this Mac…**. cl_audit re-points the session's saved chat and Code-tab entry to the folder you pick, and drops a worktree that isn't on this Mac, so the session runs in the project folder. That profile's Claude window closes for a moment while the entries change. Sessions you skip are added anyway; once the code is there, Settings ▸ the profile ▸ Sessions ▸ **Folder not here** lists them with **Pick its folder…**. cl_audit's release notes say three things here were confirmed from the programs' own text, not by running them: how Claude Code files a session under its folder, that the Code tab runs a re-pointed session, and which worktree fields Claude Code reads.

The side files are rows on the import page as well, on for a move, and the import is built to leave a file already there as it is. The prompt history is added at the end of `history.jsonl`, pointed at each session's folder on this Mac, and a folder's trust is written only when that folder has no entry yet. Both are written only while Claude Code isn't running for that profile and its window is closed, and only for a folder that's on this Mac; a session whose folder you pick later gets them then, and the pick also points Rewind's saved paths at the new folder. A project's MCP servers travel in the image but start left out, like the Claude window's MCP settings. Five details here come from Claude Code 2.1.318's program text, the notes say, not from running it: how it writes `history.jsonl` and `.claude.json`, which fields mean trust, how Rewind finds its copies, how a plan is named and where a task list is kept.

Import is built to only add what's missing and not to replace anything already there. Claude Code's setup and the MCP settings come in only if you pick **Add them**, because hooks and MCP servers run commands. In a move, the memory files (each project's memory folder) are already set to **Add them**; every other import leaves them out unless you add them. Scheduled tasks arrive paused, so nothing runs twice; turn on the ones you want in the Claude window. Undo is two steps: **Undo this import**, then **Take back the profiles it made**. The first is also meant to take back the side files it wrote and any picked folder. Anything changed since stays and is named, and a session you've resumed since stays where it is. Undo may not bring everything back. cl_audit keeps the side files with the import's backup for as long as the import can be undone (30 days, or until that backup is deleted), then deletes them.

Sign-ins never travel, and claude.ai chats and Projects already follow your account. Export the profiles as they are now, not from a backup, which lacks the MCP settings, the `env` values and, since 26.11.11, any hook, permission rule or script found to hold a key. The [FAQ](/faq/) has the short version. cl_audit needs a Mac with Apple silicon.
