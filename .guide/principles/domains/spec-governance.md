# spec-governance.md

## Scope

- what belongs in shared semantic guidance and what does not
- non-goal taxonomy
- normative versus informative content
- repository layout and promotion boundaries
- defaults and exception policy

## Principles

- Use shared semantic guidance for vocabulary, responsibility boundaries, invariants, prohibitions, and compatibility principles.
- Keep concrete runtime values, provider catalogs, deployment-specific settings, schemas, and lint implementations outside the shared semantic layer.
- Treat shared guidance as value-free by default unless a value-free default policy explicitly requires otherwise.
- Keep normative guidance and staged exploration separate.
- Use staged documents for planned but non-normative work.
- Promote staged ideas explicitly into normative guidance with versioning and rollout policy when semantics change.
- Keep defaults explicit and exception-driven rather than relying on environment-specific behavior.
- Do not let environment differences redefine authz, tenant semantics, contract meaning, or other cross-cutting semantics.

## Shared Semantic Boundary

- Shared guidance owns:
  - vocabulary
  - responsibility boundaries
  - invariants
  - prohibitions
  - compatibility principles
  - value-free defaults
- Tool-spec or per-project repositories own:
  - concrete values
  - concrete catalogs
  - boundary configuration
  - schemas and lint rules
  - deployment-specific behavior

## Normative and Informative Content

- In Markdown documents:
  - scope, principles, invariants, rules, and prohibitions are normative unless clearly marked otherwise
  - rationale, notes, examples, failure modes, and checklists are informative unless explicitly elevated
- Keep examples illustrative by default rather than contract-defining.
- Keep machine-enforced detail outside shared guidance unless the semantic principle itself requires it.

## Repository Layout Rules

- `core.md`
  - cross-cutting summary and reading map only
- `domains/*.md`
  - cross-cutting semantic authority grouped by domain
- `roles/*.md`
  - operationalized role-facing constraints derived from shared domains
- `spec-migration-draft.md`
  - migration planning aid, not normative shared guidance

## Tool-spec Repository Expectations

- Tool-spec or per-project repositories should carry concrete artifacts such as:
  - topology
  - operation catalogs
  - event catalogs
  - boundary definitions
  - schemas
  - persistence, retention, and audit storage policy
  - lint and CI checks for cross-file invariants
- Shared guidance states what those repositories must preserve semantically, not their concrete values.
- When shared guidance defines a canonical internal authentication method or identity transport shape, tool-spec or per-project repositories must publish matching OpenAPI security definitions, accepted parameters, and contract fields.

## Promotion and Staging Rules

- Staged or exploratory material must not become normative by implication.
- Promotion into shared guidance must be explicit.
- Classify staged findings before promotion into exactly one primary target:
  - shared semantic rule
  - reusable concrete profile constraint
  - repo-local specification detail
- Promotion must declare:
  - target domain or role document
  - compatibility impact
  - rollout expectations when semantics change
- Normative shared guidance must not depend on staging material.
- Prefer updating an existing domain or role document before creating a new shared-guidance file.
- Keep one logical promotion scoped to one topic boundary at a time.

## Promotion Targeting Baseline

- Promote to `domains/*.md` only when the rule is cross-cutting and provider-agnostic.
- Promote to `roles/*.md` only when the rule is about responsibility boundaries for a specific role.
- Promote to `profiles/` only when the rule is a reusable concrete runtime, identity-provider, provider, or tool constraint.
- Keep repository-specific values, composition choices, schemas, and environment bindings in repo-local specifications.
- Do not preserve staged inventory or workflow documents once their stable rules are absorbed by existing guidance.

## Non-goal Taxonomy

- Permanent non-goals
  - areas intentionally excluded from shared semantics
- Deferred-but-scoped
  - planned areas that must stay non-normative until promoted
- Out-of-scope implementation details
  - vendor choices, numeric thresholds, protocol details, and packaging mechanics

## Defaults Baseline

- Default authn/authz split remains `401` versus `403`.
- Default identity source remains verified session or token context only.
- Default side-effecting operation policy remains explicit classification, idempotency, and audit.
- Default global-resource handling remains exception-only and explicit.
- Default status meanings must not be silently reclassified across boundaries.
- Keep `tenant_id="__global__"` reserved for explicitly declared global resources only.
- Do not let environment differences or hidden defaults redefine the meaning of exceptions.

## Global-resource and Exception Baseline

- Treat global resources as explicit exceptions rather than fallback behavior.
- Permit `tenant_id="__global__"` only for explicitly declared global resources.
- Do not allow human actors to perform global writes by default.
- Keep exception introduction explicit by operation, domain, or contract-version.

## Organization and Directory Baseline

- Keep organization hierarchy, group, and team semantics tenant-scoped.
- Do not add organization structure such as `org_path` or `group_ids` directly to shared authorization input claims.
- If org structure affects authorization, resolve it either:
  - into explicit roles or scopes before the internal boundary, or
  - through adapter-side directory lookup with explicit failure semantics
- Keep directory lookup failure behavior explicit and fail closed by default.

## Tool-spec Boundary

- Shared semantic guidance defines what must be stable.
- Tool-spec or per-project repositories define concrete catalogs, schemas, boundary values, and machine enforcement.
- If a concept appears in both places, shared guidance owns the principle and the tool-spec layer owns the concrete configuration.
- Drift prevention should be enforced in tool-spec repositories through schema, lint, or CI checks rather than by expanding shared guidance with implementation detail.
- Published OpenAPI and runtime enforcement must correspond for authentication method, accepted identity inputs, and rejection posture at internal boundaries.

## Prohibitions

- Do not place concrete values, provider-specific sets, or implementation artifacts into the shared semantic layer.
- Do not treat staged content as normative by implication.
- Do not introduce silent semantic exceptions through environment-specific configuration.
- Do not remove or weaken shared prohibitions without explicit review and migration policy.
- Do not let one file become the authority for multiple unrelated responsibility boundaries.
- Do not pollute shared authorization claims with organization-directory structure.
