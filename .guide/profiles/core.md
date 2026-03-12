# core.md

Profiles define concrete technology- or provider-specific constraints that sit between shared semantics and repo-local specifications.

## Purpose

- Keep `principles/` provider-agnostic.
- Capture reusable concrete constraints for technologies and services used across multiple repositories.
- Avoid duplicating the same concrete service guidance in every repository.

## Reading Order

1. Read `../principles/core.md` first.
2. Read the role document under `../principles/roles/` that matches the repository role.
3. Read the runtime document under `../principles/runtime/` when the execution or delivery platform is known.
4. Read only the profile documents that apply to the technologies or services in use.
5. Read repo-local specifications after the relevant principles and profiles.

## Profile Axes

- `runtime/`
  - execution-platform profiles attached to one or more roles
  - examples: frontend hosting, worker runtime, desktop runtime
- `identity/`
  - identity-provider profiles for authentication establishment and claims handling
  - examples: Auth0, other OIDC-compatible identity services
- `providers/`
  - external service-provider profiles usually consumed through adapters
  - examples: payment, messaging, notification, AI, storage, search
- `tools/`
  - reusable framework, language-tooling, and packaging constraints
  - examples: TypeScript discipline, Hono OpenAPI surface, Electron packaging stack

## Boundary with Principles

- `principles/` own:
  - vocabulary
  - invariants
  - prohibitions
  - role boundaries
  - compatibility rules
- `profiles/` own:
  - service-specific constraints
  - provider-specific verification rules
  - runtime-specific operational considerations
  - technology-specific concrete expectations reused across repositories

## Boundary with Repo-local Specs

- `profiles/` should define reusable concrete constraints shared by multiple repositories.
- Repo-local specs should define:
  - repository purpose
  - repository-local terms
  - operation catalogs
  - schemas
  - repository-specific boundary values
  - repository-specific composition of profiles
- When a profile is adopted, repo-local specs should also define any concrete values that the profile intentionally leaves open, such as issuer lists, audience lists, claims mappings, storage choices, and lifecycle timings.

## Profile Targeting Baseline

- Use `runtime/` for concrete execution-platform constraints and platform-native service adoption rules.
- Use `identity/` for concrete identity-provider verification, claims-handling, and session constraints.
- Use `providers/` for concrete adapter-facing provider API, webhook, retry, and secret-handling constraints.
- Use `tools/` for reusable language, framework, schema-generation, and packaging-tool constraints.
- Keep reusable concrete constraints in profiles even when the underlying provider or runtime is optional.
- Do not keep reusable concrete constraints in staged drafts once a stable profile boundary exists.

## Authoring Rules

- Keep one profile focused on one technology family or one provider.
- Do not restate role responsibilities already owned by `principles/roles/` unless the profile adds a stricter concrete constraint.
- Do not restate domain semantics already owned by `principles/domains/` unless the profile makes the concrete implication explicit.
- Prefer adding or updating a profile before copying service-specific rules into multiple repositories.
- Keep profiles composable so that one repository can reference multiple profiles at once.
- Add a new profile when a concrete provider or runtime constraint becomes reusable across repositories.
- Do not leave reusable provider-specific constraints stranded in staged drafts once a stable profile boundary exists.
- Treat profile adoption as separate from platform-family or vendor-family selection; one does not imply all related sub-services are selected.
