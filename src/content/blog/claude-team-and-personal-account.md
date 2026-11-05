---
title: "Claude team and personal account on one Mac | cl_audit"
description: "A Claude Team and personal account on one Mac: what Anthropic keeps separate, why one email can mean two seats, and how to use both at once."
h1: "A Claude Team and personal account on one Mac"
mainKeyword: "claude team and personal account"
kind: how-to
published: 2026-11-02
updated: 2026-11-04
author: n-uf
takeaways:
  - "Anthropic's help pages treat a personal account and a Team account as separate accounts, with their own usage limits, billing, chats and projects (checked 2 November 2026)."
  - "Team usage limits are per member. They can't be shared or transferred, and each seat is for one named individual."
  - "A personal plan and a Team seat on the same email are two seats. cl_audit links one profile to one seat, so each gets its own."
  - "The Claude app shows one account at a time. With cl_audit, each profile has its own Claude window and its own Claude Code folder, side by side."
  - "cl_audit is free and independent, not affiliated with Anthropic. It doesn't pool limits or move work between accounts."
faq:
  - q: "Can I have a work and personal Claude account?"
    a: "Yes. Anthropic's help pages say you can hold a personal account and a Team or Enterprise account on the same email address and switch between them from the account menu. Whether you may use a personal plan for work, or the other way round, is up to your employer's rules and Anthropic's terms."
  - q: "Do a Claude Team and a personal account share usage limits?"
    a: "No. Each account has its own limits. Anthropic says Team limits are per member and can't be transferred or shared between members, and a Pro plan has its own 5-hour and weekly limit."
  - q: "Can I use both accounts in the Claude app at the same time?"
    a: "Not with the account menu alone: Anthropic's switcher makes one account active at a time. With cl_audit, each profile gets its own Claude window with its own sign-in, so both can be open side by side."
  - q: "Is my Team account's data separate from my personal account?"
    a: "Yes. Anthropic says data isn't shared between separate accounts. On the Team side, Anthropic's help page says the Primary Owner manages the account and its data and can request data exports, which may contain conversations, uploaded files and usage patterns."
  - q: "Do I need two email addresses?"
    a: "Not necessarily. A personal account and a Team account can share an email, and each stays its own account. Anthropic's Team sign-up page does say the person who creates the organization needs a business email, so many people end up with two addresses anyway."
sources:
  - title: "Move your personal Claude account to a Team or Enterprise organization (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9267400-move-your-personal-claude-account-to-a-team-or-enterprise-organization"
    checked: 2026-11-02
  - title: "Get started with the Team plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9267247-get-started-with-the-team-plan"
    checked: 2026-11-02
  - title: "What is the Team plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan"
    checked: 2026-11-02
  - title: "Who owns and manages the data of my team? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team"
    checked: 2026-11-02
  - title: "Log in to your Claude account (Claude Help Center)"
    url: "https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account"
    checked: 2026-11-02
  - title: "How do usage and length limits work? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work"
    checked: 2026-11-02
  - title: "What is the Pro plan? (Claude Help Center)"
    url: "https://support.claude.com/en/articles/8325606-what-is-the-pro-plan"
    checked: 2026-11-02
  - title: "Use Claude Code with your Pro, Max, or Ultra plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
    checked: 2026-11-02
  - title: "Use Claude Code with your Team or Enterprise plan (Claude Help Center)"
    url: "https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan"
    checked: 2026-11-02
  - title: "Settings files and precedence (Claude Code docs, CLAUDE_CONFIG_DIR)"
    url: "https://code.claude.com/docs/en/settings"
    checked: 2026-11-02
  - title: "[FEATURE] Add the ability to manage multiple Claude accounts within the Claude Desktop app (anthropics/claude-code#18435)"
    url: "https://github.com/anthropics/claude-code/issues/18435"
    checked: 2026-11-02
related:
  - /use-cases/multiple-claude-accounts/
  - /blog/claude-code-multiple-accounts/
  - /blog/claude-profile-switchers-mac/
  - /
---

A Claude Team and personal account can share one Mac, and Anthropic treats them as separate accounts: each has its own usage limits, its own billing and its own chats. The catch is the Claude app, which shows one account at a time. To keep both open you need a second sign-in, a second Claude window and, for Claude Code, a second settings folder.

Below: what Anthropic's help pages say is separate, why a personal plan and a Team seat on one email count as two seats, and how to run [multiple Claude accounts](/use-cases/multiple-claude-accounts/) on one Mac with cl_audit, our free Mac app. cl_audit is an independent tool, not affiliated with Anthropic.

## Claude Team vs personal account: what's separate?

Anthropic's help pages, read on 2 November 2026, keep these four things apart.

**Usage limits.** Anthropic's Team plan page says limits are per member, not applied to the team as a whole, so one member hitting their limit doesn't stop the others. Limits can't be transferred or shared between members, and each seat is for one named individual. A Pro plan has its own 5-hour limit and weekly limit. Anthropic's usage-limits page and its Pro plan page both say you can see your next reset time under Settings ▸ Usage.

The usage-limits page also says claude.ai, Claude Code and the Claude app all count toward the same limit, the one of the account you're signed in to. Work done under the Team seat uses the Team seat's limits. Personal work uses the personal plan's.

Seats differ in size, too. As of 2 November 2026, the Team page says Standard seats include 1.25 times the Pro plan's per-session allowance and Premium seats 6.25 times. Anthropic can change those numbers, so check the page before you plan around them.

**Billing.** Team plans are priced per member, and the Team page says admins manage access and billing in one place. A personal Pro or Max plan is its own subscription, paid by you. What happens to it when you join a Team depends on a choice you make (next section).

**Chats and projects.** Anthropic's page on moving a personal account into a Team says that if you keep both accounts, switching to the other one gives you "its separate conversations and projects". The Team sign-up page adds that data isn't shared between separate accounts. Moving personal content into a Team organization is one-way: once moved, it can't go back to a personal account.

**Who manages the data.** On a Team plan, Anthropic's help page says the organization's Primary Owner manages the account and its data. That includes requesting data exports, which may contain your conversations with Claude, uploaded files and usage patterns. The same page says Anthropic's Consumer Terms and Privacy Policy don't apply where Anthropic acts as the data processor; the account is governed by the agreement between Anthropic and your organization, which may also have its own policies. Keep private things out of the Team seat.

| | Personal plan (Pro, Max) | Team seat |
|---|---|---|
| Usage limits | Its own 5-hour and weekly limits | Per member; not shared or transferred |
| Billing | Your own subscription | Per-member seats; admins manage billing centrally |
| Chats and projects | In the personal account | In the Team account; not shared with the personal one |
| Who manages the data | You | The organization's Primary Owner, who can request data exports |
| Claude Code | Included with Pro | Included with every Team seat |

*Source: Anthropic's Claude Help Center pages listed under sources, checked 2 November 2026.*

## Same email, two seats

Anthropic's Team sign-up page says the person who creates a Team organization must use a business email address, and every member needs an address on one of the organization's allowed domains. So many people have a work address for the Team and a different one for personal use.

Others don't. If you signed up for Claude with your work address before your company bought Team, you already have a personal account on that address, and two Anthropic pages describe what happens next.

- **Joining by invite.** The page on moving a personal account says that on a Team plan you're asked to choose when you accept the invite: keep both accounts, or use the organization account only and either bring your data in or delete it. "Keep both" leaves your personal account active.
- **Upgrading your own account to Team.** The Team sign-up page says the upgrade happens in place by default: some content carries over, and your individual subscription is cancelled with a prorated refund. To keep two accounts, tick **Keep your personal account separate**. Your individual subscription then stays active and your chats and projects stay in the personal account. The page also says some accounts don't see that checkbox.

The two pages don't agree on the default. Joining by invite asks you; upgrading yourself keeps both only if you tick the box. Read the page for your route before you click.

Once you have both on one email, Anthropic's login page describes the switch: click your initials in the bottom left corner, pick the account, and look for the check mark on the active one. That page covers accounts tied to the same email. It doesn't describe switching between accounts on different addresses.

In cl_audit, a **profile** is one Claude setup: a Claude Code folder with its sign-in and, if you want them, a Claude window and a Dock icon. Each profile is linked to one **seat**, a claude.ai account plus its organisation. A personal plan and a Team seat on the same email are two seats, so each gets its own profile. cl_audit refuses a seat another profile already has. The [cl_audit FAQ](/faq/) has more on profiles versus accounts.

## Using both at once

Anthropic's account menu switches: one account is active and the other waits. So the menu alone won't let you run a Claude Team and personal account at the same time. That's what [anthropics/claude-code#18435](https://github.com/anthropics/claude-code/issues/18435) is about. It asks for multiple accounts in the Claude app, and several commenters want both open at once, not only switchable.

![cl_audit launcher with three Claude profiles and limits](/img/guides/launcher-profiles.webp "A work and a personal profile side by side in cl_audit's launcher, each with its own limits. Sample data.")

Claude Code adds a second layer. Anthropic's page on Claude Code with a Team plan says the Claude app's built-in Claude Code uses the account you signed in with, and that in Terminal you run `/login` to pick a different login method. By default Claude Code keeps its settings, session history and plugins under `~/.claude`; Anthropic's documentation says the `CLAUDE_CONFIG_DIR` variable moves them somewhere else. One folder per account is how you keep two Claude Code sign-ins apart. The article on [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) does it by hand.

If you only need the second account in a browser, a second browser profile with claude.ai costs nothing and is the lightest option. The [comparison of Claude desktop profile switchers](/blog/claude-profile-switchers-mac/) lists other ways, including paid ones.

**With cl_audit:**

1. Open cl_audit, go to Settings and choose **＋ (New profile)**. Name it (for example "work").
2. Start with the account, in the **Account** pop-up of the Claude Code card. It lists accounts already signed in to a Claude Code folder no profile uses yet. Picking one connects that folder as it is: its sign-in, settings and history stay. Accounts other profiles have are dimmed. For an account that isn't listed, choose **Sign in to another account…**. cl_audit makes a new folder such as `~/.claude-work` (it can share instructions, agents, skills, commands or memory from another folder) and opens Claude Code's own sign-in in Terminal with the address filled in. The address only fills in the sign-in form; the account the browser is signed in to at claude.ai decides, so switch it there first.
3. Choose what it includes with two switches, **Claude window** and **Usage in the Dock**. The profile on `~/.claude` opens the usual Claude app. Any other folder gets its own Claude window, with its own sign-in, chats and settings.
4. Quit the Claude app before you create or connect the folder. While it's open, it writes its own sign-in and settings. This step only applies to profiles with a Claude window.
5. Sign in, in two parts. First Claude Code, then the Claude window (its Code sidebar starts empty), both to the same claude.ai account. The sign-in screens are Anthropic's own, so cl_audit never sees the password.
6. Add the Dock icon, or choose Start reading usage if you only want the numbers.

A common layout: the personal profile on `~/.claude` with the usual Claude app, the work profile on `~/.claude-work` with its own Claude window, both open at once. The other way round works too. Give `~/.claude` to whichever you open most.

Each profile can have its own Dock icon showing that seat's 5-hour and weekly limits, which cl_audit's background agent reads from Anthropic with the profile's Claude Code sign-in. You see both seats' limits without switching accounts. The [demo dashboard](/dashboard/) shows three sample profiles. Limits stay separate: cl_audit doesn't pool them or move work from one account to the other, and whether someone may use more than one Claude account is set by Anthropic's terms.

You need a Mac with Apple silicon and macOS 13 or later, and Claude Code signed in for each profile. The Claude app is only needed for Claude windows. cl_audit works with plans that have usage limits (Pro, Max, Ultra, Team). It isn't signed with an Apple Developer ID yet, so macOS asks you to approve it once; the [install page](/install/) has the steps.

## Keeping a Claude Team and personal account apart

In the GitHub request above, separation comes up far more than capacity. On 2 November 2026 it had been open since 15 January, with nearly 1,000 thumbs-up reactions and 229 comments. We ran a rough keyword count over all 229 comments that day: 103 contain the word "work" (also a verb, so that number runs high), 88 contain "personal" and 73 contain both. Only 18 mention usage or limits. That's a rough count of words in comments, not a survey of who uses Claude.

Commenters give their reasons. One wants a hard wall between work and personal for billing, privacy and legal reasons. Another wants separate folder permissions for each account, so personal files and confidential work files never meet. The original post describes using the Claude app for the work account and claude.ai in a browser for the personal one.

Some habits that help, whatever tool you use:

- **One profile per seat, named and coloured differently.** In cl_audit a profile has a name, an icon label of up to six letters and its own colour, so you can tell the windows apart. Turning **Show emails** off (General settings) hides email addresses in cl_audit's own screens, which helps when you share your screen.
- **Separate Claude Code folders.** Give each profile its own folder, so each keeps its own sign-in. cl_audit can share items such as `CLAUDE.md`, agents, skills, commands or memory from one folder with a new profile; sign-ins and usage stay separate. Share only what belongs on both sides (the [Claude Code multiple accounts](/blog/claude-code-multiple-accounts/) guide shows how the folders work). A personal notes file doesn't belong in a work folder.
- **Check for an API key.** Anthropic's help page for Claude Code says that if an `ANTHROPIC_API_KEY` environment variable is set, Claude Code uses the key instead of your subscription, and you get API charges rather than the plan's included usage. A profile that uses an API key has no usage limits for cl_audit to show.
- **Keep personal work out of the Team seat.** The Primary Owner can request data exports, and your organization may have its own policies. Ask your Primary Owner what applies to you.
- **Watch each seat's limits separately.** Each profile has its own [limit alerts](/use-cases/claude-usage-limit-alerts/): one at a level you set and, with **Notify when back** (on by default), one when a full limit resets. The home page of this [Mac app for Claude usage limits](/) has the rest.

None of this changes who owns what. The Team account belongs to the organization that pays for it; the personal account is yours. Two profiles on one Mac make that easier to keep straight, and the page on [several Claude accounts on one Mac](/use-cases/multiple-claude-accounts/) has the full setup.
