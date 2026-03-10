---
name: setup-role-adapter
description: Bootstrap an adapter repository with the minimum role-specific scaffold and checks, composed with runtime and provider modules.
---

# setup-role-adapter command

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`

## Workflow

1. Run the repository bootstrap flow for the target path
2. Read `CLAUDE.md`
3. Read `principles/roles/adapter.md`
4. Verify working tree is clean
5. Ensure `main` and `dev` branch setup exists and switch to a feature branch
6. Verify GitHub auth status
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Apply the adapter baseline scaffold only:
   - a minimal health endpoint
   - a minimal provider-boundary entrypoint
   - no provider-specific implementation beyond scaffold
10. Apply the tool modules listed above
11. Require composition with:
   - `setup-runtime-cloudflare-workers` when the adapter runs on Workers
12. Optionally compose with:
   - one or more `setup-provider-*` modules
13. Run the repository's standard validation commands
14. Commit the scaffold
15. Create a pull request targeting `dev`

## Constraints

- Do not embed runtime-specific assumptions into this role command
- Do not embed specific provider setup into this role command
- Do not bypass adapter execution-boundary responsibilities
- Do not use npm
