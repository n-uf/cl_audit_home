---
title: "Claude usage limit reached: what it means and what to do"
description: "Claude usage limit reached? See which limit stopped you, what each message in Claude and Claude Code means, and what you can do until it resets."
h1: "Claude usage limit reached? Which limit it is, and what you can do now"
mainKeyword: "claude usage limit reached"
kind: how-to
published: 2026-11-03
updated: 2026-11-05
author: n-uf
takeaways:
  - "Claude usage limit reached means you've used up your 5-hour session limit, your weekly limit or, on Max and Ultra, the separate weekly limit for Fable."
  - "Session limit, 5-hour limit and Current session are one limit on Anthropic's pages. The weekly limit is a second one, and your usage counts against both at once."
  - "You can wait for the time in the message, turn on usage credits to keep working at standard API rates, use a limit reset if you have one, or move to a bigger plan."
  - "A new chat doesn't start a new allowance: Claude, Claude Code and IDE use all draw on the same limits."
  - "Context limit and length limit messages are about one conversation's size, not about your allowance."
faq:
  - q: "Why did I hit my Claude limit after one message?"
    a: "Anthropic gives no message count, because usage depends on the model, the length of the chat, attached files and the tools used. One message can be a heavy one: long conversations and big attachments cost more, and in Claude Code every request carries the whole conversation. Claude, Claude Code and your IDE also share one limit, so work in any of them counts. Settings ▸ Usage in Claude, or /usage in Claude Code, shows where you stand."
  - q: "Does a new chat reset the Claude usage limit?"
    a: "No. Anthropic's help page says usage limits cover all your conversations, and that claude.ai, Claude Code and Claude Desktop count toward the same limit. A new chat can cost less per message than a long one, which is why Anthropic suggests starting one when you're close to a limit in a long chat, but it doesn't give you a new allowance."
  - q: "Is the Claude session limit the 5-hour limit?"
    a: "Yes. Anthropic's help page describes a session limit that resets every five hours, and Current session in Settings ▸ Usage shows how much of it you've used and the time remaining. The five-hour period starts when you send your first message."
  - q: "Can I keep working after the Claude limit is reached?"
    a: "On a paid plan with usage credits turned on, yes: your requests switch to pay-as-you-go pricing at standard API rates until you reach your monthly spend limit or your balance runs out. Without credits you wait for the reset, use a limit reset if you have one, or upgrade, and the new plan's limits apply right away. In Claude Code, an Opus or Sonnet limit blocks only that model family, so switching to a model outside it with /model keeps you working."
  - q: "Is \"Context limit reached\" the same as a usage limit?"
    a: "No. It's a length limit: the conversation has outgrown the context window, and your usage allowance isn't what ran out. In Claude Code, run /compact or /clear to continue. In Claude, start a new conversation or attach fewer or smaller files."
sources:
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-03
  - title: "Usage limit best practices (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9797557-usage-limit-best-practices"
    checked: 2026-11-03
  - title: "Troubleshoot Claude error messages (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12466728-troubleshoot-claude-error-messages"
    checked: 2026-11-03
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-05
  - title: "Manage usage credits for Team and seat-based Enterprise plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12005970-manage-usage-credits-for-team-and-seat-based-enterprise-plans"
    checked: 2026-11-03
  - title: "What is a limit reset? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17007452-what-is-a-limit-reset"
    checked: 2026-11-03
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-03
  - title: "Claude Fable models on your plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan"
    checked: 2026-11-05
  - title: "What is the Pro plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8325606-what-is-the-pro-plan"
    checked: 2026-11-03
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-03
  - title: "What is the Ultra plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan"
    checked: 2026-11-03
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-03
  - title: "Claude pricing, FAQ (claude.com)"
    url: "https://claude.com/pricing"
    checked: 2026-11-03
  - title: "Error reference, Usage limits (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-03
  - title: "Wait for a usage limit to reset (Claude Code Docs, Interactive mode)"
    url: "https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset"
    checked: 2026-11-03
  - title: "Commands (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-03
  - title: "Manage costs effectively (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-03
  - title: "Models, usage, and limits in Claude Code (Claude Help Center)"
    url: "https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code"
    checked: 2026-11-03
  - title: "Issue 16157, \"[BUG] Instantly hitting usage limits with Max subscription\" (github.com/anthropics/claude-code)"
    url: "https://github.com/anthropics/claude-code/issues/16157"
    checked: 2026-11-03
  - title: "cl_audit README (n-uf/cl_audit): limits, Dock icon, alerts"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-03
  - title: "cl_audit site: FAQ and Claude usage limit notifications (n-uf/cl_audit_home, origin/main on 2026-11-03)"
    url: "https://cl-audit.n-uf.com/use-cases/claude-usage-limit-alerts/"
    checked: 2026-11-03
related:
  - /blog/claude-limit-reset-time/
  - /blog/claude-usage-limits/
  - /use-cases/claude-usage-limit-alerts/
  - /blog/claude-max-vs-pro/
---

Claude usage limit reached means you've used up one of the allowances in your plan: the 5-hour session limit, the weekly limit or, on Max and Ultra, the separate weekly limit for Fable. Claude stops answering until the time shown in the message. Right now you have three options: wait for that time, turn on usage credits and keep going at pay-as-you-go rates (paid plans only), or use a limit reset if Anthropic has given you one. A bigger plan works too, but that decision can wait.

Everything below about Claude comes from Anthropic's own help and docs pages, read on 3 November 2026 and listed at the end. Where they give no number, we don't either. cl_audit is an independent tool, not affiliated with Anthropic.

## Which limit did you hit?

The message tells you which limit you hit. Claude and Claude Code word it differently, and Claude Code's "Usage limit reached" message comes in a few more forms. These are the wordings on Anthropic's pages.

| Where | What it says | Which limit |
|---|---|---|
| Claude | "5-hour limit reached - resets [time]" | The 5-hour limit |
| Claude | "You've reached your weekly limit. It resets [day] at [time]." | The weekly limit |
| Claude Code | "You've hit your session limit · resets 3:45pm" | The 5-hour limit |
| Claude Code | "You've hit your weekly limit · resets Mon 12:00am" | The weekly limit |
| Claude Code | "You've hit your Opus limit · resets 3:45pm" (or Sonnet) | That model family only |
| Claude Code, while it waits | "Usage limit reached · limit resets 3:45pm" | A claude.ai usage limit; Claude Code carries on after the reset |
| Claude Code, mid-response | "Usage limit reached · wrapping up" | The 5-hour limit, reached while a response was in progress |

That last one isn't a stop yet. Claude Code may keep working briefly to finish the step it's on. Anthropic calls this a wrap-up allowance: small, capped, counted toward your weekly limit, once per weekly period on Pro and each time you reach the session limit on Max. It's rolling out gradually, so your account may not have it.

"Session limit", "5-hour limit" and "Current session" all mean the same limit. The period starts with your first message, and the limit comes back in full five hours later. Settings ▸ Usage shows how much of it you've used under Current session, with the time left.

The weekly limit is the slower one. It resets at a fixed time assigned to your account, and your usage counts against both limits at once. So when the weekly limit is reached, the 5-hour reset doesn't get you back in. For the exact times, see [when Claude limits reset](/blog/claude-limit-reset-time/).

![Dashboard card with a full 5-hour Claude limit](/img/guides/card-limit-full.webp "In cl_audit, a full 5-hour limit shows how long until it's back, and at what time. Sample data.")

Which limits you have depends on the plan. Pro has the 5-hour limit and a weekly limit across all models, so a limit reached on Pro is one of those two. Max adds a separate weekly limit for Fable, so on Max a limit message can be about Fable alone. Anthropic says Max and Ultra can spend up to 50% of their weekly limits on Fable models at no extra cost; after that you either keep going on usage credits or switch models. On Pro, Fable runs on usage credits from the start. Verified Ultra accounts have no 5-hour limit. On Team, limits are per member, so when one person runs out, nobody else is affected. The per-plan details are in [Claude usage limits explained](/blog/claude-usage-limits/).

Two other messages look similar but aren't about your plan's allowance. "You've hit your monthly spend limit" means the usage credits that would have paid for the request reached their cap; if a plan window also ran out, the message says when it resets. And "Context limit reached · /compact or /clear to continue" in Claude Code, or "Your message will exceed the length limit for this chat" in Claude, means one conversation got too big. Anthropic says a very large first message can trigger the one in Claude.

## What to do when the Claude usage limit is reached

| Option | What it does | The catch |
|---|---|---|
| Wait | The limit comes back in full at the time in the message ([how the reset time works](/blog/claude-limit-reset-time/)) | A weekly reset can be days away |
| Let Claude Code wait for you | In an open interactive session, it continues the task after the reset (v2.1.234 or later, claude.ai sign-in). In the Desktop app's Code tab, tick "Auto-continue when limits reset" on the session-limit card | Keep the session open. It won't start on its own for a reset more than 24 hours away; `/rate-limit-options` lets you start it |
| Usage credits | Requests switch to pay-as-you-go at standard API rates and keep working | Billed apart from your plan, up to your monthly spend limit or until your balance runs out. Turn on in Settings ▸ Usage, or with `/usage-credits` in Claude Code. On Team, an Owner turns them on and members ask |
| A limit reset | Puts the session or weekly limit back to full | Only given now and then to eligible plans, and it can't be undone. The "Reset for free" button isn't in Claude Mobile or in Claude Code in a terminal or IDE |
| Another model, in Claude Code | After an Opus or Sonnet limit, `/model` to a model outside that family | No help with the session or weekly limit, which cover all models |
| A bigger plan | The new plan's limits apply right away | It costs more; [Claude Max vs Pro](/blog/claude-max-vs-pro/) compares the two |

On Pro, Max and Ultra you turn usage credits on yourself. Open the Usage credits section in Settings ▸ Usage, click Enable, add a payment method if you haven't, and add funds; you can also set a monthly spend limit. Your limits keep resetting as usual while you use them. Instead of the error, Claude then shows "5-hour limit resets [time] - continuing with usage credits" or "Now using credits". {{live:/blog/claude-usage-credits/}}What credits cost, which models need them from the start and how Team owners set them up is in [how Claude usage credits work](/blog/claude-usage-credits/).{{/live}}

Some things don't help. A new chat doesn't give you a fresh allowance, because Anthropic describes usage limits as covering all your conversations. Moving to another app doesn't either: Claude, Claude Code, Claude Desktop and IDE use all draw on the same limits. And switching models does nothing for a session or weekly limit.

cl_audit doesn't change any of this. It shows each profile's own limits, and doesn't pool them. A profile can switch to another of your own accounts, and you choose whether the switch takes its Code sessions along. Whether you may use more than one Claude account is set by Anthropic's terms.

## Why did Claude hit the limit so fast?

Anthropic's pages can't explain your particular case, but they do say what counts. There's no fixed message count. It depends on the length and complexity of your conversations, the model, the features you use and the effort level ([what counts toward Claude usage limits](/blog/claude-usage-limits/) has the longer version). The best-practices page adds message length, attachment size, tools such as web search, artifacts, and multi-step tasks like running code or browsing.

If the limit was reached too fast, even after one message, that message was probably carrying more than it looked like. The usual reasons, from Anthropic's pages:

- A long chat. With code execution on, Claude summarizes earlier messages as a conversation nears its context window, and Anthropic says conversations that trigger this use more of your limit.
- Claude Code itself. It sends your whole conversation with every request, so a one-line question in a session that has been open all day still draws usage for all of it. Your first message after a break longer than the prompt cache lifetime reprocesses the full context, and subagents send their own requests on top.
- The model. Anthropic's help page on Claude Code says Opus uses meaningfully more of your quota, and suggests Sonnet for routine work.
- Other surfaces. Chat in the morning and a coding session at lunch spend from the same allowance, and your 5-hour period may have started with a message you sent hours ago.

In Claude Code, `/usage` shows more than the bars. On a Pro, Max, Ultra, Team or Enterprise plan it breaks down what counted against your limits by skill, subagent, plugin and MCP server, and suggests changes. Those figures come from session history on that machine, so they leave out other devices and claude.ai.

## When the message looks wrong

Some errors aren't about your plan at all. Claude Code's docs say "Server is temporarily limiting requests (not your usage limit)" is a short server-side throttle, and that a 529 overloaded error doesn't count against your quota. In Claude, "Due to unexpected capacity constraints, Claude is unable to respond to your message" means high demand across all users. Anthropic says that isn't an outage and won't appear on its status page, so try again in a few minutes. Confirmed incidents are on status.claude.com.

With usage credits on, the "approaching your limit" warning can still be on screen at the moment your usage switches to credits. It looks like you've been cut off, but you haven't; it changes to "Now using credits" once the next request goes through.

In Claude Code, check which sign-in is active. Anthropic's help page says that if an `ANTHROPIC_API_KEY` environment variable is set, Claude Code uses that key instead of your subscription. The error reference says "Request rejected (429)" is a rate limit on an API key or cloud project, and suggests `/status` to confirm the credential.

And if `/usage` says something like "rate limited until 3:14am", that's about Claude Code fetching your plan limits, not about your work. It can't refresh the figures until then.

If you suspect the meter itself, there is a user report about that. A GitHub issue on Claude Code's repository, "[BUG] Instantly hitting usage limits with Max subscription", opened on 3 January 2026, describes a Max subscriber hitting limits after about two hours of continuous use, having never hit them in the three months before. On 3 November 2026 it was still open, with about 1,500 comments. It's one user's report, and Anthropic's pages neither confirm nor explain it.

## Next time, see it coming

Claude warns you before you run out. The Claude app shows "Approaching session limit" or "Approaching weekly limit", or a percentage such as "You've used X% of your weekly limit". Claude Code can say "You've used 85% of your session limit" with the reset time. Settings ▸ Usage in Claude and `/usage` in Claude Code show the bars whenever you ask. In the Desktop app you can click the usage ring, and Claude Code's status line can show the `rate_limits` fields.

All of those live inside the app you're using. If you run several Claude setups on one Mac, or leave long tasks running while you're in another app, cl_audit, our free [Claude usage tracker for Mac](/), puts each profile's 5-hour and weekly limits in the Dock, with an optional menu bar icon per profile. It needs Claude Code signed in for each profile. When a limit is full, the Dock icon turns into a countdown and the card says when the profile is back, as in "back at 15:28". On Max and Ultra, Fable's weekly limit gets a third row on the card, and you can turn it off per profile. While a profile is spending usage credits, its card says so: "Using usage credits · $4.20 spent".

![cl_audit alert settings: Notify at and Notify when back](/img/guides/alert-settings.webp "cl_audit's Alerts card: Notify at a level, and Notify when back for the reset. Sample data.")

In a profile's settings, under Alerts, Notify at sends a macOS notification at a level you pick, from 50% to 100%. Notify when back, on by default, sends one more when a full limit resets. With alerts on, cl_audit also tells you when a profile starts spending usage credits and when they run out. [How the alerts work](/use-cases/claude-usage-limit-alerts/) covers each one, and [the install steps](/install/) are short. The [cl_audit FAQ](/faq/) has the rest, including what the app shows while a limit is full.
