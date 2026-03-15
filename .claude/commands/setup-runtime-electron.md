# setup-runtime-electron command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

Template baseline reads in this workflow refer to files under `/home/tachiiri/.template/electron/`.

## Goals

- Reconcile the repository to the Electron runtime baseline defined by shared guidance and the template under `/home/tachiiri/.template/electron/`.
- Use the matching TypeScript and packaging tool profiles under `/home/tachiiri/.guide/tools/` as the authority for required tooling.
- Reach a state where the required runtime files, validation workflow, and Electron tool surface are present by reconciling against the shared template rather than relying on bootstrap scripts.
- Reach a state where the repository can launch the built Electron app, verify the rendered baseline automatically, and retain a screenshot artifact for debugging.
- Reach a state where launch, smoke, and visual verification are owned by setup rather than deferred to later implementation work.
- Reach a state where update-channel posture is explicit from setup time rather than deferred to later release work.
- Standardize two update channels for Electron repositories:
  - `dev` for prerelease builds published after merge to `dev`
  - `stable` for release builds published after merge to `main`
- Reach a state where the application identifies itself by configured update channel rather than by reading Git branch state at runtime.
- Reach a state where merge to `dev` and merge to `main` are the only publication entrypoints for runtime artifacts and updater metadata.
- Reach a state where the baseline renderer surface exposes stable smoke-test selectors and current runtime channel identity.
- Reach a state where Electron repositories verify not only launch readiness but also update readiness for the configured channel surfaces.
- Reach a state where the repository validates the presence and integrity of channel-specific updater metadata, public updater feeds, and artifact publication outputs as part of setup-owned verification.
- Reach a state where packaged artifacts remain traceable in the repository's release system while updater metadata is served from a feed surface that distributed clients can actually read.
- Reach a state where the baseline UI exposes enough readonly runtime metadata for setup-owned diagnostics:
  - application name
  - version
  - runtime
  - channel
  - environment
  - build time
  - updater status
  - updater timestamp
- Reach a state where setup is not considered complete until update verification has succeeded for both:
  - the `dev` developer channel
  - the `stable` production channel
- Reach a state where setup-owned update verification proves an actual version advance, not just feed readability:
  - for example `0.1.0 -> 0.1.1`
  - or another explicit N -> N+1 upgrade step chosen by the repository
- Reach a state where setup-owned update verification starts from an older packaged build and proves that both the developer and production channels detect the newer published build through their real feed surfaces.
- Keep the validation workflow, required check name, and `dev` merge gate explicit.
- Keep the template under `/home/tachiiri/.template/electron/` as the authoritative baseline for repository-file shape unless the repository documents a justified divergence.
- Keep packaging, release-channel, signing, update-feed posture, and branch-triggered publication explicit rather than implied by Electron adoption.
- Keep artifact publication tied to merge completion:
  - merge to `dev` publishes the `dev` channel surface
  - merge to `main` publishes the `stable` channel surface
- Keep runtime channel identity in `main` and expose it to `renderer` only through a narrow preload API.
- Keep the baseline UI contract explicit enough for setup-owned smoke verification:
  - application identity
  - runtime identity
  - current update channel
  - bootstrap failure state

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`
  - `setup-tool-playwright`

## Applies To

- repositories adopting the Electron runtime

## Constraints

- Do not embed application-specific behavior into this runtime command
- Do not use npm
- Do not rely on bootstrap scripts; reconcile from the relevant files under `tools/`, `/home/tachiiri/.guide/`, and `/home/tachiiri/.template/electron/` directly
- Do not treat build success alone as sufficient runtime verification when the repository has a renderer surface.
- Do not leave launch, smoke, or visual verification as implicit manual follow-up work for implementation commands.
- Do not read Git branch names at runtime to decide update behavior.
- Do not make `dev` and `stable` feeds interchangeable.
- Do not leave baseline UI verification implicit when the repository has a renderer surface.
- Do not let `renderer` choose its own update channel or feed source.
- Do not enable auto-update without explicit artifact source, signing posture, and updater metadata.
- Do not assume private GitHub Release asset URLs are readable updater feeds for distributed clients.
- Do not leave packaging, signing, update-feed posture, or publication entrypoints implicit.
- Do not publish runtime artifacts from pull-request validation jobs.
- Do not treat merge to `dev` or `main` as sufficient publication proof until the merge-triggered publish workflow is configured explicitly.
- Do not allow channel-crossing updates unless the repository explicitly defines and documents that exception.

## Hints

- read `runtimes/electron.md` before runtime decisions
- verify that the repository actually adopts Electron before reconciling this profile
- inspect the current runtime state as `present`, `missing`, or `drifted` and reconcile only the minimum needed surface
- prefer copying or reconciling from `/home/tachiiri/.template/electron/` over rebuilding the same baseline file-by-file from scratch
- treat placeholder replacement inside the template itself as part of setup-owned reconciliation:
  - app identity
  - repository identity
  - current version
  - previous version used for N -> N+1 verification
- apply the required tool modules and collect their status rather than re-deriving tool setup ad hoc
- prefer the minimal `main` / `preload` / `renderer` / `shared` scaffold when the repository has no prior Electron surface
- keep `renderer` untrusted and expose only a narrow preload API even in the initial baseline
- ensure `.github/workflows/validate-pr.yml` uses `pull_request` to `dev` and the job name `validate-electron` so GitHub protection can target a stable check name
- prefer a built-app smoke test that launches Electron, checks rendered text, and writes a screenshot artifact over a build-only check
- prefer setup-owned smoke and visual verification even for a hello-world baseline so later implementation work inherits a reliable launch check
- prefer a baseline UI that renders stable smoke targets for:
  - application name
  - application version
  - runtime
  - update channel
  - bootstrap error state
- use `--noEmit` TypeScript entrypoints for validation; avoid `tsc -b` as the typecheck script when it would generate tracked JavaScript artifacts
- verify `electron-vite`, `vitest`, and `vite` major-version compatibility before finalizing package versions
- verify production preload and renderer asset paths against actual build output so launch-time white-screen failures are caught
- if launch verification depends on sandbox or display constraints, encode the repository script and workflow so setup establishes a repeatable execution path
- prefer GitHub Releases as the initial artifact source of truth for traceability unless the repository explicitly adopts another artifact backend
- if the repository is private or otherwise serves packaged clients that cannot read release assets directly, establish a separate public updater-feed surface during setup rather than discovering that limitation later
- if GitHub Pages is used as the updater-feed surface, account for both repository git object limits and shared-branch publication races in the baseline workflow design
- map branch merge outcomes to channel publication explicitly:
  - `push` on `dev` publishes prerelease artifacts and updater metadata for channel `dev`
  - `push` on `main` publishes release artifacts and updater metadata for channel `stable`
- keep branch-based publication in CI and keep the running app configured by channel rather than by branch
- inject the authoritative application channel at build time or through trusted runtime configuration owned by `main`
- expose channel identity to the renderer only as readonly metadata suitable for smoke validation and user diagnostics
- prefer PR validation to prove readiness and merge-triggered workflows to perform publication
- treat feed-readability checks alone as insufficient for setup completion when auto-update is part of the runtime baseline
- prefer setup-owned upgrade verification that starts from an older packaged build and confirms a newer published build is detected for both `dev` and `stable`
- when Linux AppImage packaging is used, be ready to extract the older packaged build or otherwise adapt the launcher so live updater verification exercises the real packaged runtime instead of a development shell
- when applying branch protection with `gh api`, prefer an inline stdin payload over cross-context temporary files
- reconcile GitHub repository policy only when safe:
  - ensure the repository is PR-based
  - ensure repo auto-merge is enabled
  - ensure `dev` branch protection requires the `validate-electron` check
- surface unresolved repository-local decisions explicitly rather than hiding them in implicit defaults:
  - IPC surface inventory
  - secure storage mechanism
  - packaging and signing configuration
  - cloud-boundary integration configuration
  - authoritative build toolchain entrypoints
  - public updater-feed surface when packaged clients cannot read the traceability artifact store directly
  - artifact publication backend when GitHub Releases is not the chosen source of truth
  - updater implementation details and manifest format
  - channel-selection mechanism for distributed builds
  - rollback policy for published artifacts
  - the critical secure-storage and trusted-update prerequisites that must fail closed when absent
- keep packaging, signing, auto-update, secure storage, rollback, and artifact-source decisions explicitly documented when they are unresolved

## Output

- tool-module status for Bun, TypeScript, ESLint, Prettier, Vitest, and Playwright
- whether the repository now matches the template-owned Electron baseline closely or has explicit documented divergences
- runtime state as `present`, `missing`, or `drifted`
- whether `validate-pr.yml` emits the `validate-electron` check on pull requests to `dev`
- whether launch, smoke, and screenshot verification are wired into the repository validation surface
- whether the repository defines `dev` and `stable` update channels with merge-triggered publication on `dev` and `main`
- whether the baseline UI exposes stable metadata for runtime and channel verification
- whether setup has verified an actual N -> N+1 update path for both `dev` and `stable`
- whether `auto_merge_ready` is true and what remains if it is false
- repository-local decisions that remain explicitly unresolved
