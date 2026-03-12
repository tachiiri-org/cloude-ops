# setup-role-ops command

## Workflow

1. Read `CLAUDE.md`
2. Read `principles/core.md`
3. Read `profiles/core.md`
4. Read `principles/roles/ops.md`
5. Verify the target directory exists locally
6. Verify working tree is clean before reconciliation
7. Verify Codex and Serena availability
8. Activate the project in Serena
9. Inspect the role baseline as `present`, `missing`, or `drifted`
10. Ensure `main` and `dev` branch bootstrap exists; compose with `setup-dev-github` only when the repository bootstrap is missing
11. Reconcile only the minimum ops baseline that is still missing or safely drifted:
   - shared guidance roots such as `AGENTS.md`, `CLAUDE.md`, `architecture.mmd`, `principles/`, and `profiles/`
   - mirrored Claude commands and Codex skills for the shared workflows the repository owns
   - `.claude/settings.json` and command definitions required for the shared automation surface
12. Report any unsafe drift that should not be overwritten automatically
13. Run the repository's standard validation commands
14. Summarize which role baseline areas were already aligned, which were fixed, and which still need human follow-up

## Constraints

- Do not mix product-repository scaffold concerns into this role command
- Do not embed runtime, tool, identity, or provider setup here
- Do not use npm
- Treat this command as the operator-facing reconcile entrypoint for ops repository setup
