---
name: setup-runtime-cloudflare-workers
description: Reconcile Cloudflare Workers runtime requirements and delivery automation for repositories that run on Workers.
---

# setup-runtime-cloudflare-workers command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Purpose

- Preferred runtime-module name for Workers setup under the `setup-<axis>-<name>` taxonomy.
- Owns Workers-specific runtime tooling reconciliation.
- Owns recommended tool composition for repositories adopting the Workers runtime.

## Goal

- Reconcile the repository to the Cloudflare Workers runtime baseline defined by shared guidance.
- Use the matching files under `/home/tachiiri/project/.guide/tools/` as the authority for required runtime tooling and `/home/tachiiri/project/.guide/tools/wrangler.md` for the Wrangler version baseline.
- Reach a state where the required Workers files, scripts, workflows, and tool versions are present without relying on bootstrap scripts.

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`

## Workflow

1. Read `runtimes/cloudflare-workers.md`
3. Verify the repository is intended to run on Cloudflare Workers
4. Inspect Workers runtime state as `present`, `missing`, or `drifted`
5. Read `/home/tachiiri/project/.guide/tools/wrangler.md` for the stored `Wrangler` baseline when reconciling runtime dependencies
6. Reconcile required runtime files directly from the tracked templates when files or scripts are missing or drifted
7. Apply the required tool modules listed above and collect their reported status
8. Ensure `package.json` includes the `wrangler` version selected in `/home/tachiiri/project/.guide/tools/wrangler.md`
9. Ensure `package.json` exposes `bun run deploy:preview` and `bun run deploy:staging` for Worker preview and staging deploys
10. Ensure `scripts/deploy-preview.sh` and `scripts/deploy-staging.sh` exist and own the Worker-specific deploy commands
11. Ensure `scripts/github/upsert-pr-comment.py` exists for CI URL reporting
12. Ensure `.github/workflows/preview-pr.yml` exists and emits the `preview-pr` check on `pull_request` to `dev`
13. Ensure `.github/workflows/deploy-staging.yml` exists and deploys on `push` to `dev`
14. Ensure `.github/workflows/release-pr.yml` exists and maintains the release PR on `push` to `dev`
15. Ensure the repository exposes `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets required by the preview workflow
16. Reconcile GitHub repository policy for this runtime when safe:
   - ensure the repository is PR-based
   - ensure repo auto-merge is enabled
   - ensure `dev` branch protection requires the `preview-pr` check
17. Report `auto_merge_ready` only when the runtime can emit the `preview-pr` check, the Cloudflare secrets are present, and GitHub policy is aligned
18. Report the final runtime setup status so operators can summarize reconciliation across runtime and role steps
19. Keep Cloudflare-native service selection explicit rather than implied by Workers adoption
20. Run the repository's standard validation commands

## Runtime-owned Decisions

- Keep preview deployment, staging deployment, and release-PR maintenance explicit in this runtime module.
- Keep the required `dev` merge gate anchored on the runtime-owned preview workflow.
- Keep Cloudflare secret prerequisites explicit and runtime-owned.
- Use `bun run deploy:staging` as the normal staging deployment entrypoint.
- Do not deploy production with Wrangler directly.

## Repo-local Required Decisions

- selected Cloudflare-native services
- environment bindings
- storage and queue mappings
- observability export and retention configuration
- deployment topology and routing composition
- provider event and async-delivery semantics when queues, workflows, scheduled triggers, or webhooks are used
- the critical bindings and verification material that must fail closed when absent

## Applies To

- repositories adopting the Cloudflare Workers runtime

## Constraints

- Do not embed BFF-, gateway-, or adapter-specific behavior into this runtime command
- Do not imply adoption of D1, KV, R2, Queues, Durable Objects, or Workflows by Workers setup alone
- Do not move staging deploy execution into the `pr` workflow
- Do not use npm
- Do not rely on bootstrap scripts; reconcile from the relevant files under `tools/` and tracked templates directly
- Treat this command as an internal setup module that may be called repeatedly
