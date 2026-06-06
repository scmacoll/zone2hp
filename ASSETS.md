# ASSETS — video and image strategy

No real photography or footage exists yet. Build against placeholders, gather and generate the real assets in parallel (this happens in separate tools and does not consume any coding tokens), then swap. The layout depends on aspect ratios and crops, not on the actual pixels, so lock the slots below first.

## The key efficiency

You need **one finished hero video, for the winning concept only**. For the owner review, each of the five concepts ships with a strong hero **still** so the screenshots read well. Screenshots cannot show motion anyway, and the owner is choosing a design, so a representative still is enough to decide. Produce the video after the pick.

## The unifying grade

Mixed sources (licensed stock plus AI generation) only feel like one film if they share a grade. Define one look and apply it to everything: cool chrome highlights, warm stone midtones, and the alpine orange reserved as the single warm pop (a jacket, a headlamp glow, a trail marker). This grade is what lets a real stock clip and an AI clip cut together. With a media background this is the lever you already know how to pull.

## Hybrid approach (honest about 2026 tools)

- **Real licensed stock** for fast, physically specific human action: powder spray, a skier carving, a trail runner's gait, night running with headlamps. AI is still unreliable on this and a media-literate owner will notice. Source authentic outdoor and athletic footage from premium stock libraries and license correctly.
- **AI generation** for atmosphere and texture that does not hinge on exact human motion: drifting snow, breath fogging in cold air, an abstract chrome-and-stone macro, a slow push through a blizzard, an empty alpine ridge at dusk.
- **Image-to-video, not text-to-video, for the hero.** Art-direct a still first (Midjourney or Flux), then animate it. You control composition and the safe area for the headline, and motion stays consistent. A web hero only needs a 6 to 10 second seamless loop.

### Tool notes (current)

- **Veo 3.1**: best all-rounder, strong prompt adherence, 4K. Use for the hero establishing shot.
- **Kling 3.0**: best value (around $0.10 per second), multi-shot, strong on high-motion fabric and powder.
- **Runway Gen-4.5**: best director control (camera moves, motion brush, reference-image consistency), weaker realism.
- **Luma Ray3**: best for calm, atmospheric, nature shots.
- **Sora**: the web and app are being discontinued, with the API uncertain through 2026. Do not build the pipeline on it.
- **fal.ai**: aggregator API if you want to script across models.
- Stills for the five pitch heroes: Midjourney or Flux, graded to match the look.

## Hero stills, one per concept (for the review)

Each is a graded still that sells the concept in a screenshot. Aspect: design the hero to a 16:9 or wider crop with a defined safe area for the headline so any of these drops in cleanly.

- **A1 (snow / blizzard):** wide alpine slope, low light, fine snow in the air, a single figure mid-descent small in frame. Cool with a faint warm pop.
- **A2 (night trail):** runner on a dark trail lit by a headlamp, breath visible, motion blur in the background, deep blues with a warm beam.
- **B1 (zones):** three calmer environment stills (snow, trail, dusk ridge) for the scroll chapters.
- **C1 (editorial):** a quiet, high-negative-space still, stone tones, a single human-scale subject.
- **C2 (console):** a technical, almost product-like macro (chrome, texture, equipment) suiting the spec-sheet layout.

## The winner's video

After the pick, produce the hero loop for that concept only: source or generate the matching footage, grade to the look, cut a seamless 6 to 10 second loop, export the web set below, and export a poster frame from it.

## Web delivery specs

- Hero loop: AV1/WebM plus an H.264 mp4 fallback. Target a small file (aim well under a few MB). `muted`, `autoplay`, `loop`, `playsinline`.
- Always export a poster frame at the same crop.
- Lazy-load any below-the-fold video.
- Mobile and reduced-motion: serve the poster still, not the video.
- Stills: optimised AVIF/WebP via astro:assets, with sensible widths for the responsive `srcset`.

## Placeholder strategy (so the build never waits)

- Use representative placeholder stills at the exact final dimensions and file names, so swapping in real assets is a path change with no relayout.
- Suggested naming, mirrored for each concept: `public/video/hero-a1.webm`, `hero-a1.mp4`, `public/images/hero-a1-poster.jpg`, and so on for a2, b1, c1, c2.
- For the review build, the placeholder hero should be a real-looking graded still (even a quick stock preview or a single Midjourney pass), not a grey block, so the screenshots are persuasive.

## Consent reminder

Any future real imagery of identifiable patients needs written consent before it goes near the site. See `COMPLIANCE.md`.
