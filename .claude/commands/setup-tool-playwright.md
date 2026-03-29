# setup-tool-playwright command

## Goals

- Use `/home/tachiiri/project/.guide/tools/playwright.md` as the authority for Playwright adoption and version selection.
- Reach a state where UI-bearing repositories include the expected Playwright package version and UI-check entrypoints.
- Reach a state where Electron repositories can use Playwright to launch the built app, verify rendered baseline content, and retain visual artifacts for debugging.
- Reach a state where the Playwright surface is part of setup-owned validation rather than an ad hoc implementation-time add-on.

## Constraints

- Do not add Playwright to repositories with no UI boundary
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the `tools/playwright.md` baseline; do not query live latest versions during ordinary setup
- Do not collapse Playwright checks into unit-test tooling.
- Do not rely on screenshots alone when text or visible bootstrap-error assertions can make failures more actionable.

## Hints

- verify the repository has a UI surface that justifies Playwright before reconciling this module
- inspect the current Playwright setup as `present`, `missing`, or `drifted`
- use `/home/tachiiri/project/.guide/tools/playwright.md` as the version source
- ensure `@playwright/test` configuration exists and repository scripts expose a stable UI-check entrypoint
- for Electron repositories, prefer Playwright's Electron launcher over browser-only page tests
- make the setup-owned Playwright check validate rendered text and fail on visible bootstrap errors instead of relying on screenshots alone
- write a screenshot artifact on success so white-screen regressions can be inspected in CI and local runs
- keep the Playwright entrypoint separate from unit tests but include it in the repository validation script when setup owns launch verification
- if the local environment needs a display helper or sandbox flag, encode that in the repository script rather than expecting manual operator knowledge

## Output

- Playwright setup state as `present`, `missing`, or `drifted`
- whether `@playwright/test` is configured and exposed through repository scripts
- whether Electron launch, rendered-baseline checks, and screenshot artifacts are covered when the repository uses Electron
