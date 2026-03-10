# electron.md

Electron runtime profile for repositories and services that run desktop application workloads on Electron.

## Scope

- desktop runtime constraints specific to Electron
- process-boundary implications for renderer, preload, and main
- local credential, IPC, and OS integration considerations tied to Electron adoption

## Applies When

- A repository role runs as an Electron desktop application.
- A repository uses Electron main, renderer, preload, auto-update, or OS-integration capabilities.

## Baseline

- Keep role responsibilities in `../../principles/roles/electron.md`.
- Keep frontend-style renderer constraints aligned with `../../principles/roles/front.md`.
- Use this profile only for Electron-specific concrete constraints.

## Process-boundary Constraints

- Treat the renderer as untrusted UI code relative to preload and main.
- Keep OS access, filesystem access, credential access, and cloud-bound token handling in main or tightly controlled preload surfaces.
- Do not expose unrestricted IPC or shell execution to renderer-originated input.
- Keep preload APIs minimal, explicit, and versioned.

## Credential and Identity Constraints

- Treat desktop credentials as non-browser credentials by default.
- Store refresh-capable credentials only in OS-backed secure storage or an equivalent hardened mechanism.
- Do not persist raw credentials in renderer storage, local files, or logs.
- Keep token exchange, refresh, and revocation logic out of renderer-visible code paths.

## Cloud and Local Integration Constraints

- Route cloud API calls through the declared cloud boundary rather than ad hoc direct provider calls from renderer code.
- Keep local Python or native processing behind explicit IPC contracts.
- Keep offline or degraded-mode behavior explicit rather than relying on incidental cache state.

## Update and Packaging Constraints

- Keep update channels, signing, and artifact sources explicit.
- Do not let packaging or auto-update configuration bypass the repository's release and rollback rules.
- Keep production and prerelease behavior explicit by branch or environment.

## Observability Constraints

- Keep main-process and renderer-process telemetry distinguishable.
- Correlate desktop-side failures with cloud request or operation identity where applicable.
- Redact local file paths, credentials, and OS-specific sensitive details before persistence or export.

## Security Constraints

- Keep context isolation, sandboxing, and preload boundary posture explicit.
- Prefer deny-by-default exposure from main to renderer.
- Fail closed when required secure storage, signing material, or trusted update configuration is unavailable.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - IPC surface inventory
  - secure storage mechanism
  - update channel behavior
  - packaging and signing configuration
  - cloud-boundary integration configuration

## Non-goals

- identity-provider-specific token rules
- adapter-facing third-party provider constraints
- repository-local operation catalogs or UI route contracts
