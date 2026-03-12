# setup-tool-bun command

## Goal

- Use `/home/tachiiri/.guide/tools.md` as the authority for Bun adoption.
- Reach a state where Bun is the repository package-manager entrypoint and the expected Bun version policy is represented in the repository.

## Workflow

1. Verify the repository is intended to use Bun
2. Inspect Bun-related state as `present`, `missing`, or `drifted`
3. Read `/home/tachiiri/.guide/tools.md` for the Bun baseline
4. Ensure `package.json` exists
5. Ensure Bun is the package manager entrypoint for install and script execution
6. Ensure repository scripts assume `bun run` rather than npm
7. Report the final Bun setup status so the consuming role command can summarize reconciliation

## Constraints

- Do not add runtime-specific assumptions
- Do not use npm
- Reconcile to the `tools.md` baseline during ordinary setup
- Treat this command as an internal setup module that may be called repeatedly
