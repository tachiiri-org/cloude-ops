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

- Let shared guidance own vocabulary.
- Let shared guidance own responsibility boundaries.
- Let shared guidance own invariants.
- Let shared guidance own prohibitions.
- Let shared guidance own compatibility principles.
- Let shared guidance own value-free defaults.
- Let tool-spec or per-project repositories own concrete values.
- Let tool-spec or per-project repositories own concrete catalogs.
- Let tool-spec or per-project repositories own boundary configuration.
- Let tool-spec or per-project repositories own schemas and lint rules.
- Let tool-spec or per-project repositories own deployment-specific behavior.

## Normative and Informative Content

- Treat scope, principles, invariants, rules, and prohibitions as normative unless clearly marked otherwise in Markdown documents.
- Treat rationale, notes, examples, failure modes, and checklists as informative unless explicitly elevated in Markdown documents.
- Keep examples illustrative by default rather than contract-defining.
- Keep machine-enforced detail outside shared guidance unless the semantic principle itself requires it.

## Repository Layout Rules

- Keep `principles.md` limited to the cross-cutting summary and reading map.
- Use `data/*.md`, `identity/*.md`, `boundaries/*.md`, `operations/*.md`, and other top-level concern directories for cross-cutting semantic authority grouped by concern and topic.
- Use `roles/*.md` for operationalized role-facing constraints derived from shared concerns.
- Use `runtimes/*.md`, `providers/*.md`, `hosts/*.md`, and `tools/*.md` for reusable concrete constraints grouped by adoption surface.
- Treat `spec-migration-draft.md` as a migration planning aid rather than normative shared guidance.

## Tool-spec Repository Expectations

- Let tool-spec or per-project repositories carry topology as a concrete artifact.
- Let tool-spec or per-project repositories carry operation catalogs as a concrete artifact.
- Let tool-spec or per-project repositories carry event catalogs as a concrete artifact.
- Let tool-spec or per-project repositories carry boundary definitions as a concrete artifact.
- Let tool-spec or per-project repositories carry schemas as a concrete artifact.
- Let tool-spec or per-project repositories carry persistence, retention, and audit storage policy as a concrete artifact.
- Let tool-spec or per-project repositories carry lint and CI checks for cross-file invariants as a concrete artifact.
- Shared guidance states what those repositories must preserve semantically, not their concrete values.
- When shared guidance defines a canonical internal authentication method or identity transport shape, tool-spec or per-project repositories must publish matching OpenAPI security definitions, accepted parameters, and contract fields.

## Promotion and Staging Rules

- Staged or exploratory material must not become normative by implication.
- Promotion into shared guidance must be explicit.
- Classify staged findings before promotion into exactly one primary target.
- Use `shared semantic rule` as one allowed promotion target.
- Use `reusable concrete profile constraint` as one allowed promotion target.
- Use `repo-local specification detail` as one allowed promotion target.
- Declare the target concern or role document during promotion.
- Declare the compatibility impact during promotion.
- Declare rollout expectations when semantics change during promotion.
- Normative shared guidance must not depend on staging material.
- Prefer updating an existing concern or role document before creating a new shared-guidance file.
- Keep one logical promotion scoped to one topic boundary at a time.

## Promotion Targeting Baseline

- Promote to the appropriate top-level concern directory only when the rule is cross-cutting and provider-agnostic.
- Promote to `roles/*.md` only when the rule is about responsibility boundaries for a specific role.
- Promote to `runtimes/`, `providers/`, `hosts/`, or `tools/` only when the rule is a reusable concrete adoption constraint.
- Keep repository-specific values, composition choices, schemas, and environment bindings in repo-local specifications.
- Do not preserve staged inventory or workflow documents once their stable rules are absorbed by existing guidance.

## Non-goal Taxonomy

- Treat `Permanent non-goals` as areas intentionally excluded from shared semantics.
- Treat `Deferred-but-scoped` as planned areas that must stay non-normative until promoted.
- Treat `Out-of-scope implementation details` as vendor choices, numeric thresholds, protocol details, and packaging mechanics.

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
- Resolve org structure into explicit roles or scopes before the internal boundary when it affects authorization.
- Resolve org structure through adapter-side directory lookup with explicit failure semantics when it affects authorization.
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
