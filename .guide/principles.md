# principles.md

## Context

- The repository family exists to operate many large-scale services as one coherent system.
- Each repository is a part of the overall system rather than an isolated product.
- Shared principles are written primarily for AI and automated systems, and secondarily for humans.
- Development assumes an AI-first workflow that lets a single developer operate at unusually low cost.
- The business context targets under-digitized domains with freemium adoption, organization-facing control surfaces, and premium features for loyal users.
- The primary source of product value is the author's distinct point of view and how it is reflected in the system.
- Shared principles must stay stable as the system grows across multiple repos, boundaries, and owners.
- Markdown files are the source of intent, scope, invariants, and prohibitions.

## Goals

- Sustain many large-scale services with low marginal development and operating cost.
- Reduce user cognitive load before adding feature breadth or internal complexity.
- Preserve and express the author's distinct point of view rather than flattening the system into generic patterns.
- Preserve value-free semantic guidance that stays reusable across repositories and boundaries.
- Keep shared guidance normative for semantic rules rather than concrete runtime values.
- Keep normative guidance separate from staging discussions.

## Qualities

- Optimize for AI-readable structure and low-token navigation.
- Prioritize loose coupling between modules.
- Divide files by single responsibility.
- Design for scalability from the start.

## Constraints

- Do not restate concern-specific rules here when a more specific guidance file already owns them.
- Do not place repository-specific values, schemas, catalogs, or lint details in shared principles.
- Keep section names consistent within the same guidance layer when a role-specific guidance file does not define a stricter rule.
