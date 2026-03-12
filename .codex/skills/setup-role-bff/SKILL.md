---
name: setup-role-bff
description: Reconcile a BFF repository to the expected role baseline.
---

# setup-role-bff command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Purpose

- Preferred role-bundle name for BFF repository setup under the `setup-<axis>-<name>` taxonomy.
- Owns BFF-specific scaffold and responsibility boundaries.
- Keeps runtime, identity, provider, and tool setup out of the role command.

## Workflow

1. Read `CLAUDE.md`
2. Read `principles/core.md`
3. Read `profiles/core.md`
4. Read `principles/roles/bff.md`
5. Verify the target directory exists locally
6. Verify working tree is clean before reconciliation
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Inspect the role baseline as `present`, `missing`, or `drifted`
10. Ensure `main` and `dev` branch bootstrap exists; compose with `setup-dev-github` only when the repository bootstrap is missing
11. Reconcile only the minimum BFF baseline that is still missing or safely drifted:
   - a minimal health endpoint
   - a minimal internal-boundary entrypoint
   - no application features beyond scaffold
12. Report any unsafe drift that should not be overwritten automatically
13. Run the repository's standard validation commands
14. Summarize which role baseline areas were already aligned, which were fixed, and which still need human follow-up

## Constraints

- Do not embed runtime-specific assumptions into this role command
- Do not embed tool, identity, or provider setup into this role command
- Do not implement application behavior beyond a minimal BFF scaffold
- Do not use npm
- Treat this command as the operator-facing reconcile entrypoint for BFF repository setup
