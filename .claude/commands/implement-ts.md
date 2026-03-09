# implement-ts skill

## Goals

- Restate the goal, affected surface, and relevant domain constraints from onboarding
- Plan the minimal change set before editing
- Define expected behavior before coding
- Write or update tests first when behavior changes or a bug is being fixed
- Implement the minimal change needed to satisfy the tests
- Refactor only after behavior is covered
- Run scoped checks first when possible
- Format by `bun run prettier`
- Typecheck by `bun run tsc --noEmit`
- Lint by `bun run lint`
- Unit test by `bun run test`
- Build check by `bun run build`
- Check visual by Playwright only when the repository is frontend and UI behavior changed
- Summarize changed behavior, touched surfaces, and verification results

## Constraints

- treat onboarding context as required input
- use tests-first by default for behavioral changes
- if the change is purely mechanical and behavior-preserving, tests-first is optional but validation is still required
- do not create pr
