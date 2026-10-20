import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_08: TopicDraft[] = [
{
    topicSlug: 'stitch-reference-screen',
    objectives: [
        { id: 'stitchref-objective-prompt', text: 'صياغة برومبت لشاشة مرجعية واحدة تمثل المهمة والهوية والاتجاه.' },
        { id: 'stitchref-objective-evidence', text: 'توثيق ما اعتمد وما بقي غير معروف دون اختلاق مواصفات التصميم.' },
    ],
    sections: [
        { heading: 'المدخل: شاشة ممثلة لا كل التطبيق', body: 'اختر شاشة أساسية وأرفق دورها وبياناتها وحالاتها من المتطلبات. الشاشة المرجعية تدعم اقتراح لغة بصرية أولية؛ لا تصبح قراراً معتمداً قبل مراجعته.' },
        { heading: 'برومبت يحافظ على الدليل', body: 'اذكر المهمة والمستخدم والاتجاه RTL والمعلومات والمكونات والنبرة. لا تطلب من الأداة اختراع حقيقة عن منتج أو لون من مرجع لم تقدمه.' },
        { heading: 'توثيق الحالة', body: 'احفظ البرومبت ورابط/معرف الشاشة إذا أنشئت، وصنّفها مقترحاً أو معتمدة بعد قرار حقيقي. لا تستبدل نموذج الواجهة بمصدر المتطلبات.' },
    ],
    practicalSteps: [
        { instruction: 'اختر شاشة من Screen Inventory واكتب برومبتاً لأداة تصميم متاحة يصف مهمة المستخدم والأدوار والمحتوى والاتجاه.', expectedOutput: '`docs/STITCH_MASTER_PROMPT.md` يضم البرومبت ومصدر مواصفاته حتى إن لم يُشغّل؛ سجّل التوليد Not Run عند تعذر الأداة.' },
        { instruction: 'سجل نتيجة التصميم أو تعذر إنشائها، وميّز القيم المؤكدة من المقترحة والمجهولة، ثم سجل قرار المراجعة ومصدره.', expectedOutput: '`docs/STITCH_SCREEN_REFERENCES.md` يسجل رابط/معرف الشاشة وحالة المراجعة الفعلية؛ عند تعذر الإنشاء يسجل `Not Run` وسبب التعذر بدلاً من ادعاء وجود شاشة.' },
    ],
    workedExample: { title: 'شاشة طلب معدات RTL', context: 'الجرد يصف صفحة يختار فيها الطالب معدة ويرسل سبباً ومدة.', result: 'يطلب البرومبت ترتيباً من اليمين لليسار وحقولاً مسماة وملاحظات استجابة، ويترك قيمة اللون UNKNOWN حتى تأتي من دليل هوية معتمد.' },
    outputs: [
        { id: 'stitch-prompt', description: '`docs/STITCH_MASTER_PROMPT.md` برومبت مصدره متطلبات شاشة محددة.' },
        { id: 'reference-screen', description: '`docs/STITCH_SCREEN_REFERENCES.md` يسجل شاشة فعلية ورابطها/معرفها ومصدرها وحالة مراجعتها؛ `Not Run` يعني أن المخرج غير مكتمل.' },
    ],
    questions: [
        { id: 'stitchref-q-unknown', objectiveId: 'stitchref-objective-evidence', prompt: 'لم توفر الشاشة المرجعية قيمة لون مؤكدة. ماذا تسجل؟', options: ['قيمة hex جميلة من التخمين', '`UNKNOWN` مع بيان الدليل الناقص', 'قيمة من علامة تجارية أخرى', 'تغيير PRD'], correct: 1, explanation: 'توثيق المجهول يمنع تحويل قرار بصري غير مسند إلى رمز تصميم رسمي.' },
        { id: 'stitchref-q-reference', objectiveId: 'stitchref-objective-prompt', prompt: 'لماذا تبدأ بشاشة مرجعية واحدة؟', options: ['لتثبيت قرار بصري ممثل قبل توليد بقية الشاشات', 'لإلغاء PRD', 'لإنشاء التطبيق تلقائياً', 'لتجنب مراجعة الحالات'], correct: 0, explanation: 'الشاشة المرجعية تساعد في توحيد القرارات المرئية قبل توسيعها إلى بقية النطاق.' },
    ],
    criteria: [
        { id: 'stitchref-r-scope', outputId: "stitch-prompt", name: 'ارتباط البرومبت بمهمة', description: 'البرومبت يذكر مستخدم الشاشة ومصدر المطلوب والاتجاه.', evidencePrompt: 'أشر إلى المتطلب/الجرد الذي استند إليه البرومبت.' },
        { id: 'stitchref-r-evidence', outputId: "reference-screen", name: 'توثيق الدليل والحالة', description: 'القيم المجهولة والمقترحة لا توصف بأنها معتمدة.', evidencePrompt: 'راجع حالة الشاشة وأي رمز تصميم مقابل مصدره.' }
    ],
},
{
    topicSlug: 'design-system-rules',
    objectives: [
        { id: 'designrules-objective-tokens', text: 'استخراج قواعد ورموز تصميم من شاشة مرجعية ذات مصدر وحالة مراجعة موثقين.' },
        { id: 'designrules-objective-consistency', text: 'إنشاء برومبتات مستقلة للشاشات تستخدم النظام نفسه ولا تخترع قيماً.' },
    ],
    sections: [
        { heading: 'المدخل: دليل شاشة قابل للفحص', body: 'استخدم الشاشة المرجعية المتاحة وحالة مراجعتها وملاحظات فحصها. إن لم تتوفر قيمة فعلية فلا تستنتج لوناً أو مسافة من الذاكرة، واترك قرار الاعتماد مفتوحاً.' },
        { heading: 'نظام تصميم مصدره واضح', body: 'سجل اللون أو الخط أو المقياس ومصدره وشاشة ظهوره وحالة الثقة. افصل توكن معتمد عن مقترح يحتاج قراراً.' },
        { heading: 'برومبتات الشاشات', body: 'اكتب برومبتاً لكل شاشة من الرحلة، واطلب إعادة استخدام التوكنز المعتمدة. لا تكتب كوداً في مرحلة التصميم ولا تجعل البرومبت يضيف شاشة أو ميزة.' },
    ],
    practicalSteps: [
        { instruction: 'استخرج قيماً قابلة للتأكيد من شاشة متاحة وسجل المصدر والحالة أو ضع UNKNOWN إذا لم يوجد دليل.', expectedOutput: '`docs/DESIGN_SYSTEM_EVIDENCE.md` يبين القيمة ومصدرها وشاشة ظهورها وحالة الثقة أو سبب UNKNOWN.' },
        { instruction: 'اكتب برومبتاً مستقلاً لكل شاشة في النطاق واربطه بالتوكنز والهدف المحددين.', expectedOutput: '`docs/STITCH_SCREEN_PROMPTS.md` برومبتات تحافظ على وحدة التصميم.' },
    ],
    workedExample: { title: 'توحيد زر الإجراء', context: 'الشاشة المرجعية المتاحة قد تعرض زرّاً رئيسياً يمكن فحص لونه وحجمه.', result: 'يسجل التوثيق القيمة فقط إذا أمكن فحصها ويربطها بمصدرها؛ وإلا يسجل UNKNOWN، ثم يطلب البرومبت إعادة استخدام الرمز الموثق لا اختراع قيمة أخرى.' },
    outputs: [
        { id: 'screen-prompts', description: '`docs/STITCH_SCREEN_PROMPTS.md` برومبت لكل شاشة مرتبط بمهمتها.' },
        { id: 'design-system-evidence', description: '`docs/DESIGN_SYSTEM_EVIDENCE.md` يسجل الرموز ومصادرها وحالة الثقة، ويربطها بالشاشات المرجعية.' },
    ],
    questions: [
        { id: 'designrules-q-token', objectiveId: 'designrules-objective-tokens', prompt: 'ما سجل التوكن الأكثر قابلية للمراجعة؟', options: ['اسم وقيمة ومصدر الشاشة وحالة الثقة', 'قيمة بلا مصدر', 'لون جديد من ذاكرة الكاتب', 'اسم علامة تجارية أخرى'], correct: 0, explanation: 'المصدر والثقة يسمحان بمراجعة القيمة وتمييز المشاهد من المقترح.' },
        { id: 'designrules-q-prompts', objectiveId: 'designrules-objective-consistency', prompt: 'كيف تمنع برومبتات عدة شاشات انجراف النظام البصري؟', options: ['تطلب استخدام الرموز المعتمدة من المرجع وتحدد المهمة دون اختراع', 'تعطي كل شاشة لوحة ألوان جديدة', 'تحذف التوكنز من البرومبت', 'تضيف شاشة غير موجودة'], correct: 0, explanation: 'مرجع واحد وتوكنز موثقة يحافظان على الاتساق ويجعلان الفروقات قراراً ظاهراً.' },
    ],
    criteria: [
        { id: 'designrules-r-source', outputId: "screen-prompts", name: 'مصدر التوكنز', description: 'القيم المعتمدة مربوطة بالشاشة والدليل؛ المجهول موسوم.', evidencePrompt: 'اختر توكناً وتحقق من المصدر أو من وسم UNKNOWN.' },
        { id: 'designrules-r-consistency', outputId: "design-system-evidence", name: 'اتساق البرومبتات', description: 'تستخدم شاشات الرحلة النظام نفسه دون ميزات أو قيم مخترعة.', evidencePrompt: 'قارن توكن في برومبتين مع جدول المصدر.' }
    ],
},
{
    topicSlug: 'interactive-prototype',
    objectives: [
        { id: 'prototype-objective-journey', text: 'ربط شاشات النموذج بتفاعلات حقيقية تمثل الرحلات المعتمدة.' },
        { id: 'prototype-objective-audit', text: 'تدقيق المسارات السعيدة والفاشلة والعودة والصلاحيات في النموذج.' },
    ],
    sections: [
        { heading: 'المدخل: شاشات وقرار تفاعل', body: 'ابدأ من مراجع الشاشات وحالتها ورحلات المنتج. النموذج إن توفر يحاكي مساراً ولا ينفذ backend؛ ويمكن التخطيط في جدول دون أداة.' },
        { heading: 'الروابط والأزرار', body: 'حدد الوجهة أو الحالة المتوقعة لكل فعل. افحص التفاعل في نموذج متاح؛ إذا لم يتوفر، اكتب الحالة المطلوبة وسجل الفحص Not Run.' },
        { heading: 'تدقيق يحدد حدوده', body: 'وثق ما جربته وما بقي Not Run في `docs/PROTOTYPE_JOURNEYS_AUDIT.md`. نجاح التفاعل النموذجي لا يثبت أن النظام البرمجي جاهز أو أن صلاحياته منفذة.' },
    ],
    practicalSteps: [
        { instruction: 'ابدأ بجدول انتقالات مصدره واضح، ثم اربط الإجراء الأساسي في أداة نموذج متاحة حتى النتيجة.', expectedOutput: 'نموذج تفاعلي فعلي ورابط/معرف يمكن مراجعته؛ إذا تعذر إنشاؤه فسجّله Not Run وغير مكتمل، ويظل جدول الانتقالات تحضيراً لا بديلاً.' },
        { instruction: 'اختبر النجاح والرفض والتراجع والصلاحيات في النموذج، وسجل النتائج الفعلية؛ سجّل الفحوص التي لم تنفذ Not Run.', expectedOutput: '`docs/PROTOTYPE_JOURNEYS_AUDIT.md` يفرق بين نتائج النموذج الفعلية والفحوص المخططة أو Not Run.' },
    ],
    workedExample: { title: 'إرسال طلب ثم رفضه', context: 'رحلة الطالب تعرض نموذج طلب ثم رد المسؤول.', result: 'يتحرك النموذج من النموذج إلى ملخص الطلب ثم شاشة الرفض مع سبب ظاهر إذا كانت هذه الشاشات جزءاً من المرجع. لا يوحي النموذج بأن الاتصال أو الحفظ الفعلي قد نُفذ.' },
    outputs: [
        { id: 'prototype', description: 'نموذج تفاعلي فعلي برابط/معرف؛ إذا لم يُنشأ بعد، سجّل Not Run وغير مكتمل، فالجدول وحده تحضيري.' },
        { id: 'prototype-audit', description: '`docs/PROTOTYPE_JOURNEYS_AUDIT.md` نتائج فعلية للنموذج أو Not Run وغير مكتمل؛ لا يصف الخطة كاختبار منفذ.' },
    ],
    questions: [
        { id: 'prototype-q-functional', objectiveId: 'prototype-objective-journey', prompt: 'ما الفرق بين Prototype متصل وصورة واجهة؟', options: ['Prototype يتيح تتبع التفاعلات والنتائج المتوقعة؛ الصورة لا تختبرها', 'الصورة تثبت أن backend يعمل', 'Prototype يعني أن الكود الإنتاجي اكتمل', 'كلاهما لا يحتاج توثيق'], correct: 0, explanation: 'النموذج يسمح باختبار سلوك الواجهة ومساراتها، لكنه لا يثبت التنفيذ البرمجي أو البيانات الفعلية.' },
        { id: 'prototype-q-audit', objectiveId: 'prototype-objective-audit', prompt: 'ما الذي يجب أن يتضمنه تدقيق رحلة Prototype؟', options: ['النجاح والرفض والرجوع والصلاحيات ونتائجها', 'الشاشة الرئيسية وحدها', 'رأي عام بلا خطوات', 'ألوان دون تفاعل'], correct: 0, explanation: 'تدقيق الرحلة يكشف ما يحدث في المسارات البديلة ويجعل التفاعل قابلاً لإعادة التجربة.' },
    ],
    criteria: [
        { id: 'prototype-r-interaction', outputId: "prototype", name: 'تفاعلات قابلة للتجربة', description: 'الإجراء الأساسي يقود إلى نتيجة مفهومة عبر الشاشات.', evidencePrompt: 'جرّب المسار وأظهر كيف ينتقل من الفعل إلى النتيجة.' },
        { id: 'prototype-r-audit', outputId: "prototype-audit", name: 'تدقيق متوازن', description: 'يسجل التدقيق مساري النجاح والفشل والتراجع والصلاحيات.', evidencePrompt: 'أشر إلى حالة بديلة سجلت نتيجتها وما بقي يحتاج تصحيحاً.' }
    ],
}
];

const groupA08Content = buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_08);

export const LEARNING_CONTENT_GROUP_A_08: Record<string, TopicLearningContent> = {
  ...groupA08Content,
  'stitch-reference-screen': { ...groupA08Content['stitch-reference-screen'], contentVersion: 2 },
  'design-system-rules': { ...groupA08Content['design-system-rules'], contentVersion: 2 },
  'interactive-prototype': { ...groupA08Content['interactive-prototype'], contentVersion: 2 },
};
