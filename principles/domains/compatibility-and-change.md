# compatibility-and-change.md

## Scope

- release-level semantic change control
- contract and claims version acceptance
- deprecation and removal policy
- normative versus staging separation

## Principles

- Treat breaking changes as explicit release-level changes; do not introduce silent semantic breaks in schemas, claims, events, or boundaries.
- Use explicit version acceptance and rollout policy at internal boundaries; dual-accept is allowed for compatible changes, not for breaking ones.
- Require deprecation, grace period, and explicit removal for field, operation, event, and claim retirement.
- Keep constitutional semantics, operational semantics, interaction-edge rules, and staging discussions in distinct artifacts; do not let staging content become normative implicitly.

## Compatibility Rules

- Compatible change
  - may use explicit dual-accept windows
- Breaking change
  - requires explicit release-level declaration
  - requires explicit rollout strategy
  - must not rely on silent interpretation changes

## Prohibitions

- Do not remove fields, operations, events, or claims silently.
- Do not mix staging content into normative guidance.
- Do not expand accepted semantic inputs without versioning and rollout policy.
