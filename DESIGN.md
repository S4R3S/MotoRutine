# Design Brief

## Tone & Purpose
Utilitarian dashboard for vehicle fleet maintenance tracking. Data-first, scannable, professional. Every element earns its place. No decoration.

## Differentiation
Metric cards with semantic color-coded left borders. Status badges using consistent semantic colors (green=complete, orange=overdue/pending, neutral=in-progress). Compact grid layout maximizing information density. Spanish labels throughout for fleet manager audience.

## Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.62 0.15 198 (teal) | Interactive elements, primary CTAs, focus states |
| Secondary | 0.72 0.18 54 (orange) | Warnings, overdue status, urgent maintenance |
| Accent | 0.65 0.16 142 (green) | Success state, completed jobs, upcoming maintenance |
| Background | 0.97 0 0 (light) | Main page background |
| Card | 1.0 0 0 (white) | Card surfaces, elevated content |
| Muted | 0.93 0 0 (light grey) | Alternating backgrounds, secondary sections |
| Foreground | 0.2 0 0 (dark grey) | Primary text, labels |
| Border | 0.88 0 0 (light grey) | Dividers, section boundaries |

## Typography

| Tier | Font | Usage |
|------|------|-------|
| Display | General Sans (geometric, 600–700 wt) | Metric values, section headers, card titles |
| Body | Figtree (humanist, 400–500 wt) | Labels, descriptions, status text, list content |
| Mono | Geist Mono (400 wt) | Vehicle IDs, data fields if needed |

Type scale: 0.875rem (body) → 1.125rem (label) → 1.5rem (section header) → 2rem (metric value).

## Elevation & Depth
Minimal shadows. Cards elevated via solid borders and background color only. Header/footer distinguished via border-bottom/border-top. Dark mode: darker background surfaces with increased card contrast.

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header/Nav | Solid card bg with border-bottom, padding-y 1rem, padding-x 2rem |
| Main Content | bg-background, padding 2rem |
| Metric Grid | 4-column grid (responsive: 1 col mobile, 2 col tablet, 4 col desktop), gap-4, each card has 4px left border with semantic color |
| Section Blocks | bg-card with border, rounded-md, padding-4, margin-bottom 2rem |
| Lists | bg-card, border, rounded-md; list items have border-bottom divider except last; alternating subtle background if needed |
| Footer | border-top, bg-muted/20, padding-y 1rem, padding-x 2rem, text-muted-foreground |

## Spacing & Rhythm
Base unit: 0.25rem. Compact density: 4px gutters, 16px padding inside cards. Section margins: 2rem vertical. Removes breathing room in favor of metrics visibility.

## Component Patterns
- **Metric Cards**: 4px left border (color-coded by status), bold headline number, small label. Hover: slight scale (1.02), no background change.
- **Status Badges**: Inline, semantic bg color, small font (0.75rem), pill or rounded-sm shape (4px), padding 0.25rem 0.5rem.
- **List Items**: Flex row, label/value split. Border-bottom divider. Hover: bg-muted/50.
- **Job/Maintenance Item**: Title (bold, body font), subtitle (smaller, muted). Status badge right-aligned.

## Motion
Smooth transitions: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` on interactive elements (buttons, cards, focus states). No animations beyond entrance. Page loads static.

## Dark Mode
Dark mode enabled. Backgrounds darkened (0.12 for main, 0.16 for cards). Teal primary lightened (0.72), orange/green adjusted for visibility. Text remains at 0.92 (near white) for contrast.

## Constraints & Anti-Patterns
- No full-page gradients. No decorative patterns.
- Metric badges only on job/maintenance items (never standalone).
- Avoid rounded-lg (12px) — use rounded-md (6px) or rounded-sm (4px) for compact feel.
- No beveled edges, no bevels, no gradients inside buttons.
- Color usage: primary for links/primary CTAs only. Secondary/accent for status only.
- Fonts loaded via @font-face, no system fallbacks.

## Signature Detail
Left-aligned color-coded borders on metric cards. Teal for general, orange for urgent/overdue, green for healthy. This pattern repeats on status badges, creating visual cohesion across the dashboard.

