# data-audit.md

## Goals

- Keep audit data durable enough to support accountability for irreversible and external-effect operations.
- Preserve audit-specific storage and retention semantics independently from ordinary logs.

## Qualities

- Audit records remain trustworthy enough for reconciliation, replay analysis, and dispute handling.
- Audit storage behavior stays distinct from ordinary observability storage.

## Constraints

- Keep audit data durable enough to support irreversible and external-effect accountability.
- Keep audit retention policy explicit rather than inheriting ordinary log retention.
- Keep audit storage distinct from ordinary logs.
- Require at least append-only-equivalent expectations for audit storage.
- Keep redaction and storage constraints aligned with data classification.
- Keep concrete retention periods outside shared principles unless a cross-cutting semantic default is required.
