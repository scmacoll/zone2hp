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

import type { Lang } from '../i18n/lang';

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
  /** Korean wording for /ko/blog (our translation, awaiting Dr Kim's review). */
  ko: NoteText;
};

/** The words of a post's listing, in one language. */
export type NoteText = Pick<ClinicNote, 'title' | 'tag' | 'readTime' | 'cardTitle' | 'heading' | 'standfirst'>;

/** A post's listing words in the given language. */
export const noteText = (note: ClinicNote, lang: Lang): NoteText => (lang === 'ko' ? note.ko : note);

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
    ko: {
      title: '아킬레스건병증: 쉬지 말고 부하를 주세요 | Zone Two 이스트우드',
      tag: '발뒤꿈치·종아리',
      readTime: '4분 분량',
      cardTitle: '아킬레스 통증',
      heading: '아킬레스 통증: 쉬지 말고 부하를 주세요',
      standfirst:
        '아침에 일어나면 뻣뻣하고 아프다가, 움직이면 좀 풀리고, 달리고 나면 다시 욱신거리나요? 아킬레스건병증의 전형적인 패턴이에요.',
    },
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
    ko: {
      title: '단축성, 신장성, 등척성 운동 쉽게 알아보기 | Zone Two 이스트우드',
      tag: '운동',
      readTime: '4분 분량',
      cardTitle: '들고, 내리고, 버티기',
      heading: '들고, 내리고, 버티기: 근육에 부하를 주는 세 가지 방법',
      standfirst:
        '단축성, 신장성, 등척성이라고 하면 어려운 용어처럼 들려요. 사실은 근육이 일하는 세 가지 방식일 뿐이고, 재활에서 저마다 맡은 역할이 있어요.',
    },
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
    ko: {
      title: '어깨 통증: 뻣뻣함, 불안정, 과부하? | Zone Two 이스트우드',
      tag: '어깨',
      readTime: '4분 분량',
      cardTitle: '뻣뻣할까, 불안정할까?',
      heading: '어깨 통증: 뻣뻣한가요, 불안정한가요, 과부하인가요?',
      standfirst:
        '어깨는 안정성을 내주고 움직이는 범위를 얻었어요. 몸에서 가장 많이 움직이는 관절이죠. 어깨가 아플 때는 그 맞교환의 어느 쪽이 무너졌는지 아는 게 도움이 돼요.',
    },
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
    ko: {
      title: '통증 이해하기 | Zone Two 이스트우드',
      tag: '가장 중요한 이야기',
      readTime: '7분 분량',
      cardTitle: '통증 이해하기',
      heading: '통증 이해하기',
      standfirst:
        '통증은 진짜예요. 그리고 오롯이 내 것이에요. 하지만 늘 생각하는 그 뜻은 아닐 수 있어요. 통증이 어떻게 작동하는지 이해하는 건 통증을 위해 할 수 있는 가장 유용한 일 중 하나예요.',
    },
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
    ko: {
      title: '드퀘르뱅 건초염(엄지·손목 통증) | Zone Two 이스트우드',
      tag: '손목·엄지',
      readTime: '3분 분량',
      cardTitle: '드퀘르뱅',
      heading: '엄지손가락 아래쪽의 그 통증',
      standfirst:
        '물건을 쥐거나, 아기를 안아 올리거나, 문자를 보낼 때 손목 엄지 쪽으로 찌릿한 통증이 지나간다면 드퀘르뱅 건초염일 수 있어요.',
    },
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
    ko: {
      title: '허리 통증과 고관절 | Zone Two 이스트우드',
      tag: '허리·고관절',
      readTime: '3분 분량',
      cardTitle: '혹시 고관절 때문?',
      heading: '허리 통증? 고관절을 살펴보세요',
      standfirst:
        '고관절과 허리는 한 팀으로 일해요. 고관절 근육이 제 몫을 못 하면, 허리가 가장 먼저 알아채는 경우가 많아요.',
    },
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
    ko: {
      title: '드라이 니들링: 연구 근거가 말해 주는 것 | Zone Two 이스트우드',
      tag: '치료',
      readTime: '3분 분량',
      cardTitle: '드라이 니들링',
      heading: '드라이 니들링: 할 수 있는 것과 할 수 없는 것',
      standfirst:
        '뭉치고 누르면 아픈 근육에 가는 바늘 하나. 과장은 빼고, 연구 근거가 말해 주는 것을 정리했어요.',
    },
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
    ko: {
      title: '존 2 트레이닝 알아보기 | Zone Two 이스트우드',
      tag: '트레이닝',
      readTime: '3분 분량',
      cardTitle: '존 2 알아보기',
      heading: '존 2: 저희 이름에 담긴 페이스',
      standfirst:
        '대화할 수 있을 만큼 편하고, 운동이라고 할 만큼은 힘든 강도. 존 2 트레이닝이 무엇인지, 왜 중요한지, 어디에 들어맞는지 알려 드려요.',
    },
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
