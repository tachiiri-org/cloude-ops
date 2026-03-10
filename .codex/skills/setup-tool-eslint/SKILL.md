---
name: setup-tool-eslint
description: Ensure ESLint configuration and lint scripts are configured for repositories that use ESLint.
---

# setup-tool-eslint command

## Workflow

1. Verify the repository is intended to use ESLint
2. Ensure `eslint` configuration exists
3. Ensure repository scripts expose lint execution consistently
4. Keep lint scope aligned with the repository language surface

## Constraints

- Do not encode runtime or provider policy into generic lint setup
