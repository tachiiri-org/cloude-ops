# compatibility-and-change.md

## Scope

- release-level semantic change control
- contract, event, schema, and claims version acceptance
- deprecation, grace, and removal policy
- normative versus staging separation

## Principles

- Treat breaking changes as explicit release-level changes; do not introduce silent semantic breaks in schemas, claims, events, or boundaries.
- Use explicit version acceptance and rollout policy at internal boundaries.
- Allow dual-accept windows only for compatible changes.
- Require deprecation, grace period, and explicit removal for fields, operations, events, and claims retirement.
- Keep constitutional semantics, operational semantics, interaction-edge rules, and staging discussions in distinct artifacts.

## Compatibility Vocabulary

- Define `release` as the semantic change unit for one or more coordinated contract changes.
- Define `release_id` as the identifier used to correlate rollout, compatibility, and rollback decisions.
- Define `compatible` as a change that preserves existing semantic interpretation.
- Define `breaking` as a change that changes required inputs, interpretation, or accepted versions.
- Define `dual-accept window` as a bounded period where multiple compatible versions may be accepted.
- Define `claims_set_version` as the semantic version of the accepted identity claims set.

## Compatibility Rules

- Let compatible changes use explicit dual-accept windows.
- Keep old and new interpretation aligned during a dual-accept window.
- Require explicit release declaration for breaking changes.
- Require explicit rollout strategy for breaking changes.
- Do not rely on silent interpretation changes for breaking changes.
- Do not assume dual-accept by default for breaking changes.

## Claims Compatibility Baseline

- Keep accepted authorization claims explicit.
- Treat adding a new authorization-relevant claim as breaking unless versioned and rolled out explicitly.
- Require explicit `claims_set_version` governance where claims-set evolution is in scope.
- Do not mix observability or explanation-only data into authorization claims.
- Introduce delegation or impersonation claims only through versioned rollout.
- Treat provider-driven changes to accepted issuer sets, audience interpretation, or claims mapping as compatibility-governed when they affect internal authorization input.
- Review identity-provider configuration changes against claims compatibility before rollout when they can change normalized internal claims.
- Treat replacing header-based internal identity transport with bearer-token claims as a breaking boundary change.

## Removal and Sunset Baseline

- Do not remove fields, operations, events, or claims silently.
- Follow `deprecated` to grace period to removal sequencing.
- Keep sunset timing explicit when retirement is planned.
- Reject expired compatibility surfaces only after the removal policy has been declared.

## Rollout and Rollback Baseline

- Keep accepted version ranges explicit per boundary.
- Keep rollout order explicit for coordinated boundary or event changes.
- Ensure rollback safety before release when state or external effects are involved.
- Declare rollback limits explicitly when full rollback is not possible.
- When retiring accepted identity inputs, declare the rejection point explicitly rather than relying on implicit emitter migration.

## Prohibitions

- Do not expand accepted semantic inputs without versioning and rollout policy.
- Do not silently reinterpret existing fields, claims, or events.
- Do not mix staging content into normative guidance.
- Do not remove compatibility surfaces informally or only by implementation convention.
- Do not keep retired identity-header compatibility alive after the release has declared bearer-token claims as the canonical boundary contract.
