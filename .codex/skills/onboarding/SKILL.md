---
name: onboarding
description: "Run repository onboarding workflow: sync guidance files, inspect git state, classify role, and start feature branch."
---

# onboarding command

## Goals

- understand how to behave

## Steps

1. Copy root guidance files from `/home/tachiiri` into the current working directory:
   - `cp /home/tachiiri/agents.md ./agents.md`
   - `cp /home/tachiiri/architecture.md ./architecture.md`
   - `cp /home/tachiiri/claude.md ./claude.md`
   - `cp /home/tachiiri/principles.md ./principles.md`
2. Read `agents.md`
3. Read `architecture.md` (system topology)
4. Read `principles.md` (architectural principles and role perspectives)
5. Read `claude.md`
6. Fetch latest remote refs (`git fetch origin`) before branch/status decisions
7. Verify working tree is clean
8. Verify local `dev` alignment with `origin/dev`; if behind, fast-forward (`git checkout dev` then `git pull --ff-only origin dev`)
9. Read last 10 commit logs (prefer checking `origin/dev` after fetch)
10. Classify repository role by cross-referencing `architecture.md` (front / bff / gateway / adapter / electron / python / ops)
11. Ask human goals
12. Create a feature branch off up-to-date `dev` based on stated goals (e.g. feature/xxx, fix/xxx)
13. Execute the implement skill matching the repo role:
   - front / bff / gateway / adapter → `implement-ts`
   - electron → `implement-electron`
   - python → `implement-py`
   - ops → no implement skill (ops repo manages skills, not product code)

## Constrains

- run each Bash command separately, not as compound commands (e.g. `&&`)
- don't read codes
- don't change codes
- no authentication checks
- no tool installation
- don't start development work
- don't use npm
