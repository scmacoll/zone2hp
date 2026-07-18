# Branding + bio — client-supplied (2026-07-10)

Source: `Zone Two Website (branding + bio).docx` + the logo PDFs. Preserved here so it is
in the repo, not just in the client's email.

> **Editing rule for the bio (client-directed, 2026-07-16):** the ONLY change permitted is
> removing em dashes (already done below, replaced with commas). **Do not reword, soften,
> shorten, or re-paragraph the client's text.** If any further text change looks necessary,
> **ask the client first**.

## Slogan / tagline
- **Long:** "slowly is the fastest way to get to where you want to be"
- **Short:** "slow is fast"

(Good candidate for the hero / coming-soon line. Currently the home headline is
"Modern Chiropractic Therapy." with a "Coming soon" cue.)

## Logos
Source PDFs are committed in **`brand/`** (vector; convert to **SVG** preferred, or PNG,
for the web). "HP" = **Health and Performance**. Client wants **variations used throughout
the branding**. Today the site uses a hand-drawn **Z²** mark — replace it
(`public/favicon.svg` and the inline `.a2-brand`/headline SVGs in `src/pages/index.astro`).

| File (`brand/`) | Client's label | What it is |
|---|---|---|
| `icon.pdf` | Icon | the mark alone (favicon / social / compact nav) |
| `logotype.pdf` | Logotype | the wordmark alone |
| `logotype_hp.pdf` | Logotype + HP | wordmark + "Health and Performance" |
| `logotype_icon.pdf` | Logotype + Icon | wordmark + mark |
| `logotype_icon_hp.pdf` | **Logotype + Icon + HP** | **the FULL / primary logo** |

## Bio

**Name (confirmed by client 2026-07-16): "Dr Mintae Kim"** — the source docx wrote
"Dr. Min Tae Kim", which is the incorrect spacing. Use **Dr Mintae Kim** (no full stop
after "Dr"), always rendered with the profession per `COMPLIANCE.md`.

- **Title:** Chiropractor
- **Post-nominals (confirmed 2026-07-16): `B.Chir.Sci., M.Chiro.`** — the docx spelling is
  correct. `src/lib/booking/mock.ts` has been updated to match; use this everywhere.

> **Compliance note (raised and answered):** I flagged that "Helping someone get out of
> pain" and "watching them overcome injury, regain confidence" are outcome-adjacent under
> the AHPRA advertising rules in `COMPLIANCE.md`. **The client has directed that the wording
> stays exactly as written — do not soften it.** Recorded here so the decision is visible
> and is not "fixed" later by mistake.

Client's text (verbatim; only the two em dashes replaced with commas):

**"Change is meant to be hard, and it takes time."**

It isn't easy being trusted as a chiropractor in Australia's health care system, but I am here, determined to make a difference.

As a fresh graduate in 2019, I entered the workforce ready to spread my wings and embark on my journey as a health care professional. I didn't fly far because I was focused on understanding the "why" and wanting to change the world around me.

After my fair share of burnout and falling into the pits, I learned that I first had to focus on changing myself before I could truly be of service to others. Along the way, I realised that trust isn't given, it is earned.

**"We do better in circles than in rows."**

I am stubborn and used to believe that I had all the answers. I also believed I could do things better alone and build something for myself, by myself.

Being a lone wolf may get you there faster, but community takes you further because faces matter. Rows force you to stare at the back of someone's head. Circles let you make eye contact, share ideas, and build deep trust.

This naturally sparks conversation and helps everyone learn faster because there is always someone who knows more or has experienced more. Circles will win every time.

**"Celebrate the small wins."**

I find great joy in helping the people around me succeed. The journey to becoming the best version of ourselves was never meant to be lonely. There are people who care about your success just as much as you do.

Helping someone get out of pain is a small win. The real reward is being part of their journey, watching them overcome injury, regain confidence, and become the best version of themselves. That is the BIG win.

## Where does the bio go? (decided 2026-07-16)
**An "About" section on the home page** — no separate `/about` page for now. The client
wants the focus kept on the single home page. The placeholder bio in
`src/lib/booking/mock.ts` (used by the booking practitioner card) is separate mock copy;
reconcile it with this real bio if/when the booking surface is revisited.
