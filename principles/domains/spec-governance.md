# spec-governance.md

## Scope

- what belongs in shared semantic guidance and what does not
- non-goal taxonomy
- defaults and exception policy
- staging versus normative content

## Principles

- Use shared semantic guidance for vocabulary, responsibility boundaries, invariants, prohibitions, and compatibility principles.
- Keep concrete runtime values, provider catalogs, deployment-specific settings, schemas, and lint implementations outside the shared semantic layer.
- Treat shared guidance as value-free by default unless a value-free default policy explicitly requires otherwise.
- Keep normative guidance and staged exploration separate.
- Use staged documents for planned but non-normative work.
- Promote staged ideas explicitly into normative guidance with versioning and rollout policy when semantics change.
- Keep defaults explicit and exception-driven rather than relying on environment-specific behavior.
- Do not let environment differences redefine authz, tenant semantics, contract meaning, or other cross-cutting semantics.

## Non-goal Taxonomy

- Permanent non-goals
  - areas intentionally excluded from shared semantics
- Deferred-but-scoped
  - planned areas that must stay non-normative until promoted
- Out-of-scope implementation details
  - vendor choices, numeric thresholds, and concrete protocol or deployment details

## Defaults Baseline

- Default authn/authz split remains `401` versus `403`.
- Default identity source remains verified session or token context only.
- Default side-effecting operation policy remains explicit classification, idempotency, and audit.
- Default global-resource handling remains exception-only and explicit.
- Default status meanings must not be silently reclassified across boundaries.

## Tool-spec Boundary

- Shared semantic guidance defines what must be stable.
- Tool-spec or per-project repositories define concrete catalogs, schemas, boundary values, and machine enforcement.
- If a concept appears in both places, shared guidance owns the principle and the tool-spec layer owns the concrete configuration.

## Prohibitions

- Do not place concrete values, provider-specific sets, or implementation artifacts into the shared semantic layer.
- Do not treat staged content as normative by implication.
- Do not introduce silent semantic exceptions through environment-specific configuration.
- Do not remove or weaken shared prohibitions without explicit review and migration policy.
