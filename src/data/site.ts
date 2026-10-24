// Shared site constants.
export const repo = "https://github.com/n-uf/cl_audit";
export const site = "https://cl-audit.n-uf.com";

// The current cl_audit release. Update on each cl_audit release (version from the app's VERSION file,
// date from its CHANGELOG.md); the footer, the Install page and the structured data read these.
export const version = "26.10.1";
export const released = "2026-10-24";
export const changelog = `${repo}/blob/main/CHANGELOG.md`;
/** The latest release's ready-built app; GitHub redirects this to the newest release's zip. */
export const download = `${repo}/releases/latest/download/cl_audit.zip`;
export const requires = "Apple silicon · macOS 13 or later";

/** "2026-10-24" -> "24 Oct 2026". */
export function releasedText(date = released): string {
  const [y, m, d] = date.split("-").map(Number);
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${d} ${mon} ${y}`;
}
