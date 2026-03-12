#!/usr/bin/env bash

set -euo pipefail

if [[ -f wrangler.toml ]] && grep -Eq '^\[env\.staging\]$' wrangler.toml; then
  exec wrangler deploy --env staging
fi

if [[ -f wrangler.jsonc ]] && grep -Eq '"staging"\s*:' wrangler.jsonc; then
  exec wrangler deploy --env staging
fi

if [[ -f wrangler.toml ]] && grep -Eq '^\[env\.preview\]$' wrangler.toml; then
  exec wrangler deploy --env preview --name "$(basename "$PWD")-staging"
fi

if [[ -f wrangler.jsonc ]] && grep -Eq '"preview"\s*:' wrangler.jsonc; then
  exec wrangler deploy --env preview --name "$(basename "$PWD")-staging"
fi

repo_name="$(basename "$PWD")"
exec wrangler deploy --name "${repo_name}-staging"
