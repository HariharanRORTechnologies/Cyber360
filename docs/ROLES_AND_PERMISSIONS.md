# Roles and Permissions

Users can have multiple roles.

## Admin
Can:
- Manage Departments
- Manage Teams
- Manage Users
- Assign multiple roles to users
- Assign users to Teams
- Assign users to Departments
- Manage SLA configuration
- Manage Finding Root Causes

## Assessment Lead
Can:
- Create/Edit Assessments
- View authorized Assessments
- Create Findings under Assessments
- Edit Findings according to workflow
- Submit Findings for approval
- View/Edit/Select/Resend Returned Findings
- View Retest Findings
- Reopen or Close Retest Findings
- View Risk Register Findings
- Handle Risk Register extension/cancellation actions
- View Finding Management
- Export Finding data
- View Archive Findings

## Assessment Lead Manager
Can:
- Create/Edit Assessments
- View Assessments
- Assign the Assessment Lead
- View Findings
- View Pending Findings
- Approve Findings
- Return Findings

Cannot:
- Create Findings
- Edit Findings
- Perform Retest decisions
- Handle Risk Register actions

## Team Manager
Can:
- View Findings assigned to their Team
- View Nearing SLA Findings
- View Breached SLA Findings

Cannot:
- Perform Finding workflow actions

## Security Champion
Can:
- View Team Findings
- View Nearing SLA Findings
- View Breached SLA Findings
- View Finding details
- Assign an eligible Risk Owner
- Assign themselves as Risk Owner only if they also possess the Risk Owner role

Eligible Risk Owners:
- Must have the Risk Owner role
- Must belong to the Finding's Team

## Risk Owner
Can:
- View Findings assigned to them
- View Team Findings
- Self-assign eligible Findings
- Submit Findings for Retest
- Request Risk Register/deadline extension

Cannot:
- Assign another Risk Owner
- Approve their own extension request
- Close Findings
- Reopen Findings

## Multiple roles
Authorization must evaluate the complete set of roles assigned to the current user.

Do not model Role as a single-value User field.
