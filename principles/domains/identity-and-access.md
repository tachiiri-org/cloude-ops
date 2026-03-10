# identity-and-access.md

## Scope

- tenant, actor, subject, and initiator vocabulary
- identity establishment and transport boundaries
- authorization inputs and decision ownership
- delegation, claims, issuer, and key governance
- role and scope lifecycle constraints

## Identity Vocabulary

- `tenant`
  - top-level ownership boundary for tenant-scoped data and operations
- `tenant_id`
  - required for every tenant-scoped operation
  - interpret actor and subject identifiers only together with `tenant_id`
- `actor`
  - the executor used for authorization decisions
  - actor types are `human`, `service`, or `ops`
- `actor_id`
  - always present for authenticated internal calls
- `subject`
  - end-user human identity
  - allowed only for human actors
- `subject_id`
  - required when `actor_type=human`
  - forbidden for `service` and `ops` actors
- `initiator`
  - the triggering actor recorded for causality and audit only
  - never an authorization input

## Principles

- Treat `tenant_id` as mandatory for every tenant-scoped action; do not infer tenant context from headers, query params, or bodies.
- Use the executor actor as the only actor identity for authorization input.
- Keep actor types unambiguous across boundaries; do not collapse `service` or `ops` actors into human semantics.
- Establish browser identity only at the BFF boundary.
- Propagate internal identity only through verified session or token claims.
- Evaluate authorization against stable operation semantics, not transport details alone.
- Keep delegation, impersonation, and claims-set expansion explicit, versioned, and rollout-governed.
- Require explicit issuer allowlists, key-rotation overlap, and non-bypass verification behavior.
- Keep secrets and signing keys out of repositories; document only references, locators, and governance expectations.

## Boundary Rules

- Browser to BFF
  - browser requests do not establish identity on their own
  - reject browser-originated `authorization` headers by default
  - use the BFF as the browser authentication termination point
  - prefer a first-party BFF-managed session after browser login completion
  - BFF validates session state and normalizes principal context before internal calls
- BFF to gateway
  - forward only verified principal context
  - do not forward browser cookies downstream
  - do not inject identity through `x-actor-*` style headers
- Gateway to adapter
  - preserve verified identity context, operation identity, and tenant context
  - adapter owns the final execution-boundary authorization decision

## Policy Evaluation and Enforcement

- Keep the authorization policy decision point at the adapter boundary.
- Allow gateway and BFF to perform early rejection, but do not let them replace the final semantic decision.
- Keep policy enforcement separate from policy decision.
- Do not let upstream normalization erase the meaning of downstream denies or policy-type outcomes.

## Policy Type Baseline

- Use explicit policy types when policy decisions are surfaced internally.
- Keep at least these policy categories distinct:
  - `authz`
  - `rate`
  - `quota`
  - `budget`
  - `business`
- Do not reclassify one policy type into another at upstream boundaries.
- Preserve policy type, decision, and operation identity in internal observability when available.

## Authorization Inputs

- Allowed as authorization input
  - `tenant_id`
  - `actor_id`
  - `actor_type`
  - `subject_id` when present
  - `subject_type` when present
  - explicit roles and scopes from verified claims
- Forbidden as authorization input
  - `initiator_*`
  - `delegate_*`
  - delegated context fields used only for audit or constraints
  - email, display name, and other mutable profile attributes
  - browser-asserted identity
  - identity-like headers, query parameters, or request-body fields

## Minimum Verified Claims Baseline

- Require a normalized verified claims shape before identity crosses the BFF boundary.
- Require at least:
  - `tenant_id` for tenant-scoped operations
  - `actor_id`
  - `actor_type`
  - `subject_id` when `actor_type=human`
- Accept explicit roles and scopes from verified claims only when their meaning is stable and versioned.
- Treat provider-specific claim names and provider-local attributes as normalization inputs, not as internal contract fields.

## Async and Delegated Execution

- Async executors must be `service` or `ops` actors only.
- Preserve human origin through initiator fields rather than by treating humans as async executors.
- Do not silently mix delegated or impersonated context into existing authorization inputs.
- Introduce delegation or impersonation only with explicit vocabulary, compatibility strategy, and audit rules.

## Delegation and Impersonation Baseline

- Keep a single executor actor for each request even when delegation or impersonation exists.
- Treat initiator and delegate context as non-authorization context.
- Transport delegation context only in verified token claims, never through `x-*` headers, query params, or bodies.
- Keep accepted delegation-context shapes explicit through claims-set or contract-version strategy.
- Require expiry for delegation or impersonation.
- Require strong audit for any delegated or impersonated operation.
- Restrict impersonation to `service` or `ops` actors unless a stricter explicit design says otherwise.
- Do not allow multi-hop delegation chains by default.

## Role and Scope Baseline

- Keep role and scope meaning stable once introduced.
- Separate human-facing roles and scopes from `service` or `ops` roles and scopes.
- Do not assume hierarchy, inheritance, or implicit inference in shared semantics.
- Introduce new roles or scopes only with explicit purpose, actor type, and affected operations.
- Deprecate roles or scopes explicitly before removal.
- Require sunset expectations when retiring accepted roles or scopes.
- Allow roles and scopes from verified claims as upstream authorization input, but do not let them replace the final adapter-side authorization decision.

## Claims and Versioning Baseline

- Keep accepted authorization claims explicit.
- Treat addition of new authorization-relevant claims as breaking unless explicitly versioned and rolled out.
- Keep claims-set evolution explicit through compatibility policy.
- Do not mix observability-only explanation fields into authorization claims.

## Failure Semantics

- Return `401` for authentication failure.
- Return `403` for authorization failure.
- Do not expose detailed policy rules or internal evaluation reasoning in user-visible responses.

## Prohibitions

- Do not trust browser-asserted identity.
- Do not accept `x-actor-*` style identity injection.
- Do not accept delegation or impersonation context through unverified transport input.
- Do not use initiator fields as authorization input.
- Do not use delegate fields as authorization input.
- Do not add authorization-relevant claims silently.
- Do not store secret material or signing keys in repositories.
- Do not interpret actor or subject identifiers without tenant context.

## Issuer and Key Rotation Baseline

- Keep accepted issuers in explicit allowlists.
- Reject tokens from unlisted issuers with `401`.
- Validate expected audience or equivalent recipient binding before accepting a token.
- Require overlap periods during signing-key rotation.
- Keep JWKS or equivalent verification material cached with explicit expiry behavior.
- Make failure behavior explicit when verification material cannot be refreshed.
- Do not skip verification silently when issuer or key retrieval fails.
