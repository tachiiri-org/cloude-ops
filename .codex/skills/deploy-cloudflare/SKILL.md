---
name: deploy-cloudflare
description: Manually verify a Cloudflare runtime repository in staging outside the ordinary PR-driven delivery flow.
---

# deploy-cloudflare command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Steps

1. Read `governance/operations.md`
2. Read `compatibility/change.md`
3. Read `runtimes/cloudflare-workers.md` for Worker repositories or `runtimes/cloudflare-pages.md` for Pages repositories
4. Read the matching role document for the repository role
5. Confirm this is an explicit manual staging verification request rather than ordinary `feature` -> `dev` delivery
6. State that the normal delivery entrypoint for Cloudflare runtimes is `pr`, which lets CI publish preview URLs and perform the post-merge staging deploy
7. Verify the current branch is not `main`
8. Run `npx wrangler whoami` to confirm Cloudflare auth
9. Run `bun run deploy:staging` to deploy to staging
10. Output the deployed URL

## Constraints

- Don't deploy from the main branch
- Prefer `pr` for normal Cloudflare delivery to `dev`
- Don't use wrangler directly; use `bun run deploy:staging` only
- Don't deploy to production; staging only
