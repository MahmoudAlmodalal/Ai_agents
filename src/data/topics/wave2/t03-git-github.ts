import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

export const topic05GitHtml = `
      <!-- ==================== TOPIC 05: GIT FOR PROJECT DOCS ==================== -->
      <section id="topic-05-git" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 05</span>
          <span class="step-pill">إدارة النسخ وتوثيق المشروع</span>
          <span class="status-pill verified">أوامر محققة: git-scm.com</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">Git: حفظ وثائق المشروع وتتبع النسخ محلياً</h2>
            <div class="step-subtitle">تأسيس المستودع المحلي، حماية الأسرار عبر .gitignore، وتوثيق سجل التغييرات والفروع الآمنة للوثائق</div>
          </div>
        </div>

        <!-- Section Intro Callout -->
        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">💡</span>
            <span>لماذا نبدأ بـ Git لحفظ الوثائق قبل كتابة أي كود؟</span>
          </div>
          <p>
            تتطور متطلبات المشروع وقراراته الهندسية باستمرار خلال مرحلة التحليل والتصميم. إذا قمت بتعديل وثيقة المتطلبات <code>docs/PRD.md</code> أو مواصفات النظام <code>docs/SRS.md</code> دون نظام إدارة نسخ، فلن تتمكن من معرفة <em>لماذا</em> تم تغيير قاعدة عمل معينة، أو الرجوع إلى قرار سابق عند اكتشاف ثغرة، أو التعاون بأمان مع فريقك.
          </p>
          <p>
            <strong>القاعدة الأساسية:</strong> Git ليس مخصصاً للأكواد البرمجية فحسب، بل هو الحافظ الأمين لقراراتك الهندسية وتاريخ وثائق مشروعك منذ اليوم الأول، مع حماية أسرارك وملفاتك الخاصة قبل أن تبدأ.
          </p>
        </div>

        <h3>1. التحقق من البيئة وضبط هوية المطوّر</h3>
        <p>
          تحقق من تثبيت Git. بعد تهيئة المستودع، يمكنك ضبط اسمك وبريدك الإلكتروني لهذا المشروع فقط؛ هذه البيانات تُسجل في كل نقطة حفظ (Commit). لا تستخدم الإعداد العام إلا إذا أردت الهوية نفسها في كل مستودعاتك.
        </p>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">BASH — التحقق والتهيئة [مرجع Git الرسمي: git-scm.com/docs/git-config]</span>
            <button class="copy-btn" type="button" aria-label="نسخ أوامر ضبط هوية Git">نسخ</button>
          </div>
          <pre class="code-content"><code># تحقق من وجود Git وإصداره (يتطلب الإصدار 2.23+ لدعم الأوامر الحديثة)
git --version</code></pre>
        </div>

        <h3>2. تهيئة المستودع وتنظيم هيكل مجلد الوثائق</h3>
        <p>
          انتقل إلى المجلد الرئيسي لمشروعك وقم بتشغيل أمر <code>git init</code>. ينشئ هذا الأمر مجلداً مخفياً باسم <code>.git</code> يحتوي على قاعدة بيانات التتبع المحلية للمشروع.
        </p>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">BASH — تهيئة المستودع [مرجع Git الرسمي: git-scm.com/docs/git-init]</span>
            <button class="copy-btn" type="button" aria-label="نسخ أوامر تهيئة المستودع">نسخ</button>
          </div>
          <pre class="code-content"><code># الدخول إلى مجلد المشروع وتهيئة مستودع Git محلي
cd my-project
git init

# ضبط هوية هذا المستودع فقط بعد تهيئته
git config --local user.name "Your Name"
git config --local user.email "your.email@example.com"
git config --local --get user.name
git config --local --get user.email

# التأكد من وجود مجلد docs/ ووضع وثائق المشروع الأولية داخله
mkdir -p docs
ls -la docs/
# الملفات المتوقعة: docs/PROJECT_CONTEXT.md و docs/PRD.md و docs/SRS.md</code></pre>
        </div>

        <h3>3. حماية الأسرار مبكراً: إعداد ملف .gitignore الصارم</h3>
        <div class="callout warning">
          <div class="callout-header">
            <span class="callout-icon">🛡️</span>
            <span>قاعدة أمنية إلزامية: أنشئ .gitignore قبل أول Commit</span>
          </div>
          <p>
            الملف الذي يدخل سجل Git يصعب مسحه بالكامل لاحقاً لأن تاريخ Git يحتفظ بكل النسخ السابقة. لذلك يجب حظر ملفات البيئة (<code>.env</code>) ومفاتيح API والمجلدات المؤقتة وملفات النظام <strong>قبل تسجيل أي ملف</strong> في المستودع.
          </p>
        </div>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">GITIGNORE — نموذج حماية الأسرار وملفات التوثيق</span>
            <button class="copy-btn" type="button" aria-label="نسخ محتوى gitignore">نسخ</button>
          </div>
          <pre class="code-content"><code># Environment Variables & Secrets (حظر تام للملفات التي تحتوي أسراراً حقيقية)
.env
.env.local
.env.*.local
*.env
*.key
*.pem
*.token

# System & OS Files
.DS_Store
Thumbs.db

# IDE & Editor specific files
.idea/
.vscode/
*.swp
*.swo

# Temporary & Output artifacts
dist/
build/
*.tmp
*.log

# Dependencies (عند البدء بتطوير الكود لاحقاً)
node_modules/</code></pre>
        </div>

        <p class="text-sm" style="color: var(--text-muted); line-height: 1.8;">
          <strong>ملاحظة للمشروع:</strong> لحفظ قوالب الإعدادات بأمان دون إفشاء الأسرار، أنشئ ملفاً باسم <code>.env.example</code> يحتوي على أسماء المفاتيح فقط بقيم وهمية (مثل: <code>DATABASE_URL=postgresql://user:password@localhost:5432/dbname</code>) وضعه داخل المستودع ليكون دليلاً لمن يعمل معك.
        </p>

        <h3>4. إضافة الوثائق وتسجيل أول نقطة حفظ (First Commit)</h3>
        <p>
          تمر ملفاتك بثلاث مراحل في Git:
          <strong>Working Directory</strong> (المجلد الحالي)، ثم <strong>Staging Area</strong> (المنطقة المرحلية عبر <code>git add</code>)، ثم <strong>Repository History</strong> (السجل الدائم عبر <code>git commit</code>).
        </p>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">BASH — الحفظ الدلالي للوثائق [مرجع: git-scm.com/docs/git-commit]</span>
            <button class="copy-btn" type="button" aria-label="نسخ أوامر مرحلة الحفظ">نسخ</button>
          </div>
          <pre class="code-content"><code># 1. معاينة حالة الملفات غير المتتبعة
git status

# 2. إضافة ملف .gitignore أولاً لضمان عدم تتبع أي ملفات سرية
git add .gitignore

# 3. إضافة مجلد الوثائق والملفات التعريفية
git add docs/ README.md

# 4. تسجيل أول نقطة حفظ برسالة واضحة بمعيار Conventional Commits
git commit -m "docs: initialize repository with project context and PRD requirements"

# 5. عرض سجل الحفظ المختصر للتحقق
git log --oneline</code></pre>
        </div>

        <h3>5. الفروع الآمنة (Branches) والتراجع غير التدميري</h3>
        <p>
          عندما تريد كتابة مواصفة تفصيلية جديدة مثل <code>docs/SRS.md</code> أو تحديث ميزة في الـ PRD، لا تعدّل الفرع الرئيسي <code>main</code> مباشرة؛ بل أنشئ فرع عمل مخصصاً، وافحص الفروقات قبل الاعتماد:
        </p>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">BASH — الفروع ومراجعة الفروقات [مرجع: git-scm.com/docs/git-switch]</span>
            <button class="copy-btn" type="button" aria-label="نسخ أوامر الفروع والفروقات">نسخ</button>
          </div>
          <pre class="code-content"><code># إنشاء فرع عمل مخصص لتحديث الوثائق والانتقال إليه
# (git switch -c أمر حديث محقق في Git 2.23+، والبديل التقليدي هو git checkout -b)
git switch -c docs/srs-specification

# بعد تعديل أو إضافة docs/SRS.md، افحص الفروقات بدقة:
git diff

# فحص الفروقات للملفات المجهزة في المرحلة المرحلية:
git diff --staged

# حفظ التعديل على فرع العمل المستقل:
git add docs/SRS.md
git commit -m "docs: add SRS system requirements specification"

# العودة للفرع الرئيسي بأمان دون تدمير أو حذف أي ملف:
git switch main</code></pre>
        </div>

        <!-- Supplemental Prompt Section -->
        <section class="supplemental-content">
          <span class="supplemental-label">برومبت معتمد — مساعد تنظيم مستودع الوثائق</span>
          <h3>PROMPT 04: تهيئة مستودع توثيق المشروع</h3>
          <p>
            استخدم هذا البرومبت لتوجيه مساعد الذكاء الاصطناعي لفحص مجلد مشروعك واقتراح بنية منظمة لملف <code>README.md</code> ومجلد <code>docs/</code> دون تنفيذ أي أوامر تدميرية أو تسريب أسرار.
          </p>
          <div class="code-container" dir="ltr">
            <div class="code-header">
              <span class="code-lang">PROMPT 04 — GitHub Documentation Setup</span>
              <button class="copy-btn" type="button" aria-label="نسخ PROMPT 04">نسخ</button>
            </div>
            <pre class="code-content"><code>Act as a Git and GitHub documentation mentor.
Inspect my project directory. Propose a clear README.md and docs/ layout
that preserves all existing files. Explain how to initialize a Git repository,
commit documentation, create a branch, push and open a Pull Request.
Do not run destructive commands or publish secrets.
Ask before changing the remote repository.
Output a concise student checklist in Arabic.</code></pre>
          </div>
        </section>

        <!-- Official References Notice -->
        <div class="callout note" style="margin-top: 1.5rem;">
          <div class="callout-header">
            <span class="callout-icon">📖</span>
            <span>المراجع الرسمية المعتمدة لأوامر هذا الموضوع</span>
          </div>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li><strong>Git Official Documentation:</strong> <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer" style="color: var(--brand-primary); text-decoration: underline;">https://git-scm.com/doc</a> (تمت مراجعة وتحقيق كافة أوامر: <code>git init</code>, <code>git config</code>, <code>git add</code>, <code>git commit</code>, <code>git switch</code>, <code>git diff</code>, <code>git log</code>).</li>
            <li><strong>الحدود التعليمية:</strong> لا يتطلب هذا الموضوع تثبيت أدوات كود الفرونت إند أو وكلاء البرمجة الذاتية؛ التركيز محصور في حفظ ومراجعة وثائق المشروع التأسيسية.</li>
          </ul>
        </div>
      </section>
`;

export const topic06GitHubHtml = `
      <!-- ==================== TOPIC 06: GITHUB COLLABORATION & SECRETS ==================== -->
      <section id="topic-06-github" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 06</span>
          <span class="step-pill">المستودع البعيد والمراجعة</span>
          <span class="status-pill verified">أوامر محققة: docs.github.com</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار</h2>
            <div class="step-subtitle">مزامنة الوثائق ومراجعة التغييرات عبر Pull Requests وتأمين الأسرار والتعاون الهندسي</div>
          </div>
        </div>

        <!-- Section Intro Callout -->
        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">💡</span>
            <span>ما دور GitHub في مرحلة توثيق المشروع؟</span>
          </div>
          <p>
            بينما يعمل <strong>Git</strong> محلياً على جهازك لتسجيل التغييرات، تُعد منصة <strong>GitHub</strong> مساحة التعاون الهندسية السحابية التي تتيح لك حفظ نسخة احتياطية آمنة من وثائق مشروعك، ومراجعة التعديلات عبر طلبات الدمج (Pull Requests)، ومناقشة قرارات المتطلبات مع زملائك والمشرفين قبل البدء بأي خطوة تنفيذية.
          </p>
          <p>
            <strong>تنبيه هام:</strong> نستخدم GitHub هنا كمنصة لحفظ ومراجعة الوثائق وتأمين الأسرار، ولا نطلب نشراً عاماً غير مصرح به أو استضافة سحابية مبكرة لم ينضج كودها بعد.
          </p>
        </div>

        <h3>1. إنشاء المستودع البعيد والمصادقة الآمنة</h3>
        <p>
          سجّل الدخول إلى حسابك على GitHub (حساب مجاني عادي) وأنشئ مستودعاً جديداً (New Repository) يحمل اسم مشروعك:
        </p>
        <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
          <li>اختر نوع المستودع: <strong>Private</strong> إذا كان مشروعك خاصاً، أو <strong>Public</strong> إذا كنت تشاركه مفتوح المصدر.</li>
          <li><strong>تحذير هام:</strong> لا تختر خيارات إضافة README أو .gitignore أو License من واجهة الموقع إن كنت قد أنشأتها محلياً في الموضوع السابق؛ لتجنب تضارب التواريخ (Merge Conflicts).</li>
          <li><strong>المصادقة الآمنة:</strong> استخدم مفاتيح SSH الموثقة أو GitHub Personal Access Token (PAT). لم تعد GitHub تقبل كلمات المرور الصريحة لعمليات الرفع (Push).</li>
        </ul>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">BASH — ربط المستودع والرفع الأولي [مرجع: docs.github.com/get-started]</span>
            <button class="copy-btn" type="button" aria-label="نسخ أوامر ربط المستودع">نسخ</button>
          </div>
          <pre class="code-content"><code># 1. ضبط اسم الفرع الافتراضي إلى main (معيار Git وGitHub الحديث)
git branch -M main

# 2. ربط المستودع المحلي بمستودعك البعيد على GitHub (استبدل username و repo باسمك الفعلي)
# خيار HTTPS:
git remote add origin https://github.com/USERNAME/MY-PROJECT.git
# أو خيار SSH (الموصى به أمنياً):
# git remote add origin git@github.com:USERNAME/MY-PROJECT.git

# 3. التحقق من صحة رابط المستودع البعيد
git remote -v

# 4. رفع الفرع الرئيسي وتثبيت المرجع التتبعي (-u تعني --set-upstream)
git push -u origin main</code></pre>
        </div>

        <h3>2. صياغة README.md احترافي لمشروعك</h3>
        <p>
          ملف <code>README.md</code> هو واجهة مشروعك الأولى على GitHub. يجب أن يشرح بوضوح بيان المشكلة، الفئة المستهدفة، روابط وثائق المشروع المعتمدة في مجلد <code>docs/</code>، وحالة التقدم الحالية.
        </p>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">MARKDOWN — قالب README.md المعتمد لتوثيق مشروع الطالب</span>
            <button class="copy-btn" type="button" aria-label="نسخ قالب README">نسخ</button>
          </div>
          <pre class="code-content"><code># اسم المشروع (Project Name)

> وصف موجز في سطر واحد: حل برمجي موثق مبني بالذكاء الاصطناعي لحل [المشكلة الواقعية].

## 📌 نبذة عن المشروع وبيان المشكلة
- **المشكلة:** [صياغة المشكلة المستفادة من docs/PROJECT_CONTEXT.md].
- **المستخدم المستهدف:** [الطلاب / الإداريون / الزوار].
- **نطاق النسخة الأولى (MVP):** [أهم 3 ميزات أساسية حُسمت في PRD].

## 📂 وثائق المشروع المعتمدة (Single Source of Truth)
جميع قرارات المشروع ومواصفاته موثقة داخل مجلد \`docs/\`:
- [سياق المشروع والفكرة](docs/PROJECT_CONTEXT.md)
- [وثيقة متطلبات المنتج الكاملة (PRD)](docs/PRD.md)
- [مواصفات النظام وقواعد العمل (SRS)](docs/SRS.md)

## 🛡️ سياسة الأمان والأسرار
- هذا المستودع يتبع سياسة صارمة لمنع تسريب المفاتيح والأسرار.
- ملفات الإعدادات الفعلية (\`.env\`) مستبعدة تماماً عبر \`.gitignore\`.
- للاطلاع على المتغيرات المطلوبة، راجع القالب التوضيحي \`.env.example\`.

## 🚦 حالة المشروع الحالية
- المرحلة: **تحليل المتطلبات وهندسة الوثائق** (Requirements & Documentation Phase).</code></pre>
        </div>

        <h3>3. حماية الأسرار وميزة GitHub Secret Scanning</h3>
        <div class="callout warning">
          <div class="callout-header">
            <span class="callout-icon">⚠️</span>
            <span>فحص الأسرار قبل Push وميزة Push Protection</span>
          </div>
          <p>
            تتوفر ميزتا <strong>Secret Scanning</strong> و<strong>Push Protection</strong> لبعض المستودعات والحسابات بحسب إعدادات GitHub ونوع السر. وقد يحظر Push Protection بعض الأسرار المكتشفة عند تفعيله؛ لا يغطي كل الأسرار ولا يضمن خلو المستودع منها. استخدمهما كطبقة إضافية إذا كانتا متاحتين، وافحص تغييراتك محلياً دائماً.
          </p>
          <p>
            <strong>الإجراء الوقائي:</strong> قبل الدفع، راجع كل commit سيصل إلى الوجهة، لا آخر commit فقط. بعد ضبط upstream، استخدم <code>git log -p @{u}..HEAD</code>. في أول دفع بلا upstream، راجع سجل الفرع كاملاً عبر <code>git log --root -p HEAD</code>. لا تلصق مخرجات قد تحتوي سراً في محادثة أو تقرير عام. إذا دخل سر إلى أي commit، اعتبره مكشوفاً ودوّره؛ نجاح الدفع أو فحص المنصة لا يثبتان خلو التاريخ.
          </p>
        </div>

        <h3>4. دورة المراجعة الهندسية عبر طلبات الدمج (Pull Requests)</h3>
        <p>
          العمل الاحترافي يقتضي ألا يدفع المطور تعديلاته إلى <code>main</code> مباشرة، بل يعتمد دورة المراجعة:
        </p>

        <div class="code-container" dir="ltr">
          <div class="code-header">
            <span class="code-lang">BASH — رفع فرع الوثائق وفتح PR [مرجع: docs.github.com/pull-requests]</span>
            <button class="copy-btn" type="button" aria-label="نسخ أوامر رفع الفرع وتحديث main">نسخ</button>
          </div>
          <pre class="code-content"><code># 1. الانتقال إلى فرع التوثيق الذي أنشأته
git switch docs/srs-specification

# 2. رفع الفرع إلى المستودع البعيد
git push -u origin docs/srs-specification

# 3. بعد فتح Pull Request وقبوله ودمجه على GitHub، قم بتحديث جهازك المحلي:
git switch main
git pull origin main

# 4. حذف الفرع المحلي بعد اكتمال الدمج بنجاح:
git branch -d docs/srs-specification</code></pre>
        </div>

        <!-- Supplemental Review Prompt -->
        <section class="supplemental-content">
          <span class="supplemental-label">برومبت مراجعة هندسية — مراجعة Pull Request للوثائق</span>
          <h3>مراجعة وثائق المشروع قبل الدمج (Documentation PR Review)</h3>
          <p>
            انسخ هذا البرومبت واطلب من الذكاء الاصطناعي أو الزميل مراجعة وثائق المشروع نقدياً داخل الـ Pull Request للكشف عن أي غموض أو تعارض في المتطلبات.
          </p>
          <div class="code-container" dir="ltr">
            <div class="code-header">
              <span class="code-lang">PROMPT — Documentation Pull Request Review</span>
              <button class="copy-btn" type="button" aria-label="نسخ برومبت مراجعة الوثائق">نسخ</button>
            </div>
            <pre class="code-content"><code>Act as a Senior Software Architect reviewing a documentation Pull Request.
Inspect the changes in docs/PRD.md and docs/SRS.md against docs/PROJECT_CONTEXT.md.
Check for:
1. Contradictions between the MVP scope and detailed functional requirements.
2. Unclear edge cases or missing business rules.
3. Unverified secrets, tokens or environment variables accidentally documented.
4. Feasibility of requirements before advancing to architecture and diagramming.
Provide structured feedback in Arabic with suggested corrections.</code></pre>
          </div>
        </section>

        <!-- Official References Notice -->
        <div class="callout note" style="margin-top: 1.5rem;">
          <div class="callout-header">
            <span class="callout-icon">📖</span>
            <span>المراجع الرسمية وضوابط المنصة</span>
          </div>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li><strong>GitHub Official Documentation:</strong> <a href="https://docs.github.com" target="_blank" rel="noopener noreferrer" style="color: var(--brand-primary); text-decoration: underline;">https://docs.github.com</a> (إرشادات المستودعات، المصادقة، والـ Pull Requests).</li>
            <li><strong>GitHub Secret Scanning:</strong> <a href="https://docs.github.com/code-security/secret-scanning" target="_blank" rel="noopener noreferrer" style="color: var(--brand-primary); text-decoration: underline;">docs.github.com/code-security/secret-scanning</a>.</li>
            <li><strong>حساب المنصة:</strong> التسجيل مجاني تماماً على <a href="https://github.com" target="_blank" rel="noopener noreferrer" style="color: var(--brand-primary); text-decoration: underline;">github.com</a>، ولا توجد روابط تنزيل تجارية أو وهمية.</li>
          </ul>
        </div>
      </section>
`;

export const topic05Git: TopicItem = {
  id: 'topic-05-git',
  number: '05',
  slug: 'git-project-docs',
  title: 'Git: حفظ وثائق المشروع وتتبع النسخ محلياً',
  subtitle: 'تأسيس المستودع، حماية الأسرار عبر .gitignore، وتوثيق سجل التغييرات والفروع الآمنة',
  category: 'foundations',
  categoryName: 'المرحلة التأسيسية',
  stageTag: 'إدارة النسخ وتوثيق المشروع',
  summary: 'تهيئة مستودع Git محلي لحفظ وثائق مشروع الطالب (PROJECT_CONTEXT.md، PRD.md، SRS.md)، إعداد .gitignore لحماية الأسرار وملفات البيئة، تسجيل نقاط الحفظ عبر commits واضحة، وإنشاء فروع توثيق آمنة ومراجعة التغييرات والتراجع الآمن.',
  tags: ['Git', 'Version Control', '.gitignore', 'Commit', 'Branch', 'docs', 'Secrets Protection'],
  contentTypes: ['code', 'checklist', 'prompt'],
  diagramCount: 0,
  promptCount: 1,
  codeSnippetCount: 5,
  checklistCount: 5,
  readingTimeMinutes: calculateReadingTime(topic05GitHtml),
  htmlContent: topic05GitHtml,

  // Unified contract fields
  goal: 'تأسيس مستودع Git محلي لمشروع الطالب، وتطبيق حماية الأسرار عبر .gitignore، وحفظ وثائق المتطلبات الأولية بسجل commits منضبط، وإدارة فروع العمل للوثائق ومراجعة الفروقات محلياً.',
  prerequisites: [
    'إكمال وثائق الفكرة والمتطلبات الأولية (docs/PROJECT_CONTEXT.md أو docs/PRD.md).',
    'تثبيت Git على نظام التشغيل والتأكد من عمله عبر الطرفية (Terminal).',
  ],
  steps: [
    '1. تحقق من تثبيت Git واضبط هوية المطور محلياً (user.name و user.email) لتسجيل مساهماتك بوضوح.',
    '2. هيّئ المستودع في مجلد مشروع الطالب عبر أمر git init وتأكد من تنظيم مجلد docs/.',
    '3. أنشئ ملف .gitignore لحماية الأسرار وملفات البيئة والمفاتيح المؤقتة من التتبع قبل إضافة أي ملف.',
    '4. أضف وثائق المشروع الأولية للمنطقة المرحلية (Staging Area) عبر git add وافحص الحالة بـ git status.',
    '5. سجّل أول نقطة حفظ للوثائق عبر git commit برسالة معيارية واضحة تصف ما تم توثيقه.',
    '6. أنشئ فرع عمل جديد لتوثيق المواصفات التفصيلية (git switch -c docs/srs-spec) وراجع الفروقات بـ git diff.',
  ],
  promptRefs: ['prompt-04-github-documentation-setup'],
  outputs: [
    'مستودع Git محلي مهيأ (.git)',
    '.gitignore لحماية الأسرار والملفات المحلية',
    'commit أولي موثق يحفظ docs/ و README.md',
  ],
  checklist: [
    'تم ضبط اسم المطور وبريده الإلكتروني في إعدادات Git بنجاح.',
    'تم تهيئة المستودع المحلي بالأمر git init في المجلد الرئيسي لمشروع الطالب.',
    'تم إنشاء ملف .gitignore واستبعاد ملفات .env والمفاتيح المؤقتة وملفات النظام.',
    'تمت إضافة وثائق المتطلبات وحفظ أول commit برسالة توثيق دلالية واضحة.',
    'تم إنشاء فرع عمل مخصص لتعديل الوثائق والتحقق من عمل git diff و git log.',
  ],
  publicationStatus: 'unified-complete',
  sequencePosition: 5,
};

export const topic06GitHub: TopicItem = {
  id: 'topic-06-github',
  number: '06',
  slug: 'github-docs-collaboration',
  title: 'GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار',
  subtitle: 'مزامنة الوثائق ومراجعة التغييرات عبر Pull Requests وتأمين الأسرار والتعاون الهندسي',
  category: 'foundations',
  categoryName: 'المرحلة التأسيسية',
  stageTag: 'المستودع البعيد والمراجعة',
  summary: 'ربط مستودع وثائق مشروع الطالب بمنصة GitHub، صياغة ملف README تعريفي بمشروع الطالب، رفع التغييرات بأمان عبر SSH أو Personal Access Token، فتح Pull Request لمراجعة الوثائق، وتأمين الأسرار وفحص السجل قبل النشر.',
  tags: ['GitHub', 'Remote Repository', 'README.md', 'Pull Request', 'Code Review', 'Secrets Protection', 'Collaboration'],
  contentTypes: ['code', 'checklist', 'prompt'],
  diagramCount: 0,
  promptCount: 1,
  codeSnippetCount: 5,
  checklistCount: 5,
  readingTimeMinutes: calculateReadingTime(topic06GitHubHtml),
  htmlContent: topic06GitHubHtml,

  // Unified contract fields
  goal: 'ربط المستودع المحلي بمستودع بعيد على GitHub، ونشر الوثائق بملف README احترافي، وتطبيق دورة المراجعة الهندسية عبر Pull Requests، وفحص الأسرار قبل النشر مع استخدام ضوابط المنصة المتاحة كطبقة إضافية.',
  prerequisites: [
    'مستودع Git محلي مهيأ يحتوي على وثائق المشروع و.gitignore (الموضوع 05).',
    'حساب شخصي مفعّل ومجاني على منصة GitHub ووسيلة مصادقة آمنة (SSH Key أو Personal Access Token).',
  ],
  steps: [
    '1. أنشئ مستودعاً جديداً على GitHub باسم مشروعك (اختر Private للعمل الشخصي أو Public) دون إضافة ملفات افتراضية تتعارض مع ملفاتك المحلية.',
    '2. اضبط المصادقة الآمنة مع GitHub عبر مفاتيح SSH أو GitHub Personal Access Token وتجنب استخدام كلمات المرور.',
    '3. اربط المستودع البعيد كمصدر رئيسي (origin) وتأكد من تسمية الفرع main ثم ادفع عبر git push -u origin main.',
    '4. أنشئ ملف README.md احترافي يعرّف بفكرة مشروعك، وأهدافه، وهيكل مجلد docs/، وروابط الوثائق المعتمدة.',
    '5. ارفع فرع وثائق جديد وافتح طلب دمج (Pull Request) لمراجعة وثائق المشروع نقدياً مع الزملاء أو المشرف.',
    '6. راجع كل التغييرات والـcommits الخارجة قبل الدفع أو الدمج، واستخدم Secret Scanning أو Push Protection إذا كانا متاحين كطبقة إضافية لا كضمان.',
  ],
  promptRefs: ['prompt-04-github-documentation-setup'],
  outputs: [
    'مستودع GitHub بعيد مرتبط بالمشروع',
    'README.md تعريفي يحتوي ملخص الفكرة وهيكل docs/',
    'Pull Request مكتمل لمراجعة وثائق المشروع',
  ],
  checklist: [
    'تم إنشاء المستودع على GitHub دون توليد ملفات افتراضية مسببة للتعارض.',
    'تم ربط origin بنجاح ودفع الفرع الرئيسي بأمان دون أخطاء مصادقة.',
    'تم توثيق README.md ليوضح فكرة المشروع وروابط وثائقه في docs/.',
    'تم رفع فرع توثيق وفتح Pull Request وإجراء مراجعة وثائق حقيقية.',
    'رُوجعت كل التغييرات والـcommits الخارجة قبل الدفع أو الدمج، واستُخدمت ضوابط Secret Scanning أو Push Protection إن كانت متاحة كطبقة إضافية لا كضمان.',
  ],
  publicationStatus: 'unified-complete',
  sequencePosition: 6,
};

export const t03Entries: TopicItem[] = [topic05Git, topic06GitHub];
