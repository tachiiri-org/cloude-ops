# gateway.md

## Roles

- Accept requests per use case unit.
- Select one or more adapters to fulfill each use case.
- Apply coarse-grained policy checks and early rejection before side effects.
- Apply global-level rate limiting.
- Own the ordering and failure policy across multiple adapters.

## Constraints

- Do not transform data.
- Hold no provider-specific logic.
- Preserve verified identity, tenant, operation, and idempotency context across adapters.
- Treat operation catalogs and schemas as the authority for internal meaning.
- Normalize boundary errors.
- Do not expose raw adapter internals upstream.
- Preserve explicit contract-version and compatibility behavior across internal boundaries.
- Apply header allowlists consistently.
- Apply default-drop header processing consistently.
- Accept only declared operations.
- Accept only implemented routes.
- Enforce only coarse policy checks and declared early rejection.
- Do not replace adapter PDP decisions.
- Do not treat support or break-glass context as justification to bypass declared operations or normal downstream enforcement.
- Preserve event identity across retries, queues, and async boundaries.
- Preserve operation classification across retries, queues, and async boundaries.
- Preserve failure meaning across retries, queues, and async boundaries.
- Do not become the final record-level ownership authority.
- Do not become the provider-specific authorization authority.
- Do not complete idempotency.
- Do not infer semantic action from HTTP path alone.
- Do not infer semantic action from HTTP method alone.
