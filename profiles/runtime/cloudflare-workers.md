# cloudflare-workers.md

Cloudflare Workers runtime profile for repositories and services that run BFF, gateway, or adapter workloads on Workers.

## Scope

- runtime constraints specific to Cloudflare Workers
- platform-native service considerations attached to Workers adoption
- operational implications for identity, observability, storage, and delivery when Workers are used

## Applies When

- A repository role runs on Cloudflare Workers.
- A repository uses Cloudflare-native capabilities attached to the Workers runtime.

## Baseline

- Keep provider-agnostic semantics in `../../principles/core.md` and `../../principles/domains/*.md`.
- Keep role responsibilities in `../../principles/roles/`.
- Use this profile only for Workers-specific concrete constraints.

## Runtime Constraints

- Keep runtime assumptions explicit rather than relying on Node-specific behavior.
- Do not assume unrestricted filesystem access, long-lived process state, or in-memory durability across requests.
- Treat per-request execution as stateless by default unless a selected platform feature explicitly provides state semantics.
- Keep secrets in Cloudflare-managed secret or configuration facilities rather than repository storage.
- Keep environment differences explicit; do not let deployment defaults redefine shared semantics.

## Boundary Constraints

- Preserve request correlation, operation identity, and normalized principal context across Worker boundaries.
- Do not let platform-specific headers or metadata become authorization input unless explicitly normalized and allowed by shared principles.
- Keep internal HTTP contracts independent of Cloudflare-specific routing details.

## Platform-native Services

- Treat Cloudflare-native stores, caches, queues, workflows, and analytics features as separate adoption decisions.
- Do not infer selection of D1, KV, R2, Queues, Durable Objects, or Workflows from Workers adoption alone.
- Evaluate each selected service against tenant containment, idempotency, audit, redaction, retention, and residency constraints.
- Keep service-to-data-class mappings explicit when platform-native storage or telemetry is used.
- Keep queue, workflow, and scheduled-trigger usage rules explicit rather than deriving async semantics from platform defaults.

## Observability Constraints

- Export or retain enough structured observability to satisfy shared correlation and audit semantics.
- Do not assume platform-native logs alone satisfy audit durability requirements.
- Keep ordinary logs and audit storage distinct when irreversible or external-effect operations are involved.
- Apply redaction before persistence or export.
- Keep concrete log export, metrics backend, and trace backend choices in repo-local specifications.

## Delivery and Async Constraints

- Keep retries, duplicate delivery handling, and idempotency explicit when Workers are combined with queues, workflows, scheduled triggers, or webhooks.
- Do not rely on transport retries alone for exactly-once-effect semantics.
- Keep provider event identifiers and internal correlation identifiers distinct.

## Security Constraints

- Keep outbound credentials and provider secrets out of code and static assets.
- Use explicit allowlists for accepted issuers, origins, headers, and downstream destinations where applicable.
- Fail closed when verification material, required configuration, or critical bindings are unavailable.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - selected Cloudflare-native services
  - environment bindings
  - storage and queue mappings
  - observability export and retention configuration
  - deployment topology and routing composition

## Non-goals

- provider-specific adapter constraints
- identity-provider-specific token rules
- repository-local schemas or operation catalogs
