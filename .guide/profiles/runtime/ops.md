# ops.md

Ops runtime profile for repositories that distribute shared guidance, setup workflows, and development automation across repositories.

## Scope

- shared automation-surface constraints for ops repositories
- concrete CI and validation expectations for shared guidance repositories
- branch-policy and merge-gate expectations for shared automation layers

## Applies When

- A repository primarily owns shared guidance, setup workflows, or delivery automation.
- A repository emits the `validate-shared-ops` check as its standard `dev` merge gate.

## Baseline

- Keep role responsibilities in `../../principles/roles/ops.md`.
- Keep runtime-owned delivery policy in `../../principles/runtime/ops.md`.
- Use this profile only for ops-runtime-specific concrete constraints.

## Runtime Constraints

- Keep mirrored command and skill surfaces synchronized.
- Keep validation broad enough to catch broken templates, scripts, and shared configuration before merge to `dev`.
- Keep required check names stable because downstream repos may rely on the shared guidance.

## Delivery Constraints

- Keep the validation workflow authoritative for `dev` branch protection.
- Do not treat manual spot checks as a substitute for the runtime-owned validation workflow.
- Keep auto-merge readiness tied to the `validate-shared-ops` check.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - mirrored automation surfaces that must stay in sync
  - tracked template families that the validation workflow must parse
  - shared configuration baselines that must remain machine-valid

## Non-goals

- product-runtime deploy semantics
- provider-specific integration policy
