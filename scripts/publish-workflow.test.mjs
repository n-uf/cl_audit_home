// Structure checks on .github/workflows/publish.yml (text based; run: npm test). They guard what a reviewer relied
// on: the order of the build job's steps, the push and verify-key jobs taking the same key handling, the guards that
// keep verify-key runs and schedule runs apart, no node where the key is, and every action pinned to a full SHA.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const text = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", ".github", "workflows", "publish.yml"), "utf8");
const jobsAt = text.indexOf("\njobs:\n");
const jobBlocks = {};
{
  const re = /^  ([a-z][a-z-]*):\n/gm; // a job key, two spaces in
  const found = [];
  re.lastIndex = jobsAt;
  for (let m; (m = re.exec(text)); ) found.push({ name: m[1], at: m.index });
  found.forEach((f, i) => { jobBlocks[f.name] = text.slice(f.at, i + 1 < found.length ? found[i + 1].at : text.length); });
}
const stepAt = (job, name) => { const i = jobBlocks[job].indexOf(`- name: ${name}\n`); assert.notEqual(i, -1, `${job}: step "${name}"`); return i; };
/** the lines of the `with:` block of the first actions/checkout step of a job */
const checkoutWith = (job) => {
  const m = jobBlocks[job].match(/uses: actions\/checkout@[^\n]*\n {8}with:\n((?: {10}[^\n]*\n)+)/);
  assert.ok(m, `${job}: checkout with block`);
  return m[1];
};
/** the run line of the key preflight step of a job */
const keyCheck = (job) => {
  const m = jobBlocks[job].match(/- name: Check the deploy key secret\n {8}env:\n {10}KEY: [^\n]*\n {8}run: [^\n]*\n/);
  assert.ok(m, `${job}: key check step`);
  return m[0];
};

test("the jobs are build, push, verify-key and report", () => {
  assert.deepEqual(Object.keys(jobBlocks), ["build", "push", "verify-key", "report"]);
});

test("build uploads the patch and page list before npm ci, and sets `ready` only after the build", () => {
  const upload = stepAt("build", "Hand over the flip (patch and page list)");
  const build = stepAt("build", "Build the site");
  const ready = stepAt("build", "Ready to push");
  const flip = stepAt("build", "Flip due drafts");
  assert.ok(flip < upload && upload < build && build < ready, "flip, upload, build, ready");
  assert.ok(jobBlocks.build.indexOf("\n          npm ci\n") > upload, "npm ci runs after the upload");
  assert.equal(jobBlocks.build.split("upload-artifact@").length - 1, 1);
  assert.match(jobBlocks.push, /if: needs\.build\.outputs\.ready == 'true'/);
});

test("push and verify-key take the same key check, checkout settings and lock-down script", () => {
  assert.equal(keyCheck("verify-key"), keyCheck("push"));
  assert.equal(checkoutWith("verify-key"), checkoutWith("push"));
  assert.match(checkoutWith("push"), /ref: \$\{\{ github\.sha \}\}/);
  assert.match(checkoutWith("push"), /ssh-known-hosts: 'github\.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl'/);
  assert.match(checkoutWith("push"), /ssh-strict: true/);
  for (const job of ["push", "verify-key"]) {
    const lock = stepAt(job, "Switch git hooks off and lock down ssh");
    assert.match(jobBlocks[job].slice(lock), /run: bash scripts\/lock-down-git-ssh\.sh\n/);
    assert.ok(jobBlocks[job].indexOf("uses: actions/checkout@") < lock, `${job}: checkout, then lock-down`);
  }
  // push does its network work only after the lock-down, verify-key too
  assert.ok(stepAt("push", "Switch git hooks off and lock down ssh") < stepAt("push", "Push to main"));
  assert.ok(stepAt("verify-key", "Switch git hooks off and lock down ssh") < stepAt("verify-key", "List main over ssh"));
});

test("verify-key only lists main over ssh: it needs the ssh origin, and has no push, apply, commit or download", () => {
  const job = jobBlocks["verify-key"];
  assert.match(job, /environment: publish\n/);
  assert.match(job, /permissions:\n {6}contents: read\n/);
  assert.match(job, /git -c core\.hooksPath=\/dev\/null ls-remote origin refs\/heads\/main/);
  assert.match(job, /"git@github\.com:n-uf\/cl_audit_home\.git"/);
  for (const forbidden of [/git push/, /git apply/, /git commit/, /pull --rebase/, /download-artifact/, /upload-artifact/]) {
    assert.doesNotMatch(job.replace(/^ *#.*$/gm, ""), forbidden);
  }
});

test("verify-key runs only for a verify-key run; build, push and report never do, and a schedule run has no input", () => {
  assert.match(jobBlocks["verify-key"], /if: github\.repository == 'n-uf\/cl_audit_home' && inputs\.verify-key\n/);
  assert.match(jobBlocks.build, /if: github\.repository == 'n-uf\/cl_audit_home' && !inputs\.verify-key\n/);
  assert.match(jobBlocks.push, /!inputs\.verify-key/);
  assert.match(jobBlocks.report, /!inputs\.verify-key/);
  assert.match(text, /on:\n {2}schedule:\n {4}- cron: '10 0 \* \* \*'\n {2}workflow_dispatch:\n {4}inputs:\n {6}verify-key:\n(?: {8}[^\n]*\n)*? {8}type: boolean\n {8}default: false\n/);
});

test("no job that holds the key runs node, npm, pnpm or npx", () => {
  for (const job of ["push", "verify-key"]) {
    const code = jobBlocks[job].replace(/^ *#.*$/gm, "");
    assert.doesNotMatch(code, /setup-node|\bnpm\b|\bpnpm\b|\bnpx\b|\bnode\b/, job);
  }
});

test("every action is pinned to a full commit SHA", () => {
  const uses = [...text.matchAll(/^\s*(?:- )?uses: (\S+)/gm)].map((m) => m[1]);
  assert.ok(uses.length >= 5);
  for (const u of uses) assert.match(u, /^[\w.-]+\/[\w.-]+@[0-9a-f]{40}$/, u);
});
