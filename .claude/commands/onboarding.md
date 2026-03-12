# onboarding command

## Goals

- understand how to behave
- gather the minimum principle and profile context required for the intended work
- stop after project understanding; do not start setup or implementation work

## Steps

1. Sync root guidance files from `/home/tachiiri` into the current working directory only when the current repository is not `/home/tachiiri`:
   - Use the repository root files as the source of truth: `AGENTS.md`, `CLAUDE.md`, `architecture.mmd`, `principles/`, and `profiles/`
   - Never overwrite an existing repo-local guidance file without checking whether local customization must be preserved.
   - If a target file is missing, copy it from `/home/tachiiri`.
   - If the current working directory is `/home/tachiiri`, skip the copy step.
2. Read `AGENTS.md`
3. Read `architecture.mmd` (system topology)
4. Read `principles/core.md`
5. Read `profiles/core.md`
6. Read `CLAUDE.md`
7. Fetch latest remote refs before branch/status decisions:
   - If the environment is sandboxed, run `git fetch origin` with escalated permissions from the start.
   - Do not retry the same remote Git command in the sandbox after a network-resolution failure.
8. Verify working tree is clean
9. Verify local `dev` alignment with `origin/dev`; if behind, fast-forward:
   - `git checkout dev`
   - If the environment is sandboxed, run `git pull --ff-only origin dev` with escalated permissions from the start.
10. Read last 10 commit logs (prefer checking `origin/dev` after fetch)
11. Classify repository role by cross-referencing `architecture.mmd` (front / bff / gateway / adapter / electron / python / ops)
12. Classify repository runtime from explicit repo-local adoption, concrete runtime files, and role defaults:
   - front -> `cloudflare-pages`
   - bff / gateway / adapter -> `cloudflare-workers`
   - electron -> `electron`
   - python -> `python`
   - ops -> `ops`
13. Read the matching role-specific file under `principles/roles/` for the classified role
14. Read the matching runtime-specific file under `principles/runtime/` for the classified runtime
15. Ask human goals
16. Read the relevant domain document(s) under `principles/domains/` based on the stated goals
   - Read only the domain documents that constrain the intended change.
   - Use `principles/core.md` as the index for available domain documents.
   - Prefer deciding domain reads from the user goal before starting development work.
17. Select and read only the applicable profile document(s) after the role, runtime, and goal are known
   - Use `profiles/core.md` as the index for profile axes.
   - Use explicit repo-local adoption, task scope, and concrete runtime/config files before architecture-level defaults.
   - Read the matching file under `profiles/runtime/` for the classified runtime.
   - Read `profiles/identity/auth0.md` only when the repository directly terminates, exchanges, refreshes, initiates, or validates Auth0-issued credentials.
   - Read matching files under `profiles/providers/` only when the repository directly integrates with those providers, typically at the adapter boundary.
   - Do not infer identity or provider profiles from architecture alone.
18. Report the classified role and runtime explicitly to the human
19. If the stated goal is setup-related, stop after onboarding and recommend handling setup as a separate follow-up using the independently classified `setup-runtime-*` and `setup-role-*` commands
20. If the stated goal is implementation-related, stop after onboarding and hand off to the appropriate implementation workflow in a separate step
21. Recommend the next command(s) explicitly based on the classified role, runtime, and stated goal:
   - setup -> `setup-runtime-<runtime>` first, then `setup-role-<role>`
   - implementation -> `implement-ts` for front / bff / gateway / adapter, `implement-electron` for electron, `implement-py` for python, and no implement skill for ops
   - feature delivery to `dev` -> `pr` for all repositories
   - Cloudflare runtime delivery note -> for `cloudflare-pages` and `cloudflare-workers`, treat `pr` as the normal delivery entrypoint because CI owns preview publication and post-merge staging deploys; use `deploy-cloudflare` only for explicit manual staging verification outside the ordinary PR-driven flow
   - release governance -> `release` when the goal is to ensure or update the `dev` -> `main` release PR
   - artifact publishing -> `deploy-electron` for Electron release publishing, `deploy-py` for Python wheel publishing, and no generic deploy command for ops

## Constraints

- run each Bash command separately, not as compound commands (e.g. `&&`)
- don't read code before the guidance and workflow context is loaded
- don't change code
- don't overwrite repo-local guidance files blindly
- no authentication checks
- no tool installation
- don't start development work
- don't execute setup commands from onboarding
- don't execute deploy or release commands from onboarding
- don't use npm
