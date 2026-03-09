# Principles Documents

This directory is the canonical home for shared architectural principles.

## Reading Order

1. Read `core.md`.
2. Read the role-specific document under `roles/` that matches the repository role:
   - `roles/front.md`
   - `roles/bff.md`
   - `roles/gateway.md`
   - `roles/adapter.md`
   - `roles/electron.md`
   - `roles/python.md`
   - `roles/ops.md`
3. Read domain documents under `domains/` as needed for the task scope:
   - `domains/identity-and-access.md`
   - `domains/operations-and-delivery.md`
   - `domains/compatibility-and-change.md`
   - `domains/observability-and-trust.md`
   - `domains/tenant-safety.md`
   - `domains/browser-boundary.md`
   - `domains/spec-governance.md`
   - `domains/ops-governance.md`
4. Use `../architecture.mmd` for topology context when needed.

## Responsibility Split

- `core.md`
  - shared architectural principles
  - cross-cutting semantic summary
  - reading map for `roles/` and `domains/`
- `domains/`
  - high-density cross-cutting semantics without role duplication
- `roles/`
  - role-specific responsibilities
  - role-specific prohibitions
  - how the role applies the shared core principles

## Authoring Rules

- Keep `core.md` free of role-specific implementation detail and use it as a navigation layer.
- Keep files under `roles/` free of duplicated core semantics unless the role adds a stricter rule.
- Add dense cross-cutting semantics to the appropriate file under `domains/`, then summarize them in `core.md`.
- Add new role-local guidance to the corresponding file under `roles/`.
