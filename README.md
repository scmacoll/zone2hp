# Zone Two Health and Performance — Website Spec Package

This is the planning and design spec set for the Zone Two Health and Performance coming-soon site. It is written to be handed to Claude Code (or any coding agent) to build from. Read this file first, then `CLAUDE.md`.

## Project facts

- **Business:** Zone Two Health and Performance
- **Domain:** zone2hp.com
- **Email:** info@zone2hp.com
- **Address:** Suite 104 / 2 Rowe St, Eastwood, NSW, 2122
- **Phone:** template / placeholder (client adds later)
- **Logo:** none yet (use a wordmark, see `DESIGN-SYSTEM.md`)
- **Clinical scope:** Chiropractic, Post-Operative Care & Rehab, Exercise Physiology, Dry Needling
- **Country:** Australia. This matters. See `COMPLIANCE.md`.

## What we are building

Five design variations of a single **coming-soon landing page**. The clinic owner reviews them as screenshots, picks a favourite, and that one goes live at zone2hp.com by Sunday so patients can be emailed a working link. The full multi-section website is a later phase, built on whichever design wins, reusing the same design system.

So every one of the five must be a complete, valid coming-soon page on its own, each carrying:

- The wordmark and an "opening soon in Eastwood" statement.
- A one-line summary of the services.
- The address with an embedded map.
- Phone (placeholder) and email.
- A footer.

They differ only in aesthetic direction. The five concepts and the three directions they sit across are spec'd in `CONCEPTS.md`.

## Two practical consequences

1. **One video, not five.** For the owner review, build each concept with a strong hero still so the screenshots read well. Produce the real hero video loop only for the chosen concept. See `ASSETS.md`.
2. **Only the winner needs hosting.** Screenshots cover the review. The domain only has to serve the single chosen page by Sunday.

## File index

| File | What it is |
|---|---|
| `README.md` | This file. Orientation and build order. |
| `CLAUDE.md` | Stack, conventions, commands, hard rules, build workflow. Auto-loads in Claude Code. |
| `BRAND-AND-VOICE.md` | Positioning, audience, tone of voice, lexicon, and a ready-to-use copy bank. |
| `DESIGN-SYSTEM.md` | Aesthetic point of view, design tokens, typography, components, responsive engineering. |
| `COMPLIANCE.md` | Australian advertising rules for regulated health services, as enforceable build rules. Applies to the coming-soon page too. |
| `ASSETS.md` | Video and image strategy: shot list, AI tool pipeline, prompts, web delivery specs, placeholders. |
| `CONCEPTS.md` | The five coming-soon concepts across three directions, each spec'd with the hypothesis it tests, plus the phase-2 full-site IA. |

## Suggested build order

1. Set up the Astro + Tailwind project and the design tokens from `DESIGN-SYSTEM.md`.
2. Build the shared layout and components (hero with a swappable video/still slot, info block, map block, contact block, footer).
3. Build the five coming-soon concepts as variations on that system.
4. Screenshot each at the test widths for the owner review.
5. On the owner's pick: drop in the real hero video, point zone2hp.com at it, ship.
6. Later phase: extend the winning design into the full site (see the phase-2 IA in `CONCEPTS.md`).

## How to drive Claude Code through this

Build one concept per session. Start each in plan mode, let it read the relevant spec files, review the plan, then execute. Keep context under roughly 60% of the window and clear it between concepts. Commit after each phase. Detail is in `CLAUDE.md`.

## Note

`COMPLIANCE.md` is practical guidance distilled from public AHPRA material, not legal advice. The clinic should confirm the final copy with its indemnity insurer or a legal adviser before launch, since the regulator does not pre-approve advertising.
