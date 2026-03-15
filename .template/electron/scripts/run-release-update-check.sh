#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARTIFACT_DIR="${ROOT_DIR}/artifacts/release-update"
EXPECTED_LATEST_VERSION="${EXPECTED_LATEST_VERSION:-0.1.1}"
DISPLAY_VALUE="${DISPLAY:-:0}"

mkdir -p "${ARTIFACT_DIR}/dev" "${ARTIFACT_DIR}/stable"

gh release download update-dev -p "__APP_NAME__-__PREVIOUS_VERSION__-dev.AppImage" -D "${ARTIFACT_DIR}/dev" --clobber
gh release download update-stable -p "__APP_NAME__-__PREVIOUS_VERSION__-stable.AppImage" -D "${ARTIFACT_DIR}/stable" --clobber

chmod +x "${ARTIFACT_DIR}/dev/__APP_NAME__-__PREVIOUS_VERSION__-dev.AppImage"
chmod +x "${ARTIFACT_DIR}/stable/__APP_NAME__-__PREVIOUS_VERSION__-stable.AppImage"

rm -rf "${ARTIFACT_DIR}/dev/squashfs-root" "${ARTIFACT_DIR}/stable/squashfs-root"

(
  cd "${ARTIFACT_DIR}/dev"
  ./__APP_NAME__-__PREVIOUS_VERSION__-dev.AppImage --appimage-extract >/dev/null
)

(
  cd "${ARTIFACT_DIR}/stable"
  ./__APP_NAME__-__PREVIOUS_VERSION__-stable.AppImage --appimage-extract >/dev/null
)

env \
  DISPLAY="${DISPLAY_VALUE}" \
  PACKAGED_APP_PATH="${ARTIFACT_DIR}/dev/__APP_NAME__-__PREVIOUS_VERSION__-dev.AppImage" \
  PACKAGED_EXECUTABLE_PATH="${ARTIFACT_DIR}/dev/squashfs-root/__APP_NAME__" \
  EXPECTED_CHANNEL=dev \
  EXPECTED_ENVIRONMENT=development \
  EXPECTED_LATEST_VERSION="${EXPECTED_LATEST_VERSION}" \
  bunx playwright test tests/ui/electron-release-update.spec.ts

env \
  DISPLAY="${DISPLAY_VALUE}" \
  PACKAGED_APP_PATH="${ARTIFACT_DIR}/stable/__APP_NAME__-__PREVIOUS_VERSION__-stable.AppImage" \
  PACKAGED_EXECUTABLE_PATH="${ARTIFACT_DIR}/stable/squashfs-root/__APP_NAME__" \
  EXPECTED_CHANNEL=stable \
  EXPECTED_ENVIRONMENT=production \
  EXPECTED_LATEST_VERSION="${EXPECTED_LATEST_VERSION}" \
  bunx playwright test tests/ui/electron-release-update.spec.ts
