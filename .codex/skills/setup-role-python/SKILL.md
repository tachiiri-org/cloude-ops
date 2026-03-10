---
name: setup-role-python
description: Bootstrap a Python local engine repository with the minimum role-specific scaffold and checks, composed with Python tooling modules.
---

# setup-role-python command

## Tool Modules

- Required:
  - `setup-tool-uv`
  - `setup-tool-ruff`
  - `setup-tool-pyright`
  - `setup-tool-pytest`

## Workflow

1. Run the repository bootstrap flow for the target path
2. Read `CLAUDE.md`
3. Read `principles/roles/python.md`
4. Verify working tree is clean
5. Ensure `main` and `dev` branch setup exists and switch to a feature branch
6. Verify GitHub auth status
7. Verify `uv` is installed and `.venv` exists
8. Verify Codex and Serena availability
9. Activate the project in Serena
10. Apply the Python engine baseline scaffold only:
   - `launcher.py`
   - `src/{name}/__init__.py`
   - `src/{name}/__main__.py`
   - no application features beyond scaffold
11. Apply the tool modules listed above
12. Add release metadata placeholders required for the engine launcher flow
13. Add minimal dependency and script placeholders required for the engine scaffold
14. Run the repository's standard validation commands
15. Commit the scaffold
16. Create a pull request targeting `dev`

## Constraints

- Do not embed non-Python runtime concerns into this role command
- Do not start development work
- Do not use pip directly; use `uv`
