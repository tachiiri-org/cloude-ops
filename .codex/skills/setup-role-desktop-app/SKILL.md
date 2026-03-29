---
name: setup-role-desktop-app
description: Reconcile a desktop application repository to the expected role baseline.
---

# setup-role-desktop-app command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Workflow

1. Read `CLAUDE.md`
2. Read `principles.md`
3. Read `roles/desktop-app.md`
5. Verify the target directory exists locally
6. Verify working tree is clean before reconciliation
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Inspect the role baseline as `present`, `missing`, or `drifted`
10. Ensure `main` and `dev` branch bootstrap exists; compose with `setup-dev-github` only when the repository bootstrap is missing
11. Reconcile only the desktop-app baseline that is still missing or safely drifted:
   - minimal main and renderer entrypoints
   - a minimal window that renders a basic screen
   - no application features beyond scaffold
12. Report any policy drift that cannot be fixed safely without repo-specific confirmation
13. Run the repository's standard validation commands
14. Summarize which role baseline areas were already aligned, which were fixed, and which still need human follow-up

## Constraints

- Do not embed runtime-packaging assumptions into this role command
- Do not embed tool, identity, or provider setup into this role command
- Do not expose local OS or credential access directly to renderer code
- Do not use npm
- Treat this command as the operator-facing reconcile entrypoint for desktop-app repository setup
