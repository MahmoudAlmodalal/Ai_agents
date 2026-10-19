import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 52: VERCEL FRONTEND DEPLOYMENT
 * Sequence Position: 52
 * ========================================================================= */
export const topic52VercelHtml = `
<section id="topic-52-vercel" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · النشر والتسليم</span>
    <span class="step-pill">مسار الواجهة المختار للدورة · بديل واحد فقط</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">نشر واجهة Next.js على Vercel</h2>
      <div class="step-subtitle">ربط المستودع، فحص البناء، ضبط إعدادات كل بيئة، ثم مشاركة رابط معاينة أو إنتاج قابل للفحص</div>
    </div>
  </div>

  <div class="callout tip my-6">
    <div class="callout-header"><span class="callout-icon">⚖️</span><span>قرار المسار: اختر مضيف واجهة واحداً</span></div>
    <p class="leading-7">نستخدم <strong>Vercel</strong> كالمسار الافتراضي لهذا الشرح لأن مشروع الدورة مبني على Next.js وتشرح وثائق Vercel ربط Next.js والنشر بمعظم الإعدادات التلقائية. لا تنشر المشروع نفسه على Vercel وNetlify معاً. إذا اخترت Netlify لسبب يناسب مشروعك، اتبع <a href="/learn/netlify-frontend-deployment" class="text-[var(--accent)] underline font-bold">موضوع Netlify 53</a> وتجاوز بقية هذا البديل. بعد اختيار أي مضيف للواجهة، أكمل <a href="/learn/backend-database-deployment" class="text-[var(--accent)] underline font-bold">نشر الخادم والبيانات في الموضوع 54</a>؛ نشر الواجهة وحده لا يشغّل الـ Backend أو قاعدة البيانات.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. جهّز إصداراً يمكن نشره</h3>
    <p class="leading-8 text-[var(--text-muted)]">ابدأ بمستودع Git يحتوي ملفات المشروع وملف القفل الذي يستخدمه مدير الحزم. شغّل فحص المشروع والبناء محلياً، وراجع أن الروابط والصور والخطوط والمسارات العميقة تعمل. إذا كان المستودع يحتوي أكثر من تطبيق، حدّد مجلد جذر الواجهة في إعداد المشروع بدقة. لا تخترع أمر بناء: راجع <code>package.json</code> وإعداد Next.js والقيم التي يكتشفها المضيف، ثم قارنها بإعدادات بيئة النشر.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. اربط Git واستخدم المعاينة قبل الإنتاج</h3>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>افتح حسابك ومشروعاً على Vercel، ثم اربط مستودع المشروع من مزود Git الذي تستخدمه.</li>
      <li>راجع مجلد الجذر، ونسخة Node، ومدير الحزم، وأمر البناء ومجلد الخرج الذي اكتشفه الإعداد. لا تثبّت إعداداً قديماً من درس أو قالب قبل مطابقته مع نسخة Next.js وملف القفل الفعلي.</li>
      <li>اضبط الفرع الإنتاجي وفق مستودعك. استخدم عنوان المعاينة الناتج عن فرع أو Pull Request لمراجعة واجهة الإصدار قبل دمجه.</li>
      <li>بعد نجاح البناء ومراجعة المعاينة، ادمج التغيير المعتمد في فرع الإنتاج، ثم افتح رابط النشر الذي يعرضه المشروع وسجّل عنوانه.</li>
    </ol>
    <p class="leading-7 text-[var(--text-muted)] mt-3">تدعم تكاملات Git نشر معاينات للتغييرات ونشر الإنتاج من الفرع المحدد، لكن ذلك يعتمد على ربط المستودع والإعدادات والصلاحيات. راجع حالة النشر في لوحة المشروع ولا تعتبر دفع commit دليلاً كافياً على أن الإصدار يعمل.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. افصل القيم العامة عن أسرار الخادم</h3>
    <p class="leading-8 text-[var(--text-muted)]">أضف متغيرات البيئة من إعدادات المشروع وحدد إن كانت للمعاينة أو الإنتاج أو التطوير. في Next.js يجعل بادئة <code>NEXT_PUBLIC_</code> القيمة متاحة لكود المتصفح؛ استخدمها فقط لقيم عامة لا بأس بظهورها، مثل عنوان API العام. لا تضع كلمة مرور قاعدة البيانات أو مفتاح جلسة أو رمز مزود خدمة في متغير مكشوف للمتصفح. أسرار الـ Backend يجب أن تبقى في إعدادات خدمة الخادم. بعد تغيير المتغيرات، أنشئ نشرًا جديداً كي يلتقطها الإصدار.</p>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">Next.js · مثال قيمة عامة فقط</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ مثال متغير الواجهة">نسخ الكود</button></div>
      <pre class="code-content"><code>NEXT_PUBLIC_API_BASE_URL=https://api.example.com</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">هذا مثال اسم وعنوان عام للتوضيح؛ استبدل النطاق بعنوان API مشروعك بعد نشره. لا تضع قيمة سرية في هذا المتغير أو في ملف يصل إلى Git.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. افحص رابط النشر وHTTPS والسجلات</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>افتح عنوان المعاينة والإنتاج عبر HTTPS، واختبر الصفحة الرئيسية ورابطاً داخلياً عميقاً وتحديث الصفحة فيه.</li>
      <li>إذا أضفت نطاقاً مخصصاً، أضفه للمشروع واضبط سجلات DNS التي يعرضها إعداد النطاق، ثم تحقّق من نجاح التحقق وحالة شهادة HTTPS من لوحة المشروع.</li>
      <li>عند فشل النشر، ابدأ بسجلات البناء لتحصل على أخطاء التبعيات أو TypeScript أو عملية الإنتاج. إذا كان المشروع يستخدم وظائف خادمية، افحص سجلاتها وقت الطلب من صفحة النشر المناسبة.</li>
      <li>لا تنسخ السجلات العامة وفيها رموز جلسات أو بيانات مستخدمين. راجع سبب الخطأ ثم أعد النشر وكرر الفحص.</li>
    </ul>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>نشر الواجهة لا يساوي منتجاً كاملاً</span></div>
    <p class="leading-7">الرابط المنشور يثبت أن إصدار الواجهة أتيح على ذلك المضيف فقط. إذا كان مشروعك يحتاج API أو تسجيل دخول أو بيانات دائمة، فما زال عليك نشر Backend وقاعدة بيانات وربط عناوينها وCORS والمصادقة كما في الموضوع 54. لا تختبر نموذجاً يتصل ببيانات محلية أو وهمية على أنه تدفق إنتاج حقيقي.</p>
  </div>

  <div class="references-block my-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">مراجع رسمية</h3>
    <ul class="list-disc list-inside space-y-2 leading-7 text-[var(--text-muted)] pr-4">
      <li><a href="https://vercel.com/docs/frameworks/full-stack/nextjs" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Next.js على Vercel</a></li>
      <li><a href="https://vercel.com/docs/git" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">النشر من مستودعات Git والمعاينات</a></li>
      <li><a href="https://vercel.com/docs/environment-variables/managing-environment-variables" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">إدارة متغيرات البيئة وإعادة النشر</a></li>
      <li><a href="https://vercel.com/docs/environment-variables/framework-environment-variables" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">بادئات متغيرات الأطر مثل NEXT_PUBLIC_</a></li>
      <li><a href="https://vercel.com/docs/domains/set-up-custom-domain" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">إعداد نطاق مخصص والتحقق منه</a> · <a href="https://vercel.com/docs/deployments/logs" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">سجلات البناء</a> · <a href="https://vercel.com/docs/logs/runtime" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">سجلات وقت التشغيل</a></li>
    </ul>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 53: NETLIFY FRONTEND DEPLOYMENT (ALTERNATIVE)
 * Sequence Position: 53
 * ========================================================================= */
export const topic53NetlifyHtml = `
<section id="topic-53-netlify" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · النشر والتسليم</span>
    <span class="step-pill">بديل مضيف الواجهة · لا تنشر المسار مرتين</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">نشر واجهة Next.js على Netlify</h2>
      <div class="step-subtitle">اختيار بديل الواجهة، ربط Git، ومراجعة البناء والمعاينات ومتغيرات البيئة وروابط HTTPS</div>
    </div>
  </div>

  <div class="callout tip my-6">
    <div class="callout-header"><span class="callout-icon">⚖️</span><span>قرار المسار: Netlify بديل لـ Vercel</span></div>
    <p class="leading-7">هذا موضوع بديل مستقل. اختر Netlify إذا كان مناسباً لفريقك أو لطريقة عملك، ثم استخدمه للواجهة بدلاً من Vercel. إذا اخترت مسار الدورة الافتراضي Vercel، <a href="/learn/vercel-frontend-deployment" class="text-[var(--accent)] underline font-bold">تجاوز هذا الموضوع إلى Vercel 52</a> ثم أكمل مباشرة إلى <a href="/learn/backend-database-deployment" class="text-[var(--accent)] underline font-bold">الموضوع 54 لنشر Backend وقاعدة البيانات</a>. لا تنشئ نسختين إنتاجيتين من المشروع لمجرد تجربة البديلين.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. افحص دعم نسخة Next.js قبل الربط</h3>
    <p class="leading-8 text-[var(--text-muted)]">وثائق Netlify الحالية تشرح دعماً لتطبيقات Next.js عبر محوّل OpenNext وتذكر أن الإعداد يكون تلقائياً للإصدارات المدعومة. ابدأ من دليل Netlify الحالي لـ Next.js، ثم افحص قسم الدعم والقيود مع نسخة Next.js والميزات التي يستخدمها مشروعك. لا تضف plugin قديم أو إعداد تصدير ثابت من درس سابق بشكل أعمى. وثائق Netlify توجّه المشاريع الأقدم من Next.js 13.5 إلى وثائق legacy runtime؛ إن كان مشروعك قديماً، اتبع تعليمات الترقية المحدثة أو حدّث المشروع بعد مراجعة التوافق.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. اربط المستودع وراجع إعداد البناء</h3>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>اربط المستودع من GitHub أو مزود Git المدعوم، وحدد مجلد الواجهة إن كان المشروع في مستودع متعدد التطبيقات.</li>
      <li>راجع إعدادات البناء التي يكتشفها Netlify؛ تأكد من مدير الحزم وملف القفل ومجلد النشر وقيم نسخة Node وفق متطلبات مشروعك الحالية.</li>
      <li>انشر معاينة لفرع أو Pull Request وافتحها على جهاز هاتف وحاسوب. افحص التنقل وتحديث المسارات العميقة واستخدام الميزات الخادمية والتحميلات.</li>
      <li>بعد نجاح البناء ومراجعة المعاينة، ادمج التغيير في الفرع الإنتاجي وتحقق من الرابط الذي يظهر في لوحة المشروع.</li>
    </ol>
    <p class="leading-7 text-[var(--text-muted)] mt-3">توفر Netlify Deploy Previews عنواناً مستقلاً لمراجعة تغييرات Pull Request قبل نشرها على موقع الإنتاج. يختلف عنوان المعاينة عن عنوان الإنتاج، ويمكن تخصيص قيم بيئة منفصلة لها.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. اضبط المتغيرات من إعدادات البيئة</h3>
    <p class="leading-8 text-[var(--text-muted)]">أضف المتغيرات التي يحتاجها بناء الواجهة في لوحة المشروع أو إعداد Netlify المناسب، واختر سياق البناء مثل Production أو Deploy Preview. إن غيّرت قيمة، أنشئ build جديداً ليتضمن الإعداد الجديد. متغيرات Next.js التي تبدأ بـ <code>NEXT_PUBLIC_</code> قد تُضمّن في كود المتصفح؛ لا تضع فيها كلمة مرور أو رمزاً خاصاً. خزّن أسرار API في إعدادات Backend، واتبع وثائق Netlify الحالية لمعرفة أي المتغيرات تُستخدم وقت البناء وأيها عند تشغيل وظائف الخادم.</p>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">Next.js · عنوان API عام لا يتضمن سراً</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ مثال متغير Netlify">نسخ الكود</button></div>
      <pre class="code-content"><code>NEXT_PUBLIC_API_BASE_URL=https://api.example.com</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">استخدم قيمة عنوان API الفعلي بعد تجهيز Backend. لا تضع <code>DATABASE_URL</code> أو مفاتيح التوقيع في إعدادات واجهة عامة.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. افحص النطاق وHTTPS والسجلات</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>ابدأ بالرابط الذي يعرضه Netlify، ثم اختبر الصفحة الرئيسية ومساراً داخلياً بعد تحديث المتصفح.</li>
      <li>للنطاق المخصص، اتبع خطوات ربط DNS وتحقق من حالة النطاق والشهادة؛ توضح الوثائق أن الروابط المولدة على Netlify مؤمنة وأن شهادات النطاقات المضافة تُدار تلقائياً بعد نجاح الإعداد.</li>
      <li>افحص Deploy log لأخطاء تثبيت الحزم والبناء. إذا استخدمت Next.js server functions أو Edge Functions، راجع سجلات الوظيفة بعد إعادة إنتاج الخطأ.</li>
      <li>سجلات الوظائف لها مدة احتفاظ تختلف حسب الخطة؛ لا تفترض أن كل سجل سيبقى دائماً، ولا تسجل الأسرار أو بيانات شخصية غير لازمة.</li>
    </ul>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>واجهة حية لا تعني Full-Stack جاهزاً</span></div>
    <p class="leading-7">نجاح نشر Netlify لا ينشر خادم مشروعك أو PostgreSQL. إذا كانت الواجهة تحتاج بيانات حقيقية أو دخولاً أو صلاحيات، انتقل بعد هذا البديل إلى <a href="/learn/backend-database-deployment" class="text-[var(--accent)] underline font-bold">الموضوع 54</a>، وانشر الـ Backend وقاعدة البيانات ثم اختبر تدفق الطلب كاملاً. لا تصف واجهة ما زالت تستخدم بيانات تجريبية بأنها منتج مكتمل.</p>
  </div>

  <div class="references-block my-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">مراجع رسمية</h3>
    <ul class="list-disc list-inside space-y-2 leading-7 text-[var(--text-muted)] pr-4">
      <li><a href="https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">دليل Next.js الحالي ومحوّل OpenNext والدعم</a></li>
      <li><a href="https://docs.netlify.com/start/quickstarts/deploy-from-repository/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">البدء من مستودع Git وإعدادات البناء</a></li>
      <li><a href="https://docs.netlify.com/build/configure-builds/environment-variables/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">متغيرات البناء وإعدادها</a></li>
      <li><a href="https://docs.netlify.com/deploy/deploy-types/deploy-previews/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Deploy Previews والسياقات الخاصة بها</a></li>
      <li><a href="https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">HTTPS والشهادات</a> · <a href="https://docs.netlify.com/manage/monitoring/logs/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">سجلات البناء والوظائف</a></li>
    </ul>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 54: BACKEND & DATABASE DEPLOYMENT
 * Sequence Position: 54
 * ========================================================================= */
export const topic54BackendDeploymentHtml = `
<section id="topic-54-backend-deployment" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · النشر والتسليم</span>
    <span class="step-pill">Render مثال موثق · طبّق المفهوم على إطارك المختار</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">نشر Backend وربطه بقاعدة البيانات</h2>
      <div class="step-subtitle">إعداد خدمة خادم، قاعدة PostgreSQL، أسرار البيئة، نطاق API وفحوص الجاهزية من واجهة إلى بيانات دائمة</div>
    </div>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">🧭</span><span>افصل بين نشر الواجهة ونشر المنتج الكامل</span></div>
    <p class="leading-7">الموضوع 52 أو 53 ينشر واجهة المستخدم فقط، ولا ينشئ وحده API أو قاعدة بيانات. في هذا الموضوع تنشر خدمة الخادم وقاعدة البيانات وتربطهما، ثم تضبط عنوان API العام في مضيف الواجهة وتسمح له عبر سياسة CORS المناسبة. لا تجعل المتصفح يتصل مباشرةً بقاعدة البيانات ولا تكشف سلسلة الاتصال أو بيانات الدخول فيه.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. حدّد مسار التطبيق وقابلية النشر</h3>
    <p class="leading-8 text-[var(--text-muted)]">استخدم إطار الخادم الذي اخترته في الموضوع 41 أو 42، وابدأ من مستودع المشروع وملف اعتماديات مقفل. يصلح Render Web Service كمسار تعليمي موثق لـ FastAPI وDjango؛ هذه الأمثلة ليست حكماً على مزودك النهائي ولا ضماناً للسعر أو التوافر. راجع تعليمات المزود الحالية، ونسخة Python وإصدارات الحزم وأوامر مشروعك الفعلية قبل نشرها. يستخدم المثال التالي بنية Render الرسمية لتطبيق FastAPI بسيط؛ غيّر مسار الاستيراد إذا كان تطبيقك في <code>backend/app/main.py</code> أو مسار آخر، واستخدم دليل Django الرسمي إذا اخترت Django.</p>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">Render · FastAPI · عدّل مسار التطبيق ليتطابق مع مشروعك</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ أوامر نشر FastAPI">نسخ الكود</button></div>
      <pre class="code-content"><code>Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">بحسب دليل Render لـ FastAPI، هذا المثال يفترض أن الملف <code>main.py</code> يعرّف المتغير <code>app</code>. يجب أن يستمع خادم Render إلى <code>0.0.0.0</code> والمنفذ الذي توفره <code>$PORT</code>. لا تنسخ أمر المثال إذا كان مدخل تطبيقك مختلفاً.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. أنشئ PostgreSQL واربطها بخدمة الخادم فقط</h3>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>اختر PostgreSQL مُدارة، وحدد المنطقة ومتطلبات مشروعك واحتفاظ النسخ الاحتياطية وسياسة الاسترجاع قبل الإنشاء.</li>
      <li>إذا كانت خدمة الخادم وقاعدة Render في الحساب والمنطقة نفسيهما، استخدم عنوان الاتصال الداخلي لتبقى الاتصالات على الشبكة الخاصة وتقلل زمنها. استخدم الرابط الخارجي فقط عند اتصال عميل خارج Render وبحسب متطلبات TLS في الوثائق الحالية.</li>
      <li>أضف عنوان قاعدة البيانات إلى Backend كمتغير سري باسم <code>DATABASE_URL</code>. مرر الاتصال عبر مكتبة الخادم أو ORM، واستخدم تجميع الاتصالات وإعادة المحاولة الملائمة لمشروعك من دون تسجيل السلسلة في السجلات.</li>
      <li>لا تضع <code>DATABASE_URL</code> في إعدادات Next.js ذات بادئة <code>NEXT_PUBLIC_</code> أو أي شيفرة متصفح. المتصفح يتصل بنقاط API عبر HTTPS؛ الـ Backend وحده يتصل بقاعدة البيانات.</li>
    </ol>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">شكل إعداد بيئة توضيحي · لا تضعه في Git ولا تستخدمه كقيمة حقيقية</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ أسماء متغيرات بيئة الخادم">نسخ الكود</button></div>
      <pre class="code-content"><code>DATABASE_URL=&lt;server-only-database-connection-string&gt;
SECRET_KEY=&lt;server-only-secret&gt;
CORS_ALLOWED_ORIGINS=https://&lt;frontend-production-domain&gt;</code></pre>
    </div>
    <p class="leading-7 text-[var(--text-muted)]">أنشئ القيم الحقيقية من لوحة المزود وأداة الأسرار المناسبة، ولا تستخدم النصوص الموضوعة بين الأقواس كقيم تشغيل. لا تضع ملفاً حقيقياً مثل <code>.env</code> في Git؛ راجع أن نماذج البيئة أو السجلات لا تعرض أسراراً.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. اضبط الشبكة وCORS والنطاقات</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>أضف نطاق الواجهة الإنتاجي المحدد تماماً إلى قائمة CORS في Backend. لا تسمح بكل النطاقات في الإنتاج لمجرد تجاوز خطأ المتصفح، وراجع سياسة cookies وcredentials إن استخدمت جلسات.</li>
      <li>استخدم عنوان API المنشور عبر HTTPS لتطبيق الواجهة في إعداد مضيفها، وتأكد من بناء الواجهة بعد تغييره. لا تستخدم رابط Preview على الإنتاج أو عنوان localhost.</li>
      <li>اضبط نطاقاً مخصصاً لـ API عند الحاجة، وأكمل سجلات DNS والتحقق من شهادة HTTPS وفق لوحة مزود الخادم. اختبر أن HTTP ينتقل إلى HTTPS وأن الواجهة ترسل الطلب إلى اسم المضيف المقصود.</li>
      <li>إذا فشل الطلب من المتصفح، افحص عنوان الطلب، وCORS، وTLS، وحالة API، وسياسة المصادقة؛ لا تضع مفتاحاً سرياً في كود المتصفح كحل بديل.</li>
    </ul>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. التهجيرات، التحقق والرجوع الآمن</h3>
    <p class="leading-8 text-[var(--text-muted)]">قبل تغيير مخطط PostgreSQL، راجع ملفات migrations في Git وجرّبها على بيانات اختبار. خذ نسخة قابلة للاستعادة وفق ميزات وخطة المزود، وحدد كيف ستوقف أو ترجع إصدار التطبيق إذا فشلت التهجيرة. شغّل التهجيرات في خطوة إصدار مضبوطة مرة واحدة وفق آلية المزود وإطارك؛ لا تجعل كل عامل تطبيق يعيد تشغيلها عند الإقلاع. لا تفترض أن التراجع عن كود الخدمة يعكس تغييرات قاعدة البيانات تلقائياً.</p>
    <p class="leading-8 text-[var(--text-muted)]">أنشئ نقطة صحة صغيرة مناسبة لخادمك واضبط مسار الفحص الذي يطلبه المضيف. في Render يطلب إعداد HTTP health check مساراً تحدده أنت، ويعد الاستجابة الناجحة 2xx أو 3xx ضمن خمس ثوانٍ سليمة. لا تستخدم مساراً افتراضياً مثل <code>/health</code> ما لم تنشئه فعلاً وتتحقق مما يفحصه؛ اجعل فحص الاعتمادية يشمل اتصال قاعدة البيانات فقط إذا كان هذا يعكس الجاهزية التي تحتاجها الخدمة.</p>
    <p class="leading-8 text-[var(--text-muted)]">بعد النشر، راجع سجل البناء لتشخيص التبعيات أو فشل الأمر، وسجل التشغيل لخطأ التطبيق أو اتصال PostgreSQL. ابحث عن أخطاء الحالة والاتصالات، مع حجب كلمات المرور والرموز والبيانات الشخصية. اتبع وصفة إصلاح واضحة، ثم أعد الاختبار. لا تُعد رفع سجل يحتوي أسراراً إلى تذكرة عامة.</p>
  </div>

  <div class="callout info my-6">
    <div class="callout-header"><span class="callout-icon">🔎</span><span>خطة smoke test بعد نشر المنتج</span></div>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>افتح رابط الواجهة ورابط API عبر HTTPS، وتأكد من الشهادة والتحويل من HTTP إن توفر نطاق مخصص.</li>
      <li>افحص نقطة الصحة من خارج بيئة الخادم وتحقق أنها ترد بالحالة المتوقعة، وأنها لا تعرض أسراراً أو تفاصيل داخلية.</li>
      <li>من واجهة الإنتاج، نفذ تدفقاً آمناً بحساب وبيانات اختبار: إنشاء سجل ثم قراءته وتعديله وفق صلاحية صحيحة، وتحقق من وصوله في PostgreSQL من خلال أدوات Backend المصرح بها.</li>
      <li>جرّب طلباً دون مصادقة أو بصلاحية غير مناسبة، وتأكد من الرفض بالحالة المحددة في عقد API؛ تحقق أن Origin غير المصرح به لا يتجاوز CORS.</li>
      <li>راجع سجلات البناء والتشغيل، وتأكد أنها لا تكشف سلسلة DATABASE_URL أو SECRET_KEY أو رمز دخول أو بيانات شخصية غير لازمة.</li>
      <li>دوّن لكل بند Passed أو Failed أو Not Run، واحفظ طريقة الرجوع إلى إصدار الخدمة وخطة استعادة قاعدة البيانات قبل إعلان اكتمال المنتج.</li>
    </ol>
  </div>

  <div class="references-block my-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">مراجع رسمية</h3>
    <ul class="list-disc list-inside space-y-2 leading-7 text-[var(--text-muted)] pr-4">
      <li><a href="https://render.com/docs/deploy-fastapi" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">دليل Render الرسمي لنشر FastAPI</a> · <a href="https://render.com/docs/deploy-django" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">دليل Render الرسمي لـ Django</a></li>
      <li><a href="https://render.com/docs/web-services" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">إعداد Web Service والمنفذ وHTTPS</a></li>
      <li><a href="https://render.com/docs/postgresql-creating-connecting" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">إنشاء PostgreSQL وعناوين الاتصال الداخلية والخارجية</a></li>
      <li><a href="https://render.com/docs/configure-environment-variables" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Environment Variables والأسرار وإعادة النشر</a></li>
      <li><a href="https://render.com/docs/health-checks" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">Health checks</a> · <a href="https://render.com/docs/logging" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">سجلات التشغيل</a> · <a href="https://render.com/docs/tls" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline">TLS</a></li>
    </ul>
  </div>
</section>
`;

export const t18Entries: TopicItem[] = [
  {
    id: 'vercel-frontend-deployment',
    number: '52',
    slug: 'vercel-frontend-deployment',
    title: 'نشر واجهة Next.js على Vercel',
    subtitle: 'ربط المستودع، فحص البناء، إعداد البيئة، واختبار رابط الواجهة',
    category: 'frontend',
    categoryName: 'تطوير الواجهة والنشر',
    stageTag: 'المرحلة التطبيقية · النشر والتسليم',
    summary: 'مسار الدورة الافتراضي لنشر واجهة Next.js على Vercel: ربط Git، معاينة تغييرات الفرع، ضبط متغيرات كل بيئة، مراجعة البناء والنطاق وHTTPS والسجلات. يختار الطالب مضيف واجهة واحداً ثم يكمل نشر Backend وقاعدة البيانات في الموضوع 54.',
    tags: ['Vercel', 'Next.js', 'Frontend', 'Git', 'Environment Variables', 'HTTPS', 'Deployment'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 1,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic52VercelHtml),
    htmlContent: topic52VercelHtml,
    goal: 'نشر واجهة Next.js واحدة على Vercel بعد فحص البناء والمعاينة وإعداد متغيرات البيئة والنطاق والسجلات، مع إدراك أن Backend وقاعدة البيانات يحتاجان نشرهما وربطهما على حدة.',
    prerequisites: [
      'واجهة Next.js عاملة على مشروع الطالب مع ملف قفل واعتماديات مثبتة (الموضوع 33 و37)',
      'مستودع Git يتضمن الإصدار الذي يريد الطالب مراجعته (الموضوع 05 و06)',
      'خطة API وعنوان Backend متوقعان من بنية مشروع الطالب (الموضوع 40 و45)'
    ],
    steps: [
      'شغّل فحوص المشروع والبناء محلياً، وراجع مدير الحزم وملف القفل ومجلد الواجهة ونسخة Next.js.',
      'اربط مستودع Git بمشروع Vercel وراجع إعدادات البناء المكتشفة والفرع الإنتاجي.',
      'استخدم رابط معاينة فرع أو Pull Request لمراجعة الصفحات والمسارات العميقة قبل الدمج.',
      'أضف المتغيرات من إعدادات البيئة؛ اجعل NEXT_PUBLIC_ للقيم العامة فقط، واترك أسرار الخادم في Backend.',
      'بعد تغيير الإعدادات، أعد النشر وافحص الرابط والشهادة وسجلات البناء والتشغيل ذات الصلة.',
      'وثّق رابط الواجهة المختار، ثم انتقل إلى الموضوع 54 لنشر الخادم والبيانات.'
    ],
    promptRefs: [],
    outputs: [
      'رابط معاينة للواجهة يمكن مراجعته قبل الإنتاج',
      'رابط إنتاج واجهة Next.js بعد مراجعة النشر',
      'سجل إعدادات عامة يوضح متغيرات كل بيئة من دون قيم سرية'
    ],
    checklist: [
      'اختبار البناء محلياً ومطابقة إصدار Node ومدير الحزم وملف القفل مع إعداد المضيف.',
      'مراجعة رابط معاينة ومسار داخلي مباشر وتحديث الصفحة قبل اعتماد الإصدار.',
      'حفظ المفاتيح الخاصة خارج Git وعدم كشفها ببادئة NEXT_PUBLIC_.',
      'إعادة النشر بعد تغيير متغير بيئة والتحقق أن الإصدار الجديد يستخدم القيمة المقصودة.',
      'التحقق من نطاق الإنتاج وحالة HTTPS وفحص سجل البناء عند الخطأ.',
      'تسجيل أن الواجهة المنشورة لا تعني أن Backend وقاعدة البيانات قد نُشرا.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 52,
  },
  {
    id: 'netlify-frontend-deployment',
    number: '53',
    slug: 'netlify-frontend-deployment',
    title: 'نشر واجهة Next.js على Netlify',
    subtitle: 'بديل Vercel لنشر واجهة واحدة ومراجعة إعداد البناء والمعاينة والسجلات',
    category: 'frontend',
    categoryName: 'تطوير الواجهة والنشر',
    stageTag: 'المرحلة التطبيقية · النشر والتسليم',
    summary: 'بديل مستقل لاستضافة واجهة Next.js على Netlify باستخدام وثائق OpenNext الحالية: ربط مستودع Git ومراجعة البناء وDeploy Previews ومتغيرات البيئة والنطاق وHTTPS والسجلات. إذا اختير Vercel، يتجاوز الطالب هذا البديل ولا يعيد نشر الواجهة.',
    tags: ['Netlify', 'Next.js', 'OpenNext', 'Frontend', 'Deploy Preview', 'Environment Variables', 'HTTPS'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 1,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic53NetlifyHtml),
    htmlContent: topic53NetlifyHtml,
    goal: 'استخدام Netlify كبديل واحد لمضيف الواجهة بعد فحص دعم نسخة Next.js ومراجعة البناء والمعاينة ومتغيرات البيئة والنطاق والسجلات، من دون إعادة نشر واجهة المشروع على Vercel.',
    prerequisites: [
      'واجهة Next.js ومجلد مشروع معلوم وملف قفل مطابق لمدير الحزم (الموضوع 33 و37)',
      'مستودع Git وفرع يمكن إنشاء معاينة منه (الموضوع 05 و06)',
      'اختيار واعٍ لـ Netlify بدلاً من مسار Vercel في الموضوع 52'
    ],
    steps: [
      'افحص دليل Netlify الحالي لـ Next.js وOpenNext وقيود نسخة المشروع قبل ربط المستودع.',
      'اربط Git وحدد مجلد الجذر ومدير الحزم وإعدادات البناء التي تتفق مع ملفات المشروع الحالية.',
      'أنشئ Deploy Preview للتغيير وافحص المسارات والميزات الخادمية قبل دمج Pull Request.',
      'أضف قيم البيئة في السياق المناسب، ولا تعرض أسرار Backend في متغيرات Next.js العامة.',
      'أعد البناء بعد التغيير، ثم اختبر رابط الإنتاج وHTTPS وسجلات البناء والوظائف عند استخدامها.',
      'سجّل رابط الواجهة المختار وانتقل إلى الموضوع 54 لنشر Backend وقاعدة البيانات.'
    ],
    promptRefs: [],
    outputs: [
      'رابط Deploy Preview يمكن مراجعته قبل الإنتاج',
      'رابط إنتاج الواجهة بعد نشر التغيير المعتمد',
      'قائمة قيم بيئة عامة خاصة بكل سياق مع إبقاء الأسرار في Backend'
    ],
    checklist: [
      'مطابقة نسخة Next.js وميزات المشروع مع دليل دعم Netlify الحالي قبل اعتماد الإعداد.',
      'مطابقة جذر المشروع ومدير الحزم وملف القفل مع إعداد البناء.',
      'اختبار رابط Deploy Preview والمسار الداخلي بعد تحديث الصفحة.',
      'اختيار سياق Production أو Deploy Preview المناسب لكل متغير بيئة.',
      'التحقق من HTTPS ومراجعة سجلات البناء أو الوظائف عند الحاجة.',
      'تجاوز هذا البديل إذا اختار المشروع Vercel وإكمال موضوع Backend وقاعدة البيانات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 53,
  },
  {
    id: 'backend-database-deployment',
    number: '54',
    slug: 'backend-database-deployment',
    title: 'نشر Backend وربطه بقاعدة البيانات',
    subtitle: 'تجهيز خدمة API وPostgreSQL والأسرار وCORS وفحوص الاستعداد لمنتج Full-Stack',
    category: 'architecture',
    categoryName: 'معمارية ونشر الخادم',
    stageTag: 'المرحلة التطبيقية · النشر والتسليم',
    summary: 'ينشر الطالب إطار Backend الذي اختاره مع PostgreSQL مُدارة، ويخزن DATABASE_URL والأسرار على الخادم، ويربط نطاق API بالواجهة عبر HTTPS وCORS. يقدم Render أمثلة موثقة لـ FastAPI وDjango، مع التحقق من المنفذ والـ health check والتهجيرات والسجلات وخطة smoke test كاملة.',
    tags: ['Backend', 'PostgreSQL', 'Render', 'FastAPI', 'Django', 'DATABASE_URL', 'CORS', 'HTTPS', 'Smoke Test'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic54BackendDeploymentHtml),
    htmlContent: topic54BackendDeploymentHtml,
    goal: 'نشر خدمة Backend وقاعدة PostgreSQL وربطهما بأمان مع واجهة المشروع المنشورة، ثم فحص مسار طلب حقيقي من المتصفح إلى API ثم قاعدة البيانات من دون كشف أسرار أو الادعاء باكتمال ما لم يختبر.',
    prerequisites: [
      'اختيار إطار Backend واحد من Django أو FastAPI وتجهيز مدخل تشغيله (الموضوع 41 أو 42)',
      'تصميم مخطط PostgreSQL والتهجيرات التي اختبرها المشروع (الموضوع 39 و41 أو 42)',
      'عقود API والمصادقة والصلاحيات وعنوان الواجهة المستضاف (الموضوع 40 و43 و45)',
      'اختيار مضيف واجهة واحد فقط من Vercel أو Netlify (الموضوع 52 أو 53)'
    ],
    steps: [
      'راجع أمر البناء والتشغيل مع ملف الاعتماديات ونسخة Python ومدخل تطبيق Django أو FastAPI الفعلي.',
      'انشر خدمة Web Service، واجعلها تستمع إلى 0.0.0.0 والمنفذ الذي يوفره المضيف.',
      'جهّز PostgreSQL في المنطقة نفسها إن كان المضيف يدعم الاتصال الداخلي، وأضف DATABASE_URL إلى إعداد Backend السري.',
      'اضبط SECRET_KEY وبقية المفاتيح من لوحة الأسرار، واضبط CORS ليقبل أصل الواجهة الإنتاجي المحدد.',
      'راجع التهجيرات والنسخة الاحتياطية وخطة الاستعادة، وشغّل التغيير وفق خطوة إصدار مضبوطة مرة واحدة.',
      'اضبط نقطة صحة موجودة فعلاً، واختبر TLS والسجلات وطلبات الواجهة إلى API ثم PostgreSQL.',
      'نفّذ قائمة smoke tests وسجل لكل نتيجة Passed أو Failed أو Not Run قبل إعلان اكتمال المنتج.'
    ],
    promptRefs: [],
    outputs: [
      'رابط API عبر HTTPS ورابط نقطة صحة مفحوصة',
      'اتصال Backend بقاعدة PostgreSQL عبر DATABASE_URL محفوظة على الخادم',
      'إعداد CORS ومصادقة يطابقان نطاق الواجهة وعقود API',
      'سجل smoke test وخطة إصدار ونسخة احتياطية واستعادة'
    ],
    checklist: [
      'تطابق أمر تشغيل الخادم مع إطار المشروع وملف الاعتماديات ومسار التطبيق الحقيقي.',
      'بقاء DATABASE_URL وSECRET_KEY خارج Git والمتصفح وسجلات التشغيل العامة.',
      'استخدام اتصال PostgreSQL المناسب للمنطقة وTLS وفق إرشادات مزود قاعدة البيانات.',
      'تحديد Origin الواجهة بدقة واختبار CORS والمصادقة المسموحة والمرفوضة.',
      'مراجعة التهجيرات والنسخ الاحتياطية وخطة الرجوع قبل تعديل مخطط الإنتاج.',
      'إتمام smoke tests بين الواجهة وAPI وقاعدة البيانات وتسجيل الحالة الصادقة لكل فحص.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 54,
  },
];
