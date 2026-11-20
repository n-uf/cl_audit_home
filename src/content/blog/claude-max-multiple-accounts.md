---
title: "Claude Max multiple accounts: what Anthropic allows"
description: "Claude Max multiple accounts: what Anthropic's Max page, terms and Usage Policy say, why two plans don't pool limits, and how to watch both on one Mac."
h1: "Claude Max multiple accounts: what Anthropic allows, and how to track both"
mainKeyword: "claude max multiple accounts"
kind: what-is
published: 2026-12-01
updated: 2026-12-01
draft: true
author: n-uf
takeaways:
  - "Anthropic's Max page gives each Max plan five times Pro's usage every five hours and every week. It says nothing about holding more than one Max plan or about combining their limits (checked 20 November 2026)."
  - "Two Max plans are two separate meters: each account has its own 5-hour limit, weekly limit and reset time, and nothing is pooled."
  - "Anthropic's Consumer Terms say you may not share your login or make your account available to anyone else, and its Usage Policy bars creating multiple accounts to avoid detection or get around its guardrails. Read both for your own case."
  - "Anthropic's own routes to more usage than Max are Ultra, at ten times Pro's usage every week, and usage credits at API rates."
  - "On one Mac, cl_audit gives each Max account its own profile and shows its limits in its own Dock icon. It doesn't pool limits, and it isn't affiliated with Anthropic."
faq:
  - q: "Can you have two Claude Max accounts?"
    a: "Anthropic's pages don't say. Its Max page describes one plan and is silent on holding two or combining their limits. Its Consumer Terms bar sharing your login, and its Usage Policy bars creating multiple accounts to avoid detection or get around guardrails. Read both, because cl_audit can't tell you how they apply to you."
  - q: "Do two Claude Max plans add up to double the usage?"
    a: "No. Each account has its own 5-hour limit, weekly limit and reset time, and usage on claude.ai, Claude Code and Claude Desktop counts toward the limit of the account you're signed in to. Anthropic's Max page gives no way to combine two plans, and cl_audit doesn't pool them either."
  - q: "Is there a plan with more usage than Claude Max?"
    a: "Yes, Ultra. Anthropic's Ultra page gives ten times Pro's usage every week, against Max's five times, and no 5-hour limit once the account is verified. It's the former Max 20x plan, renamed. Usage credits are the other route: they continue your work at standard API rates once a limit is full."
  - q: "Can one Mac show the limits of two Claude Max accounts?"
    a: "Yes, with cl_audit, our free Mac app. Each account gets its own profile, and each profile has its own card, Dock icon and alerts showing that account's 5-hour and weekly limits, plus Fable's weekly limit where the plan has one. It needs Claude Code signed in for each profile and doesn't pool the limits."
sources:
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-20
  - title: "What is the Ultra plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan"
    checked: 2026-11-20
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-20
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-20
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-20
  - title: "Log in to your Claude account (Claude Help Center)"
    url: "https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account"
    checked: 2026-11-20
  - title: "Claude pricing (claude.com)"
    url: "https://claude.com/pricing"
    checked: 2026-11-20
  - title: "Consumer Terms of Service (Anthropic)"
    url: "https://www.anthropic.com/legal/consumer-terms"
    checked: 2026-11-20
  - title: "Usage Policy (Anthropic), effective Nov 12, 2026"
    url: "https://www.anthropic.com/legal/aup"
    checked: 2026-11-20
  - title: "Settings files and precedence (Claude Code docs, CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-20
  - title: "cl_audit README at tag v26.11.55 (Adding a profile; The dashboard; Fable's weekly limit and usage credits; Profile settings, Alerts)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.55/README.md"
    checked: 2026-11-20
    supports: "26.11.55: New profile's Account pop-up and Sign in to another account… make a folder ~/.claude-<name> and run claude auth login for it; one profile per account; each profile's card, Dock icon and alerts show its own 5-hour and weekly limits, plus Fable's own weekly limit where the plan has one; Notify when back is on by default; usage history is read from Claude Code's session files on this Mac."
    quote: "An account another profile already has is refused: one profile"
  - title: "cl_audit CHANGELOG, 26.11.55"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.55/CHANGELOG.md"
    checked: 2026-11-20
    supports: "26.11.55 is the newest release at the time of writing; this article describes cl_audit as of that version."
    quote: "## 26.11.55 — 2026-11-19"
related:
  - /use-cases/multiple-claude-accounts/
  - /blog/claude-max-vs-pro/
  - /blog/claude-team-and-personal-account/
  - /blog/claude-usage-limits/
---

Claude Max multiple accounts is a question Anthropic's Max page doesn't answer: it describes one Max plan, five times Pro's usage every five hours and every week, and says nothing about holding two or adding their limits together. What Anthropic's terms do say is narrower. You may not share your login or make your account available to anyone else, and the Usage Policy bars creating multiple accounts to avoid detection or get around its guardrails. Two Max plans don't make one bigger allowance either: each account keeps its own limits and its own reset time.

If you do hold two accounts, say a personal plan and one from a second email, cl_audit, our free Mac app, shows both side by side. cl_audit is an independent tool, not affiliated with Anthropic. Everything about Claude below comes from Anthropic's help pages, docs and legal pages as read on 20 November 2026, listed at the end. Where those pages are silent, we say so instead of guessing, and nothing here is legal advice.

## Can you have two Claude Max accounts?

Anthropic's pages don't give a yes or a no, and the three that matter say different things.

| Anthropic page | What it says | What it doesn't say |
|---|---|---|
| Max plan help page | Five times the Pro plan's usage every five hours and every week; a 5-hour limit, a weekly limit across all models, and a separate weekly limit for Fable | Anything about holding more than one Max plan, or about combining or stacking limits |
| Consumer Terms | You may not share your account login or credentials with anyone else, or make your account available to anyone else | A rule that limits you to one account, or a rule about usage limits |
| Usage Policy (effective 12 November 2026) | Among things not to do: creating multiple accounts to avoid detection, to get around product guardrails or to send inputs that break the policy; using another account to get around a ban | Anything about usage limits |

*Source: the Anthropic pages listed under sources, read on 20 November 2026.*

Silence on the Max page is neither permission nor a ban. The rules sit in the terms, and the sentence that matters is the purpose clause in the Usage Policy: the multiple accounts it lists are ones created to avoid detection or to get around guardrails. Whether that touches a personal Max plan next to a second one is for Anthropic's terms to answer, not for a monitoring tool.

Two more details from the Consumer Terms. The page says an account may be linked to an employer's enterprise account, whose administrator may be able to monitor and control it. And Anthropic reserves the right to change its capacity limits. The Usage Policy adds that Anthropic may respond to suspected violations by warning users, or by throttling, limiting, suspending or ending access, so it's worth reading before you rely on a second account. The [multiple Claude accounts](/use-cases/multiple-claude-accounts/) guide has a [short section on whether it is allowed](/use-cases/multiple-claude-accounts/#is-it-allowed-to-have-multiple-claude-accounts), which is the same material from the work-and-personal side.

## Do two Claude Max plans add up to double the limits?

No, and nothing on Anthropic's pages suggests they would. A limit belongs to an account. Anthropic's usage-limits page says usage on claude.ai, Claude Code and Claude Desktop counts toward the same usage limit, the one for the account you're signed in to, and that each account's weekly limit resets at a fixed time assigned to that account. Settings ▸ Usage shows the current session and the next reset for the account you have open.

So two Max accounts are two meters. When one is full, the other doesn't move, and nothing carries work from the first to the second. Anthropic's Team page states the same idea for seats: limits can't be transferred or shared between members. For Max it's the absence of any combining feature that tells you: the Max page has none to describe.

Each Max plan also has its own Fable weekly limit. Anthropic's Fable page says Max can use up to 50% of the weekly limit on Fable models at no extra cost, and that this comes out of the same weekly limit rather than on top of it. [Claude usage limits explained](/blog/claude-usage-limits/) has the plan-by-plan table.

## What are Anthropic's own ways past a Max limit?

Anthropic has two answers for someone who keeps hitting a Max limit, and neither is a second account.

| Route | What Anthropic says | Price on its pricing page |
|---|---|---|
| Max | Five times Pro's usage every five hours and every week | $100 a month |
| Ultra | Ten times Pro's usage every week, a weekly limit across all models, a separate Fable weekly limit; verified accounts have no 5-hour limit. The old Max 20x plan, renamed | $200 a month |
| Usage credits on Max | When an included limit is full, requests switch to pay-as-you-go pricing at standard API rates, until your monthly spend limit or your balance runs out | Billed separately from the subscription |

You turn credits on in Settings ▸ Usage, and you can cap them with a monthly spend limit. [Claude usage credits explained](/blog/claude-usage-credits/) covers the rates and the messages. For whether Max is worth it against Pro, or when Ultra enters the picture, [Claude Max vs Pro](/blog/claude-max-vs-pro/) goes through the prices and the limits.

## How do you run two Claude Max accounts on one Mac?

Say you hold two Max accounts for different reasons: a plan of your own and one that belongs to a client or a second business. Anthropic's account menu switches one active account at a time, so keeping both open takes more than the menu. For Claude Code, Anthropic's documentation says the `CLAUDE_CONFIG_DIR` variable moves its settings, session history and plugins to another folder, so one folder per account keeps two sign-ins apart. Doing that by hand is covered in [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/).

In cl_audit, a **profile** is one Claude setup: a Claude Code folder with its own sign-in and, if you want them, a Claude window and a Dock icon. To add the second Max account:

1. Open cl_audit and choose **＋ (New profile)** in Settings. Name it, for example "client".
2. In the **Account** pop-up of the Claude Code card, pick an account that's already signed in in a Claude Code folder no profile uses, or choose **Sign in to another account…**.
3. For a new account, cl_audit makes a folder such as `~/.claude-client` and Terminal runs Claude Code's own sign-in for it. The address you type only fills in the form; the account the browser is signed in to at claude.ai decides, so switch it there first.
4. Choose the two switches, **Usage in the Dock** and **Claude window**. With both off, the profile is "usage only": its limits still show on the dashboard and in alerts.

An account belongs to one profile, and cl_audit refuses one another profile already has. The sign-in screens are Anthropic's, so cl_audit never sees the password. The [multiple Claude accounts](/use-cases/multiple-claude-accounts/) page has the whole setup, including the Claude window side.

## How does cl_audit show both Max plans' limits?

Each profile reads its own account's figures from Anthropic, using that profile's Claude Code sign-in. Then:

- **A card per profile** on the dashboard, with the plan's name ("Max"), the 5-hour and weekly limits, and Fable's weekly limit as a third row where the plan has one. The [demo dashboard](/dashboard/) shows three sample profiles.
- **A Dock icon per profile**, showing that account's 5-hour and weekly limits. While a limit is full, the icon becomes the countdown to when it's back.
- **Alerts per profile.** cl_audit sends a notification when a limit reaches a level you set, and with **Notify when back**, on by default, one more when a full limit resets. [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) shows what they look like.
- **Usage history** by profile over 24 hours, 7 days or 30 days, read from the session files Claude Code writes on this Mac. Nothing is uploaded, and usage from claude.ai chats or other computers isn't in it.

While a profile is spending usage credits, its card says "Using usage credits" and how much it has spent. For the figures to rely on, Claude's own Settings ▸ Usage page and `/usage` in Claude Code stay the source.

## What cl_audit doesn't do

It doesn't pool or add the limits of two accounts, and it doesn't move work from a full account to another one. It doesn't decide whether you may hold two accounts, since that is Anthropic's terms. It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile; the Claude app is only needed for Claude windows. A profile that uses an API key has no limits to show.

If your second account is a work seat, not another Max plan, the setup is the same, but Team limits work differently: they are per member, and [a Claude Team and personal account](/blog/claude-team-and-personal-account/) covers what Anthropic keeps separate. If you want to try cl_audit, [install it from here](/install/).
