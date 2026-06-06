# CLAUDE.md — Zone Two Health and Performance

Coming-soon site for an Australian movement and performance clinic. We are building five design variations of one coming-soon landing page. The owner picks a favourite from screenshots, and the winner goes live at zone2hp.com. The full multi-section site is a later phase on the same system. Read `README.md`, then this file, then the relevant spec for whatever you are building.

## Stack

- **Astro** (latest) as the framework. Content-first, ships zero JS by default, islands only where interactivity is genuinely needed (mobile nav, any scroll-driven reveal that cannot be done in CSS).
- **TypeScript**, written plainly: pure functions, simple and idiomatic, no clever abstractions, no premature generics, no class hierarchies. If a piece of logic does not need to be shared, inline it.
- **Tailwind CSS** for the majority of styling. Reach for plain CSS only when Tailwind is genuinely the wrong tool (complex keyframes, scroll-driven animation, container-query edge cases, the grain overlay).
- **astro:assets** for image optimisation. Native `<video>` for the hero loop.
- Host on Cloudflare Pages, Netlify or Vercel. Only the chosen page needs the production domain.

## Project structure (suggested)

```
src/
  layouts/        Base.astro shared page shell
  components/     Wordmark, Hero, Eyebrow, ServicesLine, MapBlock, ContactBlock,
                  Footer, Nav, CtaButton, (later: Section, ServiceCard, MethodStep, StatCallout)
  pages/
    concepts/a1.astro a2.astro b1.astro c1.astro c2.astro   the five review pages
    index.astro       the chosen concept, promoted here for the live domain
  styles/
    tokens.css      design tokens as CSS variables (see DESIGN-SYSTEM.md)
    global.css
  content/        copy pulled from BRAND-AND-VOICE.md
public/
  video/  images/  fonts/   placeholder assets named per ASSETS.md
```

Every concept page must be a complete coming-soon page: wordmark, opening-soon statement, services one-liner, address with embedded map, phone, email, footer. The concepts differ only in aesthetic direction (see `CONCEPTS.md`).

## Commands (fill in once scaffolded)

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Format/lint: Prettier and ESLint, run before each commit.

## Hard rules (non-negotiable)

1. **Australian English everywhere.** colour, centre, optimise, specialise, programme where appropriate.
2. **No em dashes anywhere in copy.** Not in headings, body, alt text or meta. Use full stops, commas, colons or parentheses. Firm client preference.
3. **No AI-tell phrasing.** Banned: "elevate", "unlock", "in today's fast-paced world", "nestled", "boasts", "dive in", "whether you're X or Y", "look no further", "game-changer", "seamless", "robust" (as filler), "leverage", "delve", "tapestry", "testament to", and the "it's not just X, it's Y" construction. Write plainly and physically.
4. **Compliance is law, literally.** Follow `COMPLIANCE.md` exactly, including on the coming-soon page. Never write or invent testimonials, patient stories, or outcome claims. Never use "pain-free", "cured", "fix", "guaranteed", "instant", "best", or comparative claims. Run the checklist in `COMPLIANCE.md` against every copy block.
5. **No `localStorage` / `sessionStorage`** or other browser storage unless explicitly required and the deploy target supports it.
6. **Accessibility AA.** Semantic HTML, correct heading order, focus states, alt text, colour contrast, `prefers-reduced-motion` respected.
7. **Assets are placeholders.** No real photography or footage exists yet. Use the placeholder strategy and file names in `ASSETS.md` so real assets drop in later with no code change. For the review build, the hero placeholder should be a representative still, not a blank block, so screenshots read well.

## Responsive rules (read DESIGN-SYSTEM.md for full detail)

- Fluid before stepped: `clamp()` for type and spacing, `min()/max()` for widths, intrinsic grids with `auto-fit`/`minmax`.
- Use **container queries** for components so they reflow based on their container, not the viewport. This is the fix for the "half a laptop window" problem.
- Hero heights use `svh`/`dvh`/`lvh`, never `100vh`.
- Test at 320, 360, 390, 768, 834, 1024, 1280, 1440, 1920, plus a continuous drag-resize, plus landscape phone, and explicitly at ~700px and ~900px (split-window widths).
- Tap targets at least 44px. Nothing important behind hover only.
- Hero video swaps to its static poster on small screens and under reduced-motion.

## Video performance rules

- Compressed, short (6 to 10 second) seamless loop. AV1/WebM with an H.264 mp4 fallback. Always a poster frame.
- `muted`, `autoplay`, `loop`, `playsinline`. Never autoplay with sound.
- Lazy-load below-the-fold video. Respect `prefers-reduced-motion` (show the poster).
- Only the chosen concept needs a real video. The other four can ship with the poster still alone.

## Workflow

Spec-driven, not vibe-coded. The specs are the source of truth.

- Build the shared system and components first, then the five concepts as variations.
- Build and review one concept per session where practical. Start in plan mode, read the relevant spec, produce a plan, get it reviewed, then execute.
- Keep context under roughly 60% of the window. Clear context between concepts. Auto-compaction loses detail, so dump progress to a file before clearing.
- Commit per phase with clear messages.
- Add a visual check loop: screenshot each page at the test widths and verify the layout before calling it done. These screenshots double as the owner review set.
