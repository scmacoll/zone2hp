/**
 * Open roles for /careers. Adding a role here creates its card and its page at
 * /careers/<slug>; delete the entry when the role closes.
 *
 * A role marked `draft` is built only where drafts are shown (see drafts.ts), so
 * no card and no page exist on the live site.
 */
import { showDrafts } from "./drafts";
import type { Lang } from "../i18n/lang";

export interface RoleSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

/** The words of a role, in one language. */
export interface RoleText {
  title: string;
  location: string;
  /** Employment type, for example Part-time or Contractor. */
  commitment: string;
  /** One line for the card and the meta description. */
  summary: string;
  sections: RoleSection[];
}

export interface Role extends RoleText {
  slug: string;
  draft?: boolean;
  /** Korean text for /ko/careers. Without it the Korean pages show the English. */
  ko?: RoleText;
}

/** A role's words in the given language. */
export const roleText = (role: Role, lang: Lang): RoleText =>
  lang === "ko" && role.ko ? role.ko : role;

const allRoles: Role[] = [
  {
    // Template only: shows the layout until the client supplies a real role.
    slug: "sample-chiropractor",
    title: "Chiropractor",
    location: "Eastwood, NSW",
    commitment: "Part-time",
    summary:
      "Sample role. This text shows the layout and will be replaced by the real role details.",
    draft: true,
    sections: [
      {
        heading: "About the role",
        paragraphs: [
          "Sample text. A short description of the role, the days it covers and who it works with at the clinic goes here.",
        ],
      },
      {
        heading: "What you'll do",
        items: ["Sample duty one", "Sample duty two", "Sample duty three"],
      },
      {
        heading: "About you",
        items: [
          "Current registration with the Chiropractic Board of Australia",
          "Sample requirement two",
          "Sample requirement three",
        ],
      },
      {
        heading: "What we offer",
        items: ["Sample offer one", "Sample offer two"],
      },
    ],
    ko: {
      title: "카이로프랙터",
      location: "NSW 이스트우드",
      commitment: "파트타임",
      summary: "샘플 직무예요. 레이아웃을 보여 주는 문구이며 실제 직무 정보로 바뀔 거예요.",
      sections: [
        {
          heading: "직무 소개",
          paragraphs: [
            "샘플 문구예요. 직무 설명, 근무 요일, 클리닉에서 함께 일할 사람을 여기에 적어요.",
          ],
        },
        {
          heading: "주요 업무",
          items: ["샘플 업무 1", "샘플 업무 2", "샘플 업무 3"],
        },
        {
          heading: "지원 자격",
          items: [
            "호주 카이로프랙틱 위원회(Chiropractic Board of Australia) 현재 등록",
            "샘플 자격 2",
            "샘플 자격 3",
          ],
        },
        {
          heading: "제공 사항",
          items: ["샘플 혜택 1", "샘플 혜택 2"],
        },
      ],
    },
  },
];

export const roles = allRoles.filter((role) => showDrafts || !role.draft);
