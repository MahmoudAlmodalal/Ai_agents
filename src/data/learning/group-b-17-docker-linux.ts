import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';
import { recordIndependentTopicReview } from '@/src/data/learning/group-b-16-19-independent-review.ts';

export const QUESTION_IDS_GROUP_B_17: Record<string, [string, string]> = {
  'docker-container-workflow': ['container-needed-decision', 'runtime-secret-injection'],
  'linux-server-operations': ['managed-host-boundary', 'least-privilege-file-access'],
};

export const VIDEO_CANDIDATES_GROUP_B_17: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'docker-container-workflow': {
    id: 'docker-container-workflow-video-candidate',
    title: 'Accelerating Development with Docker',
    url: 'https://www.docker.com/resources/accelerating-development-with-docker-on-demand-training/',
    purpose: 'مرشح مسجل لإنشاء Dockerfile/Compose وبناء صورة وبيئة تطوير وتشغيل اختبارات. قد يتطلب الاشتراك للاستفادة الكاملة؛ إذا كان المضيف يبني مباشرة فلا حاجة للحاوية.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.docker.com/resources/accelerating-development-with-docker-on-demand-training/', evidence: 'صفحة Docker تسميه recorded session وتذكر إنشاء Dockerfile/Compose وبناء صور وتشغيل اختبارات وتصحيح. الصفحة تنبه إلى أن الاشتراك مطلوب للاستفادة الكاملة. صلته عملية إذا اختيرت الحاوية؛ لم يُختبر تشغيله أو captions أو الوصولية ولم يوافق المالك.' }],
  },
  'linux-server-operations': {
    id: 'linux-server-operations-video-candidate',
    title: 'How to Modify File Permissions in Bash (Part 12 of 20)',
    url: 'https://learn.microsoft.com/en-us/shows/bash-for-beginners/how-to-modify-file-permissions-in-bash-12-of-20-bash-for-beginners',
    purpose: 'مرشح لشرح قراءة صلاحيات الملفات وchown/chgrp/chmod. يقتصر على مختبر أو مضيف مخوّل، ولا يثبت صلاحية الطالب لتغيير خادم مُدار.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/bash-for-beginners/how-to-modify-file-permissions-in-bash-12-of-20-bash-for-beginners', evidence: 'صفحة Microsoft Learn تذكر فصول عرض الصلاحيات (00:00) وchown (02:25) وchgrp (04:35) وchmod (06:00). هذا يطابق فحص الصلاحيات مع ضرورة التقييد بمضيف مخوّل. لم يُختبر التشغيل/captions/accessibility ولم توجد موافقة مالك.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_17: Record<string, TopicDraft> = {
  'docker-container-workflow': {
    slug: 'docker-container-workflow',
    objectives: ['قرر هل يتطلب مسار النشر صورة حاوية أم أن البناء المُدار يفي بالحاجة.', 'عند اختيار Docker اربط Dockerfile بسياق البناء وإصدار runtime وأمر التشغيل مع حماية الأسرار.'],
    sections: [
      { id: 'inputs', heading: 'حدد من يبني الصورة', body: 'المدخل مستودع المشروع وإصدار Node أو Python ومزود النشر ومخرجا الموضوع 49 qa-matrix وqa-gaps لتحديد الرحلة والمخاطر التي يجب أن تبقى مرئية. بعض المنصات تبني من Git مباشرة؛ لا تضف Docker لمجرد أنه شائع. صورة الحاوية artifact قابل للنقل، والحاوية عملية تشغيل منها؛ Compose خيار تطوير لخدمات متعددة وليس شرطاً.' },
      { id: 'example', heading: 'مثال محلول: خادم يحتاج صورة', body: 'اختر Dockerfile يطابق lockfile ونسخة runtime، وانسخ ملفات التشغيل فقط، واجعل مجلد الأسرار خارج build context عبر .dockerignore. شغل العملية بمستخدم غير root، ومرر الإعداد عبر آلية أسرار runtime لا ARG أو طبقة صورة.' },
      { id: 'exercise', heading: 'مهمة وبرومبت ومخرج', body: 'برومبت: «افحص المنصة وإعداد المشروع؛ قارن البناء المُدار وصورة OCI. إن اخترت Docker فسجل السياق والنسخ والأمر والمستخدم ومصدر الأسرار، ولا تبنِ أو تنشر صورة بإعداد إنتاجي». سلّم قرار التشغيل إلى فحص Linux أو سجّل سبب تجاوز إدارته.' },
    ],
    practicalSteps: [
      { id: 'runtime-decision', instruction: 'قارن متطلبات المنصة ببناء Git أو OCI image واكتب سبب الاختيار.', expectedOutput: 'docs/DOCKER_DECISION.md يذكر المنصة ومصدر معلوماتها وحالة التحقق أو سبب تأجيل القرار.' },
      { id: 'image-config', instruction: 'إذا كانت الصورة مطلوبة، اكتب Dockerfile يطابق المشروع و.dockerignore يستثني .env وnode_modules أو venv.', expectedOutput: 'Dockerfile اختياري قابل للمراجعة، ولا يحتوي قيمة سرية أو أمر تشغيل غير مطابق.' },
      { id: 'run-evidence', instruction: 'حدد مستخدم runtime والمنفذ وطريقة تمرير الإعداد؛ اختبر بناءً محلياً فقط إذا كان ذلك آمناً ومتاحاً.', expectedOutput: 'جدول build/run/user/port/secrets مع أمر ونتيجة فعلية أو Not Run وسببها.' },
    ],
    workedExample: { id: 'managed-hosting-choice', title: 'قرار عدم إضافة Docker', context: 'منصة الواجهة تبني مشروع Next.js من المستودع بإعدادها المدعوم.', result: 'Decision=managed build. لا يوجد Dockerfile أو Compose إضافي؛ سجل رابط دليل المنصة وفحص build الحالي. إذا تطلب خادم Python صورة OCI لاحقاً أعد القرار وفق إعداد الخادم.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'المنصة تدعم بناء Next.js مباشرة من Git ولا تحتاج image. ما المخرج المقبول؟', options: ['توثيق البناء المُدار وتجاوز Docker مع سبب.', 'إضافة Compose وRedis دائماً.', 'تضمين .env في الصورة لتسهيل التشغيل.'], correct: 0, explanation: 'الحاوية قرار تشغيل؛ لا تضفها دون حاجة يثبتها المسار.' },
      { objective: 2, prompt: 'أين تمرر قاعدة البيانات السرية إلى حاوية وقت التشغيل؟', options: ['قيمة ثابتة في Dockerfile.', 'وسيط ARG يُحفظ في سجل البناء.', 'مدير أسرار البيئة أو آلية runtime الموثقة.'], correct: 2, explanation: 'الأسرار لا توضع في طبقات الصورة أو سجل البناء.' },
    ],
    outputs: [{ id: 'container-decision', description: 'قرار Docker أو التجاوز مع مصدر المنصة والحاجة.' }, { id: 'container-runtime-evidence', description: 'Dockerfile اختياري وسجل build/run/user/port/secrets بنتيجة صادقة.' }],
    criteria: [
      { id: 'container-need', outputId: 'container-decision', name: 'مبرر اختيار الأداة', description: 'القرار مبني على متطلبات تشغيل فعلية لا على شيوع Docker.', evidencePrompt: 'أشر إلى خاصية المنصة أو حاجة التشغيل التي قادتك للقرار.' },
      { id: 'container-safety', outputId: 'container-runtime-evidence', name: 'سلامة الصورة', description: 'السياق يستثني الأسرار ويحدد هوية التشغيل ومصدر الإعداد.', evidencePrompt: 'اعرض سطر الإعداد الذي يثبت non-root وما استثني من السياق.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين image وcontainer والبناء المُدار، وربط المثال بـ Next.js أو بديل Python. الإعداد المقترح لا يحمل أسراراً، واختبار البناء غير المنفذ لا يوصف بأنه ناجح.',
  },
  'linux-server-operations': {
    slug: 'linux-server-operations',
    objectives: ['حدد ما إذا كانت إدارة Linux اليدوية ضمن مسؤولية الطالب أو أن المنصة تدير النظام.', 'عند إدارة الخادم، فسّر المستخدم والملكية وrwx واختر أقل صلاحية لازمة قبل أي تغيير.'],
    sections: [
      { id: 'inputs', heading: 'ابدأ بحدود مسؤولية الاستضافة', body: 'المدخل منصة النشر أو إعداد VPS وعملية Django/FastAPI ومخرجا الموضوع 50 container-decision وcontainer-runtime-evidence، ومجلدات الكتابة المطلوبة. إذا اختير بناء مُدار فسجل أن إعدادات Linux غير متاحة بدلاً من افتراضها. في بيئة تملكها، افحص id وstat وpwd وps كقراءة أولاً؛ لا تستخدم sudo أو chmod -R على production.' },
      { id: 'example', heading: 'مثال محلول: مجلد رفع محدود', body: 'إذا احتاجت الخدمة مجلد uploads، عرّف مستخدم خدمة ومجموعة ومجلداً واحداً تملكه العملية. اشرح rwx للمالك والمجموعة والآخرين؛ 755 للمجلد لا يمنح الكتابة لكل أحد. إن لم تكن المنصة تسمح بهذه الإدارة، اتبع وثائقها وسجل التجاوز.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «استخرج حدود مزود الاستضافة وهوية العملية ومجلداتها. اقترح أضيق صلاحية مع تحقق قراءة فقط؛ لا تشغّل أوامر تغيير ولا تتصل بالخادم. اذكر مالك القرار وخطة التراجع المطلوبة قبل تعديل مأذون». سلّم ملاحظات التشغيل إلى runbook الموضوع 55.' },
    ],
    practicalSteps: [
      { id: 'host-ownership', instruction: 'حدد من يدير Linux من وصف الخطة أو إعداد المشروع واحفظ مرجعاً موثوقاً.', expectedOutput: 'docs/LINUX_RUNTIME_NOTES.md يحدد self-managed أو managed ودرجة التحقق.' },
      { id: 'permissions-map', instruction: 'إذا كانت الإدارة يدوية، ارسم process user → files read/write → owner/group/mode من مخرجات آمنة.', expectedOutput: 'جدول مجلد/هوية/حاجة/صلاحية؛ وإذا كانت الإدارة مُدارة فسجل ما لا تملكه بدلاً من اختلاق صلاحيات.' },
      { id: 'change-review', instruction: 'اكتب تغييراً مقترحاً واحداً وسبباً وطريقة تحقق وخطة رجوع؛ لا تنفذه على الإنتاج.', expectedOutput: 'تغيير مراجع بأقل وصول وموافقة مطلوبة، أو Not Applicable مع مرجع المنصة.' },
    ],
    workedExample: { id: 'managed-linux', title: 'تجاوز إدارة النظام', context: 'المتجر السحابي يوفر runtime مُداراً ولا يكشف نظام ملفات المضيف.', result: 'Owner=provider. الطالب يوثق متغيرات البيئة ومسار السجلات المكشوف فقط؛ لا يطلب chown/chmod أو SSH. أي صلاحية/سجل غير ظاهر يبقى سؤال دعم للمزود.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'الخدمة تعمل على منصة مُدارة لا تسمح بـ SSH. ما الخطوة السليمة؟', options: ['تسجيل مسؤولية المزود واتباع واجهته دون افتراض وصول Linux.', 'إضافة chmod في build حتى تتغير ملفات المضيف.', 'طلب root من أي مستخدم.'], correct: 0, explanation: 'تتبع الإجراء حدود الاستضافة؛ الطالب لا يدير المضيف المُدار.' },
      { objective: 2, prompt: 'ملف إعداد يحتاجه مستخدم خدمة واحد فقط. أي سياسة تبدأ بها؟', options: ['777 على كل مجلدات المشروع.', 'ملكية مناسبة وصلاحية قراءة أضيق لذلك المستخدم.', 'تشغيل الخدمة دائماً بصفة root.'], correct: 1, explanation: 'الحد الأدنى من الصلاحيات يقلل أثر الخطأ أو الاختراق.' },
    ],
    outputs: [{ id: 'linux-ownership', description: 'خريطة مسؤولية المضيف والمستخدم والمجلدات أو سجل التجاوز.' }, { id: 'linux-change-plan', description: 'اقتراح صلاحيات محدود بخطوة تحقق ورجوع دون تنفيذ إنتاجي.' }],
    criteria: [
      { id: 'host-boundary', outputId: 'linux-ownership', name: 'مسؤولية واضحة', description: 'يوضح المالك الفعلي للنظام والمعلومات التي يمكن للمتعلم رؤيتها.', evidencePrompt: 'أرفق اسم مصدر الخطة ودليلاً على ما يديره مزود الاستضافة.' },
      { id: 'least-privilege', outputId: 'linux-change-plan', name: 'أقل وصول', description: 'يربط الصلاحية بمستخدم ومجلد وحاجة وخطة تحقق/رجوع.', evidencePrompt: 'أشر إلى المجلد والحاجة والهوية، واذكر الأمر الذي لم تنفذه.' },
    ],
    reviewNote: 'راجع المؤلف التفريق بين Linux مُدار ويدوي، وميّز فحص القراءة من تغيير الملكية. المثال لا يوجه إلى تنفيذ أمر إداري قبل الإذن وخطة الرجوع.',
  },
};

const INDEPENDENT_REVIEW_NOTES_GROUP_B_17: Record<string, string> = {
  'docker-container-workflow': 'قرأت الفرق بين الصورة والحاوية والبناء المُدار، ومتى يلزم Docker، ثم راجعت توافق أمثلة Python/Next.js وسياق البناء وحماية الأسرار وهوية التشغيل. container-decision وcontainer-runtime-evidence يقدمان مدخلاً إلى فحص حدود مسؤولية Linux. البناء والتشغيل لم ينفذا على مشروع متعلم.',
  'linux-server-operations': 'راجعت التمييز بين مضيف مُدار وخادم يديره المتعلم، ودلالات هوية العملية وrwx وأقل صلاحية، مع حصر أوامر التغيير في خطة لا في تنفيذ إنتاجي. linux-ownership وlinux-change-plan ينتقلان إلى runbook مع خيار توثيق التجاوز عندما لا يملك المتعلم صلاحية المضيف.',
};

recordIndependentTopicReview(TOPIC_DRAFTS_GROUP_B_17, INDEPENDENT_REVIEW_NOTES_GROUP_B_17,
  'راجعت السؤالين والخيارات ومفتاح كل إجابة والتعليل مقابل الهدف والمحتوى؛ لا يوجد مفتاح ملتبس أو تشجيع لتجاوز حدود مسؤولية المضيف أو كشف الأسرار. سياسة النقاط المقبولة في issue #70 تمنح نقطة للصحيح وصفر للخطأ أو غير المجاب، مع محاولات غير محدودة وتفسير بعد الإرسال وحفظ كل المحاولات بإصدارات السؤال والسياسة. هذا لا يثبت إتقان المتعلم.',
  'راجعت المخرجين ومطابقة كل معيار لمخرجه وسؤال الدليل. سياسة التقييم العملي المقبولة في issue #70 ذاتية بثلاثة مستويات وبلا حد إتقان أو تحقق مستقل للصحة.',
);

export const LEARNING_CONTENT_GROUP_B_17: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_17, QUESTION_IDS_GROUP_B_17, VIDEO_CANDIDATES_GROUP_B_17);

// Review evidence is part of the saved content snapshot; refresh older offline copies.
for (const content of Object.values(LEARNING_CONTENT_GROUP_B_17)) content.contentVersion = 2;
