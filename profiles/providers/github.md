# github.md

GitHub provider profile for adapters that integrate with GitHub APIs, repositories, webhooks, or release surfaces.

## Scope

- GitHub API and webhook constraints
- repository, branch, and artifact access considerations
- token, app, and delivery behaviors tied to GitHub adoption

## Applies When

- An adapter reads from or writes to GitHub APIs.
- An adapter receives GitHub webhooks.
- An adapter depends on GitHub repositories, releases, or workflow artifacts as provider resources.

## Baseline

- Keep provider-agnostic adapter responsibilities in `../../principles/roles/adapter.md`.
- Keep webhook semantics in `../../principles/domains/interaction-edges.md`.
- Use this profile only for GitHub-specific concrete constraints.

## Provider Constraints

- Treat repository identity, installation identity, and actor identity as distinct concepts.
- Keep repository, owner, and branch targeting explicit rather than inferred from user-controlled input.
- Use explicit allowlists for repositories, owners, organizations, and webhook event types.
- Do not let GitHub user profile fields become authorization truth for internal actions.

## Authentication Constraints

- Prefer GitHub App or other scoped machine credentials over broad user tokens for server-side automation.
- Keep token scope minimal and purpose-specific.
- Do not reuse human interactive credentials for unattended adapter operations.

## Webhook Constraints

- Verify webhook signatures before processing.
- Use provider delivery identifiers for duplicate suppression.
- Keep event-type allowlists explicit.
- Treat webhook payload contents as untrusted until signature and event-type validation complete.

## Write-path Constraints

- Keep branch, ref, and repository selection explicit for write operations.
- Require idempotency and audit alignment for release, workflow-dispatch, or repository-mutating actions.
- Do not let user-visible names alone select privileged repository targets.

## Observability Constraints

- Record repository target, event type, provider delivery identity, and internal correlation identity.
- Redact tokens, installation credentials, and sensitive repository internals before storage or propagation.
- Keep provider error details normalized before they cross adapter boundaries.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - allowed repositories and owners
  - credential type and scope model
  - accepted webhook event types
  - branch and ref control rules
  - release or artifact handling behavior if applicable

## Non-goals

- generic git workflow rules owned elsewhere
- runtime-platform constraints
- repository-local operation catalogs or schema definitions
