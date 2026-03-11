# deploy-cloudflare command

## Steps

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. Read `profiles/runtime/cloudflare-workers.md` for Worker repositories or `profiles/runtime/cloudflare-pages.md` for Pages repositories
4. Read the matching role document for the repository role
5. Verify the current branch is not `main`
6. Run `npx wrangler whoami` to confirm Cloudflare auth
7. Run `bun run deploy:staging` to deploy to staging
8. Output the deployed URL

## Constraints

- Don't deploy from the main branch
- Don't use wrangler directly; use `bun run deploy:staging` only
- Don't deploy to production; staging only
