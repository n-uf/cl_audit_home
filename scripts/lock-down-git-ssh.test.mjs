// Tests for scripts/lock-down-git-ssh.sh, which the `push` and `verify-key` jobs of publish.yml run after checkout.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync, execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "lock-down-git-ssh.sh");
// what actions/checkout (v4.2.2) leaves in core.sshCommand when it is given ssh-key and ssh-strict
const CHECKOUT_SSH = '"/usr/bin/ssh" -i "$RUNNER_TEMP/KEY" -o StrictHostKeyChecking=yes -o CheckHostIP=no -o "UserKnownHostsFile=$RUNNER_TEMP/KEY_known_hosts"';

function repo(sshCommand) {
  const dir = mkdtempSync(join(tmpdir(), "lock-down-"));
  execFileSync("git", ["init", "-q", "."], { cwd: dir });
  if (sshCommand) execFileSync("git", ["config", "core.sshCommand", sshCommand], { cwd: dir });
  return dir;
}
const config = (dir, key) => spawnSync("git", ["config", "--local", "--get", key], { cwd: dir, encoding: "utf8" }).stdout.trim();
const run = (dir) => spawnSync("bash", [script], { cwd: dir, encoding: "utf8" });

test("hooks go off and ssh is locked down, keeping checkout's key and known-hosts file", () => {
  const dir = repo(CHECKOUT_SSH);
  const r = run(dir);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(config(dir, "core.hooksPath"), "/dev/null");
  const cmd = config(dir, "core.sshCommand");
  assert.ok(cmd.startsWith(CHECKOUT_SSH + " "), cmd); // checkout's own options stay, first
  for (const opt of ["-F /dev/null", "-o IdentitiesOnly=yes", "-o IdentityAgent=none", "-o ProxyCommand=none", "-o GlobalKnownHostsFile=/dev/null", "-o HostKeyAlgorithms=ssh-ed25519", "-o BatchMode=yes"]) {
    assert.ok(cmd.includes(` ${opt}`), `${opt} in ${cmd}`);
  }
});

test("without a core.sshCommand from checkout it fails (nothing to lock down: the push would not use the key)", () => {
  const dir = repo();
  const r = run(dir);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /::error::checkout set no core.sshCommand/);
});

test("a hook in the checkout does not run, with the hooks path set by the script", () => {
  const dir = repo(CHECKOUT_SSH);
  execFileSync("sh", ["-c", `printf '#!/bin/sh\\ntouch "%s/hook-ran"\\n' "${dir}" > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`], { cwd: dir });
  assert.equal(run(dir).status, 0);
  execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "--allow-empty", "-m", "x"], { cwd: dir });
  assert.equal(spawnSync("test", ["-e", join(dir, "hook-ran")]).status, 1, "the pre-commit hook must not have run");
});
