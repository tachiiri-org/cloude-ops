---
name: pr
description: Prepare branch, commit, push, open a PR to dev, and report the expected staging URL for Cloudflare runtime repositories.
---

# pr command

## Steps

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. If the project is a Cloudflare runtime repository, read the matching runtime profile before checking release expectations
4. Create `.gitignore` if no `.gitignore` is committed
5. Create and switch to a feature branch if on `main` or `dev`
6. Stage unstaged files
7. Commit with detailed change description
8. Push branch to remote
9. Create PR targeting `dev` and output the URL
10. If the project is a Cloudflare Pages or Workers repository, output the staging URL that CI is expected to deploy after merge to `dev`; make it explicit that deployment has not completed yet

## Constraints

- don't commit with no `.gitignore`
- don't push to main branch directly
- don't push to dev branch directly
- don't run staging deploys from `pr`; Cloudflare staging deploys happen from CI on `push` to `dev`
- don't present the staging URL as already deployed when `pr` finishes
