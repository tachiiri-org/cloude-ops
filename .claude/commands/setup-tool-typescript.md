# setup-tool-typescript command

## Workflow

1. Verify the repository is intended to use TypeScript
2. Inspect TypeScript setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/recommended-versions.json` for the stored TypeScript baseline when reconciling package versions
4. Ensure `typescript` is configured
5. Ensure `tsconfig` and a baseline `tsc --noEmit` typecheck path exist
6. Ensure repository scripts expose typecheck consistently
7. Report the final TypeScript setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add runtime-specific tsconfig assumptions unless required by the consuming runtime module
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the stored baseline; do not query live latest versions during ordinary setup
