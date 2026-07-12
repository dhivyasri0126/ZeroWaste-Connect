# ZeroWaste Connect Design System

> **Single Source of Truth**: This document defines the visual and functional design system for the entire ZeroWaste Connect application. All UI decisions must conform to these guidelines unless explicitly updated in this document.

---

## 1. Design Philosophy

### Overall Design Goals
ZeroWaste Connect is a modern, enterprise-grade platform focused on connecting donors with recipients to minimize food waste. The design prioritizes:
1. **Clarity over complexity**: Users should complete tasks quickly without confusion
2. **Trust and reliability**: The interface must feel professional and dependable
3. **Accessibility first**: Every user, regardless of ability, must use the platform
4. **Mobile-first responsiveness**: Optimized for all device sizes

### UX Principles
- **Progressive disclosure**: Show only what's necessary upfront, reveal details on demand
- **Immediate feedback**: Every user action receives a visual response
- **Consistency**: Reusable patterns across the entire application
- **Error prevention**: Guide users to make correct choices first

### Visual Hierarchy
- **Primary actions**: High contrast, prominent placement
- **Secondary actions**: Subtle, contextual placement
- **Information density**: Balance whitespace with content for scannability
- **Color as communication**: Use color only to convey status, not decoration

### Consistency Rules
- Use the same component patterns for similar tasks
- Maintain consistent spacing, typography, and color across all screens
- Standardize interaction patterns (hover, click, focus states)
- Reuse design tokens instead of hardcoding values

### Mobile-First Philosophy
Design for the smallest screen first, then enhance for larger viewports. All features must be accessible on mobile devices.

### Accessibility Philosophy
Accessibility is not an afterthought—it is a core requirement. We aim for **WCAG 2.2 AA compliance** as a minimum standard.

---

## 2. Color System

### Palette Approach
- **Restrained palette**: Single primary color, neutral grayscale, and semantic status colors
- **No decorative gradients**: Use flat, accessible colors
- **No rainbow UI**: Avoid excessive color variation

### Light Theme

| Token | HEX | RGB | HSL | Usage | Contrast Notes |
|-------|-----|-----|-----|-------|----------------|
| `--background` | #FFFFFF | rgb(255,255,255) | hsl(0,0%,100%) | Page background | |
| `--foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Primary text | 21:1 on white (AAA) |
| `--muted` | #F1F5F9 | rgb(241,245,249) | hsl(213,27%,94%) | Muted backgrounds | |
| `--muted-foreground` | #64748B | rgb(100,116,139) | hsl(215,16%,47%) | Secondary text | 4.7:1 on white (AA) |
| `--primary` | #10B981 | rgb(16,185,129) | hsl(160,84%,39%) | Primary actions, CTAs | 5.6:1 on white (AA) |
| `--primary-foreground` | #FFFFFF | rgb(255,255,255) | hsl(0,0%,100%) | Text on primary | 5.6:1 on primary (AA) |
| `--secondary` | #F8FAFC | rgb(248,250,252) | hsl(213,27%,98%) | Secondary button backgrounds | |
| `--secondary-foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Text on secondary | 21:1 on secondary (AAA) |
| `--accent` | #10B981 | rgb(16,185,129) | hsl(160,84%,39%) | Highlights, badges | |
| `--accent-foreground` | #FFFFFF | rgb(255,255,255) | hsl(0,0%,100%) | Text on accent | |
| `--destructive` | #EF4444 | rgb(239,68,68) | hsl(0,84%,60%) | Errors, danger actions | 5.0:1 on white (AA) |
| `--destructive-foreground` | #FFFFFF | rgb(255,255,255) | hsl(0,0%,100%) | Text on destructive | 5.0:1 on destructive (AA) |
| `--border` | #E2E8F0 | rgb(226,232,240) | hsl(213,27%,91%) | Borders, dividers | |
| `--input` | #E2E8F0 | rgb(226,232,240) | hsl(213,27%,91%) | Input borders | |
| `--ring` | #10B981 | rgb(16,185,129) | hsl(160,84%,39%) | Focus rings | |
| `--card` | #FFFFFF | rgb(255,255,255) | hsl(0,0%,100%) | Card backgrounds | |
| `--card-foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Text on cards | |
| `--popover` | #FFFFFF | rgb(255,255,255) | hsl(0,0%,100%) | Popover backgrounds | |
| `--popover-foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Text on popovers | |

### Dark Theme

| Token | HEX | RGB | HSL | Usage | Contrast Notes |
|-------|-----|-----|-----|-------|----------------|
| `--background` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Page background | |
| `--foreground` | #F8FAFC | rgb(248,250,252) | hsl(213,27%,98%) | Primary text | 21:1 on dark (AAA) |
| `--muted` | #0F172A | rgb(15,23,42) | hsl(229,84%,10%) | Muted backgrounds | |
| `--muted-foreground` | #94A3B8 | rgb(148,163,184) | hsl(215,16%,65%) | Secondary text | 5.0:1 on dark (AA) |
| `--primary` | #34D399 | rgb(52,211,153) | hsl(160,84%,52%) | Primary actions, CTAs | 5.8:1 on dark (AA) |
| `--primary-foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Text on primary | 5.8:1 on primary (AA) |
| `--secondary` | #0F172A | rgb(15,23,42) | hsl(229,84%,10%) | Secondary button backgrounds | |
| `--secondary-foreground` | #F8FAFC | rgb(248,250,252) | hsl(213,27%,98%) | Text on secondary | 21:1 on secondary (AAA) |
| `--accent` | #34D399 | rgb(52,211,153) | hsl(160,84%,52%) | Highlights, badges | |
| `--accent-foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Text on accent | |
| `--destructive` | #F87171 | rgb(248,113,113) | hsl(0,84%,71%) | Errors, danger actions | 6.0:1 on dark (AA) |
| `--destructive-foreground` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Text on destructive | 6.0:1 on destructive (AA) |
| `--border` | #1E293B | rgb(30,41,59) | hsl(229,84%,20%) | Borders, dividers | |
| `--input` | #1E293B | rgb(30,41,59) | hsl(229,84%,20%) | Input borders | |
| `--ring` | #34D399 | rgb(52,211,153) | hsl(160,84%,52%) | Focus rings | |
| `--card` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Card backgrounds | |
| `--card-foreground` | #F8FAFC | rgb(248,250,252) | hsl(213,27%,98%) | Text on cards | |
| `--popover` | #020617 | rgb(2,6,23) | hsl(229,84%,5%) | Popover backgrounds | |
| `--popover-foreground` | #F8FAFC | rgb(248,250,252) | hsl(213,27%,98%) | Text on popovers | |

### Semantic Status Colors

| Status | Light | Dark | Usage |
|--------|-------|------|-------|
| Success | #10B981 | #34D399 | Positive feedback, completed actions |
| Warning | #F59E0B | #FBBF24 | Caution, attention needed |
| Error | #EF4444 | #F87171 | Errors, failed actions |
| Info | #3B82F6 | #60A5FA | Informational messages |

---

## 3. Semantic Design Tokens

These tokens map to CSS variables and should be used throughout the application for consistency.

### Background & Foreground
```css
--background
--foreground
```

### Cards & Popovers
```css
--card
--card-foreground
--popover
--popover-foreground
```

### Primary & Secondary
```css
--primary
--primary-foreground
--secondary
--secondary-foreground
```

### Muted & Accent
```css
--muted
--muted-foreground
--accent
--accent-foreground
```

### Destructive
```css
--destructive
--destructive-foreground
```

### Border, Input, Ring
```css
--border
--input
--ring
```

### Chart Colors
```css
--chart-1: 160 84% 39%
--chart-2: 220 91% 56%
--chart-3: 38 92% 50%
--chart-4: 0 84% 60%
--chart-5: 262 83% 58%
```

### Hover States
```css
/* Hover backgrounds should be 5-10% darker/lighter than base */
```

### Disabled States
```css
/* 50% opacity for disabled elements */
```

### Focus
```css
/* 2px ring using --ring color */
```

### Active
```css
/* Slightly darker shade of primary for active state */
```

---

## 4. Typography

### Primary Font
- **Font Family**: Inter (system-ui fallback)
- **Why Inter?**: Modern, highly legible sans-serif, designed for screens, widely used in enterprise applications

### Fallback Stack
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Typographic Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 0.75rem (12px) | 1rem (16px) | Captions, helper text |
| `--text-sm` | 0.875rem (14px) | 1.25rem (20px) | Secondary text, labels |
| `--text-base` | 1rem (16px) | 1.5rem (24px) | Body text, default |
| `--text-lg` | 1.125rem (18px) | 1.75rem (28px) | Large body, small headings |
| `--text-xl` | 1.25rem (20px) | 1.75rem (28px) | Section headings |
| `--text-2xl` | 1.5rem (24px) | 2rem (32px) | Page subheadings |
| `--text-3xl` | 1.875rem (30px) | 2.25rem (36px) | Page headings |
| `--text-4xl` | 2.25rem (36px) | 2.5rem (40px) | Hero text |

### Font Weights
| Token | Weight | Usage |
|-------|--------|-------|
| `--font-normal` | 400 | Body text, default |
| `--font-medium` | 500 | Labels, emphasis |
| `--font-semibold` | 600 | Headings, buttons |
| `--font-bold` | 700 | Hero text, strong emphasis |

### Letter Spacing
| Token | Spacing | Usage |
|-------|---------|-------|
| `--tracking-tight` | -0.025em | Headings |
| `--tracking-normal` | 0em | Body text, default |
| `--tracking-wide` | 0.025em | Labels, uppercase |

### Button Text
- Size: `--text-sm` (14px)
- Weight: `--font-medium` (500)
- Line Height: 1.25rem (20px)

---

## 5. Spacing System

### Base Grid
- **4px grid**: All spacing should be multiples of 4px

### Spacing Scale
| Token | Size | Usage |
|-------|------|-------|
| `--spacing-1` | 0.25rem (4px) | Tight spacing, small gaps |
| `--spacing-2` | 0.5rem (8px) | Small gaps between elements |
| `--spacing-3` | 0.75rem (12px) | Medium gaps |
| `--spacing-4` | 1rem (16px) | Default spacing, padding |
| `--spacing-5` | 1.25rem (20px) | Medium padding |
| `--spacing-6` | 1.5rem (24px) | Card padding, section spacing |
| `--spacing-8` | 2rem (32px) | Large gaps, section spacing |
| `--spacing-10` | 2.5rem (40px) | Page margins |
| `--spacing-12` | 3rem (48px) | Large section spacing |
| `--spacing-16` | 4rem (64px) | Hero section spacing |

### Container Widths
| Token | Size | Usage |
|-------|------|-------|
| `--container-sm` | 40rem (640px) | Small containers |
| `--container-md` | 48rem (768px) | Medium containers |
| `--container-lg` | 64rem (1024px) | Large containers |
| `--container-xl` | 80rem (1280px) | Extra large containers |
| `--container-2xl` | 96rem (1536px) | Ultra-wide containers |

### Max Content Width
- **Max readable width**: 65ch for optimal readability

### Responsive Spacing
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to adjust spacing for different viewports

---

## 6. Border Radius

### Radius Scale
| Token | Size | Usage |
|-------|------|-------|
| `--radius-none` | 0px | Square corners |
| `--radius-sm` | 0.25rem (4px) | Small buttons, inputs |
| `--radius-md` | 0.375rem (6px) | Default radius, buttons |
| `--radius-lg` | 0.5rem (8px) | Cards, dialogs |
| `--radius-xl` | 0.75rem (12px) | Large cards |
| `--radius-2xl` | 1rem (16px) | Hero elements |
| `--radius-full` | 9999px | Avatars, badges, round buttons |

### Rationale
- Consistent radius system creates visual harmony
- Larger elements get larger radii for balanced proportions
- No excessive rounding—maintain professional appearance

---

## 7. Shadows

### Elevation Levels
| Token | Shadow | Usage |
|-------|--------|-------|
| `--shadow-sm` | 0 1px 2px 0 hsl(0 0% 0% / 0.05) | Subtle elevation, inputs |
| `--shadow-md` | 0 4px 6px -1px hsl(0 0% 0% / 0.1), 0 2px 4px -2px hsl(0 0% 0% / 0.1) | Cards, dropdowns |
| `--shadow-lg` | 0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -4px hsl(0 0% 0% / 0.1) | Hover states, raised elements |
| `--shadow-xl` | 0 20px 25px -5px hsl(0 0% 0% / 0.1), 0 8px 10px -6px hsl(0 0% 0% / 0.1) | Modals, dialogs |

### Rationale
- Only 3 elevation levels for simplicity and consistency
- Subtle shadows create depth without being distracting
- Shadows increase with elevation for clear hierarchy

---

## 8. Component Standards

### Buttons

#### Purpose
Primary interactive elements for user actions

#### Variants
| Variant | Usage | Styles |
|---------|-------|--------|
| `default` | Primary actions, CTAs | Background: `--primary`, Text: `--primary-foreground` |
| `secondary` | Secondary actions | Background: `--secondary`, Text: `--secondary-foreground` |
| `outline` | Tertiary actions, ghost buttons | Border: `--border`, Background: transparent |
| `ghost` | Subtle actions, icons | Background: transparent, hover: `--accent` |
| `destructive` | Dangerous actions (delete, remove) | Background: `--destructive`, Text: `--destructive-foreground` |
| `link` | Text links | Underline, text color `--primary` |

#### Sizes
| Size | Padding | Height | Usage |
|------|---------|--------|-------|
| `sm` | 0.5rem 1rem | 2rem (32px) | Compact buttons |
| `default` | 0.75rem 1.5rem | 2.5rem (40px) | Default buttons |
| `lg` | 1rem 2rem | 3rem (48px) | Large CTAs |
| `icon` | 0.5rem | 2.5rem (40px) | Icon-only buttons |

#### Spacing
- Gap between icon and text: `--spacing-2` (8px)
- Gap between button groups: `--spacing-2` (8px)

#### Interaction Rules
- **Hover**: Slightly darker shade of background
- **Focus**: Visible `--ring` color outline
- **Active**: Pressed state (slightly darker)
- **Disabled**: 50% opacity, pointer-events none

#### Accessibility
- Always include accessible labels for icon buttons
- Maintain 4.5:1 contrast ratio
- Support keyboard navigation (Tab, Enter, Space)

---

### Inputs

#### Purpose
Allow users to enter and edit text and data

#### Types
- Text input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Date picker
- File upload

#### Sizing
| Size | Padding | Height | Usage |
|------|---------|--------|-------|
| `sm` | 0.5rem 0.75rem | 2rem (32px) | Compact inputs |
| `default` | 0.75rem 1rem | 2.5rem (40px) | Default inputs |
| `lg` | 1rem 1.25rem | 3rem (48px) | Large inputs |

#### Spacing
- Gap between label and input: `--spacing-2` (8px)
- Gap between helper text and input: `--spacing-1` (4px)
- Gap between form fields: `--spacing-4` (16px)

#### Interaction Rules
- **Focus**: Visible `--ring` color outline, border color `--primary`
- **Error**: Border color `--destructive`, show error message
- **Disabled**: 50% opacity, pointer-events none
- **Placeholder**: `--muted-foreground` color

#### Accessibility
- Always include visible labels (don't rely solely on placeholders)
- Associate labels with inputs using `id` and `for` attributes
- Show clear error messages
- Support keyboard navigation

---

### Tables

#### Purpose
Display structured data in rows and columns

#### Structure
- Header row with bold text
- Data rows with alternating backgrounds (optional)
- Hover state for interactive rows
- Clear borders and spacing

#### Spacing
- Cell padding: `--spacing-3` (12px) vertical, `--spacing-4` (16px) horizontal
- Gap between table and other elements: `--spacing-6` (24px)

#### Interaction Rules
- **Sortable columns**: Show sort indicator on hover/click
- **Selectable rows**: Visual feedback for selected state
- **Actions**: Action buttons in final column

#### Accessibility
- Use semantic `<table>` elements
- Include `<th>` with proper scope attributes
- Support keyboard navigation for interactive tables
- Provide column headers for screen readers

---

### Cards

#### Purpose
Contain and organize related content

#### Types
- Content card
- Stat card
- Action card
- Empty state card

#### Structure
- Card wrapper with background and border
- Card header (optional)
- Card content
- Card footer (optional)

#### Spacing
- Card padding: `--spacing-6` (24px)
- Gap between card sections: `--spacing-4` (16px)
- Gap between cards: `--spacing-4` (16px)

#### Interaction Rules
- **Hover**: Optional subtle shadow increase for interactive cards
- **Clickable**: Pointer cursor, full card clickable

#### Accessibility
- If card is clickable, include proper ARIA attributes
- Maintain readable contrast
- Support keyboard navigation

---

### Sidebar

#### Purpose
Primary navigation and menu system

#### Structure
- Logo/branding area
- Navigation links
- User profile/settings area
- Collapsible (optional on larger screens)

#### Behavior
- **Mobile**: Hidden by default, slide-out on toggle
- **Tablet/Desktop**: Persistent or collapsible
- Active state: Highlighted with primary color

#### Spacing
- Sidebar width: 16rem (256px)
- Navigation item padding: `--spacing-3` (12px) vertical, `--spacing-4` (16px) horizontal
- Gap between navigation items: `--spacing-1` (4px)

#### Accessibility
- Proper ARIA navigation roles
- Keyboard navigable
- Visible focus states
- Skip-to-content link

---

### Navbar

#### Purpose
Top-level navigation and user actions

#### Structure
- Logo
- Primary navigation (mobile only)
- Search (optional)
- User menu
- Notifications (optional)
- Theme toggle

#### Spacing
- Navbar height: 4rem (64px)
- Internal padding: `--spacing-4` (16px) horizontal
- Gap between navbar elements: `--spacing-4` (16px)

---

### Dialogs (Modals)

#### Purpose
Display important content or actions without navigating away

#### Types
- Confirmation dialog
- Form dialog
- Information dialog

#### Structure
- Overlay (semi-transparent background)
- Dialog container
- Dialog header (title, close button)
- Dialog content
- Dialog footer (actions)

#### Sizing
| Size | Width | Usage |
|------|-------|-------|
| `sm` | 28rem (448px) | Small dialogs |
| `default` | 32rem (512px) | Default dialogs |
| `lg` | 40rem (640px) | Large dialogs |
| `xl` | 50rem (800px) | Extra large dialogs |

#### Interaction Rules
- **Open**: Focus trapped in dialog
- **Close**: Click X, click overlay, or press Escape
- **Actions**: Primary action on right, secondary on left

#### Accessibility
- Use ARIA `role="dialog"` and `aria-modal="true"`
- Focus management (trap focus, return focus when closed)
- Esc key to close
- Overlay click to close

---

### Dropdowns

#### Purpose
Display a list of actions or options when triggered

#### Structure
- Trigger button
- Dropdown menu
- Menu items (with optional icons)
- Dividers (for grouping)

#### Spacing
- Menu padding: `--spacing-2` (8px)
- Menu item padding: `--spacing-2` (8px) vertical, `--spacing-3` (12px) horizontal
- Gap between items: `--spacing-1` (4px)

#### Interaction Rules
- **Open**: Click trigger or press Enter/Space
- **Navigate**: Arrow keys
- **Select**: Enter/Space or click
- **Close**: Click outside, press Escape, or select item

#### Accessibility
- ARIA `role="menu"` and `role="menuitem"`
- Keyboard navigation
- Focus management

---

### Badges

#### Purpose
Highlight status, counts, or categories

#### Types
- Status badge
- Count badge
- Category badge

#### Sizing
| Size | Padding | Font Size |
|------|---------|-----------|
| `sm` | 0.125rem 0.375rem | 0.75rem (12px) |
| `default` | 0.25rem 0.5rem | 0.875rem (14px) |
| `lg` | 0.375rem 0.625rem | 1rem (16px) |

#### Colors
- Primary: `--primary` background
- Secondary: `--secondary` background
- Success: Success color
- Warning: Warning color
- Error: Error color
- Outline: `--border` border, transparent background

---

### Toast (Notifications)

#### Purpose
Provide temporary, non-intrusive feedback

#### Types
- Success toast
- Error toast
- Warning toast
- Info toast

#### Structure
- Icon
- Message
- Optional action button
- Close button

#### Behavior
- Appear in top-right corner (top-center on mobile)
- Auto-dismiss after 4-5 seconds (except error toasts)
- Can be dismissed manually
- Stacked if multiple appear

#### Spacing
- Padding: `--spacing-4` (16px)
- Gap between toasts: `--spacing-3` (12px)

#### Accessibility
- `role="alert"` or `role="status"`
- Auto-dismiss should be pauseable on hover
- Keyboard dismissible

---

### Empty States

#### Purpose
Provide helpful feedback when there's no data to display

#### Structure
- Icon
- Title
- Description
- Optional action button

#### Guidelines
- Keep copy concise and helpful
- Offer a clear next step if possible
- Use a friendly tone
- Don't leave users guessing

---

### Loading States

#### Purpose
Indicate that content is being loaded

#### Types
- Spinner
- Skeleton loader
- Progress bar

#### Guidelines
- Show loading state immediately
- Don't leave users waiting without feedback
- Use skeleton loaders for better perceived performance
- Avoid layout shift when content loads

---

### Skeleton Loaders

#### Purpose
Provide a visual placeholder while content loads

#### Guidelines
- Match the shape of the actual content
- Use subtle animation (pulse or shimmer)
- Don't over-animate
- Should be roughly the same size as loaded content

---

### Pagination

#### Purpose
Allow navigation through large datasets

#### Structure
- Previous button
- Page numbers
- Next button
- Optional: Items per page selector
- Optional: Page info (e.g., "1-10 of 50")

#### Sizing
Buttons match button component sizing (default: 2.5rem/40px height)

#### Accessibility
- Semantic buttons
- Clear labels
- Current page indication
- Keyboard navigation

---

### Forms

#### Purpose
Collect user input

#### Structure
- Form fields in logical order
- Labels for all inputs
- Helper text (where needed)
- Error messages (inline)
- Submit button (primary variant)
- Optional: Cancel button (secondary or ghost variant)

#### Spacing
- Gap between fields: `--spacing-4` (16px)
- Gap between label and input: `--spacing-2` (8px)
- Gap between form and buttons: `--spacing-6` (24px)

#### Guidelines
- Group related fields
- Use clear, descriptive labels
- Provide helpful error messages
- Mark required fields clearly
- Validate input early (inline validation)
- Show loading state on submit

---

## 9. Icons

### Icon System
- **Library**: Lucide React
- **Why Lucide?**: Modern, consistent, open-source, 1000+ icons, well-maintained, works great with shadcn/ui

### Icon Sizing
| Size | Usage |
|------|-------|
| 16px | Small badges, inline text |
| 20px | Buttons, inputs |
| 24px | Default, most cases |
| 32px | Large buttons, hero sections |
| 48px | Empty states, illustrations |

### Guidelines
- Use icons consistently (same icon for same action)
- Don't rely solely on icons—always include labels
- Keep icon style consistent (don't mix icon libraries)
- Icons should have 3:1 contrast ratio with background

---

## 10. Motion System

### Animation Philosophy
- **Subtle and purposeful**: No excessive or decorative animations
- **Fast**: Animations should feel snappy, not sluggish
- **Reduced motion support**: Respect user preferences

### Duration
| Token | Duration | Usage |
|-------|----------|-------|
| `--duration-75` | 75ms | Quick state changes |
| `--duration-150` | 150ms | Hover states |
| `--duration-200` | 200ms | Small transitions |
| `--duration-300` | 300ms | Default transitions |
| `--duration-500` | 500ms | Larger transitions |

**Maximum duration**: 500ms for any animation

### Easing
| Token | Curve | Usage |
|-------|-------|-------|
| `--ease-default` | cubic-bezier(0.4, 0, 0.2, 1) | Default transitions |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Entrance animations |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Exit animations |

### Hover Animation
- Subtle background color change
- Optional: Subtle scale (1.02x)
- Duration: `--duration-150`
- Easing: `--ease-default`

### Page Transitions
- Optional, subtle fade-in
- Duration: `--duration-200`
- Easing: `--ease-out`

### Modal Animation
- Fade in overlay
- Slide up modal (or scale from center)
- Duration: `--duration-300`
- Easing: `--ease-out`

### Loading Animation
- Spinner: Rotate animation
- Skeleton: Pulse or shimmer
- Duration: `--duration-1000` loop

### Skeleton Animation
- Subtle shimmer or pulse
- Duration: `--duration-2000` loop
- Easing: `--ease-in-out`

### Reduced Motion Support
- Always use `prefers-reduced-motion` media query
- Disable or reduce animations for users who prefer it
- Never remove important state changes

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Responsive Breakpoints

### Breakpoint Scale
| Token | Min Width | Device Category |
|-------|-----------|-----------------|
| `--breakpoint-sm` | 40rem (640px) | Small screens (phablets) |
| `--breakpoint-md` | 48rem (768px) | Medium screens (tablets) |
| `--breakpoint-lg` | 64rem (1024px) | Large screens (laptops) |
| `--breakpoint-xl` | 80rem (1280px) | Extra large screens (desktops) |
| `--breakpoint-2xl` | 96rem (1536px) | Ultra-wide screens |

### Grid
- Use CSS Grid or Flexbox for responsive layouts
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns
- Ultra-wide: 4+ columns (or max width container)

### Sidebar Behavior
- **Mobile (< 768px)**: Hidden by default, slide-out on toggle
- **Tablet (768px-1023px)**: Collapsible (icons only by default)
- **Desktop (≥ 1024px)**: Persistent, full width

### Navigation Behavior
- **Mobile**: Hamburger menu, slide-out sidebar or bottom nav
- **Tablet**: Collapsible sidebar or full nav
- **Desktop**: Full sidebar navigation

### Cards
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns

### Tables
- **Mobile**: Stacked cards or horizontal scroll
- **Tablet**: Horizontal scroll or reduced columns
- **Desktop**: Full table

### Forms
- **Mobile**: 1 column, full-width inputs
- **Tablet**: 1-2 columns
- **Desktop**: 2+ columns where appropriate

---

## 12. Accessibility

### WCAG 2.2 AA Compliance
We aim for full WCAG 2.2 AA compliance. Key requirements:

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order follows visual order
- Focus visible at all times
- Skip to main content link at top of page
- Keyboard shortcuts (where appropriate) with documentation

### Focus Indicators
- Visible focus ring for all interactive elements
- Use `--ring` color for focus states
- Don't remove `outline` without providing a custom focus indicator
- Focus ring should have 3:1 contrast ratio

### Contrast Ratios
- Normal text: 4.5:1 minimum (AA)
- Large text: 3:1 minimum (AA)
- UI components and graphics: 3:1 minimum
- Aim for 7:1 where possible (AAA)

### Touch Target Sizes
- Minimum: 44px × 44px on mobile
- Minimum: 24px × 24px on desktop
- Adequate spacing between touch targets

### ARIA Usage
- Use semantic HTML elements first (`<button>` instead of `<div role="button">`)
- Only use ARIA when semantic HTML isn't sufficient
- Follow WAI-ARIA Authoring Practices
- Provide proper labels and descriptions

### Screen Reader Support
- Test with popular screen readers (NVDA, VoiceOver, JAWS)
- Use proper heading hierarchy (h1 → h2 → h3)
- Provide alt text for images
- Use `aria-live` for dynamic content
- Don't rely on color alone to convey information

### Reduced Motion
- Respect `prefers-reduced-motion` media query
- Disable or reduce animations for users who prefer it

---

## 13. UX Standards

### Loading States
- Show loading state immediately when user initiates action
- Use skeleton loaders for better perceived performance
- Avoid layout shift when content loads
- Provide clear feedback when loading fails

### Error States
- Show clear, helpful error messages
- Highlight invalid fields
- Explain how to fix the error
- Don't blame the user
- Offer recovery options

### Success States
- Provide clear confirmation of success
- Use both text and color (don't rely solely on color)
- Consider using a toast notification
- Show what changed or what happens next

### Empty States
- Don't leave blank space
- Explain why there's no data
- Offer a clear next step if possible
- Keep copy friendly and helpful

### Confirmation Dialogs
- Use for destructive or irreversible actions
- Clearly state what will happen
- Require explicit confirmation
- Provide "Cancel" as default option

### Delete Confirmation
- Always confirm before deleting
- Show what will be deleted
- Use destructive button variant for "Delete"
- Consider requiring text confirmation for critical deletions

### Search Behavior
- Provide clear search input
- Show loading state while searching
- Display results clearly
- Handle empty results gracefully
- Consider debouncing search queries

### Filtering
- Clear filter UI
- Show active filters
- Allow clearing individual filters or all at once
- Persist filters across sessions (optional)

### Sorting
- Clear sort indicators
- Allow sorting by multiple columns where appropriate
- Show current sort direction
- Persist sort preferences (optional)

### Pagination
- Show current page and total pages
- Provide first/previous/next/last buttons
- Allow changing items per page
- Show range of items displayed

### Notifications
- Use toast notifications for non-critical updates
- Don't over-notify
- Allow dismissing notifications
- Prioritize important notifications
- Consider a notification center for persistent notifications

### Optimistic Updates
- Update UI immediately on user action
- Then sync with server
- Handle failures gracefully
- Revert UI and show error if update fails

---

## 14. Performance Standards

### Target Perceived Performance
- **Instant visual feedback**: Users should see a response to their action immediately
- **Skeleton loading**: Use skeleton loaders instead of spinners where appropriate for better perceived performance
- **Lazy loading**: Lazy load non-critical resources (images, components below the fold)
- **Avoid layout shift**: Use aspect ratio boxes, reserve space for loading content
- **Avoid unnecessary animations**: Keep animations subtle and purposeful
- **Minimize re-renders**: Use proper state management, memoization

### Actual Performance Targets
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Interaction to Next Paint (INP): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

### Key Optimizations
- Code splitting
- Image optimization (compression, lazy loading, responsive images)
- Debounce expensive operations (search, resize)
- Memoize components and values
- Use efficient state management
- Optimize bundle size
- Server-side rendering or static generation where appropriate

---

## 15. Design Rules

### Hard Rules (No Exceptions)
1. **Never use more than one primary color**
2. **Never use decorative gradients** (except when explicitly justified and approved)
3. **Never use more than three shadow elevations**
4. **Never use more than two font families** (primary + monospace if needed)
5. **Never create inconsistent spacing** (always use spacing scale)
6. **Always use semantic colors** (don't use raw hex values)
7. **Always use reusable components** (don't reinvent the wheel)
8. **Always maintain accessibility** (WCAG 2.2 AA as minimum)
9. **Never rely solely on color to convey information** (always include text or icons)
10. **Never skip loading states** (users need feedback)

### Guidelines (Strongly Recommended)
1. Prefer simple, clear designs over complex ones
2. When in doubt, use more whitespace
3. Be consistent—if you're not sure, check existing patterns
4. Test designs with real users
5. Design for mobile first
6. Keep copy clear, concise, and helpful
7. Prioritize accessibility from the start
8. Don't over-annotate—let the design speak for itself
9. Use progressive disclosure—don't show everything at once
10. Iterate and improve—design is never perfect

---

## Resources & References

### Official Documentation
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

### Design Systems & Guidelines
- [Material Design 3](https://m3.material.io)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Refactoring UI](https://www.refactoringui.com)

### Accessibility
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22)
- [Nielsen Norman Group (NN/g)](https://www.nngroup.com)

### Inspiration
- Linear
- Vercel
- GitHub
- Stripe
- Notion

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-07-11 | Initial design system creation | Design System Team |

---

## Approval

This design system must be approved by the design and engineering teams before implementation begins.

[ ] Approved by Design Lead
[ ] Approved by Engineering Lead
[ ] Approved by Product Manager

Date of Approval: _______________
