---
title: "Claude spend limit: what it caps and how to raise it"
description: "The Claude spend limit caps what usage credits can bill each month. Which message you got, and how to raise or remove it on Pro, Max, Team and the API."
h1: "Claude spend limit: what it caps and how to raise it"
mainKeyword: "claude spend limit"
kind: what-is
published: 2026-12-04
updated: 2026-12-04
draft: true
author: n-uf
takeaways:
  - "A Claude spend limit is a monthly cap on pay-as-you-go spending: usage credits on a paid plan, or API usage in the Claude Console. It doesn't change your plan's 5-hour or weekly limits."
  - "The message tells you which limit it is: the plain \"monthly spend limit\" is your own cap on Pro, Max and Ultra, while \"individual\", \"org's\" and \"team's shared budget\" are set by an admin."
  - "On Pro, Max and Ultra you raise or remove it in Settings ▸ Usage, or with /usage-credits in Claude Code. On Team and Enterprise an Owner changes it in Organization settings ▸ Usage."
  - "The API has its own monthly cap by usage tier: $500 on Start, $1,000 on Build and $200,000 on Scale. You can set a lower limit of your own in the Claude Console."
  - "A limit can be passed slightly: Anthropic checks it before a request and counts the tokens after, so one request may go over and the next ones are blocked."
faq:
  - q: "What does a Claude spend limit cap?"
    a: "A monthly cap on pay-as-you-go spending. On Pro, Max and Ultra it caps your usage credits; on Team and Enterprise, an admin can set one for the organization, a seat tier or a member. The Claude API has its own monthly cap. None of them changes your 5-hour or weekly plan limits."
  - q: "How do I raise my spend limit in Claude?"
    a: "On Pro, Max and Ultra, open Settings ▸ Usage, find the Usage credits section and click Adjust limit, or run /usage-credits in Claude Code. On Team and Enterprise, an Owner changes it in Organization settings ▸ Usage. For the API, use Spend limits in the Claude Console."
  - q: "What does \"You've hit your monthly spend limit\" mean in Claude Code?"
    a: "Your usage credits reached the monthly spend limit you set, so a request that a plan limit would have sent to credits was refused. Raise the limit in Settings ▸ Usage. If the message also names a reset time for your plan's window, you can wait for that instead."
  - q: "Does the Claude spend limit reset every month?"
    a: "Yes, it's monthly. For usage credits, Anthropic's Team help page says a member who reaches their limit has their credits paused until the end of the month. On the API, hitting your tier's cap pauses usage until 00:00 UTC on the first day of the next month, unless you ask for a higher limit sooner."
  - q: "Is there a spend limit on the Claude API?"
    a: "Yes. Each usage tier carries a monthly cap: $500 USD on Start, $1,000 on Build and $200,000 on Scale, while Custom organizations have none. You can set your own lower limit under Spend limits in the Claude Console, and a limit you set returns an HTTP 400 error when it's reached."
sources:
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-16
  - title: "Manage usage credits for Team and seat-based Enterprise plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12005970-manage-usage-credits-for-team-and-seat-based-enterprise-plans"
    checked: 2026-11-16
  - title: "Error reference, You've hit your monthly spend limit (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-16
  - title: "Manage costs effectively, usage credits and spend (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-16
  - title: "Rate limits, Spend limits (Claude API Docs)"
    url: "https://platform.claude.com/docs/en/api/rate-limits"
    checked: 2026-11-16
  - title: "Workspaces (Claude API Docs)"
    url: "https://platform.claude.com/docs/en/build-with-claude/workspaces"
    checked: 2026-11-16
  - title: "cl_audit README, version 26.11.53 (n-uf/cl_audit): usage credits on the card and in alerts"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.53/README.md"
    checked: 2026-11-16
related:
  - /blog/claude-usage-credits/
  - /blog/claude-usage-limit-reached/
  - /blog/claude-max-vs-pro/
  - /
---

A Claude spend limit is a monthly cap on money, not on messages. On a paid plan it caps the usage credits that pay for requests after a plan limit is full. For an organization it can be set for everyone, a seat tier or one member, and in the Claude Console it caps API usage. Which one stopped you is in the message: the plain "You've hit your monthly spend limit" is your own cap on Pro, Max or Ultra, and the others are set by an admin, a gateway operator or your API usage tier.

Everything about Claude below comes from Anthropic's help and docs pages, read on 16 November 2026 and listed at the end. Where those pages give no figure, we don't give one either. cl_audit is an independent tool, not affiliated with Anthropic.

## Which Claude spend limit did you hit?

Claude Code and the API word each limit differently. Anthropic's error reference lists the Claude Code messages, and its rate-limits page the API ones:

| Message | Whose limit it is | Where it's changed |
|---|---|---|
| "You've hit your monthly spend limit" | Your own cap on usage credits (Pro, Max, Ultra) | Settings ▸ Usage, or `/usage-credits` |
| "You've hit your individual spend limit" | A limit your organization set for you | An admin, in Organization settings ▸ Usage |
| "You've hit your org's monthly spend limit" | The organization-wide cap | An Owner, in Organization settings ▸ Usage |
| "You've hit your team's shared budget" | A pooled budget an admin gave a group you're in | An admin, in Organization settings ▸ Usage |
| "You've hit your channel's monthly spend limit" | The budget of one Slack channel | An org owner or the channel's manager, in the channel's Claude settings |
| "spend limit reached", in lower case, through a Claude apps gateway | A cap your gateway's operator set | The gateway's operator |
| "You have reached your specified API usage limits" (HTTP 400) | A limit you set in the Claude Console | Spend limits in the Console |
| "…crossed its monthly API usage threshold" (HTTP 429) | The API tier's own monthly cap | A higher tier, or a request for a higher limit |

Two details from the same pages. On organizations billed by usage, the Claude Code message says "usage limit" where it would say "spend limit". And when one of your plan's windows is what ran out, the message also gives that window's reset time, and access returns then without anyone raising a limit. [What each limit message means](/blog/claude-usage-limit-reached/) goes through the plan-limit ones.

## What a spend limit caps

On Pro, Max and Ultra, a spend limit caps usage credits and nothing else. Anthropic's help page says that once you've used up a plan limit (a five-hour session limit, the weekly limit, or Fable's weekly limit on Max and Ultra), your requests switch to credits and keep working until you reach your monthly spend limit or your balance runs out with auto-reload off. Your plan limits keep resetting on their schedule while credits are on. What credits are, what they cost and when they start is in [our article on Claude usage credits](/blog/claude-usage-credits/).

So a spend limit never lowers what your plan includes. It only decides how far past those limits you're willing to go. Settings ▸ Usage also offers "Set to unlimited". With no limit set, `/usage` in Claude Code shows "Unlimited" and no spend figure.

A limit can be passed slightly. Anthropic checks it before a request and counts the tokens after, so one request may go over; the next ones are blocked.

## How to raise the Claude spend limit on Pro, Max and Ultra

Anthropic's help page gives the steps:

1. Open Settings ▸ Usage in Claude and find the Usage credits section.
2. Click **Adjust limit**.
3. Enter a new monthly amount, or choose **Set to unlimited** to remove the cap.

In Claude Code, `/usage-credits` opens the same page in your browser. It only works when you're signed in with your claude.ai subscription, not with an API key. When you hit your limit with credits still in the balance, Claude Code offers to raise or remove the limit without leaving the terminal. If that fails, the error reference says that a message with a reason names what to change, such as a lower amount, and that the generic "Could not update your spend limit" can be retried or made in Settings ▸ Usage in the browser.

You can also buy credits and set a spend limit in the Claude mobile apps where in-app purchases are available. Auto-reload is web only. Anthropic's tip for a first-time setup is to begin with a conservative cap and raise it once you've seen what your use costs.

## Spend limits on Team and Enterprise

On Team and seat-based Enterprise, the organization decides. Anthropic's help page says Owners and Primary Owners open Organization settings ▸ Usage, click **Adjust limit**, and either set an amount or choose **Set to unlimited**. The organization-wide limit controls total credit spend across the whole organization, whatever individual or seat limits say, and a change takes effect immediately.

Below that there are more levels, depending on the plan:

- **Seat-based Enterprise** can also limit a whole seat tier, Standard or Premium, and individual members. Enterprise plans can set limits at group level too.
- **Team** can set a limit per member where that's available. If usage credits are on and the page shows "Spend by org member" instead of "Spend limits by user", your organization doesn't have per-member limits, but the organization-wide limit still works.

When a member reaches their own limit, the help page says their credits pause until the end of the month, and they have to wait for their plan limits to reset before using Claude again. A member without billing access can run `/usage-credits` in Claude Code, which asks the admins for credits. Admins who want to see who is spending what can use the "MTD Spend" column in that same section, which [the usage credits article explains](/blog/claude-usage-credits/).

## The spend limit on the API

The Claude Console has two kinds, and they behave differently. Anthropic's rate-limits page says every usage tier carries a monthly spend cap, the most your organization can spend on the API in a calendar month:

| Usage tier | Monthly spend cap |
|---|---|
| Start | $500 USD |
| Build | $1,000 USD |
| Scale | $200,000 USD |

Custom-tier organizations have no cap, with limits arranged through their account team. At the cap, API usage pauses until 00:00 UTC on the first day of the next month, unless you ask for a higher limit sooner. Requests return HTTP 429 with the error code `enforced_spend_limit_reached` and no `retry-after` header, so retrying fails until access resumes. Moving to a higher tier restores it.

You can set a limit of your own below the cap: go to Spend limits in the Console, click **Adjust limit** or **Set limit** next to the monthly spend limit, and enter a value that doesn't exceed your tier's cap. When usage reaches a limit you set, requests return HTTP 400 with an `invalid_request_error` whose message starts "You have reached your specified API usage limits", or "…workspace API usage limits" for a workspace's limit, and says when access resumes. Raising or removing the limit restores access sooner.

Workspaces carry their own limits. Anthropic's workspaces page says you can't set spend limits on the default workspace, and its rate-limits page adds that Claude Code requests over the Claude Code workspace's limit are checked separately and can come back as a 429 with a `retry-after` header.

## Spend limit or plan limit?

They're different meters. A plan limit, the 5-hour or the weekly one, refills on a schedule ([when each one resets](/blog/claude-limit-reset-time/)). A spend limit is a monthly ceiling on credits, and Anthropic says a member who reaches theirs has credits paused until the end of the month. If your message names a plan reset time, waiting for it is a valid answer. If it only mentions a spend limit, raising the limit is the quick way back.

If you're weighing a bigger plan against paying for credits, [Claude Max vs Pro](/blog/claude-max-vs-pro/) sets the plans side by side. Which costs less depends on how often you hit your limits and how far past them you go. Anthropic gives no rule for it.

## See credits start before a limit stops you

A spend limit only matters once a plan limit is full, so the useful warning comes earlier. If you keep several Claude setups on one Mac, cl_audit, our free [Claude usage tracker](/) for macOS, shows each profile's 5-hour and weekly limits in the Dock, and a profile that's spending credits says so: "Using usage credits · $4.20 spent". With alerts on, it sends a notification when a profile starts spending credits and another when they run out. It doesn't show your spend limit or balance; those stay in Settings ▸ Usage and `/usage`.

How to set the alerts is on the page about [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/), and cl_audit needs Claude Code signed in for each profile.
