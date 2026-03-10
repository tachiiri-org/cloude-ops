---
name: setup-tool-pytest
description: Ensure pytest configuration and test scripts are configured for Python repositories.
---

# setup-tool-pytest command

## Workflow

1. Verify the repository is intended to use pytest
2. Ensure pytest configuration exists
3. Ensure repository scripts expose test execution consistently
4. Keep test setup aligned with the repository's Python surface

## Constraints

- Do not add networked or integration-test assumptions to generic pytest setup
