# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: entry-compatibility.spec.ts >> entry question explains both answers and opens the first topic with a keyboard at 768px
- Location: e2e/entry-compatibility.spec.ts:32:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/learn\/project-idea-mvp\/?$/
Received string:  "http://127.0.0.1:3199/"
Timeout: 7000ms

Call log:
  - Expect "toHaveURL" with timeout 7000ms
    2 × locator resolved to <html lang="ar" dir="rtl" data-theme="light" class="scroll-smooth">…</html>
      - unexpected value "http://127.0.0.1:3199/"

```

```yaml
- link "تخطي إلى المحتوى الرئيسي":
  - /url: "#main-content"
- banner:
  - link "MET Academy سلاح العصر - الصفحة الرئيسية":
    - /url: /
    - text: MET سلاح العصر
  - link "ابدأ الآن":
    - /url: /start
  - button "التحويل إلى النمط الليلي"
  - button "فتح قائمة التنقل الرئيسية"
- main:
  - text: AI الدليل الهندسي الشامل نمذجة وبناء المشاريع بالذكاء الاصطناعي
  - textbox "ابحث (Sequence, PRD, N+1, B-Tree, UML)..."
  - text: /
  - button "عرض المفضلة":
    - img
    - text: "0"
  - button "القارئ الصوتي"
  - button "طباعة كملف PDF":
    - img
    - text: طباعة PDF
  - button "تبديل النمط"
  - button "المفضلة 0"
  - button "كافة الأقسام 58"
  - button "المرحلة التأسيسية 6"
  - button "المعمارية والنمذجة 20"
  - button "قواعد البيانات والأداء 4"
  - button "الواجهات والفرونت إند 23"
  - button "الجودة والتحقق 2"
  - button "المراجع والقاموس 3"
  - button "الكل"
  - button "مخططات"
  - button "برومبتات"
  - button "أكواد"
  - button "قوائم فحص"
  - button "مصطلحات"
  - strong: "58"
  - text: /58
  - main:
    - text: MET Academy — سلاح العصر
    - 'heading "من فكرة مشروعك إلى منتج Full-Stack: واجهات وخادم وبيانات واختبار ونشر" [level=2]'
    - paragraph: لمن يعرف أساسيات البرمجة ويبدأ تعلّم وكلاء الذكاء الاصطناعي (AI Agents)، ويريد تحويل فكرة تطبيق إلى مشروع واضح خطوة بخطوة.
    - paragraph: "المدة الرسمية للبرنامج: 40 ساعة. ترتيب المواضيع يتبع اعتماديات مشروعك؛ ليس توزيعًا زمنيًا للساعات."
    - paragraph:
      - strong: "ستبدأ بـ اختيار فكرة المشروع وتحديد MVP:"
      - text: "كتابة docs/PROJECT_CONTEXT.md لمشروعك: مشكلة ومستخدمون وقيمة ورحلة MVP وميزات مؤجلة، مع فصل القرارات عن الافتراضات والأسئلة استعدادًا لمقابلة Grill Me."
    - paragraph:
      - strong: "مخرجك الأول:"
      - text: docs/PROJECT_CONTEXT.md
    - link "ابدأ بالموضوع الأول":
      - /url: /learn/project-idea-mvp
    - 'link "ابدأ هنا: كيف تستخدم المسار؟"':
      - /url: /start
    - text: 58 درسًا 8 مخططات 38+ برومبتاً 0 مفضلة
    - 'region "سؤال الانطلاق: ما أول خطوة لبناء مشروعك؟"':
      - 'heading "سؤال الانطلاق: ما أول خطوة لبناء مشروعك؟" [level=2]'
      - button "أفهم المشكلة والمستخدم وأحدد نطاق النسخة الأولى" [pressed]
      - button "أثبت وكيل البرمجة وSkills وMCP أولًا"
      - button "أطلب من AI بناء التطبيق كاملًا"
      - status: "صحيح. ابدأ بسياق مشروعك: المشكلة والمستخدم والقيمة ونطاق MVP، ثم استخدم Grill Me لكشف الأسئلة قبل صياغة PRD."
    - article:
      - text: 01 الفكرة ونطاق النسخة الأولى المرحلة التأسيسية 11 دقيقة
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 01"
      - button "طباعة الموضوع 01 كملف PDF"
      - heading "اختيار فكرة المشروع وتحديد MVP" [level=3]:
        - link "اختيار فكرة المشروع وتحديد MVP":
          - /url: /learn/project-idea-mvp
      - paragraph: مثال محلول وتمرين موجّه لكتابة سياق مشروعك ونطاق نسخته الأولى
      - paragraph: تعلّم تحديد المشكلة والمستخدم والقيمة ورحلة MVP بمثال BorrowHub اختياري، ثم اكتب docs/PROJECT_CONTEXT.md لمشروعك وراجع القرارات والافتراضات والأسئلة قبل Grill Me.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/PROJECT_CONTEXT.md
      - text: 11 دقيقة 1 برومبتات 3 أكواد 5 بنود MVP PROJECT_CONTEXT.md Problem Statement +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/project-idea-mvp
      - button "معاينة سريعة"
    - article:
      - text: 02 تحليل المتطلبات وهندسة المنتج المرحلة التأسيسية 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 02"
      - button "طباعة الموضوع 02 كملف PDF"
      - heading "استجواب الفكرة واستكشاف المتطلبات (Grill Me)" [level=3]:
        - link "استجواب الفكرة واستكشاف المتطلبات (Grill Me)":
          - /url: /learn/discovery-grill-me
      - paragraph: مقابلة استجوابية خطوة بخطوة لكشف الافتراضات وتثبيت القرارات قبل صياغة الوثائق
      - paragraph: منهجية المقابلة الاستجوابية الحازمة (Grill Me) لطرح سؤال واحد في كل مرة، وتحدي الإجابات الفضفاضة، وحسم نطاق MVP، وتوثيق سجل القرارات المعتمدة وتمييز الافتراضات والأسئلة المفتوحة دون الحاجة لأدوات برمجية متقدمة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/DECISIONS_LOG.md
      - text: 5 دقائق 1 برومبتات 2 أكواد 6 بنود Grill Me Product Discovery MVP Scope +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/discovery-grill-me
      - button "معاينة سريعة"
    - article:
      - text: 03 توثيق وهندسة المتطلبات المرحلة التأسيسية 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 03"
      - button "طباعة الموضوع 03 كملف PDF"
      - heading "وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها" [level=3]:
        - link "وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها":
          - /url: /learn/prd-specification
      - paragraph: البنية المرجعية الكاملة، وعزل المؤكد عن الافتراضات، والمراجعة النقدية لكشف التناقضات
      - paragraph: صياغة وثيقة متطلبات المنتج الكاملة (PRD) ببنيتها المرجعية ذات الـ 27 قسمًا، استنادًا لقرارات Grill Me، مع الترقيم الصارم للمتطلبات الوظيفية وغير الوظيفية وقواعد العمل، وإجراء مراجعة نقدية صارمة لكشف التناقضات وتضخم النطاق وتوثيق تقرير المراجعة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/PRD.md (متضمنة الأقسام الـ 27 المرجعية)
      - text: 6 دقائق 2 برومبتات 2 أكواد 6 بنود PRD Product Requirements 27 Sections +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/prd-specification
      - button "معاينة سريعة"
    - article:
      - text: 04 هندسة المتطلبات والتحقق المرحلة التأسيسية 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 04"
      - button "طباعة الموضوع 04 كملف PDF"
      - heading "مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول" [level=3]:
        - link "مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول":
          - /url: /learn/srs
      - paragraph: تحويل بنود PRD إلى سلوك تقني مدقق، وحالات استثناء وأخطاء، ومعايير Given/When/Then
      - paragraph: الانتقال من متطلبات المنتج (PRD) إلى مواصفات متطلبات النظام (SRS)، وتفصيل سلوك النظام الداخلي، شروط التحقق، ومعالجة أخطاء المدخلات والحدود القصوى، وصياغة معايير القبول القابلة للاختبار بصيغة Given/When/Then، مع الحفاظ على مصفوفة التتبع دون اختراع قرارات عمل جديدة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/SRS.md (مواصفات السلوك ومعايير القبول Given/When/Then)
      - text: 5 دقائق 1 برومبتات 2 أكواد 7 بنود SRS Given-When-Then Acceptance Criteria +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/srs
      - button "معاينة سريعة"
    - article:
      - text: 05 إدارة النسخ وتوثيق المشروع المرحلة التأسيسية 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 05"
      - button "طباعة الموضوع 05 كملف PDF"
      - 'heading "Git: حفظ وثائق المشروع وتتبع النسخ محلياً" [level=3]':
        - 'link "Git: حفظ وثائق المشروع وتتبع النسخ محلياً"':
          - /url: /learn/git-project-docs
      - paragraph: تأسيس المستودع، حماية الأسرار عبر .gitignore، وتوثيق سجل التغييرات والفروع الآمنة
      - paragraph: تهيئة مستودع Git محلي لحفظ وثائق مشروع الطالب (PROJECT_CONTEXT.md، PRD.md، SRS.md)، إعداد .gitignore لحماية الأسرار وملفات البيئة، تسجيل نقاط الحفظ عبر commits واضحة، وإنشاء فروع توثيق آمنة ومراجعة التغييرات والتراجع الآمن.
      - paragraph:
        - strong: "المخرج:"
        - text: مستودع Git محلي مهيأ (.git)
      - text: 5 دقائق 1 برومبتات 5 أكواد 5 بنود Git Version Control .gitignore +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/git-project-docs
      - button "معاينة سريعة"
    - article:
      - text: 06 المستودع البعيد والمراجعة المرحلة التأسيسية 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 06"
      - button "طباعة الموضوع 06 كملف PDF"
      - 'heading "GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار" [level=3]':
        - 'link "GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار"':
          - /url: /learn/github-docs-collaboration
      - paragraph: مزامنة الوثائق ومراجعة التغييرات عبر Pull Requests وتأمين الأسرار والتعاون الهندسي
      - paragraph: ربط مستودع وثائق مشروع الطالب بمنصة GitHub، صياغة ملف README تعريفي بمشروع الطالب، رفع التغييرات بأمان عبر SSH أو Personal Access Token، فتح Pull Request لمراجعة الوثائق، وتأمين الأسرار وفحص السجل قبل النشر.
      - paragraph:
        - strong: "المخرج:"
        - text: مستودع GitHub بعيد مرتبط بالمشروع
      - text: 5 دقائق 1 برومبتات 5 أكواد 5 بنود GitHub Remote Repository README.md +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/github-docs-collaboration
      - button "معاينة سريعة"
    - article:
      - text: 07 أدوات الرسم والنمذجة التحليل وهندسة النظم 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 07"
      - button "عرض المخطط البياني للموضوع 07"
      - button "طباعة الموضوع 07 كملف PDF"
      - heading "صيغة Mermaid ومحرك التصيير في المتصفح" [level=3]:
        - link "صيغة Mermaid ومحرك التصيير في المتصفح":
          - /url: /learn/mermaid-syntax
      - paragraph: كتابة المخططات ككود نصي قابل للإصدار والنسخ والتصيير المباشر
      - paragraph: إتقان صيغة Mermaid.js كأداة رسم تعتمد على النصوص (Diagrams as Code)، واستخدام محرك التصيير المدمج ومحرر Mermaid Live، مع معالجة أخطاء الصياغة وفصل التوثيق عن التنفيذ البرمجي.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/README.md
      - text: 4 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 5 بنود Mermaid Diagrams as Code Mermaid Live +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/mermaid-syntax
      - button "معاينة سريعة"
    - article:
      - text: 08 رحلة المستخدم وهندسة السلوك التحليل وهندسة النظم 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 08"
      - button "عرض المخطط البياني للموضوع 08"
      - button "طباعة الموضوع 08 كملف PDF"
      - heading "نمذجة مسارات تدفق المستخدم (User Flow)" [level=3]:
        - link "نمذجة مسارات تدفق المستخدم (User Flow)":
          - /url: /learn/user-flow-modeling
      - paragraph: رسم رحلة المستخدم وقراراته ومسارات النجاح والفشل استناداً إلى PRD
      - paragraph: تحويل متطلبات PRD المعتمدة إلى مسارات تدفق مستخدم (User Flow) منضبطة بصيغة Mermaid flowchart TD، وتحديد نقاط القرار، ورسم مسار النجاح (Happy Path) ومسارات الفشل والاعتذار دون اختراع قواعد عمل غير موثقة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/user-flow.md
      - text: 4 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود User Flow Mermaid Happy Path +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/user-flow-modeling
      - button "معاينة سريعة"
    - article:
      - text: 09 نمذجة مفاهيم الأعمال التحليل وهندسة النظم 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 09"
      - button "عرض المخطط البياني للموضوع 09"
      - button "طباعة الموضوع 09 كملف PDF"
      - heading "النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)" [level=3]:
        - link "النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)":
          - /url: /learn/conceptual-domain-model
      - paragraph: تحديد مفاهيم العمل وعلاقاتها بلغة الأعمال دون تفاصيل تقنية أو جداول SQL
      - paragraph: بناء نموذج مفاهيمي (Conceptual Domain Model) خالص بصيغة Mermaid flowchart LR يحدد مفاهيم النظام ومسؤولياتها والعلاقات بينها بلغة الأعمال، مع الالتزام التام بالابتعاد عن مفاتيح قواعد البيانات (No PK/FK)، وأنواع SQL، والكلاسات والدوال البرمجية.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/domain-model.md
      - text: 4 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود Domain Model Conceptual DDD +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/conceptual-domain-model
      - button "معاينة سريعة"
    - article:
      - text: 10 أدوات النمذجة السلوكية التحليل وهندسة النظم 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 10"
      - button "عرض المخطط البياني للموضوع 10"
      - button "طباعة الموضوع 10 كملف PDF"
      - heading "أداة ومحرر PlantUML للنمذجة الهندسية ككود" [level=3]:
        - link "أداة ومحرر PlantUML للنمذجة الهندسية ككود":
          - /url: /learn/plantuml
      - paragraph: فهم بيئة PlantUML والفرق بينها وبين Mermaid ومحررات التصيير المباشر وقوالب الكود القابلة للنسخ
      - paragraph: مقدمة معمارية لأداة PlantUML كأداة متخصصة في نمذجة سلوك الأنظمة (Use Case)، وبيان الفروق الجوهرية بينها وبين Mermaid ومحركات التصيير، واستخدام محررات PlantText وPlantUML الرسمية مع كود صالح وقابل للنسخ المباشر.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/README-plantuml.md
      - text: 4 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود PlantUML UML PlantText +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/plantuml
      - button "معاينة سريعة"
    - article:
      - text: 11 صلاحيات الأدوار والحدود التحليل وهندسة النظم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 11"
      - button "عرض المخطط البياني للموضوع 11"
      - button "طباعة الموضوع 11 كملف PDF"
      - heading "مخطط حالات الاستخدام (Use Case Diagram)" [level=3]:
        - link "مخطط حالات الاستخدام (Use Case Diagram)":
          - /url: /learn/use-case-diagram
      - paragraph: تحديد فواعل النظام وصلاحيات الأدوار وحدود النظام واستخدام include وextend بمسوغ موثق
      - paragraph: بناء مخطط حالات الاستخدام (Use Case Diagram) بصيغة PlantUML استناداً إلى PRD وUser Flow، لتحديد الفواعل (Actors) وصلاحيات كل دور وحدود النظام (System Boundary)، مع الالتزام التام بضوابط علاقتي include وextend وعدم استخدامهما إلا بمسوغ وظيفي صريح.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/use-case.puml
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود Use Case PlantUML Actors +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/use-case-diagram
      - button "معاينة سريعة"
    - article:
      - text: 12 مسارات وقرارات العمليات التحليل وهندسة النظم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 12"
      - button "عرض المخطط البياني للموضوع 12"
      - button "طباعة الموضوع 12 كملف PDF"
      - heading "مخطط النشاط وسير العمليات (Activity Diagram)" [level=3]:
        - link "مخطط النشاط وسير العمليات (Activity Diagram)":
          - /url: /learn/activity-diagram
      - paragraph: نمذجة مسارات العمليات وقرارات التشغيل والتفرعات البديلة بصيغة Mermaid flowchart TD
      - paragraph: نمذجة العمليات التشغيلية التفاعلية لنطاق MVP عبر مخطط نشاط بصيغة Mermaid flowchart TD، لإبراز خطوات الفواعل والنظام، ونقاط القرار (Decision Nodes)، ومسارات النجاح والرفض والتعافي دون قفز على شروط التحقق أو منطق الأعمال.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/activity-diagram.md
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود Activity Diagram Mermaid Process Flow +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/activity-diagram
      - button "معاينة سريعة"
    - article:
      - text: 13 حالات الكائنات والانتقالات التحليل وهندسة النظم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 13"
      - button "عرض المخطط البياني للموضوع 13"
      - button "طباعة الموضوع 13 كملف PDF"
      - heading "مخطط الحالات ودورة حياة الكيانات (State Diagram)" [level=3]:
        - link "مخطط الحالات ودورة حياة الكيانات (State Diagram)":
          - /url: /learn/state-diagram
      - paragraph: نمذجة حالات الكائنات والانتقالات الموثقة وأحداث التبديل دون اختراع حالات وهمية
      - paragraph: بناء آلة حالات (State Machine) لكيانات النظام الجوهرية (مثل طلب الاستعارة LoanRequest) بصيغة Mermaid stateDiagram-v2، مع الالتزام الصارم بالحالات الموثقة في PRD وقواعد العمل، وتوثيق أحداث التبديل وشروط الحراسة دون اختراع أي حالات غير موثقة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/state-diagrams.md
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود State Diagram stateDiagram-v2 State Machine +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/state-diagram
      - button "معاينة سريعة"
    - article:
      - text: 14 نمذجة قواعد البيانات قواعد البيانات والنمذجة 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 14"
      - button "عرض المخطط البياني للموضوع 14"
      - button "طباعة الموضوع 14 كملف PDF"
      - heading "مخطط العلاقات بين الكيانات (ERD) ونمذجة قواعد البيانات" [level=3]:
        - link "مخطط العلاقات بين الكيانات (ERD) ونمذجة قواعد البيانات":
          - /url: /learn/relational-erd-design
      - paragraph: تصميم الجداول والمفاتيح والعلاقات والقيود لنطاق MVP مع مراجعة الجودة وتجنب حالات السباق
      - paragraph: تحويل مفاهيم النظام وقواعد العمل المعتمدة إلى مخطط علائقي (ERD) منضبط يحدد الجداول والأعمدة والمفاتيح الأساسية والأجنبية (PK/FK) ودرجات العلاقة (Cardinality)، مع تطبيق قيود السلامة المرجعية وصيغة التفكيك 3NF ومراجعة حالات التزامن وحفظ المخرجات في docs/ERD.md وdocs/database-review.md.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/ERD.md
      - text: 6 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود ERD Database Modeling Primary Key +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/relational-erd-design
      - button "معاينة سريعة"
    - article:
      - text: 15 أدوات نمذجة البيانات قواعد البيانات والنمذجة 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 15"
      - button "عرض المخطط البياني للموضوع 15"
      - button "طباعة الموضوع 15 كملف PDF"
      - heading "لغة DBML ومحرر dbdiagram.io" [level=3]:
        - link "لغة DBML ومحرر dbdiagram.io":
          - /url: /learn/dbml-dbdiagram-io
      - paragraph: كتابة مخططات قواعد البيانات بلغة DBML التفاعلية، تصدير SQL، وفهم الفروق الجوهرية عن Mermaid
      - paragraph: إتقان لغة توصيف قواعد البيانات DBML (Database Markup Language) واستخدام محررها المخصص dbdiagram.io لرسم الجداول والعلاقات التفاعلية، وتصدير أكواد PostgreSQL DDL، مع توضيح الفروق الجوهرية بين DBML وMermaid وعدم خلطهما.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/database.dbml
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 5 بنود DBML dbdiagram.io Database DDL +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/dbml-dbdiagram-io
      - button "معاينة سريعة"
    - article:
      - text: 16 النمذجة السلوكية والديناميكية التحليل وهندسة النظم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 16"
      - button "عرض المخطط البياني للموضوع 16"
      - button "طباعة الموضوع 16 كملف PDF"
      - heading "مخطط تسلسل التفاعلات (Sequence Diagram)" [level=3]:
        - link "مخطط تسلسل التفاعلات (Sequence Diagram)":
          - /url: /learn/sequence-diagram-modeling
      - paragraph: توثيق ترتيب الرسائل والتفاعلات الزمنية بين المستخدم والنظام ومخزن البيانات لحالات الاستخدام الأساسية
      - paragraph: بناء مخططات تسلسل التفاعلات (Sequence Diagrams) بصيغة Mermaid sequenceDiagram لحالات الاستخدام الرئيسية لنطاق MVP، مبيناً الفواعل (Actors)، والمشاركين المنطقيين (User, Application, Data Store)، وترتيب الرسائل، والفحوصات، والتفرعات البديلة (alt / else) لمسارات النجاح والخطأ، استناداً الصارم لمتطلبات PRD دون اختراع عمليات غير مبررة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/sequence-diagrams.md
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 6 بنود Sequence Diagram Mermaid Dynamic Modeling +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/sequence-diagram-modeling
      - button "معاينة سريعة"
    - article:
      - text: 17 التصميم الكائني والمعماري التحليل وهندسة النظم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 17"
      - button "عرض المخطط البياني للموضوع 17"
      - button "طباعة الموضوع 17 كملف PDF"
      - heading "مخطط الكلاسات البرمجية (Class Diagram)" [level=3]:
        - link "مخطط الكلاسات البرمجية (Class Diagram)":
          - /url: /learn/class-diagram-design
      - paragraph: بناء الهيكل الكائني للنظام وعلاقات الفئات اعتماداً على مخرجات ERD وSequence
      - paragraph: تصميم مخطط الكلاسات (Class Diagram) بصيغة Mermaid classDiagram لنطاق MVP، بالاعتماد الصارم على مخرجات ERD (لتحديد الخصائص والبيانات المخزنة) ومخططات Sequence (لتبرير العمليات والوظائف الديناميكية)، مع تمثيل العلاقات الكائنية، دون اختراع كلاسات أو دوال غير مدعومة بالمتطلبات.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/diagrams/class-diagram.md
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 6 بنود Class Diagram Mermaid Object-Oriented Design +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/class-diagram-design
      - button "معاينة سريعة"
    - article:
      - text: 18 تجربة المستخدم وهندسة المعلومات الواجهات وتطوير الفرونت إند 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 18"
      - button "عرض المخطط البياني للموضوع 18"
      - button "طباعة الموضوع 18 كملف PDF"
      - 'heading "تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل" [level=3]':
        - 'link "تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل"':
          - /url: /learn/ui-ux-roles-navigation
      - paragraph: تحويل متطلبات المنتج إلى هندسة معلومات، توزيع الأدوار، وهياكل تنقل واضحة قبل التصميم المرئي
      - paragraph: تفكيك متطلبات المنتج المعتمدة إلى معمارية معلومات واضحة، تحديد مصفوفة صلاحيات الأدوار على الواجهة، بناء نماذج التنقل المتجاوبة مع خصوصية اللغة العربية (RTL)، وإجراء مقابلة UI/UX Grill Me التفاعلية (PROMPT 14) لتوثيق ملف docs/UI_UX_REQUIREMENTS.md.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/UI_UX_REQUIREMENTS.md
      - text: 6 دقائق مخطط Mermaid 1 برومبتات 3 أكواد 5 بنود UI/UX Information Architecture Roles Matrix +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/ui-ux-roles-navigation
      - button "معاينة سريعة"
    - article:
      - text: 19 مخطط التجربة وهندسة الحالات الواجهات وتطوير الفرونت إند 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 19"
      - button "عرض المخطط البياني للموضوع 19"
      - button "طباعة الموضوع 19 كملف PDF"
      - 'heading "مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة" [level=3]':
        - 'link "مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة"':
          - /url: /learn/ux-blueprint
      - paragraph: تخطيط رحلات المستخدم المكتملة، خريطة الموقع (Sitemap)، وهندسة حالات التحميل والفراغ والخطأ والنجاح والتجاوب والوصول
      - paragraph: "بناء مخطط تجربة مستخدم متكامل (UX Blueprint) يضم خريطة مسارات الموقع (Sitemap)، وهندسة السلوك الدقيق للحالات الست الإلزامية: التحميل (Loading)، الفراغ (Empty)، الخطأ (Error)، النجاح (Success)، التجاوب (Responsive)، وإمكانية الوصول (Accessibility)، وتوثيقها في docs/UX_BLUEPRINT.md."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/UX_BLUEPRINT.md
      - text: 6 دقائق مخطط Mermaid 1 برومبتات 3 أكواد 6 بنود UX Blueprint Sitemap User Journeys +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/ux-blueprint
      - button "معاينة سريعة"
    - article:
      - text: 20 جرد الشاشات وهندسة النطاق الواجهات وتطوير الفرونت إند 7 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 20"
      - button "طباعة الموضوع 20 كملف PDF"
      - 'heading "جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات" [level=3]':
        - 'link "جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات"':
          - /url: /learn/screen-inventory
      - paragraph: توثيق كل شاشة بهدفها، أدوارها، مكوناتها، بياناتها، إجراءاتها، وحالاتها دون اختراع شاشات زائدة
      - paragraph: إعداد جرد شاشات منضبط (Screen Inventory) يحصر شاشات MVP فقط ويربط كل شاشة بهدفها، أدوارها المصرحة، مسارها في Next.js، مكوناتها، بياناتها، إجراءاتها، وحالاتها التفصيلية، مع مصفوفة تدقيق التغطية الهندسية (Traceability Matrix) لضمان عدم اختراع شاشات زائدة وحفظ المخرج في docs/SCREEN_INVENTORY.md.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/SCREEN_INVENTORY.md
      - text: 7 دقائق 1 برومبتات 2 أكواد 6 بنود Screen Inventory MVP Scope No Invented Screens +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/screen-inventory
      - button "معاينة سريعة"
    - article:
      - text: 21 تصميم الواجهات والشاشة المرجعية الواجهات وتطوير الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 21"
      - button "عرض المخطط البياني للموضوع 21"
      - button "طباعة الموضوع 21 كملف PDF"
      - heading "تصميم الشاشة المرجعية في Google Stitch" [level=3]:
        - link "تصميم الشاشة المرجعية في Google Stitch":
          - /url: /learn/stitch-reference-screen
      - paragraph: ابدأ بشاشة تمثيلية واحدة لحسم الهوية واللغة البصرية قبل توليد بقية الشاشات
      - paragraph: استخدام Google Stitch لتصميم الشاشة المرجعية الأولى لنطاق MVP استناداً إلى PRD وUX Blueprint وجرد الشاشات. يركز الموضوع على منع خطأ توليد الشاشات دفعة واحدة، وصياغة البرومبت الرئيسي المخصص (PROMPT 16)، وتثبيت اتجاه RTL والتخطيط العام، وتنقيح الشاشة المختارة عبر (PROMPT 19) حتى اعتمادها كمرجع وحيد.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/STITCH_MASTER_PROMPT.md
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 5 بنود Google Stitch Reference Screen MVP +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/stitch-reference-screen
      - button "معاينة سريعة"
    - article:
      - text: 22 النظم البصرية وتوليد الشاشات الواجهات وتطوير الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 22"
      - button "طباعة الموضوع 22 كملف PDF"
      - heading "قواعد نظام التصميم وبرومبتات الشاشات المنفصلة" [level=3]:
        - link "قواعد نظام التصميم وبرومبتات الشاشات المنفصلة":
          - /url: /learn/design-system-rules
      - paragraph: استخراج قواعد النظام البصري من الشاشة المرجعية وتطبيقها على برومبت مستقل لكل شاشة
      - paragraph: "صياغة وتوثيق قواعد نظام التصميم (Design System) المنبثق من الشاشة المرجعية: توزيع الألوان بقاعدة 60-30-10، تدرج التايبوجرافي، شبكة المسافات 8px، حالات المكونات الست (Default, Loading, Empty, Error, Disabled, Permission Denied)، وإرشادات إمكانية الوصول وRTL. ثم تطبيق هذه القواعد الصارمة عبر برومبتات منفصلة ومستقلة لكل شاشة في جرد الشاشات وتوثيقها في docs/STITCH_SCREEN_PROMPTS.md دون كتابة أي كود برمجي."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/STITCH_SCREEN_PROMPTS.md
      - text: 5 دقائق 2 برومبتات 2 أكواد 6 بنود Design System Color Tokens Typography +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/design-system-rules
      - button "معاينة سريعة"
    - article:
      - text: 23 فحص النماذج والتحقق التفاعلي الواجهات وتطوير الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 23"
      - button "طباعة الموضوع 23 كملف PDF"
      - heading "النموذج التفاعلي (Prototype) والتحقق من الرحلات" [level=3]:
        - link "النموذج التفاعلي (Prototype) والتحقق من الرحلات":
          - /url: /learn/interactive-prototype
      - paragraph: ربط الشاشات وفحص مسارات المستخدم وحالات النظام بدل عرض أزرار تجربة وهمية
      - paragraph: "بناء النموذج التفاعلي (Interactive Prototype) بربط شاشات MVP المصممة في Google Stitch، واختبار الرحلات السلوكية الكاملة للمستخدمين. يركز الموضوع على منع وهم \"زر التجربة الشكلي\" (Fake Demo Button)، ويُخضع النموذج لفحص دقيق يشمل: تحديد المشغلات والوجهات، مسار النجاح، مسارات الفشل والاعتذار، حالات التراجع والإلغاء، وقيود الصلاحيات، مع إجراء فحص تدقيق بصري شامل (PROMPT 21) قبل البدء في مرحلة الكود."
      - paragraph:
        - strong: "المخرج:"
        - text: نموذج تفاعلي متصل في Google Stitch
      - text: 5 دقائق 2 برومبتات 2 أكواد 6 بنود Prototype User Journeys Happy Path +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/interactive-prototype
      - button "معاينة سريعة"
    - article:
      - text: 24 أدوات التنفيذ البرمجي الواجهات وتطوير الفرونت إند 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 24"
      - button "عرض المخطط البياني للموضوع 24"
      - button "طباعة الموضوع 24 كملف PDF"
      - heading "وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)" [level=3]:
        - link "وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)":
          - /url: /learn/ai-coding-agent
      - paragraph: مفهوم الوكيل، صلاحيات الملفات والأوامر، إدارة السياق، وأمان الأسرار دون فرض بيئة محددة
      - paragraph: نقل إعداد وكيل البرمجة إلى مدخل تنفيذ الكود بدل إثقال بداية المسار به. شرح دور وكيل البرمجة كمنفذ للمهام البرمجية، نموذج الصلاحيات (قراءة وتعديل الملفات وتشغيل أوامر الطرفية)، إدارة نافذة السياق (Context Window) وتجنب الحشو، إدارة الأسرار والمتغيرات البيئية (.env) وحمايتها من التسريب في Git، مع التأكيد الصارم على حرية اختيار الأداة وعدم فرض أي اشتراك مدفوع.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/CODING_AGENT_SETUP.md
      - text: 6 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 6 بنود Coding Agent Permissions Context Management +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/ai-coding-agent
      - button "معاينة سريعة"
    - article:
      - text: 25 أدوات التنفيذ البرمجي الواجهات وتطوير الفرونت إند 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 25"
      - button "عرض المخطط البياني للموضوع 25"
      - button "طباعة الموضوع 25 كملف PDF"
      - heading "استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول" [level=3]:
        - link "استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول":
          - /url: /learn/google-ai-studio
      - paragraph: بيئة تجربة نماذج Gemini، إدارة المفاتيح والتعليمات، وتوليد البيانات التمثيلية (Mock Data) دون تشتيت متطلبات المشروع
      - paragraph: موقع Google AI Studio في مسار التنفيذ بجانب أدوات الواجهة، لمنع تشتيت المراحل المبكرة من اكتشاف المتطلبات. شرح استخدام المنصة لاختبار نماذج Gemini (مثل Gemini 1.5 Pro وFlash)، ضبط تعليمات النظام (System Instructions)، استخراج البيانات التمثيلية (Mock Data) بصيغة JSON وفق معطيات ERD وجرد الشاشات، وإدارة مفاتيح API بأمان، مع إيضاح حدود الاستخدام المجاني ومعدلات الطلبات (Rate Limits) دون افتراض اشتراكات أو ضمانات غير مشروطة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/AI_STUDIO_WORKFLOW.md
      - text: 4 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 6 بنود Google AI Studio Gemini API System Instructions +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/google-ai-studio
      - button "معاينة سريعة"
    - article:
      - text: 26 أدوات التنفيذ البرمجي الواجهات وتطوير الفرونت إند 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 26"
      - button "عرض المخطط البياني للموضوع 26"
      - button "طباعة الموضوع 26 كملف PDF"
      - heading "المهارات المخصصة (Skills) وتوجيه وكيل البرمجة" [level=3]:
        - link "المهارات المخصصة (Skills) وتوجيه وكيل البرمجة":
          - /url: /learn/agent-skills
      - paragraph: تزويد الوكيل بتعليمات تخصصية وسياق منهجي دون حشو نافذة السياق أو تكرار الأوامر
      - paragraph: "مفهوم المهارات البرمجية المخصصة (Skills) كتعليمات تخصصية إجرائية ترشد الوكيل لطريقة إنجاز مهام معينة وفق أفضل الممارسات. ترسيخ القاعدة الذهبية: «الوكيل ينفّذ، والمهارة ترشده، وMCP يوصله بالأدوات، وPRD يحدد المطلوب». شرح الفرق بين البرومبت العابر والمهارة الدائمة، كيفية تنظيم المهارات في ملفات المشروع دون استنزاف السياق، وتوضيح أن مهارات مثل Grill Me أو UI/UX Pro Max ليست عائق تثبيت مسبق لاكتشاف المتطلبات."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/PROJECT_AGENT_SKILLS.md
      - text: 4 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Agent Skills Custom Skills Golden Rule +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/agent-skills
      - button "معاينة سريعة"
    - article:
      - text: 27 أدوات التنفيذ البرمجي الواجهات وتطوير الفرونت إند 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 27"
      - button "عرض المخطط البياني للموضوع 27"
      - button "طباعة الموضوع 27 كملف PDF"
      - heading "بروتوكول سياق النموذج (MCP - Model Context Protocol)" [level=3]:
        - link "بروتوكول سياق النموذج (MCP - Model Context Protocol)":
          - /url: /learn/mcp-protocol
      - paragraph: المعمارية القياسية لربط وكيل البرمجة بالأدوات الخارجية وأمان الصلاحيات قبل ربط Stitch MCP
      - paragraph: تأسيس فهم بروتوكول سياق النموذج (Model Context Protocol - MCP) كمعيار مفتوح يربط وكلاء البرمجة بمصادر البيانات والأدوات الخارجية (مثل أنظمة الملفات، وقواعد البيانات، وStitch MCP لاحقاً). شرح معمارية Client-Host-Server، أنواع القدرات (Tools, Resources, Prompts)، حوكمة الصلاحيات (Permission Handshake)، وإدارة أسرار خوادم MCP في ملفات الإعداد المحلية، مع التأكيد على المسار البديل اليدوي في حال تعذر تشغيل MCP.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/MCP_FOUNDATIONS.md
      - text: 4 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 6 بنود MCP Model Context Protocol MCP Architecture +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/mcp-protocol
      - button "معاينة سريعة"
    - article:
      - text: 28 أدوات التنفيذ والتصميم الواجهات وتطوير الفرونت إند 8 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 28"
      - button "عرض المخطط البياني للموضوع 28"
      - button "طباعة الموضوع 28 كملف PDF"
      - heading "ربط Stitch MCP واسترجاع مراجع التصميم البصري" [level=3]:
        - link "ربط Stitch MCP واسترجاع مراجع التصميم البصري":
          - /url: /learn/stitch-mcp-integration
      - paragraph: قراءة بيانات الشاشات المعتمدة وحوكمة أسرار الاتصال مع توفير البديل اليدوي الكامل
      - paragraph: تكامل خادم Stitch MCP مع وكيل البرمجة لقراءة مراجع وبيانات التصميم (Design Metadata) والشاشات المعتمدة في Google Stitch بعد اكتمال مرحلة التصميم وإعداد أسس MCP. يشرح الموضوع إدارة أسرار الاتصال ومفاتيح API بأمان محلياً دون إظهارها في الأمثلة أو المستودع، وتشغيل برومبت التحقق (PROMPT 22) بصلاحية قراءة فقط، مع تقديم مسار بديل يدوي كامل وموثق لنقل الأصول والتصميمات عند تعذر تشغيل خادم MCP لضمان استمرارية تعلم الطالب دون عوائق.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/STITCH_SCREEN_REFERENCES.md
      - text: 8 دقائق مخطط Mermaid 1 برومبتات 3 أكواد 6 بنود Stitch MCP Google Stitch MCP Tools +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/stitch-mcp-integration
      - button "معاينة سريعة"
    - article:
      - text: 29 أنظمة وقواعد التصميم الواجهات وتطوير الفرونت إند 8 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 29"
      - button "عرض المخطط البياني للموضوع 29"
      - button "طباعة الموضوع 29 كملف PDF"
      - heading "وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة" [level=3]:
        - link "وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة":
          - /url: /learn/design-md-spec
      - paragraph: صياغة وثيقة نظام التصميم القياسية واستخراج التوكنز الحقيقية دون اختراع هوية جديدة
      - paragraph: صياغة وثيقة DESIGN.md القياسية المتوافقة مع معايير Google، واستخراج رموز التصميم (Design Tokens) والشرح المنطقي الهيكلي (Rationale) من الشاشات المعتمدة ومراجع Stitch المسترجعة في الموضوع السابق. يرسخ الموضوع مبدأ توثيق القيم الواقعية المعتمدة فعلياً في مشروع الطالب ومنع اختراع هوية جديدة أو استبدال متطلبات PRD، مع ضبط تباين الألوان وفق WCAG AA، ودعم اتجاه اللغة العربية RTL، وتوثيق الحالات التفاعلية الست لتكون مرجعاً موحداً لمرحلة كود الفرونت.
      - paragraph:
        - strong: "المخرج:"
        - text: DESIGN.md
      - text: 8 دقائق مخطط Mermaid 1 برومبتات 3 أكواد 6 بنود DESIGN.md Design Tokens Google Design Spec +6
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/design-md-spec
      - button "معاينة سريعة"
    - article:
      - text: 30 المرحلة التطبيقية · الأساسيات البرمجية تنفيذ الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 30"
      - button "عرض المخطط البياني للموضوع 30"
      - button "طباعة الموضوع 30 كملف PDF"
      - 'heading "TypeScript: الأنواع وعقود البيانات لمشروع الطالب" [level=3]':
        - 'link "TypeScript: الأنواع وعقود البيانات لمشروع الطالب"':
          - /url: /learn/typescript-types
      - paragraph: صياغة نماذج البيانات المشتقة من ERD، وحالات العمل (Union Types)، وسلامة الخصائص (Props) دون إسهاب نظري
      - paragraph: "صياغة عقود بيانات TypeScript الصارمة لمشروع الطالب انطلاقاً من المخطط المفاهيمي ووثيقة ERD. التركيز العملي على ما يحتاجه مشروع الفرونت: واجهات الكيانات الأساسية (User, Equipment, LoanRequest)، أنواع حالات العمل المحددة (Union Types)، قوالب الاستجابات، وضبط الخصائص (Props) لمنع الأخطاء التخمينية وحظر نوع any."
      - paragraph:
        - strong: "المخرج:"
        - text: src/types/project.ts
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود TypeScript Data Contracts Interfaces +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/typescript-types
      - button "معاينة سريعة"
    - article:
      - text: 31 المرحلة التطبيقية · الأساسيات البرمجية تنفيذ الفرونت إند 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 31"
      - button "عرض المخطط البياني للموضوع 31"
      - button "طباعة الموضوع 31 كملف PDF"
      - 'heading "React: المكونات والحالة وتدفق البيانات في الواجهة" [level=3]':
        - 'link "React: المكونات والحالة وتدفق البيانات في الواجهة"':
          - /url: /learn/react-components-state
      - paragraph: بناء المكونات القابلة لإعادة الاستخدام، وإدارة الحالة المحلية، وتطبيق React 19 لمشروع الطالب
      - paragraph: النموذج الذهني لـ React 19 وبناء الواجهات كتبع للحالة UI = f(state). تقسيم الشاشات إلى مكونات ذرية مشتركة (StatusBadge) ومكونات مركبة (EquipmentCard). تنظيم تدفق البيانات أحادي الاتجاه (Props نزولاً والأحداث صعوداً)، وتحديد متى نرفع الحالة (Lifting State Up)، مع إدراك حدود مكونات الخادم والعميل (use client) وتصميم حالات العرض الأربع.
      - paragraph:
        - strong: "المخرج:"
        - text: src/components/common/StatusBadge.tsx
      - text: 4 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود React 19 Components State Management +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/react-components-state
      - button "معاينة سريعة"
    - article:
      - text: 32 المرحلة التطبيقية · الأساسيات البرمجية تنفيذ الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 32"
      - button "عرض المخطط البياني للموضوع 32"
      - button "طباعة الموضوع 32 كملف PDF"
      - 'heading "Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد" [level=3]':
        - 'link "Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد"':
          - /url: /learn/tailwind-css-responsive
      - paragraph: تطبيق الرموز المعتمدة من DESIGN.md، وتنسيق RTL بالخصائص المنطقية، والتجاوب عبر شاشات المسار الخمس
      - paragraph: تطبيق التنسيق النفعي (Utility-First) المنضبط بركائز نظام التصميم المعتمد في DESIGN.md. التخلص من القيم العشوائية وربط الألوان والتباعدات والزوايا برموز التصميم، مع تطبيق دعم اللغة العربية بالخصائص المنطقية (ms, me, ps, pe, text-start) والتجاوب الدقيق عبر نقاط الكسر الخمس للمسار (390 و768 و1024 و1366 و1440 بكسل) دون تدفق أفقي.
      - paragraph:
        - strong: "المخرج:"
        - text: src/app/globals.css (Tailwind v4؛ يطبق بعد تهيئة الموضوع 33)
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Tailwind CSS DESIGN.md Responsive Design +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/tailwind-css-responsive
      - button "معاينة سريعة"
    - article:
      - text: 33 المرحلة التطبيقية · الأساسيات البرمجية تنفيذ الفرونت إند 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 33"
      - button "عرض المخطط البياني للموضوع 33"
      - button "طباعة الموضوع 33 كملف PDF"
      - 'heading "Next.js: بنية App Router والمسارات والصفحات" [level=3]':
        - 'link "Next.js: بنية App Router والمسارات والصفحات"':
          - /url: /learn/nextjs-app-router
      - paragraph: هيكلة مجلد app، والتخطيطات المتداخلة (Layouts)، والتنقل بين صفحات جرد الشاشات في واجهة Frontend-Only
      - paragraph: "معمارية App Router في Next.js 15 ودمج TypeScript وReact وTailwind في بنية إنتاجية متكاملة. هيكلة مسارات المشروع وتخطيطاته وفق وثيقة SCREEN_INVENTORY.md، والتنقل الفوري بين الصفحات بمكون next/link، مع التأكيد الصارم على حدود التنفيذ: المشروع واجهة مستخدم كاملة الوظائف بنمط Frontend-Only تعتمد على Mock Data محلية دون ادعاء وجود Backend فعلي."
      - paragraph:
        - strong: "المخرج:"
        - text: src/app/layout.tsx
      - text: 6 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Next.js 15 App Router Layouts +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/nextjs-app-router
      - button "معاينة سريعة"
    - article:
      - text: 34 تخطيط الفرونت إند الواجهات وتطوير الفرونت إند 8 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 34"
      - button "عرض المخطط البياني للموضوع 34"
      - button "طباعة الموضوع 34 كملف PDF"
      - heading "تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)" [level=3]:
        - link "تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)":
          - /url: /learn/frontend-architecture-planning
      - paragraph: تفكيك الواجهة إلى مسارات ومكونات وعقود بيانات ومهام ذرية صغيرة قابلة للتحقق
      - paragraph: تحويل متطلبات PRD وتصميمات Stitch ومراجع الشاشات إلى خطة معمارية محكمة للفرونت إند قبل كتابة سطر كود واحد. تفكيك التطبيق إلى شجرة مسارات (Next.js App Router)، ومخطط هرمية المكونات (UI Primitives vs Feature Modules)، وعقود بيانات مكتوبة بدقة (TypeScript Data Contracts)، وجدولة المهام الذرية الصغيرة (Small Verifiable Tasks) مع تحديد المدخلات والمخرجات ومعايير القبول وأوامر التحقق لكل مهمة، مع عزل حدود الفرونت إند وتجنب التورط في كود الخادم.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/FRONTEND_PLAN.md
      - text: 8 دقائق مخطط Mermaid 2 برومبتات 3 أكواد 6 بنود Frontend Planning Next.js App Router Routes Map +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/frontend-architecture-planning
      - button "معاينة سريعة"
    - article:
      - text: 35 مراجعة الواجهة والتجربة الواجهات وتطوير الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 35"
      - button "عرض المخطط البياني للموضوع 35"
      - button "طباعة الموضوع 35 كملف PDF"
      - heading "مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max" [level=3]:
        - link "مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max":
          - /url: /learn/ui-ux-pro-max-review
      - paragraph: تدقيق خطة وتصميم المكونات بمعايير الجودة البصرية وإمكانية الوصول وتجاوب الشاشات قبل وبعد التنفيذ
      - paragraph: "توظيف أداة ومهارة UI/UX Pro Max في موضع استخدامها الطبيعي قبل بدء الكود وبعد بناء المكونات، لمراجعة خطة الواجهة وتدقيق المعايير البصرية وإمكانية الوصول (Accessibility: WCAG AA) وملاءمة اللمس وتجاوب الشاشات (390px, 768px, 1024px, 1440px). شرح التثبيت من المصدر الرسمي ومراجعة الأوامر مقابل المستودع المعتمد، وتطبيق بروتوكول المراجعة خطوة بخطوة لمنع التنافر البصري وتوليد توصيات تصحيحية دقيقة دون المساس بالهوية البصرية المعتمدة في DESIGN.md."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/UI_UX_PRO_MAX_AUDIT.md
      - text: 5 دقائق مخطط Mermaid 1 برومبتات 2 أكواد 6 بنود UI/UX Pro Max Design Audit Accessibility +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/ui-ux-pro-max-review
      - button "معاينة سريعة"
    - article:
      - text: 36 منهجية المواصفات والتنفيذ الواجهات وتطوير الفرونت إند 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 36"
      - button "عرض المخطط البياني للموضوع 36"
      - button "طباعة الموضوع 36 كملف PDF"
      - heading "تنظيم المواصفات وتطوير الميزات بـ Spec Kit" [level=3]:
        - link "تنظيم المواصفات وتطوير الميزات بـ Spec Kit":
          - /url: /learn/spec-kit-workflow
      - paragraph: "منهجية التطوير القائم على المواصفات: الدستور، التخصيص، التوضيح، التخطيط، والمهام"
      - paragraph: "اعتماد منهجية Spec Kit الرسمية (GitHub Spec Kit / specify-cli) لإدارة تطوير ميزات الفرونت إند ميزة بميزة انطلاقاً من المواصفات الصارمة. فحص الأداة من مصدرها الرسمي (github.com/github/spec-kit)، ومتطلبات Python/uv، وأوامر التهيئة (specify init --here --integration agy). تدريب الطالب على حلقة التطوير المنضبطة: الدستور الهندسي (Constitution) لمنع تجاوز الحدود، ثم التخصيص (Specify)، والتوضيح (Clarify) لمنع الهلوسة، ثم التخطيط الفني للميزة (Plan)، وتقسيم المهام (Tasks)، والتحليل الاتساقي (Analyze)، مع حفظ العمل بنسخة احتياطية أو Commit قبل التهيئة."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/rules/frontend.md
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Spec Kit GitHub Spec Kit specify-cli +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/spec-kit-workflow
      - button "معاينة سريعة"
    - article:
      - text: 37 تنفيذ الواجهة الأمامية الواجهات وتطوير الفرونت إند 7 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 37"
      - button "عرض المخطط البياني للموضوع 37"
      - button "طباعة الموضوع 37 كملف PDF"
      - heading "التنفيذ التدريجي للفرونت إند وحالات الواجهة" [level=3]:
        - link "التنفيذ التدريجي للفرونت إند وحالات الواجهة":
          - /url: /learn/frontend-incremental-implementation
      - paragraph: بناء الواجهة مهمة تلو الأخرى، إدارة البيانات التمثيلية، وحلقة فحص التغيير وحفظ العمل
      - paragraph: "التنفيذ العملي التدريجي لواجهة المستخدم مهمة تلو الأخرى (Task by Task) وفق خطة Spec Kit ومهام FRONTEND_TASKS.md. تطبيق حلقة التنفيذ الهندسية الصارمة: فحص التغيير البرمجي (TypeScript tsc --noEmit, build, responsive checks) → الرجوع للمتطلبات والتصميم (PRD, DESIGN.md, Stitch) → حفظ العمل في Git (commit منظم لكل مهمة). استخدام بيانات تمثيلية صريحة (Mock Data) مكتوبة الأنواع (Typed Contracts) مع التوضيح البات لحدود الفرونت إند: لا خادم حقيقي، لا قاعدة بيانات فعلية، ولا ادعاء تكامل حتى مرحلة الربط."
      - paragraph:
        - strong: "المخرج:"
        - text: مكونات واجهة المستخدم التفاعلية (src/components/ وsrc/app/)
      - text: 7 دقائق مخطط Mermaid 3 برومبتات 4 أكواد 6 بنود Frontend Implementation Incremental Coding Mock Data +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/frontend-incremental-implementation
      - button "معاينة سريعة"
    - article:
      - text: 38 المرحلة التطبيقية · تأسيس الخادم تأسيس الخادم وقاعدة البيانات 7 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 38"
      - button "عرض المخطط البياني للموضوع 38"
      - button "طباعة الموضوع 38 كملف PDF"
      - 'heading "Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب" [level=3]':
        - 'link "Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب"':
          - /url: /learn/python-backend-foundation
      - paragraph: "المستوى اللازم للمشروع: بيئة التشغيل الافتراضية، إدارة الحزم والأسرار، وفصل إعدادات الخادم دون استطراد أكاديمي"
      - paragraph: "شرح ما يلزم من Python لبناء خادم مشروع الطالب وفق أفضل الممارسات الهندسية: تهيئة بيئة العمل الافتراضية (Virtual Environment)، إدارة الاعتماديات، عزل أسرار النظام ومتغيرات البيئة في ملف .env، وهيكلة الإعدادات دون استطراد نظري مطول. مع التأكيد الصارم على أن هذه الخطوة إرشاد وبناء لمشروع الطالب، ولا تنشئ Backend للموقع التعليمي نفسه."
      - paragraph:
        - strong: "المخرج:"
        - text: .env.example
      - text: 7 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Python 3.12+ Virtual Environment venv +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/python-backend-foundation
      - button "معاينة سريعة"
    - article:
      - text: 39 المرحلة التطبيقية · تأسيس الخادم تأسيس الخادم وقاعدة البيانات 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 39"
      - button "عرض المخطط البياني للموضوع 39"
      - button "طباعة الموضوع 39 كملف PDF"
      - 'heading "PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار" [level=3]':
        - 'link "PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار"':
          - /url: /learn/postgresql-database-setup
      - paragraph: سلسلة الاتصال، عزل بيانات الاعتماد، وإدارة التغييرات عبر آلية ترحيل معتمدة في بديل الإطار الذي تختاره
      - paragraph: "تجهيز قاعدة بيانات PostgreSQL العلائقية لتلبية متطلبات مشروع الطالب ومخطط ERD المعتمد: بناء سلسلة الاتصال (Connection String)، تأمين اسم المستخدم وكلمة المرور في متغيرات البيئة، وضبط تجميع الاتصالات (Connection Pooling). ويُفصل هنا بوضوح بين مرحلة تخطيط قاعدة البيانات ومرحلة تطبيق مخططها، حيث يُشرح تطبيق المخطط عبر آلية الترحيل (Migrations) المعتمدة في بديل الإطار الذي تختاره لاحقاً."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/DATABASE_CONNECTION_SPEC.md
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود PostgreSQL Database Connection Connection String +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/postgresql-database-setup
      - button "معاينة سريعة"
    - article:
      - text: 40 المرحلة التطبيقية · تأسيس الخادم تأسيس الخادم وقاعدة البيانات 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 40"
      - button "عرض المخطط البياني للموضوع 40"
      - button "طباعة الموضوع 40 كملف PDF"
      - heading "معمارية Backend وعقود API لمشروع الطالب" [level=3]:
        - link "معمارية Backend وعقود API لمشروع الطالب":
          - /url: /learn/backend-architecture-api-contracts
      - paragraph: اشتقاق مسارات RESTful من متطلبات PRD وجداول ERD، مع توحيد الطلبات والاستجابات والأخطاء ومصفوفة الصلاحيات
      - paragraph: بناء معمارية الخادم وصياغة وثيقة عقود API الرسمية (API Contracts) قبل كتابة كود التنفيذ. اشتقاق الموارد من PRD وجداول ERD وعقود الفرونت إند في TypeScript، وتحديد هياكل الطلبات والاستجابات وحالات الخطأ الموحدة ومصفوفة الصلاحيات (RBAC). يضمن هذا العقد تكاملاً خالياً من المفاجآت بين الواجهة والخادم دون إنشاء أي Backend للموقع التعليمي.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/API_CONTRACTS.md
      - text: 4 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 7 بنود API Contracts RESTful API HTTP Status Codes +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/backend-architecture-api-contracts
      - button "معاينة سريعة"
    - article:
      - text: 41 المرحلة التطبيقية · تطوير الخادم الخلفي معمارية وتطوير الخادم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 41"
      - button "عرض المخطط البياني للموضوع 41"
      - button "طباعة الموضوع 41 كملف PDF"
      - 'heading "Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1)" [level=3]':
        - 'link "Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1)"':
          - /url: /learn/django-backend
      - paragraph: إعداد خادم Django REST Framework، وتطبيق نماذج البيانات المشتقة من ERD، وإدارة التهجيرات الأصلية (Migrations)
      - paragraph: البديل الأول المستقل لخادم مشروع الطالب باستخدام Django وإطار DRF. تحويل كيانات ERD إلى نماذج Django قوية مع الفهارس والقيود، وإدارة دورة حياة التهجيرات المدمجة (Native Migrations) مع تعقبها في جدول django_migrations، وتفعيل لوحة تحكم الإدارة (Django Admin) لتسريع الفحص الأولي. بديل مستقل لـ FastAPI ولا يلزم الطالب ببناء الخادم مرتين.
      - paragraph:
        - strong: "المخرج:"
        - text: backend/config/settings.py
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Django DRF PostgreSQL +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/django-backend
      - button "معاينة سريعة"
    - article:
      - text: 42 المرحلة التطبيقية · تطوير الخادم الخلفي معمارية وتطوير الخادم 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 42"
      - button "عرض المخطط البياني للموضوع 42"
      - button "طباعة الموضوع 42 كملف PDF"
      - 'heading "FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2)" [level=3]':
        - 'link "FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2)"':
          - /url: /learn/fastapi-backend
      - paragraph: إعداد خادم غير متزامن (Async)، وتحديد مخططات Pydantic ونماذج SQLAlchemy، وإدارة التهجيرات باستخدام Alembic
      - paragraph: البديل الثاني المستقل لخادم مشروع الطالب باستخدام FastAPI فائق السرعة والمبني على معيار ASGI. الفصل المعماري التام بين مخططات التحقق (Pydantic Schemas) ونماذج قاعدة البيانات (SQLAlchemy ORM)، وإدارة دورة حياة تهجيرات المخطط باستخدام أداة Alembic المستقلة بدلاً من الأنظمة المدمجة، والاستفادة من توثيق Swagger التلقائي. بديل مستقل لـ Django ولا يلزم الطالب ببناء الخادم مرتين.
      - paragraph:
        - strong: "المخرج:"
        - text: backend/app/main.py
      - text: 4 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود FastAPI Pydantic SQLAlchemy +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/fastapi-backend
      - button "معاينة سريعة"
    - article:
      - text: 43 المرحلة التطبيقية · تطوير الخادم الخلفي معمارية وتطوير الخادم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 43"
      - button "عرض المخطط البياني للموضوع 43"
      - button "طباعة الموضوع 43 كملف PDF"
      - 'heading "المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC)" [level=3]':
        - 'link "المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC)"':
          - /url: /learn/auth-permissions
      - paragraph: تطبيق تسجيل الدخول بـ JWT، وتشفير كلمات المرور، وتحديد صلاحيات الأدوار وحماية نقاط النهاية وفق إطار الخادم المختار
      - paragraph: بناء منظومة متكاملة للأمان تشمل المصادقة والتحكم بالوصول (RBAC). التفريق الجوهري بين إثبات الهوية (Authentication) وتحديد الصلاحيات (Authorization). تطبيق تسجيل الدخول بـ JWT بالتوكن الثنائي (Access و Refresh)، وتشفير كلمات المرور بآليات قوية، وحماية نقاط النهاية وفق مصفوفة الأدوار المشتقة من وثائق PRD وSRS، مع تقديم الأكواد لكلا البديلين (Django و FastAPI) دون فرض أدوار BorrowHub كأدوار إلزامية.
      - paragraph:
        - strong: "المخرج:"
        - text: backend/app/auth/ أو backend/apps/users/permissions.py
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Authentication Authorization JWT +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/auth-permissions
      - button "معاينة سريعة"
    - article:
      - text: 44 المرحلة التطبيقية · تطوير الخادم الخلفي معمارية وتطوير الخادم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 44"
      - button "عرض المخطط البياني للموضوع 44"
      - button "طباعة الموضوع 44 كملف PDF"
      - 'heading "Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة" [level=3]':
        - 'link "Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة"':
          - /url: /learn/services-selectors
      - paragraph: عزل العمليات التغييرية (Services) والمعاملات الذرية (Transactions) عن استعلامات القراءة النقية (Selectors) لكلا البديلين
      - paragraph: تطبيق نمط Services وSelectors المعماري لتنظيم منطق العمل وحماية نزاهة البيانات. تفريغ الـ Views والـ Controllers من المنطق الثقيل وعزل العمليات التغييرية (Mutations / Writes) داخل طبقة Services تحت مظلة المعاملات الذرية (Atomic Transactions) وقفل السجلات لمنع حالات السباق، وحصر عمليات القراءة (Queries) داخل طبقة Selectors النقية مع حل معضلة N+1. أمثلة كاملة للبديلين (Django و FastAPI) مع تأكيد حاسم على أن قواعد BorrowHub دراسة حالة توضيحية وليست قواعد مفروضة.
      - paragraph:
        - strong: "المخرج:"
        - text: backend/app/services/ أو backend/apps/*/services.py
      - text: 5 دقائق مخطط Mermaid 2 برومبتات 2 أكواد 6 بنود Services Selectors Business Logic +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/services-selectors
      - button "معاينة سريعة"
    - article:
      - text: 45 المرحلة التطبيقية · تكامل الواجهة والخادم الربط والتكامل 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 45"
      - button "طباعة الموضوع 45 كملف PDF"
      - 'heading "ربط Frontend مع Backend: الطلبات والجلسات والأخطاء" [level=3]':
        - 'link "ربط Frontend مع Backend: الطلبات والجلسات والأخطاء"':
          - /url: /learn/frontend-backend-integration
      - paragraph: استبدل البيانات التمثيلية بطلبات فعلية وفق عقد API الموثق
      - paragraph: طابق واجهة مشروعك مع docs/API_CONTRACTS.md وdocs/PERMISSIONS_MATRIX.md، ثم اربط ميزة واحدة بطلب API فعلي. افهم Session Cookie وBearer token كخيارين يحددهما العقد، وميّز حالات المصادقة والصلاحيات والأخطاء دون افتراض endpoint أو envelope غير موثق.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/FRONTEND_API_INTEGRATION.md
      - text: 5 دقائق 2 أكواد 7 بنود Frontend Backend API Contract +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/frontend-backend-integration
      - button "معاينة سريعة"
    - article:
      - text: 46 المرحلة التطبيقية · اختبار رحلات المشروع الاختبار والجودة 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 46"
      - button "طباعة الموضوع 46 كملف PDF"
      - 'heading "Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج" [level=3]':
        - 'link "Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج"':
          - /url: /learn/full-stack-journey-testing
      - paragraph: ميّز دليل Frontend عن API وFull-Stack وسجّل غير المنفذ Not Run
      - paragraph: "ابدأ الفحص أثناء التنفيذ، واختبر النجاح والفشل بطبقات واضحة: مكونات Frontend مع mocks، API وخادم مع قاعدة اختبار، ثم رحلة متصفح Full-Stack دون اعتراض الطلب الحقيقي. سجل ما شغّلته فعلًا فقط، وافصل Passed وFailed وNot Run ولا ترفع فحص الواجهة إلى دليل نجاح منتج كامل."
      - paragraph:
        - strong: "المخرج:"
        - text: docs/INTEGRATION_TEST_PLAN.md
      - text: 5 دقائق 1 أكواد 7 بنود Testing Playwright Frontend Test +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/full-stack-journey-testing
      - button "معاينة سريعة"
    - article:
      - text: 47 قياس الأداء بعد تكامل المشروع البيانات والأداء 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 47"
      - button "طباعة الموضوع 47 كملف PDF"
      - 'heading "هندسة أداء قاعدة البيانات: قِس ثم عالج" [level=3]':
        - 'link "هندسة أداء قاعدة البيانات: قِس ثم عالج"':
          - /url: /learn/database-performance-engineering
      - paragraph: حلل الاستعلامات والتزامن وفق أثر قابل لإعادة القياس
      - paragraph: ابدأ من رحلة بطيئة ومعيار أداء، وسجّل خط الأساس وخطة الاستعلامات وعددها وزمنها. عالج N+1 أو أضف فهرسًا أو غيّر إعدادات التزامن فقط عندما تدعم القياسات ذلك، ثم قارن النتيجة وسجّل أثرها وتكلفتها في تقرير أداء.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/DATABASE_PERFORMANCE_REPORT.md
      - text: 4 دقائق 1 أكواد 6 بنود PostgreSQL Database Performance N+1 +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/database-performance-engineering
      - button "معاينة سريعة"
    - article:
      - text: 48 قرار بنية مشروط بقياس المعمارية والبنية التحتية 3 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 48"
      - button "طباعة الموضوع 48 كملف PDF"
      - 'heading "Redis: قرار مشروط بمتطلبات مشروعك" [level=3]':
        - 'link "Redis: قرار مشروط بمتطلبات مشروعك"':
          - /url: /learn/redis-optional-infrastructure
      - paragraph: جرّب المخبأ أو المهام الخلفية عند وجود حاجة موثقة، وتجاوز Redis بقرار واضح عند غيابها
      - paragraph: يأتي Redis بعد قياس قاعدة البيانات. يستخدم فقط عند ثبوت حاجة لمخبأ قراءة متكررة ومكلفة أو لفصل عمل خلفي طويل مع ضوابط تسليم واضحة. يوثق الطالب مسار التجاوز إذا حقق التطبيق أهدافه من دون Redis، أو يختبر أثر الإضافة قبل اعتمادها.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/REDIS_DECISION.md
      - text: 3 دقائق 1 أكواد 6 بنود Redis Cache Aside TTL +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/redis-optional-infrastructure
      - button "معاينة سريعة"
    - article:
      - text: 49 التحقق من المنتج المتكامل الجودة والتحقق الهندسي 3 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 49"
      - button "طباعة الموضوع 49 كملف PDF"
      - 'heading "QA: مراجعة متكاملة قبل التسليم" [level=3]':
        - 'link "QA: مراجعة متكاملة قبل التسليم"':
          - /url: /learn/integrated-project-qa
      - paragraph: تحقق من المتطلبات والتصميم والتجاوب والوصول والتكامل بدليل صريح
      - paragraph: راجع التطبيق المرتبط من البداية للنهاية مقابل PRD وSRS والتصميم المعتمد. افحص الرحلات الوظيفية والتجاوب عند خمسة عروض ووصول لوحة المفاتيح والتكامل مع API وقاعدة البيانات، وسجل لكل فحص Passed أو Failed أو Not Run مع الدليل والمتابعة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/FINAL_QA_REPORT.md
      - text: 3 دقائق 1 أكواد 7 بنود QA Acceptance Criteria Integration +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/integrated-project-qa
      - button "معاينة سريعة"
    - article:
      - text: 50 مسار التشغيل · اختياري بحسب منصة النشر التشغيل والنشر 6 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 50"
      - button "طباعة الموضوع 50 كملف PDF"
      - 'heading "Docker: بناء وتشغيل الحاويات لمشروع الطالب عند الحاجة" [level=3]':
        - 'link "Docker: بناء وتشغيل الحاويات لمشروع الطالب عند الحاجة"':
          - /url: /learn/docker-container-workflow
      - paragraph: جهّز صورة تشغيل قابلة لإعادة الإنتاج لـ Next.js أو خادم Python فقط عندما يتطلبها مسار التشغيل
      - paragraph: افهم Dockerfile وسياق البناء والصورة والحاوية، ثم طابق build وrun مع Next.js وبديل خادم Django أو FastAPI المختار. يغطي .dockerignore ومستخدم التشغيل غير الجذر وربط المنفذ على loopback والأسرار خارج الصور، ويشرح متى تكفي منصة بناء مُدارة بدل الحاويات.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/DOCKER_DECISION.md
      - text: 6 دقائق 1 برومبتات 5 أكواد 7 بنود Docker Containers Dockerfile +7
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/docker-container-workflow
      - button "معاينة سريعة"
    - article:
      - text: 51 مسار التشغيل · اختياري بحسب الاستضافة التشغيل والنشر 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 51"
      - button "طباعة الموضوع 51 كملف PDF"
      - 'heading "Linux: تشغيل آمن لخادم المشروع عند اختياره" [level=3]':
        - 'link "Linux: تشغيل آمن لخادم المشروع عند اختياره"':
          - /url: /learn/linux-server-operations
      - paragraph: افحص هوية العملية والملكية وأقل صلاحية لازمة لـ Django أو FastAPI
      - paragraph: موضوع مستقل لمسار خادم Linux الذي يديره الطالب أو يحتاج تشخيصه. يشرح الهوية والملكية وبتات rwx وأوامر الفحص ومستخدم خدمة غير root وإعدادات الأسرار؛ ويمكن تجاوز الإدارة اليدوية عند اختيار استضافة مُدارة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/LINUX_RUNTIME_NOTES.md إذا كانت إدارة Linux ضمن المسار
      - text: 4 دقائق 1 برومبتات 3 أكواد 7 بنود Linux Permissions chmod +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/linux-server-operations
      - button "معاينة سريعة"
    - article:
      - text: 52 المرحلة التطبيقية · النشر والتسليم تطوير الواجهة والنشر 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 52"
      - button "طباعة الموضوع 52 كملف PDF"
      - heading "نشر واجهة Next.js على Vercel" [level=3]:
        - link "نشر واجهة Next.js على Vercel":
          - /url: /learn/vercel-frontend-deployment
      - paragraph: ربط المستودع، فحص البناء، إعداد البيئة، واختبار رابط الواجهة
      - paragraph: "مسار الدورة الافتراضي لنشر واجهة Next.js على Vercel: ربط Git، معاينة تغييرات الفرع، ضبط متغيرات كل بيئة، مراجعة البناء والنطاق وHTTPS والسجلات. يختار الطالب مضيف واجهة واحداً ثم يكمل نشر Backend وقاعدة البيانات في الموضوع 54."
      - paragraph:
        - strong: "المخرج:"
        - text: رابط معاينة للواجهة يمكن مراجعته قبل الإنتاج
      - text: 4 دقائق 1 أكواد 6 بنود Vercel Next.js Frontend +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/vercel-frontend-deployment
      - button "معاينة سريعة"
    - article:
      - text: 53 المرحلة التطبيقية · النشر والتسليم تطوير الواجهة والنشر 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 53"
      - button "طباعة الموضوع 53 كملف PDF"
      - heading "نشر واجهة Next.js على Netlify" [level=3]:
        - link "نشر واجهة Next.js على Netlify":
          - /url: /learn/netlify-frontend-deployment
      - paragraph: بديل Vercel لنشر واجهة واحدة ومراجعة إعداد البناء والمعاينة والسجلات
      - paragraph: "بديل مستقل لاستضافة واجهة Next.js على Netlify باستخدام وثائق OpenNext الحالية: ربط مستودع Git ومراجعة البناء وDeploy Previews ومتغيرات البيئة والنطاق وHTTPS والسجلات. إذا اختير Vercel، يتجاوز الطالب هذا البديل ولا يعيد نشر الواجهة."
      - paragraph:
        - strong: "المخرج:"
        - text: رابط Deploy Preview يمكن مراجعته قبل الإنتاج
      - text: 4 دقائق 1 أكواد 6 بنود Netlify Next.js OpenNext +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/netlify-frontend-deployment
      - button "معاينة سريعة"
    - article:
      - text: 54 المرحلة التطبيقية · النشر والتسليم معمارية ونشر الخادم 5 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 54"
      - button "طباعة الموضوع 54 كملف PDF"
      - heading "نشر Backend وربطه بقاعدة البيانات" [level=3]:
        - link "نشر Backend وربطه بقاعدة البيانات":
          - /url: /learn/backend-database-deployment
      - paragraph: تجهيز خدمة API وPostgreSQL والأسرار وCORS وفحوص الاستعداد لمنتج Full-Stack
      - paragraph: ينشر الطالب إطار Backend الذي اختاره مع PostgreSQL مُدارة، ويخزن DATABASE_URL والأسرار على الخادم، ويربط نطاق API بالواجهة عبر HTTPS وCORS. يقدم Render أمثلة موثقة لـ FastAPI وDjango، مع التحقق من المنفذ والـ health check والتهجيرات والسجلات وخطة smoke test كاملة.
      - paragraph:
        - strong: "المخرج:"
        - text: رابط API عبر HTTPS ورابط نقطة صحة مفحوصة
      - text: 5 دقائق 2 أكواد 6 بنود Backend PostgreSQL Render +6
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/backend-database-deployment
      - button "معاينة سريعة"
    - article:
      - text: 55 المرحلة النهائية · تشغيل المشروع التشغيل والتسليم 4 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 55"
      - button "طباعة الموضوع 55 كملف PDF"
      - heading "CI/CD والمراقبة والنسخ الاحتياطي والتراجع" [level=3]:
        - link "CI/CD والمراقبة والنسخ الاحتياطي والتراجع":
          - /url: /learn/project-operations-runbook
      - paragraph: إجراءات تشغيل موثقة بحسب قدرات الاستضافة المختارة
      - paragraph: أنشئ دليلًا لمسار CI/CD والسجلات والتنبيه والنسخ والاستعادة والتراجع وفق إعدادك الفعلي. افصل تراجع الكود عن استعادة البيانات، واكتب ما توفر وما لم يُختبر دون افتراض ميزات من مزود الاستضافة.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/OPERATIONS_RUNBOOK.md
      - text: 4 دقائق 1 برومبتات 1 أكواد 6 بنود CI/CD Operations Logs +5
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/project-operations-runbook
      - button "معاينة سريعة"
    - article:
      - text: 56 المرحلة النهائية · تسليم قابل للمراجعة التشغيل والتسليم 3 دقائق
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 56"
      - button "طباعة الموضوع 56 كملف PDF"
      - heading "توثيق وتسليم المشروع" [level=3]:
        - link "توثيق وتسليم المشروع":
          - /url: /learn/project-handoff-package
      - paragraph: حزمة تشمل المتطلبات والمخططات ودليل الاستخدام والتشغيل ونتائج الفحص
      - paragraph: جهّز README وحزمة تجمع وثائق المتطلبات والمخططات ودليل الاستخدام والتشغيل ونتائج فحص دقيقة. اربط كل ادعاء بدليل، واذكر Failed وNot Run والقيود، واحمِ الأسرار وبيانات المستخدمين.
      - paragraph:
        - strong: "المخرج:"
        - text: README.md
      - text: 3 دقائق 1 أكواد 6 بنود Handoff README Documentation +4
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/project-handoff-package
      - button "معاينة سريعة"
    - article:
      - text: 57 المرحلة النهائية · عرض حي العرض وPortfolio دقيقتان
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 57"
      - button "طباعة الموضوع 57 كملف PDF"
      - 'heading "Demo Day: عرض الفكرة والقرارات والقيود" [level=3]':
        - 'link "Demo Day: عرض الفكرة والقرارات والقيود"':
          - /url: /learn/project-demo-day
      - paragraph: سيناريو حي وخطة احتياطية تصف النسخة كما هي
      - paragraph: حضّر عرضًا يبدأ بالمشكلة والمستخدم، ويشرح رحلة قابلة للتكرار وقرارًا وقيودًا بأدلة. افحص الرابط والبيانات مسبقًا، وسمّ اللقطات أو التسجيل أو التشغيل المحلي بديلًا لا تفاعلًا مباشرًا.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/DEMO_DAY_SCRIPT.md
      - text: دقيقتان 1 برومبتات 1 أكواد 6 بنود Demo Day Live Demo Presentation +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/project-demo-day
      - button "معاينة سريعة"
    - article:
      - text: 58 المرحلة النهائية · ملف مهني قابل للمشاركة العرض وPortfolio دقيقتان
      - button "حفظ في المفضلة":
        - img
      - button "الاستماع الصوتي للموضوع 58"
      - button "طباعة الموضوع 58 كملف PDF"
      - 'heading "Portfolio: عرض المساهمة والنتائج بصدق" [level=3]':
        - 'link "Portfolio: عرض المساهمة والنتائج بصدق"':
          - /url: /learn/project-portfolio-entry
      - paragraph: حالة مشروع توضّح دور الطالب والأدلة والقيود دون مبالغة
      - paragraph: اكتب بطاقة Portfolio تشرح سياق المشروع ومساهمتك الفردية والتعاون ومساعدة الأدوات والنتائج المثبتة. اربط الأرقام بطريقة القياس ومصدرها وتاريخها، وميز النسخة المنشورة عن النموذج الأولي وغير المختبر.
      - paragraph:
        - strong: "المخرج:"
        - text: docs/PORTFOLIO_ENTRY.md
      - text: دقيقتان 1 أكواد 6 بنود Portfolio Contribution Evidence +3
      - link "قراءة الموضوع كاملاً ←":
        - /url: /learn/project-portfolio-entry
      - button "معاينة سريعة"
  - paragraph: "الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي · معمارية Next.js App Router © 2026"
  - text: "البحث: / الإغلاق: Esc"
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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('historical User Flow save keeps its content meaning, not its mislabeled PRD title', async ({ page }) => {
  4   |   await page.goto('/');
  5   |   await page.evaluate(() => localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['topic-03', 'topic-05', 'unknown-historical-topic'])));
  6   |   await page.reload();
  7   |   const flow = page.locator('article.topic-card').filter({ has: page.locator('a[href="/learn/user-flow-modeling"]') });
  8   |   await expect(flow.getByRole('button', { name: 'إزالة من المفضلة', exact: true })).toBeVisible();
  9   |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('topic-05');
  10  |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('unknown-historical-topic');
  11  |   await page.locator('article.topic-card').first().getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
  12  |   expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]')))
  13  |     .toEqual(['user-flow-modeling', 'topic-05', 'unknown-historical-topic', 'project-idea-mvp']);
  14  |   await expect(page.locator('article.topic-card')).toHaveCount(58);
  15  |   await expect(page.getByText('المحاضرة الرابعة — بانتظار اعتماد المحتوى', { exact: true })).toHaveCount(0);
  16  | });
  17  | 
  18  | test('ambiguous recent history survives subsequent reading and the five-item display limit', async ({ page }) => {
  19  |   await page.goto('/');
  20  |   await page.evaluate(() => localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify([
  21  |     'topic-06', 'unknown-historical-recent', 'project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'srs', 'git-project-docs',
  22  |   ])));
  23  |   await page.goto('/learn/user-flow-modeling');
  24  |   await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
  25  |   await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
  26  |     .toEqual(['user-flow-modeling', 'project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'srs', 'topic-06', 'unknown-historical-recent']);
  27  |   await page.goto('/');
  28  |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('طبقات النظام');
  29  | });
  30  | 
  31  | for (const width of [390, 768, 1024, 1366, 1440]) {
  32  |   test(`entry question explains both answers and opens the first topic with a keyboard at ${width}px`, async ({ page }) => {
  33  |     await page.setViewportSize({ width, height: 900 });
  34  |     await page.goto('/');
  35  |     const setup = page.getByRole('button', { name: 'أثبت وكيل البرمجة وSkills وMCP أولًا', exact: true });
  36  |     await expect(setup).toBeEnabled({ timeout: 15000 });
  37  |     await setup.focus();
  38  |     await page.keyboard.press('Enter');
  39  |     await expect(page.getByRole('status').filter({ hasText: 'تأتي أدوات التنفيذ عند بدء كود الفرونت' })).toBeVisible();
  40  |     await expect(setup).toHaveAttribute('aria-pressed', 'true');
  41  |     await page.getByRole('button', { name: 'أفهم المشكلة والمستخدم وأحدد نطاق النسخة الأولى', exact: true }).click();
  42  |     await expect(page.getByRole('status').filter({ hasText: 'صحيح. ابدأ بسياق مشروعك' })).toBeVisible();
  43  |     await expect(page.getByText('المدة الرسمية للبرنامج: 40 ساعة.', { exact: false })).toBeVisible();
  44  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  45  |     const first = page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true });
  46  |     await first.focus();
  47  |     await page.keyboard.press('Enter');
> 48  |     await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  49  |   });
  50  | }
  51  | 
  52  | test('Start and About describe the same Full-Stack program and postpone execution setup', async ({ page }) => {
  53  |   await page.goto('/start');
  54  |   await expect(page.getByRole('main')).toContainText('40 ساعة');
  55  |   await expect(page.getByRole('main')).toContainText('Full-Stack');
  56  |   await expect(page.getByRole('main')).toContainText('لا يلزم تثبيت وكيل أو Skills أو MCP للبدء');
  57  |   await expect(page.getByRole('region', { name: 'مسار مشروعك' }).getByRole('listitem')).toHaveCount(58);
  58  |   await page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true }).click();
  59  |   await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
  60  |   await page.goto('/about');
  61  |   await expect(page.getByRole('main')).toContainText('40 ساعة');
  62  |   await expect(page.getByRole('main')).toContainText('Full-Stack');
  63  |   await expect(page.getByRole('main')).toContainText('BorrowHub مثال اختياري');
  64  | });
  65  | 
  66  | test('old lecture and reference URLs reach available topics and references', async ({ page }) => {
  67  |   await page.goto('/lectures/04-pending');
  68  |   await expect(page).toHaveURL(/\/learn\/git-project-docs\/?$/);
  69  |   await expect(page.getByRole('heading', { level: 1 })).toContainText('Git');
  70  |   await page.goto('/learn/borrowhub-reference');
  71  |   await expect(page).toHaveURL(/\/faq\/?$/);
  72  |   await page.goto('/learn/prompt-library');
  73  |   await expect(page).toHaveURL(/\/prompts\/?$/);
  74  |   await page.goto('/roadmap');
  75  |   await expect(page).toHaveURL(/\/start#project-path$/);
  76  |   await page.goto('/roadmap/20');
  77  |   await expect(page).toHaveURL(/\/learn\/project-demo-day\/?$/);
  78  |   await page.goto('/roadmap/2');
  79  |   await expect(page).toHaveURL(/\/start#project-path$/);
  80  |   await expect(page.getByRole('region', { name: 'مسار مشروعك' }).getByRole('listitem')).toHaveCount(58);
  81  | });
  82  | 
  83  | test('prototype-like unknown persisted strings in bookmarks and history do not crash homepage and survive new save/view', async ({ page }) => {
  84  |   await page.goto('/');
  85  |   await page.evaluate(() => {
  86  |     localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['__proto__', 'constructor']));
  87  |     localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['toString', 'topic-06']));
  88  |   });
  89  |   await page.reload();
  90  | 
  91  |   // Homepage remains usable
  92  |   await expect(page.locator('article.topic-card').first()).toBeVisible();
  93  |   await expect(page.locator('article.topic-card')).toHaveCount(58);
  94  | 
  95  |   // Explicit unresolved state for prototype-like unknown IDs
  96  |   const unresolvedSection = page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' });
  97  |   await expect(unresolvedSection).toBeVisible();
  98  |   await expect(unresolvedSection).toContainText('__proto__');
  99  |   await expect(unresolvedSection).toContainText('constructor');
  100 |   await expect(unresolvedSection).toContainText('toString');
  101 |   await expect(unresolvedSection).toContainText('عنصر قديم غير معروف');
  102 |   await expect(unresolvedSection).toContainText('تعذرت المطابقة؛ ما زال المعرّف محفوظًا على هذا الجهاز.');
  103 | 
  104 |   // Original identifiers survive a new bookmark save
  105 |   const firstCard = page.locator('article.topic-card').first();
  106 |   await firstCard.getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
  107 |   const savedBookmarks = await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]'));
  108 |   expect(savedBookmarks).toContain('__proto__');
  109 |   expect(savedBookmarks).toContain('constructor');
  110 |   expect(savedBookmarks).toContain('project-idea-mvp');
  111 | 
  112 |   // Original identifiers survive a new topic view
  113 |   await page.goto('/learn/user-flow-modeling');
  114 |   await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
  115 |   await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
  116 |     .toEqual(expect.arrayContaining(['user-flow-modeling', 'topic-06', 'toString']));
  117 | 
  118 |   // Navigating back preserves unresolved state and usable homepage
  119 |   await page.goto('/');
  120 |   await expect(page.locator('article.topic-card').first()).toBeVisible();
  121 |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('toString');
  122 | });
  123 | 
```