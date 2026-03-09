# refactor command

## Steps

1. Run the onboarding skill to gather project context.
2. Restate the refactor goal and the intended scope.
3. Read `principles/core.md` from the repository root.
4. Read the role-specific file under `principles/roles/` that applies to the current task.
5. Read only the domain document(s) under `principles/domains/` that constrain the stated scope.
6. Enter plan mode.
7. Review the current state against:
   - `principles/core.md`
   - the matching role document
   - the selected domain documents
8. Produce findings first:
   - principle violations
   - semantic drift from shared guidance
   - structural risks
   - behavior-preservation risks
9. Build a minimal refactoring plan one logical change at a time.
10. Get user approval on the plan.
11. Implement incrementally using the matching `implement-*` workflow for the repository role.
12. Re-check the affected areas against the same principles after changes.

## Goals

- Review the current state against `principles/core.md`, the matching role file, and relevant domain documents
- Identify principle violations, semantic drift, and structural risks before editing
- Apply minimal structural improvements aligned with shared guidance
- Preserve existing behavior unless explicitly instructed otherwise
- Hand implementation to the matching `implement-*` workflow after plan approval

## Constraints

- Apply one logical change at a time
- Do not create pr
- Do not read or write issues/ folder
