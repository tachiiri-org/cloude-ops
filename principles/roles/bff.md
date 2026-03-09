# bff.md

- One BFF per channel (pages, cli, api, mcp, etc.).
- Aggregate and transform data for the channel; adapter and gateway do not transform.
- Complete authentication at BFF; pass normalized principal to gateway.
- Apply channel-specific visibility control and early rejection.
- Do not rely on BFF permission decisions as authorization ground truth.
- BFF controls what is shown and passed; gateway controls what is allowed.
