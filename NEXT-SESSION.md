# Next session — handoff (updated 2026-07-19)

Read order: `CLAUDE.md` → this file → `ACCOUNTS.md` → `BOOKING.md` (note the
SUPERSEDED/Splose block) → `FAQ-AND-PRIVACY.md` → `BRANDING-AND-BIO.md` →
`PROGRESS.md`.

---

## Where things stand

**`staging` branch → staging.zone2hp.com — LIVE and current.** Carries all of the
work below. Booking is switched on there and the Splose embed works.

**`main` → zone2hp.com — deliberately BEHIND.** Still on `662f6fa`, the old
coming-soon page: placeholder Z² mark, no Book or Log in buttons, no privacy
pages. Nothing from this session has reached production. That is intentional.

**Local preview: run the `dev-wt` launch config (port 4322).** Port 4323
(`preview-build`) serves static files only, so the server-rendered `/account`
pages 404 there. Use 4322 unless you are specifically testing the Content
Security Policy, which does not apply in dev.

### Environment variables

Set on Vercel **Preview only** (they drive staging). `PUBLIC_*` values are baked
in at BUILD time, so changing one needs a redeploy.

```
PUBLIC_BOOKING_MODE=embedded
PUBLIC_BOOKING_EMBED_URL=https://zone-two-health-and-performance.splose.com/online-booking/cf22e909-cf7f-4d21-9a13-27817248788b
PUBLIC_BOOKING_LINKS_VISIBLE=true
PUBLIC_ACCOUNTS_ENABLED=          # deliberately unset: accounts stay off
```

Booking and accounts are **separate switches**, so booking can be demonstrated
while the login stays hidden. Both compare against the exact string `'true'`.

> **Redeploy gotcha.** Vercel's "redeploy after env change" prompt acts on the
> deployment you are *looking at*. The project overview shows PRODUCTION, so it
> will rebuild main. To rebuild staging: Deployments tab → find the one whose
> source is `staging` → ⋯ → Redeploy.

---

## What was built this session

- **Real branding.** `brand/build-logos.py` converts the client's five logo PDFs
  to web SVGs (viewBox cropped to the ink, fills set to `currentColor` so one
  file serves dark and light, glyph ids namespaced). The placeholder Z² is gone
  from the nav, favicon, page header and compact footer. Added the `og:image` and
  apple-touch-icon the site never had.
- **Privacy pages.** `/privacy` and `/privacy/data-security`, reproducing the
  client's legal copy **verbatim** (verified word for word: 289 and 239 words).
  `/privacy` is the URL Splose's consent form links to. Privacy link in both
  footers.
- **About section** on the home page with the bio **verbatim** (304 words), the
  first part visible and the rest behind a one-way disclosure.
- **Accounts.** Real auth on Supabase (Sydney), httpOnly cookie sessions, behind
  the existing `AuthProvider` seam. Strictly non-clinical. Currently switched
  OFF. See `ACCOUNTS.md` for the data boundary and why it is drawn there.
- **Splose booking.** `/book` frames Splose's hosted page with their v2 embed and
  postMessage resize. Our listener pins the frame's **origin** as well as its
  source, which Splose's published snippet does not.
- **Security and discovery.** CSP with hashed scripts and styles (no
  `unsafe-inline`), HSTS, frame-ancestors, Referrer-Policy, Permissions-Policy;
  `robots.txt`, sitemap, and `MedicalOrganization` JSON-LD chosen because it
  *cannot* express opening hours or ratings, neither of which we may publish.
- **Hero video** re-encoded from the client's master: full 30 seconds, silent,
  WebM + H.264. The master is HEVC, which Firefox cannot decode. 23 MB → 2.7 MB.
  Command recorded in `brand/encode-hero.sh`.

131 Vitest tests pass. Home page payload ~2.8 MB including the video.

---

## Do next, in order

### 1. Full logo in the home footer (client request, 2026-07-19)

Client asked: *"Could you incorporate the whole logo somewhere? The logotype icon
and the health and performance at the bottom?"*

The full lockup (`Logo variant="full"`, i.e. `logotype_icon_hp`) already appears
in the hero nav on wide screens, the `/book` page header and the `/book` footer.
The gap is the **home page footer**, which still renders a large text watermark
reading "ZONE TWO" (`.ff__watermark`, `FooterExpanded.astro:148`).

**Recommended: replace that watermark with the full logo.** It is the most
prominent unused spot and matches "at the bottom". Watch the sizing comments at
`FooterExpanded.astro:167` and `:350` — the `cqw` clamps assume the literal
string "ZONE TWO" and will need retuning for an SVG. Confirm the look with the
client before pushing to production.

### 2. Cancellation policy into Splose

The client sent a **Patient Consent Agreement** (2026-07-19, recorded in
`FAQ-AND-PRIVACY.md`). Its **Attendance** clause is the cancellation wording that
was blocking the Splose Design tab:

> 24 hours notice for cancellations, at least 12 hours for rescheduling.
> Non-attendance fee: $50.

Paste that into **Splose → Design → Cancellation policy**. Nothing on our website
references it, so nothing needs publishing.

**Three problems to raise with the client first:**
1. It says *"I have chosen to undergo **physiotherapy** and chiropractic
   services."* Zone Two does not offer physiotherapy and Dr Kim is a
   chiropractor. A registered chiropractor implying physiotherapy is an AHPRA
   advertising problem, not a typo. Almost certainly template residue.
2. **The late fee has no amount.** The text says "a late fee or non-attendance
   fee will apply" but only names the $50 non-attendance fee.
3. "non-attedance" is misspelt.

> **Note for whoever reads §3 of `FAQ-AND-PRIVACY.md`:** that older "Informed
> Consent" text is NOT what patients sign. The client confirmed the new Patient
> Consent Agreement is the signed document. §3 is superseded; treat it as history.

### 3. Splose configuration issues found in the live booking page

- **A 45-minute service exists** ("CHIRO Extended Appointment, 45 mins, $150").
  The client said on the phone: 30 or 60 minutes only. Confirm or retire it.
- **Prices are already public** ($100–$200) although the fee list was described
  as not final. Turn off "Show appointment prices" if provisional.
- **The practitioner is listed as "Min Tae Kim".** Confirmed spelling is
  **"Dr Mintae Kim"**, and `COMPLIANCE.md` requires the profession beside "Dr".
  Fix in Splose → Settings → Users.
- **A service is named "Other"** — patients see this. Rename.

### 4. Before accounts can go live

- **The privacy policy does not cover website accounts.** What is published
  describes health information in the practice management system; it says nothing
  about this site storing a name and email. Real gap. Client's legal copy, so do
  not draft it. Needs: what is stored, that it is not a health record, where and
  in which country, retention, deletion.
- **Create the Supabase project** in the **Sydney (ap-southeast-2)** region and
  set `SUPABASE_URL` / `SUPABASE_ANON_KEY`. Claude cannot create accounts.
- **Configure real SMTP.** Supabase's built-in sender is rate limited and not for
  production; confirmation email is on the critical path.
- **Password reset** is not built yet.

### 5. Before production

- `staging.zone2hp.com` and `zone2hp.com` are **same-site** for cookie purposes,
  so a compromise on staging could reach production. Add the `__Host-` cookie
  prefix before launch.
- The 2 MB `public/images/practitioners/mintae-kim.png` still ships for the
  booking prototype and could be shrunk.
- Decide whether the custom `/book/*` funnel is retired now that Splose owns
  booking. It is a reviewed prototype; `funding.ts` (HALTH) is dead either way.

---

## Traps this codebase has already sprung

Worth knowing before editing CSS or running string replacements.

1. **A base CSS rule placed AFTER a media/container query silently undoes it.**
   Equal specificity, so source order wins. This broke the `/book` footer layout
   and style 3's mobile alignment before being caught. **Order every stylesheet
   base rules first, queries last.** A detector script pattern is in the session
   history if it needs rebuilding.
2. **Two components styling one element is unpredictable.** The map "Book now"
   rendered as a `CtaButton` *and* carried `.map__book` styles; equal specificity
   again, and the bundler orders dev and production differently, so it looked
   different on localhost and staging. One element, one set of styles.
3. **`text-transform` is inherited.** Not setting it is not enough; an uppercase
   ancestor will win. Reset explicitly.
4. **Tailwind's reset strips `list-style`** from every `ul`/`ol`. The privacy page
   bullets were invisible until restored explicitly.
5. **Astro drops the `style` attribute** on its SVG components, and the CSP
   blocks inline `style` attributes anyway. Size logos with `--logo-height` on the
   parent; never inline styles.
6. **Always assert on string replacements.** A silently failed match is how the
   map button bug survived several rounds of review.
7. **Never filter build output so hard you cannot see a failure.** A build that
   errored was reported as succeeding earlier in the session.
8. **Verify against the real provider, not the mock.** A critical httpOnly bug
   survived because the flow was tested on the dev mock path only.
