// Show emails (Settings ▸ General), as cl_audit 26.11.34 does it (Privacy.swift). Off, an address is shown three ways:
//  - left out: the card's standalone address line, the launcher and panels (a plain `.email`, hidden everywhere);
//  - masked, y•••@example.com: inside a sentence, a menu, a toast or a hover text (the `.email-m` twin that emailHTML
//    writes beside the full `.email`);
//  - masked and blurred: in Settings and the pages it opens, where hovering shows the masked form, never the full address
//    (menus and dialogs there are masked only). app.css has the rules.

/** you@example.com → y•••@example.com: the first letter, then "•" clamp(len(local) - 1, 3, 7) times, then the domain. */
export const maskEmail = (email: string) => {
  const at = email.indexOf("@");
  if (at < 0) return email;
  return email.slice(0, 1) + "•".repeat(Math.max(3, Math.min(at - 1, 7))) + email.slice(at);
};

/** An address for innerHTML inside a sentence, a menu or Settings: the full one (hidden while Show emails is off) and its
 *  masked twin (shown instead). */
export const emailHTML = (email: string) => `<span class="email">${email}</span><span class="email-m">${maskEmail(email)}</span>`;

/** An address for a hover title or other plain text, as it reads right now: masked while Show emails is off. */
export const emailText = (email: string) =>
  typeof document !== "undefined" && document.documentElement.classList.contains("hide-emails") ? maskEmail(email) : email;

/** A text for innerHTML (escaped first) in which every address is written with emailHTML, so a sentence that names an
 *  account keeps the address, masked, while Show emails is off. */
export const emailsHTML = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, emailHTML);
