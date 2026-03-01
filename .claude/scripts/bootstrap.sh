#!/usr/bin/env bash
# bootstrap.sh — pre-launch automation for claude-ops
# Usage: bootstrap.sh [TARGET_REPO_PATH]
# Runs non-interactive setup steps before Claude is launched.

set -euo pipefail

TARGET="${1:-$PWD}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_OPS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$TARGET"

echo "[bootstrap] target: $TARGET"

# Step: fetch and pull latest from remote
BRANCH="$(git symbolic-ref --short HEAD 2>/dev/null || echo '')"
if [[ -n "$BRANCH" ]]; then
  echo "[bootstrap] syncing branch: $BRANCH"
  git fetch origin
  git pull origin "$BRANCH"
else
  echo "[bootstrap] not on a branch, skipping git pull"
fi

# Step: ensure package.json exists
if [[ ! -f package.json ]]; then
  echo "[bootstrap] package.json not found, copying template"
  cp "$CLAUDE_OPS_ROOT/package.template.json" package.json
  bun init -y
fi

# Step: install dependencies
echo "[bootstrap] running bun install"
bun install

# Step: ensure required devDependencies are present
DEV_DEPS=()
for pkg in prettier eslint typescript vitest @playwright/test; do
  if ! bun pm ls 2>/dev/null | grep -q "^$pkg@\|\"$pkg\"" && \
     ! grep -q "\"$pkg\"" package.json 2>/dev/null; then
    DEV_DEPS+=("$pkg")
  fi
done

if [[ ${#DEV_DEPS[@]} -gt 0 ]]; then
  echo "[bootstrap] adding missing devDependencies: ${DEV_DEPS[*]}"
  bun add -D "${DEV_DEPS[@]}"
fi

# Step: add claude-ops package
echo "[bootstrap] adding github:tachiiri-org/cloude-ops"
bun add github:tachiiri-org/cloude-ops

echo "[bootstrap] done"
