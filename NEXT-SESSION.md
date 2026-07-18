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
2. **KEY OPEN DECISION — booking strategy.** With Splose owning booking + payments + consent,
   how does the site book? (a) **link out** to Splose, (b) **embed** Splose's page (iframe —
   `mode=embedded` / `BookingEmbed.astro` already exists), or (c) **custom UI on Splose's
   API** (add a `splose.ts` behind the `client.ts` seam). Given the ~20 Jul opening, (a)/(b)
   is the likely go-live; that would make the **custom funnel + `funding.ts` + `duration.ts`
   a reviewed prototype, not production**. Confirm before building.
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
   - **Bio**: Dr Mintae Kim's personal three-quote bio. **Before publishing it needs
     em-dash removal, a `COMPLIANCE.md` pass** (a couple of pain/outcome phrases), and
     **name/post-nominal alignment** (doc says "Dr. Min Tae Kim"; site uses "Dr Mintae Kim")
     — details in `BRANDING-AND-BIO.md`.
6. **Opening date ~20 July 2026 (tentative).** Today is 2026-07-16, so it's imminent. Decide
   whether the coming-soon home should state the date or stay vague.

---

## Blocked / needed from the client (chase these)

- **Booking strategy** decision (link vs embed vs custom-on-API).
- **Splose URLs**: the real "Splose Security Centre" + "Splose Privacy Policy" links (the
  data-security page references them), and whether the Splose booking page will be public
  (currently password-gated) or embeddable.
- **Cancellation Policy** text (the consent doc references it; not supplied).
- Real **appointment types + fees** as configured in Splose (for any funding/price display).

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
