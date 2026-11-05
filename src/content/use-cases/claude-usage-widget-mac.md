---
title: "Claude usage widget for Mac, for every profile | cl_audit"
description: "cl_audit's Claude usage widget puts every profile's 5-hour and weekly limits on your Mac desktop or in Notification Center, in three sizes."
h1: "A Claude usage widget for your Mac desktop"
mainKeyword: "claude usage widget"
kind: use-case
published: 2026-11-05
updated: 2026-11-05
author: n-uf
order: 4
takeaways:
  - "cl_audit has a macOS widget, Claude usage (macOS 14 or later), with every profile's 5-hour and weekly limits and when a full one is back."
  - "It comes in three sizes, goes on the desktop or in Notification Center from the widget gallery, and fits itself to the size and the number of profiles."
  - "Its look is set in Settings ▸ General ▸ Widget: Limits as (Glow, Rings, Numbers, Segments, Pace) and Look (System, Std, Black, Silver)."
  - "It lists the profiles in your profile order, with a third row for Fable's limit on the profiles whose settings show it."
  - "The widget only reads what cl_audit saves: no network and no Keychain."
faq:
  - q: "Is there a Claude usage widget for Mac?"
    a: "Yes, in cl_audit, our own free Mac app. Once it's installed, \"Claude usage\" is in the macOS widget gallery (macOS 14 or later) and shows each profile's 5-hour and weekly limits."
  - q: "How do I add the Claude usage widget?"
    a: "Click the date in the menu bar, choose Edit Widgets and pick Claude usage from the gallery. Put it on the desktop or in Notification Center, in any of its three sizes. cl_audit has to be installed first."
  - q: "Does the widget show Claude Code usage?"
    a: "Yes, as part of the same limits. Anthropic's help page says Claude and Claude Code share one set of limits, so the 5-hour and weekly rows count both. For tokens by day, project and model, use cl_audit's usage history instead."
  - q: "Does the widget update live?"
    a: "Not second by second. cl_audit's background agent reads each profile's usage as often as that profile is set to, and macOS refreshes the widget every few minutes, and at once when you change its look. So the numbers are as fresh as the last read."
  - q: "Does the widget need the internet or my Claude login?"
    a: "No. It only reads what cl_audit has saved (the profiles, their usage and its look) from cl_audit's own folder. It has no network access and doesn't touch the Keychain; the background agent does the reading."
sources:
  - title: "cl_audit README at v26.11.0, section Widget (n-uf)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.0/README.md#widget"
    checked: 2026-11-05
  - title: "cl_audit CHANGELOG at v26.11.0, release 26.11.0 (2026-11-05)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.0/CHANGELOG.md"
    checked: 2026-11-05
  - title: "cl_audit README at v26.11.0, sections Settings (Profile order) and Profile settings"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.0/README.md"
    checked: 2026-11-05
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-05
  - title: "Anthropic Help Center: What is the Max plan?"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-05
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-05
related:
  - /settings/
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-usage-limit-alerts/
  - /dashboard/
---

If you want a Claude usage widget on your Mac, cl_audit has one: "Claude usage", in the macOS widget gallery on macOS 14 or later. It puts every profile's 5-hour and weekly limits on your desktop or in Notification Center and says when a full limit is back, so you can see where you stand without opening anything. cl_audit is an independent tool, not affiliated with Anthropic.

cl_audit is a Mac app, so this is a macOS widget only, with no iPhone, Android or Windows version.

## What the Claude usage widget shows

For each profile, the widget draws the two limits paid Claude plans have: the 5-hour limit and the weekly limit. (A **profile** is one Claude setup in cl_audit: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon.) When a limit is full, the widget says when it's back, in the same words as the rest of cl_audit: "back at 15:28".

Anthropic's help page says paid plans have a session limit, whose five hours start with your first message, and weekly limits that reset once a week. Another of its pages says these limits are shared across Claude and Claude Code. So one row covers what you used in the Claude app and in Claude Code on that profile, and there's no separate Claude Code row to add.

Ultra is the exception. Anthropic's page on Claude Code with paid plans says Ultra plans have a weekly limit, and verified Ultra accounts don't have a five-hour session limit. For a profile on Ultra the widget shows the week alone, without an empty 5-hour row.

## How to add the Claude usage widget

Once cl_audit is installed, you add it like any other Mac widget.

1. Click the date in the menu bar.
2. Choose **Edit Widgets**.
3. Find **Claude usage** in the gallery and pick a size.
4. Drop it on the desktop, or into Notification Center.

There are three sizes. The widget needs macOS 14 or later. cl_audit itself runs on macOS 13 (on a Mac with Apple silicon), so on macOS 13 you still get the Dock icons and the dashboard, just not the widget.

## One profile, a few, or many

You don't pick a layout. The widget fits itself to the size you chose and to how many profiles you have. It uses the biggest arrangement that fits and shares out the leftover room evenly, so no part sits empty.

| Profiles | What the widget draws |
| --- | --- |
| 1 or 2 | Large limits, with when they reset. In the large size, one profile's limits are drawn bigger and fill the whole height. |
| 3 or 4 | In the large size, a block for each profile, drawn a size larger. |
| More than 4 | A row for each profile. |

With two to four profiles, the next three resets go below the limits when there's room. cl_audit's notes describe the layouts by number of profiles and for the large size, not every size in turn, so check the gallery's preview when you choose one.

## Several accounts on one desktop

With two accounts on one Mac, one widget lists both. Say you have a work Team seat and a personal plan: each shows with its own limits. The page on [multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) explains how cl_audit keeps each account in one profile.

The widget follows your **profile order**. Drag a profile's tile left or right along the top of Settings, or drag its card on the dashboard; it's saved when you let go. The dashboard, the launcher, the menu bar icons, the usage history and the widget all use that order, so "Work" can be the first row everywhere. The Dock icons stay wherever you put them in the Dock.

It's useful with a single account too. If you spend the day in an editor, a terminal or a browser, the widget keeps that profile's limits in view with no window of its own to open.

## Fable's row

Anthropic's help pages say some plans also have a separate weekly limit for Fable; its Max plan page says Max plans have one. cl_audit reads it from Anthropic's reply and shows it as a third row where a profile has it.

On the widget, the row appears for the profiles whose settings show it. Open the profile's settings and find **Fable's limit**: "shown and alerted" puts it on the widget, "left out" removes it everywhere.

## Set the look: Limits as and Look

The widget's look lives in **Settings ▸ General ▸ Widget**. The card is built like the Dashboard cards card, and in the app its preview is the real widget. The picture below comes from the site's own demo of that card.

![cl_audit demo: the Widget card with Limits as and Look](/img/guides/widget-settings.webp "The Widget card in General settings, on this site's demo, with the demo's preview. Sample data.")

There are two choices.

- **Limits as**: Glow, Rings, Numbers, Segments or Pace, the same five designs as the dashboard cards, in every row too.
- **Look**: **System**, the Mac's own widget background, light or dark; or one of cl_audit's faces, **Std**, **Black** or **Silver**. On Std and Black, Numbers sits in a glowing display window.

Changing either one refreshes the widget at once. You can try the same card on the [demo settings page](/settings/) with sample data, without installing anything.

## What the widget reads, and how fresh it is

The widget never asks Anthropic for anything. It only reads what cl_audit saves in its own folder: the profiles, their usage, and `widget.json` with its look. It gets at that folder through a read-only sandbox exception. It has no network access and doesn't read the Keychain.

The reading is done by cl_audit's background agent, for every profile, as often as each profile's Alerts card says. The agent has no window or Dock icon, and macOS starts it at login, so it keeps reading with the cl_audit window and the Dock icons closed. macOS then refreshes the widget every few minutes. The numbers on it are as old as the last read, plus a short wait.

That's enough for something you only glance at. For "tell me before I run out", the widget is the wrong tool: [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) come from the same agent and reach you whatever is open.

If the widget looks stale, open cl_audit. Settings ▸ General ▸ Usage in the background says whether it's reading, and when it last read.

## Who it's for

- **Several accounts on one Mac.** Every profile's limits in one place, in your order, without opening a window.
- **One account you want in view while you work elsewhere.** It sits on the desktop or in Notification Center.
- **People who'd rather not have a Dock icon per profile.** The widget doesn't need one; a profile can be usage only.

If a widget isn't your thing, cl_audit can also put [an icon per profile in the menu bar](/use-cases/claude-usage-menu-bar-mac/). And if you only check now and then, Anthropic's help page says Settings ▸ Usage in Claude shows how much you've used and the time left in the current session, with no install at all.

For history by day and project, see [Claude Code usage history](/use-cases/claude-code-usage-history/). Most other trackers live in the menu bar; [this round-up of Claude usage trackers for Mac](/blog/best-claude-usage-trackers-mac/) compares them with cl_audit.

## Get the widget

[Download cl_audit](/install/), add a profile for each Claude setup, then add Claude usage from the widget gallery. The [dashboard demo](/dashboard/) shows the card designs the widget borrows.
