# Next session — handoff + intro prompt (updated 2026-07-16)

Read order for the next session: `CLAUDE.md` → `BOOKING.md` (note the **SUPERSEDED /
Splose** block at the top of "Provider direction") → `PROGRESS.md` → `FAQ-AND-PRIVACY.md`
→ `BRANDING-AND-BIO.md` → this file. Then paste the **INTRO PROMPT** block near the bottom.

Git / deploy status (verified 2026-07-16):
- **`main` = production IS merged and LIVE** (PR #1, `662f6fa`). **zone2hp.com** now serves
  the new home page with the working keep-in-touch email capture, and the production gate
  is confirmed active — **no Book now / Log in buttons** (checked live).
- **`staging`** + **`claude/charming-jackson-fcd1c0`** are the working branches (currently
  `e390642`), deployed to **`staging.zone2hp.com`**, and sit **4 commits ahead of main** —
  those are handoff docs + branding files + one trivial `mock.ts` post-nominal fix, i.e.
  nothing production is waiting on.
- Workflow: build on `staging` → client reviews `staging.zone2hp.com` → merge to `main`
  when approved.

Local preview: this worktree runs
**`dev-wt`** (port **4322**) — I added that launch config because `4321` was held by
another worktree's dev server; `dev` (4321) is fine if nothing else holds it. A fresh
worktree may need its own config.

---

## Where things stand (built + shipped to staging)

**Home page (live design, chosen concept A2)** — the coming-soon landing page is done:
video hero + translucent panel, map, expanded footer. Design passes applied: cool textured
`--stone-cool` surface + `--glow-chrome`, brand-orange progress vs **steel-blue selection**
tiles, nav CTA labels kept on one line on mobile. **Keep-in-touch email is LIVE** — footer
form validates inline and POSTs to **Formspree** (`/f/xlgkvgjw` → **info@zone2hp.com**),
shows an inline confirmation. (One-time: submit once on staging, then click Formspree's
confirmation email to activate the form.)

**Booking funnel (mock, on staging for client review)** — routed `/book/*` steps
Patient → Type → Visit → Time → Details → Confirm, TDD (Vitest, **68 tests green**, build
**12 pages**), provider-agnostic behind a mock. Highlights added this run:
- **Time step**: pick a time to select it (steel-blue), then a **Continue** button (needs
  date + time). A **fully-booked day** renders disabled/"Full" (mock leaves the 2nd open
  day booked as the example).
- **Details = two phases on one page**: edit → **Review your booking** (consolidated
  appointment + your details, with Edit/Back) → **Request booking**. Contact details are
  NOT in the URL, so they ride to `/book/confirm` via a one-time `z2-confirm`
  **sessionStorage** handoff (read once, deleted; a direct visit shows only the appointment).
- **Summary**: shows the visit composition under duration; the **practitioner (Dr Mintae
  Kim)** under the consultation type once a time is chosen; and, for an **existing patient**,
  their **name + email/mobile** under "Existing patient".
- **Existing-patient demo credential** (single, hardcoded): **Jane Doe / janedoe@gmail.com**,
  pre-filled; strict name+email match; "email or mobile" is format-validated.
- Design: Dr card is borderless cool stone; account pages picked up the cool stone.

**Deploy / gating (done):**
- `staging.zone2hp.com` = the full review build (Vercel branch domain on `staging`, CNAME
  at Squarespace). **Vercel Deployment Protection (Vercel Authentication) is OFF** so the
  client can view without a Vercel login.
- **Production gate (build-time flag)**: every `/book/*` and `/account/*` page redirects
  home when `bookingConfig.linksVisible` is false, the same flag that hides the nav's
  Book/Log in buttons (`PUBLIC_BOOKING_LINKS_VISIBLE`). On by default (staging = full);
  set it `false` in **Vercel → Production only** to ship "home + email, no booking".
- **DONE (2026-07-16): production has shipped.** The Production env var is set and `staging`
  was merged to `main` (PR #1). zone2hp.com serves the new home + email capture with booking
  gated off — verified live. Future releases repeat the same path: merge `staging` → `main`
  via a GitHub PR (`github.com/scmacoll/zone2hp/compare/main...staging`).

---

## Client communications (the source of everything below)

The client is **Dr Mintae Kim** (chiropractor, the practice owner). Two emails + a call:

**Email 1 (early July 2026, 6 attachments).** Paraphrased: he had been quiet while
evaluating CRM platforms and has decided to switch to **Splose** — he believes it has more
capability for automations, patient retention, data analytics and AI. Attached **a bio, the
slogan, and the logo variations**, noting *"the Logotype+icon+HP is the full logo and I
would like to use variations of the logo throughout the branding."* He was on the Splose
trial awaiting full access, after which he would *"be setting up all the online booking
parameters."* Opening date **20/07, tentative**.

**Email 2 (10 Jul 2026, 17:56, FAQ docx attached).** Gave the Splose workspace link
`zone-two-health-and-performance.splose.com` **plus a login password (deliberately NOT
stored in this repo — get it from the client)**. Key line:

> "Adding this into the FAQ section is going to be important as it will serve as link for
> the details about the consent and privacy policy before they tick the box and sign
> online."

i.e. the privacy/consent copy goes on **our** website, and **Splose's online consult form
links to it** before the patient ticks consent and signs. He was on standby over the
weekend for questions.

**Phone call.** Appointments are **30 or 60 minutes only — no more 45-minute appointments**
for now.

### Splose access — what that URL actually is, and where the embed code lives

`zone-two-health-and-performance.splose.com` is the practice's **Splose workspace (the staff
app)**, not the patient booking page — which is why it needs a login. A patient opening it
would just get a Splose sign-in screen, so **do not link customers to it**.

The **public booking link and embed code** are a different URL, found inside Splose:
- Enable first: **Settings → Locations** (enable online bookings), **Settings → Services**
  (enable per service), **Settings → Users → Details** (enable per practitioner, plus an
  optional professional statement).
- Then: **Settings → Online bookings** — this shows the copyable **online booking link**,
  the **embed code** for a website, booking intervals/alerts, and a live preview. The page
  is brandable (colours, logo, notices, cancellation policy, terms, confirmation message).
- Sanity check: open the booking link in a **private/incognito window** (logged out) to see
  exactly what a patient sees.

---

## The pivot — client email (2026-07-10) + phone call. THIS drives the next session.

1. **PMS is now Splose** (not Cliniko/HALTH). `zone-two-health-and-performance.splose.com`
   (password-protected during setup; client has the password). Splose does booking, intake,
   records, payments and Medicare/health-fund claiming natively, so **HALTH is dropped**.
   The client is setting up appointment types + booking parameters inside Splose.
2. **Booking strategy — RESEARCHED 2026-07-16. Recommendation: EMBED Splose.**
   Findings from Splose's own documentation:
   - Splose **does** have a REST API (`docs.splose.com`) covering **availability**,
     **appointments** (create/update), **patients**, **patient forms** and **payments** —
     so a custom UI is technically possible.
   - **But auth is a single secret, workspace-level API key** (Bearer token) whose
     permissions equal the associated user account. It can never sit in the browser, so a
     custom UI needs a serverless backend — and that backend would hold a credential able
     to read/write **every patient record**. That is a serious security and privacy
     liability, and it would make us a custodian of health data.
   - Splose online bookings provide a **public shareable link AND official embed code** for
     inserting the booking page directly into a website (explicitly mobile-optimised), and
     the page is **brandable**: colours, logo, important notices, cancellation policy,
     terms and confirmation messages.
   - Splose also owns **intake, the online consent signature and payments/claiming**, so a
     custom UI would cover slot selection only and then hand off anyway.

   **Recommendation: use the embed** — `mode=embedded` / `BookingEmbed.astro` already
   exists for exactly this. The patient stays on zone2hp.com, Splose remains the data
   custodian, and no credential touches our infrastructure. Link-out is the trivial
   fallback. Revisit a custom UI after opening only if there is a concrete reason.
   **The custom funnel therefore becomes a prototype, not production** — but it is not
   wasted: it doubles as the spec for configuring Splose (appointment types, 30/60
   durations, terms, confirmation copy). `funding.ts` (HALTH) is dead either way, because
   Splose does claiming natively.

   **"Could we just build the backend instead?"** Technically yes — a Vercel serverless
   proxy over Splose's availability/appointment endpoints is roughly a day's work, and the
   `client.ts` seam means the UI would not change. It is still **not** the right MVP: it
   parks a full-permission patient-data credential on our infrastructure, makes us a
   health-data custodian (new privacy/consent obligations that contradict the client's own
   policy, which states records live in Splose), and *still* only covers slot picking
   before handing off to Splose for intake, consent and payment — a split flow that is
   worse for the patient than one branded Splose page. **Ship the embed for MVP; revisit
   custom later only with a concrete reason.**
3. **Appointments are 30 or 60 minutes only — no 45** (phone call). If the custom funnel is
   kept, remap `duration.ts` (currently emits 30/45/60; the tests are the spec — update both).
   If booking moves to Splose, this is just a Splose config note.
4. **FAQ / Privacy Policy page(s)** — client supplied the copy (now in `FAQ-AND-PRIVACY.md`).
   Splose's online consent form must **link to the website's Privacy Policy** before the
   patient ticks the consent box. So build a public **Privacy Policy** page (+ optionally the
   Splose data-security page and the consent text). This was our "privacy-policy launch gate."
5. **Real branding — all supplied now** (see **`BRANDING-AND-BIO.md`**; logo source PDFs
   committed in **`brand/`**):
   - **Slogan**: long "slowly is the fastest way to get to where you want to be" / short
     "slow is fast". Good hero / coming-soon candidate.
   - **Logos**: 5 variations; `logotype_icon_hp.pdf` = the **full/primary** logo; "HP" =
     Health and Performance. Convert PDF → SVG/web and use variations throughout; replace the
     hand-drawn **Z²** (`public/favicon.svg` + the inline SVGs in `index.astro`).
   - **Bio**: Dr Mintae Kim's personal three-quote bio. **Client-directed (2026-07-16):
     em dashes removed (done); change NOTHING else — do not soften or reword**, including
     the pain/outcome phrases flagged under `COMPLIANCE.md`. Name confirmed
     **"Dr Mintae Kim"**. **Post-nominals still OPEN** (docx `B.Chir.Sci., M.Chiro.` vs site
     `B. Chiro. Sci., M. Chiro.`). **Ask the client before any further text change.**
     Details in `BRANDING-AND-BIO.md`.
6. **Opening ~20 July 2026 (tentative) — but do NOT put a date on the site** (client decided
   2026-07-16). Keep the coming-soon messaging undated.

---

## Blocked / needed from the client (chase these)

- **The Splose booking embed code / shareable link** — get it from the client's Splose
  workspace once he finishes configuring online bookings (Splose → online bookings →
  share/embed). Needed to wire "Book now".
- **Cancellation Policy** text — still not supplied, and it is a commercial decision we
  cannot invent (notice period + fee). The client can enter it directly in Splose (the
  booking page supports cancellation policy + terms); ask for the wording if it should
  also appear on the website, since the consent document references "our Cancellation
  Policy".
- Real **appointment types + fees** as configured in Splose (30/60 only).

**Resolved 2026-07-16:** post-nominals = `B.Chir.Sci., M.Chiro.` (docx correct; `mock.ts`
updated) · name = "Dr Mintae Kim" · bio goes in an **About section on the home page** (no
`/about` page) · bio wording must NOT be softened · no opening date on the site · Splose
Security Centre = `https://splose.com/resources/security` and Splose Privacy Policy =
`https://splose.com/privacy-policy` · Formspree keep-in-touch is activated and live.

---

## INTRO PROMPT (copy from here)

> Continue the Zone Two build. Read `CLAUDE.md`, then `BOOKING.md` (note the **SUPERSEDED /
> Splose** block), `PROGRESS.md`, `FAQ-AND-PRIVACY.md`, and `NEXT-SESSION.md`. Keep the house
> rules: Australian English, no em dashes, no AI-tell/outcome/compliance-banned words, AA
> accessibility, no browser storage except the one fenced `z2-confirm` handoff, simple +
> idiomatic + functional TypeScript, strong TDD (Vitest), and remove redundant code when
> refactoring.
>
> State: the **home page + keep-in-touch email are done and live on `staging.zone2hp.com`**;
> a full **mock booking funnel** is on staging for client review; `main` (production) is not
> yet merged and is gated so it can ship as "home + email only". **The client has switched
> the PMS to Splose** (Cliniko/HALTH dropped) and is opening ~**20 July 2026**, so the focus
> now is **go-live**, not more custom-funnel features.
>
> Before building, get me to confirm the **booking strategy** (link out to Splose / embed
> Splose / custom UI on Splose's API) — this decides whether the custom funnel, `funding.ts`
> and `duration.ts` stay, adapt, or retire. Then the likely work, in order: (1) a public
> **Privacy Policy / FAQ** page from `FAQ-AND-PRIVACY.md`, linkable from Splose's consent
> form; (2) wire **"Book now"** to the chosen Splose approach; (3) drop in the **real
> branding** (logos in `brand/`, bio + slogan in `BRANDING-AND-BIO.md` — the bio needs
> em-dash + compliance + name fixes first); (4) **30/60-min only** (no 45); (5)
> opening-date messaging; (6)
> when approved, set `PUBLIC_BOOKING_LINKS_VISIBLE=false` on Vercel **Production** and merge
> `staging` → `main`. Start in plan mode; ask me the open questions first.

## (end intro prompt)
