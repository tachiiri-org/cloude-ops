#!/usr/bin/env bash
set -euo pipefail

if command -v xvfb-run >/dev/null 2>&1; then
  ELECTRON_DISABLE_SANDBOX=1 xvfb-run -a bunx playwright test tests/ui/electron-update.spec.ts
  exit 0
fi

if [[ -n "${DISPLAY:-}" ]]; then
  ELECTRON_DISABLE_SANDBOX=1 bunx playwright test tests/ui/electron-update.spec.ts
  exit 0
fi

echo "Update smoke check requires xvfb-run or an available DISPLAY." >&2
exit 1
