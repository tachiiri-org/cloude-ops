# data-governance.md

## Scope

- data classification
- persistence and derived-storage handling
- deletion propagation
- residency and sovereignty constraints
- billing-grade data and audit-retention constraints

## Principles

- Keep data handling rules explicit by category rather than assuming one policy fits all data.
- Preserve ownership, classification, and residency semantics across primary storage and derived destinations.
- Keep deletion, restore, replay, analytics, and backup semantics aligned with tenant and audit guarantees.
- Keep concrete numeric retention and residency values outside shared principles; keep the vocabulary and constraints here.

## Data Classification Baseline

- Use explicit data categories such as PII, billing, logs, and audit.
- Let category classification constrain persistence, propagation, retention, and redaction behavior.
- Do not let logs or derived systems bypass stricter handling classes.

## Persistence and Propagation Baseline

- Preserve category and containment semantics across caches, indexes, analytics stores, logs, and backups.
- Keep deletion semantics explicit per propagation target rather than only at primary storage.
- Keep deletion propagation explicit across derived destinations.
- Keep restore behavior explicit per deletion mode and propagation target.
- Do not revive purged data silently during restore or replay.
- Make migration, reconciliation, and backfill behavior explicit before they touch persisted or derived data.
- Keep retention explicit by category; do not rely on implicit forever-retention.
- Require encryption at rest for PII and billing-sensitive persisted data.
- Do not persist secrets or raw authentication material in ordinary data stores.

## Residency and Sovereignty Baseline

- Treat residency as a tenant-level semantic constraint when applicable.
- Keep cross-region behavior explicit by data category.
- Keep residency propagation explicit for caches, analytics, backups, and restore paths.
- Do not let analytics, backup, or recovery paths violate residency constraints implicitly.
- Keep regional values and allowed-region lists in concrete configuration, not in shared principles.

## Billing-grade Data Baseline

- Use integer minor units for money representation.
- Do not use floating-point values for monetary amounts.
- Require billing operations with external effects to use strong idempotency and audit alignment.
- Keep PCI and secret material out of logs and persistence; use tokenized references instead.

## Audit Retention Baseline

- Keep audit data durable enough to support irreversible and external-effect accountability.
- Keep audit retention policy explicit rather than inheriting ordinary log retention.
- Keep audit storage distinct from ordinary logs.
- Require at least append-only-equivalent expectations for audit storage.
- Keep redaction and storage constraints aligned with data classification.
- Keep concrete retention periods outside shared principles unless a cross-cutting semantic default is required.

## Migration, Backfill, and Reconciliation Baseline

- Keep migration, backfill, and reconciliation tenant-scoped by default.
- Keep backfill and reconciliation re-runnable and idempotent.
- Do not let migration or backfill trigger external effects such as billing, webhook, or third-party API calls by default.
- Keep these operations identifiable in audit or structured logs.

## Prohibitions

- Do not treat all data categories as equivalent.
- Do not let derived systems bypass deletion, residency, or redaction constraints.
- Do not store raw payment secrets or sensitive authentication material.
- Do not use floating-point money representation.
- Do not let backup, restore, or analytics paths reintroduce deleted or disallowed data behavior.
