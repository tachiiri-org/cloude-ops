# ops.md

- Own `feature -> dev` delivery automation for repositories that act as shared ops and guidance layers.
- Treat shared validation workflows, required checks, and `dev` merge-gate policy as runtime concerns.
- Keep shared guidance authoring in `roles/ops.md`; runtime setup should own only the automation surface and merge gate.
- Let `setup-runtime-ops` own:
  - shared validation workflow definitions
  - the `validate-shared-ops` required check
  - `dev` branch-protection and auto-merge readiness
