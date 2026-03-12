# typescript.md

TypeScript tool profile for repositories that use TypeScript as an implementation language.

## Scope

- reusable typing constraints
- compiler-facing expectations
- type-safety posture shared across TypeScript repositories

## Applies When

- A repository compiles or typechecks TypeScript sources.
- A repository publishes TypeScript-authored runtime or library code.

## Baseline

- Keep architectural and domain semantics in `../../principles/`.
- Keep runtime-specific constraints in `../runtime/`.
- Use this profile only for TypeScript-specific implementation expectations.

## Typing Constraints

- Do not use `any` except at explicit external boundaries.
- Annotate exported function signatures with explicit types.
- Annotate stored values with explicit types when the intended domain type is not obvious from immediate initialization.
- Prefer type narrowing, discriminated unions, and schema-backed parsing over assertion-heavy flows.
- Keep boundary normalization explicit before values cross process, network, or persistence boundaries.

## Compiler and Repo-local Requirements

- Each repository that adopts this profile must define:
  - the authoritative `tsconfig` entrypoints
  - any intentionally allowed `any` boundaries
  - schema or validation tools used at external boundaries

## Non-goals

- formatter or linter version pinning
- repository-local script names
- framework-specific route or handler conventions
