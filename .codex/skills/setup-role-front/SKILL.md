---
name: setup-role-front
description: Bootstrap a frontend repository with the minimum role-specific scaffold and checks, composed with runtime and optional idp modules.
---

# setup-role-front command

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
3. Read `principles/roles/front.md`
4. Verify working tree is clean
5. Ensure `main` and `dev` branch setup exists and switch to a feature branch
6. Verify GitHub auth status
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Apply the frontend baseline scaffold only:
   - a minimal page
   - explicit loading and error-state placeholders
   - no application features beyond scaffold
10. Apply the tool modules listed above
11. Require composition with:
   - `setup-runtime-cloudflare-pages` when the frontend runs on Pages
12. Optionally compose with:
   - `setup-idp-auth0` when the frontend owns login initiation details
13. Run the repository's standard validation commands
14. Commit the scaffold
15. Create a pull request targeting `dev`

## Constraints

- Do not embed runtime-specific assumptions into this role command
- Do not embed provider-specific integration setup into this role command
- Do not implement business logic in UI
- Do not use npm
