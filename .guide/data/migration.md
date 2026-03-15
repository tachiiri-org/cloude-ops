# data-migration.md

## Goals

- Keep migration, backfill, and reconciliation behavior explicit before those operations touch stored or derived data.
- Preserve safe re-runnability and tenant scoping for bulk data-maintenance flows.

## Qualities

- Maintenance flows remain identifiable, replayable, and constrained by the same semantics as operational data handling.
- Data-maintenance work avoids accidental external effects by default.

## Constraints

- Make migration, reconciliation, and backfill behavior explicit before they touch persisted or derived data.
- Keep migration, backfill, and reconciliation tenant-scoped by default.
- Keep backfill and reconciliation re-runnable and idempotent.
- Do not let migration or backfill trigger external effects such as billing, webhook, or third-party API calls by default.
- Keep these operations identifiable in audit or structured logs.
