/**
 * Clinic Notes: the four client-written posts.
 *
 * Copy here (headings, standfirsts, tags, card labels) is the client's own,
 * reproduced verbatim from zone-two-clinic-notes.html. Do not edit it to fit
 * house style without asking. The <title>s come from the client's
 * README-for-developer.txt.
 *
 * PUBLISH DATES: all four live here, in one place. Change them at publish
 * time; they feed the Article structured data on each post page.
 */

export type ClinicNote = {
  slug: string;
  /** Document <title>. */
  title: string;
  /** Orange tag pill above the heading, and the small label on the cards. */
  tag: string;
  readTime: string;
  /** Short title on the table-of-contents cards. */
  cardTitle: string;
  /** The post's heading (an H2 in the client's file, the page H1 here). */
  heading: string;
  /** Standfirst under the heading. Doubles as the meta description. */
  standfirst: string;
  /** ISO date for Article structured data. */
  datePublished: string;
};

export const clinicNotes: ClinicNote[] = [
  {
    slug: 'de-quervains-tenosynovitis',
    title: "De Quervain's Tenosynovitis (Thumb & Wrist Pain) | Zone Two Eastwood",
    tag: 'Wrist & thumb',
    readTime: '3 min read',
    cardTitle: "De Quervain's",
    heading: 'That pain at the base of your thumb',
    standfirst:
      "If gripping, lifting your baby or texting sends a sharp pain along the thumb side of your wrist, it may be De Quervain's tenosynovitis.",
    datePublished: '2026-10-28',
  },
  {
    slug: 'low-back-pain-and-hips',
    title: 'Low Back Pain and Your Hips | Zone Two Eastwood',
    tag: 'Back & hips',
    readTime: '3 min read',
    cardTitle: 'Is it your hips?',
    heading: 'Low back pain? Check your hips',
    standfirst:
      "Your hips and lower back work as a team. When the hip muscles aren't pulling their weight, the back often notices first.",
    datePublished: '2026-10-28',
  },
  {
    slug: 'dry-needling',
    title: 'Dry Needling: What the Evidence Says | Zone Two Eastwood',
    tag: 'Treatment',
    readTime: '3 min read',
    cardTitle: 'Dry needling',
    heading: "Dry needling: what it can and can't do",
    standfirst:
      "A fine needle into a tight, tender muscle. Here's what the evidence says, minus the hype.",
    datePublished: '2026-10-28',
  },
  {
    slug: 'zone-2-training',
    title: 'Zone 2 Training Explained | Zone Two Eastwood',
    tag: 'Training',
    readTime: '3 min read',
    cardTitle: 'Zone 2, explained',
    heading: 'Zone 2: the pace behind our name',
    standfirst:
      "Easy enough to chat, hard enough to count. Here's what zone 2 training is, why it matters, and where it fits.",
    datePublished: '2026-10-28',
  },
];

export function getClinicNote(slug: string): ClinicNote {
  const note = clinicNotes.find((n) => n.slug === slug);
  if (!note) throw new Error(`Unknown clinic note: ${slug}`);
  return note;
}
