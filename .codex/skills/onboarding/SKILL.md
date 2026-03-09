---
name: onboarding
description: "Run repository onboarding workflow: sync guidance files, inspect git state, classify role, and start feature branch."
---

# onboarding command

## Goals

- understand how to behave

## Steps

1. If running in Windows Terminal (`WT_SESSION` is set), set the current tab title to the repository name:
   - `printf '\033]0;%s\007' "$(basename "$PWD")"`
1. Copy root guidance files from `/home/tachiiri` into the current working directory:
   - `cp /home/tachiiri/agents.md ./agents.md`
   - `cp /home/tachiiri/architecture.md ./architecture.md`
   - `cp /home/tachiiri/claude.md ./claude.md`
   - `mkdir -p ./principles`
   - `cp -r /home/tachiiri/principles/. ./principles/.`
2. Read `agents.md`
3. Read `architecture.md` (system topology)
4. Read `principles/core.md`
5. Read `claude.md`
6. Fetch latest remote refs before branch/status decisions:
   - If the environment is sandboxed, run `git fetch origin` with escalated permissions from the start.
   - Do not retry the same remote Git command in the sandbox after a network-resolution failure.
7. Verify working tree is clean
8. Verify local `dev` alignment with `origin/dev`; if behind, fast-forward:
   - `git checkout dev`
   - If the environment is sandboxed, run `git pull --ff-only origin dev` with escalated permissions from the start.
9. Read last 10 commit logs (prefer checking `origin/dev` after fetch)
10. Classify repository role by cross-referencing `architecture.md` (front / bff / gateway / adapter / electron / python / ops)
11. Read the matching role-specific file under `principles/roles/` for the classified role
12. Ask human goals
13. Read the relevant domain document(s) under `principles/domains/` based on the stated goals
   - Read only the domain documents that constrain the intended change.
   - Use `principles/core.md` as the index for available domain documents.
   - Prefer deciding domain reads from the user goal before starting development work.
14. Create a feature branch off up-to-date `dev` based on stated goals (e.g. feature/xxx, fix/xxx)
15. Execute the implement skill matching the repo role:
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
