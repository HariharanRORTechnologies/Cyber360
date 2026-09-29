# Business Process

## Assessment lifecycle

`Draft -> Open -> Closed`

### Create
Assessment Lead or Assessment Lead Manager can create an Assessment.

### Assignment
One Assessment Lead is assigned to an Assessment.

### Finding creation
After assignment, any Assessment Lead can create Findings under the Assessment.

### Closure
An Assessment can be Closed only when all Findings under it are Closed.

---

## Finding lifecycle

### Draft
Finding is being prepared.

### Pending
Finding has been submitted for Assessment Lead Manager approval.

### Returned
Assessment Lead Manager has returned the Finding for correction.

### Open
Finding has been approved and is ready for Team remediation.

### Retest
Risk Owner states that remediation is complete and requests verification.

### Closed
Assessment Lead has accepted the remediation.

---

## Finding approval flow

Assessment Lead:
1. Creates/edits Finding.
2. Completes required information.
3. Submits Finding.
4. Finding becomes Pending.

Assessment Lead Manager:
- Approve -> Open
- Return -> Returned

Assessment Lead:
1. Opens Returned Findings.
2. Selects a Finding.
3. Edits it.
4. Resends it.
5. Finding returns to Pending.

---

## Team and Risk Owner flow

Once approved:
1. Finding is Open.
2. Finding has exactly one assigned Team.
3. Security Champion can select an eligible Risk Owner.
4. Eligible Risk Owner must have the Risk Owner role and belong to the Finding's Team.
5. Risk Owner performs remediation outside the application.

---

## Retest flow

1. Risk Owner selects Retest.
2. Finding becomes Retest.
3. Assessment Lead reviews.
4. If acceptable: Close.
5. If not acceptable: Reopen.
6. Reopened Finding becomes Open again.

Multiple Retest cycles are allowed.

---

## Risk Register flow

1. Risk Owner selects Risk Register/deadline extension.
2. System displays date picker and comment.
3. Risk Owner submits request.
4. Assessment Lead reviews.
5. If approved, Finding remains Open and Current Deadline is extended.
6. Original Deadline remains stored unchanged.
7. If cancelled/rejected, Finding remains Open and original deadline applies.

---

## SLA flow

1. User selects Risk Severity.
2. System obtains configured SLA days for that severity.
3. If severity is Info, no deadline is calculated.
4. Otherwise, system calculates deadline from Discovered Date using working days.
5. Saturday and Sunday are excluded.
6. System determines SLA Status:
   - No SLA
   - Within SLA
   - Nearing SLA
   - Breached SLA

The final definition of the 3-day threshold and whether it uses calendar or working days must be confirmed before implementation.

---

## Archive flow

When Finding becomes Closed:
- It remains in the master Findings data source.
- Archive Findings view displays Closed Findings.
- Closed records should be read-only unless a later requirement says otherwise.
