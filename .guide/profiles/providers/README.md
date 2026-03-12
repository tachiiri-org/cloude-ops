# provider profiles

Provider profiles define concrete constraints for external services typically consumed through adapters.

## Scope

- provider-specific API and webhook constraints
- idempotency and retry implications specific to the provider
- provider-specific secret-handling and audit considerations
- canonicalization expectations needed before data crosses back upstream
- reusable concrete constraints for providers adopted across multiple repositories

## Typical Examples

- payment providers
- notification providers
- messaging providers
- AI providers
- search or storage providers

## Non-goals

- runtime-platform constraints
- provider-agnostic adapter responsibilities already owned by `principles/roles/adapter.md`
- repository-local operation and schema definitions

## Provider Profile Baseline

- Add a provider profile only after a concrete external provider is selected and its constraints are reusable across repositories.
- Keep provider-agnostic webhook, idempotency, billing, and adapter-boundary semantics in `principles/`.
- Keep provider-specific API details, webhook rules, and token-handling constraints in the corresponding profile under `profiles/providers/`.
- Keep repository-specific operation catalogs, event catalogs, schema details, and provider account values in repo-local specifications.
