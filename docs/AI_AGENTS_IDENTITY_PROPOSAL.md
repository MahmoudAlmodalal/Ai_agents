# Ai_agents identity proposal

**Status: APPROVED by the course owner on 2026-10-20** (MahmoudAlmodalal; DEC-50 / owner decision package v2, Course-owner decisions section - [`docs/edu-review/owner-decision-package-70.md`](edu-review/owner-decision-package-70.md)). The visual direction, vector mark, color palette, typography, and entry/reader treatment below are confirmed as the final Ai_agents identity for the landing page, the shared navigation, and the Topic reader. Decision 5 (self-hosting the font files) remains deferred to the offline follow-up and is not part of this approval.

## Direction

Ai_agents should feel like a calm, practical engineering workshop: clear Arabic reading, compact technical details, and one bright signal color for the next action. The wordmark remains **Ai_agents**. A small branching-node mark suggests multiple agents contributing to one system without turning the interface into a character or an AI illustration.

The current vector candidate is [ai-agents-mark.svg](../public/ai-agents-mark.svg). It places three connected nodes on an A-shaped path inside an ink tile, using indigo and lime to distinguish the branches.

## Palette

| Use | Candidate | Hex |
| --- | --- | --- |
| Main ink | Dark green-black | `#17231F` |
| Light canvas | Warm porcelain | `#F5F5F0` |
| Main interaction | Indigo | `#5547D8` |
| Signal accent | Lime | `#C7F36B` |
| Supporting text | Soft green-gray | `#52635B` |
| Surface border | Quiet gray-green | `#D9DED7` |
| Dark canvas | Deep ink | `#101613` |
| Dark surface | Raised ink | `#151D19` |

Indigo carries links and primary actions on light screens. Lime appears as a small signal and becomes the high-contrast accent on dark screens. Publication, review, warning, and success colors keep their separate meanings.

## Type

- **IBM Plex Sans Arabic** carries Arabic reading and interface labels.
- **Manrope** carries the Latin Ai_agents wordmark and short English interface labels.
- **JetBrains Mono** remains limited to code, technical values, and identifiers.

The existing system fallback stack keeps content readable if the remote font stylesheet is unavailable. Hosting font files locally is a separate follow-up decision for the offline pass.

## Entry and reader treatment

The homepage introduces the learning outcome in one sentence, leads to topic 01, offers a separate quick preview, and links to the proposed project path. Its sample card shows topic 01’s real title, goal, and first output. The facts identify all 58 topics as available and describe the 19 groups as proposals.

The shared navigation, topic index controls, footer, home and page metadata use the candidate wordmark and palette. Reader headers inherit the same surfaces and typography through the shared `learning-reader-header` class; global content styles keep Arabic prose, LTR technical values, focus indicators, and both themes legible.

Visual evidence for the integrated candidate is pending. Screenshots and browser claims from the earlier checkpoint are not carried forward as evidence for this revision. The review will record hydrated views at 390, 768, 1024, 1366, and 1440 CSS pixels in both themes, including reader/quiz, dashboard, prompt editing, navigation, and preview states; RTL prose and LTR technical content; and keyboard focus and drawer behavior. Until that matrix is captured against the exact candidate build, responsive and interaction results remain **Not Run**. The source currently sets navigation and reader controls to a minimum 44-pixel target, which still requires rendered confirmation.

## Course-owner decisions record (2026-10-20, package 70)

1. **Approved:** The three-node A mark `public/ai-agents-mark.svg` as the platform symbol and favicon.
2. **Approved:** The ink (`#17231F`), porcelain (`#F5F5F0`), indigo (`#5547D8`), and lime (`#C7F36B`) palette, including dark canvas (`#101613`) and dark surface (`#151D19`) token mappings.
3. **Approved:** IBM Plex Sans Arabic for Arabic prose, Manrope for Latin Ai_agents wordmark and labels, and JetBrains Mono for code and technical identifiers.
4. **Approved:** The Arabic positioning line **“فكّر بوضوح. ابنِ بثقة.”** and the topic-first homepage hierarchy.
5. **Deferred:** Deciding whether font files should be self-hosted is deferred to the offline follow-up. The remote Google Fonts stylesheet and font binaries are cross-origin and are not covered by the same-origin service-worker cache, so offline reading relies on the system fallback stack.

Per DEC-50 and Course Owner Decision Package 70 (v2, 2026-10-20, Course-owner decisions section), this identity supersedes the prior MET Academy branding and colors across all surfaces, navigation, reader tools, and metadata.

