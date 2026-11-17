// Clinic Notes chrome (index page, post shell, closing block) in English and
// Korean. The English is the client's copy, verbatim. The Korean is our
// translation (해요체), awaiting Dr Kim's review. Per-post headings and
// standfirsts live with each post in src/lib/clinic-notes.ts.
import type { Lang } from './lang';

const en = {
  index: {
    title: 'Clinic Notes | Zone Two Eastwood',
    description:
      'Evidence-based reads from Zone Two Health and Performance, Eastwood, on Achilles, shoulder, back and wrist pain, dry needling, exercise and zone 2 training.',
    place: 'Eastwood',
    /** "Clinic<br /><span>Notes</span>" */
    heading: ['Clinic', 'Notes'] as [string, string],
    intro:
      'Short, evidence-based reads on the problems we see every week. Written by Dr Mintae Kim, Chiropractor. Slow is fast.',
    posts: 'Posts',
    /** After a card or heading whose post is only in English (unused in English). */
    englishOnly: '',
  },
  post: {
    breadcrumb: 'Breadcrumb',
    back: 'Clinic Notes',
    references: 'References',
    more: 'More clinic notes',
  },
  close: {
    signature: ['Zone Two Health and Performance. ', 'Dr Mintae Kim, Chiropractor.'] as [string, string],
    disclaimer:
      "This information is general and educational, and isn't a substitute for an individual assessment. If you have symptoms, see a registered health practitioner.",
  },
};

type Blog = typeof en;

const ko: Blog = {
  index: {
    title: '클리닉 노트 | Zone Two 이스트우드',
    description:
      'Zone Two Health and Performance(이스트우드)의 근거 기반 건강 글: 아킬레스, 어깨, 허리, 손목 통증, 드라이 니들링, 운동, 존 2 트레이닝.',
    place: '이스트우드',
    heading: ['클리닉', '노트'],
    intro:
      '매주 만나는 문제들을 다룬, 근거 기반의 짧은 글이에요. 카이로프랙터 Mintae Kim 원장이 써요. 느림이 곧 빠름.',
    posts: '글 목록',
    englishOnly: '영문',
  },
  post: {
    breadcrumb: '이동 경로',
    back: '클리닉 노트',
    references: '참고 문헌',
    more: '클리닉 노트 더 보기',
  },
  close: {
    signature: ['Zone Two Health and Performance. ', '카이로프랙터 Mintae Kim 원장.'],
    disclaimer:
      '이 정보는 일반적인 교육 목적의 내용이며, 개인별 평가를 대신하지 않아요. 증상이 있다면 등록된 보건 의료인과 상담하세요.',
  },
};

export const blog: Record<Lang, Blog> = { en, ko };
