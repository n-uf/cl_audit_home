---
title: "Claude limit reset time: 5-hour and weekly limits"
description: "Claude limit reset time: the 5-hour limit resets five hours after your first message, the weekly limit at a fixed time. Where to see your exact time."
h1: "Claude limit reset time for the 5-hour and weekly limits"
mainKeyword: "claude limit reset time"
kind: what-is
published: 2026-11-02
updated: 2026-11-02
author: n-uf
takeaways:
  - "The 5-hour limit resets in full five hours after you send the first message of its period."
  - "The weekly limit resets at a fixed day and time assigned to your account; starting late or subscribing late doesn't move it."
  - "Your exact times are in Settings ▸ Usage in Claude, with /usage in Claude Code, and in the message you see when you hit a limit."
  - "The 5-hour and weekly limits run at the same time, so waiting for the 5-hour reset doesn't help if the weekly limit is full."
  - "Anthropic doesn't publish a weekday for the weekly reset, so check your own Usage screen."
faq:
  - q: "When does the Claude 5-hour limit reset?"
    a: "Five hours after you send the first message of that period. Anthropic's help page says the period starts with your first message and the limit resets in full five hours later; the time left shows under Current session in Settings ▸ Usage."
  - q: "When does the Claude weekly limit reset?"
    a: "At a fixed time each week that is assigned to your account. The day and time stay the same whenever you start using Claude and whenever your subscription began, and you can see the next one in Settings ▸ Usage."
  - q: "Why does my Claude weekly limit reset on a different day than my friend's?"
    a: "Anthropic assigns the weekly reset time to each account, so yours can differ from someone else's. The only reliable source is your own Usage screen in Settings ▸ Usage."
  - q: "How do I see when my Claude limit resets in Claude Code?"
    a: "Run /usage to see your plan limits and when they reset. When you hit a limit, Claude Code's message also gives the time, for example \"resets 3:45pm\"."
  - q: "Does the weekly limit reset when the 5-hour limit does?"
    a: "No. They are separate limits that count your usage at the same time. If the weekly limit is full, the 5-hour reset doesn't give you access back."
sources:
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "What is the Pro plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8325606-what-is-the-pro-plan"
    checked: 2026-11-02
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-02
  - title: "What is the Ultra plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan"
    checked: 2026-11-02
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-02
  - title: "What is a limit reset? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17007452-what-is-a-limit-reset"
    checked: 2026-11-02
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Commands (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-02
  - title: "Error reference, Usage limits (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-02
  - title: "Manage costs effectively, the /usage command (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-02
related:
  - /use-cases/claude-usage-limit-alerts/
  - /blog/claude-usage-limits/
---

The Claude limit reset time depends on which limit stopped you. The 5-hour limit resets five hours after you send the first message of its period. The weekly limit resets at a fixed day and time that Anthropic assigns to your account, and that time doesn't move if you start using Claude late in the week or if your subscription began on a different day. Your own exact times are in Settings ▸ Usage in Claude, and in Claude Code with `/usage`.

Everything below about how Claude behaves comes from Anthropic's help and docs pages, checked on 2 November 2026 and listed at the end. Where those pages don't say something, such as which weekday your weekly limit resets, we don't either. cl_audit is an independent tool, not affiliated with Anthropic.

## When does the Claude limit reset? It depends on the limit

| Limit | When it resets | Where to see it |
|---|---|---|
| 5-hour (session) limit | In full, five hours after the first message of its period | Settings ▸ Usage, "Current session" |
| Weekly limit | At a fixed time each week assigned to your account | Settings ▸ Usage, next reset time |
| In Claude Code | At the time shown in the limit message | `/usage`, or the "resets" time in the message |

If you're stopped right now, the message tells you which one it is. "You've hit your session limit" is the 5-hour limit, "You've hit your weekly limit" is the weekly one, and Claude Code's docs say both messages carry the reset time. If you'd rather be told when it's over, see [a notification when the limit resets](/use-cases/claude-usage-limit-alerts/).

## How the Claude 5-hour limit resets

Anthropic's help page puts it simply: the period starts when you send your first message, and your limit resets in full five hours later. If you reach the limit before then, you can use Claude again once it resets.

So the start is your first message, not the top of the hour. An example of our own (the times are made up; the rule is Anthropic's): you send a first message at 09:10, so that period ends at 14:10, whether you used it heavily or barely touched it.

And the reset is a full one. No allowance trickles back early. In the same example, if you're blocked at 13:40, you wait until 14:10 and then have the whole allowance again.

What the page doesn't spell out is how the next period begins after a reset. For the new window, look at the "Current session" bar rather than assuming.

"Session limit", "five-hour limit" and "Current session" all name this one limit on Anthropic's pages, so the Claude session limit reset time is the same thing.

Two exceptions:

- Verified Ultra accounts have no five-hour limit. Anthropic's Ultra page says that if your Settings ▸ Usage screen has no "Current session" bar, your account is verified. Until then a temporary limit applies, and it's removed automatically.
- Claude Code may finish a step. If you reach the session limit while Claude Code is partway through a response, it may keep working briefly, with "Usage limit reached · wrapping up" on screen. That allowance is small, counts toward your weekly limit and is rolling out gradually, so you may not have it yet.

What the limit is and what counts toward it is in our explainer on [Claude usage limits](/blog/claude-usage-limits/).

## When the weekly limit resets

Anthropic's help page says weekly limits reset at a fixed time each week that is assigned to your account. Your reset day and time stay the same regardless of when you start using Claude or when your subscription begins, and you get your full weekly allowance each cycle. Your next reset time is in Settings ▸ Usage.

In practice:

- You can't move it. Holding off for a day, or starting early in the week, doesn't change when the weekly limit comes back.
- Yours may not match anyone else's, because the time is assigned to your account. Anthropic's pages don't give a weekday for the Claude weekly limit reset time, so treat a "Claude resets on Monday" claim you read elsewhere as unconfirmed. Your own Usage screen is the only place that knows.
- It resets in full: the whole weekly allowance comes back each cycle.
- Several accounts means several weekly times, one per account. Keeping track of them is what a Claude usage tracker is for.
- On Team plans it's per member. Anthropic's Team page says weekly limits reset at a fixed time assigned to your account, and that limits are per member: one person reaching their limit doesn't affect the others.

The weekly limit is separate from the 5-hour one, and the two run at once; Claude Code's docs say usage counts against the session and weekly allowances at the same time. The plan-by-plan limits are in our other article. So when the weekly limit is the full one, the 5-hour reset doesn't help on its own: you wait for the weekly reset, or use a limit reset (below) if you have one.

Max and Ultra plans also have a separate weekly limit for Fable. Anthropic's plan pages don't say whether it resets at its own time, so check your Usage screen if you use that model a lot.

## Not the same: limit resets Anthropic hands out

Search for "Claude reset" and you may find something else: a limit reset. Anthropic's help page says these are given occasionally to eligible plans, and that using one sets your limit back to full right away. Depending on the reset shown, it's either your five-hour session limit or your weekly usage limit.

From that page:

- You don't have to wait until you hit a limit to use it, and once you use it you can't undo it.
- Your weekly limits still reset on their usual day and time.
- If it has an expiry, the date is shown in Settings ▸ Usage.
- To use it, go to Settings ▸ Usage on the web or in Claude Desktop and click "Reset for free". The same button is on the message you see when you reach a limit.
- The button isn't currently available in Claude Mobile, or in Claude Code in a terminal or IDE. Your limits are shared across your account, though, so after a reset they're back to full in Claude Code too.

It's a bonus, not a schedule. You can't count on one, and it doesn't change your normal Claude limit reset time.

## How to see your exact Claude limit reset time

Three places show it. The first two are Anthropic's.

**Settings ▸ Usage, in the Claude app or on claude.ai.** Anthropic's help page says you can see how much you've used and the time remaining under "Current session", and your next weekly reset time in the same place.

**`/usage` in Claude Code.** Anthropic's docs describe the command as "Show session cost, plan usage limits, and activity stats", and the error reference tells you to run it to see your plan limits and when they reset. When you do hit a limit, the message gives the time, for example "You've hit your session limit · resets 3:45pm", and Claude Code blocks further requests until then. Before a window runs out it can warn you too: "You've used 85% of your session limit · resets 3:45pm".

One message is easy to misread. If `/usage` says something like "rate limited until 3:14am", Claude Code can't fetch your plan limits again until that time; your work with Claude isn't what's limited. When that fetch fails, `/usage` shows the last usage bars it loaded on this machine in the past 60 minutes, if it has any, with a "Showing last-known usage" note.

**A countdown in the Dock, with cl_audit.** If you keep several Claude setups on one Mac, opening Settings ▸ Usage in each one gets old fast. [cl_audit](/), our free Mac app, reads the same 5-hour and weekly figures from Anthropic for each profile, with their reset times, using that profile's Claude Code sign-in. When a limit is full, the profile's card says when it's back, as a countdown and as a time: "in 1h 42m", "back at 15:28". Resets further off read like "back Thu 09:00" or "back 11 Nov". The Dock icon turns into the countdown, with a red frame, and the launcher shows it too.

cl_audit shows this in the Dock, not the menu bar, and it needs Claude Code signed in for each profile. Its figures come from an Anthropic endpoint that isn't a public interface, so a newer Claude version can change it; the cl_audit FAQ says to update the app if something stops working.

## Getting a notification at the reset

Most of waiting for a reset is remembering to come back. The pages we checked describe three things on Anthropic's side, and none of them tells you a limit is back:

- In an interactive Claude Code session signed in with a claude.ai subscription, Claude Code can wait in the open session and continue the interrupted task shortly after the reset.
- In the Code tab of the Claude Desktop app, the session-limit card has an "Auto-continue when limits reset" checkbox. The weekly-limit card doesn't.
- Claude Code can warn you when you've used most of a window.

Those carry on your work. They don't reach you while you're away from the screen.

For that, cl_audit's background agent sends macOS notifications. In each profile's settings, under Updates and alerts, you pick a level to be notified at, and Notify when back (on by default) sends one more alert when a full limit resets, such as "Claude Work is back · The 5-hour limit reset at 15:28". If the other limit is still full, it waits for that one. You get one alert per limit and reset, and at the reset the agent reads the profile again at once, so the card and the Dock icon update straight away.

Setting those up is covered on the page about [getting an alert before a limit is full](/use-cases/claude-usage-limit-alerts/). They run for every profile, which matters if you switch between a personal plan and a work seat during the day.

With one Claude account, Settings ▸ Usage may be all you need (background in [the 5-hour and weekly limits explained](/blog/claude-usage-limits/)). With several, you can [track Claude usage on your Mac](/) with every reset time in one place.
