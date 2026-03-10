---
name: setup-role-electron
description: Bootstrap an Electron application repository with the minimum role-specific scaffold and checks, composed with runtime and optional idp modules.
---

# setup-role-electron command

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`
- Optional:
  - `setup-tool-playwright`

## Workflow

1. Run the repository bootstrap flow for the target path
2. Read `CLAUDE.md`
3. Read `principles/roles/electron.md`
4. Verify working tree is clean
5. Ensure `main` and `dev` branch setup exists and switch to a feature branch
6. Verify GitHub auth status
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Apply the Electron baseline scaffold only:
   - minimal main and renderer entrypoints
   - a minimal window that renders a basic screen
   - no application features beyond scaffold
10. Apply the tool modules listed above
11. Require composition with:
   - `setup-runtime-electron`
12. Optionally compose with:
   - `setup-idp-auth0` when the Electron app directly integrates with Auth0
13. Run the repository's standard validation commands
14. Commit the scaffold

## Constraints

- Do not embed runtime-packaging assumptions into this role command
- Do not embed provider-specific setup into this role command
- Do not expose local OS or credential access directly to renderer code
- Do not use npm
