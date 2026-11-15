// What a Sign in… key says in the demo, where nothing opens. Shared by Settings ▸ Accounts and the dashboard card.

/** Sign in…: Claude Code's own sign-in on the profile's folder, with the address filled in. */
export const signInNote = (dir: string, email: string) =>
  `Claude Code's own sign-in opens in Terminal for ${dir}, with ${email} filled in, and cl_audit watches the folder as it does for a switch. This is a demo, so nothing opens.`;

/** Sign in with another account…: the same, with no address filled in; the account that signs in becomes the one in use. */
export const signInOtherNote = (dir: string, who: string) =>
  `Claude Code's own sign-in opens in Terminal for ${dir}, with no address filled in. The account that signs in becomes the one ${who} works on; the one before goes on standby. This is a demo, so nothing opens.`;
