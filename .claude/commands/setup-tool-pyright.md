# setup-tool-pyright command

## Workflow

1. Verify the repository is intended to use Pyright
2. Ensure Pyright configuration exists
3. Ensure repository scripts expose typecheck execution consistently
4. Keep typecheck scope aligned with tracked Python modules

## Constraints

- Do not embed runtime-specific assumptions into generic Pyright setup
