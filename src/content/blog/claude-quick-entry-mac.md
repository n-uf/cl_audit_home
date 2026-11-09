---
draft: true
title: "Claude Quick Entry: shortcut, screenshots and voice on Mac"
description: "Claude Quick Entry opens over any Mac app with a double-tap of Option. How to set it up, attach screenshots, change the shortcut and fix clashes."
h1: "Claude Quick Entry on Mac: open it, change the shortcut or turn it off"
mainKeyword: "claude quick entry"
kind: how-to
published: 2026-12-08
updated: 2026-12-08
author: n-uf
takeaways:
  - "Claude Quick Entry is part of the Claude app on Mac. By default a double-tap of Option opens a text box over whatever app you're in; Option + Space or a custom shortcut works too."
  - "It can attach a screenshot or an app window to your message, and Caps Lock can start voice dictation, which is off until you turn it on."
  - "It needs the Claude app running (it can stay in the background) and the Accessibility permission. Anthropic lists macOS 12 for Quick Entry but macOS 13 for the app itself, and voice needs macOS 14."
  - "Option + Space is also the default for ChatGPT's Mac app, and Command-Space opens Spotlight. If two apps want one shortcut, change one of them in its own settings."
  - "If you work in Claude Code, cl_audit's Quick chat is a separate floating chat that runs Claude Code. Its shortcut is off until you turn it on."
faq:
  - q: "How do I open Claude Quick Entry on a Mac?"
    a: "Double-tap the Option key from any app, once Claude Desktop is running and the shortcut is on. Type your message and press Enter or click the arrow. In Settings ▸ Desktop app you can switch to Option + Space or a custom shortcut."
  - q: "Do I need a paid plan or the Claude window open for Quick Entry?"
    a: "No. Anthropic's help page says Quick Entry is available on Free, Pro, Max, Ultra, Team and Enterprise. Claude Desktop does have to be installed and running, but it can sit in the background with no window showing."
  - q: "Does Claude Quick Entry work on Windows?"
    a: "Anthropic's Quick Entry page says no: it's for macOS, and Windows users get Claude Desktop without the Quick Entry features. Anthropic's install page does mention Quick Entry in its notes for the Linux beta, so the pages don't cover every platform the same way."
  - q: "How do I turn off Claude's Option shortcut on Mac?"
    a: "Open Claude Desktop and go to Settings ▸ Desktop app (Settings ▸ System, under This computer, in the older layout). Anthropic's page says you can turn off the quick access shortcut, the voice shortcut or both there. The voice shortcut's menu has a Disable the shortcut entirely choice."
  - q: "Does Claude Quick Entry clash with ChatGPT's Option + Space?"
    a: "Only if you pick Option + Space in Claude. OpenAI's help page gives ⌥+Space as the default for the ChatGPT Mac app's Chat Bar, while Claude's default is a double-tap of Option. If both apps want one combination, change one of them: both pages say the shortcut can be changed."
sources:
  - title: "Claude Help Center: Use quick entry with Claude Desktop on Mac"
    url: "https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac"
    checked: 2026-11-08
    supports: "What quick entry is and its three features (double-tap Option, screenshots and application windows, voice with Caps Lock); available on Free, Pro, Max, Ultra, Team and Enterprise; macOS 12 or later for quick entry, macOS 14 or later for voice dictation; Claude Desktop installed and running, possibly in the background; the setup prompt with Turn on shortcut and Continue; the voice shortcut off by default because it takes over Caps Lock; Settings > Desktop app (or Settings > System, under This computer, in the older layout); the quick access shortcut choices Double-tap Option (default), Option + Space and a custom keyboard shortcut; the voice shortcut choices Caps Lock, a custom shortcut or Disable the shortcut entirely; the text box starts a new chat, and New chat shows the five most recent conversations; permissions Screen recording, Accessibility and Speech recognition in System Settings > Privacy & Security; dictated speech is sent as text; Windows users get Claude Desktop without the quick entry features; turning off either shortcut or both; the advice to use Option + Space or a custom shortcut when shortcuts conflict. Marked 'Updated this week' when read on 8 November 2026."
    quote: "Double-tap the Option key to open Claude from any app."
  - title: "Claude Help Center: Install Claude Desktop"
    url: "https://support.claude.com/en/articles/10065433-install-claude-desktop"
    checked: 2026-11-08
    supports: "Claude Desktop's system requirement for Mac is macOS 13 (Ventura) or higher; Claude Desktop is available on macOS, Windows and Linux (beta); under the Linux limitations, Quick Entry, the global hotkey, works on X11 and relies on the desktop's GlobalShortcuts portal on native Wayland."
    quote: "macOS: macOS 13 (Ventura) or higher"
  - title: "OpenAI Help Center: How to launch the Chat Bar"
    url: "https://help.openai.com/en/articles/9295241-how-to-launch-the-chat-bar"
    checked: 2026-11-08
    supports: "For the ChatGPT macOS app the Chat Bar opens by default with ⌥+Space, and the shortcut can be changed in the app's Settings. Read in a browser by the writer on 8 November 2026 (the page refuses scripted fetches)."
    quote: "By default, to open the Chat Bar using your keyboard, press ⌥+Space"
  - title: "Apple Support: Spotlight keyboard shortcuts on Mac"
    url: "https://support.apple.com/guide/mac-help/spotlight-keyboard-shortcuts-mh26783/mac"
    checked: 2026-11-08
    supports: "Command-Space bar opens or closes the Spotlight window; Option-Command-Space bar opens a Finder window with the search field selected."
    quote: "Open or close the Spotlight window"
  - title: "User report on Claude Code's issue tracker: #89741, \"[BUG] Quick Entry \"double-tap Option\" fires while typing accented characters (macOS, international layouts)\" (closed as not planned on 29 Aug 2026; opened 26 Aug 2026)"
    url: "https://github.com/anthropics/claude-code/issues/89741"
    checked: 2026-11-08
    supports: "A user's report, not an Anthropic statement: on Mac layouts where Option composes accented letters (the reporter names Polish, German, Spanish and French), typing two Option-composed letters in quick succession opened the Quick Entry overlay mid-word, on Claude Desktop 1.37937.1. The tracker's bot closed it as not about Claude Code (it's a Claude Desktop report) and labelled it invalid; that is not a fix."
    quote: "the Quick Entry overlay opens mid-word and steals focus"
  - title: "User report on Claude Code's issue tracker: #106748, \"[BUG] macOS: Quick Entry message silently dropped on Enter — overlay closes, no chat created, no error shown\" (closed as not planned on 5 Nov 2026; opened 2 Nov 2026)"
    url: "https://github.com/anthropics/claude-code/issues/106748"
    checked: 2026-11-08
    supports: "A user's report, not an Anthropic statement: on macOS 15.7.7 with Claude Desktop 4.4212.0, pressing Enter in Quick Entry closed the overlay without creating a chat; the reporter expected a new chat with the main window in front. The tracker's bot closed it as not about Claude Code and labelled it invalid; that is not a fix."
    quote: "The overlay closes and nothing else happens"
  - title: "Claude Code docs: Legal and compliance"
    url: "https://code.claude.com/docs/en/legal-and-compliance"
    checked: 2026-11-08
    supports: "Claude Code use is subject to Anthropic's terms and Usage Policy; advertised usage limits for Pro, Max and Ultra assume ordinary, individual usage of Claude Code and the Agent SDK; a product may say in plain text that it runs Claude Code, but may not use the Claude Code or Anthropic names in a product or feature name or suggest Anthropic built or endorses it."
    quote: "assume ordinary, individual usage of Claude Code and the Agent SDK"
  - title: "cl_audit README at tag v26.11.3 (Quick chat; Settings ▸ General ▸ Quick chat)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.3/README.md"
    checked: 2026-11-08
    supports: "A floating chat over any app, a bar first and then a window that stays floating on every Space until Esc hides it; Claude Code answers it on the account a profile has in use; the shortcut is off until turned on in General ▸ Quick chat, ⌥Space by default, checked against macOS's own Space shortcuts and the Claude app's Quick Entry, with a line saying which it clashes with, and needs no Accessibility permission; Quick chat is also in a profile's menu bar and Dock icon menus; one claude process per chat on the profile's own folder, with no tools, no MCP servers, no settings files and no slash commands. The code at the tag (Sources/QuickChatEngine.swift) starts the installed claude with its own flags and a short system prompt."
    quote: "It runs with no tools, no MCP servers, no settings files and no slash commands"
  - title: "cl_audit README on main (Where it goes)"
    url: "https://github.com/n-uf/cl_audit/blob/main/README.md"
    checked: 2026-11-08
    supports: "Nothing else goes over the network, with one exception: what you type in Quick chat goes to Anthropic through Claude Code, as any Claude Code prompt does."
    quote: "what you type in Quick chat goes to"
related:
  - /use-cases/claude-code-quick-chat/
  - /use-cases/claude-usage-menu-bar-mac/
  - /faq/
  - /install/
---

Claude Quick Entry is a small box that opens over any Mac app, so you can ask Claude something without switching to its window. By default you open it with a double-tap of the Option key; Option + Space or a shortcut of your own also works. It belongs to the Claude app on Mac (Claude Desktop), it's on every plan, and the app has to be running, though not in front. Below: turning it on, attaching a screenshot or a window, voice, changing or switching off the shortcut, clashes with ChatGPT and Spotlight, and what to check when it won't open.

The facts about Quick Entry here come from [Anthropic's Quick Entry help page](https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac), marked "Updated this week" when we read it on 8 November 2026, and from its install page. That page writes "quick entry" in lower case; the install page capitalises it, and so do we.

## What Claude Quick Entry does

Anthropic's page lists three things. Instant access: double-tap Option in any app. Visual context: attach a screenshot, or click an application window to attach what it shows. Voice input: press Caps Lock and dictate, with live transcription.

The double-tap opens a text box. You type, press Enter or click the arrow, and that starts a new chat with Claude. Click **New chat** to see your five most recent conversations.

So the floating part is the box you type in. Anthropic's page doesn't say where the answer appears after you send. It also doesn't say how a Quick Entry chat counts toward your plan; for the limits in general, see [how Claude's usage limits work](/blog/claude-usage-limits/).

## What you need

| | What Anthropic's pages say |
|---|---|
| Plan | Free, Pro, Max, Ultra, Team and Enterprise |
| macOS | macOS 13 (Ventura) or later for Claude Desktop itself; the Quick Entry page lists 12 or later for Quick Entry, and 14 or later for voice dictation |
| The app | Claude Desktop installed and running; it can be in the background, and its window doesn't have to be visible |
| Permissions | In System Settings ▸ Privacy & Security: Screen recording (screenshots and windows), Accessibility (Quick Entry itself), Speech recognition (voice, macOS 14 or later) |
| Windows | Not available, says the Quick Entry page; Windows users get Claude Desktop without it |

The macOS row needs a word. The Quick Entry page says 12, but [Anthropic's install page](https://support.claude.com/en/articles/10065433-install-claude-desktop) asks for macOS 13 (Ventura) or later for the app, and Quick Entry comes with the app. In practice that means macOS 13 or later, or 14 if you want voice.

Outside the Mac, Anthropic's pages don't all say the same thing. The Quick Entry page says Windows doesn't get it. The install page, in its notes on the Linux beta, says Quick Entry, the global hotkey, works on X11 and, on native Wayland, relies on the desktop's GlobalShortcuts portal. This article covers the Mac.

## Turn on Quick Entry

The first time you open the updated Claude Desktop, a prompt offers the quick entry shortcuts.

1. Tick **Turn on shortcut** in the quick entry prompt.
2. Click **Continue**.
3. Double-tap the Option key to test it.

After that, you manage it in **Settings ▸ Desktop app** (**Settings ▸ System**, under **This computer**, in the older layout). If you closed the prompt, that's the same place to go.

Then double-tap Option in any app, type, and send. The permissions in the table are in System Settings ▸ Privacy & Security, where Anthropic's page says you can review or change them.

## Claude Quick Entry screenshot and window sharing

Both start from the same double-tap.

- **A screenshot:** double-tap Option. A "Drag to take a screenshot" prompt appears by your cursor. Drag over the area you want, and it's attached to your message.
- **A window:** double-tap Option, then click an application window to attach its contents. Add your question and send.

Both need the Screen recording permission. Anthropic's examples include sending an error message or a whole app window for debugging, and capturing a page while you browse to ask about it.

## Voice with Caps Lock

The voice shortcut is off by default because it takes over your Caps Lock key. To use it, tick **Turn on shortcut** in the voice dictation prompt and click **Continue**. Then:

1. Press Caps Lock once and speak. Your words appear as you say them.
2. Press Caps Lock again when you're done.
3. Check the text, then click the arrow to send it.

Voice needs macOS 14 or later and the Speech recognition permission. Anthropic's page says your speech is turned into text, and that text goes to Claude as part of your message, like anything you type.

## Claude Quick Entry shortcut: change it or turn it off

It's one settings page:

1. Open Claude Desktop and go to **Settings ▸ Desktop app** (or **Settings ▸ System**, under **This computer**).
2. Next to **Quick access shortcut**, choose **Double-tap Option** (the default), **Option + Space** or a custom keyboard shortcut.
3. In the menu next to **Voice shortcut**, choose Caps Lock, a custom shortcut, or **Disable the shortcut entirely**.

Anthropic's page says you can turn off the quick access shortcut, the voice shortcut or both at any time, in the same place. It names the off choice only for the voice shortcut, so for the Option double-tap, look on that same page.

## When the shortcut clashes with another app

Anthropic's advice for clashes is one line: use Option + Space or a custom shortcut your other apps don't use. Here's what that means for the common cases.

**ChatGPT.** OpenAI's help page for the ChatGPT Mac app says its Chat Bar opens with ⌥+Space by default, and that you can change that in its settings. That's the same combination as Claude's Option + Space choice. With Claude on its default double-tap of Option, the two don't share a key press, so ChatGPT's Option + Space and Claude's default can sit side by side. If you set Claude to Option + Space while ChatGPT has it too, neither company's page says which app wins. Give one of them a different shortcut.

**Spotlight.** [Apple's list of Spotlight shortcuts](https://support.apple.com/guide/mac-help/spotlight-keyboard-shortcuts-mh26783/mac) gives Command-Space bar to open or close Spotlight, and Option-Command-Space bar to open a Finder window with the search field selected. None of Claude's three quick access choices is either of these, but a custom shortcut could be. Quick Entry isn't part of Spotlight; it's its own box with its own shortcut.

**Caps Lock.** Turning on the voice shortcut takes over Caps Lock. If you use Caps Lock when typing, leave voice off, which is the default, or give it a custom shortcut.

**Typing with Option.** On keyboard layouts where Option makes accented letters, a user report (#89741, below) describes the double-tap firing mid-word. If that's you, Option + Space or a custom shortcut avoids the double-tap.

## If Claude Quick Entry doesn't open

Anthropic's page has no troubleshooting list, but its requirements and FAQ give you five things to check:

1. **Is Claude Desktop running?** It has to be, even with no window showing.
2. **Is the shortcut on?** Check Settings ▸ Desktop app.
3. **Are the permissions given?** Accessibility for Quick Entry itself, Screen recording for screenshots and windows, in System Settings ▸ Privacy & Security.
4. **Is your macOS recent enough?** macOS 13 for the app, 14 for voice.
5. **Does another app use the same shortcut?** Switch to Option + Space or a custom one, as the page suggests.

Two user reports on Claude Code's issue tracker describe Quick Entry problems on a Mac. They're reports, not Anthropic statements. The tracker's bot closed both as not about Claude Code, since they concern the Claude app; that isn't a fix.

- **#89741**, "[BUG] Quick Entry "double-tap Option" fires while typing accented characters (macOS, international layouts)": closed as not planned on 29 Aug 2026 (opened 26 Aug). The overlay opened while the reporter typed words with two Option-made letters in a row.
- **#106748**, "[BUG] macOS: Quick Entry message silently dropped on Enter — overlay closes, no chat created, no error shown": closed as not planned on 5 Nov 2026 (opened 2 Nov). The reporter says Enter closed the overlay and no chat appeared.

## If you work in Claude Code

Quick Entry is a chat with Claude in the Claude app. If most of your day is in Claude Code, our tool has a separate feature: cl_audit's Quick chat, a floating chat that runs Claude Code. cl_audit is a free, source-available Mac app that shows each Claude profile's 5-hour and weekly limits. It's an independent tool, not affiliated with Anthropic.

![cl_audit's Quick chat bar with a question typed](/img/guides/quick-chat-bar.webp "cl_audit's Quick chat bar, drawn by cl_audit from sample data: a question typed, Haiku 5.5, Thinking off, and the profile Main with its week at 62%. Sample data.")

How it works:

- It's a bar first. The first message opens a chat window that stays floating on every Space until Esc hides it.
- The shortcut is off until you turn it on in Settings ▸ General ▸ Quick chat. It's ⌥Space by default, and cl_audit checks your pick against macOS's own Space shortcuts and the Claude app's Quick Entry, with a line saying which it clashes with. Quick chat is also in a profile's [menu bar and Dock icon menus](/use-cases/claude-usage-menu-bar-mac/).
- It runs the Claude Code you installed, as installed, on the account the profile has in use, with the Claude Code sign-in that profile already has (Anthropic's own sign-in). cl_audit doesn't change Claude Code itself; it starts it with its own options and a short system prompt of its own, which asks for brief answers. Each chat counts against that account's limits like any Claude Code use, and what you type goes to Anthropic through Claude Code.
- It starts Claude Code with no tools, no MCP servers, no settings files and no slash commands. So it can't read your files, run commands or see your screen: it's a chat, not an agent.

Using Claude Code this way is under Anthropic's terms, like any other use. Anthropic's [legal and compliance page for Claude Code](https://code.claude.com/docs/en/legal-and-compliance) also says the advertised limits of Pro, Max and Ultra plans assume ordinary, individual use.

Quick Entry is the better pick for screenshots, app windows, voice, and your Claude chats and their history in the Claude app; it's on every plan and needs no extra app. cl_audit's Quick chat fits if you live in Claude Code and want a floating window for it; the [guide to cl_audit's floating Claude Code window](/use-cases/claude-code-quick-chat/) covers it in full, and the [cl_audit FAQ](/faq/) answers the short version. cl_audit needs a Mac with Apple silicon, macOS 13 or later and Claude Code, and you can [download cl_audit](/install/) from its install page.
