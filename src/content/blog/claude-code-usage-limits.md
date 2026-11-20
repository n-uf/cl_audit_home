---
title: "Claude Code usage limits by plan: what to expect"
description: "Claude Code usage limits on Pro, Max, Ultra, Team and the API: the 5-hour and weekly limits, what happens at the limit, and how to see it coming."
h1: "Claude Code usage limits: how they work on each plan"
mainKeyword: "claude code usage limits"
kind: what-is
published: 2026-12-11
updated: 2026-12-11
draft: true
author: n-uf
takeaways:
  - "On a Pro, Max or Ultra plan, Claude Code counts toward the same 5-hour and weekly limits as claude.ai and Claude Desktop (checked 20 November 2026)."
  - "On a Team or Enterprise seat it draws on the member's own seat allowance, a rolling five-hour window and a weekly window. On the Claude Console there is no plan limit, only API billing and organization rate limits."
  - "Anthropic gives no token or message counts for any plan, so the figures to trust are in /usage in Claude Code and in Settings ▸ Usage."
  - "At a session or weekly limit, Claude Code blocks further requests until the reset time in the message. Switching models doesn't help, except after an Opus or Sonnet limit."
  - "cl_audit shows each profile's 5-hour and weekly limits in the Dock and alerts at a level you set. It doesn't change any limit, and it isn't affiliated with Anthropic."
faq:
  - q: "What are the usage limits for Claude Code?"
    a: "It depends on how you sign in. On Pro, Max and Ultra, Claude Code shares the plan's 5-hour and weekly limits with claude.ai and Claude Desktop. On a Team or Enterprise seat it draws on your own seat allowance. On the Claude Console there are no plan limits, only API billing. Anthropic publishes no token or message counts."
  - q: "Is there a weekly limit in Claude Code?"
    a: "Yes, on plans with usage limits. The weekly limit applies across all models and resets at a fixed time assigned to your account. Anthropic's error reference says usage counts against the session and weekly allowances at once, so one burst of heavy activity can use up the week before the session window resets."
  - q: "Does switching model help when Claude Code hits a limit?"
    a: "Not for a session or weekly limit: Anthropic says those are shared across all models, so /model doesn't restore access. It does after \"You've hit your Opus limit\" or \"You've hit your Sonnet limit\", which apply only to that model family. Switching to a model outside the family keeps you working."
  - q: "Why does Claude Code say the server is temporarily limiting requests?"
    a: "It's a server-side throttle, not your plan's quota. Claude Code tells it apart by the missing quota headers a real limit response carries, and from v2.1.199 it retries with backoff. Anthropic's advice is to wait briefly and try again. A 529 error isn't your usage limit either and doesn't count against your quota."
  - q: "Can Claude Code wait for a limit to reset by itself?"
    a: "Yes. In an interactive session signed in with a claude.ai subscription, Claude Code can wait in the open session and continue the interrupted task shortly after the reset. In the Desktop app's Code tab, the session-limit card has an Auto-continue when limits reset checkbox. In the terminal the setting is Continue automatically at usage limit in /config."
sources:
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-20
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-20
  - title: "Use Claude Code with your Team or Enterprise plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan"
    checked: 2026-11-20
  - title: "Models, usage, and limits in Claude Code (Claude Help Center)"
    url: "https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code"
    checked: 2026-11-20
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-20
  - title: "What is the Ultra plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan"
    checked: 2026-11-20
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-20
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-20
  - title: "Manage costs effectively (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-20
  - title: "Error reference, usage limits (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-20
  - title: "Commands (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-20
  - title: "Workspaces, the Claude Code workspace (Claude API Docs)"
    url: "https://platform.claude.com/docs/en/manage-claude/workspaces"
    checked: 2026-11-20
  - title: "cl_audit README at tag v26.11.55 (The dashboard; When a limit is full; Fable's weekly limit and usage credits; A profile's Dock icon; Profile settings, Alerts)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.55/README.md"
    checked: 2026-11-20
    supports: "26.11.55: each profile's card, Dock icon and menu bar icon show its 5-hour and weekly limits, read with that profile's Claude Code sign-in; the Dock icon becomes a countdown while a limit is full; alerts fire at a level you set and, with Notify when back (on by default), when a full limit resets; usage history comes from Claude Code's session files on this Mac."
    quote: "Notify when back (on by default) sends one"
  - title: "cl_audit CHANGELOG, 26.11.55"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.55/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.55 is the newest release at the time of writing; this article describes cl_audit as of that version."
    quote: "## 26.11.55 — 2026-11-19"
related:
  - /blog/claude-usage-limits/
  - /blog/claude-usage-limit-reached/
  - /blog/claude-limit-reset-time/
  - /use-cases/claude-usage-limit-alerts/
---

Claude Code usage limits depend on how you sign in. On a Pro, Max or Ultra plan, Claude Code draws on the same 5-hour and weekly limits as claude.ai and Claude Desktop. On a Team or Enterprise seat it draws on your own seat allowance, which has a five-hour window and a weekly window too. On the Claude Console there's no plan limit at all: you pay per token, and rate limits belong to the organization. Anthropic gives no token or message counts for any of them.

This article is about how those limits work in Claude Code, plan by plan, what happens when you reach one and how to see it coming. {{live:/blog/claude-usage-limit-reached/}}If you're stopped right now, [Claude usage limit reached](/blog/claude-usage-limit-reached/) goes through each message.{{/live}} Everything about Claude below comes from Anthropic's help pages and docs as read on 20 November 2026, listed at the end. cl_audit, our free Mac app, appears near the end. It is an independent tool, not affiliated with Anthropic.

## How do Claude Code usage limits work?

On a plan with usage limits, Claude Code has no allowance of its own. Anthropic's help pages say usage in claude.ai, Claude Code and Claude Desktop counts toward the same limit, and that Claude Code in an IDE counts too. A long coding session and a long chat spend from one budget.

Two windows run at once. The session limit, the "5-hour limit", starts with your first message and resets in full five hours later; the weekly limit applies across all models and resets at a fixed time assigned to your account. Anthropic's error reference says usage counts against both at the same time, and that a single burst of heavy activity, such as a large workflow fanout, can use up the weekly allowance before the session window resets. [Claude usage limits explained](/blog/claude-usage-limits/) goes through both windows in full.

What you get depends on the sign-in:

| Sign-in | Limits that apply to Claude Code | What Anthropic says |
|---|---|---|
| Pro | A 5-hour limit and a weekly limit across all models, shared with claude.ai | No number. Fable isn't in the plan's limits and runs on usage credits |
| Max | The same two, plus a separate weekly limit for Fable | Five times Pro's usage every five hours and every week |
| Ultra | A weekly limit across all models and a separate one for Fable; no 5-hour limit once verified | Ten times Pro's usage every week |
| Team and seat-based Enterprise | The member's own seat allowance: a rolling five-hour window and a weekly window, shared with chat and Cowork | Sized by seat tier, Standard or Premium; not a team pool |
| Usage-based Enterprise | No per-seat usage limits | Billed by consumption at API rates |
| Claude Console (API key) | No plan limit | Billed per token; rate limits belong to the organization |

*Source: the Anthropic pages listed under sources, read on 20 November 2026. "No number" means the page gives none.*

One catch: if an `ANTHROPIC_API_KEY` environment variable is set, Anthropic's help page says Claude Code uses that key instead of your subscription, so usage is charged at API rates and the plan's included usage isn't touched. A profile that signs in with a key has no plan limits for any tool to read.

## What counts toward the Claude Code limit?

Anthropic's help pages name the model, the length of the work and the features you use. Its costs page adds what makes a long session expensive: Claude Code sends the whole conversation with every request, so a long context costs more on each turn; the first message after a long break misses the prompt cache and reprocesses the context; and scheduled tasks, subagents and agent teammates send requests of their own. Anthropic's help page on models and limits in Claude Code also says Opus uses meaningfully more of your quota than Sonnet.

You don't have to guess which of these is yours. On Pro, Max, Ultra, Team and Enterprise plans, `/usage` shows a breakdown of what counts against your plan limits, by skill, subagent, plugin and MCP server, with suggested changes. {{live:/blog/claude-code-cost-tracker/}}What the dollar figures in `/usage` mean, and how they differ from your bill, is in [Claude Code cost tracker](/blog/claude-code-cost-tracker/).{{/live}}

## What is the Claude Code weekly limit?

The weekly limit is the slower cap, and in Claude Code it is the one a heavy week hits. It applies across all models, resets once a week at a fixed time assigned to your account, and doesn't move if you start late. Max and Ultra also have a separate weekly limit for Fable. Anthropic's Max page lists a Fable limit apart from the general weekly one, and its Fable page says Max can use up to 50% of the weekly limit on Fable models at no extra cost, from the same weekly limit rather than on top of it.

Your next weekly reset is in Settings ▸ Usage, and `/usage` in Claude Code shows plan usage bars. Anthropic occasionally hands out limit resets to eligible plans, which put a limit back to full, but the "Reset for free" button is on the web, Claude Desktop and mobile, not in the terminal or an IDE. [When Claude limits reset](/blog/claude-limit-reset-time/) covers the timing.

## How can you see a Claude Code limit coming?

Claude Code gives you four ways, and the Mac app on the list is a fifth.

- **`/usage`.** Anthropic's commands page says it shows session cost, plan usage limits and activity stats; `/cost` and `/stats` are aliases. The Session block's dollar figure is for API users and isn't your bill on a subscription. The breakdown can be switched between the last 24 hours and the last 7 days with `d` and `w`, and it's computed from this machine's session history, so use from other devices or claude.ai isn't in it. A message such as "rate limited until 3:14am" in `/usage` means Claude Code can't fetch your limits until then, not that your work is limited.
- **Warnings.** Claude Code can tell you that you've used most of a window, with a message such as "You've used 85% of your session limit · resets 3:45pm". Anthropic's Claude Code plan page says you see warnings as you approach any limit.
- **The status line.** Anthropic's error reference says you can add the `rate_limits` fields to a custom status line. {{live:/blog/claude-code-status-line/}}[How to set up a Claude Code status line](/blog/claude-code-status-line/) has working examples.{{/live}}
- **The Desktop app.** Click the usage ring to see what's left.
- **cl_audit.** It reads each profile's 5-hour and weekly figures from Anthropic with that profile's Claude Code sign-in, and shows them in a Dock icon, on a dashboard card and, if you turn it on, in a menu bar icon. It sends a notification when a limit reaches a level you set, and, with **Notify when back** on by default, another when a full limit resets. [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) shows how, and [how to check Claude usage on a Mac](/blog/check-claude-usage-mac/) compares it with the other options.

If you use Claude Code from more than one Claude account, each profile in cl_audit is one Claude Code folder with its own sign-in and its own limits, so you see every account's 5-hour and weekly limit without running `/usage` in each. The [Claude Code usage history](/use-cases/claude-code-usage-history/) page covers the tokens-per-day view, read from the session files on your Mac.

## What happens when you reach a Claude Code limit?

Claude Code tells you, and it blocks further requests until the reset time in the message. The messages read like "You've hit your session limit · resets 3:45pm" and "You've hit your weekly limit · resets Mon 12:00am". Anthropic's error reference says session and weekly limits are shared across all models, so switching with `/model` doesn't restore access. "You've hit your Opus limit" and "You've hit your Sonnet limit" apply only to that model family, and a model outside it keeps you working.

A few things can soften the stop, according to Anthropic's pages:

- **A short wrap-up.** If you reach the 5-hour limit partway through a response, Claude Code may finish the step in progress and show "Usage limit reached · wrapping up". It's small and capped, counts toward your weekly limit, and is rolling out gradually. Pro gets it up to once per weekly period; Max can get it each time within the weekly limit.
- **Wait and continue.** In an interactive session signed in with a claude.ai subscription, Claude Code can wait in the open session and continue the interrupted task shortly after the reset. `/rate-limit-options` lists ways to keep working: wait, add usage credits or upgrade.
- **Usage credits.** With credits on, requests continue at standard API rates until your monthly spend limit or your balance runs out; `/usage-credits` manages them. [Claude usage credits explained](/blog/claude-usage-credits/) has the rates. {{live:/blog/claude-spend-limit/}}[The Claude spend limit](/blog/claude-spend-limit/) explains the messages when a credit cap is the thing you've hit.{{/live}}
- **A different plan.** Anthropic's Claude Code plan page lists upgrading from Pro to Max, or Max to Ultra, as an option. [Claude Max vs Pro](/blog/claude-max-vs-pro/) compares what each gives.

Not every "limiting" message is your quota. "Server is temporarily limiting requests (not your usage limit)" is a server-side throttle that Claude Code retries by itself, and a "Request rejected (429)" is the rate limit set for your API key or cloud project, not your subscription. A context or auto-compact warning isn't a usage limit either: it means the conversation is close to the context window.

## What are the Claude Code limits per developer on a team?

On a Team or Enterprise seat, each member draws on their own seat allowance. Limits are per member: one developer reaching theirs doesn't stop the others, and usage can't be moved between members. Past it, usage credits carry on if an admin turned them on, with spend limits for the organization, a group or one member. On the Console, an admin sets spend limits per workspace, and Anthropic's workspaces page says the automatically created Claude Code workspace is the only one with per-user monthly spend limits.

The per-user token and request figures Anthropic recommends when you ask for higher organization limits are in the [Claude Code limits per developer](/blog/claude-usage-limits/#claude-code-limits-per-developer-on-team-and-the-api) section of the usage-limits article, not repeated here. Admins see spend in the spend report in organization analytics, and [a Claude Team and personal account](/blog/claude-team-and-personal-account/) shows how a Team seat and a personal plan on one Mac stay separate.

## Keeping an eye on it

The honest summary is that Anthropic gives you the plan, the two windows and the messages, and leaves the numbers to Settings ▸ Usage and `/usage`. cl_audit doesn't change any limit and doesn't raise one; it reads the same figures from Anthropic and puts them where you'll see them, for each of your accounts. It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. If you want to try it, [install cl_audit](/install/), or look at the [demo dashboard](/dashboard/) first.
