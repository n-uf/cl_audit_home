// Show emails (Settings ▸ General), as cl_audit 26.11.87 does it (cl_kit's AddressText). A hidden address shows nothing of
// itself: never the real address under a blur, never a first letter, a length or a domain. Off, an address is shown:
//  - "hidden address": inside a sentence, a menu, a toast or a hover text (the `.email-m` twin emailHTML writes);
//  - one fixed blurred stand-in, the same for every account: where a view draws an address as a value (Settings' account
//    box titles, the Switch page; since cl_audit e95e181 and 2f1fa08 the dashboard card's account line and the Dock
//    icon's details panel too, `.addr`), the `.email-s` twin, and the address itself only while the pointer is on it;
//  - in the Switch account menus, a row draws the stand-in and its address only while the row is highlighted
//    (addressRowHTML); a short name ("Switch to …") is "hidden address" (shortText, shortHTML).
// app.css has the rules.

/** The words for a hidden address, in sentences, menus and tooltips (AddressText.hidden). */
export const HIDDEN = "hidden address";   // words: SEO (the app's)
/** What every hidden address is drawn as where Settings draws one: the same for every address (AddressText.standIn). */
export const STAND_IN = "abcdefghijkl@mnopqrst.com";

const hidingNow = () => typeof document !== "undefined" && document.documentElement.classList.contains("hide-emails");
/** "team-2": an address's part before the @ (AccountNames.short). */
const shortOf = (email: string) => { const at = email.indexOf("@"); return at > 0 ? email.slice(0, at) : email; };

/** An address for innerHTML: the address (shown while Show emails is on), "hidden address" in its place in sentences and
 *  menus while it is off, and the blurred stand-in where Settings draws it as a title. */
export const emailHTML = (email: string) =>
  `<span class="email">${email}</span><span class="email-m">${HIDDEN}</span><span class="email-s" aria-hidden="true">${STAND_IN}</span>`;

/** An address for a hover title, an aria-label or other plain text, as it reads right now: "hidden address" while hidden. */
export const emailText = (email: string) => (hidingNow() ? HIDDEN : email);

/** A short name ("team-2") for plain text as it reads right now: "hidden address" while hidden (AddressText.short). */
export const shortText = (email: string) => (hidingNow() ? HIDDEN : shortOf(email));

/** A short name for innerHTML, following the setting live: the part before the @, or "hidden address". */
export const shortHTML = (email: string) => `<span class="email">${shortOf(email)}</span><span class="email-m">${HIDDEN}</span>`;

/** A Switch account menu row's name (SwitchMenu.accountItem): its short name while shown; while hidden the blurred
 *  stand-in, and its address only while the row (the element with class "arow") is highlighted. */
export const addressRowHTML = (email: string) =>
  `<span class="as-short">${shortOf(email)}</span><span class="as-stand" aria-hidden="true">${STAND_IN}</span><span class="as-real">${email}</span>`;

/** A text for innerHTML (escaped first) in which every address is written with emailHTML, so a sentence that names an
 *  account reads "hidden address" in its place while Show emails is off. */
export const emailsHTML = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, emailHTML);
