# data-classification.md

## Goals

- Keep data categories explicit so downstream handling rules do not rely on implicit assumptions.
- Let data classification drive the constraints applied to storage, propagation, retention, and redaction.

## Qualities

- Data categories stay semantically distinct across repositories and runtimes.
- Classification vocabulary stays stable enough to constrain downstream policies consistently.

## Constraints

- Use explicit data categories such as PII, billing, logs, and audit.
- Let category classification constrain persistence, propagation, retention, and redaction behavior.
- Keep data handling rules explicit by category rather than assuming one policy fits all data.
- Do not treat all data categories as equivalent.
- Do not let logs or derived systems bypass stricter handling classes.
