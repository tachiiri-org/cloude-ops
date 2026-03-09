# observability-and-trust.md

## Scope

- header trust boundary
- structured observability
- policy decision trace
- fault secrecy and internal explanation

## Principles

- Process headers with explicit allowlists and default drop; reject invalid syntax and ambiguous duplicates.
- Normalize and drop hop-by-hop headers consistently across boundaries before forwarding.
- Require structured observability with request correlation, operation identity, status, and latency at every boundary.
- Keep fault classification internal; do not expose policy rules or internal error details in user responses.
- Record policy decision traces internally with redaction, not full raw inputs.
- Require audit events for irreversible or external-effect operations.

## Logging Baseline

- Record request correlation.
- Record operation identity.
- Record status and latency.
- Keep detailed policy and fault explanation internal only.
- Apply redaction before storage or propagation.

## Prohibitions

- Do not forward ambiguous or invalid headers.
- Do not expose internal fault classes, rule identifiers, or policy details in user responses.
- Do not store full raw decision inputs in traces when redacted summaries are sufficient.
