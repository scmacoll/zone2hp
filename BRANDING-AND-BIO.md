# Branding + bio — client-supplied (2026-07-10)

Source: `Zone Two Website (branding + bio).docx` + the logo PDFs. Preserved here so it is
in the repo, not just in the client's email. The verbatim bio below is the **source** —
see "Before publishing" for the edits it needs first.

## Slogan / tagline
- **Long:** "slowly is the fastest way to get to where you want to be"
- **Short:** "slow is fast"

(Good candidate for the hero / coming-soon line. Currently the home headline is
"Modern Chiropractic Therapy." with a "Coming soon" cue — consider working the slogan in.)

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

## Bio — Dr Mintae Kim, Chiropractor (B. Chiro. Sci., M. Chiro.)

> **Before publishing, this bio needs:**
> 1. **Remove the em dashes** (hard rule). The client's text has two: "trust isn't
>    given—it is earned" and "part of their journey—watching them…". Replace with commas/
>    full stops.
> 2. **Run the `COMPLIANCE.md` checklist (AHPRA).** A personal philosophy bio is more
>    defensible than clinic marketing, but a few phrases lean on outcomes/pain and should
>    be reviewed/softened: "Helping someone get out of pain", "watching them overcome
>    injury, regain confidence". Confirm wording with the client.
> 3. **Confirm the name + post-nominals.** The doc writes "Dr. Min Tae Kim" and
>    "B.Chir.Sci., M.Chiro."; the site/mock uses "Dr Mintae Kim" / "B. Chiro. Sci.,
>    M. Chiro." (no full stop after "Dr", per AU style + the COMPLIANCE "Dr + profession"
>    rule). Pick one and make the mock (`src/lib/booking/mock.ts`) match the site.

Verbatim source text:

**"Change is meant to be hard, and it takes time."**
It isn't easy being trusted as a chiropractor in Australia's health care system, but I am
here, determined to make a difference. As a fresh graduate in 2019, I entered the workforce
ready to spread my wings and embark on my journey as a health care professional. I didn't
fly far because I was focused on understanding the "why" and wanting to change the world
around me. After my fair share of burnout and falling into the pits, I learned that I first
had to focus on changing myself before I could truly be of service to others. Along the way,
I realised that trust isn't given, it is earned.

**"We do better in circles than in rows."**
I am stubborn and used to believe that I had all the answers. I also believed I could do
things better alone and build something for myself, by myself. Being a lone wolf may get you
there faster, but community takes you further because faces matter. Rows force you to stare
at the back of someone's head. Circles let you make eye contact, share ideas, and build deep
trust. This naturally sparks conversation and helps everyone learn faster because there is
always someone who knows more or has experienced more. Circles will win every time.

**"Celebrate the small wins."**
I find great joy in helping the people around me succeed. The journey to becoming the best
version of ourselves was never meant to be lonely. There are people who care about your
success just as much as you do. Helping someone get out of pain is a small win. The real
reward is being part of their journey, watching them overcome injury, regain confidence, and
become the best version of themselves. That is the BIG win.

*(Em dashes already normalised to commas above; keep this in mind if you re-copy from the
docx.)*
