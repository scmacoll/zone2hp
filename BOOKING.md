# BOOKING.md — booking and accounts subsystem

How the booking flow and the (non-clinical) accounts surface are built, what is
real versus mocked, and how to take them live later. This is the source of truth
for this subsystem; it sits alongside the existing specs (`README`, `CLAUDE`,
`DESIGN-SYSTEM`, `COMPLIANCE`, `BRAND-AND-VOICE`).

## Status: mock-first review build

Everything here runs on the existing **static** Astro site with **no backend and
no secrets**. It is a clickable, reviewable surface driven entirely by mocks,
built so a real provider or backend later is a localised change, not a rewrite.

Reachable by URL for review (not linked from the live home, and `noindex` while
mock):

- `/book` — the booking flow
- `/account/signup`, `/account/login`, `/account` — the non-clinical accounts

## Provider direction (decided 2026-06-14, after research)

- **PMS = Cliniko.** The client requires HALTH, and HALTH integrates with Cliniko /
  Nookal / Halaxy but **not Splose** — so Splose (despite stronger document handling +
  native NDIS) is out while HALTH is a must-have. Cliniko also has the most mature
  public API for our custom-UI adapter (available-times, create appointment, patient
  create, attachments; Basic-auth, region-sharded, no webhooks so we poll).
- **HALTH for funding + payments, via its API.** HALTH publishes `api.halth.com`
  (docs.halth.com) with standalone endpoints — `create-funding-estimate` (rebate +
  gap), card-on-file, and `create-transaction` (no-show / late-cancel). So we can keep
  our OWN booking UI and call HALTH for the funding-quote + payment steps; we are NOT
  forced into HALTH's hosted widget (which is what proformphysiotherapy.com.au uses).
  TO VERIFY with HALTH: that the API is open to a clinic's custom site, and pricing.
- **Booking UX moves to routed steps.** The longer funnel (new/existing → type → scope
  → time → details → funding → payment) moves from one in-page island to URL-synced
  Astro routes under `/book/...`, each a thin page + small island: better back/forward,
  refresh resilience and per-step analytics; state via query params / a draft id, not
  browser storage.
- **TDD.** Vitest added (`npm test` / `npm run test:run`). Pure logic (funnel, duration,
  patient match) is test-first in `src/lib/booking/*.test.ts`. The appointment-duration
  rules are PROVISIONAL, pending the client's written rules — the tests are the spec.
- Booking types: `standard`, `epc` (Medicare CDM), **`tpc` = third party / compensable**
  (workers comp / motor accident — confirm wording), `ndis`. (Rehab-only is chosen on the
  Visit step, so there is no standalone "rehab consultation" type.)

## Decisions this implements

1. **Accounts are NON-CLINICAL only** — newsletter, early access, member notes.
   They collect name + email + a marketing opt-in, and never any health data.
   This keeps the whole surface out of health-privacy (PHI) scope.
2. **Booking is our own custom UI**, kept behind a provider adapter so we are not
   locked to one system. The adapter also supports an **embedded** fallback
   (framing the provider's hosted page) for a fast launch if the custom backend
   is not ready.
3. **No provider lock-in, no host lock-in yet.** The site stays static; the
   custom-API booking and real auth (both need a server) are deferred.

## Booking modes

Set with `PUBLIC_BOOKING_MODE` (see `.env.example`). The choice is made at build
time in `src/pages/book/index.astro`, so only the chosen branch ships its JS.

| Mode | Renders | Backend needed | Holds patient data |
|---|---|---|---|
| `mock` (default) | custom UI (`BookingFlow`) on mock data | no | no |
| `api` | custom UI on a real provider | **yes** (server for the secret key) | yes |
| `embedded` | the provider's hosted page (`BookingEmbed`) | no | no (provider does) |

**Effort:** the custom UI is built now and is the same work in every mode. The
cost of going live with `api` is the backend: a serverless function to hold the
secret key, the provider adapter, and a privacy policy + consent because we would
then collect personal details and broker them to a health system. `embedded` is
a few hours and keeps the provider as the data controller.

## Architecture

```
src/lib/booking/
  types.ts     domain types + the BookingProvider interface (provider-agnostic)
  config.ts    reads PUBLIC_BOOKING_* with safe defaults
  mock.ts      mockBookingProvider — realistic, COMPLIANCE-clean fake data
  cliniko.ts   STUB (throws "not configured"); reserved server-only seam, imported by nobody
  index.ts     getBookingProvider() — returns the mock for now (build/server context)
  client.ts    THE SEAM — the only booking module the browser island imports
src/lib/auth/
  types.ts     Account (name/email/marketingOptIn only) + AuthProvider
  mock.ts      mockAuthProvider — in-memory, does not persist (demo only)
  index.ts     getAuthProvider()
src/components/
  PageHeader.astro    light functional-page chrome (reuses Wordmark)
  BookingFlow.astro   the custom wizard (framework-free TS, functional core + render)
  BookingEmbed.astro  the hosted-page fallback / placeholder
  account/AccountForm.astro  shared login/signup form
src/pages/
  book/index.astro            booking entry (mode switch)
  account/{login,signup,index}.astro
```

### The seam: `src/lib/booking/client.ts`

The booking wizard imports **only** `client.ts` — never `mock.ts`, `index.ts` or
`cliniko.ts`. Today `client.ts` delegates to the in-bundle mock. To go live with
the custom API, swap each function body to `fetch('/api/booking/...')`. Nothing in
the wizard changes (it already awaits and renders loading / empty / error states),
so `client.ts` is the **entire** static→SSR migration surface for booking.

The wizard itself is a **functional core / imperative shell**: a pure `State`,
pure transition functions that return new state, and one `render(state)` that maps
state to the DOM. Data fetching, DOM writes and focus are the only side effects,
kept at the edges.

## What is mock vs real

- **Mock now:** services, practitioners, availability, the booking reference, and
  the account sign-up / sign-in. All client-side, no network, no secrets.
- **Real later:** the provider adapter (e.g. `cliniko.ts`), a server runtime to
  hold the API key, real auth with httpOnly session cookies, and a privacy policy.

### Going live with the custom API (later)

1. Add an Astro SSR adapter for the chosen host (Cloudflare / Netlify / Vercel)
   and switch the relevant routes to server output.
2. Implement `cliniko.ts` (or another provider) **server-side**, reading
   `CLINIKO_API_KEY` / `CLINIKO_SHARD` from the server env (never `PUBLIC_`).
3. Add `src/pages/api/booking/*` endpoints that call the provider.
4. Point `client.ts` at those endpoints (`fetch('/api/booking/...')`).
5. Publish a privacy policy and add a collection/consent statement to the form.
6. Set `PUBLIC_BOOKING_MODE=api`.

Cliniko mapping is sketched in `src/lib/booking/cliniko.ts`.

## Accounts: non-clinical, demo session

The account screens are fully designed and client-validated, but the mock session
is **in-memory and does not persist** across page loads (every Astro route is a
full document load). So `/account` renders the member-area **design** directly,
with a visible "preview" note, rather than a real signed-in state. The client-side
guard idea is cosmetic only and is not a security boundary — acceptable here
because no health data ever lives behind it.

To make the unlock interaction real for a demo, the smallest change is a single
throwaway `sessionStorage` key (name + email only), clearly fenced as
demo-scaffolding. Real auth replaces all of this with a server + httpOnly cookies.

## Privacy and compliance posture

- **No health data solicited.** Accounts take name / email / marketing opt-in
  only. The booking details form takes name / email / phone plus **one optional
  notes box**, deliberately framed for logistics/access needs ("you do not need to
  share health details here") so it does not invite clinical history into a
  non-clinical surface. When integrated, that note maps to the PMS appointment
  note, where clinical info appropriately belongs; full history is taken at the
  visit.
- **Marketing opt-in is unticked by default** (Australian Spam Act consent). An
  optional "create an account" checkbox on the details step is also unticked.
- **A privacy policy is a launch gate.** Even for name/email, publish a collection
  statement before any of this is public.
- **AHPRA / advertising (`COMPLIANCE.md`) applies to every string here.** No
  outcome or cure language, no testimonials, **no urgency or scarcity** in
  availability, factual appointment names only. "Dr" always renders with the
  profession ("Dr Mintae Kim, Chiropractor"), enforced by the `Practitioner`
  type. Booking results say "request received, the clinic will confirm" — never a
  guaranteed appointment.

## Flow shape (routed funnel)

The funnel is a set of routed steps under `/book/*`, each a static page consuming
the tested core (`funnel.ts`, `funnel-state.ts`):

`/book` (new/existing patient; existing patients identify here by name + email-or-phone
and are matched against the record) → `/book/type` (standard / EPC / TPC / NDIS) →
`/book/scope` ("Visit": areas + treatment/rehab → appointment length via the `duration.ts`
table, with private health cover folded in below as an OPTIONAL accordion section — a
PROTOTYPE of HALTH "view your funding"; the cover section is hidden when
`PUBLIC_BOOKING_FUNDING=false`) → `/book/time` (date strip + Morning/Afternoon/Evening, Dr
Mintae Kim card) → `/book/details` (first + last name, email required, **mobile optional**,
notes; pre-filled and LOCKED for a matched existing patient) → `/book/confirm`.

State travels in the URL query string — only NON-sensitive values (`customer`, `pid`
(opaque existing-patient id), `type`, `dur`, `fund`, `slot`, `ref`); name/email/phone/notes
are never in a URL. The appointment length carries as a token: `45` or `60+` (an open-ended
"minimum 60 minutes"). Because the site
is STATIC, page frontmatter has no per-request query string, so the param-dependent
chrome (summary values, stepper links, Change links, type-tile hrefs) is hydrated
client-side from `location.search` by `BookingShell` + small per-page scripts. Only
the param-carrying bits defer — the step STATE is known at build. This is the one
place a future SSR adapter would simplify things (the same backend the real
Cliniko/HALTH integration needs). `BookingShell` is the shared chrome (header,
stepper, sticky summary); styles live in `src/styles/booking.css` (namespaced
`.book`, global so they reach the runtime-created slot/date nodes).

The duration rules (`duration.ts`) encode the client's sizing table (areas x
treatment/rehab, with new and lapsed patients getting the extended lengths, and a
60-minute base becoming an open-ended "minimum 60 minutes"). The funding prices/rebate
(`funding.ts`) stay PROVISIONAL until the HALTH API answer lands. The tests are the spec
for both. A future `payment` step (HALTH card on file) slots in after `details`.

One practitioner, auto-selected (no choice step) and shown as a card; Mon-Fri
9am-6pm, Sat 9am-12pm, ~4 weeks ahead. Once submitted, the stepper + Change links
lock and the heading becomes "Request received".

### Existing-patient identification (at step 1)

When the customer chooses **Existing Patient** at `/book`, they enter their name (first +
last) and one combined "email or mobile" field, matched against the patient record
(`findPatient`; mock DB now, Cliniko patient-search later). The review build has a SINGLE
demo credential and matches strictly: the exact name AND email must both line up
(**Jane Doe / janedoe@gmail.com**, shown as placeholders) — nothing else proceeds. A match
carries an opaque `pid` forward; `/book/details` then resolves it (`getPatient`) to pre-fill
and LOCK their details. No match shows a gentle panel (re-check, or continue as a new
patient). A real backend MUST authorise `getPatient` (it returns PII by id), and would
search on email/phone rather than this fixed credential. Name/email/phone never travel in
the URL — only the opaque `pid` does.

The practitioner card shows `Practitioner.photo`
(`/images/practitioners/mintae-kim.png`), falling back to initials until present.

## Config

See `.env.example`. PUBLIC_* vars are build-time and not secret; `CLINIKO_*` are
server-only and unused until a backend exists.

## Local testing

`npm run dev`, then:

- `/book` — walk the funnel: new/existing → type → time (date strip → grouped
  times, Dr Mintae Kim card) → details → confirmation. Each step is its own URL;
  back/forward and the summary "Change" links navigate. Runs on mock data.
- Tests: `npm run test:run` (Vitest) covers the pure core — `funnel`,
  `funnel-state` (URL building), `duration` (PROVISIONAL rules), `patients`.
- Existing-patient match (step 1): choose Existing Patient, then enter the demo
  credential exactly — First name `Jane`, Last name `Doe`, Email `janedoe@gmail.com`
  (shown as placeholders). Only that exact name + email proceeds; anything else shows the
  no-match panel. The matched patient's details are pre-filled and locked at
  `/book/details`. Click a completed step title to jump back.
- Dev-only state simulation (stripped from production): `/book?sim=empty`,
  `/book?sim=error`, `/book?sim=slow`, `/book?sim=nomatch` force those states.
- `PUBLIC_BOOKING_MODE=embedded` → `/book` renders the hosted-page placeholder.
- `/account/signup`, `/account/login`, `/account`.

## Open questions for the client

- Confirm the booking provider (probably Cliniko) and the practice subdomain /
  region shard.
- Confirm the real appointment types, durations, and practitioners (names + the
  exact professional titles for the "Dr" rule).
- Confirm the host (Cloudflare / Netlify / Vercel) when we move to the custom API.
- Confirm what the accounts are for, so the member area content is right.
