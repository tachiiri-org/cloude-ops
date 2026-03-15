# data-persistence.md

## Goals

- Preserve data-handling semantics across primary storage and derived destinations.
- Keep persistence decisions explicit for each storage target that can retain or expose data.

## Qualities

- Storage behavior remains aligned with data classification rather than storage-technology convenience.
- Derived storage stays governable with the same semantic guarantees as primary storage.

## Constraints

- Preserve ownership, classification, and residency semantics across primary storage and derived destinations.
- Preserve category and containment semantics across caches, indexes, analytics stores, logs, and backups.
- Keep retention explicit by category rather than relying on implicit forever-retention.
- Require encryption at rest for PII and billing-sensitive persisted data.
- Do not persist secrets or raw authentication material in ordinary data stores.
- When multiple observability backends are used, keep data-class-specific redaction, retention, and storage isolation explicit per destination.
