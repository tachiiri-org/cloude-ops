---
name: setup-tool-vitest
description: Ensure Vitest configuration and test scripts are configured for repositories that use Vitest.
---

# setup-tool-vitest command

## Goal

- Use `/home/tachiiri/project/.guide/tools/vitest.md` as the authority for Vitest adoption and version selection.
- Reach a state where the repository includes the expected Vitest package version and unit-test entrypoints.

## Workflow

1. Verify the repository is intended to use Vitest
2. Inspect Vitest setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/project/.guide/tools/vitest.md` for the Vitest baseline when reconciling package versions
4. Ensure the repository includes the Vitest version selected in `/home/tachiiri/project/.guide/tools/vitest.md`
5. Ensure `vitest` configuration exists
6. Ensure repository scripts expose unit-test execution consistently
7. Keep test setup minimal and aligned with repository language and runtime modules
8. Report the final Vitest setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add UI-browser test assumptions to Vitest setup
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the `tools/vitest.md` baseline; do not query live latest versions during ordinary setup
