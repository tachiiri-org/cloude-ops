---
name: setup-tool-vitest
description: Ensure Vitest configuration and test scripts are configured for repositories that use Vitest.
---

# setup-tool-vitest command

## Workflow

1. Verify the repository is intended to use Vitest
2. Ensure `vitest` configuration exists
3. Ensure repository scripts expose unit-test execution consistently
4. Keep test setup minimal and aligned with repository language and runtime modules

## Constraints

- Do not add UI-browser test assumptions to Vitest setup
