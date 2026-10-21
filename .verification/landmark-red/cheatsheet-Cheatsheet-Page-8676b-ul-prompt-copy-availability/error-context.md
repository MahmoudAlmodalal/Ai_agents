# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cheatsheet.spec.ts >> Cheatsheet Page E2E >> Cheatsheet presents source-approved 58 topics, canonical links, and faithful prompt copy availability
- Location: e2e/cheatsheet.spec.ts:4:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('main')
Expected: 1
Received: 2
Timeout:  7000ms

Call log:
  - Expect "toHaveCount" getByRole('main') with timeout 7000ms
  - waiting for getByRole('main')
    18 × locator resolved to 2 elements
       - unexpected value "2"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "تخطي إلى المحتوى الرئيسي" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "MET Academy سلاح العصر - الصفحة الرئيسية" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: MET
        - generic [ref=e12]:
          - generic [ref=e13]: سلاح العصر
          - generic [ref=e14]: MET Academy — من الفكرة إلى النشر والعرض
      - navigation "شريط التنقل الرئيسي" [ref=e15]:
        - link "الرئيسية" [ref=e16] [cursor=pointer]:
          - /url: /
        - link "ابدأ هنا" [ref=e21] [cursor=pointer]:
          - /url: /start
        - link "مسار التعلم" [ref=e26] [cursor=pointer]:
          - /url: /learn/project-idea-mvp
        - link "المتطلبات" [ref=e31] [cursor=pointer]:
          - /url: /learn/discovery-grill-me
        - link "Stitch MCP وDESIGN.md" [ref=e37] [cursor=pointer]:
          - /url: /learn/stitch-mcp-integration
        - link "خارطة تنفيذ المشروع" [ref=e42] [cursor=pointer]:
          - /url: /roadmap
        - link "Cheatsheet البرومبتات" [ref=e48] [cursor=pointer]:
          - /url: /cheatsheet
        - link "مكتبة البرومبتات" [ref=e54] [cursor=pointer]:
          - /url: /prompts
        - link "مختبر المخططات" [ref=e59] [cursor=pointer]:
          - /url: /diagrams
        - link "ورشة BorrowHub" [ref=e65] [cursor=pointer]:
          - /url: /borrowhub
        - link "الأدوات والتثبيت" [ref=e72] [cursor=pointer]:
          - /url: /tools
        - link "مؤشر الموديلات" [ref=e76] [cursor=pointer]:
          - /url: /models
        - button "عرض المزيد من أقسام الدورة" [ref=e82] [cursor=pointer]:
          - generic [ref=e87]: المزيد
      - generic [ref=e90]:
        - link "ابدأ الآن" [ref=e91] [cursor=pointer]:
          - /url: /start
        - button "التحويل إلى النمط الليلي" [ref=e98] [cursor=pointer]
  - main [ref=e101]:
    - main [ref=e102]:
      - generic [ref=e103]:
        - link "العودة إلى مسار المشروع" [ref=e104] [cursor=pointer]:
          - /url: /start#project-path
        - generic [ref=e107]:
          - generic [ref=e108]:
            - generic [ref=e109]: جاهز للنسخ
            - generic [ref=e110]: 58 موضوعًا
            - generic [ref=e111]: مشروع مختلف لكل طالب
          - heading "Practical Prompts Cheatsheet" [level=1] [ref=e112]
          - paragraph [ref=e113]: مرجع سريع يستخدمه الطالب أثناء التطبيق. بدّل الحقول بين الأقواس، أرسل Prompt واحدًا، راجع النتيجة، ثم انتقل إلى Prompt المراجعة والتسليم.
        - generic [ref=e114]:
          - generic [ref=e115]:
            - heading "1. انسخ" [level=2] [ref=e119]
            - paragraph [ref=e120]: استبدل اسم المشروع والمجال والمستخدمين.
          - generic [ref=e121]:
            - heading "2. نفّذ" [level=2] [ref=e125]
            - paragraph [ref=e126]: نفّذ مخرجًا واحدًا فقط من الموضوع.
          - generic [ref=e127]:
            - heading "3. سلّم" [level=2] [ref=e132]
            - paragraph [ref=e133]: راجع، افحص، ثم اعمل Commit وPush.
        - generic [ref=e134]:
          - heading "السلسلة الأساسية لكل موضوع" [level=2] [ref=e135]
          - paragraph [ref=e136]: "هذه الثلاثة Prompts تعمل مع أي مشروع: متجر، منصة تعليم، تطبيق حجوزات، نظام داخلي أو منتج مختلف تمامًا."
          - generic [ref=e137]:
            - generic [ref=e138]:
              - generic [ref=e139]:
                - heading "Prompt A — التحضير والتنفيذ" [level=3] [ref=e140]
                - button "نسخ البرومبت" [ref=e141]
              - generic [ref=e142]: "أعمل على مشروع [PROJECT_NAME]، المجال: [DOMAIN]، المستخدمون: [TARGET_USERS]. هذا موضوع: [TOPIC_TITLE]. اقرأ وثائق المشروع المتاحة وحدد ما هو مؤكد وما هو ناقص قبل التنفيذ. نفّذ المخرج التالي فقط: [NEXT_DELIVERABLE]. اربط كل قرار بمصدره، ولا تخترع سلوكًا أو تقنية أو بيانات غير موثقة. قبل التعديل اذكر الملفات التي ستتغير ومعايير القبول. بعد التعديل شغّل الفحص المناسب، ثم لخّص النتيجة وتوقف."
            - generic [ref=e143]:
              - generic [ref=e144]:
                - heading "Prompt B — المراجعة" [level=3] [ref=e145]
                - button "نسخ البرومبت" [ref=e146]
              - generic [ref=e147]: "أنت Reviewer مستقل لمشروع [PROJECT_NAME]. راجع مخرج [TOPIC_NUMBER]: [TOPIC_TITLE] مقابل PRD وSRS وأي تصميم أو عقد متاح. اكتب جدولًا من PASS وFAIL وOPEN QUESTION. افحص الاتساق، الحالات الحدية، قابلية التحقق، وعدم إضافة نطاق غير معتمد. اقترح أعلى عيب تأثيرًا فقط، ثم توقف وانتظر الاعتماد."
            - generic [ref=e148]:
              - generic [ref=e149]:
                - heading "Prompt C — التسليم والتوثيق" [level=3] [ref=e150]
                - button "نسخ البرومبت" [ref=e151]
              - generic [ref=e152]: لخّص إنجاز موضوع [TOPIC_NUMBER] لمشروع [PROJECT_NAME]. اذكر الملفات والمخرجات والقرارات والأسئلة المفتوحة والفحوصات والمخاطر. اكتب Handoff Note قصيرة ليكمل طالب آخر دون تخمين. اقترح رسالة Commit، ولا تقل إن العمل مكتمل إذا بقيت فجوة أو فشل فحص.
        - generic [ref=e153]:
          - generic [ref=e154]:
            - heading "برومبت الموضوع ومخرجه" [level=2] [ref=e155]
            - generic [ref=e156]: اضغط لفتح الموضوع الكامل
          - generic [ref=e157]:
            - group [ref=e158]:
              - generic "01 اختيار فكرة المشروع وتحديد MVP docs/PROJECT_CONTEXT.md" [ref=e159] [cursor=pointer]:
                - generic [ref=e160]: "01"
                - generic [ref=e161]: اختيار فكرة المشروع وتحديد MVP
                - generic [ref=e162]: docs/PROJECT_CONTEXT.md
            - group [ref=e163]:
              - generic "02 استجواب الفكرة واستكشاف المتطلبات (Grill Me) docs/DECISIONS_LOG.md" [ref=e164] [cursor=pointer]:
                - generic [ref=e165]: "02"
                - generic [ref=e166]: استجواب الفكرة واستكشاف المتطلبات (Grill Me)
                - generic [ref=e167]: docs/DECISIONS_LOG.md
            - group [ref=e168]:
              - generic "03 وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها docs/PRD.md (متضمنة الأقسام الـ 27 المرجعية)" [ref=e169] [cursor=pointer]:
                - generic [ref=e170]: "03"
                - generic [ref=e171]: وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها
                - generic [ref=e172]: docs/PRD.md (متضمنة الأقسام الـ 27 المرجعية)
            - group [ref=e173]:
              - generic "04 مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول docs/SRS.md (مواصفات السلوك ومعايير القبول Given/When/Then)" [ref=e174] [cursor=pointer]:
                - generic [ref=e175]: "04"
                - generic [ref=e176]: مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول
                - generic [ref=e177]: docs/SRS.md (مواصفات السلوك ومعايير القبول Given/When/Then)
            - group [ref=e178]:
              - 'generic "05 Git: حفظ وثائق المشروع وتتبع النسخ محلياً مستودع Git محلي مهيأ (.git)" [ref=e179] [cursor=pointer]':
                - generic [ref=e180]: "05"
                - generic [ref=e181]: "Git: حفظ وثائق المشروع وتتبع النسخ محلياً"
                - generic [ref=e182]: مستودع Git محلي مهيأ (.git)
            - group [ref=e183]:
              - 'generic "06 GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار مستودع GitHub بعيد مرتبط بالمشروع" [ref=e184] [cursor=pointer]':
                - generic [ref=e185]: "06"
                - generic [ref=e186]: "GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار"
                - generic [ref=e187]: مستودع GitHub بعيد مرتبط بالمشروع
            - group [ref=e188]:
              - generic "07 صيغة Mermaid ومحرك التصيير في المتصفح docs/diagrams/README.md" [ref=e189] [cursor=pointer]:
                - generic [ref=e190]: "07"
                - generic [ref=e191]: صيغة Mermaid ومحرك التصيير في المتصفح
                - generic [ref=e192]: docs/diagrams/README.md
            - group [ref=e193]:
              - generic "08 نمذجة مسارات تدفق المستخدم (User Flow) docs/user-flow.md" [ref=e194] [cursor=pointer]:
                - generic [ref=e195]: "08"
                - generic [ref=e196]: نمذجة مسارات تدفق المستخدم (User Flow)
                - generic [ref=e197]: docs/user-flow.md
            - group [ref=e198]:
              - generic "09 النموذج المفاهيمي لمجال العمل (Conceptual Domain Model) docs/diagrams/domain-model.md" [ref=e199] [cursor=pointer]:
                - generic [ref=e200]: "09"
                - generic [ref=e201]: النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)
                - generic [ref=e202]: docs/diagrams/domain-model.md
            - group [ref=e203]:
              - generic "10 أداة ومحرر PlantUML للنمذجة الهندسية ككود docs/diagrams/README-plantuml.md" [ref=e204] [cursor=pointer]:
                - generic [ref=e205]: "10"
                - generic [ref=e206]: أداة ومحرر PlantUML للنمذجة الهندسية ككود
                - generic [ref=e207]: docs/diagrams/README-plantuml.md
            - group [ref=e208]:
              - generic "11 مخطط حالات الاستخدام (Use Case Diagram) docs/diagrams/use-case.puml" [ref=e209] [cursor=pointer]:
                - generic [ref=e210]: "11"
                - generic [ref=e211]: مخطط حالات الاستخدام (Use Case Diagram)
                - generic [ref=e212]: docs/diagrams/use-case.puml
            - group [ref=e213]:
              - generic "12 مخطط النشاط وسير العمليات (Activity Diagram) docs/diagrams/activity-diagram.md" [ref=e214] [cursor=pointer]:
                - generic [ref=e215]: "12"
                - generic [ref=e216]: مخطط النشاط وسير العمليات (Activity Diagram)
                - generic [ref=e217]: docs/diagrams/activity-diagram.md
            - group [ref=e218]:
              - generic "13 مخطط الحالات ودورة حياة الكيانات (State Diagram) docs/diagrams/state-diagrams.md" [ref=e219] [cursor=pointer]:
                - generic [ref=e220]: "13"
                - generic [ref=e221]: مخطط الحالات ودورة حياة الكيانات (State Diagram)
                - generic [ref=e222]: docs/diagrams/state-diagrams.md
            - group [ref=e223]:
              - generic "14 مخطط العلاقات بين الكيانات (ERD) ونمذجة قواعد البيانات docs/ERD.md" [ref=e224] [cursor=pointer]:
                - generic [ref=e225]: "14"
                - generic [ref=e226]: مخطط العلاقات بين الكيانات (ERD) ونمذجة قواعد البيانات
                - generic [ref=e227]: docs/ERD.md
            - group [ref=e228]:
              - generic "15 لغة DBML ومحرر dbdiagram.io docs/database.dbml" [ref=e229] [cursor=pointer]:
                - generic [ref=e230]: "15"
                - generic [ref=e231]: لغة DBML ومحرر dbdiagram.io
                - generic [ref=e232]: docs/database.dbml
            - group [ref=e233]:
              - generic "16 مخطط تسلسل التفاعلات (Sequence Diagram) docs/diagrams/sequence-diagrams.md" [ref=e234] [cursor=pointer]:
                - generic [ref=e235]: "16"
                - generic [ref=e236]: مخطط تسلسل التفاعلات (Sequence Diagram)
                - generic [ref=e237]: docs/diagrams/sequence-diagrams.md
            - group [ref=e238]:
              - generic "17 مخطط الكلاسات البرمجية (Class Diagram) docs/diagrams/class-diagram.md" [ref=e239] [cursor=pointer]:
                - generic [ref=e240]: "17"
                - generic [ref=e241]: مخطط الكلاسات البرمجية (Class Diagram)
                - generic [ref=e242]: docs/diagrams/class-diagram.md
            - group [ref=e243]:
              - 'generic "18 تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل docs/UI_UX_REQUIREMENTS.md" [ref=e244] [cursor=pointer]':
                - generic [ref=e245]: "18"
                - generic [ref=e246]: "تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل"
                - generic [ref=e247]: docs/UI_UX_REQUIREMENTS.md
            - group [ref=e248]:
              - 'generic "19 مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة docs/UX_BLUEPRINT.md" [ref=e249] [cursor=pointer]':
                - generic [ref=e250]: "19"
                - generic [ref=e251]: "مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة"
                - generic [ref=e252]: docs/UX_BLUEPRINT.md
            - group [ref=e253]:
              - 'generic "20 جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات docs/SCREEN_INVENTORY.md" [ref=e254] [cursor=pointer]':
                - generic [ref=e255]: "20"
                - generic [ref=e256]: "جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات"
                - generic [ref=e257]: docs/SCREEN_INVENTORY.md
            - group [ref=e258]:
              - generic "21 تصميم الشاشة المرجعية في Google Stitch docs/STITCH_MASTER_PROMPT.md" [ref=e259] [cursor=pointer]:
                - generic [ref=e260]: "21"
                - generic [ref=e261]: تصميم الشاشة المرجعية في Google Stitch
                - generic [ref=e262]: docs/STITCH_MASTER_PROMPT.md
            - group [ref=e263]:
              - generic "22 قواعد نظام التصميم وبرومبتات الشاشات المنفصلة docs/STITCH_SCREEN_PROMPTS.md" [ref=e264] [cursor=pointer]:
                - generic [ref=e265]: "22"
                - generic [ref=e266]: قواعد نظام التصميم وبرومبتات الشاشات المنفصلة
                - generic [ref=e267]: docs/STITCH_SCREEN_PROMPTS.md
            - group [ref=e268]:
              - generic "23 النموذج التفاعلي (Prototype) والتحقق من الرحلات نموذج تفاعلي متصل في Google Stitch" [ref=e269] [cursor=pointer]:
                - generic [ref=e270]: "23"
                - generic [ref=e271]: النموذج التفاعلي (Prototype) والتحقق من الرحلات
                - generic [ref=e272]: نموذج تفاعلي متصل في Google Stitch
            - group [ref=e273]:
              - generic "24 وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent) docs/CODING_AGENT_SETUP.md" [ref=e274] [cursor=pointer]:
                - generic [ref=e275]: "24"
                - generic [ref=e276]: وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)
                - generic [ref=e277]: docs/CODING_AGENT_SETUP.md
            - group [ref=e278]:
              - generic "25 استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول docs/AI_STUDIO_WORKFLOW.md" [ref=e279] [cursor=pointer]:
                - generic [ref=e280]: "25"
                - generic [ref=e281]: استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول
                - generic [ref=e282]: docs/AI_STUDIO_WORKFLOW.md
            - group [ref=e283]:
              - generic "26 المهارات المخصصة (Skills) وتوجيه وكيل البرمجة docs/PROJECT_AGENT_SKILLS.md" [ref=e284] [cursor=pointer]:
                - generic [ref=e285]: "26"
                - generic [ref=e286]: المهارات المخصصة (Skills) وتوجيه وكيل البرمجة
                - generic [ref=e287]: docs/PROJECT_AGENT_SKILLS.md
            - group [ref=e288]:
              - generic "27 بروتوكول سياق النموذج (MCP - Model Context Protocol) docs/MCP_FOUNDATIONS.md" [ref=e289] [cursor=pointer]:
                - generic [ref=e290]: "27"
                - generic [ref=e291]: بروتوكول سياق النموذج (MCP - Model Context Protocol)
                - generic [ref=e292]: docs/MCP_FOUNDATIONS.md
            - group [ref=e293]:
              - generic "28 ربط Stitch MCP واسترجاع مراجع التصميم البصري docs/STITCH_SCREEN_REFERENCES.md" [ref=e294] [cursor=pointer]:
                - generic [ref=e295]: "28"
                - generic [ref=e296]: ربط Stitch MCP واسترجاع مراجع التصميم البصري
                - generic [ref=e297]: docs/STITCH_SCREEN_REFERENCES.md
            - group [ref=e298]:
              - generic "29 وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة DESIGN.md" [ref=e299] [cursor=pointer]:
                - generic [ref=e300]: "29"
                - generic [ref=e301]: وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة
                - generic [ref=e302]: DESIGN.md
            - group [ref=e303]:
              - 'generic "30 TypeScript: الأنواع وعقود البيانات لمشروع الطالب src/types/project.ts" [ref=e304] [cursor=pointer]':
                - generic [ref=e305]: "30"
                - generic [ref=e306]: "TypeScript: الأنواع وعقود البيانات لمشروع الطالب"
                - generic [ref=e307]: src/types/project.ts
            - group [ref=e308]:
              - 'generic "31 React: المكونات والحالة وتدفق البيانات في الواجهة src/components/common/StatusBadge.tsx" [ref=e309] [cursor=pointer]':
                - generic [ref=e310]: "31"
                - generic [ref=e311]: "React: المكونات والحالة وتدفق البيانات في الواجهة"
                - generic [ref=e312]: src/components/common/StatusBadge.tsx
            - group [ref=e313]:
              - 'generic "32 Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد src/app/globals.css (Tailwind v4؛ يطبق بعد تهيئة الموضوع 33)" [ref=e314] [cursor=pointer]':
                - generic [ref=e315]: "32"
                - generic [ref=e316]: "Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد"
                - generic [ref=e317]: src/app/globals.css (Tailwind v4؛ يطبق بعد تهيئة الموضوع 33)
            - group [ref=e318]:
              - 'generic "33 Next.js: بنية App Router والمسارات والصفحات src/app/layout.tsx" [ref=e319] [cursor=pointer]':
                - generic [ref=e320]: "33"
                - generic [ref=e321]: "Next.js: بنية App Router والمسارات والصفحات"
                - generic [ref=e322]: src/app/layout.tsx
            - group [ref=e323]:
              - generic "34 تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning) docs/FRONTEND_PLAN.md" [ref=e324] [cursor=pointer]:
                - generic [ref=e325]: "34"
                - generic [ref=e326]: تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)
                - generic [ref=e327]: docs/FRONTEND_PLAN.md
            - group [ref=e328]:
              - generic "35 مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max docs/UI_UX_PRO_MAX_AUDIT.md" [ref=e329] [cursor=pointer]:
                - generic [ref=e330]: "35"
                - generic [ref=e331]: مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max
                - generic [ref=e332]: docs/UI_UX_PRO_MAX_AUDIT.md
            - group [ref=e333]:
              - generic "36 تنظيم المواصفات وتطوير الميزات بـ Spec Kit docs/rules/frontend.md" [ref=e334] [cursor=pointer]:
                - generic [ref=e335]: "36"
                - generic [ref=e336]: تنظيم المواصفات وتطوير الميزات بـ Spec Kit
                - generic [ref=e337]: docs/rules/frontend.md
            - group [ref=e338]:
              - generic "37 التنفيذ التدريجي للفرونت إند وحالات الواجهة مكونات واجهة المستخدم التفاعلية (src/components/ وsrc/app/)" [ref=e339] [cursor=pointer]:
                - generic [ref=e340]: "37"
                - generic [ref=e341]: التنفيذ التدريجي للفرونت إند وحالات الواجهة
                - generic [ref=e342]: مكونات واجهة المستخدم التفاعلية (src/components/ وsrc/app/)
            - group [ref=e343]:
              - 'generic "38 Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب .env.example" [ref=e344] [cursor=pointer]':
                - generic [ref=e345]: "38"
                - generic [ref=e346]: "Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب"
                - generic [ref=e347]: .env.example
            - group [ref=e348]:
              - 'generic "39 PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار docs/DATABASE_CONNECTION_SPEC.md" [ref=e349] [cursor=pointer]':
                - generic [ref=e350]: "39"
                - generic [ref=e351]: "PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار"
                - generic [ref=e352]: docs/DATABASE_CONNECTION_SPEC.md
            - group [ref=e353]:
              - generic "40 معمارية Backend وعقود API لمشروع الطالب docs/API_CONTRACTS.md" [ref=e354] [cursor=pointer]:
                - generic [ref=e355]: "40"
                - generic [ref=e356]: معمارية Backend وعقود API لمشروع الطالب
                - generic [ref=e357]: docs/API_CONTRACTS.md
            - group [ref=e358]:
              - 'generic "41 Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1) backend/config/settings.py" [ref=e359] [cursor=pointer]':
                - generic [ref=e360]: "41"
                - generic [ref=e361]: "Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1)"
                - generic [ref=e362]: backend/config/settings.py
            - group [ref=e363]:
              - 'generic "42 FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2) backend/app/main.py" [ref=e364] [cursor=pointer]':
                - generic [ref=e365]: "42"
                - generic [ref=e366]: "FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2)"
                - generic [ref=e367]: backend/app/main.py
            - group [ref=e368]:
              - 'generic "43 المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC) backend/app/auth/ أو backend/apps/users/permissions.py" [ref=e369] [cursor=pointer]':
                - generic [ref=e370]: "43"
                - generic [ref=e371]: "المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC)"
                - generic [ref=e372]: backend/app/auth/ أو backend/apps/users/permissions.py
            - group [ref=e373]:
              - 'generic "44 Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة backend/app/services/ أو backend/apps/*/services.py" [ref=e374] [cursor=pointer]':
                - generic [ref=e375]: "44"
                - generic [ref=e376]: "Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة"
                - generic [ref=e377]: backend/app/services/ أو backend/apps/*/services.py
            - group [ref=e378]:
              - 'generic "45 ربط Frontend مع Backend: الطلبات والجلسات والأخطاء docs/FRONTEND_API_INTEGRATION.md" [ref=e379] [cursor=pointer]':
                - generic [ref=e380]: "45"
                - generic [ref=e381]: "ربط Frontend مع Backend: الطلبات والجلسات والأخطاء"
                - generic [ref=e382]: docs/FRONTEND_API_INTEGRATION.md
            - group [ref=e383]:
              - 'generic "46 Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج docs/INTEGRATION_TEST_PLAN.md" [ref=e384] [cursor=pointer]':
                - generic [ref=e385]: "46"
                - generic [ref=e386]: "Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج"
                - generic [ref=e387]: docs/INTEGRATION_TEST_PLAN.md
            - group [ref=e388]:
              - 'generic "47 هندسة أداء قاعدة البيانات: قِس ثم عالج docs/DATABASE_PERFORMANCE_REPORT.md" [ref=e389] [cursor=pointer]':
                - generic [ref=e390]: "47"
                - generic [ref=e391]: "هندسة أداء قاعدة البيانات: قِس ثم عالج"
                - generic [ref=e392]: docs/DATABASE_PERFORMANCE_REPORT.md
            - group [ref=e393]:
              - 'generic "48 Redis: قرار مشروط بمتطلبات مشروعك docs/REDIS_DECISION.md" [ref=e394] [cursor=pointer]':
                - generic [ref=e395]: "48"
                - generic [ref=e396]: "Redis: قرار مشروط بمتطلبات مشروعك"
                - generic [ref=e397]: docs/REDIS_DECISION.md
            - group [ref=e398]:
              - 'generic "49 QA: مراجعة متكاملة قبل التسليم docs/FINAL_QA_REPORT.md" [ref=e399] [cursor=pointer]':
                - generic [ref=e400]: "49"
                - generic [ref=e401]: "QA: مراجعة متكاملة قبل التسليم"
                - generic [ref=e402]: docs/FINAL_QA_REPORT.md
            - group [ref=e403]:
              - 'generic "50 Docker: بناء وتشغيل الحاويات لمشروع الطالب عند الحاجة docs/DOCKER_DECISION.md" [ref=e404] [cursor=pointer]':
                - generic [ref=e405]: "50"
                - generic [ref=e406]: "Docker: بناء وتشغيل الحاويات لمشروع الطالب عند الحاجة"
                - generic [ref=e407]: docs/DOCKER_DECISION.md
            - group [ref=e408]:
              - 'generic "51 Linux: تشغيل آمن لخادم المشروع عند اختياره docs/LINUX_RUNTIME_NOTES.md إذا كانت إدارة Linux ضمن المسار" [ref=e409] [cursor=pointer]':
                - generic [ref=e410]: "51"
                - generic [ref=e411]: "Linux: تشغيل آمن لخادم المشروع عند اختياره"
                - generic [ref=e412]: docs/LINUX_RUNTIME_NOTES.md إذا كانت إدارة Linux ضمن المسار
            - group [ref=e413]:
              - generic "52 نشر واجهة Next.js على Vercel رابط معاينة للواجهة يمكن مراجعته قبل الإنتاج" [ref=e414] [cursor=pointer]:
                - generic [ref=e415]: "52"
                - generic [ref=e416]: نشر واجهة Next.js على Vercel
                - generic [ref=e417]: رابط معاينة للواجهة يمكن مراجعته قبل الإنتاج
            - group [ref=e418]:
              - generic "53 نشر واجهة Next.js على Netlify رابط Deploy Preview يمكن مراجعته قبل الإنتاج" [ref=e419] [cursor=pointer]:
                - generic [ref=e420]: "53"
                - generic [ref=e421]: نشر واجهة Next.js على Netlify
                - generic [ref=e422]: رابط Deploy Preview يمكن مراجعته قبل الإنتاج
            - group [ref=e423]:
              - generic "54 نشر Backend وربطه بقاعدة البيانات رابط API عبر HTTPS ورابط نقطة صحة مفحوصة" [ref=e424] [cursor=pointer]:
                - generic [ref=e425]: "54"
                - generic [ref=e426]: نشر Backend وربطه بقاعدة البيانات
                - generic [ref=e427]: رابط API عبر HTTPS ورابط نقطة صحة مفحوصة
            - group [ref=e428]:
              - generic "55 CI/CD والمراقبة والنسخ الاحتياطي والتراجع docs/OPERATIONS_RUNBOOK.md" [ref=e429] [cursor=pointer]:
                - generic [ref=e430]: "55"
                - generic [ref=e431]: CI/CD والمراقبة والنسخ الاحتياطي والتراجع
                - generic [ref=e432]: docs/OPERATIONS_RUNBOOK.md
            - group [ref=e433]:
              - generic "56 توثيق وتسليم المشروع README.md" [ref=e434] [cursor=pointer]:
                - generic [ref=e435]: "56"
                - generic [ref=e436]: توثيق وتسليم المشروع
                - generic [ref=e437]: README.md
            - group [ref=e438]:
              - 'generic "57 Demo Day: عرض الفكرة والقرارات والقيود docs/DEMO_DAY_SCRIPT.md" [ref=e439] [cursor=pointer]':
                - generic [ref=e440]: "57"
                - generic [ref=e441]: "Demo Day: عرض الفكرة والقرارات والقيود"
                - generic [ref=e442]: docs/DEMO_DAY_SCRIPT.md
            - group [ref=e443]:
              - 'generic "58 Portfolio: عرض المساهمة والنتائج بصدق docs/PORTFOLIO_ENTRY.md" [ref=e444] [cursor=pointer]':
                - generic [ref=e445]: "58"
                - generic [ref=e446]: "Portfolio: عرض المساهمة والنتائج بصدق"
                - generic [ref=e447]: docs/PORTFOLIO_ENTRY.md
        - generic [ref=e448]:
          - generic [ref=e449]:
            - heading "أوامر التحقق" [level=2] [ref=e450]
            - generic [ref=e454]: "npx tsc --noEmit npm run build git status git diff git add . git commit -m \"feat: complete topic output\" git push origin feature/topic-output"
          - generic [ref=e455]:
            - heading "قواعد الأمان" [level=2] [ref=e456]
            - list [ref=e460]:
              - listitem [ref=e461]: "لا ترسل ملفات `.env` أو API keys."
              - listitem [ref=e462]: لا تضع الأسرار في Client Components أو GitHub.
              - listitem [ref=e463]: لا تدّعِ أن Feature مكتملة إذا فشل الفحص.
              - listitem [ref=e464]: لا تنتقل قبل وجود مخرج ومراجعة وCommit.
        - generic [ref=e465]:
          - strong [ref=e466]: "نسخة Markdown:"
          - text: يمكن فتح الملف المرجعي
          - code [ref=e467]: docs/PRACTICAL_PROMPTS_CHEATSHEET.md
          - text: من المستودع أو استخدام هذه الصفحة للنسخ المباشر.
  - contentinfo [ref=e468]:
    - generic [ref=e470]:
      - generic [ref=e471]: Don't Just Prompt. Engineer.
      - generic [ref=e474]: "منهجية التطوير: فهم ← توثيق ← تحليل ← تصميم ← تنفيذ تدريجي ← تحقق"
    - generic [ref=e475]:
      - generic [ref=e476]:
        - generic [ref=e477]:
          - generic [ref=e478]:
            - generic [ref=e479]: MET
            - generic [ref=e480]:
              - generic [ref=e481]: سلاح العصر
              - generic [ref=e482]: MET Academy
          - paragraph [ref=e483]: دورة تطبيقية متخصصة لنقل طلاب وهواة البرمجة من مجرد توجيه الأسئلة للذكاء الاصطناعي إلى قيادة عمليات هندسة البرمجيات وتحليل النظم وبناء منتجات Full-Stack قابلة للإنتاج والتسليم.
          - generic [ref=e484]: Next.js 15 App Router
        - generic [ref=e491]:
          - heading "المسار التعليمي" [level=4] [ref=e492]
          - list [ref=e493]:
            - listitem [ref=e494]:
              - link "› الرئيسية" [ref=e495] [cursor=pointer]:
                - /url: /
                - generic [ref=e496]: ›
                - text: الرئيسية
            - listitem [ref=e497]:
              - link "› ابدأ هنا (Start Here)" [ref=e498] [cursor=pointer]:
                - /url: /start
                - generic [ref=e499]: ›
                - text: ابدأ هنا (Start Here)
            - listitem [ref=e500]:
              - link "› مسار مواضيع التعلم" [ref=e501] [cursor=pointer]:
                - /url: /learn/project-idea-mvp
                - generic [ref=e502]: ›
                - text: مسار مواضيع التعلم
            - listitem [ref=e503]:
              - link "› ورشة مشروع BorrowHub" [ref=e504] [cursor=pointer]:
                - /url: /borrowhub
                - generic [ref=e505]: ›
                - text: ورشة مشروع BorrowHub
        - generic [ref=e506]:
          - heading "المختبرات والمكتبات" [level=4] [ref=e507]
          - list [ref=e508]:
            - listitem [ref=e509]:
              - link "› مكتبة البرومبتات الكاملة" [ref=e510] [cursor=pointer]:
                - /url: /prompts
                - generic [ref=e511]: ›
                - text: مكتبة البرومبتات الكاملة
            - listitem [ref=e512]:
              - link "› مسار مواضيع المشروع" [ref=e513] [cursor=pointer]:
                - /url: /roadmap
                - generic [ref=e514]: ›
                - text: مسار مواضيع المشروع
            - listitem [ref=e515]:
              - link "› Cheatsheet البرومبتات" [ref=e516] [cursor=pointer]:
                - /url: /cheatsheet
                - generic [ref=e517]: ›
                - text: Cheatsheet البرومبتات
            - listitem [ref=e518]:
              - link "› مختبر الـ8 مخططات (Mermaid)" [ref=e519] [cursor=pointer]:
                - /url: /diagrams
                - generic [ref=e520]: ›
                - text: مختبر الـ8 مخططات (Mermaid)
            - listitem [ref=e521]:
              - link "› وكلاء البرمجة (13 وكيلا)" [ref=e522] [cursor=pointer]:
                - /url: /tools
                - generic [ref=e523]: ›
                - text: وكلاء البرمجة (13 وكيلا)
            - listitem [ref=e524]:
              - link "› مؤشر الموديلات (الأفضل الآن)" [ref=e525] [cursor=pointer]:
                - /url: /models
                - generic [ref=e526]: ›
                - text: مؤشر الموديلات (الأفضل الآن)
            - listitem [ref=e527]:
              - link "› القوالب والملفات الهندسية" [ref=e528] [cursor=pointer]:
                - /url: /templates
                - generic [ref=e529]: ›
                - text: القوالب والملفات الهندسية
        - generic [ref=e530]:
          - heading "المراجع والمعلومات" [level=4] [ref=e531]
          - list [ref=e532]:
            - listitem [ref=e533]:
              - link "› القاموس التقني (35 مصطلح)" [ref=e534] [cursor=pointer]:
                - /url: /glossary
                - generic [ref=e535]: ›
                - text: القاموس التقني (35 مصطلح)
            - listitem [ref=e536]:
              - link "› الأسئلة الشائعة (FAQ)" [ref=e537] [cursor=pointer]:
                - /url: /faq
                - generic [ref=e538]: ›
                - text: الأسئلة الشائعة (FAQ)
            - listitem [ref=e539]:
              - link "› عن الدورة والأكاديمية" [ref=e540] [cursor=pointer]:
                - /url: /about
                - generic [ref=e541]: ›
                - text: عن الدورة والأكاديمية
          - button "العودة إلى أعلى الصفحة" [ref=e543] [cursor=pointer]:
            - generic [ref=e546]: العودة للأعلى
      - generic [ref=e547]: تنبيه تعليمي وأمني:جميع المواد المعروضة مخصصة للأغراض التعليمية في دورة سلاح العصر. الروابط والأدوات الخارجية (مثل Google Stitch, Mermaid, GitHub, Antigravity) مملوكة لأصحابها. يُحظر تمامًا تخزين أو نشر مفاتيح API الخاصة أو كلمات المرور أو أسرار الأنظمة داخل مستودعات Git العامة.
      - generic [ref=e552]:
        - generic [ref=e553]: جميع الحقوق محفوظة © 2026 MET Academy — دورة سلاح العصر (Weapon of the Era)
        - generic [ref=e554]:
          - generic [ref=e555]: نسخة التطوير المعتمدة 1.0
          - generic [ref=e556]: •
          - generic [ref=e557]: dir="rtl"
  - alert [ref=e558]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Cheatsheet Page E2E', () => {
  4  |   test('Cheatsheet presents source-approved 58 topics, canonical links, and faithful prompt copy availability', async ({ page, context }) => {
  5  |     await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  6  |     await page.goto('/cheatsheet');
  7  | 
  8  |     // Page has exactly ONE main landmark and its existing #main-content target remains the skip-link destination
  9  |     const main = page.getByRole('main');
> 10 |     await expect(main).toHaveCount(1);
     |                        ^ Error: expect(locator).toHaveCount(expected) failed
  11 |     await expect(main).toHaveId('main-content');
  12 |     await expect(page.locator('a[href="#main-content"]')).toHaveAttribute('href', '#main-content');
  13 | 
  14 |     // Header & metadata
  15 |     await expect(page.locator('h1')).toContainText('Practical Prompts Cheatsheet');
  16 | 
  17 |     // Topic count badge must independently reflect source-approved 58 topics, not retired 20 lessons
  18 |     const mainHeader = page.locator('main header');
  19 |     await expect(mainHeader).toContainText('58 موضوعًا');
  20 |     await expect(mainHeader).not.toContainText('20 درسًا');
  21 | 
  22 |     // Navigation back link should lead to canonical project path, not retired roadmap reader
  23 |     const backLink = page.locator('a[href="/start#project-path"]').first();
  24 |     await expect(backLink).toBeVisible();
  25 |     await expect(backLink).toContainText('مسار المشروع');
  26 | 
  27 |     // Zero links to retired roadmap reader /roadmap/[number]
  28 |     const retiredRoadmapLinks = page.locator('a[href^="/roadmap/"]');
  29 |     await expect(retiredRoadmapLinks).toHaveCount(0);
  30 | 
  31 |     // Generic copy prompts (Prompt A, B, C) are available
  32 |     await expect(page.locator('text=Prompt A — التحضير والتنفيذ')).toBeVisible();
  33 |     await expect(page.locator('text=Prompt B — المراجعة')).toBeVisible();
  34 |     await expect(page.locator('text=Prompt C — التسليم والتوثيق')).toBeVisible();
  35 | 
  36 |     // Section title uses canonical project/topic terminology, not retired lectures
  37 |     await expect(page.locator('text=السلسلة الأساسية لكل محاضرة')).toHaveCount(0);
  38 | 
  39 |     // Source-approved 58 topic details independently asserted
  40 |     const topicDetails = page.locator('details');
  41 |     await expect(topicDetails).toHaveCount(58);
  42 | 
  43 |     // Canonical first topic (01 - project-idea-mvp): open details before testing enclosed link
  44 |     const firstTopicDetails = topicDetails.first();
  45 |     await expect(firstTopicDetails).toContainText('01');
  46 |     await expect(firstTopicDetails).toContainText('اختيار فكرة المشروع وتحديد MVP');
  47 |     await firstTopicDetails.locator('summary').click();
  48 |     const firstTopicLink = firstTopicDetails.locator('a[href="/learn/project-idea-mvp"]');
  49 |     await expect(firstTopicLink).toBeVisible();
  50 | 
  51 |     // Canonical Activity Diagram topic (12 - activity-diagram):
  52 |     // open details before testing enclosed link, verify real accessible copy button and clipboard match to pre
  53 |     const activityDetails = page.locator('details').filter({ hasText: 'مخطط النشاط وسير العمليات' });
  54 |     await expect(activityDetails).toBeVisible();
  55 |     await activityDetails.locator('summary').click();
  56 |     const activityLink = activityDetails.locator('a[href="/learn/activity-diagram"]');
  57 |     await expect(activityLink).toBeVisible();
  58 | 
  59 |     const activityPre = activityDetails.locator('pre');
  60 |     await expect(activityPre).toBeVisible();
  61 |     await expect(activityPre).toContainText('Act as a Senior Business Process Analyst');
  62 |     const expectedActivityPrompt = await activityPre.textContent();
  63 | 
  64 |     const copyButton = activityDetails.getByRole('button', { name: 'نسخ البرومبت' });
  65 |     await expect(copyButton).toBeVisible();
  66 |     await copyButton.click();
  67 |     await expect(activityDetails.getByRole('button')).toHaveText('تم النسخ ✓');
  68 |     await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedActivityPrompt);
  69 | 
  70 |     // Canonical Redis topic (48 - redis-optional-infrastructure):
  71 |     // open details before testing enclosed link, verify no-prompt message and no actual button
  72 |     const redisTopicDetails = page.locator('details').filter({ hasText: 'Redis: قرار مشروط' });
  73 |     await expect(redisTopicDetails).toBeVisible();
  74 |     await redisTopicDetails.locator('summary').click();
  75 |     const redisLink = redisTopicDetails.locator('a[href="/learn/redis-optional-infrastructure"]');
  76 |     await expect(redisLink).toBeVisible();
  77 | 
  78 |     await expect(redisTopicDetails).toContainText('لا يوجد برومبت مخصص');
  79 |     await expect(redisTopicDetails.locator('button')).toHaveCount(0);
  80 |     await expect(redisTopicDetails.getByRole('button', { name: 'نسخ البرومبت' })).toHaveCount(0);
  81 |     await expect(redisTopicDetails.locator('pre')).toHaveCount(0);
  82 |   });
  83 | });
  84 | 
```