#!/usr/bin/env bash

set -euo pipefail

pr_number="${PR_NUMBER:-}"

if [[ -z "$pr_number" ]]; then
  echo "PR_NUMBER is required for Worker preview deploys" >&2
  exit 1
fi

repo_name="$(basename "$PWD")"
preview_name="${repo_name}-pr-${pr_number}"

if [[ -f wrangler.toml ]] && grep -Eq '^\[env\.preview\]$' wrangler.toml; then
  exec wrangler deploy --env preview --name "$preview_name"
fi

if [[ -f wrangler.jsonc ]] && grep -Eq '"preview"\s*:' wrangler.jsonc; then
  exec wrangler deploy --env preview --name "$preview_name"
fi

exec wrangler deploy --name "$preview_name"
