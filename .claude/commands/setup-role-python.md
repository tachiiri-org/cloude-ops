# setup-role-python command

## Workflow

1. Read `CLAUDE.md`
2. Read `principles/core.md`
3. Read `profiles/core.md`
4. Read `principles/roles/python.md`
5. Verify the target directory exists locally
6. Verify working tree is clean before reconciliation
7. Verify `uv` is installed when the repository already expects Python tooling
8. Verify Codex and Serena availability
9. Activate the project in Serena
10. Inspect the role baseline as `present`, `missing`, or `drifted`
11. Ensure `main` and `dev` branch bootstrap exists; compose with `setup-dev-github` only when the repository bootstrap is missing
12. Reconcile only the Python engine baseline that is still missing or safely drifted:
   - `launcher.py`
   - `src/{name}/__init__.py`
   - `src/{name}/__main__.py`
   - no application features beyond scaffold
13. Add release metadata placeholders required for the engine launcher flow when missing
14. Add minimal dependency and script placeholders required for the engine scaffold when missing
15. Report any policy drift that cannot be fixed safely without repo-specific confirmation
16. Run the repository's standard validation commands
17. Summarize which role baseline areas were already aligned, which were fixed, and which still need human follow-up

## Constraints

- Do not embed non-Python runtime concerns into this role command
- Do not embed tool, identity, or provider setup into this role command
- Do not start development work
- Do not use pip directly; use `uv`
- Treat this command as the operator-facing reconcile entrypoint for Python repository setup
