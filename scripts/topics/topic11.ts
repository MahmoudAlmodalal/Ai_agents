export const topic11Html = `
  <article class="topic-content">
    <header class="topic-intro">
      <h2 class="step-title">مكتبة البرومبتات — PROMPT 01 إلى PROMPT 30</h2>
      <p>هذه المكتبة تنقل البرومبتات المعتمدة من وثيقة سلاح العصر كما هي، مع إبقاء كل Prompt في قسم مستقل قابل للبحث والنسخ. اقرأ المستندات المشار إليها داخله قبل التنفيذ، ولا تعتبر اقتراحات Agent قرارات منتج.</p>
      <div class="callout"><strong>قاعدة الاستخدام:</strong> انسخ البرومبت، نفّذه في المرحلة المقصودة فقط، ثم راجع المخرج مقابل PRD والملفات المعتمدة. لا تُنشئ ملفات أو ميزات لم يطلبها النص.</div>
    </header>
    <section class="prompt-section" id="prompt-01">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 01</span><h3>Grill Me: Product Discovery</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 01</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 01">نسخ</button></div><pre class="code-content"><code>/grill-me
Act as a Senior Product Manager and Business Analyst.
I want to discover the requirements for my web application.
Interview me in Arabic, ONE question at a time. Wait for my answer.
Explore: problem, users, goals, roles, MVP, features, business rules,
permissions, exceptions, constraints, acceptance criteria, and open questions.
Challenge ambiguous answers. Offer options with trade-offs when needed.
Record confirmed decisions separately from assumptions and recommendations.
Do not invent business rules or write code.
Continue until critical product decisions are clear.
Start with the first question only.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-02">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 02</span><h3>Generate PRD after Grill Me</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 02</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 02">نسخ</button></div><pre class="code-content"><code>Act as a Senior Product Manager and Business Analyst.
We have completed a Grill Me interview. Use the actual interview answers
and approved decisions as the single source of truth.
Create a complete, practical PRD in docs/PRD.md with these 27 sections:
1 Product Overview; 2 Problem Statement; 3 Product Goals; 4 Non-Goals;
5 Target Users; 6 User Personas; 7 User Needs; 8 User Stories;
9 MVP Scope; 10 Core Features; 11 Functional Requirements;
12 Non-Functional Requirements; 13 User Flows; 14 Pages/Screens;
15 Roles &amp; Permissions; 16 Data Requirements; 17 Integrations;
18 Edge Cases; 19 Error States; 20 Security &amp; Privacy Requirements;
21 Analytics &amp; Tracking; 22 Success Metrics/KPIs; 23 Acceptance Criteria;
24 Future Features; 25 Risks &amp; Dependencies; 26 Open Questions;
27 Recommended Development Phases.
For each major feature provide purpose, story, requirements, business rules,
edge cases, acceptance criteria, and Must/Should/Nice priority.
Use requirement IDs FR-001, NFR-001, BR-001 and testable Given/When/Then.
Separate confirmed requirements, assumptions, proposed decisions and questions.
Do not code, design screens or silently resolve conflicts.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-03">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 03</span><h3>PRD Review</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 03</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 03">نسخ</button></div><pre class="code-content"><code>Act as a critical Product Requirements Reviewer.
Read docs/PRD.md and identify at least five high-impact issues:
ambiguity, contradictory rules, missing permissions, unverifiable
requirements, oversized MVP, missing edge/error cases.
For each issue show location, risk, suggested correction, and whether
stakeholder approval is needed. Do not modify the PRD automatically.
Explain findings in Arabic.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-04">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 04</span><h3>GitHub Documentation Setup</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 04</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 04">نسخ</button></div><pre class="code-content"><code>Act as a Git and GitHub documentation mentor.
Inspect my project directory. Propose a clear README.md and docs/ layout
that preserves all existing files. Explain how to initialize a Git repository,
commit documentation, create a branch, push and open a Pull Request.
Do not run destructive commands or publish secrets.
Ask before changing the remote repository.
Output a concise student checklist in Arabic.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-05">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 05</span><h3>User Flow</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 05</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 05">نسخ</button></div><pre class="code-content"><code>Act as a Senior UX Designer.
Read docs/PRD.md. Create a User Flow for each major confirmed MVP journey.
Include user actions, system responses, decision points, success/error paths,
entry/exit states and role-based navigation.
Use valid Mermaid flowchart TD. Do not invent business rules.
Create docs/user-flow.md with Mermaid source, Arabic explanation,
related PRD requirements and open questions.
Do not generate other diagrams or code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-06">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 06</span><h3>Conceptual Domain Model (not UML)</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 06</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 06">نسخ</button></div><pre class="code-content"><code>Act as a Senior Domain Analyst.
Read docs/PRD.md and docs/user-flow.md if available.
Create ONLY a conceptual Domain Model using Mermaid flowchart LR.
Show business concepts, their responsibilities, boundaries and labeled
relationships. Avoid SQL tables, PK/FK, data types, UML classes or methods.
Use cardinality only when confirmed. No invented business rules.
Save docs/diagrams/domain-model.md and domain-model.mmd.
Explain the model and open questions in Arabic.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-07">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 07</span><h3>Use Case Diagram</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 07</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 07">نسخ</button></div><pre class="code-content"><code>Act as a Senior UML Use Case Analyst.
Read docs/PRD.md and docs/user-flow.md.
Identify confirmed MVP actors, permissions, use cases and system boundary.
Use &lt;&lt;include&gt;&gt; only for truly mandatory shared behavior and
&lt;&lt;extend&gt;&gt; only for justified conditional behavior.
Generate valid PlantUML with actors and use case ovals.
Save docs/diagrams/use-case.puml and use-case.md with Arabic explanation.
Flag conflicts and missing rules. Do not create other diagrams or code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-08">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 08</span><h3>Activity Diagram</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 08</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 08">نسخ</button></div><pre class="code-content"><code>Act as a Senior Business Process Analyst.
Read the approved PRD and User Flow.
Create ONLY activity-style process diagrams for main MVP operations.
Include actor/system actions, decision points, success/failure and
alternative paths. Use Mermaid flowchart TD with labeled branches.
Create docs/diagrams/activity-diagram.md.
Explain in Arabic. Do not invent steps or build code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-09">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 09</span><h3>Sequence Diagram</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 09</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 09">نسخ</button></div><pre class="code-content"><code>Act as a Senior Software Architect and UML Expert.
Read the PRD, User Flow and Use Case documents.
Create a separate Mermaid sequenceDiagram for each main MVP use case.
Show actor, logical participants, requests/responses, validations,
data operations, alt/else branches, success and error scenarios.
Use a Backend or API component only if documented; otherwise use
User, Application and Data Store as logical participants.
Save docs/diagrams/sequence-diagrams.md and separate .mmd sources.
Validate actor permissions and the sequence against PRD. Explain in Arabic.
Generate no application code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-10">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 10</span><h3>State Diagram</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 10</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 10">نسخ</button></div><pre class="code-content"><code>Act as a Senior State Machine Analyst.
Read the PRD and related User Flows.
Identify MVP entities with meaningful documented lifecycle states.
For each, generate valid Mermaid stateDiagram-v2 showing initial states,
allowed transitions, triggering events, guards and end states if applicable.
Do not invent statuses. Flag missing transition decisions.
Save docs/diagrams/state-diagrams.md with transition tables and Arabic explanation.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-11">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 11</span><h3>Class Diagram</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 11</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 11">نسخ</button></div><pre class="code-content"><code>Act as a Senior Object-Oriented Design Expert.
Read the PRD, Domain Model, ERD and relevant Sequence Diagrams.
Create ONLY a design-level Mermaid classDiagram for the MVP.
Show justified classes, responsibilities, important attributes,
meaningful associations and multiplicity; include operations only if supported.
Avoid unnecessary implementation/framework assumptions.
Save docs/diagrams/class-diagram.md and class-diagram.mmd.
Explain design decisions and assumptions in Arabic.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-12">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 12</span><h3>ERD (DBML + Mermaid)</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 12</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 12">نسخ</button></div><pre class="code-content"><code>Act as a Senior Database Architect.
Read docs/PRD.md, User Flow and approved Domain Model.
Design ONLY the MVP relational ERD.
Identify tables, columns, data types, PK/FK, cardinality, unique/not-null/check
constraints and justified indexes. Apply 3NF where suitable.
Avoid unnecessary duplication and tables; consider race conditions and
atomic inventory updates. Distinguish technical choices from business rules.
Generate valid DBML for dbdiagram.io and equivalent Mermaid erDiagram.
Save docs/database.dbml, docs/ERD.md and docs/database-review.md.
Explain every entity and relationship in Arabic.
Flag missing requirements rather than inventing them. No migrations or code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-13">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 13</span><h3>Database Quality Review</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 13</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 13">نسخ</button></div><pre class="code-content"><code>Act as a Senior Database Reviewer.
Review docs/database.dbml and docs/ERD.md against docs/PRD.md.
Check cardinality, 3NF, redundant counters, referential integrity,
check constraints, transaction boundaries, concurrent requests,
stock consistency and consistency with documented statuses.
Report each issue with severity, evidence, impact and proposed correction.
Do not silently change the schema. Save docs/database-review.md.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-14">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 14</span><h3>UI/UX Grill Me</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 14</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 14">نسخ</button></div><pre class="code-content"><code>/grill-me
Act as a Senior UX Researcher and Product Designer.
Read the approved PRD and available User Flows/Diagrams.
Interview me in Arabic, ONE question at a time, about information
architecture, required pages for each role, navigation, layout,
content hierarchy, forms, interactions, empty/loading/error/success states,
responsive behavior, accessibility, language and existing brand identity.
Challenge unclear decisions and suggest alternatives with trade-offs.
Do not invent features or generate code/screens during the interview.
After all questions are resolved, create docs/UI_UX_REQUIREMENTS.md.
Start with the first question only.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-15">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 15</span><h3>UX Blueprint + Screen Inventory</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 15</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 15">نسخ</button></div><pre class="code-content"><code>Act as a Senior UX Architect.
Read docs/PRD.md and docs/UI_UX_REQUIREMENTS.md.
Create complete MVP user journeys, Mermaid flows, a Sitemap and Screen Inventory.
For EACH screen specify ID, purpose, roles, route, components, data,
actions, navigation, validation, states, accessibility and responsive behavior.
Prioritize core/supporting/future, without bringing future features into MVP.
Save docs/UX_BLUEPRINT.md and docs/SCREEN_INVENTORY.md.
Do not design screens yet or write code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-16">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 16</span><h3>Project-Specific Stitch Master Prompt Generator</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 16</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 16">نسخ</button></div><pre class="code-content"><code>Act as a Google Stitch Prompt Engineer.
Read PRD, UX_BLUEPRINT.md, SCREEN_INVENTORY.md and approved branding.
Generate a READY-TO-PASTE master prompt for Google Stitch tailored to
this actual product: its users, platform, roles, journeys, layout needs,
accessibility, language, RTL if relevant, visual direction and shared UI rules.
Ask Stitch to produce ONE representative MVP screen first and establish
a consistent design direction. Do not generate all screens at once.
Save docs/STITCH_MASTER_PROMPT.md.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-17">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 17</span><h3>Stitch Design System</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 17</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 17">نسخ</button></div><pre class="code-content"><code>Act as a Senior Design System Architect.
Using my approved brand and the representative Stitch screen,
define colors, type scale, spacing, radii, shadows, grids, icons,
buttons, inputs, cards, tables, dialogs, navigation, semantic states,
breakpoints, keyboard/focus/contrast rules and RTL guidance if applicable.
Do not invent a different brand. Preserve requirements.
Apply the shared rules consistently to subsequent Stitch screens.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-18">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 18</span><h3>Generate One Prompt per Screen</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 18</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 18">نسخ</button></div><pre class="code-content"><code>Act as a Senior Google Stitch Prompt Engineer.
Read approved PRD, SCREEN_INVENTORY.md and the approved Design System.
Create a COMPLETE, individually copyable Stitch prompt for EVERY MVP screen.
For each include ID, title, role, purpose, hierarchy, content, data,
components, CTA, validation, navigation, loading/empty/error/success states,
responsive behavior and accessibility. Preserve shared visual rules.
Sort screens in user-flow order. Do not omit any or add new MVP features.
Save docs/STITCH_SCREEN_PROMPTS.md.
Do not generate frontend code.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-19">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 19</span><h3>Single Screen Refinement in Stitch</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 19</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 19">نسخ</button></div><pre class="code-content"><code>Improve ONLY the selected screen.
Specific problems to correct: [WRITE OBSERVED PROBLEMS].
Preserve the approved Design System, content, user role, functions,
navigation destinations and shared component patterns.
Explain what changed. Do not redesign unrelated screens or add features.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-20">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 20</span><h3>Stitch Prototype</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 20</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 20">نسخ</button></div><pre class="code-content"><code>Review the approved screens and UX Blueprint.
Create or refine the interactive prototype by connecting existing screens.
For each transition define origin, trigger, destination, back/cancel behavior,
success and failure outcomes, and role restrictions.
Test main user journeys. Report missing or disconnected screens.
Do not invent new flows or features.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-21">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 21</span><h3>Visual UX Audit</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 21</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 21">نسخ</button></div><pre class="code-content"><code>Act as a Senior UX Auditor.
Review all Stitch screens and the prototype against the PRD and design system.
Check hierarchy, forms, CTA visibility, mobile/desktop responsiveness,
contrast, keyboard accessibility, RTL, visual consistency, empty/loading/error
states and complete navigation flows. Rank issues Critical/Major/Minor.
Suggest precise fixes; do not silently expand features.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-22">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 22</span><h3>Stitch MCP Connection Verification</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 22</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 22">نسخ</button></div><pre class="code-content"><code>Use the connected Stitch MCP server.
List my Stitch projects and screen identifiers. Verify the intended project
and its approved screens. Do not create, update or delete anything.
If access is unavailable, report the missing connection or permissions.
Never output or expose API keys.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-23">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 23</span><h3>Extract DESIGN.md from Stitch</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 23</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 23">نسخ</button></div><pre class="code-content"><code>Act as a Design System Engineer.
Use the connected Stitch MCP, or explicitly provided exports if MCP is unavailable.
Read the approved project and its screens. Extract REAL confirmed hex values,
fonts, typography, spacing, radii, components, interaction patterns,
responsive rules and accessibility notes.
Create DESIGN.md using optional YAML tokens and Markdown design rationale,
consistent with Google&#x27;s DESIGN.md format. Do not invent values.
Create docs/STITCH_SCREEN_REFERENCES.md with screen identifiers and links.
Report inaccessible properties. Do not modify Stitch screens.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-24">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 24</span><h3>Frontend-Only Next.js Plan</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 24</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 24">نسخ</button></div><pre class="code-content"><code>Act as a Senior Next.js Frontend Architect.
Read PRD, SCREEN_INVENTORY, UX_BLUEPRINT, DESIGN.md and Stitch references.
Plan only the frontend: Next.js App Router, React, TypeScript, Tailwind CSS.
Create route hierarchy, layouts, shared components, feature modules,
typed mock data, data contracts, user interactions and UI states.
Divide implementation into small dependency-ordered PHASES and TASKS.
For every task define ID, exact scope, inputs, expected output, dependencies,
acceptance criteria and verification method. Map every MVP screen to a phase.
Do not code yet, and do not implement backend, database or real authentication.
Create docs/FRONTEND_PLAN.md, docs/FRONTEND_TASKS.md,
docs/ROUTES_MAP.md, docs/COMPONENT_ARCHITECTURE.md,
docs/FRONTEND_DATA_CONTRACTS.md.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-25">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 25</span><h3>UI/UX Pro Max Review Before Coding</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 25</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 25">نسخ</button></div><pre class="code-content"><code>Use the installed ui-ux-pro-max skill.
Review the approved FEATURE_BRIEF, DESIGN.md, relevant Stitch designs
and existing shared UI components. Recommend the best project-specific
layout, component reuse, typography, spacing, responsiveness,
accessibility and interaction patterns.
Do not replace approved identity or modify files yet.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-26">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 26</span><h3>Select Next Implementation Phase</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 26</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 26">نسخ</button></div><pre class="code-content"><code>Act as a Senior Frontend Tech Lead.
Read FRONTEND_PLAN.md, FRONTEND_TASKS.md and actual repository state.
Choose the next uncompleted phase whose dependencies are satisfied.
Create a FEATURE_BRIEF with exact scope, screens, inputs, dependencies,
deliverables and acceptance criteria. Do not implement anything yet.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-27">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 27</span><h3>Spec Kit Constitution</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 27</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 27">نسخ</button></div><pre class="code-content"><code>/speckit-constitution
Establish project rules for FRONTEND ONLY:
follow approved PRD, Stitch references and DESIGN.md;
use Next.js App Router + TypeScript + Tailwind CSS;
reuse components, maintain responsiveness, accessibility and semantic HTML;
use typed mock data until APIs exist; avoid unnecessary dependencies;
never implement out-of-scope backend features; verify every change.
Use UI/UX Pro Max for relevant design work.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-28">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 28</span><h3>Spec Kit per Feature</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 1</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 1">نسخ</button></div><pre class="code-content"><code>/speckit-specify
Read the current FEATURE_BRIEF, PRD, screens and DESIGN.md.
Specify ONLY this frontend feature: user goals, UI behavior,
validation, navigation, states and testable acceptance criteria.
Explicitly exclude unrelated phases and backend work.</code></pre></div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 2</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 2">نسخ</button></div><pre class="code-content"><code>/speckit-clarify
Identify genuine ambiguity in this feature specification.
Use approved documents to resolve known facts; ask about undecided ones.
Do not silently invent requirements.</code></pre></div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 3</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 3">نسخ</button></div><pre class="code-content"><code>/speckit-plan
Create the technical plan for the current frontend feature only.
Use Next.js App Router, TypeScript and Tailwind; reuse components and
DESIGN.md. Cover routes, component structure, mock data, states, tests,
responsiveness and accessibility. Do not implement code yet.</code></pre></div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 4</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 4">نسخ</button></div><pre class="code-content"><code>/speckit-tasks
Break the current feature into small dependency-ordered, verifiable tasks.
Reference acceptance criteria and existing shared components.</code></pre></div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 5</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 5">نسخ</button></div><pre class="code-content"><code>/speckit-analyze
Check consistency between specification, implementation plan and tasks.
Report and fix documentation conflicts before starting code.</code></pre></div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 6</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 6">نسخ</button></div><pre class="code-content"><code>/speckit-implement
Implement ONLY the next pending task from tasks.md.
Read DESIGN.md and approved Stitch reference first. Use UI/UX Pro Max
for relevant layout/interaction work. Reuse code. After changes run checks,
list changed files, verify acceptance criteria, and STOP.</code></pre></div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 28 — الجزء 7</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 28 الجزء 7">نسخ</button></div><pre class="code-content"><code>/speckit-converge
If this skill is installed: compare the completed feature with spec, plan
and tasks; report gaps and create any follow-up tasks without pretending
that unexecuted checks have passed.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-29">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 29</span><h3>Final Frontend QA</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 29</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 29">نسخ</button></div><pre class="code-content"><code>Act as a Senior Frontend QA and Accessibility Auditor.
Verify all screens, routes, role-based navigation, forms, mock interactions,
loading/empty/error states, design fidelity and responsiveness at 390,
768, 1024, 1366 and 1440 px. Compare against PRD, UX Blueprint,
SCREEN_INVENTORY, DESIGN.md and Stitch references.
Run only available checks, e.g. TypeScript, lint, build, and browser tests.
Report actual Passed / Failed / Not Run results.
Save docs/FINAL_FRONTEND_QA.md. Do not claim tests passed unless executed.
Do not build backend.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
    <section class="prompt-section" id="prompt-30">
      <div class="prompt-heading"><span class="prompt-index">PROMPT 30</span><h3>GitHub Handoff</h3></div>
      <div class="prompt-meta">
        <span><strong>الهدف:</strong> تنفيذ المهمة المحددة داخل النص المعتمد.</span>
        <span><strong>السياق:</strong> الملفات والمراجع المذكورة داخل البرومبت.</span>
        <span><strong>الأداة:</strong> Coding Agent أو Stitch حسب النص.</span>
      </div>
      <div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">PROMPT 30</span><button class="copy-btn" type="button" aria-label="نسخ PROMPT 30">نسخ</button></div><pre class="code-content"><code>Act as a Senior Developer preparing a reviewable frontend delivery.
Check git status, changed files, secrets and the final QA report.
Propose a clear commit plan and Pull Request summary covering scope,
screens, tests, limitations, out-of-scope backend work and next steps.
Do not expose keys. Request approval before pushing or opening a PR.</code></pre></div>
      <p class="prompt-warning"><strong>تنبيه:</strong> لا تُعلن اكتمال الناتج قبل مراجعته مقابل المستندات المعتمدة، ولا تعرض ملفًا غير موجود على أنه قابل للتنزيل.</p>
    </section>
  </article>
`;
