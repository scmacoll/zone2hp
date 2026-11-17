// Careers page, role page and application form copy, in English and Korean.
// The English is the live site's copy, unchanged. The Korean is our translation
// (해요체), awaiting Dr Kim's review; the form's privacy notice and consent line
// are legal wording, so his solicitor should see the Korean too.
// Role details themselves live in src/lib/careers.ts.
import type { Lang } from './lang';

const en = {
  page: {
    title: 'Careers | Zone Two Health and Performance, Eastwood',
    description:
      'Work with Zone Two Health and Performance in Eastwood, NSW. See our open roles or send an expression of interest.',
    eyebrow: 'Careers',
    heading: 'Work with us',
    lead: 'We provide chiropractic care, dry needling and exercise-based rehabilitation in Eastwood, NSW. See our open roles, or send us an expression of interest.',
    openRoles: 'Open roles',
    draftBadge: 'Sample, staging only',
    viewRole: 'View role',
    empty: "No open roles right now. You're welcome to send an expression of interest below.",
    interest: 'Expression of interest',
    interestLead:
      "We'd like to hear from registered practitioners and students. Tell us a little about yourself and we'll keep you in mind for future roles.",
  },
  role: {
    titleSuffix: 'Zone Two Careers',
    back: 'All open roles',
    breadcrumb: 'Breadcrumb',
    sampleNotice: 'Sample role for staging only. This is not a real position.',
    tag: 'Careers',
    details: 'Role details',
    location: 'Location',
    type: 'Type',
    apply: 'Apply for this role',
  },
  form: {
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    profession: 'Profession or course',
    optional: '(optional)',
    ahpra: 'AHPRA registration number',
    cv: 'Link to your CV or LinkedIn',
    /** Wrapped around the email link. */
    cvHint: ['Or email your CV to ', '.'] as [string, string],
    message: 'Message',
    /** Before the Privacy Policy link, its text, and after it. */
    notice: [
      "We use these details only to consider you for current or future roles. They reach us through Formspree, a form service that may store them outside Australia. Please don't include health information. See our ",
      'Privacy Policy',
      '.',
    ] as [string, string, string],
    consent: 'I agree to Zone Two collecting and using these details for this purpose.',
    submitApplication: 'Submit application',
    submitInterest: 'Send expression of interest',
    errors: {
      name: 'Please enter your full name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter your phone number.',
      privacy_consent: 'Please agree so we can consider your details.',
    },
    thanks: "Thanks, we've received your details. We'll be in touch if there's a suitable role.",
    failed: 'Something went wrong. Please try again, or email us at info@zone2hp.com.',
  },
};

type Careers = typeof en;

const ko: Careers = {
  page: {
    title: '채용 | Zone Two Health and Performance, 이스트우드',
    description:
      '호주 NSW 이스트우드의 Zone Two Health and Performance에서 함께 일할 분을 찾고 있어요. 채용 중인 직무를 보거나 관심 지원서를 보내 주세요.',
    eyebrow: '채용',
    heading: '함께 일해요',
    lead: '저희는 NSW 이스트우드에서 카이로프랙틱 치료, 드라이 니들링, 운동 기반 재활을 제공해요. 채용 중인 직무를 확인하시거나, 관심 지원서를 보내 주세요.',
    openRoles: '채용 중인 직무',
    draftBadge: '샘플, 스테이징 전용',
    viewRole: '직무 보기',
    empty: '지금은 채용 중인 직무가 없어요. 아래에서 관심 지원서를 보내 주셔도 좋아요.',
    interest: '관심 지원서',
    interestLead:
      '등록된 치료사와 학생분들의 연락을 기다려요. 간단히 소개해 주시면 앞으로 생기는 자리에 참고할게요.',
  },
  role: {
    titleSuffix: 'Zone Two 채용',
    back: '전체 채용 직무',
    breadcrumb: '이동 경로',
    sampleNotice: '스테이징 전용 샘플 직무예요. 실제 채용 공고가 아니에요.',
    tag: '채용',
    details: '직무 정보',
    location: '근무지',
    type: '근무 형태',
    apply: '이 직무에 지원하기',
  },
  form: {
    name: '성명',
    email: '이메일',
    phone: '전화번호',
    profession: '직업 또는 전공',
    optional: '(선택)',
    ahpra: 'AHPRA 등록 번호',
    cv: '이력서 또는 LinkedIn 링크',
    cvHint: ['또는 이력서를 ', '으로 보내 주세요.'],
    message: '메시지',
    notice: [
      '보내 주신 정보는 현재 또는 앞으로의 채용을 검토하는 데에만 사용해요. 정보는 Formspree라는 양식 서비스를 거쳐 저희에게 전달되며, 호주 밖에 저장될 수 있어요. 건강 정보는 적지 말아 주세요. 자세한 내용은 ',
      '개인정보처리방침(영문)',
      '을 참고해 주세요.',
    ],
    consent: '위 목적으로 Zone Two가 이 정보를 수집하고 이용하는 데 동의해요.',
    submitApplication: '지원서 보내기',
    submitInterest: '관심 지원서 보내기',
    errors: {
      name: '성명을 입력해 주세요.',
      email: '올바른 이메일 주소를 입력해 주세요.',
      phone: '전화번호를 입력해 주세요.',
      privacy_consent: '정보를 검토할 수 있도록 동의해 주세요.',
    },
    thanks: '정보를 잘 받았어요. 맞는 자리가 생기면 연락드릴게요.',
    failed: '문제가 생겼어요. 다시 시도해 주시거나 info@zone2hp.com으로 이메일을 보내 주세요.',
  },
};

export const careers: Record<Lang, Careers> = { en, ko };
