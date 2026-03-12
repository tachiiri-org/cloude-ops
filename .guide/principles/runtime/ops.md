# ops.md

- Own `feature -> dev` delivery automation for repositories that act as shared ops and guidance layers.
- Own pull-request-only merge policy and release-path governance for shared ops repositories.
- Treat shared validation workflows, required checks, and `dev` merge-gate policy as runtime concerns.
- Treat merge to `main` as the release path for shared guidance changes.
- Do not push directly to `main`.
- Use pull requests for all merges.
- Keep shared guidance authoring in `roles/ops.md`; runtime setup should own only the automation surface and merge gate.
- Let `setup-runtime-ops` own:
  - shared validation workflow definitions
  - the `validate-shared-ops` required check
  - `dev` branch-protection and auto-merge readiness
