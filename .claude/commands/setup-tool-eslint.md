# setup-tool-eslint command

## Goal

- Use `/home/tachiiri/project/.guide/tools/eslint.md` as the authority for ESLint adoption and version selection.
- Reach a state where the repository includes the expected ESLint package version and matching lint entrypoints.

## Workflow

1. Verify the repository is intended to use ESLint
2. Inspect ESLint setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/project/.guide/tools/eslint.md` for the ESLint baseline when reconciling package versions
4. Ensure the repository includes the ESLint version selected in `/home/tachiiri/project/.guide/tools/eslint.md`
5. Ensure `eslint` configuration exists
6. Ensure repository scripts expose lint execution consistently
7. Keep lint scope aligned with the repository language surface
8. Report the final ESLint setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not encode runtime or provider policy into generic lint setup
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the `tools/eslint.md` baseline; do not query live latest versions during ordinary setup
