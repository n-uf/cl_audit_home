#!/usr/bin/env bash
# Run by the jobs of .github/workflows/publish.yml that hold the deploy key (`push` and `verify-key`), right after
# actions/checkout with `ssh-key:`, so both use the same hardening. In the checkout in the current directory:
#   - git hooks are off (core.hooksPath=/dev/null), whatever the working tree holds;
#   - checkout's core.sshCommand (the key it wrote, strict host key checking, the pinned known-hosts file) gets more
#     options: read no ssh config file (-F /dev/null), no agent, no proxy, no system known_hosts, use only that key,
#     never prompt, and accept only the pinned ed25519 host key.
# Fails if checkout set no core.sshCommand (no key, so nothing to harden: the push would go over HTTPS). Tested by
# scripts/lock-down-git-ssh.test.mjs.
set -euo pipefail

git config core.hooksPath /dev/null
cmd=$(git config --local --get core.sshCommand || true)
if [ -z "$cmd" ]; then
  echo "::error::checkout set no core.sshCommand"
  exit 1
fi
git config core.sshCommand "$cmd -F /dev/null -o IdentitiesOnly=yes -o IdentityAgent=none -o ProxyCommand=none -o GlobalKnownHostsFile=/dev/null -o HostKeyAlgorithms=ssh-ed25519 -o BatchMode=yes"
