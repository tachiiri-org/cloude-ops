# Electron Runtime Decisions

## Explicitly Not Yet Configured

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
- Linux packaging is configured with Electron Builder and AppImage as the baseline packaged artifact.
- GitHub Releases is the authoritative artifact and updater source of truth for both channels.
- The repository must remain public when the baseline updater posture depends on unauthenticated GitHub Releases reads.
- Electron auto-update uses `electron-updater` with explicit channel metadata rather than Git branch inspection at runtime.
- The baseline UI renders application name, version, runtime, channel, environment, build time, update status, latest published time, and bootstrap error state for smoke verification.
- The template carries reusable catalog assets plus an optional selector surface, and setup may keep both or reconcile only the resolved policy.
- Repository-local layout, design, and interaction choices begin from `ui/*.json` seed documents rather than selector-local saved state.
- A Playwright-based Electron smoke check launches the built app, verifies rendered content, and writes a screenshot artifact.
- A dedicated update smoke check verifies that the app can read a configured update source, surface update availability, and expose the published timestamp in the UI.
- A packaged release-update check verifies that an older packaged build detects the newer published artifact from the matching GitHub Release channel.
