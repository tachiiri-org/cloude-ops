# cloudflare-workers.md

- Own `feature -> dev` delivery automation for repositories that run on Cloudflare Workers.
- Treat preview deployment, staging deployment, and release-PR maintenance as runtime concerns, not role concerns.
- Keep the required `dev` merge gate anchored on the runtime-owned preview workflow.
- Keep Cloudflare secret prerequisites explicit and runtime-owned.
- Do not let Workers adoption imply selection of Cloudflare-native services such as D1, KV, R2, Queues, Durable Objects, or Workflows.
- Let `setup-runtime-cloudflare-workers` own:
  - preview, staging, and release workflows
  - required check names
  - preview secret prerequisites
  - `dev` branch-protection and auto-merge readiness
