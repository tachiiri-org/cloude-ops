# data-residency.md

## Goals

- Preserve residency and sovereignty semantics wherever data is stored, processed, restored, or recovered.
- Keep region-sensitive behavior explicit enough to enforce tenant-level residency promises.

## Qualities

- Residency rules stay attached to data semantics rather than specific storage products.
- Cross-region behavior remains explicit across primary and derived destinations.

## Constraints

- Treat residency as a tenant-level semantic constraint when applicable.
- Keep cross-region behavior explicit by data category.
- Keep residency propagation explicit for caches, analytics, backups, and restore paths.
- Do not let analytics, backup, or recovery paths violate residency constraints implicitly.
- Keep regional values and allowed-region lists in concrete configuration rather than shared principles.
- Do not let derived systems bypass residency constraints.
