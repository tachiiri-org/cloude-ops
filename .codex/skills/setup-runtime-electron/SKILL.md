---
name: setup-runtime-electron
description: Reconcile Electron runtime requirements and delivery automation for repositories that run as Electron applications.
---

# setup-runtime-electron command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

Template baseline reads in this workflow refer to files under `/home/tachiiri/project/.template/electron/`.

## Goals

- Reconcile the repository to the Electron runtime baseline defined by shared guidance and the template under `/home/tachiiri/project/.template/electron/`.
- Use the matching TypeScript and packaging tool profiles under `/home/tachiiri/project/.guide/tools/` as the authority for required tooling.
- Reach a state where the required runtime files, validation workflow, launch checks, smoke checks, and screenshot capture are present by reconciling against the shared template rather than relying on bootstrap scripts.
- Standardize two explicit update channels for Electron repositories:
  - `dev` for prerelease builds published after merge to `dev`
  - `stable` for release builds published after merge to `main`
- Reach a state where runtime channel identity is trusted, explicit in `main`, and exposed to `renderer` only through a narrow preload-owned surface.
- Reach a state where packaged artifacts and readable channel metadata are published through public GitHub Releases surfaces and tied only to merge completion on `dev` and `main`.
- Reach a state where setup publishes the initial `dev` and `stable` releases, reconciles repository auto-merge and `dev` branch protection, and proves a real packaged N -> N+1 update path instead of stopping at workflow configuration.
- Reach a state where the baseline UI exposes stable smoke selectors and readonly runtime diagnostics for application identity, version, runtime, channel, environment, build time, updater status, updater timestamp, and bootstrap failure state.
- Reach a state where the template-owned UI catalog, optional selector surface, and repository-local layout/design/interaction policy inputs are reconciled explicitly rather than encoded as ad hoc renderer edits.
- Keep the template under `/home/tachiiri/project/.template/electron/` as the authoritative baseline for repository-file shape unless the repository documents a justified divergence, and surface unresolved repository-local decisions explicitly.

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
- Do not rely on bootstrap scripts; reconcile from the relevant files under `tools/`, `/home/tachiiri/project/.guide/`, and `/home/tachiiri/project/.template/electron/` directly
- Do not treat build success alone as sufficient runtime verification when the repository has a renderer surface.
- Do not leave launch, smoke, or visual verification as implicit manual follow-up work for implementation commands.
- Do not read Git branch names at runtime to decide update behavior.
- Do not make `dev` and `stable` feeds interchangeable.
- Do not leave baseline UI verification implicit when the repository has a renderer surface.
- Do not let `renderer` choose its own update channel or feed source.
- Do not enable auto-update without explicit artifact source, signing posture, and updater metadata.
- Do not assume private GitHub Release asset URLs are readable updater feeds for distributed clients.
- Do not leave packaging, signing, update-feed posture, or publication entrypoints implicit.
- Do not treat first-release publication or repository merge policy as later follow-up when setup owns the runtime delivery baseline.
- Do not postpone explicit version-seed decisions until after publication if doing so would force manual backfill of older packaged assets.
- Do not publish runtime artifacts from pull-request validation jobs.
- Do not treat merge to `dev` or `main` as sufficient publication proof until the merge-triggered publish workflow is configured explicitly.
- Do not allow channel-crossing updates unless the repository explicitly defines and documents that exception.
- Do not assume private GitHub repositories are compatible with the baseline updater posture.
- Do not encode the repository's chosen UI shell only as ad hoc renderer edits when template-owned policy data can represent it explicitly.
- Do not merge the selector tool into the catalog assets so tightly that setup cannot reconcile policy without carrying the selector UI itself.
- Do not treat exported UI policy data as optional when the repository intentionally diverges from the template defaults.

## Hints

### Baseline

- read `runtimes/electron.md` before runtime decisions
- verify that the repository actually adopts Electron before reconciling this profile
- inspect the current runtime state as `present`, `missing`, or `drifted` and reconcile only the minimum needed surface
- prefer copying or reconciling from `/home/tachiiri/project/.template/electron/` over rebuilding the same baseline file-by-file from scratch
- apply the required tool modules and collect their status rather than re-deriving tool setup ad hoc
- prefer the minimal `main` / `preload` / `renderer` / `shared` scaffold when the repository has no prior Electron surface
- keep `renderer` untrusted and expose only a narrow preload API even in the initial baseline

### Versioning And Publication

- treat placeholder replacement inside the template itself as part of setup-owned reconciliation:
  - app identity
  - repository identity
  - current version
  - previous version used for N -> N+1 verification
- prefer a clean initial version seed during setup:
  - if the repository has never published, choose an explicit previous version and current version up front
  - prefer publishing the first real N -> N+1 path directly over backfilling historical assets later
- map branch merge outcomes to channel publication explicitly:
  - `push` on `dev` publishes prerelease artifacts and updater metadata for channel `dev`
  - `push` on `main` publishes release artifacts and updater metadata for channel `stable`
- prefer PR validation to prove readiness and merge-triggered workflows to perform publication
- when the repository has not published either channel yet, have setup drive the initial `dev` and `stable` releases to completion rather than stopping at workflow configuration

### Repository Policy

- ensure `.github/workflows/validate-pr.yml` uses `pull_request` to `dev` and the job name `validate-electron` so GitHub protection can target a stable check name
- apply repository policy in setup order:
  - publish the initial `dev` channel first if protection would otherwise block the bootstrap push
  - then enable auto-merge and branch protection
  - then use PR-based merges for `main` and later publication steps
- when applying branch protection with `gh api`, prefer an inline stdin payload over cross-context temporary files
- reconcile GitHub repository policy only when safe:
  - ensure the repository is PR-based
  - ensure repo auto-merge is enabled
  - ensure `dev` branch protection requires the `validate-electron` check

### Verification

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
- treat feed-readability checks alone as insufficient for setup completion when auto-update is part of the runtime baseline
- prefer setup-owned upgrade verification that starts from an older packaged build and confirms a newer published build is detected for both `dev` and `stable`
- when Linux AppImage packaging is used, be ready to extract the older packaged build or otherwise adapt the launcher so live updater verification exercises the real packaged runtime instead of a development shell

### Feed And Runtime Identity

- prefer public GitHub Releases as the baseline artifact source of truth for both traceability and updater reads unless the repository explicitly documents another backend
- if the repository must remain private, treat that as a justified divergence from the baseline and document the replacement updater surface explicitly
- keep branch-based publication in CI and keep the running app configured by channel rather than by branch
- inject the authoritative application channel at build time or through trusted runtime configuration owned by `main`
- expose channel identity to the renderer only as readonly metadata suitable for smoke validation and user diagnostics

### UI Policy

- treat `/home/tachiiri/project/.template/electron/ui/*.json` as the template-owned seed documents for repository-local UI policy unless the repository already carries stricter equivalents
- reconcile the UI catalog and the selected UI policy separately:
  - copy the catalog baseline from the template
  - apply repository-local policy values as the chosen initial shell
- preserve selector-tool separation when reconciling:
  - the reusable catalog should remain usable without the selector
  - the selector may be omitted from repositories that only need the resolved policy output

### Unresolved Decisions

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
- whether setup published the initial `dev` and `stable` releases or why that did not complete
- which explicit N -> N+1 path setup used for real packaged update verification
- whether the baseline UI exposes stable metadata for runtime and channel verification
- whether repository-local UI policy data was reconciled from the template seed documents and where it now lives
- whether the repository retains the selector tool, the catalog only, or both
- whether setup has verified an actual N -> N+1 update path for both `dev` and `stable`
- whether `auto_merge_ready` is true and what remains if it is false
- repository-local decisions that remain explicitly unresolved
