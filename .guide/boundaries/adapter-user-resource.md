# adapter-user-resource.md

## Goals

- Keep adapter interactions with user-facing provider resources explicit, replay-safe, and idempotent.
- Preserve canonical internal operation meaning even when provider-specific events or resource actions are involved.
- Prevent repeated delivery from causing repeated external effects on user-facing resources.
- Ensure user-resource mutations are protected against replay and duplicate delivery.
- Ensure internal traces can correlate provider delivery identifiers with canonical internal operation identifiers.
- Ensure upstream layers receive canonical internal operations rather than provider-native event vocabulary.
- Ensure repeated external deliveries do not create repeated user-visible side effects.

## Qualities

- Keep user-facing provider quirks isolated inside the adapter for that service provider.
- Favor canonical internal operations over provider-native vocabulary so upstream products can stay consistent across providers.
- Minimize the blast radius of adding or replacing one service-provider adapter.

## Constraints

- Use provider event identifiers or equivalent delivery identifiers for duplicate suppression when user-resource changes originate from provider callbacks or delivery retries.
- Correlate provider event identifiers with internal request or correlation identifiers.
- Align webhook-triggered external effects on user-facing resources with idempotency and audit requirements.
- Do not leak provider-specific event vocabulary upstream when a canonical internal operation or event vocabulary exists.
- Do not allow webhook replay or duplicate delivery to trigger repeated side effects.
