# observability-and-trust.md

## Scope

- header trust boundary
- structured logging, metrics, and tracing
- policy decision trace
- audit and fault secrecy

## Principles

- Process headers with explicit allowlists and default drop.
- Normalize and drop hop-by-hop headers consistently across boundaries before forwarding.
- Reject invalid syntax and ambiguous duplicates rather than forwarding them.
- Require structured observability with request correlation, operation identity, status, and latency at every boundary.
- Keep fault classification internal; do not expose policy rules or internal error details in user responses.
- Record policy decision traces internally with redaction, not full raw inputs.
- Keep audit distinct from ordinary logs when irreversible or external-effect operations are involved.

## Header Pipeline Baseline

- Apply a consistent pipeline order:
  - normalize
  - hop-by-hop drop
  - explicit drop
  - explicit allow
  - default drop
- Lowercase header names before policy evaluation.
- Reject invalid header syntax with `400`.
- Reject ambiguous duplicates by default.
- Allow repeated `set-cookie` only within the emitter boundary that owns it.

## Logging Baseline

- Record request or correlation identity.
- Record operation identity.
- Record status and latency.
- Keep enough shared correlation fields across logs, traces, and audit records to reconstruct one operation flow even when backends differ.
- Keep detailed policy and fault explanation internal only.
- Apply redaction before storage or propagation.
- Keep error classification internal using controlled classes rather than user-visible raw internals.

## Metrics and Tracing Baseline

- Record success and failure counters.
- Record latency through bounded-cardinality histograms.
- Keep metrics labels to controlled sets such as operation and component.
- Do not use request identifiers, actor identifiers, subject identifiers, or idempotency keys as metrics labels.
- Preserve trace correlation across boundaries where tracing is supported.
- Keep sampling policy explicit and biased toward higher capture for error paths.

## Decision Trace Baseline

- Keep decision traces internal.
- The execution-boundary policy decision point should be the primary source of decision trace data.
- Record enough context to reconstruct allow or deny outcomes without storing full raw inputs.
- Include at least operation identity, tenant context, actor context, decision result, and policy reference when available.
- Keep decision traces redacted and compatible with audit correlation.

## Audit Baseline

- Require audit events for irreversible or external-effect operations.
- Keep audit retention and storage policy explicit.
- Do not assume ordinary logs are sufficient audit records.
- Do not assume platform-native telemetry or ephemeral logs satisfy audit durability requirements.
- Keep redaction and storage constraints aligned with data classification.

## Prohibitions

- Do not forward ambiguous or invalid headers.
- Do not expose internal fault classes, rule identifiers, or policy details in user responses.
- Do not store full raw decision inputs in traces when redacted summaries are sufficient.
- Do not let metrics cardinality explode through uncontrolled identifiers.
