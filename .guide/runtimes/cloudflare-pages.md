# cloudflare-pages.md

## Use Cases

- static frontend assets must be hosted on Cloudflare Pages
- preview and production frontend surfaces should be served from the Pages platform
- edge-rendered frontend execution is needed close to the browser-facing delivery path

## Constraints

- treat Pages as browser-facing infrastructure
- treat client input as untrusted by default
- keep assets separate from secrets
- keep assets separate from private credentials
- keep edge-rendered frontend code separate from secrets
- keep edge-rendered frontend code separate from private credentials
- keep cache behavior explicit for HTML responses
- keep cache behavior explicit for auth-sensitive responses
- keep cache behavior explicit for user-specific responses
- treat Pages bindings as a separate adoption decision
- treat redirects as a separate adoption decision
- treat middleware as a separate adoption decision
- treat edge-rendering features as a separate adoption decision
- fail closed when required identity configuration is missing
- fail closed when required API origin configuration is missing
- fail closed when required security-header configuration is missing
- do not let Pages adoption imply backend authorization behavior
- do not let Pages adoption imply private-service reachability
- do not let Pages adoption imply storage selection
