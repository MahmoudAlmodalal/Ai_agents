import { buildTopic, approvedPolicy, TopicDraft } from '@/src/data/learning/group-a-common';
import type { ReviewEvidence, TopicLearningContent } from '@/src/types/learning';

/**
 * Test-only fixture helper providing a Topic with reviewState: 'approved'
 * and dated passing lesson, question, and rubric evidence.
 * No real Topic has its review state or evidence modified.
 */
export function createApprovedTestTopic(slug = 'project-idea-mvp'): TopicLearningContent {
  const passingLessonEvidence: ReviewEvidence[] = [
    {
      area: 'lesson',
      outcome: 'passed',
      reviewer: 'Lead educational reviewer',
      reviewedAt: '2026-10-20',
      evidence: 'Lesson content and pedagogical progression independently verified.',
    },
  ];
  const passingQuizEvidence: ReviewEvidence[] = [
    {
      area: 'question',
      outcome: 'passed',
      reviewer: 'Lead educational reviewer',
      reviewedAt: '2026-10-20',
      evidence: 'Objective questions, answer rationales, and distractions independently verified.',
    },
  ];
  const passingRubricEvidence: ReviewEvidence[] = [
    {
      area: 'rubric',
      outcome: 'passed',
      reviewer: 'Lead educational reviewer',
      reviewedAt: '2026-10-20',
      evidence: 'Practical assessment criteria and observable output prompts independently verified.',
    },
  ];

  const approval = approvedPolicy(
    'MahmoudAlmodalal (course owner)',
    '2026-10-20',
    'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #42)',
  );

  const draft: TopicDraft = {
    topicSlug: slug,
    objectives: [
      { id: `${slug}-obj-1`, text: 'صياغة مشكلة ومستخدم وقيمة مع بيان مصدر المعرفة وما يزال افتراضاً.' },
      { id: `${slug}-obj-2`, text: 'تحديد رحلة MVP كاملة قابلة للنقاش وتأجيل ميزات لا تلزم لإتمامها.' },
    ],
    sections: [
      { heading: 'المدخل', body: 'محتوى تعليمي معتمد.' },
      { heading: 'قرار النطاق', body: 'شرح رحلة MVP.' },
      { heading: 'التسليم', body: 'خطوات التسليم.' },
    ],
    practicalSteps: [
      { instruction: 'خطوة تطبيق 1', expectedOutput: 'مخرج 1' },
      { instruction: 'خطوة تطبيق 2', expectedOutput: 'مخرج 2' },
    ],
    workedExample: {
      title: 'مثال تطبيقي معتمد',
      context: 'سياق تعليمي معتمد',
      result: 'نتيجة معتمدة',
    },
    outputs: [
      { id: 'project-context', description: 'ملف سياق المشروع' },
      { id: 'next-topic-input', description: 'مدخل الموضوع التالي' },
    ],
    questions: [
      {
        id: 'idea-mvp-q-evidence',
        objectiveId: `${slug}-obj-1`,
        prompt: 'لم تتحدث بعد مع مستخدمين، لكنك تتوقع أن الطلاب يتأخرون بسبب ضياع الطلبات. كيف تسجل هذه العبارة؟',
        options: ['حقيقة مثبتة لأن المشكلة شائعة', 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', 'قرار منتج نهائي', 'متطلب وظيفي مؤكد'],
        correct: 1,
        explanation: 'التوقع الذي لم يختبر بعد يظل افتراضاً. وسمه يمنع تحويل قصة مقنعة إلى حقيقة أو قاعدة نظام دون دليل.',
        reviewEvidence: passingQuizEvidence,
      },
      {
        id: 'idea-mvp-q-journey',
        objectiveId: `${slug}-obj-2`,
        prompt: 'أي اقتراح يصف MVP مفيداً لتطبيق حجز موعد؟',
        options: ['ثلاث شاشات جميلة بلا حجز مكتمل', 'رحلة حجز واحدة من اختيار وقت إلى تأكيد واضح، مع تأجيل التوصيات', 'كل أفكار لوحة الإدارة والتقارير دفعة واحدة', 'نموذج إدخال بلا نتيجة بعد الإرسال'],
        correct: 1,
        explanation: 'الرحلة ذات قيمة عندما تصل إلى نتيجة مفهومة للمستخدم. عدد الشاشات لا يثبت أن المهمة اكتملت، والتوصية يمكن تأجيلها إذا لم تمنع الحجز الأساسي.',
        reviewEvidence: passingQuizEvidence,
      },
    ],
    criteria: [
      {
        id: 'idea-mvp-r-problem',
        outputId: 'project-context',
        name: 'صياغة المشكلة ودليلها',
        description: 'يسمي المستخدم والموقف والمهمة والعائق ويفصل المشاهدة عن الافتراض.',
        evidencePrompt: 'أشر إلى جملة المشكلة وإلى المصدر أو الوسم الذي يبين ما لم يتحقق بعد.',
        reviewEvidence: passingRubricEvidence,
      },
      {
        id: 'idea-mvp-r-scope',
        outputId: 'project-context',
        name: 'اكتمال رحلة MVP وحدودها',
        description: 'يمكن اتباع الرحلة حتى نتيجتها، وتبرر الوثيقة تأجيل الميزات دون قطع الرحلة.',
        evidencePrompt: 'تتبع الرحلة خطوة بخطوة، ثم اذكر ميزة مؤجلة وسبب بقاء الرحلة مفيدة من دونها.',
        reviewEvidence: passingRubricEvidence,
      },
    ],
    reviewState: 'approved',
    lessonReviewEvidence: passingLessonEvidence,
    quizReviewEvidence: passingQuizEvidence,
    rubricReviewEvidence: passingRubricEvidence,
    quizScoringPolicyApproval: approval,
  };

  return buildTopic(draft);
}
