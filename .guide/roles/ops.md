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
- Keep each guidance document aligned with the format used by other documents at the same layer when practical.
- Keep Claude command surfaces and Codex skill surfaces aligned.
- Keep validation broad enough to catch broken shared templates, scripts, and configuration before merge to `dev`.
