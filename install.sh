#!/usr/bin/env bash
# agent-ops/install.sh
# ランチャーから呼ばれ、各プロジェクトへファイルを同期する
set -e

COPS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="$(pwd)"

rsync -a \
  --exclude='.git/' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='bun.lockb' \
  --exclude='README*' \
  --exclude='install.sh' \
  "$COPS_DIR/" "$TARGET/"

# .git/info/exclude に追記してファイルを untracked として表示させない
if [ -d "$TARGET/.git" ]; then
  EXCL="$TARGET/.git/info/exclude"
  for p in "CLAUDE.md" ".claude/" ".gitattributes"; do
    grep -qxF "$p" "$EXCL" 2>/dev/null || echo "$p" >> "$EXCL"
  done
fi
