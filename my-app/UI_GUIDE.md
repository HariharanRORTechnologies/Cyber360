# Cyber360 - UI/UX Design System

## 🎨 Color Palette

### Primary Colors
- **Brand Green**: `#1b7a5e` (Primary actions, headers, key elements)
- **Dark Green**: `#0d5d47` (Gradients, hover states)
- **Light Green Bg**: `#f0f9f7` (Subtle backgrounds)

### Status Colors
- **Success/Closed**: `#dcfce7` text `#166534` (Green)
- **Warning/Nearing SLA**: `#fed7aa` text `#92400e` (Orange)
- **Danger/Breached SLA**: `#fee2e2` text `#991b1b` (Red)
- **Info/Pending**: `#fef3c7` text `#b45309` (Yellow)
- **Retest**: `#dbeafe` text `#1e40af` (Blue)

### Neutral Colors
- **Text Primary**: `#1f2937` (Dark gray)
- **Text Secondary**: `#6b7280` (Medium gray)
- **Border**: `#d1d5db` (Light gray)
- **Background**: `#f5f5f5` (Off-white)

---

## 🎯 Icon System (Lucide React)

### Navigation Icons
```
Dashboard       → LayoutDashboard
Assessments     → ClipboardList
Findings        → FileText
Pending         → Clock
Returned        → RotateCw
Retest          → RotateCw
Risk Register   → AlertCircle
Nearing SLA     → Zap (⚡)
Breached SLA    → AlertTriangle
Archive         → Archive
Approvals       → CheckSquare
Admin           → Settings
Users           → Users
Teams           → Users
SLA Config      → Clock
Search          → Search
```

### Dashboard KPI Icons
```
Target/Goals     → Target
Findings         → AlertCircle
Completed        → CheckCircle
Trends           → TrendingUp
Time-based       → Clock
Team/Users       → Users
Performance      → Zap
```

---

## 📐 Typography Scale

### Headings
- **H1**: 1.8rem (28px), font-weight: 700, color: #1b7a5e
- **H2**: 1.3rem (20px), font-weight: 600, color: #1f2937
- **H3**: 1.1rem (17px), font-weight: 600, color: #1f2937

### Body Text
- **Large**: 0.95rem (15px), color: #1f2937
- **Regular**: 0.85rem (13px), color: #374151
- **Small**: 0.75rem (12px), color: #6b7280
- **Tiny**: 0.65rem (10px), color: #9ca3af

---

## 🎴 Component Patterns

### KPI Cards
- **Background**: White
- **Border Radius**: 12px
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Hover Effect**: Lift up (-4px), shadow increases
- **Top Border**: Green gradient (4px, animates on hover)
- **Icon Box**: 50×50px, background `#f0f9f7`, border-radius 8px

### Chart Cards
- **Background**: White
- **Padding**: 1.5rem
- **Border Radius**: 12px
- **Title**: 1.1rem, font-weight: 600
- **Height**: 300px (fixed)
- **Responsive**: Stacks to single column on <1024px

### Data Tables
- **Font Size**: 0.8rem
- **Row Height**: 35px (32px on mobile)
- **Header**: Gradient `#1b7a5e → #0d5d47`, white text
- **Row Hover**: Background `#fafafa`
- **Borders**: `#d1d5db`

### Status/Severity Badges
- **Display**: Inline-block
- **Padding**: 0.2rem 0.35rem
- **Border Radius**: 3px
- **Font Size**: 0.7rem
- **Font Weight**: 600
- **Text Alignment**: Center
- **Width**: 100% (fit to cell)

---

## 📊 Chart Configurations

### Area Chart (Trends)
- **Colors**: Open: `#3b82f6` (Blue), Closed: `#10b981` (Green)
- **Fill Opacity**: 0.3 with gradient
- **Grid**: Subtle dashed gray
- **Tooltip**: White background, 1px border
- **Legend**: Visible at bottom

### Bar Chart (Comparisons)
- **Stacked Bars**: Pending, Open, Closed side-by-side
- **Colors**: Match status badges (Yellow, Red, Green)
- **Grid**: Visible
- **Animation**: Smooth transition

### Pie/Donut Charts (Distribution)
- **Color Scheme**: Risk severity (Red, Orange, Yellow, Blue, Gray)
- **Labels**: Name and value
- **Animation**: Auto-rotate on hover
- **Legend**: Positioned right

---

## 🎬 Animations & Transitions

### Hover States
```css
/* Card Hover */
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
transition: all 0.3s ease;

/* Icon Hover */
color: white;
transition: color 0.2s;

/* Button Hover */
background: #f0f9f7;
border-color: #1b7a5e;
transition: all 0.2s;
```

### Loading States
- Subtle pulse animation on cards
- Skeleton loaders for tables (optional)
- Spinner for async operations

---

## 📱 Responsive Breakpoints

### Desktop (>1024px)
- Sidebar: 180px open, 60px closed
- Charts: 2-column grid
- KPI Grid: Auto-fit minmax(200px, 1fr)

### Tablet (768px - 1024px)
- Charts: 1-column grid
- KPI Grid: 2-column
- Font sizes: Slightly reduced

### Mobile (<768px)
- Sidebar: Full-height overlay, 200px wide
- Single column layout
- Reduced padding (0.3rem)
- Table font: 0.65rem
- Row height: 32px

---

## 🛠️ Control Naming Convention

### Buttons
- `btn_primary` - Main action
- `btn_secondary` - Alternative action
- `btn_icon` - Icon-only button
- `btn_action` - Row actions (⋯, ✓, ↶, etc.)
- `btn_pagination` - Next/Previous

### Labels & Text
- `lbl_header` - Page title
- `lbl_heading` - Section heading
- `lbl_value` - KPI value
- `lbl_label` - Descriptive label

### Containers
- `div_chart` - Chart container
- `div_kpi` - KPI card container
- `div_table` - Table wrapper
- `div_modal` - Modal dialog

### Tables & Lists
- `tbl_findings` - Findings table
- `gal_items` - Gallery/list view
- `col_header` - Table column header

---

## 📈 Dashboard Layout Pattern

```
┌─────────────────────────────────────────────┐
│  Page Header (Title + User Profile)         │
└─────────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│  KPI     │  KPI     │  KPI     │  KPI     │
│  Card 1  │  Card 2  │  Card 3  │  Card 4  │
└──────────┴──────────┴──────────┴──────────┘

┌──────────────────────┬──────────────────────┐
│  Chart 1 (50% width) │  Chart 2 (50% width) │
│  (Area/Bar)          │  (Pie)               │
└──────────────────────┴──────────────────────┘

┌──────────────────────┬──────────────────────┐
│  Chart 3 (50% width) │  Chart 4 (50% width) │
│  (Bar)               │  (Pie)               │
└──────────────────────┴──────────────────────┘

┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│ Detail 1 │ Detail 2 │ Detail 3 │ Detail 4 │ Detail 5 │ Detail 6 │
│  Card    │  Card    │  Card    │  Card    │  Card    │  Card    │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

---

## 🎨 Shadow & Depth

### Elevation Levels
```
Level 1 (Subtle):    0 2px 8px rgba(0, 0, 0, 0.08)
Level 2 (Normal):    0 4px 12px rgba(0, 0, 0, 0.1)
Level 3 (Raised):    0 8px 24px rgba(0, 0, 0, 0.12)
Level 4 (Modal):     0 20px 40px rgba(0, 0, 0, 0.15)
```

---

## 📝 Spacing Grid (8px base)

- `0.5rem` = 8px (smallest gaps)
- `0.75rem` = 12px (component padding)
- `1rem` = 16px (standard spacing)
- `1.5rem` = 24px (section spacing)
- `2rem` = 32px (major spacing)

---

## 🚀 Usage Guide

### Adding New Charts
```jsx
import { ResponsiveContainer, AreaChart, Bar, Tooltip } from 'recharts';

<div className="chart-card-enhanced">
  <h3>📊 Chart Title</h3>
  <div className="chart-container-enhanced">
    <ResponsiveContainer width="100%" height="100%">
      {/* Recharts component */}
    </ResponsiveContainer>
  </div>
</div>
```

### Adding New Icons
```jsx
import { IconName } from 'lucide-react';

<div className="sidebar-icon">
  <IconName size={20} />
</div>
```

### Custom Colors
Follow the palette defined above. Use CSS variables if you want to maintain flexibility:
```css
:root {
  --color-primary: #1b7a5e;
  --color-success: #166534;
  --color-warning: #b45309;
  --color-danger: #991b1b;
}
```

---

## 📚 References

- **Icon Library**: Lucide React - https://lucide.dev
- **Charts**: Recharts - https://recharts.org
- **Color Reference**: Tailwind Color Palette
- **Font**: System fonts (sans-serif)

---

**Last Updated**: September 2026
**Design System Version**: 1.0
