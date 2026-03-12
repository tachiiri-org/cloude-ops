# electron.md

- Own `feature -> dev` delivery automation for repositories that run as Electron desktop applications.
- Treat validation workflows, required checks, and `dev` merge-gate policy as runtime concerns.
- Keep packaging, release-channel, and signing posture explicit; do not infer them from Electron adoption alone.
- Do not let Electron runtime setup redefine role boundaries for UI, preload, and main-process code.
- Let `setup-runtime-electron` own:
  - validation workflow definitions
  - the `validate-electron` required check
  - `dev` branch-protection and auto-merge readiness
