# Electron Runtime Decisions

## Explicitly Not Yet Configured

- Packaging is not configured. Add packaging tooling and targets explicitly before shipping binaries.
- Signing is not configured. Production builds must fail closed until trusted signing material is defined.
- Secure storage is not configured. Credential-bearing flows must fail closed until an OS-backed storage surface is chosen.
- Rollback policy is not configured. Published channel artifacts must not imply rollback safety until the repository defines it explicitly.

## Established Baseline

- Renderer code is untrusted relative to `preload` and `main`.
- The preload surface is minimal and explicit.
- Main owns window lifecycle and any future OS, filesystem, or credential-bearing integration.
- The application identifies its release posture by configured channel metadata rather than by reading Git branch state at runtime.
- The baseline repository supports two explicit channels:
  - `dev` for prerelease artifacts published after merge to `dev`
  - `stable` for release artifacts published after merge to `main`
- Merge-triggered publication is owned by branch CI.
- GitHub Releases retain packaged channel artifacts for traceability, while GitHub Pages exposes public `updates/dev` and `updates/stable` feeds for `latest-linux.yml` and installer downloads.
- Electron auto-update uses `electron-updater` with explicit channel feed URLs rather than Git branch inspection at runtime.
- The baseline UI renders application name, version, runtime, channel, environment, build time, update status, latest published time, and bootstrap error state for smoke verification.
- A Playwright-based Electron smoke check launches the built app, verifies rendered content, and writes a screenshot artifact.
- A dedicated update smoke check verifies that the app can read a channel feed, surface update availability, and expose the published timestamp in the UI.
