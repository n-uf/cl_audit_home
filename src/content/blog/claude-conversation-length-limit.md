---
title: "Claude conversation length limit: causes and fixes"
description: "The Claude conversation length limit is the context window, not your usage allowance. What it means in Claude and Claude Code, and what to do about it."
h1: "Claude conversation length limit: what it is and how to get past it"
mainKeyword: "claude conversation length limit"
kind: what-is
published: 2026-12-08
updated: 2026-12-08
draft: true
author: n-uf
takeaways:
  - "The Claude conversation length limit is the size of the context window: how much text one conversation can hold at once. It is separate from your usage limits, which count how much you use Claude over time."
  - "Anthropic's context window page lists 1M tokens for the newest models on paid plans, 500K for some older ones and 200K for the rest. Part of the window is kept for Claude's reply."
  - "With code execution on, paid plans summarize earlier messages as a chat nears the limit, so most people rarely see the error. A very large first message can still hit it."
  - "In Claude Code, \"Context limit reached · /compact or /clear to continue\" is the same limit. /compact summarizes the conversation, and /clear starts fresh."
  - "Long conversations use more of your usage limit, so hitting a length limit and running low on usage often arrive together."
faq:
  - q: "What is the Claude conversation length limit?"
    a: "The size of the context window: the amount of text Claude can work with in one conversation, like working memory. Anthropic's help page says the window depends on the model, and that a part is always kept for Claude's reply, so the longest possible conversation is slightly smaller than the full window."
  - q: "How long can a Claude conversation be?"
    a: "It depends on the model. On paid plans, Anthropic lists 1M tokens for the newest models, such as Opus 5.5 and Sonnet 5.5, 500K for some older ones and 200K for the rest. With code execution on, Claude summarizes earlier messages as a chat nears the limit, so it can go on much longer."
  - q: "How do I fix \"Your message will exceed the length limit for this chat\"?"
    a: "Attach fewer or smaller files, or start a new conversation. Anthropic also suggests splitting your content into smaller chunks, summarizing or extracting the key parts before you send them, or asking Claude to find the most relevant portions first. A very large first message is the usual cause."
  - q: "What does \"Context limit reached\" mean in Claude Code?"
    a: "The conversation plus attached files no longer fits the model's context window, which Claude Code also reports as \"Prompt is too long\". Run /compact to summarize the conversation and carry on, or /clear to start fresh. Auto-compact normally does the first for you."
  - q: "Does a long conversation use more of my usage limit?"
    a: "Yes. Anthropic says conversations that trigger automatic context management use more of your usage limit, and its Claude Code docs say each request sends the full conversation. If you're near a limit in a long chat, starting a new conversation is Anthropic's advice."
sources:
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-16
  - title: "How large is the context window on paid Claude plans? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
    checked: 2026-11-16
  - title: "Troubleshoot Claude error messages, Length limit errors (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12466728-troubleshoot-claude-error-messages"
    checked: 2026-11-16
  - title: "Error reference, Prompt is too long (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/errors"
    checked: 2026-11-16
  - title: "Manage costs effectively, manage context and why usage climbs (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-16
  - title: "cl_audit README, version 26.11.53 (n-uf/cl_audit): limits, Dock icons and alerts"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.53/README.md"
    checked: 2026-11-16
related:
  - /blog/claude-usage-limits/
  - /blog/claude-usage-limit-reached/
  - /blog/claude-code-session-handoff/
  - /
---

The Claude conversation length limit is how much text one conversation can hold at once. Anthropic calls it a length limit and ties it to the model's context window, the working memory Claude uses for a chat. It isn't about how much you've used Claude today: you can hit a length limit with plenty of usage left, and the other way round. On paid plans with code execution on, Claude summarizes earlier messages as a chat grows, so most people rarely see it. When you do, it reads "Your message will exceed the length limit for this chat" in Claude, or "Context limit reached" in Claude Code.

Everything about Claude below comes from Anthropic's help and docs pages, read on 16 November 2026 and listed at the end. Where those pages give no figure, we don't give one either. cl_audit is an independent tool, not affiliated with Anthropic.

## What the conversation length limit is, and what it isn't

People look for this as the chat length limit, the conversation limit or the context limit. On Anthropic's pages these are one thing, called the length limit. Its help page defines length limits as limits on Claude's context window: the amount of information Claude can work with in a single chat. The window depends on which model you use, and a part of it is always reserved for Claude's reply, so the longest possible conversation is slightly smaller than the full window.

The same page draws the line between the two kinds of limit. Usage limits control how much you can use Claude across all your conversations, as quantity over time. Length limits control how long any single conversation can become. So a new chat clears a length limit, since it starts with an empty window, but it doesn't change how much of your 5-hour or weekly allowance you've spent. That side is in [Claude usage limits explained](/blog/claude-usage-limits/).

## How big is the Claude context window?

Anthropic keeps a separate page for this, and it changes as models change. On 16 November 2026 it listed these context windows for chatting with Claude on paid plans (Pro, Max, Ultra, Team and Enterprise):

| Context window | Models, per Anthropic's page |
|---|---|
| 1M tokens | Fable 5.2 and 5.1, Opus 5.5 and 5, Sonnet 5.5 and 5, Haiku 5.5 |
| 500K tokens | Fable 5, Opus 4.8, 4.7 and 4.6, Sonnet 4.6 |
| 200K tokens | Any other model, per the page |

In Claude Code the page lists 1M tokens for each of those models, including the ones that have 500K in chat. For Opus 4.6 and Sonnet 4.6 it's the `[1m]` variant you pick with `/model`, and the page says usage credits are needed for Sonnet 4.6's, and for Opus 4.6's on Pro. Claude Cowork has its own, different table on that page. The page is about paid plans and gives no table for the Free plan, so we don't give a Free figure. The window is fixed for your plan: Anthropic says you can't increase it, only use it better.

## Why a chat hits the limit, and what Claude does first

For people on paid plans with code execution turned on, Claude manages long conversations itself. When a conversation nears the window, it summarizes earlier messages to make room, and your full chat history is kept so Claude can still refer to it. You may see Claude "organizing its thoughts" while it does this. Code execution has to be on for it to work.

It doesn't catch everything. Anthropic names very large first messages as a rare case that still runs into the limit, since there's nothing earlier to summarize. Long chats also cost more of your usage allowance when this happens; more on that further down.

## Fixing the Claude chat length limit error

"Your message will exceed the length limit for this chat" is the chat version. Anthropic's help page says it means your message is too long to send as it is, and suggests:

- Attach fewer or smaller files, or start a new conversation.
- Break your content into smaller chunks and process them separately.
- Summarize or extract the key sections before you send them.
- Ask Claude to find the most relevant portions of your content first.

If you hit it often, the page lists ways to make the window go further. Use projects, which load only the relevant content into the window. Keep project instructions short, and remove project files you no longer use. Turn thinking off on models that have the toggle, or choose a lower effort level where thinking is always on. Turn off connected tools a conversation doesn't need, and ask Claude not to search the web when you don't need current information. Anthropic notes that tools and connectors are token-intensive.

## Claude Code: "Context limit reached" and "Prompt is too long"

Claude Code's error reference describes it the same way: the conversation plus attached files exceeds the model's context window. In an interactive session the message is "Context limit reached · /compact or /clear to continue". In `-p` output and the transcript it stays "Prompt is too long". If you've turned auto-compact off, the line says so and points to `/config`.

Normally you don't get that far. When automatic compaction runs, it summarizes your oldest exchanges and keeps the newest. Two variants are worth knowing:

- **"Prompt is too long · automatic compaction failed:"** followed by a named error, such as an unavailable model or an authentication failure. Fix that first, because `/compact` fails on the same error until you do.
- **"A single-exchange conversation cannot be compacted".** There are no earlier turns to summarize. When Claude Code has the token counts, the message gives the request size and the limit and says what fills it: either the conversation's own content, so you start with less pasted text or smaller files, or the system prompt, tool definitions and attachments, so you reduce attached files or tools.

What helps, from the Claude Code costs page:

- `/compact` summarizes the conversation, and you can add what to keep: `/compact Focus on code samples and API usage`.
- `/clear` starts fresh when you switch to unrelated work. Use `/rename` first so you can find the session again, then `/resume` to return to it.
- `/context` shows what is using space, and `/mcp` lists MCP servers you can disable.
- Move detailed instructions from `CLAUDE.md` into skills, which load only when used.

{{live:/blog/claude-code-session-handoff/}}When a task is too big for one session even so, [a session handoff](/blog/claude-code-session-handoff/) carries it into a fresh one with a written note.{{/live}}

## Does a long conversation use more usage?

Yes, in both places. For Claude, Anthropic's help page says conversations that trigger automatic context management consume more of your usage limit, and its advice is to start a new conversation if you're approaching your limit in a longer chat.

For Claude Code, the docs explain why a session left open for hours can use far more than your activity suggests. Claude Code sends your full conversation with every request, and every time Claude uses tools it sends another request carrying those results. With prompt caching, that history is re-read at the cached rate, so a one-line question still draws usage for the whole conversation. The first message after a break longer than the cache lifetime misses the cache and reprocesses everything, and compacting a large context is itself a large request. `/clear` costs nothing.

## Conversation length limit or usage limit?

| | Length limit | Usage limit |
|---|---|---|
| What it measures | The size of one conversation, against the context window | How much you use Claude over time |
| What you see | "Your message will exceed the length limit for this chat", "Context limit reached" | "You've hit your session limit", "You've hit your weekly limit" |
| What fixes it | A new chat, fewer files, `/compact`, `/clear` | Waiting for the reset, a bigger plan, or usage credits |
| Where to look | `/context` in Claude Code | Settings ▸ Usage, or `/usage` |

If the message is about your allowance, [what to do when a Claude usage limit is reached](/blog/claude-usage-limit-reached/) covers each variant.

## Watching the usage side of a long session

A length limit shows up the moment you hit it. The usage that long sessions drain is slower, and easy to miss until a limit is full. If you run Claude Code on a Mac, cl_audit, our free [Claude usage tracker](/) for macOS, shows each profile's 5-hour and weekly limits in its own Dock icon, and with alerts on it sends a notification at a level you choose and again when a full limit is back. It reads usage, not context size, so it can't tell you how full a conversation is; `/context` in Claude Code does that.
