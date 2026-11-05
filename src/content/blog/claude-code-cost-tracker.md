---
title: "Claude Code cost tracker: what your use would cost"
description: "A Claude Code cost tracker for subscribers: four ways to see what your use would cost at API list prices, how the sum works, and why it isn't your bill."
h1: "Claude Code cost tracker options, and why none of them is your bill"
mainKeyword: "claude code cost tracker"
kind: how-to
published: 2026-12-01
updated: 2026-12-01
draft: true
author: n-uf
takeaways:
  - "On a Pro, Max or Ultra plan your Claude Code use is included in the subscription, so any dollar figure is an estimate at API list prices, not your bill."
  - "Claude Code shows the current session's cost in /usage and in the status line's cost field; both are worked out locally from token counts."
  - "ccusage prints costs per day, week, month and session in the terminal; cl_audit shows a list-price estimate in its usage history and its CSV export."
  - "A list-price estimate prices input, output, 5-minute and 1-hour cache writes and cache reads separately, per model, from Anthropic's pricing page."
  - "Usage credits are billed at standard API rates, so the estimate shows what credits cost per token, but only the tokens past your plan's limit would be billed."
faq:
  - q: "Does /usage show my bill on Pro or Max?"
    a: "No. Anthropic's costs page says the Session block in /usage is intended for API users, and that for Pro, Max and Ultra subscribers the session cost figure isn't relevant for billing. Subscribers see plan usage bars, activity stats and a usage breakdown on the same screen."
  - q: "How much does Claude Code cost per day on the API?"
    a: "It depends on the model, the codebase and how you work. Across enterprise deployments, Anthropic's costs page gives an average of around $13 per developer per active day and $150-250 per developer per month, with costs below $30 per active day for 90% of users. For your own number, price your own sessions."
  - q: "Is cl_audit's cost estimate my bill?"
    a: "No. It's what the same tokens would cost on the API at list prices, per model, and on a Pro, Max, Ultra or Team plan the plan pays for that use. Models without a published price are left out, never guessed."
  - q: "Are usage credits billed at API prices?"
    a: "Yes. Anthropic's help page says usage credits are billed at standard API rates, and that your usage continues until you reach your monthly spend limit or your balance runs out with auto-reload off. Credits only come into play once one of your plan's limits is used up."
  - q: "Why do two cost trackers show different totals?"
    a: "Each one prices tokens from its own table and adds up a different span. Claude Code's figure covers one session, ccusage reports per day, week, month or session, and cl_audit's covers the period you pick. We haven't compared them figure by figure, so treat each as an estimate and watch the trend."
sources:
  - title: "Claude Code docs: Manage costs effectively"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-05
  - title: "Claude Code docs: Customize your status line"
    url: "https://code.claude.com/docs/en/statusline"
    checked: 2026-11-05
  - title: "Claude Code docs: Commands"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-05
  - title: "Claude Code docs: Explore the .claude directory"
    url: "https://code.claude.com/docs/en/claude-directory"
    checked: 2026-11-05
  - title: "Claude API docs: Pricing"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
    checked: 2026-11-05
  - title: "Anthropic Help Center: Manage usage credits for paid Claude plans"
    url: "https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans"
    checked: 2026-11-05
  - title: "ccusage README"
    url: "https://github.com/ccusage/ccusage"
    checked: 2026-11-05
  - title: "cl_audit README at tag v26.11.0"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.0/README.md"
    checked: 2026-11-05
  - title: "cl_audit CHANGELOG, 26.11.0 (2026-11-05)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.0/CHANGELOG.md"
    checked: 2026-11-05
related:
  - /blog/ccusage-alternative/
  - /use-cases/claude-code-usage-history/
  - /blog/claude-max-vs-pro/
  - /dashboard/
---

On a Pro, Max or Ultra plan, no Claude Code cost tracker can show you a bill, because that use is included in the subscription. What it can show is an estimate: what the same tokens would cost at API list prices. You have four ways to get one. Claude Code's `/usage` and its status line give a figure for the current session, ccusage prints costs per day, week, month or session in the terminal, and cl_audit shows an estimate in its usage history and exports it as CSV. Read any of them as a size, not a price.

cl_audit is our tool. It's independent and not affiliated with Anthropic.

## Why track cost on a subscription at all?

You don't pay per token, but the question still comes up: to compare the plan with the API, to explain the plan to whoever pays for it, or to put a number on a month of agent runs. Each time, the useful number is what your own tokens would cost at list prices. What the plans include is in [Claude Max vs Pro](/blog/claude-max-vs-pro/); this page is about the sum.

## Does Claude Code track cost itself?

Yes, for the session you're in. Type `/usage` in Claude Code. Anthropic's commands page says it shows "session cost, plan usage limits, and activity stats", and `/cost` and `/stats` are aliases for it.

The Session block at the top has the dollar figure, with the tokens behind it listed by model. Anthropic's costs page says Claude Code computes that figure locally from token counts at list price, and calls it an estimate. It also says the Session block is meant for API users: on Pro, Max and Ultra the session cost figure isn't relevant for billing.

The figure stops at the session. The totals reset when `/clear` starts a new one, so the next session's cost starts at $0. The plan usage breakdown on the same screen covers the last 24 hours or 7 days, but in shares of your usage, not dollars, and only from this machine's session history.

The status line can keep the session figure in view. Its JSON has a `cost.total_cost_usd` field, which Anthropic's status line page describes as the estimated session cost, "computed client-side at list price", adding "May differ from your actual bill." The page has example scripts that print it.

## How do you calculate Claude Code cost at API prices?

Anthropic's pricing page is a rate table, not a Claude Code API cost calculator. You don't need one, though. Every tool on this page does the same sum: for each reply, take five token counts and multiply each by that model's price per million tokens. The five are input that wasn't cached, output, 5-minute cache writes, 1-hour cache writes and cache reads.

Four rows of the table, as listed on Anthropic's pricing page on 5 November 2026:

| Model | Base input | 5m cache writes | 1h cache writes | Cache hits and refreshes | Output |
|---|---|---|---|---|---|
| Claude Fable 5.1 | $10 / MTok | $12.50 / MTok | $20 / MTok | $0.25 / MTok | $50 / MTok |
| Claude Opus 5.5 | $4 / MTok | $5 / MTok | $8 / MTok | $0.20 / MTok | $20 / MTok |
| Claude Sonnet 5.5 | $2 / MTok | $2.50 / MTok | $4 / MTok | $0.10 / MTok | $10 / MTok |
| Claude Haiku 5.5 (for prompts up to 100,000 tokens) | $0.10 / MTok | $0.125 / MTok | $0.20 / MTok | $0.01 / MTok | $0.50 / MTok |

"MTok" is a million tokens. The page's caching multipliers explain the middle columns. A 5-minute write is 1.25x the base input price and a 1-hour write is 2x. A cache read is 0.1x, except on Claude Fable 5.1 (0.025x) and on Claude Opus 5.5 and Claude Sonnet 5.5 (0.05x).

If you want a Claude Code cost calculator for your own numbers, a spreadsheet is enough. Here's a made-up session on Claude Sonnet 5.5: 200,000 uncached input tokens, 50,000 output tokens, 300,000 tokens of 5-minute cache writes and 6,000,000 tokens of cache reads.

- input: 0.2 MTok × $2 = $0.40
- output: 0.05 MTok × $10 = $0.50
- 5-minute cache writes: 0.3 MTok × $2.50 = $0.75
- cache reads: 6 MTok × $0.10 = $0.60

That's $2.25. The cache reads are by far the biggest pile of tokens, yet cost $0.60. Priced as normal input they would be $12.00, which is why a tracker has to keep the five counts apart.

A few things change the sum:

- **US-only inference.** For Claude 4.6 and later models, asking for US-only inference (the API's `inference_geo` setting) costs 1.1x on every price category. When a response was billed at that rate, Claude Code multiplies its list price by 1.1 in the session figure.
- **Fast mode.** It has its own prices: Claude Opus 5.5 is $8 / MTok for input and $40 / MTok for output, and the caching multipliers apply on top.
- **Long prompts on Claude Haiku 5.5.** A request whose prompt is over 100,000 tokens, cache reads and writes included, pays the higher prices on the next row of the table.

Prices change and models retire, so an estimate is only as good as the table behind it.

## Why the estimate isn't your bill

On a subscription plan, the plan pays for your Claude Code use. Nobody is charging you the API price. A big number doesn't mean you're being overcharged. It measures how much work went through.

It isn't a forecast of usage credits either. Anthropic's help page says usage credits are billed at standard API rates and apply to Claude Code as well as chats. They only start once one of your plan's limits is used up, and they run until you reach your monthly spend limit or your balance runs out with auto-reload off. So the estimate tells you what credits cost per token, but only the tokens past the limit would be billed. For what counts toward the limits, see [how Claude's usage limits work](/blog/claude-usage-limits/); for the moment you hit one, [what to do when the limit is reached](/blog/claude-usage-limit-reached/).

If your organization pays contracted rates, Claude Code shows list prices unless an admin sets a `modelPricing` table. If you pay per token through the Claude Console, its Cost page has the real numbers. On Team and Enterprise plans, usage inside the seat allowance isn't metered in dollars at all.

## ccusage: an open-source Claude Code cost tracker on GitHub

Open-source tools exist for this, and ccusage is built around exactly this: token use and cost. It's an MIT-licensed command-line tool on GitHub and npm whose README carries a "Mentioned in Awesome Claude Code" badge, and it reads Claude Code plus 17 other coding tools. We describe it only from that README, read on 5 November 2026. Its one-line description is "Analyze coding (agent) CLI token usage and costs from local data." You run it with `npx ccusage@latest` (or `bunx`, `pnpm dlx` or `nix run`), with no global install.

For Claude Code it has `daily`, `weekly`, `monthly` and `session` reports, plus `blocks` for Claude's 5-hour billing windows. Costs show in USD for each day, month or session, `--breakdown` splits them by model, and cache creation and cache read tokens are tracked separately. `--since`, `--until`, `--instances` and `--project` narrow a report by date or project, and `--json` gives structured output. The README's build notes say prices come from a LiteLLM pricing file; `ccusage.json` can override the price for a model. It doesn't say how it treats subscription plans.

### Where ccusage makes more sense

Pick ccusage if you want reports by day, week, month or session in the terminal, JSON for a script or a cron job, one report across several coding tools (cl_audit is only about Claude), or your own prices through `ccusage.json`. It also has a status line command (in beta). The README names no single operating system, so it isn't tied to a Mac. For a full side-by-side, see [cl_audit vs ccusage](/blog/ccusage-alternative/).

## cl_audit as a Claude Code cost tracker: estimate and CSV

cl_audit is a free macOS app, a [Claude usage tracker for Mac](/) that shows each Claude profile's 5-hour and weekly limits in the Dock. Release 26.11.0, from 5 November 2026, added two things to its usage history: a cost estimate and a CSV export.

![The usage history panel with its cost total and CSV key](/img/guides/usage-history.webp "cl_audit's site demo: the usage history with its totals, the cost estimate and the CSV key. Sample data.")

The history is read from the session files Claude Code writes on your Mac and covers 24 h, 7 d or 30 d. The totals next to its title include a cost estimate at Anthropic's API list prices, written like "≈ $123 at list prices". The README says it prices the same tokens per model, with 5-minute and 1-hour cache writes and cache reads priced apart, and covers fast mode and US-only inference too. Models without a published price are left out, never guessed. The prices are built into the app, dated, and updated with cl_audit releases, so they're as current as your copy of cl_audit.

The **CSV** key saves the period as a file: one row per day, profile and model, optionally split by project (by folder name only). Each row has the replies, each kind of token (input, output, 5-minute and 1-hour cache writes, cache reads) and the cost estimate.

A few things to know before you rely on it:

- **It's per profile.** With [more than one Claude account on the same Mac](/use-cases/multiple-claude-accounts/), each profile has its own Claude Code folder and its own rows.
- **It's this Mac only.** Usage from claude.ai chats, other computers or cloud sessions isn't in the session files, so it isn't in the estimate.
- **It can be turned off.** Settings ▸ General ▸ Privacy ▸ Usage history stops cl_audit reading any session file, and the history, cost estimate and CSV key are hidden with it.
- **It's an estimate at list prices, not your bill.** The README says use on a Pro, Max, Ultra or Team plan is paid for by the plan.

It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. The charts themselves are covered in [Claude Code usage history by project and model](/use-cases/claude-code-usage-history/).

## The four ways side by side

| | `/usage` | Status line | ccusage | cl_audit |
|---|---|---|---|---|
| Covers | The current session | The current session | Day, week, month, session; 5-hour blocks | 24 h, 7 d, 30 d, per profile |
| Where | Claude Code | The status line at the bottom of Claude Code | The terminal | The dashboard, and a CSV file |
| Cost shown | List price, computed locally | `cost.total_cost_usd`, list price | USD per day, month, session | API list prices, per model |
| Export | None described | Your own script | `--json` | CSV |
| Platform | Wherever Claude Code runs | Same | README names none | Mac with Apple silicon |

## Which one to use

For Claude Code cost tracking, match the tool to the question. "What has this session cost so far?" is `/usage`, or the status line if you want it in view. "What did last month add up to, by project, in a report I can script?" is ccusage. "What would my last 30 days have cost, per account, next to my limits?" is cl_audit's usage history and its CSV.

Whether you need a bigger plan isn't something a cost estimate answers. How often you reach the 5-hour limit, and how close the weekly one gets, does. `/usage` shows both for the account you're signed in to, and cl_audit shows them for every profile, with [an alert at a level you set](/use-cases/claude-usage-limit-alerts/).

One last thing: the files don't last forever. Anthropic's page on the `.claude` directory says Claude Code deletes session transcripts older than `cleanupPeriodDays`, 30 days by default. To keep a month on record, save a CSV from cl_audit or a ccusage `--json` report while the files are still there.

To try the estimate on your own sessions, [download cl_audit](/install/), or look over the [demo dashboard](/dashboard/) first.
