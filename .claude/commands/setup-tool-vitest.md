# setup-tool-vitest command

## Workflow

1. Verify the repository is intended to use Vitest
2. Inspect Vitest setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/recommended-versions.json` for the stored TypeScript baseline when reconciling package versions
4. Ensure `vitest` configuration exists
5. Ensure repository scripts expose unit-test execution consistently
6. Keep test setup minimal and aligned with repository language and runtime modules
7. Report the final Vitest setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add UI-browser test assumptions to Vitest setup
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the stored baseline; do not query live latest versions during ordinary setup
