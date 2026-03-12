# google-drive.md

Google Drive provider profile for adapters that integrate with Google Drive file, folder, and sharing APIs.

## Scope

- Google Drive API constraints
- file, folder, and sharing behaviors tied to Drive adoption
- credential, ownership, and export considerations for Drive-backed integrations

## Applies When

- An adapter reads, writes, lists, moves, exports, or shares resources in Google Drive.

## Baseline

- Keep provider-agnostic adapter responsibilities in `../../principles/roles/adapter.md`.
- Keep data-governance semantics in `../../principles/domains/data-governance.md`.
- Use this profile only for Google Drive-specific concrete constraints.

## Provider Constraints

- Treat file identity, folder identity, and sharing identity as distinct concepts.
- Keep Drive parent-folder and shared-drive targeting explicit rather than inferred from human-readable names.
- Do not rely on display names or path-like assumptions as the primary identity for stored resources.
- Keep tenant containment explicit when multiple tenants can map to the same provider account or shared drive.

## Authentication Constraints

- Prefer scoped service credentials or delegated server-side credentials over end-user tokens for unattended adapter operations.
- Keep scope selection minimal and explicit.
- Do not persist raw refresh tokens, access tokens, or exported provider credentials in ordinary storage or logs.

## Access and Sharing Constraints

- Treat sharing settings as provider-side access mechanics, not as internal authorization truth.
- Re-check tenant and ownership constraints before issuing share, export, move, or delete operations.
- Keep public-link or broad-share behavior explicit and exception-driven.

## Content and Export Constraints

- Keep MIME-type handling explicit for upload, download, and export paths.
- Keep conversion and export behavior explicit when native Google formats are involved.
- Treat export-derived files as separate governed artifacts for retention and deletion purposes.

## Observability Constraints

- Record file identity, folder or drive target, operation identity, and internal correlation identity.
- Redact sensitive file names, share URLs, and credentials before persistence or propagation.
- Keep provider-specific error details normalized before they cross adapter boundaries.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - allowed drives, folders, or account scopes
  - credential model
  - sharing policy
  - MIME and export handling rules
  - deletion and retention behavior for provider-backed artifacts

## Non-goals

- identity-provider-specific rules
- runtime-platform constraints
- repository-local operation catalogs or schema definitions
