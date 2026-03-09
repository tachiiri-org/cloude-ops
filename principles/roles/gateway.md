# gateway.md

- Accept requests per use case unit.
- Select one or more adapters to fulfill each use case.
- Apply coarse-grained policy checks and early rejection before side effects.
- Do not transform data.
- Hold no provider-specific logic.
- Apply global-level rate limiting.
- Own the ordering and failure policy across multiple adapters.
