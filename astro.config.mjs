// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://zone2hp.com",
  devToolbar: { enabled: false },

  // Static by default: the home page, the privacy pages and the concepts all stay
  // prerendered exactly as before. Only routes that opt out with
  // `export const prerender = false` are rendered on demand, which is what the
  // account routes need for httpOnly session cookies. See ACCOUNTS.md.
  //
  // Deliberately no ISR: a cached response from a route that refreshes a session
  // carries a Set-Cookie with a live token, which would sign the next visitor in
  // as somebody else.
  adapter: vercel(),

  integrations: [
    sitemap({
      // Only pages we actually want found. The booking funnel is a mock, the
      // account pages are noindex, and /concepts are archived design
      // explorations that would otherwise compete with the home page for its
      // own title and description.
      filter: (page) =>
        !page.includes('/book/') &&
        !page.includes('/account/') &&
        !page.includes('/concepts/'),
    }),
  ],

  // Content Security Policy. Astro hashes its own bundled scripts and styles and
  // emits script-src / style-src for us, which is why no 'unsafe-inline' is
  // needed: some of our scripts are inlined into the HTML, and hashes cover them.
  //
  // Astro delivers this as a <meta> element, and meta CSP cannot express
  // frame-ancestors, so clickjacking protection is an HTTP header in vercel.json
  // instead. The two policies are enforced together.
  //
  // Not active in `astro dev` (a Vite limitation): test with build + preview.
  security: {
    // The only CSRF defence in play, so it is pinned rather than inherited:
    // it 403s any form POST whose Origin does not match.
    checkOrigin: true,

    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "media-src 'self'",
        // The keyless Google Maps embed and the Cliniko booking page.
        'frame-src https://www.google.com https://*.cliniko.com',
        // Own endpoints, plus the keep-in-touch form which posts to Formspree.
        "form-action 'self' https://formspree.io",
        // The same form submits by fetch without leaving the page.
        "connect-src 'self' https://formspree.io",
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
