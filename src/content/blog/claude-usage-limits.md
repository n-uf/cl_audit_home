---
title: "Claude usage limits explained: 5-hour and weekly (2026)"
description: "How Claude usage limits work: the 5-hour and weekly limits, what counts toward them, what Anthropic says each plan gets, and where to see your usage."
h1: "Claude usage limits explained: the 5-hour and weekly limits"
mainKeyword: "claude usage limits"
kind: what-is
published: 2026-11-02
updated: 2026-11-02
author: n-uf
takeaways:
  - "Paid Claude plans have two usage limits: a session limit that resets every five hours and a weekly limit that resets once a week."
  - "The 5-hour period starts with your first message; the weekly reset happens at a fixed time assigned to your account."
  - "claude.ai, Claude Code and Claude Desktop all count toward the same limit."
  - "Anthropic gives plan sizes as multiples of Pro (Max five times, Ultra ten times a week), not as message counts."
  - "Your exact figures and next reset are in Settings ▸ Usage, or in Claude Code with /usage."
faq:
  - q: "What is the Claude 5-hour limit?"
    a: "It's the session limit on paid plans: how much you can use Claude within a five-hour period. The period starts when you send your first message, and the limit resets in full five hours later."
  - q: "What is the Claude weekly limit?"
    a: "It's a second cap that applies across all models and resets once a week, at a fixed time assigned to your account. Max and Ultra also have a separate weekly limit for Fable."
  - q: "Do Claude Code and claude.ai share the same limit?"
    a: "Yes. Anthropic's help page says usage on claude.ai, Claude Code and Claude Desktop counts toward the same limit, and its Claude Code page says the same for IDE use. A long Claude Code session can use up what you wanted for chat."
  - q: "How many messages do I get on Claude Pro?"
    a: "Anthropic doesn't give a number. Its Pro page says the count varies with message length, attached files, the length of the conversation and the model or feature you use."
  - q: "What happens when I reach a Claude usage limit?"
    a: "You can wait for the limit to reset, upgrade your plan, or turn on usage credits to keep working at pay-as-you-go rates. Claude and Claude Code both show when the limit resets."
sources:
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Usage limit best practices (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9797557-usage-limit-best-practices"
    checked: 2026-11-02
  - title: "Get started with Claude, Free plan limits (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8114491-get-started-with-claude"
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
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-02
  - title: "What is a limit reset? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17007452-what-is-a-limit-reset"
    checked: 2026-11-02
  - title: "Commands (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-02
  - title: "Error reference, Usage limits (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-02
related:
  - /blog/claude-limit-reset-time/
  - /blog/check-claude-usage-mac/
  - /use-cases/claude-usage-limit-alerts/
---

Claude usage limits cap how much you can use Claude in a given stretch of time. A paid plan has two: a session limit, the "5-hour limit", that resets five hours after your first message, and a weekly limit that resets once a week at a time fixed for your account. Anthropic's help page also says claude.ai, Claude Code and Claude Desktop draw on the same limit, so a long coding session and a long chat spend from one budget.

Everything below about Claude comes from Anthropic's own help and docs pages as of November 2026, listed at the end. Where those pages give no figure, we don't give one either.

## What are Claude's usage limits?

Anthropic's help page calls usage limits a kind of conversation budget. They control how much you can interact with Claude, or how long you can work with Claude Code, before you have to wait for a reset. Paid plans have a session limit that resets every five hours and weekly limits that reset once a week. The Free plan, per Anthropic's getting-started page, has a session-based limit that also resets every five hours.

Two details are easy to miss.

Usage limits are not length limits. A length limit is about the context window: how much text one chat can hold. You can hit a length limit with plenty of usage left, and the other way round. Anthropic treats them as separate things, and this article is only about usage.

The limits can also change. The help page says Anthropic may adjust usage limits at its discretion to manage capacity, for example with weekly and monthly caps or limits on certain models and features, and that it doesn't guarantee uninterrupted service. A number from a forum post last spring is a snapshot, nothing more.

## The 5-hour limit

The 5-hour limit is how much you can use Claude within a five-hour period. In Anthropic's words, the period starts when you send your first message, and your limit resets in full five hours later. Reach it sooner and you can use Claude again once it resets.

Say your first message goes out at 09:10. The window ends at 14:10. Use most of it by 11:00 and you wait until 14:10; use a little and you have room the whole time. (The times are our example, not Anthropic's.)

Settings ▸ Usage shows it under "Current session", with the time remaining.

Verified Ultra accounts don't have a five-hour limit at all. More on that under the plans.

For how to read the exact reset time, see [when Claude limits reset](/blog/claude-limit-reset-time/).

## The weekly limit

The weekly limit is the slower cap. It applies across all models, and Anthropic's Max and Ultra pages add a separate weekly limit for Fable. It resets at a fixed time each week that is assigned to your account.

Anthropic's help page says your reset day and time stay the same no matter when you start using Claude or when your subscription begins, and you get your full weekly allowance each cycle. So waiting a day to start doesn't move the reset. Settings ▸ Usage shows your next reset time.

Both limits run at once. Claude Code's error reference says usage counts against the session and weekly allowances at the same time, and that one burst of heavy activity, such as a large workflow fanout, can use up the weekly allowance before the session window resets. Roughly: the 5-hour limit stops you on a busy afternoon, the weekly one on a busy week.

## What counts toward Claude usage limits

Anthropic's help page names the length and complexity of your conversations, the features you use, the model you're chatting with and the effort level you've selected. Its best-practices page breaks that down:

- message length and the size of attached files
- the length of the current conversation
- tool use, such as Research and web search
- model choice and effort level
- creating artifacts
- multi-step tasks, like running code, creating files or browsing websites

Some things cost less. Anthropic says content in projects is cached and counts less against your limits when reused, and that Claude remembers context from earlier in the conversation, so you don't need to repeat it.

Long chats cost more. With code execution on, Claude summarizes earlier messages as a conversation nears the context window, and the help page says conversations that trigger this automatic context management consume more of your usage limit. Its advice: start a new conversation if you're close to a limit in a long one.

The budget is shared across surfaces. Usage on claude.ai, Claude Code and Claude Desktop counts toward the same limit, and Anthropic's Claude Code plan page says IDE usage does too. On a Pro or Max plan, your terminal sessions and your chats come out of one allowance. Seeing where those tokens go is a different job from reading the limit bars; [checking Claude usage on a Mac](/blog/check-claude-usage-mac/) goes through the options.

Claude Code also has limits for one model family. Its error reference lists "You've hit your Opus limit" and "You've hit your Sonnet limit", which apply only to requests to that family, so switching to a model outside it with `/model` keeps you working. The session and weekly limits are shared across all models, and switching doesn't help there.

## Limits by plan

Anthropic doesn't publish message counts. Its plan pages say which kinds of limit each plan has and, for some plans, give a multiple of Pro. The table holds only what those pages state; "not stated" means the page says nothing on that point.

| Plan | Session (5-hour) limit | Weekly limit | How much, per Anthropic |
|---|---|---|---|
| Free | Yes, resets every five hours | Not stated | No number; varies with demand |
| Pro | Yes | Yes, across all models | No number; more per session than Free |
| Max | Yes | Yes, across all models, plus one for Fable | 5x Pro, every five hours and every week |
| Ultra | None once verified; a temporary limit until then | Yes, across all models, plus one for Fable | 10x Pro, every week |
| Team, Standard seat | Yes, a per-session allowance | Yes, across all models | 1.25x Pro's per-session allowance |
| Team, Premium seat | Yes, a per-session allowance | Yes, across all models | 6.25x Pro's per-session allowance |

Enterprise isn't in the table. Anthropic's usage page splits it in two: seat-based Enterprise plans can buy usage credits like other paid plans, and usage-based Enterprise plans are billed by consumption.

### Claude Pro usage limits

Anthropic's Pro page says Pro gives more usage per session than Free, and that the number of messages you can send varies with message length (attached files included), the length of the current conversation, and the model or feature you use. Pro has a five-hour limit and a weekly limit across all models. The page gives no message count, so a "Pro gets N messages" figure you see elsewhere isn't Anthropic's.

### Claude Max usage limits

Max is set as a multiple: five times Pro's usage every five hours and every week. It has a five-hour limit, a weekly limit across all models and a separate weekly limit for Fable.

The names have changed. Anthropic's Ultra page says the Max 20x plan is now called Ultra, and existing Max 20x subscribers moved to it automatically with no price change. An older guide that talks about "Max 5x and Max 20x" means today's Max and Ultra.

### Ultra and Team

Ultra includes ten times Pro's usage every week. Verified accounts have no five-hour limit. Anthropic verifies Ultra accounts automatically, and until then a temporary limit applies. To check yours, open Settings ▸ Usage: no "Current session" bar means you're verified.

On Team plans, limits are per member, not shared by the team. One person reaching their limit doesn't affect anyone else, and usage can't be moved between members, because each seat is for one named person.

## How to see your usage

**In Claude, on the web or in Desktop.** Open Settings ▸ Usage. It shows "Current session" for the 5-hour limit with the time remaining, and your next weekly reset. Claude Code's docs add that in the Desktop app you can click the usage ring to watch what's left.

**In Claude Code.** Run `/usage`. Anthropic's commands page says it shows session cost, plan usage limits and activity stats; on Pro, Max, Ultra, Team and Enterprise plans it adds a breakdown of what counts against your plan limits. `/cost` and `/stats` are aliases. For a constant readout, the error reference says you can add the `rate_limits` fields to a custom status line.

**Warnings.** Claude Code can warn you before a window runs out, with a message such as "You've used 85% of your session limit" and the reset time. Anthropic's Claude Code plan page says you'll see warnings as you approach any limit. To get them as macOS alerts instead, see [how cl_audit's alerts work](/use-cases/claude-usage-limit-alerts/).

**With more than one Claude setup on a Mac,** opening Settings ▸ Usage in each one gets old fast. cl_audit is our free Mac app for that: it reads the same 5-hour and weekly figures from Anthropic for each profile, using that profile's Claude Code sign-in, and shows them in the Dock (not the menu bar). It needs Claude Code signed in for each profile. cl_audit is an independent tool, not affiliated with Anthropic. [How to check Claude usage on a Mac](/blog/check-claude-usage-mac/) compares it with the other ways.

## What happens when you hit the limit

Anthropic's help page gives two choices: wait for the reset, or upgrade. If you upgrade, the new plan's limits apply right away.

![Dashboard card with a full 5-hour Claude limit](/img/guides/card-limit-full.webp "In cl_audit, a full 5-hour limit shows how long until it's back, and at what time. Sample data.")

Paid plans have a third. With usage credits enabled, your requests switch to pay-as-you-go pricing when you use up a limit, and your work continues. Anthropic says that usage is billed at standard API pricing rates, separately from your subscription, until you reach your monthly spend limit or your balance runs out. Session limits still reset every five hours and weekly limits once a week. You turn credits on in Settings ▸ Usage.

In Claude Code, the message says when to come back: "You've hit your session limit · resets 3:45pm", for example. The error reference says Claude Code blocks further requests until then. A few more details from Anthropic's pages:

- If you reach your session limit while Claude Code is partway through a response, it may keep working briefly to finish the step in progress, and you'll see "Usage limit reached · wrapping up". That allowance is small and capped, counts toward your weekly limit, and is rolling out gradually, so your account may not have it yet.
- In an interactive session signed in with a claude.ai subscription, Claude Code can wait in the open session and continue the interrupted task shortly after the reset. In the Desktop app's Code tab, the session-limit card has an "Auto-continue when limits reset" checkbox.
- Now and then Anthropic gives eligible plans a limit reset, which puts your session or weekly limit back to full when you choose to use it. That's not the same as a window's [reset time](/blog/claude-limit-reset-time/); weekly limits still reset on their usual day and time. The button is "Reset for free" in Settings ▸ Usage.

If you'd rather not watch the clock, cl_audit can notify you at a level you choose and again when a profile is back (Notify when back), and while a limit is full its Dock icon turns into the countdown. [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) shows how, and the [cl_audit](/) page covers the rest of the app.
