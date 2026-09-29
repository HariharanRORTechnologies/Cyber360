# Data Model — Preliminary

This is a preliminary model. Finalization must wait for the complete Finding field specification and confirmation of the data source architecture.

## Core entities

### Users
Represents application users.

Potential concepts:
- Internal ID
- Display Name
- Email
- Department
- Team
- Active/Inactive

### Roles
- Role ID
- Role Name

### UserRoles
Many-to-many relationship:
User <-> Role

### Departments
- Department ID
- Department Name
- Active/Inactive

### Teams
- Team ID
- Team Name
- Department
- Team Manager
- Security Champion(s)
- Active/Inactive

### Assessments
Core Assessment record.

Required concepts:
- Internal ID
- Assessment ID
- Assessment Status
- Assigned Assessment Lead
- Created By
- Created Date
- Modified By
- Modified Date

Assessment ID:
`SA-YY-NN`

Assessment has many Findings.

### Findings
Core Finding record.

Known fields from the current requirements:
- Internal ID
- Finding ID
- Parent Assessment
- Findings — Multiple lines of text
- RiskSeverity — Choice
- DiscoveredDate — Date and Time
- Deadlinedate — currently described as Single line of text; recommend changing to a real Date/DateTime field in the final model
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
- Finding Status
- Original Deadline
- Current Deadline
- SLA Days
- SLA Status
- Risk Owner
- Created By
- Created Date
- Modified By
- Modified Date

The final field list, field types, relationships, required flags and editability are not yet finalized.

### Severity/SLA Configuration
Stores Admin-managed SLA duration by severity.

Concepts:
- Severity
- SLA Working Days
- Active/Inactive
- Effective date/history if required

Info should represent no SLA.

### Root Causes
Admin-managed Root Cause master.

### Finding Approval History
Tracks:
- Finding
- Action
- Actor
- Date/time
- Comments
- Previous state
- New state

### Finding Status History
Tracks important status transitions and actor/time.

### Risk Register Requests
Tracks:
- Finding
- Requester
- Requested extension date
- Comment
- Request status
- Reviewed by
- Reviewed date
- Approved date if applicable
- Original deadline
- Resulting current deadline

## Project Details
The following fields were provided and appear related to Project/Assessment information:
- ProjectName
- ActivityType
- ProjectStatus
- ProjectUsage
- Scope
- Description
- AssessmentLead
- Thirdparty
- Environment
- AssessmentType

The relationship between Project and Assessment has not yet been finalized.

## Relationships

Department
-> many Teams

Team
-> many Users

User
-> many Roles

Role
-> many Users

Assessment
-> one assigned Assessment Lead

Assessment
-> many Findings

Finding
-> exactly one Assessment

Finding
-> exactly one Team

Finding
-> zero or one Risk Owner at a time

Finding
-> many history records

## Business IDs

Assessment:
`SA-YY-NN`

Finding:
`SA-YY-NN.FF`

Internal database primary keys must remain separate.

ID generation must be concurrency-safe and must not depend only on counting records.

## Archive
Do not create a separate physical archive data source by default. Use Finding Status = Closed and an Archive view unless requirements later demand physical archival.
