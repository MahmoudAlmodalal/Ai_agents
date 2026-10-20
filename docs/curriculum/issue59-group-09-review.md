# Issue #59 — Release the complete AI implementation tools, Skills, and MCP group

**State:** Draft authoring and evidence packet. Group 09 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [AI implementation tools, Skills, and MCP fictional project outputs](samples/group-09-agent-tools-skills-mcp.md).
**Proposed boundary:** 4 Topics in AI implementation tools, Skills, and MCP. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `ai-coding-agent`

- **Suggested input / handoff:** A bounded learner task plus current project instructions; tool choice is learner-controlled and optional.
- **Objectives:** تهيئة وكيل البرمجة بسياق ملفات وقواعد المشروع وحدود المهام. / حماية الأسرار والتحقق من صلاحيات الأوامر والمخرجات قبل التنفيذ.
- **Authored learning path:** المدخل: مستودع وقواعد مكتوبة → حدود التفويض → الأسرار ليست سياقاً عاماً. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `agent-setup` — `docs/CODING_AGENT_SETUP.md` السياق والحدود والخطوات.; `safe-env` — `.env.example` و`.gitignore` مع أسماء عامة ومنع تتبع الأسرار.
- **Assessment draft:** questions `agent-q-secret`, `agent-q-scope` (two four-option questions with keyed rationales); criteria `agent-r-boundary` → `agent-setup`, `agent-r-secret` → `safe-env`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يقرأ الوكيل الملفين ويقدم مواقع الاختلاف ومقترحاً للمراجعة فقط؛ لا يحرر كل النظام ولا يطبع قيمة من `.env.local`. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Codex for Beginners](https://academy.openai.com/public/videos/codex-for-beginners-2026-04-22). OpenAI Academy: an introduction to Codex as a coding agent, for comparing a real user task with the Topic’s plan-review-run-test workflow. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `google-ai-studio`

- **Suggested input / handoff:** A small, non-sensitive task that can be tested with mock inputs; never paste secrets or real personal data.
- **Objectives:** إجراء تجربة نموذج موثقة مع تعليمات ومدخلات ومخرجات قابلة للمراجعة. / إنتاج بيانات تمثيلية JSON تطابق ERD دون خلطها ببيانات مستخدمين حقيقية.
- **Authored learning path:** المدخل: مخطط وهدف تجربة → Mock data لا بيانات حقيقية → مفتاح API منفصل. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `studio-workflow` — `docs/AI_STUDIO_WORKFLOW.md` غرض التجربة وإعداداتها والنتيجة.; `mock-data` — `src/data/mock-data.json` بيانات اصطناعية صالحة ومتوافقة مع ERD.
- **Assessment draft:** questions `aistudio-q-data`, `aistudio-q-key` (two four-option questions with keyed rationales); criteria `aistudio-r-repro` → `studio-workflow`, `aistudio-r-schema` → `mock-data`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** ثلاث سجلات بأسماء وهمية وقيم معرّفات متطابقة بين الطلب والطرفين؛ لا توجد بيانات شخصية أو قاعدة جديدة غير موجودة في ERD. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Google AI Studio for developers](https://www.youtube.com/watch?v=MjHZey2_H-o). Google for Developers: a Google AI Studio orientation candidate for trying prompts, settings, and the handoff from prototype to API work. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `agent-skills`

- **Suggested input / handoff:** A repeated, bounded workflow and validated project conventions; a Skill should be invoked only when relevant.
- **Objectives:** كتابة Skill صغيرة توجه الوكيل إلى معايير المشروع ونتيجة قابلة للمراجعة. / اختيار المهارة ذات الصلة فقط كي لا يثقل السياق بقواعد غير لازمة.
- **Authored learning path:** المدخل: قاعدة متكررة قابلة لإعادة الاستخدام → تعليمات وإشارة استخدام → فعّل عند الحاجة. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `skill-index` — `docs/PROJECT_AGENT_SKILLS.md` فهرس يشرح نطاق واستدعاء كل مهارة.; `frontend-skill` — `docs/skills/frontend-standards.md` قواعد مشروع محددة مع تحقق مقترح.
- **Assessment draft:** questions `skills-q-scope`, `skills-q-test` (two four-option questions with keyed rationales); criteria `skills-r-trigger` → `skill-index`, `skills-r-output` → `frontend-skill`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** Skill قصيرة تحدد تشغيل RTL للنص العربي وإبقاء الكود LTR وفحص التركيز المرئي. لا تحمل تفاصيل سياسة بيانات الخلفية إلى مهمة CSS. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Agent Skills: Transform Claude from Assistant to Specialized Agent](https://claude.com/resources/webinars/agent-skills-transform-claude-from-assistant-to-specialized-agent). Anthropic: a webinar candidate about turning reusable instructions and resources into specialized agent Skills. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `mcp-protocol`

- **Suggested input / handoff:** A client/host task that needs a named tool or resource; keep credentials in a local ignored secret store.
- **Objectives:** شرح أدوار host وclient وserver والعلاقة بينها في اتصال MCP. / تحديد أدوات الخادم وصلاحياته ومصادر الأسرار قبل توصيله بالوكيل.
- **Authored learning path:** المدخل: حاجة لتكامل محدد → الأدوار والرسائل → الأمان محلي أولاً. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `mcp-foundations` — `docs/MCP_FOUNDATIONS.md` تعريف الأدوار والقدرات ومسار الاتصال.; `mcp-config` — نموذج config بلا أسرار يبين الأذونات المطلوبة ومصدرها.
- **Assessment draft:** questions `mcp-q-roles`, `mcp-q-scope` (two four-option questions with keyed rationales); criteria `mcp-r-roles` → `mcp-foundations`, `mcp-r-permissions` → `mcp-config`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** الـhost يدير الواجهة، والـclient يتصل بالخادم، والخادم يعرض أدوات قراءة محددة. يمنح الوكيل صلاحية القراءة فقط إن كانت كافية للمهمة. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Why we built—and donated—the Model Context Protocol (MCP)](https://www.youtube.com/watch?v=PLyCki2K0Lg). Anthropic: a protocol-origin discussion with co-creator David Soria Parra, suitable for context on the purpose of a standard connecting AI systems to external tools and data. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Release decision for issue #59

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
