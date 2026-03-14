# foundations.md

Shared principles are written primarily for AI and automated systems, and secondarily for humans.
They preserve value-free semantic guidance that should stay stable as the system grows across multiple repos, boundaries, and owners.

## Architectural Principles

- Prioritize loose coupling between modules.
- Divide files by single responsibility.
- Design for scalability from the start.

## Cross-cutting Semantics

- Treat tenant as the top-level ownership scope.
- Keep actor types unambiguous across boundaries.
- Establish and propagate identity only through verified session or token claims.
- Evaluate authorization against stable operation semantics.
- Distinguish authentication failure (`401`) from authorization failure (`403`).
- Classify operations explicitly and require idempotency for side-effecting work.
- Keep internal API meaning anchored in operation catalogs and schemas.
- Make breaking semantic changes explicit, versioned, and rollout-governed.
- Enforce trust boundaries with header allowlists, redaction, and structured observability.
- Keep secrets, signing keys, and policy internals out of user-visible or repository-stored surfaces.
- Keep interaction-edge rules explicit per browser, client, HTTP, and webhook boundary.
- Keep data handling rules explicit across classification, persistence, deletion, residency, and billing-sensitive flows.
- Keep normative guidance separate from staging discussions.

## Document Semantics

- Markdown files are the source of intent, scope, invariants, and prohibitions.
- Shared guidance is normative for semantic rules, not for concrete runtime values.
- Concrete values, schemas, catalogs, and lint checks belong in tool-spec or per-project repositories.

## Authoring Rules

- Keep files under `roles/` free of duplicated shared semantics unless the role adds a stricter rule.
- Add dense cross-cutting semantics to the appropriate top-level concern directory such as `data/`, `identity/`, or `boundaries/`.
- Add new role-local guidance to the corresponding file under `roles/`.
- Add one file per language under `languages/` when language-specific guidance is required.
- Add one file per tool or tool stack under `tools/`; keep repo-local script names and paths out of tool profiles.
- Add one file per adopted external provider under `providers/`; keep environment-specific values out of provider profiles.
