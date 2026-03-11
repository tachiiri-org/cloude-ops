#!/usr/bin/env bash
# bootstrap-pages.sh — runtime bootstrap for Cloudflare Pages repositories
# Usage: bootstrap-pages.sh [TARGET_REPO_PATH]

set -euo pipefail

TARGET="${1:-$PWD}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_OPS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
WORKFLOW_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/pages/deploy-staging.yml"
DEPLOY_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/pages/deploy-staging.sh"

cd "$TARGET"

echo "[bootstrap-pages] target: $TARGET"

if [[ ! -f package.json ]]; then
  echo "[bootstrap-pages] package.json not found, copying template"
  cp "$CLAUDE_OPS_ROOT/package.template.json" package.json
fi

echo "[bootstrap-pages] ensuring wrangler devDependency"
bun add -D wrangler

echo "[bootstrap-pages] ensuring deploy helper"
mkdir -p scripts
cp "$DEPLOY_TEMPLATE" scripts/deploy-staging.sh
chmod +x scripts/deploy-staging.sh

echo "[bootstrap-pages] ensuring deploy:staging script"
python3 - <<'PY'
import json
from pathlib import Path

path = Path("package.json")
data = json.loads(path.read_text())
scripts = data.setdefault("scripts", {})
scripts["deploy:staging"] = "bash scripts/deploy-staging.sh"
path.write_text(json.dumps(data, indent=2) + "\n")
PY

echo "[bootstrap-pages] ensuring deploy workflow"
mkdir -p .github/workflows
cp "$WORKFLOW_TEMPLATE" .github/workflows/deploy-staging.yml

echo "[bootstrap-pages] done"
