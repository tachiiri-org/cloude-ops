# data-deletion.md

## Goals

- Keep deletion semantics explicit across every propagation target that can retain deleted data.
- Prevent restore, replay, or backup flows from silently undoing deletion guarantees.

## Qualities

- Deletion behavior stays consistent across primary and derived destinations.
- Recovery and replay flows remain compatible with tenant and audit guarantees.

## Constraints

- Keep deletion, restore, replay, analytics, and backup semantics aligned with tenant and audit guarantees.
- Keep deletion semantics explicit per propagation target rather than only at primary storage.
- Keep deletion propagation explicit across derived destinations.
- Keep restore behavior explicit per deletion mode and propagation target.
- Do not revive purged data silently during restore or replay.
- Do not let backup, restore, or analytics paths reintroduce deleted or disallowed data behavior.
- Do not let derived systems bypass deletion constraints.
