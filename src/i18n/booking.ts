// Booking pages on the Cliniko (embedded) path, in English and Korean: /book,
// /book/patient, /book/new, /book/returning and /book/refer. The English is
// the site's existing wording, verbatim. The Korean is our translation (해요체),
// awaiting Dr Kim's review. Cliniko's own booking form inside the frame stays
// in English; the Korean pages say so. The custom-funnel steps (mock/api mode)
// are not on the live path and stay English-only.
import type { Lang } from './lang';
import { BOOKING_TYPES, type BookingType } from '../lib/booking/funnel';

const site = 'Zone Two Health and Performance';

const en = {
  types: {
    title: `Book an appointment | ${site}`,
    description: `Book an appointment with ${site} in Eastwood, NSW.`,
    heading: 'Book an appointment',
    lede: 'What kind of appointment do you need?',
  },
  patient: {
    title: `New or existing patient | ${site}`,
    description: 'Choose whether you are a new or existing patient to book an appointment.',
    heading: 'Are you a new or existing patient?',
    lede: 'This helps us show you the right appointment options.',
    newTitle: 'New patient',
    newBlurb: 'First visit, or have not visited the clinic in over 3 months.',
    existingTitle: 'Existing patient',
    existingBlurb: 'You have visited the clinic in the last 3 months.',
    back: 'Back',
  },
  new: {
    title: `Book as a new patient | ${site}`,
    description: `Book your first appointment with ${site}.`,
    heading: 'Book as a new patient',
  },
  returning: {
    title: `Book as an existing patient | ${site}`,
    description: `Book a follow-up appointment with ${site}.`,
    heading: 'Book as an existing patient',
  },
  embed: {
    back: 'Back',
    region: 'Online booking',
    frameTitle: 'Online booking',
    /** "If the booking page does not load, <a>open it in a new tab</a>." */
    fallback: ['If the booking page does not load, ', 'open it in a new tab', '.'] as [string, string, string],
    /** Shown above the frame on translated pages only: Cliniko's form is in English. */
    formLanguage: '',
    placeholder: 'The online booking page will appear here.',
  },
  refer: {
    /** `${label} bookings`, or this when the type is unknown. */
    heading: (label?: string) => (label ? `${label} bookings` : 'Contact us to book'),
    title: (label?: string) => `${label ?? 'Contact us'} | ${site}`,
    description: `Contact ${site} to book an appointment under this funding type.`,
    lede: 'Appointments under this funding type need to be arranged directly with the clinic. Please call or email us and we will get you booked in.',
    phone: 'Phone',
    email: 'Email',
    back: 'Back to booking options',
  },
};

type Booking = typeof en;

const ko: Booking = {
  types: {
    title: `진료 예약 | ${site}`,
    description: `이스트우드(NSW)에 있는 ${site}의 진료를 예약하세요.`,
    heading: '진료 예약',
    lede: '어떤 진료가 필요하세요?',
  },
  patient: {
    title: `신규 또는 기존 환자 | ${site}`,
    description: '진료를 예약하려면 신규 환자인지 기존 환자인지 선택하세요.',
    heading: '신규 환자인가요, 기존 환자인가요?',
    lede: '알맞은 진료 옵션을 보여 드리는 데 도움이 돼요.',
    newTitle: '신규 환자',
    newBlurb: '첫 방문이거나, 3개월 넘게 클리닉에 오지 않았어요.',
    existingTitle: '기존 환자',
    existingBlurb: '최근 3개월 안에 클리닉에 왔어요.',
    back: '뒤로',
  },
  new: {
    title: `신규 환자로 예약 | ${site}`,
    description: `${site}에서 첫 진료를 예약하세요.`,
    heading: '신규 환자로 예약하기',
  },
  returning: {
    title: `기존 환자로 예약 | ${site}`,
    description: `${site}에서 재진을 예약하세요.`,
    heading: '기존 환자로 예약하기',
  },
  embed: {
    back: '뒤로',
    region: '온라인 예약',
    frameTitle: '온라인 예약',
    fallback: ['예약 페이지가 열리지 않으면 ', '새 탭에서 열어 보세요', '.'],
    formLanguage: '아래 예약 양식은 예약 시스템(Cliniko)에서 제공하며 영어로 표시돼요.',
    placeholder: '온라인 예약 페이지가 여기에 표시돼요.',
  },
  refer: {
    heading: (label?: string) => (label ? `${label} 예약` : '연락해서 예약하기'),
    title: (label?: string) => `${label ?? '문의하기'} | ${site}`,
    description: `이 비용 지원 유형으로 진료를 예약하려면 ${site}에 연락하세요.`,
    lede: '이 비용 지원 유형의 진료는 클리닉과 직접 일정을 잡아야 해요. 전화나 이메일로 연락 주시면 예약을 도와드릴게요.',
    phone: '전화',
    email: '이메일',
    back: '예약 옵션으로 돌아가기',
  },
};

export const booking: Record<Lang, Booking> = { en, ko };

/** Korean names and blurbs for the booking types (English: BOOKING_TYPES). */
const typesKo: Record<BookingType, { label: string; blurb: string }> = {
  standard: { label: '일반 진료', blurb: '카이로프랙터의 치료, 재활 또는 둘 다.' },
  epc: {
    label: 'GPCCMP(GP 만성질환 관리 계획)',
    blurb: 'GP의 의뢰를 받아, 메디케어(Medicare) GP 만성질환 관리 계획에 따라 받는 진료.',
  },
  tpc: {
    label: '제3자 / 보상 청구',
    blurb: '산재 보상(워크커버)이나 교통사고 보험사 같은 제3자가 비용을 부담하는 진료.',
  },
  ndis: { label: 'NDIS', blurb: 'NDIS 플랜으로 비용을 지원받는 진료.' },
};

export function bookingTypes(lang: Lang) {
  return BOOKING_TYPES.map((t) => (lang === 'ko' ? { ...t, ...typesKo[t.id] } : t));
}
