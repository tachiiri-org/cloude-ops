---
name: setup-role-adapter
description: Reconcile an adapter repository to the expected role baseline.
---

# setup-role-adapter command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Workflow

1. Read `CLAUDE.md`
2. Read `principles/core.md`
3. Read `profiles/core.md`
4. Read `principles/roles/adapter.md`
5. Verify the target directory exists locally
6. Verify working tree is clean before reconciliation
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Inspect the role baseline as `present`, `missing`, or `drifted`
10. Ensure `main` and `dev` branch bootstrap exists; compose with `setup-dev-github` only when the repository bootstrap is missing
11. Reconcile only the minimum adapter baseline that is still missing or safely drifted:
   - a minimal health endpoint
   - a minimal provider-boundary entrypoint
   - no provider-specific implementation beyond scaffold
12. Report any unsafe drift that should not be overwritten automatically
13. Run the repository's standard validation commands
14. Summarize which role baseline areas were already aligned, which were fixed, and which still need human follow-up

## Constraints

- Do not embed runtime-specific assumptions into this role command
- Do not embed tool, identity, or provider setup into this role command
- Do not bypass adapter execution-boundary responsibilities
- Do not use npm
- Treat this command as the operator-facing reconcile entrypoint for adapter repository setup
