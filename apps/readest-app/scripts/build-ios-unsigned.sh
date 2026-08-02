#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "Unsigned iOS builds require macOS and Xcode." >&2
  exit 1
fi

app_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$app_root"
pnpm tauri ios build --no-sign --ci

echo "Unsigned IPA output: $app_root/src-tauri/gen/apple/build/arm64/"
