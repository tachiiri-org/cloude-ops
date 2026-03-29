# hono-openapi.md

## Use Cases

- `hono` is used to expose HTTP APIs
- `@hono/zod-openapi` is used to define OpenAPI-compatible routes
- `@hono/swagger-ui` is used to expose Swagger UI
- generated OpenAPI artifacts are published or consumed
- typed clients are generated from emitted OpenAPI artifacts

## Constraints

- Keep route declarations aligned with operation-catalog intent.
- Do not let ad hoc path behavior define contract meaning.
- Generate one authoritative OpenAPI artifact from the implemented boundary shape.
- Keep schema definitions semantically aligned with emitted OpenAPI documents.
- Do not treat Swagger UI exposure as the contract authority.
- Treat the generated OpenAPI artifact as the contract authority.
- Generate typed clients from the emitted OpenAPI artifact.
- Do not duplicate request shapes manually when typed clients are generated.
- Do not duplicate response shapes manually when typed clients are generated.
- Keep generated client types version-aligned with the published OpenAPI artifact source.
- Make spec fetch sources explicit.
- Make emitted output paths explicit.
