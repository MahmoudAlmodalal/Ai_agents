# Practical Prompts Cheatsheet

## طريقة الاستخدام السريعة

استبدل الحقول التالية قبل إرسال أي Prompt:

- `[PROJECT_NAME]`: اسم مشروعك.
- `[DOMAIN]`: المجال، مثل التعليم أو التجارة أو الصحة.
- `[TARGET_USERS]`: المستخدمون المستهدفون.
- `[CURRENT_OUTPUT]`: الملف أو المخرج الذي أنجزته.
- `[NEXT_DELIVERABLE]`: المخرج المطلوب في المحاضرة الحالية.

نفّذ كل محاضرة بهذه الدورة:

1. أرسل Prompt التحضير والتنفيذ.
2. راجع الملفات والقرارات قبل قبول التغيير.
3. أرسل Prompt المراجعة.
4. أصلح عيبًا واحدًا فقط في كل دورة.
5. أرسل Prompt التسليم والتوثيق.
6. شغّل الفحص المناسب ثم اعمل Commit وPush.

لا ترسل أسرارًا أو مفاتيح API أو محتوى `.env` إلى أي أداة ذكاء اصطناعي.

## Prompt A — التحضير والتنفيذ

```text
أعمل على مشروع [PROJECT_NAME] في مجال [DOMAIN] للمستخدمين [TARGET_USERS].
هذه محاضرة: [LESSON_TITLE].
اقرأ وثائق المشروع المتاحة، وحدد ما هو مؤكد وما هو ناقص قبل التنفيذ.
نفّذ المخرج التالي فقط: [NEXT_DELIVERABLE].
اربط كل قرار بمصدره، ولا تخترع سلوكًا أو تقنية أو بيانات غير موثقة.
قبل التعديل اذكر الملفات التي ستتغير ومعايير القبول.
بعد التعديل شغّل الفحص المناسب، ثم لخّص النتيجة وتوقف.
``` 

## Prompt B — المراجعة

```text
أنت Reviewer مستقل لمشروع [PROJECT_NAME].
راجع مخرج [LESSON_NUMBER]: [LESSON_TITLE] مقابل PRD وSRS وأي تصميم أو عقد متاح.
اكتب جدولًا من PASS وFAIL وOPEN QUESTION.
افحص الاتساق، الحالات الحدية، قابلية التحقق، وعدم إضافة نطاق غير معتمد.
لا تصلح كل شيء دفعة واحدة: اقترح أعلى عيب تأثيرًا، ثم توقف وانتظر الاعتماد.
``` 

## Prompt C — التسليم

```text
لخّص إنجاز محاضرة [LESSON_NUMBER] لمشروع [PROJECT_NAME].
اذكر: الملفات والمخرجات، القرارات المعتمدة، الأسئلة المفتوحة، الفحوصات ونتائجها، والمخاطر.
اكتب ملاحظة Handoff قصيرة ليكمل طالب آخر من نفس المستودع دون تخمين.
اقترح رسالة Commit واضحة، ولا تقل إن العمل مكتمل إذا بقيت فجوة أو فشل فحص.
``` 

## خريطة المحاضرات والمخرجات (مرجع تاريخي لمسار المحاضرات الأولي — الفهرس النشط المعتمد 58 موضوعًا)

| # | المحاضرة (مرجع تاريخي) | المخرج الأساسي |
|---|---|---|
| 01 | من الفكرة إلى PRD | `docs/PRD.md` |
| 02 | PRD Review وGitHub وAI Diagrams | `PRD_REVIEW.md` و`user-flow.md` |
| 03 | SRS والتخطيط التقني | `docs/SRS.md` و`TECHNICAL_PLAN.md` |
| 04 | Database Analysis وERD | `docs/ERD.md` و`database.dbml` |
| 05 | Database Design | Schema وقيود وفهارس مبررة |
| 06 | Database Implementation | Migrations وSeed وCRUD |
| 07 | UI/UX Planning with AI | `SCREEN_INVENTORY.md` و`UX_BLUEPRINT.md` |
| 08 | Frontend Setup وAI Coding Agents | Frontend scaffold وUI primitives |
| 09 | Frontend Functionality | Route وForm وValidation وحالات UI |
| 10 | Responsive UI وFrontend Quality | QA report وResponsive fixes |
| 11 | Backend Architecture وREST APIs | `API_CONTRACT.md` |
| 12 | Backend وDatabase Integration | أول API وService layer واختبارات |
| 13 | Business Logic وAPI Development | Business rule tests وValidation |
| 14 | Authentication وAuthorization وSecurity | `SECURITY_AUTH_PLAN.md` وRole Matrix |
| 15 | Full-Stack Integration وTesting | Integrated flow وE2E scenario |
| 16 | Deployment Preparation | `DEPLOYMENT_PLAN.md` وEnvironment reference |
| 17 | Cloud Deployment وMonitoring | Live URL وRunbook وRollback plan |
| 18 | Project Documentation وPortfolio | `README.md` وScreenshots |
| 19 | Final Review وProduct Presentation | `FINAL_REVIEW.md` وDemo scenario |
| 20 | Demo Day | Demo script وPresentation checklist |

## Prompts متخصصة حسب المرحلة

### التخطيط والـPRD

```text
حلّل فكرة [PROJECT_NAME] في مجال [DOMAIN] للمستخدمين [TARGET_USERS].
اسأل سؤالًا واحدًا في كل مرة لكشف المشكلة والنطاق والقيود.
بعد اعتماد الإجابات أنشئ PRD يتضمن MVP وUser Stories وAcceptance Criteria والحالات الحدية.
افصل المؤكد عن الافتراض والأسئلة المفتوحة، ولا تضف ميزة غير معتمدة.
```

### قاعدة البيانات

```text
اقرأ PRD وSRS لمشروع [PROJECT_NAME].
استخرج Entities وAttributes والعلاقات والقيود، واربط كل قرار بقاعدة عمل.
أنشئ ERD وDBML، ثم راجع PK وFK وUNIQUE وCHECK والتطبيع.
لا تضف جدولًا أو عمودًا بلا سبب تجاري موثق.
```

### تصميم الواجهة

```text
حوّل User Flow لمشروع [PROJECT_NAME] إلى Screen Inventory وUX Blueprint.
لكل شاشة اذكر الهدف والمستخدم والمدخلات والمخرجات والمكونات وحالات Loading وEmpty وError وSuccess.
اقترح شاشة ممثلة واحدة أولًا، ولا تولد كل الشاشات قبل اعتماد اللغة البصرية.
```

### Next.js وFrontend

```text
اقرأ PRD وDESIGN.md لمشروع [PROJECT_NAME].
أنشئ خطة Routes وComponents وData Contracts باستخدام App Router.
اجعل Server Components هي الافتراضية، واستخدم Client Component للتفاعل فقط.
نفّذ Route واحدة وTask واحدة فقط، ثم شغّل tsc وbuild وتوقف للمراجعة.
```

### Backend وAPI

```text
حوّل User Story المعتمدة لمشروع [PROJECT_NAME] إلى API Contract.
حدّد endpoint وHTTP method وrequest وresponse وstatus codes وvalidation وerrors.
لا تكتب كودًا قبل اعتماد العقد، ولا تنشئ API لميزة خارج PRD.
```

### الأمن

```text
راجع مشروع [PROJECT_NAME] بحثًا عن مخاطر الأسرار والصلاحيات والـownership.
افصل Authentication عن Authorization، وأنشئ Role Matrix وThreat List.
لا تطبع tokens أو passwords أو مفاتيح API، ولا تضعها في Client أو GitHub.
```

### النشر

```text
جهّز مشروع [PROJECT_NAME] للإنتاج.
اكتب Deployment Plan يحدد البيئات، المتغيرات المطلوبة بأسمائها فقط، Build، Health Check، Logs، وRollback.
لا تعرض قيم الأسرار ولا ترفع .env، واختبر Production build قبل النشر.
```

## أوامر التحقق والتسليم

```bash
# فحص TypeScript
npx tsc --noEmit

# بناء الإنتاج
npm run build

# مراجعة التغييرات
git status
git diff

# حفظ مخرج المحاضرة
git add .
git commit -m "feat: complete lesson output"
git push origin feature/lesson-output
```

## قاعدة الانتقال بين المحاضرات

لا تنتقل إلى المحاضرة التالية إلا إذا كان لديك:

- مخرج محفوظ في ملف أو كود.
- مصدر واضح لكل قرار مهم.
- Acceptance Criteria قابلة للفحص.
- مراجعة PASS أو قائمة فجوات صريحة.
- نتيجة فحص موثقة.
- Commit يمكن الرجوع إليه.
