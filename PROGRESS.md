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

### Phase 2 — concept A1 (commit `feat: concept A1 ...`, then reworked to Nivis style)
- `src/styles/tokens.css` — `--grad-hero-a1` (cool/snow grade) still the hero
  placeholder. Pattern for other concepts: add `--grad-hero-{id}`, set on the page.
- **A1 was reworked at the owner's request to clone the Nivis hero template**
  (was: a light centred cinematic hero; now: full-bleed video + dark translucent
  panel, Myodetox-style footer). The light version lives in git history if needed.
- `src/pages/concepts/a1.astro` (current):
  - Full-bleed hero with a `<video>` slot (owner supplies the mp4; empty video
    falls back to `--grad-hero-a1`). Swap path: `/video/hero-a1.{webm,mp4}`,
    poster `/images/hero-a1-poster.jpg` — already wired on the `<video>`.
  - Top bar: dark `favicon.svg` logo box + reused `Wordmark` (`--ink` kept dark so
    it reads on the light snow) ... orange `EN` language pill (globe icon). CART
    removed (owner choice). Pill = volt fill + dark text.
  - Dark translucent rounded panel (`rgba(15,16,19,.82)`, 14px, backdrop-blur):
    top row = reused `ServicesLine` (panel re-points `--ink-2` light + `--accent`
    volt so it reads on dark); h1 `Coming soon.` (lowercase to match the template;
    owner can flip to caps) with a volt Z² badge; volt `DISCOVER OUR SERVICES` CTA.
  - `#find-us` light section reuses `MapBlock` unchanged ("relatively the same").
- `src/components/FooterExpanded.astro` (NEW, reusable) — Myodetox-style: bullet
  (`●`) headed auto-fit columns (Services text / Visit / Contact / Keep in touch),
  a giant clipped `ZONE TWO` watermark, a no-backend **mailto** subscribe field
  (`<form action="mailto:…">`, no storage), legal bar. Only live links (maps,
  mailto, tel) — no dead nav. Reads `var(--a1-volt, var(--accent))` so it falls
  back to brand orange outside the A1 wrapper.
- **Colour**: Nivis lime → same-brightness orange `--a1-volt #F58A2E`, defined on
  the `.a1` wrapper (wraps main + footer). Used as a FILL with dark text only
  (pill, CTA, badge, dots, send) — AA ~7.5:1. Accent TEXT stays the deeper brand
  orange (AA on light). Do NOT use volt for text or focus rings on light (fails
  contrast). Archivo stands in for the Nivis typeface (can't license theirs).
- Verified (build + eval/inspect + visuals): no overflow 360/768/900/1024/1280/
  1440; footer auto-fit reflows 4→3→2→1; map two-col down to 768; panel headline/
  CTA row at ≥34rem container else stacked; single h1; AA contrast on all fills.

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
- **ContactBlock**: phone is a deliberate placeholder `0450 222 122` / `tel:0000000000`.
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
