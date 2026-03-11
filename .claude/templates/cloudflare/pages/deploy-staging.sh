#!/usr/bin/env bash

set -euo pipefail

output_dir="${PAGES_BUILD_OUTPUT_DIR:-}"

if [[ -z "$output_dir" && -f wrangler.toml ]]; then
  output_dir="$(python3 - <<'PY'
from pathlib import Path
import re

match = re.search(r'^pages_build_output_dir\s*=\s*"([^"]+)"', Path("wrangler.toml").read_text(), re.MULTILINE)
print(match.group(1) if match else "")
PY
)"
fi

if [[ -z "$output_dir" && -f wrangler.jsonc ]]; then
  output_dir="$(python3 - <<'PY'
from pathlib import Path
import re

match = re.search(r'"pages_build_output_dir"\s*:\s*"([^"]+)"', Path("wrangler.jsonc").read_text())
print(match.group(1) if match else "")
PY
)"
fi

if [[ -z "$output_dir" && -d dist ]]; then
  output_dir="dist"
fi

if [[ -z "$output_dir" && -d build ]]; then
  output_dir="build"
fi

if [[ -z "$output_dir" && -d public ]]; then
  output_dir="public"
fi

if [[ -z "$output_dir" ]]; then
  echo "pages build output directory is not configured" >&2
  exit 1
fi

exec wrangler pages deploy "$output_dir" --branch staging
