# Readest Community build

This fork keeps the upstream GNU AGPL v3 license and turns the desktop/mobile
client into a local-first community build. Readest accounts, Readest Cloud,
payments, telemetry, and the official updater are disabled. Third-party sync
providers and TTS plan gates are available without a Readest subscription.

## License and distribution

AGPL-3.0 permits using, modifying, and distributing the source, including
removing feature gates. If a modified binary is distributed, recipients must
receive the corresponding source under AGPL-3.0. If the modified program is
offered over a network, users must also be offered its corresponding source.
Keep copyright/license notices intact.

The code license does not grant trademark rights. For public distribution,
replace upstream branding and artwork and make it clear that the build is not
an official Readest release. This document is a technical assessment, not legal
advice.

## Local setup

Requirements are Node.js 24, pnpm 11, stable Rust, and the platform-specific
Tauri prerequisites. From the repository root:

```bash
git submodule update --init --recursive
pnpm install --frozen-lockfile
pnpm --filter @readest/readest-app setup-vendors
```

Google Drive and OneDrive are optional. To enable them, create
`apps/readest-app/.env.local` from `.env.local.example` and use OAuth client IDs
owned by you. The upstream OAuth client IDs are intentionally not included.

## Linux

Install the Linux packages listed in the community GitHub Actions workflow,
then run:

```bash
cd apps/readest-app
pnpm tauri build --target x86_64-unknown-linux-gnu --bundles appimage,deb --no-sign --ci
```

The AppImage and Debian package are written below
`target/x86_64-unknown-linux-gnu/release/bundle/`.

Build AppImage releases on Ubuntu 22.04 (as the workflow does). Some rolling
Linux distributions ship system libraries with newer ELF features that the
`linuxdeploy` tool bundled by Tauri cannot strip; the application and DEB can
still compile there, but AppImage packaging may fail with a `.relr.dyn` error.

## iOS unsigned build and self-signing

Apple's toolchain only builds iOS apps on macOS. The project is pinned to Tauri
CLI 2.11.4, whose iOS builder can archive and package an IPA without an Apple
certificate by using `--no-sign`:

```bash
cd apps/readest-app
bash scripts/build-ios-unsigned.sh
```

The output is written below `src-tauri/gen/apple/build/arm64/`. It is not
installable as-is. Sign the IPA with your own Apple ID/certificate using AltStore,
SideStore, Sideloadly, TrollStore (only on supported devices), or another IPA
signer. A free Apple ID normally requires refreshing the installation every
seven days and has provisioning limits; a paid developer certificate normally
lasts one year. These are Apple platform restrictions, not Readest restrictions.

The community Bundle ID is `io.github.top1ashier.readest`. Official-team
entitlements were removed, so Apple Sign In, official Universal Links, CarPlay,
and the upstream App Group are not part of this build. The Share Extension and
widget are included but cannot share upstream App Group data.

## GitHub Actions

Run **Actions → Community builds → Run workflow**. Linux and unsigned iOS
artifacts are retained for 14 days. The workflow needs no repository secrets.
An unsigned IPA still must be signed locally before installation.
