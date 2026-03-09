# interaction-edges.md

## Scope

- HTTP contracts on internal boundaries
- webhook trust, replay safety, and duplicate delivery handling
- client-type distinctions
- authentication method classes at interaction edges

## HTTP Boundary Principles

- Treat HTTP as a transport layer; keep business meaning in operations, catalogs, and schemas.
- Keep internal calls on declared operations only.
- Use explicit contract-version governance at internal boundaries.
- Keep adapter internals and provider-specific transport details out of BFF-facing responses.

## Internal HTTP Baseline

- BFF to gateway and gateway to adapter use operation-based HTTP calls.
- Use `POST` for internal operation execution; do not derive semantic action from HTTP method alone.
- Use `application/json` as the default internal content type.
- Reject invalid JSON, incompatible encodings, and undeclared contract versions on internal boundaries.
- Keep routing implemented-only and catalog-driven.
- Normalize boundary errors rather than exposing raw downstream internals.

## Webhook Baseline

- Require signature verification for inbound webhooks.
- Require replay protection through timestamp and nonce or provider event identifiers.
- Use provider event identifiers or equivalent delivery identifiers for duplicate suppression.
- Correlate provider event identifiers with internal request or correlation identifiers.
- Align webhook-triggered external effects with idempotency and audit requirements.

## Client and Authn Method Baseline

- Keep assumptions explicit per client type such as browser, local app, CLI, or service caller.
- Do not let browser-specific trust assumptions leak into non-browser clients.
- Do not let non-browser transport shortcuts weaken identity or contract semantics.
- Keep supported authentication method classes explicit at each edge rather than inferred from implementation convenience.

## Client Type Baseline

- Keep at least these client classes explicit when they matter to shared semantics:
  - `browser`
  - `native_app`
  - `desktop_app`
  - `server_to_server`
- Keep core semantics such as tenant, actor, authorization, idempotency, and error meaning client-agnostic.
- Apply CSRF only to cookie-based browser boundaries by default.
- Apply CORS only to browser-facing boundaries by default.
- Treat request identifiers as trust-boundary-generated rather than client-trusted.
- Let the originator of a state-changing operation generate the idempotency key:
  - browser, native, and desktop clients may originate keys for user actions
  - service callers originate keys for server-to-server state changes

## Authentication Method Baseline

- Keep a single establishment point per edge.
- Normalize every supported method into verified internal claims before crossing internal boundaries.
- Keep at least these method classes explicit when introduced:
  - `cookie_session`
  - `bearer_token`
  - `api_key`
  - `mtls`
  - `device_context`
- Do not let API key or mTLS caller identity blur actor type semantics.
- Treat device context as context, not as an implicit actor or subject extension.
- Introduce new credential methods through explicit compatibility strategy when they affect accepted claims.

## Prohibitions

- Do not let internal routing drift away from declared operation catalogs.
- Do not treat HTTP path or method alone as the authority for semantic action.
- Do not accept unsigned or unverifiable webhooks.
- Do not allow webhook replay or duplicate delivery to trigger repeated side effects.
- Do not hardcode client-specific trust exceptions into shared semantics.
- Do not trust client-supplied request identifiers as authoritative across boundaries.
