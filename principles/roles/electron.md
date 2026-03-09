# electron.md

- Renderer process follows front principles (UI only).
- Main process acts as local BFF: owns OS, file, and window management.
- Route cloud API calls through Cloudflare Gateway.
- Route local processing tasks to Python via IPC.
- Do not expose Python directly to renderer; mediate through main process.
