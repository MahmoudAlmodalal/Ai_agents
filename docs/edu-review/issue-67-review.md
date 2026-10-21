# Issue #67: Docker and Linux operations — educational review evidence

**Recorded:** 2026-10-20

**Implementation:** original wave3 lessons plus the typed module in `src/data/learning/group-b-17-docker-linux.ts` for 2 canonical Topics.
**Independent educational review:** Passed (static) on 2026-10-20 for lesson sequences, worked examples, questions/keys/rationales, criterion-to-output links, practical outputs, and handoffs; topic-specific findings follow. Learner execution, media review, and browser journeys are outside this pass. Each record remains `review-ready` pending final group acceptance.
**Course-owner policies:** accepted on 2026-10-20 in issue #70: the template and 19-group membership; quiz scoring of 1 point correct and 0 for incorrect/unanswered, unlimited retries, feedback after submit, and retention of all attempts with question and policy versions; learner-reported levels not-yet/in-progress/ready-for-review with no mastery threshold or independent correctness claim; and the candidate-video checklist. These decisions do not approve an individual video or this complete group.
**Release status:** this group remains `review-ready` and is not marked improved. Human review of each candidate video and exact-candidate browser/integration evidence remain pending; final group-specific owner sign-off is not recorded.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; it does not claim learner execution. Owner policies are accepted in issue #70, while individual human video reviews, browser validation, and final group-specific acceptance remain pending.

## `docker-container-workflow`

**Inputs and lesson walk-through:** حدد من يبني الصورة → مثال محلول: خادم يحتاج صورة → مهمة وبرومبت ومخرج. Steps:
  - قارن متطلبات المنصة ببناء Git أو OCI image واكتب سبب الاختيار. → `docs/DOCKER_DECISION.md يذكر المنصة ومصدر معلوماتها وحالة التحقق أو سبب تأجيل القرار.`
  - إذا كانت الصورة مطلوبة، اكتب Dockerfile يطابق المشروع و.dockerignore يستثني .env وnode_modules أو venv. → `Dockerfile اختياري قابل للمراجعة، ولا يحتوي قيمة سرية أو أمر تشغيل غير مطابق.`
  - حدد مستخدم runtime والمنفذ وطريقة تمرير الإعداد؛ اختبر بناءً محلياً فقط إذا كان ذلك آمناً ومتاحاً. → `جدول build/run/user/port/secrets مع أمر ونتيجة فعلية أو Not Run وسببها.`

**Sample project output (worked example `managed-hosting-choice`):** قرار عدم إضافة Docker — منصة الواجهة تبني مشروع Next.js من المستودع بإعدادها المدعوم.

```text
Decision=managed build. لا يوجد Dockerfile أو Compose إضافي؛ سجل رابط دليل المنصة وفحص build الحالي. إذا تطلب خادم Python صورة OCI لاحقاً أعد القرار وفق إعداد الخادم.
```

**Handoff:** برومبت: «افحص المنصة وإعداد المشروع؛ قارن البناء المُدار وصورة OCI. إن اخترت Docker فسجل السياق والنسخ والأمر والمستخدم ومصدر الأسرار، ولا تبنِ أو تنشر صورة بإعداد إنتاجي». سلّم قرار التشغيل إلى فحص Linux أو سجّل سبب تجاوز إدارته.

**Objective quiz:** v1; stable question IDs `docker-container-workflow-container-needed-decision`, `docker-container-workflow-runtime-secret-injection`.
  - `docker-container-workflow-container-needed-decision` (docker-container-workflow-objective-1): المنصة تدعم بناء Next.js مباشرة من Git ولا تحتاج image. ما المخرج المقبول؟ — مفتاح docker-container-workflow-container-needed-decision-a; التعليل: الحاوية قرار تشغيل؛ لا تضفها دون حاجة يثبتها المسار.
  - `docker-container-workflow-runtime-secret-injection` (docker-container-workflow-objective-2): أين تمرر قاعدة البيانات السرية إلى حاوية وقت التشغيل؟ — مفتاح docker-container-workflow-runtime-secret-injection-c; التعليل: الأسرار لا توضع في طبقات الصورة أو سجل البناء.

**Practical assessment:** scale `docker-container-workflow-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `container-decision`: قرار Docker أو التجاوز مع مصدر المنصة والحاجة.
  - `container-runtime-evidence`: Dockerfile اختياري وسجل build/run/user/port/secrets بنتيجة صادقة.

Criteria:
  - `docker-container-workflow-container-need` → `container-decision`: مبرر اختيار الأداة. القرار مبني على متطلبات تشغيل فعلية لا على شيوع Docker. دليل المراجعة: أشر إلى خاصية المنصة أو حاجة التشغيل التي قادتك للقرار.
  - `docker-container-workflow-container-safety` → `container-runtime-evidence`: سلامة الصورة. السياق يستثني الأسرار ويحدد هوية التشغيل ومصدر الإعداد. دليل المراجعة: اعرض سطر الإعداد الذي يثبت non-root وما استثني من السياق.

**Author finding:** راجع المؤلف الفرق بين image وcontainer والبناء المُدار، وربط المثال بـ Next.js أو بديل Python. الإعداد المقترح لا يحمل أسراراً، واختبار البناء غير المنفذ لا يوصف بأنه ناجح.

**Independent educational review:** Passed (static): the lesson distinguishes images from containers and managed builds, and scopes Dockerfile, build context, runtime secrets and non-root execution to a real need. `container-decision` and `container-runtime-evidence` feed the Linux ownership review. A build or container was not run.

**External video candidate:** [Accelerating Development with Docker](https://www.docker.com/resources/accelerating-development-with-docker-on-demand-training/) (`candidate`, approval `proposed`). مرشح مسجل لإنشاء Dockerfile/Compose وبناء صورة وبيئة تطوير وتشغيل اختبارات. قد يتطلب الاشتراك للاستفادة الكاملة؛ إذا كان المضيف يبني مباشرة فلا حاجة للحاوية.

**Resource evidence:** صفحة Docker تسميه recorded session وتذكر إنشاء Dockerfile/Compose وبناء صور وتشغيل اختبارات وتصحيح. الصفحة تنبه إلى أن الاشتراك مطلوب للاستفادة الكاملة. صلته عملية إذا اختيرت الحاوية؛ لم يُختبر تشغيله أو captions أو الوصولية ولم يوافق المالك. [Publisher/source page](https://www.docker.com/resources/accelerating-development-with-docker-on-demand-training/).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `linux-server-operations`

**Inputs and lesson walk-through:** ابدأ بحدود مسؤولية الاستضافة → مثال محلول: مجلد رفع محدود → مهمة وبرومبت وتسليم. Steps:
  - حدد من يدير Linux من وصف الخطة أو إعداد المشروع واحفظ مرجعاً موثوقاً. → `docs/LINUX_RUNTIME_NOTES.md يحدد self-managed أو managed ودرجة التحقق.`
  - إذا كانت الإدارة يدوية، ارسم process user → files read/write → owner/group/mode من مخرجات آمنة. → `جدول مجلد/هوية/حاجة/صلاحية؛ وإذا كانت الإدارة مُدارة فسجل ما لا تملكه بدلاً من اختلاق صلاحيات.`
  - اكتب تغييراً مقترحاً واحداً وسبباً وطريقة تحقق وخطة رجوع؛ لا تنفذه على الإنتاج. → `تغيير مراجع بأقل وصول وموافقة مطلوبة، أو Not Applicable مع مرجع المنصة.`

**Sample project output (worked example `managed-linux`):** تجاوز إدارة النظام — المتجر السحابي يوفر runtime مُداراً ولا يكشف نظام ملفات المضيف.

```text
Owner=provider. الطالب يوثق متغيرات البيئة ومسار السجلات المكشوف فقط؛ لا يطلب chown/chmod أو SSH. أي صلاحية/سجل غير ظاهر يبقى سؤال دعم للمزود.
```

**Handoff:** برومبت: «استخرج حدود مزود الاستضافة وهوية العملية ومجلداتها. اقترح أضيق صلاحية مع تحقق قراءة فقط؛ لا تشغّل أوامر تغيير ولا تتصل بالخادم. اذكر مالك القرار وخطة التراجع المطلوبة قبل تعديل مأذون». سلّم ملاحظات التشغيل إلى runbook الموضوع 55.

**Objective quiz:** v1; stable question IDs `linux-server-operations-managed-host-boundary`, `linux-server-operations-least-privilege-file-access`.
  - `linux-server-operations-managed-host-boundary` (linux-server-operations-objective-1): الخدمة تعمل على منصة مُدارة لا تسمح بـ SSH. ما الخطوة السليمة؟ — مفتاح linux-server-operations-managed-host-boundary-a; التعليل: تتبع الإجراء حدود الاستضافة؛ الطالب لا يدير المضيف المُدار.
  - `linux-server-operations-least-privilege-file-access` (linux-server-operations-objective-2): ملف إعداد يحتاجه مستخدم خدمة واحد فقط. أي سياسة تبدأ بها؟ — مفتاح linux-server-operations-least-privilege-file-access-b; التعليل: الحد الأدنى من الصلاحيات يقلل أثر الخطأ أو الاختراق.

**Practical assessment:** scale `linux-server-operations-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `linux-ownership`: خريطة مسؤولية المضيف والمستخدم والمجلدات أو سجل التجاوز.
  - `linux-change-plan`: اقتراح صلاحيات محدود بخطوة تحقق ورجوع دون تنفيذ إنتاجي.

Criteria:
  - `linux-server-operations-host-boundary` → `linux-ownership`: مسؤولية واضحة. يوضح المالك الفعلي للنظام والمعلومات التي يمكن للمتعلم رؤيتها. دليل المراجعة: أرفق اسم مصدر الخطة ودليلاً على ما يديره مزود الاستضافة.
  - `linux-server-operations-least-privilege` → `linux-change-plan`: أقل وصول. يربط الصلاحية بمستخدم ومجلد وحاجة وخطة تحقق/رجوع. دليل المراجعة: أشر إلى المجلد والحاجة والهوية، واذكر الأمر الذي لم تنفذه.

**Author finding:** راجع المؤلف التفريق بين Linux مُدار ويدوي، وميّز فحص القراءة من تغيير الملكية. المثال لا يوجه إلى تنفيذ أمر إداري قبل الإذن وخطة الرجوع.

**Independent educational review:** Passed (static): the lesson distinguishes managed-host limits from learner-managed Linux and explains identity, ownership and least privilege before a change. `linux-ownership` and `linux-change-plan` feed the operations runbook. No server command was run.

**External video candidate:** [How to Modify File Permissions in Bash (Part 12 of 20)](https://learn.microsoft.com/en-us/shows/bash-for-beginners/how-to-modify-file-permissions-in-bash-12-of-20-bash-for-beginners) (`candidate`, approval `proposed`). مرشح لشرح قراءة صلاحيات الملفات وchown/chgrp/chmod. يقتصر على مختبر أو مضيف مخوّل، ولا يثبت صلاحية الطالب لتغيير خادم مُدار.

**Resource evidence:** صفحة Microsoft Learn تذكر فصول عرض الصلاحيات (00:00) وchown (02:25) وchgrp (04:35) وchmod (06:00). هذا يطابق فحص الصلاحيات مع ضرورة التقييد بمضيف مخوّل. لم يُختبر التشغيل/captions/accessibility ولم توجد موافقة مالك. [Publisher/source page](https://learn.microsoft.com/en-us/shows/bash-for-beginners/how-to-modify-file-permissions-in-bash-12-of-20-bash-for-beginners).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## Remaining group acceptance conditions

- The course owner accepted the template, 19-group membership, quiz-scoring policy, descriptive self-assessment policy, and candidate-video checklist in [owner decision package #70](owner-decision-package-70.md). Those policy decisions do not constitute approval of this complete group.
- Each linked external resource remains a candidate until a human reviews playback, captions, accessibility, and fit with its lesson. No video in this group is approved or reported as playback-tested.
- Learner project execution and exact-candidate browser checks for full-reader/preview, persistence, RTL/LTR, keyboard, mobile and relevant diagrams remain Not Run or are owned by the root-coordinated integration review.
- Keep every canonical Topic available. Do not mark this group improved until the remaining evidence is complete and the course owner records this group in the final sign-off list.
