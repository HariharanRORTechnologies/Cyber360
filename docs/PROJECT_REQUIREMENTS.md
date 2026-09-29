# Project Requirements

## 1. Purpose
Build a Security Assessment and Finding Management application for managing Assessments and the Findings identified under them.

## 2. Roles
- Admin
- Assessment Lead
- Assessment Lead Manager
- Team Manager
- Security Champion
- Risk Owner

Users can have multiple roles.

## 3. Assessment
Each Assessment has a unique business ID in the format:
`SA-YY-NN`

Example:
`SA-26-01`

`YY` is the two-digit current year.
`NN` is the sequential Assessment number for that year.

Assessment statuses:
- Draft
- Open
- Closed

Each Assessment has exactly one assigned Assessment Lead.

After an Assessment is assigned, any Assessment Lead can create a Finding under it.

## 4. Finding
Each Finding belongs to exactly one parent Assessment and one Team.

Finding ID:
`SA-YY-NN.FF`

Example:
- `SA-26-01.01`
- `SA-26-01.02`
- `SA-26-01.03`

Finding number is sequential within the parent Assessment.

Finding lifecycle:
- Draft
- Pending
- Returned
- Open
- Retest
- Closed

## 5. Finding approval
Assessment Lead submits Findings for approval.
Assessment Lead Manager:
- Approves: Pending -> Open
- Returns: Pending -> Returned

Returned Findings appear on a separate screen.
Assessment Lead can edit, select, and resend them.
Resend: Returned -> Pending.

## 6. Finding remediation
After approval, Finding becomes Open and is assigned to its Team.

Security Champion can assign an eligible Risk Owner.
Only users with the Risk Owner role can be selected.
The Risk Owner must be from the Finding's Team.

Risk Owner performs remediation outside the application.

## 7. Retest
Risk Owner selects Retest after remediation.
Assessment Lead reviews:
- Close: Retest -> Closed
- Reopen: Retest -> Open

Multiple Open/Retest cycles are allowed.

## 8. Risk Register
Risk Owner can request a deadline extension.
Request includes:
- Requested extension date
- Comment/justification

Assessment Lead handles the request.

Approved extension:
- Finding remains Open
- Current Deadline becomes the approved date
- Original Deadline is preserved

Cancelled/rejected request:
- Finding remains Open
- Original deadline remains applicable

## 9. SLA
Severity values:
- Critical
- High
- Medium
- Low
- Info

Admin configures SLA days by severity.

Info:
- No deadline
- SLA Status = No SLA

Other severities:
- Deadline calculated from Discovered Date using working days.
- Saturday and Sunday are excluded.

SLA Status:
- No SLA
- Within SLA
- Nearing SLA
- Breached SLA

Nearing SLA = within 3 days of the applicable deadline.
Breached SLA = current date is after the applicable deadline.

## 10. Archive
Closed Findings are shown in an Archive Findings view.
Current design recommendation: keep Findings in the same master data source and filter by Closed status rather than physically moving records.

## 11. Finding fields currently provided
- Findings — Multiple lines of text
- RiskSeverity — Choice
- DiscoveredDate — Date and Time
- Deadlinedate — Single line of text (existing source type; technical redesign may be recommended)
- ActivityType — Single line of text
- Scope — Single line of text
- DoneByThirdParty — Single line of text
- RootCause — Single line of text
- SummaryDescription — Multiple lines of text
- Recommendation — Single line of text
- Department — Single line of text
- Team — Single line of text
- SecurityChampion — Single line of text
- Attachments
- Comments

The final Finding field specification is not yet complete. Do not invent additional business fields.

## 12. Project/Assessment details currently provided
- ProjectName — Single line of text
- ActivityType — Single line of text
- ProjectStatus — Single line of text
- ProjectUsage — Single line of text
- Scope — Single line of text
- Description — Single line of text
- AssessmentLead — Single line of text
- Thirdparty — Single line of text
- Environment — Single line of text
- AssessmentType — Single line of text

These are currently described as Project Details. Their exact relationship to the Assessment data model should be confirmed before final implementation.

## 13. Important open decisions
- Exact data source/architecture
- Final Finding field list and data types
- Whether the 3-day Nearing SLA threshold uses calendar days or working days
- Whether Discovered Date counts as SLA day 1
- Exact Risk Register approval/cancellation terminology and history requirements
- Exact meaning and allowed values of the Project Details fields
