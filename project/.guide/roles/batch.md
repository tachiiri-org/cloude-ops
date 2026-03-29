# batch.md

## Roles

- Act as a local processing engine.
- Accept calls exclusively from Electron.
- Handle batch processing tasks.
- Handle repo launcher tasks.
- Stream progress back to Electron through IPC.
- Stream progress back to Electron through stdio.

## Constraints

- Do not expose batch processing to the network.
- Do not expose batch processing to the gateway.
- Keep UI logic out of batch processing.
- Output data only.
- Output status only.
- Treat automated execution as service-style execution.
- Do not treat automated execution as human authorization context.
- Preserve initiator context only when audit attribution needs it.
- Preserve initiator context only when progress attribution needs it.
- Do not become a hidden policy authority.
- Do not become a hidden identity authority.
- Keep batch processing idempotent.
- Keep replay-style processing idempotent.
- Keep batch processing free of undeclared external effects.
- Keep replay-style processing free of undeclared external effects.
