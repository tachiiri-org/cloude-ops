# refactor command

## Steps

1. Run the onboarding skill to gather project context.
2. Read `principles/core.md` from the repository root.
3. Read the role-specific file under `principles/roles/` that applies to the current task.
4. Enter plan mode.
5. Build a refactoring plan that combines:
   - Goals from onboarding step 5 or explicit user input
   - Architectural principles from `principles/core.md`
   - Role-specific principles relevant to the scope of change
6. Get user approval on the plan.
7. Implement one logical change at a time.
8. Commit after completing all changes.

## Goals

- Apply structural improvements aligned with `principles/core.md` and the matching role file
- Eliminate violations of architectural or role-specific principles
- Preserve existing behavior unless explicitly instructed otherwise

## Role Perspectives

### front

### bff

### gateway

### adapter

### electron

### python

### ops

## Constraints

- Apply one logical change at a time
- Do not create pr
- Do not read or write issues/ folder
