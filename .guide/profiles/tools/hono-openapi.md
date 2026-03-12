# hono-openapi.md

Hono OpenAPI tool profile for repositories that expose HTTP APIs through Hono with OpenAPI-compatible contracts.

## Scope

- Hono-specific route and middleware composition constraints
- OpenAPI generation posture for Hono-based services
- typed client generation expectations for repositories that consume emitted specs

## Applies When

- A repository uses `hono`.
- A repository uses `@hono/zod-openapi`, `@hono/swagger-ui`, generated `openapi.json`, or typed clients derived from those artifacts.

## Baseline

- Keep semantic contract authority in `../../principles/domains/operations-and-delivery.md`.
- Keep compatibility posture in `../../principles/domains/compatibility-and-change.md`.
- Use this profile only for Hono- and OpenAPI-specific concrete expectations.

## Service Constraints

- Keep route declarations aligned with operation-catalog intent rather than ad hoc path-driven behavior.
- Generate one authoritative OpenAPI artifact from the implemented boundary shape.
- Keep schema definitions and emitted OpenAPI documents semantically aligned.
- Do not treat Swagger UI exposure as the contract authority; the generated OpenAPI artifact is the authority.

## Client Constraints

- Generate typed clients from the emitted OpenAPI artifact rather than duplicating request and response shapes manually.
- Keep generated client types version-aligned with the published OpenAPI artifact source.
- Make spec fetch source and emitted output paths explicit in repo-local scripts.

## Repo-local Requirements

- Each repository that adopts this profile must define:
  - the authoritative OpenAPI artifact path
  - the schema source of truth for route definitions
  - whether Swagger UI is exposed and under which environment conditions
  - the typed-client generation flow when clients are emitted or consumed

## Non-goals

- provider-specific API semantics
- repository-local route inventory
- frontend documentation presentation choices outside Swagger/OpenAPI exposure
