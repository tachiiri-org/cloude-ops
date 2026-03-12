# setup-tool-prettier command

## Workflow

1. Verify the repository is intended to use Prettier
2. Inspect Prettier setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/recommended-versions.json` for the stored TypeScript baseline when reconciling package versions
4. Ensure `prettier` configuration exists
5. Ensure repository scripts expose formatting consistently
6. Keep format scope aligned with tracked source and config files
7. Report the final Prettier setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not embed language-irrelevant file globs without repository need
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the stored baseline; do not query live latest versions during ordinary setup
