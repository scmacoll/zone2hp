# PROGRESS — build state

Running log of what is built, so a fresh session can pick up without re-reading
the whole tree. Specs (`README`, `CLAUDE`, `BRAND-AND-VOICE`, `DESIGN-SYSTEM`,
`COMPLIANCE`, `CONCEPTS`, `ASSETS`) remain the source of truth.

## Done

### Phase 0 — scaffold (commit `chore: scaffold ...`)
- Astro 6 (minimal, TS strict) + Tailwind v4 via `@tailwindcss/vite` (no config file).
- Fonts self-hosted with Fontsource variable packages, imported once in `Base.astro`:
  Archivo (`Archivo Variable`), Hanken Grotesk (`Hanken Grotesk Variable`),
  Geist Mono (`Geist Mono Variable`).
- `src/styles/tokens.css` — design tokens, the single source of truth.
- `src/styles/global.css` — `@import "tailwindcss"` + tokens, `@theme inline` maps
  tokens to utilities (`bg-paper`, `text-ink`, `font-display`/`font-mono`, etc.),
  base reset, `.skip-link`, `.reveal` load animation, `.grain` overlay, reduced-motion.
- `public/favicon.svg` — hand-drawn `Z²` mark. Page title + `site: zone2hp.com` set.

### Phase 1 — shared layout + components (commit `feat: shared Base layout ...`)
- `src/layouts/Base.astro` — document shell (SEO + OG meta, fonts, global.css,
  skip link, grain). Props: `title`, `description`.
- `src/components/`: `Wordmark`, `Eyebrow`, `Hero`, `ServicesLine`, `MapBlock`,
  `ContactBlock`, `CtaButton`, `Footer`.
- `src/pages/index.astro` — TEMPORARY system demo. The winning concept replaces it.

## Component contracts worth knowing

- **Hero** (`src/components/Hero.astro`): gradient (`--grad-hero`) is the always-on
  base. Drop real media in by path, no code change:
  ```astro
  <Hero poster="/images/hero-a1-poster.jpg"
        video={{ webm: '/video/hero-a1.webm', mp4: '/video/hero-a1.mp4' }} scrollCue>
  ```
  `align="center" | "start"`. Video hides on small screens / reduced motion → poster.
  Hero text is charcoal (`--ink`) over the light placeholder; for dark real footage a
  concept will need light text + a scrim (add a `tone` variant when that lands).
- **MapBlock** / **Footer**: `container-type` is on the component root; the *inner*
  wrapper (`.map__grid` / `.footer__inner`) is what the `@container` query restyles.
  Keep that pattern — an element cannot query its own size.
- **ContactBlock**: phone is a deliberate placeholder `(00) 0000 0000` / `tel:0000000000`.
  Email is real (`info@zone2hp.com`). Values stack (two big values collide side by side).
- Asset file names follow `ASSETS.md`: `public/images/hero-{a1,a2,b1,c1,c2}-poster.jpg`,
  `public/video/hero-{...}.webm` + `.mp4`.

## Conventions / gotchas
- AA: vivid `--accent` (#DD4F23) is ~3.9:1 on paper, so it is for fills/marks/focus only.
  Use `--accent-deep` for accent TEXT and solid button fills, `--accent-press` for hover.
  Do not use `--ink-3` for body/caption text on light backgrounds (fails AA); use `--ink-2`.
- Australian spelling, no em dashes, no banned AI-tell or outcome words (run the
  `COMPLIANCE.md` checklist on every new copy block).
- Verify: `npm run build`, then preview at `localhost:4321` (`.claude/launch.json`).
  Screenshot the DESIGN-SYSTEM test widths. Checked clean: 320/360/390/700/768/900/
  1280/1920 + landscape phone, no horizontal overflow, container queries reflow.

## Known environment note
- The Google Maps embed (`MapBlock`) is correct (keyless `output=embed`) but the local
  preview sandbox blocks external network, so the map renders blank *here only*. It loads
  on any networked browser / the real deploy.

## Next
- Build the five concepts one per session (A1, A2, B1, C1, C2) on this system. Start in
  plan mode, read `CONCEPTS.md` + the relevant spec, then execute. Each replaces/owns its
  own page under `src/pages/concepts/`. Only the winner needs real video + hosting.
