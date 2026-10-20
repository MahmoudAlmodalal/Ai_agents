import { TopicDraft, buildTopic } from '@/src/data/learning/group-a-common.ts';

const topicDrafts: TopicDraft[] = [
{
    topicSlug: 'discovery-grill-me',
    objectives: [
        { id: 'discovery-objective-interview', text: 'إدارة مقابلة استكشاف متطلبات بسؤال واحد في كل مرة دون أن يخترع الوكيل قواعد.' },
        { id: 'discovery-objective-record', text: 'تسجيل القرارات والافتراضات والأسئلة المفتوحة وربطها بسياق المشروع.' },
    ],
    sections: [
        { heading: 'المدخل: سياق مشروع مؤقت', body: 'ابدأ من `docs/PROJECT_CONTEXT.md`. ما لم يجيب عنه المستخدم يظل مفتوحاً؛ لا تملأ الفراغ بتخمين من النموذج.' },
        { heading: 'مقابلة متدرجة', body: 'اطلب سؤالاً واحداً واضحاً في كل رسالة. اسأل عن الأدوار والهدف والقواعد والاستثناءات عند الحاجة، واطلب مثالاً عندما تكون الإجابة عامة. لا تعرض حلاً قبل فهم المشكلة.' },
        { heading: 'مخرج قابل للتتبع', body: '`docs/DECISIONS_LOG.md` يميز القرارات التي أكدها صاحب المشروع عن الافتراضات والأسئلة التي لم تحسم. لا تحول سجلاً ناقصاً إلى PRD مكتمل.' },
    ],
    practicalSteps: [
        { instruction: 'قدّم ملف سياقك إلى Grill Me وراقب أن كل رسالة تحتوي سؤالاً واحداً فقط؛ أجب من معرفتك ولا تدع الأداة تختار قاعدة عمل نيابة عنك.', expectedOutput: 'ملاحظات مقابلة تتضمن السؤال والإجابة ومصدر أو حالة المعلومة لكل قرار.' },
        { instruction: 'انقل ما اتفق عليه إلى سجل القرار، واجمع ما لم يحسم في أسئلة مفتوحة وافتراضات مع صاحب الإجابة المحتمل.', expectedOutput: '`docs/DECISIONS_LOG.md` بقرارات قابلة للتتبع وقائمة أسئلة لا تعرض على أنها قرارات.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: تحديد معنى الطلب النشط', context: 'في BorrowHub، حد الطلبين النشطين مذكور في مادة الدورة لكن تعريف “نشط” يحتاج مراجعة PRD.', result: 'سؤال المقابلة: “أي حالات للطلب ينبغي أن تدخل ضمن الحد؟” يسجل الجواب كقرار فقط بعد أن يختار صاحب المشروع؛ وإلا يبقى السؤال مفتوحاً.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'decisions-log', description: '`docs/DECISIONS_LOG.md` مع مصدر القرار وصاحبه وتاريخه أو حالته.' },
        { id: 'open-questions', description: 'قائمة الأسئلة المفتوحة والافتراضات التي تحتاج جواباً أو تحققاً.' },
    ],
    questions: [
        { id: 'discovery-q-one-at-time', objectiveId: 'discovery-objective-interview', prompt: 'ما السلوك الصحيح عندما لا يعرف صاحب المشروع هل الطلب المعلّق يمكن إلغاؤه؟', options: ['اختيار قاعدة افتراضية ومتابعة PRD', 'طرح سؤال محدد وتسجيله مفتوحاً حتى يجيب صاحب القرار', 'حذف حالة الإلغاء من كل الوثائق', 'اعتبار اقتراح الوكيل قراراً'], correct: 1, explanation: 'Grill Me يكشف الغموض ولا يملك سلطة اختراع سياسة المنتج. يسجل السؤال ومصدر الإجابة المطلوب.' },
        { id: 'discovery-q-decision-log', objectiveId: 'discovery-objective-record', prompt: 'ماذا يجب أن يميز سجل القرار بينه وبين الافتراض؟', options: ['القرار مؤكد من صاحبه أو مصدر موثق؛ الافتراض ينتظر التحقق', 'القرار هو الأحدث زمنياً دائماً', 'الافتراض قاعدة يمكن تنفيذها فوراً', 'لا فرق إذا كان النص واضحاً'], correct: 0, explanation: 'التوثيق يبين درجة اليقين ومصدره. وضوح الصياغة لا يحول التخمين إلى اعتماد.' },
    ],
    criteria: [
        { id: 'discovery-r-trace', outputId: "decisions-log", name: 'مصدر القرار', description: 'لكل قرار مؤكد صاحب أو مصدر، وتظل غير المحسوم غير محسومة.', evidencePrompt: 'اختر قراراً من السجل وأظهر من أكده؛ ثم أشر إلى سؤال ما زال مفتوحاً.' },
        { id: 'discovery-r-scope', outputId: "open-questions", name: 'انضباط المقابلة', description: 'تسلسل الأسئلة يكشف الغموض دون تحويل اقتراحات الذكاء الاصطناعي إلى متطلبات.', evidencePrompt: 'أظهر سؤالاً واحداً وإجابة وردت فعلاً، أو اكتب لماذا لم يحسم السؤال.' }
    ],
},
{
    topicSlug: 'prd-specification',
    objectives: [
        { id: 'prd-objective-source', text: 'تحويل القرارات المعتمدة في سجل الاستكشاف إلى متطلبات دون رفع الافتراض إلى حقيقة.' },
        { id: 'prd-objective-verify', text: 'ترقيم المتطلبات ومراجعة التناقض والنطاق باستخدام شروط يمكن فحصها.' },
    ],
    sections: [
        { heading: 'المدخل: سجل قرار لا ملخص حر', body: 'ابدأ من قرارات `docs/DECISIONS_LOG.md`. إذا بقيت نقطة أساسية مفتوحة، اذكرها في PRD ولا تملأها.' },
        { heading: 'المتطلب القابل للمراجعة', body: 'افصل المتطلبات الوظيفية FR عن غير الوظيفية NFR وقواعد العمل. امنح كل متطلب معرفاً وأولوية ومصدراً أو حالة؛ يجب أن يستطيع مراجع تحديد ما الذي يعنيه “متحقق”.' },
        { heading: 'مراجعة النطاق والاتساق', body: 'راجع العلاقات بين الأدوار والصلاحيات وحالات النجاح والاستثناءات، ثم قارنها بنطاق MVP. تقرير المراجعة يذكر التناقض ودليل موضعه وما يلزم حسمه، لا يغير القرار بصمت.' },
    ],
    practicalSteps: [
        { instruction: 'ابنِ مسودة PRD من القرارات المؤكدة فقط؛ اكتب قائمة مستقلة بالمصطلحات أو القواعد التي لا تزال مفتوحة.', expectedOutput: '`docs/PRD.md` يميز المتطلب المؤكد عن الافتراض والسؤال المفتوح.' },
        { instruction: 'رقم كل متطلب وظيفي وغير وظيفي، ثم راجع التداخل والنطاق وسجل المشكلة والتصحيح المقترح قبل تغيير أي قرار.', expectedOutput: '`docs/PRD_REVIEW.md` يربط ملاحظات المراجعة بمعرفات المتطلبات.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: تحويل قاعدة استعارة إلى PRD', context: 'يذكر سياق BorrowHub حدّاً أقصى لطلبين نشطين لكل طالب، لكنه لا يحسم ما الحالات التي تدخل في كلمة نشط.', result: 'يمكن تسجيل FR لاستعراض عدد الطلبات الحالية إذا أكدها المالك؛ ويبقى تعريف الحالات سؤالاً مفتوحاً بدلاً من وضع شرط “معلّق ومقبول” من عند الكاتب.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'prd', description: '`docs/PRD.md` بالأقسام المرجعية ومعرفات المتطلبات والأولويات والمصادر وحالة الأسئلة.' },
        { id: 'prd-review', description: '`docs/PRD_REVIEW.md` يربط كل ملاحظة أو تصحيح بالمتطلب المعني.' },
    ],
    questions: [
        { id: 'prd-q-open-rule', objectiveId: 'prd-objective-source', prompt: 'سجل المقابلة لا يحسم شرط إلغاء الطلب. كيف يظهر في PRD؟', options: ['قاعدة افتراضية تبدو مناسبة', 'سؤال مفتوح لا يقدم كمتطلب مؤكد', 'شرط قبول ناجح', 'قرار من فريق التطوير'], correct: 1, explanation: 'المصدر الوحيد لا يثبت قراراً لم يصدر. يظل السؤال مفتوحاً إلى أن يجيب صاحب المنتج.' },
        { id: 'prd-q-traceable', objectiveId: 'prd-objective-verify', prompt: 'أي معرف أنسب لمتطلب وظيفي مستقل يمكن تتبعه في مراجعة PRD؟', options: ['لون-أزرق', 'FR-004 مع أولوية ومصدر أو حالة', 'ملاحظة أخيرة بلا مرجع', 'رقم الصفحة فقط'], correct: 1, explanation: 'المعرف المستقر يساعد على تتبع المتطلب في المراجعة وSRS والاختبار؛ الصفحة قد تتغير ولا تبين نوع المتطلب أو مصدره.' },
    ],
    criteria: [
        { id: 'prd-r-source', outputId: "prd", name: 'سلامة مصدر المتطلبات', description: 'المؤكد والافتراضي والمفتوح منفصل، ومعرفات المتطلبات قابلة للتتبع.', evidencePrompt: 'تتبع متطلباً إلى قرار مصدره وبيّن كيف سُجلت النقطة المفتوحة.' },
        { id: 'prd-r-review', outputId: "prd-review", name: 'قابلية مراجعة التناقض', description: 'ملاحظات المراجعة تشير إلى دليل محدد ولا تحسم القرار نيابة عن المالك.', evidencePrompt: 'أشر إلى ملاحظة مرتبطة بمعرف متطلب ووضح التغيير الذي ينتظر اعتماداً.' }
    ],
},
{
    topicSlug: 'srs',
    objectives: [
        { id: 'srs-objective-behavior', text: 'تحويل متطلب PRD معتمد إلى شروط سلوك ومدخلات ومخرجات وحالات فشل قابلة للاختبار.' },
        { id: 'srs-objective-traceability', text: 'ربط كل بند سلوكي بمتطلب مصدر وتغطية المسارات المتوقعة دون اختراع سياسة.' },
    ],
    sections: [
        { heading: 'المدخل: معرف متطلب ومصدر حاسم', body: 'اقرأ PRD وسجل القرار. إذا لم تعتمد قاعدة المنتج، أشر إليها كاعتماد أو سؤال مفتوح؛ SRS يحدد السلوك ولا يخلق سياسة جديدة.' },
        { heading: 'تفصيل السلوك', body: 'لكل سيناريو، اذكر المدخلات وشروط التحقق واستجابة النظام والنتيجة المرئية وحالات الخطأ والتكرار أو التعارض.' },
        { heading: 'معيار قبول قابل للتنفيذ', body: 'اكتب Given/When/Then لكل حالة ذات معنى، واربطه بمعرف FR أو BR. غطّ المسار الصحيح والرفض أو الحدث البديل عندما تنص عليه قرارات المنتج.' },
    ],
    practicalSteps: [
        { instruction: 'اختر FR معتمداً واكتب الشروط والردود والحالات الطرفية التي ذكرها PRD؛ لا تضف شرطاً لا أصل له.', expectedOutput: 'سيناريو سلوكي في `docs/SRS.md` مرتبط بمعرف FR/BR.' },
        { instruction: 'اكتب معيار Given/When/Then لكل حالة، ثم أضف صفاً في مصفوفة التتبع لكل معرف مصدر.', expectedOutput: 'مصفوفة `PRD -> SRS` لا تترك سلوكاً بلا أصل أو متطلباً بلا حالة قبول.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: تتبع طلب استعارة', context: 'لو نص PRD على أن الطلب يحتاج سبباً، مدة، وحساباً معتمداً، فهذه شروط مصدرها القرار.', result: 'Given حساب معتمد ووحدة متاحة، When يرسل الطالب مدة وسبباً غير فارغين، Then ينشأ طلب للمراجعة. إذا رفض المدخل، يبين SRS أي شرط فشل فقط إذا كان PRD قد حسم هذا السلوك؛ وإلا يسجل سؤالاً.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'srs', description: '`docs/SRS.md` يحدد السلوك والتحقق والاستجابة والحالات المقبولة والمرفوضة.' },
        { id: 'requirements-traceability', description: 'مصفوفة تربط كل سيناريو ومعيار قبول بمعرف متطلب المصدر.' },
    ],
    questions: [
        { id: 'srs-q-trace-source', objectiveId: 'srs-objective-traceability', prompt: 'كيف تكتب حالة إلغاء لم يقررها PRD؟', options: ['تخترع السلوك المرجح', 'تسجل الاعتماد أو السؤال المفتوح وتؤجل معيار القبول', 'تكتب Then: يلغى دائماً', 'تحذف المتطلب الأصلي'], correct: 1, explanation: 'SRS يفصل ما تقرر عن ما ينتظر قراراً. صياغة Given/When/Then لا تجعل القاعدة المخترعة صحيحة.' },
        { id: 'srs-q-gwt', objectiveId: 'srs-objective-behavior', prompt: 'ما الذي يجعل معيار القبول Given/When/Then قابلاً للاختبار؟', options: ['أن يسمي شرط البداية والفعل والنتيجة المرئية', 'أن يكرر الهدف التسويقي', 'أن يذكر لغة البرمجة فقط', 'أن يستخدم كلمة “سهل” بلا دليل'], correct: 0, explanation: 'السياق والفعل والنتيجة تسمح للمراجع بتهيئة السيناريو والتحقق مما حدث.' },
    ],
    criteria: [
        { id: 'srs-r-scenario', outputId: "srs", name: 'سلوك محدد المصدر', description: 'يذكر السيناريو الشروط والنتيجة وحالات الرفض التي قررها المنتج.', evidencePrompt: 'أشر إلى متطلب المصدر وسيناريو ناجح وآخر طرفي.' },
        { id: 'srs-r-trace', outputId: "requirements-traceability", name: 'تتبع المتطلبات', description: 'لكل سيناريو معرف مصدر ولا توجد قواعد بلا سند.', evidencePrompt: 'اختر صفين من المصفوفة وتحقق من أن FR/BR موجود في PRD.' }
    ],
},
{
    topicSlug: 'git-project-docs',
    objectives: [
        { id: 'gitdocs-objective-history', text: 'تهيئة Git لحفظ وثائق المشروع في تغييرات صغيرة ذات رسائل قابلة للفهم.' },
        { id: 'gitdocs-objective-secrets', text: 'فحص ما سيدخل إلى commit وحماية الملفات المحلية والسرية قبل نشر المستودع.' },
    ],
    sections: [
        { heading: 'المدخل: ملفات المشروع قبل أول حفظ', body: 'راجع `docs/` و`README.md` وحالة العمل. أنشئ `.gitignore` قبل إضافة ملفات البيئة والمفاتيح.' },
        { heading: 'من مساحة العمل إلى commit', body: '`git status` يبين الملفات المتغيرة، و`git diff` يراجع التغييرات، و`git add` يختارها للمرحلة، و`git commit` يحفظ لقطة محلية. commit لا يعني أن الملفات وصلت إلى GitHub.' },
        { heading: 'نطاق السر', body: 'لا تضف سرّاً حقيقياً إلى Git. `.gitignore` يمنع تتبع الملفات غير المضافة مستقبلاً، ولا يمحو سراً سبق أن حُفظ في تاريخ Git؛ تعامل مع ذلك كتسريب يحتاج إزالة/تدوير السر.' },
    ],
    practicalSteps: [
        { instruction: 'هيئ المستودع وأضف قواعد تجاهل ملفات البيئة والمخرجات المؤقتة قبل إضافة الوثائق.', expectedOutput: 'مستودع محلي مع `.gitignore` يجتاز `git status` دون إظهار ملفات الأسرار.' },
        { instruction: 'افحص الفرق والمرحلة، ثم احفظ الوثائق في commit باسم يوضح المحتوى وأنشئ فرع الوثائق المقترح.', expectedOutput: 'commit أولي يضم الملفات المقصودة فقط، وفارق يمكن مراجعته على فرع عمل.' },
    ],
    workedExample: { title: 'حفظ وثائق MVP', context: 'ملف `docs/PROJECT_CONTEXT.md` جاهز، ويحتوي المشروع أيضاً على `.env.local` محلي.', result: 'تضاف قاعدة تجاهل `.env.local` قبل stage؛ يفحص المتعلم `git status` و`git diff --cached` ثم يحفظ ملف السياق. لا يرفع المفتاح إلى commit ولا يظن أن تجاهله لاحقاً يمحو تاريخاً سابقاً.', caseStudy: 'learner-project' },
    outputs: [
        { id: 'local-repository', description: 'مستودع Git محلي مع `.gitignore` وتاريخ commit مفهوم.' },
        { id: 'tracked-docs', description: 'وثائق `docs/` و`README.md` محفوظة من دون ملفات أسرار.' },
    ],
    questions: [
        { id: 'gitdocs-q-ignore', objectiveId: 'gitdocs-objective-secrets', prompt: 'اكتشفت أن مفتاحاً حقيقياً دخل commit سابقاً ثم أضفت ملفه إلى `.gitignore`. ما الاستنتاج الصحيح؟', options: ['اختفى السر من تاريخ Git تلقائياً', 'يجب اعتبار السر مسرباً وتدويره، لأن تجاهل الملف لاحقاً لا يمحو commit السابق', 'أصبح آمناً بعد حذف نسخة العمل', 'يمنع GitHub الجميع من رؤية التاريخ'], correct: 1, explanation: 'قواعد التجاهل لا تعيد كتابة التاريخ. يجب إبطال السر والتعامل مع سجل المستودع وفق إجراء معالجة التسريب.' },
        { id: 'gitdocs-q-commit', objectiveId: 'gitdocs-objective-history', prompt: 'أين تتحقق من الملفات التي ستدخل في commit قبل حفظه؟', options: ['`git diff --cached` مع `git status`', '`git log` فقط قبل أي تعديل', 'إعدادات محرر النصوص', '`git remote -v`'], correct: 0, explanation: 'مراجعة المرحلة والحالة تكشف بالضبط ما سيحفظ محلياً، وتساعد على استبعاد ملفات غير مقصودة.' },
    ],
    criteria: [
        { id: 'gitdocs-r-ignore', outputId: "local-repository", name: 'فحص الأسرار قبل الحفظ', description: 'قواعد التجاهل موجودة ومرحلة Git لا تحتوي ملفات سرية.', evidencePrompt: 'أظهر `.gitignore` ونتيجة `git status` أو `git diff --cached` دون طباعة أسرار.' },
        { id: 'gitdocs-r-history', outputId: "tracked-docs", name: 'تاريخ قابل للمراجعة', description: 'الـcommit يحفظ وثائق مقصودة برسالة واضحة وفارق مفهوم.', evidencePrompt: 'أشر إلى commit وفارقه والملفات التي تم تضمينها.' }
    ],
},
{
    topicSlug: 'github-docs-collaboration',
    objectives: [
        { id: 'githubdocs-objective-remote', text: 'ربط المستودع المحلي بمستودع GitHub بعيد مع التحقق من الفرع والوجهة.' },
        { id: 'githubdocs-objective-review', text: 'استخدام Pull Request لمراجعة وثائق واضحة وفحص الأسرار قبل النشر.' },
    ],
    sections: [
        { heading: 'المدخل: تاريخ محلي نظيف', body: 'يأتي GitHub بعد commits محلية مقصودة وملف README يشرح المشروع ومجلد الوثائق.' },
        { heading: 'المستودع البعيد وPull Request', body: 'remote يحدد الوجهة؛ push يرسل commits؛ Pull Request يطلب مراجعة التغييرات قبل دمجها. راجع المقارنة والفرع الهدف والمراجعات المطلوبة قبل الدمج.' },
        { heading: 'النشر مسؤولية منفصلة', body: 'افحص الأسرار في الملفات والتاريخ، واستخدم صلاحيات مناسبة. منع السر من README وحده لا يكفي إن كان محفوظاً في commit آخر.' },
    ],
    practicalSteps: [
        { instruction: 'أنشئ مستودعاً بعيداً مناسباً ثم تحقق من `git remote -v` والفرع الحالي قبل push.', expectedOutput: 'remote موثق يشير إلى مستودع مشروعك الصحيح مع README يشرح الفكرة وبنية docs/.' },
        { instruction: 'ادفع فرع الوثائق وافتح Pull Request يوضح الهدف والملفات وكيف يراجعها زميلك؛ لا تدمج قبل فحص التغييرات.', expectedOutput: 'Pull Request قابل للمراجعة مع سجل تغييرات ووصف واضح وفحص أسرار.' },
    ],
    workedExample: { title: 'مراجعة PRD قبل الدمج', context: 'بعد إنشاء PRD على فرع `docs/prd`, يريد زميل مراجعة المتطلبات والافتراضات.', result: 'يفتح PR من `docs/prd` إلى الفرع المتفق عليه، ويلخص مصدر المتطلبات والأسئلة المفتوحة. يراجع الزميل diff ولا يطلب نشر `.env.local`.' },
    outputs: [
        { id: 'remote-repository', description: 'مستودع GitHub بعيد مضبوط وREADME تعريفي يشرح المشروع والوثائق.' },
        { id: 'review-pull-request', description: 'Pull Request للوثائق يمكن فيه مراجعة diff والأسئلة قبل الدمج.' },
    ],
    questions: [
        { id: 'githubdocs-q-pr', objectiveId: 'githubdocs-objective-review', prompt: 'ما وظيفة Pull Request في رحلة توثيق مشروعك؟', options: ['يرسل commit إلى جهاز زميل بلا مراجعة', 'يطلب مراجعة فرق فرع قبل دمجه في هدف محدد', 'يستبدل `git status` محلياً', 'يمحو الأسرار من كل النسخ'], correct: 1, explanation: 'Pull Request يعرض التغييرات للمراجعة والنقاش قبل الدمج؛ لا ينفذ وحده تنظيف السر من التاريخ.' },
        { id: 'githubdocs-q-remote', objectiveId: 'githubdocs-objective-remote', prompt: 'قبل أول push، ما الفحص الذي يساعدك على تجنب إرسال المستودع إلى وجهة خاطئة؟', options: ['مراجعة `git remote -v` والفرع الحالي والمرحلة', 'تغيير اسم README', 'حذف commit محلي', 'فتح إعدادات الألوان'], correct: 0, explanation: 'التحقق من الوجهة والفرع والملفات المقصودة يقلل نشر تغييرات في مستودع أو فرع غير صحيح.' },
    ],
    criteria: [
        { id: 'githubdocs-r-remote', outputId: "remote-repository", name: 'وجهة معلومة', description: 'الremote والفرع الهدف متوافقان مع المستودع المقصود.', evidencePrompt: 'أظهر اسم المستودع والفرع من إعدادات المشروع دون إظهار بيانات اعتماد.' },
        { id: 'githubdocs-r-review', outputId: "review-pull-request", name: 'مراجعة قبل الدمج', description: 'PR يوضح التغيير ويتيح فحصه، ولا يحتوي أسراراً.', evidencePrompt: 'أشر إلى الوصف والـdiff وفحوص السر أو المراجعة المسجلة.' }
    ],
},
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
},
{
    topicSlug: 'plantuml',
    objectives: [
        { id: 'plantuml-objective-syntax', text: 'إنشاء ملف PlantUML يبدأ وينتهي بعلامات صحيحة واختيار الرسم المناسب.' },
        { id: 'plantuml-objective-render', text: 'استخدام معاينة للتحقق من الصياغة والتمييز بين صلاحية الرسم وصحة النموذج.' },
    ],
    sections: [
        { heading: 'المدخل: رسم هندسي يحتاج إلى ترميز', body: 'اختر UML مثل Use Case أو Activity أو State بحسب معنى السؤال؛ Mermaid خيار لمخططات أخرى. لا تخلط لغتي الترميز في كتلة واحدة.' },
        { heading: 'حدود الملف', body: 'تبدأ العينة بـ `@startuml` وتنتهي بـ `@enduml`. استخدم معرفات واضحة ثم جرّب المصيّر المختار لتلقي أخطاء الصياغة.' },
        { heading: 'مقارنة واعية', body: 'سجل المحرر والخطوات في README. نجاح التصيير لا يثبت أن actor أو العلاقة أو القاعدة صحيحة؛ قارن المعنى بالمتطلبات في Topics اللاحقة.' },
    ],
    practicalSteps: [
        { instruction: 'أنشئ عينة بسيطة من نوع UML يناسب سؤالك، ثم افحص البداية والنهاية والأسماء في محرر PlantUML.', expectedOutput: 'كود PlantUML يعمل في المعاينة ويتضمن تعليقات عن الغرض من الرسم.' },
        { instruction: 'وثق طريقة المعاينة والفروق التي تهمك عن Mermaid، ثم احتفظ بعينة قابلة لإعادة الاستخدام.', expectedOutput: '`docs/diagrams/README-plantuml.md` مع عينة كود صالحة للتصيير.' },
    ],
    workedExample: { title: 'رسم علاقة Actor بالنظام', context: 'نحتاج لاحقاً إلى توثيق تفاعل المستخدم مع النظام عبر Use Case.', result: 'عينة `@startuml` و`@enduml` تضيف actor ونظاماً وتسمي الغرض؛ لا تسبق هذه العينة اعتماد صلاحيات use cases.' },
    outputs: [
        { id: 'plantuml-guide', description: '`docs/diagrams/README-plantuml.md` يشرح المحرر والتصيير واختيار اللغة.' },
        { id: 'plantuml-sample', description: 'كود PlantUML صالح مع بداية ونهاية واضحتين.' },
    ],
    questions: [
        { id: 'plantuml-q-boundary', objectiveId: 'plantuml-objective-syntax', prompt: 'ما الغلاف الأساسي لعينة PlantUML؟', options: ['`<diagram>` و`</diagram>`', '`@startuml` و`@enduml`', '`flowchart TD` فقط', '`SELECT` و`;`'], correct: 1, explanation: 'هاتان علامتا بداية ونهاية مخطط PlantUML؛ Mermaid له صياغة بداية مختلفة.' },
        { id: 'plantuml-q-render', objectiveId: 'plantuml-objective-render', prompt: 'المحرر يعرض الرسم بلا خطأ. ماذا تفحص بعد ذلك؟', options: ['أن المعنى والأدوار يستندان إلى المتطلبات', 'أن المشروع يحتاج قاعدة بيانات جديدة', 'أن كل العلاقات صحيحة تلقائياً', 'أن الرسم صار قراراً معتمداً'], correct: 0, explanation: 'المصيّر يتحقق من الصياغة؛ على المتعلم التحقق من المعنى والمصدر.' },
    ],
    criteria: [
        { id: 'plantuml-r-render', outputId: "plantuml-sample", name: 'العينة قابلة للمعاينة', description: 'لها غلاف صحيح ونوع مخطط مناسب للغرض.', evidencePrompt: 'الصق الكود في المصيّر المعتمد واذكر نتيجة التصيير.' },
        { id: 'plantuml-r-guide', outputId: "plantuml-guide", name: 'توثيق الاستخدام', description: 'يشرح README متى يستخدم PlantUML وما لا يثبته التصيير.', evidencePrompt: 'أشر إلى مثال صالح وملاحظة الفرق عن Mermaid.' }
    ],
},
{
    topicSlug: 'use-case-diagram',
    objectives: [
        { id: 'usecase-objective-boundary', text: 'تحديد حدود النظام والأدوار الخارجية وأهداف المستخدمين ضمن MVP.' },
        { id: 'usecase-objective-relations', text: 'استخدام include وextend عند وجود مسوغ سلوكي من المتطلبات.' },
    ],
    sections: [
        { heading: 'المدخل: أدوار وأهداف من PRD', body: 'كل actor خارج حدود النظام ويمثل دوراً يتفاعل معه. اكتب الهدف بصيغة نتيجة للمستخدم، لا كزر أو شاشة.' },
        { heading: 'حدود النظام', body: 'ضع الوظائف التي ينفذها النظام داخل حد مسمى. أظهر الأدوار المخولة فقط حسب PRD، ولا تفترض أن موظفاً أو خدمة خارجية موجودة.' },
        { heading: 'العلاقات ليست زخرفة', body: '`include` يعني سلوكاً مشتركاً إلزامياً في المسارات التي تشير إليه، و`extend` يضيف سلوكاً اختيارياً/شرطياً إلى use case أساسي. استخدمها فقط حين تشرح العلاقة فعلاً.' },
    ],
    practicalSteps: [
        { instruction: 'استخرج الأدوار والأهداف من PRD، وارسم حدود النظام وحالات الاستخدام بتسميات فعلية.', expectedOutput: '`docs/diagrams/use-case.puml` يحدد actors وحالات الاستخدام داخل النظام.' },
        { instruction: 'راجع كل علاقة include/extend إلى سلوك موثق واكتب شرحاً قصيراً للحدود والصلاحيات.', expectedOutput: '`docs/diagrams/use-case.md` يبرر العلاقات ويشير إلى متطلبات المصدر.' },
    ],
    workedExample: { title: 'مراجعة طلب استعارة', context: 'الطالب يطلب معدة والمسؤول يقرر القبول أو الرفض وفق سياسة المنتج.', result: 'يمكن تمثيل “تقديم طلب” و“مراجعة طلب” كهدفين لدورين. لا تستخدم include لمراجعة المسؤول في كل حالة إلا إذا أثبت PRD أن هذه خطوة إلزامية.' },
    outputs: [
        { id: 'usecase-puml', description: '`docs/diagrams/use-case.puml` يوضح actors وحالات الاستخدام وحدود النظام.' },
        { id: 'usecase-notes', description: '`docs/diagrams/use-case.md` يشرح include/extend وأساس الصلاحيات.' },
    ],
    questions: [
        { id: 'usecase-q-actor', objectiveId: 'usecase-objective-boundary', prompt: 'أين يوضع actor في مخطط use case؟', options: ['داخل قاعدة البيانات', 'خارج حد النظام ليمثل دوراً يتفاعل معه', 'داخل كل شاشة كعنصر UI', 'في مستودع Git'], correct: 1, explanation: 'Actor خارجي بالنسبة إلى النظام؛ حالة الاستخدام تصف هدفاً يقدمه النظام لذلك الدور.' },
        { id: 'usecase-q-extend', objectiveId: 'usecase-objective-relations', prompt: 'متى تبرر علاقة extend؟', options: ['كلما اشترك مساران في اسم', 'عندما يضيف سلوكاً اختيارياً أو شرطياً لحالة أساسية بمسوغ موثق', 'لإظهار ترتيب زمني دقيق دائماً', 'لإخفاء متطلب مفتوح'], correct: 1, explanation: 'extend يوضح إضافة شرطية/اختيارية؛ يجب ألا يستخدم بدلاً من شرح سلوك لم يحسم.' },
    ],
    criteria: [
        { id: 'usecase-r-boundary', outputId: "usecase-puml", name: 'الأدوار وحدود النظام', description: 'الأدوار خارج الحد والأهداف داخله ومسنودة بمتطلبات.', evidencePrompt: 'تتبع actor وحالة استخدام إلى FR/صلاحية في PRD.' },
        { id: 'usecase-r-relations', outputId: "usecase-notes", name: 'مسوغ العلاقات', description: 'include/extend لا تستعمل إلا بدلالة سلوكية واضحة.', evidencePrompt: 'اشرح علاقة واحدة بالمصدر أو اذكر لماذا لا تحتاج العينة إلى علاقة خاصة.' }
    ],
},
{
    topicSlug: 'activity-diagram',
    objectives: [
        { id: 'activity-objective-branch', text: 'تمثيل تدفق النشاط وبوابات التحقق والتفرعات ومسارات التعافي.' },
        { id: 'activity-objective-evidence', text: 'إظهار كل قرار على أساس شرط مصدره المتطلبات.' },
    ],
    sections: [
        { heading: 'المدخل: عملية لها قرار', body: 'اختر عملاً يمتد عبر خطوات، لا علاقة ساكنة بين مفاهيم. اذكر من يقوم بالفعل والشرط الذي يفتح الفرع.' },
        { heading: 'المسارات والبوابات', body: 'استخدم أسهماً متصلة وعقدة قرار مع حراس مسماة؛ اظهر النجاح والفشل والتعافي بدلاً من إسقاط الحالة غير السعيدة.' },
        { heading: 'حافظ على المصدر', body: 'يمكن رسم Mermaid flowchart TD كما في الدرس. اربط كل فرع بقاعدة في PRD/SRS، وسجل الأسئلة المفتوحة بدلاً من جعل الرسم مرجع سياسة جديداً.' },
    ],
    practicalSteps: [
        { instruction: 'اختر عملية ذات تحقق أو رفض، واكتب خطوات النظام والمستخدم بترتيبها مع تفرع واضح.', expectedOutput: '`docs/diagrams/activity-diagram.mmd` يحتوي مسارات النجاح والفشل والتعافي المدعومة.' },
        { instruction: 'أضف شرحاً نصياً للبوابات والحراس واربطها بشروط PRD/SRS.', expectedOutput: '`docs/diagrams/activity-diagram.md` يشرح القرار ومصدر كل فرع.' },
    ],
    workedExample: { title: 'التحقق من طلب', context: 'طلب يحتوي سبباً ومدة ويحتاج قرار مسؤول إذا كانت هذه قواعد معتمدة.', result: 'يفحص النظام الحقول أولاً؛ المدخل غير المقبول يعرض سبب الرفض، والمقبول يذهب إلى مراجعة المسؤول. لا يرسم مسار انتهاء تلقائي ما لم يرد في SRS.' },
    outputs: [
        { id: 'activity-doc', description: '`docs/diagrams/activity-diagram.md` يوضح السلوك والقرارات.' },
        { id: 'activity-code', description: '`docs/diagrams/activity-diagram.mmd` مخطط Mermaid يضم الفروع المدعومة.' },
    ],
    questions: [
        { id: 'activity-q-guard', objectiveId: 'activity-objective-branch', prompt: 'كيف تجعل بوابة القرار مفهومة في مخطط النشاط؟', options: ['تسمية الفروع بحراس مثل `[البيانات صالحة]` و`[غير صالحة]`', 'ترك سهمين بلا أسماء', 'إضافة متغير بيئة', 'حذف مسار الرفض'], correct: 0, explanation: 'الحراس يشرحون سبب اختيار كل فرع، ويجعلون النقاش والاختبار ممكنين.' },
        { id: 'activity-q-source', objectiveId: 'activity-objective-evidence', prompt: 'اقترح الفريق إعادة المحاولة تلقائياً بعد الخطأ، لكن المصدر لا يذكرها. كيف تمثلها؟', options: ['كقرار متفق عليه', 'كسؤال مفتوح أو تحذفها من المخطط الحالي', 'كحارس صحيح دائماً', 'في README فقط باعتبارها سلوكاً'], correct: 1, explanation: 'المخطط لا يسن قاعدة جديدة. يحتاج السلوك مصدر قرار قبل أن يدخل مساراً تنفيذياً.' },
    ],
    criteria: [
        { id: 'activity-r-paths', outputId: "activity-code", name: 'تغطية الفروع', description: 'تظهر حالات النجاح والفشل والتعافي المعتمدة مع حراس واضحة.', evidencePrompt: 'اختر قراراً واتبع كل فرع حتى يصل إلى نتيجة.' },
        { id: 'activity-r-source', outputId: "activity-doc", name: 'اتساق المصدر', description: 'كل شرط قرار مرتبط بـPRD/SRS أو موسوم كسؤال مفتوح.', evidencePrompt: 'أشر إلى مرجع كل شرط في مخططك.' }
    ],
},
{
    topicSlug: 'state-diagram',
    objectives: [
        { id: 'state-objective-life', text: 'تحديد حالات كيان ودورة حياته وانتقالاته وفق قرارات المشروع.' },
        { id: 'state-objective-transition', text: 'كتابة انتقالات ذات حدث أو حارس ومصدر دون إضافة حالات افتراضية.' },
    ],
    sections: [
        { heading: 'المدخل: كيان تتغير حالته', body: 'استخدم state diagram لشيء له حالات مستقرة وانتقالات، لا لكل خطوة عابرة في رحلة المستخدم.' },
        { heading: 'الحالات والانتقالات', body: 'سمّ الحالات المعلومة، ثم اكتب الحدث أو الشرط الذي ينقل الكيان بينها. لا تفترض أن خطأ الشبكة حالة دائمة إذا كان مجرد حدث عابر.' },
        { heading: 'المصدر يضبط دورة الحياة', body: 'استخدم `stateDiagram-v2` واربط كل حالة وانتقال بمتطلب/قاعدة في PRD. اعرض ما لم يحسم كاعتماد أو سؤال بدلاً من اختراع حالة.' },
    ],
    practicalSteps: [
        { instruction: 'اختر كيان MVP وحدد الحالات الموثقة والحدث أو الشرط الذي ينقل بينها.', expectedOutput: '`docs/diagrams/state-diagrams.mmd` دورة حياة مصدرها متطلبات المنتج.' },
        { instruction: 'اكتب شرحاً للحالات والانتقالات وبيّن أين بقيت قاعدة غير محسومة.', expectedOutput: '`docs/diagrams/state-diagrams.md` يشرح الرسم ويحفظ الأسئلة المفتوحة.' },
    ],
    workedExample: { title: 'دورة الطلب', context: 'يمكن أن يذكر PRD حالات مثل قيد المراجعة ومقبول ومرفوض.', result: 'يرسم انتقالاً من قيد المراجعة إلى إحدى النتيجتين عند قرار المسؤول. لا يضيف حالة “منتهي” أو مؤقتاً آلياً إلا إذا ورد في المصدر.' },
    outputs: [
        { id: 'state-doc', description: '`docs/diagrams/state-diagrams.md` تعريف الحالات والأحداث ومصادرها.' },
        { id: 'state-code', description: '`docs/diagrams/state-diagrams.mmd` رسم `stateDiagram-v2` للكيان المحدد.' },
    ],
    questions: [
        { id: 'state-q-event', objectiveId: 'state-objective-transition', prompt: 'ما الذي ينبغي أن يفسر سهماً بين حالتي طلب؟', options: ['حدث أو شرط معتمد يغير حالة الكيان', 'لون السهم', 'اسم الشاشة فقط', 'اقتراح مصمم'], correct: 0, explanation: 'السهم يصف انتقالاً له محفز أو شرط في سلوك النظام؛ مصدره يثبت أنه انتقال حقيقي.' },
        { id: 'state-q-unknown', objectiveId: 'state-objective-life', prompt: 'لا يحدد PRD متى ينتهي الطلب المقبول. ما الذي تفعله؟', options: ['ترسم انتهاءً تلقائياً بعد 48 ساعة', 'تسجل موعد الانتهاء كسؤال ولا تضفه انتقالاً مؤكداً', 'تحذف حالة الطلب', 'تستخدم نهاية الرسم للحسم'], correct: 1, explanation: 'معلومة غير محسومة تبقى سؤالاً؛ وجود احتمال في قصة غير معتمدة لا يثبت قاعدة منتج.' },
    ],
    criteria: [
        { id: 'state-r-lifecycle', outputId: "state-code", name: 'دورة حياة مدعومة', description: 'الحالات والانتقالات تخص كياناً ومصادرها ظاهرة.', evidencePrompt: 'اربط حالتين وسهم الانتقال بمتطلب أو قرار.' },
        { id: 'state-r-unknown', outputId: "state-doc", name: 'الغموض محفوظ', description: 'الانتقال غير المحسوم لا يظهر كقاعدة معتمدة.', evidencePrompt: 'أشر إلى سؤال مفتوح أو اعتماد مرسوم بوضوح.' }
    ],
},
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
},
{
    topicSlug: 'ui-ux-roles-navigation',
    objectives: [
        { id: 'uiux-objective-roles', text: 'تحويل أدوار PRD وصلاحياتهم إلى احتياجات وواجهات وتنقل واضح.' },
        { id: 'uiux-objective-scope', text: 'صياغة متطلبات تجربة المستخدم دون إضافة أدوار أو ميزات خارج النطاق.' },
    ],
    sections: [
        { heading: 'المدخل: دور ومهمة وصلاحية', body: 'ابدأ بأدوار PRD ثم سمّ المهمات المسموحة لكل دور. افصل ما يفعله المستخدم عما يفعله النظام وما يراه فقط.' },
        { heading: 'المعلومات والتنقل', body: 'اجمع الوجهات بحسب المهمة والعلاقة، ثم اقترح تنقلاً يتيح العثور على الخطوة التالية ويبين أين يوجد المستخدم.' },
        { heading: 'مصفوفة قبل رسم الواجهة', body: 'سجل الدور والإجراء ومرجعه وحالة الوصول. إذا غاب قرار الصلاحية، اتركه سؤالاً ولا تضف زر إدارة لكل مستخدم.' },
    ],
    practicalSteps: [
        { instruction: 'حوّل الأدوار والمهام المعتمدة إلى مصفوفة من يستطيع رؤية أو تنفيذ كل إجراء.', expectedOutput: '`docs/UI_UX_REQUIREMENTS.md` يشرح احتياجات الواجهة ومصفوفة صلاحيات الأدوار.' },
        { instruction: 'رتب الوجهات في نموذج تنقل، ثم راجع أن كل عنصر له هدف ومصدر في نطاق MVP.', expectedOutput: 'نموذج تنقل واضح يطابق متطلبات الأدوار ولا يضيف شاشة غير مطلوبة.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: طالب ومسؤول معمل', context: 'الدوران في قصة BorrowHub لهما أفعال مختلفة.', result: 'الطالب يتابع طلبه، والمسؤول يراجعه ويسجل التسليم والإرجاع. لا يظهر إجراء مسؤول المعمل للطالب لمجرد أنه يستطيع فتح الصفحة.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'uiux-requirements', description: '`docs/UI_UX_REQUIREMENTS.md` أدوار ومهام وتنقل بمصادر.' },
        { id: 'role-ui-matrix', description: 'مصفوفة الأدوار توضح الرؤية والإجراء والصلاحية.' },
    ],
    questions: [
        { id: 'uiux-q-role', objectiveId: 'uiux-objective-roles', prompt: 'كيف تحدد من يرى إجراء مراجعة الطلب؟', options: ['تطابقه مع صلاحيات الدور المعتمدة في PRD', 'تجعله متاحاً للجميع لتقليل الشاشات', 'تخمن من شكل الواجهة', 'تمنع كل الأدوار'], correct: 0, explanation: 'الواجهة تعرض الصلاحية المقررة؛ لا ينبغي أن تتجاوز أو تخترع قاعدة الوصول.' },
        { id: 'uiux-q-navigation', objectiveId: 'uiux-objective-scope', prompt: 'اقترح فريق شاشة جديدة للتوصيات لكنها ليست ضمن MVP. ما القرار الأنسب في خريطة التنقل؟', options: ['إضافتها تلقائياً لأنها تحسن التجربة', 'تأجيلها أو تسجيلها كاقتراح خارج النطاق', 'جعلها الصفحة الرئيسية', 'اعتبارها متطلباً'], correct: 1, explanation: 'التصميم يلتزم بالنطاق المعتمد؛ الأفكار الجديدة تسجل للمراجعة بدل توسيع MVP بصمت.' },
    ],
    criteria: [
        { id: 'uiux-r-permission', outputId: "role-ui-matrix", name: 'صلاحيات قابلة للتتبع', description: 'كل إجراء في المصفوفة مرتبط بدور وقرار مصدر.', evidencePrompt: 'اختر إجراءً وقارنه بمتطلب أو قرار معتمد.' },
        { id: 'uiux-r-navigation', outputId: "uiux-requirements", name: 'تنقل يطابق المهام', description: 'الوجهات تخدم الرحلات المتفق عليها ولا تضيف وظائف خارج النطاق.', evidencePrompt: 'اتبع مهمة المستخدم في نموذج التنقل حتى تصل إلى نتيجتها.' }
    ],
},
{
    topicSlug: 'ux-blueprint',
    objectives: [
        { id: 'uxbp-objective-states', text: 'توثيق الرحلات وخريطة الموقع وحالات الواجهة الأربع الأساسية لكل تجربة.' },
        { id: 'uxbp-objective-access', text: 'مراعاة الاستجابة وإمكانية الوصول في حالات النجاح والخطأ والفراغ.' },
    ],
    sections: [
        { heading: 'المدخل: مهمة ونقاط تلامس', body: 'اربط الهدف بالصفحة والمعلومات والأفعال التي يحتاجها المستخدم. امتد من بداية الرحلة إلى النتيجة والتعافي.' },
        { heading: 'حالات الواجهة والفحوص العابرة', body: 'لكل شاشة حدد حالات الواجهة الأربع: التحميل والفراغ والخطأ والنجاح. سجّل الاستجابة وإمكانية الوصول كفحصين عابرين للحالات، لا كحالتين مرئيتين للواجهة.' },
        { heading: 'التحقق', body: 'اكتب سلوكاً لكل حالة مع سبب ظهوره وكيف يتابع المستخدم. خطط لاتجاه RTL والنصوص التقنية LTR والوصول بلوحة المفاتيح.' },
    ],
    practicalSteps: [
        { instruction: 'ارسم Sitemap ورحلة MVP واربط الصفحات بالمهام والأدوار.', expectedOutput: '`docs/UX_BLUEPRINT.md` يضم خريطة الموقع ومسارات المستخدم.' },
        { instruction: 'املأ حالات التحميل والفراغ والخطأ والنجاح للشاشة، ثم أضف فحصي الاستجابة وإمكانية الوصول كمتطلبات عابرة.', expectedOutput: 'مصفوفة بأربع حالات واجهة وصفين لفحوص الاستجابة وإمكانية الوصول، مع سلوك أو دليل مطلوب لكل صف.' },
    ],
    workedExample: { title: 'قائمة معدات فارغة', context: 'تظهر شاشة المعدات قبل وجود نتائج أو عندما لا يطابق البحث شيئاً.', result: 'حالة الفراغ تشرح ما الذي يظهر الآن وتتيح العودة للمهمة أو تعديل البحث؛ لا تعرض خطأ تقنياً ولا تدعي أن النظام تعطل.' },
    outputs: [
        { id: 'ux-blueprint', description: '`docs/UX_BLUEPRINT.md` يشرح الرحلة وخريطة الموقع.' },
        { id: 'states-matrix', description: 'مصفوفة بأربع حالات واجهة وفحصي الاستجابة وإمكانية الوصول.' },
    ],
    questions: [
        { id: 'uxbp-q-empty', objectiveId: 'uxbp-objective-states', prompt: 'ما الذي يجب أن تحله حالة الفراغ عند عدم وجود معدات تطابق البحث؟', options: ['تخبر المستخدم بما حدث وتتيح إجراءً مفيداً مثل تعديل البحث', 'تظهر spinner إلى الأبد', 'تخفي الصفحة', 'تضع رسالة خطأ بلا وصف'], correct: 0, explanation: 'حالة الفراغ نتيجة صالحة تحتاج تفسيراً وخطوة متابعة؛ وهي غير حالة الخطأ.' },
        { id: 'uxbp-q-a11y', objectiveId: 'uxbp-objective-access', prompt: 'كيف تتحقق من إمكانية تشغيل الإجراء الأساسي بلوحة المفاتيح؟', options: ['تجربة ترتيب Tab والتركيز المرئي وتفعيل الإجراء دون فأرة', 'فحص لون الخلفية فقط', 'تغيير عرض الشاشة', 'افتراض أن كل div قابل للنقر'], correct: 0, explanation: 'الوصول يتطلب أن يصل المستخدم إلى التحكم ويراه ويشغله بلوحة المفاتيح.' },
    ],
    criteria: [
        { id: 'uxbp-r-states', outputId: "states-matrix", name: 'اكتمال الحالات', description: 'لكل حالة وصف وسلوك وخطوة متابعة تناسبها.', evidencePrompt: 'اختر حالة فراغ أو خطأ واتبع ما سيراه المستخدم بعدها.' },
        { id: 'uxbp-r-journey', outputId: "ux-blueprint", name: 'رحلة مفهومة وميسرة', description: 'الرحلة تغطي المهمة الأساسية والاتجاه والاستجابة والوصول.', evidencePrompt: 'اتبع رحلة مستخدم باللوحة ومن شاشة هاتف مع تسجيل أي عائق.' }
    ],
},
{
    topicSlug: 'screen-inventory',
    objectives: [
        { id: 'inventory-objective-fields', text: 'جرد شاشات النطاق بربط كل شاشة بهدف ودور وبيانات وأفعال وحالات.' },
        { id: 'inventory-objective-coverage', text: 'التحقق من تغطية المتطلبات دون إضافة شاشة لا تسندها الرحلة.' },
    ],
    sections: [
        { heading: 'المدخل: رحلة ومتطلبات', body: 'اجمع الشاشات من Sitemap والرحلات وPRD. اسأل ما الذي يجعل الشاشة ضرورية لإتمام مهمة، ولا تخلط modal أو حالة واجهة بصفحة مستقلة بلا سبب.' },
        { heading: 'حقول الجرد', body: 'لكل شاشة وثق الهدف والمسار والدور والصلاحيات والمكونات والبيانات والإجراءات وقواعد التحقق والحالات.' },
        { heading: 'تغطية من وإلى المتطلب', body: 'كل شاشة تغطي هدفاً/متطلباً، وكل متطلب يحتاج واجهة أو سبباً لعدم وجودها. لا تنسخ عناصر غير مؤكدة من قائمة أفكار.' },
    ],
    practicalSteps: [
        { instruction: 'احصر الشاشات اللازمة لرحلة MVP واملأ حقول الهدف والدور والبيانات والإجراءات والتحقق.', expectedOutput: '`docs/SCREEN_INVENTORY.md` يحتوي جدول جرد بأصحاب الصلاحيات ومصادرها.' },
        { instruction: 'اربط معرفات المتطلبات بالشاشات وراجع العناصر بلا رابط أو المتطلبات بلا تغطية.', expectedOutput: 'مصفوفة تتبع متطلبات إلى شاشات مع قرارات واضحة للنواقص.' },
    ],
    workedExample: { title: 'شاشة مراجعة المسؤول', context: 'قصة المشروع تحدد مسؤولاً يراجع طلب استعارة.', result: 'يصف الجرد الهدف والدور والبيانات المطلوبة وإجراء قبول/رفض والنتيجة، مع ربطها بالمتطلب. لا يضيف لوحة إحصاءات ما لم يطلبها النطاق.' },
    outputs: [
        { id: 'screen-inventory', description: '`docs/SCREEN_INVENTORY.md` يضم جدول الشاشات بالحقول المطلوبة.' },
        { id: 'screen-traceability', description: 'مصفوفة تربط الشاشات بمتطلبات PRD وتظهر أي نقص.' },
    ],
    questions: [
        { id: 'inventory-q-coverage', objectiveId: 'inventory-objective-coverage', prompt: 'وجدت متطلباً معتمداً بلا أي شاشة أو تفسير للمسار. ماذا يعني؟', options: ['يوجد نقص في التغطية أو قرار واجهة يحتاج توثيقاً', 'نضيف شاشة كيفما اتفق', 'نحذف المتطلب', 'لا يحتاج مراجعة'], correct: 0, explanation: 'الجرد يكشف فجوة بين المتطلبات والتجربة؛ لا يحسمها بإضافة صفحة غير مصممة.' },
        { id: 'inventory-q-fields', objectiveId: 'inventory-objective-fields', prompt: 'أي صف في الجرد أكثر فائدة للمراجعة؟', options: ['اسم الشاشة فقط', 'اسم وهدف ودور ومصدر بيانات وإجراءات وحالات', 'لونها المتوقع', 'عدد المكونات دون سلوك'], correct: 1, explanation: 'الجرد يربط المسار بالمستخدم والبيانات والسلوك، كي يمكن مراجعته مقابل المتطلب.' },
    ],
    criteria: [
        { id: 'inventory-r-detail', outputId: "screen-inventory", name: 'اكتمال تفاصيل الشاشة', description: 'كل شاشة تذكر هدفها ودورها ومسارها والبيانات والإجراءات والتحقق.', evidencePrompt: 'اختر شاشة وراجع حقول الجرد المطلوبة واحدة واحدة.' },
        { id: 'inventory-r-trace', outputId: "screen-traceability", name: 'تغطية النطاق', description: 'الروابط من المتطلب إلى شاشة واضحة ولا توجد شاشة خارج النطاق بلا سبب.', evidencePrompt: 'تتبع متطلباً وشاشة في الاتجاهين.' }
    ],
},
{
    topicSlug: 'stitch-reference-screen',
    objectives: [
        { id: 'stitchref-objective-prompt', text: 'صياغة برومبت لشاشة مرجعية واحدة تمثل المهمة والهوية والاتجاه.' },
        { id: 'stitchref-objective-evidence', text: 'توثيق ما اعتمد وما بقي غير معروف دون اختلاق مواصفات التصميم.' },
    ],
    sections: [
        { heading: 'المدخل: شاشة ممثلة لا كل التطبيق', body: 'اختر شاشة أساسية وأرفق دورها وبياناتها وحالاتها من المتطلبات. الشاشة المرجعية تحسم لغة بصرية أولية قبل بقية الشاشات.' },
        { heading: 'برومبت يحافظ على الدليل', body: 'اذكر المهمة والمستخدم والاتجاه RTL والمعلومات والمكونات والنبرة. لا تطلب من الأداة اختراع حقيقة عن منتج أو لون من مرجع لم تقدمه.' },
        { heading: 'توثيق الحالة', body: 'احفظ البرومبت ورابط/معرف الشاشة إذا أنشئت، وصنّفها مقترحاً أو معتمدة بعد قرار حقيقي. لا تستبدل نموذج الواجهة بمصدر المتطلبات.' },
    ],
    practicalSteps: [
        { instruction: 'اختر شاشة من Screen Inventory واكتب برومبت Stitch يصف مهمة المستخدم والأدوار والمحتوى والاتجاه.', expectedOutput: '`docs/STITCH_MASTER_PROMPT.md` يضم برومبت الشاشة المرجعية ومصدر مواصفاتها.' },
        { instruction: 'سجل نتيجة التصميم أو تعذر إنشائها، وميّز قيم التصميم المؤكدة من المقترحة والمجهولة.', expectedOutput: 'رابط أو معرف للشاشة إذا وُجد، مع حالة مراجعة لا توحي باعتماد غير حاصل.' },
    ],
    workedExample: { title: 'شاشة طلب معدات RTL', context: 'الجرد يصف صفحة يختار فيها الطالب معدة ويرسل سبباً ومدة.', result: 'يطلب البرومبت ترتيباً من اليمين لليسار وحقولاً مسماة وملاحظات استجابة، ويترك قيمة اللون UNKNOWN حتى تأتي من دليل هوية معتمد.' },
    outputs: [
        { id: 'stitch-prompt', description: '`docs/STITCH_MASTER_PROMPT.md` برومبت مصدره متطلبات شاشة محددة.' },
        { id: 'reference-screen', description: 'شاشة في Stitch عند إنشائها، ورابط وحالة مراجعتها الفعلية.' },
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
        { id: 'designrules-objective-tokens', text: 'استخراج قواعد ورموز تصميم من الشاشة المرجعية المعتمدة.' },
        { id: 'designrules-objective-consistency', text: 'إنشاء برومبتات مستقلة للشاشات تستخدم النظام نفسه ولا تخترع قيماً.' },
    ],
    sections: [
        { heading: 'المدخل: دليل معتمد قابل للفحص', body: 'استخدم الشاشة المرجعية وحالتها وملاحظات فحصها. إن لم تتوفر قيمة فعلية فلا تستنتج لوناً أو مسافة من الذاكرة.' },
        { heading: 'نظام تصميم مصدره واضح', body: 'سجل اللون أو الخط أو المقياس ومصدره وشاشة ظهوره وحالة الثقة. افصل توكن معتمد عن مقترح يحتاج قراراً.' },
        { heading: 'برومبتات الشاشات', body: 'اكتب برومبتاً لكل شاشة من الرحلة، واطلب إعادة استخدام التوكنز المعتمدة. لا تكتب كوداً في مرحلة التصميم ولا تجعل البرومبت يضيف شاشة أو ميزة.' },
    ],
    practicalSteps: [
        { instruction: 'استخرج قيماً قابلة للتأكيد من الشاشة المرجعية وسجل المصدر أو ضع UNKNOWN.', expectedOutput: 'ملاحظات Design System تبين القيمة ودليلها وحالة الثقة.' },
        { instruction: 'اكتب برومبتاً مستقلاً لكل شاشة في النطاق واربطه بالتوكنز والهدف المحددين.', expectedOutput: '`docs/STITCH_SCREEN_PROMPTS.md` برومبتات تحافظ على وحدة التصميم.' },
    ],
    workedExample: { title: 'توحيد زر الإجراء', context: 'الشاشة المرجعية فيها زر رئيسي يمكن فحص لونه وحجمه.', result: 'يسجل التوثيق القيمة إذا ظهرت في Stitch/inspect مع المصدر؛ وإذا لم يمكن فحصها يسجل UNKNOWN، ثم يطلب البرومبت إعادة استعمال الرمز المؤكد لا اختراع قيمة أخرى.' },
    outputs: [
        { id: 'screen-prompts', description: '`docs/STITCH_SCREEN_PROMPTS.md` برومبت لكل شاشة مرتبط بمهمتها.' },
        { id: 'design-system-evidence', description: 'شاشات أو قيود مرئية في Stitch مع توكنز ومصادرها.' },
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
        { heading: 'المدخل: شاشات وقرار تفاعل', body: 'ابدأ من شاشات Stitch والرحلات والصلاحيات؛ النموذج يحاكي مساراً ولا ينفذ backend.' },
        { heading: 'الروابط والأزرار', body: 'اربط كل نقطة فعل بالوجهة أو الحالة المتوقعة. اختبر النجاح والرفض والتراجع، ولا تترك زرّاً شكلياً بلا نتيجة واضحة.' },
        { heading: 'تدقيق يحدد حدوده', body: 'وثق ما جربته في `docs/PROTOTYPE_JOURNEYS_AUDIT.md`. نجاح التفاعل النموذجي لا يثبت أن النظام البرمجي جاهز أو أن صلاحياته منفذة.' },
    ],
    practicalSteps: [
        { instruction: 'اربط شاشات المسار المعتمد في Stitch وحرك الإجراء الأساسي حتى النتيجة.', expectedOutput: 'نموذج تفاعلي له رحلات فعلية، وليس صوراً ثابتة أو أزراراً بلا استجابة.' },
        { instruction: 'اختبر المسار السعيد والرفض والتراجع وصلاحيات الأدوار، وسجل كل نتيجة وخلل.', expectedOutput: '`docs/PROTOTYPE_JOURNEYS_AUDIT.md` بنتائج قابلة لإعادة الفحص.' },
    ],
    workedExample: { title: 'إرسال طلب ثم رفضه', context: 'رحلة الطالب تعرض نموذج طلب ثم رد المسؤول.', result: 'يتحرك النموذج من النموذج إلى ملخص الطلب ثم شاشة الرفض مع سبب ظاهر إذا كانت هذه الشاشات جزءاً من المرجع. لا يوحي النموذج بأن الاتصال أو الحفظ الفعلي قد نُفذ.' },
    outputs: [
        { id: 'prototype', description: 'Prototype في Stitch يربط الشاشات بخطوات وتفاعلات.' },
        { id: 'prototype-audit', description: '`docs/PROTOTYPE_JOURNEYS_AUDIT.md` نتائج فحص الرحلات والحالات.' },
    ],
    questions: [
        { id: 'prototype-q-functional', objectiveId: 'prototype-objective-journey', prompt: 'ما الفرق بين Prototype متصل وصورة واجهة؟', options: ['Prototype يتيح تتبع التفاعلات والنتائج المتوقعة؛ الصورة لا تختبرها', 'الصورة تثبت أن backend يعمل', 'Prototype يعني أن الكود الإنتاجي اكتمل', 'كلاهما لا يحتاج توثيق'], correct: 0, explanation: 'النموذج يسمح باختبار سلوك الواجهة ومساراتها، لكنه لا يثبت التنفيذ البرمجي أو البيانات الفعلية.' },
        { id: 'prototype-q-audit', objectiveId: 'prototype-objective-audit', prompt: 'ما الذي يجب أن يتضمنه تدقيق رحلة Prototype؟', options: ['النجاح والرفض والرجوع والصلاحيات ونتائجها', 'الشاشة الرئيسية وحدها', 'رأي عام بلا خطوات', 'ألوان دون تفاعل'], correct: 0, explanation: 'تدقيق الرحلة يكشف ما يحدث في المسارات البديلة ويجعل التفاعل قابلاً لإعادة التجربة.' },
    ],
    criteria: [
        { id: 'prototype-r-interaction', outputId: "prototype", name: 'تفاعلات قابلة للتجربة', description: 'الإجراء الأساسي يقود إلى نتيجة مفهومة عبر الشاشات.', evidencePrompt: 'جرّب المسار وأظهر كيف ينتقل من الفعل إلى النتيجة.' },
        { id: 'prototype-r-audit', outputId: "prototype-audit", name: 'تدقيق متوازن', description: 'يسجل التدقيق مساري النجاح والفشل والتراجع والصلاحيات.', evidencePrompt: 'أشر إلى حالة بديلة سجلت نتيجتها وما بقي يحتاج تصحيحاً.' }
    ],
},
{
    topicSlug: 'ai-coding-agent',
    objectives: [
        { id: 'agent-objective-context', text: 'تهيئة وكيل البرمجة بسياق ملفات وقواعد المشروع وحدود المهام.' },
        { id: 'agent-objective-safety', text: 'حماية الأسرار والتحقق من صلاحيات الأوامر والمخرجات قبل التنفيذ.' },
    ],
    sections: [
        { heading: 'المدخل: مستودع وقواعد مكتوبة', body: 'وفر ملفات السياق مثل PRD وDESIGN.md والقواعد ذات الصلة. اطلب مهمة صغيرة ذات مخرج يمكن مراجعته.' },
        { heading: 'حدود التفويض', body: 'اختر أقل صلاحية وأدوات لازمة، واطلب خطة أو فرقاً قبل أوامر حذف أو نشر. راجع الملفات التي قرأها والملفات التي سيغيرها.' },
        { heading: 'الأسرار ليست سياقاً عاماً', body: 'ضع المتغيرات السرية في مكان محلي مستبعد من Git، واستخدم `.env.example` بأسماء وقيم placeholder. لا تطبع المفاتيح في السجل أو المحادثة.' },
    ],
    practicalSteps: [
        { instruction: 'اكتب إعداد الوكيل: سياق الملفات، قواعد الجودة، نطاق الصلاحية، والأوامر المسموحة والمراجعة المطلوبة.', expectedOutput: '`docs/CODING_AGENT_SETUP.md` يشرح إعداداً لا يعتمد على وكيل مدفوع بعينه.' },
        { instruction: 'راجع ملفات البيئة والتجاهل دون كشف أي قيمة سرية، ثم سجل استعادة/تراجع آمنة.', expectedOutput: '`.env.example` بلا أسرار و`.gitignore` يحمي الملفات المحلية.' },
    ],
    workedExample: { title: 'مهمة مراجعة وثائق', context: 'يطلب مطور من وكيل تلخيص تضارب بين PRD وSRS.', result: 'يقرأ الوكيل الملفين ويقدم مواقع الاختلاف ومقترحاً للمراجعة فقط؛ لا يحرر كل النظام ولا يطبع قيمة من `.env.local`.' },
    outputs: [
        { id: 'agent-setup', description: '`docs/CODING_AGENT_SETUP.md` السياق والحدود والخطوات.' },
        { id: 'safe-env', description: '`.env.example` و`.gitignore` مع أسماء عامة ومنع تتبع الأسرار.' },
    ],
    questions: [
        { id: 'agent-q-secret', objectiveId: 'agent-objective-safety', prompt: 'ما القيمة الصحيحة في ملف `.env.example` الملتزم بالمستودع؟', options: ['مفتاح API الحقيقي', 'اسم المتغير مع placeholder واضح، لا سر فعلي', 'نسخة من متغير الإنتاج', 'كلمة مرور المطور'], correct: 1, explanation: 'ملف المثال يوضح أسماء الإعدادات دون كشف اعتماد فعلي.' },
        { id: 'agent-q-scope', objectiveId: 'agent-objective-context', prompt: 'أي طلب يعطي الوكيل عملاً يمكن مراجعته بأمان؟', options: ['أعد كتابة التطبيق كله وارفعه إلى الإنتاج', 'راجع ملفين محددين واعرض فرقاً مقترحاً دون نشر', 'احذف أي ملف قديم', 'غيّر كل الإعدادات تلقائياً'], correct: 1, explanation: 'النطاق المحدد والمخرج القابل للمراجعة يقللان الأثر ويكشفان هل فهم الوكيل المطلوب.' },
    ],
    criteria: [
        { id: 'agent-r-boundary', outputId: "agent-setup", name: 'حدود المهمة', description: 'الإعداد يحدد السياق والأذونات والمراجعة ومتى يتوقف الوكيل.', evidencePrompt: 'أشر إلى بند يطلب خطة أو مراجعة قبل أثر غير قابل للرجوع.' },
        { id: 'agent-r-secret', outputId: "safe-env", name: 'عزل الأسرار', description: 'ملف المثال لا يحمل سرّاً حقيقياً والملفات المحلية مستبعدة.', evidencePrompt: 'افحص أسماء الملفات وقواعد `.gitignore` دون طباعة أي قيمة سرية.' }
    ],
},
{
    topicSlug: 'google-ai-studio',
    objectives: [
        { id: 'aistudio-objective-test', text: 'إجراء تجربة نموذج موثقة مع تعليمات ومدخلات ومخرجات قابلة للمراجعة.' },
        { id: 'aistudio-objective-data', text: 'إنتاج بيانات تمثيلية JSON تطابق ERD دون خلطها ببيانات مستخدمين حقيقية.' },
    ],
    sections: [
        { heading: 'المدخل: مخطط وهدف تجربة', body: 'ابدأ من ERD وحدد السؤال الذي تختبره. سجل model/tool selection والتاريخ في وثيقتك لأن تفاصيل المنتج والخطط تتغير.' },
        { heading: 'Mock data لا بيانات حقيقية', body: 'استخدم أسماء وقيم اصطناعية ولا تضع معلومات شخصية أو أسراراً. تحقق من JSON ومفاتيحه وعلاقاته مقابل ERD.' },
        { heading: 'مفتاح API منفصل', body: 'إذا جربت API، خزن المفتاح محلياً خارج Git، وضع الاسم فقط في `.env.example`. لا تضع المفتاح داخل prompt أو سجل النتائج.' },
    ],
    practicalSteps: [
        { instruction: 'سجل الهدف والتعليمات والنموذج والإعدادات المرئية والنتيجة التي تريد اختبارها.', expectedOutput: '`docs/AI_STUDIO_WORKFLOW.md` يحفظ خطوات قابلة للتكرار دون قيمة مفتاح.' },
        { instruction: 'اطلب بيانات اصطناعية قليلة وافحص JSON ثم قارن كل حقل وعلاقة بERD.', expectedOutput: '`src/data/mock-data.json` بيانات اختبارية متوافقة وموسومة بأنها غير حقيقية.' },
    ],
    workedExample: { title: 'بيانات استعارة اصطناعية', context: 'ERD يتضمن طالباً ومعدة وطلباً مع مفاتيح مرجعية.', result: 'ثلاث سجلات بأسماء وهمية وقيم معرّفات متطابقة بين الطلب والطرفين؛ لا توجد بيانات شخصية أو قاعدة جديدة غير موجودة في ERD.' },
    outputs: [
        { id: 'studio-workflow', description: '`docs/AI_STUDIO_WORKFLOW.md` غرض التجربة وإعداداتها والنتيجة.' },
        { id: 'mock-data', description: '`src/data/mock-data.json` بيانات اصطناعية صالحة ومتوافقة مع ERD.' },
    ],
    questions: [
        { id: 'aistudio-q-data', objectiveId: 'aistudio-objective-data', prompt: 'أعاد النموذج JSON صالح النحو لكنه يستخدم حقل `pickup_deadline` غير موجود في ERD. ما النتيجة؟', options: ['البيانات متوافقة لأنها JSON صالح', 'تحتاج مطابقة المخطط؛ صحة النحو لا تثبت مطابقة النموذج', 'نضيف الحقل إلى الإنتاج تلقائياً', 'نستخدم بيانات حقيقية'], correct: 1, explanation: 'يجب التحقق من البنية والحقول والعلاقات مقابل المصدر، لا من قابلية تحليل JSON وحدها.' },
        { id: 'aistudio-q-key', objectiveId: 'aistudio-objective-test', prompt: 'أين توثق API key في سير العمل التعليمي؟', options: ['في المستودع كي يتكرر الاختبار', 'تذكر طريقة الإعداد واسم المتغير دون نشر القيمة السرية', 'في سجل المخرجات', 'داخل بيانات mock'], correct: 1, explanation: 'إمكانية التكرار لا تبرر كشف السر؛ وثق selector/الإعداد دون القيمة.' },
    ],
    criteria: [
        { id: 'aistudio-r-repro', outputId: "studio-workflow", name: 'تجربة قابلة للتفسير', description: 'الهدف والتعليمات والإعدادات والنتيجة موثقة بما يكفي للفهم.', evidencePrompt: 'أعد وصف التجربة دون قراءة سر أو اعتماد على ذاكرة غير مكتوبة.' },
        { id: 'aistudio-r-schema', outputId: "mock-data", name: 'مطابقة البيانات للمخطط', description: 'JSON قابل للقراءة وحقوله وعلاقاته تطابق ERD والبيانات اصطناعية.', evidencePrompt: 'تحقق من مفاتيح وعلاقة واحدة مقابل ERD.' }
    ],
},
{
    topicSlug: 'agent-skills',
    objectives: [
        { id: 'skills-objective-instructions', text: 'كتابة Skill صغيرة توجه الوكيل إلى معايير المشروع ونتيجة قابلة للمراجعة.' },
        { id: 'skills-objective-selection', text: 'اختيار المهارة ذات الصلة فقط كي لا يثقل السياق بقواعد غير لازمة.' },
    ],
    sections: [
        { heading: 'المدخل: قاعدة متكررة قابلة لإعادة الاستخدام', body: 'اختر إرشاداً يتكرر في مهام متعددة مثل RTL أو سياسات الاختبار؛ لا تنقل كل وثائق المشروع إلى Skill.' },
        { heading: 'تعليمات وإشارة استخدام', body: 'حدد متى تُستخدم المهارة، ما المدخلات التي تحتاجها، القواعد الإلزامية، وما الذي يجب أن يعيده الوكيل أو يتحقق منه.' },
        { heading: 'فعّل عند الحاجة', body: 'اجعل أسماء ومجالات المهارات واضحة. فعّلها للمهمة المناسبة ولا تفترض أن الوكيل قرأ كل المهارات أو أن وجود الملف يعني امتثالاً.' },
    ],
    practicalSteps: [
        { instruction: 'اكتب وصف المهارة ومعايير الواجهة أو المشروع ونطاق المهام التي تغطيها.', expectedOutput: '`docs/PROJECT_AGENT_SKILLS.md` يشرح المهارات ومتى يستدعي كل منها.' },
        { instruction: 'أضف Skill فرعية للمعايير الأكثر تكراراً واختبرها بطلب صغير يقتضي القاعدة.', expectedOutput: '`docs/skills/frontend-standards.md` يتضمن تعليمات قابلة للمراجعة لا سيرة عامة.' },
    ],
    workedExample: { title: 'معايير واجهة RTL', context: 'الفريق يكرر طلب واجهات Next.js عربية بأزرار قابلة للوحة المفاتيح.', result: 'Skill قصيرة تحدد تشغيل RTL للنص العربي وإبقاء الكود LTR وفحص التركيز المرئي. لا تحمل تفاصيل سياسة بيانات الخلفية إلى مهمة CSS.' },
    outputs: [
        { id: 'skill-index', description: '`docs/PROJECT_AGENT_SKILLS.md` فهرس يشرح نطاق واستدعاء كل مهارة.' },
        { id: 'frontend-skill', description: '`docs/skills/frontend-standards.md` قواعد مشروع محددة مع تحقق مقترح.' },
    ],
    questions: [
        { id: 'skills-q-scope', objectiveId: 'skills-objective-selection', prompt: 'طلب المهمة متعلق بمخطط PostgreSQL، لكن Skill الوحيدة لديك تخص CSS. ماذا تفعل؟', options: ['تحملها رغم عدم الصلة', 'تختار إرشادات قاعدة البيانات المناسبة أو تنفذ دون Skill غير ملائمة', 'تطلب من Skill تعديل ألوان المخطط', 'تدمج كل المهارات في prompt'], correct: 1, explanation: 'تفعيل المهارات بحسب الحاجة يقلل الضوضاء ويمنع تحميل توجيهات لا تخص المهمة.' },
        { id: 'skills-q-test', objectiveId: 'skills-objective-instructions', prompt: 'كيف تعرف أن Skill مفيدة وقابلة للتطبيق؟', options: ['اسمها يبدو احترافياً', 'لها مشغل واضح ومدخلات وقواعد ومخرج يمكن فحصه بطلب صغير', 'طويلة جداً', 'تحتوي كل الملفات'], correct: 1, explanation: 'نطاق الاستخدام والمخرجات القابلة للتحقق هي ما يسمح بتقييم التعليمات.' },
    ],
    criteria: [
        { id: 'skills-r-trigger', outputId: "skill-index", name: 'متى تستخدم المهارة', description: 'كل Skill لها مهمة ونطاق واضحان ولا تحمل كل سياق المشروع.', evidencePrompt: 'اقرأ وصفاً وحدد نوع الطلب الذي يشغّلها.' },
        { id: 'skills-r-output', outputId: "frontend-skill", name: 'قواعد قابلة للتحقق', description: 'التعليمات لها مخرج أو فحص يمكن للمراجع ملاحظته.', evidencePrompt: 'نفذ مثالاً صغيراً وأشر إلى القاعدة ونتيجتها.' }
    ],
},
{
    topicSlug: 'mcp-protocol',
    objectives: [
        { id: 'mcp-objective-roles', text: 'شرح أدوار host وclient وserver والعلاقة بينها في اتصال MCP.' },
        { id: 'mcp-objective-safety', text: 'تحديد أدوات الخادم وصلاحياته ومصادر الأسرار قبل توصيله بالوكيل.' },
    ],
    sections: [
        { heading: 'المدخل: حاجة لتكامل محدد', body: 'حدد ما الذي يحتاجه الوكيل قبل إضافة خادم MCP. لا تضف الخادم لمجرد أن البروتوكول متاح.' },
        { heading: 'الأدوار والرسائل', body: 'Host يضم تجربة الوكيل، client يتولى اتصال MCP، وserver يعرض أدوات أو موارد أو prompts. يكتشف المضيف ما يتيحه الخادم ويتفاعل معه بحسب الإعداد.' },
        { heading: 'الأمان محلي أولاً', body: 'راجع العمليات والأذونات والمصادر قبل التشغيل، واحفظ الاعتمادات محلياً خارج Git. استخدم خادماً تجريبياً محدوداً وتجنب منح صلاحيات كتابة غير ضرورية.' },
    ],
    practicalSteps: [
        { instruction: 'ارسم مكونات MCP المطلوبة لتكامل تجريبي واكتب تبادل الأدوار والقدرات التي تحتاجها فقط.', expectedOutput: '`docs/MCP_FOUNDATIONS.md` يشرح host/client/server والقدرات المطلوبة.' },
        { instruction: 'اكتب إعداداً نموذجياً بلا أسرار حقيقية مع قائمة صلاحيات ونطاق ومخاطر.', expectedOutput: 'نموذج config محلي بعناصر placeholder وملاحظة أنه لا يرفع للمستودع.' },
    ],
    workedExample: { title: 'قراءة شاشة تصميم', context: 'مضيف الوكيل يحتاج قراءة معرفات شاشات من خادم تصميم.', result: 'الـhost يدير الواجهة، والـclient يتصل بالخادم، والخادم يعرض أدوات قراءة محددة. يمنح الوكيل صلاحية القراءة فقط إن كانت كافية للمهمة.' },
    outputs: [
        { id: 'mcp-foundations', description: '`docs/MCP_FOUNDATIONS.md` تعريف الأدوار والقدرات ومسار الاتصال.' },
        { id: 'mcp-config', description: 'نموذج config بلا أسرار يبين الأذونات المطلوبة ومصدرها.' },
    ],
    questions: [
        { id: 'mcp-q-roles', objectiveId: 'mcp-objective-roles', prompt: 'أي وصف يميز أطراف اتصال MCP؟', options: ['Host يضم الوكيل، client يتصل، server يعرض قدرات', 'Server هو المتصفح دائماً', 'Client هو قاعدة البيانات فقط', 'الأدوار أسماء لنفس العملية'], correct: 0, explanation: 'توزيع الأدوار يساعد على فهم أين تعمل التجربة وأين ينفذ الاتصال وأين تعرض الأدوات أو الموارد.' },
        { id: 'mcp-q-scope', objectiveId: 'mcp-objective-safety', prompt: 'مهمة القراءة لا تحتاج أي تعديل. أي صلاحية تراجع أولاً؟', options: ['منح كتابة عامة لكل الأدوات', 'اختيار قدرة القراءة المحددة وتقليل الأذونات', 'نسخ المفتاح إلى prompt', 'تفعيل كل خادم في الجهاز'], correct: 1, explanation: 'تحديد الحاجة وأقل صلاحية لازمة يحدان من أثر التكامل.' },
    ],
    criteria: [
        { id: 'mcp-r-roles', outputId: "mcp-foundations", name: 'تمييز الأدوار', description: 'الوثيقة تشرح host وclient وserver وقدرات كل طرف.', evidencePrompt: 'تتبع طلباً واحداً من الوكيل إلى الخادم والعودة.' },
        { id: 'mcp-r-permissions', outputId: "mcp-config", name: 'نطاق وصلاحيات', description: 'الإعداد بلا سر فعلي والصلاحية متناسبة مع المهمة.', evidencePrompt: 'أظهر placeholder وسجل القدرة والصلاحية المختارة.' }
    ],
},
{
    topicSlug: 'stitch-mcp-integration',
    objectives: [
        { id: 'stitchmcp-objective-connect', text: 'التحقق من اتصال Stitch MCP قراءةً فقط بعد وجود مشروع وشاشة معتمدة.' },
        { id: 'stitchmcp-objective-fallback', text: 'توفير مسار يدوي عند غياب الاتصال وعدم كشف المفتاح.' },
    ],
    sections: [
        { heading: 'المدخل: أصول تصميم موجودة', body: 'هذا التكامل يأتي بعد تصميم شاشة مرجعية وفهم MCP. لا تنشئ أو تغير تصميمات قبل التحقق من المشروع والشاشات.' },
        { heading: 'ربط القراءة بأمان', body: 'استخدم إعداداً محلياً ومفتاحاً خارج المستودع. اطلب قائمة المشاريع ومعرفات الشاشات فقط ولا تطلب إخراج المفتاح.' },
        { heading: 'بديل يدوي كامل', body: 'عند غياب الاتصال، صدّر المرجع أو دوّن القيم التي يمكن فحصها ومصدرها في `docs/STITCH_SCREEN_REFERENCES.md`. سجل UNKNOWN لما لا يمكن التحقق منه.' },
    ],
    practicalSteps: [
        { instruction: 'تحقق من إعداد MCP ومشروع Stitch والشاشة المقصودة بطلب قراءة فقط، ولا تسمح بأي تعديل.', expectedOutput: '`docs/mcp/stitch-connection.md` يسجل المشروع والشاشات التي أمكن قراءتها ونتيجة الاتصال.' },
        { instruction: 'إذا تعذر الاتصال، وثق خطوات الفحص اليدوي والقيم المصدرية والمجهولة.', expectedOutput: '`docs/STITCH_SCREEN_REFERENCES.md` يتضمن رابطاً/معرفاً أو نتيجة غياب موثقة ومساراً يدوياً.' },
    ],
    workedExample: { title: 'استخراج مرجع شاشة', context: 'الشاشة المرجعية جاهزة في Stitch لكن خادم MCP غير متصل على جهاز المتعلم.', result: 'يستخدم المتعلم تصدير الشاشة وفحصها يدوياً؛ يسجل الألوان التي يستطيع إثباتها، ويكتب UNKNOWN للباقي، ولا يزعم أن التكامل نجح.' },
    outputs: [
        { id: 'stitch-reference', description: '`docs/STITCH_SCREEN_REFERENCES.md` بيانات شاشة مع مصدر وحالة التحقق.' },
        { id: 'stitch-connection', description: '`docs/mcp/stitch-connection.md` نتيجة الاتصال وخطوات البديل اليدوي.' },
    ],
    questions: [
        { id: 'stitchmcp-q-scope', objectiveId: 'stitchmcp-objective-connect', prompt: 'ما الطلب الآمن الأول للتحقق من الخادم؟', options: ['قراءة المشاريع ومعرفات الشاشات المقصودة دون تعديل أو كشف أسرار', 'إنشاء شاشات تلقائياً', 'طباعة API key للتأكد', 'حذف مشروع تجريبي'], correct: 0, explanation: 'فحص القراءة يؤكد الاتصال والهدف مع تقليل التغيير ومخاطر كشف الأسرار.' },
        { id: 'stitchmcp-q-fallback', objectiveId: 'stitchmcp-objective-fallback', prompt: 'ما الذي تسجله عندما لا تستطيع فحص لون في المرجع؟', options: ['قيمة متوقعة من صورة مشابهة', 'UNKNOWN وسبب تعذر التحقق', 'قيمة random', 'لون default للمتصفح'], correct: 1, explanation: 'المجهول يجب أن يبقى واضحاً حتى لا يتحول التخمين إلى قاعدة تصميم.' },
    ],
    criteria: [
        { id: 'stitchmcp-r-readonly', outputId: "stitch-connection", name: 'فحص اتصال قراءة فقط', description: 'الطلب يحدد المشروع والشاشات ولا يغيرها ولا يكشف السر.', evidencePrompt: 'أظهر نص الطلب وسجل نتيجة الاتصال دون أي قيمة سرية.' },
        { id: 'stitchmcp-r-fallback', outputId: "stitch-reference", name: 'بديل يدوي قابل للمتابعة', description: 'القيم موثقة بمصادرها والمجهول موسوم.', evidencePrompt: 'اختر قيمة ومصدرها ثم قيمة UNKNOWN وسببها.' }
    ],
},
{
    topicSlug: 'design-md-spec',
    objectives: [
        { id: 'designmd-objective-spec', text: 'كتابة DESIGN.md من هوية وقيم تصميم يمكن تأكيدها في مصادر معتمدة.' },
        { id: 'designmd-objective-trace', text: 'ربط كل token بالشاشة والمصدر والثقة وترك غير المتاح مجهولاً.' },
    ],
    sections: [
        { heading: 'المدخل: دليل مصمم أو شاشة', body: 'استخدم الشاشة المرجعية وتصديرها وملاحظات الفحص. لا تختر هوية جديدة إذا كان المطلوب توثيق الهوية الموجودة.' },
        { heading: 'العقد لا التخمين', body: 'وثق الألوان والخطوط والمسافات والحواف والمكونات مع المصدر والشاشة والثقة. اكتب UNKNOWN وسبب النقص إذا لم يمكن قراءة قيمة.' },
        { heading: 'يفصل الرمز عن المتطلب', body: 'DESIGN.md يصف قواعد الواجهة؛ لا يغير أدوار أو رحلات PRD. استخدمه في التنفيذ للمطابقة ثم حدثه فقط حين يظهر قرار تصميم جديد قابل للإثبات.' },
    ],
    practicalSteps: [
        { instruction: 'اجمع القيم المؤكدة من مراجع Stitch وسجل مصادرها وشاشاتها، واترك أي قيمة غير قابلة للفحص UNKNOWN.', expectedOutput: '`docs/DESIGN_TOKENS.md` جدول قيم ومصادر وحالة ثقة.' },
        { instruction: 'اكتب قواعد التصميم ومكونات الواجهة التي يسندها الدليل ثم راجع اتساقها مع المرجع وPRD.', expectedOutput: '`DESIGN.md` عقد تصميم يمكن للوكيل تطبيقه دون تخمين.' },
    ],
    workedExample: { title: 'توثيق لون رئيسي', context: 'فاحص Stitch يعرض لون زر أساسي من الشاشة المرجعية.', result: 'يكتب DESIGN.md قيمة اللون مع رابط الشاشة واسم token. إذا لم يظهر مصدر القيمة، يحتفظ الجدول بـUNKNOWN ولا يخترع hex.' },
    outputs: [
        { id: 'design-md', description: '`DESIGN.md` قواعد تصميم مستندة إلى مصادر فعلية.' },
        { id: 'design-tokens', description: '`docs/DESIGN_TOKENS.md` اسم وقيمة ومصدر شاشة وثقة أو UNKNOWN.' },
    ],
    questions: [
        { id: 'designmd-q-unknown', objectiveId: 'designmd-objective-trace', prompt: 'ما الاستجابة الصحيحة إذا لم يمكن التأكد من مسافة بين مكونين؟', options: ['كتابة 16px لأنها شائعة', 'تسجيل UNKNOWN وسبب نقص الدليل', 'نسخ قيمة من موقع آخر', 'حذف مصدر الشاشة'], correct: 1, explanation: 'القيمة غير المدعومة لا يجب أن تظهر كحقيقة. يوضح UNKNOWN ما يجب فحصه قبل التنفيذ.' },
        { id: 'designmd-q-role', objectiveId: 'designmd-objective-spec', prompt: 'ما الذي لا ينبغي أن يقرره DESIGN.md؟', options: ['توكن لون له مصدر', 'نمط خط موثق', 'صلاحيات المستخدمين أو نطاق المنتج بدلاً من PRD', 'مسافات قابلة للفحص'], correct: 2, explanation: 'وثيقة التصميم تصف المظهر وقواعد الواجهة؛ متطلبات الأدوار والوظائف لها مصدر منفصل.' },
    ],
    criteria: [
        { id: 'designmd-r-token', outputId: "design-tokens", name: 'قيم مسندة', description: 'الرموز لها مصادر حقيقية أو موسومة UNKNOWN.', evidencePrompt: 'اختر token وتحقق من مصدر الشاشة والقيمة.' },
        { id: 'designmd-r-scope', outputId: "design-md", name: 'نطاق وثيقة التصميم', description: 'قواعد الواجهة لا تستبدل متطلبات PRD أو تضيف قرارات منتج.', evidencePrompt: 'قارن قاعدة واجهة بمتطلب وظيفي وتأكد من عدم تعارض الوثيقتين.' }
    ],
}
];

const rootQuestionReview = (id: string) => ({
    area: 'question' as const,
    outcome: 'passed' as const,
    reviewer: 'root',
    reviewedAt: '2026-10-20',
    evidence: `Root independently checked the four options, keyed answer, and rationale for ${id}; the answer and rationale are educationally sound for the stated objective. This narrow review does not cover the full lesson, assessment policy, template, video, browser rendering, or owner acceptance.`,
});

const rootCriterionReview = (id: string, outputId: string) => ({
    area: 'rubric' as const,
    outcome: 'passed' as const,
    reviewer: 'root',
    reviewedAt: '2026-10-20',
    evidence: `Root independently checked criterion ${id} against semantic output ${outputId} and its evidence prompt; it is artifact-bound and asks for observable evidence without inferring mastery. This narrow review does not approve the proposed self-assessment policy or cover the full lesson, template, video, browser rendering, or owner acceptance.`,
});

const rootReviewedDrafts: TopicDraft[] = topicDrafts.map((draft) => ({
    ...draft,
    questions: draft.questions.map((question) => ({
        ...question,
        reviewEvidence: [rootQuestionReview(question.id)],
    })) as TopicDraft['questions'],
    criteria: draft.criteria.map((criterion) => ({
        ...criterion,
        reviewEvidence: [rootCriterionReview(criterion.id, criterion.outputId)],
    })) as TopicDraft['criteria'],
}));

/** Narrow independent review applies only to these exact draft questions and criteria. */
export const LEARNING_CONTENT_GROUP_A_REST: Record<string, import('@/src/types/learning.ts').TopicLearningContent> = Object.fromEntries(
  rootReviewedDrafts.map((draft) => [draft.topicSlug, buildTopic(draft)]),
);
