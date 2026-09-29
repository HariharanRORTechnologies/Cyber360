# Finding Management Page Design

## Overview
The Finding Management page is the primary interface for viewing, filtering, and managing security findings in the Cyber360 platform. It displays a comprehensive list of findings with their details, status, SLA information, and risk assessment data.

## Layout Structure

### Header Section
- **Page Title**: "Finding Management"
- **Status Badge**: Shows "9 Active Records" (indicates filtered/active findings count)
- **Export Button**: "Export CSV" - allows downloading findings data
- **Refresh Icon**: Manual refresh trigger
- **User Profile**: Avatar with "RiskOwner" label (top-right)
- **Connection Status**: "DEWA SOC Connected" indicator with LIVE status badge

### Control Bar
**Left Section:**
- Search box with placeholder "Search Finding ID, Target, or ..."
- Filter button with active filter indicator (shows "▼ 2" when 2 filters applied)
- View refresh/reload button
- Grid/Table view toggle (currently table view selected)

**Right Section:**
- Status filter pills: "All (21)" | "Open (8)" | "Pending (13)" | "High (6)"
- "+ Add Finding" button (call-to-action, prominent green button)

### Data Table
**Columns (left to right):**
1. **Finding ID** - Format: `SA-YY-NN.FF` (e.g., `FND-24-181`)
2. **Target / Scope** - URL or description (e.g., "Web Applic...", "Mobile App...")
3. **Findings** - Finding description (text/links)
4. **Risk Severity** - Badge with color coding:
   - 🔴 HIGH (red)
   - 🟡 MEDIUM (yellow/orange)
   - 🟠 LOW (light orange)
5. **Status** - Badge with color coding:
   - Green: OPEN
   - Yellow: PENDING
   - Gray: Other statuses
6. **Discovered** - Date discovered (e.g., "31 Jan 2025")
7. **Deadline** - SLA deadline date (e.g., "02 Oct 2025")
8. **SLA Status** - Badge:
   - ✅ Green: "Within SLA"
   - Yellow: "Nearing SLA"
   - Red: "Breached SLA"
9. **Risk Owner** - Avatar/initials (partially visible, cut off in current view)

### Pagination Section
- "Showing 1 to 9 of 21 findings"
- "Rows per page: 10" (dropdown)
- Page navigation: "Page 1 of 3"
- Forward/back navigation arrows

## Visual Design

### Color Palette
| Element | Color | Usage |
|---------|-------|-------|
| Primary | Dark Teal/Green | Sidebar, buttons, accents |
| Success | Green (#4CAF50) | Open status, checkmarks, positive states |
| Warning | Yellow/Amber | Pending status, warnings |
| Error | Red (#F44336) | High severity, critical alerts |
| Info | Light Blue | Secondary badges |
| Background | White/Light Gray | Content areas |
| Sidebar | Dark Charcoal | Navigation background |
| Text | Dark Gray | Primary text |
| Border | Light Gray | Table dividers |

### Severity Badge Colors
- **HIGH**: Red background with white text
- **MEDIUM**: Orange/yellow background with white text
- **LOW**: Light orange background with white text
- **INFO**: No badge (implied by UI requirements)

### Status Badge Colors
- **OPEN**: Green background with white text
- **PENDING**: Yellow background with dark text
- **RETEST**: Badge with specific color
- **CLOSED**: Gray background with white text
- **DRAFT**: Light gray background

### Typography
- **Page Title**: Large, bold heading
- **Column Headers**: Medium weight, all caps or title case
- **Table Data**: Regular weight, readable body text
- **Badges**: Bold, slightly smaller font for compact display
- **Status Text**: Bold in badges

### Spacing & Layout
- **Sidebar Width**: ~200px (fixed left navigation)
- **Header Padding**: Generous top/bottom padding for breathing room
- **Table Row Height**: ~48-56px for comfortable scanning
- **Column Padding**: ~12-16px horizontal
- **Page Container**: Max-width container with side margins

## Components

### Filters
- **Filter Button**: Shows active filter count (e.g., "▼ 2")
- **Status Pills**: Quick-filter by status (All, Open, Pending, High)
- **Search Box**: Real-time search across Finding ID, Target, Findings

### Buttons
- **Primary**: "+ Add Finding" - bright green, right-aligned
- **Secondary**: "Export CSV" - outlined or subtle styling

### Navigation Sidebar
- **Menu Items**:
  - Dashboard
  - Assessment
  - Finding Management (current, highlighted)
  - Archived Findings
  - SLA Breached (with alert badge "0")
  - Report Screen
  - Logout
- **Styling**: Dark background with white text, current page highlighted

### Status Indicators
- **SLA Status Badges**: Checkmark icons with color-coded backgrounds
- **Severity Badges**: Color-coded dots or filled badges
- **Connection Status**: "DEWA SOC Connected - LIVE" in header

## Interactions

### Table Row Interactions
- **Click Row**: Navigate to Finding detail page
- **Hover**: Row background highlight for better visibility
- **Status Badge**: May be clickable to filter by that status

### Filter Panel
- **Open Filter**: Slide-out or modal dialog showing filter options
- **Apply Filters**: Multiple selections possible
- **Clear Filters**: Reset to all records

### Status Pills
- **Click Status Pill**: Immediately filter table to that status
- **Visual Feedback**: Pressed/active state on selected pill

### Export
- **Click Export CSV**: Download findings data to CSV file
- **Scope**: Exports currently visible findings or all findings (confirm behavior)

### Search
- **Real-time Search**: Filter results as user types
- **Search Fields**: Finding ID, Target, Finding description

### Pagination
- **Page Navigation**: Previous/Next buttons
- **Page Selector**: Jump to specific page
- **Rows Per Page**: Change display count (10, 25, 50, 100)

## Responsive Behavior

### Desktop (Current Design)
- Full table with all columns visible
- Sidebar always visible
- Multi-column layout

### Tablet (768px - 1024px)
- Sidebar may collapse to icons
- Some columns may be hidden (suggest: Risk Owner, SLA Status visible)
- Table becomes scrollable horizontally

### Mobile (< 768px)
- Sidebar becomes hamburger menu
- Table converts to card layout or stacked view
- Key columns: Finding ID, Severity, Status, Deadline
- Details accessible via card expansion or detail page

## Accessibility

### Color Contrast
- All badges meet WCAG AA standards for contrast
- Not rely solely on color to convey status (use icons + text)

### Keyboard Navigation
- Tab through controls and table rows
- Enter/Space to select filters or expand rows
- Arrow keys for pagination

### Screen Reader Support
- Table marked with semantic `<table>` structure
- Column headers associated with `<th>` elements
- Badge descriptions (e.g., "High Severity" instead of just color)
- Alt text for icons

### Focus Indicators
- Visible focus ring on all interactive elements
- High contrast focus indicator (blue or primary color)

## States

### Loading State
- Skeleton loaders in table rows
- Spinner in header
- Grayed out controls during load

### Empty State
- Message: "No findings match your filters"
- Suggestion: "Try adjusting your search or filters"
- Action: Link to "Clear filters" or "Create new finding"

### Error State
- Error message banner at top
- Table shows last loaded data
- Retry button in error message
- Affected table rows marked with error icon

### Success State
- Toast notification for actions (if applicable)
- Example: "Finding exported successfully" (CSV export)

## Key Data Points

### What's Displayed Per Finding
1. Business ID (Finding ID): SA-26-01.01 format
2. Target/Scope: Where the finding applies
3. Finding Title/Description: What was found
4. Risk Severity: Critical, High, Medium, Low, Info
5. Workflow Status: Draft, Pending, Open, Retest, Closed, Returned
6. Discovered Date: When finding was discovered
7. Current Deadline: Calculated SLA deadline
8. SLA Status: Within SLA, Nearing SLA, Breached SLA, No SLA
9. Risk Owner: Who is responsible for remediation

### Sortable Columns (Recommended)
- Finding ID (default)
- Risk Severity
- Status
- Discovered Date
- Deadline
- SLA Status

### Filterable Fields (Currently Available)
- Status (multi-select)
- Severity (via status pills)
- Finding ID (search)
- Target (search)
- SLA Status (implied)

## Design Notes

### UX Considerations
1. **SLA Visibility**: SLA status is prominently displayed to emphasize deadline urgency
2. **Status at a Glance**: Color-coded badges for quick visual scanning
3. **Severity First**: Risk severity is positioned early for risk assessment
4. **Deadline Clarity**: Both discovered date and deadline shown for context
5. **Owner Accountability**: Risk Owner visible per finding

### Future Enhancements
1. Inline editing for quick status updates
2. Bulk actions (select multiple findings for batch operations)
3. Advanced filtering UI (filter builder)
4. Column customization (user-selectable visible columns)
5. Sort indicators in column headers
6. Archived findings view toggle
7. Finding detail modal preview on hover

## Accessibility Checklist
- [ ] Color contrast ratios verified (WCAG AA minimum)
- [ ] Table semantics properly implemented
- [ ] Focus indicators visible and high contrast
- [ ] Screen reader testing completed
- [ ] Keyboard navigation tested end-to-end
- [ ] Error messages descriptive and associated with fields
- [ ] Loading states communicated to assistive tech
