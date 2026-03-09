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

- `release`
  - the semantic change unit for one or more coordinated contract changes
- `release_id`
  - the identifier used to correlate rollout, compatibility, and rollback decisions
- `compatible`
  - a change that preserves existing semantic interpretation
- `breaking`
  - a change that changes required inputs, interpretation, or accepted versions
- `dual-accept window`
  - a bounded period where multiple compatible versions may be accepted
- `claims_set_version`
  - the semantic version of the accepted identity claims set

## Compatibility Rules

- Compatible changes
  - may use explicit dual-accept windows
  - must keep old and new interpretation aligned during the window
- Breaking changes
  - require explicit release declaration
  - require explicit rollout strategy
  - must not rely on silent interpretation changes
  - must not assume dual-accept by default

## Claims Compatibility Baseline

- Keep accepted authorization claims explicit.
- Treat adding a new authorization-relevant claim as breaking unless versioned and rolled out explicitly.
- Require explicit `claims_set_version` governance where claims-set evolution is in scope.
- Do not mix observability or explanation-only data into authorization claims.
- Introduce delegation or impersonation claims only through versioned rollout.

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

## Prohibitions

- Do not expand accepted semantic inputs without versioning and rollout policy.
- Do not silently reinterpret existing fields, claims, or events.
- Do not mix staging content into normative guidance.
- Do not remove compatibility surfaces informally or only by implementation convention.
