# setup-tool-pyright command

## Goal

- Use `/home/tachiiri/.guide/tools.md` as the authority for Python typecheck tool selection.
- Reach a state where Pyright is configured as the repository's Python typecheck surface.

## Workflow

1. Verify the repository is intended to use Pyright
2. Read `/home/tachiiri/.guide/tools.md` for the Python typecheck baseline
3. Ensure Pyright configuration exists
4. Ensure repository scripts expose typecheck execution consistently
5. Keep typecheck scope aligned with tracked Python modules

## Constraints

- Do not embed runtime-specific assumptions into generic Pyright setup
- Reconcile to the `tools.md` baseline during ordinary setup
