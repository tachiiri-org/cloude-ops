# Electron Baseline Template

## Goal

- Provide the baseline file shape that `setup-runtime-electron` reconciles into Electron repositories.
- Keep the runtime skeleton, smoke surface, and update-channel posture reusable across repositories.
- Keep the renderer structure opinionated enough to preserve the design basic form without turning the template into one product.
- Keep the selector tool separate from the reusable UI catalog assets.
- Let setup reconcile repository-local UI policy from `ui/*.json` seed documents.
- Let setup publish the first real N -> N+1 release path instead of leaving initial release backfill as manual follow-up work.

## Surfaces

- Treat `main`, `preload`, `shared`, and workflow files as the runtime baseline.
- Treat `bff`, `interaction`, `screen`, `layout`, `component`, `design`, and `contract` as renderer concern roots even when some start as placeholders.
- Treat `layout`, `component`, `design`, and `contract` as reusable catalog assets.
- Treat `tool/pattern-selector` as an optional setup aid for choosing or exporting UI policy.
- Treat `ui/*.json` as template-owned seed data that repositories can reconcile into their initial shell.

## Constraints

- Keep `renderer` untrusted; OS access and privileged behavior stay in `main` or narrow `preload`.
- Keep the visual baseline monochrome, flat, and simple unless the repository chooses otherwise.
- Avoid generic `types` buckets; keep types near the topic they belong to.
- Avoid mixing selector-only concerns into the reusable layout catalog.
- Do not treat mobile as a shrunk desktop layout; allow pattern-specific mobile variants.
- Do not depend on selector-local persistence for the baseline template contract.
