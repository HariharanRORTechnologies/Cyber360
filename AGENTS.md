# AGENTS.md

## Development guidance

This repository contains a Security Assessment and Finding Management application.

### Before coding
1. Read `CLAUDE.md`.
2. Read the relevant files under `docs/`.
3. Identify the business rule being implemented.
4. Identify affected data, UI, workflow, and permission areas.
5. Check whether the requirement is fully defined.

If a requirement is ambiguous, ask before making a business decision.

### Safe implementation
- Make the smallest appropriate change.
- Do not rewrite unrelated working code.
- Prefer reusable components/functions.
- Keep naming consistent.
- Keep validation close to the relevant business rule while avoiding duplication.
- Keep authorization separate from visual button visibility.
- Do not expose unauthorized records or actions through direct navigation or alternate routes.
- Do not hard-code credentials, tokens, connection strings, or secrets.

### Data and workflow
- Preserve internal database keys separately from business IDs.
- Assessment IDs and Finding IDs must be unique and concurrency-safe.
- Preserve Original Deadline when a Risk Register extension is approved.
- Maintain workflow/audit history for important status changes.
- Do not physically move closed Findings unless a later requirement explicitly requires it; the current design uses closed status for the archive view.
- Do not invent unconfirmed Finding fields or business rules.

### UI
- Make role-aware navigation.
- Respect role and record scope.
- Show clear status, SLA status, Assessment ID, and Finding ID.
- Provide clear validation and confirmation messages.
- Include loading, empty, and error states.
- Avoid unnecessary screens and duplicated forms.

### Testing
For every workflow feature, test:
- Happy path
- Unauthorized role
- Multiple-role user
- Missing required data
- Invalid data
- Status transition restrictions
- Duplicate/concurrent ID generation where applicable
- Error/retry behavior

### Documentation
When a business rule, data model, permission, or architecture decision changes:
1. Update the relevant document in `docs/`.
2. Add a meaningful entry to `docs/CHANGELOG.md`.
3. Then update implementation.

### Completion checklist
Before declaring a feature complete:
- Requirement implemented
- Permissions verified
- Validation verified
- Workflow/status transitions verified
- Error/empty/loading states verified
- Existing functionality checked
- Relevant documentation updated
