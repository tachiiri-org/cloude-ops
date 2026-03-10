---
name: setup-tool-ruff
description: Ensure Ruff formatting and lint configuration are configured for Python repositories.
---

# setup-tool-ruff command

## Workflow

1. Verify the repository is intended to use Ruff
2. Ensure Ruff configuration exists
3. Ensure repository scripts expose lint and format execution consistently
4. Keep formatting and lint scope aligned with tracked Python files

## Constraints

- Do not split Python formatting and lint defaults without repository need
