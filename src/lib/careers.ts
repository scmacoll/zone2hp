/**
 * Open roles for /careers. Adding a role here creates its card and its page at
 * /careers/<slug>; delete the entry when the role closes.
 *
 * A role marked `draft` is built only where drafts are shown (see drafts.ts), so
 * no card and no page exist on the live site.
 */
import { showDrafts } from "./drafts";

export interface RoleSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Role {
  slug: string;
  title: string;
  location: string;
  /** Employment type, for example Part-time or Contractor. */
  commitment: string;
  /** One line for the card and the meta description. */
  summary: string;
  sections: RoleSection[];
  draft?: boolean;
}

const allRoles: Role[] = [
  {
    // Template only: shows the layout until the client supplies a real role.
    slug: "sample-chiropractor",
    title: "Chiropractor",
    location: "Eastwood, NSW",
    commitment: "Part-time",
    summary:
      "Sample role. This text shows the layout and will be replaced by the real role details.",
    draft: true,
    sections: [
      {
        heading: "About the role",
        paragraphs: [
          "Sample text. A short description of the role, the days it covers and who it works with at the clinic goes here.",
        ],
      },
      {
        heading: "What you'll do",
        items: ["Sample duty one", "Sample duty two", "Sample duty three"],
      },
      {
        heading: "About you",
        items: [
          "Current registration with the Chiropractic Board of Australia",
          "Sample requirement two",
          "Sample requirement three",
        ],
      },
      {
        heading: "What we offer",
        items: ["Sample offer one", "Sample offer two"],
      },
    ],
  },
];

export const roles = allRoles.filter((role) => showDrafts || !role.draft);
