# PROGRESS — build state

Running log of what is built, so a fresh session can pick up without re-reading
the whole tree. Specs (`README`, `CLAUDE`, `BRAND-AND-VOICE`, `DESIGN-SYSTEM`,
`COMPLIANCE`, `CONCEPTS`, `ASSETS`) remain the source of truth.

> **Resuming?** Start with `NEXT-SESSION.md` (current intro prompt + the requested
> funnel refactor), then `BOOKING.md`. State of play: the routed booking funnel v2
> is live and TDD-tested (Vitest, `npm run test:run`) — `/book` steps Patient → Type
> → Visit → Funding → Time → Details → Confirm. PMS direction decided: **Cliniko +
> HALTH** (funding). Duration rules and funding numbers are PROVISIONAL placeholders.

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

### Phase 3 — booking + accounts surface (mock) (this phase)
The chosen design is A2, promoted to `src/pages/index.astro` (the live home). This phase
adds a provider-agnostic booking flow and a non-clinical accounts surface, all mock, on
the static site, built so a real provider/backend later is a localised swap. Full spec:
`BOOKING.md`.
- `src/lib/booking/` — `types` (provider-agnostic), `config` (`PUBLIC_BOOKING_*` with safe
  defaults), `mock` (`mockBookingProvider`, realistic + COMPLIANCE-clean), `cliniko`
  (server-only STUB, imported by nobody), `index` (`getBookingProvider` → mock), `client`
  (THE SEAM the wizard imports; swap its bodies to `fetch('/api/..')` to go SSR — the whole
  static→SSR migration point).
- `src/lib/auth/` — `types` (`Account`: name/email/marketingOptIn, no health fields),
  `mock` (in-memory, does NOT persist across page loads — demo only), `index`.
- `src/components/PageHeader.astro` — light functional-page chrome (reuses `Wordmark`).
- `src/components/BookingFlow.astro` — custom wizard, framework-free TS, functional core
  (pure `State` + transitions + one `render(state)`); two-column layout (flow + sticky
  Booking summary). Steps service → time → details → confirm (single practitioner is
  auto-selected, shown as a bio card; no choice step — re-add when >1). Time step is
  date-first: horizontal date strip → times grouped Morning/Afternoon/Evening. Details has
  an optional notes box + optional create-account + account pre-fill (ready for real auth).
  Loading/empty/error states; one page h1, step h2s focused on entry + `aria-live` status.
  Clickable stepper titles (jump back to a completed step). Follow-up safeguards: an
  inline "existing issue?" check on selecting the 30-min follow-up, and a normalised
  patient-match soft-gate at submit (mock DB; `matchExistingPatient` seam). Mon-Fri
  9-6, Sat 9-12, 4-week window. Confirm reformats the page heading + locks the stepper/
  Change. Practitioner photo from `Practitioner.photo` with initials fallback.
  GOTCHA: option/slot/date/pcard nodes are created at runtime, so their CSS is scoped via
  `.booking :global(...)` (Astro scoped styles do not reach JS-created elements).
- `src/components/BookingEmbed.astro` — hosted-page fallback / placeholder.
- `src/components/account/AccountForm.astro` — shared login/signup form (`mode` prop).
- `src/pages/book/index.astro` — entry; build-time mode switch (custom vs embedded).
- `src/pages/account/{login,signup,index}.astro` — non-clinical accounts; `index` is the
  member-area DESIGN preview (sign-in not wired; not a security boundary, OK as no health
  data lives there).
- `src/layouts/Base.astro` — additive `noindex?` prop; set on `/book` + `/account/*`.
- `.env.example` — `PUBLIC_BOOKING_*` (build-time, not secret) + server-only `CLINIKO_*`.
- Verified in preview: full custom flow clickable end to end (`Z2-####` reference, "request
  not confirmation" copy), inline form validation + `aria-invalid` + focus move, signup →
  success panel, member area + login render, `noindex` on the new pages and absent on the
  live home (video hero intact). Dev-only state sim: `/book?sim=empty|error|slow`.

### Phase 4 — research + routed funnel + TDD (2026-06-15)
- Research outcome: PMS = **Cliniko** (client requires HALTH, which integrates Cliniko/
  Nookal/Halaxy, not Splose). HALTH has a public API so we can keep our own UI and call
  it for funding/payments later. Direction recorded in `BOOKING.md`.
- **Vitest** added (`npm test` / `npm run test:run`). Pure core is test-first:
  `src/lib/booking/patients.ts` (normalised matching, extracted from mock),
  `funnel.ts` (booking types + step order), `funnel-state.ts` (URL/param building),
  `duration.ts` (PROVISIONAL sizing rules — the tests are the spec). 34 tests.
- **Booking rebuilt as a routed funnel** (replaces the single-island wizard, which is
  deleted): `/book` (new/existing) → `/book/type` → `/book/time` → `/book/details` →
  `/book/confirm`. `src/components/booking/BookingShell.astro` is the shared chrome;
  `src/styles/booking.css` (namespaced `.book`, global) holds the styles — so the old
  `.booking :global(...)` runtime-node gotcha is gone. Email required, **mobile
  optional**. The existing-patient check now triggers on the new/existing answer (the
  service-level follow-up flag is removed).
- STATIC + query-param state gotcha: page frontmatter has no per-request query string,
  so the param-dependent chrome (summary, stepper/Change/Back links, type tiles) is
  hydrated client-side from `location.search`. This is where a future SSR adapter would
  help (and it's the backend the real integration needs anyway).
- Deleted: `BookingFlow.astro`; `Service.requiresExistingIssueCheck`; the inline
  patient-normalisation in `mock.ts` (now `patients.ts`).

### Phase 5 — design pass: cool stone surface + chrome glow (2026-06-15)
Paint-only refinement of the functional/booking chrome per `DESIGN-SYSTEM.md`. No
layout or copy change; build (12 pages) + the 61 Vitest tests stay green.
- **New cool, textured stone** in `tokens.css`: `--stone-cool` (#EEEFF1) +
  `--grad-stone-cool` (faint metallic gradient). It is **lightness-matched to the
  warm `--stone`** (#F2EFEA) on purpose — same luminance, cooler hue — so every ink
  token keeps the exact contrast it had on the warm stone (AA-neutral). Exposed to
  Tailwind as `--color-stone-cool` in `global.css`. The page-wide grain overlay reads
  over it, so the surface is textured, not a flat fill.
- Applied to the **booking funnel surfaces** in `booking.css`: practitioner card,
  funding result, existing-patient identify panel, no-match panel, sticky Booking
  summary, locked pre-filled inputs, and the choice/slot/outline-button hovers. The
  **warm `--stone` stays on both footers** (`Footer`, `FooterExpanded`) and the
  out-of-scope account/embed components — confirmed `rgb(242,239,234)` at runtime.
- **Subtle chrome glow** `--glow-chrome` (inner white top highlight + soft cool
  bloom, box-shadow only so it never touches text contrast). On the **booking chrome**
  (`PageHeader`, now on `--grad-chrome`; the sticky `.bsummary`) and on **home** (the
  `.map__frame` in `index.astro` — already a `--chrome` surface).
- Verified: CSS live via computed styles; no console errors; **no horizontal overflow**
  at 320/390/768/900/1024/1280/1920 on the two-column `/book/time`, nor on home at
  390/1280. Screenshotted the booking chrome across the width matrix (1920→320). The
  home map glow is verified by computed style only: the offline preview sandbox blanks
  the map iframe AND the tall-hero home page desyncs screenshot capture (both are the
  pre-existing env gotchas below).
- Dev note: this worktree's `/book` preview ran on **port 4322** (`dev-wt` config added
  to `.claude/launch.json`) because 4321 was held by a server in another worktree.

### Phase 6 — owner-review refinements + staging deploy (2026-06-16)
Client-review round on the booking funnel. Build (12 pages) + 68 Vitest tests green.
- **Existing-patient demo**: single hardcoded credential, now PRE-FILLED in the inputs
  (Jane Doe / janedoe@gmail.com) so one click proceeds. Strict match (exact name AND
  email); the "email or mobile" field is format-validated (`isEmailOrMobile` in
  `patients.ts`). Old alex/jordan/sam records removed.
- **Visit step**: "Treatment & rehab" pre-selected for new patients with a "usual first
  visit" hint. Continue goes straight to the next page — the cover section is NOT
  force-opened. Partial cover still blocks and re-opens to flag the incomplete field(s).
- **Private health cover gating** (`funding.ts`): continue allowed only when cover is
  empty or fully complete (fund + all three numbers); partial blocks with red/orange
  borders on the specific fields (incl. the fund `select`). `fundingComplete` now needs
  all three numbers (tests updated).
- **Colours** (client direction): no flat charcoal/black fills. Stepper PROGRESS badges =
  brand orange (`--accent-deep`); SELECTION tiles (chosen date, chosen visit options) =
  a new muted steel-blue `--select` (#3E5C76) so orange (flow) and blue (selection) never
  compete. Dr profile card is borderless on the cool stone. A2 hero dark panels + Z² logo
  LEFT as-is (owner-directed design).
- **Confirmation page**: stepper removed (guarded by `!locked` in `BookingShell`).
- **Cool stone extended to accounts**: member-area cards + auth success panel →
  `--grad-stone-cool`.
- **Visit composition in the summary**: new `visit` param (both/treatment/rehab) carried
  from the scope step; the summary shows it as a sub-line under the duration in the
  address style ("45 minutes" / "Treatment & rehab"). Helper `visitWantsLabel` (duration.ts).
- **Deploy**: `staging` branch created off this work; `staging.zone2hp.com` (Vercel,
  branch-assigned, Squarespace CNAME) is the client-review URL. `main` = production
  (`zone2hp.com`) stays untouched until sign-off. Push to `staging` to update the review
  site; merge to `main` only when ready for customers (and decide `bookingConfig.linksVisible`
  + which pages drop `noindex`).

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
- Concept review is resolved: A2 is the chosen design and is live at `src/pages/index.astro`.
  A1 remains at `src/pages/concepts/a1.astro` for reference; B1/C1/C2 were not needed.
- Booking/accounts: confirm the provider (likely Cliniko) and the real services /
  practitioners / host, then implement the real adapter behind `client.ts` (needs an SSR
  host). See the open questions in `BOOKING.md`.
- Full site (phase-2 IA in `CONCEPTS.md`): About, Treatments, the Zone Two Method,
  first-visit, etc., built on the A2 design system.
