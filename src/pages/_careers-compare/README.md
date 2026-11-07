# Careers style alternatives

Not live. The leading underscore on this folder keeps every file here out of the
site's routing, so none of these pages has a URL.

The chosen design is `src/pages/careers/`: the white style for the careers page
and the blog post style for each role page.

What is kept here:

- `current/`: the original Clinic Notes style, with the contour hero.
- `[variant]/`, `_CompareIndex.astro`, `_CompareRole.astro`, `_ComparePost.astro`
  and `_compare.css`: the white, halfway and blog post comparison pages.

To view the comparison pages again, rename this folder to `careers-compare`. They
return at `/careers-compare/white`, `/careers-compare/halfway`, and `role` under
each, plus `/careers-compare/post/role`, on any build that has the sample role.
`current/` would then be at `/careers-compare/current`.
