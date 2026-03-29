#!/usr/bin/env bash
set -euo pipefail

export ELECTRON_DISABLE_SANDBOX=1
export LIBGL_ALWAYS_SOFTWARE=1
export PLAYWRIGHT_ELECTRON_EXTRA_ARGS="--disable-gpu --disable-dev-shm-usage --disable-software-rasterizer"

if command -v xvfb-run >/dev/null 2>&1; then
  xvfb-run -a bunx playwright test tests/ui/electron-update.spec.ts
  exit 0
fi

if [[ -n "${DISPLAY:-}" ]]; then
  bunx playwright test tests/ui/electron-update.spec.ts
  exit 0
fi

echo "Update smoke check requires xvfb-run or an available DISPLAY." >&2
exit 1
