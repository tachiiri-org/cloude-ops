---
name: setup-tool-playwright
description: Ensure Playwright configuration and UI-check scripts are configured for repositories that use Playwright.
---

# setup-tool-playwright command

## Workflow

1. Verify the repository has UI surfaces that justify Playwright
2. Inspect Playwright setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/recommended-versions.json` for the stored TypeScript baseline when reconciling package versions
4. Ensure `@playwright/test` configuration exists
5. Ensure repository scripts expose browser or UI-check execution consistently
6. Keep Playwright setup separate from unit-test tooling
7. Report the final Playwright setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add Playwright to repositories with no UI boundary
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the stored baseline; do not query live latest versions during ordinary setup
