import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_04: TopicDraft[] = [
{
    topicSlug: 'mermaid-syntax',
    objectives: [
        { id: 'mermaid-objective-syntax', text: 'كتابة Mermaid صحيحة واختيار نوع الرسم واتجاهه بحسب السؤال.' },
        { id: 'mermaid-objective-readable', text: 'عرض الرسم مع عنوان وشرح واتجاه نص مناسبين في ملفات المشروع.' },
    ],
    sections: [
        { heading: 'المدخل: سؤال الرسم', body: 'حدد هل تريد إظهار خطوات أو علاقات مفاهيمية أو بنية؛ اختر نوع Mermaid بعد تحديد السؤال، لا قبله.' },
        { heading: 'صيغة قابلة للتصيير', body: 'ابدأ بنوع المخطط مثل `flowchart TD`، وامنح العقد معرفات ثابتة ونصاً مفهوماً. افحص الأقواس والأسهم، ثم استخدم معاينة المحرك للكشف عن أخطاء الصياغة.' },
        { heading: 'عرض عربي وتقني', body: 'حافظ على كتلة الكود LTR والشرح العربي RTL، وأضف وصفاً نصياً يبين المقصود. التصيير الناجح لا يثبت أن العلاقات أو القرارات صحيحة.' },
    ],
    practicalSteps: [
        { instruction: 'اختر مشهداً صغيراً من رحلة MVP، وحدد نوع الرسم واتجاهه، ثم اكتب Mermaid وعاينه.', expectedOutput: 'كتلة Mermaid صالحة للتصيير ومذكور نوع المخطط والهدف منها.' },
        { instruction: 'احفظ المثال مع شرح عربي ووصف للعلاقات في ملف الوثائق، ثم أصلح أي خطأ يعرضه المصيّر.', expectedOutput: '`docs/diagrams/README.md` يشرح أكواد Mermaid التي ستستخدمها Topics اللاحقة.' },
    ],
    workedExample: { title: 'تمثيل قرار توفر موعد', context: 'المشروع يحتوي خطوة اختيار وقت ثم قراراً يعتمد على التوفر.', result: 'يظهر الرسم عقدة قرار بتفرع “متاح / غير متاح” يلتقي كل منها بنتيجة مفسرة. لا يضيف قاعدة قبول حجز لم تعتمد في PRD.' },
    outputs: [
        { id: 'mermaid-guide', description: '`docs/diagrams/README.md` مع أمثلة وتعليمات التصيير.' },
        { id: 'mermaid-samples', description: 'أكواد Mermaid صالحة للتصيير ومعها شرح نصي.' },
    ],
    questions: [
        { id: 'mermaid-q-type', objectiveId: 'mermaid-objective-syntax', prompt: 'تريد إظهار خطوات وقرار “متاح أو غير متاح”. ما نقطة البداية الأنسب؟', options: ['`flowchart TD` مع عقدة قرار ومسارين مسميين', '`classDiagram` بلا علاقات', '`pie` لأن هناك نتيجتين', 'كتلة HTML غير موثقة'], correct: 0, explanation: 'Flowchart مناسب لتمثيل الترتيب والتفرع. اختيار النوع يتبع سؤال الرسم.' },
        { id: 'mermaid-q-meaning', objectiveId: 'mermaid-objective-readable', prompt: 'بعد أن نجح تصيير `flowchart TD`، ما الذي يجب مراجعته مقابل PRD قبل قبول معنى الرسم؟', options: ['أن كل قرار ومسار يطابق متطلباً أو يبقى سؤالاً مفتوحاً', 'أن المصيّر عرض العقد والأسهم', 'أن الملف يبدأ بعلامتي `@startuml` و`@enduml`', 'أن أسماء العقد تستخدم لوناً موحداً'], correct: 0, explanation: 'نجاح المعاينة يؤكد إمكان التصيير فقط. يجب مقارنة القرارات والمسارات بمصدر المتطلبات؛ وأي سلوك غير مدعوم يظل سؤالاً مفتوحاً.' },
    ],
    criteria: [
        { id: 'mermaid-r-valid', outputId: "mermaid-samples", name: 'صياغة ومعنى الرسم', description: 'الكود يصير ويتبع نوع الرسم السؤال الذي يشرحه.', evidencePrompt: 'افتح المعاينة وحدد عقدة أو علاقة تشرح السؤال المقصود.' },
        { id: 'mermaid-r-doc', outputId: "mermaid-guide", name: 'شرح واتجاه واضحان', description: 'المثال موثق مع شرح ووصف نصي، ويحافظ على وضوح العربية والكود.', evidencePrompt: 'أشر إلى العنوان والوصف وكتلة LTR والشرح RTL.' }
    ],
},
{
    topicSlug: 'user-flow-modeling',
    objectives: [
        { id: 'userflow-objective-journey', text: 'نمذجة رحلة مستخدم من بدايتها إلى نتيجتها مع نقاط قرار ومساري النجاح والرفض.' },
        { id: 'userflow-objective-source', text: 'ربط كل خطوة وسلوك بدور ومصدر PRD دون توسيع النطاق.' },
    ],
    sections: [
        { heading: 'المدخل: هدف ودور من PRD', body: 'اختر هدفاً واحداً ودوراً واضحاً. لا تخلط رحلة المسؤول برحلة الطالب إلا حين يتسلم أحدهما نتيجة من الآخر.' },
        { heading: 'الخطوات والتفرعات', body: 'اكتب الفعل الذي يقوم به المستخدم والقرار الذي يتخذه النظام، وسمّ كل فرع. أظهر الرفض أو الخطأ عندما تحدده المتطلبات ثم وضح ما يستطيع المستخدم فعله بعدها.' },
        { heading: 'مراجعة التغطية', body: 'احفظ Mermaid في `docs/user-flow.md` وقارن كل خطوة بمعرف أو قاعدة في PRD. الرسم لا يبرر إضافة شاشة أو سياسة جديدة.' },
    ],
    practicalSteps: [
        { instruction: 'اختر سيناريو واحداً في النطاق وارسمه من بداية المستخدم إلى نتيجة مرئية، مع مسار فشل موثق.', expectedOutput: '`docs/user-flow.md` يحتوي flowchart يوضح الأدوار والقرارات والنتائج.' },
        { instruction: 'راجع كل عقدة وسهم مقابل PRD وسجّل أي سلوك لا يملك مصدراً كسؤال مفتوح.', expectedOutput: 'مخطط Mermaid لمسارات MVP يمكن تتبعه إلى المتطلبات المعتمدة.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: طلب يحتاج مراجعة', context: 'تبدأ رحلة BorrowHub من اختيار معدة وتنتهي بإظهار رد المسؤول للطالب.', result: 'مسار الطلب المقبول يمر بمراجعة المسؤول ثم إشعار الطالب؛ ومسار الرفض يعرض الرد. لا يقرر الرسم متى ينتهي الطلب ما لم يحسم PRD ذلك.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'user-flow-doc', description: '`docs/user-flow.md` يوثق المستخدم والخطوات والقرارات ومصادرها.' },
        { id: 'user-flow-diagram', description: 'مخطط `flowchart TD` بمسارات MVP المسمّاة للنجاح والرفض.' },
    ],
    questions: [
        { id: 'userflow-q-actor', objectiveId: 'userflow-objective-journey', prompt: 'في رحلة طلب يوافق عليه مسؤول، من يسجل أن المعدات سُلّمت فعلياً إذا كان PRD يسند ذلك للمسؤول؟', options: ['الطالب يغير الحالة بنفسه دائماً', 'المسؤول يسجل التسليم؛ وتظهر النتيجة للطالب', 'تختفي خطوة التسليم', 'يرسل النظام قراراً غير موجود'], correct: 1, explanation: 'المسار يحافظ على صاحب الإجراء الموثق ويفصل الفعل الواقعي عن عرض حالته.' },
        { id: 'userflow-q-source', objectiveId: 'userflow-objective-source', prompt: 'وجدت في الرسم خطوة “إلغاء تلقائي بعد يومين” لكنها غير موجودة في PRD. ماذا تفعل؟', options: ['تبقيها لأنها معقولة', 'تحذفها أو تسجلها سؤالاً حتى يعتمدها صاحب المنتج', 'تجعلها متطلباً بحكم الرسم', 'تخفيها عن المراجعين'], correct: 1, explanation: 'الرسم يوثق قرارات المنتج ولا ينشئها. غير المدعوم يجب أن يظهر كسؤال أو يخرج من النموذج.' },
    ],
    criteria: [
        { id: 'userflow-r-coverage', outputId: "user-flow-diagram", name: 'اكتمال مسارات الرحلة', description: 'الخطوات تصل إلى نتيجة ويظهر تفرع الرفض أو الخطأ الموثق.', evidencePrompt: 'تتبع المسار من البداية للنهاية ثم اتبع فرعاً بديلاً.' },
        { id: 'userflow-r-source', outputId: "user-flow-doc", name: 'تتبع مصدر الخطوات', description: 'أفعال الأدوار والقرارات مستندة إلى PRD أو موضحة كسؤال مفتوح.', evidencePrompt: 'اختر عقدتين واربط كل واحدة بمتطلب المصدر.' }
    ],
},
{
    topicSlug: 'conceptual-domain-model',
    objectives: [
        { id: 'domain-objective-concepts', text: 'استخراج مفاهيم العمل وحدودها وعلاقاتها من متطلبات المشروع.' },
        { id: 'domain-objective-language', text: 'شرح النموذج بلغة المجال دون خلط المفهوم بجدول قاعدة بيانات أو كلاس.' },
    ],
    sections: [
        { heading: 'المدخل: أسماء ومعانٍ من مجال العمل', body: 'استخرج الأسماء التي تحمل معنى للمالك والمستخدم. اسأل ما الذي يميّز مفهوماً عن حدث أو صفة؛ لا تجعل كل كلمة في PRD كياناً.' },
        { heading: 'العلاقة وحدود المعنى', body: 'سمّ العلاقة بجملة يوافق عليها صاحب المجال، وبيّن الحد أو التعددية فقط إذا ورد في مصدر معتمد. دوّن التعريف والمصطلحات الملتبسة.' },
        { heading: 'ابق في المستوى المفاهيمي', body: 'لا تختر أنواع الأعمدة أو المفاتيح أو ORM هنا؛ هذه قرارات تصميم بيانات لاحقة. احفظ الرسم والشرح معاً كي يستطيع غير المبرمج مراجعته.' },
    ],
    practicalSteps: [
        { instruction: 'استخرج مفاهيم مشروعك من PRD واكتب تعريفاً لكل مفهوم وعلاقة بلغة صاحب المشروع.', expectedOutput: '`docs/diagrams/domain-model.md` يشرح كل مفهوم وعلاقته ومصدره.' },
        { instruction: 'ارسم المفاهيم في ملف Mermaid منفصل وراجع الحدود والتعددية مع شخص يعرف المجال.', expectedOutput: '`docs/diagrams/domain-model.mmd` نموذج مفاهيمي لا يحتوي تفاصيل تنفيذ قاعدة البيانات.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: مفاهيم العمل', context: 'قصة الاستعارة تميز الطالب والمسؤول والمعدة وطلب الاستعارة.', result: 'يرتبط الطلب بطالب ومعدة، ويراجعه مسؤول. قد تكون “حالة الطلب” صفة للطلب لا كياناً مستقلاً؛ يحتاج هذا التفريق إلى مراجعة مالك المجال قبل تحويله إلى جداول.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'domain-model-doc', description: '`docs/diagrams/domain-model.md` بتعريفات بلغة مجال العمل ومصادرها.' },
        { id: 'domain-model-diagram', description: '`docs/diagrams/domain-model.mmd` مع رسم مفاهيمي قابل للمراجعة.' },
    ],
    questions: [
        { id: 'domain-q-level', objectiveId: 'domain-objective-language', prompt: 'ما السؤال الأنسب في نموذج مفاهيمي قبل تصميم ERD؟', options: ['ما معنى “طلب” ومن يرتبط به في العمل؟', 'هل العمود `id` يستخدم UUID؟', 'أي فهرس نضيف؟', 'أي ORM يولد الجدول؟'], correct: 0, explanation: 'النموذج المفاهيمي يثبت المعنى والعلاقات في لغة المجال؛ المفاتيح والفهارس تأتي في تصميم البيانات.' },
        { id: 'domain-q-relationship', objectiveId: 'domain-objective-concepts', prompt: 'PRD لا يحدد إن كان الطلب يسمح بأكثر من معدة. كيف تسجل العلاقة؟', options: ['ترسم many-to-many من الذاكرة', 'تسجل التعددية كقرار مفتوح بدلاً من حسمها', 'تضيف قيداً في SQL', 'تحذف كيان الطلب'], correct: 1, explanation: 'التعددية قرار مجال مؤثر؛ إذا لم يحسمه المصدر يجب أن يبقى سؤالاً.' },
    ],
    criteria: [
        { id: 'domain-r-definitions', outputId: "domain-model-doc", name: 'تعريفات المجال', description: 'كل مفهوم مهم له تعريف وعلاقة مفهومة لغير المبرمج.', evidencePrompt: 'اختر مصطلحاً واطلب من قارئ المجال إعادة صياغة معناه.' },
        { id: 'domain-r-boundary', outputId: "domain-model-diagram", name: 'حدود المستوى', description: 'لا تتسرب أنواع الأعمدة أو تفاصيل قاعدة البيانات إلى الرسم المفاهيمي.', evidencePrompt: 'راجع العقد والعلاقات وحدد أي قرار تقني يجب تأجيله إلى ERD.' }
    ],
}
];

export const LEARNING_CONTENT_GROUP_A_04: Record<string, TopicLearningContent> =
  buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_04);
