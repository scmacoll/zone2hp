# DESIGN SYSTEM — Zone Two Health and Performance

## Aesthetic point of view

Refined technical, alpine utilitarian. The world of Arc'teryx, Salomon, Nivis and Quechua, translated to a clinic. White and light dominant, a single sharp accent, spec-sheet confidence, generous negative space, subtle texture so the white never feels sterile. All the darkness and drama come from the footage (night running, blizzard), so the interface itself stays light. The client does not want black backgrounds, and we do not need them.

Commit to the direction with precision. This is refined minimalism, which means restraint, exact spacing, and careful typography rather than effects piled on.

### Anti-generic rules (enforce these)

- No Inter, Roboto, Arial, or system-font defaults. No Space Grotesk default either. Use the families below.
- No purple gradients on white. No stocky rounded-corner card soup.
- Atmosphere over flat fills: a fine grain overlay, hairline chrome borders, restrained metallic gradients on surfaces.
- One orchestrated page-load reveal beats scattered micro-interactions.

## Colour tokens

Charcoal text, never pure black. Off-white and stone base. Cool chrome greys for surfaces and hairlines. One alpine-orange accent, used sparingly. Define as CSS variables in `tokens.css`. Starting values (tune per concept):

```css
:root {
  /* base */
  --paper:        #FBFAF8;  /* page background, warm off-white */
  --stone:        #F2EFEA;  /* secondary surface, warm */
  --chrome:       #E7E6E2;  /* cool light surface */
  --chrome-line:  #D7D5CF;  /* hairline borders */
  --chrome-cool:  #C9CDD2;  /* cooler metallic grey */

  /* ink */
  --ink:          #1C1D1F;  /* primary text, charcoal not black */
  --ink-2:        #54565A;  /* secondary text */
  --ink-3:        #8A8C90;  /* muted / captions */

  /* accent: alpine / trail orange (doubles as the clinic stone-orange) */
  --accent:       #DD4F23;
  --accent-deep:  #B23D18;  /* hover / pressed */

  /* warm neutral, optional */
  --sand:         #B8AFA3;
}
```

Use the accent for one thing per view (a CTA, an underline, a marker). Borders are hairline `--chrome-line`. A subtle metallic feel comes from a faint linear gradient on chrome surfaces, not from a flat grey.

## Typography

Three roles. Distinctive but readable. All available via Fontsource / Google Fonts so they self-host cleanly in Astro.

- **Display:** Archivo (variable). Use heavier weights and the expanded widths for hero headlines. Confident, technical, not overused.
- **Body:** Hanken Grotesk. Clean, slightly warm, neutral without being Inter.
- **Mono / labels:** Geist Mono (or JetBrains Mono). For eyebrows, the services line, spec callouts, and the coordinate motif. Mono reads as technical and on-brand.

Vary type per direction so the five concepts feel distinct (see `CONCEPTS.md`). The editorial direction may introduce a refined serif for a single headline; the console direction leans hardest on mono.

Fluid scale with `clamp()` so headlines never break awkwardly at in-between widths. Example:

```css
--step-hero: clamp(2.75rem, 1.5rem + 6vw, 7rem);
--step-h2:   clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
--step-body: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
--step-label: 0.78rem; /* uppercase, letter-spaced 0.12em */
```

Tight tracking on big display. Uppercase, letter-spaced labels for eyebrows.

## Spacing, shape, texture

- Spacing scale fluid with `clamp()`; section padding grows with viewport.
- Corners mostly sharp or barely rounded (2 to 4px). This is technical, not soft.
- Hairline borders in `--chrome-line`.
- A fine grain overlay across the page at low opacity (a tiled PNG or an SVG `feTurbulence`), the Quechua move that keeps white from feeling flat. Keep it subtle and disable under reduced-motion if animated.

## Motion

- One orchestrated load: staggered reveals of eyebrow, headline, then supporting elements via `animation-delay`.
- Scroll-triggered reveals for sections (Intersection Observer in a small island, or CSS scroll-driven animations where support allows, with a no-JS fallback that simply shows content).
- A "scroll to explore" cue on the video-led concepts.
- Everything respects `prefers-reduced-motion`. Reduced motion shows final states and the poster image, no autoplay.

## Components (coming-soon scope)

- **Wordmark.** ZONE TWO set in Archivo, optionally with a small superscript 2 as a mark. Monoline, confident.
- **Hero.** Full-bleed visual area with a swappable `<video>`/still slot, the wordmark, an opening-soon statement, optional one-line of services, optional scroll cue. Defines a safe area where text sits regardless of crop.
- **Eyebrow.** Uppercase mono label.
- **ServicesLine.** `CHIROPRACTIC · REHAB · EXERCISE PHYSIOLOGY · DRY NEEDLING` in mono.
- **MapBlock.** Embedded map of the Eastwood address (see `CONCEPTS.md` for the embed approach) with the written address beside or below it.
- **ContactBlock.** Phone (placeholder) and email, as real `tel:` and `mailto:` links.
- **Footer.** Wordmark, address, contact, copyright. Light background.
- **CtaButton.** Accent or outline. For a coming-soon page this is usually "Call the clinic" or "Email us", since booking may not be live yet.

Later phase adds Section, ServiceCard, MethodStep, StatCallout for the full site.

## Responsive engineering (the important part)

The common failure (a vibe-coded layout that breaks at half a laptop width) comes from pinning layout to the viewport with magic-number breakpoints. Avoid it structurally.

- **Fluid before stepped.** `clamp()` for type and spacing, `min()/max()` for widths, `auto-fit`/`minmax` grids and `flex-wrap` so content decides where to wrap.
- **Container queries.** Style components on their own container width with `@container`, not the viewport. A block in a narrow column then reflows correctly whether the window is full width or split in half. This is the actual cure for the split-screen problem.
- **Viewport units.** Hero uses `svh`/`dvh`/`lvh`, never `100vh`, so mobile browser chrome does not clip it.
- **Images and video** use `object-fit: cover` with an art-directed focal point, and swap to a poster on small screens.
- **Test matrix.** 320, 360, 390 (phones), 768, 834 (tablets), 1024 (small laptop and split window), 1280, 1440, 1920, plus landscape phone, plus a continuous drag-resize, and explicitly ~700px and ~900px. Screenshot at these widths.
- **Touch.** Tap targets at least 44px. No hover-only behaviour. Test real thumb reach on the contact and map blocks.

## Accessibility

Semantic landmarks, one h1 per page, logical heading order, visible focus states, alt text on all imagery, contrast at AA against the light background (charcoal text passes easily; check the accent on white for any text use), and full keyboard operability of the map and contact links.
