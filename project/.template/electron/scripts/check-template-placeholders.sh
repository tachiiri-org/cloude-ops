#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

if grep -q '"name": "__APP_NAME__"' package.json; then
  echo "Skipping placeholder validation inside the template source tree."
  exit 0
fi

matches="$(
  rg -n \
    --glob '!artifacts/**' \
    --glob '!dist/**' \
    --glob '!node_modules/**' \
    --glob '!out/**' \
    --glob '!test-results/**' \
    --glob '!*.tsbuildinfo' \
    '__APP_NAME__|__APP_DESCRIPTION__|__APP_ID__|__REPO_OWNER__|__REPO_NAME__|__PREVIOUS_VERSION__' \
    README.md \
    package.json \
    bun.lock \
    electron.vite.config.ts \
    docs \
    scripts \
    src \
    tests \
    ui \
    .github || true
)"

if [[ -n "${matches}" ]]; then
  echo "Found unresolved template placeholders:" >&2
  echo "${matches}" >&2
  exit 1
fi

echo "Template placeholders are fully resolved."
