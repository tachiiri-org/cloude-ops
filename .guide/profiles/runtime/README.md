# runtime profiles

Runtime profiles define concrete constraints for execution platforms assigned to one or more roles.

## Scope

- hosting and runtime capabilities
- platform-native service constraints
- secret and configuration handling relevant to the runtime
- runtime-specific observability, storage, and delivery considerations
- runtime-family adoption boundaries for platform-native sub-services

## Typical Examples

- Cloudflare Pages
- Cloudflare Workers
- Electron runtime
- Python local-engine runtime
- Ops shared-automation runtime

## Non-goals

- shared authorization semantics
- repository-local operation catalogs
- external provider integration details owned by adapter-facing provider profiles

## Runtime Adoption Baseline

- Selecting a runtime family does not select all platform-native stores, queues, caches, workflows, or observability products in that family.
- Treat each platform-native service as a separate adoption decision with its own data-handling and delivery implications.
- Keep selected runtime features explicit in repo-local specifications rather than inferring them from hosting choice alone.
- Require every selected runtime-native service to preserve tenant containment, identity, idempotency, audit, retention, and residency semantics from shared guidance.
