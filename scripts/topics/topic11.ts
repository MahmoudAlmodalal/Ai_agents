export const topic11Html = `
      <!-- ==================== TOPIC 11: COMPREHENSIVE QA MATRIX ==================== -->
      <section id="topic-11" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 11</span>
          <span class="step-pill">مصفوفة الفحص الشامل وضمان الجودة</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">الفحص النهائي وضمان الجودة المعمارية (Comprehensive QA Matrix)</h2>
            <div class="step-subtitle">مصفوفة الفحوصات الخمسة، منع الطفحان الأفقي، سهولة الوصول، والتحقق عبر الطرفية</div>
          </div>
        </div>

        <!-- 1. The QA Philosophy -->
        <h3>فلسفة ضمان الجودة في مشاريع الذكاء الاصطناعي</h3>
        <p>
          الخطأ الأكبر الذي يقع فيه المطور هو الاعتماد على نظرة عابرة في المتصفح والافتراض بأن الكود يعمل لمجرد أنه يظهر بشكل جميل.
          ضمان الجودة الحقيقي (Quality Assurance) يتطلب تشغيل <strong>مصفوفة فحوصات منهجية صارمة</strong> تختبر التطبيق في بيئات متعددة وتحت ضغوط استثنائية:
        </p>

        <!-- 2. The 5 Core Checks Table -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>مجال الفحص</th>
                <th>نقاط الاختبار الدقيقة</th>
                <th>الأداة الهندسية وطريقة التحقق</th>
                <th>معيار النجاح الصارم</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. فحص التجاوب (Responsiveness)</strong></td>
                <td>اختبار 5 نقاط توقف رئيسية: <code>390px</code> (هاتف)، <code>768px</code> (لوحي)، <code>1024px</code> (حاسوب محمول)، <code>1366px</code>، و <code>1440px</code> (شاشات عريضة).</td>
                <td>محرر المتصفح (DevTools Responsive Mode) أو Playwright CLI.</td>
                <td>ظهور كافة العناصر بانسيابية وإعادة ترتيب القوائم دون تشويه أو انقطاع في النصوص.</td>
              </tr>
              <tr>
                <td><strong>2. منع الطفحان (Zero Overflow)</strong></td>
                <td>التأكد من عدم وجود أي شريط تمرير أفقي جانبي (Horizontal Scrollbar) على الإطلاق في الشاشات الصغيرة.</td>
                <td>تشغيل سكربت الفحص <code>document.body.scrollWidth &lt;= window.innerWidth</code>.</td>
                <td>العرض الأفقي مطابق تماماً لنافذة العرض (100% Fit) دون أي تسريب للبكسلات يميناً أو يساراً.</td>
              </tr>
              <tr>
                <td><strong>3. سهولة الوصول (A11y)</strong></td>
                <td>وسوم <code>aria-label</code> لجميع الأزرار والأيقونات، واستخدام العناوين الدلالية (<code>h1 &rarr; h2 &rarr; h3</code>).</td>
                <td>فحص أداة Lighthouse في المتصفح أو قارئ الشاشة (Screen Reader).</td>
                <td>تحقيق نسبة توافق تفوق 95% وفق معايير WCAG 2.1 AA العالمية.</td>
              </tr>
              <tr>
                <td><strong>4. تباين الألوان (Contrast)</strong></td>
                <td>فحص تباين النصوص العادية والفرعية مقابل خلفياتها في الوضعين النهاري والليلي.</td>
                <td>فاحص التباين (Color Contrast Analyzer).</td>
                <td>نسبة تباين لا تقل عن <code>4.5:1</code> للنصوص الأساسية و <code>3:1</code> للعناوين الكبيرة.</td>
              </tr>
              <tr>
                <td><strong>5. سلامة البناء (Build & Types)</strong></td>
                <td>فحص عدم وجود أخطاء في الأنواع أو استيرادات مفقودة أو تحذيرات مهملة في حزمة الكود.</td>
                <td>تشغيل الأوامر في Terminal:<br><code>npx tsc --noEmit</code><br><code>npm run lint</code><br><code>npm run build</code></td>
                <td>خروج كافة الأوامر بكود نجاح صفر (Exit code 0) دون أي تحذير قاطع.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Terminal QA Box -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">حزمة أوامر الفحص والتدقيق البرمجي في الطرفية (Terminal QA Checks)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ الأوامر">نسخ الأوامر</button>
          </div>
          <pre class="code-content"><code># 1. فحص سلامة وتطابق أنواع TypeScript الصارم
npx tsc --noEmit

# 2. فحص المعايير التنسيقية ومنع المتغيرات المهملة عبر ESLint
npm run lint

# 3. بناء نسخة الإنتاج النهائية واختبار تجميع الحزم وتحسين الأداء
npm run build

# 4. فحص طفحان العرض في الطرفية باستخدام Playwright CLI
playwright-cli open --browser=chromium http://localhost:3000
playwright-cli resize 390 844
playwright-cli screenshot --filename=.playwright-cli/qa-mobile-check.png</code></pre>
        </div>

        <!-- PROMPT FOR QA REPORT -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">PROMPT 09 — مراجعة جودة الواجهة وتوليد تقرير docs/FINAL_FRONTEND_QA.md</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
          </div>
          <pre class="code-content"><code>Act as a Senior QA Automation & Frontend Test Engineer.

Review the implemented frontend application against the 14 Golden Checks:
1. All required screens from User Flow are implemented.
2. Responsive layouts tested at: 390px, 768px, 1024px, 1366px, 1440px.
3. Zero horizontal scrollbar across all breakpoints.
4. Touch targets at least 44x44px on mobile devices.
5. Contrast ratio passes WCAG AA (>= 4.5:1).
6. Loading, error, and empty states rendered properly.
7. Keyboard navigation and focus-visible rings working.
8. Accessibility tags (role, aria-label, alt) properly assigned.
9. TypeScript compilation succeeds without errors (npx tsc --noEmit).
10. Linting passes without blocking errors (npm run lint).
11. Build succeeds (npm run build).
12. Design token adherence (no rogue inline styles).
13. Dark mode and light mode contrast verified.
14. Error boundaries prevent app crash on unexpected data.

Report ONLY actual test results.
Create: docs/FINAL_FRONTEND_QA.md
Identify critical issues and fix confirmed problems within scope. Do not invent backend functionality.</code></pre>
        </div>

      </section>
`;
