# ZeroWaste Connect Design System v2.0

> **Single Source of Truth**: This document defines the visual and functional design system for the entire ZeroWaste Connect application. All UI decisions must conform to these guidelines unless explicitly updated in this document.

---

## Critical Review Summary (v1 to v2)

### Key Improvements
- Added comprehensive Decision Log (DDR) for all critical choices
- Expanded Color System with full semantic token set (50-950 scales, sidebar, charts, states)
- Added Data Visualization Standards (Recharts)
- Added Mapping Standards (React Leaflet)
- Added Dashboard Standards
- Added Authentication UX standards
- Expanded Form Standards (multi-step, wizard, file upload, etc.)
- Added complete Component Inventory (25+ components)
- Created Motion System v2 with Framer Motion presets
- Added Mobile UX Standards
- Added Optimistic UI Strategy
- Added Error Handling Standards
- Expanded Performance Standards with measurable budgets
- Created UX Rules (hard rules)
- Created Copywriting Standards
- Created Folder Structure Standards
- Created Implementation Strategy with 8 phases

### Inconsistencies Fixed
- Clarified animation duration token consistency
- Expanded shadow system to be consistent with shadcn/ui
- Standardized touch target sizes across all breakpoints

### Gaps Addressed
- Complete component inventory documentation
- Clear optimistic UI strategy with rollback plans
- Granular error handling for all HTTP status codes
- Mobile-specific UX standards (bottom nav, FAB, etc.)
- Copywriting guidelines for all UI elements

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

## 2. Decision Log (DDR)

### Decision: Primary Color Choice
- **Decision**: Use emerald green (#10B981) as primary color
- **Alternatives**: Blue, Teal, Forest Green
- **Pros**: Conveys growth, sustainability, trust; high contrast on light/dark; widely recognizable for eco-friendly apps
- **Cons**: Less common in enterprise B2B apps
- **Final Choice**: Emerald green (#10B981)
- **Reasoning**: Aligns perfectly with ZeroWaste's sustainability mission; strong contrast ratios; consistent with modern eco-applications
- **Confidence Level**: 95%

### Decision: UI Component Library
- **Decision**: Use shadcn/ui + Radix UI + Tailwind CSS
- **Alternatives**: Material UI, Chakra UI, Ant Design
- **Pros**: Radix provides accessible primitives; shadcn/ui is customizable and unstyled; Tailwind ensures consistency; minimal bundle size; excellent documentation
- **Cons**: Steeper learning curve for developers unfamiliar with Tailwind; requires manual setup of components
- **Final Choice**: shadcn/ui + Radix UI + Tailwind CSS
- **Reasoning**: Best balance of accessibility, customizability, and performance for our needs; aligns with industry leaders like Vercel and Linear
- **Confidence Level**: 98%

### Decision: Icon Library
- **Decision**: Use Lucide React
- **Alternatives**: Heroicons, Phosphor Icons, Feather Icons
- **Pros**: 1000+ icons; consistent style; MIT licensed; well-maintained; works great with shadcn/ui
- **Cons**: Slightly fewer specialized icons than some libraries
- **Final Choice**: Lucide React
- **Reasoning**: Perfect balance of quantity, quality, and consistency
- **Confidence Level**: 95%

### Decision: Charting Library
- **Decision**: Use Recharts
- **Alternatives**: Chart.js, D3.js, Victory
- **Pros**: Declarative React components; customizable; good documentation; widely used; works with Tailwind
- **Cons**: Less flexibility than D3.js for very custom charts
- **Final Choice**: Recharts
- **Reasoning**: Best fit for our dashboard needs; balances power and simplicity
- **Confidence Level**: 92%

### Decision: Mapping Library
- **Decision**: Use React Leaflet
- **Alternatives**: Google Maps React, Mapbox GL JS, Leaflet
- **Pros**: Open-source; lightweight; works with OpenStreetMap; good React bindings; customizable
- **Cons**: Less polished than Google Maps/Mapbox for advanced use cases
- **Final Choice**: React Leaflet
- **Reasoning**: Open-source, cost-effective, and meets our mapping requirements
- **Confidence Level**: 88%

### Decision: Animation Library
- **Decision**: Use Framer Motion
- **Alternatives**: React Spring, CSS Transitions, GSAP
- **Pros**: Simple API; powerful; works with React Server Components; excellent documentation; reduced motion support built-in
- **Cons**: Adds ~20KB to bundle size
- **Final Choice**: Framer Motion
- **Reasoning**: Best developer experience; most flexible; aligns with modern React apps
- **Confidence Level**: 94%

### Decision: State Management
- **Decision**: Use React Context + hooks for global state; local state for component-level
- **Alternatives**: Redux, Zustand, Jotai
- **Pros**: No extra dependencies; built-in React features; simple for app scale
- **Cons**: Less optimized for very large apps; more boilerplate for complex state
- **Final Choice**: React Context + hooks
- **Reasoning**: App scale doesn't require full Redux; keeps dependencies minimal
- **Confidence Level**: 90%

---

## 3. Complete Color System

### Core Principles
- Semantic tokens only (no raw hex values in components)
- Full 50-950 scales for all colors
- WCAG 2.2 AA contrast as minimum requirement
- Dark and light theme support
- No decorative colors—only for communication

### Primary Scale (Emerald)
| Token | HEX | HSL | Usage | Contrast (Light) | Contrast (Dark) |
|-------|-----|-----|-------|------------------|-----------------|
| `--primary-50` | #ecfdf5 | hsl(151, 81%, 96%) | Subtle backgrounds | - | - |
| `--primary-100` | #d1fae5 | hsl(150, 84%, 92%) | Hover backgrounds | - | - |
| `--primary-200` | #a7f3d0 | hsl(148, 83%, 84%) | Selected states | - | - |
| `--primary-300` | #6ee7b7 | hsl(156, 72%, 67%) | Borders, subtle accents | - | - |
| `--primary-400` | #34d399 | hsl(152, 76%, 60%) | Dark theme primary | - | - |
| `--primary-500` | #10b981 | hsl(160, 84%, 39%) | Light theme primary | 5.6:1 (AA) | - |
| `--primary-600` | #059669 | hsl(161, 94%, 30%) | Hover (light) | - | - |
| `--primary-700` | #047857 | hsl(163, 94%, 24%) | Active (light) | - | - |
| `--primary-800` | #065f46 | hsl(164, 86%, 20%) | - | - | - |
| `--primary-900` | #064e3b | hsl(166, 84%, 17%) | - | - | - |
| `--primary-950` | #022c22 | hsl(168, 85%, 9%) | - | - | - |

### Neutral Scale (Slate)
| Token | HEX | HSL | Usage |
|-------|-----|-----|-------|
| `--neutral-50` | #f8fafc | hsl(210, 40%, 98%) | Light theme background |
| `--neutral-100` | #f1f5f9 | hsl(210, 40%, 94%) | Subtle backgrounds |
| `--neutral-200` | #e2e8f0 | hsl(214, 32%, 91%) | Borders, dividers |
| `--neutral-300` | #cbd5e1 | hsl(213, 27%, 84%) | Disabled text |
| `--neutral-400` | #94a3b8 | hsl(215, 20%, 65%) | Dark theme secondary text |
| `--neutral-500` | #64748b | hsl(215, 16%, 47%) | Light theme secondary text |
| `--neutral-600` | #475569 | hsl(215, 19%, 35%) | - |
| `--neutral-700` | #334155 | hsl(215, 25%, 27%) | Dark theme borders |
| `--neutral-800` | #1e293b | hsl(217, 33%, 17%) | Dark theme card background |
| `--neutral-900` | #0f172a | hsl(222, 84%, 5%) | Dark theme background |
| `--neutral-950` | #020617 | hsl(222, 84%, 5%) | Dark theme deep background |

### Success Scale (Green)
| Token | HEX | HSL | Usage |
|-------|-----|-----|-------|
| `--success-50` | #f0fdf4 | hsl(141, 84%, 93%) | - |
| `--success-100` | #dcfce7 | hsl(141, 79%, 85%) | - |
| `--success-200` | #bbf7d0 | hsl(141, 76%, 73%) | - |
| `--success-300` | #86efac | hsl(142, 76%, 61%) | - |
| `--success-400` | #4ade80 | hsl(142, 71%, 58%) | Dark theme success |
| `--success-500` | #22c55e | hsl(142, 71%, 45%) | Light theme success |
| `--success-600` | #16a34a | hsl(142, 76%, 36%) | - |
| `--success-700` | #15803d | hsl(142, 72%, 29%) | - |
| `--success-800` | #166534 | hsl(143, 64%, 24%) | - |
| `--success-900` | #14532d | hsl(144, 61%, 20%) | - |

### Warning Scale (Amber)
| Token | HEX | HSL | Usage |
|-------|-----|-----|-------|
| `--warning-50` | #fffbeb | hsl(48, 100%, 96%) | - |
| `--warning-100` | #fef3c7 | hsl(48, 96%, 89%) | - |
| `--warning-200` | #fde68a | hsl(48, 96%, 77%) | - |
| `--warning-300` | #fcd34d | hsl(46, 97%, 65%) | - |
| `--warning-400` | #fbbf24 | hsl(44, 96%, 56%) | Dark theme warning |
| `--warning-500` | #f59e0b | hsl(42, 91%, 55%) | Light theme warning |
| `--warning-600` | #d97706 | hsl(38, 92%, 50%) | - |
| `--warning-700` | #b45309 | hsl(32, 95%, 44%) | - |
| `--warning-800` | #92400e | hsl(28, 88%, 38%) | - |
| `--warning-900` | #78350f | hsl(25, 87%, 29%) | - |

### Error Scale (Red)
| Token | HEX | HSL | Usage |
|-------|-----|-----|-------|
| `--error-50` | #fef2f2 | hsl(0, 86%, 97%) | - |
| `--error-100` | #fee2e2 | hsl(0, 93%, 94%) | - |
| `--error-200` | #fecaca | hsl(0, 94%, 93%) | - |
| `--error-300` | #fca5a5 | hsl(0, 94%, 82%) | - |
| `--error-400` | #f87171 | hsl(0, 94%, 71%) | Dark theme error |
| `--error-500` | #ef4444 | hsl(0, 84%, 60%) | Light theme error |
| `--error-600` | #dc2626 | hsl(0, 72%, 51%) | - |
| `--error-700` | #b91c1c | hsl(0, 70%, 42%) | - |
| `--error-800` | #991b1b | hsl(0, 63%, 35%) | - |
| `--error-900` | #7f1d1d | hsl(0, 60%, 31%) | - |

### Info Scale (Blue)
| Token | HEX | HSL | Usage |
|-------|-----|-----|-------|
| `--info-50` | #eff6ff | hsl(214, 100%, 97%) | - |
| `--info-100` | #dbeafe | hsl(213, 100%, 93%) | - |
| `--info-200` | #bfdbfe | hsl(213, 97%, 87%) | - |
| `--info-300` | #93c5fd | hsl(212, 96%, 78%) | - |
| `--info-400` | #60a5fa | hsl(213, 94%, 68%) | Dark theme info |
| `--info-500` | #3b82f6 | hsl(217, 91%, 60%) | Light theme info |
| `--info-600` | #2563eb | hsl(221, 83%, 53%) | - |
| `--info-700` | #1d4ed8 | hsl(224, 76%, 48%) | - |
| `--info-800` | #1e40af | hsl(226, 71%, 40%) | - |
| `--info-900` | #1e3a8a | hsl(226, 64%, 33%) | - |

### Sidebar Colors
| Token | Light HEX | Dark HEX | Usage |
|-------|-----------|----------|-------|
| `--sidebar-background` | #ffffff | #0f172a | Sidebar background |
| `--sidebar-foreground` | #0f172a | #f8fafc | Sidebar text |
| `--sidebar-primary` | #10b981 | #34d399 | Sidebar active item |
| `--sidebar-primary-foreground` | #ffffff | #020617 | Text on active item |
| `--sidebar-accent` | #f1f5f9 | #1e293b | Sidebar hover background |
| `--sidebar-accent-foreground` | #0f172a | #f8fafc | Text on hover |
| `--sidebar-border` | #e2e8f0 | #334155 | Sidebar borders |
| `--sidebar-ring` | #10b981 | #34d399 | Sidebar focus ring |

### Chart Colors
| Token | HSL | Usage |
|-------|-----|-------|
| `--chart-1` | 160 84% 39% | Primary chart color |
| `--chart-2` | 217 91% 60% | Secondary chart color |
| `--chart-3` | 42 91% 55% | Tertiary chart color |
| `--chart-4` | 0 84% 60% | Quaternary chart color |
| `--chart-5` | 262 83% 58% | Quinary chart color |

### Interaction States
| Token | HEX | HSL | Usage |
|-------|-----|-----|-------|
| `--hover-primary` | #059669 | hsl(161, 94%, 30%) | Primary hover |
| `--hover-secondary` | #e2e8f0 | hsl(214, 32%, 91%) | Secondary hover (light) |
| `--hover-secondary-dark` | #334155 | hsl(215, 25%, 27%) | Secondary hover (dark) |
| `--pressed-primary` | #047857 | hsl(163, 94%, 24%) | Primary pressed |
| `--focus-ring` | #10b981 | hsl(160, 84%, 39%) | Focus ring |
| `--disabled-background` | #f1f5f9 | hsl(210, 40%, 94%) | Disabled background (light) |
| `--disabled-background-dark` | #1e293b | hsl(217, 33%, 17%) | Disabled background (dark) |
| `--disabled-foreground` | #94a3b8 | hsl(215, 20%, 65%) | Disabled text |
| `--selected-background` | #d1fae5 | hsl(150, 84%, 92%) | Selected background (light) |
| `--selected-background-dark` | #064e3b | hsl(166, 84%, 17%) | Selected background (dark) |

### Overlay Colors
| Token | HSL | Usage |
|-------|-----|-------|
| `--overlay-light` | 0 0% 0% / 0.5 | Light overlay (50% opacity) |
| `--overlay-dark` | 0 0% 0% / 0.7 | Dark overlay (70% opacity) |

### Scrollbar Colors
| Token | Light HEX | Dark HEX | Usage |
|-------|-----------|----------|-------|
| `--scrollbar-track` | #f1f5f9 | #1e293b | Scrollbar track |
| `--scrollbar-thumb` | #cbd5e1 | #475569 | Scrollbar thumb |
| `--scrollbar-thumb-hover` | #94a3b8 | #64748b | Scrollbar thumb hover |

### Badge Variants
| Variant | Background (Light) | Background (Dark) | Foreground | Usage |
|---------|--------------------|-------------------|------------|-------|
| Default | `--primary-100` | `--primary-900` | `--primary-700` / `--primary-300` | General badges |
| Secondary | `--neutral-100` | `--neutral-800` | `--neutral-700` / `--neutral-300` | Secondary badges |
| Success | `--success-100` | `--success-900` | `--success-700` / `--success-300` | Success badges |
| Warning | `--warning-100` | `--warning-900` | `--warning-700` / `--warning-300` | Warning badges |
| Error | `--error-100` | `--error-900` | `--error-700` / `--error-300` | Error badges |
| Outline | transparent | transparent | `--neutral-700` / `--neutral-300` | Outline badges |

### Tag Variants
Same as Badge Variants (consistent system)

### Light Theme Full Tokens
```css
:root {
  --background: #ffffff;
  --foreground: #020617;
  --card: #ffffff;
  --card-foreground: #020617;
  --popover: #ffffff;
  --popover-foreground: #020617;
  --primary: #10b981;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #10b981;
  --radius: 0.5rem;
}
```

### Dark Theme Full Tokens
```css
.dark {
  --background: #020617;
  --foreground: #f8fafc;
  --card: #0f172a;
  --card-foreground: #f8fafc;
  --popover: #0f172a;
  --popover-foreground: #f8fafc;
  --primary: #34d399;
  --primary-foreground: #020617;
  --secondary: #1e293b;
  --secondary-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #1e293b;
  --accent-foreground: #f8fafc;
  --destructive: #f87171;
  --destructive-foreground: #020617;
  --border: #334155;
  --input: #334155;
  --ring: #34d399;
}
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
| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `--text-xs` | 0.75rem (12px) | 1rem (16px) | 0 | Captions, helper text |
| `--text-sm` | 0.875rem (14px) | 1.25rem (20px) | 0 | Secondary text, labels |
| `--text-base` | 1rem (16px) | 1.5rem (24px) | 0 | Body text, default |
| `--text-lg` | 1.125rem (18px) | 1.75rem (28px) | 0 | Large body, small headings |
| `--text-xl` | 1.25rem (20px) | 1.75rem (28px) | -0.025em | Section headings |
| `--text-2xl` | 1.5rem (24px) | 2rem (32px) | -0.025em | Page subheadings |
| `--text-3xl` | 1.875rem (30px) | 2.25rem (36px) | -0.025em | Page headings |
| `--text-4xl` | 2.25rem (36px) | 2.5rem (40px) | -0.025em | Hero text |
| `--text-5xl` | 3rem (48px) | 1 | -0.025em | Large hero text |

### Font Weights
| Token | Weight | Usage |
|-------|--------|-------|
| `--font-normal` | 400 | Body text, default |
| `--font-medium` | 500 | Labels, emphasis |
| `--font-semibold` | 600 | Headings, buttons |
| `--font-bold` | 700 | Hero text, strong emphasis |

### Button Text
- Size: `--text-sm` (14px)
- Weight: `--font-medium` (500)
- Line Height: 1.25rem (20px)

---

## 5. Spacing System

### Base Grid
- **4px grid**: All spacing must be multiples of 4px

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
| `--spacing-20` | 5rem (80px) | Extra large spacing |
| `--spacing-24` | 6rem (96px) | Maximum spacing |

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

---

## 7. Shadows

### Elevation Levels
| Token | Shadow (Light) | Shadow (Dark) | Usage |
|-------|----------------|---------------|-------|
| `--shadow-sm` | 0 1px 2px 0 hsl(0 0% 0% / 0.05) | 0 1px 2px 0 hsl(0 0% 0% / 0.3) | Subtle elevation, inputs |
| `--shadow` | 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1) | 0 1px 3px 0 hsl(0 0% 0% / 0.3), 0 1px 2px -1px hsl(0 0% 0% / 0.3) | Default shadow |
| `--shadow-md` | 0 4px 6px -1px hsl(0 0% 0% / 0.1), 0 2px 4px -2px hsl(0 0% 0% / 0.1) | 0 4px 6px -1px hsl(0 0% 0% / 0.3), 0 2px 4px -2px hsl(0 0% 0% / 0.3) | Cards, dropdowns |
| `--shadow-lg` | 0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -4px hsl(0 0% 0% / 0.1) | 0 10px 15px -3px hsl(0 0% 0% / 0.3), 0 4px 6px -4px hsl(0 0% 0% / 0.3) | Hover states, raised elements |
| `--shadow-xl` | 0 20px 25px -5px hsl(0 0% 0% / 0.1), 0 8px 10px -6px hsl(0 0% 0% / 0.1) | 0 20px 25px -5px hsl(0 0% 0% / 0.3), 0 8px 10px -6px hsl(0 0% 0% / 0.3) | Modals, dialogs |
| `--shadow-2xl` | 0 25px 50px -12px hsl(0 0% 0% / 0.25) | 0 25px 50px -12px hsl(0 0% 0% / 0.5) | Maximum elevation |

---

## 8. Data Visualization Standards

### Core Principles
- Clear, accessible, non-decorative charts
- Consistent color palette (use chart tokens)
- Always include legends and labels
- Responsive to container size
- Accessible to screen readers

### Chart Types & Standards

#### Bar Charts
- **Orientation**: Horizontal preferred for category labels; vertical for time series
- **Bar Width**: 60-80% of category space
- **Spacing**: 4px between bars in a group; 16px between groups
- **Colors**: Use `--chart-1` to `--chart-5` in order
- **Gridlines**: Only y-axis gridlines (light, subtle)
- **Axis**: Clear labels; minimum 10px padding
- **Tooltip**: Shows exact value on hover/focus
- **Accessibility**: Add `aria-label`, `role="img"`, and description

#### Line Charts
- **Line Width**: 2px
- **Point Radius**: 4px (visible on hover only)
- **Colors**: Use chart tokens
- **Gridlines**: Both axes (subtle)
- **Tooltip**: Shows value and timestamp
- **Accessibility**: Screen reader description of trend

#### Area Charts
- **Fill Opacity**: 20-30%
- **Line Width**: 2px
- **Colors**: Same as line charts, with semi-transparent fill
- **Usage**: For cumulative data (donations over time, etc.)

#### Pie/Donut Charts
- **Avoid pie charts**: Prefer donut charts or bar charts for better readability
- **Donut Inner Radius**: 60-70% of outer radius
- **Max Slices**: 5-6 (group small slices into "Other")
- **Center Content**: Optional total count/value in center
- **Colors**: Use chart tokens in order
- **Accessibility**: Always pair with a data table or legend with percentages

#### Radar Charts
- **Usage**: Rare—only for comparing multiple dimensions
- **Gridlines**: 3-5 concentric circles
- **Colors**: Max 3 datasets
- **Accessibility**: Add detailed description

#### Progress Bars/Circles
- **Progress Bar Height**: 8-12px
- **Progress Circle Size**: 48-96px (depending on context)
- **Colors**: 
  - < 33%: Error
  - 33-66%: Warning
  - > 66%: Success
- **Label**: Always show percentage or value
- **Accessibility**: Include `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

### KPIs (Key Performance Indicators)
- **Structure**: 
  - Icon (optional, left)
  - Value (large, bold)
  - Label (small, muted)
  - Trend indicator (optional, up/down arrow with color)
- **Size**: 
  - Value: `--text-3xl` to `--text-5xl`
  - Label: `--text-sm`
- **Colors**: 
  - Positive trend: Success
  - Negative trend: Error
  - Neutral: Primary

### Empty Charts
- **State**: Show empty state component
- **Content**: Icon + "No data available" + optional CTA
- **Layout**: Centered within chart container

### Loading Charts
- **State**: Show skeleton loader matching chart shape
- **Layout**: Preserve exact dimensions of final chart to avoid layout shift
- **Animation**: Subtle pulse (1.5s duration)

### Legends
- **Position**: Top, right, or bottom (depending on chart type)
- **Spacing**: 8px between legend items
- **Symbol Size**: 12x12px
- **Text**: `--text-sm`, `--font-medium`
- **Interaction**: Click to toggle dataset visibility (optional)

### Gridlines
- **Color**: `--neutral-200` (light), `--neutral-700` (dark)
- **Width**: 1px
- **Style**: Solid (not dashed)

### Axis
- **Labels**: `--text-xs`, `--muted-foreground`
- **Ticks**: Every 2-5 units (depending on scale)
- **Padding**: 8px from edge

### Tooltip
- **Background**: `--popover`
- **Border**: 1px solid `--border`
- **Border Radius**: `--radius-md`
- **Shadow**: `--shadow-md`
- **Padding**: 8px 12px
- **Content**: Clear, concise values
- **Trigger**: Hover + focus

### Color Usage Rules
- Never use more than 5 colors in a single chart
- Always use chart tokens (never raw colors)
- Ensure colors are distinguishable by colorblind users
- Don't rely on color alone—add labels or patterns

### Accessibility
- All charts must have `aria-label` and `role="img"`
- Complex charts need a detailed description (`aria-describedby`)
- Data should be available in tabular form for screen readers
- Keyboard navigation for interactive charts
- 3:1 contrast for all chart elements
- Follow WCAG 2.2 AA guidelines

### Responsive Behavior
- Charts must be responsive to container width
- On mobile:
  - Simplify complex charts
  - Increase touch targets
  - Stack legends vertically
  - Use horizontal scroll for wide charts

---

## 9. Mapping Standards

### Core Principles
- Clear, functional maps (not decorative)
- Accessible markers and controls
- Mobile-optimized interactions
- Dark/light theme support

### Map Height
- **Dashboard Widget**: 240-320px
- **Full Page**: 60-80vh (minimum 400px)
- **Modal**: 400-500px

### Marker Hierarchy
| Type | Size | Priority | Usage |
|------|------|----------|-------|
| User Location | 24px | Highest | Current user's location |
| Active Donation | 20px | High | Available donations |
| Inactive Donation | 16px | Medium | Expired/filled donations |
| Recipient | 18px | Medium | Recipient locations |
| Cluster | 32-48px | Variable | Grouped markers |

### Marker Colors
| Type | Color | Usage |
|------|-------|-------|
| User Location | `--primary-500` | Current user |
| Active Donation | `--success-500` | Available donations |
| Inactive Donation | `--neutral-400` | Expired donations |
| Recipient | `--info-500` | Recipients |
| Warning | `--warning-500` | Issues |
| Error | `--error-500` | Critical issues |

### Marker Design
- **Shape**: Circle with optional icon
- **Border**: 2px white (light) or `--neutral-900` (dark)
- **Shadow**: `--shadow-md`
- **Icon**: Lucide icon (12-16px, centered)
- **Accessibility**: `aria-label` with location details

### Cluster Behavior
- **Cluster Radius**: 80-120px
- **Cluster Sizes**:
  - Small (<10): 32px
  - Medium (10-50): 40px
  - Large (>50): 48px
- **Cluster Colors**: Gradient from `--primary-300` to `--primary-600` based on count
- **Cluster Labels**: Count in center, `--font-semibold`, `--text-sm`
- **Interaction**: Click to zoom in and expand cluster

### Current Location
- **Accuracy Circle**: Show if accuracy > 20m; color `--primary-500` with 20% opacity
- **Pulse Animation**: Subtle pulse (2s duration, infinite) to indicate active location
- **Priority**: Always on top of other markers (z-index: 1000)

### Radius (Search/Service Area)
- **Color**: `--primary-500` with 15% opacity
- **Border**: 2px solid `--primary-500`
- **Usage**: Show search radius or service area
- **Interaction**: Click/drag to adjust (if editable)

### Popup Design
- **Width**: 240-320px (max)
- **Background**: `--popover`
- **Border**: 1px solid `--border`
- **Border Radius**: `--radius-md`
- **Shadow**: `--shadow-md`
- **Padding**: 16px
- **Content**:
  - Title (`--text-lg`, `--font-semibold`)
  - Description (`--text-sm`, `--muted-foreground`)
  - Actions (buttons/links)
- **Accessibility**: Close button; keyboard dismissible

### Dark Mode
- **Tile Layer**: Use dark map tiles (e.g., CartoDB Dark Matter)
- **Markers**: Invert border color to `--neutral-900`
- **Popups**: Use dark theme tokens
- **Controls**: Use dark variant

### Map Controls
- **Required Controls**:
  - Zoom in/out (+/- buttons)
  - Pan (drag)
  - Fullscreen (optional)
- **Optional Controls**:
  - Current location
  - Layer selector
  - Scale
- **Position**:
  - Zoom: Top-left
  - Other: Top-right
- **Style**:
  - Background: `--card`
  - Border: 1px solid `--border`
  - Border Radius: `--radius-md`
  - Shadow: `--shadow-sm`
  - Buttons: 40x40px, touch-friendly

### Loading State
- **State**: Show map skeleton (same dimensions) + spinner in center
- **Tile Loading**: Show subtle loading indicator on tiles

### Error State
- **State**: Full map container with error message
- **Content**: Error icon + "Unable to load map" + retry button
- **Background**: `--muted`

### Empty State
- **State**: Map with no markers + empty state overlay
- **Content**: Icon + "No locations to display" + optional CTA

### Mobile Interactions
- **Touch Targets**: All interactive elements ≥ 44x44px
- **Pinch to Zoom**: Enabled
- **Double Tap to Zoom**: Enabled
- **Two Finger Pan**: Enabled
- **Long Press**: Show context menu (optional)
- **Buttons**: Larger (48x48px) on mobile
- **Popup**: Full width on mobile (max-width: none)
- **Hide Controls**: Optional auto-hide of non-essential controls on small screens

---

## 10. Dashboard Standards

### Core Principles
- Information hierarchy: Most important content first
- Scannable layout
- Responsive grid
- Consistent card styles
- Accessible widgets

### Dashboard Hierarchy
1. **Hero Section** (optional, top)
2. **Statistics Cards** (top row)
3. **Charts & Data Visualization** (middle)
4. **Recent Activity / List** (bottom)
5. **Sidebar** (navigation, left)

### Hero Section
- **Usage**: Welcome message, quick stats, prominent CTA
- **Height**: 120-200px
- **Content**:
  - Heading (`--text-3xl`, `--font-bold`)
  - Subheading (`--text-base`, `--muted-foreground`)
  - Optional CTA button
- **Background**: `--card` or subtle gradient
- **Padding**: `--spacing-6`

### Statistics Cards
- **Layout**: 1-4 columns (responsive)
- **Card Structure**:
  - Icon (left, 24-32px, colored background)
  - Value (large, `--text-3xl`, `--font-bold`)
  - Label (`--text-sm`, `--muted-foreground`)
  - Trend (optional: up/down arrow, percentage)
- **Card Size**: Minimum 200px wide
- **Spacing**: `--spacing-4` between cards
- **Colors**: Use semantic colors for trend (success = up, error = down)

### Charts Section
- **Layout**: 1-2 columns (responsive)
- **Card Structure**:
  - Title (`--text-lg`, `--font-semibold`)
  - Chart (full width of card)
  - Optional legend
  - Optional actions (view more, filter)
- **Minimum Height**: 280px
- **Spacing**: `--spacing-4` between chart cards

### Recent Activity / List
- **Card Structure**:
  - Title (`--text-lg`, `--font-semibold`)
  - List/table of items
  - Pagination or "View all" link
- **Item Structure**:
  - Icon/avatar (left)
  - Title + description (middle)
  - Timestamp/status (right)
- **Item Height**: 48-64px
- **Max Items**: 5-10 (use pagination for more)

### Notifications
- **Location**: Bell icon in navbar
- **Badge**: Red count badge if unread
- **Dropdown**:
  - List of notifications
  - Mark all as read
  - View all link
- **Notification Item**:
  - Icon
  - Title
  - Timestamp
  - Unread indicator (dot)
- **Auto Dismiss**: Notifications toast auto-dismiss after 5s (except errors)

### Quick Actions
- **Location**: Dashboard top or sidebar
- **Style**: Icon buttons or small cards
- **Actions**: Common tasks (Add Donation, View Requests, etc.)

### Widgets
- **Consistent Structure**:
  - Header (title + optional actions)
  - Content
  - Footer (optional)
- **Spacing**: `--spacing-4` internal padding
- **Shadow**: `--shadow-sm` (default), `--shadow-md` (hover)

### Sidebar Behavior
- **Desktop**: Persistent, 256px wide
- **Tablet**: Collapsible (icons only by default)
- **Mobile**: Hidden, slide-out overlay
- **Active Item**: Highlighted with `--primary` background
- **Hover**: `--accent` background
- **Spacing**: `--spacing-2` between items

### Card Layout
- **Consistent**: All cards use `--radius-lg`, `--shadow-sm`, `--card` background
- **Padding**: `--spacing-6` (default)
- **Border**: 1px solid `--border` (optional)
- **Hover**: Subtle lift (`--shadow-md` + translateY(-2px))

### Responsive Grid
| Breakpoint | Columns |
|------------|---------|
| Mobile (< 640px) | 1 |
| Tablet (640-1024px) | 2 |
| Desktop (> 1024px) | 3-4 |
| Ultra-wide (> 1280px) | 4+ (max-width container) |

### Information Hierarchy Rules
- Size = importance (larger = more important)
- Color = priority (primary > secondary > muted)
- Position = priority (top > bottom, left > right)
- Never hide critical information behind interactions

---

## 11. Authentication UX

### Core Principles
- Simple, streamlined flow
- Clear error messages
- Password visibility toggle
- Progress indicators for multi-step
- Remember me option
- Social login (optional)

### Login Screen
- **Layout**: Centered card (max-width: 400px)
- **Content**:
  - Logo (top)
  - Heading: "Welcome back"
  - Subheading: "Sign in to your account"
  - Form fields:
    - Email (required)
    - Password (required, with visibility toggle)
  - Options:
    - Remember me (checkbox)
    - Forgot password (link)
  - Buttons:
    - Sign in (primary, full-width)
  - Footer: "Don't have an account? Sign up" (link)
- **Validation**:
  - Email format
  - Password ≥ 8 characters
- **Loading**: Button loading state + disabled form
- **Error**: Inline error + toast for auth failures

### Registration Screen
- **Layout**: Centered card (max-width: 450px)
- **Content**:
  - Logo
  - Heading: "Create an account"
  - Subheading: "Join ZeroWaste Connect today"
  - Form fields:
    - Full name (required)
    - Email (required)
    - Password (required, with visibility toggle + strength indicator)
    - Confirm password (required)
    - Role (required: Donor / Recipient)
    - Organization (optional)
    - Phone (optional)
    - Terms of service (checkbox, required)
  - Buttons:
    - Create account (primary, full-width)
  - Footer: "Already have an account? Sign in" (link)
- **Password Strength**:
  - Weak: Red, < 8 chars
  - Fair: Orange, 8-12 chars
  - Good: Blue, 12+ chars with mix
  - Strong: Green, 12+ chars with mix + symbols
- **Validation**: Real-time inline validation

### Forgot Password
- **Layout**: Centered card (max-width: 400px)
- **Content**:
  - Logo
  - Heading: "Forgot password?"
  - Subheading: "Enter your email to receive a reset link"
  - Form fields:
    - Email (required)
  - Buttons:
    - Send reset link (primary, full-width)
  - Footer: "Back to Sign in" (link)
- **Success State**:
  - Hide form
  - Show: "Check your email" + instructions
  - No auto-redirect

### Reset Password
- **Layout**: Centered card (max-width: 400px)
- **Content**:
  - Logo
  - Heading: "Reset your password"
  - Subheading: "Enter your new password"
  - Form fields:
    - New password (required, visibility toggle, strength)
    - Confirm new password (required)
  - Buttons:
    - Reset password (primary, full-width)
- **Link Expiry**: Clear message if link is expired/invalid
- **Success**: Redirect to login with success toast

### OTP (One-Time Password)
- **Layout**: Centered card (max-width: 400px)
- **Content**:
  - Logo
  - Heading: "Verify your email"
  - Subheading: "Enter the 6-digit code sent to your email"
  - OTP Input: 6 separate input boxes (auto-focus, auto-advance)
  - Options: "Didn't receive code? Resend (60s timer)"
  - Buttons:
    - Verify (primary, full-width)
- **Input Behavior**:
  - Only numbers allowed
  - Auto-advance to next box
  - Backspace goes to previous
  - Paste fills all boxes
- **Resend Timer**: Disable button for 60s after send

### Email Verification
- **Trigger**: After registration
- **UI States**:
  - Pending: "Verify your email" banner with "Resend" button
  - Success: Toast + remove banner
  - Expired: Show error + resend option
- **Required**: Block certain features until verified

### Session Expiry
- **Warning**: Show toast 2 minutes before expiry: "Your session will expire soon. Click to extend."
- **Expired**:
  - Redirect to login
  - Show message: "Your session has expired. Please sign in again."
  - Save form draft if possible

### JWT Timeout
- **Access Token**: 15-30 minutes expiry
- **Refresh Token**: 7-30 days expiry
- **Silent Refresh**: Attempt refresh in background 1 minute before access token expiry

### Unauthorized Page (401)
- **Layout**: Centered content
- **Content**:
  - Icon: Lock
  - Heading: "Unauthorized"
  - Subheading: "Please sign in to access this page"
  - Button: "Sign in" (primary)
- **Redirect**: Auto-redirect to login after 5s (optional)

### Forbidden Page (403)
- **Layout**: Centered content
- **Content**:
  - Icon: Shield
  - Heading: "Access denied"
  - Subheading: "You don't have permission to access this page"
  - Button: "Go back" or "Go to dashboard"
- **No Auto-Redirect**: Let user choose next action

### Loading States
- **Form Submission**:
  - Disable all inputs
  - Show loading spinner on button
  - Change button text to "Signing in..." etc.
- **Page Load**:
  - Skeleton loader for auth card
  - Don't show form until ready

### Error States
- **Field Errors**: Inline, below field, red text, `--text-sm`
- **Form Errors**: Toast notification, red
- **Common Messages**:
  - "Invalid email or password" (don't reveal which is wrong)
  - "Email already exists"
  - "Passwords do not match"
  - "Invalid or expired reset link"
  - "Too many attempts. Please try again later."

---

## 12. Form Standards (Expanded)

### Core Principles
- Clear labels (never rely on placeholders only)
- Inline validation
- Logical tab order
- Keyboard accessible
- Mobile-optimized

### Multi-Step Forms
- **Progress Indicator**:
  - Top of form
  - Steps numbered or with icons
  - Current step highlighted
  - Completed steps: checkmark + muted
  - Upcoming steps: muted
- **Navigation**:
  - "Back" button (secondary, left)
  - "Next" button (primary, right)
  - Disable "Next" until current step valid
- **Data Persistence**: Save progress locally if form is long
- **Final Step**: Review + submit

### Wizard Forms
- Same as multi-step, but with sidebar for steps (desktop)
- Steps can be clickable if already completed
- Save draft automatically

### Image Upload
- **Drop Zone**:
  - Border: 2px dashed `--border`
  - Background: `--muted`
  - Hover: Border color `--primary`
  - Content: Icon + "Drag & drop images here or click to browse"
  - Max file size: 5MB
  - Accepted formats: JPG, PNG, WebP
- **Preview**:
  - Thumbnail (120x120px, `--radius-md`)
  - File name + size
  - Remove button (x icon)
- **Multiple Upload**: Allow multiple files, show grid of previews
- **Validation**:
  - File type
  - File size
  - Image dimensions (optional)

### Drag & Drop
- **Visual Feedback**:
  - Dragover: Highlight drop zone
  - Dragging: Subtle opacity on dragged item
- **Reorder**: Show grab cursor, animated reorder
- **Accessibility**: Keyboard alternative for drag & drop

### Validation Timing
- **On Blur**: Validate when user leaves field
- **On Change**: Validate password strength, confirm password in real-time
- **On Submit**: Validate all fields before submission
- **Debounce**: 300ms for async validation (e.g., unique email)

### Required Fields
- **Indicator**: Asterisk (*) next to label
- **Color**: `--error-500`
- **Legend**: "Required fields are marked with *" at top of form
- **Validation**: Prevent submit if required fields are empty

### Optional Fields
- **Indicator**: "(optional)" after label, `--muted-foreground`
- **No Asterisk**: Don't use asterisk for optional fields

### Password Visibility
- **Toggle**: Eye icon inside input (right)
- **States**:
  - Eye open: Password visible
  - Eye closed: Password hidden
- **Accessibility**: `aria-label` toggles between "Show password" and "Hide password"

### Inline Validation
- **Position**: Below field, between field and helper text
- **Icon**: Checkmark (success) or X (error)
- **Colors**:
  - Success: `--success-500`
  - Error: `--error-500`
- **Messages**:
  - Clear, concise
  - Explain how to fix
  - Don't blame user: "Please enter a valid email" instead of "Invalid email"

### Async Validation
- **Indicator**: Spinner inside input (right) while validating
- **Debounce**: 300-500ms to avoid too many requests
- **Examples**:
  - "Checking if email is available..."
  - "Checking username..."
- **Error Handling**: Show error if request fails

### Success State
- **Field Level**: Green checkmark, success message
- **Form Level**: 
  - Hide form (optional)
  - Show success card with:
    - Success icon
    - Heading: "Done!" or "Submitted successfully"
    - Message
    - Next steps button
  - Toast notification
- **Redirect**: Optional redirect after 2-3s

---

## 13. Component Inventory

### Accordion
- **Purpose**: Collapsible content sections
- **Variants**: Single, Multiple
- **Usage**: FAQ, settings, expandable details
- **Structure**:
  - Trigger (button with title + chevron icon)
  - Content (collapsible)
- **Interaction**:
  - Click trigger to toggle
  - Chevron rotates 180° when open
- **Accessibility**: `aria-expanded`, `aria-controls`, keyboard support (Enter/Space)

### Alert
- **Purpose**: Highlight important information
- **Variants**: Default, Success, Warning, Error, Info
- **Usage**: 
  - Success: Operation completed
  - Warning: Caution needed
  - Error: Problem occurred
  - Info: Useful information
- **Structure**:
  - Icon (left, color-matched)
  - Title + description
  - Close button (optional, right)
- **Styles**:
  - Background: Muted variant color
  - Border: 1px solid variant color
  - Border Radius: `--radius-md`

### Alert Dialog
- **Purpose**: Confirm destructive actions or urgent decisions
- **Variants**: Default, Destructive
- **Usage**: Delete confirmation, irreversible actions
- **Structure**:
  - Title
  - Description
  - Actions:
    - Cancel (left, secondary)
    - Confirm (right, primary/destructive)
- **Rules**:
  - Focus trap in dialog
  - Escape to close
  - Click overlay to close
  - Don't open dialog on top of another dialog
- **Accessibility**: `role="alertdialog"`, `aria-modal="true"`

### Avatar
- **Purpose**: Represent user or entity
- **Variants**: Image, Initials, Icon
- **Sizes**: 24, 32, 40, 48, 64, 96px
- **Usage**:
  - 24px: Comments, small lists
  - 32-40px: Navbar, lists
  - 48-64px: Profile cards
  - 96px: Profile page
- **Fallback**: Initials if no image (background: `--primary`, text: `--primary-foreground`)
- **Status Indicator**: Optional dot (bottom-right: online = success, offline = muted)

### Breadcrumb
- **Purpose**: Show navigation hierarchy
- **Structure**:
  - Home icon
  - Pages (links, separated by / icon)
  - Current page (muted, not a link)
- **Usage**: Max 5-6 items; truncate long items with ellipsis
- **Accessibility**: `aria-label="Breadcrumb"`

### Calendar
- **Purpose**: Date selection
- **Variants**: Single, Range, Multiple
- **Structure**:
  - Header (month + year, prev/next buttons)
  - Weekday labels
  - Date grid
- **Interaction**:
  - Click date to select
  - Keyboard navigation
- **Disabled Dates**: Past/future, specific dates
- **Accessibility**: Full keyboard support, screen reader labels

### Carousel
- **Purpose**: Horizontal content slides
- **Usage**: Image galleries, featured content
- **Controls**:
  - Previous/Next buttons
  - Indicators (dots, bottom)
  - Auto-play (optional, with pause button)
- **Accessibility**:
  - Pause auto-play on hover/focus
  - Keyboard navigation
  - `aria-roledescription="carousel"`

### Checkbox
- **Purpose**: Multi-select, binary choice
- **Variants**: Default, Disabled, Indeterminate
- **Usage**: Terms of service, filters, multi-select
- **Structure**: Checkbox + label
- **Size**: 18px (touch-friendly: 24px)
- **Accessibility**: Associate label with input, `indeterminate` state via JS

### Command Palette
- **Purpose**: Quick actions via keyboard
- **Trigger**: Cmd/Ctrl + K
- **Structure**:
  - Search input (top)
  - Results list (below)
  - Keyboard shortcuts (right)
- **Interaction**:
  - Type to filter
  - Arrow keys to navigate
  - Enter to select
  - Escape to close
- **Content**: Actions, pages, settings

### Context Menu
- **Purpose**: Right-click menu
- **Trigger**: Right-click or long-press (mobile)
- **Structure**: Menu items, dividers, submenus
- **Position**: Avoid overflowing viewport
- **Accessibility**: Keyboard navigation

### Date Picker
- **Purpose**: Select date (with optional time)
- **Variants**: Date, DateTime, Range
- **Structure**: Input + calendar popover
- **Format**: YYYY-MM-DD (ISO) internally; localized display
- **Placeholder**: "YYYY-MM-DD" or localized
- **Accessibility**: Calendar accessible via keyboard

### Dialog
- **Purpose**: Display content without navigating
- **Variants**: Default, Centered, Fullscreen (mobile)
- **Sizes**: Sm, Md, Lg, Xl
- **Structure**:
  - Overlay
  - Dialog container
  - Header (title + close button)
  - Content
  - Footer (actions, optional)
- **Rules**: Same as Alert Dialog (focus trap, Escape, overlay click)

### Drawer
- **Purpose**: Slide-out panel
- **Variants**: Left, Right, Top, Bottom
- **Usage**: Filters, navigation, details on mobile
- **Sizes**: 320, 400, 560px (width/height)
- **Behavior**: Overlay, focus trap, Escape to close

### Dropdown Menu
- **Purpose**: List of actions/options
- **Trigger**: Button with chevron or icon
- **Structure**:
  - Menu items (with optional icons)
  - Dividers (group items)
  - Submenus (optional)
- **Interaction**:
  - Click trigger to open
  - Arrow keys to navigate
  - Enter/Space to select
  - Click outside/Escape to close
- **Accessibility**: `role="menu"`, `role="menuitem"`

### Hover Card
- **Purpose**: Show details on hover
- **Trigger**: Element with hover/focus
- **Delay**: 200ms show delay, 150ms hide delay
- **Structure**: Popover with detailed content
- **Usage**: User profiles, item previews

### Input OTP
- **Purpose**: One-time password input
- **Structure**: Separate input boxes (1 per digit, usually 4-6)
- **Behavior**:
  - Auto-advance to next
  - Backspace to previous
  - Paste fills all
  - Only numbers allowed
- **Accessibility**: `aria-label` for each input, full keyboard support

### Menubar
- **Purpose**: Horizontal menu bar
- **Usage**: Application menus (File, Edit, etc.)
- **Structure**: Menu triggers + dropdown menus
- **Accessibility**: Full keyboard navigation (arrows, Enter, Escape)

### Navigation Menu
- **Purpose**: Sidebar/navbar navigation
- **Variants**: Horizontal, Vertical
- **Structure**:
  - Logo
  - Nav items (links)
  - Active indicator
  - Submenus (optional)
- **Active State**: `--primary` background, `--primary-foreground` text
- **Accessibility**: `role="navigation"`, `aria-current="page"`

### Popover
- **Purpose**: Floating content anchored to trigger
- **Structure**: Trigger + popover
- **Position**: Top, Bottom, Left, Right (with offsets)
- **Interaction**: Click to open/close, click outside to close
- **Accessibility**: `role="dialog"` if modal, focus management

### Progress
- **Purpose**: Show progress of task
- **Variants**: Bar, Circle, Spinner
- **Progress Bar**:
  - Height: 8-12px
  - Color: `--primary` (or semantic color)
  - Label: Optional percentage inside/above
- **Progress Circle**:
  - Sizes: 48, 64, 96px
  - Stroke Width: 4-6px
- **Accessibility**: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

### Radio Group
- **Purpose**: Single selection from options
- **Structure**: Radio buttons + labels (grouped)
- **Usage**: Exclusive choices (Role: Donor/Recipient)
- **Direction**: Vertical (default) or horizontal
- **Accessibility**: `role="radiogroup"`, `aria-label`

### Resizable
- **Purpose**: Resizable elements (panels, containers)
- **Handle**: Edge or corner handle
- **Constraints**: Min/max width/height
- **Usage**: Split views, sidebar

### Scroll Area
- **Purpose**: Custom scrollbar container
- **Usage**: When native scrollbar needs to be styled
- **Styles**: Use scrollbar tokens
- **Accessibility**: Don't break native scroll behavior

### Select
- **Purpose**: Single selection from dropdown
- **Variants**: Default, Searchable, Multiple
- **Structure**:
  - Trigger (shows selected value + chevron)
  - Dropdown list (options)
- **Placeholder**: "Select..."
- **Searchable**: Input to filter options
- **Multiple**: Tags for selected items
- **Accessibility**: Full keyboard support

### Separator
- **Purpose**: Divide content
- **Variants**: Horizontal, Vertical
- **Styles**: 1px solid `--border`
- **Spacing**: `--spacing-4` margin

### Sheet
- **Purpose**: Mobile slide-up panel
- **Sizes**: Partial (50% height), Full
- **Handle**: Grab bar at top (optional)
- **Behavior**: Swipe to close, backdrop, focus trap
- **Usage**: Mobile forms, details

### Skeleton
- **Purpose**: Loading placeholder
- **Variants**: Text, Circle, Rectangular
- **Rules**: Match exact shape/size of real content to avoid layout shift
- **Animation**: Subtle pulse (1.5s duration, infinite)
- **Usage**: Prefer skeletons over spinners for better perceived performance

### Slider
- **Purpose**: Select value from range
- **Variants**: Single, Range (two thumbs)
- **Structure**: Track + thumb(s)
- **Step**: Defined step (default 1)
- **Labels**: Min/max labels, current value label
- **Accessibility**: Full keyboard support, `aria-valuenow`

### Switch
- **Purpose**: Binary toggle (on/off)
- **Alternatives**: Checkbox (use switch for immediate effect, checkbox for forms that need submit)
- **Size**: 44x24px (touch-friendly)
- **States**: On (primary), Off (muted)
- **Accessibility**: `role="switch"`, `aria-checked`

### Table
- **Purpose**: Tabular data
- **Structure**:
  - Header (th)
  - Body (tr, td)
  - Footer (optional, pagination)
- **Features**:
  - Sortable columns (click header)
  - Selectable rows (checkbox)
  - Actions column (last)
  - Pagination
- **Responsive**: Horizontal scroll on mobile; or stacked cards
- **Accessibility**: `scope="col"` / `scope="row"`, `<caption>` (optional)

### Tabs
- **Purpose**: Switch between content views
- **Variants**: Horizontal, Vertical
- **Structure**:
  - Tabs list (triggers)
  - Tab panels (content)
- **Active Tab**: Underline or background highlight
- **Interaction**:
  - Click tab to switch
  - Arrow keys to navigate tabs
- **Accessibility**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`

### Textarea
- **Purpose**: Multi-line text input
- **Rows**: Default 3-5
- **Auto-resize**: Optional (grow with content)
- **Max Characters**: Show counter (e.g., "250/500")
- **Placeholder**: "Enter your message..."

### Toast
- **Purpose**: Temporary notifications
- **Variants**: Success, Warning, Error, Info, Default
- **Position**:
  - Desktop: Bottom-right or top-right
  - Mobile: Bottom (full-width) or top
- **Structure**:
  - Icon (left)
  - Title + description
  - Close button (optional, right)
  - Action button (optional, e.g., "Undo")
- **Duration**:
  - Success/Info: 5s
  - Warning: 7s
  - Error: Persistent (user must close)
- **Animation**: Slide in, fade out
- **Accessibility**: `role="status"` / `role="alert"`, pause auto-dismiss on hover/focus

### Tooltip
- **Purpose**: Show hint on hover/focus
- **Position**: Top, Bottom, Left, Right
- **Delay**: 200ms show delay
- **Content**: Short, concise text (1-2 lines max)
- **Styles**:
  - Background: `--neutral-900` (light) / `--neutral-100` (dark)
  - Text: Contrasting color
  - Padding: 6px 10px
  - Border Radius: `--radius-sm`
- **Accessibility**: Don't use for critical info (not keyboard accessible by default); use `aria-describedby`

### Tree
- **Purpose**: Hierarchical data
- **Structure**: Nodes with expand/collapse chevrons
- **Interaction**:
  - Click chevron to expand/collapse
  - Click node to select
- **Usage**: File explorer, nested categories

### Timeline
- **Purpose**: Show sequence of events
- **Structure**:
  - Vertical line
  - Events (dots + content)
- **Event States**: Completed, Current, Upcoming
- **Colors**: 
  - Completed: `--primary`
  - Current: `--primary` (pulse)
  - Upcoming: `--muted`

---

## 14. Motion System v2

### Core Principles
- Animations should be meaningful (not decorative)
- Respect `prefers-reduced-motion`
- Fast, snappy durations
- Consistent easing
- No layout shift

### Framer Motion Presets

#### Fade In
```tsx
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}
```

#### Slide In
```tsx
const slideInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
}

const slideInLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
}

const slideInRight = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
}
```

#### Scale
```tsx
const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.15 } },
}
```

#### Spring
```tsx
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}
```

### Page Transition
- **Preset**: Fade in + slide up slightly
- **Duration**: 200-300ms
- **Rules**: Don't use for every page—only for major navigation
- **Implementation**: Framer Motion `AnimatePresence`

### Modal Transition
- **Overlay**: Fade in (0-50% opacity, 200ms)
- **Modal**: Scale in (0.95 → 1) + fade in (250ms, spring)
- **Exit**: Reverse (150-200ms)

### Sidebar Transition
- **Slide In/Out**: 250ms duration, ease out
- **Overlay**: Fade in/out (200ms)
- **Desktop Collapse**: Width animation (200ms)

### Card Animation
- **Hover**:
  - Scale: 1.02x
  - Shadow: `--shadow-sm` → `--shadow-md`
  - Y: -2px
  - Duration: 150ms
- **Enter**: Staggered fade in (100ms delay between cards)

### Hover Animation
- **Buttons**: Background color change, 150ms
- **Links**: Underline, color change, 150ms
- **Interactive Elements**: Subtle scale/color change

### Loading Animation
- **Spinner**: Rotate 360° (1s, linear, infinite)
- **Skeleton**: Pulse (opacity 0.7-1, 1.5s, infinite)
- **Progress**: Smooth width animation

### Success Animation
- **Checkmark**: Draw animation (500ms)
- **Confetti**: Optional, sparingly (only for major successes)
- **Toast**: Slide in + scale (300ms)

### Error Animation
- **Shake**: X-axis shake (500ms) for invalid inputs
- **Toast**: Slide in (300ms)
- **Icon**: Pulse (twice)

### Micro-Interactions
- **Toggle**: Switch thumb slide (200ms)
- **Checkbox**: Check draw (200ms)
- **Dropdown**: Subtle scale (150ms)
- **Tabs**: Underline slide (200ms)

### Reduced Motion Fallback
- **Media Query**:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
- **Framer Motion**: Use `reducedMotion: "user"`

### Animation Durations
| Duration | Usage |
|----------|-------|
| 75ms | Quick state changes (hover, toggle) |
| 150ms | Hover effects, micro-interactions |
| 200ms | Fades, small transitions |
| 300ms | Default transitions (modals, drawers) |
| 500ms | Larger transitions, animations |
| **Max**: 500ms | (except infinite loading) |

### Easing
| Easing | Usage |
|--------|-------|
| `easeOut` (0, 0, 0.2, 1) | Entrance animations |
| `easeIn` (0.4, 0, 1, 1) | Exit animations |
| `easeInOut` (0.4, 0, 0.2, 1) | State changes |
| `spring` | Natural, bouncy motions |

### Animation Rules
- Never animate both opacity and transform at the same time (performance)
- Prefer `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflows)
- Stagger animations (100ms delay between items) for lists
- Don't animate over 2-3 elements at once
- Test on low-end devices

---

## 15. Mobile UX Standards

### Core Principles
- Touch-first design
- Thumb-friendly zones
- Clear, large targets
- Simple navigation
- Fast performance

### Bottom Navigation
- **Usage**: Primary mobile navigation
- **Items**: 3-5 items max
- **Height**: 64px
- **Icon Size**: 24px
- **Label**: `--text-xs`, below icon
- **Active State**: `--primary` color for icon + label
- **Inactive State**: `--muted-foreground`
- **Touch Target**: 48x48px minimum
- **Safe Area**: Respect bottom safe area

### Floating Action Button (FAB)
- **Purpose**: Primary action on screen
- **Position**: Bottom-right (16px from edge, respect safe area)
- **Size**: 56x56px (default), 48x48px (small)
- **Icon**: 24px, centered
- **Colors**: `--primary` background, `--primary-foreground` icon
- **Shadow**: `--shadow-lg`
- **Extended**: Optional (icon + label, wider)
- **Interaction**: Hover/pressed states, ripple effect

### Bottom Sheet
- **Usage**: Mobile modal/drawer
- **Sizes**:
  - Partial: 50% screen height
  - Full: 90% screen height
- **Handle**: 40x4px bar at top (centered, `--muted-foreground`)
- **Swipe**: Swipe down to dismiss
- **Overlay**: Fade in, 50% opacity
- **Content**: Scrollable if needed

### Swipe Gestures
- **Swipe to Delete**: Left/right swipe on list items
  - Threshold: 50px
  - Background: `--error-500` + delete icon
  - Confirmation: Optional "Undo" toast
- **Swipe to Refresh**: Pull down from top of list
  - Indicator: Spinner + "Refreshing..."
  - Trigger: 80px pull
- **Swipe Navigation**: Optional (swipe left/right between tabs)

### Pull to Refresh
- **Trigger**: Pull down ≥ 80px
- **Indicator**: Spinner + "Release to refresh"
- **Animation**: Smooth, 300ms
- **Completion**: Fade out indicator + toast

### Touch Targets
- **Minimum**: 44x44px (all interactive elements)
- **Recommended**: 48x48px
- **Spacing**: 8px minimum between targets
- **No Overlap**: Ensure targets don't overlap

### Reachability
- **Primary Actions**: Place in bottom half of screen (thumb-reachable)
- **Secondary Actions**: Top half is okay
- **Avoid**: Place critical actions in top-left/top-right (hard to reach)

### Landscape
- **Layout**: Adapt to wider screen
- **Navbar**: Keep compact
- **Bottom Nav**: Optional (hide on landscape, use sidebar)
- **Forms**: 2-column layout if possible
- **Tables**: Horizontal scroll

### Tablet Behavior
- **Breakpoint**: ≥ 768px
- **Sidebar**: Collapsible (icons + text)
- **Grid**: 2-3 columns
- **Modals**: Centered (not full-screen)
- **Navigation**: Sidebar instead of bottom nav

### Foldable Considerations
- **Hinge Area**: Avoid placing content over hinge
- **Split Screen**: Adapt layout when folded/unfolded
- **Posture**: Detect and adjust to tabletop/dual-screen modes

### Other Mobile Rules
- **No Hover**: Don't rely on hover (use tap/long-press)
- **Fast Tap**: Remove 300ms tap delay
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Input Modes**: Use `inputmode` (numeric, email, tel) for appropriate keyboards
- **Autocomplete**: Use `autocomplete` attributes (email, password, etc.)
- **No Popups**: Avoid popups/ads that block content

---

## 16. Optimistic UI Strategy

### Core Principles
- Update UI immediately for perceived speed
- Sync with server in background
- Handle failures gracefully
- Rollback if needed
- Don't use for critical operations

### When to Use Optimistic Updates
| Operation | Safe? | Reason |
|-----------|-------|--------|
| Create Donation | Yes | Non-critical, can be reverted |
| Edit Donation | Yes | Non-critical |
| Delete Donation | No **(needs confirmation)** | Destructive, confirm first |
| Send Request | Yes | Non-critical |
| Update Profile | Yes | Non-critical |
| Change Password | No | Critical, wait for success |
| Make Payment | No | Very critical, wait for success |
| Mark as Read | Yes | Trivial |

### Optimistic Creation
1. **Generate Temporary ID**: UUID or local ID
2. **Add to UI**: Insert new item immediately
3. **Show Pending State**: Subtle opacity/loading indicator
4. **Send Request**: In background
5. **On Success**: Replace temp ID with real ID, remove pending state
6. **On Error**: Remove item from UI, show error toast

### Optimistic Edit
1. **Save Original State**: Keep copy of previous data
2. **Update UI**: Immediately show new data
3. **Show Pending**: Subtle indicator
4. **Send Request**
5. **On Success**: Remove pending indicator
6. **On Error**: Revert to original state, show error toast

### Optimistic Delete
1. **Confirm First**: Always show confirmation dialog
2. **Remove from UI**: After confirmation
3. **Send Request**
4. **On Success**: Done
5. **On Error**: Restore item, show error toast
6. **Undo Option**: Show "Undo" toast for 5-10s

### Background Synchronization
- **Queue**: Queue failed requests to retry later
- **Retry**: Exponential backoff (1s, 2s, 4s, 8s, max 30s)
- **Offline**: Queue when offline, sync when back online
- **Conflict**: Last modified wins, or show merge UI

### Rollback Strategy
- **Always Save Original**: Keep previous state before optimistic update
- **Atomic**: Rollback entire operation, not partial
- **No Partial States**: Don't leave UI in half-updated state
- **Notify User**: Show error + explain rollback

### Conflict Resolution
- **Strategy**: Last modified wins (use timestamp)
- **If Critical**: Show diff to user, let them choose
- **Log**: Log conflicts for debugging

### Toast Behavior
- **Optimistic**: "Creating donation..." (optional)
- **Success**: "Donation created!" (checkmark)
- **Error**: "Failed to create donation. Reverted." (error icon)
- **Undo**: "Donation deleted. Undo?" (action button)

### Offline Handling
- **Detect Offline**: Show banner "You're offline"
- **Queue Actions**: Save actions to local storage
- **Sync on Reconnect**: Automatically send queued actions
- **Conflict**: Handle as above
- **Indicate**: Show pending state on items that haven't synced

### Retry Strategy
- **Exponential Backoff**: 1s, 2s, 4s, 8s, 16s, 32s
- **Max Retries**: 3-5 times
- **Give Up**: After max retries, show error + manual retry button
- **Jitter**: Add random jitter to avoid thundering herd

### Pending State Visualization
- **Opacity**: 70-80%
- **Border**: Subtle dashed border (optional)
- **Icon**: Small spinner or clock icon (top-right)
- **Text**: "(Saving...)" next to title (optional)

### Hard Rules
- **Never Optimistic Delete Without Confirmation**
- **Never Optimistic for Payment/Authentication**
- **Always Save Original State**
- **Always Notify on Rollback**
- **Never Hide Errors**

---

## 17. Error Handling Standards

### Core Principles
- Clear, helpful error messages
- Don't blame user
- Offer recovery options
- Log errors for debugging
- Consistent styling

### Network Failures
- **Detect**: Handle fetch failures, timeouts
- **UI**:
  - Toast: "No internet connection. Check your network."
  - Banner: Offline indicator
- **Retry**: "Retry" button
- **Queue**: Queue actions when offline (see Optimistic UI)

### HTTP Status Codes

#### 400 Bad Request
- **Message**: "Invalid request. Please check your input."
- **Action**: Show inline field errors if available

#### 401 Unauthorized
- **Action**: Redirect to login, show "Your session expired. Please sign in again."
- **Toast**: Error toast
- **Save Draft**: Save form draft if possible

#### 403 Forbidden
- **Page**: Show 403 page
- **Message**: "You don't have permission to do that."
- **Action**: "Go back" button, don't auto-redirect

#### 404 Not Found
- **Page**: 404 page
- **Content**:
  - Icon: Search / Magnifying glass
  - Heading: "Page not found"
  - Subheading: "The page you're looking for doesn't exist."
  - Buttons: "Go back" + "Go to Dashboard"
- **No Auto-Redirect**: Let user choose

#### 409 Conflict
- **Example**: Email already exists, duplicate donation
- **Message**: "This item already exists." or "Email already registered."
- **Action**: Show inline error, suggest correction

#### 422 Unprocessable Entity
- **Message**: Validation errors
- **Action**: Show inline errors for each field
- **Preserve Input**: Keep user's input, don't clear form

#### 429 Too Many Requests
- **Message**: "Too many attempts. Please try again in X seconds."
- **Action**: Disable buttons, show countdown timer
- **Retry**: Auto-enable after countdown

#### 500 Internal Server Error
- **Message**: "Something went wrong on our end. Please try again later."
- **Action**: "Retry" button, "Go back"
- **Log**: Log full error to server (don't show to user)
- **Don't Blame**: Never say "Server error"—blame "our end"

#### 503 Service Unavailable
- **Message**: "Service temporarily unavailable. Please try again later."
- **Action**: Retry button, status page link (optional)

### Offline
- **Banner**: Persistent top banner: "You're offline. Some features may not work."
- **Indicator**: Small offline icon in navbar
- **Queue**: Queue actions to sync later
- **Reconnect**: When reconnected, show "Back online!" toast, sync queue

### Timeout
- **Message**: "Request timed out. Please try again."
- **Action**: Retry button
- **Duration**: 10-15s timeout for API calls

### Retry
- **Button**: "Retry" (primary variant)
- **Auto-Retry**: Optional (for non-critical)
- **Max Retries**: 2-3 auto-retries, then manual
- **Exponential Backoff**: For auto-retries

### Recovery Options
- **Always Provide Next Step**: "Retry", "Go back", "Contact support"
- **Save User Work**: Preserve form input, draft
- **Undo**: Offer undo for destructive actions

### User Messaging
- **Tone**: Friendly, reassuring
- **Don't Blame User**: "We couldn't find that page" instead of "You entered a wrong URL"
- **Clear**: Simple language, no jargon
- **Concise**: 1-2 sentences max
- **Helpful**: Explain how to fix

### Developer Logging
- **Log Everything**: Error details, stack trace, user ID, timestamp
- **Don't Expose**: Never show stack trace to user
- **Sensitive Data**: Don't log passwords, tokens, PII
- **Tool**: Use Sentry, Datadog, or similar

### Error UI Components
- **Inline Error**: Below field, red, small
- **Toast**: Temporary notification (bottom-right)
- **Alert**: Persistent banner (top of page)
- **Error Page**: Full page for 404, 403, 500

---

## 18. Performance Standards

### Core Principles
- Fast is better than slow
- Perceived performance matters
- Measure everything
- Optimize bottlenecks
- Don't over-optimize prematurely

### Code Splitting
- **Route-Based**: Split by route (default in Next.js/Remix)
- **Component-Based**: Lazy-load large components (modals, charts)
- **Dynamic Import**: `import('./HeavyComponent')`
- **Loading State**: Show skeleton while loading

### Lazy Loading
- **Images**: `loading="lazy"` for below-the-fold images
- **Components**: `React.lazy()` + `Suspense`
- **Routes**: Automatic in most frameworks
- **Below the Fold**: Lazy-load everything not in initial viewport

### Memoization
- **React.memo**: For pure components that re-render often
- **useMemo**: For expensive calculations
- **useCallback**: For callbacks passed to child components
- **Don't Overdo**: Profile first—memoization has overhead

### Caching
- **Data**: Cache API responses (TanStack Query, SWR, or similar)
- **Static Assets**: Long-term caching with hash in filename
- **Service Worker**: Cache for offline (PWA)
- **Stale-While-Revalidate**: Show cached data first, update in background

### Prefetching
- **Links**: Prefetch next page on hover (Next.js Link, React Router)
- **Critical Data**: Prefetch data needed soon
- **Smart**: Don't prefetch if user is on slow network or data saver

### Image Optimization
- **Format**: Use WebP/AVIF instead of JPG/PNG
- **Size**: Serve appropriately sized images (srcset + sizes)
- **Compress**: Optimize images (Squoosh, Sharp)
- **CDN**: Use image CDN (Cloudinary, Imgix, Vercel Images)
- **Placeholder**: Low-quality image placeholder (LQIP) or solid color
- **Dimensions**: Set width + height to avoid layout shift
- **lazy**: `loading="lazy"` for below-the-fold

### Virtualization
- **Lists**: Virtualize long lists (react-window, react-virtual)
- **Tables**: Virtualize tables with 100+ rows
- **Grids**: Virtualize grids/carousels
- **Only Render**: Only render visible items

### Debounce & Throttle
- **Debounce**: For search inputs (300-500ms)
- **Throttle**: For scroll/resize events (100-200ms)
- **Lodash**: Use `_.debounce` / `_.throttle` or custom hooks

### Skeletons
- **Prefer Skeletons**: Over spinners for better perceived performance
- **Match Shape**: Exact same shape/size as real content
- **No Layout Shift**: Skeleton should reserve space

### Bundle Size
- **Target**: < 150KB gzipped initial JS bundle
- **Analyze**: Use bundle analyzer (webpack-bundle-analyzer)
- **Tree Shake**: Use ES modules, avoid CommonJS
- **Remove Unused**: Tree shake unused code
- **Small Libraries**: Prefer small libraries (e.g., date-fns over Moment.js)
- **Avoid Bloat**: Don't add libraries for trivial tasks

### Web Vitals Targets
| Metric | Target | How to Improve |
|--------|--------|----------------|
| **LCP (Largest Contentful Paint)** | < 2.5s | Optimize images, preload critical resources, use CDN |
| **FID (First Input Delay)** | < 100ms | Reduce long tasks, use web workers, debounce |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Set image dimensions, avoid layout shifts, reserve space |
| **TTFB (Time to First Byte)** | < 800ms | Optimize server, use CDN, cache |
| **INP (Interaction to Next Paint)** | < 200ms | Optimize interactions, reduce long tasks |

### Actual vs Perceived Latency
- **Actual Latency**: Time for server to respond (optimize backend)
- **Perceived Latency**: How fast it feels to user (optimize UI)
- **Prioritize Perceived**: Optimistic updates, skeletons, instant feedback

### Rendering Strategy
- **SPA**: Client-side render (good for dynamic apps)
- **SSR**: Server-side render (good for SEO, initial load)
- **SSG**: Static site generation (best for mostly static content)
- **ISR**: Incremental static regeneration (hybrid)
- **Choose**: Based on content type (e.g., dashboard = SPA, landing = SSG)

### Performance Budgets
- **JS Bundle**: < 150KB gzipped
- **CSS**: < 30KB gzipped
- **Images**: < 500KB total on page
- **Fonts**: ≤ 2 font families, ≤ 4 weights total
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **INP**: < 200ms

### Tools to Measure
- **Lighthouse**: Audit performance, accessibility, SEO
- **Chrome DevTools**: Performance tab, Network tab
- **Web Vitals Extension**: Measure in real browser
- **Sentry/Datadog**: Track in production

### Performance Rules
- **No Layout Shift**: Never cause unexpected layout shifts
- **Prioritize Critical Content**: Load above-the-fold first
- **Avoid Third-Party Scripts**: Or load them async/defer
- **Use Web Workers**: Offload heavy calculations
- **Optimize Re-renders**: Use React DevTools Profiler
- **Don't Block Main Thread**: Keep tasks < 50ms

---

## 19. UX Rules (Hard Rules)

### Non-Negotiable Rules (Never Break These)
1. **Never open a modal/dialog on top of another modal**
2. **Never use more than one primary button in a single view**
3. **Never rely on color alone to convey information** (always add text/icon)
4. **Never remove or obscure the scrollbar** (custom is okay if still usable)
5. **Never skip loading states** (users need feedback)
6. **Never show a blank screen** (always show skeleton/empty state)
7. **Never auto-play audio/video without user consent**
8. **Never change a user's scroll position unexpectedly**
9. **Never make a user re-enter data if it can be preserved**
10. **Never perform a destructive action without explicit confirmation**
11. **Never hide the "Back" or "Cancel" button**
12. **Never use placeholder text as a label**
13. **Never use all caps for long text** (hard to read)
14. **Never have touch targets smaller than 44x44px on mobile**
15. **Never disable the back button or prevent Escape from closing modals**

### Strong Guidelines (Follow These)
1. **Prefer skeletons over spinners** (better perceived performance)
2. **Prefer inline validation over post-submit validation**
3. **Always provide an undo option for destructive actions** (when possible)
4. **Always show progress for long-running operations** (> 1s)
5. **Always preserve user input after validation failure**
6. **Always let users cancel an ongoing operation**
7. **Always provide a way to go back/exit**
8. **Always use clear, concise labels** (no jargon)
9. **Always respect `prefers-reduced-motion`**
10. **Always test with real users**
11. **Keep forms short** (split into steps if long)
12. **Group related information together**
13. **Use progressive disclosure** (hide advanced options by default)
14. **Be consistent** (same patterns everywhere)
15. **Error messages should explain how to fix the problem**

---

## 20. Copywriting Standards

### Voice & Tone
- **Voice**: Friendly, professional, trustworthy
- **Tone**:
  - Success: Positive, encouraging
  - Error: Reassuring, not alarming
  - Warning: Clear, cautionary
  - Info: Neutral, helpful
- **Personality**: Eco-conscious, community-focused, reliable

### Capitalization
- **Titles/Headings**: Sentence case (capitalize first word only)
  - ✅ "Create a donation"
  - ❌ "Create A Donation"
- **Buttons**: Sentence case
  - ✅ "Sign in"
  - ❌ "Sign In"
- **Labels**: Sentence case
  - ✅ "Email address"
  - ❌ "Email Address"
- **Proper Nouns**: Capitalize (ZeroWaste Connect, etc.)

### Button Labels
- **Action-Oriented**: Start with verb
  - ✅ "Create donation"
  - ❌ "Donation"
- **Clear**: Be specific
  - ✅ "Send request"
  - ❌ "Submit"
- **Consistent**: Use same labels for same actions
- **Length**: 1-3 words max

### Success Messages
- **Positive**: Celebrate small wins
  - ✅ "Donation created successfully!"
  - ❌ "Success"
- **Informative**: Explain what happened
- **Toast**: Keep short, 1-2 lines
- **Page**: Longer, with next steps

### Error Messages
- **Don't Blame**: "We couldn't find that page" not "You entered wrong URL"
- **Explain**: What went wrong
- **Advise**: How to fix it
  - ✅ "Please enter a valid email address"
  - ❌ "Invalid email"
- **Friendly**: Avoid "Error!", "Failed!"

### Empty States
- **Explain**: Why there's no data
  - ✅ "You haven't created any donations yet"
  - ❌ "No data"
- **Guide**: What to do next
  - ✅ "Create your first donation"
  - ❌ ""
- **Friendly**: Keep tone light

### Confirmation Dialogs
- **Clear**: State what will happen
  - ✅ "Are you sure you want to delete this donation? This cannot be undone."
  - ❌ "Delete this?"
- **Buttons**:
  - Cancel (left, secondary)
  - Confirm (right, destructive/primary)
  - Label buttons clearly (e.g., "Delete", not "OK")

### Notifications
- **Concise**: 1-2 sentences
- **Timely**: Send right after event
- **Actionable**: Add action button if appropriate (e.g., "View")
- **Not Annoying**: Don't send too many

### Microcopy
- **Helper Text**: Explain what to do
  - ✅ "We'll never share your email with anyone else."
- **Placeholders**: Example, not label
  - ✅ "you@example.com"
  - ❌ "Email address"
- **Loading States**: Reassure user
  - ✅ "Creating your donation..."
  - ❌ "Loading..."

### General Rules
- **Keep it Simple**: Short words, short sentences
- **Avoid Jargon**: No technical terms most users won't know
- **Be Consistent**: Same terms everywhere (e.g., "Donation" not "Gift" or "Item")
- **Use Active Voice**:
  - ✅ "We sent a reset link to your email"
  - ❌ "A reset link was sent to your email"
- **Avoid ALL CAPS**: Unless it's a short acronym
- **Use Contractions**: "Don't", "Can't", "It's" (feels more human)

---

## 21. Folder Structure Standards

### Frontend Structure (React/Next.js Example)
```
src/
├── app/                      # App routes (Next.js App Router)
│   ├── (auth)/               # Auth group layout
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/          # Dashboard group
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Dashboard home
│   │   ├── donations/
│   │   ├── requests/
│   │   └── settings/
│   └── ...
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/               # Layout components
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   ├── features/             # Feature-specific components
│   │   ├── donations/
│   │   │   ├── donation-card.tsx
│   │   │   └── donation-form.tsx
│   │   └── ...
│   └── shared/               # Reusable shared components
│       ├── empty-state.tsx
│       ├── loading-skeleton.tsx
│       └── ...
├── hooks/                    # Custom React hooks
│   ├── use-auth.ts
│   ├── use-donations.ts
│   └── ...
├── lib/                      # Utility functions & libraries
│   ├── utils.ts              # cn(), etc.
│   ├── api.ts                # API client
│   ├── validators.ts         # Zod schemas
│   └── ...
├── stores/                   # State management (Zustand, etc.)
│   └── use-store.ts
├── types/                    # TypeScript types
│   ├── donation.ts
│   ├── user.ts
│   └── ...
├── constants/                # Constants
│   ├── routes.ts
│   ├── config.ts
│   └── ...
├── styles/                   # Global styles
│   └── globals.css
└── assets/                   # Static assets
    ├── icons/
    ├── images/
    └── fonts/
```

### Component Organization Rules
- **ui/**: Basic shadcn/ui components (button, card, etc.)
- **layout/**: Navbar, sidebar, footer, etc.
- **features/**: Components grouped by feature (donations, requests, etc.)
- **shared/**: Reusable across features (empty-state, skeleton, etc.)
- **Colocation**: Keep component files together (e.g., `donation-card.tsx`, `donation-card.test.tsx`, `donation-card.stories.tsx`)

### Naming Conventions
- **Files**: PascalCase for components (`DonationCard.tsx`), camelCase for hooks/utils (`useAuth.ts`, `formatDate.ts`)
- **Components**: PascalCase (`DonationCard`, `Navbar`)
- **Hooks**: `use` prefix (`useAuth`, `useDonations`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `API_BASE_URL`)
- **Variables/Functions**: camelCase (`userName`, `formatDate`)
- **Types/Interfaces**: PascalCase (`User`, `Donation`)

### Backend Structure (Example)
```
src/
├── controllers/             # Route handlers
├── models/                  # Database models
├── routes/                  # API routes
├── middleware/              # Middleware (auth, etc.)
├── utils/                   # Utilities
├── services/                # Business logic
├── validators/              # Input validation
├── types/                   # TypeScript types
└── config/                  # Config files
```

---

## 22. Implementation Strategy & Roadmap

### Phase 1: Foundation (Weeks 1-2)
**Goal**: Set up project with design system basics
- [ ] Initialize project (Next.js/React + TypeScript)
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Add design tokens (colors, typography, spacing) to CSS
- [ ] Set up ESLint + Prettier (consistent code style)
- [ ] Add Lucide icons
- [ ] Set up basic folder structure
- [ ] Configure dark mode
- [ ] Add Framer Motion (for animations)
- [ ] Add `prefers-reduced-motion` support
- [ ] Set up linting/formatting rules
- [ ] Add basic components (Button, Card, Input)
- [ ] Test accessibility (keyboard navigation, contrast)

**Risk**: Low (mostly setup)
**Deliverable**: Working project with design system foundation

---

### Phase 2: Layout & Navigation (Weeks 2-3)
**Goal**: Build core layout and navigation
- [ ] Create Navbar component
- [ ] Create Sidebar component (collapsible, responsive)
- [ ] Create Bottom Navigation component (mobile)
- [ ] Create main layout (with sidebar/navbar)
- [ ] Implement responsive grid
- [ ] Add dark/light theme toggle
- [ ] Add skip-to-content link
- [ ] Test navigation on all breakpoints
- [ ] Test keyboard navigation
- [ ] Add animation to sidebar/mobile nav

**Risk**: Low
**Deliverable**: Fully responsive navigation layout

---

### Phase 3: Core Components (Weeks 3-5)
**Goal**: Build all components from inventory
- [ ] Build all shadcn/ui components (Alert, Dialog, Dropdown, etc.)
- [ ] Build custom components (Avatar, Badge, Toast, etc.)
- [ ] Add component stories (Storybook optional)
- [ ] Write accessibility tests for components
- [ ] Test all interactions (hover, focus, click)
- [ ] Test dark/light mode for all components
- [ ] Add motion to components
- [ ] Document components
- [ ] Create component examples page

**Risk**: Medium (many components, but shadcn/ui helps)
**Deliverable**: Complete component library

---

### Phase 4: Authentication & Core Pages (Weeks 5-7)
**Goal**: Build auth flow and main pages
- [ ] Login page
- [ ] Registration page
- [ ] Forgot password page
- [ ] Reset password page
- [ ] Email verification UI
- [ ] OTP input
- [ ] 401/403/404/500 error pages
- [ ] Dashboard home page (stat cards, basic layout)
- [ ] Loading/empty states for all pages
- [ ] Form validation (Zod or similar)
- [ ] Toast notifications

**Risk**: Medium
**Deliverable**: Working auth flow + dashboard skeleton

---

### Phase 5: Features & Pages (Weeks 7-10)
**Goal**: Build main features
- [ ] Donations page (list, create, edit, delete)
- [ ] Requests page
- [ ] Profile page
- [ ] Settings page
- [ ] Maps integration (React Leaflet)
- [ ] Charts integration (Recharts)
- [ ] Image upload component
- [ ] Multi-step forms
- [ ] Tables (with sorting, pagination)
- [ ] Optimistic UI (for safe operations)
- [ ] Offline handling (basic)

**Risk**: Medium-High (features depend on backend)
**Deliverable**: All main features implemented

---

### Phase 6: Motion & Polish (Weeks 10-11)
**Goal**: Add animations, polish UI
- [ ] Add page transitions
- [ ] Add micro-interactions to components
- [ ] Add skeleton loaders everywhere
- [ ] Add loading states to all async operations
- [ ] Add success/error animations
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Optimize animation performance
- [ ] Add hover effects to all interactive elements
- [ ] Add focus rings (consistent)

**Risk**: Low
**Deliverable**: Smooth, polished animations

---

### Phase 7: Accessibility & Performance (Weeks 11-12)
**Goal**: Make it accessible, fast, and robust
- [ ] Full WCAG 2.2 AA audit
- [ ] Fix contrast issues
- [ ] Add missing ARIA labels
- [ ] Test keyboard-only navigation
- [ ] Test with screen readers (NVDA, VoiceOver)
- [ ] Lighthouse audit (performance, accessibility)
- [ ] Optimize images
- [ ] Code splitting, lazy loading
- [ ] Virtualize long lists
- [ ] Add caching layer (TanStack Query/SWR)
- [ ] Test on low-end devices
- [ ] Test on slow networks (throttle in DevTools)
- [ ] Fix layout shifts (CLS < 0.1)
- [ ] Optimize Web Vitals (LCP < 2.5s, INP < 200ms)

**Risk**: Medium (accessibility takes time)
**Deliverable**: Accessible, fast, production-ready app

---

### Phase 8: Testing & QA (Weeks 12-14)
**Goal**: Test everything, fix bugs, prepare for launch
- [ ] Unit tests for components/hooks
- [ ] Integration tests for features
- [ ] E2E tests (Playwright/Cypress) for critical flows
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device testing (mobile, tablet, desktop)
- [ ] Dark/light mode testing
- [ ] Offline testing
- [ ] Error scenario testing
- [ ] Accessibility testing (axe-core)
- [ ] Performance testing (Lighthouse CI)
- [ ] Bug fixes
- [ ] Polish, polish, polish!

**Risk**: Medium-High (testing takes time)
**Deliverable**: Fully tested, bug-free app ready for launch

---

### Rollout Strategy
- **Dogfooding**: Internal team uses first (2 weeks)
- **Beta**: Small group of users (2 weeks)
- **Full Launch**: Gradual rollout
- **Monitor**: Track errors, performance, user feedback
- **Iterate**: Fix issues, improve UX

---

## Resources & References
- **shadcn/ui**: https://ui.shadcn.com
- **Radix UI**: https://www.radix-ui.com
- **Tailwind CSS**: https://tailwindcss.com
- **WCAG 2.2**: https://www.w3.org/TR/WCAG22
- **Material Design 3**: https://m3.material.io
- **Apple HIG**: https://developer.apple.com/design/human-interface-guidelines
- **Nielsen Norman Group**: https://www.nngroup.com
- **Refactoring UI**: https://www.refactoringui.com
- **Web Vitals**: https://web.dev/vitals
- **A11Y Project**: https://www.a11yproject.com

---

## Version History
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0 | 2026-07-11 | Complete overhaul, added all missing sections, DDR, expanded color system, components, motion, mobile UX, optimistic UI, error handling, performance, copywriting, folder structure, implementation roadmap | Design System Team |

---

## Approval
- [ ] Design Lead: _________________________ Date: ________
- [ ] Engineering Lead: _____________________ Date: ________
- [ ] Product Manager: _____________________ Date: ________

---
**End of Design System v2.0**
Okay, let's start by creating the DESIGN_SYSTEM_v2.md file with all the sections.<seed:tool_call><function name="TodoWrite"><parameter name="todos" string="false":[{"content": "Critically review the current DESIGN_SYSTEM.md and identify gaps, inconsistencies, etc.", "id": "1", "priority": "high", "status": "completed"}, {"content": "Create the Decision Log (DDR) section", "id": "2", "priority": "high", "status": "completed"}, {"content": "Expand the Color System to complete semantic tokens", "id": "3", "priority": "high", "status": "in_progress"}, {"content": "Create Data Visualization Standards section", "id": "4", "priority": "medium", "status": "pending"}, {"content": "Create Mapping Standards section", "id": "5", "priority": "medium", "status": "pending"}, {"content": "Create Dashboard Standards section", "id": "6", "priority": "medium", "status": "pending"}, {"content": "Create Authentication UX section", "id": "7", "priority": "medium", "status": "pending"}, {"content": "Expand Form Standards section", "id": "8", "priority": "medium", "status": "pending"}, {"content": "Create complete Component Inventory section", "id": "9", "priority": "medium", "status": "pending"}, {"content": "Create Motion System v2 section", "id": "10", "priority": "medium", "status": "pending"}, {"content": "Create Mobile UX Standards section", "id": "11", "priority": "medium", "status": "pending"}, {"content": "Create Optimistic UI Strategy section", "id": "12", "priority": "medium", "status": "pending"}, {"content": "Create Error Handling Standards section", "id": "13", "priority": "medium", "status": "pending"}, {"content": "Expand Performance Standards section", "id": "14", "priority": "medium", "status": "pending"}, {"content": "Create UX Rules section (hard rules)", "id": "15", "priority": "medium", "status": "pending"}, {"content": "Create Copywriting Standards section", "id": "16", "priority": "medium", "status": "pending"}, {"content": "Create Folder Structure Standards section", "id": "17", "priority": "medium", "status": "pending"}, {"content": "Create Implementation Strategy section with phases", "id": "18", "priority": "medium", "status": "pending"}, {"content": "Write DESIGN_SYSTEM_v2.md with all content", "id": "19", "priority": "high", "status": "pending"}]