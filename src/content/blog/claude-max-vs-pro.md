---
title: "Claude Max vs Pro: price and usage limits compared"
description: "Claude Max vs Pro, from Anthropic's own pages: price, 5-hour and weekly limits, Claude Code, usage credits, and how to check which plan fits your use."
h1: "Claude Max vs Pro: price, usage limits and how to choose"
mainKeyword: "claude max vs pro"
kind: comparison
published: 2026-11-03
updated: 2026-11-05
author: n-uf
takeaways:
  - "Anthropic's Max page says Max gives five times the Pro plan's usage every five hours and every week, at $100 a month on the web."
  - "Pro is $20 a month in the US on Anthropic's Pro page; the pricing page also shows $17 a month on the yearly plan ($200 billed up front)."
  - "Both plans include Claude Code, and Claude and Claude Code share one set of limits."
  - "Anthropic gives no message counts for either plan, so your own Settings ▸ Usage screen is the best evidence."
  - "Usage credits let a Pro or Max plan keep working after a limit at standard API rates, billed apart from the subscription."
faq:
  - q: "What is the difference between Claude Max and Pro?"
    a: "Usage and price. Anthropic's Max page says Max gives five times the Pro plan's usage every five hours and every week, for $100 a month on the web against Pro's $20. Max also has a separate weekly limit for Fable, and both plans include Claude Code."
  - q: "How much more usage does Claude Max have than Pro?"
    a: "Five times, per Anthropic: five times the Pro plan's usage every five hours and every week. Anthropic doesn't turn that into a message count, because the number of messages varies with message length, attached files, the length of the chat and the model or feature you use."
  - q: "How does the Claude Max vs Pro weekly limit compare?"
    a: "Max's weekly limit is five times Pro's, and both apply across all models. Max adds a separate weekly limit for Fable; on Pro, Fable runs on usage credits instead. Each weekly limit resets at a fixed time assigned to your account, shown in Settings ▸ Usage."
  - q: "Is Claude Max worth it for coding?"
    a: "Anthropic's pages don't answer that, because they give no session or message counts. Both plans include Claude Code on the same limits as chat, so the useful test is your own usage: how often the 5-hour limit fills, and how much of the weekly limit is left when it resets."
  - q: "Can I switch from Claude Pro to Max?"
    a: "Yes, you can upgrade. Anthropic's help page says that when you upgrade, the new plan's limits apply right away. The Max page also covers what happens to an annual Pro plan, so read it before you switch."
sources:
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-02
  - title: "What is the Pro plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8325606-what-is-the-pro-plan"
    checked: 2026-11-02
  - title: "What is the Ultra plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan"
    checked: 2026-11-02
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Claude Fable models on your plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan"
    checked: 2026-11-05
  - title: "Claude pricing (claude.com)"
    url: "https://claude.com/pricing"
    checked: 2026-11-02
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-02
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Claude Code docs: Commands (/usage)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-02
  - title: "Claude Code docs: Model configuration (Fable and usage credits)"
    url: "https://code.claude.com/docs/en/model-config"
    checked: 2026-11-02
  - title: "Claude Code docs: Use Claude Code in VS Code (Check account and usage)"
    url: "https://code.claude.com/docs/en/vs-code"
    checked: 2026-11-02
  - title: "cl_audit README (n-uf/cl_audit): usage figures, usage history"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-02
related:
  - /blog/claude-usage-limits/
  - /blog/claude-limit-reset-time/
  - /use-cases/claude-code-usage-history/
  - /dashboard/
---

Claude Max vs Pro comes down to usage and price. Anthropic's Max page says Max gives five times the Pro plan's usage every five hours and every week, and costs $100 a month on the web. Pro is $20 a month in the US, or $17 a month on the yearly plan ($200 billed up front), per Anthropic's pricing page. Both include Claude Code, which draws on the same limits as chat. Anthropic gives no message counts, so the way to choose is to look at your own usage: how often you hit the 5-hour limit, and how close you get to the weekly one.

Every figure below comes from Anthropic's help pages, Claude Code docs and pricing page, read on 2 November 2026. The pricing page shows prices before tax, and they can change. If a page doesn't say something, we don't either. How the limits themselves work is in [Claude usage limits explained](/blog/claude-usage-limits/); this page is only about choosing between the two plans. cl_audit is an independent tool, not affiliated with Anthropic.

## Claude Max vs Pro at a glance

| | Pro | Max |
|---|---|---|
| Price | $20 a month in the US, or $17 a month on the yearly plan ($200 billed up front) | $100 a month on the web; monthly only |
| Usage | More usage than Free | 5x Pro, every 5 hours and every week |
| 5-hour limit | Yes | Yes |
| Weekly limit | Yes, across all models | Yes, across all models, plus a separate weekly limit for Fable |
| Fable (pricing page wording) | "Fable, paid with usage credits" | "Fable included, up to half your weekly limit" |
| Claude Code | Included | Included |
| Claude Code wrap-up allowance | Up to once per weekly usage period | Can apply each time you reach a 5-hour limit, within your weekly limit |
| Usage credits | Can be turned on | Can be turned on |
| Monthly API credits | None | "$100 a month in API credits to build on the Claude Platform" |

The Max price is for web subscriptions; Anthropic says mobile pricing may vary. The wrap-up allowance is explained below.

Max is sold only as a monthly subscription. If you're on a yearly Pro plan and move to Max, the Max page says that when what's left on the Pro plan is worth more than the Max price, you get the rest as a credit toward future subscription costs. The billing address has to match your old subscription's.

## Claude Pro vs Max usage limits

For Max, five times is the only multiple Anthropic gives. Its Max page applies it to both limits: five times the Pro plan's usage every five hours and every week. The Pro page says Pro has a five-hour limit and a weekly limit across all models. Max has the same two, plus the separate weekly limit for Fable.

None of these pages turn the multiple into a count. The Pro page says the number of messages you can send varies with message length, attached files, the length of the conversation and the model or feature you use. The pricing page footnote says how fast you reach a limit depends on the model, the chat length and the file size. So "five times" is a ratio between two allowances. A message count from a forum post isn't Anthropic's.

Fable is where the two plans differ most. Anthropic's Claude Code docs call the Fable models the most capable in Claude Code. Its help page on Fable says that on Max you can spend up to 50% of your weekly limits on Fable at no extra cost; that comes out of the same weekly limit, not on top of it. On Pro, Fable isn't part of the plan's limits and runs on usage credits from the start. That's what the two pricing cards mean by "included, up to half your weekly limit" and "paid with usage credits".

Then there's the wrap-up allowance. If you reach the 5-hour limit while Claude Code is partway through a response, it may finish the current step, and you'll see "Usage limit reached · wrapping up". Anthropic's Claude Code plan page says Pro gets this up to once per weekly usage period, while on Max it can apply each time you reach a 5-hour limit, within your weekly limit. The allowance counts toward the weekly limit, and Anthropic says it's rolling out gradually, so your account may not have it yet.

Older guides talk about "Max 5x" and "Max 20x". Anthropic's Max page doesn't use those names; it says five times Pro. Its Ultra page says the Max 20x plan is now called Ultra.

## What about Ultra?

Ultra is the plan above Max. It costs $200 a month and gives ten times the Pro plan's usage every week, and verified Ultra accounts don't have a five-hour limit. It has a weekly limit across all models and a separate one for Fable. This comparison stops at Max; Anthropic's Ultra page has the rest.

## Is Claude Max worth it? Check your own usage

Anthropic's pages don't tell you which plan you need. They can't, since the answer depends on your model choice, how long your chats run and what you attach. What you can do is read your own numbers for a couple of weeks.

1. **Open Settings ▸ Usage in Claude.** It shows how much you've used and the time remaining under "Current session", and your next weekly reset. Look at it at the end of a heavy day.
2. **Run `/usage` in Claude Code.** Anthropic's commands page says it shows session cost, plan usage limits and activity stats, and on Pro and Max adds a breakdown of what counts against your plan limits. In the VS Code panel, the same command opens an Account & usage dialog with usage bars for the current session and the week.
3. **Write down two things.** How many days the 5-hour limit filled up, and how much of the weekly limit was left when it reset. [When your limits reset](/blog/claude-limit-reset-time/) explains how to read those times.

If the 5-hour limit fills often and the weekly limit stays far from full, the five-hour window is what stops you. If the weekly limit runs out first, that's the cap to compare. Max multiplies both. The monthly gap is $80 ($100 for Max against $20 for Pro billed monthly). What a full limit costs you in waiting is the other side, and only you know that number.

cl_audit can do the watching. It reads the same 5-hour and weekly figures from Anthropic for each profile, using that profile's Claude Code sign-in, and shows them in the Dock. On Max, Fable's weekly limit gets a third row on the card, unless you turn it off for the profile (Profile ▸ Fable's limit). It can notify you at a level you choose and again when a profile is back (Notify when back); [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) shows how. Its history panel adds tokens per day, split by project, model and surface, and [how the usage history works](/use-cases/claude-code-usage-history/) goes through it.

![cl_audit usage history: tokens per day by project](/img/guides/usage-history.webp "The history panel: tokens per day, and where they go by project, model and surface. Sample data.")

That history has one gap. It comes from Claude Code's session files on your Mac, so it leaves out claude.ai chats, other computers and cloud sessions. The limit bars don't have that gap, because they come from Anthropic.

## Is Claude Max worth it for coding?

Both plans include Claude Code, and the Claude Code plan page says all activity in Claude and Claude Code counts against the same limits. IDE usage counts too. A long coding session spends from the allowance you'd use for chat. The usage limits article linked above lists what costs more, such as long conversations and multi-step tasks.

The $100 a month in API credits on the Max card won't help here. Anthropic's Claude Code plan page says the monthly API credits included with Max and Ultra can't be used in Claude Code or the Claude apps, including for usage credits. The pricing card says what they're for: building on the Claude Platform.

Anthropic doesn't say how many Claude Code sessions either plan covers. Your `/usage` numbers are the closest you'll get.

## Usage credits: the other way past a limit

Usage credits let you keep working without changing plan. Anthropic's help page says they're for individuals on Pro, Max and Ultra. When you use up an included limit, your requests switch to pay-as-you-go pricing on usage credits. That usage is billed at standard API rates, separately from the subscription, until you reach your monthly spend limit or your balance runs out with auto-reload off.

To turn them on, open Settings ▸ Usage, find the Usage credits section and click **Enable**. You add a payment method, can set a monthly spend limit, and prepay with **Add funds**. Anthropic says usage credits apply to Claude conversations and to Claude Code terminal usage.

What you'd spend on credits depends on how far past the limits you go. Anthropic gives no figure to set against the $80 gap, so that number also has to come from your own usage.

## Watching either plan

On Pro or Max, the 5-hour and weekly limits are the two numbers to watch. cl_audit is a free [Claude usage tracker](/) for the Mac that shows both for every profile; the [Claude usage dashboard](/dashboard/) demo shows what its cards look like. It works with plans that have usage limits and needs Claude Code signed in for each profile. If you want to try it, [install cl_audit](/install/).
