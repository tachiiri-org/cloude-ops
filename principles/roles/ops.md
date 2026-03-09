# ops.md

- Provide principles, CLAUDE.md, and skills as shared context for Claude and Codex.
- Define and maintain settings.json and command definitions.
- Update Claude commands and Codex skills together whenever either side changes.
- Own branch strategy (main / dev / feature) across repositories.
- Own release and deploy command definitions.
- Designed to be pulled into other repositories as a development standard layer.
- Keep release, rollback, abort, and emergency semantics explicit in shared guidance.
- Do not allow configuration or environment differences to redefine shared semantics silently.
- Keep incident-bound exceptions time-bounded, auditable, and removable.
- Keep packaging and distribution tooling separate from shared principle content.
- Keep compatibility windows, version acceptance, and sunset policy explicit when shared semantics evolve.
- Keep issuer allowlists, rotation overlap, and role/scope lifecycle governance explicit when identity semantics evolve.
- Keep support, break-glass, and emergency work operation-based and incident-bound.
- Do not normalize security or dependency incidents into ordinary release work.
- Keep retention, residency, restore, and audit-storage expectations explicit when data-handling semantics evolve.
- Keep global-resource exceptions and directory/org semantics explicit rather than letting them drift into hidden defaults.
- Keep disaster-recovery behavior tenant-safe, auditable, and semantically aligned with normal operation.
