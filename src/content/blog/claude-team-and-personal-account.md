---
title: "Claude Team and personal account: can you share one?"
description: "Claude Team and personal account on one Mac: what Anthropic keeps separate, whether you can share an account, and how to use both at once."
h1: "A Claude Team and personal account on one Mac"
mainKeyword: "claude team and personal account"
kind: how-to
published: 2026-11-02
updated: 2026-11-22
author: n-uf
takeaways:
  - "Anthropic's help pages treat a personal account and a Team account as separate accounts, with their own usage limits, billing, chats and projects (checked 20 November 2026)."
  - "Team usage limits are per member. They can't be shared or transferred, and each seat is for one named individual."
  - "A personal plan and a Team seat on the same email are two seats. cl_audit counts them as two accounts, and an account belongs to one profile, so each can get its own."
  - "The Claude app shows one account at a time. With cl_audit, the profile on ~/.claude opens the usual Claude app and every other profile has its own Claude window and Claude Code folder, side by side."
  - "cl_audit is free and independent, not affiliated with Anthropic. It doesn't pool limits; a profile can switch to another of your own accounts, and its Code sessions are meant to move with it, after a backup, but switching is experimental and can lose data."
faq:
  - q: "Can I have a work and personal Claude account?"
    a: "Yes. Anthropic's help pages say you can hold a personal account and a Team or Enterprise account on the same email address and switch between them from the account menu. Whether you may use a personal plan for work, or the other way round, is up to your employer's rules and Anthropic's terms."
  - q: "Do a Claude Team and a personal account share usage limits?"
    a: "No. Each account has its own limits. Anthropic says Team limits are per member and can't be transferred or shared between members, and a Pro plan has its own 5-hour and weekly limit. Work done under one account counts only against that account's limits, never against the other's."
  - q: "Can you share a Claude account with someone else?"
    a: "No. Anthropic's Consumer Terms say you may not share your account login or credentials with anyone else, or make your account available to anyone else. A Team seat is for one named individual, and its limits can't be shared between members. Two people who both want Claude each need their own plan, or seats on a Team plan."
  - q: "Can you share a Claude subscription with family?"
    a: "Not on a family plan. Anthropic's pricing page lists Free, Pro, Max, Ultra, Team and Enterprise, and no family or household plan. Each Pro, Max or Ultra plan is its own subscription. The nearest shared option is Team, priced per seat for groups of 2 to 150, and each seat is for one named individual."
  - q: "Does cl_audit show my whole team's usage?"
    a: "No. cl_audit shows the profiles on the Mac it runs on, each with its own account's limits; it has no team-wide view. Team Owners have Anthropic's Analytics instead, with members' activity and a spend report per person and per model. That report covers usage-credit spend, not usage inside each seat's allowance."
sources:
  - title: "cl_kit source at v26.11.3, Privacy/AddressText.swift (hidden addresses)"
    url: "https://github.com/n-uf/cl_kit/blob/v26.11.3/Privacy/AddressText.swift#L20-L58"
    checked: 2026-11-22
    supports: "cl_kit 26.11.3, the module cl_audit 26.11.87 vendors: a hidden address is never drawn from the real one but as one fixed stand-in, the same for every address, and in running text, a tooltip, an alert or a pop-up row it reads \"hidden address\"; a short name for a compact row is \"hidden address\" too, with no part of the address."
    quote: "public static let hidden = \"hidden address\""
  - title: "cl_audit CHANGELOG, 26.11.87"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.87/CHANGELOG.md"
    checked: 2026-11-22
    supports: "26.11.87: with Show emails off, an address in a sentence, a menu row, an alert or a tooltip reads \"hidden address\"; where Settings draws one (an account's title, the Account pop-up, the Switch page, first run) it draws one fixed blurred stand-in, the same for every account, and the address itself only while the pointer is on it; the Switch account menus draw the stand-in per row and show the address only while the row is highlighted; a fresh install starts hidden and stays so."
    quote: "the address itself only while the pointer is on it"
  - title: "cl_audit source at v26.11.36, Sources/IconApp.swift (the Dock icon's menu)"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.36/Sources/IconApp.swift#L498-L500"
    checked: 2026-11-15
    supports: "26.11.36: in the Dock icon's menu, with Show emails off, the sign-in line is left out and the folder warning reads “set up for a different account” instead of naming the address."
    quote: "This folder is set up for a different account"
  - title: "Move your personal Claude account to a Team or Enterprise organization (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization"
    checked: 2026-11-20
  - title: "Get started with the Team plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9267247-get-started-with-the-team-plan"
    checked: 2026-11-20
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-20
  - title: "Who owns and manages the data of my team? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team"
    checked: 2026-11-20
  - title: "Log in to your Claude account (Claude Help Center)"
    url: "https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account"
    checked: 2026-11-20
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-20
  - title: "What is the Pro plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8325606-what-is-the-pro-plan"
    checked: 2026-11-20
  - title: "What is the Max plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    checked: 2026-11-20
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-20
  - title: "Use Claude Code with your Team or Enterprise plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan"
    checked: 2026-11-20
  - title: "View usage analytics for Team and Enterprise plans (Claude Help Center)"
    url: "https://support.claude.com/en/articles/12883420-view-usage-analytics-for-team-and-enterprise-plans"
    checked: 2026-11-20
  - title: "Manage costs effectively, for Teams and Enterprise (Claude Code Docs)"
    url: "https://code.claude.com/docs/en/costs"
    checked: 2026-11-20
  - title: "Consumer Terms of Service (Anthropic)"
    url: "https://www.anthropic.com/legal/consumer-terms"
    checked: 2026-11-20
  - title: "Claude pricing (claude.com)"
    url: "https://claude.com/pricing"
    checked: 2026-11-20
  - title: "Settings files and precedence (Claude Code docs, CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-20
  - title: "[FEATURE] Add the ability to manage multiple Claude accounts within the Claude Desktop app (anthropics/claude-code#18435)"
    url: "https://github.com/anthropics/claude-code/issues/18435"
    checked: 2026-11-20
  - title: "cl_audit CHANGELOG, 26.11.18"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.18/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.18: before the sign-in a switch closes the profile's Claude window, makes a backup and moves its Code-tab sessions and scheduled tasks to the account switched to, each checked, with a receipt; a session a running Claude Code owns stays until a later switch."
    quote: "The switch moves the Claude window's sessions inside the one folder"
  - title: "cl_audit CHANGELOG, 26.11.22"
    url: "https://github.com/n-uf/cl_audit/blob/v26.11.22/CHANGELOG.md"
    checked: 2026-11-12
    supports: "26.11.22: account switching, import, export and Move to another Mac carry an Experimental warning (they can lose data, so use them for testing only); before account switching, import, restore, export or making the default profile runs, cl_audit asks you to confirm the risk of data loss."
    quote: "they can lose data, so use them for testing only"
related:
  - /use-cases/multiple-claude-accounts/
  - /blog/claude-code-multiple-accounts/
  - /blog/claude-profile-switchers-mac/
  - /
---

A Claude Team and personal account can share one Mac, and Anthropic treats them as separate accounts: each has its own usage limits, its own billing and its own chats. The catch is the Claude app, which shows one account at a time. To keep both open you need a second sign-in, a second Claude window and, for Claude Code, a second settings folder.

Below: what Anthropic's help pages say is separate, why a personal plan and a Team seat on one email count as two seats, and how to run [multiple Claude accounts](/use-cases/multiple-claude-accounts/) on one Mac with cl_audit, our free Mac app. cl_audit is an independent tool, not affiliated with Anthropic.

## Claude Team vs personal account: what's separate?

Anthropic's help pages, read again on 20 November 2026, keep these four things apart.

**Usage limits.** Anthropic's Team plan page says limits are per member, not applied to the team as a whole, so one member hitting their limit doesn't stop the others. Limits can't be transferred or shared between members, and each seat is for one named individual. A Pro plan has its own 5-hour limit and weekly limit. Anthropic's usage-limits page and its Pro plan page both say you can see your next reset time under Settings ▸ Usage.

The usage-limits page also says claude.ai, Claude Code and the Claude app all count toward the same limit, the one of the account you're signed in to. Work done under the Team seat uses the Team seat's limits. Personal work uses the personal plan's.

Seats differ in size, too. As of 20 November 2026, the Team page says Standard seats include 1.25 times the Pro plan's per-session allowance and Premium seats 6.25 times. Anthropic can change those numbers, so check the page before you plan around them.

**Billing.** Team plans are priced per member, and the Team page says admins manage access and billing in one place. A personal Pro or Max plan is its own subscription, paid by you. What happens to it when you join a Team depends on a choice you make (next section).

**Chats and projects.** Anthropic's page on moving a personal account into a Team says that if you keep both accounts, switching to the other one gives you its separate chats and projects. The Team sign-up page adds that data isn't shared between separate accounts. Moving personal content into a Team organization is one-way: once moved, it can't go back to a personal account.

**Who manages the data.** On a Team plan, Anthropic's help page says the organization's Primary Owner manages the account and its data. That includes requesting data exports, which may contain your conversations with Claude, uploaded files and usage patterns. The same page says Anthropic's Consumer Terms and Privacy Policy don't apply where Anthropic acts as the data processor; the account is governed by the agreement between Anthropic and your organization, which may also have its own policies. Keep private things out of the Team seat.

**Seeing the team's usage.** Per-member limits don't give an owner a team-wide view, and cl_audit doesn't either: it shows the profiles on one Mac. Anthropic's analytics help page says Team Owners and Primary Owners open Analytics from their initials in the lower left. Its spend report gives estimated spend per person and per model, updated daily, and can be exported as a CSV for a period such as month to date. Anthropic's Claude Code costs page adds that the report covers usage-credit spend and appears once usage credits are on; usage inside a seat's allowance isn't metered in dollars. [What MTD spend means in Claude](/blog/claude-usage-credits/#what-is-mtd-spend-in-claude) explains that term.

| | Personal plan (Pro, Max) | Team seat |
|---|---|---|
| Usage limits | Its own 5-hour and weekly limits | Per member; not shared or transferred |
| Billing | Your own subscription | Per-member seats; admins manage billing centrally |
| Chats and projects | In the personal account | In the Team account; not shared with the personal one |
| Who manages the data | You | The organization's Primary Owner, who can request data exports |
| Claude Code | Included with Pro | Included with every Team seat |

*Source: Anthropic's Claude Help Center pages listed under sources, checked 20 November 2026.*

## Same email, two seats

Anthropic's Team sign-up page says the person who creates a Team organization must use a business email address, and every member needs an address on one of the organization's allowed domains. So many people have a work address for the Team and a different one for personal use.

Others don't. If you signed up for Claude with your work address before your company bought Team, you already have a personal account on that address, and two Anthropic pages describe what happens next.

- **Joining by invite.** The page on moving a personal account says that on a Team plan you're asked to choose when you accept the invite: keep both accounts, or use the organization account only and either bring your data in or delete it. "Keep both" leaves your personal account active.
- **Upgrading your own account to Team.** The Team sign-up page says the upgrade happens in place by default: some content carries over, and your individual subscription is cancelled with a prorated refund. To keep two accounts, tick **Keep your personal account separate**. Your individual subscription then stays active and your chats and projects stay in the personal account. The page also says some accounts don't see that checkbox.

The two pages don't agree on the default. Joining by invite asks you; upgrading yourself keeps both only if you tick the box. Read the page for your route before you click.

Once you have both on one email, Anthropic's login page describes the switch: click your initials in the bottom left corner, pick the account, and look for the check mark on the active one. That page covers accounts tied to the same email. It doesn't describe switching between accounts on different addresses.

In cl_audit, a **profile** is one Claude setup: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon. A profile works on one claude.ai account at a time (it can keep others on standby), and an account belongs to one profile; cl_audit tells accounts apart by account and organisation. A personal plan and a Team seat on the same email are two accounts, so each can get its own profile. cl_audit refuses an account another profile already has. The [cl_audit FAQ](/faq/) has more on profiles versus accounts.

## Can two people share one Claude account?

No, not under Anthropic's terms. Its Consumer Terms, as read on 20 November 2026, say you may not share your account login information or credentials with anyone else, and may not make your account available to anyone else. A Team seat follows the same idea: Anthropic's Team page says each seat is for one named individual, and limits can't be transferred or shared between members.

There is no family plan to fall back on. Anthropic's pricing page lists Free, Pro, Max, Ultra, Team and Enterprise, and says nothing about a family or household plan. Two people who both want Claude each have their own plan, or seats on a Team plan, which the pricing page describes as for teams of 2 to 150. One person using one account on several devices is a different case, and Anthropic's login page describes it. cl_audit doesn't change any of this: it shows the accounts of the person using the Mac, and an account belongs to one profile.

## Two Claude accounts on one machine, open at once

Anthropic's account menu switches: one account is active and the other waits. So the menu alone won't run two Claude accounts on one machine at once, a Claude Team and personal account included. That's what [anthropics/claude-code#18435](https://github.com/anthropics/claude-code/issues/18435) is about. It asks for multiple accounts in the Claude app, and several commenters want both open at once, not only switchable.

![cl_audit launcher with three Claude profiles and limits](/img/guides/launcher-profiles.webp "A work and a personal profile side by side in cl_audit's launcher, each with its own limits. Sample data.")

Claude Code adds a second layer. Anthropic's page on Claude Code with a Team plan says the Claude app's built-in Claude Code uses the account you signed in with, and that in Terminal you run `/login` to pick a different login method. By default Claude Code keeps its settings, session history and plugins under `~/.claude`; Anthropic's documentation says the `CLAUDE_CONFIG_DIR` variable moves them somewhere else. One folder per account is how you keep two Claude Code sign-ins apart. The article on [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) does it by hand.

If you only need the second account in a browser, a second browser profile with claude.ai costs nothing and is the lightest option. The [comparison of Claude desktop profile switchers](/blog/claude-profile-switchers-mac/) lists other ways, including paid ones.

Two plans of the same kind raise a different question: can you hold two Claude Max accounts, and do their limits add up? Anthropic's Max page gives each Max plan five times Pro's usage every five hours and every week, and says nothing about holding more than one or about combining limits. cl_audit doesn't pool them either. {{live:/blog/claude-max-multiple-accounts/}}Our article on [Claude Max multiple accounts](/blog/claude-max-multiple-accounts/) goes through what Anthropic's pages say and how to watch both plans on one Mac.{{/live}}

**With cl_audit:**

1. Open cl_audit. On a Mac with no profile it opens **Set up cl_audit**, which makes your first profile on `~/.claude`. For the other account, go to Settings and choose **＋ (New profile)**. Name it (for example "work").
2. Start with the account, in the **Account** pop-up of the Claude Code card. It lists accounts already signed in to a Claude Code folder no profile uses yet. Picking one connects that folder as it is: its sign-in, settings and history stay. Accounts other profiles have are dimmed. For an account that isn't listed, choose **Sign in to another account…**. cl_audit makes a new folder such as `~/.claude-work` (it can share instructions, agents, skills, commands or memory from another folder) and opens Claude Code's own sign-in in Terminal with the address filled in. The address only fills in the sign-in form; the account the browser is signed in to at claude.ai decides, so switch it there first.
3. Choose what it includes with two switches, **Claude window** and **Usage in the Dock**. The profile on `~/.claude` opens the usual Claude app. Any other folder gets its own Claude window, with its own sign-in, chats and settings.
4. Quit the Claude app before you create or connect the folder. While it's open, it writes its own sign-in and settings. This step only applies to profiles with a Claude window.
5. Sign in, in two parts. First Claude Code, then the Claude window (its Code sidebar starts empty), both to the same claude.ai account. The sign-in screens are Anthropic's own, so cl_audit never sees the password.
6. Add the Dock icon, or choose Start reading usage if you only want the numbers.

A common layout: the personal profile on `~/.claude` with the usual Claude app, the work profile on `~/.claude-work` with its own Claude window, both open at once. The other way round works too. Give `~/.claude` to whichever you open most.

Each profile can have its own Dock icon showing that seat's 5-hour and weekly limits, which cl_audit's background agent reads from Anthropic with the profile's Claude Code sign-in. You see both seats' limits without switching accounts. The [demo dashboard](/dashboard/) shows three sample profiles. Limits stay separate: cl_audit doesn't pool them. If a profile has both accounts, you can switch it from one to the other, and the switch is meant to move its Code sessions and scheduled tasks to the new account, after a backup. Whether someone may use more than one Claude account is set by Anthropic's terms.

{{experimental: switch}}

You need a Mac with Apple silicon and macOS 13 or later, and Claude Code signed in for each profile. The Claude app is only needed for Claude windows. cl_audit works with plans that have usage limits (Pro, Max, Ultra, Team). It isn't signed with an Apple Developer ID yet, so macOS asks you to approve it once; the [install page](/install/) has the steps.

## Keeping a Claude Team and personal account apart

In the GitHub request above, separation comes up far more than capacity. Opened on 15 January, it was still open on 20 November 2026, with more than 1,000 thumbs-up reactions. On 2 November, when it had 229 comments, we ran a rough keyword count over all of them: 103 contained the word "work" (also a verb, so that number runs high), 88 "personal" and 73 both. Only 18 mentioned usage or limits. That's a rough count of words in comments, not a survey of who uses Claude.

Commenters give their reasons. One wants a hard wall between work and personal for billing, privacy and legal reasons. Another wants separate folder permissions for each account, so personal files and confidential work files never meet. The original post describes using the Claude app for the work account and claude.ai in a browser for the personal one.

Some habits that help, whatever tool you use:

- **Name and colour each profile differently.** In cl_audit a profile has a name, an icon label of up to six letters and its own colour, so you can tell the windows apart. For screen sharing, turn **Show emails** off in Settings ▸ General ▸ Privacy; a fresh install starts with it off. The launcher, the dashboard's account lines and the panels then leave addresses out, and the Dock's folder warning says only "a different account". In a sentence or a tooltip an address reads "hidden address". Settings and the Switch account menus draw the same blurred stand-in for every account and show the real address only while your pointer is on it.
- **Separate Claude Code folders.** Give each profile its own folder, so each keeps its own sign-in. cl_audit can share items such as `CLAUDE.md`, agents, skills, commands or memory from one folder with a new profile; sign-ins and usage stay separate. Share only what belongs on both sides (the [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) guide shows how the folders work). A personal notes file doesn't belong in a work folder.
- **Check for an API key.** Anthropic's help page for Claude Code says that if an `ANTHROPIC_API_KEY` environment variable is set, Claude Code uses the key instead of your subscription, and you get API charges rather than the plan's included usage. A profile that uses an API key has no usage limits for cl_audit to show.
- **Keep personal work out of the Team seat.** The Primary Owner can request data exports, and your organization may have its own policies. Ask your Primary Owner what applies to you.
- **Watch each seat's limits separately.** Each profile has its own [limit alerts](/use-cases/claude-usage-limit-alerts/): one at a level you set and, with **Notify when back** (on by default), one when a full limit resets. The home page of this [Mac app for Claude usage limits](/) has the rest.

None of this changes who owns what. The Team account belongs to the organization that pays for it; the personal account is yours. Two profiles on one Mac make that easier to keep straight, and the page on [several Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) has the full setup.
