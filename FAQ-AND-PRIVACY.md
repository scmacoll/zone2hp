# FAQ, Privacy Policy and Consent — client-supplied content (2026-07-10)

Verbatim content the client emailed (from `website FAQ.docx`) to publish on the site.
Preserved here because the source docx lives outside the repo. **This is legal copy —
reproduce it faithfully; do not paraphrase, "improve", or add outcome claims.**

## How the client wants it used

- The clinic's real booking + intake + consent now happen in **Splose** (see
  `BOOKING.md` → provider direction). Splose's online **initial consult form** needs a
  **link back to this website's Privacy Policy** so patients can read it *before* they
  tick the consent box and sign online.
### Recommended structure (proposed 2026-07-16)

The client's own notes dictate the shape: the privacy page must be a **stable public URL**
(so Splose's consent form can link to it), and the data-security text is explicitly "a
separate page that can link after the one above". So:

| Route | Content | Why |
|---|---|---|
| **`/privacy`** | Section 1, Privacy Policy | The URL the Splose consent form links to. Also closes our own "a full privacy policy will be published before launch" promise. |
| **`/privacy/data-security`** | Section 2, EHR + Splose | The client's "separate page linked after" the privacy policy. |
| *(none)* | Section 3, Informed Consent | Signed **inside Splose**. Kept here as the source; no web page needed unless asked. |

**Do not build a general FAQ page yet.** The docx is titled "FAQ (section)" but contains
no actual questions and answers — it is entirely privacy/consent copy. A real FAQ (hours,
parking, fees, what to expect on a first visit) would be new content we do not have.

Also add a **"Privacy" link in the site footer** so the policy is discoverable.
- Compliance still applies to every string, but note this is factual legal/consent
  copy (risk disclosures, "no guaranteed outcome" language) — that is appropriate and
  expected here, unlike marketing copy.

---

## 1. Privacy Policy — *Privacy and Collection of Personal Information*

At Zone Two Health & Performance, we are committed to protecting your privacy and
maintaining the confidentiality of your personal and health information.

We collect information that is necessary to provide safe, effective and coordinated
healthcare. This may include your personal details, medical history, medications,
imaging reports, referral information, lifestyle factors and other health information
relevant to your care.

Your information is used to:
- assess your health and provide treatment
- develop appropriate management plans
- communicate with other healthcare providers involved in your care
- prepare reports, referral letters, medical certificates and other clinical documentation
- process health fund, Medicare, DVA, WorkCover, CTP or other insurer claims where applicable
- comply with legal and professional obligations.

Your information is stored securely using electronic practice management systems and
appropriate administrative, technical and physical safeguards. Access is limited to
authorised members of our clinical and administrative team who require the information
to perform their duties.

Your personal information will not be disclosed to another person or organisation
without your consent unless:
- disclosure is required or authorised by law;
- it is necessary to prevent a serious threat to your life, health or safety, or that of another person;
- it is required for Medicare, insurers, WorkCover, CTP, DVA or other lawful purposes directly related to your care.

You may request access to your health records or request corrections if any information
is inaccurate or incomplete, subject to applicable legislation.

By signing this form, you acknowledge that you have read and understood this Privacy
Statement and consent to Zone Two Health & Performance collecting, using, storing and
disclosing your personal information for the purposes outlined above in accordance with
the Privacy Act 1988 (Cth), the Australian Privacy Principles and the Health Records and
Information Privacy Act 2002 (NSW).

---

## 2. Electronic Health Records and Data Security (Splose)

*(A separate page that can link after the Privacy Policy for those who want more detail
on the CRM used to store data.)*

Zone Two Health & Performance uses **Splose**, a secure cloud-based practice management
system developed for Australian allied health practices, to manage patient records,
appointments, clinical documentation, correspondence, online bookings and secure patient
communications.

Splose employs industry-standard security measures to help protect patient information,
including:
- Encryption of data during transmission (SSL/TLS) and while stored (AES-256 encryption)
- Australian data hosting for Australian practices
- Regular encrypted backups with secure off-site storage
- User authentication and optional two-factor authentication (2FA)
- Role-based user permissions to restrict access to authorised staff
- Activity logs that record changes made within the system

Access to your personal information is limited to authorised members of our clinical and
administrative team who require access to provide your healthcare or perform their
professional duties.

Your personal and health information is collected, stored and managed in accordance with
the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), the Health Records
and Information Privacy Act 2002 (NSW) and our professional obligations as registered
healthcare practitioners.

While Splose provides the secure technology platform used to manage your records, Zone
Two Health & Performance remains responsible for ensuring your personal information is
handled lawfully, confidentially and only for the purposes of providing healthcare. We
will only disclose your information with your consent, where required or authorised by
law, or where necessary to protect your health or safety.

For further information about Splose's privacy and security practices, please refer to:
- **Splose Security Centre** → https://splose.com/resources/security
- **Splose Privacy Policy** → https://splose.com/privacy-policy

*(URLs researched and confirmed 2026-07-16. The client's docx listed these as bullets with
no links; use the two URLs above. Splose also publishes Terms of Service
(`/terms-of-service`) and a Cookie Policy (`/cookie-policy`) if ever needed.)*

---

## 3. Informed Consent — *Initial Consultation: Informed Consent & Conditions of Treatment*

*(Mostly handled inside Splose's online form. Kept here verbatim in case a web version is
wanted or the Splose form needs the source text.)*

**What am I signing?** Zone Two Health & Performance — Initial Consultation: Informed
Consent & Conditions of Treatment.

**Welcome.** Thank you for choosing Zone Two Health & Performance. Our goal is to provide
safe, evidence-informed and patient-centred healthcare tailored to your individual needs.
Before commencing assessment or treatment, it is important that you understand the nature
of the services we provide, the potential benefits and risks, your rights as a patient,
and your responsibilities throughout your care. Please read the following information
carefully and ask your practitioner if you have any questions before providing your consent.

**Informed Consent.** By signing this form, you acknowledge that:
- You have had the opportunity to discuss your condition, proposed assessment and treatment with your practitioner.
- The nature, purpose, expected benefits and reasonably foreseeable risks of treatment have been explained to you in a manner you understand.
- You have had the opportunity to ask questions and have received satisfactory answers.
- You understand that you may decline or withdraw consent for any examination, treatment or procedure at any time without affecting your right to receive appropriate healthcare.
- You understand that no healthcare treatment can guarantee a specific outcome or complete resolution of symptoms.

**Assessment** may include: medical history review; physical examination; postural
assessment; orthopaedic testing; neurological examination; functional movement
assessment; muscle strength and flexibility testing; range of motion assessment; balance
and coordination testing; palpation of muscles and joints; review of imaging or previous
medical reports where available.

**Treatment Options** may include one or more of: chiropractic joint manipulation or
mobilisation; soft tissue therapy; dry needling; cupping therapy; Instrument Assisted Soft
Tissue Mobilisation (IASTM); stretching techniques; rehabilitation exercises; strength and
conditioning exercises; balance and mobility training; resistance band exercises; free
weight or gym-based rehabilitation; education regarding posture, movement and
self-management; activity modification and home exercise programmes. Your treatment plan
may change as your condition progresses.

**Potential Risks.** Although every reasonable effort is made to provide safe and
appropriate care, all healthcare carries some degree of risk. Possible side effects or
complications may include, but are not limited to:
- *Chiropractic:* temporary soreness or stiffness; muscle tenderness; headache; fatigue; temporary increase in symptoms; muscle or ligament strain; joint irritation; rib irritation or fracture (rare); worsening neurological symptoms (rare); serious complications associated with spinal manipulation are extremely uncommon but have been reported in medical literature.
- *Dry Needling:* temporary discomfort; bruising; bleeding; muscle soreness; dizziness; fainting; infection; nerve irritation; very rarely, pneumothorax (collapsed lung) when treating areas near the chest or upper back.
- *Cupping:* temporary circular skin marks; bruising; tenderness; skin irritation; blistering (rare); infection (rare).
- *IASTM:* redness; bruising; petechiae; temporary soreness; temporary aggravation of symptoms.
- *Exercise Rehabilitation:* muscle soreness; fatigue; falls or loss of balance; sprains or strains; aggravation of existing symptoms; joint, muscle or tendon injury; cardiovascular events or other medical emergencies (rare).

Patients are encouraged to immediately notify their practitioner if they experience chest
pain, dizziness, unusual shortness of breath, numbness, severe pain or feel unwell during
treatment.

**Patient Responsibilities.** You agree to: provide accurate and complete information
regarding your medical history, medications, allergies and current health status; inform
your practitioner of any changes to your health (including pregnancy, surgery, illness,
injury or new medications); follow treatment recommendations where appropriate; ask
questions whenever you require clarification; inform your practitioner immediately if you
experience discomfort or wish to stop any examination or treatment.

**Privacy and Confidentiality.** Your personal and health information is collected to
provide safe and effective healthcare. Your information is securely stored using Splose,
our electronic practice management system, together with appropriate administrative,
physical and technical safeguards. It may be used for assessment and treatment, clinical
documentation, referral letters, reports to your nominated healthcare providers, Medicare/
DVA/WorkCover/CTP/private health fund claims where applicable, and other purposes directly
related to your healthcare. It will not be disclosed to third parties without your consent
unless required or authorised by law or where necessary to protect your health or safety.
Further information is available in our Privacy Policy.

**Communication Between Healthcare Providers.** Where appropriate, you consent to Zone Two
Health & Performance communicating with your GP, specialist or other healthcare
professionals involved in your care to facilitate coordinated healthcare, including
appropriate communication between practitioners where multidisciplinary services are
provided.

**Financial Responsibility.** You acknowledge that you are responsible for payment of
consultation fees at the time of your appointment unless alternative arrangements have
been agreed. Cancellation fees and clinic policies are outlined separately within our
Cancellation Policy. *(Cancellation Policy not yet supplied.)*

**Consent.** By signing below, you acknowledge that: you have read and understood this
document; you have had the opportunity to ask questions; your questions have been answered
to your satisfaction; you understand the nature, benefits and potential risks of assessment
and treatment; you voluntarily consent to examination, chiropractic treatment and other
clinically appropriate therapies recommended by your practitioner (including where
applicable spinal manipulation, mobilisation, soft tissue therapy, dry needling, cupping
therapy, IASTM and exercise rehabilitation); you understand that you may refuse or withdraw
consent at any time; you understand that no guarantee or warranty has been made regarding
the outcome of your treatment.
