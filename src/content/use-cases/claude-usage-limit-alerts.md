---
title: "Claude usage limit notifications on your Mac | cl_audit"
description: "Claude usage limit notifications on your Mac: one at the level you set, one when a limit is full with the time it's back, and one when it resets."
h1: "Claude usage limit notifications"
mainKeyword: "claude usage limit notification"
kind: use-case
published: 2026-11-02
updated: 2026-11-12
author: n-uf
order: 2
takeaways:
  - "For each limit, cl_audit sends three Mac notifications: the limit reaches the level you set, it's full and when it's back, and it has reset."
  - "The alerts cover every profile's 5-hour and weekly limits, and Fable's weekly limit where the plan has one; each fires once per limit and reset. Two more say when usage credits start and when they run out."
  - "One background agent reads every profile's usage, so alerts arrive with the cl_audit window, the Dock icons and the Claude windows all closed."
  - "Reset times come from Anthropic's usage figures; when Anthropic doesn't give one, cl_audit says so and never makes one up."
  - "Each profile has its own level and its own refresh interval, and Notify when back is on by default."
faq:
  - q: "Can I get an alert before I hit the Claude limit?"
    a: "Yes. In a profile's settings, under Alerts, Notify at sends a Mac notification when the 5-hour or weekly limit reaches the level you set, for example 90%. It fires once per limit and reset."
  - q: "Does it notify me when the limit resets?"
    a: "Yes. Notify when back, on by default, sends one notification when a full limit resets, for example \"Claude Work is back\". If the other limit is still full, it waits for that one."
  - q: "Do alerts work with the app closed?"
    a: "Yes. cl_audit's background agent reads every profile and sends the alerts, so they arrive with the cl_audit window, the Dock icons and the Claude windows closed. macOS starts the agent at login and again if it crashes."
  - q: "Can each account have its own level?"
    a: "Yes. The level, the refresh interval and Notify when back are set per profile, so a work seat can warn you at 80% while a personal plan warns at 95% or stays quiet."
  - q: "Does cl_audit alert me about Fable's limit or usage credits?"
    a: "Yes. Where the plan gives Fable a weekly limit of its own, it alerts like the other two (\"Fable weekly limit full · Back Thu 09:00\", then \"Fable is back\"), unless you've turned Fable's limit off for that profile. With alerts on, cl_audit also tells you when a profile starts spending usage credits and when they run out."
sources:
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Claude Code docs: Manage costs effectively"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
  - title: "Claude Code docs: Commands (/usage)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-03
  - title: "Anthropic Help Center: Claude Fable models on your plan"
    url: "https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan"
    checked: 2026-11-05
  - title: "Anthropic Help Center: Manage usage credits for paid Claude plans"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-05
  - title: "cl_audit README (n-uf/cl_audit): alerts, after a Claude update"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-05
  - title: "cl_audit README at tag v26.11.18 (n-uf/cl_audit): When a limit is full, Another account, A switch waiting for you"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/README.md"
    checked: 2026-11-11
    supports: "Standby accounts are signed out and show no usage; the full-limit alert adds a line about switching to another of the profile's accounts, with Switch account… and Later; the switch is waiting for you alert, with Show switch and Cancel switch, only while the Switch page isn't in front; alerts never name an account; the Dock icon's crimson frame while a limit is full."
    quote: "so they never name an account by its address or any part of it"
  - title: "cl_audit CHANGELOG, 26.11.18"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/CHANGELOG.md"
    checked: 2026-11-11
    supports: "Standby accounts show no usage, the alert included; \"the other account is back\" and its Switch back offer are gone."
    quote: "A profile is one Claude Code folder, and switching signs in again on it."
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
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

1. **A limit reaches your level.** You pick the level per profile, in the profile's settings under Alerts. When the 5-hour limit or the weekly limit gets there, macOS shows a notification. This is the early warning.
2. **A limit is full.** At 100% the percentage tells you nothing new. What you want to know is when the profile works again, so that's what it says: "Claude Work: 5-hour limit full · Back at 15:28, in 1h 42m".
3. **A full limit has reset.** This one is **Notify when back**: "Claude Work is back · The 5-hour limit reset at 15:28". It's on by default and you can turn it off per profile. If the other limit is still full, it waits for that one too, so you never hear "back" while the profile is still stuck.

Each alert fires once per limit and reset. A limit sitting at 92% won't ping you every five minutes.

## Fable, usage credits and Claude updates

The same agent sends three more kinds of alert.

- **Fable's weekly limit.** On Max and Ultra, and on premium Team and Enterprise seats, Fable has a weekly limit of its own. It alerts like the other two: "Claude Main: Fable weekly limit full · Back Thu 09:00", then "Claude Main: Fable is back". Its row on the card turns crimson, but the Dock icon doesn't become a countdown, since the other models still work. To leave it out for a profile, turn off Profile ▸ Fable's limit; then it's neither shown nor alerted.
- **Usage credits.** They let a profile keep working past its plan limits, billed apart from the plan. With alerts on, you hear when a profile starts spending them ("Claude Work is using usage credits · The 5-hour limit is full · $0.40 spent so far") and when they run out. Meanwhile the card says "Using usage credits · $4.20 spent".
- **A Claude window reopened.** Claude updates itself quietly, quitting every window and reopening only the standard one. cl_audit's agent reopens the profile windows the update closed, in the background, and tells you once: "Claude updated to 1.2.0 · Reopened Work's window". A window you closed yourself stays closed. Claude Code tasks the quit stopped aren't restarted.

## When a profile has more than one account

A profile works on one account at a time and can keep your other accounts on standby, signed out. For such a profile the full-limit alert says a little more, and one alert is added.

- **A limit is full.** The alert adds "You can switch to another of its accounts: Claude Code signs in again on this profile's folder." and has **Switch account…** next to **Later**. Nothing reads a standby account, so the alert doesn't say how much room it has. It never names an account, because alerts can show on the lock screen.
- **The switch is waiting for you.** While Claude Code's sign-in waits in the browser and the Switch page isn't in front, one alert says so: "Claude Main: the switch is waiting for you · Finish Claude Code's sign-in in Terminal and the browser. cl_audit checks the account when it's done." It has **Show switch** and **Cancel switch**.

Switch account… only opens the Switch page. Nothing switches until you start the switch there, and each account's limits stay its own. {{live:/use-cases/switch-claude-accounts/}}What a switch moves, and how to undo one, is on the [Claude account switcher](/use-cases/switch-claude-accounts/) page.{{/live}}

{{experimental: switch}}

## The countdown on the dashboard and in the Dock

A full limit also shows up outside Notification Center. On the [Claude usage dashboard](/dashboard/), the profile's card gets one box beside the limits, for the full limit that holds the profile back (the one that resets last). It reads "5-hour full", then how long until it's back in large type ("in 1h 42m"), and the time under that ("back at 15:28").

![Dashboard card with a full 5-hour Claude limit](/img/guides/card-limit-full.webp "A dashboard card with a full 5-hour limit: how long until it's back, and at what time. Sample data.")

The wording depends on how far off the reset is. The countdown reads "in 2d 19h", "in 1h 42m" or "in 19m". The time reads "back at 15:28" for today, "back Thu 09:00" within the week and "back 11 Nov" after that.

You'll see the same countdown in a few more places:

- the details panel, which has the same box;
- the launcher, next to the profile;
- the Dock icon's menu, which starts with "5-hour full · back at 15:28, in 1h 42m";
- the Dock icon itself: the time in large figures, "5H FULL" under it, and a crimson frame;
- the profile's menu bar icon, if you turned one on (profile settings ▸ Menu bar, off by default): the countdown beside the icon ("1h 42m"), or just crimson, as you choose;
- the "Claude usage" widget (macOS 14 or later), which shows when a full limit is back.

With nothing full, the cards look as usual. At the reset, the agent reads that profile again straight away and the card goes back to its normal layout.

## Where the reset times come from

cl_audit doesn't calculate resets. It reads each profile's 5-hour and weekly limits from Anthropic with that profile's Claude Code sign-in, so you get the same figures Claude shows in Settings ▸ Usage, reset times included.

So when does a Claude limit reset? Anthropic's help page on usage limits (checked 2 November 2026) says the session limit starts with your first message and resets in full five hours later. Weekly limits reset at a fixed time each week that's assigned to your account. The same page says Settings ▸ Usage shows your current session usage, the time remaining and your next weekly reset. Anthropic can change any of this.

For your own times, look at Settings ▸ Usage in Claude, or at the profile's card in cl_audit, which has a reset line for each limit.

If Anthropic doesn't say when a limit resets, the card says "full · reset time unknown". cl_audit won't guess a time.

## Setting the level and how often cl_audit reads

![cl_audit alert settings: Notify at and Notify when back](/img/guides/alert-settings.webp "The Alerts card in a profile's settings: how often to read, Notify at a level, and Notify when back. Sample data.")

In cl_audit, open Settings, pick a profile and find **Alerts**. Three settings there matter for alerts:

- **Notify at**: the percentage at which the early warning goes out, from 50% to 100% in steps of 5. Switch it off and that profile sends neither the level alert nor the "full" alert; Notify when back has its own switch.
- **Refresh every**: how often the agent asks Anthropic for this profile's usage, for example every 5 minutes. The settings page notes that checking doesn't use any of your limits.
- **Notify when back**: the reset notification, on by default.

Changes save as you make them. You can try all three on the [demo settings page](/settings/) with sample data, without installing anything.

A lower level buys you more time; a level close to 100% means fewer alerts and less warning. If the weekly limit is what you watch, somewhere in the high eighties or nineties may do. For a profile that runs long agent tasks, you may want to hear sooner. It depends on how fast you burn through a limit, and you can change it whenever you like.

The first time, macOS asks once whether cl_audit may send notifications. Missed it? It's in System Settings ▸ Notifications ▸ cl_audit, and Settings ▸ General ▸ Usage in the background shows whether alerts are allowed.

## Claude usage alerts for every account, from one agent

This is why the alerts matter most when you run [several Claude accounts side by side](/use-cases/multiple-claude-accounts/). A small background agent inside cl_audit reads every profile's usage and sends every alert. The cl_audit window, the Dock icons and the Claude windows only show what the agent saved.

In practice:

- Quitting a Dock icon or a Claude window never stops a profile's usage or its alerts.
- A **usage only** profile (Usage in the Dock and Claude window both off) is read and alerted like the rest.
- macOS starts the agent at login and again if it crashes. Updating cl_audit restarts it without a new prompt.
- Settings ▸ General ▸ Usage in the background says whether it's reading, when it last read, and whether alerts are allowed.

Since every notification comes from cl_audit and not from a separate app per profile, macOS asks for permission only once.

## Does Claude warn you before the limit?

It does, in the place you're working. Anthropic's help page for Claude Code on Pro, Max and Ultra plans says you'll see warning messages as you approach a limit, and Claude Code's command reference says `/usage` shows your plan usage limits. If you hit the session limit mid-response, Claude Code may keep working briefly to finish the step in progress and show "Usage limit reached · wrapping up"; that usage counts toward your weekly limit. From version 2.1.234, Claude Code can also wait for the reset and carry on with the interrupted task by itself, according to Anthropic's cost-management page.

Those messages appear in Claude Code. A cl_audit notification reaches you in whatever app you're in, and it covers your other profiles' accounts too, while you work in one.

If you use one account and live in the terminal, Claude Code's own warning and its wait-and-continue option may be all you need. If you switch between accounts, or leave long tasks running while you do something else, an alert per profile means you don't come back to a run that stopped an hour ago.

The limits themselves are shared. Anthropic's page says Claude and Claude Code count against the same limits, so a long chat can eat what Claude Code needed. Alerts are per profile, so each seat is watched on its own.

## Next steps

The [Claude Code usage history](/use-cases/claude-code-usage-history/) page covers the other half: when you use Claude and where the tokens go, by project and model. To see a profile card at 100%, open the [demo dashboard](/dashboard/). For the whole app, see [cl_audit, a Mac app for Claude usage limits](/). When you're ready, [download cl_audit](/install/), add a profile for each account and set a level.
