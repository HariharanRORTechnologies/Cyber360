# DEWA Design System - Cyber360 Application

## Overview
This document defines the DEWA Design System Version 1.2 implementation for the Cyber360 Security Assessment and Finding Management Platform.

All visual design, components, and layout decisions must follow this specification.

---

## Color Palette

### Primary Colors
- **DEWA Green (Primary)**: `#087B36`
- **DEWA Dark Green**: `#065726`
- **DEWA Light Green**: `#E8F5E9`
- **Gradient**: `linear-gradient(135deg, #065726 0%, #087B36 100%)`

### Semantic Colors
| Purpose | Color | Hex |
|---------|-------|-----|
| Success | DEWA Green | #087B36 |
| Error | Red | #E10E49 |
| Warning | Orange | #AC631C |
| Information | Blue | #0079C1 |

### Text Colors
| Use Case | Color | Hex |
|----------|-------|-----|
| Primary Text | Dark Gray | #3F3F3F |
| Secondary Text | Medium Gray | #717173 |
| Disabled / Inactive | Light Gray | #9B9B9B |
| Inverse (on dark backgrounds) | White | #FFFFFF |

### Background Colors
| Type | Color | Hex |
|------|-------|-----|
| Page Background | Light Gray | #F1F1F1 |
| Surface / Card | White | #FFFFFF |
| Surface Hover | Off-White | #F8F8F8 |
| Surface Active | Very Light Gray | #F0F0F0 |

### Border Colors
| Weight | Color | Hex |
|--------|-------|-----|
| Light (Subtle) | Light Gray | #E5E5E5 |
| Default | Medium Light Gray | #D0D0D0 |
| Dark (Emphasis) | Medium Gray | #9B9B9B |

### Status Colors
| Status | Color | Hex |
|--------|-------|-----|
| Draft | Gray | #9B9B9B |
| Open | Blue | #0079C1 |
| Pending | Orange | #AC631C |
| Retest | Light Orange | #FFA500 |
| Closed | Green | #087B36 |

### Severity Colors
| Severity | Color | Hex |
|----------|-------|-----|
| Critical | Red | #E10E49 |
| High | Red | #E10E49 |
| Medium | Orange | #AC631C |
| Low | Blue | #0079C1 |
| Info | Gray | #9B9B9B |

### Graph/Chart Colors
- Green: `#087B36`
- Yellow: `#FFDA5B`
- Orange: `#F5A623`
- Red: `#E10E49`
- Blue: `#0079C1`

**Rule**: Do NOT introduce purple, cyan, neon, or unrelated colors. All charts and visualizations must use the DEWA graph color palette.

---

## Typography

### Font Family
**Primary Font**: Dubai (when available) / System font stack:
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Dubai', 'Roboto', sans-serif
```

### Font Weights
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Slightly emphasized text
- **Semibold (600)**: Labels, emphasized content
- **Bold (700)**: Headings, titles

### Font Scale (for Enterprise Application)

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| H1 | 32px | Bold (700) | 1.2 | Main page headings |
| H2 | 28px | Bold (700) | 1.2 | Section headings |
| H3 | 24px | Bold (700) | 1.2 | Subsection headings |
| H4 | 20px | Bold (700) | 1.2 | Card titles, major labels |
| H5 | 18px | Bold (700) | 1.2 | Module titles |
| H6 / Label | 16px | Semibold (600) | 1.5 | Form labels, UI labels |
| Body | 14px | Regular (400) | 1.5 | Body text, descriptions |
| Small | 13px | Regular (400) | 1.5 | Captions, metadata |
| Extra Small | 12px | Regular (400) | 1.5 | Timestamps, very small text |

### Letter Spacing
- **Tight**: -0.5px (for headings)
- **Normal**: 0px (default)
- **Wide**: 0.5px (for uppercase labels, small caps)

---

## Spacing System

All spacing is based on a 4px base unit:

| Variable | Value |
|----------|-------|
| XS | 4px |
| SM | 8px |
| MD | 12px |
| LG | 16px |
| XL | 24px |
| 2XL | 32px |
| 3XL | 48px |

**Usage**:
- Use multiples of 4px for consistency
- Prefer LG (16px) for default padding/margins
- Use XL (24px) between major sections
- Use SM (8px) for tight internal spacing

---

## Border Radius

| Size | Value | Use Case |
|------|-------|----------|
| SM | 4px | Small buttons, inputs, minor elements |
| MD | 6px | Form fields, small cards |
| LG | 8px | Card containers, major containers |
| XL | 12px | Large containers, dialogs |
| FULL | 9999px | Badges, pill buttons |

---

## Shadows

| Elevation | CSS | Use Case |
|-----------|-----|----------|
| XS | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| SM | 0 1px 3px rgba(0,0,0,0.08) | Default card shadow |
| MD | 0 4px 8px rgba(0,0,0,0.1) | Hovered cards |
| LG | 0 8px 16px rgba(0,0,0,0.12) | Modal/dialog |
| XL | 0 12px 24px rgba(0,0,0,0.15) | Maximum elevation |

---

## Component Specifications

### Buttons

#### Primary Button
- **Background**: DEWA Green (#087B36)
- **Text**: White
- **Height**: 40px
- **Padding**: 8px 16px
- **Border Radius**: 6px
- **Font Size**: 14px (small) or 16px (large)
- **Font Weight**: Semibold (600)
- **Hover**: Dark Green (#065726) + shadow-md
- **Focus**: 2px outline with 2px offset
- **Disabled**: 60% opacity

#### Secondary Button
- **Background**: White
- **Text**: Primary Text (#3F3F3F)
- **Border**: 1px solid #D0D0D0
- **Height**: 40px
- **Padding**: 8px 16px
- **Border Radius**: 6px
- **Hover**: Slightly darker background + darker border
- **Focus**: 2px outline with 2px offset

#### Danger Button
- **Background**: Error Red (#E10E49)
- **Text**: White
- **Height**: 40px
- **Padding**: 8px 16px
- **Border Radius**: 6px
- **Hover**: Darker red + shadow-md
- **Focus**: 2px outline with 2px offset

### Form Fields

#### Input / Select / Textarea
- **Background**: White (#FFFFFF)
- **Text**: Primary Text (#3F3F3F)
- **Border**: 1px solid Light Gray (#E5E5E5)
- **Height**: 40px
- **Padding**: 8px 12px
- **Border Radius**: 6px
- **Font Size**: 14px
- **Focus**: 
  - Border changes to DEWA Green (#087B36)
  - Add 3px box-shadow: 0 0 0 3px rgba(8, 123, 54, 0.1)
- **Disabled**: 
  - Background: Off-White (#FAFAFA)
  - Border: Light Gray (#E5E5E5)
  - Text: Disabled Gray (#9B9B9B)
  - Cursor: not-allowed

#### Labels
- **Font Size**: 13px
- **Font Weight**: Semibold (600)
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.5px
- **Color**: Primary Text (#3F3F3F)
- **Margin Bottom**: 8px

### Badges

#### Status Badge
- **Padding**: 4px 12px
- **Border Radius**: 9999px (pill-shaped)
- **Font Size**: 12px
- **Font Weight**: Semibold (600)
- **Text Transform**: Uppercase
- **Border**: 1px solid (matching color)

**Status Colors**:
- Draft: Gray background (#F5F5F5) + Gray text (#717173)
- Open: Blue background (#E3F2FD) + Blue text (#0079C1)
- Pending: Orange background (#FFF3E0) + Orange text (#AC631C)
- Retest: Orange background (#FFF3E0) + Orange text (#F5A623)
- Closed: Green background (#E8F5E9) + Green text (#087B36)

#### Severity Badge
- **Padding**: 4px 12px
- **Border Radius**: 9999px
- **Font Size**: 12px
- **Font Weight**: Semibold (600)
- **Text Transform**: Uppercase
- **Icon**: Prefix icon (!, •, ⓘ, ✓, ✕)
- **Border**: 1px solid (matching color)

**Icon Meanings**:
- Critical / High: `!` (exclamation in colored circle)
- Medium / Low: `●` (bullet point)
- Info: `ⓘ` (info symbol)

### Cards

#### Default Card
- **Background**: White (#FFFFFF)
- **Border**: 1px solid Light Gray (#E5E5E5)
- **Border Radius**: 8px
- **Padding**: 16px
- **Shadow**: 0 1px 3px rgba(0,0,0,0.08)
- **Hover**: 
  - Shadow increases to: 0 4px 8px rgba(0,0,0,0.1)
  - Border changes to: #D0D0D0

#### Card Header
- **Padding Bottom**: 16px
- **Border Bottom**: 1px solid Light Gray (#E5E5E5)
- **Display**: Flex with space-between

#### Card Footer
- **Padding Top**: 16px
- **Border Top**: 1px solid Light Gray (#E5E5E5)
- **Display**: Flex, justify-end
- **Gap**: 12px

### KPI Cards

- **Background**: Gradient (#087B36 at 5% opacity)
- **Border**: 1px solid Light Gray
- **Border Radius**: 8px
- **Padding**: 16px
- **Min Height**: 140px
- **Display**: Flex column with space-between
- **Hover**: 
  - Border color to DEWA Green
  - Shadow increases
  - Transform: translateY(-2px)

**Internal Elements**:
- **Label**: 13px, uppercase, secondary text
- **Value**: 32px, bold, DEWA Green
- **Change**: 12px, smaller, color-coded (positive/negative/neutral)

### Chart Cards

- **Background**: White
- **Border**: 1px solid Light Gray
- **Border Radius**: 8px
- **Padding**: 16px
- **Min Height**: 320px
- **Shadow**: Small
- **Title**: 16px, bold, with 2px green underline

### Tables

#### Header
- **Background**: DEWA Green (#087B36)
- **Text**: White
- **Padding**: 12px 16px (vertical / horizontal)
- **Font Size**: 13px
- **Font Weight**: Bold (700)
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.5px
- **Border Bottom**: 1px solid Dark Green (#065726)

#### Body Cell
- **Padding**: 12px 16px
- **Height**: 44px
- **Border Bottom**: 1px solid Light Gray (#E5E5E5)
- **Font Size**: 13px
- **Vertical Align**: Middle
- **Text Color**: Primary Text (#3F3F3F)

#### Row Hover
- **Background**: Off-White (#F8F8F8)
- **Cursor**: Pointer (if interactive)

#### Last Row
- **Border Bottom**: None

### SLA Indicators

#### Within SLA
- **Background**: #E8F5E9 (light green)
- **Text**: DEWA Green (#087B36)
- **Border Left**: 4px solid DEWA Green
- **Icon**: ✓ (checkmark)

#### Nearing SLA
- **Background**: #FFF3E0 (light orange)
- **Text**: Warning Orange (#AC631C)
- **Border Left**: 4px solid Warning Orange
- **Icon**: ⚠ (warning triangle)

#### Breached SLA
- **Background**: #FCE4EC (light red)
- **Text**: Error Red (#E10E49)
- **Border Left**: 4px solid Error Red
- **Icon**: ✕ (cross mark)

#### No SLA
- **Background**: #F5F5F5 (light gray)
- **Text**: Secondary Text (#717173)
- **Border Left**: 4px solid Light Gray (#E5E5E5)
- **Icon**: – (dash)

---

## Responsive Design

### Breakpoints
- **XS**: 320px (small phones)
- **SM**: 480px (larger phones)
- **MD**: 768px (tablets)
- **LG**: 1024px (laptops)
- **XL**: 1280px (desktops)
- **2XL**: 1536px (large displays)

### Mobile-First Approach
1. Design for mobile first (320px)
2. Add breakpoints for larger screens
3. Ensure full functionality at all sizes

### Responsive Patterns
- **2-Column Grid**: Convert to 1 column on tablets and below
- **3-Column Grid**: Convert to 2 columns on tablets, 1 on mobile
- **Sidebar Navigation**: Transform to hamburger menu on mobile
- **Tables**: Add horizontal scroll or card view on mobile
- **Forms**: Full-width on mobile, multi-column on desktop

---

## Accessibility Requirements

All components MUST meet WCAG AA standards:

1. **Color Contrast**: Minimum 4.5:1 for text, 3:1 for graphics
2. **Keyboard Navigation**: All interactive elements accessible via keyboard
3. **Focus States**: Always visible, at least 2px outline
4. **Labels**: All form fields have associated `<label>` elements
5. **Semantic HTML**: Use proper heading levels, semantic tags
6. **ARIA**: Use where necessary (aria-label, aria-describedby, etc.)
7. **Error Messages**: Clear, not color-alone
8. **Alternative Text**: All images have alt attributes
9. **Transitions**: No autoplaying animations longer than 3 seconds
10. **Font Size**: Minimum 14px for body text, 13px for small text

---

## Transitions & Animations

| Name | Duration | Easing | Use Case |
|------|----------|--------|----------|
| Fast | 150ms | ease-in-out | Hover states, button feedback |
| Base | 250ms | ease-in-out | Transitions, modal opens |
| Slow | 350ms | ease-in-out | Page transitions |

**Rules**:
- Do not use excessive animations
- Prefer transforms (faster, smoother) over positional changes
- Respect `prefers-reduced-motion` system preference
- Keep animations under 500ms for UI feedback

---

## Z-Index Scale

| Layer | Value | Use Case |
|-------|-------|----------|
| Content | 0 | Normal page content |
| Sidebar | 50 | Sticky sidebar |
| Header | 60 | Sticky header |
| Dropdown | 100 | Dropdown menus |
| Modal | 200 | Modal overlays |
| Tooltip | 300 | Floating tooltips |
| Notification | 400 | Toast notifications |

---

## Empty & Error States

### Empty State
- **Icon**: Large, 48px, 50% opacity
- **Title**: 20px, bold
- **Message**: 14px, secondary text, max-width 400px
- **Action**: Primary button with contextual action
- **Padding**: 48px vertical

### Error State
- **Icon**: Large, 48px, error color
- **Title**: 20px, bold
- **Message**: 14px, secondary text, max-width 400px
- **Action**: "Try Again" button or relevant action

### Loading State
- **Skeleton Loaders**: Use animated shimmer effect
- **Height**: Match expected content height
- **Border Radius**: Match expected component
- **Background**: Gradient animation (1.5s loop)

---

## Component Structure Best Practices

### File Organization
```
src/
├── styles/
│   ├── dewa-tokens.css          # Design tokens
│   ├── dewa-base.css            # Global styles, typography, forms
│   └── components.css           # Component styles
├── components/
│   ├── common/                  # Reusable components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── SLAIndicator.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   └── ...
└── index.css                    # Imports dewa tokens, base, and components
```

### CSS Class Naming
- Use BEM (Block Element Modifier) for component styles
- Example: `.card`, `.card__header`, `.card--elevated`
- Utility classes: `.text-primary`, `.bg-surface`, `.shadow-md`

### Component Props & Variants
Each component should support variant props:
```typescript
<Button variant="primary" | "secondary" | "danger" size="sm" | "md" | "lg" />
<Badge status="draft" | "open" | "closed" severity="critical" | "high" | "low" />
<Card elevated={true} clickable={true} />
```

---

## Interaction Patterns

### Hover States
- Subtle shadow increase
- Border color change (if applicable)
- Small scale increase (2px translateY)
- Never change text color alone

### Focus States
- 2px solid outline in DEWA Green
- 2px offset from element
- Visible on all interactive elements
- Works with keyboard navigation

### Active/Selected States
- Background color change
- Slightly darker shade
- May include checkmark or indicator
- Clear visual distinction from hover

### Disabled States
- 60% opacity
- Cursor: not-allowed
- Desaturated colors
- No hover effects

---

## Implementation Checklist

Before marking any component complete:

- [ ] Uses DEWA colors from tokens
- [ ] Uses DEWA typography scale
- [ ] Uses DEWA spacing system
- [ ] Has proper focus states
- [ ] Has hover states (if interactive)
- [ ] Has disabled state (if applicable)
- [ ] Is responsive (mobile, tablet, desktop)
- [ ] Has accessible labels/ARIA
- [ ] Uses proper semantic HTML
- [ ] Has consistent shadows/borders
- [ ] Integrates with chart colors (if visualization)
- [ ] No accessibility violations
- [ ] Tested keyboard navigation
- [ ] Tested with screen reader

---

## DEWA Branding Guidelines

**Never**:
- Use purple, cyan, neon, or off-brand colors
- Mix icon libraries or icon styles
- Use excessive animations or decorations
- Create generic SaaS aesthetics
- Break the established typography hierarchy
- Ignore color contrast requirements
- Use color alone to communicate meaning

**Always**:
- Use DEWA Green as primary action color
- Respect the established spacing scale
- Use Dubai typography (or system fonts)
- Combine icons with text/color for status
- Test color combinations for contrast
- Use the provided color palette
- Maintain professional enterprise appearance

---

## Questions & Future Additions

For design decisions not covered:
1. Check DEWA UI Design Guidelines Version 1.2
2. Check this document
3. Consult with design leads
4. Document decision and add to this file

**Document Version**: 1.0  
**Last Updated**: September 25, 2026  
**Status**: Active
