# setup-runtime-cloudflare-pages command

## Workflow

1. Read `profiles/runtime/cloudflare-pages.md`
2. Verify the repository is intended to run on Cloudflare Pages
3. Run `.claude/scripts/bootstrap-pages.sh [TARGET_REPO_PATH]`
4. Ensure baseline tooling and Pages runtime dependencies are present
5. Ensure `package.json` exposes `bun run deploy:staging` for Pages staging deploys
6. Ensure `scripts/deploy-staging.sh` exists and owns the Pages-specific staging deploy command
7. Ensure `.github/workflows/deploy-staging.yml` exists and deploys on `push` to `dev`
8. Add only the minimal Pages runtime scaffold required by the consuming role bundle
9. Keep Pages features and bindings explicit rather than implied by Pages adoption
10. Run the repository's standard validation commands

## Composes With

- `setup-role-front`

## Constraints

- Do not embed frontend business logic into this runtime command
- Do not imply non-essential Pages features by runtime setup alone
- Do not move staging deploy execution into the `pr` workflow
- Do not use npm
