import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 50: DOCKER — OPTIONAL REPEATABLE CONTAINER RUN PATH
 * Sequence Position: 50
 * ========================================================================= */
export const topic50DockerHtml = `
<section id="topic-50-docker" class="topic-section">
  <div class="step-badge-group"><span class="stage-tag">مسار التشغيل · عند الحاجة</span><span class="step-pill">Docker · صورة قابلة لإعادة التشغيل</span></div>
  <div class="step-header"><div class="step-title-wrap"><h2 class="step-title">Docker: بناء صورة تشغيل لمشروعك عند الحاجة</h2><div class="step-subtitle">افهم الصورة والحاوية، واربط البناء والتشغيل بإطار مشروعك ومنصة النشر المختارة</div></div></div>

  <div class="callout tip my-6">
    <div class="callout-header"><span class="callout-icon">🧭</span><span>قرار أولًا: هل يحتاج مشروعك Docker؟</span></div>
    <p class="leading-7">Docker يغلّف التطبيق واعتماديات التشغيل في صورة، ثم يشغّل منها حاوية. تحتاج هذا المسار إذا كان هدف النشر يطلب صورة OCI أو إذا احتاج الفريق بيئة متقاربة بين التطوير وCI والخادم. إذا كانت منصة الواجهة تبني Next.js مباشرة من Git، أو كانت منصة الخادم تدير Python نيابة عنك، فاتبع مسارها وتجاوز بناء الصور. لا تُعدّ PostgreSQL حاويةً إلزامية؛ يمكن أن تكون قاعدة بيانات مُدارة.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. مفردات البناء والتشغيل</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>Dockerfile:</strong> وصف خطوات بناء الصورة واختيار صورة الأساس ونسخ الملفات وتثبيت الاعتماديات.</li>
      <li><strong>Image (صورة):</strong> ناتج البناء الذي يمكن حفظه في سجل صور ثم تشغيله. البناء لا يشغّل التطبيق.</li>
      <li><strong>Container (حاوية):</strong> عملية تطبيق أُنشئت من صورة مع إعدادات شبكة وبيئة وموارد.</li>
      <li><strong>Build context:</strong> الملفات المتاحة للبناء؛ قلّصها بملف <code>.dockerignore</code> كي لا ترسل أسرارًا أو ملفات محلية.</li>
      <li><strong>Compose:</strong> وصف اختياري لخدمات محلية مترابطة، مثل API وقاعدة بيانات تطويرية؛ لا تضفه لمجرد أن المشروع يحوي أكثر من مجلد.</li>
    </ul>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. مثال خادم Python وفق اختيارك السابق</h3>
    <p class="leading-8 text-[var(--text-muted)]">يفترض المثال أن <code>backend/</code> هو build context وفيه <code>requirements.txt</code>. يطابق الهيكل FastAPI أو Django بعد اختيار إطار واحد فقط من الموضوعين 41–42. يحتاج FastAPI عادةً Uvicorn، ويحتاج Django هنا Gunicorn واسم حزمة WSGI الصحيح؛ خادم التطوير مع <code>--reload</code> ليس خادم إنتاج.</p>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Dockerfile · backend/Dockerfile · مثال تعليمي</span><button class="copy-btn" type="button" aria-label="نسخ مثال Dockerfile">نسخ الكود</button></div>
      <pre class="code-content"><code>FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1
WORKDIR /app
RUN addgroup --system app && adduser --system --ingroup app app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY --chown=app:app . .
USER app
EXPOSE 8000
# FastAPI example. Use your selected production-ready ASGI command.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">لـ Django، استبدل <code>CMD</code> بأمر Gunicorn المطابق لحزمة إعدادات مشروعك، مثل <code>gunicorn config.wsgi:application --bind 0.0.0.0:8000</code>، وأضف Gunicorn للاعتماديات. الاسم <code>config</code> مجرد مثال؛ راجع إعداد static files وreverse proxy وموثوقية المضيف. طابق نسخة Python وملف الاعتماديات/القفل مع مشروعك. وسم <code>python:3.12-slim</code> تعليمي؛ ثبّت نسخة صورة الأساس أو digest للإنتاج وفق سياسة تحديث واضحة.</p>
    <div class="callout warning my-5">
      <div class="callout-header"><span class="callout-icon">🔐</span><span>لا تضع أسرارًا في الصورة</span></div>
      <p class="leading-7">لا تستخدم <code>COPY .env</code> أو <code>ARG SECRET</code> أو <code>ENV SECRET</code> لتضمين سر في طبقة الصورة؛ قد يبقى في تاريخ الطبقات أو metadata. لأسرار البناء مثل اعتماد مستودع حزم، استخدم BuildKit secret mount. لأسرار تشغيل التطبيق، استخدم مدير أسرار منصة النشر.</p>
    </div>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">.dockerignore · backend/.dockerignore</span><button class="copy-btn" type="button" aria-label="نسخ مثال dockerignore">نسخ النص</button></div>
      <pre class="code-content"><code>.git
.env
.env.*
.venv/
__pycache__/
.pytest_cache/
*.py[cod]</code></pre>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">أبقِ <code>.env.example</code> في Git للتوثيق عند الحاجة، لكن لا تنقله لصورة التشغيل. أضف <code>backend/.env.local</code> إلى <code>.gitignore</code> أيضًا. أضف استثناءات سياق مشروعك بعد فحصها، ولا تتجاهل ملفات يحتاجها البناء.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. بناء وتشغيل محلي محدود إلى جهازك</h3>
    <p class="leading-8 text-[var(--text-muted)]">هذه أمثلة للمراجعة؛ شغّلها أنت فقط إذا اخترت Docker وجهّزت إعدادات مشروعك. الموقع لا يثبت Docker ولا يبني صورة ولا يشغّل حاوية. المثال يربط منفذ التطوير بواجهة loopback كي لا يعلن الخدمة على كل واجهات الشبكة.</p>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Shell · أمثلة تعليمية، لا تُنفذ تلقائيًا</span><button class="copy-btn" type="button" aria-label="نسخ أوامر بناء وتشغيل Docker">نسخ الأوامر</button></div>
      <pre class="code-content"><code>docker build -f backend/Dockerfile -t learner-api:dev backend

# Local development only; create this ignored file yourself with local values.
# The database host must be reachable from the container, not localhost by default.
docker run --rm --name learner-api \\
  -p 127.0.0.1:8000:8000 \\
  --env-file backend/.env.local \\
  learner-api:dev

# Only if Next.js is containerized and its Dockerfile lives under frontend/:
docker build -f frontend/Dockerfile -t learner-web:dev frontend
docker run --rm -p 127.0.0.1:3000:3000 learner-web:dev</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">لا تُنشئ ملف الأسرار من المثال ولا تضع فيه سرًا حقيقيًا قبل فهم مكان تخزينه وصلاحيات Docker daemon. قيم البيئة داخل الحاوية متاحة للعملية وصاحب صلاحية Docker وقد تظهر في بيانات فحص الحاوية؛ لا تمرّر سرًا بسطر الأوامر. استخدم ملفًا محليًا مستثنى من Git بقيم تطوير قابلة للتدوير فقط، ولا تنسخ بيانات إنتاج. في الإنتاج، حقن الأسرار من مدير أسرار المنصة هو المسار المعتاد.</p>
    <p class="leading-7 text-[var(--text-muted)]">إذا احتجت API وقاعدة بيانات محلية معًا، يمكن أن يسهل <code>compose.yaml</code> تشغيل الخدمات على شبكة داخلية مع فحص جاهزية القاعدة. Compose وقاعدة بيانات داخل حاوية ليسا مطلوبين لكل مشروع. بيانات الحاوية المؤقتة ليست تخزينًا دائمًا؛ استخدم Volume أو تخزينًا خارجيًا عند وجود حاجة محددة.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. Next.js والبدائل</h3>
    <p class="leading-7 text-[var(--text-muted)]">إذا كان هدف النشر يطلب صورة Next.js، أضف <code>output: 'standalone'</code> إلى إعداد Next الفعلي. الهيكل التالي يفترض npm و<code>package-lock.json</code> ونسخة Node متوافقة؛ غيّرها حسب مشروعك، وانسخ مجلد <code>public/</code> فقط إن كان موجودًا. كثير من منصات الواجهة تبني من Git دون أن تدير Docker بنفسك.</p>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Dockerfile · Next.js standalone · قابل للمواءمة</span><button class="copy-btn" type="button" aria-label="نسخ Dockerfile لـ Next.js">نسخ الكود</button></div>
      <pre class="code-content"><code>FROM node:24-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup --system app && adduser --system --ingroup app app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
# If public/ exists, copy it too:
# COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">لا تستخدم <code>NEXT_PUBLIC_*</code> للأسرار؛ القيم بهذا البادئة مخصصة للمتصفح وقد تدخل حزمة الواجهة. بدائل Docker تشمل نشر المصدر على PaaS أو Runtime مُدار أو serverless إذا كان الإطار والمتطلبات يدعمانه. راجع متطلبات Python والمهام الخلفية والتخزين والشبكة لدى المزود. بناء صورة لا ينشرها على الإنترنت.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. صلاحيات الحاوية</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>شغّل التطبيق داخل الحاوية بمستخدم غير root؛ افحص أن الملفات مقروءة ومجلدات الكتابة محصورة بما يحتاجه التطبيق.</li>
      <li>تجنب <code>--privileged</code> وربط مقبس Docker أو مجلدات المضيف الحساسة دون حاجة موثقة.</li>
      <li>مجموعة <code>docker</code> على Linux تمنح صلاحيات واسعة تقارب root؛ لا تضف حسابًا لها لمجرد إزالة <code>sudo</code>. راجع Docker rootless إذا كان مناسبًا للمضيف.</li>
    </ul>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">طلب مراجعة آمن قبل التطبيق</h3>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Prompt · مراجعة فقط</span><button class="copy-btn" type="button" aria-label="نسخ طلب مراجعة Docker الآمن">نسخ الطلب</button></div>
      <pre class="code-content"><code>راجع package.json وملف القفل وبنية مشروع الخادم المختار فقط.
اقترح Dockerfile و.dockerignore متوافقين مع إصدارات المشروع الحالية، واذكر
افتراضات build context وأمر التشغيل الإنتاجي ومتغيرات البيئة المطلوبة.
لا تعدّل الملفات ولا تثبّت حزمًا ولا تشغّل build أو container.
لا تخترع قيم أسرار. أظهر المسودات والمخاطر والأسئلة المفتوحة للمراجعة البشرية.</code></pre>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">مراجع Docker وNext.js الرسمية</h3>
    <ul class="list-disc list-inside space-y-2 text-sm leading-7 text-[var(--text-muted)] pr-4">
      <li><a href="https://docs.docker.com/reference/dockerfile/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Dockerfile reference</a></li>
      <li><a href="https://docs.docker.com/build/building/best-practices/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Docker build best practices</a></li>
      <li><a href="https://docs.docker.com/build/building/secrets/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Build secrets</a></li>
      <li><a href="https://docs.docker.com/reference/cli/docker/container/run/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">docker run reference</a></li>
      <li><a href="https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Compose environment variables</a></li>
      <li><a href="https://docs.docker.com/engine/security/rootless/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Docker rootless mode</a> · <a href="https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Docker group security</a></li>
      <li><a href="https://nextjs.org/docs/app/api-reference/config/next-config-js/output" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Next.js standalone output</a></li>
    </ul>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 51: LINUX — CONDITIONAL SERVER OPERATIONS
 * Sequence Position: 51
 * ========================================================================= */
export const topic51LinuxHtml = `
<section id="topic-51-linux" class="topic-section">
  <div class="step-badge-group"><span class="stage-tag">مسار التشغيل · عند الحاجة</span><span class="step-pill">Linux · تشغيل وصلاحيات الخادم</span></div>
  <div class="step-header"><div class="step-title-wrap"><h2 class="step-title">Linux: تشغيل آمن عند اختيار خادم Linux</h2><div class="step-subtitle">افهم هوية العملية وملكية الملفات وأقل صلاحية لازمة لتطبيق Django أو FastAPI</div></div></div>

  <div class="callout tip my-6">
    <div class="callout-header"><span class="callout-icon">🧭</span><span>متى تتعلم تشغيل Linux؟</span></div>
    <p class="leading-7">تحتاج هذا الموضوع إذا اخترت مسؤولية تشغيل Backend على آلة Linux أو مضيف حاويات يمنحك صلاحيات النظام، أو إذا احتجت تشخيص ملكية ملف أو حساب خدمة. إذا كانت المنصة تدير Django أو FastAPI أو Next.js نيابة عنك، فتجاوز الإدارة اليدوية واتبع دليل المزود. تشغيل التطبيق في حاوية Linux لا يعني أنك تدير مضيف الحاوية؛ قد يتولى ذلك المزود. لا يفرض الدرس خادمًا أو توزيعة أو إعداد <code>sudo</code>.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. افحص قبل أن تغيّر</h3>
    <p class="leading-8 text-[var(--text-muted)]">كل عملية Linux تعمل بهوية مستخدم ومجموعات، ولكل مسار مالك ومجموعة وبتات صلاحية. في <code>ls -l</code> تحدد خانات <code>rwx</code> ما يمكن للمالك والمجموعة والآخرين فعله؛ وعلى المجلد تعني <code>x</code> إمكان العبور إليه. اقرأ الهوية والمالك قبل أي تعديل. هذه أوامر فحص للقراءة فقط، ولا تحتاج إلى تشغيلها لتصفح الدرس.</p>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Linux shell · قراءة فقط · عدّل المسار قبل الاستخدام</span><button class="copy-btn" type="button" aria-label="نسخ أوامر فحص Linux للقراءة">نسخ الأوامر</button></div>
      <pre class="code-content"><code>id
ls -ld /srv/learner-app
stat -c '%A %U:%G %n' /srv/learner-app/settings.env
namei -l /srv/learner-app/settings.env</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">استبدل المسارات بعد التأكد من وجودها؛ قد لا يتوفر <code>namei</code> في كل توزيعة. إذا ظهر رفض صلاحية، تحقّق من مستخدم الخدمة والمالك والمجموعة وكل مجلد أب قبل توسيع الإذن.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. أقل صلاحية لتطبيقك</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>شغّل Django أو FastAPI بحساب خدمة مخصص غير root، لا بحساب مدير النظام أو حسابك التفاعلي.</li>
      <li>اجعل الكود قابلًا للقراءة لمن يحتاجه، واكتب فقط إلى مجلدات محددة مثل رفع الملفات عند الحاجة.</li>
      <li><code>0640</code> للملف: المالك قراءة وكتابة، المجموعة قراءة، الآخرون لا شيء. <code>0750</code> للمجلد: المالك rwx، المجموعة r-x، والآخرون لا شيء. ليست هذه وصفة عامة لكل ملف.</li>
      <li>تجنّب <code>chmod -R 777</code> أو تغيير ملكية مجلد واسع؛ قد تفتح البيانات لمستخدمين غير مطلوبين وتكسر طريقة التحديث أو التشغيل.</li>
      <li>استخدم <code>sudo</code> فقط مع صلاحية إدارية وفهم للمسار والتأثير وخطة رجوع. لا تغيّر خادمًا مشتركًا أو إنتاجيًا بلا إذن مسؤول النظام.</li>
    </ul>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Linux shell · مثال توضيحي فقط · صلاحية مسؤول مطلوبة</span><button class="copy-btn" type="button" aria-label="نسخ مثال إذن ملف Linux">نسخ المثال</button></div>
      <pre class="code-content"><code># Illustrative only. Confirm the real service account and path first.
sudo chown root:project-api /etc/project-api/app.env
sudo chmod 0640 /etc/project-api/app.env</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">هذا النمط يجعل الملف مملوكًا لـ <code>root</code> وقابلًا للقراءة من مجموعة الخدمة فقط. إذا كانت المجموعة مختلفة فلن يقرأه التطبيق؛ وقد يقطع أمر على مسار خطأ الإعداد. بديلًا، قد يملك حساب الخدمة ملفًا بصلاحية <code>0600</code>. اختر النمط من إعداد الخدمة الفعلي، لا من المثال.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. إعدادات التطبيق والأسرار</h3>
    <p class="leading-8 text-[var(--text-muted)]">مفتاح Django وبيانات PostgreSQL وJWT أسرار تخص البيئة، وليست جزءًا من Git أو Docker image أو سجل الأوامر. في التطوير استخدم ملفًا محليًا مستثنى من Git وملف <code>.env.example</code> لقيم وصفية. في الاستضافة خزّن القيم في مدير أسرار المنصة بصلاحية أقل حساب يحتاجها التطبيق. لا تطبع السر في السجلات ولا ترسله إلى Issue. صلاحية الملف تحد من قراءته على القرص لكنها لا تخفيه عن العملية التي تقرأه أو مدير النظام، ولا تحمي النسخ الاحتياطية والسجلات تلقائيًا.</p>
    <p class="leading-7 text-[var(--text-muted)]">إذا احتاج مشروعك رفع ملفات، افصل التخزين الدائم عن مجلد الكود. لا تجعل التطبيق يكتب إلى كل مسارات النظام. قد توفر المنصة المُدارة تخزينًا خارجيًا؛ تحقق من سياستها بدل الاعتماد على قرص مؤقت.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. التطبيق على مسار مشروعك</h3>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>وثّق منصة النشر ومن يدير نظام التشغيل. إذا كانت مُدارة، سجّل «لا أُدير Linux يدويًا» واتبع تعليمات المتغيرات والسجلات لدى المزود.</li>
      <li>إذا كنت تدير خادم Linux، وثّق مستخدم الخدمة ومجلد التطبيق ومجلدات الكتابة ومن يملك صلاحية الإدارة.</li>
      <li>افحص الحالة للقراءة فقط أولًا. اختر بديل الخادم السابق: FastAPI بأمر ASGI المعتمد أو Django بخادم WSGI الإنتاجي؛ لا تعرض خادم التطوير.</li>
      <li>غيّر الصلاحيات فقط بعد التحقق من الهوية والمسار والإذن، وعلى بيئة اختبار أو بخطة رجوع واضحة. لا تنقل بيانات إنتاج إلى التدريب.</li>
      <li>وثّق السجلات والتحديث والاسترداد ومصدر الأسرار في <code>docs/LINUX_RUNTIME_NOTES.md</code>، أو سجّل سبب التجاوز ومرجع المنصة.</li>
    </ol>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">طلب مراجعة صلاحيات دون تغيير النظام</h3>
    <div class="code-container my-5" dir="ltr">
      <div class="code-header"><span class="code-lang">Prompt · تحليل فقط</span><button class="copy-btn" type="button" aria-label="نسخ طلب مراجعة Linux الآمن">نسخ الطلب</button></div>
      <pre class="code-content"><code>راجع خطة نشر تطبيقي Django أو FastAPI وملفات الإعداد المذكورة فيها.
اكتب جدولًا يوضح المستخدم والمجموعة والملفات التي تحتاج قراءة أو كتابة،
واقترح أقل صلاحيات ممكنة مع ذكر الافتراضات والمخاطر.
لا تشغّل أوامر، ولا تستخدم sudo أو chmod أو chown، ولا تطلب أو تعرض
قيم أسرار. اطلب مراجعة مسؤول الخادم قبل أي تغيير فعلي.</code></pre>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">مراجع Linux</h3>
    <p class="leading-7 text-[var(--text-muted)]">هذه صفحات Linux man-pages لأوامر قياسية؛ تفاصيل المستخدمين والمجموعات قد تختلف بين التوزيعات. راجع كذلك دليل التوزيعة ومزوّد الاستضافة.</p>
    <ul class="list-disc list-inside space-y-2 text-sm leading-7 text-[var(--text-muted)] pr-4">
      <li><a href="https://man7.org/linux/man-pages/man1/ls.1.html" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Linux man-pages: ls(1)</a></li>
      <li><a href="https://man7.org/linux/man-pages/man1/chmod.1.html" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Linux man-pages: chmod(1)</a></li>
      <li><a href="https://man7.org/linux/man-pages/man1/chown.1.html" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Linux man-pages: chown(1)</a></li>
      <li><a href="https://man7.org/linux/man-pages/man2/umask.2.html" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Linux man-pages: umask(2)</a></li>
    </ul>
  </div>
</section>
`;

export const t17Entries: TopicItem[] = [
  {
    id: 'docker-container-workflow',
    number: '50',
    slug: 'docker-container-workflow',
    title: 'Docker: بناء وتشغيل الحاويات لمشروع الطالب عند الحاجة',
    subtitle: 'جهّز صورة تشغيل قابلة لإعادة الإنتاج لـ Next.js أو خادم Python فقط عندما يتطلبها مسار التشغيل',
    category: 'architecture',
    categoryName: 'التشغيل والنشر',
    stageTag: 'مسار التشغيل · اختياري بحسب منصة النشر',
    summary: 'افهم Dockerfile وسياق البناء والصورة والحاوية، ثم طابق build وrun مع Next.js وبديل خادم Django أو FastAPI المختار. يغطي .dockerignore ومستخدم التشغيل غير الجذر وربط المنفذ على loopback والأسرار خارج الصور، ويشرح متى تكفي منصة بناء مُدارة بدل الحاويات.',
    tags: ['Docker', 'Containers', 'Dockerfile', 'Compose', 'BuildKit', 'Secrets', 'Deployment', 'Django', 'FastAPI', 'Next.js'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 0,
    promptCount: 1,
    codeSnippetCount: 5,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic50DockerHtml),
    htmlContent: topic50DockerHtml,
    goal: 'اتخاذ قرار موثق حول الحاجة إلى صورة Docker وإعداد ملفات قابلة للمراجعة للمكوّن المختار، مع مستخدم غير root وأسرار خارج الصورة؛ أو توثيق بديل النشر المُدار وسبب تجاوز الحاوية.',
    prerequisites: [
      'اختيار بديل الخادم Django أو FastAPI وأمر تشغيله الإنتاجي (الموضوعان 41 أو 42)',
      'توثيق API وإعداد قاعدة البيانات وخيارات الاتصال الآمن (المواضيع 39–43)',
      'اختيار هدف النشر وتحديد هل يبني من Git أو يطلب OCI image'
    ],
    steps: [
      '1. حدد هل تحتاج صورة Docker لتشغيل Backend أو Next.js، أم أن المنصة تدير البناء من المستودع.',
      '2. دوّن build context وملف القفل وإصدار Runtime المطابق لبنية المشروع.',
      '3. إذا اخترت صورة للخادم، اكتب Dockerfile لإطارك وأمر الإنتاج الصحيح، مع مستخدم غير root.',
      '4. أنشئ .dockerignore يستثني .env وبيئات التطوير، وأبقِ .env.example لقيم وصفية فقط.',
      '5. وثّق build وrun أو Compose التطويري مع ربط على 127.0.0.1، دون أسرار في الأوامر أو الصورة.',
      '6. استخدم مدير أسرار المنصة للتشغيل وBuildKit secret mount لأسرار البناء عند الحاجة.',
      '7. بعد المراجعة، اختبر الجاهزية في بيئة تملكها، وسجّل المتوقع والفعلي أو Not Run في docs/DOCKER_DECISION.md؛ لا تستخدم أسرار إنتاج.'
    ],
    promptRefs: [],
    outputs: ['docs/DOCKER_DECISION.md', 'backend/Dockerfile أو frontend/Dockerfile (اختياري)', '.dockerignore (اختياري)', 'compose.yaml (اختياري للتطوير متعدد الخدمات)'],
    checklist: [
      'يوضح القرار سبب استخدام Docker أو تجاوزه بحسب منصة النشر.',
      'يطابق المثال بنية Next.js أو بديل Django/FastAPI المختار ونسخة runtime وملف القفل.',
      'يميز بين build وrun وبناء الصورة ونشر الخدمة.',
      'يستثني الأسرار والبيئات المحلية من build context ولا يضع الأسرار في الصورة أو سجلات CI.',
      'يستخدم حساب تشغيل غير root ويربط منفذ التطوير على loopback.',
      'لا يفرض Compose أو PostgreSQL أو خدمة إضافية دون حاجة.',
      'يعامل الأوامر كأمثلة؛ المتعلم يختار متى ينفذها في بيئته.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 50,
  },
  {
    id: 'linux-server-operations',
    number: '51',
    slug: 'linux-server-operations',
    title: 'Linux: تشغيل آمن لخادم المشروع عند اختياره',
    subtitle: 'افحص هوية العملية والملكية وأقل صلاحية لازمة لـ Django أو FastAPI',
    category: 'architecture',
    categoryName: 'التشغيل والنشر',
    stageTag: 'مسار التشغيل · اختياري بحسب الاستضافة',
    summary: 'موضوع مستقل لمسار خادم Linux الذي يديره الطالب أو يحتاج تشخيصه. يشرح الهوية والملكية وبتات rwx وأوامر الفحص ومستخدم خدمة غير root وإعدادات الأسرار؛ ويمكن تجاوز الإدارة اليدوية عند اختيار استضافة مُدارة.',
    tags: ['Linux', 'Permissions', 'chmod', 'chown', 'umask', 'Secrets', 'Service User', 'Hosting'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 0,
    promptCount: 1,
    codeSnippetCount: 3,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic51LinuxHtml),
    htmlContent: topic51LinuxHtml,
    goal: 'إعداد ملاحظات تشغيل تتبع مسؤولية الاستضافة، وتشرح هوية العملية وصلاحيات الملفات والأسرار بأقل وصول لازم؛ أو توثيق أن المنصة تدير Linux واتباع تعليماتها.',
    prerequisites: [
      'اختيار خادم واحد Django أو FastAPI وتوثيق أمر تشغيله الإنتاجي (الموضوعان 41 أو 42)',
      'اختيار منصة النشر وتحديد من يدير نظام التشغيل',
      'تحديد ملفات الإعداد والأسرار والمجلدات التي يحتاج التطبيق قراءتها أو كتابتها'
    ],
    steps: [
      '1. إذا كانت الاستضافة مُدارة، سجّل قرار تجاوز إدارة Linux اليدوية واتبع وثائق المزود.',
      '2. إن كنت تدير Linux، وثّق حساب الخدمة ومجلد التطبيق ومجلدات الكتابة ومالكها.',
      '3. افحص الحالة بأوامر قراءة فقط قبل أي تغيير، مع مراجعة المجلدات الأب للمسار.',
      '4. اختر أضيق صلاحيات لازمة ولا تشغل عملية Backend بصلاحية root.',
      '5. استخدم مدير أسرار المنصة أو ملف إعداد مقيّد الصلاحية عند الحاجة في بيئة self-managed.',
      '6. لا تنفذ chown أو chmod على الإنتاج قبل التحقق والإذن وخطة الرجوع.',
      '7. وثّق docs/LINUX_RUNTIME_NOTES.md أو سبب التجاوز ومرجع المنصة.'
    ],
    promptRefs: [],
    outputs: ['docs/LINUX_RUNTIME_NOTES.md إذا كانت إدارة Linux ضمن المسار', 'توثيق سبب التجاوز ومرجع المنصة إذا كانت مُدارة'],
    checklist: [
      'يميّز بين وجود Linux كمضيف حاوية وبين إدارته يدويًا.',
      'يوضح owner/group/other ومعنى rwx على الملفات والمجلدات.',
      'يفحص الهوية والملكية قبل اقتراح chmod أو chown ويشترط الإذن للتغييرات الإدارية.',
      'يستخدم مستخدم خدمة غير root ومجلدات كتابة محددة.',
      'يتجنب chmod -R 777 ولا يضع الأسرار في Git أو سجل الأوامر أو السجلات.',
      'يشرح حدود صلاحية الملف ولا يقدّمها كبديل لمدير الأسرار.',
      'يتيح تجاوز أوامر Linux عند استخدام منصة مُدارة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 51,
  },
];
