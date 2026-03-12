# electron-tooling.md

Electron tooling profile for repositories that package and ship Electron desktop applications.

## Scope

- Electron build and packaging stack expectations
- prerelease and release-channel tooling posture
- auto-update tooling constraints reused across Electron repositories

## Applies When

- A repository uses `electron`, `electron-vite`, `electron-builder`, `electron-updater`, or equivalent Electron packaging tooling.

## Baseline

- Keep runtime boundary constraints in `../runtime/electron.md`.
- Keep renderer and main-process role boundaries in `../../principles/roles/electron.md`.
- Use this profile only for Electron packaging and update-tool expectations.

## Tooling Constraints

- Keep development build tooling separate from packaging and publishing tooling.
- Keep packaging targets, signing posture, and prerelease channel behavior explicit in repo-local configuration.
- Do not let updater configuration silently change branch-to-channel mapping or release governance.
- Keep generated artifacts and update metadata reproducible from declared scripts and configuration.

## Repo-local Requirements

- Each repository that adopts this profile must define:
  - the authoritative build toolchain entrypoints
  - packaging targets and signing configuration
  - branch or environment mapping for prerelease versus production channels
  - update feed and artifact publication configuration

## Non-goals

- renderer UI architecture
- main-process IPC surface design
- repository-local release commands
