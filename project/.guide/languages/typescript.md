# typescript.md

## Version Baseline

- TypeScript `^5.9.3`

## Use Cases

- TypeScript sources are compiled or typechecked
- TypeScript-authored runtime code is published
- TypeScript-authored library code is published

## Constraints

- Do not use `any` except at explicit external boundaries.
- Annotate exported function signatures with explicit types.
- Annotate stored values with explicit types when the intended domain type is not obvious from immediate initialization.
- Prefer type narrowing, discriminated unions, and schema-backed parsing over assertion-heavy flows.
- Keep boundary normalization explicit before values cross process, network, or persistence boundaries.
