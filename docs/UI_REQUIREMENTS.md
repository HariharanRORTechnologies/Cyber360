# UI Requirements — Preliminary

## General
The application must use role-aware navigation.

Users with multiple roles should see the functionality available to all their roles.

Unauthorized screens/actions must not be accessible merely by entering a direct route.

## Admin
Screens:
- Admin Dashboard
- Team Management
- Department Management
- User Management
- SLA Management
- Root Cause Management

## Assessment Lead
Screens:
- Assessment Lead Dashboard
- Assessments
- Create/Edit Assessment
- Assessment Details
- Finding Management
- Create/Edit Finding
- Pending Findings
- Returned Findings
- Retest Findings
- Risk Register Findings
- Nearing SLA Findings
- Breached SLA Findings
- Archive Findings

## Assessment Lead Manager
Screens:
- Manager Dashboard
- Assessments
- Assessment Details
- Pending Finding Approvals
- Finding Details
- Risk Register information only if required for visibility

## Team Manager
Screens:
- Team Dashboard
- Team Findings
- Nearing SLA
- Breached SLA
- Finding Details

## Security Champion
Screens:
- Security Champion Dashboard
- Team Findings
- Nearing SLA
- Breached SLA
- Finding Details
- Assign Risk Owner

## Risk Owner
Screens:
- Risk Owner Dashboard
- My Findings
- Team Findings
- Finding Details
- Retest action
- Risk Register request

## Finding UI
Finding ID and Parent Assessment ID must be clearly visible.

Finding forms should eventually be grouped into logical sections after the final Finding field list is confirmed.

Known Finding fields:
- Findings
- RiskSeverity
- DiscoveredDate
- Deadlinedate
- ActivityType
- Scope
- DoneByThirdParty
- RootCause
- SummaryDescription
- Recommendation
- Department
- Team
- SecurityChampion
- Attachments
- Comments

Do not finalize the complete form until all Finding fields are provided.

## SLA UI
Display:
- Severity
- Discovered Date
- Original Deadline
- Current Deadline
- SLA Status

SLA Status:
- No SLA
- Within SLA
- Nearing SLA
- Breached SLA

Info should display no deadline and No SLA.

## Returned Findings
Dedicated screen with:
- Finding list
- Selection
- Edit
- Resend for approval

## Retest Findings
Dedicated screen with:
- Finding list
- Finding details
- Close
- Reopen

## Risk Register
Dedicated screen with:
- Finding list
- Current/original deadline
- Request information
- Extension date
- Comments
- Assessment Lead action

## Finding Management
Support:
- Search
- Filter
- Sort
- Status filtering
- Severity filtering
- Team filtering
- Assessment filtering
- SLA filtering
- Export

## Archive
Show only Closed Findings.
Default to read-only.

## UX states
Every data-driven screen should account for:
- Loading
- Empty
- Error
- Success
- Validation
- Unauthorized access
- No search results
