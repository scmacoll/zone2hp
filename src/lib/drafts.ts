/**
 * Whether this build includes draft content: work the client has not signed off,
 * such as a sample careers role or the FAQ page.
 *
 * True for Vercel preview deployments (staging), `npm run dev`, or a build with
 * PUBLIC_SHOW_DRAFT_ROLES=true. Production builds leave drafts out entirely. Anything
 * unknown counts as production, so a draft never reaches the live site by accident.
 */
export const showDrafts =
  import.meta.env.DEV ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.PUBLIC_SHOW_DRAFT_ROLES === "true";
