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

### Phase 2 — concept A1 (commit `feat: concept A1 ...`)
- `src/pages/concepts/a1.astro` — Direction A "The Film", snow / blizzard. Reuses
  every Phase 1 component unchanged (no component edits). Cinematic centred hero:
  Wordmark (lg, `mark`) + h1 `Stay in the season.` + opening-soon sub + scroll cue,
  over the A1 grade; then a compact info band (arc line, ServicesLine, MapBlock |
  ContactBlock) + Footer.
- `src/styles/tokens.css` — added `--grad-hero-a1` (cooler/brighter snow grade,
  faint orange pop low). Applied by setting `--grad-hero: var(--grad-hero-a1)` on
  `.page-a1` (cascades into Hero's `.hero__media`, so Hero needs no prop/edit).
  This is the pattern for the other four concepts: add `--grad-hero-{id}`, set it
  on the page wrapper.
- A1 type lean lives in the page's scoped `<style>`: headline Archivo `wght 800`,
  `font-stretch 110%`, tighter tracking, larger clamp. Motion = shared `.reveal`
  stagger + scroll cue only (screenshots can't show motion; grade carries the look).
- Info `.info__blocks` two-column threshold is `@container (min-width: 48rem)` (NOT
  index's 60rem): tuned so ~900 and ~1024 both land in two-column map | contact
  rather than a sparse full-width contact. Verified: 1024 map(512)|contact(341),
  900 map(446)|contact(297), no overflow; 768 and narrower stay single-column.
- Media swap later: pass `poster="/images/hero-a1-poster.jpg"` +
  `video={{ webm:'/video/hero-a1.webm', mp4:'/video/hero-a1.mp4' }}` to `<Hero>`.

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
- Preview screenshot tooling gotchas (cost me time on A1, save yourself the pain):
  1. The screenshot viewport locks to the FIRST `preview_resize` after a server
     (re)start. Resizing again after the page has loaded desyncs captures (they come
     back blank). To screenshot width W: `preview_stop` + `preview_start`, resize to W
     FIRST, then navigate, then scroll + screenshot.
  2. `global.css` sets `html { scroll-behavior: smooth }`, so `window.scrollTo(0, y)`
     animates and the capture fires mid-scroll. Use `behavior:'instant'` (and/or set
     `document.documentElement.style.scrollBehavior='auto'`) before capturing.
  3. Hero is `100svh`, so the info band is always below the fold — must scroll to
     screenshot it. Layout can also be checked deterministically with `preview_eval`
     /`preview_inspect` (bounding boxes, `gridTemplateColumns`, `scrollWidth` overflow),
     which is race-free and good enough to prove a reflow when a capture won't cooperate.

## Next
- Build the five concepts one per session (A1, A2, B1, C1, C2) on this system. Start in
  plan mode, read `CONCEPTS.md` + the relevant spec, then execute. Each replaces/owns its
  own page under `src/pages/concepts/`. Only the winner needs real video + hosting.
