// Shared site constants.
export const repo = "https://github.com/n-uf/cl_audit";
export const site = "https://cl-audit.n-uf.com";

// The current cl_audit release. Update on each cl_audit release (version from the app's VERSION file,
// date from its CHANGELOG.md); the footer, the Install page and the structured data read these.
export const version = "26.11.70";
export const released = "2026-11-20";
export const build = "1252";   // the release's build number (About shows "26.11.70 · build 1252")
/** SHA-256 of this release's cl_audit.dmg and cl_audit.zip (GitHub's asset digests; the hub's release note gives the
 *  same). Every release ships both: the same app with the same code signature. */
export const sha256 = {
  dmg: "646ce1bc4a8f7aac3487b57f7d2d8efc64d7b9fe6dbe3c8fdb585244c24e3597",
  zip: "443516cf29eaa3acf15a6c207a9340d0430aad7ede49915cd5d084d06bd2c3ea",
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
export const checkedWith = { claudeCode: "2.1.326", claudeApp: "6.6395.1" };
export const driftNote = "cl_audit relies on how Claude Code saves its login and on Anthropic's usage figures, which aren't public interfaces. A newer Claude version can change them; if something stops working, update cl_audit.";

/** "2026-10-24" -> "24 Oct 2026". */
export function releasedText(date = released): string {
  const [y, m, d] = date.split("-").map(Number);
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${d} ${mon} ${y}`;
}
