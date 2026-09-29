# CLAUDE.md

## Project
Security Assessment and Finding Management application.

This project manages security assessments, security findings, users, teams, departments, SLA rules, approvals, remediation, retesting, risk-register/deadline-extension requests, and closed-finding archive views.

## Source of truth
Before making implementation decisions, read:
- `docs/PROJECT_REQUIREMENTS.md`
- `docs/BUSINESS_PROCESS.md`
- `docs/ROLES_AND_PERMISSIONS.md`
- `docs/DATA_MODEL.md`
- `docs/UI_REQUIREMENTS.md`

If requirements conflict, do not silently choose a behavior. Identify the conflict and ask for clarification.

## Core business rules

### Roles
A user can have multiple roles:
- Admin
- Assessment Lead
- Assessment Lead Manager
- Team Manager
- Security Champion
- Risk Owner

### Assessment
Assessment ID format:
`SA-YY-NN`

Example:
`SA-26-01`

Assessment statuses:
- Draft
- Open
- Closed

Each Assessment has one assigned Assessment Lead. After assignment, any user who has the Assessment Lead role can create a Finding under the Assessment.

### Finding
Finding ID format:
`SA-YY-NN.FF`

Example:
- `SA-26-01.01`
- `SA-26-01.02`
- `SA-26-01.03`

Each Finding belongs to exactly one Assessment and exactly one Team.

Finding workflow:
`Draft -> Pending -> Open -> Retest -> Closed`

Returned workflow:
`Pending -> Returned -> Pending`

Retest workflow:
`Open -> Retest -> Closed`
or
`Retest -> Open`

Risk Register/deadline extension is a separate workflow state/request and must not unnecessarily replace the primary Finding lifecycle status.

### Finding approval
Assessment Lead submits a Finding for approval.
Assessment Lead Manager can:
- Approve: `Pending -> Open`
- Return: `Pending -> Returned`

Returned Findings have a dedicated screen where an Assessment Lead can edit, select, and resend them.

### Retest
Risk Owner performs remediation outside the application.
Risk Owner selects Retest.
Assessment Lead reviews:
- Close: `Retest -> Closed`
- Reopen: `Retest -> Open`

### Risk Register
Risk Owner can request a deadline extension by providing a requested date and comment.
Assessment Lead handles the request.
If extended, the Finding remains Open and the Current Deadline changes.
If cancelled/rejected, the Finding remains Open and the original deadline remains applicable.

Never overwrite the Original Deadline.

### SLA
Risk Severity values:
- Critical
- High
- Medium
- Low
- Info

Admin configures SLA duration for applicable severities.

Info:
- No deadline
- SLA Status = `No SLA`

Other severities:
- Deadline is calculated from Discovered Date using working days.
- Saturday and Sunday are excluded.

SLA Status values:
- No SLA
- Within SLA
- Nearing SLA
- Breached SLA

Nearing SLA means the Finding is within 3 days of its applicable deadline.
Breached SLA means the current date is after the applicable deadline.

The exact interpretation of the 3-day threshold (calendar vs working days) remains a business rule to confirm before final implementation.

## ID generation
The user-facing business IDs are separate from internal database primary keys.

Assessment:
`SA-YY-NN`

Finding:
`SA-YY-NN.FF`

Assessment numbering is sequential within a year. Finding numbering is sequential within its parent Assessment.

ID generation must be concurrency-safe; do not rely on a simple count of existing records.

## Development rules
- Do not invent missing business requirements.
- Do not invent unconfirmed Finding fields.
- Preserve existing functionality when modifying the application.
- Make small, understandable changes.
- Reuse existing components and logic.
- Keep business rules separate from presentation/UI logic.
- Enforce authorization in business/data logic, not only by hiding buttons.
- Never hard-code secrets.
- Do not make unrelated changes.
- Investigate root causes of errors rather than applying random fixes.
- Maintain auditability for important workflow changes.
- Validate required fields and business rules.
- Handle loading, empty, success, and error states.
- Before a major implementation, explain the plan and affected files.
- After implementation, verify the affected workflow.

The developer is using VS Code and Claude-assisted development and is not an experienced programmer. Explain technical changes clearly and incrementally.
