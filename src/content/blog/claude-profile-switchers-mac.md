---
title: "Claude desktop profile switcher for Mac, compared | cl_audit"
description: "A Claude desktop profile switcher for Mac, compared: browser profiles, a second app copy, Parall, claude-fix, claude-multiprofile, Multi-Claude, cl_audit."
h1: "Claude desktop profile switchers for Mac, compared"
mainKeyword: "claude desktop profile switcher"
kind: comparison
published: 2026-11-02
updated: 2026-11-05
author: n-uf
takeaways:
  - "The Claude app signs in to one account at a time. Anthropic's help page describes switching only for accounts on the same email."
  - "anthropics/claude-code#18435, the request for multiple accounts in the Claude app, was open on 2 November 2026 with 987 thumbs-up reactions and 229 comments."
  - "Most switchers work alike: each profile opens the Claude app with its own data folder. They differ in price, in Claude Code support and in what they show."
  - "Of the tools compared, cl_audit is the only one whose page describes showing each account's 5-hour and weekly limits. It also needs Apple silicon and Claude Code signed in for each profile."
  - "A browser profile is enough if you never need the Claude app's desktop features for the second account."
faq:
  - q: "How do I switch accounts in the Claude desktop app?"
    a: "If your accounts share an email, click your initials in the bottom left corner and pick the other account, as Anthropic's login help page describes. For accounts on different emails the app has no built-in switcher. People sign out and in, use a browser profile or run a second copy of the app with a tool."
  - q: "Is there a Claude Code profile switcher?"
    a: "Yes, but they work differently from the Claude app ones. claude-multiprofile and cl_audit give each profile its own Claude Code folder through the CLAUDE_CONFIG_DIR variable, and Parall describes a shortcut with a separate HOME folder. The pages for claude-fix and Multi-Claude describe the Claude app only."
  - q: "Do I need a tool to run two Claude accounts on one Mac?"
    a: "No. You can use a browser profile for the second account or launch a second copy of the Claude app with its own data folder by hand. A tool saves you the setup and adds a Dock icon or a launcher for each profile."
  - q: "Will Anthropic add account switching to the Claude app?"
    a: "Anthropic hasn't announced it on the pages checked here. The request, anthropics/claude-code#18435, was still open on 2 November 2026. Our guess: if it ships, a switcher inside the app would replace most of what these tools do."
  - q: "Do these tools get around Claude's usage limits?"
    a: "No. Each account keeps its own limits, and none of the tools described here claims to combine them. Whether you may hold more than one Claude account is set by Anthropic's terms."
sources:
  - title: "Log in to your Claude account (Claude Help Center)"
    url: "https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account"
    checked: 2026-11-02
  - title: "[FEATURE] Add the ability to manage multiple Claude accounts within the Claude Desktop app (anthropics/claude-code#18435)"
    url: "https://github.com/anthropics/claude-code/issues/18435"
    checked: 2026-11-02
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "Manage Chrome with multiple profiles (Google Chrome Help)"
    url: "https://support.google.com/chrome/answer/2364824"
    checked: 2026-11-02
  - title: "Parall home page"
    url: "https://parall.app/"
    checked: 2026-11-02
  - title: "Parall FAQ"
    url: "https://parall.app/faq/"
    checked: 2026-11-02
  - title: "Parall compatibility table"
    url: "https://parall.app/compatibility/"
    checked: 2026-11-02
  - title: "Parall README (JulyIghor/Parall)"
    url: "https://github.com/JulyIghor/Parall"
    checked: 2026-11-02
  - title: "claude-fix README (sarhej/claude-fix)"
    url: "https://github.com/sarhej/claude-fix"
    checked: 2026-11-02
  - title: "claude-multiprofile README (jmdarre-v/claude-multiprofile)"
    url: "https://github.com/jmdarre-v/claude-multiprofile"
    checked: 2026-11-02
  - title: "Multi-Claude home page (multiclaude.app)"
    url: "https://multiclaude.app/"
    checked: 2026-11-02
  - title: "multi-claude README (thomasog/multi-claude)"
    url: "https://github.com/thomasog/multi-claude"
    checked: 2026-11-02
  - title: "Settings files and precedence (Claude Code docs, CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-02
related:
  - /use-cases/multiple-claude-accounts/
  - /blog/claude-code-multiple-accounts/
  - /blog/claude-team-and-personal-account/
  - /
---

A Claude desktop profile switcher opens the Claude app once per account, each copy with its own data folder, so every account stays signed in. You can get the same result by hand with a browser profile or a second copy of the app. The tools compared here are Parall, claude-fix, claude-multiprofile, Multi-Claude and cl_audit. They work in much the same way and differ in price, in whether they cover Claude Code, and in what they show you. Each description comes from the project's own README or home page, read on 2 November 2026.

cl_audit is our tool, so weigh that. It's independent and not affiliated with Anthropic.

## The Claude app signs in to one account at a time

Anthropic's login help page describes one way to switch. If you have a personal Claude account and a Team or Enterprise account on the same email address, you click your initials in the bottom left corner and pick the other one. A check mark shows which is active. The page says nothing about accounts on different emails, and it describes a switch, not two accounts open at once.

That gap is [anthropics/claude-code#18435](https://github.com/anthropics/claude-code/issues/18435), "Add the ability to manage multiple Claude accounts within the Claude Desktop app with easy switching between profiles". It was opened on 15 January 2026 and was still open on 2 November 2026, with 987 thumbs-up reactions and 229 comments. Counting keywords in the comments that day: 103 contain "work", 88 "personal" and 73 both. Only 18 mention usage or limits. Most people want work and personal kept apart.

The comments also show the workarounds: 24 mention a browser and 26 mention `--user-data-dir`, the setting that gives a second copy of the app its own data folder. Several commenters want both accounts open at once, not just a quicker switch. That's what running [multiple Claude accounts](/use-cases/multiple-claude-accounts/) on one Mac has to cover.

## The options

### A browser profile

No extra software. Chrome's help page says profiles keep your bookmarks, history, passwords and other settings separate, so one profile can stay signed in to a work claude.ai account and another to a personal one.

The catch is what a browser can't do. One commenter on #18435 points out that Claude Code and Cowork need local file access through the Claude app, so no browser workaround covers them. If the second account only chats, a browser profile may be all you need.

### A second copy of the app, by hand

The Claude app is an Electron app, so you can launch it again with its own data folder. claude-multiprofile's README gives the pattern `open -n -a "Claude" --args --user-data-dir=...`, and for Claude Code it says to set `CLAUDE_CONFIG_DIR` before running `claude`. Anthropic's Claude Code docs list that variable as the way to keep settings, session history and plugins in another folder. The article on [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) walks through it.

It's free, and fiddly. claude-fix's README lists "duplicate `Claude.app` bundles manually" as breaking on updates. One #18435 commenter has repaired a hand-made second instance twice after a sign-in landed in the wrong one, and puts it down to both instances sharing one bundle ID: one Dock tile, one `claude://` sign-in callback. The tools hit the same thing. claude-multiprofile says to quit other Claude windows before a Google sign-in, and Multi-Claude suggests a private browser window for the second sign-in.

### Parall

Parall is a general macOS launcher, not a Claude tool. Its README says it creates small launcher apps, called shortcuts, that start the original app without copying, changing or re-signing it. Each shortcut gets its own name and Dock icon and, where the target app allows it, its own data folder. Its compatibility table, updated 31 October 2026, lists Claude as Verified, with multi-instance and separate data both marked yes.

For Claude Code, Parall's FAQ suggests a Terminal shortcut with a "HOME path override" and a unique data path, then signing in to Claude Code inside it with the account you want. The same FAQ warns that a HOME override doesn't create a separate Keychain, so credentials stored outside the home folder may still be shared.

Its pages don't mention usage limits. The home page lists a US App Store price of $10.99 and macOS 10.11 or later. The README says all rights are reserved, that Parall is distributed through the Mac App Store, and that it has no automatic telemetry and no background services after you quit it.

### claude-fix

claude-fix is free and open source (MIT) and runs several Claude app accounts on one Mac. Its README says it creates launcher apps such as `Claude Work.app` and `Claude Personal.app` in `~/Applications`, each opening the Claude app with its own `--user-data-dir`. The real `Claude.app` is never modified, and the launchers can be pinned to the Dock with distinct icons. It installs with Homebrew or a script and needs only macOS and the Claude app.

The README covers the Claude app only, with no mention of Claude Code or usage limits. It's upfront about its limits: isolation depends on the Claude app continuing to honour `--user-data-dir`, chat history isn't merged between profiles, and the launchers are generated locally and unsigned, so macOS may ask you to right-click and choose Open the first time. The latest GitHub release is v1.2.2, from 1 August 2026.

### claude-multiprofile

claude-multiprofile is a free, open-source command-line tool (MIT, installed with npm, Node 18 or newer) that covers both the Claude app and Claude Code. For the app it generates a launcher per profile with its own data folder and Dock icon. For Claude Code it sets `CLAUDE_CONFIG_DIR` per profile and adds a shell alias such as `claude-work`. Desktop profiles need macOS; Code profiles also work on Linux.

A `doctor` command looks for drift, including a profile that's open on the wrong account. Profiles can have their own Dock colour. For Code profiles it writes deny rules so one profile can't read another's folders, and the README says Desktop profiles have no equivalent. Chats and Projects don't transfer between profiles, it notes, because they live on Anthropic's servers.

The README calls it an unofficial community tool that will need to catch up if a future Claude release changes how profiles work. It doesn't describe showing usage limits. The latest GitHub release is v0.1.38, from 23 October 2026.

### Multi-Claude

Multi-Claude (multiclaude.app) is a paid Mac app by Bryan Parker, described on its page as an independent utility. It's $20 once, with no subscription, a 30-day refund, and one licence for up to five of your Macs. It needs macOS 12 or later. Each profile is a real Mac app in `~/Applications/Multi-Claude/` with its own Dock icon and data directory, and you switch with Cmd-Tab. On first run it can import your existing Claude app history into a named profile. Everything is stored locally, and you don't need an account.

The page covers profiles for the Claude app and doesn't mention Claude Code or usage limits. Don't mix it up with `thomasog/multi-claude` on GitHub, a separate open-source project (MIT) whose README lists Windows as supported, macOS as beta and Linux as experimental.

### cl_audit

cl_audit is a free macOS app from n-uf, source-available under PolyForm Perimeter 1.0.1. A **profile** is one Claude setup: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon. The profile using `~/.claude` opens the usual Claude app; every other profile gets its own Claude window, with its own sign-in, chats and settings. It's the same idea as the tools above: the README says running Claude apps are matched to profiles by their exact `--user-data-dir`. That's how you [run several Claude accounts side by side](/use-cases/multiple-claude-accounts/) with it.

![cl_audit launcher with three Claude profiles and limits](/img/guides/launcher-profiles.webp "cl_audit's launcher: every profile with its limits; ⌘1–9 opens its Claude window. Sample data.")

What it adds is usage. cl_audit's background agent reads each profile's 5-hour and weekly limits from Anthropic with that profile's Claude Code sign-in. The Dock icon and the dashboard show them, with a countdown while a limit is full ("back at 15:28") and a notification when it's back. The [demo dashboard](/dashboard/) shows sample data, and the page on [limit alerts on a Mac](/use-cases/claude-usage-limit-alerts/) covers the alerts. Usage history comes from Claude Code's session files on the Mac. Nothing is uploaded.

It asks more of you than the others: a Mac with Apple silicon, macOS 13 or later, and Claude Code signed in for each profile, even if you mostly use the Claude app. The Claude app is only needed for Claude windows. It works with plans that have usage limits (Pro, Max, Ultra, Team); an API-key profile has no limits to show. A profile works on one account at a time, and no two profiles share an account. It isn't signed with an Apple Developer ID yet, so macOS asks you to approve it once. Usage shows mainly in the Dock (a menu bar icon per profile is optional), and it doesn't pool limits or move work between accounts.

### Other projects

claude-multiprofile's README has its own comparison table with five more projects: Claude Profiles, claude-profiles, claude-desktop-profiles, aimux and aisw. It describes Claude Profiles as a menu bar app with per-account usage limits read from Claude's local cache. We didn't check those five against their own pages, so they're not in the table below.

## At a glance

| Option | How it works | Claude Code too? | Usage limits shown? | Price / licence | macOS needs |
|---|---|---|---|---|---|
| Browser profile | A separate browser profile signed in to claude.ai | No, web only | Only in Claude's own Settings ▸ Usage, one account at a time | Free | A browser |
| Second app copy, by hand | `--user-data-dir` per copy; `CLAUDE_CONFIG_DIR` for Claude Code | Yes, if you set the variable | No | Free | macOS and a Terminal |
| Parall | Launcher shortcuts per instance, with their own data folder | Through a Terminal shortcut with a HOME override (per its FAQ) | Not described | $10.99 US App Store price; all rights reserved | macOS 10.11 or later |
| claude-fix | Launcher apps, each with its own `--user-data-dir` | Not covered in its README | Not described | Free; MIT | macOS and the Claude app |
| claude-multiprofile | Launcher apps for the Claude app; `CLAUDE_CONFIG_DIR` aliases for Claude Code | Yes | Not described | Free; MIT | macOS for the Claude app; Node 18 or newer |
| Multi-Claude | A Mac app that makes one real app per profile | Not described | Not described | $20 one-time | macOS 12 or later |
| cl_audit | A Claude window per profile, plus a Claude Code folder per profile | Yes, one folder and sign-in per profile | Yes: 5-hour and weekly limits, in the Dock and on a dashboard | Free; PolyForm Perimeter 1.0.1 (source-available) | Apple silicon, macOS 13 or later, Claude Code signed in per profile |

*Sources: each project's own README or home page, and Chrome's help page, read on 2 November 2026. "Not described" means the page doesn't say, not that the tool can't.*

## Where each Claude desktop profile switcher makes sense

**A browser profile** is enough if the second account only chats. It stops being enough once you want Claude Code, Cowork or other desktop features for that account.

**A hand-made second copy** suits you if you're at home in Terminal and want no extra software. Expect to repair it now and then.

**Parall** makes sense if you also keep separate accounts in other apps, such as a browser, an editor or a chat app. Its README lists both Apple silicon and Intel Macs.

**claude-fix** fits if all you need is a couple of Claude app launchers in the Dock.

**claude-multiprofile** fits if you use both the Claude app and Claude Code from Terminal, and want `doctor` and deny rules to keep profiles from drifting or reading each other's folders. Its Code profiles also run on Linux.

**Multi-Claude** suits you if you'd rather pay once for a Mac app, with a refund window, than run a Terminal tool.

**cl_audit** makes sense if you want to see how much of each account's 5-hour and weekly limit is used, or you use Claude Code with each account. If you only want a second Claude window and never look at limits, the lighter tools ask less of you. It doesn't run on Intel Macs or on macOS 12 or earlier.

If one account is a Team seat and the other a personal plan, [Claude Team and a personal account](/blog/claude-team-and-personal-account/) covers what Anthropic says is kept separate between them.

## If the Claude app gets account switching

This part is our guess, not anything Anthropic has said. Anthropic hasn't announced switching for accounts on different emails on the pages checked here, and #18435 was still open on 2 November 2026.

If it does ship, a built-in Claude desktop profile switcher would probably make these tools unnecessary for the simple case: two accounts, one active at a time. A tool might still be needed to keep several Claude windows open at once, if the built-in version only switches. Claude Code folders, which hold each account's terminal sign-in and settings, are separate from the app's account list. And a switcher doesn't show each account's 5-hour and weekly limits in the Dock, which is what a [Claude usage tracker](/) like cl_audit adds. What Anthropic would include, nobody outside it knows.

For now, start with the lightest option that covers what you do. If that's cl_audit, the [install page](/install/) has the download.
