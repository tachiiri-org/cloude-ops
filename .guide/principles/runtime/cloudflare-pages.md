# cloudflare-pages.md

- Own `feature -> dev` delivery automation for frontend repositories that run on Cloudflare Pages.
- Treat preview deployment, staging deployment, and release-PR maintenance as runtime concerns, not role concerns.
- Keep the required `dev` merge gate anchored on the runtime-owned preview workflow.
- Keep Cloudflare secret prerequisites explicit and runtime-owned.
- Expose staging deployment through `bun run deploy:staging`.
- Run staging deployment from CI on push to `dev`.
- Do not deploy production with Wrangler directly.
- Do not let Pages adoption imply selection of backend authorization, provider, or storage policy.
- Let `setup-runtime-cloudflare-pages` own:
  - preview, staging, and release workflows
  - required check names
  - preview secret prerequisites
  - `dev` branch-protection and auto-merge readiness
