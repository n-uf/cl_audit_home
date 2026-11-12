---
title: "Claude Code MCP config file location on a Mac"
description: "Claude Code MCP config file location on a Mac: where local, project and user servers are stored, plus the Claude app's claude_desktop_config.json."
h1: "Claude Code MCP config file location: each scope, and the Claude app's file"
mainKeyword: "claude code mcp config file location"
kind: how-to
published: 2026-12-18
updated: 2026-12-18
author: n-uf
draft: true
takeaways:
  - "Claude Code keeps the MCP servers you add in two files: ~/.claude.json (local and user scope, both private to you) and a .mcp.json file at the project's root (project scope, shared through git)."
  - "The Claude app has its own file, ~/Library/Application Support/Claude/claude_desktop_config.json. Claude Code's command line doesn't read it, but claude mcp add-from-claude-desktop can copy its servers across."
  - "When one server name is in two scopes, Claude Code uses the highest one (local, then project, then user) and doesn't merge fields."
  - "To see what's actually loaded, run claude mcp list, or /mcp inside a session."
  - "Moving to a new Mac, add user and local servers again with claude mcp add rather than copying ~/.claude.json, which also holds your account details. The programs the servers run must exist on the new Mac."
faq:
  - q: "Where is the Claude Code MCP config file on a Mac?"
    a: "Servers you add for yourself, in the default local scope or in user scope, are stored in ~/.claude.json in your home folder. Servers you share with a team are in a .mcp.json file at the project's root. If you set CLAUDE_CONFIG_DIR, Anthropic's docs say .claude.json sits in that folder instead."
  - q: "Is there a global MCP config file for Claude Code?"
    a: "Yes, Anthropic calls it user scope. Add a server with claude mcp add --scope user and Claude Code stores it in ~/.claude.json, so it loads in all your projects. The default, local scope, is stored in the same file but only for the project you added it in."
  - q: "Why can't I find claude_desktop_config.json?"
    a: "It may not exist yet: the Model Context Protocol's guide says the Claude app creates it when you click Edit Config on the Developer tab of its Settings. On a Mac it belongs in ~/Library/Application Support/Claude/. Connectors you add through your Claude account are a separate mechanism and don't go in that file."
  - q: "Does Claude Code read claude_desktop_config.json?"
    a: "The standalone command line doesn't, per Anthropic's docs. The Claude app's Code tab does load its servers into local sessions. To copy them into Claude Code's own config on a Mac, run claude mcp add-from-claude-desktop."
  - q: "How do I move my MCP servers to a new Mac?"
    a: "Project servers come with the repository in .mcp.json. For the Claude app, copy the entries under mcpServers from the old claude_desktop_config.json into the new Mac's, keep that copy private, and fix any paths that change. For user and local servers, add them again with claude mcp add on the new Mac instead of copying ~/.claude.json, and install whatever programs they run."
sources:
  - title: "Claude Code docs: MCP, installation scopes"
    url: "https://code.claude.com/docs/en/mcp#mcp-installation-scopes"
    checked: 2026-11-09
    supports: "Three scopes (local, project, user): which projects each loads in, whether it's shared, and where it's stored (local and user in ~/.claude.json, project in .mcp.json at the project root); managed configuration can also deploy servers for every user."
    quote: "MCP servers can be configured at three scopes."
  - title: "Claude Code docs: MCP, local scope"
    url: "https://code.claude.com/docs/en/mcp#local-scope"
    checked: 2026-11-09
    supports: "Local is the default scope; a local server is stored in ~/.claude.json under the project's path, so it doesn't appear in other projects; MCP's local scope is not the same as .claude/settings.local.json; the JSON shape of the stored entry."
    quote: "MCP local-scoped servers are stored in `~/.claude.json` (your home directory)"
  - title: "Claude Code docs: MCP, project scope"
    url: "https://code.claude.com/docs/en/mcp#project-scope"
    checked: 2026-11-09
    supports: "claude mcp add --scope project creates or updates .mcp.json at the project root, to be checked into version control; the file's mcpServers shape; Claude Code asks for approval before using a project's servers in an interactive session; claude mcp reset-project-choices resets those choices."
    quote: "storing configurations in a `.mcp.json` file at your project's root directory"
  - title: "Claude Code docs: MCP, user scope"
    url: "https://code.claude.com/docs/en/mcp#user-scope"
    checked: 2026-11-09
    supports: "User-scoped servers are stored in ~/.claude.json and are available in all projects on the machine, private to the user account; claude mcp add --scope user."
    quote: "User-scoped servers are stored in `~/.claude.json`"
  - title: "Claude Code docs: MCP, scope hierarchy and precedence"
    url: "https://code.claude.com/docs/en/mcp#scope-hierarchy-and-precedence"
    checked: 2026-11-09
    supports: "The same server defined in more than one place connects once, from the highest-precedence source: local, project, user, then plugin-provided servers, then claude.ai connectors; a managed setting ranks above all; duplicates across the three scopes are matched by name; the whole entry is used, not merged. In the desktop app's Code tab, the same stdio server name at the top level of ~/.claude.json and in .mcp.json resolves to ~/.claude.json."
    quote: "fields are not merged across scopes"
  - title: "Claude Code docs: MCP, same name in more than one scope"
    url: "https://code.claude.com/docs/en/mcp"
    checked: 2026-11-09
    supports: "A server name defined in more than one scope with different endpoints produces a warning in claude mcp list and in /mcp."
    quote: "warns about the conflict in `claude mcp list` output and in `/mcp`"
  - title: "Claude Code docs: MCP, managing your servers and server status"
    url: "https://code.claude.com/docs/en/mcp#managing-your-servers"
    checked: 2026-11-09
    supports: "claude mcp list, claude mcp get <name>, claude mcp remove <name> and /mcp; the statuses claude mcp list prints (Connected, Needs authentication, Failed to connect, Pending approval for an unapproved .mcp.json server); /mcp authenticates remote servers that use OAuth and can toggle a server off without losing its configuration."
    quote: "A failure status means Claude Code couldn't connect to that server"
  - title: "Claude Code docs: MCP, environment variable expansion in .mcp.json"
    url: "https://code.claude.com/docs/en/mcp#environment-variable-expansion-in-mcp-json"
    checked: 2026-11-09
    supports: "${VAR} and ${VAR:-default} expand in a server's command, args, env, url and headers in .mcp.json, so a team can share a file with machine-specific paths and secrets kept outside it."
    quote: "Claude Code supports environment variable expansion in `.mcp.json` files"
  - title: "Claude Code docs: MCP, add a server from setup instructions written for another client"
    url: "https://code.claude.com/docs/en/mcp#add-a-server-from-setup-instructions-written-for-another-client"
    checked: 2026-11-09
    supports: "A launch command such as npx means the server runs on your machine as a local stdio process; claude mcp add takes --env KEY=value, with the command after --; an mcpServers block written for Claude Desktop can be passed to claude mcp add-json without its wrapper."
    quote: "A launch command means the server runs as a local stdio process."
  - title: "Claude Code docs: MCP, import MCP servers from Claude Desktop"
    url: "https://code.claude.com/docs/en/mcp#import-mcp-servers-from-claude-desktop"
    checked: 2026-11-09
    supports: "claude mcp add-from-claude-desktop opens a dialog to pick servers from the Claude Desktop configuration file's standard location and copies them to Claude Code; macOS and WSL only; --scope user puts them in the user configuration; names with characters other than letters, numbers, hyphens and underscores are skipped; same-named servers get a numeric suffix."
    quote: "This feature only works on macOS and Windows Subsystem for Linux (WSL)"
  - title: "Claude Code docs: MCP, use MCP servers from claude.ai"
    url: "https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai"
    checked: 2026-11-09
    supports: "With a claude.ai sign-in, connectors added in claude.ai are available in Claude Code without any local file."
    quote: "automatically available in Claude Code"
  - title: "Claude Code docs: Desktop, MCP servers from the Claude Desktop chat app"
    url: "https://code.claude.com/docs/en/desktop#mcp-servers-from-the-claude-desktop-chat-app"
    checked: 2026-11-09
    supports: "The desktop app loads servers from claude_desktop_config.json into local Code tab sessions alongside ~/.claude.json and .mcp.json; with the same name in claude_desktop_config.json and either of the others, the Code tab uses the claude_desktop_config.json definition; the standalone CLI doesn't read that file, and claude mcp add-from-claude-desktop copies its servers into ~/.claude.json on macOS and WSL."
    quote: "The standalone CLI does not read `claude_desktop_config.json`."
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-09
    supports: "~/.claude.json holds app state, account details, UI toggles and personal MCP servers; Claude Code creates it if missing when a session starts; with CLAUDE_CONFIG_DIR set, the ~/.claude paths and .claude.json live under that directory; .mcp.json is a project-only, team-shared file."
    quote: "The same applies to `.claude.json`, which otherwise sits at `~/.claude.json`."
  - title: "Claude Code docs: Settings (where settings live)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-09
    supports: "~/.claude.json is a file Claude Code writes for itself; it holds account details, MCP server configurations, per-project state such as trust decisions, and the global config keys /config writes."
    quote: "that it writes for itself; you don't need to edit it"
  - title: "Claude Code docs: Managed MCP configuration"
    url: "https://code.claude.com/docs/en/managed-mcp"
    checked: 2026-11-09
    supports: "An organization's fixed server set is deployed as managed-mcp.json, which on macOS goes in /Library/Application Support/ClaudeCode/."
    quote: "`/Library/Application Support/ClaudeCode/managed-mcp.json`"
  - title: "Model Context Protocol docs: Connect to local MCP servers (Claude Desktop quickstart)"
    url: "https://modelcontextprotocol.io/docs/develop/connect-local-servers"
    checked: 2026-11-09
    supports: "Used because Anthropic's help pages don't give the file's location. Settings… in the Claude menu, then the Developer tab, then Edit Config; the file's paths on macOS, Windows and Linux; Edit Config creates the file if it doesn't exist; the filesystem example under mcpServers (with /Users/username/Desktop and /Users/username/Downloads); paths must be absolute; completely quit and restart Claude Desktop after saving; many servers need Node.js."
    quote: "creates a new configuration file if one doesn't exist, or opens your existing configuration"
  - title: "Claude Help Center: Getting started with local MCP servers on Claude Desktop"
    url: "https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop"
    checked: 2026-11-09
    supports: "Anthropic's help page doesn't give claude_desktop_config.json's location. For connection status and logs it points to the Local MCP servers section of the Extensions page (Settings ▸ Desktop app, then Manage next to Extensions), or to Settings ▸ Developer, under This computer, in the older Settings layout."
    quote: "the Local MCP servers section of the Extensions page"
  - title: "Claude Help Center: Get started with custom connectors using remote MCP"
    url: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp"
    checked: 2026-11-09
    supports: "Remote connectors are configured through your Claude account; local MCP servers set up in claude_desktop_config.json are a separate mechanism that uses your local network."
    quote: "are a separate mechanism and do use your local network"
  - title: "cl_audit README at tag v26.11.10 (Moving to another Mac, Importing an export, Claude window)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/README.md"
    checked: 2026-11-09
    supports: "Move to another Mac (a key on the Export page, Settings ▸ a profile ▸ Sessions ▸ Export…) carries the Claude window's MCP settings in the encrypted disk image only; a zip leaves them out; Import adds them only after Add them, and writes claude_desktop_config.json only where the profile has none; backups no longer hold them (those made by 26.11.8 still do); the file also holds the window's sidebar records and other settings; an export never holds .claude.json."
    quote: "written only where the profile has none"
  - title: "cl_audit CHANGELOG, 26.11.9 and 26.11.10"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.10/CHANGELOG.md"
    checked: 2026-11-09
    supports: "26.11.9 (9 November 2026): Export carries the window's claude_desktop_config.json (its MCP servers and other settings) in the encrypted disk image only, and Import adds it only when the profile has none yet; backups no longer keep it. 26.11.10 (9 November 2026): Move to another Mac sets all of this in one click, in the password-protected disk image only; sign-ins don't travel."
    quote: "in the encrypted disk image only: a zip leaves it out and says so"
  - title: "cl_audit CHANGELOG, 26.11.13"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.13/CHANGELOG.md"
    checked: 2026-11-10
    supports: "26.11.13: a move brings each session's side files, including its project folder's trust and allowed tools, in the encrypted disk image only; a folder's MCP servers travel in the image but start left out on Import, like the window's MCP settings; cl_audit never keeps a copy of .claude.json."
    quote: "A folder's MCP servers travel in the image but start left out on Import."
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
related:
  - /blog/move-claude-code-to-new-computer/
  - /blog/back-up-claude-code-sessions/
  - /blog/claude-code-multiple-accounts/
  - /install/
---

The Claude Code MCP config file location depends on the scope. On a Mac, servers you add for yourself, whether for one project (the default, "local") or for all of them ("user"), are stored in `~/.claude.json` in your home folder. Servers you share with a team are in a `.mcp.json` file at the project's root. The Claude app keeps its own list in a different file, `~/Library/Application Support/Claude/claude_desktop_config.json`, which Claude Code's command line doesn't read.

Claude Code's part of this comes from Anthropic's docs as they stood in November 2026. Anthropic's help pages don't give the Claude app file's path, so that part comes from the Model Context Protocol's own guide for the app, and says so where it does.

## Claude Code MCP config file location by scope

Anthropic's docs name three scopes. Two of them share a file.

| Scope | Loads in | Shared with a team | Stored in |
|---|---|---|---|
| Local (the default) | The project you added it in | No | `~/.claude.json`, under that project's path |
| Project | That project | Yes, through version control | `.mcp.json` in the project's root |
| User | All your projects | No | `~/.claude.json` |

`~/.claude.json` sits in your home folder (`/Users/you/.claude.json`), next to the `~/.claude` folder, not inside it. If you set `CLAUDE_CONFIG_DIR`, the docs say `.claude.json` sits in that folder instead, so a second Claude Code folder such as `~/.claude-work` has its own. [Claude Code with multiple accounts](/blog/claude-code-multiple-accounts/) explains that variable.

One naming trap. Anthropic's docs say MCP's "local scope" isn't the same as the `.claude/settings.local.json` file in a project folder, which holds general local settings. A local-scope MCP server lives in `~/.claude.json`, not in the project.

Servers your organization deploys through a managed file are somewhere else: on a Mac, `/Library/Application Support/ClaudeCode/managed-mcp.json`. That isn't yours to move.

## Project-level MCP config: .mcp.json

Add a server with `--scope project` and Claude Code creates or updates `.mcp.json` at the project root:

```bash
claude mcp add --transport http shared-server --scope project https://mcp.example.com/mcp
```

The file looks like this:

```json
{
  "mcpServers": {
    "shared-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

The docs suggest checking it into version control so everyone on the team gets the same servers, which also means it travels with the repository. Claude Code asks you to approve a project's servers before it uses them. Until you do, `claude mcp list` shows the server as pending approval.

If a server needs a token, you can write `${SERVER_TOKEN}` in the file instead of the token itself. The docs say `.mcp.json` supports environment variable expansion in `command`, `args`, `env`, `url` and `headers`, so the file you commit holds no secret.

## Global MCP config in Claude Code is user scope

"Global" is the word people search for; Anthropic's docs say user scope. A user-scope server loads in all your projects and stays private to your account.

```bash
claude mcp add --transport http example --scope user https://mcp.example.com/mcp
```

It goes into `~/.claude.json`. That file holds more than servers: the docs say it also has your account details and per-project state such as trust decisions, and that Claude Code writes it for itself, so you don't need to edit it. Prefer the `claude mcp` commands to editing it by hand. If the file is missing, Claude Code creates it when you start a session.

## Which file wins when a server is in two scopes?

Claude Code matches duplicates by name and connects once, using the highest of these:

1. Local scope
2. Project scope
3. User scope
4. Servers from plugins
5. claude.ai connectors

It uses the whole entry from that source and doesn't merge fields across scopes. A server your organization provides through managed settings ranks above all of them. If two scopes define one name with different endpoints, Claude Code warns you in `claude mcp list` and in `/mcp`.

There's one exception. In a local session in the Claude app's Code tab, a stdio server with the same name at the top level of `~/.claude.json` (user scope) and in `.mcp.json` resolves to the `~/.claude.json` one, the reverse of the order above.

## See what Claude Code loaded

You don't need to open either file to check what's loaded:

```bash
claude mcp list
claude mcp get example
```

Inside a session, `/mcp` shows the same servers and lets you sign in to remote ones that use OAuth. It can also switch a server off for the current project without removing its configuration. A `✘ Failed to connect` status means Claude Code couldn't reach that server, not that the list command failed.

If you signed in to Claude Code with a claude.ai account, the docs say connectors you added in claude.ai are available in Claude Code automatically. A server that's in `/mcp` but in none of the files above may have come from there, from a plugin or from your organization.

## The Claude app's claude_desktop_config.json on a Mac

The Model Context Protocol's guide for the Claude app gives the file's path:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

The guide opens it from the app: choose Settings… in the Claude menu in the menu bar (not the settings inside the chat window), open the Developer tab, and click Edit Config. Anthropic's own help article on local MCP servers treats Settings ▸ Developer as the older Settings layout. In the newer one, it puts server status and logs under Settings ▸ Desktop app, then Manage next to Extensions, in the Local MCP servers section. It doesn't say where Edit Config sits there, and we haven't checked.

How this file relates to Claude Code:

- The standalone command line doesn't read it. On macOS, `claude mcp add-from-claude-desktop` reads it from that standard location, opens a picker and copies the servers you choose into Claude Code (add `--scope user` for all your projects). Names with characters other than letters, numbers, hyphens and underscores are skipped.
- The app's Code tab does load its servers into local sessions, alongside `~/.claude.json` and `.mcp.json`. For the same name, it uses the `claude_desktop_config.json` definition.

## Can't find claude_desktop_config.json?

Work down this list:

1. **Look at the exact path.** The folder name has a space, so quote it: `ls -l "$HOME/Library/Application Support/Claude/claude_desktop_config.json"`. In Finder, Go ▸ Go to Folder (⇧⌘G) takes the same path.
2. **It may not exist yet.** The guide says Edit Config creates the file if it doesn't exist, so the button is the simplest way to get one.
3. **You may only use connectors.** Anthropic's help says remote connectors are configured through your Claude account, and local servers in this file are a separate mechanism.
4. **Edited, but nothing changed.** The guide says to quit the app completely and open it again. Check the JSON for a stray comma, and make sure the paths in it are absolute.

## Add an MCP server to claude_desktop_config.json

Servers go under `mcpServers`, each with a name, a `command` and its `args`. This is the guide's filesystem example, with `you` as the user name:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/Desktop",
        "/Users/you/Downloads"
      ]
    }
  }
}
```

The guide says to replace the file's contents with that block, which is fine for a new, empty file. If yours already has content, add the server as another entry inside `mcpServers` instead: the Claude app can keep other settings in the same file, and replacing it would drop them. Then quit the app completely and open it again.

## Back up and move your MCP config to a new Mac

Most of this is one-time copying, and nothing here deletes anything. Keep the old Mac as it is until the new one works.

- **Project servers.** `.mcp.json` is in the repository. Clone it on the new Mac and approve the servers when Claude Code asks.
- **The Claude app's file.** On the new Mac, open it with Edit Config, then copy the entries under `mcpServers` across from the old file rather than replacing the new one. Values under `env` can be tokens and passwords, so any copy you carry between Macs belongs somewhere only you can open, not in a shared folder or a repository.
- **User and local servers.** Don't copy `~/.claude.json`: it also holds your account details. On the old Mac, `claude mcp list` gives you the names. On the new one, add each again with `claude mcp add`, from the command or setup instructions you used the first time, typing any secret fresh. For a local-scope server, run the command from the project, since it's stored under the project's path.
- **The programs.** A server started with `npx` needs Node.js on the new Mac, and the guide notes that many servers do. An absolute path such as `/Users/you/Desktop` needs changing if your user name differs on the new Mac. Run `claude mcp list` afterwards: `✘ Failed to connect` marks a server Claude Code couldn't connect to.
- **Remote servers that sign you in.** Run `/mcp` on the new Mac to sign in to them; the docs say that's where OAuth sign-in happens.

The rest of a new-Mac setup, such as `CLAUDE.md`, settings and skills, is in [how to move Claude Code to a new computer](/blog/move-claude-code-to-new-computer/). Your past sessions are a separate job, covered in [how to export Claude Code sessions](/blog/export-claude-code-sessions/).

## If you use cl_audit

{{experimental: export, import, move}}

cl_audit's **Move to another Mac** and its **Export…** carry the Claude window's MCP settings only in the password-protected disk image, and its backups have left them out since 26.11.9 (see [cl_audit's settings](/settings/)). On the new Mac, **Import…** adds them only if you pick **Add them** and the profile has no `claude_desktop_config.json` yet. Since 26.11.13 a move also carries the local-scope servers that `~/.claude.json` holds for your sessions' own project folders, in the image only, and they start left out on import. The file itself is still never in an export, so user-scope servers are yours to add again as above.

## About cl_audit

We make cl_audit, a free [Claude usage tracker for Mac](/), and the [install steps](/install/) are short. It's an independent tool, not affiliated with Anthropic. Questions about the app are in [the FAQ](/faq/).
