---
name: setup-tool-playwright
description: Ensure Playwright configuration and UI-check scripts are configured for repositories that use Playwright.
---

# setup-tool-playwright command

## Goal

- Use `/home/tachiiri/.guide/tools.md` as the authority for Playwright adoption and version selection.
- Reach a state where UI-bearing repositories include the expected Playwright package version and UI-check entrypoints.

## Workflow

1. Verify the repository has UI surfaces that justify Playwright
2. Inspect Playwright setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/tools.md` for the Playwright baseline when reconciling package versions
4. Ensure the repository includes the Playwright version selected in `/home/tachiiri/.guide/tools.md`
5. Ensure `@playwright/test` configuration exists
6. Ensure repository scripts expose browser or UI-check execution consistently
7. Keep Playwright setup separate from unit-test tooling
8. Report the final Playwright setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add Playwright to repositories with no UI boundary
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the `tools.md` baseline; do not query live latest versions during ordinary setup
