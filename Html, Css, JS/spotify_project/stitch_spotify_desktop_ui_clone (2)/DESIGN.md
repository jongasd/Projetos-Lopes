---
name: Sonic Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#53e076'
  primary: '#53e076'
  on-primary: '#003914'
  primary-container: '#1db954'
  on-primary-container: '#004118'
  inverse-primary: '#006e2d'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b4b4'
  tertiary: '#ffb3b3'
  on-tertiary: '#680114'
  tertiary-container: '#ff767b'
  on-tertiary-container: '#730a1b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#72fe8f'
  primary-fixed-dim: '#53e076'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#ffb3b3'
  on-tertiary-fixed: '#400009'
  on-tertiary-fixed-variant: '#881d28'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system centers on a high-fidelity, immersive dark mode experience designed for entertainment and discovery. The brand personality is premium, focused, and energetic. By utilizing a deep, near-black foundation with vibrant pops of brand color, the UI recedes to let content—specifically imagery and media—take center stage.

The design style is **Minimalism** blended with **Tonal Layering**. It avoids unnecessary ornamentation, relying on subtle shifts in background values and precise typography to establish hierarchy. The aesthetic is clean and rhythmic, evoking the feeling of a high-end physical audio interface translated into a digital environment.

## Colors

The palette is strictly curated to maintain a premium dark-mode aesthetic. The foundation is built on `#121212` to provide a softer, more sophisticated depth than pure black. 

- **Primary:** The Brand Green is used exclusively for calls to action, active states, and progress indicators to ensure they vibrate against the dark backdrop.
- **Surface Tiers:** Layers are defined by value shifts. Level 0 is the background (`#121212`), while Level 1 (Sidebars and Cards) uses `#181818`. 
- **Interactions:** Hover states utilize a significantly lighter grey (`#282828`) to provide immediate tactile feedback.
- **Typography:** High-contrast white is reserved for headers and primary information, while secondary metadata is muted to a medium grey to reduce visual noise.

## Typography

The design system utilizes **Inter** for its exceptional legibility in dark environments and its modern, systematic appearance. 

- **Headlines:** Use heavy weights (700-800) and tight letter spacing to create a bold, "editorial" impact.
- **Body:** Standard weights with generous line height (1.6) ensure long-form text remains readable against high-contrast backgrounds.
- **Labels:** Small caps or uppercase styling is applied to labels and category headers to provide a clear structural break from content titles.

## Layout & Spacing

This design system adheres to a strict **8px spacing grid**. All dimensions, padding, and margins must be multiples of 8 to ensure visual rhythm and alignment.

The layout utilizes a **fluid grid** for content areas, typically structured into a 12-column system for large screens. A persistent sidebar is anchored to the left, while the main content area features dynamic padding that scales with the viewport. Horizontal scrolling sections (carousels) are used frequently for content density, maintaining a 24px gap between items.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** rather than traditional shadows. In this dark ecosystem, depth is perceived by elements becoming lighter as they "lift" toward the user.

1.  **Floor (Level 0):** `#121212` - The base application canvas.
2.  **Raised (Level 1):** `#181818` - Navigation sidebars, player bars, and card containers.
3.  **Overlay (Level 2):** `#282828` - Contextual menus, tooltips, and hover states.

For high-fidelity components like active playing cards, a subtle **ambient glow** using the Brand Green at 10-15% opacity may be used to indicate focus. Use low-contrast outlines (`#ffffff10`) on buttons and inputs to define boundaries without breaking the minimalist aesthetic.

## Shapes

The shape language is consistently **Rounded**. A base radius of 8px (0.5rem) is applied to cards, buttons, and input fields to soften the industrial feel of the dark palette.

- **Standard Cards:** 8px radius.
- **Interactive Elements:** Buttons and tags utilize a "Pill" shape (fully rounded) to distinguish them from structural containers.
- **Media Containers:** Album art and thumbnails strictly follow the 8px radius, unless representing a "Profile" or "Artist" entity, which should be rendered as a perfect circle.

## Components

### Buttons
- **Primary:** Pill-shaped, Brand Green background, black text for maximum legibility. Scale up slightly (1.05x) on hover.
- **Secondary:** Pill-shaped, transparent with a 1px white or light-grey border.

### Cards
- **Container:** `#181818` background with an 8px border radius.
- **Padding:** 16px internal padding.
- **Interaction:** On hover, the background transitions to `#282828` and a floating "Play" button (Brand Green) should appear with a subtle slide-in animation.

### Input Fields
- **Styling:** Dark grey background (`#282828`), 8px border radius, no border by default.
- **Focus:** 1px Brand Green border to indicate active state.

### Lists
- **Layout:** High-density rows with a hover state of `#ffffff10`.
- **Text:** Primary title in White, metadata in Secondary Text (`#b3b3b3`).

### Additional Components
- **Progress Bars:** Use a thin 4px track. Background is `#ffffff30`, active fill is Brand Green.
- **Chips/Tags:** Small pill-shaped containers with `#282828` background and White text, used for genres or categories.