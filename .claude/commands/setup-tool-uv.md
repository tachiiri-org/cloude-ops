# setup-tool-uv command

## Workflow

1. Verify the repository is intended to use Python
2. Ensure `uv` is the package manager entrypoint
3. Ensure `.venv` setup and sync flow are defined
4. Ensure repository scripts and documentation assume `uv` rather than raw `pip`

## Constraints

- Do not use pip directly for package management
