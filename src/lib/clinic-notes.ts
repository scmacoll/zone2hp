/**
 * Clinic Notes: the client-written posts, newest first.
 *
 * Copy here (headings, standfirsts, tags, card labels) is the client's own,
 * reproduced verbatim from zone-two-clinic-notes.html (the first four, Oct
 * 2026) and zone-two-clinic-notes-02.html (the next four, Nov 2026). Do not
 * edit it to fit house style without asking. The <title>s come from each
 * batch's README-for-developer.txt.
 *
 * PUBLISH DATES: all of them live here, in one place. They feed the Article
 * structured data on each post page.
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
    slug: 'achilles-tendinopathy',
    title: "Achilles Tendinopathy: Load It, Don't Rest It | Zone Two Eastwood",
    tag: 'Heel & calf',
    readTime: '4 min read',
    cardTitle: 'Achilles pain',
    heading: "Achilles pain: load it, don't rest it",
    standfirst:
      "Stiff and sore first thing in the morning, easing once you get moving, then grumbling after a run? That's the classic pattern of Achilles tendinopathy.",
    datePublished: '2026-11-17',
  },
  {
    slug: 'concentric-eccentric-isometric',
    title: 'Concentric, Eccentric and Isometric Exercise Explained | Zone Two Eastwood',
    tag: 'Exercise',
    readTime: '4 min read',
    cardTitle: 'Lift, lower, hold',
    heading: 'Lift, lower, hold: three ways to load a muscle',
    standfirst:
      "Concentric, eccentric and isometric sound like jargon. They're just three ways a muscle can work, and each has a job in rehab.",
    datePublished: '2026-11-17',
  },
  {
    slug: 'shoulder-pain-stiff-or-unstable',
    title: 'Shoulder Pain: Stiff, Unstable or Overloaded? | Zone Two Eastwood',
    tag: 'Shoulder',
    readTime: '4 min read',
    cardTitle: 'Stiff or unstable?',
    heading: 'Shoulder pain: stiff, unstable, or overloaded?',
    standfirst:
      "Your shoulder trades stability for range: it's the most mobile joint in the body. When it hurts, it helps to know which side of that trade has gone wrong.",
    datePublished: '2026-11-17',
  },
  {
    slug: 'understand-your-pain',
    title: 'Understand Your Pain | Zone Two Eastwood',
    tag: 'The big one',
    readTime: '7 min read',
    cardTitle: 'Understand your pain',
    heading: 'Understand your pain',
    standfirst:
      "Pain is real, and it's yours. But it doesn't always mean what you think it means. Understanding how it works is one of the most useful things you can do for it.",
    datePublished: '2026-11-17',
  },
  {
    slug: 'de-quervains-tenosynovitis',
    title: "De Quervain's Tenosynovitis (Thumb & Wrist Pain) | Zone Two Eastwood",
    tag: 'Wrist & thumb',
    readTime: '3 min read',
    cardTitle: "De Quervain's",
    heading: 'That pain at the base of your thumb',
    standfirst:
      "If gripping, lifting your baby or texting sends a sharp pain along the thumb side of your wrist, it may be De Quervain's tenosynovitis.",
    datePublished: '2026-10-29',
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
    datePublished: '2026-10-29',
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
    datePublished: '2026-10-29',
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
    datePublished: '2026-10-29',
  },
];

/**
 * The three posts shown under "More clinic notes" on a post: the next three in
 * the list, wrapping round, so every post is linked from three others and the
 * row stays three cards wide.
 */
export function moreClinicNotes(slug: string): ClinicNote[] {
  const i = clinicNotes.findIndex((n) => n.slug === slug);
  return [1, 2, 3].map((step) => clinicNotes[(i + step) % clinicNotes.length]);
}

export function getClinicNote(slug: string): ClinicNote {
  const note = clinicNotes.find((n) => n.slug === slug);
  if (!note) throw new Error(`Unknown clinic note: ${slug}`);
  return note;
}
