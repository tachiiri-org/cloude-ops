# setup-tool-ruff command

## Goal

- Use `/home/tachiiri/project/.guide/tools/ruff.md` as the authority for Python format and lint tool selection.
- Reach a state where Ruff is configured as the repository's Python format and lint surface.

## Workflow

1. Verify the repository is intended to use Ruff
2. Read `/home/tachiiri/project/.guide/tools/ruff.md` for the Python lint baseline
3. Ensure Ruff configuration exists
4. Ensure repository scripts expose lint and format execution consistently
5. Keep formatting and lint scope aligned with tracked Python files

## Constraints

- Do not split Python formatting and lint defaults without repository need
- Reconcile to the `tools/ruff.md` baseline during ordinary setup
