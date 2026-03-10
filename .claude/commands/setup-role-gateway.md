# setup-role-gateway command

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
3. Read `principles/roles/gateway.md`
4. Verify working tree is clean
5. Ensure `main` and `dev` branch setup exists and switch to a feature branch
6. Verify GitHub auth status
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Apply the gateway baseline scaffold only:
   - a minimal health endpoint
   - a minimal operation-routing entrypoint
   - no provider-specific logic
10. Apply the tool modules listed above
11. Require composition with:
   - `setup-runtime-cloudflare-workers` when the gateway runs on Workers
12. Run the repository's standard validation commands
13. Commit the scaffold
14. Create a pull request targeting `dev`

## Constraints

- Do not embed runtime-specific assumptions into this role command
- Do not embed provider-specific setup into this role command
- Do not implement provider-specific logic in gateway scaffold
- Do not use npm
