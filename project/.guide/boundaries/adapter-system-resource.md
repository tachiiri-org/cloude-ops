# adapter-system-resource.md

## Goals

- Keep adapter interactions with system-facing provider resources and callbacks explicit, verifiable, and bounded.
- Ensure provider-originated deliveries are accepted only through declared trust checks.
- Preserve canonical internal meaning when system-resource changes originate outside the platform.
- Ensure system-resource callbacks are rejected unless signature and replay checks pass.
- Ensure provider delivery identifiers are recorded and correlated with internal request context.
- Ensure duplicate or replayed system-resource deliveries do not create repeated side effects.
- Ensure upstream layers see canonical internal operations instead of raw provider callback vocabulary.

## Qualities

- Keep provider callback and trust semantics localized to the adapter that owns that service provider.
- Favor canonical internal meaning over propagation of provider-specific callback vocabulary.
- Minimize cross-provider coupling so changes in one external system do not force shared boundary redesign.

## Constraints

- Require signature verification for inbound webhooks and comparable provider callbacks.
- Require replay protection through timestamp and nonce or provider event identifiers.
- Use provider event identifiers or equivalent delivery identifiers for duplicate suppression.
- Correlate provider event identifiers with internal request or correlation identifiers.
- Align webhook-triggered external effects with idempotency and audit requirements.
- Do not leak provider-specific event vocabulary upstream when a canonical internal operation or event vocabulary exists.
- Do not accept unsigned or unverifiable webhooks.
- Do not allow webhook replay or duplicate delivery to trigger repeated side effects.
