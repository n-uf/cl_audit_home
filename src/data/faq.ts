// Questions and answers for the FAQ page (also its FAQPage structured data).

export const faq: [string, string][] = [
  ["Can I run several Claude desktop apps at the same time?",
   "Yes. cl_audit starts a separate instance of the Claude desktop app for each account, each with its own app data folder, so each keeps its own sign-in. The Code tab and the Claude Code CLI use that account's own configuration directory (CLAUDE_CONFIG_DIR)."],
  ["Where do the usage figures come from?",
   "The 5-hour session limit and the weekly limit are read directly from Anthropic for each account, using that account's Claude Code sign-in: the same figures Claude shows in Settings ▸ Usage, with their reset times. The usage history on the dashboard comes from the Claude Code session logs on your Mac."],
  ["Is cl_audit made by Anthropic?",
   "No. cl_audit is an independent, source-available tool from n-uf. It is not affiliated with, endorsed by or sponsored by Anthropic. Claude is a trademark of Anthropic."],
  ["Does it send my data anywhere?",
   "Only to Anthropic, to read each account's usage. There is no cl_audit server, no analytics and no account to create. Sign-ins are read read-only from the macOS Keychain with Apple's security tool, the same way Claude Code reads them, and are never written to disk or logged."],
  ["Which plans does it support?",
   "Claude plans with usage limits, such as Pro, Max and Team, signed in to Claude Code. Accounts that use an API key are billed per token instead and have no usage limits to show."],
  ["What does it need?",
   "A Mac with Apple silicon and macOS 13 or later, the Xcode Command Line Tools to build it, and Claude Code signed in for each account. The Claude desktop app is needed only for the side-by-side desktop apps."],
];
