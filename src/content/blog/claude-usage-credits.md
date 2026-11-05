---
title: "Claude usage credits: what they are and what they cost"
description: "Claude usage credits keep a paid plan working past its limits at standard API rates. When they start, what they cost, and how to turn them on or off."
h1: "Claude usage credits explained: when they start and what they cost"
mainKeyword: "claude usage credits"
kind: what-is
published: 2026-11-10
updated: 2026-11-10
draft: true
author: n-uf
takeaways:
  - "Usage credits are a pay-as-you-go balance on a paid Claude plan. Once an included limit is used up, your requests go on at standard API rates, billed apart from the subscription."
  - "On Pro, Max and Ultra you turn them on yourself in Settings ▸ Usage, or with /usage-credits in Claude Code, and you can cap them with a monthly spend limit or switch them off at any time."
  - "Some models bill to usage credits from the first request: Fable on Pro and on standard Team seats, and, in Claude Code, Sonnet 4.6 with 1M context on every plan."
  - "On Team and seat-based Enterprise plans, an Owner or Primary Owner turns them on in Organization settings ▸ Usage. Members without billing access can request them with /usage-credits."
  - "\"Extra usage\" is the older name: Anthropic's Claude Code commands page says /usage-credits was previously /extra-usage."
faq:
  - q: "What are Claude usage credits?"
    a: "A pay-as-you-go option on Pro, Max, Ultra, Team and seat-based Enterprise plans. With them on, a full plan limit doesn't stop you: your requests switch to usage credits, billed at standard API rates apart from your subscription. That goes on until you reach your monthly spend limit, or your balance runs out with auto-reload off."
  - q: "Is Claude extra usage the same as usage credits?"
    a: "Yes. Anthropic's Claude Code commands page lists /usage-credits as \"Previously /extra-usage\", and its docs still link to the help article at an address ending in extra-usage-for-paid-claude-plans, which opens \"Manage usage credits for paid Claude plans\". Anthropic's pages now say usage credits."
  - q: "How much do Claude usage credits cost?"
    a: "There's no price per credit or per message. Usage is billed at standard API rates, which Anthropic's API pricing page lists per million tokens for each model, so the cost depends on the model and how much text goes through. Settings ▸ Usage shows your month-to-date spend, and so does /usage in Claude Code while credits are on."
  - q: "Why does Claude say usage credits are required for this model?"
    a: "On your plan, that model or feature is paid for with usage credits rather than your included limits. In Claude Code, \"Requires usage credits\" on the Fable row of /model means Fable bills to credits for you. \"Usage credits required for 1M context\" means your plan includes that model's 1M-token window only through credits; Anthropic calls it an entitlement check, so it can appear while your limits still have room."
  - q: "Do Claude Team members need the owner to turn on usage credits?"
    a: "Yes. An Owner or Primary Owner enables them in Organization settings ▸ Usage, sets the organization's monthly spend limit and chooses which members can use them. A member without billing access who runs /usage-credits in Claude Code sends a request to the admins instead."
sources:
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-05
  - title: "Manage usage credits for Team and seat-based Enterprise plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12005970-manage-usage-credits-for-team-and-seat-based-enterprise-plans"
    checked: 2026-11-05
  - title: "Troubleshoot Claude error messages (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12466728-troubleshoot-claude-error-messages"
    checked: 2026-11-05
  - title: "Claude Fable models on your plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan"
    checked: 2026-11-05
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-05
  - title: "What is a limit reset? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17007452-what-is-a-limit-reset"
    checked: 2026-11-05
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-05
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-05
  - title: "Manage costs effectively: add usage credits to your subscription (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-05
  - title: "Commands (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-05
  - title: "Interactive mode: wait for a usage limit to reset (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/interactive-mode"
    checked: 2026-11-05
  - title: "Error reference: usage limits (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-05
  - title: "Model configuration: Fable and usage credits, extended context (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/model-config"
    checked: 2026-11-05
  - title: "Claude pricing (claude.com)"
    url: "https://claude.com/pricing"
    checked: 2026-11-05
  - title: "Pricing (Claude API Docs)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
    checked: 2026-11-05
  - title: "cl_audit README, version 26.11.0 (n-uf/cl_audit): limits, alerts, usage credits"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-05
related:
  - /blog/claude-usage-limit-reached/
  - /blog/claude-max-vs-pro/
  - /blog/claude-usage-limits/
  - /use-cases/claude-usage-limit-alerts/
---

Claude usage credits are a pay-as-you-go balance on a paid Claude plan. When you use up a limit your plan includes, or pick a model your plan only pays for through credits, your requests are billed to that balance at standard API rates instead of being refused. The charges come apart from your subscription. On Pro, Max and Ultra you turn credits on in Settings ▸ Usage, or with `/usage-credits` in Claude Code, and you can cap them with a monthly spend limit. On Team and Enterprise an Owner turns them on.

Everything about Claude below comes from Anthropic's help and docs pages, read on 5 November 2026 and listed at the end. Where they give no number, we don't either. cl_audit is an independent tool, not affiliated with Anthropic.

## Is Claude extra usage the same as usage credits?

Yes. Extra usage is the older name. Anthropic's Claude Code commands page describes `/usage-credits` and adds "Previously `/extra-usage`". Its docs still link to the help article at an address ending in `extra-usage-for-paid-claude-plans`, and that address opens "Manage usage credits for paid Claude plans". The old wording survives in one place we found: the limit reset page says a reset doesn't refund "extra usage you've already been billed for". In Settings and in the docs, look for usage credits.

They're also not the monthly API credits that come with Max, Ultra and Team. The pricing page says those are for building on the Claude Platform, and the help page says they don't apply to usage credits in Claude, Claude Code or Claude Cowork.

## When Claude usage credits kick in

| Trigger | What happens | Anthropic's page |
|---|---|---|
| A limit your plan includes is full: a five-hour session limit, the weekly limit, or the separate weekly Fable limit on Max and Ultra | If credits are on and funded, requests switch to them and keep working | Usage credits for paid plans |
| A model or feature your plan only covers through credits | Billed to credits from the first request, with your limits still open | Fable help page, Claude Code docs |

The first row is the usual case. The second catches people out, because nothing looks full.

Fable is the main example. On Pro, and on standard seats on Team and seat-based Enterprise plans, Fable models "run on pay-as-you-go usage credits from the start". On Max, Ultra and premium seats, Fable can use up to 50% of your weekly limits; after that you either continue on credits or switch to another model.

Claude Code has a few more. Sonnet 4.6 with 1M context requires usage credits on every subscription plan, Max and Ultra included, and Opus 4.6 with 1M context requires them on Pro. Newer models, Sonnet 5 and later and Opus 4.7 and later among them, run with the 1M window by default and have no `[1m]` variant to pick. `/ultrareview` includes three free runs on Pro, Max and Ultra, then needs credits.

Your limits keep their schedule. Anthropic says session limits still reset every five hours and weekly limits once a week, credits or not ([when each one resets](/blog/claude-limit-reset-time/)). How the limits themselves work is in [Claude usage limits explained](/blog/claude-usage-limits/).

## What Claude usage credits cost

There's no price per credit and no price per message. Anthropic says usage on credits is billed at standard API rates, and that it shows up on your bill as additional charges, separate from the subscription.

Those rates are per million tokens and differ by model. On Anthropic's API pricing page on 5 November 2026, Claude Sonnet 5.5 was $2 per million input tokens and $10 per million output tokens, and Claude Fable 5.1 was $10 and $50. Cache writes and reads have their own prices. Anthropic adds that prices and plans can change.

So a long conversation, a large attachment or a Fable request costs more than a short Sonnet exchange. Anthropic's own tips for keeping the bill down: use Haiku or the latest Sonnet for most tasks, use up your plan's included usage first, start a new chat for a new topic, keep reference documents in project knowledge instead of uploading them again, and begin with a conservative spend cap.

On Pro, Max and Ultra you pay in advance with **Add funds**, and auto-reload can top the balance up when it falls below a threshold you set. In most places credits don't expire. In some, Japan for one, they expire six months after purchase starting 10 September 2026; you get an email seven days before, and the Usage page shows the dates.

## How to turn usage credits on and off

On Pro, Max and Ultra, Anthropic's help page gives these steps:

1. Open Settings ▸ Usage in Claude and find the Usage credits section.
2. Click **Enable**, and add a payment method if you haven't.
3. Click **Adjust limit** to set a monthly spend limit, or **Set to unlimited**.
4. Click **Add funds**, enter an amount and click **Purchase**. Turn on auto-reload here if you want it.

If you subscribed through the Claude mobile app, you can only enable and buy credits in Claude on the web, after adding a payment method there.

To switch them off, go back to Settings ▸ Usage. You can disable them at any time, and then you have only your plan's included usage. The same page shows your balance, this month's spend and past use, kept apart from the included limits.

## Claude Code usage credits

Credits cover Claude Code in the terminal as well as chats in Claude, and both draw on the same plan limits. In Claude Code, `/usage-credits` is the shortcut: on Pro, Max and Ultra it opens Settings ▸ Usage in your browser, or prints the address when no browser can open, over SSH for example. It only works when you're signed in with your claude.ai subscription, not with an API key.

How do you know Claude Code is now using usage credits? While credits are on, `/usage` shows a usage-credits row with this month's spend against your monthly spend limit, or "Unlimited" if you set none. When your plan bills Fable to credits, Claude Code asks whether to continue on Fable using usage credits or switch to your default model. If nobody answers that prompt, for example in a background session, the turn ends with "Fable 5.1 now uses usage credits" and nothing is sent.

When a limit stops Claude Code, `/rate-limit-options` offers adding usage credits next to waiting for the reset and upgrading. If Claude Code is already waiting for the reset, the waiting line can say "/usage-credits to continue now", and once you've added credits that way, it checks again and carries on right away if usage is available. What each limit message means is in [the guide to a reached usage limit](/blog/claude-usage-limit-reached/).

## Claude Team usage credits: who turns them on

On Team, credits are the organization's decision. An Owner or Primary Owner opens Organization settings ▸ Usage, clicks **Enable**, pays for credits, can set auto-reload, sets a monthly spend limit for the whole organization and picks which members, or everyone, can use them. Anthropic's Team page says this works for members on all seat types.

Seat-based Enterprise differs in two ways. Credits are billed at the end of each month for what was used, not prepaid. And spend limits can be set for the organization, by seat tier (Standard or Premium), or per member. Usage-based Enterprise plans are billed at API rates from the first token, so usage credits don't apply to them.

A member without billing access who runs `/usage-credits` in Claude Code confirms, and a request goes to the admins. On seat-based Enterprise, members also get a "Request usage credits" link when they reach a limit; it asks for a Premium seat or credits and then reads "Request sent to admin". Owners can switch requests off with the Usage credit requests toggle.

A spend limit can be passed slightly. Anthropic checks the limit before a request and counts the tokens after it, so one request may go over; the next ones are blocked.

## Messages you may see

| Where | Message | What it means |
|---|---|---|
| Claude | "5-hour limit resets [time] - continuing with usage credits" | A limit is full and your request went through on credits |
| Claude | "Now using credits. Your plan limit resets [day] at [time]" | The same; this replaces the limit error while credits are on |
| Claude Code, `/model` | "Requires usage credits" on the Fable row | On your plan, Fable bills to credits |
| Claude Code | "API Error: Usage credits required for 1M context · run /usage-credits to turn them on (they take effect after you restart Claude Code), or /model to switch to standard context" | An entitlement check, not a used-up allowance |
| Claude Code | "You've hit your monthly spend limit · raise it at https://claude.ai/settings/usage?from=cc_cli_limit_message" | Your credits reached the spend limit you set |
| Claude Code, Team or Enterprise | "You've hit your individual spend limit · ask your admin for a higher limit", or the org's or team's version | A limit your organization set has been reached |

On Pro, Max and Ultra, when you hit your spend limit with credits still in the balance, Claude Code offers to raise or remove the limit without leaving the CLI.

One thing looks worse than it is. The "approaching your limit" warning can still be on screen at the moment you switch to credits. You haven't been cut off; the message changes to "Now using credits" once the next request goes through.

## Claude usage credits vs plan limits, and vs a bigger plan

Plan limits refill on their own, every five hours and every week. Credits are a balance you spend down, and every token on them costs money. They sit on top of the plan and never replace its included usage.

A bigger plan raises the included limits instead. Anthropic's Max page says Max gives five times the Pro plan's usage every five hours and every week; [Claude Max vs Pro](/blog/claude-max-vs-pro/) sets the two plans side by side. Which costs you less depends on your own usage, and Anthropic gives no rule for it. Your own numbers answer it:

- How often did a limit stop you last month, and how long did you wait?
- What does Settings ▸ Usage, or the `/usage` row, say you spent on credits this month and before?
- How does that compare with the price difference to the next plan on the pricing page?

## See the limit coming before credits start

Credits start when a limit is full, so the useful warning comes before that. Claude shows "Approaching session limit" or "Approaching weekly limit", and Settings ▸ Usage and `/usage` show how far along you are.

If you keep several Claude setups on one Mac, cl_audit, our free [Claude usage tracker](/) for macOS, shows each profile's 5-hour and weekly limits in the Dock. In a profile's settings, under Alerts, Notify at sends a Mac notification when a limit reaches a level you pick, and Notify when back, on by default, sends one when a full limit resets.

![cl_audit alert settings: Notify at and Notify when back](/img/guides/alert-settings.webp "cl_audit's Alerts: Notify at a level, and Notify when back for the reset. Sample data.")

While a profile is spending usage credits, its card, panels and Dock icon's menu say so: "Using usage credits · $4.20 spent". At other times nothing about credits is shown. With alerts on, cl_audit also sends one when a profile starts spending credits ("Claude Work is using usage credits · The 5-hour limit is full · $0.40 spent so far") and another when they run out. Your balance and spend limit stay in Settings ▸ Usage and `/usage`.

[How the alerts work](/use-cases/claude-usage-limit-alerts/) covers both settings, and [the install steps](/install/) are short. The [cl_audit FAQ](/faq/) says what the Dock icon shows while a limit is full.
