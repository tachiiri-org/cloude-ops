# setup-runtime-cloudflare-pages command

## Goal

- Reconcile the repository to the Cloudflare Pages runtime baseline defined by shared guidance.
- Use the matching files under `/home/tachiiri/project/.guide/tools/` as the authority for required runtime tooling and `/home/tachiiri/project/.guide/tools/wrangler.md` for the Wrangler version baseline.
- Reach a state where the required Pages files, scripts, workflows, and tool versions are present without relying on bootstrap scripts.

## Tool Modules

- Required:
  - `setup-tool-bun`
  - `setup-tool-typescript`
  - `setup-tool-eslint`
  - `setup-tool-prettier`
  - `setup-tool-vitest`
- Optional:
  - `setup-tool-playwright`

## Workflow

1. Read `runtimes/cloudflare-pages.md`
3. Verify the repository is intended to run on Cloudflare Pages
4. Inspect Pages runtime state as `present`, `missing`, or `drifted`
5. Read `/home/tachiiri/project/.guide/tools/wrangler.md` for the stored `Wrangler` baseline when reconciling runtime dependencies
6. Reconcile required runtime files directly from the tracked templates when files or scripts are missing or drifted
7. Apply the required tool modules listed above and collect their reported status
8. Ensure `package.json` includes the `wrangler` version selected in `/home/tachiiri/project/.guide/tools/wrangler.md`
9. Ensure `package.json` exposes `bun run deploy:preview` and `bun run deploy:staging` for Pages preview and staging deploys
10. Ensure `scripts/deploy-preview.sh` and `scripts/deploy-staging.sh` exist and own the Pages-specific deploy commands
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
19. Keep Pages features and bindings explicit rather than implied by Pages adoption
20. Run the repository's standard validation commands

## Runtime-owned Decisions

- Keep preview deployment, staging deployment, and release-PR maintenance explicit in this runtime module.
- Keep the required `dev` merge gate anchored on the runtime-owned preview workflow.
- Keep Cloudflare secret prerequisites explicit and runtime-owned.
- Use `bun run deploy:staging` as the normal staging deployment entrypoint.
- Do not deploy production with Wrangler directly.

## Repo-local Required Decisions

- selected Pages features and bindings
- cache behavior by route class
- preview and production environment behavior
- frontend telemetry configuration
- API origin and BFF integration configuration
- the critical runtime configuration that must fail closed when absent

## Applies To

- repositories adopting the Cloudflare Pages runtime

## Constraints

- Do not embed frontend business logic into this runtime command
- Do not imply non-essential Pages features by runtime setup alone
- Do not move staging deploy execution into the `pr` workflow
- Do not use npm
- Do not rely on bootstrap scripts; reconcile from the relevant files under `tools/` and tracked templates directly
- Treat this command as an internal setup module that may be called repeatedly
