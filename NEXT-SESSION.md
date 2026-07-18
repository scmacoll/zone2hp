# Next session — handoff + intro prompt (updated 2026-07-16)

Read order for the next session: `CLAUDE.md` → `BOOKING.md` (note the **SUPERSEDED /
Splose** block at the top of "Provider direction") → `PROGRESS.md` → `FAQ-AND-PRIVACY.md`
→ `BRANDING-AND-BIO.md` → this file. Then paste the **INTRO PROMPT** block near the bottom.

Git: all work is on branch **`claude/charming-jackson-fcd1c0`** and **`staging`** (same
commit, currently `eb49d5f`), deployed to **`staging.zone2hp.com`** (Vercel). **`main`
= production is NOT yet merged** (still the old page). Local preview: this worktree runs
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
- **To go live with just the home page**: set that Production env var, then merge `staging`
  → `main` (GitHub PR `main...staging`, or `git merge`). Not done yet.

---

## The pivot — client email (2026-07-10) + phone call. THIS drives the next session.

1. **PMS is now Splose** (not Cliniko/HALTH). `zone-two-health-and-performance.splose.com`
   (password-protected during setup; client has the password). Splose does booking, intake,
   records, payments and Medicare/health-fund claiming natively, so **HALTH is dropped**.
   The client is setting up appointment types + booking parameters inside Splose.
2. **KEY OPEN DECISION — booking strategy.** Intent (2026-07-16) is to keep **our custom UI
   on the provider's API** — exactly what the `client.ts` seam was built for (swap
   `cliniko.ts` for a `splose.ts`). Three things must be settled before committing to it:
   - **a. Verify Splose's API** actually exposes public **availability** + **appointment
     creation**. Many PMS APIs are admin/practitioner-facing, not patient self-booking.
     **UNVERIFIED — check Splose's developer docs or ask Splose support first.**
   - **b. A backend is required** to hold the Splose API key. The site is static today, so
     this needs an SSR/serverless route (the long-documented "needs an SSR host" item).
   - **c. Scope.** Splose's hosted flow also does intake, the online **consent signature**
     and payments/claiming. A custom UI would realistically cover slot selection and hand
     off to Splose for intake/consent/payment, unless we rebuild all of that (large, and a
     lot of extra compliance surface).
   Fast fallback if opening pressure wins: (a) **link out** or (b) **embed**
   (`mode=embedded` / `BookingEmbed.astro` already exists), then move to the custom UI once
   the three points above are settled.
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

- **Splose API capability** — does it expose public availability + booking creation? This
  gates the custom-UI plan (see pivot item 2). Unverified.
- **Splose URLs** — the real "Splose Security Centre" + "Splose Privacy Policy" links. The
  client's data-security copy lists them as bullets **with no URLs**, so they can't be made
  into real links yet. Also: will the Splose booking page be public (it is password-gated
  now) or embeddable?
- **Cancellation Policy** text (the consent doc references it; not supplied).
- **Post-nominals** for Dr Mintae Kim (`B.Chir.Sci.` vs `B. Chiro. Sci.`).
- **Information architecture** — there is no About or legal page yet, so we need to agree
  where the **bio** and the **Privacy Policy / FAQ / data-security** content live.
- Real **appointment types + fees** as configured in Splose (30/60 only).

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
