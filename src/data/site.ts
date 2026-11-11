// Shared site constants.
export const repo = "https://github.com/n-uf/cl_audit";
export const site = "https://cl-audit.n-uf.com";

// The current cl_audit release. Update on each cl_audit release (version from the app's VERSION file,
// date from its CHANGELOG.md); the footer, the Install page and the structured data read these.
export const version = "26.11.14";
export const released = "2026-11-10";
export const build = "610";   // the release's build number (About shows "26.11.14 · build 610")
/** SHA-256 of this release's cl_audit.dmg and cl_audit.zip (GitHub's asset digests; the hub's release note gives the
 *  same). Every release ships both: the same app with the same code signature. */
export const sha256 = {
  dmg: "1dfc989c5868738d45ab7633b5b57047717e4e2576bcab5339473d72c7357f70",
  zip: "8b89d3e2189d168c9cdc4505f4300df0f154eccb046ef6239dc11f172d2f3446",
};
export const changelog = `${repo}/blob/main/CHANGELOG.md`;
/** The release stage the site shows next to the version (Overview display and At a glance, Install). Set to ""
 *  when cl_audit leaves alpha and every label goes. GitHub releases stay normal releases: the Download link
 *  (releases/latest) skips pre-releases. */
export const stage = "alpha";
/** The latest release's ready-built app as a disk image (every Download key); GitHub redirects this to the newest
 *  release's file. The zip is the same app, linked as the alternative on the Install page. */
export const download = `${repo}/releases/latest/download/cl_audit.dmg`;
export const downloadZip = `${repo}/releases/latest/download/cl_audit.zip`;
export const requires = "Apple silicon · macOS 13 or later";
/** The Claude versions this release was checked with (the app's release notes list them too). cl_audit relies on
 *  how Claude Code saves its login and on Anthropic's usage figures, neither a public interface, so newer Claude
 *  versions can change them. Update with each release. */
export const checkedWith = { claudeCode: "2.1.318", claudeApp: "5.1231.0" };
export const driftNote = "cl_audit relies on how Claude Code saves its login and on Anthropic's usage figures, which aren't public interfaces. A newer Claude version can change them; if something stops working, update cl_audit.";

/** "2026-10-24" -> "24 Oct 2026". */
export function releasedText(date = released): string {
  const [y, m, d] = date.split("-").map(Number);
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${d} ${mon} ${y}`;
}
