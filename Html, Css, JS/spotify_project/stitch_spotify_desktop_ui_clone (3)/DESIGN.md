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
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c7c6c6'
  on-tertiary: '#2f3131'
  tertiary-container: '#a1a1a1'
  on-tertiary-container: '#373838'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#72fe8f'
  primary-fixed-dim: '#53e076'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-muted:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
---

## Brand & Style
The design system is engineered to evoke the immersive, high-energy atmosphere of a premium digital lounge. It targets an audience that values curation, speed, and focus. The aesthetic is rooted in **Minimalism** with a heavy emphasis on high-contrast hierarchy to guide users through vast content libraries without friction. 

By utilizing a deep, near-black foundation, this design system creates a "stage" where content is the protagonist. The emotional response is one of sophisticated focus—eliminating peripheral distractions to prioritize the primary interaction.

## Colors
The palette is built on a strictly dark foundation to reduce eye strain and maximize the "pop" of vibrant content. 

- **Primary:** #1DB954 (Spotify Green) is used exclusively for calls to action, active states, and critical progress indicators.
- **Background:** #121212 serves as the base canvas.
- **Surface Levels:** Use #181818 for cards and #282828 for hover states or tertiary containers.
- **Typography:** #FFFFFF (Primary) provides maximum legibility against the dark background, while #b3b3b3 (Secondary) is reserved for metadata, descriptions, and placeholder text to establish clear information hierarchy.

## Typography
This design system utilizes **Inter** for its exceptional readability in digital dark modes and its clean, Swiss-inspired geometric qualities. 

Headings are set with heavy weights (700-800) and tight letter-spacing to create a bold, authoritative editorial feel. Body text maintains a standard weight for maximum legibility. Utility labels should use uppercase styling with increased letter spacing to differentiate metadata from primary content strings.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a standard 12-column structure for desktop and a 4-column structure for mobile. 

We employ an 8px linear scale to maintain a rhythmic vertical flow. Content containers should use generous internal padding (typically 16px or 24px) to ensure the UI feels "breathable" despite the dense dark color palette. Use larger margins (32px+) to separate distinct sections of the application, such as user libraries from discovery feeds.

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layering** rather than traditional drop shadows. Because the background is #121212, elevation is achieved by lightening the surface color.

- **Level 0 (Base):** #121212 (Main background).
- **Level 1 (Cards/Sidebar):** #181818.
- **Level 2 (Modals/Popovers):** #282828 with a subtle 1px border of #3e3e3e to define edges.
- **Interactions:** Use subtle gradient overlays (linear, top-to-bottom) on large header sections to transition from content-rich areas back into the base background color.

## Shapes
The shape language is defined by a "Pill-style" philosophy for interactive elements and "Soft-square" for content containers.

- **Actionable Elements:** Buttons, tags, and chips must use full pill-shaped rounding (radius: 100px) to signify interactivity.
- **Input Fields:** Use a modified roundedness (8px) to provide a stable, functional look while remaining cohesive with the system.
- **Content:** Album art, thumbnails, and cards should use a 4px to 8px radius to maximize screen real estate and maintain a modern "slick" edge.

## Components
- **Buttons:** Primary buttons are pill-shaped, filled with #1DB954, and use black text (#121212) for maximum contrast. Secondary buttons are ghost-style with white borders.
- **Inputs:** Fields should have a #282828 background with no border in their default state. Upon focus, they receive a white 1px border.
- **Cards:** Cards use #181818 as a base. On hover, the card background shifts to #282828, and a "Play" button (primary color) should transition in with a subtle lift effect.
- **Chips/Filters:** These are small, pill-shaped containers using #282828. When active, they switch to #FFFFFF text with a #1DB954 background.
- **Lists:** List items should feature a subtle hover state (#ffffff1a) and use the #b3b3b3 secondary text color for supporting information like timestamps or subtitles.
- **Progress Bars:** Use #b3b3b3 for the track and #1DB954 for the active fill. On hover, the fill should show a circular handle (thumb).