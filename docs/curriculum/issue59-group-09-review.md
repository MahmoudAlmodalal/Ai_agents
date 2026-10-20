# Issue #59 — Group 09 review: AI implementation tools, Skills, and MCP

**State:** Static curriculum review recorded; runtime evidence Not Run; group acceptance/release pending.
**Scope:** Group 09 — AI implementation tools, Skills, and MCP (4 canonical Topics).
**Review Date:** 2026-10-20
**Reviewer:** Educational Curriculum Reviewer (root / independent walkthrough)

---

## 1. Executive Summary & Group Status

This packet records a static educational walkthrough of **Group 09: AI implementation tools, Skills, and MCP** across its four canonical Topics. It does not establish release evidence or group acceptance:
1. `ai-coding-agent` (Sequence Position 24)
2. `google-ai-studio` (Sequence Position 25)
3. `agent-skills` (Sequence Position 26)
4. `mcp-protocol` (Sequence Position 27)

### Group Boundary & Policy Integrity
- **Boundary & Scope:** All 4 Topics preserve their canonical slugs, positions (24–27), titles, and learning sequence. No foundational Topics were added in this Group 09 scope review. The curriculum manifest retains 58 canonical Topics.
- **Prerequisites as Guidance:** Prerequisites are explicitly presented as non-blocking educational guidance. Topics 01–23 do not require AI agent or MCP installations in order to study them. No Topic is locked behind a prerequisite.
- **BorrowHub Case Study:** BorrowHub is maintained strictly as an optional case study; all exercises, practical steps, prompts, and rubric criteria are applicable directly to the learner's own project.
- **Directionality & Styling:** All learner-facing prose is Arabic (RTL) with LTR technical text, code snippets, configuration templates, and terminal commands.
- **DEC-50 Compliance:** Static source review found no remaining legacy brand reference (سلاح العصر) in Group 09 lesson text; the lesson and its owned assertions use **Ai_agents**. The owned browser suite has not been run by this packet.
- **Review State & Hash Baseline:** The review state remains `draft` in the data model; per-Topic fields (`reviewState`, `lessonReviewEvidence`, `quizReviewEvidence`, `rubricReviewEvidence`) are untouched, awaiting the orchestrator's central state flip. The review-state fields were inspected in source; no runtime verification or baseline-preservation test is claimed here.
- **Video Resources:** All external video resources are documented as **candidates** with discovery evidence. No claim of verified playback, captions, or accessibility is made; owner approval remains pending.

---

## 2. Topic-by-Topic Walkthrough & Evaluation

**Review boundary:** This section records static curriculum and question/rubric inspection. Worked scenarios and code snippets are illustrative lesson text, not tool execution logs or learner project artifacts. Browser, agent, model, Skills-host, and MCP execution states are recorded separately as Not Run.

### Topic 24: `ai-coding-agent` (وكيل البرمجة بالذكاء الاصطناعي)

- **Input / Context:** Student project workspace following prototype sign-off (Topic 23), PRD (`docs/PRD.md`), and Design Tokens (`DESIGN.md`).
- **Prerequisites:** Guided review of previous analytical topics; no coding agent was required in Topics 01–23. Non-blocking.
- **Learning Objectives:**
  - `agent-objective-context`: تهيئة وكيل البرمجة بسياق ملفات وقواعد المشروع وحدود المهام. [Static content review: present]
  - `agent-objective-safety`: حماية الأسرار والتحقق من صلاحيات الأوامر والمخرجات قبل التنفيذ. [Static content review: present]
- **Authored Learning Path & Explanations:**
  - *المدخل: مستودع وقواعد مكتوبة:* Establishing that coding agents act as executors guided by specs, not initial discoverers. [Static content review: present]
  - *حدود التفويض:* Read/Write/Execute tiering; blocking destructive terminal commands (`rm -rf`, `DROP TABLE`, `git push --force`). [Static content review: present]
  - *الأسرار ليست سياقاً عاماً:* Isolating `.env.local`, creating `.env.example`, preventing secrets in prompts or commits. [Static content review: present]
- **Worked Example (Optional Case Study):**
  - *Title:* مهمة مراجعة وثائق
  - *Context:* يطلب مطور من وكيل تلخيص تضارب بين PRD وSRS.
  - *Result:* يقرأ الوكيل الملفين ويقدم مواقع الاختلاف ومقترحاً للمراجعة فقط؛ لا يحرر كل النظام ولا يطبع قيمة من `.env.local`. [Static content review: present]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* اكتب إعداد الوكيل: سياق الملفات، قواعد الجودة، نطاق الصلاحية، والأوامر المسموحة والمراجعة المطلوبة.
     *Expected Output:* `docs/CODING_AGENT_SETUP.md` يشرح إعداداً لا يعتمد على وكيل مدفوع بعينه. [Static content review: present]
  2. *Step 2:* راجع ملفات البيئة والتجاهل دون كشف أي قيمة سرية، ثم سجل استعادة/تراجع آمنة.
     *Expected Output:* `.env.example` بلا أسرار و`.gitignore` يحمي الملفات المحلية. [Static content review: present]
- **Declared Practical Outputs:**
  - `agent-setup`: `docs/CODING_AGENT_SETUP.md` السياق والحدود والخطوات. [Static content review: present]
  - `safe-env`: `.env.example` و`.gitignore` مع أسماء عامة ومنع تتبع الأسرار. [Static content review: present]
- **Illustrative snippet only (not generated or validated output):**
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
    - *Rationale:* ملف المثال يوضح أسماء الإعدادات دون كشف اعتماد فعلي. [Static content review: present]
  - `agent-q-scope` (Objective: `agent-objective-context`):
    - *Prompt:* أي طلب يعطي الوكيل عملاً يمكن مراجعته بأمان؟
    - *Options:* [1. أعد كتابة التطبيق كله وارفعه إلى الإنتاج, 2. راجع ملفين محددين واعرض فرقاً مقترحاً دون نشر, 3. احذف أي ملف قديم, 4. غيّر كل الإعدادات تلقائياً]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* النطاق المحدد والمخرج القابل للمراجعة يقللان الأثر ويكشفان هل فهم الوكيل المطلوب. [Static content review: present]
- **Checklist & Rubric Criteria:**
  - `agent-r-boundary` (Output: `agent-setup`): الإعداد يحدد السياق والأذونات والمراجعة ومتى يتوقف الوكيل. [Static content review: present]
  - `agent-r-secret` (Output: `safe-env`): ملف المثال لا يحمل سرّاً حقيقياً والملفات المحلية مستبعدة. [Static content review: present]
- **External Video Candidate:**
  - *Title:* Codex for Beginners
  - *URL:* `https://academy.openai.com/public/videos/codex-for-beginners-2026-04-22`
  - *Source:* OpenAI Academy
  - *Discovery Evidence:* Covers setup and agentic software workflows. Vendor-specific; playback, captions, and accessibility remain unverified. Status: Candidate.
- **Gaps & Corrections:** Static source review notes the product-brand correction in surrounding lesson prose; no browser assertion is claimed as run.

---

### Topic 25: `google-ai-studio` (استخدام Google AI Studio)

- **Input / Context:** Approved schema in `docs/ERD.md` and screen list in `docs/SCREEN_INVENTORY.md`. A Google account is needed only if the learner chooses to use Google AI Studio; local synthetic-data work can continue without an account or API key. The platform experiment remains required for a completion claim and is Not Run here.
- **Prerequisites:** Entity-relationship modeling (Topic 14) and coding agent setup (Topic 24). Guidance only; non-blocking.
- **Learning Objectives:**
  - `aistudio-objective-test`: إجراء تجربة نموذج موثقة مع تعليمات ومدخلات ومخرجات قابلة للمراجعة. [Static content review: present]
  - `aistudio-objective-data`: إنتاج بيانات تمثيلية JSON تطابق ERD دون خلطها ببيانات مستخدمين حقيقية. [Static content review: present]
- **Authored Learning Path & Explanations:**
  - *المدخل: مخطط وهدف تجربة:* Placing AI Studio at implementation time to test prompts without early-stage distraction. [Static content review: present]
  - *Mock data لا بيانات حقيقية:* Generating schema-compliant JSON mock data; distinguishing JSON syntactic validity from schema compliance. [Static content review: present]
  - *مفتاح API منفصل:* Safe key storage in `.env.local` without `NEXT_PUBLIC_` prefix; server-side usage only. [Static content review: present]
- **Worked Example (Optional Case Study):**
  - *Title:* بيانات استعارة اصطناعية
  - *Context:* ERD يتضمن طالباً ومعدة وطلباً مع مفاتيح مرجعية.
  - *Result:* ثلاث سجلات بأسماء وهمية وقيم معرّفات متطابقة بين الطلب والطرفين؛ لا توجد بيانات شخصية أو قاعدة جديدة غير موجودة في ERD. [Static content review: present]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* سجل الهدف والتعليمات والنموذج والإعدادات المرئية والنتيجة التي تريد اختبارها.
     *Expected Output:* `docs/AI_STUDIO_WORKFLOW.md` يحفظ خطوات قابلة للتكرار دون قيمة مفتاح. [Static content review: present]
  2. *Step 2:* اطلب بيانات اصطناعية قليلة وافحص JSON ثم قارن كل حقل وعلاقة بERD.
     *Expected Output:* `src/data/mock-data.json` بيانات اختبارية متوافقة وموسومة بأنها غير حقيقية. [Static content review: present]
- **Declared Practical Outputs:**
  - `studio-workflow`: `docs/AI_STUDIO_WORKFLOW.md` غرض التجربة وإعداداتها والنتيجة. [Static content review: present]
  - `mock-data`: `src/data/mock-data.json` بيانات اصطناعية صالحة ومتوافقة مع ERD. [Static content review: present]
- **Illustrative snippet only (not generated or validated output):**
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
    - *Rationale:* يجب التحقق من البنية والحقول والعلاقات مقابل المصدر، لا من قابلية تحليل JSON وحدها. [Static content review: present]
  - `aistudio-q-key` (Objective: `aistudio-objective-test`):
    - *Prompt:* أين توثق API key في سير العمل التعليمي؟
    - *Options:* [1. في المستودع كي يتكرر الاختبار, 2. تذكر طريقة الإعداد واسم المتغير دون نشر القيمة السرية, 3. في سجل المخرجات, 4. داخل بيانات mock]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* إمكانية التكرار لا تبرر كشف السر؛ وثق selector/الإعداد دون القيمة. [Static content review: present]
- **Checklist & Rubric Criteria:**
  - `aistudio-r-repro` (Output: `studio-workflow`): الهدف والتعليمات والإعدادات والنتيجة موثقة بما يكفي للفهم. [Static content review: present]
  - `aistudio-r-schema` (Output: `mock-data`): JSON قابل للقراءة وحقوله وعلاقاته تطابق ERD والبيانات اصطناعية. [Static content review: present]
- **External Video Candidate:**
  - *Title:* Google AI Studio for developers
  - *URL:* `https://www.youtube.com/watch?v=MjHZey2_H-o`
  - *Source:* Google for Developers
  - *Discovery Evidence:* Quickstart video for prompts, structured output, and API handoff. Status: Candidate.
- **Gaps & Corrections:** Static source review found warnings about current rate limits and mock-data isolation. Current service limits still need checking when a real platform session is run.

---

### Topic 26: `agent-skills` (المهارات المخصصة - Skills)

- **Input / Context:** Configured coding agent, PRD requirements, Design System tokens.
- **Prerequisites:** Coding Agent setup (Topic 24). Grill Me in Topic 02 was an interview pattern, not a technical skill prerequisite. Non-blocking.
- **Learning Objectives:**
  - `skills-objective-instructions`: كتابة Skill صغيرة توجه الوكيل إلى معايير المشروع ونتيجة قابلة للمراجعة. [Static content review: present]
  - `skills-objective-selection`: اختيار المهارة ذات الصلة فقط كي لا يثقل السياق بقواعد غير لازمة. [Static content review: present]
- **Authored Learning Path & Explanations:**
  - *المدخل: قاعدة متكررة قابلة لإعادة الاستخدام:* Defining reusable procedural knowledge vs. one-off prompts. [Static content review: present]
  - *تعليمات وإشارة استخدام:* Golden Rule formulation: "Agent ينفّذ، Skill يرشده، MCP يوصله بالأدوات، وPRD يحدد المطلوب". [Static content review: present]
  - *فعّل عند الحاجة:* Avoiding "Skill Bloat", context window pollution, and outdated rule conflicts. [Static content review: present]
- **Worked Example (Optional Case Study):**
  - *Title:* معايير واجهة RTL
  - *Context:* الفريق يكرر طلب واجهات Next.js عربية بأزرار قابلة للوحة المفاتيح.
  - *Result:* Skill قصيرة تحدد تشغيل RTL للنص العربي وإبقاء الكود LTR وفحص التركيز المرئي. لا تحمل تفاصيل سياسة بيانات الخلفية إلى مهمة CSS. [Static content review: present]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* اكتب وصف المهارة ومعايير الواجهة أو المشروع ونطاق المهام التي تغطيها.
     *Expected Output:* `docs/PROJECT_AGENT_SKILLS.md` يشرح المهارات ومتى يستدعي كل منها. [Static content review: present]
  2. *Step 2:* أضف Skill فرعية للمعايير الأكثر تكراراً واختبرها بطلب صغير يقتضي القاعدة.
     *Expected Output:* `docs/skills/frontend-standards.md` يتضمن تعليمات قابلة للمراجعة لا سيرة عامة. [Static content review: present]
- **Declared Practical Outputs:**
  - `skill-index`: `docs/PROJECT_AGENT_SKILLS.md` فهرس يشرح نطاق واستدعاء كل مهارة. [Static content review: present]
  - `frontend-skill`: `docs/skills/frontend-standards.md` قواعد مشروع محددة مع تحقق مقترح. [Static content review: present]
- **Illustrative snippet only (not generated or validated output):**
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
    - *Rationale:* تفعيل المهارات بحسب الحاجة يقلل الضوضاء ويمنع تحميل توجيهات لا تخص المهمة. [Static content review: present]
  - `skills-q-test` (Objective: `skills-objective-instructions`):
    - *Prompt:* كيف تعرف أن Skill مفيدة وقابلة للتطبيق؟
    - *Options:* [1. اسمها يبدو احترافياً, 2. لها مشغل واضح ومدخلات وقواعد ومخرج يمكن فحصه بطلب صغير, 3. طويلة جداً, 4. تحتوي كل الملفات]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* نطاق الاستخدام والمخرجات القابلة للتحقق هي ما يسمح بتقييم التعليمات. [Static content review: present]
- **Checklist & Rubric Criteria:**
  - `skills-r-trigger` (Output: `skill-index`): كل Skill لها مهمة ونطاق واضحان ولا تحمل كل سياق المشروع. [Static content review: present]
  - `skills-r-output` (Output: `frontend-skill`): التعليمات لها مخرج أو فحص يمكن للمراجع ملاحظته. [Static content review: present]
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
- **Prerequisites:** The curriculum sequence does not require MCP installations in Topics 01–26; MCP is introduced here as an architectural standard prior to tool integrations. Non-blocking.
- **Learning Objectives:**
  - `mcp-objective-roles`: شرح أدوار host وclient وserver والعلاقة بينها في اتصال MCP. [Static content review: present]
  - `mcp-objective-safety`: تحديد أدوات الخادم وصلاحياته ومصادر الأسرار قبل توصيله بالوكيل. [Static content review: present]
- **Authored Learning Path & Explanations:**
  - *المدخل: حاجة لتكامل محدد:* Need-based integration rather than arbitrary MCP installation. [Static content review: present]
  - *الأدوار والرسائل:* Three-tier architecture (Host, Client, Server) and three primitives (Tools, Resources, Prompts). [Static content review: present]
  - *الأمان محلي أولاً:* Local JSON config isolation, least-privilege tool grants, and manual export fallback if MCP is unavailable. [Static content review: present]
- **Worked Example (Optional Case Study):**
  - *Title:* قراءة شاشة تصميم
  - *Context:* مضيف الوكيل يحتاج قراءة معرفات شاشات من خادم تصميم.
  - *Result:* الـhost يدير الواجهة، والـclient يتصل بالخادم، والخادم يعرض أدوات قراءة محددة. يمنح الوكيل صلاحية القراءة فقط إن كانت كافية للمهمة. [Static content review: present]
- **Practical Steps & Expected Outputs:**
  1. *Step 1:* ارسم مكونات MCP المطلوبة لتكامل تجريبي واكتب تبادل الأدوار والقدرات التي تحتاجها فقط.
     *Expected Output:* `docs/MCP_FOUNDATIONS.md` يشرح host/client/server والقدرات المطلوبة. [Static content review: present]
  2. *Step 2:* اكتب إعداداً نموذجياً بلا أسرار حقيقية مع قائمة صلاحيات ونطاق ومخاطر.
     *Expected Output:* نموذج config محلي بعناصر placeholder وملاحظة أنه لا يرفع للمستودع. [Static content review: present]
- **Declared Practical Outputs:**
  - `mcp-foundations`: `docs/MCP_FOUNDATIONS.md` تعريف الأدوار والقدرات ومسار الاتصال. [Static content review: present]
  - `mcp-config`: نموذج config بلا أسرار يبين الأذونات المطلوبة ومصدرها. [Static content review: present]
- **Illustrative snippet only (not generated or validated output):**
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
    - *Rationale:* توزيع الأدوار يساعد على فهم أين تعمل التجربة وأين ينفذ الاتصال وأين تعرض الأدوات أو الموارد. [Static content review: present]
  - `mcp-q-scope` (Objective: `mcp-objective-safety`):
    - *Prompt:* مهمة القراءة لا تحتاج أي تعديل. أي صلاحية تراجع أولاً؟
    - *Options:* [1. منح كتابة عامة لكل الأدوات, 2. اختيار قدرة القراءة المحددة وتقليل الأذونات, 3. نسخ المفتاح إلى prompt, 4. تفعيل كل خادم في الجهاز]
    - *Key:* Option 2 (Index 1).
    - *Rationale:* تحديد الحاجة وأقل صلاحية لازمة يحدان من أثر التكامل. [Static content review: present]
- **Checklist & Rubric Criteria:**
  - `mcp-r-roles` (Output: `mcp-foundations`): الوثيقة تشرح host وclient وserver وقدرات كل طرف. [Static content review: present]
  - `mcp-r-permissions` (Output: `mcp-config`): الإعداد بلا سر فعلي والصلاحية متناسبة مع المهمة. [Static content review: present]
- **External Video Candidate:**
  - *Title:* Why we built—and donated—the Model Context Protocol (MCP)
  - *URL:* `https://www.youtube.com/watch?v=PLyCki2K0Lg`
  - *Source:* Anthropic / YouTube
  - *Discovery Evidence:* Discussion between Stuart Ritchie and co-creator David Soria Parra on MCP's open standard architecture. Status: Candidate.
- **Gaps & Corrections:** Static source review found guidance to account for protocol evolution and security boundaries; no live host/config review was run.

---


## 3. Sample, Tool, and Runtime Evidence Status

The code blocks labeled “Illustrative snippet only” above are hand-authored examples for discussion. They were not produced by a coding agent, Google AI Studio model, Skills-enabled host, or MCP server, and they do not satisfy learner-output criteria. The Topic 25 JSON snippet uses generic camera/product fields and was not checked against the project's ERD; it must not be treated as schema-valid mock data.

| Topic | Required learner output and handoff | Status in this packet |
|---|---|---|
| 24 `ai-coding-agent` | Agent setup/guardrails, safe environment example, and reviewable scoped task for later implementation topics | Source instructions and safety rationale reviewed. No coding agent was configured or run; no project setup artifact was produced: **Not Run / incomplete**. |
| 25 `google-ai-studio` | `docs/AI_STUDIO_WORKFLOW.md` documenting the actual model/tool experiment, settings and result; synthetic JSON in `src/data/mock-data.json` checked against the ERD | No Google AI Studio account/session, model, API, or output was used. No JSON was generated or validated against the ERD: platform run **Not Run / incomplete**, mock-data artifact **Not supplied**. Account/API access is optional for trying the platform; a local exercise does not count as a platform run. |
| 26 `agent-skills` | A project Skill source at `docs/skills/frontend-standards/SKILL.md`, plus a host/version-specific load or attachment procedure and an actual small-task test result; handoff to Topic 27 | No Skill was created, loaded, or tested by a coding-agent host. The example is not a `SKILL.md` artifact: **Not Run / incomplete**. A file's presence alone does not demonstrate activation or use. |
| 27 `mcp-protocol` | `docs/MCP_FOUNDATIONS.md`, actual local host-specific placeholder config kept outside Git, and `docs/MCP_CONFIG_REVIEW.md` naming host/version, official schema source, permissions and config path; then a separately recorded connection test if claimed | No host/version was selected, no local config was created, and no MCP server was configured or queried: **Not Run / incomplete**. The generic JSON snippet is illustrative only and does not meet the host-specific config requirement. |

The earlier Topic 25 line that described a free Google account as a prerequisite was stale; the current lesson makes platform access conditional and permits local work to continue while keeping a Google AI Studio run marked Not Run/incomplete. The camera JSON example is not evidence of compatibility with the project ERD. The Skills lesson requires an actual `SKILL.md` and a small host test before completion can be claimed. MCP configuration format is host/version-specific; a generic `mcpServers` object is not an adequate placeholder artifact.

## 4. Verification and Acceptance Status

| Evidence item | Status |
|---|---|
| Educational walkthrough of Topics 24–27, including learning objectives, boundaries, practical steps, required outputs, questions/rubrics, and handoffs | Static source review recorded. |
| Browser/Playwright journey, copy, quiz scoring/retry, rubric persistence, mobile layout, RTL/LTR, or visual/accessibility behavior | **Not Run** by this packet; root owns integrated candidate checks. |
| Coding agent, Google AI Studio, Skills host, MCP host/config, or external model/service execution | **Not Run**. No output or service result is claimed. |
| Lint/typecheck, unit tests, and production build | **Not Run** by this packet. |
| Candidate-video playback, captions, accessibility, and lesson-fit review | **Deferred** for human review under DEC-70; no candidate is approved. |
| Independent exact-candidate evidence and end-of-queue owner sign-off | **Pending**; group is not improved or released. |

**Handoff:** Topic 24 establishes scoped agent use and secret-handling boundaries. Topic 25 can document a platform run and validated mock data without gating access; local continuation must not be described as a Google AI Studio run. Topic 26's real Skill definition and host test inform Topic 27's tool integration. Topic 27's actual host-specific config and permissions assessment prepare for Topic 28. Each artifact remains required where stated, even though learning access is open.

**Release status:** DEC-70 accepts the template, quiz policy, and descriptive learner-reported self-assessment scale. Group 09 remains **pending acceptance and not improved/released** until required outputs and independent evidence are complete and it is explicitly included in the course owner's end-of-queue sign-off list.