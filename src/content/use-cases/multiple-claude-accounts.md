---
title: "Multiple Claude accounts on one Mac, side by side | cl_audit"
description: "Run multiple Claude accounts on one Mac at once, such as work and personal, each with its own Claude window, Claude Code folder and Dock icon."
h1: "Multiple Claude accounts on one Mac"
mainKeyword: "multiple claude accounts"
kind: use-case
published: 2026-11-02
updated: 2026-11-05
author: n-uf
order: 1
takeaways:
  - "You can run multiple Claude accounts on one Mac at the same time: cl_audit gives each its own Claude window, Claude Code folder and Dock icon."
  - "An account belongs to one profile (checked by account and organisation), so a personal plan and a Team seat on the same email can be two profiles."
  - "Each profile's 5-hour and weekly limits are read separately; cl_audit doesn't pool them. A profile can switch to another of your own accounts, and the switch moves its Code sessions there."
  - "Whether one person may hold more than one Claude account is set by Anthropic's terms, not by cl_audit."
  - "cl_audit is free, source-available and runs on Apple silicon Macs with macOS 13 or later."
faq:
  - q: "Can I have two Claude accounts on one computer?"
    a: "Yes. With cl_audit each account becomes a profile with its own Claude Code folder and sign-in, and, if you want, its own Claude window and Dock icon. The profile that uses ~/.claude opens the usual Claude app; every other profile gets a separate Claude window."
  - q: "How do I open several Claude windows on a Mac?"
    a: "Turn on the Claude window switch for each profile. The profile using ~/.claude opens the usual Claude app, and every other profile opens its own Claude window with its own sign-in, chats and settings, next to the others. You open or quit each window from its card on the dashboard, and open it from the launcher or its Dock icon."
  - q: "Do two accounts share usage limits?"
    a: "cl_audit keeps them apart: each profile shows the limits of its own account, read from Anthropic with that profile's sign-in, and cl_audit doesn't pool them. A profile can switch to another of your own accounts, and the switch moves its Code sessions there. Within one plan, Anthropic's help page says Claude and Claude Code count against the same limits."
  - q: "Can two profiles use the same email?"
    a: "Only if they are two different accounts. A personal plan and a Team seat on the same email are two accounts, so they can be two profiles. An account belongs to one profile: one that another profile already has is refused."
sources:
  - title: "GitHub issue anthropics/claude-code#18435: manage multiple Claude accounts in Claude Desktop"
    url: "https://github.com/anthropics/claude-code/issues/18435"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Move your personal Claude account to a Team or Enterprise organization"
    url: "https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization"
    checked: 2026-11-02
  - title: "Anthropic Help Center: Use Claude Code with your Pro, Max, or Ultra plan"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Anthropic Help Center: What is the Ultra plan?"
    url: "https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan"
    checked: 2026-11-05
  - title: "Anthropic Help Center: How do usage and length limits work?"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Claude Code docs: Settings (CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-02
  - title: "Claude Code docs: Commands (/usage)"
    url: "https://code.claude.com/docs/en/commands"
    checked: 2026-11-02
  - title: "Anthropic Usage Policy"
    url: "https://www.anthropic.com/legal/aup"
    checked: 2026-11-02
  - title: "claude-fix README (sarhej/claude-fix)"
    url: "https://github.com/sarhej/claude-fix"
    checked: 2026-11-02
  - title: "claude-multiprofile README (jmdarre-v/claude-multiprofile)"
    url: "https://github.com/jmdarre-v/claude-multiprofile"
    checked: 2026-11-02
related:
  - /
  - /use-cases/claude-usage-limit-alerts/
  - /use-cases/claude-code-usage-history/
  - /install/
---

Yes, you can use multiple Claude accounts on one Mac at the same time. The Claude app signs in to one account at a time, so cl_audit gives each extra account its own Claude window and its own Claude Code folder, and shows each one's usage limits on its own Dock icon. cl_audit is an independent tool, not affiliated with Anthropic.

It's free, and it runs on Macs with Apple silicon and macOS 13 or later.

## Why the Claude app shows one account at a time

The Claude app keeps one sign-in, with one set of chats and settings. To use another account, you sign out and sign in again.

People have asked Anthropic to change that. [A GitHub issue on the Claude Code repository](https://github.com/anthropics/claude-code/issues/18435) asks for profile switching inside Claude Desktop, the way Slack switches workspaces or Chrome switches profiles, so work, personal and client accounts can stay apart. On 2 November 2026 it was still open, with nearly 1,000 thumbs-up on the first post.

Anthropic's help page does describe one kind of switching. If you have a personal account and an organisation account on the same email, you click your name or initials at the lower left to move between them. You still see one account at a time.

The issue and its comments list what people do instead: claude.ai in a browser for the second account, a separate macOS user, or a launcher that starts a second copy of the app with its own data folder. cl_audit takes the last route and adds what sits around it: a Claude Code folder for each account, the usage limits in the Dock, and alerts.

## What you get for each account

In cl_audit the unit is a profile: one Claude setup. A profile has a Claude Code folder with its own sign-in, and, if you want them, a Claude window and a Dock icon.

![cl_audit launcher with three Claude profiles and limits](/img/guides/launcher-profiles.webp "The launcher: every profile with both limits. ⌘1–9 opens its Claude window, ⌘↩ its Terminal. Sample data.")

- **Claude Code folder.** Claude Code keeps its settings and session history in one folder, `~/.claude` by default. Anthropic's docs say that if you set `CLAUDE_CONFIG_DIR`, Claude Code stores them in that folder instead. Each profile has its own folder and its own sign-in.
- **Claude window.** The profile that uses `~/.claude` opens the usual Claude app. Every other profile gets its own Claude window, with its own sign-in, chats and settings. Each of those windows runs with its own `--user-data-dir`, and that's how cl_audit tells them apart.
- **Dock icon.** A small app named `cl_audit <profile name>` that shows the profile's 5-hour and weekly usage. By default a click shows the usage for 3 seconds while the profile's Claude window opens.

A profile has two switches, **Usage in the Dock** and **Claude window**. With both off it's "usage only". Its limits still show on the [Claude usage dashboard](/dashboard/), in the launcher and in alerts, but nothing sits in the Dock and no window opens. That suits an account you only want to keep an eye on.

In cl_audit, "account" means only the claude.ai account a profile signs in to. A profile has one or more accounts and works on one at a time. An account belongs to one profile, and cl_audit tells accounts apart by account and organisation.

## Work and personal on the same email

The usual case is a work seat and a personal plan. Say your employer has you on a Team seat and you pay for Max yourself, both on the same email address.

Anthropic's help page says those two stay separate, each with its own conversations and projects. cl_audit treats them the same way. They're two accounts, so they can be two profiles, say "work" and "home", each with its own Claude window. Work chats stay in the work window.

Each seat keeps its own limits. cl_audit shows them; it doesn't add them up or hand work from one profile to the other.

An account belongs to one profile. If you add one that another profile already has, cl_audit refuses it. A personal plan and a Team seat on one email still work, because they're different accounts.

A profile can also keep a second account on standby. Its limits show too, from a sign-in kept in a small Claude Code folder of its own, so you can see which account has room. When a limit is full and the other account has room, the profile's card offers **Switch to …**. You add one under Settings ▸ the profile ▸ Claude Code ▸ **Accounts**.

cl_audit shows limits for plans that have them: Pro, Max, Ultra and Team. Anthropic says a verified Ultra account has no 5-hour limit, so its card shows the week alone. A profile that signs in with an API key is billed per token and has no usage limits to show.

## Accounts for clients

If you freelance or work for an agency, a client may add you to their Team organisation. That's another seat, even on the email you already use, so it gets its own profile, say "client-acme".

With Claude window on, the client's chats stay in its own Claude window, away from your work and home ones. Claude Code for that client runs from its own folder, `~/.claude-client-acme`, with its own sign-in. The seat's 5-hour and weekly limits are the client's, and they sit on a card next to your other profiles, so you can check them without opening the client's window.

How a Team seat differs from a personal plan is covered in [Claude Team and personal accounts](/blog/claude-team-and-personal-account/).

When the work ends, use **Remove profile…**. It keeps the profile's Claude Code folder unless you also choose **Delete its folders too**.

## Set it up in four steps

You need a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile. The Claude app is only needed for Claude windows.

1. **Install cl_audit.** Download the zip, move cl_audit to Applications and open it. cl_audit isn't signed with an Apple Developer ID yet, so macOS asks once: allow it in System Settings ▸ Privacy & Security with **Open Anyway**. The [install page](/install/) has the steps, and how to build it from source instead.
2. **Add a profile, starting with the account.** Open Settings ▸ **＋ (New profile)**. The **Account** pop-up in its Claude Code card lists accounts already signed in to an unused Claude Code folder on this Mac. Picking one connects that folder as it is: its sign-in, settings and history stay. Other profiles' accounts are dimmed. For another account, choose **Sign in to another account…**. cl_audit makes a new folder, `~/.claude-<name>`, which can share instructions, agents, skills, commands or memory from another folder, and opens Claude Code's own sign-in in Terminal with the address filled in. The address only fills in the sign-in; the account your browser is signed in to at claude.ai decides, so switch it there first.
3. **Choose what it includes.** Turn Claude window and Usage in the Dock on or off. If it gets a Claude window, quit the Claude app first, because while it's open it writes its own sign-in and settings. The page lists any open Claude windows and checks again every 2 seconds.
4. **Sign in, in two parts.** Claude Code first, then, if the profile has a Claude window, sign that window in to the same claude.ai account. Its Code sidebar starts empty. Last, add the Dock icon, or choose Start reading usage.

You sign in on Anthropic's own screens, and cl_audit never sees the password. An account belongs to one profile; cl_audit checks that by account and organisation ids.

Repeat for the second account. The dashboard then shows a card for each profile, with a switch for its Claude window and one for its Dock icon.

## Claude Code in Terminal for each account

Claude Code in Terminal follows the profile too. Each profile's folder is a `CLAUDE_CONFIG_DIR` folder, and Claude Code saves each folder's login separately in the macOS Keychain. A Claude Code session started for "work" uses the work seat; one started for "home" uses the personal plan.

On the dashboard, each card has a **Terminal** key. In the launcher, ⌘↩ does the same for the selected profile.

Claude Code's `/usage` command shows the plan usage limits for the account Claude Code is signed in to, and Settings ▸ Usage in Claude does the same for the account you're signed in to there. cl_audit puts every profile's limits side by side, so you don't have to switch accounts just to look.

## What stays separate, and what you can share

Each profile keeps its own:

- sign-in, for Claude Code and for the Claude window;
- Claude window chats and settings;
- Claude Code folder, with its settings and session history;
- usage limits, read for its own account.

When you create a new folder, you can copy some Claude Code setup into it from another folder you pick: instructions, agents, skills, commands or memory. That way a new profile starts with your usual `CLAUDE.md` and skills.

Email addresses show in the launcher and on cards. If you share your screen, turn off **Show emails** in Settings ▸ General ▸ Privacy, and they're left out or blurred.

## Is it allowed to have multiple Claude accounts?

cl_audit doesn't get around usage limits. It doesn't pool limits across accounts: each account's limits are its own, and each profile shows its own accounts' limits, nothing more. A profile can switch to another of your own accounts, and the switch moves its Code sessions there; it doesn't switch on its own. The [FAQ](/faq/) covers how the usage figures are read.

Whether you may hold more than one Claude account is up to Anthropic's terms. On 2 November 2026, Anthropic's Usage Policy listed, among things not to do: coordinating malicious activity across multiple accounts, creating multiple accounts to avoid detection or get around product guardrails, and using a different account to get around a ban.

This page is about keeping a work seat and a personal plan apart. cl_audit can't tell you how Anthropic's terms apply to your own case. If you're unsure, read the terms or ask Anthropic.

## Other ways to run a second account

You don't need cl_audit to run a second Claude account. Here's how the options compare, going by the GitHub issue and each project's README (checked on 2 November 2026).

| Option | How it works | Covers | Where it makes more sense |
|---|---|---|---|
| A browser for the second account | claude.ai in a browser while the app has the first account | Chat, in the browser | An occasional second account. Commenters on the issue say it misses Desktop-only features such as Code |
| Separate macOS users | Each Claude account gets its own Mac user login | Everything, in separate sessions | Rarely. The issue's author found it too heavy for switching during the day |
| claude-fix | Small launcher apps open the Claude app with a separate data folder, using `--user-data-dir` | Claude Desktop profiles. The README says nothing about Claude Code or usage | You only want launchers, and you prefer an MIT-licensed tool |
| claude-multiprofile | An npm command-line tool makes Desktop launchers and sets `CLAUDE_CONFIG_DIR` for Claude Code | Desktop and Claude Code, with a Dock icon and a terminal command per profile | You want a command-line tool with checks and repair commands, and don't need a usage display. Needs Node 18 or newer |
| cl_audit | A Claude window and a Claude Code folder per profile, plus a Dock icon with the profile's limits | Desktop, Claude Code, limits, alerts and usage history | You want each account's usage visible at a glance. Free, source-available (PolyForm Perimeter 1.0.1), Apple silicon only |

These are all community or third-party tools; none is made by Anthropic. claude-fix's README says a future Claude release could break it, and claude-multiprofile's includes a repair command for after updates. cl_audit says the same of itself: it relies on how Claude Code saves its login and on Anthropic's usage figures, and neither is a public interface. If something stops working after a Claude update, update cl_audit.

## Next

With two accounts running, you'll probably want to know when one of them is close to a limit. The page on [how cl_audit's alerts work](/use-cases/claude-usage-limit-alerts/) covers the alerts, including Notify when back. [Claude Code usage history](/use-cases/claude-code-usage-history/) shows where the tokens go, by project, model and surface. The page on [every account's limits in the Dock](/) has the overall picture, or you can [download cl_audit](/install/) and add your first profile.
