---
title: "How to save Claude usage: make your limits last (2026)"
description: "How to save Claude usage in claude.ai, Claude Desktop and Claude Code: the habits Anthropic's own pages name to make the 5-hour and weekly limits last."
h1: "How to save Claude usage: make the 5-hour and weekly limits last"
mainKeyword: "how to save claude usage"
kind: how-to
published: 2026-12-02
updated: 2026-12-02
draft: true
author: n-uf
takeaways:
  - "Anthropic ties usage to conversation length, tool use, model and effort level, and gives no message or token counts, so the habits below are levers, not guarantees."
  - "In claude.ai and Claude Desktop: start a new chat for a new topic, use a lower-priced model and a lower effort level for routine work, and turn off web search and connectors you don't need."
  - "In Claude Code: run /clear between tasks, choose the model and effort once at the start of a session, keep CLAUDE.md under roughly 200 lines and disable MCP servers you aren't using."
  - "In Claude Code, /usage breaks down what counts against your plan limits and recommends changes, each with its share of your recent usage."
  - "cl_audit shows each profile's 5-hour and weekly limits in the Dock and alerts at a level you set. It doesn't change any limit and isn't affiliated with Anthropic."
faq:
  - q: "How can I make my Claude usage last longer?"
    a: "Carry less context and send fewer messages. Start a new chat for a new topic, put related questions in one message, use a lower-priced model and a lower effort level for routine work, and turn off web search and connectors you don't need. In Claude Code, run /clear between tasks. Settings > Usage shows the effect."
  - q: "How do I reduce Claude token usage in Claude Code?"
    a: "Keep the context small. Run /clear when you switch tasks, point Claude at files instead of pasting them, keep CLAUDE.md under roughly 200 lines and disable MCP servers you aren't using. Anthropic's docs say token use grows with the context Claude processes. Then run /usage to see which behaviours take the largest share."
  - q: "Does using a cheaper model save Claude usage?"
    a: "For routine work, yes. Anthropic says higher-priced models use your limits faster on Pro, Max, Ultra and Team plans, and that in Claude Code Opus costs several times more per turn than Sonnet. A stronger model can also finish with less work. In Claude Code, pick the model at the start: a switch rereads the conversation uncached."
  - q: "Is /clear or /compact better for saving Claude usage?"
    a: "/clear is cheaper: it starts a new conversation with empty context and costs nothing. /compact summarizes the conversation, and that summary is itself a request that reads all of it. Use /clear for an unrelated task and /compact to carry on with a long one. Compacting while the cache is warm costs far less than after a long break."
  - q: "Do web search and connectors use more Claude usage?"
    a: "Yes. Anthropic's help pages call tools and connectors token-intensive, and they list tool use such as Research and web search among the things that count toward your limits. Turn off connected apps a conversation doesn't need, and tell Claude not to search the web when you don't need current information."
sources:
  - title: "Usage limit best practices (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9797557-usage-limit-best-practices"
    checked: 2026-11-28
    supports: "What counts toward usage (message length and attached files, conversation length, tool use such as Research and web search, model and effort, artifacts, multi-step tasks); plan conversations and combine related questions; paid plans can search past chats and use memory; project content is cached and counts less when reused, and the cache expires after inactivity."
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-28
    supports: "Usage across claude.ai, Claude Code and Claude Desktop counts toward the same limit; longer conversations that trigger automatic context management use more of the limit and Anthropic suggests a new conversation when nearing a limit; keep project instructions short, remove unused project files, turn thinking off or lower the effort level, turn off connected apps, ask Claude not to search the web; usage credits and upgrading."
  - title: "How large is the context window on paid Claude plans? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans"
    checked: 2026-11-28
    supports: "Longer conversations that trigger automatic context management use more of your usage limit; projects use retrieval so only relevant content loads; tools and connectors are token-intensive."
  - title: "Which Claude model is best to use for knowledge work (claude.com)"
    url: "https://claude.com/resources/articles/using-claude-opus-5-5-as-your-daily-driver-for-knowledge-work"
    checked: 2026-11-28
    supports: "On Pro, Max, Ultra and Team plans higher-priced models use your limits faster; when to use Haiku, Sonnet and Opus; higher effort settings think longer and cost more without always producing better work; effort is set from the model name next to the send button."
  - title: "Models, usage, and limits in Claude Code (Claude Help Center)"
    url: "https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code"
    checked: 2026-11-28
    supports: "Five habits that stretch usage: clear between tasks, match the model to the job, point at files instead of pasting, keep CLAUDE.md lean (roughly 200 lines), ask for a plan before big changes; /clear versus /compact."
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-28
    supports: "Limits are shared across Claude and Claude Code; warnings as you approach a limit; usage credits; consider upgrading if you consistently hit limits."
  - title: "Manage usage credits for paid Claude plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
    checked: 2026-11-28
    supports: "Pro, Max and Ultra individuals can turn on usage credits in Settings > Usage; they are charged separately from the subscription and priced at standard API rates; a monthly spending cap can be set."
  - title: "Manage costs effectively (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-28
    supports: "Reduce token usage: /clear between tasks, /compact with instructions, model choice, MCP servers, CLAUDE.md under 200 lines, skills, extended thinking and effort, subagents, specific prompts, plan mode; why usage climbs in a long session; the /usage plan usage breakdown and its recommendations."
  - title: "How Claude Code uses prompt caching (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/prompt-caching"
    checked: 2026-11-28
    supports: "Each model has its own cache so /model reprocesses the whole conversation once; effort changes can do the same on some models; /compact costs less while the cache is warm and most after a long break; cached prefixes expire after inactivity."
  - title: "Commands (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-28
    supports: "What /clear, /compact, /context, /effort, /model, /mcp, /rewind, /usage and /rate-limit-options do."
  - title: "Model configuration (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/model-config"
    checked: 2026-11-28
    supports: "Lower effort is faster and cheaper for straightforward tasks; the sonnet, opus and haiku aliases."
  - title: "cl_audit README at tag v26.11.88 (The dashboard; When a limit is full; Widget; A profile's Dock icon; Profile settings, Alerts and Menu bar)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/README.md"
    checked: 2026-11-28
    supports: "26.11.88: each profile's 5-hour and weekly limits show on its Dock icon, its optional menu bar icon (off by default), the dashboard and the Claude usage widget (macOS 14 or later); alerts fire at a level you set, and Notify when back is on by default; the Dock icon becomes a countdown while a limit is full; usage history comes from Claude Code's session files on this Mac, by project, model and surface, over 24 hours, 7 days or 30 days."
    quote: "Notify when back (on by default) sends one"
  - title: "cl_audit CHANGELOG, 26.11.88"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.88/CHANGELOG.md"
    checked: 2026-11-28
    supports: "26.11.88 (23 November 2026) is the newest release at the time of writing; this article describes cl_audit as of that version."
    quote: "## 26.11.88 — 2026-11-23"
related:
  - /blog/claude-usage-limits/
  - /blog/check-claude-usage-mac/
  - /use-cases/claude-usage-menu-bar-mac/
---

How to save Claude usage, in short: keep each conversation to one job and start a new one when the topic changes. Use the lowest model and effort level that does the work. Turn off tools you aren't using, such as web search and connectors. In Claude Code, run `/clear` between tasks and keep the context small. Anthropic gives no message or token counts for any plan, so these are the levers its own pages name, not a promise of how much you'll save.

Everything below about Claude comes from Anthropic's help pages and Claude Code docs, read on 28 November 2026 and listed at the end. Where those pages give no figure, this article gives none either.
## What uses up your Claude usage

Anthropic says your usage depends on the length and complexity of your conversations, the features you use, the model and the effort level. Its best-practices page lists the parts: message length and attached files, the length of the current conversation, tool use such as Research and web search, model choice, creating artifacts, and multi-step tasks like running code or browsing. The two limits themselves are in [Claude usage limits explained](/blog/claude-usage-limits/).

Claude and Claude Code share them. Anthropic's Claude Code plan page says the limits are shared across Claude and Claude Code, and its help page says claude.ai, Claude Code and Claude Desktop count toward the same limit. A long afternoon in Terminal comes out of the same allowance as your chats.

The other fact that explains most of what follows: a long conversation is paid for again on every message. Anthropic says longer conversations that trigger automatic context management use more of your limit. The Claude Code docs say Claude Code sends your full conversation with each request. Cached re-reads are cheaper, but a one-line question in a session that has been open all day still draws on the whole conversation.

| Habit | claude.ai and Claude Desktop | Claude Code |
|---|---|---|
| New topic, fresh context | Start a new chat | `/clear` |
| Right-sized model | Lower-priced model for routine work | `/model`, chosen at the start |
| Less thinking | Thinking off, or a lower effort level | `/effort`, or thinking off in `/config` |
| Fewer tools | Turn off connectors and web search | `/mcp` to disable unused servers |
| Less to reread | Short project instructions, unused files removed | CLAUDE.md under roughly 200 lines |

## How to save Claude usage in claude.ai and Claude Desktop

These apply to chats in claude.ai and in Claude Desktop.

### Start a new chat when the topic changes

Anthropic's help page says to try starting a new conversation if you're nearing your usage limit in a longer chat. A new chat doesn't mean starting from nothing: on paid plans Claude can search your past chats and use memory and project summaries. {{live:/blog/claude-conversation-length-limit/}}A chat that grows past Claude's context window is a different limit, covered in [the conversation length limit](/blog/claude-conversation-length-limit/).{{/live}}

### Use the lowest model that fits the job

Anthropic's model guide says that on Pro, Max, Ultra and Team plans, higher-priced models use your limits faster. It describes Haiku as the one for short, narrowly scoped tasks like quick lookups, Sonnet as faster and cheaper than Opus for well-scoped tasks with a clear brief, and Opus as the one for research and finished documents that need judgment. It also notes that Sonnet at the higher effort levels costs closer to Opus per task.

So for routine work, start on the smaller model. The same guide adds that a more capable model can finish a task with less work, which offsets much of its higher price, and that when a result falls short you should try a higher effort before moving up a model.

### Lower the effort, or turn thinking off

Anthropic's help page lists this among the ways to make usage last: turn thinking off when you don't need deeper reasoning, and choose a lower effort level for routine work. On models where thinking is always on, lower the effort level instead.

The model guide adds that higher settings think longer and cost more without always producing better work, and suggests moving to High when Medium stalls. You set effort by clicking the model name next to the send button.

### Turn off connectors and web search you don't need

Tools and connectors are token-intensive, says Anthropic. Its advice is to turn off apps you've connected when a conversation doesn't need them, and to ask Claude not to search the web when you don't need current information. Research and web search are on its list of things that count toward your limits.

### Keep projects light, and reuse them

Anthropic's page on length limits says to keep project instructions concise and to remove files you no longer use. Projects use retrieval, so only relevant content loads into the context window.

Projects also help the other way. The best-practices page says content in a project is cached and counts less against your limits when reused. The cache expires after inactivity, so your first message after a long break counts that content in full again. A project suits material you'll refer back to; a one-off file doesn't need one.

### Say it once, in one message

Anthropic's best-practices page suggests planning a conversation before you start: decide what you need, combine related questions, share the background up front and review your prompt before sending. Its stated reason is fewer back-and-forth messages.
## Keep usage low in Claude Code

On a Pro, Max or Ultra plan, Claude Code spends from the same limits as your chats. The Claude Code docs put the cost rule plainly: the more context Claude processes, the more tokens you use. Most of the tips below keep that context small, and a smaller context costs less on every message after it.

### Run /clear between tasks

Use `/clear` to start a new conversation with empty context whenever you switch to unrelated work. The docs say stale context wastes tokens on every message after it. Run `/rename` first if you want to find the session later, then `/resume` to return to it.

Anthropic's help page calls this the most effective lever for both quality and cost. Its rule of thumb: `/clear` when you start a new task, `/compact` when you're continuing a long one.

### Use /compact at a natural break

`/compact` summarizes the conversation to free space, and you can tell it what to keep: `/compact Focus on code samples and API usage`. The docs also let you set compaction instructions in CLAUDE.md.

Compacting isn't free. The summary is a request that reads the whole conversation. While the cache is warm that costs a fraction of what the context size suggests, but after a break longer than the cache lifetime there is no cache left, and the docs say that is when `/compact` costs the most. They suggest running it at a natural break between tasks rather than waiting for auto-compaction to trigger mid-task.

### Pick the model and effort once, at the start

In Claude Code, Anthropic's help page puts it this way: Sonnet for most coding, Opus for hard debugging, wide refactors and architecture, Haiku for quick lookups and simple edits. It says spending Opus on routine work is the fastest way to drain a limit.

Switching later has a price of its own. Each model has its own cache, so after `/model` the next request reads the whole conversation with no cache hits. On older models, changing the effort level mid-session does the same. With a Claude subscription, Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1 or later keep the cache when you change effort. The docs' tip is to pick model and effort at the top of a session and save `/compact` for natural breaks.

For simpler tasks, `/effort` lowers the effort level, and `/config` can turn thinking off. Anthropic notes that thinking tokens are billed as output, and that some models always think, so effort is the setting there.

### Reduce Claude token usage with a smaller context

- **Point at files instead of pasting them.** Pasted text stays in context, in full, for the rest of the session. Trim logs and stack traces to the 20 or 30 lines that matter.
- **Keep CLAUDE.md lean.** It loads at the start of every session, so Anthropic recommends roughly 200 lines. Instructions for one workflow, such as PR reviews, can move into a skill, which loads only when invoked.
- **Disable MCP servers you aren't using.** Run `/mcp` to see what's configured and `/context` to see what takes space. The docs add that MCP tool definitions are deferred by default, so only tool names and server instructions enter context until a tool is used.
- **Let a subagent read the noisy output.** Running tests or reading logs in a subagent keeps the verbose part out of your main conversation. The subagent's own requests still draw on your usage, so give it a smaller model if the job is simple.

### Plan before big changes, and stop wrong turns early

For a change that touches more than two or three files, Anthropic suggests plan mode (Shift+Tab) or asking for a file list first. Its help page says a plan costs a few hundred tokens, while a wrong 400-line diff that you revert and regenerate costs thousands, twice. If Claude heads the wrong way, press Escape, and use `/rewind` to go back to a checkpoint. A specific request ("add input validation to the login function in auth.ts") also lets Claude read fewer files than "improve this codebase".

### Watch what spends while you're away

The costs page lists why usage climbs in a long session: your first message after a break longer than the cache lifetime, which reprocesses everything; session-scoped scheduled tasks that fire on their interval while the session sits idle; subagents and workflows, each with requests of their own; and agent teams, where every teammate keeps its own context. It puts agent teams at roughly seven times a standard session when teammates run in plan mode. Session recap and idle compaction can also use tokens while you're idle.

### Let /usage tell you what to change

On a Pro, Max, Ultra, Team or Enterprise plan, `/usage` includes a breakdown of what counts against your plan limits. It attributes recent usage to skills, subagents, plugins and individual MCP servers, and lists recommendations, each starting with its share of your recent usage, such as `25%  Trim ~/code/api/CLAUDE.md · 49k tokens per request`. The share is how much of your usage the row applies to, not what the change saves. Press `d` or `w` for the last 24 hours or 7 days. The figures are approximate and come from local session history on that machine, so usage from other devices or claude.ai isn't in them.

From Claude Code v2.1.305, when the footer shows a hint such as `f to fix 2 of 3`, pressing `f` has Claude Code act on the recommendations it can, and Claude shows you each change before making it. [How to check Claude usage](/blog/check-claude-usage-mac/) goes through `/usage` and the other places to look.

## See your usage before it runs out

Habits work better when you can see the numbers move. Anthropic's own views, Settings > Usage and `/usage`, show them when you open them, and Claude Code warns you as you near a limit.

cl_audit is our tool: a free, source-available Mac app that reads each profile's 5-hour and weekly limits from Anthropic, with that profile's Claude Code sign-in. A profile is one Claude setup in cl_audit. It shows the numbers on a Dock icon, in a dashboard and in a "Claude usage" widget (macOS 14 or later), and each profile can also have its own icon in the menu bar, off by default. The page on a [Claude usage menu bar icon](/use-cases/claude-usage-menu-bar-mac/) has the styles.

The alerts tell you before a limit runs out. In a profile's settings, Alerts sends a Mac notification when a limit reaches a level you set, once per limit and reset. At 100% it says when the limit is back (for example "5-hour limit full · Back at 15:28, in 1h 42m"), and Notify when back, on by default, sends another when it resets. While a limit is full, the Dock icon turns into a countdown.
The usage history shows where tokens go. It reads the session files Claude Code writes on your Mac and charts tokens per day by project, model and surface, over 24 hours, 7 days or 30 days. If one project or one model takes most of the week, that's the place to apply the habits above. Usage from claude.ai chats and other computers isn't in it, nothing is uploaded, and the cost estimate at API list prices is not your bill.

![cl_audit usage history: tokens per day by project](/img/guides/usage-history.webp "The history panel: tokens per day, and where they go by project, model and surface. Sample data.")

cl_audit only shows usage. It doesn't change a limit or make Claude use less, and it's an independent tool, not affiliated with Anthropic. It needs a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in. If you only want a number under the prompt, [a status line](/blog/claude-code-status-line/) does that in Terminal. To try cl_audit, [download cl_audit](/install/).

## If you still run short

Habits only go so far. These are the routes Anthropic's own pages give:

- **Wait for the reset.** The limit comes back in full, and [when Claude limits reset](/blog/claude-limit-reset-time/) shows how to read the time. In Claude Code v2.1.234 or later, an interrupted task continues by itself after the reset (on by default in interactive sessions), and `/rate-limit-options` lists the choices when a limit blocks you. [What to do when you hit the limit](/blog/claude-usage-limit-reached/) goes through the messages.
- **Turn on usage credits.** On Pro, Max and Ultra you can switch them on in Settings > Usage and buy credits there. They're charged separately from the subscription at standard API rates, and you can set a monthly spending cap. [Claude usage credits](/blog/claude-usage-credits/) covers how they work.
- **Move up a plan.** Anthropic suggests Max if you consistently hit limits on Pro, and Ultra from Max, and says a new plan's limits apply right away. [Claude Max vs Pro](/blog/claude-max-vs-pro/) compares them.

Which one fits depends on how often you reach the limit: an occasional wait is a different problem from a limit that stops you every week. {{live:/blog/claude-spend-limit/}}A spending cap on usage credits is a limit of its own, covered in [the Claude spend limit](/blog/claude-spend-limit/).{{/live}} {{live:/blog/claude-code-usage-limits/}}How Claude Code's limits differ by plan is in [Claude Code usage limits](/blog/claude-code-usage-limits/).{{/live}}
