import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_06: TopicDraft[] = [
{
    topicSlug: 'relational-erd-design',
    objectives: [
        { id: 'erd-objective-keys', text: 'تصميم جداول ومفاتيح وقيود تدعم حقائق المجال المعتمدة.' },
        { id: 'erd-objective-integrity', text: 'مراجعة العلاقات والتكامل المرجعي والتزامن مقابل سيناريوهات المنتج.' },
    ],
    sections: [
        { heading: 'المدخل: نموذج مجال وSRS', body: 'ابدأ من المفاهيم والعلاقات وقيود السلوك. لا تجعل ERD يقرر معنى النشاط أو الملكية بدلاً من المنتج.' },
        { heading: 'المفاتيح والعلاقات', body: 'عيّن مفتاحاً أساسياً لكل سجل ومفتاحاً أجنبياً لعلاقة موثقة. اكتب القيود والتعددية مع سبب؛ تحقق من أن القيد يحمي قاعدة معتمدة ولا يمنع حالة صحيحة.' },
        { heading: 'راجع الاتساق والتزامن', body: 'جرب سيناريوهات متنافسة مثل طلبين في اللحظة نفسها إذا كان التوفر محدوداً، ثم دوّن التزامن والإجراءات المقترحة وما يحتاج قراراً.' },
    ],
    practicalSteps: [
        { instruction: 'حوّل مفاهيم المجال إلى جداول ومفاتيح وقيود فقط بعد مراجعة علاقاتها وقيود SRS.', expectedOutput: '`docs/ERD.md` مع الكيانات والمفاتيح والعلاقات ومسوغ كل قيد.' },
        { instruction: 'راجع سيناريوهين للاستمرارية أو التنافس وسجل المخاطر والتصحيحات والمراجع.', expectedOutput: '`docs/database-review.md` تقرير مراجعة يدعم القرارات بمتطلبات واضحة.' },
    ],
    workedExample: { title: 'رابط طلب بمعدة', context: 'المجال يقرر أن كل طلب يشير إلى طالب ومعدة واحدة.', result: 'يمكن أن يحمل جدول Request مفتاحاً أجنبياً إلى User وإلى Equipment إذا ثبتت العلاقة. قيد “معدة واحدة” لا يترجم تلقائياً إلى فهرس أو unique دون تحليل العملية المطلوبة.' },
    outputs: [
        { id: 'erd-doc', description: '`docs/ERD.md` يوضح الجداول والمفاتيح والعلاقات والقيود.' },
        { id: 'database-review', description: '`docs/database-review.md` يسجل مراجعة التزامن والقيود والقرارات المفتوحة.' },
    ],
    questions: [
        { id: 'erd-q-fk', objectiveId: 'erd-objective-keys', prompt: 'ما دور المفتاح الأجنبي في نموذج علائقي؟', options: ['تمثيل مرجع علاقة وضمان اتساقه وفق القاعدة', 'تخزين CSS', 'ضمان أن كل استعلام سريع تلقائياً', 'استبدال مراجعة قواعد العمل'], correct: 0, explanation: 'المفتاح الأجنبي يفرض سلامة مرجعية لعلاقة محددة؛ لا يضمن الأداء ولا يقرر المعنى بمفرده.' },
        { id: 'erd-q-concurrency', objectiveId: 'erd-objective-integrity', prompt: 'لا يمكن حجز الوحدة نفسها مرتين بالتزامن. ما السؤال الذي تراجعه؟', options: ['كيف يمنع التصميم معاملة متنافسة من تجاوز التوفر؟', 'كيف تغير اسم الرسم؟', 'هل نحذف المفتاح الأساسي؟', 'أي لون للعلاقة؟'], correct: 0, explanation: 'مراجعة التزامن تسأل كيف تتصرف معاملات متنافسة مع مورد محدود وما القيد أو المعاملة التي تحافظ على القاعدة.' },
    ],
    criteria: [
        { id: 'erd-r-integrity', outputId: "erd-doc", name: 'تكامل البيانات', description: 'المفاتيح والعلاقات والقيود تتبع النموذج ومتطلبات السلوك.', evidencePrompt: 'تتبع علاقة مهمة إلى مفهوم/متطلب وأظهر قيدها.' },
        { id: 'erd-r-concurrency', outputId: "database-review", name: 'مراجعة حالات التنافس', description: 'يحلل التقرير سيناريو تنافس بدلاً من افتراض أن التصميم آمن.', evidencePrompt: 'اتبع سيناريوهين متزامنين وبيّن حماية القاعدة أو السؤال المفتوح.' }
    ],
},
{
    topicSlug: 'dbml-dbdiagram-io',
    objectives: [
        { id: 'dbml-objective-translate', text: 'كتابة مخطط DBML يعكس ERD المعتمد مع أنواع الحقول والمراجع.' },
        { id: 'dbml-objective-export', text: 'تصيير ومراجعة المخطط وتصدير SQL مع فهم اختلافه عن DBML.' },
    ],
    sections: [
        { heading: 'المدخل: ERD قبل الصياغة', body: 'DBML وصف للمخطط وليس بديلاً عن قرار المجال أو SQL المنفذ. انقل الجداول والعلاقات بعد اعتماد المصدر.' },
        { heading: 'تعريف الجداول والمراجع', body: 'اكتب `Table` وحقوله وخصائص المفاتيح، ثم أضف `Ref` للعلاقات. حافظ على أسماء وأنواع متسقة مع ERD.' },
        { heading: 'مراجعة التصدير', body: 'اعرض DBML في dbdiagram.io إذا كان الوصول متاحاً، وافحص العلاقات قبل تصدير DDL. رابط المحرر التفاعلي مورد خارجي ويحتاج اتصالاً؛ احتفظ بنسخة محلية.' },
    ],
    practicalSteps: [
        { instruction: 'حوّل ERD المعتمد إلى DBML محلياً مع مفاتيح ومراجع مطابقة للأسماء والقيود.', expectedOutput: '`docs/database.dbml` يعكس الجداول والعلاقات الموثقة.' },
        { instruction: 'عاين المخطط وراجع رابط العمل ثم صدّر SQL وافحص الفرق عن DBML.', expectedOutput: '`docs/database.sql` مع رابط dbdiagram.io إن أنشئ فعلاً، وملاحظة بما يحتاج مراجعة.' },
    ],
    workedExample: { title: 'علاقة الطالب بالطلب', context: 'ERD يحدد جدول الطالب وجدول الطلب، ويشير الطلب إلى صاحبه بمفتاح أجنبي.', result: 'يصف DBML الجدولين ثم `Ref` من حقل صاحب الطلب إلى مفتاح الطالب؛ لا يضيف حقولاً غير موجودة لمجرد تسهيل العرض.' },
    outputs: [
        { id: 'dbml-source', description: '`docs/database.dbml` نموذج DBML محلي للمخطط.' },
        { id: 'sql-export', description: '`docs/database.sql` نسخة DDL مولدة ومراجعة مقابل DBML.' },
    ],
    questions: [
        { id: 'dbml-q-language', objectiveId: 'dbml-objective-translate', prompt: 'ما الوصف الأدق لعلاقة DBML بـSQL؟', options: ['DBML صيغة وصف للمخطط؛ SQL صيغة أوامر/تعريف قاعدة يمكن تصديرها', 'هما أسماء مختلفة للغة واحدة', 'DBML هو خادم قاعدة البيانات', 'SQL ملف صورة'], correct: 0, explanation: 'DBML يصف بنية البيانات بصيغة متخصصة؛ أداة العرض قد تصدر منها DDL بصيغة SQL.' },
        { id: 'dbml-q-export', objectiveId: 'dbml-objective-export', prompt: 'بعد تصدير SQL من المخطط، ما الخطوة التعليمية الصحيحة؟', options: ['اعتبار التصدير سياسة معتمدة', 'مراجعته مقابل ERD والقيود قبل استخدامه', 'حذف DBML لأنه وسيط', 'إضافة بيانات إنتاج حقيقية'], correct: 1, explanation: 'التصدير أداة مساعدة. يجب التأكد من أن DDL يطابق المصدر والتوقعات.' },
    ],
    criteria: [
        { id: 'dbml-r-fidelity', outputId: "dbml-source", name: 'مطابقة ERD', description: 'الجداول والمراجع والحقول متوافقة مع المخطط المعتمد.', evidencePrompt: 'قارن جدولاً وعلاقة بين ERD وDBML.' },
        { id: 'dbml-r-export', outputId: "sql-export", name: 'فحص DDL', description: 'SQL مصدّر ومراجع ويُعرف أنه مشتق من DBML.', evidencePrompt: 'أظهر أمر التصدير وقارن مفتاحاً أو مرجعاً مع المصدر.' }
    ],
},
{
    topicSlug: 'sequence-diagram-modeling',
    objectives: [
        { id: 'sequence-objective-order', text: 'تمثيل رسائل متتابعة زمنياً بين الأطراف والخدمات في حالة استخدام محددة.' },
        { id: 'sequence-objective-branches', text: 'إظهار التحقق والنجاح وفروع الخطأ على أساس SRS.' },
    ],
    sections: [
        { heading: 'المدخل: سيناريو سلوكي', body: 'اختر use case ومعيار قبول. حدد المشاركين الضروريين فقط وابدأ من الحدث الأول.' },
        { heading: 'الترتيب والرسالة', body: 'رتب lifelines من اليسار لليمين والرسائل من أعلى لأسفل. سمّ الطلب والرد والتحقق؛ لا تخلط بين ترتيب الرسائل وعلاقات الكيانات.' },
        { heading: 'بدائل الخطأ', body: 'استخدم مقطع alt أو فرعاً مشابهاً عندما تتغير الرسائل في النجاح والخطأ. المصدر يحدد أي استجابة أو retry موجودة؛ لا تضفها لتجميل الرسم.' },
    ],
    practicalSteps: [
        { instruction: 'اكتب تسلسل سيناريو قبول واحد من actor إلى النظام والمخزن أو الخدمة الضرورية فقط.', expectedOutput: '`docs/diagrams/sequence-diagrams.mmd` يوضح الرسائل الزمنية الأساسية.' },
        { instruction: 'أضف فرعاً للرفض أو الخطأ الموثق واشرح نقاط التحقق والمصدر.', expectedOutput: '`docs/diagrams/sequence-diagrams.md` يشرح الرسم ومعايير القبول المرتبطة.' },
    ],
    workedExample: { title: 'إرسال طلب استعارة', context: 'سيناريو PRD يطلب من النظام التحقق من أهلية المستخدم والتوفر قبل الطلب.', result: 'يظهر طلب الطالب ثم تحقق النظام ورداً بالقبول أو الرفض. لا يضيف الرسم خدمة بريد أو دفع إذا لم يشملها النطاق.' },
    outputs: [
        { id: 'sequence-code', description: '`docs/diagrams/sequence-diagrams.mmd` تسلسل تفاعل النجاح والفشل المعتمد.' },
        { id: 'sequence-doc', description: '`docs/diagrams/sequence-diagrams.md` وصف المشاركين والرسائل والمصادر.' },
    ],
    questions: [
        { id: 'sequence-q-order', objectiveId: 'sequence-objective-order', prompt: 'في مخطط التسلسل، ماذا يعبر المحور العمودي عادة؟', options: ['مرور الزمن وترتيب الرسائل', 'ترتيب الجداول أبجدياً', 'أولوية المستخدم', 'حجم قاعدة البيانات'], correct: 0, explanation: 'يقرأ التسلسل من أعلى لأسفل لتتبع التفاعلات عبر المشاركين.' },
        { id: 'sequence-q-alt', objectiveId: 'sequence-objective-branches', prompt: 'لماذا تستخدم فرعاً بديلاً للرفض؟', options: ['لإظهار استجابة مختلفة لها شرط موثق', 'لإضافة قرار جديد من المصمم', 'لإخفاء متطلب غير مكتمل', 'لترتيب أسماء الفئات'], correct: 0, explanation: 'البديل يبين تغير الرسائل باختلاف شرط. يجب أن يأتي الشرط والسلوك من المتطلبات.' },
    ],
    criteria: [
        { id: 'sequence-r-order', outputId: "sequence-code", name: 'ترتيب التفاعل', description: 'الرسائل والمشاركون واضحون ويتبعون حالة استخدام.', evidencePrompt: 'تتبع رسالة طلب وردها ثم نقطة تحقق.' },
        { id: 'sequence-r-branches', outputId: "sequence-doc", name: 'حالات بديلة موثقة', description: 'فرع الخطأ يعكس SRS ولا يخترع تعافياً.', evidencePrompt: 'أشر إلى الشرط والرد في معيار القبول.' }
    ],
},
{
    topicSlug: 'class-diagram-design',
    objectives: [
        { id: 'class-objective-structure', text: 'اشتقاق أصناف وخصائص ومسؤوليات من بنية المجال والسلوك.' },
        { id: 'class-objective-consistency', text: 'مطابقة العلاقات مع ERD والعمليات مع مخطط التسلسل.' },
    ],
    sections: [
        { heading: 'المدخل: ERD وSequence', body: 'استخدم ERD لمراجعة البيانات والعلاقات وSequence لاستخراج الرسائل والعمليات؛ class diagram يجمع البنية والسلوك بمستوى برمجي.' },
        { heading: 'المسؤولية قبل الصنف', body: 'لكل صنف اسم ومسؤولية مبررة وخصائص أو عمليات يحتاجها النطاق. تجنب صنف لكل شاشة أو حشر كل المنطق في كيان واحد.' },
        { heading: 'افحص الاتساق', body: 'راجع التعددية والعلاقات مع ERD، والعمليات المستدعاة مع sequence. لا تنقل كل حقل قاعدة بيانات إلى API أو كل خطوة واجهة إلى method تلقائياً.' },
    ],
    practicalSteps: [
        { instruction: 'استخرج أصنافاً ومسؤوليات من نموذج المجال وERD، ثم ضع السمات والعمليات التي يدعمها السيناريو.', expectedOutput: '`docs/diagrams/class-diagram.mmd` مخطط يبين الصنف والسمات والعمليات والعلاقات.' },
        { instruction: 'راجع كل علاقة مقابل ERD وكل عملية مقابل مخطط Sequence، ووثق أي قرار لم يحسم.', expectedOutput: '`docs/diagrams/class-diagram.md` يشرح الاتساق والمفاضلات.' },
    ],
    workedExample: { title: 'مسؤولية مراجعة الطلب', context: 'الـSequence يبين المسؤول يقرر طلباً والـERD يبين الطلب مرتبطاً بمستخدم ومعدة.', result: 'قد تظهر عملية مراجعة في مكوّن يملك هذه المسؤولية، مع علاقة الطلب بمفاهيم المصدر. الاسم والمكان يظلان اختياراً معمارياً يبرره الطالب، لا حقيقة من ERD.' },
    outputs: [
        { id: 'class-code', description: '`docs/diagrams/class-diagram.mmd` صفوف وعلاقات متسقة مع المصادر.' },
        { id: 'class-doc', description: '`docs/diagrams/class-diagram.md` يشرح المسؤوليات والتتبع.' },
    ],
    questions: [
        { id: 'class-q-source', objectiveId: 'class-objective-consistency', prompt: 'ماذا تستخدم للتحقق من أن علاقة الصنف تعكس علاقة البيانات؟', options: ['ERD', 'لقطة الشاشة وحدها', 'رسالة commit', 'حجم الخط'], correct: 0, explanation: 'ERD هو المرجع للعلاقات البياناتية؛ sequence يساعد على مطابقة العمليات والتفاعلات.' },
        { id: 'class-q-responsibility', objectiveId: 'class-objective-structure', prompt: 'ظهرت عملية في مخطط التسلسل. كيف تقرر الصنف المناسب لها؟', options: ['ضعها في أول صنف يظهر', 'اختر مسؤولية متماسكة وفسرها مقابل التفاعل والنموذج', 'حول كل شاشة إلى صنف', 'احذف العملية من الرسم'], correct: 1, explanation: 'توزيع المسؤوليات قرار تصميم يحتاج مبرراً من السلوك والنموذج، وليس نسخاً آلياً من الشاشة.' },
    ],
    criteria: [
        { id: 'class-r-structure', outputId: "class-code", name: 'بنية ومسؤوليات', description: 'الأصناف ذات مسؤوليات واضحة وعمليات مرتبطة بالسلوك.', evidencePrompt: 'اختر عملية واشرح لماذا وضعت في هذا الصنف.' },
        { id: 'class-r-alignment', outputId: "class-doc", name: 'اتساق النماذج', description: 'العلاقات والعمليات لا تتعارض مع ERD وSequence.', evidencePrompt: 'قارن علاقة واحدة وعملية واحدة مع المصدر.' }
    ],
}
];

export const LEARNING_CONTENT_GROUP_A_06: Record<string, TopicLearningContent> =
  buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_06);
