import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 38: PYTHON BACKEND FOUNDATION (أساسيات الخادم وتهيئة البيئة)
 * Sequence Position: 38
 * ========================================================================= */
export const topic38PythonHtml = `
<section id="topic-38-python" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 38 · تأسيس الخادم وقاعدة البيانات</span>
    <span class="step-pill">أساسيات Python وبيئة العمل والأسرار</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب</h2>
      <div class="step-subtitle">المستوى اللازم للمشروع: بيئة التشغيل الافتراضية، إدارة الحزم والأسرار، وفصل إعدادات الخادم دون استطراد أكاديمي</div>
    </div>
  </div>

  <!-- Educational Boundary Notice -->
  <div class="callout warning my-6">
    <div class="callout-header">
      <span class="callout-icon">⚠️</span>
      <span>تنبيه هندسي للحدود التعليمية</span>
    </div>
    <p class="leading-7 font-semibold">
      هذا الموضوع مخصص لتأسيس بيئة خادم مشروعك التطبيقي الخاص (مثل مشروع دراسة الحالة BorrowHub). تنفيذ هذه التذكرة ومواضيع هذا المسار لا ينشئ ولا يتطلب أي Backend للموقع التعليمي نفسه، حيث يعمل الموقع التعليمي كواجهة تفاعلية مستقلة بالكامل.
    </p>
  </div>

  <!-- 1. The Project-Level Need for Python -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. المستوى اللازم للمشروع: لماذا Python وما الذي نحتاجه فعلاً؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مسار هندسة البرمجيات بالذكاء الاصطناعي، لست بحاجة إلى دراسة دورة أكاديمية مطولة في علوم الحوسبة النظرية أو تفاصيل خوارزميات لغة Python المعقدة. ما يحتاجه مشروع الطالب لبناء خادم خلفي (Backend) قوي ومرن هو <strong>إتقان الأساسيات الهندسية الموجهة للإنتاج</strong>:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>لغة نظيفة وموجهة للذكاء الاصطناعي:</strong> تمتاز Python بوضوح تركيبها اللغوي وسهولة قراءتها، وتعد اللغة الأكثر دعماً من قبل وكلاء البرمجة (AI Coding Agents) ونماذج الذكاء الاصطناعي، مما يقلل احتمالية الأخطاء التركيبية.</li>
      <li><strong>الأنواع التوثيقية (Type Hints):</strong> استخدام التلميحات النوعية الصارمة (مثل <code>str</code>, <code>int</code>, <code>UUID</code>, <code>Optional[T]</code>) لتوفير عقود بيانات داخلية واضحة تمنع هلوسة الوكيل وترفع موثوقية الكود.</li>
      <li><strong>هيكلة الكود النمطي (Modular Structure):</strong> فصل الوظائف إلى حزم (Packages) ووحدات (Modules) تفصل المنطق التجاري عن نقاط النهاية وإعدادات النظام.</li>
      <li><strong>التعامل الصارم مع الاستثناءات (Error Handling):</strong> اعتراض الأخطاء غير المتوقعة ومنع انهيار الخادم، وتحويلها إلى رسائل خطأ مهيكلة ومفهومة للمستخدم.</li>
    </ul>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>القاعدة الذهبية لـ Python في الخادم</span>
      </div>
      <p class="leading-7">
        لا تكتب كوداً خادماً يعتمد على التخمين. اجعل كل دالة مصحوبة بنوع مدخلاتها ومخرجاتها (Type Annotations)، واستخدم بيئة افتراضية معزولة لتضمن أن كود مشروعك يعمل بنفس الدقة على حاسوبك الشخصي وعلى خوادم الإنتاج السحابية.
      </p>
    </div>
  </div>

  <!-- 2. Virtual Environments & Dependency Management -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. البيئة الافتراضية المعزولة وإدارة الاعتماديات</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من أسوأ الأخطاء الهندسية للمطور المبتدئ تثبيت مكتبات المشروع على مستوى مفسر النظام العالمي (Global System Python). يؤدي ذلك إلى تعارض الإصدارات (Dependency Hell) وانهيار أدوات النظام التشغيلي. الحل الهندسي الإلزامي هو <strong>إنشاء بيئة افتراضية معزولة (Virtual Environment)</strong> داخل مجلد المشروع:
    </p>

    <div class="space-y-4 my-4">
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-bold text-[var(--text-main)] mb-2">أ) إنشاء البيئة الافتراضية وتفعيلها</h4>
        <p class="text-sm text-[var(--text-muted)] mb-2">يمكنك استخدام وحدة Python المدمجة <code>venv</code> أو أداة <code>uv</code> فائقة السرعة المعتمدة في هذا المسار:</p>
        <div class="code-container my-2" dir="ltr">
          <div class="code-header">
            <span class="code-lang">Bash · Terminal</span>
            <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ أوامر الطرفية">نسخ الكود</button>
          </div>
          <pre class="code-content"><code># إنشاء البيئة الافتراضية في مجلد .venv
python3 -m venv .venv

# تفعيل البيئة على أنظمة Linux / macOS
source .venv/bin/activate

# أو تفعيل البيئة على نظام Windows (PowerShell)
# .venv\\Scripts\\Activate.ps1

# التحقق من أن مسار Python يشير إلى البيئة المعزولة
which python || where python</code></pre>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-bold text-[var(--text-main)] mb-2">ب) إدارة الاعتماديات وتجميد الإصدارات</h4>
        <p class="text-sm text-[var(--text-muted)] mb-2">يجب تثبيت الحزم الأساسية وتوثيق إصداراتها بدقة لضمان تكرار التثبيت المتطابق:</p>
        <div class="code-container my-2" dir="ltr">
          <div class="code-header">
            <span class="code-lang">Bash · Terminal</span>
            <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ أوامر التثبيت">نسخ الكود</button>
          </div>
          <pre class="code-content"><code># تثبيت مكتبات إدارة البيئة والاتصال الأساسية
pip install python-dotenv pydantic typing-extensions

# حفظ قائمة الاعتماديات في ملف requirements.txt
pip freeze > requirements.txt</code></pre>
        </div>
      </div>
    </div>
  </div>

  <!-- SVG Diagram: Python Environment & Secrets Architecture -->
  <div class="diagram-box my-8">
    <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (38): معمارية بيئة تشغيل Python وإدارة الأسرار والاعتماديات لمشروع الخادم</h4>
    <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
      <svg viewBox="0 0 840 260" style="width: 100%; height: auto; max-width: 840px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط معمارية بيئة عمل Python">
        <!-- System Level -->
        <rect x="20" y="30" width="180" height="200" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="110" y="65" fill="#f87171" font-size="14" font-weight="bold" text-anchor="middle">1. بيئة النظام (Global)</text>
        <rect x="35" y="85" width="150" height="35" rx="6" fill="#0f172a"/>
        <text x="110" y="107" fill="#94a3b8" font-size="12" text-anchor="middle">Python 3.12 مفسر النظام</text>
        <rect x="35" y="130" width="150" height="85" rx="6" fill="#450a0a" stroke="#ef4444" stroke-dasharray="3 3"/>
        <text x="110" y="160" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">تحذير هندسي:</text>
        <text x="110" y="180" fill="#fca5a5" font-size="11" text-anchor="middle">لا تثبت حزم المشروع هنا</text>
        <text x="110" y="200" fill="#fca5a5" font-size="10" text-anchor="middle">تجنباً لتعارض الإصدارات</text>

        <!-- Isolation Arrow -->
        <path d="M 200 130 L 250 130" stroke="#10b981" stroke-width="3" fill="none"/>

        <!-- Isolated Virtual Env -->
        <rect x="250" y="20" width="240" height="220" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
        <text x="370" y="55" fill="#6ee7b7" font-size="15" font-weight="bold" text-anchor="middle">2. البيئة الافتراضية (.venv)</text>
        <rect x="265" y="75" width="210" height="40" rx="6" fill="#022c22"/>
        <text x="370" y="100" fill="#f8fafc" font-size="12" font-family="monospace" text-anchor="middle">source .venv/bin/activate</text>
        <text x="370" y="138" fill="#a7f3d0" font-size="12" text-anchor="middle">• عزل كامل للحزم والمكتبات</text>
        <text x="370" y="162" fill="#a7f3d0" font-size="12" text-anchor="middle">• توافق تام مع أدوات uv و pip</text>
        <text x="370" y="186" fill="#a7f3d0" font-size="12" text-anchor="middle">• مجلد .venv مهمل في .gitignore</text>
        <text x="370" y="215" fill="#fbbf24" font-size="11" text-anchor="middle">Zero System Interference</text>

        <!-- Arrow to Secrets & Config -->
        <path d="M 490 130 L 540 130" stroke="#10b981" stroke-width="3" fill="none"/>

        <!-- Secrets & Config Loader -->
        <rect x="540" y="20" width="280" height="220" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="680" y="55" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="middle">3. عزل الأسرار والإعدادات</text>
        <rect x="555" y="75" width="250" height="42" rx="6" fill="#0f172a" stroke="#eab308"/>
        <text x="680" y="94" fill="#fef08a" font-size="11" font-weight="bold" text-anchor="middle">ملف الأسرار الحقيقي (.env)</text>
        <text x="680" y="110" fill="#94a3b8" font-size="10" text-anchor="middle">محمي ومحجوب عن Git تماماً</text>
        
        <rect x="555" y="125" width="250" height="42" rx="6" fill="#0f172a" stroke="#0284c7"/>
        <text x="680" y="144" fill="#bae6fd" font-size="11" font-weight="bold" text-anchor="middle">ملف القالب (.env.example)</text>
        <text x="680" y="160" fill="#94a3b8" font-size="10" text-anchor="middle">مرفوع في Git لتوثيق المفاتيح فقط</text>

        <rect x="555" y="175" width="250" height="48" rx="6" fill="#022c22" stroke="#10b981"/>
        <text x="680" y="195" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">مكتبة الإعدادات (Settings Loader)</text>
        <text x="680" y="212" fill="#cbd5e1" font-size="10" text-anchor="middle">تحويل الأنواع وفحص وجود الأسرار برمجياً</text>
      </svg>
    </div>
  </div>

  <!-- 3. Secrets Management & Environment Variables -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. إدارة الأسرار والمتغيرات البيئية (.env مقابل .env.example)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من القواعد الذهبية الصارمة في هندسة البرمجيات: <strong>حظر كتابة الأسرار أو كلمات المرور أو مفاتيح التشفير بشكل صلب داخل الشيفرة البرمجية (Zero Hardcoded Secrets)</strong>. إذا تم دفع كلمة مرور أو مفتاح تشفير إلى مستودع GitHub حتى لثوانٍ معدودة، فإن المفتاح يعتبر مخترقاً بالكامل ويجب إلغاؤه فوراً.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
        <h4 class="font-bold text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
          <span>🔒</span> ملف الأسرار الحقيقي (.env)
        </h4>
        <ul class="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>• يحتوي على القيم الحقيقية: كلمات مرور قاعدة البيانات، ومفاتيح التشفير، ومفاتيح الـ API.</li>
          <li>• <strong>إلزامي:</strong> يجب أن يدرج اسم <code>.env</code> ضمن ملف <code>.gitignore</code> قبل إنشاء أول Commit.</li>
          <li>• لا يُرفع إطلاقاً إلى المستودع السحابي أو يُشارك عبر قنوات عامة.</li>
        </ul>
      </div>

      <div class="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
        <h4 class="font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
          <span>📄</span> ملف القالب الإرشادي (.env.example)
        </h4>
        <ul class="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>• يحتوي على أسماء المتغيرات فقط مع قيم توضيحية أو فارغة.</li>
          <li>• <strong>إلزامي:</strong> يُرفع إلى مستودع Git ليعرف أي مطور جديد ما هي المفاتيح المطلوبة لتشغيل الخادم.</li>
          <li>• لا يحتوي على أي قيمة سرية أو كلمة مرور حقيقية.</li>
        </ul>
      </div>
    </div>

    <!-- Code Block: .env.example and Settings Loader -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Env File · .env.example</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ ملف البيئة النموذجي">نسخ الكود</button>
      </div>
      <pre class="code-content"><code># =============================================================================
# BorrowHub Backend Environment Variables Template
# Copy this file to .env and fill in real values. NEVER commit .env to git!
# =============================================================================

# Server Settings
ENVIRONMENT=development
DEBUG=True
PORT=8000
HOST=0.0.0.0
SECRET_KEY=change-this-to-a-super-secret-random-key-at-least-32-chars

# Database Configuration (PostgreSQL)
DB_ENGINE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=borrowhub_db
DB_USER=borrowhub_user
DB_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://borrowhub_user:your_secure_password_here@localhost:5432/borrowhub_db

# Security & Tokens
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALGORITHM=HS256</code></pre>
    </div>

    <p class="leading-8 text-[var(--text-muted)] mt-4">
      ولقراءة هذه المتغيرات بطريقة آمنة برمجياً داخل كود Python دون أخطاء زمن التشغيل، نبني وحدة إعدادات موحدة <code>src/config/settings.py</code> تقوم بالتحقق من وجود المتغيرات وتحويل أنواعها (مثلاً تحويل النص <code>"True"</code> إلى قيمة منطقية حقيقية <code>True</code>):
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python · src/config/settings.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود إعدادات بايثون">نسخ الكود</button>
      </div>
      <pre class="code-content"><code># =============================================================================
# Type-Safe Application Settings Loader
# Reads variables from .env with strict type conversion and fallback defaults
# =============================================================================

import os
from pathlib import Path
from dotenv import load_dotenv

# تحديد المسار الجذري للمشروع وتحميل ملف .env
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")


class Settings:
    """كائن الإعدادات الموحد لمشروع خادم الطالب"""
    
    # بيئة التشغيل
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ("true", "1", "yes")
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    # مفتاح التشفير السري
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    
    # إعدادات قاعدة بيانات PostgreSQL
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: int = int(os.getenv("DB_PORT", "5432"))
    DB_NAME: str = os.getenv("DB_NAME", "borrowhub_db")
    DB_USER: str = os.getenv("DB_USER", "borrowhub_user")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    def validate(self) -> None:
        """فحص وجود الأسرار الإلزامية قبل بدء تشغيل الخادم"""
        if not self.SECRET_KEY or self.SECRET_KEY == "change-this-to-a-super-secret-random-key-at-least-32-chars":
            if self.ENVIRONMENT == "production":
                raise ValueError("CRITICAL: SECRET_KEY must be properly configured for production!")
        if not self.DB_PASSWORD:
            print("WARNING: DB_PASSWORD is empty. Ensure local database permits passwordless connection.")


settings = Settings()
settings.validate()
</code></pre>
    </div>
  </div>

  <!-- 4. Project Structure Preparation -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. هيكلة مشروع الخادم والتحضير لاختيار إطار العمل</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      للحفاظ على نظافة المشروع وسهولة صيانته، نؤسس هيكلية مجلدات نظيفة تستوعب لاحقاً <strong>بديل الإطار الذي تختاره</strong> (سواء وقع اختيارك على Django أو FastAPI في الموضوعين 41 و42):
    </p>

    <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 my-4" dir="ltr">
      <pre>backend/
├── .venv/                   # البيئة الافتراضية المعزولة (مستثناة في .gitignore)
├── .env                     # الأسرار وبيانات الاعتماد الحقيقية (مستثنى في .gitignore)
├── .env.example             # نموذج المتغيرات المرفوع في Git
├── requirements.txt         # وثيقة الاعتماديات المثبتة
├── docs/
│   └── BACKEND_SETUP.md     # دليل التثبيت والتهيئة المحلي
└── src/
    ├── __init__.py
    ├── config/
    │   ├── __init__.py
    │   └── settings.py      # وحدة تحميل الإعدادات وفحص الأسرار
    ├── database/            # إعدادات الاتصال وحوض الاتصالات (موضوع 39)
    ├── api/                 # مسارات وعقود الـ API ومحددات الطلبات (موضوع 40)
    └── services/            # منطق العمل التجاري وقواعد النظام</pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 39: POSTGRESQL DATABASE SETUP (إعداد قاعدة البيانات والاتصال والأسرار)
 * Sequence Position: 39
 * ========================================================================= */
export const topic39PostgreSqlHtml = `
<section id="topic-39-postgresql" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 39 · تأسيس الخادم وقاعدة البيانات</span>
    <span class="step-pill">PostgreSQL والاتصال وإدارة المخطط عبر Migrations</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار</h2>
      <div class="step-subtitle">سلسلة الاتصال، عزل بيانات الاعتماد، وإدارة التغييرات عبر آلية ترحيل معتمدة في بديل الإطار الذي تختاره</div>
    </div>
  </div>

  <!-- Educational Boundary Notice -->
  <div class="callout warning my-6">
    <div class="callout-header">
      <span class="callout-icon">⚠️</span>
      <span>تنبيه هندسي للحدود التعليمية</span>
    </div>
    <p class="leading-7 font-semibold">
      هذا الموضوع مخصص لإعداد قاعدة بيانات PostgreSQL لمشروع الطالب الخاص. تنفيذ هذا الموضوع لا ينشئ قاعدة بيانات ولا يربط أي Backend بالموقع التعليمي نفسه، حيث يظل الموقع التعليمي بنية مستعرض ثابتة تفاعلية لا تحتاج خادماً خلفياً.
    </p>
  </div>

  <!-- 1. Why PostgreSQL for the Student's Project -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. لماذا PostgreSQL؟ ومطابقة نموذج بيانات المشروع (ERD)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تم اختيار <strong>PostgreSQL</strong> كنظام إدارة قواعد البيانات العلائقية المعتمد في المسار لبناء مشروع الطالب لعدة أسباب هندسية جوهرية:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>الصرامة في تطبيق قيود التكامل المرجعي (Referential Integrity):</strong> فرض قيود المفاتيح الأجنبية (Foreign Keys) وفحوص التحقق (Check Constraints) التي تمنع حالات الفساد في البيانات.</li>
      <li><strong>الامتثال التام لمعايير ACID:</strong> ضمان تنفيذ المعاملات الحرجة (مثل خصم رصيد المعدة وحجزها للطالب) إما بنجاح كامل أو التراجع التام (Atomic Transactions).</li>
      <li><strong>الأنواع المتقدمة:</strong> دعم حقول التوقيت الزمني الدقيقة مع المنطقة الزمنية (<code>TIMESTAMPTZ</code>)، وحقول المعرفات الفريدة عالمياً (<code>UUID</code>)، وحقول البيانات شبه المهيكلة (<code>JSONB</code>).</li>
    </ul>

    <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] mt-4">
      <h4 class="font-bold text-[var(--text-main)] mb-2">مطابقة الجداول الخمسة المعتمدة في مشروع BorrowHub</h4>
      <p class="text-sm text-[var(--text-muted)] mb-3">
        تستند قاعدة بيانات المشروع تماماً إلى ما تم تصميمه في وثيقة <code>docs/ERD.md</code> وملف <code>docs/database.dbml</code> في الموضوعين 14 و15:
      </p>
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs sm:text-sm border-collapse text-right">
          <thead>
            <tr class="border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)]">
              <th class="p-2.5 font-bold text-[var(--text-main)]">الجدول (Table)</th>
              <th class="p-2.5 font-bold text-[var(--text-main)]">الوظيفة في النظام</th>
              <th class="p-2.5 font-bold text-[var(--text-main)]">الحقول والقيود المحورية</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">users</td>
              <td class="p-2.5">سجل بيانات الطلاب والمشرفين والإداريين</td>
              <td class="p-2.5"><code>email (UNIQUE)</code>, <code>role (student/staff/admin)</code></td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">equipment_categories</td>
              <td class="p-2.5">فئات وتصنيفات الأجهزة والمعدات</td>
              <td class="p-2.5"><code>slug (UNIQUE)</code>, <code>name</code></td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">equipment</td>
              <td class="p-2.5">بيانات الأجهزة وحالة المخزون الفيزيائي</td>
              <td class="p-2.5"><code>category_id (FK)</code>, <code>status</code>, <code>total/available_quantity</code></td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">loan_requests</td>
              <td class="p-2.5">طلبات الاستعارة ومواعيد الحجز والقرارات</td>
              <td class="p-2.5"><code>user_id (FK)</code>, <code>equipment_id (FK)</code>, <code>status</code></td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">loan_action_logs</td>
              <td class="p-2.5">سجل التدقيق والمراجعة التاريخي للإجراءات</td>
              <td class="p-2.5"><code>loan_request_id (FK)</code>, <code>actor_id (FK)</code>, <code>action</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 2. Connection Setup & Secrets -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. إعداد الاتصال وسلسلة URI وحوض الاتصالات (Connection Pooling)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يتم الاتصال بقاعدة بيانات PostgreSQL عبر سلسلة اتصال موحدة ومعيارية (URI Format) تأخذ البنية التالية:
    </p>
    <div class="bg-[var(--bg-card-subtle)] p-3 rounded-lg border border-[var(--border-color)] text-xs sm:text-sm font-mono text-center my-3" dir="ltr">
      <code>postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=[mode]</code>
    </div>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>مفهوم حوض الاتصالات (Connection Pooling)</span>
      </div>
      <p class="leading-7">
        إنشاء اتصال TCP جديد وتوثيقه مع قاعدة البيانات في كل طلب HTTP هو عملية مكلفة برمجياً تستهلك الذاكرة وزمن المعالج. لذلك يستخدم خادم الإنتاج <strong>حوض اتصالات (Connection Pool)</strong> يحتفظ بعدد محدد مسبقاً من القنوات المفتوحة الجاهزة للاستخدام الفوري وإعادتها للحوض فور انتهاء الاستعلام.
      </p>
    </div>

    <!-- Code Block: Database Connection and Pooling Configuration -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python · src/database/connection.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود الاتصال بقاعدة البيانات">نسخ الكود</button>
      </div>
      <pre class="code-content"><code># =============================================================================
# PostgreSQL Database Connection & Pooling Specification
# Compatible with framework drivers (psycopg, asyncpg, or framework engine)
# =============================================================================

from src.config.settings import settings


class DatabaseConfig:
    """إعدادات موفر الاتصال وحوض الاتصالات لقاعدة بيانات PostgreSQL"""
    
    DATABASE_URL: str = settings.DATABASE_URL
    
    # معايير حوض الاتصالات (Connection Pool Tuning)
    POOL_MIN_SIZE: int = 5       # الحد الأدنى للقنوات المفتوحة الدائمة
    POOL_MAX_SIZE: int = 20      # الحد الأقصى للقنوات في فترات ذروة الاستخدام
    POOL_TIMEOUT_SECONDS: int = 30 # مهلة انتظار الحصول على قناة من الحوض
    
    # معايير تشفير النقل (TLS/SSL)
    # في بيئات الاستضافة السحابية يُفرض 'require'، وفي التطوير المحلي 'disable'
    SSL_MODE: str = "require" if settings.ENVIRONMENT == "production" else "disable"

    @classmethod
    def get_connection_summary(cls) -> dict:
        """عرض ملخص الاتصال دون طباعة كلمة المرور السرية"""
        return {
            "engine": "PostgreSQL",
            "host": settings.DB_HOST,
            "port": settings.DB_PORT,
            "database": settings.DB_NAME,
            "user": settings.DB_USER,
            "ssl_mode": cls.SSL_MODE,
            "pool_size": f"{cls.POOL_MIN_SIZE}-{cls.POOL_MAX_SIZE}"
        }
</code></pre>
    </div>
  </div>

  <!-- 3. Crucial Separation: Schema Planning vs. Schema Migrations -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. الفصل الجذري بين تخطيط قاعدة البيانات وتطبيق مخططها (Planning vs. Applying Schema)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من أهم المفاهيم الهندسية التي يختبرها هذا المسار: <strong>عدم الخلط بين مرحلة تخطيط قاعدة البيانات ومرحلة تطبيق مخططها الفعلي</strong>:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
        <h4 class="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
          <span>📐</span> أولاً: مرحلة تخطيط قاعدة البيانات (Planning)
        </h4>
        <ul class="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300 leading-6">
          <li>• <strong>مكان الإنجاز:</strong> المواضيع السابقة (14: ERD و15: DBML).</li>
          <li>• <strong>الأدوات المستخدمة:</strong> وثائق التصميم ومخططات الكيانات وdbdiagram.io.</li>
          <li>• <strong>المخرج:</strong> مواصفة معمارية ورقية/نصية تحدد الجداول والعلاقات والقيود.</li>
          <li>• <strong>ملاحظة:</strong> لا ترتبط هذه المرحلة بأي كود برمجي تنفيذي ولا تعدل أي قاعدة بيانات حقيقية.</li>
        </ul>
      </div>

      <div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
        <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-2">
          <span>⚙️</span> ثانياً: مرحلة تطبيق المخطط عبر الترحيل (Applying via Migrations)
        </h4>
        <ul class="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300 leading-6">
          <li>• <strong>مكان الإنجاز:</strong> المواضيع اللاحقة (41: Django أو 42: FastAPI).</li>
          <li>• <strong>الآلية المعتمدة:</strong> نظام ترحيل البيانات البرمجي المعتمد في <strong>بديل الإطار الذي تختاره</strong>.</li>
          <li>• <strong>المخرج:</strong> ملفات ترحيل مهيكلة ومرقمة زمنيّاً داخل مستودع Git.</li>
          <li>• <strong>القاعدة الصارمة:</strong> يُحظر تنفيذ أوامر <code>CREATE TABLE</code> يدوياً في الإنتاج.</li>
        </ul>
      </div>
    </div>

    <!-- SVG Diagram: Schema Planning vs Schema Applying Workflow -->
    <div class="diagram-box my-8">
      <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (39): دورة حياة مخطط البيانات: من التحليل الورقي (ERD) إلى ملفات الترحيل والتطبيق في قاعدة البيانات</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 840 260" style="width: 100%; height: auto; max-width: 840px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط الفصل بين تخطيط وتطبيق قاعدة البيانات">
          <!-- Stage 1: Planning -->
          <rect x="20" y="30" width="220" height="200" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <text x="130" y="65" fill="#f59e0b" font-size="14" font-weight="bold" text-anchor="middle">1. مرحلة التخطيط (المواضيع 14-15)</text>
          <rect x="35" y="85" width="190" height="35" rx="6" fill="#0f172a"/>
          <text x="130" y="107" fill="#cbd5e1" font-size="12" text-anchor="middle">docs/ERD.md (مخطط العلاقات)</text>
          <rect x="35" y="130" width="190" height="35" rx="6" fill="#0f172a"/>
          <text x="130" y="152" fill="#cbd5e1" font-size="12" text-anchor="middle">docs/database.dbml</text>
          <rect x="35" y="175" width="190" height="35" rx="6" fill="#451a03" stroke="#f59e0b" stroke-dasharray="2 2"/>
          <text x="130" y="197" fill="#fde68a" font-size="11" text-anchor="middle">تصميم مفاهيمي بدون كود تنفيذي</text>

          <!-- Arrow 1 -> 2 -->
          <path d="M 240 130 L 290 130" stroke="#10b981" stroke-width="3" fill="none"/>

          <!-- Stage 2: Models & Migrations in Framework Choice -->
          <rect x="290" y="20" width="260" height="220" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
          <text x="420" y="55" fill="#6ee7b7" font-size="15" font-weight="bold" text-anchor="middle">2. بديل الإطار الذي تختاره</text>
          <rect x="305" y="75" width="230" height="40" rx="6" fill="#022c22"/>
          <text x="420" y="100" fill="#f8fafc" font-size="12" text-anchor="middle">نماذج الكود (ORM Models)</text>
          <text x="420" y="138" fill="#a7f3d0" font-size="12" text-anchor="middle">• توليد ملفات الترحيل (Migrations)</text>
          <text x="420" y="162" fill="#a7f3d0" font-size="12" text-anchor="middle">• تتبع التغييرات في مستودع Git</text>
          <text x="420" y="186" fill="#a7f3d0" font-size="12" text-anchor="middle">• دعم التراجع الآمن (Rollback)</text>
          <text x="420" y="215" fill="#fbbf24" font-size="11" text-anchor="middle">Django Migrations أو Alembic/FastAPI</text>

          <!-- Arrow 2 -> 3 -->
          <path d="M 550 130 L 600 130" stroke="#10b981" stroke-width="3" fill="none"/>

          <!-- Stage 3: Real Database -->
          <rect x="600" y="30" width="220" height="200" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <text x="710" y="65" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">3. قاعدة البيانات (PostgreSQL)</text>
          <rect x="615" y="85" width="190" height="35" rx="6" fill="#0f172a"/>
          <text x="710" y="107" fill="#cbd5e1" font-size="12" text-anchor="middle">تطبيق أوامر DDL آلياً</text>
          <rect x="615" y="130" width="190" height="35" rx="6" fill="#0f172a"/>
          <text x="710" y="152" fill="#cbd5e1" font-size="12" text-anchor="middle">جدول التتبع (django_migrations / alembic)</text>
          <rect x="615" y="175" width="190" height="35" rx="6" fill="#022c22" stroke="#10b981"/>
          <text x="710" y="197" fill="#6ee7b7" font-size="11" text-anchor="middle">بيانات متسقة وخالية من التعارض</text>
        </svg>
      </div>
    </div>

    <p class="leading-8 text-[var(--text-muted)]">
      عند وصولك إلى خطوة اختيار إطار العمل في الموضوعين 41 و42، ستستخدم <strong>آلية الترحيل المعتمدة في بديل الإطار الذي تختاره</strong>:
    </p>

    <!-- Code Block: Migration Commands Comparison -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Bash · Migration Mechanisms by Framework Alternative</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ أوامر الترحيل">نسخ الكود</button>
      </div>
      <pre class="code-content"><code># =============================================================================
# تطبيق المخطط عبر آلية الترحيل المعتمدة في "بديل الإطار الذي تختاره":
# =============================================================================

# البديل الأول: إذا اخترت إطار Django (الموضوع 41)
# 1. فحص نماذج الكود وتوليد ملف الترحيل الجديد
python manage.py makemigrations
# 2. تطبيق ملفات الترحيل على قاعدة بيانات PostgreSQL الفعلية
python manage.py migrate

# -----------------------------------------------------------------------------

# البديل الثاني: إذا اخترت إطار FastAPI مع Alembic و SQLAlchemy (الموضوع 42)
# 1. توليد ترحيل تلقائي بناءً على نماذج Pydantic/SQLAlchemy
alembic revision --autogenerate -m "create borrowhub initial tables"
# 2. ترقية قاعدة البيانات وتطبيق المخطط
alembic upgrade head
</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 40: BACKEND ARCHITECTURE & API CONTRACTS (معمارية الخادم وعقود API)
 * Sequence Position: 40
 * ========================================================================= */
export const topic40ApiArchitectureHtml = `
<section id="topic-40-api-contracts" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 40 · تأسيس الخادم وقاعدة البيانات</span>
    <span class="step-pill">معمارية الخادم وعقود API ومصفوفة الصلاحيات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">معمارية Backend وعقود API لمشروع الطالب</h2>
      <div class="step-subtitle">اشتقاق مسارات RESTful من متطلبات PRD وجداول ERD، مع توحيد الطلبات والاستجابات والأخطاء ومصفوفة الصلاحيات</div>
    </div>
  </div>

  <!-- Educational Boundary Notice -->
  <div class="callout warning my-6">
    <div class="callout-header">
      <span class="callout-icon">⚠️</span>
      <span>تنبيه هندسي للحدود التعليمية</span>
    </div>
    <p class="leading-7 font-semibold">
      هذه المعمارية وعقود API موجهة لبناء وتوثيق نقاط الاتصال الخاصة بمشروع الطالب (مثل BorrowHub) لتمكين الربط المستقبلي. تنفيذ هذه التذكرة لا ينشئ أي Backend للموقع التعليمي نفسه، فالموقع التعليمي يعمل بواجهة تفاعلية كاملة مستقلة.
    </p>
  </div>

  <!-- 1. Grounding API Architecture in Requirements, ERD & Frontend Contracts -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ارتكاز معمارية API على المتطلبات وERD وعقود الفرونت إند</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا تُصمم نقاط نهاية الـ API (Endpoints) بناءً على التخمين أو رغبة المطور المؤقتة، بل <strong>تُشتق هندسياً ومباشرة من مخرجات التحليل السابقة</strong>:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>متطلبات PRD وSRS (المواضيع 3 و4):</strong> تحدد العمليات المنطقية المسموحة وتدفقات المستخدمين (مثل قيود الحجز، والحد الأقصى لعدد الإعارات النشطة).</li>
      <li><strong>مخطط قاعدة البيانات ERD (الموضوع 14):</strong> يحدد الموارد الأساسية (Resources) وعلاقاتها التبعية (مثل تبعية سجلات الإجراءات <code>loan_action_logs</code> لطلبات الاستعارة <code>loan_requests</code>).</li>
      <li><strong>عقود الفرونت إند في TypeScript (الموضوع 30):</strong> تُطابق أسماء الحقول والأنواع تماماً (مثل <code>UserRole</code>, <code>LoanStatus</code>, <code>PaginatedResult&lt;T&gt;</code>) لضمان عدم حدوث أي انقطاع أو تفاوت بين لغة الواجهة ولغة الخادم.</li>
    </ul>

    <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] mt-4">
      <h4 class="font-bold text-[var(--text-main)] mb-2">جدول اشتقاق الموارد الرئيسية لمشروع BorrowHub</h4>
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs sm:text-sm border-collapse text-right">
          <thead>
            <tr class="border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)]">
              <th class="p-2.5 font-bold text-[var(--text-main)]">المسار (Resource URI)</th>
              <th class="p-2.5 font-bold text-[var(--text-main)]">الأفعال المدعومة (Methods)</th>
              <th class="p-2.5 font-bold text-[var(--text-main)]">الجدول المصدر في ERD</th>
              <th class="p-2.5 font-bold text-[var(--text-main)]">نوع الفرونت المطابق (TS Interface)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">/api/v1/equipment</td>
              <td class="p-2.5 font-mono" dir="ltr">GET, POST</td>
              <td class="p-2.5"><code>equipment</code></td>
              <td class="p-2.5 font-mono" dir="ltr">Equipment</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">/api/v1/equipment/{id}</td>
              <td class="p-2.5 font-mono" dir="ltr">GET, PUT, DELETE</td>
              <td class="p-2.5"><code>equipment</code></td>
              <td class="p-2.5 font-mono" dir="ltr">Equipment</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">/api/v1/categories</td>
              <td class="p-2.5 font-mono" dir="ltr">GET, POST</td>
              <td class="p-2.5"><code>equipment_categories</code></td>
              <td class="p-2.5 font-mono" dir="ltr">Category</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">/api/v1/loans</td>
              <td class="p-2.5 font-mono" dir="ltr">GET, POST</td>
              <td class="p-2.5"><code>loan_requests</code></td>
              <td class="p-2.5 font-mono" dir="ltr">LoanRequest</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono text-[var(--brand-primary)]" dir="ltr">/api/v1/loans/{id}/actions</td>
              <td class="p-2.5 font-mono" dir="ltr">POST</td>
              <td class="p-2.5"><code>loan_action_logs</code></td>
              <td class="p-2.5 font-mono" dir="ltr">LoanActionLog</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 2. Standardized Request & Response Specifications -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. معايير الطلبات والاستجابات الموحدة (Standardized Envelopes)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لضمان قابلية توقع سلوك الـ API وسهولة استهلاكه من قبل الواجهة الأمامية، يجب أن تخضع كافة الاستجابات لغلاف موحد (Uniform Response Envelope):
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
        <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">أ) غلاف الاستجابة الناجحة للقوائم (Paginated List)</h4>
        <div class="code-container my-2" dir="ltr">
          <div class="code-header">
            <span class="code-lang">JSON · Success Envelope</span>
            <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ غلاف الاستجابة الناجحة">نسخ الكود</button>
          </div>
          <pre class="code-content"><code>{
  "success": true,
  "data": [
    {
      "id": "eq-101",
      "name": "كاميرا سوني سينمائية A7S III",
      "status": "available",
      "availableQuantity": 3,
      "totalQuantity": 5
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 45,
    "totalPages": 5
  },
  "meta": {
    "requestId": "req-98765",
    "timestamp": "2026-10-18T13:00:00Z"
  }
}</code></pre>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
        <h4 class="font-bold text-red-900 dark:text-red-200 mb-2">ب) غلاف الأخطاء القياسي (Standardized Error Envelope)</h4>
        <div class="code-container my-2" dir="ltr">
          <div class="code-header">
            <span class="code-lang">JSON · Error Envelope</span>
            <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ غلاف الأخطاء القياسي">نسخ الكود</button>
          </div>
          <pre class="code-content"><code>{
  "success": false,
  "error": {
    "code": "ACTIVE_LOAN_LIMIT_EXCEEDED",
    "message": "لا يمكنك تقديم طلب جديد؛ تجاوزت الحد الأقصى للإعارات النشطة المسموحة (إعارتان).",
    "status": 409,
    "details": {
      "activeLoansCount": 2,
      "maxAllowed": 2
    }
  },
  "meta": {
    "requestId": "req-98766",
    "timestamp": "2026-10-18T13:00:01Z"
  }
}</code></pre>
        </div>
      </div>
    </div>
  </div>

  <!-- SVG Diagram: API Architecture & Request-Response Lifecycle -->
  <div class="diagram-box my-8">
    <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (40): معمارية معالجة الطلبات في الخادم، التحقق من الصلاحيات RBAC، وتوحيد حزم الاستجابة والأخطاء</h4>
    <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
      <svg viewBox="0 0 840 280" style="width: 100%; height: auto; max-width: 840px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط معمارية وعقود API">
        <!-- Client -->
        <rect x="20" y="50" width="160" height="180" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="100" y="85" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">الفرونت إند (Next.js)</text>
        <rect x="35" y="105" width="130" height="35" rx="6" fill="#0f172a"/>
        <text x="100" y="127" fill="#cbd5e1" font-size="11" text-anchor="middle">HTTP Requests</text>
        <rect x="35" y="150" width="130" height="35" rx="6" fill="#0f172a"/>
        <text x="100" y="172" fill="#cbd5e1" font-size="11" text-anchor="middle">TypeScript Interfaces</text>

        <!-- Arrow Client -> Gate -->
        <path d="M 180 140 L 230 140" stroke="#10b981" stroke-width="3" fill="none"/>

        <!-- Middleware & RBAC Gate -->
        <rect x="230" y="30" width="180" height="220" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
        <text x="320" y="65" fill="#6ee7b7" font-size="14" font-weight="bold" text-anchor="middle">1. الصلاحيات والتحقق</text>
        <rect x="245" y="85" width="150" height="40" rx="6" fill="#022c22"/>
        <text x="320" y="110" fill="#f8fafc" font-size="11" text-anchor="middle">فحص الرمز المميز (JWT)</text>
        <rect x="245" y="135" width="150" height="40" rx="6" fill="#022c22"/>
        <text x="320" y="160" fill="#f8fafc" font-size="11" text-anchor="middle">مصفوفة الصلاحيات (RBAC)</text>
        <text x="320" y="200" fill="#fbbf24" font-size="10" text-anchor="middle">رفض الطلب 401 / 403 فوراً</text>
        <text x="320" y="220" fill="#fbbf24" font-size="10" text-anchor="middle">عند غياب الأهلية</text>

        <!-- Arrow Gate -> Controller -->
        <path d="M 410 140 L 460 140" stroke="#10b981" stroke-width="3" fill="none"/>

        <!-- Controller & Business Logic -->
        <rect x="460" y="30" width="180" height="220" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="550" y="65" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">2. منطق العمل والمعالجة</text>
        <rect x="475" y="85" width="150" height="40" rx="6" fill="#0f172a"/>
        <text x="550" y="110" fill="#cbd5e1" font-size="11" text-anchor="middle">التحقق من المدخلات (422)</text>
        <rect x="475" y="135" width="150" height="40" rx="6" fill="#0f172a"/>
        <text x="550" y="160" fill="#cbd5e1" font-size="11" text-anchor="middle">تطبيق القواعد في PostgreSQL</text>
        <rect x="475" y="185" width="150" height="40" rx="6" fill="#0f172a"/>
        <text x="550" y="210" fill="#cbd5e1" font-size="11" text-anchor="middle">المعاملة الذرية (Atomic)</text>

        <!-- Arrow Controller -> Envelope -->
        <path d="M 640 140 L 690 140" stroke="#10b981" stroke-width="3" fill="none"/>

        <!-- Standardized Envelope Return -->
        <rect x="690" y="50" width="130" height="180" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="755" y="85" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">3. غلاف الاستجابة</text>
        <rect x="700" y="105" width="110" height="45" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="755" y="125" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle">Success Envelope</text>
        <text x="755" y="140" fill="#cbd5e1" font-size="9" text-anchor="middle">200 / 201 Created</text>
        <rect x="700" y="160" width="110" height="45" rx="6" fill="#450a0a" stroke="#ef4444"/>
        <text x="755" y="180" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Error Envelope</text>
        <text x="755" y="195" fill="#cbd5e1" font-size="9" text-anchor="middle">400 / 409 / 422</text>
      </svg>
    </div>
  </div>

  <!-- 3. Permissions & Role-Based Access Control (RBAC) Matrix -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. مصفوفة الصلاحيات والتحكم بالوصول (RBAC Matrix)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      وفق قواعد عمل وثيقة PRD لمشروع BorrowHub، يتم توزيع الصلاحيات على الأدوار الثلاثة المعتمدة في النظام:
    </p>

    <div class="overflow-x-auto my-4">
      <table class="min-w-full text-xs sm:text-sm border-collapse text-right">
        <thead>
          <tr class="border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)]">
            <th class="p-2.5 font-bold text-[var(--text-main)]">العملية والمسار (Endpoint & Operation)</th>
            <th class="p-2.5 font-bold text-center text-blue-600 dark:text-blue-400">الطالب (Student)</th>
            <th class="p-2.5 font-bold text-center text-amber-600 dark:text-amber-400">المشرف/الموظف (Staff)</th>
            <th class="p-2.5 font-bold text-center text-emerald-600 dark:text-emerald-400">المسؤول (Admin)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
          <tr>
            <td class="p-2.5 font-mono" dir="ltr">GET /api/v1/equipment (تصفح الكتالوج)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
          </tr>
          <tr>
            <td class="p-2.5 font-mono" dir="ltr">POST /api/v1/equipment (إضافة صنف جديد)</td>
            <td class="p-2.5 text-center text-red-500 font-bold">✕ محظور (403)</td>
            <td class="p-2.5 text-center text-red-500 font-bold">✕ محظور (403)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
          </tr>
          <tr>
            <td class="p-2.5 font-mono" dir="ltr">POST /api/v1/loans (تقديم طلب استعارة)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ لنفسه فقط</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ لنفسه فقط</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
          </tr>
          <tr>
            <td class="p-2.5 font-mono" dir="ltr">GET /api/v1/loans (استعراض الطلبات)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ طلباته فقط</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ كافة طلبات القسم</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ كافة الطلبات</td>
          </tr>
          <tr>
            <td class="p-2.5 font-mono" dir="ltr">POST /api/v1/loans/{id}/actions (اعتماد/تسليم/إرجاع)</td>
            <td class="p-2.5 text-center text-red-500 font-bold">✕ محظور (403)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح (مع قيد التسليم المادي)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
          </tr>
          <tr>
            <td class="p-2.5 font-mono" dir="ltr">GET /api/v1/loans/{id}/logs (سجل التدقيق والمراجعة)</td>
            <td class="p-2.5 text-center text-red-500 font-bold">✕ محظور (403)</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
            <td class="p-2.5 text-center text-emerald-600 font-bold">✓ مسموح</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. HTTP Status Codes & Error Semantics -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. دلالات رموز حالات HTTP المعتمدة في العقود</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يجب أن يعكس كل رمز حالة المعنى الهندسي الحقيقي للنتيجة دون استخدام عشوائي:
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
      <div class="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
        <span class="font-mono text-emerald-600 font-bold" dir="ltr">200 OK / 201 Created</span>
        <p class="text-xs text-[var(--text-muted)] mt-1">نجاح العملية (200 للاسترجاع والتحديث، 201 لإنشاء المورد كطلب الاستعارة).</p>
      </div>
      <div class="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
        <span class="font-mono text-amber-600 font-bold" dir="ltr">401 Unauthorized</span>
        <p class="text-xs text-[var(--text-muted)] mt-1">الطلب يفتقر لرمز التوثيق (Token) أو أن الرمز منتهي الصلاحية.</p>
      </div>
      <div class="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
        <span class="font-mono text-red-600 font-bold" dir="ltr">403 Forbidden</span>
        <p class="text-xs text-[var(--text-muted)] mt-1">المستخدم موثق بنجاح لكن دوره الحالي لا يمتلك صلاحية تنفيذ الإجراء (مثل طالب يحاول اعتماد طلب).</p>
      </div>
      <div class="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
        <span class="font-mono text-amber-600 font-bold" dir="ltr">404 Not Found</span>
        <p class="text-xs text-[var(--text-muted)] mt-1">المورد المطلوب (المعدة أو الطلب برقم المعرف المحدد) غير موجود في النظام.</p>
      </div>
      <div class="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
        <span class="font-mono text-purple-600 font-bold" dir="ltr">409 Conflict</span>
        <p class="text-xs text-[var(--text-muted)] mt-1">تعارض مع قواعد العمل وحالة المورد (مثل نفاذ كمية المعدة، أو تجاوز سقف الاستعارات النشطة).</p>
      </div>
      <div class="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
        <span class="font-mono text-blue-600 font-bold" dir="ltr">422 Unprocessable</span>
        <p class="text-xs text-[var(--text-muted)] mt-1">فشل التحقق من صحة بنية البيانات المدخلة (مثل تاريخ بداية لاحق لتاريخ النهاية).</p>
      </div>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC ITEMS CONTRACT ENTRIES (TICKETS 38, 39, 40)
 * ========================================================================= */
export const t13Entries: TopicItem[] = [
  {
    id: 'python-backend-foundation',
    number: '38',
    slug: 'python-backend-foundation',
    title: 'Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب',
    subtitle: 'المستوى اللازم للمشروع: بيئة التشغيل الافتراضية، إدارة الحزم والأسرار، وفصل إعدادات الخادم دون استطراد أكاديمي',
    category: 'architecture',
    categoryName: 'تأسيس الخادم وقاعدة البيانات',
    stageTag: 'المرحلة التطبيقية · تأسيس الخادم',
    summary: 'شرح ما يلزم من Python لبناء خادم مشروع الطالب وفق أفضل الممارسات الهندسية: تهيئة بيئة العمل الافتراضية (Virtual Environment)، إدارة الاعتماديات، عزل أسرار النظام ومتغيرات البيئة في ملف .env، وهيكلة الإعدادات دون استطراد نظري مطول. مع التأكيد الصارم على أن هذه الخطوة إرشاد وبناء لمشروع الطالب، ولا تنشئ Backend للموقع التعليمي نفسه.',
    tags: ['Python 3.12+', 'Virtual Environment', 'venv', 'uv', '.env', 'Secrets Management', 'Backend Foundation', 'BorrowHub'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic38PythonHtml),
    htmlContent: topic38PythonHtml,

    goal: 'تهيئة بيئة Python المعزولة لمشروع الطالب، وإدارة الاعتماديات والنسخ، وضبط متغيرات البيئة والأسرار البرمجية بأمان في ملف .env بعيداً عن مستودع Git، وتجهيز هيكل الخادم للاختيار اللاحق بين أطر العمل.',
    prerequisites: [
      'اكتمال مواصفة المتطلبات SRS ومخططات السلوك (المواضيع 4–17)',
      'واجهات وعقود بيانات الفرونت إند المكتملة في TypeScript (الموضوع 30)',
      'مستودع المشروع المدار عبر Git مع وجود ملف .gitignore (الموضوع 5)'
    ],
    steps: [
      '1. تحقق من تثبيت إصدار Python المدعوم (3.11+ أو 3.12+) وتأكد من عمل المترجم وأمر pip في الطرفية.',
      '2. أنشئ بيئة افتراضية معزولة خاصة بمشروع الخادم (عبر python -m venv .venv أو أداة uv) وفعلها قبل تثبيت أي مكتبة.',
      '3. أنشئ ملف .env لتخزين الأسرار الحساسة (مثل SECRET_KEY وDEBUG وبيانات الخادم) وأضف .env فوراً إلى .gitignore.',
      '4. أنشئ ملف النموذج التوضيحي .env.example محتوياً على أسماء المفاتيح فقط دون قيم حقيقية لتوثيق الإعدادات للفريق.',
      '5. ثبت مكتبة قراءة متغيرات البيئة (مثل python-dotenv وإعدادات Pydantic) واختبر تحميل المتغيرات بنجاح.',
      '6. وثق هيكل مجلد الخادم ومكتباته في ملف docs/BACKEND_SETUP.md مع الالتزام بالحدود التعليمية: هذا التأسيس لمشروعك، ولا ينشئ أي كود backend للموقع التعليمي.'
    ],
    promptRefs: [
      'prompt-04-github-documentation-setup',
      'prompt-27-spec-kit-constitution'
    ],
    outputs: [
      '.env.example',
      'docs/BACKEND_SETUP.md'
    ],
    checklist: [
      'تثبيت بيئة Python معزولة والتأكد من عدم تثبيت الحزم على مستوى النظام العالمي (Global).',
      'فهم المستوى اللازم للمشروع من لغة Python (التعامل مع الأنواع Type Hints، الدوال، الوحدات Modules، الأخطاء).',
      'توليد مفتاح أمان تشفيري عشوائي وعدم كتابة أسرار أو كلمات مرور صلبة داخل الكود (Hardcoded Secrets).',
      'إدراج ملف .env الحقيقي ضمن .gitignore ونشر .env.example فقط للتوثيق.',
      'اختبار قراءة متغيرات البيئة والتحقق من الأنواع المنطقية (مثل تحويل DEBUG=True إلى Boolean سليم).',
      'الالتزام الصارم بعدم إنشاء Backend للموقع التعليمي، وحصر الكود في إعداد بيئة مشروع الطالب.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 38,
  },
  {
    id: 'postgresql-database-setup',
    number: '39',
    slug: 'postgresql-database-setup',
    title: 'PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار',
    subtitle: 'سلسلة الاتصال، عزل بيانات الاعتماد، وإدارة التغييرات عبر آلية ترحيل معتمدة في بديل الإطار الذي تختاره',
    category: 'database',
    categoryName: 'تأسيس الخادم وقاعدة البيانات',
    stageTag: 'المرحلة التطبيقية · تأسيس الخادم',
    summary: 'تجهيز قاعدة بيانات PostgreSQL العلائقية لتلبية متطلبات مشروع الطالب ومخطط ERD المعتمد: بناء سلسلة الاتصال (Connection String)، تأمين اسم المستخدم وكلمة المرور في متغيرات البيئة، وضبط تجميع الاتصالات (Connection Pooling). ويُفصل هنا بوضوح بين مرحلة تخطيط قاعدة البيانات ومرحلة تطبيق مخططها، حيث يُشرح تطبيق المخطط عبر آلية الترحيل (Migrations) المعتمدة في بديل الإطار الذي تختاره لاحقاً.',
    tags: ['PostgreSQL', 'Database Connection', 'Connection String', 'Migrations', 'Connection Pooling', '.env', 'Secrets', 'BorrowHub'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic39PostgreSqlHtml),
    htmlContent: topic39PostgreSqlHtml,

    goal: 'تهيئة قاعدة بيانات PostgreSQL لمشروع الطالب، وتكوين سلسلة الاتصال المؤمّنة عبر متغيرات البيئة، واستيعاب الفصل الهندسي الحاسم بين تخطيط الجداول (ERD/DBML) وتطبيق مخططها الفعلي عبر آلية الترحيل (Migrations) في بديل الإطار الذي تختاره.',
    prerequisites: [
      'مخطط قاعدة البيانات المعتمد docs/ERD.md وملف docs/database.dbml (المواضيع 14–15)',
      'أساسيات إدارة بيئة Python وملف الأسرار .env (الموضوع 38)',
      'استيعاب القيود العلائقية والمفاتيح الأجنبية وتكامل البيانات'
    ],
    steps: [
      '1. أنشئ قاعدة بيانات فارغة ومستخدماً مخصصاً بصلاحيات محدودة على مستوى بيئة التطوير المحلية أو السحابية.',
      '2. كوّن سلسلة الاتصال الموحدة بصيغة URI: postgresql://user:password@host:port/dbname مع دعم تشفير SSL عند الحاجة.',
      '3. احفظ مكونات الاتصال في ملف .env كمتغيرات مفردة (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT) أو في DATABASE_URL.',
      '4. افصل فصلاً تاماً بين التخطيط الورقي للمخطط (المنجز في ERD) وبين تطبيقه؛ لا تنفّذ أوامر DDL اليدوية (CREATE TABLE) في بيئة الإنتاج.',
      '5. تعرّف على آلية الترحيل (Migrations) المعتمدة في "بديل الإطار الذي تختاره": ملفات ترحيل تسلسلية قابلة للتراجع والتطبيق الآلي.',
      '6. وثق مواصفة الاتصال وسياسة إدارة المخطط في docs/DATABASE_CONNECTION_SPEC.md ومطابقتها لجداول BorrowHub الخمسة.'
    ],
    promptRefs: [
      'prompt-12-erd-dbml-mermaid',
      'prompt-13-database-quality-review'
    ],
    outputs: [
      'docs/DATABASE_CONNECTION_SPEC.md',
      'docs/MIGRATION_STRATEGY.md'
    ],
    checklist: [
      'تثبيت محرك PostgreSQL وتشغيل الخدمة بنجاح والتحقق من الاتصال عبر الطرفية (psql).',
      'صياغة سلسلة اتصال مؤمنة تستقي بيانات الدخول من .env دون تسريب كلمات المرور في الشيفرة.',
      'الفصل الصارم والواعي بين تخطيط قاعدة البيانات (موضوع 14-15) وتطبيق المخطط البرمجي عبر Migrations.',
      'فهم أن آلية الترحيل (Migrations) تُدار تلقائياً عبر "بديل الإطار الذي تختاره" (Django أو FastAPI/Alembic) في الموضوع التالي.',
      'حظر تنفيذ تعديلات هيكل الجداول يدوياً ومباشرة على قاعدة البيانات لضمان اتساق تاريخ المشروع البرمجي.',
      'التحقق من عدم بناء أي backend أو اتصال قاعدة بيانات للموقع التعليمي نفسه.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 39,
  },
  {
    id: 'backend-architecture-api-contracts',
    number: '40',
    slug: 'backend-architecture-api-contracts',
    title: 'معمارية Backend وعقود API لمشروع الطالب',
    subtitle: 'اشتقاق مسارات RESTful من متطلبات PRD وجداول ERD، مع توحيد الطلبات والاستجابات والأخطاء ومصفوفة الصلاحيات',
    category: 'architecture',
    categoryName: 'تأسيس الخادم وقاعدة البيانات',
    stageTag: 'المرحلة التطبيقية · تأسيس الخادم',
    summary: 'بناء معمارية الخادم وصياغة وثيقة عقود API الرسمية (API Contracts) قبل كتابة كود التنفيذ. اشتقاق الموارد من PRD وجداول ERD وعقود الفرونت إند في TypeScript، وتحديد هياكل الطلبات والاستجابات وحالات الخطأ الموحدة ومصفوفة الصلاحيات (RBAC). يضمن هذا العقد تكاملاً خالياً من المفاجآت بين الواجهة والخادم دون إنشاء أي Backend للموقع التعليمي.',
    tags: ['API Contracts', 'RESTful API', 'HTTP Status Codes', 'Error Handling', 'RBAC', 'Permissions', 'OpenAPI/Swagger', 'BorrowHub'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic40ApiArchitectureHtml),
    htmlContent: topic40ApiArchitectureHtml,

    goal: 'صياغة معمارية خادم متينة وتوثيق عقود API تفصيلية موحدة تغطي المسارات ومحددات الطلبات وحزم الاستجابات وهياكل الأخطاء الموحدة ومصفوفة الصلاحيات المطبقة على متطلبات المشروع وجداول ERD.',
    prerequisites: [
      'متطلبات المشروع وقواعد العمل المعتمدة في PRD وSRS (المواضيع 3–4)',
      'مخطط الكيانات والعلاقات docs/ERD.md (الموضوع 14)',
      'أنواع وعقود الفرونت إند المعتمدة في TypeScript (الموضوع 30)',
      'جرد شاشات الواجهة docs/SCREEN_INVENTORY.md (الموضوع 20)'
    ],
    steps: [
      '1. استخرج الموارد الأساسية (Resources) من جداول ERD وشاشات الكتالوج والطلبات (مثل /api/v1/equipment و/api/v1/loans).',
      '2. طابق أسماء الحقول والأنواع في عقود API تماماً مع واجهات TypeScript المعتمدة في الفرونت إند (الموضوع 30) لمنع الاختلافات.',
      '3. وحّد هيكل الاستجابة الناجحة (Success Envelope) متضمناً مؤشرات الفهرسة (Pagination) والبيانات التعريفية (Meta).',
      '4. صمم غلاف الأخطاء القياسي (Standardized Error Envelope) متضمناً code, message, details ورموز حالات HTTP المناسبة (400, 401, 403, 404, 422, 500).',
      '5. ابنِ مصفوفة الصلاحيات (Permissions Matrix / RBAC) التي تحدد بدقة العمليات المسموحة لكل دور مستخدم (طالب، موظف، مسؤول).',
      '6. وثق العقد الكامل في docs/API_CONTRACTS.md وصمّم مواصفة OpenAPI 3.0 ليسترشد بها وكيل الذكاء الاصطناعي وبديل الإطار الذي تختاره لاحقاً.'
    ],
    promptRefs: [
      'prompt-09-sequence-diagram',
      'prompt-31-frontend-phased-implementation-plan'
    ],
    outputs: [
      'docs/API_CONTRACTS.md',
      'docs/PERMISSIONS_MATRIX.md'
    ],
    checklist: [
      'اشتقاق كافة مسارات وعمليات API مباشرة من جداول ERD ومتطلبات PRD وجرد الشاشات.',
      'مطابقة حقول الطلبات والاستجابات بنسبة 100% مع واجهات TypeScript المعرفة في فرونت إند المشروع.',
      'توحيد هيكل الأخطاء (Error Envelope) واستخدام رموز حالات HTTP الصحيحة دلالياً.',
      'تحديد مصفوفة الصلاحيات (RBAC) بوضوح وعزل العمليات الإدارية الحساسة (مثل اعتماد الطلبات وتسجيل التلف).',
      'توثيق آليات الفهرسة والترشيح (Pagination, Filtering, Sorting) في استعلامات القوائم.',
      'تأكيد استقلالية العقد عن أي إطار محدد؛ ليكون مرجعاً لبديل الإطار الذي تختاره (Django أو FastAPI).',
      'الالتزام الصارم بعدم إنشاء backend للموقع التعليمي نفسه.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 40,
  },
];
