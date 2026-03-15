---
name: setup-runtime-electron
description: Reconcile Electron runtime requirements and delivery automation for repositories that run as Electron applications.
---

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
- Reach a state where the repository validates the presence and integrity of channel-specific updater metadata and GitHub Release publication outputs as part of setup-owned verification.
- Reach a state where packaged artifacts and updater metadata remain together in GitHub Releases as one public source of truth for distributed clients.
- Reach a state where the baseline UI exposes enough readonly runtime metadata for setup-owned diagnostics:
  - application name
  - version
  - runtime
  - channel
  - environment
  - build time
  - updater status
  - updater timestamp
- Reach a state where the template-owned UI catalog can be selected through a dedicated selector tool rather than by editing renderer files directly.
- Reach a state where setup reads repository-local UI policy data and reconciles the selected baseline rather than treating the catalog defaults as the final repository choice.
- Reach a state where the repository carries explicit UI policy inputs for:
  - layout
  - design
  - interaction
- Reach a state where setup can retain the full template catalog while still applying repository-local UI policy as the selected initial shell.
- Reach a state where setup is not considered complete until update verification has succeeded for both:
  - the `dev` developer channel
  - the `stable` production channel
- Reach a state where setup-owned update verification proves an actual version advance, not just feed readability:
  - for example `0.1.0 -> 0.1.1`
  - or another explicit N -> N+1 upgrade step chosen by the repository
- Reach a state where setup-owned update verification starts from an older packaged build and proves that both the developer and production channels detect the newer published build through their real GitHub Release channel surfaces.
- Keep the validation workflow, required check name, and `dev` merge gate explicit.
- Keep the template under `/home/tachiiri/.template/electron/` as the authoritative baseline for repository-file shape unless the repository documents a justified divergence.
- Keep packaging, release-channel, signing, update-feed posture, and branch-triggered publication explicit rather than implied by Electron adoption.
- Keep the baseline GitHub Releases updater posture explicit:
  - the repository is public
  - packaged clients read updater metadata from GitHub Releases without per-user credentials
- Keep artifact publication tied to merge completion:
  - merge to `dev` publishes the `dev` channel surface
  - merge to `main` publishes the `stable` channel surface
- Keep runtime channel identity in `main` and expose it to `renderer` only through a narrow preload API.
- Keep the baseline UI contract explicit enough for setup-owned smoke verification:
  - application identity
  - runtime identity
  - current update channel
  - bootstrap failure state
- Keep the UI selector tool separate from the reusable UI pattern catalog:
  - catalog assets define reusable layouts, components, interactions, and contracts
  - selector assets help choose and export repository-local UI policy
- Keep repository-local UI policy data explicit enough for setup-owned reconciliation:
  - selected default layout
  - available layouts
  - workspace kind
  - rationale
  - design policy
  - interaction policy

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
- Do not assume private GitHub repositories are compatible with the baseline updater posture.
- Do not encode the repository's chosen UI shell only as ad hoc renderer edits when template-owned policy data can represent it explicitly.
- Do not merge the selector tool into the catalog assets so tightly that setup cannot reconcile policy without carrying the selector UI itself.
- Do not treat exported UI policy data as optional when the repository intentionally diverges from the template defaults.

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
- treat `/home/tachiiri/.template/electron/ui/*.json` as the template-owned seed documents for repository-local UI policy unless the repository already carries stricter equivalents
- reconcile the UI catalog and the selected UI policy separately:
  - copy the catalog baseline from the template
  - apply repository-local policy values as the chosen initial shell
- preserve selector-tool separation when reconciling:
  - the reusable catalog should remain usable without the selector
  - the selector may be omitted from repositories that only need the resolved policy output
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
- prefer public GitHub Releases as the baseline artifact source of truth for both traceability and updater reads unless the repository explicitly documents another backend
- if the repository must remain private, treat that as a justified divergence from the baseline and document the replacement updater surface explicitly
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
  - whether the repository keeps the selector tool after setup or only the resolved UI policy
  - where repository-local UI policy is stored after reconciliation
  - whether the resolved UI policy remains local-only or is later sourced through main process or cloud BFF
  - the reason the repository cannot use the baseline public GitHub Releases posture
  - the replacement updater surface when packaged clients cannot read GitHub Releases directly
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
- whether repository-local UI policy data was reconciled from the template seed documents and where it now lives
- whether the repository retains the selector tool, the catalog only, or both
- whether setup has verified an actual N -> N+1 update path for both `dev` and `stable`
- whether `auto_merge_ready` is true and what remains if it is false
- repository-local decisions that remain explicitly unresolved
