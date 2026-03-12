---
name: setup-runtime-cloudflare-workers
description: Reconcile Cloudflare Workers runtime requirements and delivery automation for repositories that run on Workers.
---

# setup-runtime-cloudflare-workers command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Purpose

- Preferred runtime-module name for Workers setup under the `setup-<axis>-<name>` taxonomy.
- Owns Workers-specific bootstrap and baseline runtime tooling.
- Owns recommended tool composition for repositories adopting the Workers runtime.

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`

## Workflow

1. Read `principles/runtime/cloudflare-workers.md`
2. Read `profiles/runtime/cloudflare-workers.md`
3. Verify the repository is intended to run on Cloudflare Workers
4. Inspect Workers runtime state as `present`, `missing`, or `drifted`
5. Read `/home/tachiiri/.guide/recommended-versions.json` for the stored `wrangler` baseline when reconciling runtime dependencies
6. Run `.claude/scripts/bootstrap-worker.sh [TARGET_REPO_PATH]` only when required runtime files or scripts are missing or drifted
7. Apply the required tool modules listed above and collect their reported status
8. Ensure `package.json` exposes `bun run deploy:preview` and `bun run deploy:staging` for Worker preview and staging deploys
9. Ensure `scripts/deploy-preview.sh` and `scripts/deploy-staging.sh` exist and own the Worker-specific deploy commands
10. Ensure `scripts/github/upsert-pr-comment.py` exists for CI URL reporting
11. Ensure `.github/workflows/preview-pr.yml` exists and emits the `preview-pr` check on `pull_request` to `dev`
12. Ensure `.github/workflows/deploy-staging.yml` exists and deploys on `push` to `dev`
13. Ensure `.github/workflows/release-pr.yml` exists and maintains the release PR on `push` to `dev`
14. Ensure the repository exposes `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets required by the preview workflow
15. Reconcile GitHub repository policy for this runtime when safe:
   - ensure the repository is PR-based
   - ensure repo auto-merge is enabled
   - ensure `dev` branch protection requires the `preview-pr` check
16. Report `auto_merge_ready` only when the runtime can emit the `preview-pr` check, the Cloudflare secrets are present, and GitHub policy is aligned
17. Report the final runtime setup status so operators can summarize reconciliation across runtime and role steps
18. Keep Cloudflare-native service selection explicit rather than implied by Workers adoption
19. Run the repository's standard validation commands

## Applies To

- repositories adopting the Cloudflare Workers runtime

## Constraints

- Do not embed BFF-, gateway-, or adapter-specific behavior into this runtime command
- Do not imply adoption of D1, KV, R2, Queues, Durable Objects, or Workflows by Workers setup alone
- Do not move staging deploy execution into the `pr` workflow
- Do not use npm
- Treat this command as an internal setup module that may be called repeatedly
