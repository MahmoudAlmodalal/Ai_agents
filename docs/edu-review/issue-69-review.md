# Issue #69: Operations, handoff, Demo Day, and portfolio — educational review evidence

**Recorded:** 2026-10-20

**Implementation:** original wave3 lessons plus the typed module in `src/data/learning/group-b-19-operations-delivery.ts` for 4 canonical Topics.
**Independent educational review:** Passed (static) on 2026-10-20 for lesson sequences, worked examples, questions/keys/rationales, criterion-to-output links, practical outputs, and handoffs; topic-specific findings follow. Learner execution, media review, and browser journeys are outside this pass. Each record remains `review-ready` pending final group acceptance.
**Course-owner policies:** accepted on 2026-10-20 in issue #70: the template and 19-group membership; quiz scoring of 1 point correct and 0 for incorrect/unanswered, unlimited retries, feedback after submit, and retention of all attempts with question and policy versions; learner-reported levels not-yet/in-progress/ready-for-review with no mastery threshold or independent correctness claim; and the candidate-video checklist. These decisions do not approve an individual video or this complete group.
**Release status:** this group remains `review-ready` and is not marked improved. Human review of each candidate video and exact-candidate browser/integration evidence remain pending; final group-specific owner sign-off is not recorded.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; it does not claim learner execution. Owner policies are accepted in issue #70, while individual human video reviews, browser validation, and final group-specific acceptance remain pending.

## `project-operations-runbook`

**Inputs and lesson walk-through:** افحص البيئة المختارة → مثال محلول: تراجع التطبيق → برومبت تشغيل. Steps:
  - اجمع اسم الخطة والخدمة والرابط الرسمي أو إعداد الحساب لكل قدرة تشغيل. → `docs/OPERATIONS_RUNBOOK.md فيه capability/source/status/owner/next-check.`
  - صمم تمرين استعادة على test مع نسخة معروفة؛ إن لم تتوفر الصلاحية فاكتب إجراء تحقق مؤجلاً. → `docs/RESTORE_DRILL.md بنتيجة فعلية أو Not Run وسبب آمن.`
  - افصل rollback application عن restore database وأضف smoke-check لكل عملية. → `نسخة/خطوة/مالك/شرط توقف لكل إجراء، دون أوامر إنتاج غير مراجعة.`

**Sample project output (worked example `unknown-backup`):** قدرة نسخ غير معلومة — خطة الاستضافة لم تُراجع بعد ولم يجر اختبار استعادة.

```text
Backup status=unknown, restore drill=Not Run. المالك يراجع صفحة الخطة، ثم ينفذ نسخة إلى بيئة test إذا سمح المزود. لا وعد بسلامة أو زمن استعادة.
```

**Handoff:** برومبت: «استخدم إعدادات ووثائق المزود الفعلية. سجّل CI وlogs/alerts/backup/restore/deploy/rollback كـ verified أو available-not-tested أو unavailable أو unknown. احمِ الأسرار، ولا تغير production». سلّم الإجراءات إلى حزمة handoff في الموضوع 56.

**Objective quiz:** v1; stable question IDs `project-operations-runbook-backup-vs-restore-drill`, `project-operations-runbook-application-rollback-vs-schema`.
  - `project-operations-runbook-backup-vs-restore-drill` (project-operations-runbook-objective-1): لوحة الخطة تعرض backup لكن لم تجر restore. ماذا تسجل؟ — مفتاح project-operations-runbook-backup-vs-restore-drill-b; التعليل: وجود ميزة لا يثبت نجاح استعادة أو زمنها.
  - `project-operations-runbook-application-rollback-vs-schema` (project-operations-runbook-objective-2): رجع التطبيق لإصدار أقدم بعد migration أحدثت عموداً. ماذا يجب مراجعة؟ — مفتاح project-operations-runbook-application-rollback-vs-schema-a; التعليل: الكود والبيانات لهما إجراءات استعادة مختلفة وقد تكون migration غير عكسية.

**Practical assessment:** scale `project-operations-runbook-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `operations-capabilities`: جرد قدرات الاستضافة مع مصدر وحالة ومالك.
  - `restore-rollback-plan`: إجراءات اختبار لاستعادة البيانات وتراجع التطبيق منفصلان.

Criteria:
  - `project-operations-runbook-capability-evidence` → `operations-capabilities`: قدرة بدليل. كل ادعاء تشغيل مرتبط بصفحة/إعداد ومصنف بصدق. دليل المراجعة: أرفق قدرة واحدة ومصدرها وما بقي غير متحقق.
  - `project-operations-runbook-data-application-separation` → `restore-rollback-plan`: فصل الإجراءين. الرجوع للكود لا يوصف باستعادة قاعدة البيانات. دليل المراجعة: أشر إلى خطوة تطبيق وخطوة بيانات وشرط كل منهما.

**Author finding:** راجع المؤلف حالات القدرة الأربع وفصل rollback عن restore. الدليل التعليمي يتطلب اختباراً خارج الإنتاج أو يسجل Not Run صريحاً؛ قبول المجموعة النهائي ما زال مطلوباً.

**Independent educational review:** Passed (static): the lesson distinguishes available capability from verified behavior, application rollback from DB restore, and schema compatibility from code rollback. `operations-capabilities` and `restore-rollback-plan` feed the handoff index. Restore remains Not Run.

**External video candidate:** [Deployments Going Deeper — Vercel Foundations](https://vercel.com/academy/vercel-foundations/deployments) (`candidate`, approval `proposed`). مرشح لخطة التشغيل، حيث تسرد سلسلة الفيديو rollback فورياً وفحوص النشر والسجلات وobservability. تضبط الخطوات وفق قدرات الحساب الفعلية؛ لا تفترض أن backup قد استعيد.

**Resource evidence:** فهرس Vercel Foundations يصف درس Deployments Going Deeper بفحوص deployment وinstant rollback، كما يدرج دروس Logs وObservability. صفحة الدورة تؤكد أنها تسعة مقاطع فيديو. الدرس خاص بـ Vercel ولا يغطي restore قاعدة البيانات. لم يُختبر التشغيل/captions/accessibility ولم يوافق المالك. [Publisher/source page](https://vercel.com/academy/vercel-foundations).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `project-handoff-package`

**Inputs and lesson walk-through:** حدد من يستلم ولماذا → مثال محلول: README موجز → مهمة تسليم. Steps:
  - حدّث README بملخص المشروع والحالة وquick start وروابط نسبية موجودة. → `README يفتح مسارات حقيقية ويبين publish/local/prototype بلا ادعاء.`
  - أنشئ فهرس متطلبات/مخطط/API/design/runbook/QA مع رقم أو تاريخ النسخة. → `docs/HANDOFF.md يذكر الموجود والمفقود والمسؤول والوصول.`
  - انقل نتيجة فحص واحدة مع commit/environment/command/date/status. → `docs/QA_RESULTS.md يسمح بإعادة الفحص ويحتفظ بـ Failed وNot Run كما هما.`

**Sample project output (worked example `handoff-status`):** حالة تكامل صادقة — تسليم مشروع يعرض fixtures بعد نجاح build.

```text
README: واجهة نموذجية ببيانات محلية؛ QA: build Passed على commit placeholder، API integration Not Run. قبل الحفظ استبدل placeholder بأدلة حقيقية أو احذفه.
```

**Handoff:** برومبت: «أنشئ فهرس الحزمة من الملفات الموجودة. لكل رابط تحقق من المسار والصلاحية، ولكل نتيجة أرفق الأمر والنسخة. اذكر القيود والمالك والخطوة التالية. لا تنسخ الأسرار». سلّم نسخة مختصرة قابلة للعرض في Demo Day.

**Objective quiz:** v1; stable question IDs `project-handoff-package-missing-resource-traceability`, `project-handoff-package-test-commit-provenance`.
  - `project-handoff-package-missing-resource-traceability` (project-handoff-package-objective-1): الحزمة تشير إلى docs/ERD.md لكن الملف غير موجود. ماذا تفعل؟ — مفتاح project-handoff-package-missing-resource-traceability-a; التعليل: المراجع يحتاج ملفاً واقعياً أو فجوة واضحة لا رابطاً متخيلاً.
  - `project-handoff-package-test-commit-provenance` (project-handoff-package-objective-2): نتيجة build تخص commit سابقاً. كيف تعرضها؟ — مفتاح project-handoff-package-test-commit-provenance-b; التعليل: النتيجة مرتبطة بالنسخة التي شُغلت عليها.

**Practical assessment:** scale `project-handoff-package-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `handoff-index`: README وفهرس docs بروابط موجودة وإصدارات.
  - `handoff-evidence`: تقرير فحوص وقيود ونتائج مرتبطة بcommit.

Criteria:
  - `project-handoff-package-link-integrity` → `handoff-index`: روابط صحيحة. الروابط إلى ملفات موجودة وصلاحية مشاركة قابلة للشرح. دليل المراجعة: أشر إلى رابط داخلي واحد وتحقق من هدفه.
  - `project-handoff-package-test-provenance` → `handoff-evidence`: مصدر نتيجة. النتيجة معها command/environment/commit/date/status. دليل المراجعة: أرفق صف نتيجة واحدة مع مصدرها وحدودها.

**Author finding:** راجع المؤلف نقطة بدء README وتسلسل الوثائق وصدق الادعاءات المرتبطة بالنسخة. السطر المثال معلّم placeholder ولا يمثل فحصاً فعلياً.

**Independent educational review:** Passed (static): the lesson requires real links and version-bound QA evidence, and labels the placeholder build record as illustrative. `handoff-index` and `handoff-evidence` feed Demo Day. The placeholder is not an executed build.

**External video candidate:** [Best Practices for Knowledge Transfer and Software Project Handoff](https://praxent.com/blog/knowledge-transfer-best-practices-software-project-handoff) (`candidate`, approval `proposed`). مرشح يلخص مشاركة الفريق الداخلي والتوثيق المعماري وREADME ومراجعات الكود وhandoff sprint. المورد من شركة تعهيد، لذا يراجع المتعلم الخطة بما يناسب فريق مشروعه.

**Resource evidence:** صفحة الفيديو ونص Praxent يذكران مشاركة الفريق في القرارات، جودة الكود، README للتشغيل/المساهمة/النشر، توثيق البنية وhandoff sprint. مطابقة مباشرة لحزمة التسليم؛ سياقها تعهيد. لم يُختبر الفيديو/captions/accessibility ولم توجد موافقة مالك. [Publisher/source page](https://praxent.com/blog/knowledge-transfer-best-practices-software-project-handoff).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `project-demo-day`

**Inputs and lesson walk-through:** حدد الجمهور والنسخة → مثال محلول: طلب مورد → مهمة وبرومبت تدريب. Steps:
  - اكتب قصة المشكلة والحل والرحلة والقرار بوقت لكل مقطع. → `docs/DEMO_DAY_SCRIPT.md بحقائق مسندة إلى README أو قرار فعلي.`
  - شغّل الرحلة في نسخة العرض وبيانات آمنة ودوّن التاريخ والنسخة والنتائج. → `docs/DEMO_CHECKLIST.md يميز Passed وFailed وNot Run مع نقطة البداية.`
  - جهز fallback واحداً يمكن الوصول إليه من دون سر، وحدد كيف تعرضه إذا انقطع الرابط. → `تسجيل/لقطة/تشغيل محلي بعلامة fallback ووقت آخر فحص.`

**Sample project output (worked example `demo-story`):** مشهد واحد قابل للتكرار — نموذج حجز مورد ببيانات اختبار.

```text
المشكلة: تعارض الحجز. المشهد: افتح يومين واختر موعداً، ثم أظهر rejection لحجز متزامن. دليل test موجود؛ الاستخدام الحقيقي ورضا المستخدم لم يُقَس.
```

**Handoff:** برومبت: «استخدم README والأدلة الحالية فقط. اكتب مقدمة ومشهد رحلة وقراراً وقيداً، ووقت اختبار الرابط وخطة fallback. لا تخترع مقياساً أو مستخدماً». جرّب النص والبيانات قبل العرض، ثم صغ بطاقة portfolio.

**Objective quiz:** v1; stable question IDs `project-demo-day-reproducible-demo-flow`, `project-demo-day-live-vs-recorded-evidence`.
  - `project-demo-day-reproducible-demo-flow` (project-demo-day-objective-1): أي عرض يقنع المراجع بسلوك محدد؟ — مفتاح project-demo-day-reproducible-demo-flow-a; التعليل: رحلة قابلة لإعادة الفحص أوضح من التقنيات أو أرقام بلا دليل.
  - `project-demo-day-live-vs-recorded-evidence` (project-demo-day-objective-2): انقطع الاتصال وتعرض فيديو تسجيل للرحلة. كيف تقدمه؟ — مفتاح project-demo-day-live-vs-recorded-evidence-b; التعليل: نوع الدليل وحالته يظلان واضحين للجمهور.

**Practical assessment:** scale `project-demo-day-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `demo-script`: نص عرض قصير لرحلة وقرار وقيود مع مصادر.
  - `demo-readiness`: قائمة فحص نسخة وبيانات وروابط وخطة احتياط.

Criteria:
  - `project-demo-day-claim-evidence` → `demo-script`: ادعاء له مصدر. المشكلة والسلوك والنتيجة تتبع دليلاً أو توصف كافتراض. دليل المراجعة: اختر جملة واحدة وأرفق المصدر الذي يدعمها.
  - `project-demo-day-fallback-label` → `demo-readiness`: احتياط مفهوم. الاحتياط موسوم بالتسجيل أو الصورة أو التشغيل المحلي وتاريخه. دليل المراجعة: أرفق وصف fallback وأحدث وقت تحقق من نسخته.

**Author finding:** راجع المؤلف الفرق بين رحلة حية ولقطة fallback، وقيّد الأثر بما يقيسه الدليل. المشهد لا يختلق نتائج استخدام واقعي.

**Independent educational review:** Passed (static): the lesson grounds the story in one reproducible journey and labels live, mock and fallback evidence accurately. `demo-script` and `demo-readiness` feed the portfolio entry. No live demo or user-impact result was run.

**External video candidate:** [Tips on better Demo Presentation Skills and StoryTelling](https://learn.microsoft.com/en-us/shows/regular-it-guy/tips-on-better-demo-presentation-skills-storytelling) (`candidate`, approval `proposed`). مرشح لتسلسل العرض وصياغة القصة لجمهور؛ صفحة Microsoft Learn تصف نصائح لعرض demo لمجموعة مدربين. المورد قديم وعام، فلا يثبت صحة عرض التطبيق أو ادعاءاته ويجب تسميته في عرض المتعلم كمصدر للتقديم فقط.

**Resource evidence:** صفحة Microsoft Learn تسمي فيديو نصائح العرض والسرد وتقول إنه قُدّم لمجموعة Microsoft Certified Trainers. يغطي أسلوب التقديم العام لا فحص سلوك منتج؛ المحتوى قديم. لم يُختبر التشغيل/captions/accessibility أو موافقة المالك. [Publisher/source page](https://learn.microsoft.com/en-us/shows/regular-it-guy/tips-on-better-demo-presentation-skills-storytelling).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `project-portfolio-entry`

**Inputs and lesson walk-through:** اجمع الأثر قبل الصياغة → مثال محلول: مساهمة قابلة للتحديد → مهمة كتابة ومراجعة. Steps:
  - اكتب ما نفذته أنت وما شاركت فيه وما ساعدت به الأداة أو مساهم آخر. → `docs/PORTFOLIO_ENTRY.md فيه أسماء أجزاء وروابط commits قابلة للمشاركة.`
  - لكل نتيجة أرفق مصدر وطريقة ووقت وعينة، أو عبارة لم يُقَس. → `جدول claim/evidence/method/limit؛ لا نسبة أو رقم تخميني.`
  - افحص روابط العرض والمستودع واللقطات وامسح بيانات شخصية أو سرية. → `قائمة رابط وحالة صلاحية مشاركة وتاريخ فحص، وخطوة إزالة لأي مرفق حساس.`

**Sample project output (worked example `honest-portfolio-card`):** بطاقة نموذج غير منشور — مشروع فريق يعرض صوراً ببيانات ثابتة.

```text
State=prototype, not published. Contribution: built filter UI and added empty-state test. Impact: not measured. Evidence: commit and screenshot from local run; API integration not run. (Replace paths with real artifacts before sharing.)
```

**Handoff:** برومبت: «استخدم الأدلة المرفقة فقط. اكتب المشكلة ومساهمتي والقرار والنتائج والقيود. راجع كل رقم ورابط وادعاء عمل جماعي. إن لم يوجد قياس، اذكر ذلك. احذف أي بيانات خاصة». سلّم البطاقة وأدلة الروابط.

**Objective quiz:** v1; stable question IDs `project-portfolio-entry-individual-contribution-attribution`, `project-portfolio-entry-measured-impact-claim`.
  - `project-portfolio-entry-individual-contribution-attribution` (project-portfolio-entry-objective-1): أنجز فريق ميزة وأنت كتبت صفحة واحدة. أي صياغة عادلة؟ — مفتاح project-portfolio-entry-individual-contribution-attribution-b; التعليل: المساهمة المحددة تمثل الواقع وتتيح للمراجع تتبعها.
  - `project-portfolio-entry-measured-impact-claim` (project-portfolio-entry-objective-2): تظهر اختباراتك محلياً لكن لا يوجد بحث مستخدم أو مقياس. ماذا تقول عن الأثر؟ — مفتاح project-portfolio-entry-measured-impact-claim-b; التعليل: دليل فحص البرمجية لا يساوي قياس أثر المستخدم.

**Practical assessment:** scale `project-portfolio-entry-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `portfolio-narrative`: بطاقة مشكلة/حالة/مساهمة/قرار/قيود.
  - `portfolio-evidence-map`: روابط وclaims وطريقة قياس أو تصريح غياب قياس.

Criteria:
  - `project-portfolio-entry-contribution-accuracy` → `portfolio-narrative`: حجم مساهمة صادق. الفردي والجماعي ومساعدة الأداة منفصلة ومسنودة. دليل المراجعة: اربط عبارة واحدة في البطاقة بملف أو commit وصلاحية مشاركته.
  - `project-portfolio-entry-impact-method` → `portfolio-evidence-map`: قياس قابل للفحص. أي أثر رقمي معه baseline/source/sample/method؛ وإلا يوصف بأنه غير مقاس. دليل المراجعة: أرفق خلية قياس كاملة أو الجملة التي تصرح بعدم القياس.

**Author finding:** راجع المؤلف الفرق بين مساهمة شخصية وأثر منتج، واشتراط خط أساس ووسيلة قياس لأي نسبة. المثال prototype توضيحي وليس سيرة أو إنجازاً فعلياً.

**Independent educational review:** Passed (static): the lesson separates personal contribution from team work, checks sharing/privacy, and requires a baseline and method for impact claims. The example is explicitly a prototype, not a real achievement. No portfolio artifact was executed or published.

**External video candidate:** [Building A Portfolio Website That Will Get You Hired — Udacity Project Walkthrough](https://www.udacity.com/video/project-walkthrough-portfolio) (`candidate`, approval `proposed`). مرشح لتنظيم موقع portfolio وحكاية مشروع؛ توضح صفحة Udacity أنه موجّه للمستقل/المتعاقد/الاستشاري/المبدع. يُستخدم لترتيب الحالة فقط، لا كدليل على جودة الشيفرة أو أثرها.

**Resource evidence:** صفحة Udacity تسمي فيديو Project Walkthrough عن بناء موقع portfolio للمستقلين والمتعاقدين والاستشاريين والمبدعين. ملائم لبنية العرض العامة مع فرق سياق عن portfolio مهندس برمجيات؛ لا يبرر ادعاءات تقنية/أثر غير موثقة. تشغيل/captions/accessibility وowner signoff لم تُفحص. [Publisher/source page](https://www.udacity.com/video/project-walkthrough-portfolio).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## Remaining group acceptance conditions

- The course owner accepted the template, 19-group membership, quiz-scoring policy, descriptive self-assessment policy, and candidate-video checklist in [owner decision package #70](owner-decision-package-70.md). Those policy decisions do not constitute approval of this complete group.
- Each linked external resource remains a candidate until a human reviews playback, captions, accessibility, and fit with its lesson. No video in this group is approved or reported as playback-tested.
- Learner project execution and exact-candidate browser checks for full-reader/preview, persistence, RTL/LTR, keyboard, mobile and relevant diagrams remain Not Run or are owned by the root-coordinated integration review.
- Keep every canonical Topic available. Do not mark this group improved until the remaining evidence is complete and the course owner records this group in the final sign-off list.
