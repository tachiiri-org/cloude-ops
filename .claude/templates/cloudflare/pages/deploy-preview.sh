#!/usr/bin/env bash

set -euo pipefail

pr_number="${PR_NUMBER:-}"

if [[ -z "$pr_number" ]]; then
  echo "PR_NUMBER is required for Pages preview deploys" >&2
  exit 1
fi

export CLOUDFLARE_PAGES_BRANCH="pr-${pr_number}"
exec bash scripts/deploy-staging.sh
