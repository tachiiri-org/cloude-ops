---
name: release
description: Ensure there is an open release PR from dev to main after verifying branch and remote state.
---

# release command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Goals

- Ensure there is a clear release-convergence path from `dev` to `main`.
- Keep release publication owned by the merge to `main`, not by this command itself.
- Make the expected post-merge production outcome explicit when the runtime publishes artifacts or updater metadata from `main`.

## Steps

1. Read `governance/operations.md`
2. Read `compatibility/change.md`
3. Verify current branch is `dev` (switch to dev if not)
4. Ensure `dev` is pushed to remote
5. Ensure there is an open PR from `dev` targeting `main`; create it only if it does not already exist
6. If the project is an Electron runtime repository, state that merge of this PR is expected to trigger `stable` channel artifact and updater-metadata publication through branch CI
7. Output PR URL

## Constraints

- Don't deploy
- Don't push directly to main
- Don't merge; only ensure the PR exists
- Don't claim that release artifacts are already published before merge to `main` has completed
