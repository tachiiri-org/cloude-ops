---
name: setup-runtime-electron
description: Reconcile Electron runtime requirements and delivery automation for repositories that run as Electron applications.
---

# setup-runtime-electron command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Goal

- Reconcile the repository to the Electron runtime baseline defined by shared guidance.
- Use `/home/tachiiri/.guide/tools.md` as the authority for required TypeScript tooling.
- Reach a state where the required runtime files, validation workflow, and Electron tool surface are present without relying on bootstrap scripts.

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`
- Optional:
  - `setup-tool-playwright`

## Workflow

1. Read `principles/runtime/electron.md`
2. Read `profiles/runtime/electron.md`
3. Verify the repository is intended to run as an Electron application
4. Inspect Electron runtime state as `present`, `missing`, or `drifted`
5. Reconcile required runtime files directly from the tracked templates when files or workflows are missing or safely drifted
6. Apply the required tool modules listed above and collect their reported status
7. Ensure `.github/workflows/validate-pr.yml` exists and emits the `validate-electron` check on pull requests to `dev`
8. Ensure the validation workflow runs the Electron validation surface selected by shared guidance
9. Reconcile GitHub repository policy for this runtime when safe:
   - ensure the repository is PR-based
   - ensure repo auto-merge is enabled
   - ensure `dev` branch protection requires the `validate-electron` check
10. Report `auto_merge_ready` only when the workflow files and GitHub policy are aligned
11. Add only the minimal Electron runtime scaffold required by repositories adopting this runtime
12. Keep update, packaging, and signing settings explicit rather than implied by Electron adoption
13. Run the repository's standard validation commands

## Applies To

- repositories adopting the Electron runtime

## Constraints

- Do not embed application-specific behavior into this runtime command
- Do not imply provider or update-channel choices by runtime setup alone
- Do not use npm
- Do not rely on bootstrap scripts; reconcile from `tools.md` and tracked templates directly
