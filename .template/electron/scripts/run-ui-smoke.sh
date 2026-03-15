#!/usr/bin/env bash
set -euo pipefail

if command -v xvfb-run >/dev/null 2>&1; then
  xvfb-run -a bunx playwright test tests/ui/electron-smoke.spec.ts
  exit 0
fi

if [[ -n "${DISPLAY:-}" ]]; then
  bunx playwright test tests/ui/electron-smoke.spec.ts
  exit 0
fi

echo "UI smoke check requires xvfb-run or an available DISPLAY." >&2
exit 1
