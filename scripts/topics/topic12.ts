export const topic12Html = `
      <!-- ==================== TOPIC 12: FAQ, GOLDEN RULES & GLOSSARY ==================== -->
      <section id="topic-12" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 12</span>
          <span class="step-pill">المعارف والأسئلة والقاموس الهندسي</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">أسئلة التأكد من الفهم، القواعد الذهبية، وقاموس المصطلحات التفاعلي</h2>
            <div class="step-subtitle">خلاصة المنهجية الهندسية، الإجابات المرجعية للأسئلة الشائعة، ومسرد المصطلحات القابل للبحث</div>
          </div>
        </div>

        <!-- 1. The 5 Core Comprehension Questions -->
        <h3>أسئلة التأكد من الفهم المعماري (Architectural FAQ)</h3>
        <p>
          اختبر فهمك للمسار الهندسي من خلال الإجابة عن الأسئلة الخمسة الجوهرية التي تحسم استيعابك للمنهجية:
        </p>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
          <details class="example-accordion" open>
            <summary class="example-summary">
              <span>❓ س1: لماذا لا نبدأ فوراً بكتابة الكود والبرمجة؟</span>
              <span class="example-tag">سؤال تأسيسي</span>
            </summary>
            <div class="example-body">
              <p>
                <strong>الإجابة الهندسية:</strong> لأن القواعد الناقصة والقرارات غير المحسومة تتحول تلقائياً في عقل الذكاء الاصطناعي إلى <strong>افتراضات عشوائية (Hallucinations)</strong>، ثم تتحول هذه الافتراضات إلى كود برمجي خاطئ. إصلاح خطأ في كود مكتوب يكلف أضعاف ما يكلفه حسم القرار مسبقاً في وثيقة المتطلبات أو المخطط.
              </p>
            </div>
          </details>

          <details class="example-accordion" open>
            <summary class="example-summary">
              <span>❓ س2: ما الفرق الجوهري بين PRD و User Flow؟</span>
              <span class="example-tag">تحليل المتطلبات</span>
            </summary>
            <div class="example-body">
              <p>
                <strong>الإجابة الهندسية:</strong> وثيقة <strong>PRD</strong> تحدد <em>"ما يجب أن يفعله المنتج وشروط قبوله وقواعد العمل"</em> كمتطلبات وقوانين. بينما مخطط <strong>User Flow</strong> يوضح <em>"كيف تمر تجربة المستخدم خطوة بخطوة، وبأي ترتيب يتفاعل مع النظام، ومتى وأين يصادف نقاط القرار ومسارات الخطأ أثناء التصفح"</em>.
              </p>
            </div>
          </details>

          <details class="example-accordion" open>
            <summary class="example-summary">
              <span>❓ س3: لماذا نحتاج جدول استعارات (loan_requests) منفصلاً عن جدول المستخدمين والمعدات؟</span>
              <span class="example-tag">هندسة قواعد البيانات</span>
            </summary>
            <div class="example-body">
              <p>
                <strong>الإجابة الهندسية:</strong> لأن الاستعارة تمثل <strong>حدثاً مستقلاً في الزمن (Independent Event)</strong> له بياناته الخاصة: تاريخ الطلب، مهلة الـ 48 ساعة، تاريخ الإرجاع، حالة الاعتماد، وحالة المعدة عند الاستلام. عزلها في جدول وسيط يحل علاقة <code>Many-to-Many</code>، ويمنع تكرار بيانات الطالب والجهاز في كل عملية، ويسمح بالاحتفاظ بسجل تاريخي دقيق حتى لو تغيرت أسماء الأجهزة أو تم تحديثها لاحقاً.
              </p>
            </div>
          </details>

          <details class="example-accordion" open>
            <summary class="example-summary">
              <span>❓ س4: ما فائدة مراجعة PRD نقدياً قبل تصميم قاعدة البيانات (ERD)؟</span>
              <span class="example-tag">منع التناقض المعماري</span>
            </summary>
            <div class="example-body">
              <p>
                <strong>الإجابة الهندسية:</strong> حتى لا نصمم جداول وحقولاً وعلاقات وقيوداً برمجية بناءً على <strong>قواعد متناقضة أو غير محسومة</strong>؛ فلو اكتشفنا لاحقاً أثناء البرمجة أن الحجز مشروط بموافقة إدارية وليس فورياً، فسنضطر لتعديل هيكل الجداول بالكامل (Database Schema Migrations)، وهو أمر بالغ الصعوبة والخطورة بعد بدء البرمجة.
              </p>
            </div>
          </details>

          <details class="example-accordion" open>
            <summary class="example-summary">
              <span>❓ س5: هل ينبغي وضع كل أدوات المعمارية (Redis, Nginx, Workers, Multi-Tenancy) في الـ MVP؟</span>
              <span class="example-tag">إدارة النطاق المعماري</span>
            </summary>
            <div class="example-body">
              <p>
                <strong>الإجابة الهندسية:</strong> <strong>قطعاً لا!</strong> نحن نختار الأدوات المعمارية بناءً على متطلبات واقعية مثبتة، وحجم الاستخدام الفعلي، واحتياجات الصيانة والأداء. إضافة أدوات معقدة لمجرد الاستعراض يزيد من تكلفة السيرفرات وصعوبة النشر واكتشاف الأخطاء. نبدأ بأبسط بنية تحتية نظيفة تلبي الـ MVP، ونتوسع مع نمو النظام.
              </p>
            </div>
          </details>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 2. The Golden Rules -->
        <h3>القواعد الهندسية الذهبية لبناء المشاريع بالذكاء الاصطناعي</h3>
        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">👑</span>
            <span>الخلاصة الذهبية الشاملة في جملة واحدة</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 700; line-height: 1.9;">
            استخدم الذكاء الاصطناعي لتوضيح المتطلبات، وتوثيقها، واختبار اتساقها، وتصميم بنيتها الهندسية؛ لا ليملأ القرارات المهمة من عنده.
            <br>
            المقابلة الاستجوابية تخرّج <code>PRD</code>، والـ <code>PRD</code> يقود <code>User Flow</code>، والاثنان يقودان <code>ERD</code>، والوثائق الثلاث تقود مخططات النظام المعمارية؛ وبعد مراجعة كل ذلك يصبح التنفيذ البرمجي دقيقاً ومستقراً وخالياً من المفاجآت.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 3. Master Prompts Reference Table -->
        <h3>جدول البرومبتات الهندسية المرجعي السريع</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>رقم البرومبت</th>
                <th>المرحلة والغرض</th>
                <th>الأداة المستهدفة</th>
                <th>الملف والمخرج الناتج</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PROMPT 01</strong></td>
                <td>بدء مقابلة Grill Me الاستجوابية</td>
                <td>Antigravity / Cursor CLI</td>
                <td>استخراج القرارات وحسم نطاق الـ MVP</td>
              </tr>
              <tr>
                <td><strong>PROMPT 02</strong></td>
                <td>توليد وثيقة متطلبات المنتج (27 قسماً)</td>
                <td>Antigravity CLI</td>
                <td><code>docs/PRD.md</code></td>
              </tr>
              <tr>
                <td><strong>PROMPT 03</strong></td>
                <td>المراجعة النقدية لوثيقة PRD</td>
                <td>Antigravity CLI</td>
                <td>جدول حسم التناقضات والأسئلة المفتوحة</td>
              </tr>
              <tr>
                <td><strong>PROMPT 04</strong></td>
                <td>توليد مخطط مسار المستخدم (User Flow)</td>
                <td>Mermaid (flowchart TD)</td>
                <td><code>docs/user-flow.md</code></td>
              </tr>
              <tr>
                <td><strong>PROMPT 05</strong></td>
                <td>التأسيس البصري والتوجه العام</td>
                <td>Google Stitch</td>
                <td>شاشات المشروع ونظام الألوان الأولي</td>
              </tr>
              <tr>
                <td><strong>PROMPT 06</strong></td>
                <td>استخراج الرموز البصرية عبر Stitch MCP</td>
                <td>Stitch MCP Server</td>
                <td><code>docs/DESIGN.md</code></td>
              </tr>
              <tr>
                <td><strong>PROMPT 07</strong></td>
                <td>دستور المشروع وقواعد الفرونت إند</td>
                <td>Antigravity CLI</td>
                <td><code>docs/rules/frontend.md</code></td>
              </tr>
              <tr>
                <td><strong>PROMPT 08</strong></td>
                <td>مراجعة الشاشات بـ UI/UX Pro Max</td>
                <td>UI/UX Pro Max Agent</td>
                <td>تقرير مطابقة التصميم الدقيق والـ A11y</td>
              </tr>
              <tr>
                <td><strong>PROMPT 09</strong></td>
                <td>الفحص النهائي وضمان الجودة الشامل</td>
                <td>Terminal & Test Agent</td>
                <td><code>docs/FINAL_FRONTEND_QA.md</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 4. Interactive Glossary with Live Filter -->
        <h3>قاموس المصطلحات البرمجية والمعمارية التفاعلي</h3>
        <p>
          ابحث في مسرد المصطلحات الهندسية المستخدمة في الدليل:
        </p>

        <div style="margin-bottom: 1rem;">
          <input type="text" id="glossary-search" class="toc-search" placeholder="🔍 اكتب اسم المصطلح للبحث الفوري (مثلاً: Normalization, Index, Eager Loading, Token)..." style="width: 100%; max-width: 600px; padding: 0.6rem 1rem;">
        </div>

        <div class="table-container">
          <table class="data-table" id="glossary-table">
            <thead>
              <tr>
                <th style="width: 25%;">المصطلح الإنجليزي</th>
                <th style="width: 25%;">المقابل بالعربية</th>
                <th style="width: 50%;">التعريف والشرح المعماري في المشروع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>PRD</code></td>
                <td>وثيقة متطلبات المنتج</td>
                <td>المرجع الأساسي المكتوب الذي يحدد أهداف النظام ومستخدميه ونطاق الـ MVP وقواعد العمل ومعايير القبول.</td>
              </tr>
              <tr>
                <td><code>Grill Me</code></td>
                <td>أسلوب المقابلة الاستجوابية</td>
                <td>طريقة متدرجة يسأل فيها الذكاء الاصطناعي سؤالاً واحداً في كل مرة لاستخراج تفاصيل المشروع قبل كتابة الكود.</td>
              </tr>
              <tr>
                <td><code>User Flow</code></td>
                <td>مخطط مسار المستخدم</td>
                <td>رسم بياني يوضح خطوات انتقال المستخدم بين الشاشات، ونقاط القرار، ومسارات النجاح والفشل.</td>
              </tr>
              <tr>
                <td><code>Domain Model</code></td>
                <td>النموذج المفاهيمي للأعمال</td>
                <td>مخطط يصف مفاهيم العمل الأساسية والعلاقات بينها بلغة صاحب المشروع بعيداً عن تفاصيل البرمجة وقواعد البيانات.</td>
              </tr>
              <tr>
                <td><code>Use Case Diagram</code></td>
                <td>مخطط حالات الاستخدام</td>
                <td>مخطط UML يحدد الفاعلين (Actors) ووظائفهم وحدود النظام والعلاقات الإلزامية والشرطية بينها.</td>
              </tr>
              <tr>
                <td><code>Activity Diagram</code></td>
                <td>مخطط سير العمليات</td>
                <td>مخطط يوضح تدفق خطوات العملية التجارية وتوزيع الأنشطة بين الأطراف عبر مسارات السباحة (Swimlanes).</td>
              </tr>
              <tr>
                <td><code>Sequence Diagram</code></td>
                <td>مخطط تسلسل التفاعلات</td>
                <td>مخطط يوضح الترتيب الزمني الدقيق لتبادل الرسائل والطلبات والردود بين مكونات النظام (UI, API, DB).</td>
              </tr>
              <tr>
                <td><code>State Machine</code></td>
                <td>آلة الحالة ومخطط الحالات</td>
                <td>رصد الحالات التي يمر بها كيان محدد (مثل طلب الاستعارة) والشروط الحارسة والأحداث التي تنقله بينها.</td>
              </tr>
              <tr>
                <td><code>ERD</code></td>
                <td>مخطط الكيانات والعلاقات</td>
                <td>تصميم جداول قاعدة البيانات ومفاتيحها الأساسية والأجنبية والقيود المفروضة عليها.</td>
              </tr>
              <tr>
                <td><code>Primary Key (PK)</code></td>
                <td>المفتاح الأساسي</td>
                <td>معرّف فريد لا يتكرر ولا يقبل القيمة الفارغة، يحدد كل صف في جدول قاعدة البيانات.</td>
              </tr>
              <tr>
                <td><code>Foreign Key (FK)</code></td>
                <td>المفتاح الخارجي / الأجنبي</td>
                <td>عمود يشير إلى المفتاح الأساسي في جدول آخر لربط البيانات وبناء العلاقات بين الجداول.</td>
              </tr>
              <tr>
                <td><code>Normalization 3NF</code></td>
                <td>التطبيع للمستوى الثالث</td>
                <td>منهجية تنظيم جداول قاعدة البيانات لمنع تكرار البيانات وتحديثها بشكل متناقض في أكثر من موضع.</td>
              </tr>
              <tr>
                <td><code>N+1 Query Problem</code></td>
                <td>مشكلة الاستعلامات المتكررة</td>
                <td>خلل أداء ناتج عن جلب مجموعة سجلات ثم عمل حلقة استعلامات إضافية لكل سجل، ويُحل بـ JOIN أو Eager Loading.</td>
              </tr>
              <tr>
                <td><code>Database Index</code></td>
                <td>فهرس قاعدة البيانات</td>
                <td>هيكل بيانات يسرّع عمليات البحث والاستعلام بنمط البحث الثنائي، ولكنه يرفع تكلفة التخزين وعمليات التعديل.</td>
              </tr>
              <tr>
                <td><code>Eager Loading</code></td>
                <td>التحميل المسبق للعلاقات</td>
                <td>استراتيجية في الـ ORM لجلب السجلات والبيانات المرتبطة بها في استعلام مدمج واحد لمنع مشكلة N+1.</td>
              </tr>
              <tr>
                <td><code>Design Tokens</code></td>
                <td>الرموز التصميمية</td>
                <td>المتغيرات الصغرى التي تحمل قيم التصميم الأساسية (الألوان، الخطوط، المسافات، الظلال) في ملف DESIGN.md.</td>
              </tr>
              <tr>
                <td><code>MCP</code></td>
                <td>بروتوكول سياق النموذج</td>
                <td>بروتوكول مفتوح يربط بين أدوات التصميم الخارجية (Google Stitch) وبيئات التطوير الذكية لجلب البيانات برمجياً.</td>
              </tr>
              <tr>
                <td><code>Spec Kit</code></td>
                <td>طقم المواصفات الموجهة</td>
                <td>أداة سطر أوامر ونظام لتفكيك المهام البرمجية إلى خطوات صغيرة محددة المواصفات لمنع تشتت الذكاء الاصطناعي.</td>
              </tr>
              <tr>
                <td><code>UI/UX Pro Max</code></td>
                <td>مستشار جودة الواجهات</td>
                <td>بروتوكول فحص بصري صارم يدقق مطابقة كود الفرونت إند لملف التصميم وقواعد سهولة الوصول وتجاوب الشاشات.</td>
              </tr>
              <tr>
                <td><code>Zero Overflow</code></td>
                <td>انعدام الطفحان الأفقي</td>
                <td>معيار جودة يضمن عدم ظهور أي شريط تمرير أفقي جانبي في كافة مقاسات الشاشات وخاصة الهواتف الذكية.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Professional Slogan Banner -->
        <div class="callout tip" style="margin-top: 3rem; text-align: center; padding: 2rem 1.5rem; border-right: none; border: 2px solid var(--brand-primary); border-radius: var(--radius-lg); background: linear-gradient(135deg, rgba(29, 78, 216, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);">
          <h3 style="font-size: 1.5rem; color: var(--brand-primary); margin-bottom: 0.75rem;">شعار المهندس المحترف في عصر الذكاء الاصطناعي</h3>
          <p style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); line-height: 1.8;">
            «الذكاء الاصطناعي لا يحل محل التفكير الهندسي، بل يضاعف قوة من يمتلك الرؤية المعمارية المنضبطة؛ وثّق متطلباتك، نمذج نظامك، واجعل الكود مجرد نتيجة حتمية لتصميم محكم.»
          </p>
          <div style="margin-top: 1rem; color: var(--text-muted); font-weight: 700;">
            برنامج سلاح العصر — MET Academy
          </div>
        </div>

      </section>

<section class="supplemental-content"><span class="supplemental-label">إثراء مقترح — من إعداد الموقع</span><h3>كيف تستخدم BorrowHub كمثال لا كقالب</h3><p>انقل طريقة التفكير من المثال، لا قواعده تلقائيًا. قبل نسخ أي حالة أو حد أو جدول إلى مشروع آخر، ارجع إلى PRD الخاص بذلك المشروع.</p><div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">SUPPLEMENTAL PROMPT — Transfer Check</span><button class="copy-btn" type="button" aria-label="نسخ برومبت فحص نقل القاعدة">نسخ</button></div><pre class="code-content"><code>Compare this BorrowHub rule with the target project's approved PRD.
Return: transferable, needs-change, or not-supported.
Give evidence from the target PRD and list the decision owner for anything unresolved.
Do not copy the rule automatically.</code></pre></div></section>
`;
