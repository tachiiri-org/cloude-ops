# setup-tool-pytest command

## Goal

- Use `/home/tachiiri/.guide/tools.md` as the authority for Python test tool selection.
- Reach a state where pytest is configured as the repository's Python test surface.

## Workflow

1. Verify the repository is intended to use pytest
2. Read `/home/tachiiri/.guide/tools.md` for the Python test baseline
3. Ensure pytest configuration exists
4. Ensure repository scripts expose test execution consistently
5. Keep test setup aligned with the repository's Python surface

## Constraints

- Do not add networked or integration-test assumptions to generic pytest setup
- Reconcile to the `tools.md` baseline during ordinary setup
