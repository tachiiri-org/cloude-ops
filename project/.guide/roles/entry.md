# entry.md

## Roles

- Own one entry per channel.
- Aggregate data for the channel.
- Transform data for the channel.
- Complete authentication at the entry boundary.
- Pass normalized principal context to the gateway.
- Apply channel-specific visibility control.
- Apply early rejection for the channel.

## Constraints

- Do not rely on entry permission decisions as authorization ground truth.
- Let the entry control what is shown.
- Let the entry control what is passed downstream.
- Let the gateway control what is allowed.
- Forward only verified principal context.
- Forward only operation identity.
- Forward only idempotency context.
- Validate idempotency keys for side-effecting operations.
- Forward idempotency keys for side-effecting operations.
- Do not complete idempotency.
- Preserve explicit contract-version behavior on internal boundaries.
- Keep browser-specific concerns at the entry edge.
- Keep browser-specific concerns out of gateway contracts.
- Keep browser-specific concerns out of adapter contracts.
