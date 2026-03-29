# setup-tool-prettier command

## Goal

- Use `/home/tachiiri/project/.guide/tools/prettier.md` as the authority for Prettier adoption and version selection.
- Reach a state where the repository includes the expected Prettier package version and formatting entrypoints.

## Workflow

1. Verify the repository is intended to use Prettier
2. Inspect Prettier setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/project/.guide/tools/prettier.md` for the Prettier baseline when reconciling package versions
4. Ensure the repository includes the Prettier version selected in `/home/tachiiri/project/.guide/tools/prettier.md`
5. Ensure `prettier` configuration exists
6. Ensure repository scripts expose formatting consistently
7. Keep format scope aligned with tracked source and config files
8. Report the final Prettier setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not embed language-irrelevant file globs without repository need
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the `tools/prettier.md` baseline; do not query live latest versions during ordinary setup
