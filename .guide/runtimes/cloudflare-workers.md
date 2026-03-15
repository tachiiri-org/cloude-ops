# cloudflare-workers.md

## Use Cases

- a BFF, gateway, or adapter must execute as a request-scoped edge service
- the repository needs Cloudflare-managed bindings for secrets or selected platform-native services
- provider-facing or browser-adjacent logic should run without assuming a long-lived server process

## Constraints

- keep runtime assumptions explicit
- treat execution as request-scoped by default
- treat execution as stateless by default unless a selected Workers feature provides state semantics
- define persistent state only through selected platform features
- keep internal HTTP contracts independent of Cloudflare-specific routing details
- keep internal HTTP contracts independent of Cloudflare-specific header details
- treat D1 as a separate adoption decision
- treat KV as a separate adoption decision
- treat R2 as a separate adoption decision
- treat Queues as a separate adoption decision
- treat Durable Objects as a separate adoption decision
- treat Workflows as a separate adoption decision
- treat scheduled triggers as a separate adoption decision
- fail closed when required bindings are unavailable
- fail closed when required secrets are unavailable
- fail closed when required verification material is unavailable
- do not let Workers adoption choose storage automatically
- do not let Workers adoption choose queueing automatically
- do not let Workers adoption choose workflow primitives automatically
