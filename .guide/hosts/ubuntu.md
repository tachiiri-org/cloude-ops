# ubuntu.md

## Use Cases

- a repository runs local processing on Python
- a repository runs launcher workloads on Python
- a repository hosts a local Python engine behind a desktop application
- a repository uses GPU-backed local processing for heavy workloads
- a repository stores video assets locally
- a repository stores image assets locally

## Constraints

- Keep Python execution local-service style.
- Do not treat Python execution as browser-style execution.
- Do not treat Python execution as network-edge execution.
- Keep GPU-backed heavy processing explicit.
- Keep video storage explicit.
- Keep image storage explicit.
- Keep local-engine execution isolated from UI policy.
- Keep local-engine execution isolated from network-edge policy.
- Keep virtual-environment management explicit through the selected Python package-management tool.
- Keep entrypoints explicit.
- Keep package layout explicit.
- Keep tool configuration explicit.
- Do not infer entrypoints from incidental file layout.
- Do not infer package layout from incidental file layout.
- Do not infer tool configuration from incidental file layout.
