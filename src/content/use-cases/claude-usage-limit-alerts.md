---
title: "Claude usage limit notifications on your Mac | cl_audit"
description: "Get a Mac notification when a Claude limit nears a level you set, one when it's full with the time it's back, and one when it resets. For every account."
h1: "Claude usage limit notifications"
mainKeyword: "claude usage limit notification"
kind: use-case
published: 2026-11-02
updated: 2026-11-02
author: n-uf
order: 2
takeaways:
  - "cl_audit sends three Mac notifications for each Claude profile: a limit nears the level you set, a limit is full and when it's back, and a full limit has reset."
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

cl_audit sends a Claude usage limit notification to your Mac when a limit reaches a level you set, another when it's full saying when it's back, and one more when it resets. It does this for every account from one background agent, even with its windows closed. cl_audit is an independent tool, not affiliated with Anthropic.

The alerts are the quiet part of the app. You keep working, and a notification tells you a limit is nearly gone before a long task stops halfway.

## What you're notified about

There are three kinds of notification, all from cl_audit itself, for each profile. A **profile** is one Claude setup in cl_audit: a Claude Code folder with its sign-in, and optionally a Claude window and a Dock icon.

1. **A limit reaches your level.** You choose the level for each profile, under Updates and alerts in the profile's settings. When the 5-hour limit or the weekly limit reaches it, a macOS notification says so. This is the early warning.
2. **A limit is full, and when it's back.** At 100% the percentage stops being useful. What matters is when the profile works again, so the notification says that: "Claude Work: 5-hour limit full · Back at 15:28, in 1h 42m".
3. **A full limit has reset.** **Notify when back** sends one more notification when the limit resets: "Claude Work is back · The 5-hour limit reset at 15:28". It is on by default, and you can turn it off per profile. If the other limit is still full, it waits for that one, so you aren't told "back" while the profile is still stuck.

Each alert fires once per limit and reset. A limit sitting at 92% doesn't notify you every five minutes.

## The countdown in the Dock and on the dashboard

The notification is not the only place a full limit shows up. While a limit is full, the profile's card on the [Claude usage dashboard](/dashboard/) puts one box beside the limits: the full limit that holds the profile back, the one that resets last. It reads "5-hour full", then how long until it's back, large ("in 1h 42m"), and the time under it ("back at 15:28").

The wording follows how far away the reset is: "in 2d 19h", "in 1h 42m" or "in 19m" for the countdown, and for the time "back at 15:28" today, "back Thu 09:00" within the week, "back 11 Nov" later.

The same countdown appears in other places:

- the details panel has the same box;
- the launcher shows the countdown next to the profile;
- the Dock icon's menu starts with "5-hour full · back at 15:28, in 1h 42m";
- the Dock icon itself turns into the countdown: the time in large figures, "5H FULL" under it, and a red frame.

With nothing full, the cards look as they always do. At the reset, the agent reads that profile again right away and the card goes back to its usual layout.

## Where the reset times come from

cl_audit doesn't work out resets itself. It reads each profile's 5-hour and weekly limits from Anthropic, using that profile's Claude Code sign-in: the same figures Claude shows in Settings ▸ Usage, with their reset times.

Anthropic's help page on usage limits says the session limit starts with your first message and fully resets five hours later, and that weekly limits reset at a fixed time assigned to your account. It also says Settings ▸ Usage shows your current session usage, the time remaining and your next weekly reset. Those facts come from Anthropic's page, checked on 2 November 2026, and Anthropic may change them.

When Anthropic doesn't say when a limit resets, the card says "full · reset time unknown". cl_audit never makes up a time.

## Setting the level and how often it reads

Open cl_audit, go to Settings, pick a profile and find **Updates and alerts**. Three settings matter here:

- **Notify at.** The level, as a percentage, at which the early warning goes out. Turn it off and that profile sends no level alerts.
- **Refresh interval.** How often the agent asks Anthropic for this profile's usage, for example every 5 minutes. The settings page notes that this doesn't use any of your limits.
- **Notify when back.** The reset notification, on by default.

Changes are saved as you make them. You can try all three on the [demo settings page](/settings/) with sample data, without installing anything.

A lower level gives you more time. A level near 100% gives you less warning but fewer alerts. If you mostly care about the weekly limit, a level in the high eighties or nineties may be enough; for a profile used in long agent runs you may want to hear earlier. The right number depends on how quickly you use a limit up, and you can change it at any time.

The first time, macOS asks once to allow notifications for cl_audit. If you missed the prompt, it is in System Settings ▸ Notifications ▸ cl_audit, and the General settings in cl_audit show whether alerts are allowed.

## Every account, from one background agent

This is the point of using cl_audit with [multiple Claude accounts](/use-cases/multiple-claude-accounts/). A small background agent inside cl_audit reads the usage of every profile and sends every alert. The cl_audit window, the Dock icons and the Claude windows only show what the agent saved.

That has a few effects:

- Quitting a Dock icon or a Claude window never stops a profile's usage or its alerts.
- A **usage only** profile, one with both Usage in the Dock and Claude window off, is read and alerted too.
- macOS starts the agent at login and starts it again if it crashes. Updating cl_audit restarts it with no new prompt.
- Settings ▸ General ▸ Usage in the background says whether it is reading, when it last read, and whether alerts are allowed.

Because every notification comes from cl_audit rather than from a separate app per profile, macOS asks for permission once.

## What Claude already tells you

Claude shows some of this itself, and it is worth knowing where.

Anthropic's help page for Claude Code on Pro, Max and Ultra plans says you will see warnings as you approach a limit, and that the `/status` command shows your remaining allocation. It also says that if you hit the limit mid-response, Claude Code may finish the step it is on and show "Usage limit reached · wrapping up", which counts toward your weekly limit. Claude Code can also wait for the reset and continue the interrupted task on its own, in versions from 2.1.234, according to Anthropic's cost-management page.

Those messages appear where you are working. A notification from cl_audit reaches you even when you are in another app, and it covers accounts that aren't the one you are using right now. If you only use a single account and live in the terminal, Claude Code's own warning and its wait-and-continue behaviour may be all you need. If you switch between accounts, or run long tasks while you do something else, an alert for each one saves you from finding a stopped run later.

The limits themselves are shared: Anthropic's page says Claude and Claude Code draw on the same limits, so a long chat can use up what Claude Code needs. Alerts are per profile, so each seat is watched on its own.

## When does a Claude limit reset?

The short answer: the 5-hour limit resets five hours after the session started, with your first message, and the weekly limit resets at a fixed time assigned to your account. That is what Anthropic's help page says as of 2 November 2026. For your own exact times, look at Settings ▸ Usage in Claude, or at the card for the profile in cl_audit, which shows the reset line for each limit.

## Next steps

cl_audit shows the history behind the alerts too. [Claude Code usage history](/use-cases/claude-code-usage-history/) shows when you use Claude and where the tokens go, by project and model. To see what a profile card looks like at 100%, open the [demo dashboard](/dashboard/). When you are ready, [download cl_audit](/install/), add a profile for each account and set a level. The overall picture is on the [Claude usage tracker](/) page.
