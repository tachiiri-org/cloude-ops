# bff-gateway.md

## Goals

- Keep the BFF to gateway edge as an internal operation boundary rather than an ad hoc HTTP surface.
- Forward only verified user intent and normalized principal context from the BFF.
- Keep browser-specific transport concerns out of gateway contracts.
- Ensure every BFF to gateway call maps to a declared internal operation.
- Ensure the boundary accepts only declared content types, contract versions, and normalized request shapes.
- Ensure browser cookies and browser-specific trust signals do not appear on gateway-facing requests.
- Ensure gateway-visible errors are normalized boundary outcomes rather than raw downstream transport details.

## Qualities

- Favor gateway contracts that stay stable as channel-specific BFFs are added, removed, or split by browser, CLI, or other client class.
- Minimize coupling between channel presentation concerns and internal operation contracts.
- Keep the single gateway reusable across multiple products and SaaS surfaces without channel-driven semantic drift.

## Constraints

- BFF to gateway uses operation-based HTTP calls.
- Treat HTTP as a transport layer and keep business meaning in operations, catalogs, and schemas.
- Keep internal calls on declared operations only.
- Use `POST` for internal operation execution.
- Do not derive semantic action from HTTP method alone.
- Use `application/json` as the default internal content type.
- Reject invalid JSON, incompatible encodings, and undeclared contract versions on this boundary.
- Use explicit contract-version governance at this boundary.
- Keep routing implemented-only and catalog-driven.
- Forward only verified principal context.
- Do not forward browser cookies downstream.
- Do not inject identity through `x-actor-*` style headers.
- Normalize boundary errors rather than exposing raw downstream internals.
- Keep core semantics such as tenant, actor, authorization, idempotency, and error meaning client-agnostic.
- Do not let browser-specific trust assumptions leak into this non-browser internal edge.
- Do not trust client-supplied request identifiers as authoritative across boundaries.
