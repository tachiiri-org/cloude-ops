#!/usr/bin/env bash
# bootstrap-worker.sh — runtime bootstrap for Cloudflare Worker repositories
# Usage: bootstrap-worker.sh [TARGET_REPO_PATH]

set -euo pipefail

TARGET="${1:-$PWD}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_OPS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
WORKFLOW_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/workers/deploy-staging.yml"
PREVIEW_WORKFLOW_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/workers/preview-pr.yml"
RELEASE_WORKFLOW_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/release-pr.yml"
DEPLOY_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/workers/deploy-staging.sh"
PREVIEW_DEPLOY_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/workers/deploy-preview.sh"
COMMENT_TEMPLATE="$CLAUDE_OPS_ROOT/.claude/templates/cloudflare/common/upsert-pr-comment.py"
VERSIONS_FILE="$CLAUDE_OPS_ROOT/.guide/recommended-versions.json"

cd "$TARGET"

echo "[bootstrap-worker] target: $TARGET"

if [[ ! -f package.json ]]; then
  echo "[bootstrap-worker] package.json not found, copying template"
  cp "$CLAUDE_OPS_ROOT/package.template.json" package.json
fi

echo "[bootstrap-worker] ensuring wrangler devDependency"
WRANGLER_VERSION="$(python3 - "$VERSIONS_FILE" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
if not path.exists():
    print("")
else:
    data = json.loads(path.read_text())
    print(data.get("cloudflare", {}).get("wrangler", ""))
PY
)"

if [[ -n "$WRANGLER_VERSION" ]]; then
  bun add -D "wrangler@${WRANGLER_VERSION}"
else
  bun add -D wrangler
fi

echo "[bootstrap-worker] ensuring deploy helper"
mkdir -p scripts scripts/github
cp "$DEPLOY_TEMPLATE" scripts/deploy-staging.sh
cp "$PREVIEW_DEPLOY_TEMPLATE" scripts/deploy-preview.sh
cp "$COMMENT_TEMPLATE" scripts/github/upsert-pr-comment.py
chmod +x scripts/deploy-staging.sh
chmod +x scripts/deploy-preview.sh
chmod +x scripts/github/upsert-pr-comment.py

echo "[bootstrap-worker] ensuring deploy scripts"
python3 - <<'PY'
import json
from pathlib import Path

path = Path("package.json")
data = json.loads(path.read_text())
scripts = data.setdefault("scripts", {})
scripts["deploy:staging"] = "bash scripts/deploy-staging.sh"
scripts["deploy:preview"] = "bash scripts/deploy-preview.sh"
path.write_text(json.dumps(data, indent=2) + "\n")
PY

echo "[bootstrap-worker] ensuring deploy workflows"
mkdir -p .github/workflows
cp "$WORKFLOW_TEMPLATE" .github/workflows/deploy-staging.yml
cp "$PREVIEW_WORKFLOW_TEMPLATE" .github/workflows/preview-pr.yml
cp "$RELEASE_WORKFLOW_TEMPLATE" .github/workflows/release-pr.yml

echo "[bootstrap-worker] done"
