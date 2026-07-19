# ACCOUNTS.md — user accounts, login, and the Splose boundary

How real user accounts work on this site, why login is ours rather than Splose's, and
the hard line between our data and the clinic's clinical records. This is the source of
truth for the accounts subsystem. It sits alongside `BOOKING.md` (which it supersedes on
the question of whether accounts are real) and `FAQ-AND-PRIVACY.md`.

Decided 2026-07-19 after researching Splose's published documentation.

---

## 1. The finding: Splose cannot authenticate patients

The obvious idea, "let Splose own login so we never touch identity", is not available.
From Splose's own docs, not third-party directories:

- **There is no patient portal.** Splose's online-bookings guide says a returning client
  "is required to enter the exact same details that are in their client record" (name,
  date of birth, email) so the booking attaches to the right record. That is record
  matching during a booking, not a login.
- **Self-service cancel and reschedule is a per-appointment link**, not an account:
  clients cancel or reschedule "via a secure link in their confirmation or reminder".
  A tokenised magic link scoped to one appointment.
- **The API has no per-patient authentication and no OAuth.** Authentication is a single
  workspace-level API key which "grants the same permissions as the associated user",
  rate limited to 60 calls per minute for the entire workspace.
- The SSO and two-factor features Splose advertises are for **staff signing in to the
  workspace**, not for patients.

> **Do not trust the software directories on this.** At least one aggregator claims
> Splose offers a patient portal where clients "view invoices and access notes". Splose's
> own documentation and marketing contradict it. Treat those listings as auto-generated.

**Consequence:** there is no identity to delegate to. Either we run accounts, or the site
has none. Re-check this if Splose ships a client portal later; it would change the design.

## 2. The decision: hybrid, with a hard data boundary

**We own identity. Splose remains the sole system of record for anything clinical.**

| Concern | Owner |
|---|---|
| Account, password, session | **Us** (Supabase, Sydney) |
| Name, email, contact preferences, marketing opt-in | **Us** |
| Bookings, availability, appointments | **Splose** |
| Intake forms, consent signature, clinical notes, documents | **Splose** |
| Payments, invoices, Medicare and health-fund claiming | **Splose** |

### Why the boundary is drawn here, and not further out

Putting Splose data behind our login means our server holds that workspace API key. That
key can read and write **every patient record in the practice**. Two consequences follow,
and both are serious:

1. **We become a custodian of health information**, taking on the Privacy Act 1988 (Cth),
   the Australian Privacy Principles, the Health Records and Information Privacy Act 2002
   (NSW), and mandatory data breach notification. The practice's own privacy policy tells
   patients their records live in Splose.
2. **Identity matching is fuzzy.** Splose matches patients on name, date of birth and
   email. If our login maps an account to the wrong patient record, we show one person
   another person's health information. That is a notifiable breach, caused by a mapping
   bug rather than an attack.

So the boundary is not caution for its own sake. It is the difference between a leaked
mailing list and a leaked medical history.

## 3. Staged plan

**Stage 1 (built now) — identity and preferences only.**
Real accounts, real sessions, no health data. Name, email, marketing opt-in, and later
saved contact details and member content. Nothing from Splose.

**Stage 2 (not built; requires sign-off) — an optional, verified link.**
An account could be linked to a Splose patient record to surface a narrow, read-only
slice such as the next appointment, fetched server-side per request and never stored.
Gated on all of:
- the client's explicit, informed, written agreement;
- a privacy policy revision published first (see section 5);
- a verified claim flow, not name matching, so an account cannot be pointed at someone
  else's record;
- a decision on where the API key lives and who can reach it.

**Never — mirroring clinical data.** No notes, documents, claims or intake responses
copied onto our infrastructure, cached or otherwise.

### Can a signed-in user be carried into the Splose booking page? No.

Asked and researched 2026-07-19. There is no mechanism:

- Splose has **no per-patient authentication and no OAuth**, so there is no identity to
  hand over. A patient is matched inside the booking flow by typing name, date of birth
  and email that exactly match their record.
- Splose's online-bookings documentation describes **no URL parameters** for pre-filling
  the booking form, and no deep-link contract of any kind.
- The booking page is framed in an iframe, so we cannot reach into it from the parent
  page either.

So the most that will ever be possible without a Splose product change is passing the
signed-in person's email through a query string, **if** Splose ever documents one. Nothing
speculative has been built for this: inventing parameter names against an undocumented
form would produce code that silently does nothing. Revisit if Splose publishes a
pre-fill contract.

### Honest note on value

With booking handled by Splose and no member content yet, accounts do little for a
patient on day one. The value of Stage 1 is that it is the correct foundation, built once,
before anything depends on it. It is deliberately not a reason to widen the scope.

## 4. Architecture

- **Rendering.** The site stays static by default. Only the account routes opt out with
  `export const prerender = false`, via the Vercel adapter. Marketing pages, including the
  home page and the privacy pages, are unchanged static output.
- **Auth and storage.** Supabase, **Sydney (`ap-southeast-2`)**, so personal information
  stays in Australia and matches the residency story the privacy pages already tell.
- **Sessions.** `@supabase/ssr` with **httpOnly cookies**. No `localStorage` or
  `sessionStorage`, per project hard rule 5.
- **Sign-in.** Email and password, with email verification. Supabase hashes passwords; we
  never see or store them. Magic link and OAuth are available later without a rewrite.
- **The seam stays.** `getAuthProvider()` still selects the implementation, so the mock
  keeps working when no credentials are configured, and the provider can be replaced.

### Two failure modes to design against

- **Cached responses leaking sessions.** If a route that refreshes a session is cached
  (ISR or any CDN caching), the cached response carries a `Set-Cookie` with a live token
  and the next visitor is signed in as somebody else. **No caching on any auth route.**
- **Account enumeration.** Sign-in and password-reset responses must not reveal whether an
  email is registered. Error copy is deliberately uniform.

## 5. Blocking issue: the privacy policy does not cover this

The policy published at `/privacy` describes health information held in the practice
management system. It says nothing about **this website collecting and storing personal
information in a user account**. Once accounts are live that is a real gap, and the
document is the one Splose's consent form links to.

Before accounts are enabled in production, the client needs to supply (or approve) copy
covering: what the account stores, that it is not a health record, where it is stored and
in which country, how long it is kept, and how to delete it. **Client's legal copy, so we
do not draft it unilaterally.** See the house rule in `CLAUDE.md`.

## 6. Configuration

Server-only, never `PUBLIC_`:

```
SUPABASE_URL=            # project URL, Sydney region project
SUPABASE_ANON_KEY=       # anon/publishable key, used with RLS
SUPABASE_SERVICE_ROLE_KEY=  # optional, admin only, never sent to a browser
```

When `SUPABASE_URL` and `SUPABASE_ANON_KEY` are absent the site falls back to the mock
provider and the account pages stay in preview mode, so staging keeps building with no
credentials.

Accounts remain behind the existing `PUBLIC_BOOKING_LINKS_VISIBLE` gate, which is `false`
in production today.
