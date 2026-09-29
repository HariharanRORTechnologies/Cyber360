# Layout Design Guide - Global Styling

## Overview
This document describes the global layout styling applied to all screens in the Cyber360 Security Findings Management Platform.

## Color Scheme

### Primary Colors
- **Dark Green Primary**: `#087B36`
- **Dark Green Dark**: `#065f46` / `#065726`
- **Light Green Accent**: `#E8F5E9` / `#f0fdf4`
- **Light Green Border**: `#d1fae5`

### Sidebar Gradient
```css
background: linear-gradient(180deg, #065f46 0%, #047857 100%);
```

### Neutral Colors
- **White**: `#FFFFFF` (backgrounds, surfaces)
- **Light Gray**: `#f3f4f6` (hover states)
- **Medium Gray**: `#6b7280` (secondary text)
- **Dark Gray**: `#374151` (primary text)
- **Border Gray**: `#e5e7eb` (borders)

## Layout Components

### 1. **Sidebar (Navigation Menu)**

#### Structure
- **Position**: Fixed left sidebar
- **Default Width**: 60px (collapsed)
- **Expanded Width**: 200px (open)
- **Height**: Full viewport height

#### Styling
```css
- Background: Dark green gradient (linear-gradient(180deg, #065f46 0%, #047857 100%))
- Border Right: 1px solid #055c44
- Box Shadow: 2px 0 8px rgba(0, 0, 0, 0.1)
- Smooth Transitions: 250ms ease-in-out
```

#### Navigation Items
- **Icons**: 24x24px, white text with 75% opacity
- **Labels**: Hidden when collapsed, white text when expanded
- **Hover State**: 
  - Background: rgba(255, 255, 255, 0.15)
  - Text: Full white (#FFFFFF)
- **Active State**:
  - Background: rgba(255, 255, 255, 0.25)
  - Left Border: 3px white
  - Text: Full white

#### Responsive Behavior
- **Desktop**: Toggleable sidebar with smooth animation
- **Mobile**: Full-height overlay sidebar, hamburger menu toggle

### 2. **Header (Navbar)**

#### Structure
- **Position**: Fixed top, sticky
- **Height**: 64px (with padding)
- **Z-Index**: 60

#### Styling
```css
- Background: White (#FFFFFF)
- Border Bottom: 1px solid #e5e7eb
- Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
- Flex Layout: space-between alignment
```

#### Components

**Left Section: Menu Toggle + Page Title**
- Sidebar Toggle Button:
  - Size: 40px square
  - Icon Color: #374151
  - Hover Background: #f3f4f6
  - Hover Color: Dark green (#087B36)

- Page Title:
  - Font Size: 18px
  - Font Weight: 600
  - Color: Dark gray (#374151)
  - Flex: 1 (grows to fill space)

**Right Section: User Profile**
- Background: Light green (#f0fdf4)
- Border: 1px solid #d1fae5
- Border Radius: 8px
- Padding: 8px 12px
- Flex Layout with gap: 12px

Components:
1. **Avatar Circle**
   - Size: 40x40px
   - Background: Primary green (#087B36)
   - Text: White, bold
   - Shape: Circular

2. **Profile Info**
   - User Name: 13px, semibold, dark text
   - User Role: 12px, normal weight, secondary text
   - Layout: Vertical flex

3. **Profile Dropdown Toggle**
   - Icon: Chevron down (lucide-react)
   - Color: Secondary gray
   - Hover: Primary green color

**Profile Dropdown Menu**
- Position: Absolute top 100%, right 0
- Background: White
- Border: 1px solid #e5e7eb
- Border Radius: 8px
- Box Shadow: 0 8px 16px rgba(0, 0, 0, 0.12)
- Min Width: 240px
- Z-Index: 200

Menu Items:
- Display Info (Email, Department, Team)
- Switch Role Button (Primary green background)
- Logout Button (Red/Error color)

### 3. **Footer**

#### Structure
- **Position**: Fixed bottom or sticky
- **Height**: Auto (~60px with padding)
- **Z-Index**: Default

#### Styling
```css
- Background: White (#FFFFFF)
- Border Top: 1px solid #e5e7eb
- Box Shadow: 0 -2px 8px rgba(0, 0, 0, 0.04)
- Padding: 12px 24px
- Flex Layout: space-between alignment
```

#### Content Sections

**Left Section: Copyright**
- Font Size: 12px
- Color: #6b7280
- Font Weight: 500
- Content: "© [YEAR] Dubai Electricity & Water Authority. All rights reserved."

**Center Section: Application Name**
- Font Size: 12px
- Color: Primary green (#087B36)
- Font Weight: 600
- Content: "Cyber 360 - Security Findings Management Platform"

**Right Section: Version**
- Font Size: 11px
- Color: #9ca3af
- Font Weight: 500
- Letter Spacing: 0.5px
- Content: "v2.4.0"

#### Responsive Behavior
- **Desktop**: Three-column layout
- **Tablet (768px)**: Stack sections vertically
- **Mobile (480px)**: Center all text, hide app name

## Main Content Area

### Styling
```css
- Flex: 1 (fills remaining space)
- Overflow: Auto
- Background: #f1f1f1 (light gray)
- Padding: 24px
```

### Scrollbar Styling
```css
- Width: 8px
- Track: #f1f1f1
- Thumb: #d0d0d0
- Thumb Hover: #9b9b9b
- Border Radius: 4px
```

## Responsive Breakpoints

| Breakpoint | Max Width | Changes |
|-----------|-----------|---------|
| Desktop | 1024px+ | Full layout, sidebar toggleable |
| Tablet | 768-1023px | Reduced padding, smaller fonts |
| Mobile | <768px | Sidebar overlay, full-height, smaller components |

### Specific Breakpoints

#### Tablet (768px)
- Navbar padding: 12px 16px
- Navbar title: 16px
- User section: Gap 8px, smaller padding
- Main content: Padding 16px

#### Mobile (480px)
- Navbar padding: 8px 16px
- Navbar title: 14px
- User name: Hidden
- Avatar: Still visible
- Main content: Padding 12px
- Sidebar: Transforms to overlay with hamburger menu

## Transitions & Animations

All interactive elements use smooth transitions:
```css
--dewa-transition-fast: 150ms ease-in-out
--dewa-transition-base: 250ms ease-in-out
```

Applied to:
- Background color changes (hover, active)
- Border color changes
- Opacity changes
- Transform/position changes (sidebar open/close)

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Primary text on white: 8.5:1 contrast ratio
- Secondary text on white: 4.5:1 contrast ratio

### Focus States
- All interactive elements have visible focus rings
- Focus color: Primary green (#087B36)
- Ring width: 2-3px
- High contrast for keyboard navigation

### Semantic HTML
- Navigation wrapped in `<nav>`
- Main content in `<main>`
- Footer in `<footer>`
- Proper heading hierarchy

## Implementation Details

### CSS Variables Used
```css
:root {
  --dewa-primary: #087B36;
  --dewa-primary-dark: #065726;
  --dewa-primary-light: #E8F5E9;
  --dewa-text-primary: #3F3F3F;
  --dewa-text-secondary: #717173;
  --dewa-text-inverse: #FFFFFF;
  --dewa-surface: #FFFFFF;
  --dewa-background: #F1F1F1;
  --dewa-border-light: #E5E5E5;
  --dewa-transition-base: 250ms ease-in-out;
  --dewa-z-sidebar: 50;
  --dewa-z-header: 60;
  --dewa-space-*: Various (4px to 48px)
}
```

### Files Modified
1. **sidebar.css**: Updated gradient, colors, shadows
2. **layout.css**: Updated navbar styling, colors
3. **footer.css**: Adjusted padding and styling

## Design System Consistency

All screens in the application now use:
- Consistent primary color palette (dark green)
- Unified navigation sidebar with dark green gradient
- Clean white header with user profile
- Professional footer with copyright and version info
- Smooth transitions and animations
- Responsive design across all breakpoints
- WCAG accessible color contrasts and focus states

## Future Enhancements

Potential improvements:
1. Dark mode support (CSS variables prepared)
2. Customizable sidebar width settings
3. Collapsible profile dropdown animations
4. Advanced navigation breadcrumbs
5. Quick action buttons in header
6. Notification center integration
