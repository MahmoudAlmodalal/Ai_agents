import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';

export const QUESTION_IDS_GROUP_B_11: Record<string, [string, string]> = {
  'typescript-types': ['typed-status-union', 'runtime-json-validation'],
  'react-components-state': ['shared-state-owner', 'server-client-boundary'],
  'tailwind-css-responsive': ['design-token-source', 'logical-spacing-rtl'],
  'nextjs-app-router': ['layout-route-mapping', 'fixture-vs-api'],
};

export const VIDEO_CANDIDATES_GROUP_B_11: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'typescript-types': {
    id: 'typescript-types-video-candidate',
    title: 'TypeScript Crash Course with Matt Pocock',
    url: 'https://learn.microsoft.com/en-us/shows/vs-code-livestreams/typescript-crash-course-with-matt-pocock',
    purpose: 'مرشح لمراجعة الأساسيات والأنواع والاتحادات؛ تعرض صفحة Microsoft Learn فصلاً بعنوان Types and unions عند 51:00 واختبارات عند 14:40. المحتوى من 2022، لذا تُراجع الأمثلة مع إصدار TypeScript الحالي.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/vs-code-livestreams/typescript-crash-course-with-matt-pocock', evidence: 'صفحة الناشر تسمي الفيديو وتعرض الفصلين 14:40 Testing و51:00 Types and unions؛ الملاءمة لunion والعينة السلبية جزئية ومباشرة. لم يُختبر التشغيل أو captions أو الوصولية، ولم يراجع المالك المورد أو النسخة التعليمية.' }],
  },
  'react-components-state': {
    id: 'react-components-state-video-candidate',
    title: 'S01 E16: Five Things About State in React',
    url: 'https://learn.microsoft.com/en-us/shows/5-things/episode-16-five-things-about-state-in-react',
    purpose: 'مرشح لملكية الحالة وتدفقها عبر props والمكونات؛ صفحة Microsoft Learn تذكر هذه المحاور صراحة. المورد من 2022 ويحتاج موازنة مع توثيق React الحالي.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/5-things/episode-16-five-things-about-state-in-react', evidence: 'صفحة Microsoft Learn تصف local state وstate flow وprops واستعمال state داخل المكونات. صلة الموضوع واضحة على مستوى المفاهيم، مع حاجة لمراجعة مصطلحات/واجهات React الحديثة. لم يُختبر التشغيل أو captions أو الوصولية، ولا توجد موافقة مالك.' }],
  },
  'tailwind-css-responsive': {
    id: 'tailwind-css-responsive-video-candidate',
    title: 'Tailwind CSS: From Zero to Production',
    url: 'https://tailwindcss.com/blog/tailwindcss-from-zero-to-production',
    purpose: 'مرشح من سلسلة Tailwind الرسمية ذات 8 أجزاء؛ الجزء الثالث responsive design والسابع تخصيص design system. السلسلة تعلم Tailwind v2.0، لذا تصلح للمبادئ فقط ويجب عدم نسخ صياغة الإعداد أو الفئات قبل التحقق من الإصدار.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://tailwindcss.com/blog/tailwindcss-from-zero-to-production', evidence: 'صفحة Tailwind الرسمية تسرد 8 فيديوهات، ومنها Responsive Design وCustomizing Your Design System، وتذكر أنها لـ Tailwind CSS v2.0 (2021). تطابقها مع التجاوب والرموز مناسب بمحدودية النسخة. لم يُختبر تشغيل الفيديو أو captions أو الوصولية؛ موافقة المالك غير مسجلة.' }],
  },
  'nextjs-app-router': {
    id: 'nextjs-app-router-video-candidate',
    title: 'Less code, better UX: Fetching data faster with the Next.js 13 App Router',
    url: 'https://vercel.com/blog/nextjs-app-router-data-fetching',
    purpose: 'مرشح يوضح جلب البيانات داخل Server Components والـ layouts المشتركة وتحسين حالات التحميل في App Router. صفحة Vercel تشير إلى demo فيديو قصير؛ المادة مرتبطة بـ Next.js 13 (2023) فتحتاج مقارنة بالأدلة الحالية قبل استخدامها في خطوات إصدار حديث.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://vercel.com/blog/nextjs-app-router-data-fetching', evidence: 'مقال Vercel عن Next.js 13 App Router يشرح app directory وServer Components وnested layouts ويقول إن Sam Selikoff يعرض demo بأقل من ثلاث دقائق. هذا يثبت وجود مورد مرئي ذي صلة، لا التوافق مع كل ملفات App Router الحالية. التشغيل وcaptions والوصولية ومراجعة المالك لم تُنفذ.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_11: Record<string, TopicDraft> = {
  'typescript-types': {
    slug: 'typescript-types',
    objectives: [
      'اشتق عقود الأنواع من ERD المعتمد وميّز union الحالة عن الحقل الاختياري.',
      'طابق بيانات تجريبية مع العقد وارفض القيم غير الصالحة عند حد البيانات.',
    ],
    sections: [
      { id: 'inputs', heading: 'ابدأ من البيانات المعتمدة', body: 'المدخل ERD وجرد الشاشات، لا تخمين من واجهة منفردة. حوّل الحقول والعلاقات إلى أنواع مشتركة؛ استخدم union لقيم الحالة، وحقلًا اختيارياً فقط عندما تسمح القاعدة بغيابه. TypeScript يفحص الشيفرة وقت التطوير ولا يتحقق وحده من JSON وقت التشغيل.' },
      { id: 'example', heading: 'مثال توضيحي: حالة طلب', body: "الاتحاد draft وsubmitted وaccepted وcancelled مثال تعليمي بأربع حالات فقط، وليس LoanStatus المعتمد ذي الحالات الخمس في BorrowHub. استبدل الحالات بما يحدده ERD لمشروعك. لا تجعل الحقل اختيارياً لإخفاء قيمة ناقصة. يفحص TypeScript الشيفرة المعلّمة وقت التطوير؛ أما JSON الوارد فيحتاج تحققاً وقت التشغيل عند حد النظام." },
      { id: 'exercise', heading: 'مهمة وبرومبت ومخرج', body: 'برومبت: «اشتق الأنواع من ERD والعينة؛ اعرض كل افتراض كسؤال، واكتب اختباراً يرفض حالة غير مدرجة، ولا تستخدم any». سلّم العقود وفحص البيانات إلى بناء المكونات في الموضوع 31.' },
    ],
    practicalSteps: [
      { id: 'define-contract', instruction: 'أنشئ src/types/project.ts وعرّف كياناً وحالاته من ERD.', expectedOutput: "Equipment له id/name وRequestStatus محصور بالقيم الموثقة؛ لا يوجد any أو status? بلا سبب." },
      { id: 'test-boundary', instruction: 'افصل فحص النوع الساكن عن اختبار JSON وقت التشغيل، وسجل نتيجة كل واحد.', expectedOutput: 'إسناد TypeScript معلّم بقيمة status: "waiting" يفشل في tsc؛ أما JSON الخام فلا يرفضه TypeScript، ولا يفشل إلا بعد تنفيذ schema validator واختبار مستقل. اكتب Not Run لأي فحص لم تنفذه.' },
      { id: 'document-assumptions', instruction: 'اربط كل نوع بمصدره وسجل الحقول غير المحسومة.', expectedOutput: 'docs/TYPESCRIPT_GUIDELINES.md يحوي مرجع ERD وأسئلة مفتوحة، بلا قواعد مخترعة.' },
    ],
    workedExample: { id: 'request-union-example', title: 'عقد حالة طلب توضيحي', context: 'مثال بأربع حالات لتوضيح union فقط؛ ليس قائمة BorrowHub ولا يثبت فحصاً منفذاً. استبدل القيم بحالات ERD لمشروعك.', result: "type RequestStatus = 'draft' | 'submitted' | 'accepted' | 'cancelled';\ninterface Request { id: string; status: RequestStatus }\nconst sample: Request = { id: 'req-104', status: 'submitted' };\n// Compile-time example: const invalid: RequestStatus = 'waiting'; // tsc error\n// Raw JSON still needs a separately implemented runtime schema check.", caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ERD يحدد أربع حالات. أي تعريف يحافظ على العقد؟', options: ['status: string', "status: 'draft' | 'submitted' | 'accepted' | 'cancelled'", 'status?: string'], correct: 1, explanation: 'الاتحاد الحرفي يقيد القيم المعتمدة؛ string والحقل الاختياري يغيران معنى العقد.' },
      { objective: 2, prompt: 'وصل JSON بحالة غير موجودة في union. ماذا يلزم؟', options: ['TypeScript يضمن JSON وقت التشغيل.', 'اقبل القيمة وأخف التحذير.', 'تحقق عند حد البيانات؛ النوع الساكن لا يفحص JSON وحده.'], correct: 2, explanation: 'الأنواع لا تتحقق آلياً من بيانات خارجية أثناء التشغيل.' },
    ],
    outputs: [
      { id: 'types-file', description: 'عقود المشروع المشتقة من ERD مع حالات موثقة.' },
      { id: 'type-evidence', description: 'عينة صحيحة وحالة سلبية ونتيجة فحص مسجلة.' },
    ],
    criteria: [
      { id: 'contract-source', outputId: 'types-file', name: 'مصدر العقد', description: 'كل كيان وحالة يتتبعان إلى ERD أو سؤال مفتوح.', evidencePrompt: 'أشر إلى حقل وحالة ومصدرهما في ERD.' },
      { id: 'runtime-boundary', outputId: 'type-evidence', name: 'فحص الحد', description: 'العينة غير الصحيحة تفشل عند الفحص المناسب.', evidencePrompt: 'أرفق اسم الاختبار ورسالة الفشل أو فحص وقت التشغيل.' },
    ],
    reviewNote: 'راجع المؤلف union والحقل الاختياري والفرق بين فحص النوع والتحقق وقت التشغيل. عينة المخرج صحيحة/سلبية وتغذي React؛ لا تقفل الوصول للموضوع التالي.',
  },
  'react-components-state': {
    slug: 'react-components-state',
    objectives: [
      'قسّم الشاشة إلى مكونات عرض بواجهات props واضحة وتدفق بيانات باتجاه واحد.',
      'ضع الحالة في أقرب أب مشترك واعرض التحميل والنجاح والفراغ والخطأ ببيانات معلومة.',
    ],
    sections: [
      { id: 'inputs', heading: 'من العقود إلى مكونات', body: 'ابدأ بمخرجي الموضوع 30 types-file وtype-evidence، وجرد الشاشات وبيانات تجريبية. المكون الذي يعرض props فقط أسهل للفحص؛ الحدث يصعد كـ callback. لا تعدل prop ولا تحفظ نسختين متعارضتين من الحالة.' },
      { id: 'example', heading: 'مثال محلول: بحث قائمة', body: 'احتفظ query في CatalogPage، ومرر items وonSelect إلى CatalogList. اشتق النتائج من items وquery. اعرض loading وsuccess وempty وerror، وعلّم مصدر البيانات إن كان fixture محلياً.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «قسّم الشاشة إلى عرض ومالك حالة، واستخدم الأنواع، وبيّن أربع حالات ببيانات محلية. لا تضف طلب شبكة، واذكر أين يلزم use client ولماذا». سلّم خريطة المكونات إلى التنسيق في الموضوع 32.' },
    ],
    practicalSteps: [
      { id: 'map', instruction: 'ارسم شجرة مكونات وحدد من يملك كل قيمة مشتركة.', expectedOutput: 'CatalogPage → SearchToolbar + CatalogList → ItemCard، ومالك واحد لـ query.' },
      { id: 'states', instruction: 'نفذ بطاقة نقية واعرض حالات القائمة الأربع بfixtures.', expectedOutput: 'لقطة أو fixture لكل حالة؛ كل بيانات البطاقة تطابق العقد المعرّف.' },
      { id: 'client-boundary', instruction: 'حدد المكون الذي يستخدم hook أو حدثاً وأضف توجيه العميل عند الحاجة.', expectedOutput: 'توضيح موضع use client وسببه؛ العرض البحت لا يحمل توجيهاً زائداً.' },
    ],
    workedExample: { id: 'search-flow', title: 'تدفق بحث باتجاه واحد', context: 'صفحة فهرس تملك query وتعرض بطاقات قراءة فقط.', result: 'SearchPage(query) → CatalogList(items,onSelect) → ItemCard(item). النتائج مشتقة ولا توجد نسخة ثانية قابلة للتعارض.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'القائمة وشريط البحث يحتاجان query نفسها. أين تحفظ؟', options: ['في كل بطاقة.', 'في أقرب أب مشترك ينسق الإدخال والنتائج.', 'في prop يعدله الطفل مباشرة.'], correct: 1, explanation: 'مالك واحد للحالة المشتركة يتيح تدفق props نزولاً.' },
      { objective: 2, prompt: 'مكوّن عرض بلا hooks أو أحداث. هل يحتاج use client؟', options: ['لا، حتى تظهر حاجة تفاعلية.', 'نعم، كل مكونات Next.js تحتاجه.', 'نعم، كي تختبر بيانات fixtures.'], correct: 0, explanation: 'حد العميل مطلوب عند استخدام hooks أو browser APIs أو أحداث.' },
    ],
    outputs: [
      { id: 'component-map', description: 'خريطة props وحدود المكونات ومالك الحالة.' },
      { id: 'state-fixtures', description: 'مكونات وfixtures لحالات التحميل والنجاح والفراغ والخطأ.' },
    ],
    criteria: [
      { id: 'state-owner', outputId: 'component-map', name: 'مالك حالة واضح', description: 'القيمة المشتركة لها مصدر واحد؛ props للأبناء وcallbacks للأعلى.', evidencePrompt: 'أشر إلى تعريف query والحدث الذي يعيد التغيير للأب.' },
      { id: 'state-coverage', outputId: 'state-fixtures', name: 'حالات ظاهرة', description: 'كل حالة لها بيانات قابلة للعرض ولا توصف fixture كـ API.', evidencePrompt: 'أرفق أسماء fixtures الأربع ومصدر بياناتها.' },
    ],
    reviewNote: 'راجع المؤلف اشتقاق النتائج وملكية الحالة وحد use client. حالات العرض الأربع محددة وبياناتها محلية بوضوح.',
  },
  'tailwind-css-responsive': {
    slug: 'tailwind-css-responsive',
    objectives: [
      'اربط فئات Tailwind برموز DESIGN.md وتجنب قيم التصميم الاعتباطية.',
      'استخدم الخصائص المنطقية وافحص RTL/LTR عند عروض مختلفة بلا overflow أفقي.',
    ],
    sections: [
      { id: 'inputs', heading: 'من الرمز إلى الفئة', body: 'المدخل DESIGN.md ومخرجا الموضوع 31 component-map وstate-fixtures، ثم مكونات React التي تريد تنسيقها. Utility-first لا يعني اختيار قيمة بلا ضابط. اربط tokens بمتغير أو فئة، وتحقق من إصدار Tailwind لأن إعداد theme يختلف بين النسخ.' },
      { id: 'example', heading: 'مثال محلول: بطاقة ثنائية الاتجاه', body: 'بطاقة تستخدم ps-4 وtext-start وms-auto عوض padding-left وmargin-left. يتغير ترتيبها مع dir. افحص العنصر المسبب لأي overflow قبل إخفائه.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «طبّق الرموز على هذا المكون، واستخدم خصائص منطقية، واعرض الفحص عند 390/768/1024/1366/1440px. لا تضف لوناً خارج DESIGN.md». سلّم جدول الرموز إلى هيكلة المسارات في الموضوع 33.' },
    ],
    practicalSteps: [
      { id: 'token-map', instruction: 'اربط لوناً ومسافة ونصف قطر من DESIGN.md بمتغير/فئة حسب إصدار Tailwind.', expectedOutput: 'docs/TAILWIND_DESIGN_MAPPING.md يذكر المصدر والأسئلة غير المحسومة.' },
      { id: 'logical-card', instruction: 'نسق بطاقة بخصائص منطقية وافحص العربية والإنجليزية.', expectedOutput: 'لا تعتمد المحاذاة على ml/mr أو left/right إذا كان المقصود اتجاه النص.' },
      { id: 'width-check', instruction: 'افحص العروض الخمسة وسجل overflow مع العنصر ونتيجة RTL/LTR. أصلح سبب التدفق أولاً؛ لا تخفه على مستوى الصفحة.', expectedOutput: 'مصفوفة تسجل العرض والاتجاه والعنصر وسبب التدفق والإصلاح والفحص الفعلي؛ يجوز قص محتوى محلي مقصود فقط مع توثيق سببه. غير المفحوص ليس Passed.' },
    ],
    workedExample: { id: 'logical-layout', title: 'بطاقة اتجاهية', context: 'بطاقة لها عنوان وزر إجراء.', result: 'ps-4 وtext-start وms-auto يتبعون اتجاه الكتابة؛ تنتقل الأزرار لسطر عند الهاتف عند الحاجة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'كيف تحد من تشتت الألوان بين الصفحات؟', options: ['اختيار قيم مختلفة لكل مكون.', 'ربط الفئات برموز DESIGN.md وتسجيل الرمز غير الموجود كسؤال.', 'حذف النظام بعد أول شاشة.'], correct: 1, explanation: 'الربط بالرموز يجعل القرار البصري متسقاً وقابلاً للمراجعة.' },
      { objective: 2, prompt: 'ml-4 يضع المسافة في الجهة الخطأ بالعربية. ما البديل؟', options: ['ms-4 إذا كان المقصود الهامش المنطقي قبل العنصر.', 'إضافة ml-4 وmr-4 دائماً.', 'إخفاء overflow-x.'], correct: 0, explanation: 'الخاصية المنطقية تتبع اتجاه الكتابة؛ إخفاء overflow يخفي العَرَض فقط.' },
    ],
    outputs: [
      { id: 'token-map', description: 'جدول الرموز المعتمدة وربطها بمتغيرات/فئات.' },
      { id: 'responsive-report', description: 'مصفوفة عروض واتجاهات بنتائج فحص حقيقية.' },
    ],
    criteria: [
      { id: 'token-source', outputId: 'token-map', name: 'مصدر الرمز', description: 'الفئات المخصصة مرتبطة بمصدر أو سؤال مفتوح.', evidencePrompt: 'أشر إلى مصدر لون ومسافة وفئتهما.' },
      { id: 'direction-check', outputId: 'responsive-report', name: 'فحص الاتجاه والعرض', description: 'يذكر العرض والاتجاه والعنصر المتأثر لا ادعاء تجاوب عام.', evidencePrompt: 'أرفق أصغر عرض فحصته ونتيجة RTL/LTR.' },
    ],
    reviewNote: 'راجع المؤلف فرق الخصائص المنطقية عن إخفاء overflow وربط الفئات بمصدر التصميم. جدول الفحص لا يسجل عروضاً غير معاينة.',
  },
  'nextjs-app-router': {
    slug: 'nextjs-app-router',
    objectives: [
      'حوّل جرد الشاشات إلى مسارات App Router وافصل layout عن page والمسار الديناميكي.',
      'حدد حدود مكونات الخادم والعميل وسمّ البيانات المحلية fixtures بوضوح.',
    ],
    sections: [
      { id: 'inputs', heading: 'من الجرد إلى الملفات', body: 'المدخل SCREEN_INVENTORY.md وعقود البيانات وخريطة المكونات، مع token-map من الموضوع 32 عند تنسيق shell؛ راجع responsive-report كحدود فحص موثقة. مجلدات app تمثل مسارات؛ page محتوى المسار وlayout هيكل مشترك. [id] يلتقط مساراً؛ loading/not-found يعالجان حالات منفصلة.' },
      { id: 'example', heading: 'مثال محلول: قائمة وتفصيل BorrowHub', body: 'في مثال BorrowHub المسار /equipment يكون app/equipment/page.tsx والتفصيل /equipment/[id] يكون app/equipment/[id]/page.tsx؛ يعرضان معدات من fixtures محلية. استخدم Link للتنقل الداخلي. اتبع مسارات جرد مشروعك إذا اختلفت، والبيانات المحلية لا تثبت وجود API أو قاعدة حية.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «حوّل الجرد إلى شجرة App Router، وسم كل ملف ومصدر البيانات. حافظ على RTL، وضع use client عند hook/حدث فقط. لا تدّع وجود Backend». سلّم الشجرة لتخطيط المشروع التالي.' },
    ],
    practicalSteps: [
      { id: 'route-tree', instruction: 'اربط كل شاشة بمسار وpage وحدد layout وحالات loading/not-found.', expectedOutput: 'docs/NEXTJS_ROUTING_SPEC.md يربط الجرد بملفات app.' },
      { id: 'shell', instruction: 'أنشئ layout بlang/dir وتنقلاً داخلياً إلى مسارين موجودين.', expectedOutput: 'تخطيط lang="ar" وdir="rtl" وروابط لمسارات قائمة.' },
      { id: 'data-boundary', instruction: 'حدد لكل صفحة هل مصدرها fixture أو API منفذ فعلاً.', expectedOutput: 'مصفوفة route/source/client-boundary بلا ادعاء API عند استخدام fixtures.' },
    ],
    workedExample: { id: 'route-files', title: 'شجرة مسارات BorrowHub', context: 'مثال BorrowHub يعرض فهرس معدات وتفاصيلها؛ طابقه مع SCREEN_INVENTORY.md لمشروعك.', result: 'src/app/layout.tsx; src/app/equipment/page.tsx; src/app/equipment/[id]/page.tsx. صفحة التفصيل تعرض not-found لقيمة id غير موجودة. مصدر السجلات fixtures محلية حتى يثبت API منفذ.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أين تضع واجهة تظهر حول القائمة والتفاصيل؟', options: ['في layout مشترك للمسارين.', 'تكرارها في كل page.', 'داخل مجلد [id].'], correct: 0, explanation: 'layout يوفر الهيكل المشترك للمسارات التابعة.' },
      { objective: 2, prompt: 'صفحة تعرض fixtures محلية. ما الوصف الدقيق؟', options: ['API الخلفية مكتمل.', 'البيانات تجريبية؛ التكامل لم يثبت بعد.', 'Next.js حفظها تلقائياً في قاعدة.'], correct: 1, explanation: 'عرض البيانات المحلية لا يثبت وجود API أو قاعدة بيانات.' },
    ],
    outputs: [
      { id: 'route-spec', description: 'شجرة مسارات ومطابقة للشاشات وحالاتها.' },
      { id: 'route-shell', description: 'layout وتنقل داخلي مع مصدر البيانات معلناً.' },
    ],
    criteria: [
      { id: 'screen-trace', outputId: 'route-spec', name: 'تغطية الجرد', description: 'الشاشات المختارة لها مسار وملف وحالة مناسبة.', evidencePrompt: 'أشر إلى شاشة ومسار وملف الصفحة المقابل.' },
      { id: 'source-label', outputId: 'route-shell', name: 'صدق المصدر', description: 'fixture وAPI الفعلي مسميان كما هما.', evidencePrompt: 'أرفق صفحة واحدة ومصدر بياناتها الفعلي.' },
    ],
    reviewNote: 'راجع المؤلف أسماء الملفات وحدود fixture مقابل API. المخرجات تبني على المكونات وتبقى جميع المسارات قابلة للفتح مستقلاً.',
  },
};

export const LEARNING_CONTENT_GROUP_B_11: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_11, QUESTION_IDS_GROUP_B_11, VIDEO_CANDIDATES_GROUP_B_11);
