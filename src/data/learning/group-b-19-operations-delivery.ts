import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';
import { recordIndependentTopicReview } from '@/src/data/learning/group-b-16-19-independent-review.ts';

export const QUESTION_IDS_GROUP_B_19: Record<string, [string, string]> = {
  'project-operations-runbook': ['backup-vs-restore-drill', 'application-rollback-vs-schema'],
  'project-handoff-package': ['missing-resource-traceability', 'test-commit-provenance'],
  'project-demo-day': ['reproducible-demo-flow', 'live-vs-recorded-evidence'],
  'project-portfolio-entry': ['individual-contribution-attribution', 'measured-impact-claim'],
};

export const VIDEO_CANDIDATES_GROUP_B_19: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'project-operations-runbook': {
    id: 'project-operations-runbook-video-candidate',
    title: 'Deployments Going Deeper — Vercel Foundations',
    url: 'https://vercel.com/academy/vercel-foundations/deployments',
    purpose: 'مرشح لخطة التشغيل، حيث تسرد سلسلة الفيديو rollback فورياً وفحوص النشر والسجلات وobservability. تضبط الخطوات وفق قدرات الحساب الفعلية؛ لا تفترض أن backup قد استعيد.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://vercel.com/academy/vercel-foundations', evidence: 'فهرس Vercel Foundations يصف درس Deployments Going Deeper بفحوص deployment وinstant rollback، كما يدرج دروس Logs وObservability. صفحة الدورة تؤكد أنها تسعة مقاطع فيديو. الدرس خاص بـ Vercel ولا يغطي restore قاعدة البيانات. لم يُختبر التشغيل/captions/accessibility ولم يوافق المالك.' }],
  },
  'project-handoff-package': {
    id: 'project-handoff-package-video-candidate',
    title: 'Best Practices for Knowledge Transfer and Software Project Handoff',
    url: 'https://praxent.com/blog/knowledge-transfer-best-practices-software-project-handoff',
    purpose: 'مرشح يلخص مشاركة الفريق الداخلي والتوثيق المعماري وREADME ومراجعات الكود وhandoff sprint. المورد من شركة تعهيد، لذا يراجع المتعلم الخطة بما يناسب فريق مشروعه.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://praxent.com/blog/knowledge-transfer-best-practices-software-project-handoff', evidence: 'صفحة الفيديو ونص Praxent يذكران مشاركة الفريق في القرارات، جودة الكود، README للتشغيل/المساهمة/النشر، توثيق البنية وhandoff sprint. مطابقة مباشرة لحزمة التسليم؛ سياقها تعهيد. لم يُختبر الفيديو/captions/accessibility ولم توجد موافقة مالك.' }],
  },
  'project-demo-day': {
    id: 'project-demo-day-video-candidate',
    title: 'Tips on better Demo Presentation Skills and StoryTelling',
    url: 'https://learn.microsoft.com/en-us/shows/regular-it-guy/tips-on-better-demo-presentation-skills-storytelling',
    purpose: 'مرشح لتسلسل العرض وصياغة القصة لجمهور؛ صفحة Microsoft Learn تصف نصائح لعرض demo لمجموعة مدربين. المورد قديم وعام، فلا يثبت صحة عرض التطبيق أو ادعاءاته ويجب تسميته في عرض المتعلم كمصدر للتقديم فقط.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/regular-it-guy/tips-on-better-demo-presentation-skills-storytelling', evidence: 'صفحة Microsoft Learn تسمي فيديو نصائح العرض والسرد وتقول إنه قُدّم لمجموعة Microsoft Certified Trainers. يغطي أسلوب التقديم العام لا فحص سلوك منتج؛ المحتوى قديم. لم يُختبر التشغيل/captions/accessibility أو موافقة المالك.' }],
  },
  'project-portfolio-entry': {
    id: 'project-portfolio-entry-video-candidate',
    title: 'Building A Portfolio Website That Will Get You Hired — Udacity Project Walkthrough',
    url: 'https://www.udacity.com/video/project-walkthrough-portfolio',
    purpose: 'مرشح لتنظيم موقع portfolio وحكاية مشروع؛ توضح صفحة Udacity أنه موجّه للمستقل/المتعاقد/الاستشاري/المبدع. يُستخدم لترتيب الحالة فقط، لا كدليل على جودة الشيفرة أو أثرها.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.udacity.com/video/project-walkthrough-portfolio', evidence: 'صفحة Udacity تسمي فيديو Project Walkthrough عن بناء موقع portfolio للمستقلين والمتعاقدين والاستشاريين والمبدعين. ملائم لبنية العرض العامة مع فرق سياق عن portfolio مهندس برمجيات؛ لا يبرر ادعاءات تقنية/أثر غير موثقة. تشغيل/captions/accessibility وowner signoff لم تُفحص.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_19: Record<string, TopicDraft> = {
  'project-operations-runbook': {
    slug: 'project-operations-runbook',
    objectives: ['اكتب إجراءات تشغيل مرتبطة بقدرات خطة الاستضافة المثبتة لا بميزات متوقعة.', 'افصل تحديث التطبيق وتراجعه عن نسخ البيانات واستعادتها مع مالك وخطوات تحقق.'],
    sections: [
      { id: 'inputs', heading: 'افحص البيئة المختارة', body: 'المدخل مخرجا الموضوع 54 backend-topology/backend-smoke-report، ومخرجا مضيف الواجهة المختار: الموضوع 52 vercel-config-record/vercel-preview-evidence أو الموضوع 53 netlify-compatibility-record/netlify-preview-report، ومخرجا الموضوع 51 linux-ownership/linux-change-plan عند انطباقه، ومخرجا الموضوع 49 qa-matrix/qa-gaps. تحقق من مصادر CI والسجلات والتنبيه والنسخ وحدود الاحتفاظ. اسم زر backup لا يثبت أن نسخة قابلة للاستعادة؛ لا تخترع RPO/RTO.' },
      { id: 'example', heading: 'مثال محلول: تراجع التطبيق', body: 'إذا فشل إصدار واجهة، أعد آخر إصدار محفوظاً، ثم اختبر landing والroute الحرجة وسجل version. تغيير قاعدة بيانات منفصل: راجع compatibility migration وخطة restore مجربة خارج الإنتاج. لا تعكس كتابة البيانات بمجرد الرجوع إلى code.' },
      { id: 'exercise', heading: 'برومبت تشغيل', body: 'برومبت: «استخدم إعدادات ووثائق المزود الفعلية. سجّل CI وlogs/alerts/backup/restore/deploy/rollback كـ verified أو available-not-tested أو unavailable أو unknown. احمِ الأسرار، ولا تغير production». سلّم الإجراءات إلى حزمة handoff في الموضوع 56.' },
    ],
    practicalSteps: [
      { id: 'capability-inventory', instruction: 'اجمع اسم الخطة والخدمة والرابط الرسمي أو إعداد الحساب لكل قدرة تشغيل.', expectedOutput: 'docs/OPERATIONS_RUNBOOK.md فيه capability/source/status/owner/next-check.' },
      { id: 'restore-drill', instruction: 'صمم تمرين استعادة على test مع نسخة معروفة؛ إن لم تتوفر الصلاحية فاكتب إجراء تحقق مؤجلاً.', expectedOutput: 'docs/RESTORE_DRILL.md بنتيجة فعلية أو Not Run وسبب آمن.' },
      { id: 'rollback-check', instruction: 'افصل rollback application عن restore database وأضف smoke-check لكل عملية.', expectedOutput: 'نسخة/خطوة/مالك/شرط توقف لكل إجراء، دون أوامر إنتاج غير مراجعة.' },
    ],
    workedExample: { id: 'unknown-backup', title: 'قدرة نسخ غير معلومة', context: 'خطة الاستضافة لم تُراجع بعد ولم يجر اختبار استعادة.', result: 'Backup status=unknown, restore drill=Not Run. المالك يراجع صفحة الخطة، ثم ينفذ نسخة إلى بيئة test إذا سمح المزود. لا وعد بسلامة أو زمن استعادة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'لوحة الخطة تعرض backup لكن لم تجر restore. ماذا تسجل؟', options: ['استعادة Passed.', 'النسخ متاح حسب الدليل؛ restore لم يختبر.', 'RTO مضمون خلال ساعة.'], correct: 1, explanation: 'وجود ميزة لا يثبت نجاح استعادة أو زمنها.' },
      { objective: 2, prompt: 'رجع التطبيق لإصدار أقدم بعد migration أحدثت عموداً. ماذا يجب مراجعة؟', options: ['النسخ والتوافق الرجعي للـ schema؛ rollback التطبيق لا يعكس DB وحده.', 'لا شيء لأن Git يعيد البيانات.', 'امسح العمود فوراً.'], correct: 0, explanation: 'الكود والبيانات لهما إجراءات استعادة مختلفة وقد تكون migration غير عكسية.' },
    ],
    outputs: [{ id: 'operations-capabilities', description: 'جرد قدرات الاستضافة مع مصدر وحالة ومالك.' }, { id: 'restore-rollback-plan', description: 'إجراءات اختبار لاستعادة البيانات وتراجع التطبيق منفصلان.' }],
    criteria: [
      { id: 'capability-evidence', outputId: 'operations-capabilities', name: 'قدرة بدليل', description: 'كل ادعاء تشغيل مرتبط بصفحة/إعداد ومصنف بصدق.', evidencePrompt: 'أرفق قدرة واحدة ومصدرها وما بقي غير متحقق.' },
      { id: 'data-application-separation', outputId: 'restore-rollback-plan', name: 'فصل الإجراءين', description: 'الرجوع للكود لا يوصف باستعادة قاعدة البيانات.', evidencePrompt: 'أشر إلى خطوة تطبيق وخطوة بيانات وشرط كل منهما.' },
    ],
    reviewNote: 'راجع المؤلف حالات القدرة الأربع وفصل rollback عن restore. الدليل التعليمي يتطلب اختباراً خارج الإنتاج أو يسجل Not Run صريحاً؛ قبول المجموعة النهائي ما زال مطلوباً.',
  },
  'project-handoff-package': {
    slug: 'project-handoff-package',
    objectives: ['اجمع نقطة بدء وروابط ومتطلبات ومخططات وتعليمات تشغيل يمكن لمراجع اتباعها.', 'اربط نتيجة QA بإصدار وبيئة وطريقة وتاريخ، وأظهر النواقص والأسرار المحذوفة.'],
    sections: [
      { id: 'inputs', heading: 'حدد من يستلم ولماذا', body: 'المدخل مستندات PRD/SRS وERD وAPI وUX وQA، ومخرجا الموضوع 55 operations-capabilities وrestore-rollback-plan. حزمة التسليم مؤشر للموجود لا مخزن نسخ مضطربة؛ اربط النسخة المعتمدة ولا تنشئ ملفاً أو رابطاً افتراضياً. لا تضع .env أو بيانات مستخدم.' },
      { id: 'example', heading: 'مثال محلول: README موجز', body: 'يبدأ README بالمشكلة والحالة والميزات المنفذة، ثم quick start ومتغيرات البيئة بأسمائها فقط ورابط HANDOFF. تقرير QA يسجل commit وcommand وdate وPassed/Failed/Not Run. إذا API يستخدم fixtures فأظهر ذلك.' },
      { id: 'exercise', heading: 'مهمة تسليم', body: 'برومبت: «أنشئ فهرس الحزمة من الملفات الموجودة. لكل رابط تحقق من المسار والصلاحية، ولكل نتيجة أرفق الأمر والنسخة. اذكر القيود والمالك والخطوة التالية. لا تنسخ الأسرار». سلّم نسخة مختصرة قابلة للعرض في Demo Day.' },
    ],
    practicalSteps: [
      { id: 'readme-index', instruction: 'حدّث README بملخص المشروع والحالة وquick start وروابط نسبية موجودة.', expectedOutput: 'README يفتح مسارات حقيقية ويبين publish/local/prototype بلا ادعاء.' },
      { id: 'handoff-map', instruction: 'أنشئ فهرس متطلبات/مخطط/API/design/runbook/QA مع رقم أو تاريخ النسخة.', expectedOutput: 'docs/HANDOFF.md يذكر الموجود والمفقود والمسؤول والوصول.' },
      { id: 'qa-claim', instruction: 'انقل نتيجة فحص واحدة مع commit/environment/command/date/status.', expectedOutput: 'docs/QA_RESULTS.md يسمح بإعادة الفحص ويحتفظ بـ Failed وNot Run كما هما.' },
    ],
    workedExample: { id: 'handoff-status', title: 'حالة تكامل صادقة', context: 'تسليم مشروع يعرض fixtures بعد نجاح build.', result: 'README: واجهة نموذجية ببيانات محلية؛ QA: build Passed على commit placeholder، API integration Not Run. قبل الحفظ استبدل placeholder بأدلة حقيقية أو احذفه.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'الحزمة تشير إلى docs/ERD.md لكن الملف غير موجود. ماذا تفعل؟', options: ['تسجل المفقود والمالك والخطوة، أو تصلح الرابط بملف حقيقي.', 'تعلن التسليم مكتملاً.', 'تنسخ ERD من مشروع مختلف.'], correct: 0, explanation: 'المراجع يحتاج ملفاً واقعياً أو فجوة واضحة لا رابطاً متخيلاً.' },
      { objective: 2, prompt: 'نتيجة build تخص commit سابقاً. كيف تعرضها؟', options: ['تنسبها إلى النسخة الحالية.', 'تذكر commit والبيئة والتاريخ، وتعيد الفحص إذا احتجت دليلاً للحالي.', 'تحذف معلومات النسخة.'], correct: 1, explanation: 'النتيجة مرتبطة بالنسخة التي شُغلت عليها.' },
    ],
    outputs: [{ id: 'handoff-index', description: 'README وفهرس docs بروابط موجودة وإصدارات.' }, { id: 'handoff-evidence', description: 'تقرير فحوص وقيود ونتائج مرتبطة بcommit.' }],
    criteria: [
      { id: 'link-integrity', outputId: 'handoff-index', name: 'روابط صحيحة', description: 'الروابط إلى ملفات موجودة وصلاحية مشاركة قابلة للشرح.', evidencePrompt: 'أشر إلى رابط داخلي واحد وتحقق من هدفه.' },
      { id: 'test-provenance', outputId: 'handoff-evidence', name: 'مصدر نتيجة', description: 'النتيجة معها command/environment/commit/date/status.', evidencePrompt: 'أرفق صف نتيجة واحدة مع مصدرها وحدودها.' },
    ],
    reviewNote: 'راجع المؤلف نقطة بدء README وتسلسل الوثائق وصدق الادعاءات المرتبطة بالنسخة. السطر المثال معلّم placeholder ولا يمثل فحصاً فعلياً.',
  },
  'project-demo-day': {
    slug: 'project-demo-day',
    objectives: ['ابنِ قصة عرض قصيرة حول مشكلة مستخدم ورحلة قابلة للإعادة وقرار موثق.', 'جهز fallback آمن وسمّه بوضوح، واربط ادعاءات الأثر بالدليل المتوفر.'],
    sections: [
      { id: 'inputs', heading: 'حدد الجمهور والنسخة', body: 'المدخل README ومخرجا الموضوع 56 handoff-index وhandoff-evidence، والنسخة المنشورة أو التشغيل المحلي والبيانات الآمنة. استخدم حالة الإصدار والأدلة كما سُجلت. اكتب الهدف والمدة والجمهور. لا تبدأ برسم معماري طويل ولا تدّع مقابلات أو عدد مستخدمين لم يُقَس.' },
      { id: 'example', heading: 'مثال محلول: طلب مورد', body: 'اعرض إضافة طلب واحد من حساب test ثم حالة مراجعته، واربط القرار بعقد API. وضح إذا المشهد mock أو live. إذا فشل الرابط، اعرض تسجيل الشاشة كبديل مسمى وليس كتفاعل مباشر.' },
      { id: 'exercise', heading: 'مهمة وبرومبت تدريب', body: 'برومبت: «استخدم README والأدلة الحالية فقط. اكتب مقدمة ومشهد رحلة وقراراً وقيداً، ووقت اختبار الرابط وخطة fallback. لا تخترع مقياساً أو مستخدماً». جرّب النص والبيانات قبل العرض، ثم صغ بطاقة portfolio.' },
    ],
    practicalSteps: [
      { id: 'talk-track', instruction: 'اكتب قصة المشكلة والحل والرحلة والقرار بوقت لكل مقطع.', expectedOutput: 'docs/DEMO_DAY_SCRIPT.md بحقائق مسندة إلى README أو قرار فعلي.' },
      { id: 'demo-check', instruction: 'شغّل الرحلة في نسخة العرض وبيانات آمنة ودوّن التاريخ والنسخة والنتائج.', expectedOutput: 'docs/DEMO_CHECKLIST.md يميز Passed وFailed وNot Run مع نقطة البداية.' },
      { id: 'fallback', instruction: 'جهز fallback واحداً يمكن الوصول إليه من دون سر، وحدد كيف تعرضه إذا انقطع الرابط.', expectedOutput: 'تسجيل/لقطة/تشغيل محلي بعلامة fallback ووقت آخر فحص.' },
    ],
    workedExample: { id: 'demo-story', title: 'مشهد واحد قابل للتكرار', context: 'نموذج حجز مورد ببيانات اختبار.', result: 'المشكلة: تعارض الحجز. المشهد: افتح يومين واختر موعداً، ثم أظهر rejection لحجز متزامن. دليل test موجود؛ الاستخدام الحقيقي ورضا المستخدم لم يُقَس.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أي عرض يقنع المراجع بسلوك محدد؟', options: ['رحلة واحدة وخطواتها ونتيجتها على نسخة معلومة.', 'عرض لائحة تقنيات فقط.', 'ادعاء أن المنتج خدم 1000 مستخدم بلا مصدر.'], correct: 0, explanation: 'رحلة قابلة لإعادة الفحص أوضح من التقنيات أو أرقام بلا دليل.' },
      { objective: 2, prompt: 'انقطع الاتصال وتعرض فيديو تسجيل للرحلة. كيف تقدمه؟', options: ['كعرض حي.', 'كـ fallback مسجل مع ذكر أنه لا يتصل بالخدمة الآن.', 'كدليل أن الإنتاج يعمل.'], correct: 1, explanation: 'نوع الدليل وحالته يظلان واضحين للجمهور.' },
    ],
    outputs: [{ id: 'demo-script', description: 'نص عرض قصير لرحلة وقرار وقيود مع مصادر.' }, { id: 'demo-readiness', description: 'قائمة فحص نسخة وبيانات وروابط وخطة احتياط.' }],
    criteria: [
      { id: 'claim-evidence', outputId: 'demo-script', name: 'ادعاء له مصدر', description: 'المشكلة والسلوك والنتيجة تتبع دليلاً أو توصف كافتراض.', evidencePrompt: 'اختر جملة واحدة وأرفق المصدر الذي يدعمها.' },
      { id: 'fallback-label', outputId: 'demo-readiness', name: 'احتياط مفهوم', description: 'الاحتياط موسوم بالتسجيل أو الصورة أو التشغيل المحلي وتاريخه.', evidencePrompt: 'أرفق وصف fallback وأحدث وقت تحقق من نسخته.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين رحلة حية ولقطة fallback، وقيّد الأثر بما يقيسه الدليل. المشهد لا يختلق نتائج استخدام واقعي.',
  },
  'project-portfolio-entry': {
    slug: 'project-portfolio-entry',
    objectives: ['اكتب بطاقة مشروع تصف حالته ومساهمتك الفردية والتعاون ومساعدة الأدوات بدقة.', 'ادعم نتيجة قابلة للقياس بطريقة ومصدر وعينة، أو صرح بأن الأثر لم يقس.'],
    sections: [
      { id: 'inputs', heading: 'اجمع الأثر قبل الصياغة', body: 'المدخل repo وREADME ومخرجا الموضوع 57 demo-script وdemo-readiness، وسجل مساهمات وQA ورابط/لقطة النسخة. استخدم حالة العرض والفجوات كما هي. تحقق من حقوق المشاركة ونظف البيانات والأسرار. فرّق بين prototype وlocal وpublished وبين ما صنعه الطالب وما شارك فيه.' },
      { id: 'example', heading: 'مثال محلول: مساهمة قابلة للتحديد', body: 'اكتب «نفذت نموذج الحجز في src/...، وراجعت سياسة الصلاحيات مع الفريق. العرض يستخدم fixtures؛ لم نقس الاستخدام بعد». لا تحول اجتياز اختبار محلي إلى ادعاء أثر تجاري أو نجاح مستخدم.' },
      { id: 'exercise', heading: 'مهمة كتابة ومراجعة', body: 'برومبت: «استخدم الأدلة المرفقة فقط. اكتب المشكلة ومساهمتي والقرار والنتائج والقيود. راجع كل رقم ورابط وادعاء عمل جماعي. إن لم يوجد قياس، اذكر ذلك. احذف أي بيانات خاصة». سلّم البطاقة وأدلة الروابط.' },
    ],
    practicalSteps: [
      { id: 'contribution-record', instruction: 'اكتب ما نفذته أنت وما شاركت فيه وما ساعدت به الأداة أو مساهم آخر.', expectedOutput: 'docs/PORTFOLIO_ENTRY.md فيه أسماء أجزاء وروابط commits قابلة للمشاركة.' },
      { id: 'outcome-proof', instruction: 'لكل نتيجة أرفق مصدر وطريقة ووقت وعينة، أو عبارة لم يُقَس.', expectedOutput: 'جدول claim/evidence/method/limit؛ لا نسبة أو رقم تخميني.' },
      { id: 'privacy-and-links', instruction: 'افحص روابط العرض والمستودع واللقطات وامسح بيانات شخصية أو سرية.', expectedOutput: 'قائمة رابط وحالة صلاحية مشاركة وتاريخ فحص، وخطوة إزالة لأي مرفق حساس.' },
    ],
    workedExample: { id: 'honest-portfolio-card', title: 'بطاقة نموذج غير منشور', context: 'مشروع فريق يعرض صوراً ببيانات ثابتة.', result: 'State=prototype, not published. Contribution: built filter UI and added empty-state test. Impact: not measured. Evidence: commit and screenshot from local run; API integration not run. (Replace paths with real artifacts before sharing.)', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أنجز فريق ميزة وأنت كتبت صفحة واحدة. أي صياغة عادلة؟', options: ['بنيت النظام بالكامل.', 'نفذت الصفحة المحددة ضمن فريق، واربطها بالcommit.', 'لا حاجة لذكر عمل الزملاء.'], correct: 1, explanation: 'المساهمة المحددة تمثل الواقع وتتيح للمراجع تتبعها.' },
      { objective: 2, prompt: 'تظهر اختباراتك محلياً لكن لا يوجد بحث مستخدم أو مقياس. ماذا تقول عن الأثر؟', options: ['حسّنت رضا المستخدمين 40%.', 'الاختبارات المحلية مرت؛ أثر المستخدم لم يقس.', 'أثبتت نجاح المنتج التجاري.'], correct: 1, explanation: 'دليل فحص البرمجية لا يساوي قياس أثر المستخدم.' },
    ],
    outputs: [{ id: 'portfolio-narrative', description: 'بطاقة مشكلة/حالة/مساهمة/قرار/قيود.' }, { id: 'portfolio-evidence-map', description: 'روابط وclaims وطريقة قياس أو تصريح غياب قياس.' }],
    criteria: [
      { id: 'contribution-accuracy', outputId: 'portfolio-narrative', name: 'حجم مساهمة صادق', description: 'الفردي والجماعي ومساعدة الأداة منفصلة ومسنودة.', evidencePrompt: 'اربط عبارة واحدة في البطاقة بملف أو commit وصلاحية مشاركته.' },
      { id: 'impact-method', outputId: 'portfolio-evidence-map', name: 'قياس قابل للفحص', description: 'أي أثر رقمي معه baseline/source/sample/method؛ وإلا يوصف بأنه غير مقاس.', evidencePrompt: 'أرفق خلية قياس كاملة أو الجملة التي تصرح بعدم القياس.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين مساهمة شخصية وأثر منتج، واشتراط خط أساس ووسيلة قياس لأي نسبة. المثال prototype توضيحي وليس سيرة أو إنجازاً فعلياً.',
  },
};

const INDEPENDENT_REVIEW_NOTES_GROUP_B_19: Record<string, string> = {
  'project-operations-runbook': 'راجعت توثيق قدرات الاستضافة مع المصدر والحالة والمالك، والفصل الصريح بين تراجع التطبيق واستعادة DB وتوافق migration. المثال يترك النسخ غير معلوم وتمرين الاستعادة Not Run؛ operations-capabilities وrestore-rollback-plan يغذيان فهرس handoff.',
  'project-handoff-package': 'راجعت نقطة بدء README والفهرس والروابط والنسخ، وربط حالة QA بالcommit والبيئة والأمر والتاريخ، مع وسم placeholder كبيان توضيحي لا كاختبار فعلي. handoff-index وhandoff-evidence يوفران مدخلات قابلة للتتبع لمشهد Demo Day.',
  'project-demo-day': 'راجعت ترتيب قصة المشكلة والرحلة والقرار والقيود، وتمييز live عن mock أو تسجيل fallback، وربط كل ادعاء بمصدر. المثال لا يزعم استخداماً حقيقياً أو رضا مقاساً؛ demo-script وdemo-readiness يغذيان بطاقة المحفظة.',
  'project-portfolio-entry': 'راجعت فصل مساهمة الفرد عن الفريق ومساعدة الأدوات، والتحقق من الروابط والخصوصية، واشتراط baseline/source/sample/method للادعاء الرقمي أو التصريح بعدم القياس. المثال موسوم كنموذج أولي توضيحي، لا خبرة فعلية.',
};

recordIndependentTopicReview(TOPIC_DRAFTS_GROUP_B_19, INDEPENDENT_REVIEW_NOTES_GROUP_B_19,
  'راجعت السؤالين والخيارات ومفتاح كل إجابة والتعليل مقابل الهدف والمحتوى؛ الأجوبة تميز بين ادعاء مدعوم وآخر غير مختبر أو غير مقاس. سياسة النقاط المقبولة في issue #70 تمنح نقطة للصحيح وصفر للخطأ أو غير المجاب، مع محاولات غير محدودة وتفسير بعد الإرسال وحفظ كل المحاولات بإصدارات السؤال والسياسة. هذا لا يثبت إتقان المتعلم.',
  'راجعت المخرجين ومطابقة كل معيار لمخرجه وسؤال الدليل. سياسة التقييم العملي المقبولة في issue #70 ذاتية بثلاثة مستويات وبلا حد إتقان أو تحقق مستقل للصحة.',
);

export const LEARNING_CONTENT_GROUP_B_19: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_19, QUESTION_IDS_GROUP_B_19, VIDEO_CANDIDATES_GROUP_B_19);
