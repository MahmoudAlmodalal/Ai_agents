# Issue #59 — Release the complete AI implementation tools, Skills, and MCP group

**State:** Evidence complete and awaiting course-owner sign-off.
**Scope:** Group 09 — AI implementation tools, Skills, and MCP (4 canonical Topics).
**Review Date:** 2026-10-20
**Reviewer:** Educational Curriculum Reviewer (root / independent walkthrough)

---

## 1. Executive Summary & Group Status

This review packet provides the complete, audited educational evidence for **Group 09: AI implementation tools, Skills, and MCP** across its four canonical Topics:
1. `ai-coding-agent` (Sequence Position 24)
2. `google-ai-studio` (Sequence Position 25)
3. `agent-skills` (Sequence Position 26)
4. `mcp-protocol` (Sequence Position 27)

### Group Boundary & Policy Integrity
- **Boundary & Scope:** All 4 Topics preserve their canonical slugs, positions (24–27), titles, and learning sequence. No foundational Topics were added, and no existing Topic was altered in scope. Total curriculum scope remains exactly 58 canonical Topics.
- **Prerequisites as Guidance:** Prerequisites are explicitly presented as non-blocking educational guidance. Earlier phases (Topics 01–23) were conducted analytically and visually without requiring AI agent or MCP installations. No Topic is locked behind a prerequisite.
- **BorrowHub Case Study:** BorrowHub is maintained strictly as an optional case study; all exercises, practical steps, prompts, and rubric criteria are applicable directly to the learner's own project.
- **Directionality & Styling:** All learner-facing prose is Arabic (RTL) with LTR technical text, code snippets, configuration templates, and terminal commands.
- **DEC-50 Compliance:** Legacy brand references (سلاح العصر) have been replaced with the approved product name **Ai_agents** in group lesson text (`src/data/topics/wave2/t09-execution-tools.ts`) and test suites (`e2e/path/execution-tools.spec.ts`).
- **Review State & Hash Baseline:** The review state remains `draft` in the data model; per-Topic fields (`reviewState`, `lessonReviewEvidence`, `quizReviewEvidence`, `rubricReviewEvidence`) are untouched, awaiting the orchestrator's central state flip. `src/data/learning/group-a-09-agent-tools-skills-mcp.ts` preserves its byte-for-byte baseline integrity.
- **Video Resources:** All external video resources are documented as **candidates** with discovery evidence. No claim of verified playback, captions, or accessibility is made; owner approval remains pending.

---

## 2. Topic-by-Topic Walkthrough & Evaluation

### Topic 24: `ai-coding-agent` (وكيل البرمجة بالذكاء الاصطناعي)

- **Input / Context:** Student project workspace following prototype sign-off (Topic 23), PRD (`docs/PRD.md`), and Design Tokens (`DESIGN.md`).
- **Prerequisites:** Guided review of previous analytical topics; no coding agent was required in Topics 01–23. Non-blocking.
- **Learning Objectives:**
  - `agent-objective-context`: تهيئة وكيل البرمجة بسياق ملفات وقواعد المشروع وحدود المهام. [Passed]
  - `agent-objective-safety`: حماية الأسرار والتحقق من صلاحيات الأوامر والمخرجات قبل التنفيذ. [Passed]
- **Authored Learning Path & Explanations:**
  - *المدخل: مستودع وقواعد مكتوبة:* Establishing that coding agents act as executors guided by specs, not initial discoverers. [Passed]
  - *حدود التفويض:* Read/Write/Execute tiering; blocking destructive terminal commands (`rm -rf`, `DROP TABLE`, `git push --force`). [Passed]
  - *الأسرار ليست سياقاً عاماً:* Isolating `.env.local`, creating `.env.example`, preventing secrets in prompts or commits. [Passed]
- **Worked Example (Optional Case Study):**
  - *Title:* مهمة مراجعة وثائق
  - *Context:* يطلب مطور من وكيل تلخيص تضارب بين PRD وSRS.
  - *Result:* يقرأ الوكيل الملفين ويقدم مواقع الاختلاف ومقترحاً للمراجعة فقط؛ لا يحرر كل النظام ولا يطبع قيمة من `.env.local`. [Passed]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* اكتب إعداد الوكيل: سياق الملفات، قواعد الجودة، نطاق الصلاحية، والأوامر المسموحة والمراجعة المطلوبة.
     *Expected Output:* `docs/CODING_AGENT_SETUP.md` يشرح إعداداً لا يعتمد على وكيل مدفوع بعينه. [Passed]
  2. *Step 2:* راجع ملفات البيئة والتجاهل دون كشف أي قيمة سرية، ثم سجل استعادة/تراجع آمنة.
     *Expected Output:* `.env.example` بلا أسرار و`.gitignore` يحمي الملفات المحلية. [Passed]
- **Declared Practical Outputs:**
  - `agent-setup`: `docs/CODING_AGENT_SETUP.md` السياق والحدود والخطوات. [Passed]
  - `safe-env`: `.env.example` و`.gitignore` مع أسماء عامة ومنع تتبع الأسرار. [Passed]
- **Sample Output Produced:**
  ```markdown
  # Coding Agent Setup & Safety Guardrails
  - Tool Choice: Learner-selected (Antigravity IDE / Cursor / Claude Code / Aider)
  - Permissions: Read: project root only | Write: diff inspection before commit | Execute: safe commands only
  - Blocked commands: rm -rf, DROP, git push -f, npm publish
  - Secrets: .env.local in .gitignore; placeholder keys documented in .env.example
  ```
- **Objective Questions Review:**
  - `agent-q-secret` (Objective: `agent-objective-safety`):
    - *Prompt:* ما القيمة الصحيحة في ملف `.env.example` الملتزم بالمستودع؟
    - *Options:* [1. مفتاح API الحقيقي, 2. اسم المتغير مع placeholder واضح، لا سر فعلي, 3. نسخة من متغير الإنتاج, 4. كلمة مرور المطور]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* ملف المثال يوضح أسماء الإعدادات دون كشف اعتماد فعلي. [Passed]
  - `agent-q-scope` (Objective: `agent-objective-context`):
    - *Prompt:* أي طلب يعطي الوكيل عملاً يمكن مراجعته بأمان؟
    - *Options:* [1. أعد كتابة التطبيق كله وارفعه إلى الإنتاج, 2. راجع ملفين محددين واعرض فرقاً مقترحاً دون نشر, 3. احذف أي ملف قديم, 4. غيّر كل الإعدادات تلقائياً]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* النطاق المحدد والمخرج القابل للمراجعة يقللان الأثر ويكشفان هل فهم الوكيل المطلوب. [Passed]
- **Checklist & Rubric Criteria:**
  - `agent-r-boundary` (Output: `agent-setup`): الإعداد يحدد السياق والأذونات والمراجعة ومتى يتوقف الوكيل. [Passed]
  - `agent-r-secret` (Output: `safe-env`): ملف المثال لا يحمل سرّاً حقيقياً والملفات المحلية مستبعدة. [Passed]
- **External Video Candidate:**
  - *Title:* Codex for Beginners
  - *URL:* `https://academy.openai.com/public/videos/codex-for-beginners-2026-04-22`
  - *Source:* OpenAI Academy
  - *Discovery Evidence:* Covers setup and agentic software workflows. Vendor-specific; playback, captions, and accessibility remain unverified. Status: Candidate.
- **Gaps & Corrections:** Verified and updated product branding in surrounding prose.

---

### Topic 25: `google-ai-studio` (استخدام Google AI Studio)

- **Input / Context:** Approved schema in `docs/ERD.md`, screen list in `docs/SCREEN_INVENTORY.md`, free Google account.
- **Prerequisites:** Entity-relationship modeling (Topic 14) and coding agent setup (Topic 24). Guidance only; non-blocking.
- **Learning Objectives:**
  - `aistudio-objective-test`: إجراء تجربة نموذج موثقة مع تعليمات ومدخلات ومخرجات قابلة للمراجعة. [Passed]
  - `aistudio-objective-data`: إنتاج بيانات تمثيلية JSON تطابق ERD دون خلطها ببيانات مستخدمين حقيقية. [Passed]
- **Authored Learning Path & Explanations:**
  - *المدخل: مخطط وهدف تجربة:* Placing AI Studio at implementation time to test prompts without early-stage distraction. [Passed]
  - *Mock data لا بيانات حقيقية:* Generating schema-compliant JSON mock data; distinguishing JSON syntactic validity from schema compliance. [Passed]
  - *مفتاح API منفصل:* Safe key storage in `.env.local` without `NEXT_PUBLIC_` prefix; server-side usage only. [Passed]
- **Worked Example (Optional Case Study):**
  - *Title:* بيانات استعارة اصطناعية
  - *Context:* ERD يتضمن طالباً ومعدة وطلباً مع مفاتيح مرجعية.
  - *Result:* ثلاث سجلات بأسماء وهمية وقيم معرّفات متطابقة بين الطلب والطرفين؛ لا توجد بيانات شخصية أو قاعدة جديدة غير موجودة في ERD. [Passed]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* سجل الهدف والتعليمات والنموذج والإعدادات المرئية والنتيجة التي تريد اختبارها.
     *Expected Output:* `docs/AI_STUDIO_WORKFLOW.md` يحفظ خطوات قابلة للتكرار دون قيمة مفتاح. [Passed]
  2. *Step 2:* اطلب بيانات اصطناعية قليلة وافحص JSON ثم قارن كل حقل وعلاقة بERD.
     *Expected Output:* `src/data/mock-data.json` بيانات اختبارية متوافقة وموسومة بأنها غير حقيقية. [Passed]
- **Declared Practical Outputs:**
  - `studio-workflow`: `docs/AI_STUDIO_WORKFLOW.md` غرض التجربة وإعداداتها والنتيجة. [Passed]
  - `mock-data`: `src/data/mock-data.json` بيانات اصطناعية صالحة ومتوافقة مع ERD. [Passed]
- **Sample Output Produced:**
  ```json
  [
    {
      "id": "eq-mock-01",
      "name": "Sony Alpha A7 IV",
      "category": "Cameras",
      "status": "AVAILABLE",
      "dailyRate": 150
    }
  ]
  ```
- **Objective Questions Review:**
  - `aistudio-q-data` (Objective: `aistudio-objective-data`):
    - *Prompt:* أعاد النموذج JSON صالح النحو لكنه يستخدم حقل `pickup_deadline` غير موجود في ERD. ما النتيجة؟
    - *Options:* [1. البيانات متوافقة لأنها JSON صالح, 2. تحتاج مطابقة المخطط؛ صحة النحو لا تثبت مطابقة النموذج, 3. نضيف الحقل إلى الإنتاج تلقائياً, 4. نستخدم بيانات حقيقية]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* يجب التحقق من البنية والحقول والعلاقات مقابل المصدر، لا من قابلية تحليل JSON وحدها. [Passed]
  - `aistudio-q-key` (Objective: `aistudio-objective-test`):
    - *Prompt:* أين توثق API key في سير العمل التعليمي؟
    - *Options:* [1. في المستودع كي يتكرر الاختبار, 2. تذكر طريقة الإعداد واسم المتغير دون نشر القيمة السرية, 3. في سجل المخرجات, 4. داخل بيانات mock]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* إمكانية التكرار لا تبرر كشف السر؛ وثق selector/الإعداد دون القيمة. [Passed]
- **Checklist & Rubric Criteria:**
  - `aistudio-r-repro` (Output: `studio-workflow`): الهدف والتعليمات والإعدادات والنتيجة موثقة بما يكفي للفهم. [Passed]
  - `aistudio-r-schema` (Output: `mock-data`): JSON قابل للقراءة وحقوله وعلاقاته تطابق ERD والبيانات اصطناعية. [Passed]
- **External Video Candidate:**
  - *Title:* Google AI Studio for developers
  - *URL:* `https://www.youtube.com/watch?v=MjHZey2_H-o`
  - *Source:* Google for Developers
  - *Discovery Evidence:* Quickstart video for prompts, structured output, and API handoff. Status: Candidate.
- **Gaps & Corrections:** None in learning draft. Verified rate limit and mock-data isolation warnings.

---

### Topic 26: `agent-skills` (المهارات المخصصة - Skills)

- **Input / Context:** Configured coding agent, PRD requirements, Design System tokens.
- **Prerequisites:** Coding Agent setup (Topic 24). Grill Me in Topic 02 was an interview pattern, not a technical skill prerequisite. Non-blocking.
- **Learning Objectives:**
  - `skills-objective-instructions`: كتابة Skill صغيرة توجه الوكيل إلى معايير المشروع ونتيجة قابلة للمراجعة. [Passed]
  - `skills-objective-selection`: اختيار المهارة ذات الصلة فقط كي لا يثقل السياق بقواعد غير لازمة. [Passed]
- **Authored Learning Path & Explanations:**
  - *المدخل: قاعدة متكررة قابلة لإعادة الاستخدام:* Defining reusable procedural knowledge vs. one-off prompts. [Passed]
  - *تعليمات وإشارة استخدام:* Golden Rule formulation: "Agent ينفّذ، Skill يرشده، MCP يوصله بالأدوات، وPRD يحدد المطلوب". [Passed]
  - *فعّل عند الحاجة:* Avoiding "Skill Bloat", context window pollution, and outdated rule conflicts. [Passed]
- **Worked Example (Optional Case Study):**
  - *Title:* معايير واجهة RTL
  - *Context:* الفريق يكرر طلب واجهات Next.js عربية بأزرار قابلة للوحة المفاتيح.
  - *Result:* Skill قصيرة تحدد تشغيل RTL للنص العربي وإبقاء الكود LTR وفحص التركيز المرئي. لا تحمل تفاصيل سياسة بيانات الخلفية إلى مهمة CSS. [Passed]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* اكتب وصف المهارة ومعايير الواجهة أو المشروع ونطاق المهام التي تغطيها.
     *Expected Output:* `docs/PROJECT_AGENT_SKILLS.md` يشرح المهارات ومتى يستدعي كل منها. [Passed]
  2. *Step 2:* أضف Skill فرعية للمعايير الأكثر تكراراً واختبرها بطلب صغير يقتضي القاعدة.
     *Expected Output:* `docs/skills/frontend-standards.md` يتضمن تعليمات قابلة للمراجعة لا سيرة عامة. [Passed]
- **Declared Practical Outputs:**
  - `skill-index`: `docs/PROJECT_AGENT_SKILLS.md` فهرس يشرح نطاق واستدعاء كل مهارة. [Passed]
  - `frontend-skill`: `docs/skills/frontend-standards.md` قواعد مشروع محددة مع تحقق مقترح. [Passed]
- **Sample Output Produced:**
  ```markdown
  ---
  name: frontend-standards
  description: Project frontend rules for Next.js 15, React 19, Tailwind RTL.
  ---
  1. Next.js 15 App Router; default to Server Components.
  2. Logical Tailwind utilities (ms-*, me-*, ps-*, pe-*).
  3. Strict TypeScript with explicit interfaces.
  4. Type-check with tsc --noEmit after edits.
  ```
- **Objective Questions Review:**
  - `skills-q-scope` (Objective: `skills-objective-selection`):
    - *Prompt:* طلب المهمة متعلق بمخطط PostgreSQL، لكن Skill الوحيدة لديك تخص CSS. ماذا تفعل؟
    - *Options:* [1. تحملها رغم عدم الصلة, 2. تختار إرشادات قاعدة البيانات المناسبة أو تنفذ دون Skill غير ملائمة, 3. تطلب من Skill تعديل ألوان المخطط, 4. تدمج كل المهارات في prompt]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* تفعيل المهارات بحسب الحاجة يقلل الضوضاء ويمنع تحميل توجيهات لا تخص المهمة. [Passed]
  - `skills-q-test` (Objective: `skills-objective-instructions`):
    - *Prompt:* كيف تعرف أن Skill مفيدة وقابلة للتطبيق؟
    - *Options:* [1. اسمها يبدو احترافياً, 2. لها مشغل واضح ومدخلات وقواعد ومخرج يمكن فحصه بطلب صغير, 3. طويلة جداً, 4. تحتوي كل الملفات]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* نطاق الاستخدام والمخرجات القابلة للتحقق هي ما يسمح بتقييم التعليمات. [Passed]
- **Checklist & Rubric Criteria:**
  - `skills-r-trigger` (Output: `skill-index`): كل Skill لها مهمة ونطاق واضحان ولا تحمل كل سياق المشروع. [Passed]
  - `skills-r-output` (Output: `frontend-skill`): التعليمات لها مخرج أو فحص يمكن للمراجع ملاحظته. [Passed]
- **External Video Candidate:**
  - *Title:* Agent Skills: Transform Claude from Assistant to Specialized Agent
  - *URL:* `https://claude.com/resources/webinars/agent-skills-transform-claude-from-assistant-to-specialized-agent`
  - *Source:* Anthropic Webinar
  - *Discovery Evidence:* Webinar exploring filesystem-based agent skills. Registration requirements and playback unverified. Status: Candidate.
- **Gaps & Corrections:**
  - *Gap:* Section 1 heading in `src/data/topics/wave2/t09-execution-tools.ts` contained "سلاح العصر".
  - *Correction:* Replaced with "Ai_agents" (`1. القاعدة الذهبية لمسار Ai_agents`) per DEC-50. Corresponding test updated.

---

### Topic 27: `mcp-protocol` (بروتوكول سياق النموذج - MCP)

- **Input / Context:** Configured coding agent, Node.js/npx, upcoming integration requirements (Stitch MCP in Topic 28).
- **Prerequisites:** Topics 01–26 functioned completely without MCP; MCP is introduced here as an architectural standard prior to tool integrations. Non-blocking.
- **Learning Objectives:**
  - `mcp-objective-roles`: شرح أدوار host وclient وserver والعلاقة بينها في اتصال MCP. [Passed]
  - `mcp-objective-safety`: تحديد أدوات الخادم وصلاحياته ومصادر الأسرار قبل توصيله بالوكيل. [Passed]
- **Authored Learning Path & Explanations:**
  - *المدخل: حاجة لتكامل محدد:* Need-based integration rather than arbitrary MCP installation. [Passed]
  - *الأدوار والرسائل:* Three-tier architecture (Host, Client, Server) and three primitives (Tools, Resources, Prompts). [Passed]
  - *الأمان محلي أولاً:* Local JSON config isolation, least-privilege tool grants, and manual export fallback if MCP is unavailable. [Passed]
- **Worked Example (Optional Case Study):**
  - *Title:* قراءة شاشة تصميم
  - *Context:* مضيف الوكيل يحتاج قراءة معرفات شاشات من خادم تصميم.
  - *Result:* الـhost يدير الواجهة، والـclient يتصل بالخادم، والخادم يعرض أدوات قراءة محددة. يمنح الوكيل صلاحية القراءة فقط إن كانت كافية للمهمة. [Passed]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* ارسم مكونات MCP المطلوبة لتكامل تجريبي واكتب تبادل الأدوار والقدرات التي تحتاجها فقط.
     *Expected Output:* `docs/MCP_FOUNDATIONS.md` يشرح host/client/server والقدرات المطلوبة. [Passed]
  2. *Step 2:* اكتب إعداداً نموذجياً بلا أسرار حقيقية مع قائمة صلاحيات ونطاق ومخاطر.
     *Expected Output:* نموذج config محلي بعناصر placeholder وملاحظة أنه لا يرفع للمستودع. [Passed]
- **Declared Practical Outputs:**
  - `mcp-foundations`: `docs/MCP_FOUNDATIONS.md` تعريف الأدوار والقدرات ومسار الاتصال. [Passed]
  - `mcp-config`: نموذج config بلا أسرار يبين الأذونات المطلوبة ومصدرها. [Passed]
- **Sample Output Produced:**
  ```json
  {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
      }
    }
  }
  ```
- **Objective Questions Review:**
  - `mcp-q-roles` (Objective: `mcp-objective-roles`):
    - *Prompt:* أي وصف يميز أطراف اتصال MCP؟
    - *Options:* [1. Host يضم الوكيل، client يتصل، server يعرض قدرات, 2. Server هو المتصفح دائماً, 3. Client هو قاعدة البيانات فقط, 4. الأدوار أسماء لنفس العملية]
    - *Key:* Option 1 (Index 0).
    - *Rationale:* توزيع الأدوار يساعد على فهم أين تعمل التجربة وأين ينفذ الاتصال وأين تعرض الأدوات أو الموارد. [Passed]
  - `mcp-q-scope` (Objective: `mcp-objective-safety`):
    - *Prompt:* مهمة القراءة لا تحتاج أي تعديل. أي صلاحية تراجع أولاً؟
    - *Options:* [1. منح كتابة عامة لكل الأدوات, 2. اختيار قدرة القراءة المحددة وتقليل الأذونات, 3. نسخ المفتاح إلى prompt, 4. تفعيل كل خادم في الجهاز]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* تحديد الحاجة وأقل صلاحية لازمة يحدان من أثر التكامل. [Passed]
- **Checklist & Rubric Criteria:**
  - `mcp-r-roles` (Output: `mcp-foundations`): الوثيقة تشرح host وclient وserver وقدرات كل طرف. [Passed]
  - `mcp-r-permissions` (Output: `mcp-config`): الإعداد بلا سر فعلي والصلاحية متناسبة مع المهمة. [Passed]
- **External Video Candidate:**
  - *Title:* Why we built—and donated—the Model Context Protocol (MCP)
  - *URL:* `https://www.youtube.com/watch?v=PLyCki2K0Lg`
  - *Source:* Anthropic / YouTube
  - *Discovery Evidence:* Discussion between Stuart Ritchie and co-creator David Soria Parra on MCP's open standard architecture. Status: Candidate.
- **Gaps & Corrections:** None in learning draft. Protocol evolution and security review boundaries confirmed.

---

## 3. Browser Journey & Observability Matrix

The browser verification suite (`e2e/path/execution-tools.spec.ts`) covers the entire learning journey for Group 09:

| Journey Element | Expected Observable Behavior | Verification State |
| :--- | :--- | :--- |
| **Section Rendering** | All 4 Topics render article headings, body content, SVG diagrams, and `.learning-activities` sections. | **Passed** |
| **Learning Objectives** | Clear objectives with stable IDs visible in reader. | **Passed** |
| **Practical Steps & Outputs** | Sequenced steps with explicit expected outputs displayed and findable. | **Passed** |
| **Code & Config Copying** | Copy buttons on `.code-container` copy config/prompts and display visual feedback (`تم النسخ`). | **Passed** |
| **Quiz Grading & Feedback** | Submitting answers computes points (1 pt correct, 0 incorrect/unanswered), displays detailed feedback and explanation. | **Passed** |
| **Quiz Retries & Persistence** | Resetting quiz via `إعادة المحاولة` updates attempt history; latest score survives page reloads. | **Passed** |
| **Rubric Selection & Reversal** | Dropdown choices (`ready-for-review`, `in-progress`) persist across reloads; clearing rating (`لم أحدد تقييماً`) survives reloads. | **Passed** |
| **RTL / LTR Rendering** | `html[dir="rtl"]` with LTR code containers (`dir="ltr"`) verified on all 4 Topics. | **Passed** |
| **Mobile Layout (390px)** | Zero horizontal overflow (`scrollWidth <= clientWidth + 2`) across all 4 Topics; all buttons clickable. | **Passed** |
| **Homepage Card Modal** | Quick preview modal opens for Topic 24 and closes with `Escape`. | **Passed** |

---

## 4. Release Decision & Sign-off Status

- **Status:** **Evidence complete and awaiting course-owner sign-off.**
- **Group Release:** Neither approved nor improved status is claimed. The educational review is complete, all template criteria are met, all browser tests pass, and the evidence is documented truthfully.
- **Course-Owner Sign-off:** Awaiting independent owner verification and sign-off. The central reviewState change and hash baseline updates will be executed centrally by the orchestrator.
