// The client's FAQ, generated from zone-two-faq.html (Oct 2026). The wording is his,
// verbatim, except: Australian spelling ("programmes"), no inline styles (the CSP
// blocks them), sub-headings as h3, and site links as paths. "Understand your
// pain" links to its post, live since Nov 2026. One answer is held back:
//   - The referral question is a draft: shown with the draft /refer page, hidden on production.
// Answers are trusted HTML from the client, rendered with set:html.

export interface FaqItem {
  question: string;
  answer: string;
  /** Open on load, as in the client's design. */
  open?: boolean;
  /** Left out of the page and the structured data on production (see drafts.ts). */
  draft?: boolean;
}

export interface FaqSection {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faq = {
  intro:
    "How we work, what it costs, health funds and Medicare, and what to do when something hurts.",
  closingTitle: "Still have a question?",
  closingText:
    "Call or text us. We're happy to talk it through before you book.",
  note: "This information is general and isn't a substitute for an individual assessment. In an emergency, call 000. Health fund and Medicare details are correct as of October 2026 and can change.",
  sections: [
    {
      id: "zone-two",
      title: "Zone Two 101",
      items: [
        {
          question:
            "What is Zone Two, and how is it different from other options?",
          answer:
            '<p>Every session is one-on-one with a registered practitioner, start to finish. There are no assistants and no cookie-cutter programmes. We start from your baseline, what your body can do today, and build it up. No sales tactics, just an honest plan.</p><p>Our approach is simple: first we get you moving, then we get you moving with purpose. The goal is to get you out of here as quickly as we can, with the strength and confidence to keep going on your own.</p><div class="pillars"><div><b>Move</b><span>Settle pain and restore movement.</span></div><div><b>Build</b><span>Raise your baseline with strength and control.</span></div><div><b>Go</b><span>Hike the mountain, run the marathon, lift the grandkids.</span></div></div>',
          open: true,
        },
        {
          question: "What is the Zone Two approach?",
          answer:
            "<p>First, we get you moving. Then we get you moving with purpose.</p><ul><li><b>Move:</b> settle pain and restore the movement you've lost.</li><li><b>Build:</b> raise your baseline with progressive strength, control and conditioning.</li><li><b>Go:</b> return to what matters to you, and keep it. The mountain hike, the marathon, the ski trip, lifting your grandkids, the bucket list.</li></ul><p>Every plan is built from your own baseline and goals, and reviewed as you progress.</p>",
        },
        {
          question: "Is your approach backed by research?",
          answer:
            '<p>Yes. We follow current clinical guidelines and high-quality research, and we update our approach as the evidence changes. For most muscle, joint and tendon problems, guidelines recommend education, staying active and progressive exercise, with hands-on care where it helps. That\'s the core of what we do.</p><p class="src">Read more in our <a href="/blog">Clinic Notes</a>, where every post links to its sources.</p>',
        },
        {
          question: "What qualifications do your practitioners have?",
          answer:
            '<p>Our chiropractors are university-qualified and registered with the Chiropractic Board of Australia through Ahpra, the national regulator. You can check any registered practitioner on the public register. As our team grows, every practitioner will hold the registration or accreditation their profession requires.</p><p class="src"><a href="https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx" target="_blank" rel="noopener">Ahpra register of practitioners</a></p>',
        },
        {
          question: "Is Zone Two a chiropractic clinic?",
          answer:
            "<p>Zone Two is an allied health clinic. Chiropractic is where we've started, and we're building a multidisciplinary team over time. Whoever you see, sessions combine hands-on treatment with exercise rehabilitation, so you leave with a plan, not just a treatment.</p>",
        },
      ],
    },
    {
      id: "getting-started",
      title: "Getting started",
      items: [
        {
          question: "What if I don't know where to start?",
          answer:
            "<p>Start with an initial consultation. We'll work out what's going on and what you need, even if that turns out to be someone else. If you're not sure whether we're the right fit, call us on <b>0450 222 122</b> and we'll talk it through.</p>",
          open: true,
        },
        {
          question: "What does a typical session include?",
          answer:
            "<p>A quick check-in on how you've been, a re-test of the things we're tracking, hands-on treatment where it helps, and exercise. You'll leave knowing what to do between sessions. It's one-on-one with your practitioner the whole time.</p>",
        },
        {
          question: "Do I get treated during my first session?",
          answer:
            "<p>Usually, yes. Your first session is 60 minutes, so there's time for a thorough assessment and treatment. If we find something that needs a GP or imaging first, we'll tell you and refer you before we start.</p>",
        },
        {
          question: "How quickly will I start to feel a difference?",
          answer:
            "<p>It depends on the problem, how long you've had it, and the work you do between sessions. We'll set realistic expectations at your first visit and track measurable progress, like strength, range and what you can do, so you can see where you're heading.</p>",
        },
        {
          question: "Can you help with my injury or condition?",
          answer:
            "<p>Active people, desk workers, weekend warriors, athletes and older adults. If it involves muscles, joints, tendons, ligaments, nerves or how you move, we can help or point you to someone who can. Consultations are available in English and Korean (한국어 상담 가능).</p>",
        },
        {
          question:
            "Is Zone Two right for me if I haven't exercised in a while?",
          answer:
            "<p>Absolutely. We start from your baseline, whatever it is, and build from there. No judgement, and no programmes that are too much too soon.</p>",
        },
        {
          question: "Is Zone Two right for me if I'm not in pain?",
          answer:
            "<p>Yes. Plenty of people come in to move better, get stronger, prepare for an event or a big trip, or check in on an old injury before it becomes a problem. Building capacity before you need it is part of the Zone Two approach.</p>",
        },
        {
          question: "How does it fit with my training?",
          answer:
            "<p>We work around your training rather than stopping it. Where possible, we modify what you do so you keep moving while you recover, and we can coordinate with your coach or trainer.</p>",
        },
        {
          question: "Will I be able to track my progress?",
          answer:
            "<p>Yes. We measure things that matter to you, like strength, range of movement, and how your body responds to activity, and re-test them regularly so you can see change over time.</p>",
        },
        {
          question: "Is it painful?",
          answer:
            "<p>Treatment is chosen for you, not taken from a template. Depending on what you need, it might include hands-on joint and soft tissue work, dry needling, and exercise rehabilitation. Exercise is the foundation of almost every plan. Nothing happens without your consent, and you can say no to any technique. Some treatment can feel uncomfortable for a moment, and we work at a pace that suits you.</p>",
        },
        {
          question: "Can I see the same practitioner each time?",
          answer:
            "<p>Yes. Continuity matters, so you'll see the same practitioner from start to finish.</p>",
        },
        {
          question: "Do I need a referral?",
          answer:
            "<p>No. Allied health practitioners like chiropractors are primary contact practitioners, so you can book directly. For problems with your muscles, joints, tendons, ligaments, nerves and how you move, we can be your first point of contact. If we find something that needs a GP, imaging or a specialist, we'll refer you and keep your doctor in the loop.</p><p>You only need a GP referral to claim under Medicare (see above) or for some WorkCover and CTP claims.</p>",
        },
        {
          question: "What should I wear?",
          answer:
            "<p>Comfortable clothes you can move and exercise in, like activewear or shorts and a t-shirt. Bring any scans or reports you have.</p>",
        },
        {
          question: "Is Zone Two suitable for all ages?",
          answer:
            "<p>We see adults of all ages, from active young people to older adults, and we also provide treatment and rehabilitation in aged care. For children and teenagers, we recommend calling us first so we can talk through what's needed.</p>",
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing, payments & booking",
      items: [
        {
          question: "How much does a session cost, and how long is it?",
          answer:
            "<ul><li><b>Initial consultation:</b> $200 (minimum 60 minutes)</li><li><b>Follow-up sessions:</b> 30, 45 or 60 minutes, depending on your condition and what you need. Your practitioner will recommend the right length and the price will be confirmed before you book.</li></ul><p>You can claim on the spot with your health fund through HICAPS.</p>",
          open: true,
        },
        {
          question: "Why are you expensive?",
          answer:
            "<p>Fair question, and yes, we're not the cheapest. That's because we focus on quality, and we care.</p><p>You get unhurried, one-on-one time with the same practitioner from start to finish: no assistants, and a plan built around you rather than a template. We take the time to get it right because your outcome matters to us.</p><p>Our aim is to get you out of here as quickly as we can, so you're not paying for sessions you don't need. If cost is a worry, tell us. We'll be upfront about what you need and what you can do on your own.</p>",
        },
        {
          question: "How many sessions will I need?",
          answer:
            "<p>It depends on you, your goals and what we find. We'll give you an honest estimate at your first visit and review it as you go. We'd rather see you fewer times and have you doing the work between sessions.</p>",
        },
        {
          question: "Do you take private health insurance?",
          answer:
            "<p>Yes. We accept all major health funds, and you can claim on the spot through HICAPS, so you only pay the gap.</p>",
        },
        {
          question: "How can I find out how much my health fund covers?",
          answer:
            '<p>It depends on your fund and your level of extras cover. Funds pay either a fixed dollar amount or a percentage back per visit, up to an annual limit. Some services share a combined limit. For example, Medibank\'s Essential Extras has a $450 limit per calendar year shared between chiropractic and physiotherapy. New policies usually have a 2-month waiting period.</p><p>The quickest way to know: call your fund or check its app and ask what you get back for the service you\'re booking. We can give you our provider number and item numbers. Claims are processed on the spot with HICAPS, so you only pay the gap.</p><p class="src">Sources: <a href="https://www.medibank.com.au/health-insurance/cover/essential-extras/" target="_blank" rel="noopener">Medibank Essential Extras</a> · <a href="https://www.privatehealth.gov.au/" target="_blank" rel="noopener">privatehealth.gov.au</a> (Australian Government)</p>',
        },
        {
          question: "When does my extras cover reset?",
          answer:
            '<p>Most major funds, including Medibank, Bupa, HCF and nib, reset extras limits on <b>1 January</b>. Some reset on <b>1 July</b> (for example ahm), and a few on your membership anniversary. Check your fund\'s app or policy summary. Unused limits don\'t roll over, so if you\'ve been putting off care, late in the year is a good time to book.</p><p class="src">Sources: <a href="https://www.medibank.com.au/health-insurance/cover/essential-extras/" target="_blank" rel="noopener">Medibank</a> (limits apply per calendar year) · <a href="https://www.finder.com.au/health-insurance/extras-cover/health-insurance-annual-benefit-limits" target="_blank" rel="noopener">Finder: when health insurance benefits reset</a></p>',
        },
        {
          question: "Which health fund is the best?",
          answer:
            '<p>There\'s no single best fund. It depends on what you use, your budget and your stage of life. We see patients from all funds and don\'t recommend one over another. To compare every Australian fund side by side, use the free Australian Government site privatehealth.gov.au. Look at the limits for the services you use, whether they\'re combined, the waiting period, and the price.</p><p class="src">Source: <a href="https://www.privatehealth.gov.au/" target="_blank" rel="noopener">privatehealth.gov.au</a>, run by the Commonwealth Ombudsman</p>',
        },
        {
          question: "Do you accept Medicare?",
          answer:
            '<p>Yes, if you have a chronic condition (one that has lasted, or is expected to last, 6 months or more) and your GP sets up a <b>GP Chronic Condition Management Plan</b> and refers you to us. This plan replaced the old GPMP/TCA ("care plan" or "CDM") from 1 July 2025.</p><ul><li><b>Sessions:</b> up to 5 Medicare-rebated allied health sessions per calendar year. That\'s 5 in total across all allied health, so if you also see a physio or podiatrist on the plan, they share the 5.</li><li><b>Rebate:</b> Medicare sets a rebate for each type of allied health service. For chiropractic, it\'s <b>$63.40</b> per session (item 10964, from 1 July 2026).</li><li>You can\'t claim Medicare and your health fund for the same session.</li></ul><p class="src">Source: <a href="https://www9.health.gov.au/mbs/fullDisplay.cfm?type=item&amp;q=10964" target="_blank" rel="noopener">MBS Online, item 10964</a> (Australian Government)</p>',
        },
        {
          question: "Do you offer packages?",
          answer:
            "<p>Yes, we do. If your practitioner recommends a course of care, package options are available. Please contact us for more information.</p>",
        },
        {
          question: "What's your cancellation policy?",
          answer:
            "<p>Life happens. Please give us at least 24 hours' notice if you need to cancel or move your appointment, so we can offer the time to someone else. Late cancellations and missed appointments incur a fee of at least $50.</p>",
        },
        {
          question: "Do you accept WorkCover or car accident (CTP) claims?",
          answer:
            "<p>Yes. We accept workers compensation (WorkCover) and CTP claims. If you have a claim, call us before your first visit with your claim number and insurer details, so we can check you have the approvals you need.</p>",
        },
      ],
    },
    {
      id: "services",
      title: "Services & more",
      items: [
        {
          question: "What services do you offer?",
          answer:
            "<ul><li>Chiropractic care: assessment and hands-on treatment</li><li>Dry needling</li><li>Soft tissue therapy</li><li>Exercise rehabilitation and strength programmes</li><li>Aged care treatment and rehabilitation</li></ul><p>Consultations are available in English and Korean (한국어 상담 가능).</p>",
          open: true,
        },
        {
          question: "I've just been injured. What should I do?",
          answer:
            '<div class="tree" aria-label="Injury decision tree"><div class="node warn"><h3>1. Any red flags?</h3><p>Can\'t put weight on it, an obvious deformity, a loud snap with immediate weakness, numbness, or a head injury.</p></div><div class="arrow"><b>Yes</b> → go to the emergency department or your GP today</div><div class="node"><h3>2. No red flags? First few days: PEACE</h3><ul><li><b>P</b>rotect: ease off what hurts for 1 to 3 days</li><li><b>E</b>levate the area above your heart</li><li><b>A</b>void anti-inflammatories and ice early on</li><li><b>C</b>ompress with a bandage to limit swelling</li><li><b>E</b>ducate yourself: active recovery beats passive</li></ul></div><div class="arrow">Then</div><div class="node"><h3>3. After that: LOVE</h3><ul><li><b>L</b>oad: return to normal activity as pain allows</li><li><b>O</b>ptimism: confidence helps recovery</li><li><b>V</b>ascularisation: pain-free cardio to boost blood flow</li><li><b>E</b>xercise: restore strength, movement and balance</li></ul></div><div class="arrow">Not improving after a week, or unsure?</div><div class="node go"><h3>4. Call us</h3><p>We\'ll assess it, tell you what\'s going on and build your plan. <b>0450 222 122</b> or <a href="/book">book online</a>.</p></div></div><p class="src">Source: Dubois B, Esculier JF. <a href="https://doi.org/10.1136/bjsports-2019-101253" target="_blank" rel="noopener">Soft-tissue injuries simply need PEACE and LOVE</a>. Br J Sports Med. 2020;54(2):72–73.</p>',
        },
        {
          question: "What are the red flags? When should I go to hospital?",
          answer:
            '<div class="tree" aria-label="Red flag decision tree"><div class="node go"><h3>Call 000 now if you have pain with:</h3><ul><li>Chest pain, or difficulty breathing</li><li>A serious accident, fall or injury</li><li>Sudden weakness or numbness in your face, arm or leg, or trouble speaking</li><li>Loss of bladder or bowel control, or numbness around the groin or buttocks</li></ul></div><div class="arrow"><b>No</b> → do any of these apply?</div><div class="node warn"><h3>See a GP or go to the emergency department today if:</h3><ul><li>The pain came on very quickly and is severe</li><li>You have a fever or feel unwell along with the pain</li><li>You can\'t walk, move or put weight on it</li><li>There\'s muscle weakness or numbness in your arms or legs</li><li>There\'s unexplained weight loss, or a history of cancer</li><li>The area looks deformed after a fall or knock</li></ul></div><div class="arrow"><b>No</b> → none of the above</div><div class="node ok"><h3>Book a musculoskeletal assessment</h3><p>Book with us, or call <b>0450 222 122</b> if you\'re not sure. For 24/7 advice from a registered nurse, call healthdirect on <b>1800 022 222</b>.</p></div></div><p class="src">Source: <a href="https://www.healthdirect.gov.au/back-pain" target="_blank" rel="noopener">Healthdirect: back pain</a> · <a href="https://www.healthdirect.gov.au/symptom-checker" target="_blank" rel="noopener">Healthdirect Symptom Checker</a> (Australian Government-funded)</p>',
        },
        {
          question: "Why am I in pain?",
          answer:
            '<p>Pain is your body\'s protection system, and it\'s rarely about one thing. The world\'s pain scientists put it this way:</p><blockquote><p>"Pain is always a personal experience that is influenced to varying degrees by biological, psychological, and social factors."</p><cite>International Association for the Study of Pain, 2020</cite></blockquote><div class="pillars"><div><b>Body</b><span>Load beyond what your tissues are ready for. Not enough strength, mobility or control, or a mobility gap that leaves a joint less stable.</span></div><div><b>Mind</b><span>Stress, worry about damage, and how much attention you pay to your body\'s early warning signs.</span></div><div><b>Life</b><span>Sleep, how much you sit and move, work demands, and support around you.</span></div></div><p>Our job is to find which of these matter most for you, then work on the ones you can change. Read more in our post <a href="/blog/understand-your-pain">Understand your pain</a>.</p><p class="src">Sources: <a href="https://www.iasp-pain.org/publications/iasp-news/iasp-announces-revised-definition-of-pain/" target="_blank" rel="noopener">IASP revised definition of pain</a> · Hartvigsen J, et al. <a href="https://doi.org/10.1016/S0140-6736(18)30480-X" target="_blank" rel="noopener">What low back pain is and why we need to pay attention</a>. Lancet. 2018;391(10137):2356–2367.</p>',
        },
        {
          question: "How much exercise and strength training should I do?",
          answer:
            '<p>The World Health Organization recommends that adults do:</p><ul><li><b>150 to 300 minutes</b> of moderate activity a week (brisk walking, cycling), or <b>75 to 150 minutes</b> of vigorous activity (running, fast swimming), or a mix</li><li><b>Strength training on 2 or more days</b> a week, working all the major muscle groups</li><li>If you\'re 65 or over: balance and strength work on <b>3 or more days</b> a week to help prevent falls</li><li>Less sitting. Break up long periods of sitting with movement.</li></ul><p>Starting from zero? Any amount is better than none. We\'ll help you find your starting point and build from there.</p><p class="src">Sources: Bull FC, et al. <a href="https://doi.org/10.1136/bjsports-2020-102955" target="_blank" rel="noopener">World Health Organization 2020 guidelines on physical activity and sedentary behaviour</a>. Br J Sports Med. 2020;54(24):1451–1462 · <a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noopener">WHO physical activity fact sheet</a> · <a href="https://www.health.gov.au/topics/physical-activity-and-exercise/physical-activity-and-exercise-guidelines-for-all-australians/for-adults-18-to-64-years" target="_blank" rel="noopener">Australian guidelines for adults</a></p>',
        },
        {
          question: "When can I return to sport?",
          answer:
            '<p>When you\'ve ticked off the criteria, not just when the calendar says so. Return to sport is a series of steps: back to training, then back to playing, then back to your best performance. Before you return, we usually look for:</p><ul><li>Full, comfortable movement</li><li>Strength close to your uninjured side (often around 90% or better)</li><li>Sport-specific drills like sprinting, cutting, jumping or throwing, without a flare-up</li><li>Feeling confident and ready</li></ul><blockquote><p>"Return to sport should be viewed as a continuum, paralleled with recovery and rehabilitation."</p><cite>Ardern et al., Br J Sports Med, 2016</cite></blockquote><p>It\'s a shared decision between you, us, and your coach or team.</p><p class="src">Source: Ardern CL, et al. <a href="https://doi.org/10.1136/bjsports-2016-096278" target="_blank" rel="noopener">2016 consensus statement on return to sport</a>. Br J Sports Med. 2016;50(14):853–864.</p>',
        },
        {
          question: "How can I refer a friend or family member?",
          answer:
            '<p><b>Give $50, get $50.</b> When a friend books and completes their first session at Zone Two with your code, they get $50 off, and you get $50 credit toward your next visit.</p><p>Get your code and see the full terms on our <a href="/refer">referral programme page</a>.</p>',
          // Shown with the draft /refer page, hidden on production until the
          // referral programme launches.
          draft: true,
        },
        {
          question: "I want to join the Zone Two team. How do I apply?",
          answer:
            "<p>We're growing into a multidisciplinary allied health team and always keen to meet great practitioners who share our values. Apply through our <a href=\"/careers\">careers page</a>, or email your CV to <b>info@zone2hp.com</b>.</p>",
        },
      ],
    },
  ],
} as const satisfies {
  intro: string;
  closingTitle: string;
  closingText: string;
  note: string;
  sections: FaqSection[];
};
