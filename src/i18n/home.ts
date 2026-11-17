// Home page copy in English and Korean. The English is the live site's copy,
// unchanged (the bio is the client's own words, reproduced verbatim). The
// Korean is our translation in the polite-warm register (해요체), awaiting
// Dr Kim's review (see KOREAN-REVIEW.md). Rendered by src/views/Home.astro.
import type { Lang } from './lang';

interface BioSection {
  quote: string;
  paras: string[];
}

const en = {
  title: 'Chiropractor Eastwood | Zone Two Health and Performance',
  description:
    'Dr Mintae Kim, Chiropractor, at Zone Two Health and Performance in Eastwood, NSW. Chiropractic care, rehabilitation and dry needling. Book online.',
  lang: {
    full: 'English',
    short: 'En',
    /** Contains the visible label, so the accessible name matches it. */
    button: 'English, change language',
  },
  login: 'Log in',
  loginLabel: 'Log in or create an account',
  bookNow: 'Book now',
  book: 'Book',
  /** "slow is <em>fast</em>" */
  slogan: ['slow is ', 'fast'] as [string, string],
  headline: ['Modern', 'Chiropractic Therapy.'] as [string, string],
  seeMore: ['See', 'more'] as [string, string],
  aboutSlogan: 'slowly is the fastest way to get to where you want to be',
  portraitAlt: 'Dr Mintae Kim, chiropractor at Zone Two Health and Performance',
  about: 'About',
  name: 'Dr Mintae Kim',
  /** Before "B.Chir.Sci., M.Chiro." */
  role: 'Chiropractor',
  /** Wrapped around the Korean word 한국어. */
  languages: ['English and ', ''] as [string, string],
  readMore: 'Read more',
  readMoreLabel: 'Read more about Dr Mintae Kim',
  bookTitle: 'Book an appointment',
  bio: [
    {
      quote: 'A different approach to chiropractic care',
      paras: [
        'At Zone Two Health and Performance in Eastwood, I believe good healthcare starts with trust.',
        "My approach goes beyond simply helping you feel better today. It's about understanding what's holding you back, helping you move forward, and giving you the confidence to keep doing the things that matter to you.",
        "Whether you're dealing with pain, recovering from an injury, or working towards better movement and performance, the goal is the same: meaningful progress that lasts.",
      ],
    },
    {
      quote: '"Change is meant to be hard, and it takes time."',
      paras: [
        'Since graduating in 2019, my approach to chiropractic care has continued to evolve.',
        'Early in my career, I was focused on understanding the "why", why people experience pain, why some problems keep returning, and why the same approach doesn\'t work for everyone.',
        'Over time, I learned that meaningful change rarely comes from a quick fix. It comes from understanding the person in front of you, building trust, and working together towards something meaningful.',
        "Trust isn't given. It's earned. That's the standard I want every person who walks through our doors to experience.",
      ],
    },
  ] as BioSection[],
  /** The rest of the bio, behind Read more. */
  bioMore: [
    {
      quote: '"We do better in circles than in rows."',
      paras: [
        'I used to believe I needed to have all the answers and that doing things alone was the best way forward.',
        'Experience taught me otherwise.',
        'Great healthcare is collaborative. It means listening, asking better questions, sharing ideas, and recognising when someone else can add value to your care.',
        "That philosophy shapes what we're building at Zone Two. Chiropractic, rehabilitation and exercise don't need to exist in isolation. When we work together and put the person at the centre of the conversation, we can make better decisions and create better outcomes.",
        'Because being a lone wolf might get you there faster, but community takes you further.',
      ],
    },
    {
      quote: '"Celebrate the small wins."',
      paras: [
        "Progress isn't always a straight line, and the biggest changes often start with small wins.",
        'Getting out of pain can be one of those wins. Moving with more confidence can be another. Returning to the gym, getting back on the field, picking up your kids, or doing something you had started avoiding can mean even more.',
        'For me, the real reward is being part of that journey.',
        "It's not just about where you are today. It's about helping you overcome setbacks, build confidence in your body, and get back to doing more of what matters to you. That's the BIG win.",
      ],
    },
    {
      quote: 'Chiropractic and rehabilitation in Eastwood',
      paras: [
        'Zone Two Health and Performance provides chiropractic care, dry needling and exercise-based rehabilitation from our clinic in Eastwood, NSW, close to Epping, West Ryde, Denistone and Marsfield. Consultations are available in English and Korean.',
        'Our approach is built around understanding you, your goals and how you move, then developing a plan to help you make meaningful progress.',
        "If that sounds like the kind of healthcare you're looking for, we'd love to meet you.",
      ],
    },
  ] as BioSection[],
};

type Home = typeof en;

const ko: Home = {
  title: '이스트우드 카이로프랙터 | Zone Two Health and Performance',
  description:
    '호주 NSW 이스트우드 Zone Two Health and Performance의 카이로프랙터 Mintae Kim 원장. 카이로프랙틱, 재활, 드라이 니들링. 한국어 진료가 가능해요. 온라인으로 예약하세요.',
  lang: {
    full: '한국어',
    short: '한',
    button: '한국어, 언어 변경',
  },
  login: '로그인',
  loginLabel: '로그인 또는 계정 만들기',
  bookNow: '지금 예약하기',
  book: '예약',
  slogan: ['느림이 곧 ', '빠름'],
  headline: ['현대적인', '카이로프랙틱 치료.'],
  seeMore: ['더', '보기'],
  aboutSlogan: '천천히 가는 것이 원하는 곳에 가장 빨리 닿는 길이에요',
  portraitAlt: 'Zone Two Health and Performance의 카이로프랙터 Mintae Kim 원장',
  about: '소개',
  name: 'Mintae Kim 원장',
  role: '카이로프랙터',
  languages: ['영어, ', ''],
  readMore: '더 읽기',
  readMoreLabel: 'Mintae Kim 원장 소개 더 읽기',
  bookTitle: '진료 예약',
  bio: [
    {
      quote: '카이로프랙틱 치료에 대한 다른 접근',
      paras: [
        '이스트우드의 Zone Two Health and Performance에서 저는 좋은 의료가 신뢰에서 시작된다고 믿어요.',
        '제 접근은 오늘 당장 조금 나아지게 돕는 데서 그치지 않아요. 무엇이 발목을 잡고 있는지 이해하고, 앞으로 나아가도록 돕고, 소중한 일들을 계속해 나갈 수 있다는 자신감을 드리는 것이에요.',
        '통증이 있든, 부상에서 회복 중이든, 더 나은 움직임과 퍼포먼스를 향해 가고 있든, 목표는 같아요. 오래 가는 의미 있는 변화예요.',
      ],
    },
    {
      quote: '"변화는 원래 어렵고, 시간이 걸려요."',
      paras: [
        '2019년에 졸업한 이후로 제 카이로프랙틱 치료 방식은 계속 발전해 왔어요.',
        "경력 초기에는 '왜'를 이해하는 데 집중했어요. 사람들은 왜 통증을 겪는지, 왜 어떤 문제는 자꾸 되풀이되는지, 왜 같은 방법이 모두에게 통하지 않는지요.",
        '시간이 지나면서, 의미 있는 변화는 빠른 해결책에서 오는 경우가 드물다는 걸 배웠어요. 눈앞의 사람을 이해하고, 신뢰를 쌓고, 의미 있는 목표를 향해 함께 나아갈 때 변화가 와요.',
        '신뢰는 주어지는 게 아니라 쌓아 가는 거예요. 저희 클리닉을 찾는 모든 분이 그 기준을 경험하셨으면 해요.',
      ],
    },
  ],
  bioMore: [
    {
      quote: '"우리는 줄지어 설 때보다 둘러앉을 때 더 잘해요."',
      paras: [
        '예전에는 제가 모든 답을 알아야 하고, 혼자 해내는 것이 가장 좋은 길이라고 믿었어요.',
        '경험은 그렇지 않다는 걸 가르쳐 줬어요.',
        '좋은 의료는 협력이에요. 잘 듣고, 더 좋은 질문을 하고, 생각을 나누고, 다른 사람이 치료에 보탬이 될 수 있을 때 그걸 알아보는 것이에요.',
        '그 철학이 Zone Two에서 저희가 만들어 가는 것의 바탕이에요. 카이로프랙틱, 재활, 운동은 따로 떨어져 있을 필요가 없어요. 함께 일하면서 대화의 중심에 사람을 두면, 더 나은 결정을 내리고 더 나은 결과를 만들 수 있어요.',
        '혼자 가면 더 빨리 갈 수 있을지 몰라도, 함께 가면 더 멀리 갈 수 있으니까요.',
      ],
    },
    {
      quote: '"작은 성취를 축하하세요."',
      paras: [
        '변화가 늘 곧은 직선으로 오지는 않아요. 큰 변화는 작은 성취에서 시작되는 경우가 많아요.',
        '통증에서 벗어나는 것도 그런 성취일 수 있어요. 더 자신 있게 움직이는 것도요. 다시 헬스장에 가고, 경기장에 돌아가고, 아이를 번쩍 안아 올리고, 피하던 일을 다시 하는 건 그보다 더 큰 의미일 수 있어요.',
        '제게 진짜 보람은 그 여정에 함께하는 거예요.',
        '오늘 어디에 있는지만의 문제가 아니에요. 어려움을 이겨 내고, 몸에 대한 자신감을 키우고, 소중한 일을 더 많이 할 수 있도록 돕는 것이에요. 그게 바로 진짜 큰 성취예요.',
      ],
    },
    {
      quote: '이스트우드의 카이로프랙틱과 재활',
      paras: [
        'Zone Two Health and Performance는 NSW 이스트우드의 클리닉에서 카이로프랙틱 치료, 드라이 니들링, 운동 기반 재활을 제공해요. 에핑, 웨스트라이드, 데니스톤, 마스필드와 가까워요. 영어와 한국어로 진료받으실 수 있어요.',
        '저희는 환자분과 목표, 그리고 움직이는 방식을 이해하는 데서 시작해, 의미 있는 변화를 만들 수 있도록 계획을 세워요.',
        '이런 의료를 찾고 계셨다면, 꼭 한번 만나 뵙고 싶어요.',
      ],
    },
  ],
};

export const home: Record<Lang, Home> = { en, ko };
