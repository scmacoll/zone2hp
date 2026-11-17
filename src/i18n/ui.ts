// Strings for the shared chrome (menu, header, footers, map, keyword band,
// services line, page shell), in English and Korean. The English is the site's
// existing copy, unchanged. The Korean is our translation in the polite-warm
// register (해요체), awaiting Dr Kim's review (see KOREAN-REVIEW.md).
import type { Lang } from './lang';
import { openingHours } from '../lib/clinic';

const en = {
  skip: 'Skip to content',
  meta: {
    title: 'Zone Two Health and Performance | Chiropractic & Rehab, Eastwood NSW',
    description:
      'Chiropractic, post-operative rehabilitation and dry needling in Eastwood, NSW. Book a first visit at Zone Two Health and Performance.',
  },
  home: 'Zone Two Health and Performance, home',
  menu: {
    button: 'Menu',
    nav: 'Site',
    book: 'Book',
    about: 'About',
    findUs: 'Find us',
    clinicNotes: 'Clinic notes',
    faq: 'FAQ',
  },
  /** The link to the other language, written in that language. */
  switchTo: '한국어',
  switchToLang: 'ko',
  hours: openingHours,
  hoursLabel: 'Opening hours',
  footer: {
    services: 'Services',
    serviceList: ['Chiropractic', 'Rehab', 'Dry Needling'],
    visit: 'Visit',
    openInMaps: 'Open in Google Maps',
    contact: 'Contact',
    keepInTouch: 'Keep in touch',
    blurb: 'Sign up for news and updates from the clinic.',
    placeholder: 'EMAIL',
    emailLabel: 'Your email address',
    subscribe: 'Subscribe to keep-in-touch updates',
    invalidEmail: 'Please enter a valid email address.',
    /** "{email}" is replaced with the address. */
    thanks: "Thanks, you're on the list. We'll email news and updates to {email}.",
    failed: 'Something went wrong. Please try again, or email us at info@zone2hp.com.',
    place: 'Eastwood, NSW · Australia',
    clinicNotes: 'Clinic notes',
    careers: 'Careers',
    faq: 'FAQ',
    refer: 'Refer a friend',
    privacy: 'Privacy',
  },
  map: {
    iframeTitle:
      'Map showing Zone Two Health and Performance at Suite 104, Level 1, 2 Rowe Street, Eastwood, NSW 2122',
    directions: 'Get directions',
    eyebrow: 'Find us in Eastwood',
    bookNow: 'Book now',
    /** Wrapped around the Korean word 한국어, which keeps its own lang. */
    consultations: ['Consultations in English and ', ''] as [string, string],
    /** Google Maps interface language. */
    mapLang: '',
  },
  services: ['Chiropractic', 'Rehab', 'Dry Needling'],
  keywords: {
    label: 'Services and conditions',
    pause: 'Pause scrolling services',
    list: [
      'Chiropractic care',
      'Dry needling',
      'Soft tissue therapy',
      'Exercise rehabilitation',
      'Strength programmes',
      'Aged care treatment',
      'Aged care rehabilitation',
      'Posture correction',
      'Low back pain',
      'Knee pain',
      'Shoulder pain',
      'ACL injuries',
      'Rotator cuff injuries',
      'Achilles tendinopathy',
      'Hip strength',
      "De Quervain's tenosynovitis",
    ],
  },
};

type Ui = typeof en;

const ko: Ui = {
  skip: '본문으로 건너뛰기',
  meta: {
    title: 'Zone Two Health and Performance | 이스트우드 카이로프랙틱·재활',
    description:
      '시드니 이스트우드의 카이로프랙틱, 수술 후 재활, 드라이 니들링. Zone Two Health and Performance에서 첫 진료를 예약하세요. 한국어 진료가 가능해요.',
  },
  home: 'Zone Two Health and Performance, 홈',
  menu: {
    button: '메뉴',
    nav: '사이트',
    book: '예약',
    about: '소개',
    findUs: '오시는 길',
    clinicNotes: '클리닉 노트',
    faq: '자주 묻는 질문',
  },
  switchTo: 'English',
  switchToLang: 'en',
  hours: [
    ['월–목', '오전 9시–낮 12시, 오후 2시–6시'],
    ['토', '오전 9시–오후 1시'],
  ],
  hoursLabel: '진료 시간',
  footer: {
    services: '서비스',
    serviceList: ['카이로프랙틱', '재활', '드라이 니들링'],
    visit: '방문',
    openInMaps: 'Google 지도에서 열기',
    contact: '연락처',
    keepInTouch: '소식 받기',
    blurb: '클리닉 소식과 업데이트를 이메일로 받아 보세요.',
    placeholder: '이메일',
    emailLabel: '이메일 주소',
    subscribe: '소식 받기 신청',
    invalidEmail: '올바른 이메일 주소를 입력해 주세요.',
    thanks: '신청해 주셔서 감사해요. 소식과 업데이트를 {email} 주소로 보내 드릴게요.',
    failed: '문제가 생겼어요. 다시 시도해 주시거나 info@zone2hp.com으로 이메일을 보내 주세요.',
    place: '호주 NSW 이스트우드',
    clinicNotes: '클리닉 노트',
    careers: '채용',
    faq: '자주 묻는 질문',
    refer: '친구 추천',
    privacy: '개인정보처리방침',
  },
  map: {
    iframeTitle:
      'Zone Two Health and Performance 위치 지도: Suite 104, Level 1, 2 Rowe Street, Eastwood, NSW 2122',
    directions: '길찾기',
    eyebrow: '이스트우드 오시는 길',
    bookNow: '지금 예약하기',
    consultations: ['영어와 ', '로 진료해요'],
    mapLang: 'ko',
  },
  services: ['카이로프랙틱', '재활', '드라이 니들링'],
  keywords: {
    label: '서비스와 질환',
    pause: '서비스 스크롤 멈추기',
    list: [
      '카이로프랙틱 치료',
      '드라이 니들링',
      '연부조직 치료',
      '운동 재활',
      '근력 프로그램',
      '노인 치료',
      '노인 재활',
      '자세 교정',
      '허리 통증',
      '무릎 통증',
      '어깨 통증',
      '전방십자인대(ACL) 손상',
      '회전근개 손상',
      '아킬레스건병증',
      '고관절 근력',
      '드퀘르뱅 건초염',
    ],
  },
};

export const ui: Record<Lang, Ui> = { en, ko };
