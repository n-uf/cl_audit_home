---
title: "Claude Code floating window on Mac: cl_audit's Quick chat"
description: "cl_audit's Quick chat is a Claude Code floating window for Mac: press a shortcut, ask, and your own Claude Code answers on the profile's account."
h1: "A Claude Code floating window for a quick question, from any app"
mainKeyword: "claude code floating window"
kind: use-case
draft: true
published: 2026-12-04
updated: 2026-12-04
author: n-uf
order: 7
takeaways:
  - "cl_audit's Quick chat is a bar, then a chat window, floating over any app. Your installed Claude Code answers it on the account the profile has in use."
  - "The shortcut is off until you turn it on in Settings ▸ General ▸ Quick chat. It offers five choices and checks each against macOS's own Space shortcuts and Claude's Quick Entry."
  - "It runs with no tools, no MCP servers, no settings files and no slash commands, so it can't read your files, run commands or see your screen."
  - "Questions count against that account's limits like any Claude Code use. cl_audit doesn't pool accounts, and Quick chat doesn't get you past a limit."
  - "Claude's own Quick Entry is the better pick for screenshots, windows, voice and any Claude plan."
faq:
  - q: "How do I open Quick chat from any app?"
    a: "Turn the shortcut on in Settings ▸ General ▸ Quick chat (it's off by default) and pick ⌥Space, ⌃⌥Space, ⌥⇧Space, ⌃Space or ⌘Space. Or choose Quick chat in a profile's menu bar icon menu or Dock icon menu, which chats on that profile. Esc or ⌘W hides the window and keeps the chat."
  - q: "Can Quick chat read my files or run commands?"
    a: "No. cl_audit starts Claude Code with no tools, no MCP servers, no settings files and no slash commands, so it can only answer from what you type. It's a chat, not an agent."
  - q: "Does a Quick chat question count against my Claude limits?"
    a: "Yes. It's Claude Code answering on the account the profile has in use, so it counts against that account's limits like any Claude Code use. For Pro, Max and Ultra, Anthropic's help page says Claude and Claude Code share the same limits."
  - q: "Is Quick chat the same as Claude's Quick Entry?"
    a: "No. Quick Entry belongs to the Claude app: it can attach a screenshot or a window, takes voice, and works on every Claude plan. Quick chat belongs to cl_audit and sends text to Claude Code on a profile's account. You can run both on different shortcuts."
  - q: "Where are my quick chats kept, and how do I remove them?"
    a: "Claude Code keeps them in the profile's own folder, under projects/, and deletes them after 30 days by default. In Settings ▸ General ▸ Quick chat, Remove quick chat data… moves every profile's quick chats, their work folders and the settings to the Trash."
sources:
  - title: "cl_audit README at v26.11.3 (n-uf)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.3/README.md"
    checked: 2026-11-08
    supports: "The Quick chat section and the General ▸ Quick chat card: the bar and the chat window, the shortcut (off by default, five choices, clash check, no Accessibility permission), the profile menus, Return and Shift-Return, Copy, Ask again, the answered-by line, New chat, Stop, Retry, the model and thinking pickers, the account line and Switch account…, how it runs, what it keeps, Counting and Remove quick chat data…."
    quote: "It runs with no tools, no MCP servers, no settings files and no slash commands"
  - title: "cl_audit CHANGELOG, 26.11.3"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.3/CHANGELOG.md"
    checked: 2026-11-08
    supports: "Quick chat arrived in 26.11.3; its summary of the shortcut, the pickers, the account line and what Settings lists."
    quote: "a floating chat over any app"
  - title: "cl_audit README, network paragraph (commit c5f49f3, after the 26.11.3 tag)"
    url: "https://github.com/n-uf/cl_audit/blob/c5f49f3/README.md"
    checked: 2026-11-08
    supports: "What you type in Quick chat goes to Anthropic through Claude Code; there is no cl_audit server."
    quote: "what you type in Quick chat goes to Anthropic through Claude Code"
  - title: "cl_audit 26.11.3 release notes (GitHub)"
    url: "https://github.com/n-uf/cl_audit/releases/tag/v26.11.3"
    checked: 2026-11-08
    supports: "The release that added Quick chat; the same summary as the changelog."
    quote: "No tools, no MCP servers, no settings files"
  - title: "cl_audit Sources/QuickChatEngine.swift and QuickChat.swift at v26.11.3"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.3/Sources/QuickChatEngine.swift"
    checked: 2026-11-08
    supports: "The flags Quick chat starts claude with (print mode, --tools \"\", --strict-mcp-config, --setting-sources \"\", --disable-slash-commands, --system-prompt with its own short prompt), the environment it passes (no key or token, non-essential traffic off), the model and thinking choices (Haiku, Sonnet, Opus, Profile's default; Off, Low, Medium, High, Extra) and their blurbs. Menu order from MenuBar.swift and IconApp.swift: Quick chat is the first action under the numbers, below the switch items when the profile has other accounts."
    quote: "You have no tools here."
  - title: "Claude Code docs: Legal and compliance"
    url: "https://code.claude.com/docs/en/legal-and-compliance"
    checked: 2026-11-08
    supports: "Claude Code use is under Anthropic's terms (Consumer Terms for Free, Pro, Max and Ultra; Commercial Terms for Team, Enterprise and the API); advertised Pro, Max and Ultra limits assume ordinary, individual usage; sign-in to a Claude account must complete through Anthropic's own flow; a product may say in plain text that it runs Claude Code but may not build the name into a product or feature name or suggest Anthropic built or endorses it."
    quote: "assume ordinary, individual usage of Claude Code and the Agent SDK"
  - title: "Claude Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-08
    supports: "Limits are shared across Claude and Claude Code, so a Claude Code question counts against the same limits as the rest of the account's use."
    quote: "all activity in both tools counts against the same limits"
  - title: "Claude Help Center: Use Quick Entry with Claude Desktop on Mac"
    url: "https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac"
    checked: 2026-11-08
    supports: "Claude's Quick Entry: double-tap Option by default, or Option + Space or a custom shortcut, set under Settings ▸ Desktop app; a dragged screenshot or an application window; voice dictation on Caps Lock, off by default; the five most recent conversations on New chat; every plan from Free to Enterprise; macOS 12 or later (14 for voice); Accessibility, Screen Recording and Speech Recognition permissions; the Claude app must be running; macOS only."
    quote: "disabled by default because it takes over your Caps Lock key"
  - title: "Claude Code docs: Data usage"
    url: "https://code.claude.com/docs/en/data-usage"
    checked: 2026-11-08
    supports: "Claude Code stores session transcripts locally for 30 days by default, adjustable with cleanupPeriodDays; also where Anthropic describes how it handles Claude Code prompts by plan, and what non-essential traffic is."
    quote: "store session transcripts locally in plaintext under `~/.claude/projects/` for 30 days by default"
  - title: "Claude Code docs: Settings"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-08
    supports: "With CLAUDE_CONFIG_DIR set, Claude Code keeps its settings, session history and plugins in that folder, which is how a cl_audit profile's own folder works."
    quote: "Claude Code then stores your settings, session history, and plugins there instead."
  - title: "Claude Code docs: CLI reference"
    url: "https://code.claude.com/docs/en/cli-reference"
    checked: 2026-11-08
    supports: "The flags: -p prints a response without interactive mode; --tools \"\" disables all built-in tools; --strict-mcp-config ignores other MCP configurations; --setting-sources picks which settings files load; --disable-slash-commands; --system-prompt replaces the entire system prompt."
    quote: "Disable all skills and commands for this session"
related:
  - /use-cases/claude-usage-menu-bar-mac/
  - /use-cases/switch-claude-accounts/
  - /faq/
  - /install/
---

cl_audit's Quick chat is a Claude Code floating window for the Mac. Press a shortcut and a bar opens over whatever app you're in. Type a question, press Return, and your own installed Claude Code answers it on the account the profile has in use. It is a chat, not an agent: it has no tools, so it can't read your files, run commands or see your screen. Quick chat came with cl_audit 26.11.3, and cl_audit is an independent tool, not affiliated with Anthropic.

It suits a quick question, the kind you'd otherwise open Terminal or the Claude window for, like "how do I find which process is using port 3000?" It works the way Spotlight does for files: one key, one question, an answer, and the window out of the way again.

## Opening the Claude Code floating window

To ask Claude Code from any app, turn the shortcut on. It's off until you do. In Settings ▸ General ▸ Quick chat, switch it on and pick one of five: ⌥Space (the default), ⌃⌥Space, ⌥⇧Space, ⌃Space or ⌘Space.

cl_audit checks your choice against macOS's own Space shortcuts (Spotlight, Finder's search and the input sources, as your Mac has them set) and against the Claude app's Quick Entry. If one clashes, a line says which. If another app already holds the keys, it says that instead. The shortcut is registered the way macOS's own app shortcuts are, so there's no Accessibility permission to give.

The shortcut chats on one profile, the first by default. The same card sets which. For any other profile, use its menu: in a profile's menu bar icon menu and its Dock icon menu, **Quick chat** is the first action under the numbers (below the switch items when the profile has other accounts), and it chats on that profile. The menu bar icon is optional and off by default; [the Claude usage menu bar page](/use-cases/claude-usage-menu-bar-mac/) shows what's in that menu.

What opens is a bar that says "Ask anything".

![Quick chat's bar with a question typed in](/img/guides/quick-chat-bar.webp "Quick chat's bar, drawn by cl_audit from sample data: a question typed, Haiku 5.5, Thinking off, and the profile Main with its week at 62%. Sample data.")

It never brings cl_audit or the Claude app forward. Esc or ⌘W hides it and keeps the chat, and opening it again brings it back as it was.

## Asking, following up, starting over

Return sends. Shift-Return adds a line. The answer streams in as Markdown, and code blocks have a Copy button. Under each answer are Copy, Ask again and a line like "answered by Haiku 5.5 · 2.4 s".

The first message turns the bar into a chat window that stays floating, on every Space, until Esc hides it. Follow-ups go on in the same Claude Code session, so Claude has the earlier turns. The pencil (⌘N) starts a new chat and shrinks the window back to the bar. Stop ends an answer where it is.

![Quick chat's window with an answer and a follow-up](/img/guides/quick-chat-window.webp "Quick chat's window, drawn by cl_audit from sample data: an answer by Haiku 5.5, a follow-up answered by Sonnet 5.5 with thinking high, and the pickers. Sample data.")

If Claude Code stops in the middle of an answer, the window keeps what arrived, says what happened and offers Retry. If Claude Code isn't installed, or the profile isn't signed in, it says that too, with a way to fix it.

## Model and thinking

Two pickers sit under the field. **Model** is Haiku by default, or Sonnet, Opus or Profile's default, which is whatever that profile uses in Claude Code. **Thinking** is off by default, or Low, Medium, High or Extra. The pickers describe themselves: Haiku is "fast, light on the week", Opus is "the most capable; uses the week fastest", and Extra "thinks longest; uses the week fastest".

A pick holds for that chat. New chat goes back to the defaults you set in General ▸ Quick chat. With thinking on, "Thought for 5 s" sits above the answer, and it opens to show the thinking when Claude Code passes it on. For Haiku 5.5 it can only report that it thought. A model may also answer at once when it judges the question needs no thinking.

## The account line, and a full limit

The account line shows the profile, the address of its account in use (masked unless Privacy shows addresses) and that account's week, in the level colours. In the bar it's the profile and the week. Because Claude Code answers on the account the profile has in use, a chat follows a switch.

When a limit is full, the window says so before you send. It then offers **Switch account…** for the standby account with the most room, through the Switch page, and what you typed goes once the switch is done. The accounts are your own, you start every switch, and each account's limits stay its own: cl_audit doesn't pool them, and Quick chat is no way past a limit. [The Claude account switcher page](/use-cases/switch-claude-accounts/) has the details of a switch.

## What it sends, keeps and can't do

What you type goes to Anthropic through Claude Code, as any Claude Code prompt does. There's no cl_audit server in between.

cl_audit starts one `claude` process per chat, in print mode, on the profile's own folder (`CLAUDE_CONFIG_DIR`). It passes `--tools ""`, `--strict-mcp-config`, `--setting-sources ""` and `--disable-slash-commands`, which is why there are no tools, MCP servers, settings files or slash commands. With `--system-prompt` it puts a short prompt of its own in place of Claude Code's usual one: you're in a small floating chat window, answer briefly, use Markdown, you have no tools. `claude` gets only an allowlisted part of the Mac's environment (home, user, language, proxies and certificates), never a key, a token or another provider's settings, and Claude Code's non-essential traffic (telemetry, error reports, update checks) is off.

So it can't read a file, run a command or look at your screen. When a question needs Claude to see your project, that's Claude Code in a terminal.

Claude Code keeps each chat in that profile's folder, under `projects/<the work folder's name>/`. By Anthropic's data usage page, Claude Code deletes local transcripts after [30 days by default](https://code.claude.com/docs/en/data-usage), and `cleanupPeriodDays` changes that. Settings ▸ General ▸ Quick chat lists each profile's chats with their count and size, and Show in Finder opens them.

**Counting** is off by default. Quick chats then stay out of the profile's Sessions card and its backups; [backing up Claude Code sessions](/blog/back-up-claude-code-sessions/) covers what those hold. **Remove quick chat data…** moves every profile's quick chats, the work folders and the settings to the Trash once the chat closes, and the shortcut turns off. A profile's other sessions stay as they are.

## Your own Claude Code, your own sign-in

Quick chat doesn't bring a Claude Code of its own. It starts the `claude` you installed, and cl_audit doesn't change that program; what it adds are the command-line options and the short system prompt described above. The profile was signed in through Claude Code's own sign-in, cl_audit passes `claude` no key or token, and a quick chat answers on the account the profile has in use. So it counts against that account's limits like any Claude Code use. For Pro, Max and Ultra, Anthropic's help page says limits are shared across Claude and Claude Code.

Anthropic's [legal and compliance page for Claude Code](https://code.claude.com/docs/en/legal-and-compliance) says your use of Claude Code is under Anthropic's terms: the Consumer Terms for Free, Pro, Max and Ultra, the Commercial Terms for Team, Enterprise and the API. It also says the advertised limits for Pro, Max and Ultra assume ordinary, individual usage, and that signing in to a Claude account goes through Anthropic's own flow. Your quick chats fall under those terms like the rest of your Claude Code use.

## When Claude's own Quick Entry is the better pick

The Claude app has its own shortcut, Quick Entry. [Anthropic's help article](https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac), read on 8 November 2026, describes it. The two do different jobs.

| | Claude's Quick Entry | cl_audit's Quick chat |
|---|---|---|
| Opens with | Double-tap Option by default, or Option + Space or a custom shortcut | A shortcut you turn on (five choices), or a profile's menu |
| What you can attach | A screenshot you drag, or an application window | Typed text |
| Voice | Dictation on Caps Lock, off by default (macOS 14 or later) | None |
| Where the chat goes | A new chat in the Claude app; New chat lists your five most recent conversations | One Claude Code session per chat, in the profile's folder |
| Plans | Every Claude plan, Free included | Whatever account the profile's Claude Code is signed in to |
| What it needs | The Claude app running, macOS 12 or later, and permissions for Accessibility (plus Screen Recording for screenshots and Speech Recognition for voice) | cl_audit's background agent, Apple silicon, macOS 13 or later; no Accessibility permission |

Pick Quick Entry when you want to show Claude something on screen, dictate, keep the chat in the Claude app, or you don't use Claude Code at all. It also needs no extra app if you already run the Claude app.

Pick Quick chat when the question is a Claude Code one, you keep more than one profile and want to see which account will answer and how much of its week is left, or you'd rather not grant Accessibility. Both can run: cl_audit checks its shortcut against Quick Entry's, so give them different keys.

## Who it's for

The floating window suits people who live in Claude Code, especially with several profiles or accounts, and want a side question to cost one key press instead of a new terminal tab. The account line also tells you which account a question will use before you send it.

You may not need it if you rarely ask side questions, if you want screenshots or voice (Quick Entry), or if your questions are about a project (a terminal session). It works with one profile and one account too; the account line then just shows that account's week.

cl_audit is free, needs a Mac with Apple silicon, macOS 13 or later and Claude Code signed in, and [the install page](/install/) has the download and the steps. The [FAQ](/faq/) has the short version of Quick chat.
