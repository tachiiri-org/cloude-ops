---
name: pr
description: Prepare branch, converge a feature PR to dev through auto-merge, and report the runtime-specific delivery outcome.
---

# pr command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Goal

- use one PR flow for `feature` -> `dev` across repositories
- converge the PR to merge when GitHub policy and repository state allow it
- delete merged feature branches after `dev` contains the change
- repair safe repository-local failures before giving up

## Steps

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. If the project is a Cloudflare runtime repository, read the matching runtime profile before checking release expectations
4. Create `.gitignore` if no `.gitignore` is committed
5. Create and switch to a feature branch if on `main` or `dev`
6. Stage unstaged files
7. Commit with detailed change description
8. Push branch to remote
9. Create or reuse the open PR targeting `dev` and output the URL
10. Determine the runtime-owned required check set for `feature` -> `dev`:
   - `cloudflare-pages` / `cloudflare-workers` -> `preview-pr`
   - `electron` -> `validate-electron`
   - `python` -> `validate-python`
   - `ops` -> `validate-shared-ops`
11. If the repository adopts auto-merge and the PR does not already have auto-merge enabled, enable it
12. If auto-merge is already enabled, confirm the current merge state and outstanding requirements
13. Wait for the PR to reach a terminal state:
   - merged
   - blocked on checks or reviews
   - blocked on repository or GitHub configuration
14. If checks fail, inspect the failing workflow or check output
15. If the failure is repository-local and safe to repair within the current task, fix it, recommit, push, and continue waiting
16. If the failure depends on secrets, permissions, external services, branch protection, or unclear product decisions, stop and report the blocker clearly
17. If the project is a Cloudflare Pages or Workers repository, state that `pr` is the normal delivery entrypoint for `feature` to `dev`
18. If the project is a Cloudflare Pages or Workers repository, state that CI will publish a preview URL on the PR before auto-merge completes
19. If the project is a Cloudflare Pages or Workers repository, output the staging URL that CI is expected to deploy after merge to `dev`; make it explicit that deployment has not completed yet until merge has actually completed
20. If the project is not a Cloudflare runtime repository, state that `pr` does not publish runtime artifacts by itself unless the runtime-specific merge flow explicitly does so
21. After the PR has merged, delete the remote feature branch if it still exists
22. After the PR has merged, switch away from the merged local feature branch to `dev` when needed
23. After switching away, delete the merged local feature branch
24. If the merge strategy rewrote commit identity, verify `dev..feature` and `feature..dev` are empty before force-deleting the local feature branch
25. Finish only when one of the following is true:
   - the PR has merged
   - the PR is blocked by a non-repairable external condition that has been reported with evidence

## Constraints

- don't commit with no `.gitignore`
- don't push to main branch directly
- don't push to dev branch directly
- don't create duplicate PRs for the same head and base when an open one already exists
- don't run preview or staging deploys from `pr`; CI handles them for the roles that adopt those gates
- for Cloudflare runtimes, treat `pr` as the normal delivery path to `dev`
- don't disable manual review or branch-protection requirements
- don't present the staging URL as already deployed before merge has completed
- don't delete a branch before the PR has actually merged
- don't delete a local branch while it is still checked out; switch to `dev` first
- don't force-delete a local branch unless the PR has merged and `dev..feature` and `feature..dev` are both empty
- do bounded waiting and bounded self-repair; if the same failure repeats without progress, stop and report it
- only self-repair repository-local failures that are safe and within the current task scope

## Hints

- keep state-changing git operations sequential rather than parallel
- don't run branch-switching, merging, rebasing, or branch deletion in parallel with other git commands
- don't run staging commands in parallel with staged-state verification
- use parallelism only for independent read-only checks such as document reads, status inspection, and GitHub state queries
- if repository or GitHub settings do not allow enabling auto-merge, treat that as a configuration fact and converge with a normal merge after required checks pass
