# gateway-adapter.md

## Goals

- Keep the gateway to adapter edge as the canonical internal execution boundary.
- Preserve identity, tenant, operation, and idempotency context through one normalized transport shape.
- Prevent transport shortcuts from replacing the declared shared contract.
- Ensure every gateway to adapter call uses the declared internal operation contract.
- Ensure authentication on this edge is represented only as verified bearer-token claims.
- Ensure identity-bearing custom headers, browser tokens, API keys, or mTLS-only shortcuts do not define the shared contract.
- Ensure upstream layers receive normalized boundary outcomes without raw adapter internals.

## Qualities

- Favor gateway-to-adapter contracts that remain stable as new service-provider adapters are introduced.
- Minimize provider-specific coupling at the gateway so one gateway can orchestrate many adapters without semantic sprawl.
- Keep adapters replaceable at the service-provider boundary without forcing upstream contract redesign.

## Constraints

- Gateway to adapter uses operation-based HTTP calls.
- Treat HTTP as a transport layer and keep business meaning in operations, catalogs, and schemas.
- Keep internal calls on declared operations only.
- Use `POST` for internal operation execution.
- Do not derive semantic action from HTTP method alone.
- Use `application/json` as the default internal content type.
- Reject invalid JSON, incompatible encodings, and undeclared contract versions on this boundary.
- Use explicit contract-version governance at this boundary.
- Keep routing implemented-only and catalog-driven.
- Require `bearer_token` as the single normative authentication method for this edge.
- Use verified bearer-token claims as the single normative transport shape for identity context on this edge.
- Normalize every supported authentication method into verified internal claims before it crosses an internal boundary.
- Keep a single establishment point per edge.
- Keep supported authentication method classes explicit at this edge rather than inferred from implementation convenience.
- Do not use `api_key`, `mtls`, or custom header fields as substitutes for canonical verified identity claims on this edge.
- Treat `mtls`, network provenance, and similar transport properties as optional hardening only, never as the shared identity contract.
- Do not publish or accept identity-related custom header transport on this edge.
- Normalize boundary errors rather than exposing raw adapter internals upstream.
- Keep adapter internals and provider-specific transport details out of BFF-facing responses.
- Do not let non-browser transport shortcuts weaken identity or contract semantics.
