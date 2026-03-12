# setup-tool-uv command

## Goal

- Use `/home/tachiiri/.guide/tools.md` as the authority for Python package-management tool selection.
- Reach a state where `uv` is the repository package-manager entrypoint and the Python environment flow matches shared guidance.

## Workflow

1. Verify the repository is intended to use Python
2. Read `/home/tachiiri/.guide/tools.md` for the Python package-management baseline
3. Ensure `uv` is the package manager entrypoint
4. Ensure `.venv` setup and sync flow are defined
5. Ensure repository scripts and documentation assume `uv` rather than raw `pip`

## Constraints

- Do not use pip directly for package management
- Reconcile to the `tools.md` baseline during ordinary setup
