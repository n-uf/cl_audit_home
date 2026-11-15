// Show emails (Settings ▸ General), as cl_audit 26.11.33 does it. Off, the app does two different things: the card's
// standalone address line is left out (HiddenEmail), and an address inside a sentence, a menu or a hover text is shown
// masked, since Settings is the only place that can blur. Here a plain `.email` is left out off Settings and blurred in
// it (app.css); an address inside text also carries a `.email-m` twin with the masked form, shown instead.

/** you@example.com → y•••@example.com: the first letter, then "•" clamp(len(local) - 1, 3, 7) times, then the domain. */
export const maskEmail = (email: string) => {
  const at = email.indexOf("@");
  if (at < 0) return email;
  return email.slice(0, 1) + "•".repeat(Math.max(3, Math.min(at - 1, 7))) + email.slice(at);
};

/** An address for innerHTML inside a sentence or a menu: in full (blurred in Settings) and masked (everywhere else, off). */
export const emailHTML = (email: string) => `<span class="email">${email}</span><span class="email-m">${maskEmail(email)}</span>`;

/** An address for a hover title or other plain text, as it reads right now: masked while Show emails is off. */
export const emailText = (email: string) =>
  typeof document !== "undefined" && document.documentElement.classList.contains("hide-emails") ? maskEmail(email) : email;

/** A text for innerHTML (escaped first) in which every address is written with emailHTML, so a sentence that names an
 *  account keeps the address, masked, while Show emails is off. */
export const blurEmails = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, emailHTML);
