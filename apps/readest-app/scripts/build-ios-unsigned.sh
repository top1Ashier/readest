#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "Unsigned iOS builds require macOS and Xcode." >&2
  exit 1
fi

app_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$app_root"

# The generated Apple directory is intentionally mostly ignored upstream, but
# its checked-in Xcode project references the asset catalog. Rehydrate the
# binary icon assets from the canonical Tauri icon directory on fresh CI
# checkouts before invoking Xcode.
app_icon_dir="$app_root/src-tauri/gen/apple/Assets.xcassets/AppIcon.appiconset"
mkdir -p "$app_icon_dir"
cp "$app_root"/src-tauri/icons/ios/*.png "$app_icon_dir/"

pnpm tauri ios build --no-sign --ci

echo "Unsigned IPA output: $app_root/src-tauri/gen/apple/build/arm64/"
