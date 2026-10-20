import { TopicDraft, buildTopic } from '@/src/data/learning/group-a-common.ts';
import { getExternalVideoCandidates } from '@/src/data/externalVideoRegistry.ts';
import { LEARNING_CONTENT_GROUP_A_REST } from '@/src/data/learning/group-a-rest.ts';

const topicDrafts: TopicDraft[] = [
  {
    topicSlug: 'project-idea-mvp',
    objectives: [
      { id: 'idea-mvp-objective-problem', text: 'صياغة مشكلة ومستخدم وقيمة مع بيان مصدر المعرفة وما يزال افتراضاً.' },
      { id: 'idea-mvp-objective-scope', text: 'تحديد رحلة MVP كاملة قابلة للنقاش وتأجيل ميزات لا تلزم لإتمامها.' },
    ],
    sections: [
      { heading: 'المدخل: موقف ومستخدم ومصدر معرفة', body: 'ابدأ بموقف حقيقي تعرفه أو تريد التحقق منه. اذكر من يحاول إنجاز ماذا، وما العائق، وكيف عرفت ذلك. مقابلة المستخدم لم تحدث لمجرد أن الفكرة تبدو منطقية؛ ميّز الملاحظة عن الافتراض والسؤال المفتوح.' },
      { heading: 'قرار النطاق: رحلة ذات قيمة من البداية إلى النتيجة', body: 'MVP هنا أصغر رحلة كاملة تستطيع اختبار قيمة ما، لا أقل عدد من الشاشات ولا قائمة ميزات. سمّ صاحب كل خطوة ونقطة القرار والنتيجة التي يراها المستخدم، ثم اذكر ما يمكن تأجيله ولماذا تبقى الرحلة مفيدة من دونه.' },
      { heading: 'التسليم إلى Grill Me', body: 'يحفظ `docs/PROJECT_CONTEXT.md` المشكلة والأدوار وحدود الرحلة والقرارات والافتراضات والأسئلة ومعيار نجاح قابل للملاحظة. يستخدمه الموضوع التالي مدخلاً لمقابلة تسأل سؤالاً واحداً في كل مرة؛ الملف ليس PRD معتمداً ولا إذناً ببدء البناء.' },
    ],
    practicalSteps: [
      { instruction: 'اختر مشروعك أنت، واكتب المشكلة والمستخدمين ومصدر كل معلومة، ثم افصل الحقائق عن الافتراضات والأسئلة المفتوحة.', expectedOutput: 'قسم المشكلة والمستخدمين والقيمة في `docs/PROJECT_CONTEXT.md`، مع وسم واضح لكل ادعاء غير متحقق.' },
      { instruction: 'ارسم رحلة MVP مرقمة من بداية المهمة إلى ظهور النتيجة، وأجّل ميزتين مع سبب التأجيل، ثم اكتب معياراً يستطيع شخص آخر تجربته.', expectedOutput: 'ملف `docs/PROJECT_CONTEXT.md` مكتمل ويرسل أسئلته المفتوحة إلى مقابلة Grill Me في Topic 02.' },
    ],
    workedExample: {
      title: 'BorrowHub: سياق تعليمي اختياري',
      context: 'المادة تصف طالباً يطلب معدات ومسؤولاً يراجع الطلب ويسجل التسليم والإرجاع. هذه قصة تعليمية، وليست دليلاً على مقابلات مستخدمين أو حجم مشكلة مثبت.',
      result: 'رحلة المسودة تبدأ بالتصفح وطلب وحدة مع سبب ومدة، ثم مراجعة المسؤول وإبلاغ الطالب وتسجيل التسليم والإرجاع. الدفع والتوصيل مؤجلان لأن القصة لا تحتاجهما لإظهار رحلة الاستعارة. تفاصيل الحالات غير المحسومة تظل أسئلة للمراجعة.',
      caseStudy: 'borrowhub-optional',
    },
    outputs: [
      { id: 'project-context', description: '`docs/PROJECT_CONTEXT.md` يتضمن المشكلة والمستخدمين والقيمة ورحلة MVP والمؤجل والقرارات والافتراضات والأسئلة ومعيار النجاح.' },
      { id: 'next-topic-input', description: 'سؤالان مفتوحان على الأقل ومصدر معرفتهما، لاستخدام الملف مدخلاً لمقابلة Grill Me في Topic 02.' },
    ],
    questions: [
      {
        id: 'idea-mvp-q-evidence', objectiveId: 'idea-mvp-objective-problem',
        prompt: 'لم تتحدث بعد مع مستخدمين، لكنك تتوقع أن الطلاب يتأخرون بسبب ضياع الطلبات. كيف تسجل هذه العبارة؟',
        options: ['حقيقة مثبتة لأن المشكلة شائعة', 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', 'قرار منتج نهائي', 'متطلب وظيفي مؤكد'], correct: 1,
        explanation: 'التوقع الذي لم يختبر بعد يظل افتراضاً. وسمه يمنع تحويل قصة مقنعة إلى حقيقة أو قاعدة نظام دون دليل.',
        reviewEvidence: [{ area: 'question', outcome: 'passed', reviewer: 'root', reviewedAt: '2026-10-20', evidence: 'Independent narrow review confirmed the answer key and rationale are correct: an unverified prediction remains an assumption. The course owner accepted the shared quiz policy under DEC-70 issue #42; this narrow question review does not complete the Topic lesson review or group sign-off.' }],
      },
      {
        id: 'idea-mvp-q-journey', objectiveId: 'idea-mvp-objective-scope',
        prompt: 'أي اقتراح يصف MVP مفيداً لتطبيق حجز موعد؟',
        options: ['ثلاث شاشات جميلة بلا حجز مكتمل', 'رحلة حجز واحدة من اختيار وقت إلى تأكيد واضح، مع تأجيل التوصيات', 'كل أفكار لوحة الإدارة والتقارير دفعة واحدة', 'نموذج إدخال بلا نتيجة بعد الإرسال'], correct: 1,
        explanation: 'الرحلة ذات قيمة عندما تصل إلى نتيجة مفهومة للمستخدم. عدد الشاشات لا يثبت أن المهمة اكتملت، والتوصية يمكن تأجيلها إذا لم تمنع الحجز الأساسي.',
        reviewEvidence: [{ area: 'question', outcome: 'passed', reviewer: 'root', reviewedAt: '2026-10-20', evidence: 'Independent narrow review confirmed the answer key and rationale are correct: the booking journey reaches confirmation and defers recommendations without breaking the core value. The course owner accepted the shared quiz policy under DEC-70 issue #42; this narrow question review does not complete the Topic lesson review or group sign-off.' }],
      },
    ],
    criteria: [
      { id: 'idea-mvp-r-problem', outputId: 'project-context', name: 'صياغة المشكلة ودليلها', description: 'يسمي المستخدم والموقف والمهمة والعائق ويفصل المشاهدة عن الافتراض.', evidencePrompt: 'أشر إلى جملة المشكلة وإلى المصدر أو الوسم الذي يبين ما لم يتحقق بعد.', reviewEvidence: [{ area: 'rubric', outcome: 'passed', reviewer: 'root', reviewedAt: '2026-10-20', evidence: 'Independent narrow review confirmed this criterion asks for observable evidence in the project-context artifact and does not infer mastery. The course owner accepted the shared descriptive rubric policy under DEC-70 issue #43; this narrow criterion review does not complete the Topic lesson review or group sign-off.' }] },
      { id: 'idea-mvp-r-scope', outputId: 'project-context', name: 'اكتمال رحلة MVP وحدودها', description: 'يمكن اتباع الرحلة حتى نتيجتها، وتبرر الوثيقة تأجيل الميزات دون قطع الرحلة.', evidencePrompt: 'تتبع الرحلة خطوة بخطوة، ثم اذكر ميزة مؤجلة وسبب بقاء الرحلة مفيدة من دونها.', reviewEvidence: [{ area: 'rubric', outcome: 'passed', reviewer: 'root', reviewedAt: '2026-10-20', evidence: 'Independent narrow review confirmed this criterion requests artifact evidence for a complete useful journey and its deferred scope without inferring mastery. The course owner accepted the shared descriptive rubric policy under DEC-70 issue #43; this narrow criterion review does not complete the Topic lesson review or group sign-off.' }] },
    ],
    candidateVideos: getExternalVideoCandidates('project-idea-mvp'),
  }
];

/** Draft learning supplement for canonical group 01 (Topic 01). */
export const LEARNING_CONTENT_GROUP_A: Record<string, import('@/src/types/learning.ts').TopicLearningContent> = Object.fromEntries(
  [
    ...topicDrafts.map((draft) => [draft.topicSlug, buildTopic(draft)] as const),
    ...Object.entries(LEARNING_CONTENT_GROUP_A_REST),
  ],
);

// Refresh saved snapshots when the supplement or its underlying lesson changes.
for (const slug of ['project-idea-mvp', 'srs', 'git-project-docs', 'github-docs-collaboration', 'plantuml', 'state-diagram']) {
  LEARNING_CONTENT_GROUP_A[slug].contentVersion = 2;
}
