// Korean translation of faq.ts, for /ko/faq/. Register: polite-warm 해요체.
// Awaiting Dr Kim's review. Structure must stay in sync with faq.ts: same section
// ids, same item order, same `open` and `draft` flags, same HTML in every answer.
// Only text nodes and aria-label values are translated. Source citations (study
// titles, journals, link text to sources) stay in English. Internal links stay on
// the English pages except /careers, which has a Korean page.

import type { FaqItem, FaqSection } from './faq';

export const faqKo = {
  intro:
    '진료 방식, 비용, 건강보험과 메디케어, 그리고 어딘가 아플 때 해야 할 일을 안내해요.',
  closingTitle: '아직 궁금한 점이 있으신가요?',
  closingText:
    '전화나 문자 주세요. 예약하시기 전에 얼마든지 함께 이야기 나눠요.',
  note: '이 정보는 일반적인 안내이며 개인별 평가를 대신하지 않아요. 응급 상황에서는 000으로 전화하세요. 건강보험과 메디케어 관련 내용은 2026년 10월 기준이며 바뀔 수 있어요.',
  sections: [
    {
      id: 'zone-two',
      title: 'Zone Two 알아보기',
      items: [
        {
          question: 'Zone Two는 무엇이고, 다른 선택지와 무엇이 다른가요?',
          answer:
            '<p>모든 세션은 처음부터 끝까지 등록된 의료인과 1:1로 진행돼요. 보조 인력도, 누구에게나 똑같이 적용하는 획일적인 프로그램도 없어요. 지금 몸이 할 수 있는 것, 즉 현재의 기준선에서 시작해 차근차근 키워 나가요. 영업 전략 없이, 솔직한 계획만 세워요.</p><p>저희 접근은 단순해요. 먼저 움직일 수 있게 하고, 그다음 목적을 가지고 움직이게 해요. 목표는 혼자서도 계속해 나갈 근력과 자신감을 갖추고 최대한 빨리 저희 클리닉을 졸업하시는 거예요.</p><div class="pillars"><div><b>움직이기</b><span>통증을 가라앉히고 움직임을 되찾아요.</span></div><div><b>다지기</b><span>근력과 조절 능력으로 기준선을 끌어올려요.</span></div><div><b>나아가기</b><span>산에 오르고, 마라톤을 뛰고, 손주를 안아 올려요.</span></div></div>',
          open: true,
        },
        {
          question: 'Zone Two의 접근 방식은 무엇인가요?',
          answer:
            '<p>먼저 움직일 수 있게 하고, 그다음 목적을 가지고 움직이게 해요.</p><ul><li><b>움직이기:</b> 통증을 가라앉히고 잃어버린 움직임을 되찾아요.</li><li><b>다지기:</b> 점진적인 근력, 조절, 컨디셔닝 운동으로 기준선을 끌어올려요.</li><li><b>나아가기:</b> 나에게 중요한 일로 돌아가고, 그걸 계속 이어 가요. 등산, 마라톤, 스키 여행, 손주 안아 올리기, 버킷리스트까지요.</li></ul><p>모든 계획은 각자의 기준선과 목표를 바탕으로 세우고, 진행 상황에 따라 다시 점검해요.</p>',
        },
        {
          question: '연구 근거가 있는 접근인가요?',
          answer:
            '<p>네. 저희는 최신 임상 지침과 질 높은 연구를 따르고, 근거가 바뀌면 접근 방식도 함께 바꿔요. 대부분의 근육, 관절, 힘줄 문제에 대해 지침은 교육, 활동 유지, 점진적인 운동을 권하고, 도움이 되는 경우 도수 치료를 함께 권해요. 그게 저희가 하는 일의 중심이에요.</p><p class="src">자세한 내용은 <a href="/blog">클리닉 노트</a>에서 읽어 보세요. 모든 글에 출처가 연결되어 있어요.</p>',
        },
        {
          question: '의료진은 어떤 자격을 갖추고 있나요?',
          answer:
            '<p>저희 카이로프랙터는 대학에서 학위를 취득했고, 국가 규제 기관인 Ahpra를 통해 호주 카이로프랙틱 위원회(Chiropractic Board of Australia)에 등록되어 있어요. 등록된 의료인은 누구나 공개 등록부에서 확인할 수 있어요. 팀이 커지더라도 모든 의료인은 각 직종에서 요구하는 등록이나 인증을 갖출 거예요.</p><p class="src"><a href="https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx" target="_blank" rel="noopener">Ahpra register of practitioners</a></p>',
        },
        {
          question: 'Zone Two는 카이로프랙틱 클리닉인가요?',
          answer:
            '<p>Zone Two는 연합보건(allied health) 클리닉이에요. 카이로프랙틱으로 시작했고, 시간을 두고 여러 분야의 전문가로 이루어진 팀을 꾸려 가고 있어요. 어떤 의료인을 만나든 세션에서는 도수 치료와 운동 재활을 함께해요. 그래서 치료만 받고 끝나는 게 아니라 계획을 가지고 돌아가시게 돼요.</p>',
        },
      ],
    },
    {
      id: 'getting-started',
      title: '처음 오시는 분께',
      items: [
        {
          question: '어디서부터 시작해야 할지 모르겠다면요?',
          answer:
            '<p>첫 진료부터 시작하세요. 어떤 상황인지, 무엇이 필요한지 함께 알아볼게요. 그게 다른 전문가라는 결론이 나더라도요. 저희가 잘 맞을지 확신이 서지 않으면 <b>0450 222 122</b>로 전화 주세요. 함께 이야기 나눠 볼게요.</p>',
          open: true,
        },
        {
          question: '보통 세션은 어떻게 진행되나요?',
          answer:
            '<p>그동안 어떻게 지내셨는지 짧게 확인하고, 추적하고 있는 항목을 다시 검사하고, 도움이 되는 경우 도수 치료를 하고, 운동을 해요. 세션 사이에 무엇을 해야 하는지 알고 돌아가시게 돼요. 처음부터 끝까지 담당 의료인과 1:1로 진행해요.</p>',
        },
        {
          question: '첫 세션에서 바로 치료를 받나요?',
          answer:
            '<p>대부분 그래요. 첫 세션은 60분이라 꼼꼼한 평가와 치료를 할 시간이 충분해요. GP 진료나 영상 검사가 먼저 필요한 상황이라면, 시작하기 전에 말씀드리고 의뢰해 드려요.</p>',
        },
        {
          question: '얼마나 지나야 변화를 느낄 수 있나요?',
          answer:
            '<p>문제의 종류, 얼마나 오래되었는지, 세션 사이에 하는 운동에 따라 달라요. 첫 방문 때 현실적인 기대치를 함께 정하고, 근력, 가동 범위, 할 수 있는 일처럼 측정할 수 있는 진행 상황을 추적해요. 그래서 어디로 가고 있는지 직접 확인할 수 있어요.</p>',
        },
        {
          question: '제 부상이나 질환도 도움을 받을 수 있나요?',
          answer:
            '<p>활동적인 분, 사무직으로 일하는 분, 주말에 운동하는 분, 운동선수, 어르신까지 다양하게 만나요. 근육, 관절, 힘줄, 인대, 신경, 또는 움직임과 관련된 문제라면 저희가 도와드리거나, 도울 수 있는 곳을 안내해 드려요. 영어와 한국어로 상담받으실 수 있어요.</p>',
        },
        {
          question: '한동안 운동을 안 했는데 Zone Two가 맞을까요?',
          answer:
            '<p>물론이에요. 지금의 기준선이 어디든 거기서 시작해 차근차근 쌓아 가요. 판단하지 않고, 너무 이르게 너무 많이 하는 프로그램도 없어요.</p>',
        },
        {
          question: '통증이 없어도 Zone Two가 맞을까요?',
          answer:
            '<p>네. 더 잘 움직이고, 더 튼튼해지고, 대회나 큰 여행을 준비하거나, 오래된 부상이 문제가 되기 전에 점검하려고 오시는 분이 많아요. 필요해지기 전에 몸의 역량을 키워 두는 것도 Zone Two 접근 방식의 일부예요.</p>',
        },
        {
          question: '제 훈련과는 어떻게 병행하나요?',
          answer:
            '<p>훈련을 멈추기보다는 훈련에 맞춰 진행해요. 가능하면 하던 운동을 조정해 회복하는 동안에도 계속 움직일 수 있게 하고, 코치나 트레이너와도 협력할 수 있어요.</p>',
        },
        {
          question: '진행 상황을 확인할 수 있나요?',
          answer:
            '<p>네. 근력, 관절 가동 범위, 활동에 대한 몸의 반응처럼 본인에게 중요한 것을 측정하고, 정기적으로 다시 검사해서 시간에 따른 변화를 확인할 수 있게 해요.</p>',
        },
        {
          question: '치료가 아픈가요?',
          answer:
            '<p>치료는 정해진 틀에서 가져오는 게 아니라 한 분 한 분에게 맞춰 정해요. 필요에 따라 관절과 연부조직(soft tissue)에 대한 도수 치료, 드라이 니들링(dry needling), 운동 재활이 포함될 수 있어요. 운동은 거의 모든 계획의 기본이에요. 동의 없이는 어떤 것도 진행하지 않고, 어떤 기법이든 거절하실 수 있어요. 일부 치료는 잠깐 불편하게 느껴질 수 있고, 편한 속도에 맞춰 진행해요.</p>',
        },
        {
          question: '매번 같은 의료인에게 진료받을 수 있나요?',
          answer:
            '<p>네. 연속성이 중요하기 때문에 처음부터 끝까지 같은 의료인이 담당해요.</p>',
        },
        {
          question: '의뢰서(referral)가 필요한가요?',
          answer:
            '<p>아니요. 카이로프랙터 같은 연합보건 의료인은 1차 접촉 의료인(primary contact practitioner)이라서 바로 예약하실 수 있어요. 근육, 관절, 힘줄, 인대, 신경, 움직임과 관련된 문제라면 저희가 첫 번째 창구가 될 수 있어요. GP, 영상 검사, 전문의가 필요한 상황이라면 의뢰해 드리고, 주치의에게도 진행 상황을 계속 공유해요.</p><p>GP 의뢰서는 메디케어(Medicare)로 청구하실 때(위 내용 참고), 또는 일부 워크커버(WorkCover)와 CTP 청구에만 필요해요.</p>',
        },
        {
          question: '무엇을 입고 가면 되나요?',
          answer:
            '<p>운동복이나 반바지에 티셔츠처럼 움직이고 운동하기 편한 옷을 입고 오세요. 가지고 있는 영상 검사 결과나 소견서가 있으면 가져와 주세요.</p>',
        },
        {
          question: 'Zone Two는 모든 연령대가 이용할 수 있나요?',
          answer:
            '<p>활동적인 젊은 분부터 어르신까지 모든 연령대의 성인을 만나고, 노인 요양 시설(aged care)에서도 치료와 재활을 제공해요. 어린이와 청소년은 필요한 사항을 함께 이야기할 수 있도록 먼저 전화 주시기를 권해요.</p>',
        },
      ],
    },
    {
      id: 'pricing',
      title: '비용, 결제 및 예약',
      items: [
        {
          question: '세션 비용은 얼마이고, 시간은 얼마나 걸리나요?',
          answer:
            '<ul><li><b>첫 진료(초진):</b> $200 (최소 60분)</li><li><b>재진 세션:</b> 상태와 필요에 따라 30분, 45분 또는 60분이에요. 담당 의료인이 알맞은 시간을 권해 드리고, 예약 전에 비용을 확인해 드려요.</li></ul><p>HICAPS로 현장에서 바로 사설 건강보험(health fund)을 청구할 수 있어요.</p>',
          open: true,
        },
        {
          question: '왜 비싼가요?',
          answer:
            '<p>충분히 물어보실 만한 질문이에요. 네, 저희가 가장 저렴한 곳은 아니에요. 질에 집중하고, 진심으로 마음을 쓰기 때문이에요.</p><p>처음부터 끝까지 같은 의료인과 서두르지 않는 1:1 시간을 가져요. 보조 인력 없이, 정해진 틀이 아니라 본인에게 맞춘 계획으로요. 결과가 저희에게 중요하기 때문에 제대로 하는 데 시간을 들여요.</p><p>저희 목표는 최대한 빨리 클리닉을 졸업하시는 거라서, 필요 없는 세션에 비용을 쓰지 않으시도록 해요. 비용이 걱정되시면 말씀해 주세요. 무엇이 필요한지, 혼자서 할 수 있는 건 무엇인지 솔직하게 말씀드릴게요.</p>',
        },
        {
          question: '몇 번이나 받아야 하나요?',
          answer:
            '<p>본인, 목표, 그리고 평가 결과에 따라 달라요. 첫 방문 때 솔직한 예상 횟수를 알려 드리고 진행하면서 다시 점검해요. 저희는 더 적게 만나고, 세션 사이에 직접 운동하시는 쪽을 더 좋아해요.</p>',
        },
        {
          question: '사설 건강보험(private health insurance)을 받나요?',
          answer:
            '<p>네. 모든 주요 건강보험사를 받고, HICAPS로 현장에서 바로 청구할 수 있어서 본인 부담금(gap)만 내시면 돼요.</p>',
        },
        {
          question: '제 건강보험에서 얼마나 돌려받는지 어떻게 알 수 있나요?',
          answer:
            '<p>가입한 보험사와 엑스트라(extras) 플랜 등급에 따라 달라요. 보험사는 방문마다 정해진 금액이나 일정 비율을 연간 한도 안에서 돌려줘요. 일부 서비스는 한도를 함께 써요. 예를 들어 Medibank의 Essential Extras는 카이로프랙틱과 물리치료가 달력 연도 기준 $450 한도를 함께 써요. 새로 가입한 보험은 보통 2개월의 대기 기간이 있어요.</p><p>가장 빠른 방법은 보험사에 전화하거나 앱을 확인해서, 예약하려는 서비스에 대해 얼마를 돌려받는지 물어보는 거예요. 저희 제공자 번호(provider number)와 항목 번호(item number)를 알려 드릴 수 있어요. HICAPS로 현장에서 바로 청구되기 때문에 본인 부담금만 내시면 돼요.</p><p class="src">출처: <a href="https://www.medibank.com.au/health-insurance/cover/essential-extras/" target="_blank" rel="noopener">Medibank Essential Extras</a> · <a href="https://www.privatehealth.gov.au/" target="_blank" rel="noopener">privatehealth.gov.au</a> (호주 정부)</p>',
        },
        {
          question: '엑스트라(extras) 한도는 언제 초기화되나요?',
          answer:
            '<p>Medibank, Bupa, HCF, nib 등 대부분의 주요 보험사는 <b>1월 1일</b>에 엑스트라 한도가 초기화돼요. 일부는 <b>7월 1일</b>에 초기화되고(예: ahm), 몇몇은 가입 기념일에 초기화돼요. 보험사 앱이나 상품 요약서를 확인해 보세요. 쓰지 않은 한도는 다음 해로 넘어가지 않으니, 치료를 미뤄 왔다면 연말이 예약하기 좋은 때예요.</p><p class="src">출처: <a href="https://www.medibank.com.au/health-insurance/cover/essential-extras/" target="_blank" rel="noopener">Medibank</a> (한도는 달력 연도 기준으로 적용) · <a href="https://www.finder.com.au/health-insurance/extras-cover/health-insurance-annual-benefit-limits" target="_blank" rel="noopener">Finder: when health insurance benefits reset</a></p>',
        },
        {
          question: '어느 건강보험이 가장 좋은가요?',
          answer:
            '<p>누구에게나 가장 좋은 보험 하나가 있는 건 아니에요. 어떤 서비스를 쓰는지, 예산, 생애 단계에 따라 달라요. 저희는 모든 보험사의 환자분을 만나고, 특정 보험사를 추천하지 않아요. 호주의 모든 보험사를 나란히 비교하려면 호주 정부의 무료 사이트 privatehealth.gov.au를 이용하세요. 이용하는 서비스의 한도, 한도가 통합인지 여부, 대기 기간, 가격을 살펴보세요.</p><p class="src">출처: <a href="https://www.privatehealth.gov.au/" target="_blank" rel="noopener">privatehealth.gov.au</a>, 연방 옴부즈만(Commonwealth Ombudsman) 운영</p>',
        },
        {
          question: '메디케어(Medicare) 적용이 되나요?',
          answer:
            '<p>네. 만성 질환(6개월 이상 지속되었거나 지속될 것으로 예상되는 질환)이 있고, GP가 <b>GP 만성질환 관리 계획(GP Chronic Condition Management Plan)</b>을 세워 저희에게 의뢰한 경우에 해당해요. 이 계획은 2025년 7월 1일부터 기존의 GPMP/TCA("케어 플랜" 또는 "CDM")를 대체했어요.</p><ul><li><b>세션 수:</b> 달력 연도 기준으로 메디케어 환급이 되는 연합보건 세션을 최대 5회까지 받을 수 있어요. 모든 연합보건 서비스를 합쳐 총 5회라서, 같은 계획으로 물리치료사나 족부 치료사(podiatrist)도 만나고 있다면 5회를 함께 나눠 써요.</li><li><b>환급금:</b> 메디케어는 연합보건 서비스 종류마다 환급금을 정해 두고 있어요. 카이로프랙틱은 세션당 <b>$63.40</b>이에요(항목 10964, 2026년 7월 1일부터).</li><li>같은 세션에 대해 메디케어와 사설 건강보험을 동시에 청구할 수는 없어요.</li></ul><p class="src">출처: <a href="https://www9.health.gov.au/mbs/fullDisplay.cfm?type=item&amp;q=10964" target="_blank" rel="noopener">MBS Online, item 10964</a> (호주 정부)</p>',
        },
        {
          question: '패키지 상품이 있나요?',
          answer:
            '<p>네, 있어요. 담당 의료인이 일정 기간의 치료를 권하는 경우 패키지 옵션을 이용하실 수 있어요. 자세한 내용은 문의해 주세요.</p>',
        },
        {
          question: '취소 규정은 어떻게 되나요?',
          answer:
            '<p>살다 보면 그럴 수 있어요. 예약을 취소하거나 옮겨야 한다면 최소 24시간 전에 알려 주세요. 그래야 그 시간을 다른 분께 드릴 수 있어요. 늦은 취소나 예약 불참에는 최소 $50의 수수료가 부과돼요.</p>',
        },
        {
          question: '워크커버(WorkCover)나 교통사고(CTP) 청구도 받나요?',
          answer:
            '<p>네. 산재 보상(워크커버)과 CTP 청구를 받아요. 청구 건이 있다면 첫 방문 전에 청구 번호와 보험사 정보를 가지고 전화 주세요. 필요한 승인을 받으셨는지 확인해 드릴게요.</p>',
        },
      ],
    },
    {
      id: 'services',
      title: '서비스 및 기타',
      items: [
        {
          question: '어떤 서비스를 제공하나요?',
          answer:
            '<ul><li>카이로프랙틱(chiropractic) 치료: 평가와 도수 치료</li><li>드라이 니들링(dry needling)</li><li>연부조직 치료(soft tissue therapy)</li><li>운동 재활과 근력 프로그램</li><li>노인 요양(aged care) 치료와 재활</li></ul><p>영어와 한국어로 상담받으실 수 있어요.</p>',
          open: true,
        },
        {
          question: '방금 다쳤어요. 어떻게 해야 하나요?',
          answer:
            '<div class="tree" aria-label="부상 대처 순서도"><div class="node warn"><h3>1. 위험 신호(red flags)가 있나요?</h3><p>다친 곳에 체중을 실을 수 없음, 눈에 띄는 변형, 크게 뚝 하는 소리와 함께 바로 힘이 빠짐, 감각이 둔해짐, 또는 머리 부상.</p></div><div class="arrow"><b>예</b> → 오늘 응급실이나 GP를 찾아가세요</div><div class="node"><h3>2. 위험 신호가 없나요? 처음 며칠: PEACE</h3><ul><li><b>P</b>rotect(보호): 1~3일 동안은 아픈 동작을 줄여요</li><li><b>E</b>levate(올리기): 다친 부위를 심장보다 높게 올려요</li><li><b>A</b>void(피하기): 초기에는 소염제와 얼음찜질을 피해요</li><li><b>C</b>ompress(압박): 붕대로 감아 부기를 줄여요</li><li><b>E</b>ducate(알기): 수동적인 회복보다 능동적인 회복이 낫다는 걸 알아 두세요</li></ul></div><div class="arrow">그다음</div><div class="node"><h3>3. 그 후: LOVE</h3><ul><li><b>L</b>oad(부하): 통증이 허락하는 만큼 평소 활동으로 돌아가요</li><li><b>O</b>ptimism(긍정): 자신감이 회복에 도움이 돼요</li><li><b>V</b>ascularisation(혈류): 통증 없는 유산소 운동으로 혈류를 늘려요</li><li><b>E</b>xercise(운동): 근력, 움직임, 균형을 되찾아요</li></ul></div><div class="arrow">일주일이 지나도 나아지지 않거나 잘 모르겠다면?</div><div class="node go"><h3>4. 저희에게 연락하세요</h3><p>상태를 평가하고, 어떤 상황인지 설명해 드리고, 계획을 세워 드려요. <b>0450 222 122</b> 또는 <a href="/book">온라인 예약</a>.</p></div></div><p class="src">출처: Dubois B, Esculier JF. <a href="https://doi.org/10.1136/bjsports-2019-101253" target="_blank" rel="noopener">Soft-tissue injuries simply need PEACE and LOVE</a>. Br J Sports Med. 2020;54(2):72–73.</p>',
        },
        {
          question: '위험 신호는 무엇인가요? 언제 병원에 가야 하나요?',
          answer:
            '<div class="tree" aria-label="위험 신호 판단 순서도"><div class="node go"><h3>통증과 함께 다음 증상이 있다면 지금 바로 000에 전화하세요:</h3><ul><li>가슴 통증 또는 호흡 곤란</li><li>심각한 사고, 낙상 또는 부상</li><li>얼굴, 팔, 다리에 갑자기 힘이 빠지거나 감각이 없어짐, 또는 말하기 어려움</li><li>소변이나 대변을 조절하지 못함, 또는 사타구니나 엉덩이 주변의 감각 저하</li></ul></div><div class="arrow"><b>아니요</b> → 다음 중 해당하는 것이 있나요?</div><div class="node warn"><h3>다음에 해당하면 오늘 GP를 만나거나 응급실에 가세요:</h3><ul><li>통증이 매우 빠르게 시작되었고 심해요</li><li>통증과 함께 열이 나거나 몸이 안 좋아요</li><li>걷거나, 움직이거나, 체중을 실을 수 없어요</li><li>팔이나 다리에 근력 저하나 감각 저하가 있어요</li><li>원인을 알 수 없는 체중 감소가 있거나, 암 병력이 있어요</li><li>넘어지거나 부딪힌 뒤 그 부위가 변형되어 보여요</li></ul></div><div class="arrow"><b>아니요</b> → 위 항목에 모두 해당하지 않음</div><div class="node ok"><h3>근골격계 평가 예약하기</h3><p>저희에게 예약하시거나, 잘 모르겠다면 <b>0450 222 122</b>로 전화 주세요. 등록 간호사에게 24시간 상담을 받으려면 healthdirect <b>1800 022 222</b>로 전화하세요.</p></div></div><p class="src">출처: <a href="https://www.healthdirect.gov.au/back-pain" target="_blank" rel="noopener">Healthdirect: back pain</a> · <a href="https://www.healthdirect.gov.au/symptom-checker" target="_blank" rel="noopener">Healthdirect Symptom Checker</a> (호주 정부 지원)</p>',
        },
        {
          question: '왜 통증이 생기나요?',
          answer:
            '<p>통증은 몸을 지키는 보호 시스템이고, 한 가지 원인만으로 생기는 경우는 드물어요. 세계의 통증 과학자들은 이렇게 설명해요.</p><blockquote><p>"통증은 언제나 개인적인 경험이며, 생물학적, 심리적, 사회적 요인의 영향을 저마다 다른 정도로 받아요."</p><cite>International Association for the Study of Pain, 2020</cite></blockquote><div class="pillars"><div><b>몸</b><span>조직이 준비된 것보다 큰 부하. 근력, 가동성, 조절 능력이 부족하거나, 가동성의 차이로 관절이 덜 안정적인 상태.</span></div><div><b>마음</b><span>스트레스, 손상에 대한 걱정, 그리고 몸이 보내는 초기 경고 신호에 얼마나 주의를 기울이는지.</span></div><div><b>생활</b><span>수면, 앉아 있는 시간과 움직이는 양, 업무 부담, 그리고 주변의 지지.</span></div></div><p>저희가 하는 일은 이 중 무엇이 본인에게 가장 중요한지 찾고, 바꿀 수 있는 부분을 함께 다루는 거예요. 자세한 내용은 클리닉 노트의 <a href="/ko/blog/understand-your-pain">통증 이해하기</a> 글에서 읽어 보세요.</p><p class="src">출처: <a href="https://www.iasp-pain.org/publications/iasp-news/iasp-announces-revised-definition-of-pain/" target="_blank" rel="noopener">IASP revised definition of pain</a> · Hartvigsen J, et al. <a href="https://doi.org/10.1016/S0140-6736(18)30480-X" target="_blank" rel="noopener">What low back pain is and why we need to pay attention</a>. Lancet. 2018;391(10137):2356–2367.</p>',
        },
        {
          question: '운동과 근력 운동은 얼마나 해야 하나요?',
          answer:
            '<p>세계보건기구(WHO)는 성인에게 다음을 권해요.</p><ul><li>일주일에 <b>150~300분</b>의 중간 강도 활동(빠르게 걷기, 자전거 타기), 또는 <b>75~150분</b>의 고강도 활동(달리기, 빠른 수영), 또는 두 가지를 섞어서</li><li>일주일에 <b>2일 이상 근력 운동</b>, 모든 주요 근육군을 사용해서</li><li>65세 이상이라면: 낙상 예방을 위해 일주일에 <b>3일 이상</b> 균형 운동과 근력 운동</li><li>앉아 있는 시간 줄이기. 오래 앉아 있을 때는 중간중간 움직여 주세요.</li></ul><p>운동을 전혀 안 하고 있었나요? 조금이라도 하는 것이 안 하는 것보다 나아요. 시작점을 함께 찾고 거기서부터 쌓아 갈게요.</p><p class="src">출처: Bull FC, et al. <a href="https://doi.org/10.1136/bjsports-2020-102955" target="_blank" rel="noopener">World Health Organization 2020 guidelines on physical activity and sedentary behaviour</a>. Br J Sports Med. 2020;54(24):1451–1462 · <a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noopener">WHO physical activity fact sheet</a> · <a href="https://www.health.gov.au/topics/physical-activity-and-exercise/physical-activity-and-exercise-guidelines-for-all-australians/for-adults-18-to-64-years" target="_blank" rel="noopener">Australian guidelines for adults</a></p>',
        },
        {
          question: '언제 스포츠에 복귀할 수 있나요?',
          answer:
            '<p>달력이 정해 주는 날이 아니라, 기준을 충족했을 때예요. 스포츠 복귀는 여러 단계로 이루어져요. 훈련 복귀, 그다음 경기 복귀, 그다음 예전 경기력 되찾기로요. 복귀하기 전에 보통 다음을 확인해요.</p><ul><li>불편함 없이 완전하게 움직일 수 있음</li><li>다치지 않은 쪽에 가까운 근력(보통 90% 정도 이상)</li><li>전력 질주, 방향 전환, 점프, 던지기 같은 종목별 동작을 해도 증상이 다시 심해지지 않음</li><li>자신감이 있고 준비가 되었다는 느낌</li></ul><blockquote><p>"스포츠 복귀는 회복 및 재활과 나란히 이어지는 하나의 연속 과정으로 봐야 해요."</p><cite>Ardern et al., Br J Sports Med, 2016</cite></blockquote><p>복귀는 본인, 저희, 그리고 코치나 팀이 함께 내리는 결정이에요.</p><p class="src">출처: Ardern CL, et al. <a href="https://doi.org/10.1136/bjsports-2016-096278" target="_blank" rel="noopener">2016 consensus statement on return to sport</a>. Br J Sports Med. 2016;50(14):853–864.</p>',
        },
        {
          question: '친구나 가족을 어떻게 추천할 수 있나요?',
          answer:
            '<p><b>$50 드리고, $50 받으세요.</b> 친구가 추천 코드로 Zone Two에 예약하고 첫 세션을 마치면, 친구는 $50 할인을 받고 추천하신 분은 다음 방문 때 쓸 수 있는 $50 크레딧을 받아요.</p><p>코드 받기와 전체 약관은 <a href="/refer">친구 추천 프로그램 페이지</a>에서 확인하세요.</p>',
          // Shown with the draft /refer page, hidden on production until the
          // referral programme launches. Keep in sync with faq.ts.
          draft: true,
        },
        {
          question: 'Zone Two 팀에 합류하고 싶어요. 어떻게 지원하나요?',
          answer:
            '<p>저희는 여러 분야가 함께하는 연합보건 팀으로 성장하고 있고, 같은 가치를 나누는 좋은 의료인을 언제나 만나고 싶어요. <a href="/ko/careers">채용 페이지</a>를 통해 지원하시거나, <b>info@zone2hp.com</b>으로 이력서를 보내 주세요.</p>',
        },
      ],
    },
  ],
} as const satisfies {
  intro: string;
  closingTitle: string;
  closingText: string;
  note: string;
  // Readonly, so the `as const` arrays type-check (the mutable FaqSection[] in
  // faq.ts fails TS4104 under tsc).
  sections: readonly (Omit<FaqSection, 'items'> & { items: readonly FaqItem[] })[];
};
