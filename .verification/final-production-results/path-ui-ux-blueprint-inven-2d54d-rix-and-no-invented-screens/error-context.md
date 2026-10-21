# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: path/ui-ux-blueprint-inventory.spec.ts >> Sequential Project Path - Ticket 07: UI/UX, UX Blueprint & Screen Inventory (Topics 18, 19, 20) >> Topic 20 (Screen Inventory): Verifies strict MVP scope, SCR-01 to SCR-06, traceability matrix, and no invented screens
- Location: e2e/path/ui-ux-blueprint-inventory.spec.ts:98:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=القاعدة 7:')
Expected: visible
Timeout: 7000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('text=القاعدة 7:') with timeout 7000ms
  - waiting for locator('text=القاعدة 7:')

```

```yaml
- link "تخطي إلى المحتوى الرئيسي":
  - /url: "#main-content"
- banner:
  - link "MET Academy سلاح العصر - الصفحة الرئيسية":
    - /url: /
    - text: MET سلاح العصر MET Academy — من الفكرة إلى النشر والعرض
  - navigation "شريط التنقل الرئيسي":
    - link "الرئيسية":
      - /url: /
    - link "ابدأ هنا":
      - /url: /start
    - link "مسار التعلم":
      - /url: /learn/project-idea-mvp
    - link "المتطلبات":
      - /url: /learn/discovery-grill-me
    - link "Stitch MCP وDESIGN.md":
      - /url: /learn/stitch-mcp-integration
    - link "خارطة تنفيذ المشروع":
      - /url: /roadmap
    - link "Cheatsheet البرومبتات":
      - /url: /cheatsheet
    - link "مكتبة البرومبتات":
      - /url: /prompts
    - link "مختبر المخططات":
      - /url: /diagrams
    - link "ورشة BorrowHub":
      - /url: /borrowhub
    - link "الأدوات والتثبيت":
      - /url: /tools
    - link "مؤشر الموديلات":
      - /url: /models
    - button "عرض المزيد من أقسام الدورة": المزيد
  - link "ابدأ الآن":
    - /url: /start
  - button "التحويل إلى النمط الليلي"
- main:
  - navigation "مسار الصفحة":
    - link "الرئيسية":
      - /url: /
    - text: "/ الواجهات وتطوير الفرونت إند / جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات"
  - text: الواجهات وتطوير الفرونت إند · موضوع 20 جرد الشاشات وهندسة النطاق محتوى منشور
  - 'heading "جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات" [level=1]'
  - paragraph: توثيق كل شاشة بهدفها، أدوارها، مكوناتها، بياناتها، إجراءاتها، وحالاتها دون اختراع شاشات زائدة
  - paragraph: إعداد جرد شاشات منضبط (Screen Inventory) يحصر شاشات MVP فقط ويربط كل شاشة بهدفها، أدوارها المصرحة، مسارها في Next.js، مكوناتها، بياناتها، إجراءاتها، وحالاتها التفصيلية، مع مصفوفة تدقيق التغطية الهندسية (Traceability Matrix) لضمان عدم اختراع شاشات زائدة وحفظ المخرج في docs/SCREEN_INVENTORY.md.
  - strong: "الهدف من الموضوع:"
  - text: "تمكين الطالب من إعداد جرد شاشات كامل ومنضبط (Screen Inventory) يربط كل شاشة بهدفها المباشر، الأدوار المصرح لها، المسار، المكونات، مصادر البيانات، الإجراءات، وقواعد التحقق، مع الالتزام الصارم بقاعدة عدم اختراع أي شاشات خارج نطاق الـ MVP وتوثيقه في docs/SCREEN_INVENTORY.md. المخرجات المطلوبة:"
  - code: docs/SCREEN_INVENTORY.md
  - code: جدول جرد الشاشات المعتمد (Screen Inventory Table)
  - code: مصفوفة تدقيق التغطية (Requirements-to-Screens Traceability Matrix)
  - button "حفظ في المفضلة"
  - button "طباعة كملف PDF"
  - button "الاستماع للمقدمة"
  - article:
    - heading "خطوات التطبيق على مشروعك" [level=2]
    - list:
      - listitem: 1 احصر قائمة الشاشات الإلزامية لنطاق MVP فقط مستنداً إلى PRD وخريطة الموقع، وامتنع تماماً عن إضافة شاشات افتراضية غير مطلوبة.
      - listitem: "2 صنف الشاشات بحسب الأولوية: شاشات جوهرية (Core) لا يعمل المنتج بدونها، وشاشات مساندة (Supporting)، واعزل شاشات المستقبل (Future) خارج الجرد."
      - listitem: 3 امنح كل شاشة معرفاً ثابتاً وفريداً (مثل SCR-01 إلى SCR-06) واسماً واضحاً بالعربية والإنجليزية.
      - listitem: "4 لكل شاشة في الجرد، وثّق: الهدف، الأدوار المخولة، المسار في Next.js، المكونات الأساسية، البيانات المطلوبة، والإجراءات المتاحة."
      - listitem: "5 اربط كل شاشة بحالاتها الخاصة المشتقة من UX Blueprint: رسائل الفراغ المحددة، قواعد التحقق، ومعايير التجاوب الخاصة بها."
      - listitem: 6 راجع التغطية الكاملة (Coverage Audit) بين متطلبات PRD وجرد الشاشات للتأكد من عدم سقوط أي قاعدة عمل أو مسار تدفق.
      - listitem: 7 احفظ الجرد الكامل في docs/SCREEN_INVENTORY.md ليكون الأساس المعتمد لبناء برومبتات الشاشات في Google Stitch.
    - heading "المتطلبات السابقة" [level=3]
    - list:
      - listitem: وثيقة متطلبات الواجهة docs/UI_UX_REQUIREMENTS.md
      - listitem: مخطط تجربة المستخدم وخريطة الموقع docs/UX_BLUEPRINT.md
      - listitem: وثيقة متطلبات المنتج docs/PRD.md وقواعد العمل
    - complementary:
      - paragraph:
        - strong: "مراجعة BorrowHub:"
        - text: هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.
    - text: "الموضوع 20 · المحطة الأساسية جرد الشاشات وهندسة النطاق مرجع معتمد: المحاضرة 05"
    - 'heading "جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات" [level=2]'
    - text: توثيق كل شاشة بهدفها، أدوارها، مكوناتها، بياناتها، إجراءاتها، وحالاتها دون اختراع شاشات زائدة
    - 'heading "1. القاعدة الذهبية: حظر اختراع شاشات وهمية أو زائدة عن نطاق MVP" [level=3]'
    - paragraph:
      - strong: جرد الشاشات (Screen Inventory)
      - text: ليس مجرد قائمة عشوائية لأسماء الصفحات، بل هو
      - strong: عقد هندسي ملزم
      - text: يحدد بالضبط ما سيتم تصميمه وبرمجته لاحقاً. أي شاشة تضاف إلى هذا الجرد ستكلفك وقتاً في كتابة البرومبت، وتصميماً في Stitch، وتكويفاً في Next.js، وفحوصات في QA.
    - text: 🚫 قاعدة المنع الصارم (No Invented Screens)
    - paragraph:
      - strong: "لا تخترع شاشات غير مطلوبة في متطلبات PRD:"
      - text: إذا لم يكن للمنتج ميزة دردشة حية أو نظام دفع أو إعدادات متقدمة في الـ MVP، فمن المحظور تماماً تخصيص شاشات لها. كل شاشة يجب أن تبرر وجودها بربط مباشر بقاعدة عمل أو رحلة مستخدم أساسية.
    - heading "2. تصنيف أولويات الشاشات (Core vs Supporting vs Future)" [level=3]
    - paragraph: "قبل إدراج الشاشات في الجرد التفصيلي، نقوم بتصنيفها هندسياً لتركيز الجهود على ما يحقق قيمة المنتج الأساسية:"
    - table:
      - rowgroup:
        - row "مستوى الأولوية المعنى الهندسي التعامل معها في المرحلة الحالية أمثلة من مشروع BorrowHub":
          - columnheader "مستوى الأولوية"
          - columnheader "المعنى الهندسي"
          - columnheader "التعامل معها في المرحلة الحالية"
          - columnheader "أمثلة من مشروع BorrowHub"
      - rowgroup:
        - row "الجوهرية (Core) شاشات أساسية لا يمكن للنظام أن يؤدي غرضه التجاري الأول بدونها على الإطلاق. تُجرد بالكامل، وتُصمم أولاً في Stitch كمرجع رئيسي، وتُنفذ في المرحلة الأولى. كتالوج المعدات (SCR-02)، نموذج طلب الاستعارة (SCR-03)، لوحة تسليم المشرف (SCR-05).":
          - cell "الجوهرية (Core)":
            - strong: الجوهرية (Core)
          - cell "شاشات أساسية لا يمكن للنظام أن يؤدي غرضه التجاري الأول بدونها على الإطلاق."
          - cell "تُجرد بالكامل، وتُصمم أولاً في Stitch كمرجع رئيسي، وتُنفذ في المرحلة الأولى."
          - cell "كتالوج المعدات (SCR-02)، نموذج طلب الاستعارة (SCR-03)، لوحة تسليم المشرف (SCR-05)."
        - row "المساندة (Supporting) شاشات تكمل تجربة المستخدم وتمنحه إمكانية المتابعة والتحقق والوصول للنتائج. تُجرد وتُصمم باتساق مع نظام التصميم المعتمد للشاشات الجوهرية. الصفحة الرئيسية (SCR-01)، لوحة إعارات الطالب (SCR-04)، شاشة فحص الأضرار (SCR-06).":
          - cell "المساندة (Supporting)":
            - strong: المساندة (Supporting)
          - cell "شاشات تكمل تجربة المستخدم وتمنحه إمكانية المتابعة والتحقق والوصول للنتائج."
          - cell "تُجرد وتُصمم باتساق مع نظام التصميم المعتمد للشاشات الجوهرية."
          - cell "الصفحة الرئيسية (SCR-01)، لوحة إعارات الطالب (SCR-04)، شاشة فحص الأضرار (SCR-06)."
        - row "المستقبلية (Future / Out of Scope) شاشات تخدم ميزات مؤجلة تقرر عزلها في وثيقة PRD (مثل تقارير الذكاء الاصطناعي والتكامل مع جهات خارجية). تُعزل تماماً خارج الجرد الحالي وتُسجل في قائمة الميزات المؤجلة دون إضاعة الوقت فيها. شاشة الدفع المالي، شاشة المحادثة الفورية، شاشة مزامنة المستودعات الخارجية.":
          - cell "المستقبلية (Future / Out of Scope)":
            - strong: المستقبلية (Future / Out of Scope)
          - cell "شاشات تخدم ميزات مؤجلة تقرر عزلها في وثيقة PRD (مثل تقارير الذكاء الاصطناعي والتكامل مع جهات خارجية)."
          - cell "تُعزل تماماً خارج الجرد الحالي وتُسجل في قائمة الميزات المؤجلة دون إضاعة الوقت فيها.":
            - strong: تُعزل تماماً خارج الجرد الحالي
            - text: وتُسجل في قائمة الميزات المؤجلة دون إضاعة الوقت فيها.
          - cell "شاشة الدفع المالي، شاشة المحادثة الفورية، شاشة مزامنة المستودعات الخارجية."
    - heading "3. الجرد المرجعي الكامل لشاشات النسخة الأولى (BorrowHub Case Study)" [level=3]
    - paragraph:
      - text: يوضح الجدول التالي الجرد الهندسي المنضبط لنطاق MVP في دراسة حالة
      - strong: BorrowHub
      - text: "، مبيناً ربط كل شاشة بالمعرف، الهدف، المسار، الأدوار، البيانات، الإجراءات، والحالات:"
    - table:
      - rowgroup:
        - row "معرف الشاشة والاسم المسار (Route) والأدوار الهدف الرئيسي من الشاشة المكونات والبيانات المطلوبة إجراءات المستخدم وقواعد التحقق تخصيص الحالات الخاصة":
          - columnheader "معرف الشاشة والاسم"
          - columnheader "المسار (Route) والأدوار"
          - columnheader "الهدف الرئيسي من الشاشة"
          - columnheader "المكونات والبيانات المطلوبة"
          - columnheader "إجراءات المستخدم وقواعد التحقق"
          - columnheader "تخصيص الحالات الخاصة"
      - rowgroup:
        - row "SCR-01 الرئيسية والتعريف Home / Landing / الجميع (Public) التعريف بخدمة إعارة المعدات المعملية، إبراز الأجهزة الأكثر طلباً، وتوجيه المستخدم لتسجيل الدخول. شريط علوي، بطاقة الترحيب (Hero Section)، عينات أجهزة مميزة، روابط سريعة للكتالوج. النقر على \"ابدأ التصفح\"، النقر على \"تسجيل الدخول\". لا تتطلب نماذج إدخال. تحميل خفيف، لا توجد حالة فراغ (محتوى ترويجي ثابت)، متجاوبة بالكامل على الهواتف (390px).":
          - cell "SCR-01 الرئيسية والتعريف Home / Landing":
            - strong: SCR-01
            - text: الرئيسية والتعريف
            - code: Home / Landing
          - cell "/ الجميع (Public)":
            - code: /
            - text: الجميع (Public)
          - cell "التعريف بخدمة إعارة المعدات المعملية، إبراز الأجهزة الأكثر طلباً، وتوجيه المستخدم لتسجيل الدخول."
          - cell "شريط علوي، بطاقة الترحيب (Hero Section)، عينات أجهزة مميزة، روابط سريعة للكتالوج."
          - cell "النقر على \"ابدأ التصفح\"، النقر على \"تسجيل الدخول\". لا تتطلب نماذج إدخال."
          - cell "تحميل خفيف، لا توجد حالة فراغ (محتوى ترويجي ثابت)، متجاوبة بالكامل على الهواتف (390px)."
        - 'row "SCR-02 كتالوج المعدات والبحث Equipment Catalog /equipment الزائر، الطالب، المشرف استعراض كافة الأصول المعملية المتاحة، البحث بالاسم والنوع، والتصفية حسب حالة التوفر والتصنيف. حقل البحث المباشر، شرائح التصنيف (Pills)، شبكة بطاقات الأجهزة، ترقيم الصفحات. البحث الفوري، تبديل الفئات، اختيار معدة للانتقال للتفاصيل. التصفية لا تتطلب إعادة تحميل الصفحة. فراغ: \"لا توجد معدات تطابق معايير بحثك\". تحميل: 6 هياكل عظمية متدرجة."':
          - cell "SCR-02 كتالوج المعدات والبحث Equipment Catalog":
            - strong: SCR-02
            - text: كتالوج المعدات والبحث
            - code: Equipment Catalog
          - cell "/equipment الزائر، الطالب، المشرف":
            - code: /equipment
            - text: الزائر، الطالب، المشرف
          - cell "استعراض كافة الأصول المعملية المتاحة، البحث بالاسم والنوع، والتصفية حسب حالة التوفر والتصنيف."
          - cell "حقل البحث المباشر، شرائح التصنيف (Pills)، شبكة بطاقات الأجهزة، ترقيم الصفحات."
          - cell "البحث الفوري، تبديل الفئات، اختيار معدة للانتقال للتفاصيل. التصفية لا تتطلب إعادة تحميل الصفحة."
          - 'cell "فراغ: \"لا توجد معدات تطابق معايير بحثك\". تحميل: 6 هياكل عظمية متدرجة."':
            - strong: "فراغ:"
            - text: "\"لا توجد معدات تطابق معايير بحثك\"."
            - strong: "تحميل:"
            - text: 6 هياكل عظمية متدرجة.
        - 'row "SCR-03 تفاصيل المعدة ونموذج الطلب Equipment Detail & Modal /equipment/[id] الطالب المعتمد عرض المواصفات الفنية للعتاد، حالة التوفر الفوري، وتقديم طلب استعارة محدد التاريخ والغرض. معرض صور العتاد، جدول المواصفات، نموذج حجز التاريخ والغرض، شارة حالة المخزون. إدخال تاريخ البدء والنهاية، كتابة الغرض، تقديم الطلب. تحقق: فحص القاعدة 3 (الحد الأقصى جهازان). خطأ: تنبيه \"لقد تجاوزت حد الاستعارة المسموح\". نجاح: تأكيد الطلب مع مهلة 48 ساعة."':
          - cell "SCR-03 تفاصيل المعدة ونموذج الطلب Equipment Detail & Modal":
            - strong: SCR-03
            - text: تفاصيل المعدة ونموذج الطلب
            - code: Equipment Detail & Modal
          - cell "/equipment/[id] الطالب المعتمد":
            - code: /equipment/[id]
            - text: الطالب المعتمد
          - cell "عرض المواصفات الفنية للعتاد، حالة التوفر الفوري، وتقديم طلب استعارة محدد التاريخ والغرض."
          - cell "معرض صور العتاد، جدول المواصفات، نموذج حجز التاريخ والغرض، شارة حالة المخزون."
          - 'cell "إدخال تاريخ البدء والنهاية، كتابة الغرض، تقديم الطلب. تحقق: فحص القاعدة 3 (الحد الأقصى جهازان)."':
            - text: إدخال تاريخ البدء والنهاية، كتابة الغرض، تقديم الطلب.
            - strong: "تحقق:"
            - text: فحص القاعدة 3 (الحد الأقصى جهازان).
          - 'cell "خطأ: تنبيه \"لقد تجاوزت حد الاستعارة المسموح\". نجاح: تأكيد الطلب مع مهلة 48 ساعة."':
            - strong: "خطأ:"
            - text: تنبيه "لقد تجاوزت حد الاستعارة المسموح".
            - strong: "نجاح:"
            - text: تأكيد الطلب مع مهلة 48 ساعة.
        - 'row "SCR-04 لوحة إعارات الطالب Student Loans Dashboard /dashboard/loans الطالب المسجل متابعة الأجهزة المستعارة حالياً، تواريخ الإرجاع الإلزامية، وسجل الطلبات السابقة وتفاصيلها. بطاقات الإعارات النشطة، عداد الأيام المتبقية، جدول الأرشيف، أزرار طلب التمديد/الإرجاع. تأكيد الحضور للتسليم، طلب إرجاع العتاد، مراجعة ملاحظات المشرف. فراغ: \"ليس لديك أي إعارات نشطة اليوم، ابدأ بطلب جهاز من الكتالوج\"."':
          - cell "SCR-04 لوحة إعارات الطالب Student Loans Dashboard":
            - strong: SCR-04
            - text: لوحة إعارات الطالب
            - code: Student Loans Dashboard
          - cell "/dashboard/loans الطالب المسجل":
            - code: /dashboard/loans
            - text: الطالب المسجل
          - cell "متابعة الأجهزة المستعارة حالياً، تواريخ الإرجاع الإلزامية، وسجل الطلبات السابقة وتفاصيلها."
          - cell "بطاقات الإعارات النشطة، عداد الأيام المتبقية، جدول الأرشيف، أزرار طلب التمديد/الإرجاع."
          - cell "تأكيد الحضور للتسليم، طلب إرجاع العتاد، مراجعة ملاحظات المشرف."
          - 'cell "فراغ: \"ليس لديك أي إعارات نشطة اليوم، ابدأ بطلب جهاز من الكتالوج\"."':
            - strong: "فراغ:"
            - text: "\"ليس لديك أي إعارات نشطة اليوم، ابدأ بطلب جهاز من الكتالوج\"."
        - 'row "SCR-05 لوحة مراجعة وتسليم المشرف Staff Request Queue /staff/requests مشرف المستودع مراجعة طلبات الطلاب المعلقة، التحقق من أهلية الحساب وتوفر الأصل، وتأكيد التسليم اليدوي (Handover). جدول الطلبات الواردة، شارات الأولوية، نافذة تأكيد تسليم العتاد وإدخال الرمز التسلسلي (Asset Tag). قبول الطلب، رفض الطلب مع كتابة السبب، تأكيد تسليم الجهاز وتفعيل الإعارة (القاعدة 7). تحقق: لا يتم التسليم إلا بإدخال المعرف التسلسلي للأصل وفحص صلاحية الطالب."':
          - cell "SCR-05 لوحة مراجعة وتسليم المشرف Staff Request Queue":
            - strong: SCR-05
            - text: لوحة مراجعة وتسليم المشرف
            - code: Staff Request Queue
          - cell "/staff/requests مشرف المستودع":
            - code: /staff/requests
            - text: مشرف المستودع
          - cell "مراجعة طلبات الطلاب المعلقة، التحقق من أهلية الحساب وتوفر الأصل، وتأكيد التسليم اليدوي (Handover)."
          - cell "جدول الطلبات الواردة، شارات الأولوية، نافذة تأكيد تسليم العتاد وإدخال الرمز التسلسلي (Asset Tag)."
          - cell "قبول الطلب، رفض الطلب مع كتابة السبب، تأكيد تسليم الجهاز وتفعيل الإعارة (القاعدة 7)."
          - 'cell "تحقق: لا يتم التسليم إلا بإدخال المعرف التسلسلي للأصل وفحص صلاحية الطالب."':
            - strong: "تحقق:"
            - text: لا يتم التسليم إلا بإدخال المعرف التسلسلي للأصل وفحص صلاحية الطالب.
        - 'row "SCR-06 فحص الاسترجاع ورصد الأضرار Inspection & Damage Log /staff/inspections مشرف المستودع توثيق حالة المعدة عند إرجاعها إلى المعمل، التأكد من سلامتها الفنية، أو تسجيل الأضرار والملاحظات. بيانات الإعارة المنتهية، قائمة فحص السلامة (Checklist)، حقل رصد الأضرار ونوع العطل وصور الإثبات. تأكيد الإرجاع السليم وإخلاء طرف الطالب، أو تسجيل تلف دون إعادة الوحدة للمتاح كسؤال PRD مفتوح للسياسات الإضافية (القاعدة 8). خطأ: حظر إغلاق الإعارة المتضررة دون كتابة تقرير فحص تفصيلي موثق."':
          - cell "SCR-06 فحص الاسترجاع ورصد الأضرار Inspection & Damage Log":
            - strong: SCR-06
            - text: فحص الاسترجاع ورصد الأضرار
            - code: Inspection & Damage Log
          - cell "/staff/inspections مشرف المستودع":
            - code: /staff/inspections
            - text: مشرف المستودع
          - cell "توثيق حالة المعدة عند إرجاعها إلى المعمل، التأكد من سلامتها الفنية، أو تسجيل الأضرار والملاحظات."
          - cell "بيانات الإعارة المنتهية، قائمة فحص السلامة (Checklist)، حقل رصد الأضرار ونوع العطل وصور الإثبات."
          - cell "تأكيد الإرجاع السليم وإخلاء طرف الطالب، أو تسجيل تلف دون إعادة الوحدة للمتاح كسؤال PRD مفتوح للسياسات الإضافية (القاعدة 8)."
          - 'cell "خطأ: حظر إغلاق الإعارة المتضررة دون كتابة تقرير فحص تفصيلي موثق."':
            - strong: "خطأ:"
            - text: حظر إغلاق الإعارة المتضررة دون كتابة تقرير فحص تفصيلي موثق.
    - heading "4. مصفوفة تدقيق التغطية الهندسية (Requirements Traceability Matrix)" [level=3]
    - paragraph: "لضمان عدم سقوط أي قاعدة عمل أو مسار معتمد، نقوم بإجراء تدقيق تغطية شامل بين متطلبات PRD ومسارات تدفق المستخدم وشاشات الجرد:"
    - table:
      - rowgroup:
        - row "قاعدة PRD المعتمدة مسار التدفق المرتبط (User Flow) الشاشة المسؤولة في الجرد آلية التطبيق على الواجهة والتحقق":
          - columnheader "قاعدة PRD المعتمدة"
          - columnheader "مسار التدفق المرتبط (User Flow)"
          - columnheader "الشاشة المسؤولة في الجرد"
          - columnheader "آلية التطبيق على الواجهة والتحقق"
      - rowgroup:
        - 'row "القاعدة 3: الحد الأقصى لجهازين نشطين للطالب نقطة القرار CheckActiveLoans SCR-03 تفاصيل المعدة والطلب فحص عدد الأجهزة قبل فتح نموذج الطلب؛ عند وصول الحد يظهر تنبيه مانع ويتعطل زر الإرسال."':
          - 'cell "القاعدة 3: الحد الأقصى لجهازين نشطين للطالب"':
            - strong: "القاعدة 3:"
            - text: الحد الأقصى لجهازين نشطين للطالب
          - cell "نقطة القرار CheckActiveLoans":
            - text: نقطة القرار
            - code: CheckActiveLoans
          - cell "SCR-03 تفاصيل المعدة والطلب":
            - code: SCR-03
            - text: تفاصيل المعدة والطلب
          - cell "فحص عدد الأجهزة قبل فتح نموذج الطلب؛ عند وصول الحد يظهر تنبيه مانع ويتعطل زر الإرسال."
        - 'row "القاعدة 6: استلام الجهاز خلال 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق عقدة التسليم ApprovedReady → Handover SCR-04 للوحة الطالب و SCR-05 للمشرف عرض مؤقت عد تنازلي لمهلة الـ 48 ساعة؛ يتم إلغاء الحجز تلقائياً في حال عدم الحضور."':
          - 'cell "القاعدة 6: استلام الجهاز خلال 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق"':
            - strong: "القاعدة 6:"
            - text: استلام الجهاز خلال 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق
          - cell "عقدة التسليم ApprovedReady → Handover":
            - text: عقدة التسليم
            - code: ApprovedReady → Handover
          - cell "SCR-04 للوحة الطالب و SCR-05 للمشرف":
            - code: SCR-04
            - text: للوحة الطالب و
            - code: SCR-05
            - text: للمشرف
          - cell "عرض مؤقت عد تنازلي لمهلة الـ 48 ساعة؛ يتم إلغاء الحجز تلقائياً في حال عدم الحضور."
        - 'row "القاعدة 8: توثيق الأضرار والأعطال عند الإرجاع عقدة الفحص Inspection → LogDamage SCR-06 فحص الاسترجاع والأضرار إلزام المشرف بملء تقرير الفحص وتحديد درجة الضرر قبل تحديث حالة الجهاز في المخزن."':
          - 'cell "القاعدة 8: توثيق الأضرار والأعطال عند الإرجاع"':
            - strong: "القاعدة 8:"
            - text: توثيق الأضرار والأعطال عند الإرجاع
          - cell "عقدة الفحص Inspection → LogDamage":
            - text: عقدة الفحص
            - code: Inspection → LogDamage
          - cell "SCR-06 فحص الاسترجاع والأضرار":
            - code: SCR-06
            - text: فحص الاسترجاع والأضرار
          - cell "إلزام المشرف بملء تقرير الفحص وتحديد درجة الضرر قبل تحديث حالة الجهاز في المخزن."
    - heading "5. هيكل وثيقة docs/SCREEN_INVENTORY.md المعتمدة" [level=3]
    - paragraph:
      - text: المخرج المعتمد من هذا الموضوع هو ملف
      - code: docs/SCREEN_INVENTORY.md
      - text: "، والذي يمثل حجر الأساس لإنشاء برومبتات الشاشات في Google Stitch بالمرحلة التالية:"
    - text: MARKDOWN — نموذج هيكل docs/SCREEN_INVENTORY.md
    - button "نسخ نموذج Screen Inventory": نسخ النموذج
    - code: "# وثيقة جرد الشاشات (Screen Inventory) ## 1. ملخص نطاق الشاشات وقواعد الحصر - حصر شاشات MVP المؤكدة (Core & Supporting) - التعهد بعدم اختراع شاشات زائدة أو استباق ميزات مستقبلية ## 2. جدول جرد الشاشات المعتمد (Screen Inventory Table) | المعرف | اسم الشاشة | المسار (Route) | الدور المسموح | الأولوية | المكونات الرئيسية | |:------:|:-----------|:---------------|:--------------|:--------:|:------------------| | SCR-01 | الرئيسية والتعريف | / | الجميع | Supporting | Hero, Featured Grid | | SCR-02 | كتالوج المعدات والبحث | /equipment | الجميع | Core | Search, Filter Pills, Grid | | SCR-03 | تفاصيل المعدة والطلب | /equipment/[id] | الطالب | Core | Specs, Booking Form, Stock | | SCR-04 | لوحة تحكم إعارات الطالب | /dashboard/loans | الطالب | Supporting | Active Loans, Due Timers | | SCR-05 | لوحة مراجعة وتسليم المشرف | /staff/requests | المشرف | Core | Requests Queue, Handover | | SCR-06 | فحص الاسترجاع وتوثيق الأضرار | /staff/inspections | المشرف | Supporting | Inspection Checklist, Damage | ## 3. المواصفة الفنية لكل شاشة (توثيق لكل شاشة: الهدف، البيانات، الإجراءات، التحقق، الحالات الست، والتجاوب) ## 4. مصفوفة تتبع التغطية مع PRD (Traceability Matrix) - ربط كل قاعدة عمل بالشاشة المعنية وضمان التغطية الكاملة"
  - complementary:
    - heading "قائمة تحقق التطبيق" [level=2]
    - group "قائمة تحقق التطبيق":
      - paragraph: هذه قائمة تقييم ذاتي لتطبيقك، مستقلة عن نسبة القراءة بالتمرير. يمكنك الانتقال بين المواضيع بحرية. تُحفظ الاختيارات في هذا المتصفح عند توفر التخزين.
      - checkbox "حصر جميع شاشات الـ MVP دون أي زيادة أو اختراع شاشات وهمية."
      - text: حصر جميع شاشات الـ MVP دون أي زيادة أو اختراع شاشات وهمية.
      - checkbox "ربط كل شاشة بهدفها وأدوارها ومسارها ومكوناتها وبياناتها وإجراءاتها."
      - text: ربط كل شاشة بهدفها وأدوارها ومسارها ومكوناتها وبياناتها وإجراءاتها.
      - checkbox "تحديد شاشات Core وSupporting بوضوح وعزل الشاشات المستقبلية."
      - text: تحديد شاشات Core وSupporting بوضوح وعزل الشاشات المستقبلية.
      - checkbox "توثيق حالات الشاشة الميدانية (فراغ، خطأ، نجاح) لكل شاشة بشكل مخصص."
      - text: توثيق حالات الشاشة الميدانية (فراغ، خطأ، نجاح) لكل شاشة بشكل مخصص.
      - checkbox "التأكد من التغطية الكاملة لقواعد العمل (مثل قواعد BorrowHub 3 و7 و8)."
      - text: التأكد من التغطية الكاملة لقواعد العمل (مثل قواعد BorrowHub 3 و7 و8).
      - checkbox "إنشاء واعتماد ملف docs/SCREEN_INVENTORY.md في المستودع."
      - text: إنشاء واعتماد ملف docs/SCREEN_INVENTORY.md في المستودع.
    - heading "روابط عملية" [level=2]
    - link "مكتبة البرومبتات":
      - /url: /prompts
    - link "دليل الأدوات":
      - /url: /tools
    - paragraph: راجع مخرجاتك للتقييم الذاتي، ويمكنك تصفح الموضوع التالي في أي وقت.
  - navigation "التنقل بين المواضيع":
    - 'link "الموضوع السابق مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة"':
      - /url: /learn/ux-blueprint
      - text: الموضوع السابق
      - strong: "مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة"
    - link "الموضوع التالي تصميم الشاشة المرجعية في Google Stitch":
      - /url: /learn/stitch-reference-screen
      - text: الموضوع التالي
      - strong: تصميم الشاشة المرجعية في Google Stitch
- contentinfo:
  - text: "Don't Just Prompt. Engineer. منهجية التطوير: فهم ← توثيق ← تحليل ← تصميم ← تنفيذ تدريجي ← تحقق MET سلاح العصر MET Academy"
  - paragraph: دورة تطبيقية متخصصة لنقل طلاب وهواة البرمجة من مجرد توجيه الأسئلة للذكاء الاصطناعي إلى قيادة عمليات هندسة البرمجيات وتحليل النظم وبناء منتجات Full-Stack قابلة للإنتاج والتسليم.
  - text: Next.js 15 App Router
  - heading "المسار التعليمي" [level=4]
  - list:
    - listitem:
      - link "› الرئيسية":
        - /url: /
    - listitem:
      - link "› ابدأ هنا (Start Here)":
        - /url: /start
    - listitem:
      - link "› مسار مواضيع التعلم":
        - /url: /learn/project-idea-mvp
    - listitem:
      - link "› ورشة مشروع BorrowHub":
        - /url: /borrowhub
  - heading "المختبرات والمكتبات" [level=4]
  - list:
    - listitem:
      - link "› مكتبة البرومبتات الكاملة":
        - /url: /prompts
    - listitem:
      - link "› مسار مواضيع المشروع":
        - /url: /roadmap
    - listitem:
      - link "› Cheatsheet البرومبتات":
        - /url: /cheatsheet
    - listitem:
      - link "› مختبر الـ8 مخططات (Mermaid)":
        - /url: /diagrams
    - listitem:
      - link "› وكلاء البرمجة (13 وكيلا)":
        - /url: /tools
    - listitem:
      - link "› مؤشر الموديلات (الأفضل الآن)":
        - /url: /models
    - listitem:
      - link "› القوالب والملفات الهندسية":
        - /url: /templates
  - heading "المراجع والمعلومات" [level=4]
  - list:
    - listitem:
      - link "› القاموس التقني (35 مصطلح)":
        - /url: /glossary
    - listitem:
      - link "› الأسئلة الشائعة (FAQ)":
        - /url: /faq
    - listitem:
      - link "› عن الدورة والأكاديمية":
        - /url: /about
  - button "العودة إلى أعلى الصفحة": العودة للأعلى
  - text: تنبيه تعليمي وأمني:جميع المواد المعروضة مخصصة للأغراض التعليمية في دورة سلاح العصر. الروابط والأدوات الخارجية (مثل Google Stitch, Mermaid, GitHub, Antigravity) مملوكة لأصحابها. يُحظر تمامًا تخزين أو نشر مفاتيح API الخاصة أو كلمات المرور أو أسرار الأنظمة داخل مستودعات Git العامة. جميع الحقوق محفوظة © 2026 MET Academy — دورة سلاح العصر (Weapon of the Era) نسخة التطوير المعتمدة 1.0 • dir="rtl"
- alert
```

# Test source

```ts
  27  | 
  28  |     // Content: Role-based matrix table
  29  |     const rolesTable = page.locator('table').filter({ hasText: 'الدور (User Role)' });
  30  |     await expect(rolesTable).toBeVisible();
  31  |     await expect(page.locator('text=الزائر العام (Guest)')).toBeVisible();
  32  |     await expect(page.locator('text=الطالب المستعير (Student)')).toBeVisible();
  33  |     await expect(page.locator('text=مشرف المستودع (Staff)')).toBeVisible();
  34  | 
  35  |     // Navigation flowchart in Mermaid
  36  |     const navMermaid = page.locator('.code-container').filter({ hasText: 'MERMAID (flowchart TD)' });
  37  |     await expect(navMermaid).toBeVisible();
  38  |     expect(await navMermaid.innerText()).toContain('flowchart TD');
  39  |     expect(await navMermaid.innerText()).toContain('BorrowHub');
  40  | 
  41  |     // PROMPT 14 section and copy button
  42  |     const prompt14Block = page.locator('.code-container').filter({ hasText: 'PROMPT 14 — UI/UX Grill Me' });
  43  |     await expect(prompt14Block).toBeVisible();
  44  |     expect(await prompt14Block.innerText()).toContain('/grill-me');
  45  |     expect(await prompt14Block.innerText()).toContain('Act as a Senior UX Researcher');
  46  | 
  47  |     // Test copy button functionality and immediate visual feedback
  48  |     const copyBtn = prompt14Block.locator('button.copy-btn');
  49  |     await expect(copyBtn).toBeVisible();
  50  |     await copyBtn.click();
  51  |     await expect(copyBtn).toHaveText(/تم النسخ/);
  52  |   });
  53  | 
  54  |   test('Topic 19 (UX Blueprint): Renders Sitemap, complete 6 essential states, and PROMPT 15', async ({ page }) => {
  55  |     await page.goto('/learn/ux-blueprint');
  56  | 
  57  |     // Header & metadata
  58  |     const topicHeader = page.locator('header.rounded-3xl');
  59  |     await expect(page.locator('h1')).toContainText('UX Blueprint');
  60  |     await expect(topicHeader).toContainText('موضوع 19');
  61  |     await expect(topicHeader).toContainText('docs/UX_BLUEPRINT.md');
  62  | 
  63  |     // Sitemap Mermaid diagram
  64  |     const sitemapBlock = page.locator('.code-container').filter({ hasText: 'MERMAID (flowchart TD) — خريطة موقع BorrowHub' });
  65  |     await expect(sitemapBlock).toBeVisible();
  66  |     const sitemapText = await sitemapBlock.innerText();
  67  |     expect(sitemapText).toContain('flowchart TD');
  68  |     expect(sitemapText).toContain('/equipment');
  69  |     expect(sitemapText).toContain('/dashboard/loans');
  70  |     expect(sitemapText).toContain('/staff/requests');
  71  | 
  72  |     // The 6 Essential States verification
  73  |     await expect(page.locator('text=1. التحميل (Loading)')).toBeVisible();
  74  |     await expect(page.locator('text=2. الفراغ (Empty)')).toBeVisible();
  75  |     await expect(page.locator('text=3. الخطأ والتعافي (Error)')).toBeVisible();
  76  |     await expect(page.locator('text=4. النجاح (Success)')).toBeVisible();
  77  |     await expect(page.locator('text=5. التجاوب (Responsive)')).toBeVisible();
  78  |     await expect(page.locator('text=6. إمكانية الوصول (Accessibility)')).toBeVisible();
  79  | 
  80  |     // Skeletons, WCAG AA, Touch targets mentioned
  81  |     await expect(page.locator('article')).toContainText('Skeleton Screens');
  82  |     await expect(page.locator('article')).toContainText('WCAG AA');
  83  |     await expect(page.locator('article')).toContainText('44px');
  84  | 
  85  |     // PROMPT 15 section
  86  |     const prompt15Block = page.locator('.code-container').filter({ hasText: 'PROMPT 15 — UX Blueprint + Screen Inventory' });
  87  |     await expect(prompt15Block).toBeVisible();
  88  |     const promptText = await prompt15Block.innerText();
  89  |     expect(promptText).toContain('Act as a Senior UX Architect');
  90  |     expect(promptText).toContain('docs/UX_BLUEPRINT.md and docs/SCREEN_INVENTORY.md');
  91  | 
  92  |     // Copy button test
  93  |     const copyBtn = prompt15Block.locator('button.copy-btn');
  94  |     await copyBtn.click();
  95  |     await expect(copyBtn).toHaveText(/تم النسخ/);
  96  |   });
  97  | 
  98  |   test('Topic 20 (Screen Inventory): Verifies strict MVP scope, SCR-01 to SCR-06, traceability matrix, and no invented screens', async ({ page }) => {
  99  |     await page.goto('/learn/screen-inventory');
  100 | 
  101 |     // Header & metadata
  102 |     const topicHeader = page.locator('header.rounded-3xl');
  103 |     await expect(page.locator('h1')).toContainText('Screen Inventory');
  104 |     await expect(topicHeader).toContainText('موضوع 20');
  105 |     await expect(topicHeader).toContainText('docs/SCREEN_INVENTORY.md');
  106 | 
  107 |     // Golden rule: No invented screens callout
  108 |     await expect(page.locator('text=حظر اختراع شاشات وهمية')).toBeVisible();
  109 |     await expect(page.locator('text=قاعدة المنع الصارم (No Invented Screens)')).toBeVisible();
  110 | 
  111 |     // Screen prioritization (Core vs Supporting vs Future)
  112 |     await expect(page.locator('text=الجوهرية (Core)')).toBeVisible();
  113 |     await expect(page.locator('text=المساندة (Supporting)')).toBeVisible();
  114 |     await expect(page.locator('text=المستقبلية (Future / Out of Scope)')).toBeVisible();
  115 | 
  116 |     // Verify all 6 MVP screens in the reference table using specific strong elements
  117 |     await expect(page.locator('strong:has-text("SCR-01")')).toBeVisible();
  118 |     await expect(page.locator('strong:has-text("SCR-02")')).toBeVisible();
  119 |     await expect(page.locator('strong:has-text("SCR-03")')).toBeVisible();
  120 |     await expect(page.locator('strong:has-text("SCR-04")')).toBeVisible();
  121 |     await expect(page.locator('strong:has-text("SCR-05")')).toBeVisible();
  122 |     await expect(page.locator('strong:has-text("SCR-06")')).toBeVisible();
  123 | 
  124 |     // Verify traceability matrix for PRD Rules 3, 7, 8
  125 |     await expect(page.locator('h3:has-text("مصفوفة تدقيق التغطية الهندسية")')).toBeVisible();
  126 |     await expect(page.locator('text=القاعدة 3:')).toBeVisible();
> 127 |     await expect(page.locator('text=القاعدة 7:')).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  128 |     await expect(page.locator('text=القاعدة 8:')).toBeVisible();
  129 | 
  130 |     // Deliverable code template
  131 |     const templateBlock = page.locator('.code-container').filter({ hasText: 'MARKDOWN — نموذج هيكل docs/SCREEN_INVENTORY.md' });
  132 |     await expect(templateBlock).toBeVisible();
  133 | 
  134 |     // Copy button test
  135 |     const copyBtn = templateBlock.locator('button.copy-btn');
  136 |     await copyBtn.click();
  137 |     await expect(copyBtn).toHaveText(/تم النسخ/);
  138 |   });
  139 | 
  140 |   test('Sequential Navigation Bounds: Seamless bi-directional transition between Topics 18, 19, and 20', async ({ page }) => {
  141 |     // 1. Start at Topic 18
  142 |     await page.goto('/learn/ui-ux-roles-navigation');
  143 | 
  144 |     // Next should link to Topic 19 (UX Blueprint)
  145 |     const nextFrom18 = page.getByRole('link', { name: /الموضوع التالي/ });
  146 |     await expect(nextFrom18).toBeVisible();
  147 |     await expect(nextFrom18).toContainText('UX Blueprint');
  148 |     await nextFrom18.click();
  149 | 
  150 |     // 2. Now on Topic 19
  151 |     await expect(page).toHaveURL(/\/learn\/ux-blueprint/);
  152 | 
  153 |     // Prev should lead back to Topic 18
  154 |     const prevFrom19 = page.getByRole('link', { name: /الموضوع السابق/ });
  155 |     await expect(prevFrom19).toBeVisible();
  156 |     await expect(prevFrom19).toContainText('الأدوار وهيكلية التنقل');
  157 | 
  158 |     // Next should link to Topic 20 (Screen Inventory)
  159 |     const nextFrom19 = page.getByRole('link', { name: /الموضوع التالي/ });
  160 |     await expect(nextFrom19).toBeVisible();
  161 |     await expect(nextFrom19).toContainText('Screen Inventory');
  162 |     await nextFrom19.click();
  163 | 
  164 |     // 3. Now on Topic 20
  165 |     await expect(page).toHaveURL(/\/learn\/screen-inventory/);
  166 | 
  167 |     // Prev should lead back to Topic 19
  168 |     const prevFrom20 = page.getByRole('link', { name: /الموضوع السابق/ });
  169 |     await expect(prevFrom20).toBeVisible();
  170 |     await expect(prevFrom20).toContainText('UX Blueprint');
  171 |     await prevFrom20.click();
  172 | 
  173 |     // Back on Topic 19
  174 |     await expect(page).toHaveURL(/\/learn\/ux-blueprint/);
  175 |   });
  176 | });
  177 | 
```