---
name: refactor
description: Drive principle-aligned refactoring through onboarding context, planning, and incremental implementation.
---

# refactor command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Steps

1. Run the onboarding skill to gather project context.
2. Restate the refactor goal and the intended scope.
3. Read `principles/core.md` from the shared guidance root.
4. Read `profiles/core.md` from the shared guidance root.
5. Read the role-specific file under `principles/roles/` that applies to the current task.
6. Read only the domain document(s) under `principles/domains/` that constrain the stated scope.
7. Read only the profile document(s) selected by onboarding or required by the currently adopted runtime, identity, and provider boundaries.
8. Enter plan mode.
9. Review the current state against:
   - `principles/core.md`
   - `profiles/core.md`
   - the matching role document
   - the selected domain documents
   - the selected profile documents
10. Produce findings first:
   - principle violations
   - semantic drift from shared guidance
   - structural risks
   - behavior-preservation risks
11. Build a minimal refactoring plan one logical change at a time.
12. Get user approval on the plan.
13. Implement incrementally using the matching `implement-*` workflow for the repository role.
14. Re-check the affected areas against the same principles and profiles after changes.

## Goals

- Review the current state against `principles/core.md`, `profiles/core.md`, the matching role file, and relevant domain and profile documents
- Identify principle violations, semantic drift, and structural risks before editing
- Apply minimal structural improvements aligned with shared guidance
- Preserve existing behavior unless explicitly instructed otherwise
- Hand implementation to the matching `implement-*` workflow after plan approval

## Constraints

- Apply one logical change at a time
- Do not create pr
- Do not read or write issues/ folder
