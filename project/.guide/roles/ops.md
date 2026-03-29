# ops.md

## Roles

- Provide shared guidance and automation surfaces for Claude and Codex.
- Show concerns through directories.
- Show topics for each concern through files.
- Show the available concerns and topics through the file tree.

## Constraints

- Define desired state rather than procedure.
- Define instructions and prohibitions rather than recommendations.
- Write documentation as bullet points made of one sentence.
- Let each bullet give one instruction or one prohibition about one concern.
- Prefer one constraint per bullet.
- Describe required state directly.
- Describe runtime behavior directly.
- Use `Goals`, `Qualities`, and `Constraints` for shared normative guidance that applies across the concern rather than only at adoption time.
- Use `Use Cases` and `Constraints` only for adoption-profile guidance that helps decide whether to adopt a selectable technology, runtime, host, provider, language, tool, or boundary pattern.
- Do not use `Use Cases` for cross-cutting or concern-level normative guidance.
- Do not treat an existing document structure as a valid precedent when it conflicts with the applicable role guidance.
- Keep each guidance document aligned with the format required for its document type.
- Keep each guidance document limited to one concern rather than grouping multiple concerns under a broad governance label.
- Keep Claude command surfaces and Codex skill surfaces aligned.
- Keep validation broad enough to catch broken shared templates, scripts, and configuration before merge to `dev`.
