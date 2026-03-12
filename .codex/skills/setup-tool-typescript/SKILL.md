---
name: setup-tool-typescript
description: Ensure TypeScript compiler configuration and baseline typecheck scripts are configured for TypeScript repositories.
---

# setup-tool-typescript command

## Goal

- Use `/home/tachiiri/.guide/tools.md` as the authority for TypeScript adoption and version selection.
- Reach a state where the repository includes the expected TypeScript package version and typecheck entrypoints.

## Workflow

1. Verify the repository is intended to use TypeScript
2. Inspect TypeScript setup as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/tools.md` for the TypeScript baseline when reconciling package versions
4. Ensure the repository includes the TypeScript version selected in `/home/tachiiri/.guide/tools.md`
5. Ensure `typescript` is configured
6. Ensure `tsconfig` and a baseline `tsc --noEmit` typecheck path exist
7. Ensure repository scripts expose typecheck consistently
8. Report the final TypeScript setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add runtime-specific tsconfig assumptions unless required by the consuming runtime module
- Treat this command as an internal setup module that may be called repeatedly
- Reconcile to the `tools.md` baseline; do not query live latest versions during ordinary setup
