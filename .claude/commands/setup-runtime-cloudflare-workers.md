# setup-runtime-cloudflare-workers command

## Purpose

- Preferred runtime-module name for Workers setup under the `setup-<axis>-<name>` taxonomy.
- Owns Workers-specific bootstrap and baseline runtime tooling.
- Composes with role bundles such as BFF, gateway, and adapter.

## Workflow

1. Read `profiles/runtime/cloudflare-workers.md`
2. Verify the repository is intended to run on Cloudflare Workers
3. Run `.claude/scripts/bootstrap-worker.sh [TARGET_REPO_PATH]`
4. Ensure baseline tooling and Worker runtime dependencies are present
5. Ensure `package.json` exposes `bun run deploy:staging` for Worker staging deploys
6. Ensure `scripts/deploy-staging.sh` exists and owns the Worker-specific staging deploy command
7. Ensure `.github/workflows/deploy-staging.yml` exists and deploys on `push` to `dev`
8. Add only the minimal Worker runtime scaffold required by the consuming role bundle
9. Keep Cloudflare-native service selection explicit rather than implied by Workers adoption
10. Run the repository's standard validation commands

## Composes With

- `setup-role-bff`
- `setup-role-gateway`
- `setup-role-adapter`

## Constraints

- Do not embed BFF-, gateway-, or adapter-specific behavior into this runtime command
- Do not imply adoption of D1, KV, R2, Queues, Durable Objects, or Workflows by Workers setup alone
- Do not move staging deploy execution into the `pr` workflow
- Do not use npm
