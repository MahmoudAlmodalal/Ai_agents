export const topic10Html = `
      <!-- ==================== TOPIC 10: FRONTEND IMPLEMENTATION ==================== -->
      <section id="topic-10" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 10</span>
          <span class="step-pill">التخطيط الهندسي وتنفيذ الفرونت إند</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">التخطيط المعماري للواجهة الأمامية وتنفيذها بـ Spec Kit و UI/UX Pro Max</h2>
            <div class="step-subtitle">تفكيك المهام الذرية، دستور المشروع البرمجي، والتنفيذ التكراري الصارم دون هلوسة</div>
          </div>
        </div>

        <!-- 1. Small Verifiable Tasks -->
        <h3>خطة التنفيذ المعمارية وتفكيك المهام البرمجية الصغيرة (Small Verifiable Tasks)</h3>
        <p>
          السبب الأول لفشل مشاريع الذكاء الاصطناعي في مرحلة الفرونت إند هو تكليف الوكيل ببناء المشروع ككتلة واحدة ضخمة (Monolithic Task): <em>«ابنِ لي صفحات التطبيق كاملة مع الاتصال بالخادم!»</em>. النتيجة هي كود متقطع، ملفات مفقودة، وتوقف الوكيل في منتصف الطريق بسبب نفاد نافذة الذاكرة.
        </p>

        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">🧩</span>
            <span>استراتيجية التفكيك الذري (Atomic Task Breakdown)</span>
          </div>
          <p>
            الحل المعماري الاحترافي هو إعداد <strong>خطة تنفيذ مكتوبة مسبقاً</strong> تقسم العمل إلى مهام صغيرة جداً ومستقلة، لا تستغرق المهمة الواحدة أكثر من خطوة برمجية واحدة قابلة للاختبار الفوري عبر سطر الأوامر (مثل تشغيل <code>npm run build</code> أو <code>npx tsc --noEmit</code>).
            تسير الخطة بالتسلسل التالي:
          </p>
          <ol style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li>تأسيس هيكل المشروع، والمكتبات، ونظام الألوان والخطوط في <code>tailwind.config.ts</code>.</li>
            <li>بناء المكونات القاعدية المعزولة (UI Primitives: Button, Input, Badge, Card, Modal).</li>
            <li>بناء شريط التنقل العلوي والقائمة الجانبية مع إدارة الحالة (State Management).</li>
            <li>بناء شاشات تصفح المعدات ودمج بطاقات المعدات بحالاتها المتعددة.</li>
            <li>بناء نافذة طلب الاستعارة ونظام التحقق من القواعد والأخطاء.</li>
          </ol>
        </div>

        <!-- 2. Spec Kit Constitution & Rules -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">R1</span>
            <div class="step-title-wrap">
              <h3 class="step-title">دستور المشروع الهندسي وقواعد الكود (speckit-constitution & Project Rules)</h3>
              <div class="step-subtitle">تثبيت القواعد الصارمة التي تمنع وكيل الذكاء الاصطناعي من كسر معايير الجودة</div>
            </div>
          </div>

          <p>
            قبل السماح للوكيل بكتابة أي كود برمجي، يتم حقن ملف قواعد المشروع <code>docs/rules/frontend.md</code> ليكون بمثابة <strong>"الدستور البرمجي"</strong> الملزم. يتضمن هذا الدستور:
          </p>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>البند الدستوري</th>
                  <th>القاعدة الهندسية الصارمة</th>
                  <th>الأثر البرمجي</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>صرامة TypeScript</strong></td>
                  <td>يُحظر تماماً استخدام <code>any</code> أو <code>unknown</code> بدون فحص دلالي للنوع.</td>
                  <td>منع الأخطاء غير المتوقعة (Runtime Crashes) أثناء التشغيل.</td>
                </tr>
                <tr>
                  <td><strong>استدعاء الرموز</strong></td>
                  <td>يُحظر كتابة ألوان سداسية كودية اعتباطية؛ الاستدعاء حصراً من <code>DESIGN.md</code>.</td>
                  <td>اتساق الهوية البصرية بنسبة 100% ودعم الوضعين الليلي والنهاري.</td>
                </tr>
                <tr>
                  <td><strong>فصل المسؤوليات</strong></td>
                  <td>المكونات البصرية منفصلة عن منطق جلب البيانات وخطافات React (Custom Hooks).</td>
                  <td>كود نظيف، سهل الصيانة، وقابل لإعادة الاستخدام والاختبار.</td>
                </tr>
                <tr>
                  <td><strong>إمكانية الوصول (A11y)</strong></td>
                  <td>إلزامية إضافة وسوم <code>aria-label</code> و <code>role</code> والتباين الكافي للنصوص.</td>
                  <td>توافق تام مع معايير الويب العالمية وتجربة مستخدم رفيعة.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PROMPT FOR CONSTITUTION -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 07 — توليد دستور المشروع وقواعد الفرونت إند في docs/rules/frontend.md</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as a Senior Principal Frontend Architect.
Read "docs/PRD.md" and "docs/DESIGN.md".

Generate a comprehensive software engineering constitution in "docs/rules/frontend.md" containing:
1. Strict TypeScript Standards: No 'any', strict null checks, explicit component prop interfaces.
2. Design Token Integrity: Ban on arbitrary inline CSS and custom HEX codes; use Tailwind theme tokens only.
3. Component Hierarchy: Structure for Atomic UI Primitives, Composite Components, and Page Layouts.
4. Error & Empty State Mandate: Every view MUST handle Loading, Empty, and Error states explicitly.
5. Accessibility & Responsive Rules: Mobile-first responsive breakpoints (390px, 768px, 1024px, 1440px), Zero horizontal scrollbars.
6. Verification Command: The agent MUST verify code with "npx tsc --noEmit && npm run build" after every single component edit.</code></pre>
          </div>
        </div>

        <!-- 3. UI/UX Pro Max Review Protocol -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">R2</span>
            <div class="step-title-wrap">
              <h3 class="step-title">بروتوكول مراجعة الجودة البصرية بـ UI/UX Pro Max</h3>
              <div class="step-subtitle">التدقيق البصري الصارم لكل شاشة ومكون ومقارنتها بالتصميم الأصلي قبل الاعتماد</div>
            </div>
          </div>

          <p>
            أداة <strong>UI/UX Pro Max</strong> هي مستشار الجودة البصرية الذي يفحص الكود المنجز بعين ناقدة لا تجامل. بعد بناء كل مكون، يتم تشغيل بروتوكول المراجعة للتأكد من:
          </p>

          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li><strong>الدقة البصرية (Pixel Precision):</strong> مطابقة الهوامش والمسافات ودرجات التباين لملف <code>DESIGN.md</code>.</li>
            <li><strong>تكامل الحالات التفاعلية:</strong> هل يتغير لون الزر عند الوقوف بالفأرة (Hover)، والضغط (Active)، والتعطيل (Disabled)؟</li>
            <li><strong>رسائل التنبيه والخطأ:</strong> هل تظهر رسائل التحذير بألوان واضحة ونصوص دلالية لا تجعل المستخدم تائهاً؟</li>
            <li><strong>سلاسة التجاوب (Mobile Polish):</strong> هل الأزرار والعناصر مريحة للمس بالإصبع على الهواتف الذكية (&ge; 44px)؟</li>
          </ul>

          <!-- PROMPT FOR UI/UX PRO MAX -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 08 — بروتوكول مراجعة الشاشات بـ UI/UX Pro Max (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as the Lead UI/UX Pro Max Reviewer.
Compare the implemented frontend component in "src/components/EquipmentCard.tsx" against "docs/DESIGN.md" and "docs/STITCH_SCREEN_REFERENCES.md".

Audit the following criteria:
1. Visual Fidelity: Exact font weight, line-height, and padding alignment.
2. Color Token Compliance: Verify no rogue hex colors were injected.
3. Interactive States: Inspect hover, focus-visible, and active transition animations.
4. Mobile Touch Targets: Ensure all clickable triggers meet minimum 44x44px standards.
5. Contrast Ratio: Verify foreground/background text contrast meets WCAG AA (minimum 4.5:1).

Output:
- PASS / FAIL score for each item.
- Specific Tailwind CSS code fixes for any defect identified.</code></pre>
          </div>
        </div>

        <!-- 4. Next.js App Router Complete Guide -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">N1</span>
            <div class="step-title-wrap">
              <h3 class="step-title">Next.js App Router: الملفات، المكونات، والـRoutes</h3>
              <div class="step-subtitle">افهم أين يذهب كل ملف قبل أن تطلب من الذكاء الاصطناعي كتابة الكود</div>
            </div>
          </div>

          <p>
            في هذا المسار نستخدم Next.js مع App Router لبناء واجهة منظمة وقابلة للنمو. القاعدة الأساسية هي أن مجلد <code>app/</code> يصف عناوين الصفحات، وكل مجلد داخله يمثل جزءًا من الرابط، بينما ملفات خاصة مثل <code>page.tsx</code> و<code>layout.tsx</code> و<code>loading.tsx</code> و<code>error.tsx</code> تحدد سلوك ذلك الجزء من التطبيق.
          </p>

          <div class="callout tip">
            <div class="callout-header"><span class="callout-icon">N</span><span>الفكرة المختصرة</span></div>
            <p><strong>Route</strong> هو عنوان يمكن فتحه، <strong>Page</strong> هو واجهة ذلك العنوان، <strong>Layout</strong> هو الغلاف المشترك، <strong>Component</strong> هو جزء قابل لإعادة الاستخدام، و<strong>Server/Client Component</strong> يحدد أين ينفذ الكود وما الصلاحيات المتاحة له.</p>
          </div>

          <h4>1. الهيكل المقترح لمشروع Next.js</h4>
          <div class="code-container">
            <div class="code-header"><span class="code-lang">Next.js App Router — Project Tree</span><button class="copy-btn" onclick="copyCode(this)" title="نسخ الهيكل">نسخ الهيكل</button></div>
            <pre class="code-content"><code>my-app/
├── app/
│   ├── layout.tsx              # الغلاف الجذري: html وbody والمزودات
│   ├── page.tsx                # الصفحة الرئيسية /
│   ├── loading.tsx             # واجهة التحميل
│   ├── error.tsx               # واجهة الخطأ، وتحتاج use client
│   ├── not-found.tsx            # صفحة 404
│   ├── globals.css             # الأنماط العامة وDesign Tokens
│   ├── about/page.tsx          # /about
│   ├── dashboard/
│   │   ├── layout.tsx          # غلاف خاص بالـdashboard
│   │   ├── page.tsx            # /dashboard
│   │   └── settings/page.tsx   # /dashboard/settings
│   ├── learn/[slug]/page.tsx   # Route ديناميكي مثل /learn/github
│   └── api/health/route.ts     # Route Handler: /api/health
├── components/
│   ├── ui/                     # Button وInput وCard وModal
│   ├── layout/                 # Navbar وSidebar وFooter
│   └── features/               # مكونات مرتبطة بميزة محددة
├── lib/                        # data وvalidations وutils
├── public/                     # صور وملفات ثابتة من /
├── types/                      # TypeScript interfaces وtypes
├── next.config.ts              # إعدادات Next.js
├── tsconfig.json               # إعدادات TypeScript
├── package.json                # scripts والاعتماديات
└── .env.local                  # أسرار محلية، لا تُرفع إلى GitHub</code></pre>
          </div>

          <h4>2. كيف يتحول المجلد إلى Route؟</h4>
          <div class="table-container">
            <table class="data-table">
              <thead><tr><th>الملف</th><th>الرابط</th><th>الوظيفة</th></tr></thead>
              <tbody>
                <tr><td><code>app/page.tsx</code></td><td><code>/</code></td><td>الصفحة الرئيسية</td></tr>
                <tr><td><code>app/about/page.tsx</code></td><td><code>/about</code></td><td>Route ثابت</td></tr>
                <tr><td><code>app/learn/[slug]/page.tsx</code></td><td><code>/learn/github</code></td><td>Route ديناميكي، وslug يصل كـparam</td></tr>
                <tr><td><code>app/(marketing)/pricing/page.tsx</code></td><td><code>/pricing</code></td><td>Route Group لا يظهر في الرابط</td></tr>
                <tr><td><code>app/api/health/route.ts</code></td><td><code>/api/health</code></td><td>استجابة HTTP وليست صفحة UI</td></tr>
              </tbody>
            </table>
          </div>

          <h4>3. الملفات الخاصة داخل كل Route</h4>
          <ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.9;">
            <li><code>page.tsx</code>: الملف الذي يجعل المجلد قابلًا للفتح كصفحة.</li>
            <li><code>layout.tsx</code>: عناصر مشتركة تبقى أثناء الانتقال، مثل Navbar أو Sidebar.</li>
            <li><code>loading.tsx</code>: واجهة فورية أثناء انتظار الصفحة أو البيانات، ويفضل أن تحتوي Skeleton.</li>
            <li><code>error.tsx</code>: Error Boundary للجزء الحالي، ويجب أن تكون Client Component.</li>
            <li><code>not-found.tsx</code>: واجهة واضحة عندما لا يوجد السجل أو الـslug المطلوب.</li>
            <li><code>template.tsx</code>: غلاف يعاد تركيبه عند الانتقال عندما نحتاج دورة حياة جديدة.</li>
            <li><code>route.ts</code>: Route Handler للطلبات، ولا يخلط مع <code>page.tsx</code> في نفس المسار.</li>
          </ul>

          <h4>4. Server Components وClient Components</h4>
          <p>
            مكونات Next.js تكون Server Components افتراضيًا. هذا مناسب لقراءة البيانات وتقليل JavaScript المرسل للمتصفح وإبقاء الأسرار خارج الواجهة. نضيف عبارة <code>use client</code> في أول الملف فقط عندما يحتاج المكون إلى <code>useState</code> أو <code>useEffect</code> أو أحداث مثل <code>onClick</code> أو APIs المتصفح مثل Clipboard وLocal Storage.
          </p>
          <div class="grid-2col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;"><h4 style="color: var(--brand-primary);">Server Component</h4><p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">اقرأ البيانات ونفّذ منطق الخادم واعرض HTML قريبًا من المصدر. لا تستخدم أحداث المتصفح مباشرة.</p></div>
            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;"><h4 style="color: #10b981;">Client Component</h4><p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">أضف التفاعل والحالة المحلية وأحداث النقر. اجعله صغيرًا ومرر له بيانات typed من Server Component.</p></div>
          </div>

          <div class="code-container">
            <div class="code-header"><span class="code-lang">Server page + interactive Client component</span><button class="copy-btn" onclick="copyCode(this)" title="نسخ الكود">نسخ الكود</button></div>
            <pre class="code-content"><code>// app/learn/[slug]/page.tsx — Server Component
import { notFound } from 'next/navigation';
import { TopicActions } from '@/components/features/TopicActions';

export default async function LearnPage({ params }: { params: Promise&lt;{ slug: string }&gt; }) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) notFound();
  return &lt;main&gt;&lt;h1&gt;{topic.title}&lt;/h1&gt;&lt;TopicActions topicId={topic.id} /&gt;&lt;/main&gt;;
}

// components/features/TopicActions.tsx — Client Component
'use client';
import { useState } from 'react';
export function TopicActions({ topicId }: { topicId: string }) {
  const [saved, setSaved] = useState(false);
  return &lt;button onClick={() =&gt; setSaved(!saved)} aria-pressed={saved}&gt;{saved ? 'تم الحفظ' : 'حفظ الموضوع'}&lt;/button&gt;;
}</code></pre>
          </div>

          <h4>5. جلب البيانات والـRoutes الديناميكية</h4>
          <ol style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.9;">
            <li>عرّف أنواع البيانات في <code>types/</code> بدل استخدام <code>any</code>.</li>
            <li>ضع قراءة البيانات في <code>lib/</code> ولا تكررها داخل كل مكون.</li>
            <li>استخدم <code>loading.tsx</code> للانتظار و<code>error.tsx</code> للفشل.</li>
            <li>استخدم <code>generateStaticParams</code> عندما تكون قيم الـslug معروفة ويمكن توليد صفحات ثابتة.</li>
            <li>استخدم <code>generateMetadata</code> لعناوين وأوصاف ديناميكية، واضبط Cache وRevalidation بوعي.</li>
          </ol>

          <h4>6. الصور والـMetadata والأنماط</h4>
          <p>
            ضع الصور الثابتة في <code>public/</code> واستخدم <code>next/image</code> للصور التي تحتاج تحسينًا وأبعادًا واضحة. استخدم <code>metadata</code> أو <code>generateMetadata</code> للعناوين والوصف وOpen Graph. اجعل الخطوط وRTL وDesign Tokens جزءًا من النظام واختبرها على الهاتف.
          </p>

          <h4>7. قواعد تنفيذ Next.js</h4>
          <ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.9;">
            <li>لا تضع كل الكود في <code>page.tsx</code>؛ استخرج المكونات ذات المسؤولية الواضحة.</li>
            <li>لا تجعل <code>layout.tsx</code> صندوقًا ضخمًا لكل منطق التطبيق.</li>
            <li>لا تضف <code>use client</code> إلى أعلى الشجرة إلا عند الحاجة.</li>
            <li>لا تستخدم API key في Client Component أو <code>public/</code> أو GitHub.</li>
            <li>كل Route يملك حالات Loading وEmpty وError وSuccess المناسبة.</li>
            <li>كل تعديل يمر على TypeScript وBuild وفحص Responsive وAccessibility.</li>
          </ul>

          <div class="code-container">
            <div class="code-header"><span class="code-lang">دورة التحقق لكل Route</span><button class="copy-btn" onclick="copyCode(this)" title="نسخ الأوامر">نسخ الأوامر</button></div>
            <pre class="code-content"><code>npx tsc --noEmit
npm run build
git status
git add app/ components/ lib/ types/
git commit -m "feat: implement verified frontend route"
git push origin feature/frontend-route</code></pre>
          </div>

          <div class="callout warning">
            <div class="callout-header"><span class="callout-icon">!</span><span>كيف تطلب من AI تنفيذ Next.js؟</span></div>
            <p>لا تطلب «ابنِ تطبيقًا كاملًا» دفعة واحدة. أعطِ الوكيل <code>PRD.md</code> و<code>DESIGN.md</code> وحدد Route ومكونًا وحالة واحدة، ثم اطلب الملفات ومعايير القبول وأمر التحقق. راجع الفرق وشغّل Build قبل الانتقال إلى Task التالية.</p>
          </div>
        </div>

      </section>
`;
