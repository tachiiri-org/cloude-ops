---
name: setup-role-front
description: Reconcile a frontend repository to the expected role baseline.
---

# setup-role-front command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Workflow

1. Read `CLAUDE.md`
2. Read `principles/core.md`
3. Read `profiles/core.md`
4. Read `principles/roles/front.md`
5. Verify the target directory exists locally
6. Verify working tree is clean before reconciliation
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Inspect the role baseline as `present`, `missing`, or `drifted`
10. Ensure `main` and `dev` branch bootstrap exists; compose with `setup-dev-github` only when the repository bootstrap is missing
11. Reconcile only the minimum role baseline that is still missing or safely drifted:
   - a minimal page
   - explicit loading and error-state placeholders
   - no application features beyond scaffold
12. Report any unsafe drift that should not be overwritten automatically
13. Run the repository's standard validation commands
14. Summarize which role baseline areas were already aligned, which were fixed, and which still need human follow-up

## Constraints

- Do not embed runtime-specific assumptions into this role command
- Do not embed tool, identity, or provider setup into this role command
- Do not implement business logic in UI
- Do not use npm
- Treat this command as the operator-facing reconcile entrypoint for frontend repository setup
