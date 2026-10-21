import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';

export const QUESTION_IDS_GROUP_B_12: Record<string, [string, string]> = {
  'frontend-architecture-planning': ['requirement-conflict-source', 'reviewable-task-boundary'],
  'ui-ux-pro-max-review': ['suggestion-vs-approved-system', 'actionable-critique-evidence'],
  'spec-kit-workflow': ['scope-expansion-control', 'spec-plan-task-trace'],
  'frontend-incremental-implementation': ['vertical-slice-choice', 'mocked-service-boundary'],
};

export const VIDEO_CANDIDATES_GROUP_B_12: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'frontend-architecture-planning': {
    id: 'frontend-architecture-planning-video-candidate',
    title: 'Architectural Requirements — Fundamentals of Frontend Architecture',
    url: 'https://frontendatscale.com/courses/frontend-architecture/foundations/course-overview',
    purpose: 'مرشح من درس فيديو محدد في الدورة: Architectural Requirements (الدرس 13، 7:44)، ومعه Exercise 2 حول تمييز المتطلبات المؤثرة وربطها بالمواصفات. هذا يدعم توثيق المصدر والقيود، ولا يغطي وحده كامل PRD/SRS للمشروع.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://frontendatscale.com/courses/frontend-architecture/foundations/course-overview', evidence: 'فهرس الدورة يسرد درس Architectural Requirements ومدته 7:44 وExercise 2: Architectural Requirements؛ صفحة التمرين تشرح استخراج المتطلبات المعمارية من مواصفة مشروع. صلة الخريطة/المهام جزئية، ولا تُعد موافقة قالب الدورة. لم يُختبر التشغيل أو captions أو الوصولية أو قبول المالك.' }],
  },
  'ui-ux-pro-max-review': {
    id: 'ui-ux-pro-max-review-video-candidate',
    title: 'How to use Figma agent in your design workflows',
    url: 'https://www.figma.com/solutions/ai-design-feedback-agent/',
    purpose: 'مرشح من مورد Figma الذي يصف مشاهدة agent ومراجعته للتصميم داخل سياق الإطارات ومكتبة التصميم. يُستخدم كنقطة نقد مساعدة فقط؛ يجب على المتعلم فحص الهدف والسياق وإمكانية الوصول وعدم قبول اقتراحات الأداة تلقائياً.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.figma.com/solutions/ai-design-feedback-agent/', evidence: 'صفحة Figma الرسمية تسرد “How to use Figma agent in your design workflows” كدرس فيديو وتشرح أن agent يقدم نقداً ضمن طبقات التصميم والسياق وإرشادات الوصولية. المورد خاص بأداة Figma AI ولا يثبت جودة توصياتها أو تغطية اختبار المستخدم. التشغيل/captions/accessibility وموافقة المالك غير منفذة.' }],
  },
  'spec-kit-workflow': {
    id: 'spec-kit-workflow-video-candidate',
    title: 'The ONLY guide you’ll need for GitHub Spec Kit',
    url: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit/',
    purpose: 'مرشح لشرح سلسلة Spec Kit من المتطلبات قبل التنفيذ. صفحة Microsoft for Developers تسمي فيديو دليلاً لـ GitHub Spec Kit؛ قارنه بنسخة CLI والقوالب الحالية لأن سير العمل يتغير.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit/', evidence: 'مقال Microsoft for Developers يصف Spec Kit ويضع رابط فيديو بعنوان “The ONLY guide you’ll need for GitHub Spec Kit”. صفحة GitHub الرسمية كذلك تسرد Video Overview. المحتوى ملائم كتقديم، لكن تعليمات CLI/version لا تُعامل كمرجع حالي دون فحص المستودع. لم يُختبر الفيديو أو captions أو الوصولية، ولا قبول مالك.' }],
  },
  'frontend-incremental-implementation': {
    id: 'frontend-incremental-implementation-video-candidate',
    title: '22. Breaking Things Down — Fundamentals of Frontend Architecture',
    url: 'https://frontendatscale.com/courses/frontend-architecture/designing/breaking-things-down/',
    purpose: 'مرشح لشرح تقطيع العمل إلى وحدات ومشكلات أصغر؛ النص المصاحب يبدأ في 00:30 بوحدات/مشكلات صغيرة في نظام الواجهة. يوائم اختيار vertical slice مع عرض مخرج قابل للفحص.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://frontendatscale.com/courses/frontend-architecture/designing/breaking-things-down/', evidence: 'صفحة فيديو Frontend at Scale تسمي درس 22 وتعرض نصاً زمنياً: عند 00:30 يشرح تقسيم النظام إلى modules ومشكلات صغيرة. الملاءمة لتجزئة التنفيذ عملية؛ لا تثبت نجاح تنفيذ مشروع المتعلم. التشغيل/captions/accessibility/owner approval لم تُفحص.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_12: Record<string, TopicDraft> = {
  'frontend-architecture-planning': {
    slug: 'frontend-architecture-planning',
    objectives: ['اشتق شجرة الصفحات والمكونات والعقود من PRD/SRS وجرد الشاشات وERD.', 'حوّل رحلة استخدام واحدة إلى مهام مرتبة ذات مدخل ومخرج قابل للفحص.'],
    sections: [
      { id: 'inputs', heading: 'اجمع المراجع قبل تقسيم الملفات', body: 'ابدأ بـ PRD وSRS وجرد الشاشات وDESIGN.md وERD ومخرجي الموضوع 33 route-spec وroute-shell (docs/NEXTJS_ROUTING_SPEC.md). طابق كل ملف ومسار هناك قبل إضافة مكونات أو مهام. سجل ما يطلبه المستخدم وما تعرضه كل route، ثم اربط المكونات بالكيانات. لا تضف شاشة أو دوراً لأنه شائع في منتج آخر.' },
      { id: 'example', heading: 'مثال محلول: فهرس وتفصيل', body: 'في BorrowHub المسار /equipment يعرض AppShell وSearchBar وEquipmentCard؛ /equipment/[id] يعرض التفاصيل. العقد يمرر EquipmentSummary للفهرس وEquipmentRecord للتفصيل، وأي حقل غير محسوم يبقى سؤالاً.' },
      { id: 'exercise', heading: 'برومبت تخطيط ومخرج', body: 'برومبت: «استخرج route/component map من هذه المراجع. اربط كل عنصر بمصدره، وافصل القرارات عن الأسئلة، ثم اقترح مهام صغيرة بقبول ملاحظ. لا تنشئ Backend أو شاشة غير موجودة». سلّم الخريطة إلى مراجعة UX التالية.' },
    ],
    practicalSteps: [
      { id: 'screen-map', instruction: 'صنف كل شاشة إلى route ومكونات مشتركة وبيانات تقرؤها أو تعدلها.', expectedOutput: 'docs/FRONTEND_ARCHITECTURE.md يحوي جدول شاشة/route/component/data source.' },
      { id: 'vertical-task', instruction: 'اختر رحلة واقطعها إلى مهام صغيرة تبدأ بسطح المستخدم وتنتهي بمخرج قابل للتجربة.', expectedOutput: 'قائمة مهام فيها empty/success states وقبول ملاحظ، لا مهمة واحدة بعنوان "ابن التطبيق".' },
      { id: 'unknowns', instruction: 'سجل الاختلاف بين PRD وERD أو الشاشة مع مصدر القرار المطلوب.', expectedOutput: 'docs/FRONTEND_OPEN_QUESTIONS.md يذكر السؤال والمراجع والمالك.' },
    ],
    workedExample: { id: 'route-map-example', title: 'خريطة فهرس المعدات', context: 'BorrowHub SCREEN_INVENTORY.md وroute-spec يحددان فهرس المعدات والتفاصيل.', result: 'Route /equipment → SearchBar + EquipmentList؛ route /equipment/[id] → EquipmentDetail. الرابط يحمل id، وبقية الحقول مصدرها محدد في الخريطة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'تختلف شاشة عن ERD في حقلين. ما الخطوة الأولى؟', options: ['اختيار الحقول المعتادة.', 'تسجيل سؤال وربطه بالمصدرين قبل تثبيت العقد.', 'إضافة الحقلين إلى قاعدة البيانات.'], correct: 1, explanation: 'الخطة تميز القرار من الافتراض، ولا تنشئ عقداً متعارضاً بالتخمين.' },
      { objective: 2, prompt: 'أي مهمة يسهل مراجعتها؟', options: ['"ابن الواجهة".', '"نفذ ItemCard بfixture وحالة empty ومعيار قبول".', '"حسن الملفات لاحقاً".'], correct: 1, explanation: 'مهمة صغيرة ذات مدخل ونتيجة مرئية يمكن فحصها مستقلة.' },
    ],
    outputs: [{ id: 'front-map', description: 'خريطة route/component/data مرتبطة بمصادر المتطلبات.' }, { id: 'task-slice', description: 'مهام عمودية صغيرة وأسئلة وأدلة قبول.' }],
    criteria: [
      { id: 'map-source', outputId: 'front-map', name: 'تتبّع المصدر', description: 'كل route/component يتبع متطلباً أو يحمل سؤالاً مفتوحاً.', evidencePrompt: 'أشر إلى شاشة ومصدرها في PRD أو inventory.' },
      { id: 'slice-acceptance', outputId: 'task-slice', name: 'قبول ملاحظ', description: 'للمهام نتيجة مرئية وحالات خارج المسار السعيد.', evidencePrompt: 'أرفق المهمة الأولى وشرط قبول يمكن إعادة ملاحظته.' },
    ],
    reviewNote: 'راجع المؤلف ربط المراجع الأربعة بخريطة route/component ومهمة رأسية. لا تُدخل قاعدة أو شاشة غير موثقة، والمخرج يهيئ مراجعة UX وSpec Kit.',
  },
  'ui-ux-pro-max-review': {
    slug: 'ui-ux-pro-max-review',
    objectives: ['راجع توصيات UI/UX مقابل المستخدم والمتطلب ونظام التصميم قبل قبولها.', 'سجل قرارات تصميم وأسبابها بحيث يستطيع المطور تطبيقها واختبارها.'],
    sections: [
      { id: 'inputs', heading: 'حدد السياق قبل تشغيل الأداة', body: 'المدخل DESIGN.md ومخرجا تخطيط الواجهة في الموضوع 34 front-map وtask-slice، مع مهمة المستخدم والعرض والاتجاه. أداة التوصية لا تعتمد القرارات نيابة عن مالك المشروع. احذف البيانات الشخصية ولا ترسل أسراراً.' },
      { id: 'example', heading: 'مثال محلول: اقتراح يخالف الرمز', body: 'إذا اقترحت الأداة لون زر غير موجود في DESIGN.md، احتفظ باللون المعتمد أو افتح قرار تغيير. افحص تباين ومساحة النقر عند الحاجة؛ لا تدّع WCAG compliant من رأي آلي.' },
      { id: 'exercise', heading: 'برومبت مراجعة ومخرج', body: 'برومبت: «لكل توصية اذكر العنصر والدليل والأثر. ميّز الاقتراح عن معيار الوصولية، ولا تعدل الكود. أخرج قرار قبول/رفض وسؤالاً مفتوحاً». سلّم جدول القرار إلى Spec Kit.' },
    ],
    practicalSteps: [
      { id: 'context', instruction: 'جهز وصف الشاشة والمستخدم والمهمة والاتجاه والعروض واحذف بيانات حقيقية.', expectedOutput: 'docs/UX_REVIEW_CONTEXT.md يحدد نسخة الرموز والسياق.' },
      { id: 'triage', instruction: 'صنف كل توصية: قبول أو رفض أو اختبار/قرار مطلوب.', expectedOutput: 'docs/UX_REVIEW_DECISIONS.md يربط التوصية بعنصر الشاشة والمتطلب.' },
      { id: 'apply-reviewed', instruction: 'حوّل المقبول فقط إلى تغييرات بقبل/بعد ومعيار تحقق.', expectedOutput: 'تغييرات لا تحتوي توصيات غير محسومة ولا ادعاء امتثال غير مفحوص.' },
    ],
    workedExample: { id: 'ux-decision', title: 'فرز اقتراح لون ومساحة', context: 'أداة تقترح تكبير زر ثانوي وتغيير لونه.', result: 'تكبير مساحة النقر مقبول لتسهيل اللمس؛ اللون الجديد ينتظر قراراً لأنه خارج DESIGN.md. يضاف فحص contrast قبل أي تغيير لون.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'اقترحت الأداة لوناً غير موجود في DESIGN.md. ماذا تفعل؟', options: ['تطبقه مباشرة.', 'توثق الاقتراح وتراجع النظام وتطلب قراراً إن كان تغييره مطلوباً.', 'تحذف كل الاقتراحات.'], correct: 1, explanation: 'المخرجات مقترحات؛ تغيير النظام قرار قابل للتتبع.' },
      { objective: 2, prompt: 'كيف تجعل ملاحظة "المسافة غير مريحة" قابلة للتنفيذ؟', options: ['تحدد العنصر والسياق والدليل والتغيير والفحص.', 'ترفق صورة الأداة وحدها.', 'تغير كل padding.'], correct: 0, explanation: 'المراجع يحتاج موضعاً وسبباً وخطوة تحقق.' },
    ],
    outputs: [{ id: 'ux-context', description: 'سياق شاشة آمن يحدد المستخدم والمهمة والاتجاه والرموز.' }, { id: 'ux-decisions', description: 'قرارات قبول/رفض وأسئلة مع دليل ومعيار فحص.' }],
    criteria: [
      { id: 'review-context', outputId: 'ux-context', name: 'سياق محدد', description: 'المراجعة تذكر المستخدم والمهمة ولا تتضمن بيانات حساسة.', evidencePrompt: 'أشر إلى الشاشة والمهمة والعرض الذي راجعته.' },
      { id: 'decision-record', outputId: 'ux-decisions', name: 'قرار قابل للتتبع', description: 'كل توصية لها حالة ومبرر أو فحص مطلوب.', evidencePrompt: 'اعرض توصية ومصدر الحكم وسبب الحالة المختارة.' },
    ],
    reviewNote: 'راجع المؤلف حدود أداة التوصية بوصفها مدخلاً لا قراراً، وميّز تقييماً آلياً عن إثبات معيار وصولية. يسلم الناتج قرارات قابلة للتطبيق.',
  },
  'spec-kit-workflow': {
    slug: 'spec-kit-workflow',
    objectives: ['حوّل طلب ميزة إلى مواصفة وأسئلة وسياق قبل توليد خطة التنفيذ.', 'راجع clarify/plan/tasks مقابل مصادر المشروع وتوقف عند سؤال أو تعارض جوهري.'],
    sections: [
      { id: 'inputs', heading: 'المواصفة تسلسل قرارات', body: 'المدخل Constitution وPRD/SRS وخريطة الواجهة، ومخرجا الموضوع 35 ux-context وux-decisions في docs/UX_REVIEW_CONTEXT.md وdocs/UX_REVIEW_DECISIONS.md، بما فيهما القرارات والأسئلة المفتوحة. يمر العمل من spec إلى توضيح الأسئلة ثم plan وtasks، مع حمل القرارات المقبولة فقط إلى معايير التنفيذ. أسماء أوامر Spec Kit قد تتغير؛ افحص إصدار المستودع ولا تنسخ أمراً بلا تحقق.' },
      { id: 'example', heading: 'مثال محلول: استعادة مسودة', body: 'حدد حقول المسودة ومتى تحفظ وما يحدث عند تعارض جهازين. لا تجعل الخطة تضيف مزامنة سحابية إذا كان نطاق MVP محلياً؛ اكتب السؤال واطلب قراراً.' },
      { id: 'exercise', heading: 'برومبت ومخرج مرحلي', body: 'برومبت: «اقرأ Constitution وPRD/SRS. صغ spec لهذه الميزة، أظهر الأسئلة بلا افتراض، ثم اقترح خطة ومهام مرتبطة بمعايير قبول. لا تنفذ الكود». الناتج يهيئ التنفيذ التدريجي.' },
    ],
    practicalSteps: [
      { id: 'spec', instruction: 'اكتب سلوك الميزة والمستخدم والحالات المتوقعة والاستثناءات من المصادر.', expectedOutput: 'spec.md يصف success/error/empty ويربط القواعد بوثيقة.' },
      { id: 'clarify', instruction: 'سجل أسئلة الأداة ومن يجيب عنها ولا تحول الافتراض إلى قاعدة صامتة.', expectedOutput: 'قائمة clarification لا تحتوي أسئلة حرجة مخفية داخل الخطة.' },
      { id: 'plan', instruction: 'راجع الخطة وقسمها لمهام صغيرة مع ملفات واختبار قبول.', expectedOutput: 'plan/tasks تربط كل مهمة بشرط من spec؛ لا تشمل تنفيذ الكود.' },
    ],
    workedExample: { id: 'local-draft-spec', title: 'مواصفة حفظ مسودة', context: 'عودة المتعلم للمسودة في المتصفح نفسه.', result: 'المواصفة تحدد الحقول والحفظ والاستعادة وفشل storage. سؤال مزامنة الأجهزة يبقى مفتوحاً؛ لا يضاف Backend دون قرار.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أضافت أداة التخطيط مزامنة سحابية لنطاق محلي. ما التصرف؟', options: ['اعتمادها لأنها في الخطة.', 'إعادتها لحدود النطاق وتسجيلها كقرار جديد إن لزم.', 'تغيير النطاق تلقائياً.'], correct: 1, explanation: 'الخطة لا تملك صلاحية توسيع المتطلبات المعتمدة.' },
      { objective: 2, prompt: 'ما الذي يجعل tasks قابلة للمراجعة؟', options: ['كل مهمة لها متطلب وملف/نتيجة وقبول.', 'كلها بعنوان "نفذ الميزة".', 'أكبر عدد من الملفات.'], correct: 0, explanation: 'التتبع والقبول يحددان حجم التغيير وأثره.' },
    ],
    outputs: [{ id: 'feature-spec', description: 'مواصفة سيناريوهات وأسئلة مرتبطة بالمصادر.' }, { id: 'feature-plan', description: 'خطة ومهام صغيرة ضمن النطاق وبقبول واضح.' }],
    criteria: [
      { id: 'scope', outputId: 'feature-spec', name: 'نطاق وقرارات', description: 'الأسئلة غير المحسومة ظاهرة ولا توجد قاعدة مخترعة.', evidencePrompt: 'أرفق متطلباً وسؤالاً مفتوحاً ومصدر كل منهما.' },
      { id: 'tasks', outputId: 'feature-plan', name: 'تتبع المهام', description: 'كل مهمة مرتبطة بمعيار قبول دون توسيع.', evidencePrompt: 'اختر مهمة واربطها بشرط spec.' },
    ],
    reviewNote: 'راجع المؤلف التسلسل من المواصفة إلى التوضيح والخطة، وحدود النطاق عند المزامنة. أمر الأداة يجب أن يطابق الإصدار الفعلي.',
  },
  'frontend-incremental-implementation': {
    slug: 'frontend-incremental-implementation',
    objectives: ['نفذ شرائح صغيرة من الواجهة ترتبط بمعيار قبول ومصدر بيانات معلوم.', 'اعرض حالات الفشل والفراغ ودوّن نتائج الفحص قبل بدء الشريحة التالية.'],
    sections: [
      { id: 'inputs', heading: 'من المهام إلى شريحة رأسية', body: 'المدخل مخرجا الموضوع 36 feature-spec وfeature-plan، ومخرج الموضوع 35 ux-decisions، وعقود البيانات. الشريحة تغطي تفاعلاً واحداً من المستخدم إلى نتيجة، وتوضح هل المصدر fixture أم API. لا تنفذ توصية UX غير محسومة ولا تفتح تغييرات واسعة قبل فهم المخرج.' },
      { id: 'example', heading: 'مثال محلول: صفحة تفاصيل', body: 'ابدأ ببيانات fixture وحالة not-found، ثم أضف التحميل عند توفر المصدر، ثم معالجة خطأ. سجل كل فحص وأي طبقة لم تدخل التجربة؛ لا تسم fixture تكاملاً.' },
      { id: 'exercise', heading: 'برومبت تنفيذ محدود', body: 'برومبت: «نفّذ هذه المهمة وحدها وفق spec. اعرض الملفات والافتراضات ثم diff والاختبارات التي شغلتها فعلاً. لا تغير API أو التصميم خارج القبول». سلّم الشريحة إلى مرحلة Backend.' },
    ],
    practicalSteps: [
      { id: 'choose-slice', instruction: 'اختر مهمة واكتب معيار قبولها والملفات والبيانات المستخدمة.', expectedOutput: 'بطاقة عمل فيها مدخل ومخرج وfixture موسوم.' },
      { id: 'implement', instruction: 'نفذ حالة نجاح وفراغ أو خطأ مناسبة مع مصدر بيانات واضح.', expectedOutput: 'تدفق لا يوحي بتكامل Backend إن كان mock.' },
      { id: 'review', instruction: 'شغل الفحص المتاح وسجل الأمر والنتيجة والملفات الخارجة عن النطاق.', expectedOutput: 'docs/FRONTEND_SLICE_REVIEW.md بنتيجة Passed/Failed/Not Run وتالية محددة.' },
    ],
    workedExample: { id: 'detail-slice', title: 'شريحة تفاصيل', context: 'مواصفة لفتح سجل من الفهرس.', result: '1: عرض fixture. 2: حالة id غير موجود. 3: ربط API بعد توفر العقد والخادم. تسجل كل مرحلة على حدة ولا توصف الأولى كتدفق مكتمل.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أي شريحة أفضل بداية؟', options: ['مهمة صغيرة بمعيار قبول ومصدر بيانات معروف.', 'إعادة كتابة الواجهة.', 'فتح كل المهام معاً.'], correct: 0, explanation: 'الشريحة المحدودة يسهل فحصها وتصحيحها.' },
      { objective: 2, prompt: 'الاختبار يستخدم fixture بدلاً من API. ماذا تسجل؟', options: ['API Passed.', 'فحص عرض fixture Passed إن نجح، وتكامل API Not Run.', 'لا تذكر المصدر.'], correct: 1, explanation: 'النتيجة يجب أن تطابق الطبقة التي اختبرت فعلاً.' },
    ],
    outputs: [{ id: 'ui-slice', description: 'تغيير واجهة محدود يحقق معياراً مع مصدر بيانات واضح.' }, { id: 'slice-evidence', description: 'سجل ملفات وفحوص ونتائج وفجوة وتالية.' }],
    criteria: [
      { id: 'acceptance', outputId: 'ui-slice', name: 'نطاق الشريحة', description: 'تغيير واحد يطابق معيار قبول ولا يضيف متطلبات.', evidencePrompt: 'اربط الملف أو العنصر بشرط القبول.' },
      { id: 'test-result', outputId: 'slice-evidence', name: 'نتيجة قابلة للإعادة', description: 'الأمر والبيئة ومصدر البيانات مذكورة كما هي.', evidencePrompt: 'أرفق أمراً ونتيجته وطبقة لم تُختبر.' },
    ],
    reviewNote: 'راجع المؤلف فصل fixture عن التكامل الحقيقي واشتراط نتيجة فحص لكل شريحة. المخرج يسلم العقود إلى تأسيس Python Backend.',
  },
};

export const LEARNING_CONTENT_GROUP_B_12: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_12, QUESTION_IDS_GROUP_B_12, VIDEO_CANDIDATES_GROUP_B_12);
