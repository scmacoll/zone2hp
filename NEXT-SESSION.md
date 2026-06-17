# Next session — intro prompt

Paste the block below to start the next session. Everything else is current in the
repo: read `CLAUDE.md`, `BOOKING.md`, then `PROGRESS.md`.

## Where things stand (hand-off state)

- Custom booking funnel is **live as routed steps** under `/book/*`, now **5 steps**:
  **Patient → Type → Visit → Time → Details → Confirm** (`BookingShell` is the shared
  chrome; styles in `src/styles/booking.css`, namespaced `.book`).
- **Funnel refactor (2026-06-15) complete and verified in-browser:**
  1. **Duration** (`duration.ts`) encodes the client's table: existing 1→30/30/30,
     2→45/30/45, 3→60/60/60; lapsed (>3mo) and **all new patients** are "extended"
     (+15 under 60; a 60 base becomes an open-ended **"minimum 60 minutes"**). New
     patients answer the same areas/wants questions, with no ">3 months" control.
     `estimateDuration` returns `{ minutes, isMinimum }`; the `dur` token is `45` or `60+`.
  2. **Existing patients identify at step 1** (name first+last + one "email or mobile"
     field; matched by email OR phone via `findPatient`). A match carries an opaque
     **`pid`**; Details resolves it (`getPatient`) to **pre-fill + lock**. No-match shows
     a gentle panel. New patients still fill Details.
  3. **"Rehab consultation" type removed** — `BOOKING_TYPES` is standard/EPC/TPC/NDIS.
  4. **Funding folded into Visit** as an optional accordion ("finish a section → it folds,
     next unfolds"); one fewer stage.
  5. **Funding UX**: single **Continue** (the second "no insurance" button is gone), cover
     is genuinely skippable. Added **Card issue number** + **Reference number**. Gate is
     **complete-or-empty**: a partly-filled card blocks Continue; a fund alone or nothing
     sails past (`canContinueFunding` / `fundingComplete`).
  6. **Back** moved to a consistent **bottom-left** action row, next to the primary action
     (`BookingShell` `step__foot` + `action` named slot).
- **TDD with Vitest** (`npm test` / `npm run test:run`) — **61 tests green**; build is
  **12 pages** green (the `/book/funding` route is gone). Pure logic in
  `src/lib/booking/*.ts` (`funnel`, `funnel-state`, `duration`, `funding`, `patients`),
  each with a `*.test.ts`.
- Provider-agnostic behind a mock (`src/lib/booking/`); **PMS direction = Cliniko +
  HALTH** (funding). Everything is mock/provisional; nothing is wired to a backend. The
  funding numbers (`funding.ts`) stay PROVISIONAL until the HALTH API answer lands.

---

## INTRO PROMPT (copy from here)

> Continue the Zone Two booking build. Read `CLAUDE.md`, `BOOKING.md`, then `PROGRESS.md`
> first. The custom booking funnel is live as routed `/book/*` steps (Patient → Type →
> Visit → Time → Details → Confirm), built TDD with Vitest, provider-agnostic behind a
> mock. Keep the rules: simple, idiomatic, procedural, modular, **functional**, **strong
> TDD**, and **remove redundant code** when refactoring (don't just add).
>
> The funnel refactor is done (duration table, step-1 existing-patient match + locked
> Details, rehab type removed, funding folded into Visit as an accordion, complete-or-empty
> funding gate with card issue + reference fields, Back moved bottom-left). Next is the
> **design pass**:
>
> **Design pass.** New light-grey textured **"stone"** surface (keep the warm footer),
> with a subtle **chrome glow**, as described in `DESIGN-SYSTEM.md` / `tokens.css`
> (`--stone`, `--chrome`, `--grad-chrome`, the grain overlay). Apply it across the booking
> chrome (`BookingShell`, the step surfaces, choice tiles, accordion) without breaking AA
> contrast or the responsive behaviour. Screenshot the DESIGN-SYSTEM test widths.

## (end intro prompt)

## Open decisions resolved this session
- **Duration / lapsed**: the >3-month rule still applies on top of the table (+15, or a
  60 becomes "minimum 60"); **new patients = lapsed-equivalent** (extended table, no
  checkbox).
- **Existing-patient name**: two bars (first + last); match key is email-or-phone.
- **Stage collapse**: Funding folded into Visit as an accordion.
- **Partial insurance**: complete-or-empty (a fund alone is fine; a half-filled card blocks).
- **Back button**: bottom-left, next to the primary action, consistent across steps.

## In-flight notes for the design pass
- `BookingShell` owns the bottom action row (`step__foot`) and the `action` named slot.
- The accordion lives in `src/pages/book/scope.astro`; its styles are `.acc*` in `booking.css`.
- A real `getPatient` MUST be authorised (it returns PII by id); fine for the mock review.
