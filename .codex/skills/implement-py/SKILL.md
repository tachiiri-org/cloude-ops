---
name: implement-py
description: Plan and implement Python changes with ruff, pyright, and pytest validation before commit.
---

# implement-py skill

## Goals

- Restate the goal, affected surface, and relevant domain constraints from onboarding
- Plan the minimal change set before editing
- Define expected behavior before coding
- Write or update tests first when behavior changes or a bug is being fixed
- Implement the minimal change needed to satisfy the tests
- Refactor only after behavior is covered
- Run scoped checks first when possible
- Format and lint by `ruff format` and `ruff check`
- Typecheck by `pyright`
- Unit test by `pytest`
- Summarize changed behavior, touched surfaces, and verification results

## Constraints

- treat onboarding context as required input
- use tests-first by default for behavioral changes
- if the change is purely mechanical and behavior-preserving, tests-first is optional but validation is still required
- do not create pr
