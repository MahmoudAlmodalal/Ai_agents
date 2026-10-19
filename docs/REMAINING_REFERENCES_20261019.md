# تقرير التحقق ومطابقة مراجع مسار المشروع — القضايا #26 و#27 و#28

**تاريخ التقرير:** 2026-10-19  
**مسار العمل:** `/home/mahmoud/Desktop/كورس/Ai_agents`  
**الـ Commit المرجعي الأساسي:** `3242248` (`Complete course references, compatibility and pilot verification`)  
**المسؤولية الحصرية للمسار (Antigravity Lane):**
- `src/app/borrowhub/**`
- `src/app/glossary/**`
- `src/app/faq/**`
- `src/app/templates/**`
- `src/app/tools/**`
- `src/data/course-tool-guide.ts`
- `src/data/reference-templates.ts`
- `e2e/reference-content.spec.ts`
- `e2e/tools-templates.spec.ts`
- `docs/REMAINING_REFERENCES_20261019.md`

**حدود الصلاحية:** يقتصر عمل مسار Antigravity على التدقيق والتنفيذ والتحقق وإعداد هذا التقرير. لا يتم عمل Commit أو Push أو نشر أو تعديل تذاكر GitHub أو تجاوز بوابات التحقق. المنسق (Codex) يتولى مراجعة التعديلات وإعادة تشغيل البوابات المتكاملة والاعتماد.

---

## 1. ملخص التدقيق التنفيذي

تم فحص الكود الحالي ومطابقته بدقة مقابل نصوص معايير القبول الواردة في `.verification/remaining-issues-current.json` ومواصفة مسار المشروع `docs/SEQUENTIAL_PROJECT_LEARNING_SPEC.md` ومحتوى الأقسام 11 إلى 15 من `Weapon_of_the_Era_Website_Content_AR.md`.

- تبين أن الكود المرجعي عند نقطة الأساس `3242248` يحتوي بالفعل على تنفيذ كامل وشامل لجميع المعايير في الملفات المملوكة.
- التزامًا بقاعدة: *"Audit actual current source against EXACT issue bodies... and implement ONLY concrete unmet criteria. No forced edits if already complete"*، لم يتم فرض أي تعديلات تجميلية أو غير مبررة على الكود المكتمل.
- أُجريت فحوصات البوابات المتزامنة (`Playwright E2E` و`TypeScript lint`) وتأكيد حي لحالة الروابط وفحص توثيقي مباشر للمصادر الرسمية الخارجية الحساسة للإصدار.

---

## 2. مطابقة معايير القبول للقضية #26: دراسة BorrowHub المرافقة للمسار

**عنوان القضية:** `[مسار المشروع 22] دراسة BorrowHub المرافقة للمسار`  
**الملفات المفحوصة:**
- `src/app/borrowhub/caseStudy.ts`
- `src/app/borrowhub/CaseStudyTools.tsx`
- `src/app/borrowhub/page.tsx`
- `e2e/reference-content.spec.ts`
- `docs/ISSUE_26_28_REVIEW.md`
- القسم 11 من `Weapon_of_the_Era_Website_Content_AR.md`

| معيار القبول (Acceptance Criterion) | الحالة | الملفات المحققة والدليل المباشر |
| :--- | :---: | :--- |
| **1. القواعد التسع الموثقة، والأدوار، والجداول الخمسة، ومسار الطالب، وتنبيه التعارض مع PRD بدل حسمه بصمت** | **Passed** | • القواعد التسع منقولة حرفياً من المصدر في `caseStudy.ts` (الاعتماد اليدوي، وحدة لكل طلب، حد أقصى طلبان نشطان، 10 أيام كحد أقصى، سبب مطلوب، مهلة 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق، تأكيد مسؤول المعمل، التلف لا يعود للمتاح، المتابعة اليدوية للتأخر دون حظر تلقائي).<br>• الأدوار: `Student` و`Administrator / Staff` محددة بوضوح في `page.tsx`.<br>• الجداول الخمسة: `users`, `equipment_categories`, `equipment`, `loan_requests`, `loan_action_logs`.<br>• مسار الطالب: موثق نصياً وبمخطط Mermaid تفاعلي يعرض SVG داخل الصفحة.<br>• تنبيه PRD: صندوق تنبيه بارز (`aside role="note"`) يشدد على توثيق التعارض وسؤال المالك وعدم حسم أي خلاف بصمت أو اختراع غرامات وحظر وتواقيع غير موثقة. |
| **2. بقاء تأكيد التسليم والإرجاع من مسؤول المعمل، وتمييز قواعد المثال عن القوالب العامة** | **Passed** | • القاعدة رقم 7 ورسم المسار وبرومبت المراجعة تؤكد صراحة أن مسؤول المعمل يؤكد التسليم والإرجاع فيزيائياً بعد الفحص، ولا يعتبر زر الطالب بديلاً.<br>• التمييز: وسم واضح «مثال تعليمي — ليس مشروعًا إلزاميًا» وتنبيه أن القواعد خاصة بالمثال وليست قالباً عاماً، مع رابط مباشر إلى `/templates` للقوالب العامة. |
| **3. ظهور أمثلة مرتبطة بالمواضيع وملفات الدراسة بحسب توفرها الفعلي دون تنزيل وهمي** | **Passed** | • ربط المراحل بـ 5 مواضيع منشورة فعلية (`/learn/prd-specification`, `/learn/user-flow-modeling`, `/learn/relational-erd-design`, `/learn/screen-inventory`, `/learn/full-stack-journey-testing`).<br>• ملفات دراسة الحالة الـ 12 معروضة بحالتها الواقعية الصادقة: «غير متاح: ملف الحالة غير مرفوع».<br>• لا توجد أي روابط أو أزرار تنزيل وهمية (`[download]` = 0). |
| **4. فحص المتصفح للقراءة والرسوم والنسخ والروابط، والمراجعة التعليمية للحالة وقواعدها** | **Passed** | • فحص Playwright (`test 2` و`tests 5-9` في `reference-content.spec.ts`): تحقق من وجود 9 قواعد، و5 جداول، وظهور رسم Mermaid بصيغة SVG، ونسخ برومبت المراجعة فعلياً إلى حافظة المتصفح وقراءة قيمته، والتنقل إلى رابط الموضوع المنشور بنجاح.<br>• التجاوب: فحص انعدام التدفق الأفقي والقراءة عبر العروض المرجعية الـ 5 (390، 768، 1024، 1366، 1440 بكسل).<br>• المراجعة التعليمية: موثقة في `docs/ISSUE_26_28_REVIEW.md` بمثال طلب الكاميرا وتسليمها وفحص تلفها دون زيادة المتاح. |

---

## 3. مطابقة معايير القبول للقضية #27: دليل الأدوات والقوالب المتاحة

**عنوان القضية:** `[مسار المشروع 23] دليل الأدوات والقوالب المتاحة`  
**الملفات المفحوصة:**
- `src/app/tools/page.tsx`
- `src/app/tools/CourseToolsGuide.tsx`
- `src/data/course-tool-guide.ts`
- `src/app/templates/page.tsx`
- `src/data/reference-templates.ts`
- `e2e/tools-templates.spec.ts`
- `docs/ISSUE_27_REVIEW.md`
- الأقسام 12 و13 من `Weapon_of_the_Era_Website_Content_AR.md`

| معيار القبول (Acceptance Criterion) | الحالة | الملفات المحققة والدليل المباشر |
| :--- | :---: | :--- |
| **1. توضيح موضوع الاستخدام ومدخلات الملفات ومخرجاتها ودورة حياتها في صفحات الأدوات والقوالب** | **Passed** | • في `src/data/course-tool-guide.ts` (12 أداة مرجعية للمسار): كل أداة تحتوي على `purpose`، `timing`، `input`، `output`، `lifecycle`، `topic`، `source`، و`verification`.<br>• في `src/data/reference-templates.ts` (14 قالباً مرجعياً): كل قالب يحتوي على `name`، `fields`، `input`، `output`، `lifecycle`، و`topic`.<br>• كِلا الصفحتين تعرضان هذه الحقول بوضوح للمتعلم ضمن قوائم تعريفية (`<dl>`). |
| **2. مراجعة الأوامر والروابط الحساسة للإصدار من المصادر الرسمية قبل وصفها بأنها محققة** | **Passed** | • تمت مراجعة الأوامر والروابط مباشرة مقابل الوثائق الرسمية الأساسية (انظر جدول الفحص الخارجي أدناه).<br>• نُص صراحة في الصفحة والبيانات على أن مراجعة المصدر تؤكد النص الموثق ولا تعني تجربة التثبيت على جهاز الطالب.<br>• أُزيلت الأوامر غير الموثقة كأمر PowerShell لتثبيت CLI عن بُعد بدل ادعاء التحقق منها. |
| **3. عرض القوالب المرجعية الـ 14 بحالة توفر دقيقة وروابط تعمل للملفات الموجودة فقط** | **Passed** | • تعرض الصفحة `القوالب المرجعية الأربعة عشر` كاملة وبأسمائها وحقولها المرجعية.<br>• كل قالب يحمل حالة توفر دقيقة صريحة: `غير متاح للتنزيل`.<br>• انعدام تام لأي روابط تنزيل وهمية (`a[download]` = 0).<br>• روابط `موضوع الاستخدام` تصل إلى مواضيع منشورة فعلية وتستجيب برمز HTTP 200. |
| **4. بقاء أدوات التنفيذ مرتبطة بوقت الفرونت وعدم إعادة فرض تجهيزها في بداية التحليل** | **Passed** | • رسالة مركزية واضحة في `CourseToolsGuide.tsx`: «إعداد أدوات التنفيذ يبدأ عند بدء كود الفرونت. يمكن إكمال المقابلة والتوثيق والمخططات دون وكيل برمجي. إعداد الوكيل والمهارات وMCP يأتي بعد اعتماد النموذج التفاعلي».<br>• تأجيل أدوات Coding Agent وSkills وMCP إلى ما بعد اعتماد الشاشة المرجعية والـ Prototype. |
| **5. فحص المتصفح للبحث أو التنقل والنسخ والتنزيل الحقيقي، والمراجعة التعليمية للقوالب** | **Passed** | • فحص Playwright في `e2e/tools-templates.spec.ts`: تحقق من نسخ الحقول المرجعية ونسخ أمر `create-next-app` إلى حافظة المتصفح وقراءته، وتصفية دليل الوكلاء، واستجابة كافة روابط مواضيع الاستخدام برمز 200، وانعدام روابط التنزيل.<br>• فحص التجاوب عبر 390، 768، 1024، 1366، 1440 بكسل مع التأكد من عدم وجود تدفق أفقي.<br>• المراجعة التعليمية: موثقة في `docs/ISSUE_27_REVIEW.md`. |

---

## 4. فحص الوثائق الرسمية الخارجية الحساسة للإصدار (External Official Documentation Checks)

> **تنبيه منهجي صريح:** هذه الفحوصات هي **تدقيق وثائقي مباشر (Documentation Checks)** على المصادر الأولية الرسمية، وليست عمليات تثبيت حزم أو فتح حسابات أو استهلاك حصص تشغيلية. لم يتم إنشاء حسابات أو توفير مفاتيح API أو تشغيل أوامر تثبيت بيئة في هذا المسار.

| المرجع / الأداة | المصدر الرسمي الأولي | دليل الفحص الحي والنتيجة الوثائقية |
| :--- | :--- | :--- |
| **Next.js create-next-app** | [Next.js CLI Reference](https://nextjs.org/docs/app/api-reference/cli/create-next-app) | تم استرجاع الوثائق الحية؛ تأكدت صحة الأعلام: `--ts`, `--tailwind`, `--eslint`, `--app`, `--src-dir`, `--use-npm`. تم التنبيه على حساسية إصدار `latest` وأنه يتغير بمرور الوقت ووجوب الإنشاء في مجلد مستقل. |
| **DESIGN.md** | [google-labs-code/design.md](https://raw.githubusercontent.com/google-labs-code/design.md/main/README.md) | تم التحقق من مستودع Google الرسمي وقراءة README؛ تأكد أمر الفحص `npx @google/design.md lint DESIGN.md`. التنبيه التعليمي: نجاح فحص البنية اللفظية للتوكنز لا يضمن وحده الجودة البصرية. |
| **UI/UX Pro Max** | [nextlevelbuilder/ui-ux-pro-max-skill](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/README.md) | تم التحقق من وجود حزمة `ui-ux-pro-max-cli` (الإصدار الحالي 2.8.8 على npm)، وتأكد أمر `uipro init --ai antigravity` والبديل `npx ui-ux-pro-max-cli init --ai antigravity`. لم يُشغَّل التثبيت على جهاز الطالب. |
| **GitHub Spec Kit** | [github/spec-kit](https://raw.githubusercontent.com/github/spec-kit/main/README.md) | تم التحقق من حزمة `specify-cli` (الإصدار 1.2.1 على PyPI) والاعتماد على `uv tool install specify-cli`. التنبيه: صيغة الاستدعاء والتكامل تتبع الإصدار المثبت، وعدم تقديم وعد مطلق بالتوافق الشامل دون مراجعة. |
| **Google Stitch MCP** | [Google Codelab: Stitch MCP with Antigravity](https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch?hl=ar) | مسار الربط الرسمي: الحصول على API Key، ثم التثبيت من MCP Store داخل Antigravity IDE، والاختبار بطلب `List my Stitch projects.`. لم يُنشأ اتصال حي بحساب حقيقي. |
| **Antigravity** | [antigravity.google/docs](https://antigravity.google/docs) | تم التأكد من الرابط الرسمي؛ حُذف نص مثبت PowerShell غير المحقق بدل ادعاء اختباره، مع توضيح الفرق بين CLI وIDE. |
| **Matt Pocock Skills** | [mattpocock/skills](https://github.com/mattpocock/skills) | المستودع يوضح خيارات تثبيت بحسب كل وكيل؛ لا يُقدَّم أمر عام مطلق لتثبيت `/grill-me`. المقابلة متاحة يدوياً كأول خيار. |
| **محررات المخططات** | [Mermaid](https://mermaid.js.org/intro/), [PlantUML](https://plantuml.com/use-case-diagram), [DBML](https://dbml.dbdiagram.io/docs/) | تم تأكيد عناوين ومواقع المحررات الرسمية وتوافقها مع أنواع المخططات المطلوبة بالمسار. |

---

## 5. مطابقة معايير القبول للقضية #28: القاموس والأسئلة الشائعة أثناء التعلم

**عنوان القضية:** `[مسار المشروع 24] القاموس والأسئلة الشائعة أثناء التعلم`  
**الملفات المفحوصة:**
- `src/app/glossary/page.tsx`
- `src/app/glossary/GlossarySearch.tsx`
- `src/app/faq/page.tsx`
- `e2e/reference-content.spec.ts`
- `docs/ISSUE_26_28_REVIEW.md`
- الأقسام 14 و15 من `Weapon_of_the_Era_Website_Content_AR.md`

| معيار القبول (Acceptance Criterion) | الحالة | الملفات المحققة والدليل المباشر |
| :--- | :---: | :--- |
| **1. عرض القاموس التقني بمصطلحات المصدر (35 مصطلحاً أو أكثر) وتفعيل البحث العربي** | **Passed** | • يحتوي `GlossarySearch.tsx` على مصطلحات المصدر الـ 35 كاملة من القسم 14.<br>• محرك البحث يطبق تسوية عربية متقدمة (`normalizeArabic`) مع إزالة التشكيل والتطويل وتوحيد الهمزات والألف والياء المقصورة، ودعم البحث الإنجليزي غير الحساس لحالة الأحرف.<br>• فحص E2E أثبت: البحث عن `أَجْنَبِيَّة` يُرجع فقط `PK / FK`، والبحث عن `sequence` يُرجع `Sequence Diagram`، وتفريغ البحث يُعيد المصطلحات الـ 35 كاملة. |
| **2. توضيح الأسئلة للفروق بين الوثائق والمخططات والأدوات ومراحل Frontend وBackend** | **Passed** | • 12 سؤالاً شاملاً في `src/app/faq/page.tsx` توضح بالتفصيل:<br>  - الفرق بين PRD وSRS وDESIGN.md.<br>  - الفرق بين Domain Model المفاهيمي وERD التخزيني.<br>  - التمييز بين Mermaid وPlantUML وdbdiagram.io.<br>  - توضيح أن مرحلة Frontend تعمل ببيانات تمثيلية وأن المسار Full-Stack يستكمل Backend وAPI وقواعد البيانات والمصادقة والاختبار.<br>  - توضيح علاقة Agent بـ Skill بـ MCP وكيفية حماية الأسرار ومفاتيح API. |
| **3. استخدام مصطلحات المشروع المتفق عليها وعمل الروابط إلى المواضيع المنشورة** | **Passed** | • استخدام المصطلحات المعتمدة: مسار المشروع، الموضوع التعليمي، خطوة التطبيق، قائمة التحقق، تقدم القراءة.<br>• جميع الأسئلة تتضمن روابط موضوعية صريحة إلى مواضيع منشورة فعلية (`/borrowhub`, `/learn/project-idea-mvp`, `/learn/discovery-grill-me`, `/learn/diagram-lab`, `/learn/relational-erd-design`, `/learn/stitch-reference-screen`, `/learn/frontend-backend-integration`, `/learn/stitch-mcp-integration`, `/learn/design-md-spec`, `/learn/spec-kit-workflow`, `/learn/ai-coding-agent`, `/learn/full-stack-journey-testing`).<br>• جرى فحص شبكي حي لجميع هذه المسارات وتأكد استجابتها برمز HTTP 200. |
| **4. فحص المتصفح للبحث والقراءة والوصول، والمراجعة التعليمية للتعريفات والإجابات** | **Passed** | • فحص Playwright (`test 1`, `test 3`, `tests 5-9` في `reference-content.spec.ts`): البحث، القراءة، الوصول، استخدام لوحة المفاتيح عبر عناصر `<details>` و`<summary>` والتركيز المرئي.<br>• التجاوب: فحص انعدام التدفق الأفقي عبر العروض الـ 5 (390، 768، 1024، 1366، 1440 بكسل).<br>• المراجعة التعليمية: موثقة في `docs/ISSUE_26_28_REVIEW.md`. |

---

## 6. أدلة البوابات المتزامنة الحية (Synchronous Gate Evidence)

### أ. فحص أنواع TypeScript والـ Linting
- **الأمر:** `npm run lint -- --incremental false`
- **رمز الخروج (Exit Code):** `0`
- **المخرجات:** نجاح تام دون أي أخطاء أنواع أو تحذيرات lint.

### ب. فحوصات المتصفح Playwright E2E
- **بيئة التشغيل والخادم:** الخادم الحالي المشترك يعمل على المنفذ `3199` (المنفذ 3000 محجوز لعملية خارجية غير تابعة للمشروع).
- **الأمر:**
  ```bash
  E2E_PORT=3199 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/reference-content.spec.ts e2e/tools-templates.spec.ts --output=.verification/remaining-reference-results --reporter=line
  ```
- **رمز الخروج (Exit Code):** `0`
- **النتيجة:** نجاح 13 فحصاً من أصل 13 فحصاً (13 passed في دقيقة واحدة):
  1. `glossary restores source terms and supports normalized Arabic and English search` — Passed
  2. `BorrowHub explains source rules, staff handover, diagrams and honest case file availability` — Passed
  3. `FAQ distinguishes the full journey from Frontend stage and exposes published topic links` — Passed
  4. `BorrowHub modeling lessons preserve documented pickup origin and manual damage follow-up` — Passed
  5. `reference pages support reading, keyboard, RTL, diagrams, copy and search at 390px` — Passed
  6. `reference pages support reading, keyboard, RTL, diagrams, copy and search at 768px` — Passed
  7. `reference pages support reading, keyboard, RTL, diagrams, copy and search at 1024px` — Passed
  8. `reference pages support reading, keyboard, RTL, diagrams, copy and search at 1366px` — Passed
  9. `reference pages support reading, keyboard, RTL, diagrams, copy and search at 1440px` — Passed
  10. `reference templates expose fourteen honest availability states and copyable fields` — Passed
  11. `tools guide delays coding setup and supports verified command copy and directory filtering` — Passed
  12. `reference topic destinations resolve and reference pages fit phone and desktop widths` — Passed
  13. `Tailwind lesson prepares versioned token mapping before Next project bootstrap` — Passed

### ج. التحقق الشبكي من الروابط المنشورة
- تم فحص المسارات الـ 15 المرجعية عبر الخادم الحي (المنفذ 3199):
  - `/borrowhub` -> `200`
  - `/tools` -> `200`
  - `/templates` -> `200`
  - `/glossary` -> `200`
  - `/faq` -> `200`
  - `/learn/project-idea-mvp` -> `200`
  - `/learn/discovery-grill-me` -> `200`
  - `/learn/relational-erd-design` -> `200`
  - `/learn/stitch-reference-screen` -> `200`
  - `/learn/frontend-backend-integration` -> `200`
  - `/learn/stitch-mcp-integration` -> `200`
  - `/learn/design-md-spec` -> `200`
  - `/learn/spec-kit-workflow` -> `200`
  - `/learn/ai-coding-agent` -> `200`
  - `/learn/full-stack-journey-testing` -> `200`
  - `/learn/diagram-lab` -> `200`

---

## 7. حدود النتائج بدقة (Passed / Failed / Not Run Boundaries)

- **Passed (تم التحقق بنجاح):**
  - مطابقة قواعد BorrowHub التسع، والأدوار، والجداول الخمسة، ورسم Mermaid، وبرومبت المراجعة، والتنبيه على تعارضات PRD.
  - إعلان عدم توفر ملفات دراسة الحالة الـ 12 والقوالب المرجعية الـ 14 بصدق تام وانعدام التنزيل الوهمي.
  - تأكيد تأجيل أدوات التنفيذ إلى مرحلة الفرونت إند في دليل الأدوات.
  - تغطية القاموس لـ 35 مصطلحاً من المصدر مع البحث العربي المطبع والإنجليزي.
  - شمول الأسئلة الشائعة وتوضيحها للفروق المعمارية ومسار Full-Stack وارتباطها بمواضيع منشورة فعلياً.
  - التجاوب الكامل على العروض الخمسة (390، 768، 1024، 1366، 1440 بكسل) مع الحفاظ على اتجاه RTL وعدم وجود تدفق أفقي.
  - فحص TypeScript والـ Linting بنتيجة 0 أخطاء.

- **Failed (حالات إخفاق مرصودة في الكود الحالي):**
  - لا توجد أي حالات إخفاق (0 failures).

- **Not Run (فحوصات لم تُجرَ لعدم انطباقها أو خروجها عن نطاق المسار):**
  - **تنفيذ التثبيت الفعلي الخارجي:** لم يتم تثبيت حزم أو تشغيل أدوات CLI فعلياً على نظام المستخدم (`create-next-app`, `ui-ux-pro-max-cli`, `specify-cli`).
  - **إنشاء وتجربة حسابات خارجية:** لم يتم فتح حسابات سحابية في Google Stitch أو توفير مفاتيح API حية أو استهلاك حصص.
  - **تنزيل ملفات الحالة أو القوالب:** غير قابل للتنفيذ لعدم وجود ملفات مرفوعة في المستودع؛ بقاؤها «غير متاح» هو السلوك المطلوب.
  - **فحص المسار الكامل المدمج وبناء الإنتاج:** مملوك لمنسق المشروع (Codex) ومسارات الاختبار المتكاملة وليس لمسار المراجع الفردي.
  - **اعتماد مالك المحتوى الرسمي (#33):** موافقة المالك معلقة حتى مراجعة النموذج كاملاً.

---

## 8. الملفات والقرارات والمخاطر المتبقية

- **الملفات التي تم لمسها / إنشاؤها في هذا الاستدعاء:**
  - تم إنشاء هذا التقرير التوثيقي الشامل فقط: `docs/REMAINING_REFERENCES_20261019.md`.
  - بقية ملفات الكود المرجعية المملوكة وُجدت مكتملة بالفعل ومطابقة بدقة عند نقطة الأساس `3242248`، وحوفظ على سلامتها واستقرارها دون فرض تعديلات قسرية.
- **القرارات المتخذة:**
  - الالتزام التام بالصدق في عرض التوفر؛ عدم اختراع ملفات أو قوالب أو روابط تنزيل لا أصل لها في المستودع.
  - الفصل القاطع بين التدقيق الوثائقي للمصادر الرسمية وبين ادعاء تجربة التثبيت أو الاتصال الحي.
  - الحفاظ على المنفذ `3199` لتشغيل الفحوصات المتزامنة احتراماً لانشغال المنفذ 3000 ببرنامج خارجي.
- **المخاطر والقيود المتبقية:**
  - احتمالية تغير خيارات أو سلوك أدوات الطرف الثالث الخارجية الحساسة للإصدار مستقبلاً (مثل تغير علم في `create-next-app` أو انتقال إصدارات Spec Kit).
  - بقاء ملفات دراسة حالة BorrowHub وقوالب الـ 14 غير مرفوعة حتى يوفرها مالك المحتوى أو فريق التدريب.
- **معايير قبول غير مستوفاة (Outstanding Unmet Criteria):**
  - لا توجد أي معايير غير مستوفاة ضمن نطاق القضايا #26 و#27 و#28.
