# Issue #52 — Release the complete Discovery, PRD, and SRS group

**State:** Evidence complete and awaiting course-owner sign-off. Group 02 educational review and verification are completed; group release and status advancement remain pending course-owner sign-off.
**Sample artifact packet:** [Discovery, PRD, and SRS fictional project outputs](samples/group-02-discovery-prd-srs.md).
**Proposed boundary:** 3 Topics in Discovery, PRD, and SRS (`discovery-grill-me`, `prd-specification`, `srs`). Membership matches the proposed roadmap and preserves the complete 58-Topic scope.

The existing reader content remains available for every canonical Topic. Learning records are keyed by those stable slugs. No Topic is locked behind a prerequisite; all prerequisites serve as pedagogical guidance only. BorrowHub worked examples are explicitly optional across all topics.

---

## Member-by-Member Walkthrough & Educational Review

### Topic 02: `discovery-grill-me` (استجواب الفكرة واستكشاف المتطلبات)

- **Suggested input / handoff:** Suggested handoff from Topic 01: `docs/PROJECT_CONTEXT.md` (or any initial project statement chosen by the learner). Prerequisites are guidance only, not access locks.
- **Objectives:**
  - `discovery-objective-interview`: إدارة مقابلة استكشاف متطلبات بسؤال واحد في كل مرة دون أن يخترع الوكيل قواعد.
  - `discovery-objective-record`: تسجيل القرارات والافتراضات والأسئلة المفتوحة وربطها بسياق المشروع.
- **Authored learning path & sections:**
  1. *المدخل: سياق مشروع مؤقت*: ابدأ من `docs/PROJECT_CONTEXT.md` دون ملء الفراغات بتخمينات عشوائية من النموذج.
  2. *مقابلة متدرجة*: سؤال واحد واضح في كل رسالة؛ الاستفسار عن الأدوار والهدف والقواعد والاستثناءات، وتحدي الإجابات الفضفاضة.
  3. *مخرج قابل للتتبع*: `docs/DECISIONS_LOG.md` يميز القرارات المؤكدة عن الافتراضات المقترحة والأسئلة المفتوحة.
- **Worked example:**
  - Title: *BorrowHub اختياري: تحديد معنى الطلب النشط* (`caseStudy: 'borrowhub-optional'`).
  - Context: توضيح أن حد الاستعارة المتزامنة (معدتان) يحتاج تدقيقاً لتعريف حالة "نشط".
  - Result: طرح سؤال المقابلة على صاحب المشروع لحسم الحالات التي تشكل طلباً نشطاً، وتثبيتها كقرار معتمد فقط بعد إجابته، وإبقائها سؤالاً مفتوحاً حتى تحسم.
- **Practical steps & expected outputs:**
  1. *Step 1*: تشغيل المقابلة عبر برومبت Grill Me المعتمد، ومراقبة الالتزام بسؤال واحد في كل مرة والإجابة دون ترك الوكيل يقرر قواعد العمل.
     - Expected output: ملاحظات مقابلة استكشافية تتضمن السؤال والإجابة ومصدر/حالة المعلومة لكل قرار.
  2. *Step 2*: نقل القرارات إلى سجل القرارات، وعزل الافتراضات والأسئلة المفتوحة.
     - Expected output: `docs/DECISIONS_LOG.md` بقرارات قابلة للتتبع وقائمة أسئلة مفتوحة.
- **Declared outputs:**
  - `decisions-log`: `docs/DECISIONS_LOG.md` مع مصدر القرار وصاحبه وتاريخه أو حالته.
  - `open-questions`: قائمة الأسئلة المفتوحة والافتراضات التي تحتاج جواباً أو تحققاً.
- **Prompts:**
  - `PROMPT 01 — Grill Me: Product Discovery` (`prompt-01-grill-me-product-discovery`): برومبت استجوابي مهيكل يلزم النموذج بدور مدير منتج ومحلل أعمال أول، بطرح سؤال واحد في كل مرة والامتناع عن كتابة الكود أو اختراع قواعد.
- **Exercise:**
  - تطبيق جلسة Grill Me على فكرة مشروع المتعلم المستقل، وتدوين القرارات المؤكدة وتحدي الغموض، وفصل ميزات MVP عن الميزات المؤجلة (Non-Goals).
- **Assessment questions:**
  - `discovery-q-one-at-time` (Objective: `discovery-objective-interview`):
    - *Prompt*: ما السلوك الصحيح عندما لا يعرف صاحب المشروع هل الطلب المعلّق يمكن إلغاؤه؟
    - *Options*: 0: اختيار قاعدة افتراضية ومتابعة PRD | 1: طرح سؤال محدد وتسجيله مفتوحاً حتى يجيب صاحب القرار | 2: حذف حالة الإلغاء من كل الوثائق | 3: اعتبار اقتراح الوكيل قراراً.
    - *Correct*: Option 1 (طرح سؤال محدد وتسجيله مفتوحاً حتى يجيب صاحب القرار).
    - *Rationale*: Grill Me يكشف الغموض ولا يملك سلطة اختراع سياسة المنتج. يسجل السؤال ومصدر الإجابة المطلوب.
  - `discovery-q-decision-log` (Objective: `discovery-objective-record`):
    - *Prompt*: ماذا يجب أن يميز سجل القرار بينه وبين الافتراض؟
    - *Options*: 0: القرار مؤكد من صاحبه أو مصدر موثق؛ الافتراض ينتظر التحقق | 1: القرار هو الأحدث زمنياً دائماً | 2: الافتراض قاعدة يمكن تنفيذها فوراً | 3: لا فرق إذا كان النص واضحاً.
    - *Correct*: Option 0 (القرار مؤكد من صاحبه أو مصدر موثق؛ الافتراض ينتظر التحقق).
    - *Rationale*: التوثيق يبين درجة اليقين ومصدره. وضوح الصياغة لا يحول التخمين إلى اعتماد.
- **Practical rubric criteria:**
  - `discovery-r-trace` (Target: `decisions-log`): مصدر القرار — لكل قرار مؤكد صاحب أو مصدر، وتظل غير المحسوم غير محسومة.
    - *Evidence prompt*: اختر قراراً من السجل وأظهر من أكده؛ ثم أشر إلى سؤال ما زال مفتوحاً.
  - `discovery-r-scope` (Target: `open-questions`): انضباط المقابلة — تسلسل الأسئلة يكشف الغموض دون تحويل اقتراحات الذكاء الاصطناعي إلى متطلبات.
    - *Evidence prompt*: أظهر سؤالاً واحداً وإجابة وردت فعلاً، أو اكتب لماذا لم يحسم السؤال.
- **External video candidate:**
  - Title: *Introduction to Jira Product Discovery: video*
  - Resource ID: `atlassian-product-discovery`
  - URL: `https://community.atlassian.com/forums/discussion/2867261/introduction-to-jira-product-discovery-video`
  - Evidence: سياق مجاور من مجتمع Atlassian يوضح تنظيم الفرص والأفكار وترتيب الأولويات. لا يعلم المقابلة الحازمة سؤالاً بسؤال؛ يظل برومبت وسجل الدورة أساسيين. حالة الفيديو مرشح (Candidate)؛ لم يتم التحقق من إمكانية التشغيل أو التسميات التوضيحية أو التوافق مع إمكانية الوصول، وقرار الاعتماد مؤجل لصاحب الدورة.
- **Walkthrough results:**
  | العنصر | الحالة | الملاحظات والنتائج |
  |---|---|---|
  | المدخلات والسياق | **Passed** | `docs/PROJECT_CONTEXT.md` محدد بدقة؛ المتطلبات الاسترشادية لا تغلق الوصول للموضوع. |
  | الشرح النظري والمفاهيم | **Passed** | تغطية ركائز Grill Me وتفصيل المستويات الثلاثة (مؤكد/افتراض/مفتوح) والتنبيه لعدم الحاجة لأدوات بيئية. |
  | المثال المحلول | **Passed** | مثال BorrowHub موسوم صراحة كدراسة حالة اختيارية (`borrowhub-optional`). |
  | التمرين التطبيقي | **Passed** | خطوات عملية واضحة لتنفيذ المقابلة على مشروع المتعلم الخاص. |
  | البرومبت المعتمد | **Passed** | برومبت `PROMPT 01` مطابق للمكتبة مع أمر السؤال الواحد وعدم اختراع قواعد. |
  | المخرجات المتوقعة | **Passed** | توليد `docs/DECISIONS_LOG.md` وقائمة الأسئلة المفتوحة وتطابق معرفاتها. |
  | بنك الأسئلة والتقييم الذاتي | **Passed** | السؤالان مربوطان بالأهداف التعليمية، والإجابات الصحيحة وشروحها دقيقة وتربوية. |
  | معايير التقييم الذاتي (Rubric) | **Passed** | المعياران مرتبطان بمخرجي `decisions-log` و`open-questions` بدقة وبمستويات مقياس معتمد. |
  | مورد الفيديو الخارجي | **Passed** | مسجل كمرشح فقط مع إخلاء مسؤولية صريح وعدم ادعاء التحقق من التشغيل. |

---

### Topic 03: `prd-specification` (وثيقة متطلبات المنتج ومراجعتها النقدية)

- **Suggested input / handoff:** Suggested handoff from Discovery: `docs/DECISIONS_LOG.md` متضمناً القرارات المعتمدة والافتراضات وقائمة الأسئلة المفتوحة.
- **Objectives:**
  - `prd-objective-source`: تحويل القرارات المعتمدة في سجل الاستكشاف إلى متطلبات دون رفع الافتراض إلى حقيقة.
  - `prd-objective-verify`: ترقيم المتطلبات ومراجعة التناقض والنطاق باستخدام شروط يمكن فحصها.
- **Authored learning path & sections:**
  1. *المدخل: سجل قرار لا ملخص حر*: الاعتماد الحصري على قرارات `docs/DECISIONS_LOG.md` وإبقاء النقاط المفتوحة غير محسومة.
  2. *المتطلب القابل للمراجعة*: عزل المتطلبات الوظيفية (FR) عن غير الوظيفية (NFR) وقواعد العمل (BR)، وترقيمها بمعرفات فريدة ومستويات أولوية (Must/Should/Nice).
  3. *مراجعة النطاق والاتساق*: جدول الأقسام الـ27 المرجعية كاملاً، وتشغيل المراجعة النقدية لكشف تناقض الصلاحيات، ثغرات النطاق، والعبارات الفضفاضة في `docs/PRD_REVIEW.md`.
- **Worked example:**
  - Title: *BorrowHub اختياري: تحويل قاعدة استعارة إلى PRD* (`caseStudy: 'borrowhub-optional'`).
  - Context: تحويل قاعدة الحد الأقصى للمعدات المستعارة إلى متطلب وظيفي معتمد، مع عدم إقحام شروط اعتماد من كيس الكاتب بل تسجيلها كسؤال مفتوح.
  - Result: تسجيل FR لاستعراض الطلبات النشطة فقط إذا أكدها المالك، وإبقاء شروط الحالات المعلقة سؤالاً مفتوحاً.
- **Practical steps & expected outputs:**
  1. *Step 1*: بناء مسودة PRD متكاملة تتضمن الأقسام الـ27 استناداً إلى القرارات المؤكدة في سجل المقابلة فقط.
     - Expected output: `docs/PRD.md` بالأقسام المرجعية كاملة مع عزل المؤكد عن الافتراضات.
  2. *Step 2*: مراجعة النطاق والاتساق واستخراج ما لا يقل عن خمس مشكلات وتوثيق معالجتها في تقرير مراجعة.
     - Expected output: `docs/PRD_REVIEW.md` يربط ملاحظات المراجعة وتصحيحاتها بمعرفات المتطلبات.
- **Declared outputs:**
  - `prd`: `docs/PRD.md` بالأقسام المرجعية ومعرفات المتطلبات والأولويات والمصادر وحالة الأسئلة.
  - `prd-review`: `docs/PRD_REVIEW.md` يربط كل ملاحظة أو تصحيح بالمتطلب المعني.
- **Prompts:**
  - `PROMPT 02 — Generate PRD after Grill Me` (`prompt-02-generate-prd-after-grill-me`): برومبت توليد الوثيقة بالأقسام الـ27 المرجعية.
  - `PROMPT 03 — PRD Review` (`prompt-03-prd-review`): برومبت المراجعة النقدية لكشف الثغرات المعمارية.
- **Exercise:**
  - صياغة وثيقة PRD كاملة لمشروع المتعلم وإجراء فحص نقدي صارم وتوثيق الثغرات في جدول `docs/PRD_REVIEW.md`.
- **Assessment questions:**
  - `prd-q-open-rule` (Objective: `prd-objective-source`):
    - *Prompt*: سجل المقابلة لا يحسم شرط إلغاء الطلب. كيف يظهر في PRD؟
    - *Options*: 0: قاعدة افتراضية تبدو مناسبة | 1: سؤال مفتوح لا يقدم كمتطلب مؤكد | 2: شرط قبول ناجح | 3: قرار من فريق التطوير.
    - *Correct*: Option 1 (سؤال مفتوح لا يقدم كمتطلب مؤكد).
    - *Rationale*: المصدر الوحيد لا يثبت قراراً لم يصدر. يظل السؤال مفتوحاً إلى أن يجيب صاحب المنتج.
  - `prd-q-traceable` (Objective: `prd-objective-verify`):
    - *Prompt*: أي معرف أنسب لمتطلب وظيفي مستقل يمكن تتبعه في مراجعة PRD؟
    - *Options*: 0: لون-أزرق | 1: FR-004 مع أولوية ومصدر أو حالة | 2: ملاحظة أخيرة بلا مرجع | 3: رقم الصفحة فقط.
    - *Correct*: Option 1 (FR-004 مع أولوية ومصدر أو حالة).
    - *Rationale*: المعرف المستقر يساعد على تتبع المتطلب في المراجعة وSRS والاختبار؛ الصفحة قد تتغير ولا تبين نوع المتطلب أو مصدره.
- **Practical rubric criteria:**
  - `prd-r-source` (Target: `prd`): سلامة مصدر المتطلبات — المؤكد والافتراضي والمفتوح منفصل، ومعرفات المتطلبات قابلة للتتبع.
    - *Evidence prompt*: تتبع متطلباً إلى قرار مصدره وبيّن كيف سُجلت النقطة المفتوحة.
  - `prd-r-review` (Target: `prd-review`): قابلية مراجعة التناقض — ملاحظات المراجعة تشير إلى دليل محدد ولا تحسم القرار نيابة عن المالك.
    - *Evidence prompt*: أشر إلى ملاحظة مرتبطة بمعرف متطلب ووضح التغيير الذي ينتظر اعتماداً.
- **External video candidate:**
  - Title: *Using the Product Requirements blueprint in Confluence*
  - Resource ID: `atlassian-prd-blueprint`
  - URL: `https://www.youtube.com/watch?v=bUL1D7pCfLI`
  - Evidence: فيديو من Atlassian يشرح هيكلة متطلبات المنتج ومخططها المرجعي في بيئات العمل. يقدم سياقاً عملياً لهيكلة المستند؛ ويظل عزل الافتراضات التزاماً للمتعلم. حالة الفيديو مرشح (Candidate) مع تعليق التحقق المباشر من التشغيل والترجمة لصاحب الدورة.
- **Walkthrough results:**
  | العنصر | الحالة | الملاحظات والنتائج |
  |---|---|---|
  | المدخلات والسياق | **Passed** | الاستناد إلى سجل القرارات مع التحذير من تخمين ما لم يُحسم. |
  | الشرح النظري والمفاهيم | **Passed** | تفصيل الأقسام الـ27 بالجدول ثنائي اللغة وتوضيح أسباب المراجعة النقدية. |
  | المثال المحلول | **Passed** | وسم صريح بأن BorrowHub دراسة حالة اختيارية. |
  | التمرين التطبيقي | **Passed** | صياغة ومراجعة PRD لمشروع المتعلم الفعلي مع حفظ الملفين المعتمدين. |
  | البرومبتات المعتمدة | **Passed** | توفر PROMPT 02 وPROMPT 03 وتوافقهما مع ضوابط عدم البرمجة أو التصميم الصامت. |
  | المخرجات المتوقعة | **Passed** | `docs/PRD.md` و`docs/PRD_REVIEW.md` مع قابلية التتبع. |
  | بنك الأسئلة والتقييم الذاتي | **Passed** | السؤالان والخيارات ومفاتيح الإجابة والشروح دقيقة وتربوية. |
  | معايير التقييم الذاتي (Rubric) | **Passed** | ربط دقيق بمعرفات `prd` و`prd-review` مع أسئلة تأملية للمتعلم. |
  | مورد الفيديو الخارجي | **Passed** | مسجل كمرشح خارجي مع بيان مصدره والقيود الزمنية لواجهته. |

---

### Topic 04: `srs` (مواصفات متطلبات النظام وتوصيف السلوك)

- **Suggested input / handoff:** Suggested handoff from PRD: وثيقة `docs/PRD.md` وتقرير المراجعة `docs/PRD_REVIEW.md` بمتطلباتها ومعرفاتها المعتمدة.
- **Objectives:**
  - `srs-objective-behavior`: تحويل متطلب PRD معتمد إلى شروط سلوك ومدخلات ومخرجات وحالات فشل قابلة للاختبار.
  - `srs-objective-traceability`: ربط كل بند سلوكي بمتطلب مصدر وتغطية المسارات المتوقعة دون اختراع سياسة.
- **Authored learning path & sections:**
  1. *المدخل: معرف متطلب ومصدر حاسم*: مقارنة معيارية بين PRD (ماذا نبني ولماذا) وSRS (كيف يتصرف النظام تقنياً)، وعدم خلق سياسات جديدة داخل SRS.
  2. *تفصيل السلوك*: تفكيك المتطلب الوظيفي إلى الشروط المسبقة، قواعد التحقق، تغييرات الحالة، واستجابات النظام ومخرجاته.
  3. *معيار قبول قابل للتنفيذ*: صياغة Given/When/Then الثلاثية الإلزامية التي تغطي المسار السليم، حالات الرفض والتحقق، وحالات التنافس ونفاد المخزون (Race Conditions & Idempotency)، مع مصفوفة تتبع المتطلبات.
- **Worked example:**
  - Title: *BorrowHub اختياري: تتبع طلب استعارة* (`caseStudy: 'borrowhub-optional'`).
  - Context: صياغة سيناريو Given/When/Then لطلب استعارة بناءً على متطلبات PRD المعتمدة.
  - Result: Given حساب معتمد ووحدة متاحة، When يرسل الطالب مدة وسبباً غير فارغين، Then ينشأ طلب للمراجعة. حالات الرفض تذكر فقط ما حسمه PRD.
- **Practical steps & expected outputs:**
  1. *Step 1*: اختيار متطلب وظيفي معتمد وتفكيك سلوكه تقنياً وحالاته الحدية ورسائل أخطائه.
     - Expected output: سيناريو سلوكي مفصل في `docs/SRS.md` مربوط بمعرف FR/BR.
  2. *Step 2*: كتابة معايير Given/When/Then لكل سيناريو وبناء مصفوفة تتبع المتطلبات.
     - Expected output: مصفوفة `PRD -> SRS` تضمن تغطية كل متطلب وعدم اختراع سلوكيات دون مصدر.
- **Declared outputs:**
  - `srs`: `docs/SRS.md` يحدد السلوك والتحقق والاستجابة والحالات المقبولة والمرفوضة.
  - `requirements-traceability`: مصفوفة تربط كل سيناريو ومعيار قبول بمعرف متطلب المصدر.
- **Prompts:**
  - برومبت استخراج مواصفات السلوك ومعايير القبول (SRS Generation Prompt) الموجه من وثيقة PRD وتقرير المراجعة.
- **Exercise:**
  - تفكيك متطلبات مشروع المتعلم إلى سيناريوهات سلوكية دقيقة داخل `docs/SRS.md` وصياغة معايير القبول ومصفوفة التتبع.
- **Assessment questions:**
  - `srs-q-trace-source` (Objective: `srs-objective-traceability`):
    - *Prompt*: كيف تكتب حالة إلغاء لم يقررها PRD؟
    - *Options*: 0: تخترع السلوك المرجح | 1: تسجل الاعتماد أو السؤال المفتوح وتؤجل معيار القبول | 2: تكتب Then: يلغى دائماً | 3: تحذف المتطلب الأصلي.
    - *Correct*: Option 1 (تسجل الاعتماد أو السؤال المفتوح وتؤجل معيار القبول).
    - *Rationale*: SRS يفصل ما تقرر عن ما ينتظر قراراً. صياغة Given/When/Then لا تجعل القاعدة المخترعة صحيحة.
  - `srs-q-gwt` (Objective: `srs-objective-behavior`):
    - *Prompt*: ما الذي يجعل معيار القبول Given/When/Then قابلاً للاختبار؟
    - *Options*: 0: أن يسمي شرط البداية والفعل والنتيجة المرئية | 1: أن يكرر الهدف التسويقي | 2: أن يذكر لغة البرمجة فقط | 3: أن يستخدم كلمة “سهل” بلا دليل.
    - *Correct*: Option 0 (أن يسمي شرط البداية والفعل والنتيجة المرئية).
    - *Rationale*: السياق والفعل والنتيجة تسمح للمراجع بتهيئة السيناريو والتحقق مما حدث.
- **Practical rubric criteria:**
  - `srs-r-scenario` (Target: `srs`): سلوك محدد المصدر — يذكر السيناريو الشروط والنتيجة وحالات الرفض التي قررها المنتج.
    - *Evidence prompt*: أشر إلى متطلب المصدر وسيناريو ناجح وآخر طرفي.
  - `srs-r-trace` (Target: `requirements-traceability`): تتبع المتطلبات — لكل سيناريو معرف مصدر ولا توجد قواعد بلا سند.
    - *Evidence prompt*: اختر صفين من المصفوفة وتحقق من أن FR/BR موجود في PRD.
- **External video candidate:**
  - Title: *SRS: CS445/ECE451 video*
  - Resource ID: `uw-waterloo-srs`
  - URL: `https://student.cs.uwaterloo.ca/~cs445/Winter2026/project/srs/index.html`
  - Evidence: مادة أكاديمية من جامعة واترلو (CS445/ECE451) تشرح هيكلة وثيقة مواصفات النظام استناداً إلى معايير هندسة البرمجيات. الفيديو مرشح (Candidate) ولم يتم سحبه أو تشغيله مباشرة في هذه المراجعة.
- **Walkthrough results:**
  | العنصر | الحالة | الملاحظات والنتائج |
  |---|---|---|
  | المدخلات والسياق | **Passed** | استلام PRD وتقرير المراجعة كمرجع وحيد بدون متطلبات دخول معطلة. |
  | الشرح النظري والمفاهيم | **Passed** | تمييز واضح بين PRD وSRS، وتفصيل العناصر الأربعة وصيغة Given/When/Then. |
  | المثال المحلول | **Passed** | إبراز سيناريوهات BorrowHub الثلاثة وتأكيد صفتها الاختيارية. |
  | التمرين التطبيقي | **Passed** | تفكيك السلوك وصياغة مصفوفة التتبع لمشروع المتعلم الخاص. |
  | البرومبت المعتمد | **Passed** | برومبت استخراج SRS يلزم الوكيل بعدم اختراع ميزات جديدة. |
  | المخرجات المتوقعة | **Passed** | توليد `docs/SRS.md` ومصفوفة تتبع المتطلبات مع مطابقة المعرفات. |
  | بنك الأسئلة والتقييم الذاتي | **Passed** | السؤالان والمفاتيح والشروح دقيقة وتؤكد عدم اختراع القواعد. |
  | معايير التقييم الذاتي (Rubric) | **Passed** | ربط صريح بمعرفي `srs` و`requirements-traceability`. |
  | مورد الفيديو الخارجي | **Passed** | تسجيل المرشح مع إخلاء مسؤولية التشغيل والترجمة. |

---

## Sample Outputs Produced for Group 02

The sample artifacts produced for this group are fully documented in `docs/curriculum/samples/group-02-discovery-prd-srs.md` for a representative study-group scheduling exercise:

1. **`docs/DECISIONS_LOG.md` (Topic 02):**
   - Decisions: D-01 (propose three candidate meeting times), D-02 (participant records one preferred option).
   - Assumptions: A-01 (shared link and alias).
   - Open questions: Q-01 (editing preferences), Q-02 (tie breaking), Q-03 (timezone/timestamp format), Q-04 (storage failure/race condition user message), Q-05 (selected option storage and visibility).
2. **`docs/PRD.md` & `docs/PRD_REVIEW.md` (Topic 03):**
   - 27 complete reference sections following the curriculum standard.
   - Traceable requirement IDs: FR-001 through FR-006, BR-001, NFR-001.
   - Critical review table with 7 identified high/medium severity findings with locations, risks, and proposed next steps.
3. **`docs/SRS.md` & `docs/SRS_TRACEABILITY.md` (Topic 04):**
   - 10 concrete behavioral scenarios with strict Given / When / Then criteria covering happy paths (SRS-01, SRS-02), validation errors (SRS-03, SRS-04, SRS-05), invariants & concurrency (SRS-06, SRS-07), review/result (SRS-08, SRS-09), and system outage safety (SRS-10).
   - Comprehensive traceability matrix mapping every scenario back to PRD source IDs.

---

## Gaps Identified & Corrections Made

1. **Product Name Consistency (DEC-50):**
   - Verified that neither `src/data/learning/group-a-02-discovery-prd-srs.ts` nor `src/data/topics/wave2/t02-discovery-prd-srs.ts` contains references to legacy product names (سلاح العصر, Weapon of the Era, MET Academy).
   - Confirmed all learner touchpoints reflect the approved **Ai_agents** identity.
2. **Prerequisites & Access Flow:**
   - Confirmed that prerequisites on all three topics (`discovery-grill-me`, `prd-specification`, `srs`) contain explicit notices stating they are for orientation and guidance only, and that any topic may be studied directly without completion gates.
   - Verified that no foundational topics were added, preserving the canonical 58-Topic scope.
3. **Optional Case Study Discipline:**
   - Ensured all BorrowHub examples remain clearly and explicitly labeled as optional (`borrowhub-optional` / `مثال اختياري`).
4. **End-to-End Test Suite Extension:**
   - Extended `e2e/path/discovery-prd-srs.spec.ts` to cover:
     - Rendering of sections, learning objectives, practical steps, and expected outputs across all three topics.
     - Clipboard copy functionality on code/prompts with user feedback ("تم النسخ") and payload verification.
     - Objective quiz grading with correct/incorrect feedback, educational rationale display, and retry functionality.
     - Practical rubric self-assessment editing, reversal, and persistence across browser reloads.
     - Application checklist editing, persistence across reload, and reversal.
     - RTL page layout direction with LTR technical code blocks.
     - Mobile responsiveness at 390px viewport with no horizontal overflow (`scrollWidth <= clientWidth + 2`).

---

## Verification & Gate Summary

- **TypeScript Linting (`npm run lint`):** Passed (zero errors).
- **Unit & Content Contract Tests (`npx tsx --test src/lib/*.test.ts`):** 80 tests passed, 0 failed, 0 skipped.
- **Production Build (`npm run build`):** Compiled successfully, all 182 static pages generated.
- **Playwright Path Suite (`E2E_SERVER=production E2E_PORT=3202 npx playwright test e2e/path/discovery-prd-srs.spec.ts`):** 12 tests passed, 0 failed.

---

## Release Status for Group 02

**Evidence complete and awaiting course-owner sign-off.**
All curriculum elements for Group 02 (`discovery-grill-me`, `prd-specification`, `srs`) have undergone comprehensive educational review, walkthrough verification, sample output production, and automated browser testing. Content review states remain `draft` in accordance with the orchestrator workflow pending final sign-off by the course owner.
