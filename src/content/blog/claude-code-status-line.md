---
title: "Claude Code status line: setup, examples and fields"
description: "Set up a Claude Code status line with /statusline or the statusLine setting, see the JSON fields it gets, and copy three jq scripts we ran."
h1: "How to set up a Claude Code status line, with working examples"
mainKeyword: "claude code status line"
kind: how-to
published: 2026-11-24
updated: 2026-11-24
draft: true
author: n-uf
takeaways:
  - "The Claude Code status line is a row under the prompt that shows whatever your command prints. The command gets the session's data as JSON on stdin."
  - "Set it up with /statusline and a description of what you want, or add a statusLine entry with type command to ~/.claude/settings.json."
  - "The JSON has the model, context_window.used_percentage, cost.total_cost_usd and, for claude.ai Pro, Max and Ultra subscribers, rate_limits with the 5-hour and weekly figures."
  - "rate_limits arrives only after the first API response in a session, and either window can be missing, so a script needs a fallback for both."
  - "A status line shows one session in one terminal. cl_audit shows every profile's limits in the Dock, also when no terminal is open."
faq:
  - q: "How do I set up a Claude Code status line?"
    a: "Run /statusline in Claude Code and describe what you want, for example the model name and context percentage with a progress bar. Claude Code writes a script into ~/.claude/ and updates your settings. To do it by hand, save a script, make it executable, and add a statusLine entry with type set to command to ~/.claude/settings.json."
  - q: "How do I show context usage in the Claude Code status line?"
    a: "Print context_window.used_percentage from the JSON on stdin, with a fallback such as jq's // 0, because it can be null early in a session. It counts input tokens only, not output tokens. The first script in this article turns it into a ten-block bar."
  - q: "Can the status line show my 5-hour and weekly limits?"
    a: "Yes, if you're on a claude.ai Pro, Max or Ultra plan. The JSON then has rate_limits.five_hour and rate_limits.seven_day, each with used_percentage and resets_at. They show up only after the first API response in a session, and each one can be absent."
  - q: "Does a status line use tokens or slow Claude Code down?"
    a: "It runs locally and doesn't use API tokens, Anthropic's docs say. A slow script does hold the line up, because Claude Code shows the output only after the script exits, and it cancels a run still going when the next update comes. Cache slow commands such as git status."
  - q: "Why is my Claude Code status line blank?"
    a: "Usually the script isn't executable, exits with a non-zero code or prints nothing, or you haven't accepted the workspace trust dialog for that folder. Run claude --debug to see the script's stderr. On a managed machine, allowManagedHooksOnly or disableAllHooks can switch a custom status line off."
sources:
  - title: "Claude Code docs: Customize your status line"
    url: "https://code.claude.com/docs/en/statusline"
    checked: 2026-11-05
  - title: "Claude Code docs: Commands (/statusline, /usage)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-05
  - title: "Claude Code docs: Settings reference (statusLine, subagentStatusLine)"
    url: "https://code.claude.com/docs/en/settings-reference"
    checked: 2026-11-05
  - title: "Claude Code docs: Plugin manifest reference (settings)"
    url: "https://code.claude.com/docs/en/plugins-reference"
    checked: 2026-11-05
  - title: "Claude Code docs: Mods overview"
    url: "https://code.claude.com/docs/en/plugins/mods/overview"
    checked: 2026-11-05
  - title: "Claude Code docs: Draw in the interface (mods)"
    url: "https://code.claude.com/docs/en/plugins/mods/interface"
    checked: 2026-11-05
  - title: "Claude Code docs: Manage costs effectively"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-05
  - title: "Claude Code docs: Use Claude Code in VS Code (Check account and usage)"
    url: "https://code.claude.com/docs/en/vs-code"
    checked: 2026-11-05
  - title: "Claude Code docs: Desktop application (Check usage)"
    url: "https://code.claude.com/docs/en/desktop"
    checked: 2026-11-05
  - title: "cl_audit README (n-uf/cl_audit)"
    url: "https://github.com/n-uf/cl_audit"
    checked: 2026-11-05
related:
  - /blog/check-claude-usage-mac/
  - /blog/claude-usage-limits/
  - /use-cases/multiple-claude-accounts/
  - /use-cases/claude-code-usage-history/
---

The Claude Code status line is a row under the prompt that runs a command you choose and shows what it prints. Claude Code hands that command a JSON object about the current session on stdin: the model, how full the context window is, an estimated session cost and, on claude.ai Pro, Max and Ultra plans, the 5-hour and weekly limits. To set one up, run `/statusline` and describe what you want, or add a `statusLine` entry to `~/.claude/settings.json` that points at a script.

What follows about the status line comes from Anthropic's Claude Code docs, read on 5 November 2026. We ran the three scripts below against the sample JSON on that page.

## What the status line is

Anthropic describes it as a customizable bar at the bottom of Claude Code that runs any shell script you configure. It runs on your Mac and doesn't use API tokens. It hides for a moment during some interactions, such as the help menu and permission prompts.

It gets its own row above the built-in footer badges and doesn't replace them. One side effect: with a custom status line set, Claude Code stops showing most of the footer's keyboard hints, `esc to interrupt` and `? for shortcuts` among them.

## Set up a Claude Code status line

You can let Claude Code write it, or write it yourself. The first way produces what the second one describes.

### With /statusline

Type `/statusline` followed by what you want:

```text
/statusline show model name and context percentage with a progress bar
```

Run it with no description and, per the commands reference, it builds a status line from your shell prompt instead. Claude Code writes a script into `~/.claude/` and updates your settings; approve the file edits if it asks. To remove the line later, run `/statusline delete`, or delete the `statusLine` field from settings.json yourself.

### By hand

Save a script, make it executable (`chmod +x ~/.claude/statusline.sh`) and point to it from `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

`type` is always `"command"`, and `command` is a script path or an inline shell command. Three fields are optional: `padding` (extra horizontal spacing in characters, default 0), `refreshInterval` (also re-run every N seconds, at least 1) and `hideVimModeIndicator` (hide the built-in `-- INSERT --` text when your script shows the vim mode itself). The setting works in any settings file, so a project can have its own. Claude Code reloads settings when you save.

The examples here use `jq`, which Anthropic's page notes you may need to install. A one-liner doesn't even need a file. This is Anthropic's inline example, the whole of the `command` value:

```bash
jq -r '"[\(.model.display_name)] \(.context_window.used_percentage // 0)% context"'
```

Inside settings.json the inner double quotes and backslashes need escaping, which is one reason a script file is easier. With the docs' sample JSON it prints `[Opus] 8% context`.

If nothing shows, check two things first. Until you accept the workspace trust dialog for the folder, the line stays empty, because it runs a shell command. And the script has to exit with code 0 and print something.

## When the line updates

The script runs once when a session starts or resumes. After that it runs again when:

- a new assistant message arrives, or `/compact` finishes;
- the permission mode changes, or vim mode toggles;
- you change the `command` (this one runs at once, without the usual wait);
- your `refreshInterval` timer fires;
- a rate-limit window in the data it last got reaches its `resets_at` time, or a warm prompt cache reaches its `expires_at`.

Updates are debounced at 300 ms, so a burst of changes leads to one run. If an update comes while your script is still running, Claude Code cancels that run.

While the main session sits idle, for example waiting on background subagents, those events can go quiet. `refreshInterval` covers that, and it's what you'd use for a clock.

## What the script receives

Claude Code sends JSON on stdin. These are the fields most scripts want, named exactly as in the docs:

| Field | What it holds |
|---|---|
| `model.id`, `model.display_name` | The current model's identifier and display name |
| `workspace.current_dir` | The working directory (`cwd` holds the same value) |
| `context_window.used_percentage` | Share of the context window used, counted from input tokens only |
| `context_window.context_window_size` | Maximum context size in tokens: 200000 by default, 1000000 for models with extended context |
| `cost.total_cost_usd` | Estimated session cost in USD |
| `cost.total_duration_ms` | Wall-clock time the session has run, in milliseconds |
| `rate_limits.five_hour.used_percentage`, `rate_limits.seven_day.used_percentage` | Share of the 5-hour or 7-day limit used, 0 to 100 |
| `rate_limits.five_hour.resets_at`, `rate_limits.seven_day.resets_at` | When that window resets, in Unix epoch seconds |
| `effort.level`, `session_name`, `version` | Reasoning effort, the session's name, the Claude Code version |

The docs list more, such as pull request, worktree and prompt cache fields. Some fields aren't always there:

- `context_window.used_percentage` and `remaining_percentage` can be `null` early in a session. `current_usage` is `null` before the first API call and again right after `/compact`.
- `rate_limits` is there only for claude.ai Pro, Max and Ultra subscribers (or behind a Claude apps gateway that sets a spend limit), and only after the first API response in a session. Each window can be missing on its own, and Claude Code drops a window once its `resets_at` has passed.
- `cost.total_cost_usd` is worked out on your machine from token counts at list price, so it can differ from your bill. For Pro, Max and Ultra subscribers, Anthropic's cost page says the session cost figure isn't relevant for billing. It goes back to $0 when `/clear` starts a new session.

That's what the `// 0` and `// empty` in the scripts below are for.

## Claude Code status line examples

Save a script as `~/.claude/statusline.sh`, run `chmod +x` on it and point `command` at it. We ran each one against the docs' sample JSON and against copies with `rate_limits` removed, with only one window left, and with the context percentages set to `null`. They work with the `/bin/bash` that comes with macOS.

### Context usage and cost

```bash
#!/bin/bash
# Model, context bar and session cost.
export LC_ALL=C  # printf needs a dot as the decimal point
input=$(cat)

IFS=$'\t' read -r MODEL PCT COST < <(jq -r '[
  .model.display_name,
  (.context_window.used_percentage // 0 | floor),
  (.cost.total_cost_usd // 0)
] | @tsv' <<<"$input")

FILLED=$((PCT / 10))
[ "$FILLED" -gt 10 ] && FILLED=10
printf -v FILL "%${FILLED}s" ""
printf -v PAD "%$((10 - FILLED))s" ""
BAR="${FILL// /▓}${PAD// /░}"

printf '[%s] %s %s%% | $%.2f\n' "$MODEL" "$BAR" "$PCT" "$COST"
```

The docs' sample (8% of the context, $0.01234) gives `[Opus] ░░░░░░░░░░ 8% | $0.01`. With the context at 83.7% and the cost at 2.5, it's:

```text
[Opus] ▓▓▓▓▓▓▓▓░░ 83% | $2.50
```

While the percentage is still `null` it shows 0%. Keep the `LC_ALL=C` line: on a Mac set to a language that writes decimals with a comma, such as German, `printf` rejects `2.5`, the script exits with an error and the line goes blank.

### Claude Code usage in the status line

This one prints the 5-hour and weekly figures, rounded down, with their reset times. Until `rate_limits` arrives, it prints only the model name.

```bash
#!/bin/bash
# Model plus the 5-hour and weekly figures, each with its reset time.
# Prints just the model while rate_limits is absent.
jq -r '
  def pct: floor | tostring + "%";
  [ .model.display_name,
    (.rate_limits.five_hour // empty
      | "5h \(.used_percentage | pct) (resets \(.resets_at | strflocaltime("%H:%M")))"),
    (.rate_limits.seven_day // empty
      | "7d \(.used_percentage | pct) (resets \(.resets_at | strflocaltime("%a %H:%M")))")
  ] | join(" | ")'
```

The docs' sample, on a Mac set to UTC:

```text
Opus | 5h 23% (resets 16:00) | 7d 41% (resets Thu 16:00)
```

`strflocaltime` turns the epoch seconds into your Mac's local time, and the day name follows your Mac's language. If only the weekly window is there, you get `Opus | 7d 41% (resets Thu 16:00)`. Behind a gateway with only a spend limit, it prints just the model; the docs' rate limit example covers `spend_limit`.

For what the two windows are, see [the 5-hour and weekly limits explained](/blog/claude-usage-limits/), and for how the reset works, [when Claude limits reset](/blog/claude-limit-reset-time/). `/usage` shows the same plan limits whenever you ask, and the other places to look are in [how to check Claude usage on a Mac](/blog/check-claude-usage-mac/).

### Colour the 5-hour figure as it fills

```bash
#!/bin/bash
# The 5-hour figure: green below 70%, yellow from 70%, red from 90%.
input=$(cat)
FIVE=$(jq -r '.rate_limits.five_hour.used_percentage // empty | floor' <<<"$input")

if [ -z "$FIVE" ]; then
  echo "5h --"
  exit 0
fi

if [ "$FIVE" -ge 90 ]; then COLOR='\033[31m'
elif [ "$FIVE" -ge 70 ]; then COLOR='\033[33m'
else COLOR='\033[32m'; fi

printf '%b5h %s%%\033[0m\n' "$COLOR" "$FIVE"
```

The docs' sample prints `5h 23%` in green. At 75% it turns yellow, at 96.4% it prints `5h 96%` in red, and before the first response it shows a plain `5h --`. The thresholds are ours; pick your own.

## More status line customization

Anthropic's page goes further than these three scripts:

- Every `echo` is its own row, so a script can draw two or three lines.
- ANSI colour codes work if the terminal supports them. OSC 8 links are clickable in iTerm2, Kitty and WezTerm; Terminal.app doesn't support clickable links.
- To fit the width, read the `COLUMNS` and `LINES` environment variables. `tput cols` can't see the terminal from inside the script.
- `git status` on every update can make a big repository lag. The docs cache the result in a temp file named after `session_id`, which stays the same for the whole session, unlike `$$`.
- There are ready scripts for git status with colours, cost and duration, a clickable link to your GitHub repository and the rate limits, in Bash, Python and Node.js.

## Is there a Claude Code status line plugin?

Not through the `statusLine` setting. Anthropic's plugin reference says that of a plugin's settings, only `agent` and `subagentStatusLine` take effect, and `subagentStatusLine` rewrites the rows in the subagent panel, not the line under the prompt.

A plugin can draw its own status line another way, though: by shipping a mod. Mods are plugin code that runs inside Claude Code and draws interface, and Anthropic's mod docs show a status line under the prompt among the places a mod can draw. Mods also draw in the Claude app's Code tab and the VS Code extension, with some elements terminal-only. That's a different thing to write than a shell script reading JSON.

The status line page also names two community projects, ccstatusline and starship-claude, which it says provide pre-built configurations with themes and extra features. We haven't tried either.

## What the status line can't do

**No limits until the first response.** `rate_limits` arrives with the first API response in a session, so a fresh session shows no plan figures yet.

**One session, one account.** The script gets that session's JSON, so a terminal signed in to your work seat shows that seat's numbers and nothing else. A second account in another configuration folder is another Claude Code with its own status line; [how to keep several Claude Code accounts apart](/blog/claude-code-multiple-accounts/) has the setup.

**The terminal only.** Claude Code in a terminal runs the script. In the Claude app's Code tab, Anthropic's desktop docs show context in the Context card and plan usage in the usage ring, and cl_audit's README notes that the Code tab doesn't run status lines. In the VS Code extension, `/usage` opens an Account & usage dialog instead.

**Your organization can switch it off.** If managed settings set `allowManagedHooksOnly`, your custom status line disappears and only a `statusLine` from those managed settings applies. `disableAllHooks` stops it too.

**No history.** The figures are what the last update received. Where your tokens went over the past days is a job for [Claude Code usage history](/use-cases/claude-code-usage-history/), which reads Claude Code's session files.

## Every account's limits, without a terminal

A status line tells you how this session is doing. Close the terminal and the numbers are gone, and a second account means a second terminal.

cl_audit is our free Mac app for the other view, a [Claude usage tracker](/) that lives in the Dock. Each profile is one Claude Code folder with its own sign-in. cl_audit's background agent reads every profile's 5-hour and weekly limits from Anthropic with that profile's Claude Code sign-in, and with Usage in the Dock on, the profile gets a Dock icon that shows them, terminal or not. The agent also sends an alert at a level you set; the page on [Claude usage limit notifications](/use-cases/claude-usage-limit-alerts/) has the details.

![Dock icons showing three Claude profiles' usage limits](/img/guides/dock-profiles.webp "cl_audit in the Dock: each profile's icon shows its 5-hour and weekly limits. Sample data.")

cl_audit also ships a status line script, `usage-statusline.sh`. It writes a profile's figures to a file after every reply in Terminal, and the agent uses that file only when it can't reach Anthropic's usage endpoint. cl_audit is an independent tool, not affiliated with Anthropic. If you keep several accounts, the page on [multiple Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) explains the setup, and you can [download cl_audit](/install/) for a Mac with Apple silicon.

For one account in one terminal, a status line is enough. Start with `/statusline` and keep the script short.
