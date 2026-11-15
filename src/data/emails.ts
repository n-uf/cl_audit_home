/** A text for innerHTML in which every email address is wrapped in the class Show emails (General) blurs, so a sentence
 *  that names an account hides the address, not the sentence. The text is escaped first. */
export const blurEmails = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, '<span class="email">$&</span>');
