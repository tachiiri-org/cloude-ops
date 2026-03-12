# python.md

- Own `feature -> dev` delivery automation for repositories that run as local Python engines.
- Treat validation workflows, required checks, and `dev` merge-gate policy as runtime concerns.
- Keep local-engine execution isolated from UI and network-edge policy; runtime setup does not expand repository role boundaries.
- Keep Python dependency sync, validation workflow, and merge-gate naming explicit rather than inferred from generic Python adoption.
- Let `setup-runtime-python` own:
  - Python validation workflow definitions
  - the `validate-python` required check
  - `dev` branch-protection and auto-merge readiness
