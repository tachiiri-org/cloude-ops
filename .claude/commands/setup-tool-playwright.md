# setup-tool-playwright command

## Workflow

1. Verify the repository has UI surfaces that justify Playwright
2. Ensure `@playwright/test` configuration exists
3. Ensure repository scripts expose browser or UI-check execution consistently
4. Keep Playwright setup separate from unit-test tooling

## Constraints

- Do not add Playwright to repositories with no UI boundary
