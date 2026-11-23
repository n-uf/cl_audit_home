---
title: "Claude usage menu bar icons for Mac | cl_audit"
description: "Claude usage in the Mac menu bar: cl_audit can give each profile its own icon, style and colour. It's off by default; the Dock icons stay the main way."
h1: "A Claude usage menu bar icon for each profile"
mainKeyword: "claude usage menu bar"
kind: use-case
published: 2026-11-05
updated: 2026-11-22
author: n-uf
order: 5
takeaways:
  - "cl_audit can give each Claude profile its own icon in the Mac menu bar. It's off by default: you switch it on per profile in profile settings ▸ Menu bar."
  - "Each icon has six styles (two bars, bars + number, ring, ring + number, number, two numbers) and four colour choices: levels, System, Accent or the profile's colour."
  - "A click opens the profile's own menu: its limits and reset times, Claude window ›, Quick chat (which opens cl_quick), Refresh now, Dashboard, Profile settings… and Hide from the menu bar."
  - "cl_audit's background agent draws the icons, so they work with or without Dock icons. The Dock icons are still the main way cl_audit shows usage."
faq:
  - q: "Can I see my Claude usage in the Mac menu bar?"
    a: "Yes, with cl_audit. Switch on In the menu bar in a profile's settings and that profile gets its own icon with its 5-hour and weekly limits. It's off by default, because cl_audit mainly shows usage in the Dock."
  - q: "Does each Claude account get its own menu bar icon?"
    a: "Each profile does. Two profiles on the same account each have their own icon, with the same numbers. A profile with several accounts still has one icon, showing the account in use. Style, colours and label are set per profile, and a short label such as WORK or MAIN before an icon tells them apart."
  - q: "Do I need the Dock icons to use the menu bar icons?"
    a: "No. cl_audit's background agent draws the menu bar icon, not the Dock icon app, so it works with the Dock icon on or off. A usage only profile, with Usage in the Dock and Claude window both off, can still have one."
  - q: "What does the menu bar icon show when a limit is full?"
    a: "You pick it under When full on the Menu bar card: the countdown beside the icon (for example 1h 42m), or crimson only. With the System colour a full limit shows by its countdown, since System draws the icon in the menu bar's own colour."
  - q: "Does it show Claude Code usage in the menu bar?"
    a: "It shows the limits Anthropic reports for the profile, read with that profile's Claude Code sign-in. Anthropic's help page says Claude and Claude Code count against the same limits, so one icon covers both."
sources:
  - title: "cl_audit README at v26.11.88 (n-uf)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/README.md"
    checked: 2026-11-23
  - title: "cl_audit CHANGELOG, 26.11.0 (2026-11-05)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
  - title: "cl_audit README at v26.11.88 (n-uf): crimson for a full limit"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/README.md"
    checked: 2026-11-23
    supports: "At v26.11.88: When full has two choices, the countdown beside the icon or crimson only; a full limit is crimson in every colour choice except System, where the countdown shows it."
    quote: "A full limit is crimson, except in System, where its countdown shows it."
  - title: "cl_audit source at v26.11.88, Sources/MenuBar.swift (the profile's menu)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/Sources/MenuBar.swift#L357-L364"
    checked: 2026-11-23
    supports: "Under the profile's row, the menu bar menu holds the Dock menu's rows without the profile row: the accounts with the problem line, the Claude window and the actions, then Hide from the menu bar. There is no Switch account submenu and no Switch to … item at the top."
    quote: "the accounts with the problem line"
  - title: "cl_audit source at v26.11.88, Sources/DockMenu.swift (the menu bar menu's accounts)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/Sources/DockMenu.swift#L108-L146"
    checked: 2026-11-23
    supports: "The menu bar menu's accounts: the one in use ticked, in the split Terminal's account and the sign-in to the app's, each standby account by address, then Sign in to another account…; a standby account's row opens the Switch page with it picked, and the account in use's row does nothing (Checks/docktile/main.swift at the tag checks the rows)."
    quote: "each standby account, Sign in to another account…"
  - title: "cl_audit CHANGELOG, 26.11.33"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
    supports: "26.11.33: menus no longer say “· in use”; the account in use is ticked."
    quote: "the account in use is ticked"
  - title: "cl_audit CHANGELOG, 26.11.32"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
    supports: "26.11.32: the menu bar icon and the bars at the top of its menu turn grey when the usage is old (three missed reads, 30 minutes at the usual setting), the same moment the Dock icon does; the green lamp in the menu bar menu goes off when the sign-in has run out, is gone, can't be read, or is on another account than the folder's or on another profile's."
    quote: "now turn grey when the usage is old"
  - title: "cl_audit CHANGELOG, 26.11.1 (2026-11-07)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
    supports: "crimson from 95 %, a full limit included, in the menu bar icon and its menu"
    quote: "a vivid crimson (#eb445b) from 95 % up, a full limit included"
  - title: "cl_audit README at v26.11.88 (n-uf): Quick chat, in a profile's menu bar and Dock icon menus"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/README.md#quick-chat"
    checked: 2026-11-23
    supports: "cl_audit has no chat of its own: Quick chat in a profile's menu bar or Dock icon menu opens cl_quick on that profile's Claude Code folder; without cl_quick on the Mac the item reads Get cl_quick… and opens its site."
    quote: "Quick chat in a profile's menu bar or Dock icon menu opens cl_quick on that profile's Claude Code folder."
  - title: "cl_audit CHANGELOG, 26.11.88 (the quick chat moves to cl_quick; one account in several profiles; the split)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
    supports: "26.11.88: the quick chat now lives in cl_quick and cl_audit has none of its own (Quick chat opens cl_quick on that profile's Claude Code folder, and reads Get cl_quick… without it); one account can be in several profiles, and every profile on a shared account shows that account's numbers; with the Claude app and Terminal on different accounts, the menu bar row names Terminal's account, then says \"Claude window on another account ›\" in amber under the numbers."
    quote: "Every profile on a shared account shows that account's numbers."
  - title: "cl_audit source at v26.11.88, Sources/DockMenu.swift (the Dock menus)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/Sources/DockMenu.swift#L1-L14"
    checked: 2026-11-23
    supports: "Both Dock menus (the Dock icon app's and the tile plug-in's) hold only the profile and its light, Claude window ▸ (Open while it's closed; Show, Quit), Quick chat, Refresh now, Dashboard and Profile settings…; the menu bar icon's menu draws its own views, so under its row it also lists the accounts (cl_audit commit 3844813, 23 November 2026)."
    quote: "are short, since the Dock icon's own panel"
  - title: "cl_audit source at v26.11.88, Sources/MenuBar.swift (the split's row)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/Sources/MenuBar.swift#L429-L436"
    checked: 2026-11-23
    supports: "In the split by hand the menu's account line is Terminal's account by its short name followed by \" · Terminal\"; the amber link comes under the numbers."
    quote: "Text(inUse + (splitCode != nil ? \" · Terminal\" : \"\"))"
  - title: "cl_quick README at v26.11.1 (n-uf/cl_quick): With cl_audit"
    url: "https://github.com/n-uf/cl_quick/blob/v26.11.1/README.md#with-cl_audit"
    checked: 2026-11-23
    supports: "cl_quick opens a quick chat on the profile that uses the folder cl_audit hands it (cl-quick://chat?folder=…); it runs with or without cl_audit; it is a floating Claude chat for the Mac, answered by your own Claude Code on the profile's account in use."
    quote: "the bar opens on the profile that uses that folder"
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-05
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-05
  - title: "Claude Code docs: Commands"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-05
  - title: "ClaudeUsageBar README (Artzainnn/ClaudeUsageBar)"
    url: "https://github.com/Artzainnn/ClaudeUsageBar"
    checked: 2026-11-05
  - title: "Claude Usage Tracker README (hamed-elfayome/Claude-Usage-Tracker)"
    url: "https://github.com/hamed-elfayome/Claude-Usage-Tracker"
    checked: 2026-11-05
  - title: "Usagebar home page"
    url: "https://usagebar.com"
    checked: 2026-11-05
  - title: "CodexBar README (steipete/CodexBar)"
    url: "https://github.com/steipete/CodexBar"
    checked: 2026-11-05
  - title: "ClaudeBar README (tddworks/ClaudeBar)"
    url: "https://github.com/tddworks/ClaudeBar"
    checked: 2026-11-05
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
  - title: "cl_audit CHANGELOG, 26.11.76"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-23
    supports: "26.11.76: the Dock draws each profile's usage itself, so a Dock icon has no running dot and no ⌘-Tab entry until you click it; if the Dock can't draw it (Dock Tiles turned off under Login Items & Extensions in System Settings, say), the Dock icon app runs as before, about two minutes after cl_audit starts, until the Dock draws it again; after an update, or for a new profile, a Dock icon app may start once for about a minute so the Dock can use it."
    quote: "the Dock now draws each profile's usage itself"
related:
  - /
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-usage-limit-alerts/
  - /settings/
---

cl_audit can show your Claude usage in the Mac menu bar: one icon per profile, each with its own style and colour, showing that profile's 5-hour and weekly limits. The icons are off by default. You switch one on in a profile's settings, under Menu bar, and the Dock icons stay the main way cl_audit shows usage. cl_audit is an independent tool, not affiliated with Anthropic.

If your Dock is full, or you'd rather glance up than down, the menu bar is there. If you like the Dock icons, leave it off.

## What each icon shows

Each icon shows one profile's 5-hour limit and weekly limit. A **profile** is one Claude setup in cl_audit: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon. cl_audit's background agent reads the figures from Anthropic for that profile, with its Claude Code sign-in. Anthropic's help page says the 5-hour period starts with your first message and resets in full five hours later, and that weekly limits reset at a fixed time each week.

A plan without a 5-hour limit (Ultra) shows the week alone, with no empty 5-hour row.

There's no separate icon for Claude Code. Anthropic's Claude Code help page says all activity in Claude and Claude Code counts against the same limits, so a profile's icon moves when you chat in its Claude window and when you run Claude Code under its sign-in. So the same icon is your Claude Code usage in the menu bar too.

## How to turn it on

1. Open cl_audit and go to Settings.
2. Pick a profile along the top.
3. On the Menu bar card, switch on **In the menu bar**.

The switch pulses until the agent has put the icon up. Switched off, the card folds back to that one row and says "no icon". The agent reads the profile's usage either way.

![The Menu bar card in cl_audit's demo settings](/img/guides/menubar-settings.webp "The Menu bar card for one profile in the site's demo: style and colour tiles, the label, When full, and the preview strip. Sample data.")

With the icon on, the card shows its look: style, colours, label and what shows when a limit is full. A strip at the foot of the card previews the icon from "no numbers" to "full", drawn the way your menu bar looks now. You can try the card on the [demo settings page](/settings/), where the site's own top bar draws the icons you switch on, with sample data.

## Six styles and four colours

You pick the style from tiles, each drawn the way your menu bar would draw it.

| Style | What it draws |
|---|---|
| Two bars | The 5-hour limit over the weekly limit |
| Bars + number | The two bars with a number |
| Ring | The week on the outside, the 5-hour limit inside |
| Ring + number | The ring with a number |
| Number | The fuller of the two limits |
| Two numbers | Both limits as numbers |

The colours are a second row of tiles:

- **Levels:** the level colours, which change as the limits fill up.
- **System:** the menu bar's own colour, drawn the way macOS draws its own icons (white or black, dimmed on an inactive screen).
- **Accent:** your Mac's accent colour. Change it in macOS and the icon follows.
- **Profile colour:** the colour you gave the profile, the one the launcher and dashboard use.

System makes the icon look like the rest of your menu bar. Levels or the profile colour let you tell two icons apart without reading them.

The **Label** is either none or the profile's label before its icon: up to six letters, such as MAIN or WORK. It's the same label printed on the profile's Dock icon.

## When a limit is full

At 100%, what you want to know is when the profile works again. **When full** has two choices: the countdown beside the icon ("1h 42m"), or crimson only.

A full limit turns crimson in every colour choice except System, where the countdown shows it instead. At the reset, the agent reads that profile again right away.

For a notification on top of that, see how the [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) work. The agent sends them whether or not a profile has a menu bar icon.

## The menu behind each icon

A click opens that profile's own menu:

- its limits and when each resets, Fable's weekly limit included when the plan has one;
- usage credits, while the profile is spending them;
- while the Claude app and Terminal are signed in to different accounts, Terminal's account by its short name and " · Terminal" ("ultra-3 · Terminal", or "hidden address · Terminal" while addresses are hidden), then that account's numbers, and under them an amber **Claude window on another account ›** line that opens Settings ▸ Accounts;
- when the figures were read. When the usage is old (three missed reads, 30 minutes at the usual setting), the icon and the bars at the top of the menu turn grey, the same moment the Dock icon does;
- **Claude window ›**, with **Open** while the window is closed, and **Show** and **Quit** while it's open;
- **Quick chat**, which opens [cl_quick](https://cl-quick.n-uf.com/) on that profile's Claude Code folder (without cl_quick on the Mac it reads **Get cl_quick…**);
- **Refresh now**, **Dashboard** and **Profile settings…**;
- **Hide from the menu bar**, which takes that profile's icon away.

In the menu bar, in the profile's settings, puts it back.

A profile with more than one account shows the account in use under the profile's name, with a lit green lamp and no label ("ultra-1"). Below that row the menu lists the profile's accounts directly, with no submenu: the account in use ticked ("ultra-1@example.com"), then each other account by address ("ultra-2@example.com"), then **Sign in to another account…**. The lamp goes off when the sign-in has run out, is gone, can't be read, or is on another account or another profile. A standby account is signed out, so the menu shows no numbers for it. Picking a standby account only opens cl_audit's Switch page with it picked; nothing switches until you start the switch there. {{live:/use-cases/switch-claude-accounts/}}The [Claude account switcher](/use-cases/switch-claude-accounts/) page covers what a switch moves and how to undo one.{{/live}}

{{experimental: switch}}

## One icon per profile

With [several Claude accounts on one Mac](/use-cases/multiple-claude-accounts/), you switch on only the icons you want. A work seat can sit in the menu bar all day while a personal plan stays in the Dock.

The icons line up in your profile order. Drag a profile's tile along the top of Settings, or its card on the dashboard, and they follow. You can also **⌘-drag** an icon along the menu bar yourself; macOS remembers where you put it, until you next change the profile order.

Give each one a different label or colour. Two identical rings are hard to tell apart at a glance.

## With or without Dock icons

The agent draws the menu bar icons. The Dock draws the usage on each Dock icon itself, so a Dock icon has no running dot and no ⌘-Tab entry until you click it. After an update, or for a new profile, a Dock icon app may start once for about a minute so the Dock can use it. A profile can have a menu bar icon and no Dock icon, a Dock icon and no menu bar icon, or both. Quitting a Dock icon never stops the usage or the alerts.

If the Dock can't draw the usage (Dock Tiles turned off in System Settings ▸ General ▸ Login Items & Extensions, say), the Dock icon app runs instead, about two minutes after cl_audit starts, until the Dock can draw it again.

You can also go menu bar only. Turn Usage in the Dock off for a profile (Settings ▸ the profile ▸ Dock icon) and its Dock icon quits and is unpinned, which restarts the Dock once. The profile keeps its usage, its alerts and its menu bar icon.

The menu bar suits you better when:

- **The Dock is full.** Every profile with Usage in the Dock adds an icon there; a menu bar icon takes no Dock space.
- **You want fewer apps in the Dock.** A usage only profile with a menu bar icon leaves the Dock as it was.
- **You work on a laptop screen.** With the Dock hidden or short of room, the top of the screen is where you already look.
- **You want a menu.** Refresh now and the Claude window are a click away.

The Dock icon shows more, though. It has its own click action, a details panel on press and hold, and when a limit is full it turns into the countdown with a crimson frame. If that's enough, leave the menu bar off. For the desktop or Notification Center there's also [the Claude usage widget for Mac](/use-cases/claude-usage-widget-mac/).

## How cl_audit differs from menu bar-only trackers

Several Claude usage menu bar apps exist, and some do things cl_audit doesn't. [Our round-up of Claude usage trackers for Mac](/blog/best-claude-usage-trackers-mac/) describes each from its own page. In short:

- **ClaudeUsageBar** shows a colour-coded spark icon with a percentage. You give it the Cookie value from a claude.ai session, and its README doesn't mention several accounts.
- **Claude Usage Tracker** has a Multi mode that shows all profiles in the menu bar at once, each with its own icon style, according to its README. That's the closest to cl_audit's icons.
- **Usagebar** shows the 5-hour and weekly percentages and, near a limit, the time until the next window opens. It costs $9 one-time, with a free tier.
- **CodexBar** and **ClaudeBar** cover many AI coding tools. CodexBar shows one status item per provider or a merged icon; ClaudeBar fits up to three providers in the menu bar.

cl_audit works differently in two ways. Each profile gets one icon of its own, set up in the profile's settings next to its Dock icon and Claude window. And one background agent reads every profile and draws every icon, so the menu bar is just one of the places the same figures show up.

If all you want is a menu bar tool, a dedicated menu bar app may be simpler. ClaudeUsageBar, for example, runs on macOS 12. cl_audit needs a Mac with Apple silicon and macOS 13 or later, with Claude Code signed in for each profile. An API-key profile has no limits to show.

## Check against Claude's own numbers

An icon only shows what Anthropic reports. Anthropic's help page says Settings ▸ Usage on claude.ai shows your current session and your next reset time, and Claude Code's docs say `/usage` shows plan usage limits. cl_audit's dashboard has the same figures for every profile; the [demo dashboard](/dashboard/) shows it with sample data.

## Getting it

More on the app itself is on the [Claude usage tracker for Mac](/) page. To try it, [download cl_audit](/install/), add a profile for each account and switch on In the menu bar for the ones you want at the top of the screen.
