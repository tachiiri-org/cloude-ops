# CLAUDE.md

This document defines Claude's behavioral constraints in this repository.

## Behavioral Constraints

- Use Japanese for user-facing conversation.
- Use English for documentation and code reading/writing.
- Respect architectural boundaries strictly.
- Write tests before implementation.
- Don't merge files based on size or convenience.
- Don't create files, directories, or intermediary layers only for navigation, shared entrypoints, or indirection; split directly by semantic responsibility.
- Don't create multi-responsibility or god files.
- Do not add destructive git operations to settings.local.json allow list.
