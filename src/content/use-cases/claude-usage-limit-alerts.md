---
title: "Claude usage limit notifications on your Mac | cl_audit"
description: "Claude usage limit notifications on your Mac: one at the level you set, one when a limit is full with the time it's back, and one when it resets."
h1: "Claude usage limit notifications"
mainKeyword: "claude usage limit notification"
kind: use-case
published: 2026-11-02
updated: 2026-11-02
author: n-uf
order: 2
takeaways:
  - "cl_audit sends three Mac notifications for each Claude profile: a limit reaches the level you set, a limit is full and when it's back, and a full limit has reset."
  - "The alerts cover the 5-hour limit and the weekly limit, for every profile, and each fires once per limit and reset."
  - "One background agent reads every profile's usage, so alerts arrive with the cl_audit window, the Dock icons and the Claude windows all closed."
  - "Reset times come from Anthropic's usage figures; when Anthropic doesn't give one, cl_audit says so and never makes one up."
  - "Each profile has its own level and its own refresh interval, and Notify when back is on by default."
faq:
  - q: "Can I get an alert before I hit the Claude limit?"
    a: "Yes. In a profile's settings, under Updates and alerts, Notify at sends a Mac notification when the 5-hour or weekly limit reaches the level you set, for example 90%. It fires once per limit and reset."
  - q: "Does it notify me when the limit resets?"
    a: "Yes. Notify when back, on by default, sends one notification when a full limit resets, for example \"Claude Work is back\". If the other limit is still full, it waits for that one."
  - q: "Do alerts work with the app closed?"
    a: "Yes. cl_audit's background agent reads every profile and sends the alerts, so they arrive with the cl_audit window, the Dock icons and the Claude windows closed. macOS starts the agent at login and again if it crashes."
  - q: "Can each account have its own level?"
    a: "Yes. The level, the refresh interval and Notify when back are set per profile, so a work seat can warn you at 80% while a personal plan warns at 95% or stays quiet."
sources:
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan"
    checked: 2026-11-02
  - title: "Claude Code docs: Manage costs effectively"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
related:
  - /
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-code-usage-history/
  - /dashboard/
---

cl_audit sends a Claude usage limit notification to your Mac when a limit reaches the level you set, another when it's full, saying when it's back, and a last one when it resets. One background agent does this for every account, with all of cl_audit's windows closed. cl_audit is an independent tool, not affiliated with Anthropic.

You keep working. The notification turns up before a long task stops halfway, not after.

## What each Claude usage limit notification says

Every notification comes from cl_audit itself, and you get them per profile. (A **profile** is one Claude setup in cl_audit: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon.)

1. **A limit reaches your level.** You pick the level per profile, in the profile's settings under Updates and alerts. When the 5-hour limit or the weekly limit gets there, macOS shows a notification. This is the early warning.
2. **A limit is full.** At 100% the percentage tells you nothing new. What you want to know is when the profile works again, so that's what it says: "Claude Work: 5-hour limit full · Back at 15:28, in 1h 42m".
3. **A full limit has reset.** This one is **Notify when back**: "Claude Work is back · The 5-hour limit reset at 15:28". It's on by default and you can turn it off per profile. If the other limit is still full, it waits for that one too, so you never hear "back" while the profile is still stuck.

Each alert fires once per limit and reset. A limit sitting at 92% won't ping you every five minutes.

## The countdown on the dashboard and in the Dock

A full limit also shows up outside Notification Center. On the [Claude usage dashboard](/dashboard/), the profile's card gets one box beside the limits, for the full limit that holds the profile back (the one that resets last). It reads "5-hour full", then how long until it's back in large type ("in 1h 42m"), and the time under that ("back at 15:28").

The wording depends on how far off the reset is. The countdown reads "in 2d 19h", "in 1h 42m" or "in 19m". The time reads "back at 15:28" for today, "back Thu 09:00" within the week and "back 11 Nov" after that.

You'll see the same countdown in a few more places:

- the details panel, which has the same box;
- the launcher, next to the profile;
- the Dock icon's menu, which starts with "5-hour full · back at 15:28, in 1h 42m";
- the Dock icon itself: the time in large figures, "5H FULL" under it, and a red frame.

With nothing full, the cards look as usual. At the reset, the agent reads that profile again straight away and the card goes back to its normal layout.

## Where the reset times come from

cl_audit doesn't calculate resets. It reads each profile's 5-hour and weekly limits from Anthropic with that profile's Claude Code sign-in, so you get the same figures Claude shows in Settings ▸ Usage, reset times included.

So when does a Claude limit reset? Anthropic's help page on usage limits (checked 2 November 2026) says the session limit starts with your first message and resets in full five hours later. Weekly limits reset at a fixed time each week that's assigned to your account. The same page says Settings ▸ Usage shows your current session usage, the time remaining and your next weekly reset. Anthropic can change any of this.

For your own times, look at Settings ▸ Usage in Claude, or at the profile's card in cl_audit, which has a reset line for each limit.

If Anthropic doesn't say when a limit resets, the card says "full · reset time unknown". cl_audit won't guess a time.

## Setting the level and how often cl_audit reads

In cl_audit, open Settings, pick a profile and find **Updates and alerts**. Three settings there matter for alerts:

- **Notify at**: the percentage at which the early warning goes out, from 50% to 100% in steps of 5. Switch it off and that profile sends neither the level alert nor the "full" alert; Notify when back has its own switch.
- **Refresh every**: how often the agent asks Anthropic for this profile's usage, for example every 5 minutes. The settings page notes that checking doesn't use any of your limits.
- **Notify when back**: the reset notification, on by default.

Changes save as you make them. You can try all three on the [demo settings page](/settings/) with sample data, without installing anything.

A lower level buys you more time; a level close to 100% means fewer alerts and less warning. If the weekly limit is what you watch, somewhere in the high eighties or nineties may do. For a profile that runs long agent tasks, you may want to hear sooner. It depends on how fast you burn through a limit, and you can change it whenever you like.

The first time, macOS asks once whether cl_audit may send notifications. Missed it? It's in System Settings ▸ Notifications ▸ cl_audit, and cl_audit's General settings show whether alerts are allowed.

## Claude usage alerts for every account, from one agent

This is why the alerts matter most when you run [several Claude accounts side by side](/use-cases/multiple-claude-accounts/). A small background agent inside cl_audit reads every profile's usage and sends every alert. The cl_audit window, the Dock icons and the Claude windows only show what the agent saved.

In practice:

- Quitting a Dock icon or a Claude window never stops a profile's usage or its alerts.
- A **usage only** profile (Usage in the Dock and Claude window both off) is read and alerted like the rest.
- macOS starts the agent at login and again if it crashes. Updating cl_audit restarts it without a new prompt.
- Settings ▸ General ▸ Usage in the background says whether it's reading, when it last read, and whether alerts are allowed.

Since every notification comes from cl_audit and not from a separate app per profile, macOS asks for permission only once.

## Does Claude warn you before the limit?

It does, in the place you're working. Anthropic's help page for Claude Code on Pro, Max and Ultra plans says you'll see warning messages as you approach a limit, and that `/status` shows your remaining allocation. If you hit the limit mid-response, Claude Code may finish the response in progress and show "Usage limit reached · wrapping up"; that usage counts toward your weekly limit. From version 2.1.234, Claude Code can also wait for the reset and carry on with the interrupted task by itself, according to Anthropic's cost-management page.

Those messages appear in Claude Code. A cl_audit notification reaches you in whatever app you're in, and it covers the accounts you aren't using at that moment.

If you use one account and live in the terminal, Claude Code's own warning and its wait-and-continue option may be all you need. If you switch between accounts, or leave long tasks running while you do something else, an alert per account means you don't come back to a run that stopped an hour ago.

The limits themselves are shared. Anthropic's page says Claude and Claude Code count against the same limits, so a long chat can eat what Claude Code needed. Alerts are per profile, so each seat is watched on its own.

## Next steps

The [Claude Code usage history](/use-cases/claude-code-usage-history/) page covers the other half: when you use Claude and where the tokens go, by project and model. To see a profile card at 100%, open the [demo dashboard](/dashboard/). For the whole app, see [cl_audit, a free Mac app for Claude limits](/). When you're ready, [download cl_audit](/install/), add a profile for each account and set a level.
