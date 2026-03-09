# adapter.md

- One adapter per external service provider.
- Absorb provider-specific API differences.
- Own the final authorization decision at the execution boundary.
- Apply provider-specific rate limiting.
- Handle retry, backoff, and circuit breaking.
- Normalize external data into gateway-facing canonical form.
