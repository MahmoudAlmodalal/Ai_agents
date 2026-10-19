# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: path/git-github.spec.ts >> Sequential Project Path - Ticket 03 (Git & GitHub) >> copies PROMPT 04 documentation setup prompt with feedback and verified payload
- Location: e2e/path/git-github.spec.ts:105:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('PROMPT 04', { exact: true })
Expected: visible
Timeout: 7000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('PROMPT 04', { exact: true }) with timeout 7000ms
  - waiting for getByText('PROMPT 04', { exact: true })

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
  - link "العودة إلى مكتبة البرومبتات":
    - /url: /prompts
  - text: 04 التوثيق وإدارة النسخ مبتدئ توليد توثيق
  - heading "GitHub Documentation Setup" [level=1]
  - paragraph: اقتراح بنية README وdocs وشرح حفظ التوثيق وإدارته عبر GitHub.
  - text: الأداة المقترحة أو المذكورة
  - strong: مساعد أو وكيل يستطيع فحص ملفات المشروع
  - paragraph: "المصدر: وثيقة محتوى الموقع · PROMPT 04"
  - text: النص الكامل كما ورد في المصدر
  - button "نسخ البرومبت"
  - status
  - text: "```text Act as a Git and GitHub documentation mentor. Inspect my project directory. Propose a clear README.md and docs/ layout that preserves all existing files. Explain how to initialize a Git repository, commit documentation, create a branch, push and open a Pull Request. Do not run destructive commands or publish secrets. Ask before changing the remote repository. Output a concise student checklist in Arabic. ```"
  - heading "المدخلات" [level=2]
  - list:
    - listitem: ملفات مجلد المشروع
  - heading "المخرجات" [level=2]
  - list:
    - listitem: اقتراح README.md وبنية docs/
    - listitem: قائمة تحقق للطالب
  - heading "تنبيهات الاستخدام" [level=2]
  - list:
    - listitem: لا تنفذ أوامر مدمرة ولا تنشر أسرارًا، واطلب قبل تغيير remote.
  - heading "الموضوعات المرتبطة" [level=2]
  - list:
    - listitem:
      - 'link "Git: حفظ وثائق المشروع وتتبع النسخ محلياً"':
        - /url: /learn/git-project-docs
      - text: منشور
    - listitem:
      - 'link "GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار"':
        - /url: /learn/github-docs-collaboration
      - text: منشور
    - listitem:
      - link "وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)":
        - /url: /learn/ai-coding-agent
      - text: منشور
    - listitem:
      - 'link "Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب"':
        - /url: /learn/python-backend-foundation
      - text: منشور
  - link "النص التالي في المكتبة User Flow":
    - /url: /prompts/prompt-05-user-flow
    - text: النص التالي في المكتبة
    - strong: User Flow
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
  11  |     // Verify Git card metadata: real Git summary, tags, and not UML
  12  |     await expect(gitCard).toContainText('المرحلة التأسيسية');
  13  |     await expect(gitCard).toContainText('.gitignore');
  14  |     await expect(gitCard).toContainText('PROJECT_CONTEXT.md');
  15  |     await expect(gitCard).not.toContainText('PlantUML');
  16  |     await expect(gitCard).not.toContainText('بانتظار اعتماد المحتوى');
  17  | 
  18  |     // 2. Locate GitHub topic card
  19  |     const githubCard = page.locator('article.topic-card').filter({ hasText: 'GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار' }).first();
  20  |     await expect(githubCard).toBeVisible();
  21  | 
  22  |     // Verify GitHub card metadata: remote repo, PR, README
  23  |     await expect(githubCard).toContainText('Pull Request');
  24  |     await expect(githubCard).toContainText('README.md');
  25  |     await expect(githubCard).toContainText('المستودع البعيد');
  26  |     await expect(githubCard).not.toContainText('PlantUML');
  27  |   });
  28  | 
  29  |   test('modal reader displays Git topic details, checklist, outputs, and navigation link', async ({ page }) => {
  30  |     await page.goto('/');
  31  | 
  32  |     const gitCard = page.locator('article.topic-card').filter({ hasText: 'Git: حفظ وثائق المشروع وتتبع النسخ محلياً' }).first();
  33  |     const openModalBtn = gitCard.getByRole('button', { name: 'معاينة سريعة' });
  34  |     await openModalBtn.click();
  35  | 
  36  |     // Modal verification
  37  |     const modal = page.locator('.modal-container-box');
  38  |     await expect(modal).toBeVisible();
  39  |     await expect(modal).toContainText('Git: حفظ وثائق المشروع وتتبع النسخ محلياً');
  40  |     await expect(modal).toContainText('حماية الأسرار مبكراً');
  41  |     await expect(modal).toContainText('.gitignore');
  42  |     await expect(modal).toContainText('المخرجات المطلوبة:');
  43  |     await expect(modal).toContainText('قائمة تحقق التطبيق');
  44  | 
  45  |     // Link to full learning page from modal
  46  |     const fullPageLink = modal.locator('a[href*="/learn/git-project-docs"]').first();
  47  |     await expect(fullPageLink).toBeVisible();
  48  |   });
  49  | 
  50  |   test('learning page /learn/git-project-docs displays unified complete status, steps, and correct prev/next navigation', async ({ page }) => {
  51  |     await page.goto('/learn/git-project-docs');
  52  | 
  53  |     // Header and status
  54  |     await expect(page.locator('h1')).toContainText('Git: حفظ وثائق المشروع وتتبع النسخ محلياً');
  55  |     await expect(page.getByText('محتوى منشور')).toBeVisible();
  56  | 
  57  |     // Practical steps on student project
  58  |     await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
  59  |     await expect(page.locator('article')).toContainText('git init');
  60  |     await expect(page.locator('article')).toContainText('.gitignore');
  61  |     await expect(page.locator('article')).toContainText('PROJECT_CONTEXT.md');
  62  | 
  63  |     // Outputs and Checklist
  64  |     await expect(page.getByText('المخرجات المطلوبة:')).toBeVisible();
  65  |     await expect(page.getByText('قائمة تحقق التطبيق')).toBeVisible();
  66  | 
  67  |     // Navigation bounds:
  68  |     // Prev points to published Topic 4 (srs).
  69  |     const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
  70  |     await expect(prevLink).toBeVisible();
  71  |     await expect(prevLink).toHaveAttribute('href', '/learn/srs');
  72  | 
  73  |     // Next points to Topic 6 (github-docs-collaboration)
  74  |     const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
  75  |     await expect(nextLink).toBeVisible();
  76  |     await expect(nextLink).toHaveAttribute('href', '/learn/github-docs-collaboration');
  77  |   });
  78  | 
  79  |   test('learning page /learn/github-docs-collaboration displays PR review, secrets protection, and navigation', async ({ page }) => {
  80  |     await page.goto('/learn/github-docs-collaboration');
  81  | 
  82  |     // Header and status
  83  |     await expect(page.locator('h1')).toContainText('GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار');
  84  |     await expect(page.getByText('محتوى منشور')).toBeVisible();
  85  | 
  86  |     // Content: PR review, secrets protection, README template
  87  |     await expect(page.locator('article')).toContainText('Pull Request');
  88  |     await expect(page.locator('article')).toContainText('Secret Scanning');
  89  |     await expect(page.locator('article')).toContainText('README.md');
  90  | 
  91  |     // Official reference badge/notice
  92  |     await expect(page.locator('article')).toContainText('docs.github.com');
  93  | 
  94  |     // Navigation bounds:
  95  |     // Prev points to Topic 5 (git-project-docs)
  96  |     const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
  97  |     await expect(prevLink).toBeVisible();
  98  |     await expect(prevLink).toHaveAttribute('href', '/learn/git-project-docs');
  99  | 
  100 |     // Next points to the following topic
  101 |     const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
  102 |     await expect(nextLink).toBeVisible();
  103 |   });
  104 | 
  105 |   test('copies PROMPT 04 documentation setup prompt with feedback and verified payload', async ({ page, context }) => {
  106 |     await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  107 |     await page.goto('/prompts/prompt-04-github-documentation-setup');
  108 | 
  109 |     // Title and metadata
  110 |     await expect(page.locator('h1')).toContainText('GitHub Documentation Setup');
> 111 |     await expect(page.getByText('PROMPT 04', { exact: true })).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  112 | 
  113 |     // Click copy button
  114 |     const copyBtn = page.getByRole('button', { name: /نسخ البرومبت/ });
  115 |     await expect(copyBtn).toBeVisible();
  116 |     await copyBtn.click();
  117 | 
  118 |     // Feedback confirmation
  119 |     await expect(page.getByText('تم النسخ')).toBeVisible();
  120 | 
  121 |     // Clipboard verification
  122 |     const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  123 |     expect(clipboardText).toContain('Git and GitHub documentation mentor');
  124 |     expect(clipboardText).toContain('Do not run destructive commands or publish secrets');
  125 |   });
  126 | });
  127 | 
```