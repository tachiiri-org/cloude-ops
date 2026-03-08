# onboarding command

## Goals

- understand how to behave

## Steps

1. Read CLAUDE.md
2. Read `architecture.mmd` (system topology)
3. Read `principles.md` (architectural principles and role perspectives)
4. Verify working tree is clean
5. Read last 10 commit logs
6. Classify repository role by cross-referencing `architecture.mmd` (front / bff / gateway / adapter / electron / python / ops)
7. Ask human goals
8. Create a feature branch off `dev` based on stated goals (e.g. feature/xxx, fix/xxx)
9. Execute the implement skill matching the repo role:
   - front / bff / gateway / adapter → `implement-ts`
   - electron → `implement-electron`
   - python → `implement-py`
   - ops → no implement skill (ops repo manages skills, not product code)

## Constrains

- don't read codes
- don't change codes
- no authentication checks
- no tool installation
- don't start development work
- don't use npm
