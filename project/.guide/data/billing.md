# data-billing.md

## Goals

- Keep billing-sensitive data governed by semantics that support external effects, dispute handling, and auditability.
- Preserve billing-grade handling across persistence and observability surfaces.

## Qualities

- Monetary representation remains stable and lossless.
- Billing-supporting records stay aligned with the data needed for settlement and reversal workflows.

## Constraints

- Use integer minor units for money representation.
- Do not use floating-point values for monetary amounts.
- Require billing operations with external effects to use strong idempotency and audit alignment.
- Keep PCI and secret material out of logs and persistence and use tokenized references instead.
- Keep dispute, refund, reversal, and settlement-supporting data aligned with billing classification and audit-storage rules.
- Do not store raw payment secrets or sensitive authentication material.
