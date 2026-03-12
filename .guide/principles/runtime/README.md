# runtime principles

Runtime principles define reusable delivery and execution invariants that sit between role responsibilities and runtime-specific profiles.

## Scope

- delivery automation and merge-gate ownership
- execution-model invariants tied to a runtime family
- runtime-owned CI, deploy, and branch-policy expectations
- boundaries between runtime setup and role setup

## Non-goals

- role responsibilities owned by `../roles/`
- technology-specific concrete configuration values owned by `../../profiles/`
- provider-specific integration constraints

## Authoring Rules

- Keep runtime principles reusable across repositories that share one runtime.
- Let `setup-runtime-*` own auto-merge readiness, required checks, and delivery policy.
- Let `setup-role-*` own minimum scaffold and composition only.
- Keep runtime principles provider-agnostic; push concrete vendor detail into runtime profiles.
