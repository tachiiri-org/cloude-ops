# tool profiles

Tool profiles define reusable concrete constraints for language tooling, application frameworks, schema generation, and packaging stacks.

## Scope

- language-specific implementation constraints reused across repositories
- framework-specific contract and composition constraints
- schema-generation and client-generation stack expectations
- packaging and distribution tooling expectations reused across one or more runtimes

## Typical Examples

- TypeScript typing discipline
- Hono HTTP application stack
- OpenAPI generation and typed-client generation
- Electron packaging and update tooling

## Non-goals

- shared architectural semantics owned by `../../principles/`
- execution-platform constraints owned by `../runtime/`
- repository-local operation catalogs, route inventories, or package scripts

## Tool Adoption Baseline

- Select only the tool profiles a repository actually adopts.
- Do not infer framework or packaging choices from runtime selection alone.
- Keep repo-local script names, file layouts, and emitted artifact paths explicit even when the tool profile is adopted.
