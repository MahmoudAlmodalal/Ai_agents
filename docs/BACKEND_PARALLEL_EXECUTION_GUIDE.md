# دليل إعداد وتنفيذ الخادم الخلفي ومسار موازاة الوكلاء
## (Backend Architecture, Supabase, Docker & Parallel Agent Workflow)

مرجع هندسي تفصيلي لبناء الواجهة الخلفية (Backend) لمشاريع هندسة البرمجيات بالذكاء الاصطناعي بعد إتمام واجهة المستخدم (Next.js)، مستند إلى المعمارية المعتمدة والتطبيق العملي في **دراسة حالة متجر كاندي لوز (`~/Desktop/متجر حلويات`)**.

---

## 1. خارطة الطريق الهندسية لمرحلة ما بعد الفرونت إند

عند الانتهاء من بناء صفحات وتدفقات الفرونت إند بالبيانات الوهمية (Mock Data)، لا نبدأ بكتابة كود الباك إند عشوائياً. نتبع تسلسلاً هندسياً دقيقاً يمر بـ 4 محطات إلزامية:

```mermaid
flowchart LR
    A["1. تصميم العقود<br/>(API.md + ERD.md)"] --> B["2. تهيئة البيئة والربط<br/>(Supabase + Docker + .env)"]
    B --> C["3. ضبط معمارية Django<br/>(Apps + Layered Pattern)"]
    C --> D["4. مسار الوكلاء المتوازي<br/>(Grill -> Spec -> Tickets -> Worktrees)"]
```

---

## 2. تخطيط وتصميم البيانات والعقود قبل البرمجة (Specs First)

### 2.1 تحديد نوع قاعدة البيانات: لماذا PostgreSQL؟
- **قواعد البيانات العلائقية (Relational / SQL):** مثل PostgreSQL. هي الخيار الأساسي والافتراضي لمشاريع التجارة والأنظمة المالية لأنها تطبق خصائص **ACID** (الذرية، الاتساق، العزل، والاستمرارية)، وتوفر قيود المفاتيح الأجنبية (`Foreign Keys`)، وتدعم المعاملات المقفلة (`select_for_update`) لمنع حالات السباق.
- **قواعد بيانات المستندات (NoSQL / Document):** مثل MongoDB، جيدة للبيانات غير المنظمة أو سريعة التغير الجذري، ولكنها تفتقر للاتساق الحرج المطلوب في الطلبات والمخزون والحسابات.
- **القرار المعتمد:** استخدام **PostgreSQL** لما توفره من اتساق متين ودعم ممتاز للأقفال ومعالجة حقول JSON المتقدمة.

### 2.2 استخدام Supabase كـ Managed PostgreSQL
- توفر **Supabase** خادم PostgreSQL سحابي متكامل ومُدار بالكامل، مما يوفر عناء إدارة وصيانة خوادم قواعد البيانات في المراحل الأولى.
- **مبدأ هندسي حاسم:** نستخدم Supabase هنا **كمستودع بيانات علائقي (PostgreSQL Database)** فقط؛ ولا نعتمد عليها كـ BaaS بديل عن الباك إند، ولا نستدعيها مباشرة من الواجهة الأمامية، بل نجعل خادم **Django REST Framework** هو المالك الحصري لقاعدة البيانات والمسؤول الوحيد عن التهجيرات (`Migrations`) وقواعد العمل.
- **ربط Django مع Supabase:**
  يتم ضبط رابط الاتصال عبر المتغير البيئي `DATABASE_URL`:
  ```bash
  # مثال على رابط Supabase (Direct Connection / Session Pooler)
  DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
  ```
  وفي ملف إعدادات Django (`config/settings.py`):
  ```python
  import dj_database_url

  DATABASES = {
      'default': dj_database_url.config(
          default=os.getenv('DATABASE_URL'),
          conn_max_age=600,
          ssl_require=True
      )
  }
  ```

### 2.3 صياغة مخطط العلاقات (ERD.md)
يجب توثيق العلاقات بدقة قبل فتح أي ملف بايثون، متضمناً:
1. الجداول، الحقول، وأنواعها مع قيود السلامة (`UNIQUE`, `NOT NULL`, `CHECK`).
2. سياسات الحذف (`ON DELETE CASCADE` أو `RESTRICT` أو `SET_NULL`).
3. المعرفات البادئة ذات المعنى (مثل `cat_*`, `prod_*`, `ord_*`) لتسهيل التتبع ومنع تضارب المفاتيح المتسلسلة العشوائية.
4. مصفوفة آلة الحالات (State Machine) للكيانات الحيوية (كالطلبات).

### 2.4 توثيق عقود الـ API (API.md)
تحديد معالم الواجهة الخلفية قبل التنفيذ:
- **التسمية الموحدة (Naming Conventions):** استخدام `camelCase` في الواجهة الأمامية و `snake_case` داخل بايثون، مع تفعيل محول آلي `CamelCaseJSONRenderer` و `CamelCaseJSONParser`.
- **غلاف الاستجابة الموحد (Unified Envelope):**
  ```json
  // نجاح
  {
    "success": true,
    "data": { ... },
    "meta": { "page": 1, "limit": 20, "totalItems": 100, "totalPages": 5 }
  }

  // خطأ
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "بيانات الهاتف غير صحيحة",
      "details": [{ "field": "customerPhone", "message": "رقم الهاتف غير صالح" }]
    }
  }
  ```

---

## 3. إعداد البيئة والحاويات والأسرار (Docker, .env, .gitignore)

### 3.1 إدارة البيئة والأسرار (.env و .env.example)
- **قاعدة الأمان الذهبية:** لا تقم إطلاقاً بحفظ كلمات المرور، أو مفاتيح API، أو `SECRET_KEY` الخاص بـ Django داخل مستودع Git.
- **ملف `.env.example`:** قالب توثيقي نظيف يُرفع إلى Git ليوضح للمطور والوكلاء المتغيرات المطلوبة دون قيم حساسة:
  ```env
  DEBUG=True
  SECRET_KEY=django-insecure-change-this-in-production
  ALLOWED_HOSTS=localhost,127.0.0.1
  CORS_ALLOWED_ORIGINS=http://localhost:3000

  # Supabase / PostgreSQL Connection
  DATABASE_URL=postgresql://postgres:password@localhost:5432/candydb

  # JWT Auth Settings
  JWT_SECRET=replace-with-secure-32-char-secret
  ACCESS_TOKEN_LIFETIME_MINUTES=60
  REFRESH_TOKEN_LIFETIME_DAYS=7
  ```
- **ملف `.gitignore`:** حظر فوري لأي ملف يحوي أسراراً أو مخلفات تشغيل:
  ```gitignore
  # Secrets & Environment
  .env
  .env.local
  *.pem
  *.key

  # Python / Django
  __pycache__/
  *.py[cod]
  *$py.class
  *.sqlite3
  /media/
  /staticfiles/

  # Worktrees & Agent Artifacts
  .worktrees/
  .scratch/
  ```

### 3.2 بيئة Docker و Docker Compose
لضمان تطابق بيئة تشغيل المطور والوكلاء مع الخادم الحقيقي:
```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: candy_postgres
    environment:
      POSTGRES_DB: candydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: candy_redis
    ports:
      - "6379:6379"

  web:
    build: .
    container_name: candy_backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
```

---

## 4. معمارية وتقسيمة Django الصارمة (Layered Architecture)

في المشاريع الاحترافية وتطوير الوكلاء المتوازيين، نرفض نمط Django الافتراضي البسيط (حشو كل شيء في `views.py` و `models.py`)، ونعتمد النمط الطبقي الصارم المطبق في `متجر حلويات`:

```
Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs
```

### 4.1 تفصيل الطبقات ومسؤولياتها

```mermaid
graph TD
    Client[Next.js Client] --> URLs[1. URLs]
    URLs --> Views[2. Views: Thin Coordinators]
    Views --> Perms[3. Permissions: Roles & Auth]
    Views --> Serializers[4. Serializers: Validation & DTO]
    Views --> Selectors[5. Selectors: Read Queries CQS]
    Views --> Services[6. Services: Atomic Business Writes]
    Services --> Policies[7. Policies: Business Rules]
    Services --> Models[8. Models: Schema & Database]
    Selectors --> Models
    Models --> DB[(PostgreSQL / Supabase)]
```

| الطبقة | الملف | المسؤولية الصارمة | ما يُمنع منعه باتاً |
| :--- | :--- | :--- | :--- |
| **Models** | `models.py` | تعريف المخطط، الحقول، المفاتيح الأجنبية، والقيود الصارمة. | لا تضع منطق أعمال معقد أو استعلامات مركبة. |
| **Policies** | `policies.py` | دوال بايثون نقية تفصل في إمكانية الإجراء منطقياً (مثل: هل يسمح للموظف بإلغاء طلب في مرحلة التجهيز؟). | لا تتعامل مع كائنات HTTP Request ولا رموز الجلسات. |
| **Permissions** | `permissions.py` | فحص هوية المشغل وصلاحيات الـ HTTP ودوره (`IsManager`, `IsStaff`). | لا تستبدل سياسات الكيانات بقواعد صلاحيات عامة. |
| **Selectors** | `selectors.py` | استعلامات القراءة فقط (CQS Read)، مع استخدام `select_related` و `prefetch_related` لمنع مشكلة N+1. | **يُمنع أي تعديل أو كتابة (Write) نهائياً**. |
| **Services** | `services.py` | كافة عمليات الكتابة، التحويلات، والتعديلات الحساسة داخل `transaction.atomic()`. | لا تُرجع استجابات HTTP ولا تتعامل مع القوالب. |
| **Views** | `views.py` | وحدات نحيفة (Thin Views) تنسق بين الصلاحيات والـ Serializer وتستدعي Service أو Selector فقط. | لا تضع استعلامات ORM مباشرة ولا منطق تحويل. |
| **Serializers** | `serializers.py` | التحقق من صحة المدخلات وتمثيل البيانات للـ JSON. | لا تقم بإجراء استعلامات معقدة بداخلها. |
| **URLs** | `urls.py` | تسجيل المسارات التصريحية وتوجيهها للـ Views النحيفة. | خالية من أي منطق برمجي. |

### 4.2 لماذا نعتمد هذه التقسيمة في مشاريع AI Agents؟
1. **استقلالية سياق الوكيل (Context Isolation):** عندما تطلب من وكيل تعديل قاعدة عمل، فإنه يعدل `policies.py` فقط دون لمس الـ View أو قاعدة البيانات.
2. **منع أخطاء التزامن (Concurrency Safe):** تجميع العمليات في `services.py` يضمن وضع أقفال ذرية (`select_for_update`) في مكان واحد محكم.
3. **سهولة كتابة الاختبارات الآلية (Testability):** يمكن اختبار الـ Selectors والـ Services كدوال Python معزولة بدون الحاجة لاصطناع طلبات HTTP وهمية في كل فحص.

---

## 5. مراحل تنفيذ الباك إند (Detailed Implementation Phases)

نقسم الباك إند إلى 7 مراحل تنفيذية واضحة ومستقلة:

```mermaid
flowchart TD
    P1["Phase 1: التأسيس والبنية المشتركة<br/>(apps/common)"] --> P2["Phase 2: الحسابات والمصادقة<br/>(apps/accounts)"]
    P2 --> P3["Phase 3: الكتالوج والمنتجات<br/>(apps/catalog)"]
    P3 --> P4["Phase 4: مناطق ورسوم التوصيل<br/>(apps/delivery)"]
    P4 --> P5["Phase 5: الطلبات والحالات والتتبع<br/>(apps/orders)"]
    P5 --> P6["Phase 6: البيانات التجريبية والتغذية<br/>(seed_data)"]
    P6 --> P7["Phase 7: حزم التحقق والاختبارات الشاملة<br/>(Automated QA)"]
```

1. **Phase 1: التأسيس والمشتركات (`apps/common`):**
   - إعداد الإعدادات، الربط مع Supabase، تفعيل `CamelCaseJSONRenderer`، معالج الاستثناءات الموحد `custom_exception_handler`، ونظام الترقيم (`Pagination`).
2. **Phase 2: الحسابات والمصادقة الإدارية (`apps/accounts`):**
   - نموذج `AdminUser` بمستويين (`manager` و `staff`)، وتوثيق JWT، ومسارات تسجيل الدخول والتحقق من الجلسة.
3. **Phase 3: الكتالوج والمنتجات والأوزان (`apps/catalog`):**
   - تصنيفات الأصناف، خيارات الأوزان، أرشفة ناعمة عند الحذف لمنع كسر الطلبات السابقة، وتبديل التوفر الفوري.
4. **Phase 4: مناطق ورسوم التوصيل (`apps/delivery`):**
   - مناطق التوزيع، رسوم التوصيل، والحد الأدنى لكل منطقة.
5. **Phase 5: الطلبات وآلة الحالات وتجميد الأسعار (`apps/orders`):**
   - إدارة دورة حياة الطلب عبر 7 حالات صارمة، جدول تسلسلي آمن `OrderSequence`، مفتاح منع التكرار `Idempotency-Key`، وحماية استعلامات التتبع بمخمد أمني (Throttling).
6. **Phase 6: التغذية التجريبية (`seed_candy_loz`):**
   - أمر إداري `python manage.py seed_candy_loz` يملأ النظام فورياً بحسابات إدارية، كتالوج واقعي، ومناطق توصيل وطلبات تجريبية.
7. **Phase 7: حزمة الاختبارات الآلية والتحقق المتكامل:**
   - تغطية فحص التزامن، مفاتيح التكرار، منع استعلامات N+1، وصحة انتقالات الحالات.

---

## 6. سير عمل تشغيل الوكلاء المتوازيين (Agent Parallel Pipeline)

لكي نضمن أن يعمل وكلاء الذكاء الاصطناعي (AI Coding Agents) بالتوازي وبدقة 100% دون تخريب الكود أو خلق تعارضات، نطبق دورة الحياة الهندسية الصارمة:

```mermaid
flowchart TD
    POC["1. Grill & PoC<br/>(grill-with-docs)"] --> SPEC["2. صياغة المواصفات<br/>(to-spec)"]
    SPEC --> TICKET["3. تفكيك التذاكر<br/>(to-ticket)"]
    TICKET --> BRIEF["4. صياغة موجز الوكيل<br/>(Structured Brief)"]
    BRIEF --> WORKTREE["5. عزل مساحة العمل<br/>(Git Worktree per Ticket)"]
    WORKTREE --> RUN["6. تشغيل الوكيل بالتوازي<br/>(Parallel Implementer)"]
    RUN --> REVIEW["7. مراجعة المهندس والدمج<br/>(Orchestrator Review & Merge)"]
```

### 6.1 خطوات دورة الحياة لكل مرحلة (Phase Lifecycle)
1. **Grill & PoC (`grill-with-docs`):** استجواب الفكرة والقرارات المعمارية وتسجيل القرارات كـ ADRs وتثبيت المصطلحات في `GLOSSARY.md`.
2. **To-Spec (`to-spec`):** كتابة العقود التقنية التفصيلية في `API.md` و `ERD.md` وتحديد الحقول والحالات.
3. **To-Ticket (`to-ticket`):** تقسيم المرحلة إلى تذاكر تنفيذ صغيرة ومستقلة، تركز كل تذكرة على طبقة أو تطبيق واحد (مثل: تذكرة النماذج، تذكرة الخدمات والمحددات، تذكرة الواجهات والمسارات).
4. **صياغة الـ Brief المقيد:** كتابة ملف موجز صارم لكل تذكرة في مجلد `.briefs/`.
5. **إنشاء مساحة عمل منعزلة (Git Worktree):** إنشاء مساحة عمل خاصة لكل تذكرة لمنع أي تضارب بين الوكلاء أثناء عملهم في نفس اللحظة:
   ```bash
   # إنشاء مسار عمل وتفرع مستقل للتذكرة 1
   git worktree add .worktrees/ticket-1 -b feature/backend-ticket-1
   ```
6. **إسناد المهمة للوكيل (Delegate):** تشغيل الوكيل المستقل داخل مسار الـ Worktree المخصص له.
7. **التحقق والمراجعة والدمج:** مراجعة التغييرات واختبارها عبر المهندس البشري، ثم دمج الفرع وحذف مساحة العمل المؤقتة:
   ```bash
   git worktree remove .worktrees/ticket-1
   ```

### 6.2 قالب الـ Brief المعياري الصارم (The 7-Section Brief Template)
كل تذكرة تسند لوكيل يجب أن تتبع صيغة الـ XML الصريحة كما طُبقت في دراسة الحالة:

```markdown
<goal>
الهدف الدقيق للتذكرة في جملة واحدة واضحة.
</goal>

<context>
سياق التذكرة وقواعد العمل المرتبطة بها والمعمارية المعتمدة (مثل CQS أو State Machine).
</context>

<allowed_scope>
قائمة الملفات المسموح للوكيل بإنشائها أو تعديلها حصراً (مثل backend/apps/catalog/services.py).
</allowed_scope>

<forbidden_scope>
الملفات والمجلدات المحظور لمسها إطلاقاً (مثل config/settings.py أو apps/accounts/).
</forbidden_scope>

<instructions>
1. خطوات التنفيذ المحددة والمرقمة بالتفصيل.
2. الالتزام بالمعايير المعمارية وأسماء الدوال المتفق عليها.
3. معالجة حالات الأخطاء والاستثناءات المحددة.
</instructions>

<verification>
أمر التحقق والاختبار الذي يجب أن يشغله الوكيل للتأكد من نجاح عمله:
python manage.py test apps.catalog.tests
</verification>

<contract>
لا تقم بعمل Git Commit إطلاقاً؛ المنسق (Orchestrator) هو من يراجع الفروقات ويدمج التعديلات.
قدّم ملخصاً نهائياً للملفات المعدلة ونتائج الاختبارات.
</contract>
```

### 6.3 حزم المهارات المعتمدة: التنزيل والتثبيت والاستخدام العملي

نعتمد في مسار التطوير على حزمتين مفتوحتي المصدر لتوجيه وتفويض الوكلاء البرمجيين:

#### 1. مهارات مات بوكوك (`mattpocock/skills`)
- **المستودع الرسمي:** [mattpocock/skills على GitHub](https://github.com/mattpocock/skills/tree/main)
- **الهدف الهندسي:** فرض الانضباط الهندسي عبر دورة «Idea-to-Ship»: الانتقال المنهجي من الفكرة إلى استجواب المتطلبات، ثم صياغة المواصفات الفنية، ثم تفكيكها لتذاكر، ثم التنفيذ بأسلوب TDD بدلاً من البرمجة العشوائية.
- **المهارات الأساسية المتضمنة:**
  - `/grill-me` (أو `/grill-with-docs`): مقابلة استجوابية قاسية تكشف الثغرات والافتراضات غير الموثقة وتنتج قرارات معمارية (ADRs).
  - `/to-spec`: تحويل الحوار إلى مواصفة فنية رسمية ومحكمة.
  - `/to-tickets`: تفكيك المواصفة إلى تذاكر رأسية صغيرة (Vertical Slices) ذات تسلسل واعتماديات واضحة.
  - `/implement`: تنفيذ التذاكر تذكرة تلو الأخرى مع كتابة الاختبارات قبل الكود.
  - `/code-review`: مراجعة الكود البرمجي استناداً لمعايير الجودة ومطابقة المواصفة.
- **طريقة التنزيل والتثبيت:**
  ```bash
  # الطريقة 1: التثبيت التلقائي عبر أداة المهارات العالمية (Universal Skills CLI)
  npx skills@latest add mattpocock/skills

  # الطريقة 2: التثبيت داخل Claude Code
  claude plugin install mattpocock-skills@claude-plugins-official

  # الطريقة 3: التنزيل اليدوي في مشروعك أو مسار مهارات الوكيل
  git clone https://github.com/mattpocock/skills.git /tmp/mattpocock-skills
  mkdir -p .agents/skills
  cp -r /tmp/mattpocock-skills/.agents/skills/* .agents/skills/
  ```
- **طريقة الاستخدام في مشروع الطالب:**
  1. ابدأ باستجواب الفكرة: اطلب في الدردشة تنفيذ أمر `/grill-me` لمشروعك والإجابة على الأسئلة لكشف التفاصيل الغائبة.
  2. اطلب صياغة المواصفة: `/to-spec` لكتابة ملفات `API.md` و `ERD.md`.
  3. اطلب تفكيك المهام: `/to-tickets` للحصول على قائمة تذاكر واضحة ذات اعتماديات محددة.
  4. نفّذ بالتتابع: وجّه الوكيل لتنفيذ تذكرة تلو الأخرى عبر `/implement`.

---

#### 2. مهارات التفويض الموازي لعمرو النجدي (`amElnagdy/delegate-skills`)
- **المستودع الرسمي:** [amElnagdy/delegate-skills على GitHub](https://github.com/amElnagdy/delegate-skills)
- **الهدف الهندسي:** تمكين المطور (أو الوكيل الرئيسي) من لعب دور المنسق والمراجع (`Orchestrator & Reviewer`)، وتفويض مهام الكود لأسطول من أدوات الـ CLI المستقلة في الخلفية (`Background Implementers`) مثل: `agy` (Antigravity CLI), `claude`, `codex`, `cursor`, `aider`, `opencode`, `omp`, `vibe`, `qoder`.
- **المكونات الأساسية المتضمنة:**
  - `delegate-setup`: أداة استكشاف آلي لأدوات الـ CLI المثبتة على جهازك وتحديد الصلاحيات وإعداد مسارات العمل (`Lanes` مثل: مسار الميزات `feature`، مسار الاختبارات `tests`، مسار الواجهات `ui`).
  - مهارات `*-delegate` (مثل `agy-delegate`, `claude-delegate`, `codex-delegate`, `cursor-delegate`): نصوص تشغيل آلية (`relay.mjs`) تستقبل ملف الـ Brief المقيد، وتشغّل الوكيل في وضع الخلفية، وتعيد ملخص التعديلات ونتائج الاختبارات كملف `result.json`.
  - معيار الـ Brief بصيغة XML المقيدة: يحدد بصرامة `<allowed_scope>` و `<verification>` ويمنع الوكيل من عمل Git Commit.
- **طريقة التنزيل والتثبيت:**
  ```bash
  # الطريقة 1: التثبيت عبر أداة المهارات العالمية
  npx skills@latest add amElnagdy/delegate-skills

  # الطريقة 2: التنزيل اليدوي ونقل المهارات إلى مجلد التكوين
  git clone https://github.com/amElnagdy/delegate-skills.git /tmp/delegate-skills
  
  # لمستخدمي Antigravity:
  mkdir -p ~/.gemini/config/skills
  cp -r /tmp/delegate-skills/skills/* ~/.gemini/config/skills/

  # لمستخدمي Claude Code:
  mkdir -p ~/.claude/skills
  cp -r /tmp/delegate-skills/skills/* ~/.claude/skills/

  # لمستودع محلي خاص بالمشروع:
  mkdir -p .agents/skills
  cp -r /tmp/delegate-skills/skills/* .agents/skills/
  ```
- **المتطلبات الأساسية (Prerequisites):**
  - بيئة `Node.js 18+` و `git`.
  - أداة CLI واحدة على الأقل مثبتة ومسجلة الدخول (مثل `agy` أو `claude` أو `cursor-agent` أو `aider`).
- **طريقة الاستخدام العملي خطوة بخطوة:**
  1. **اكتشاف الأدوات وإعداد المسارات (Setup Fleet Lanes):**
     استدعِ المهارة في المحادثة بطلب `/delegate-setup`، أو شغّل نص الاكتشاف مباشرة من الطرفية:
     ```bash
     node ~/.gemini/config/skills/delegate-setup/scripts/discover.mjs
     ```
  2. **صياغة ملف الـ Brief للتذكرة:**
     احفظ التوجيه في ملف نصي (مثلاً `.briefs/task-1.txt`) بصيغة XML المقيدة (تحديد `<goal>`, `<allowed_scope>`, `<verification>`).
  3. **عزل مساحة العمل وإطلاق الوكيل (Dispatch via Worktree):**
     ```bash
     # إنشاء مساحة عمل معزولة
     git worktree add .worktrees/task-1 -b feat/task-1

     # تشغيل المنفذ المختار في الخلفية عبر الـ Relay (مثال: Antigravity CLI)
     node ~/.gemini/config/skills/agy-delegate/scripts/relay.mjs \
       --brief .briefs/task-1.txt \
       --cd .worktrees/task-1
     ```
  4. **مراجعة النتائج والدمج (Review, Verify & Merge):**
     يقوم المطور البشري بفحص التعديلات ومطابقتها للمعايير:
     ```bash
     git -C .worktrees/task-1 diff
     python manage.py test
     git merge feat/task-1
     git worktree remove .worktrees/task-1
     ```

---

---

## 7. دراسة الحالة المرجعية الحية: متجر كاندي لوز (`متجر حلويات`)

للاطلاع على نموذج تطبيقي كامل تم تنفيذه بهذا المسار بدقة، ارجع إلى ملفات المشروع المرجعي في:
`/home/mahmoud/Desktop/متجر حلويات`

- **وثيقة معمارية الباك إند:** `backend_plan.md` (المرجع الكامل للمراحل السبع والطبقات).
- **عقود الواجهات:** `API.md` (نموذج العقود بصيغة CamelCase ومصفوفة الردود).
- **مخطط البيانات وآلة الحالات:** `ERD.md` (مخططات Mermaid وحالات الانتقال).
- **مهارات الوكلاء المتخصصة:** `.agents/skills/` (توجيهات الوكلاء لطبقات Django المختلفة).
- **أمثلة الـ Briefs الحقيقية:** `.briefs/` (ملفات توجيه الوكلاء المنفذة فعلياً).
- **مساحات العمل المنعزلة:** `.worktrees/` (أدلة مساحات العمل المتوازية للوكلاء).

---

## 8. مكتبة البرومبتات الهندسية العامة (General Prompts for Any Learner Project)

هذه البرومبتات **عامة وقابلة للتطبيق على أي فكرة مشروع يختاره الطالب** (سواء كان متجر إلكتروني، نظام إعارات، منصة حجوزات، نظام عيادات، أو تطبيق تعليمي).

### جدول متغيرات التخصيص التي يستبدلها الطالب قبل إرسال أي برومبت:
* `[PROJECT_NAME]`: اسم مشروعك الخاص.
* `[DOMAIN_SUMMARY]`: فكرة مشروعك والمجال (مثال: "إدارة إعارة معدات جامعية" أو "حجز استشارات طبية").
* `[TARGET_USERS]`: الأدوار والمستخدمون (مثال: "طالب، مشرف مختبر" أو "مريض، طبيب").
* `[CORE_ENTITIES]`: الكيانات الأساسية للنظام (مثال: "Equipment, Loans, Users" أو "Doctors, Appointments, Patients").
* `[STATE_ENTITY]`: الكيان الرئيسي الذي يمر بحالات متعددة (مثال: "طلب الإعارة LoanRequest" أو "الموعد Appointment" أو "الطلب Order").
* `[APP_NAME]`: اسم التطبيق الداخلي الذي تعمل عليه في Django (مثال: `apps/loans` أو `apps/catalog`).

---

### 8.1 برومبت 1: استكشاف الباك إند وصياغة خطة الفيزات لمشروعك (Backend Phased Plan)
* **الهدف:** توجيه الوكيل لقراءة وثائق مشروعك الحالية في المستودع (`PRD.md` وأنواع الفرونت إند) وتوليد خطة هندسية محكمة مقسمة إلى فيزات دون البدء بكتابة كود ارتجالي.
```text
أنت مهندس معماري أول للواجهة الخلفية (Senior Backend Architect).
أعمل على مشروع [PROJECT_NAME] في مجال [DOMAIN_SUMMARY] للمستخدمين [TARGET_USERS].
اقرأ وثائق مشروعي المتاحة (خاصة PRD.md وعقود الواجهة الأمامية إن وُجدت).

المطلوب:
1. صياغة خطة تنفيذية شاملة للباك إند backend_plan.md مقسمة إلى مراحل متسلسلة (Phases):
   - التأسيس والمشتركات (Common Infrastructure).
   - المستخدمين والمصادقة والصلاحيات (Authentication & RBAC).
   - الكيانات الأساسية للمشروع (Core Domain Entities).
   - العمليات والمعاملات وآلة الحالات (Workflows & State Machines).
   - التغذية التجريبية (Data Seeding).
   - حزمة التحقق والاختبارات الآلية (Verification & QA).
2. الالتزام الصارم بمعمارية Django الطبقية:
   Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs
3. حدد في كل مرحلة: مسؤوليات النماذج، السياسات، استعلامات القراءة (Selectors)، الخدمات الذرية (Services)، والمسارات.
4. لا تكتب أي كود تنفيذي الآن؛ فقط وثق الخطة المعمارية وتوقف لانتظار مراجعتي واعتمادي.
```

---

### 8.2 برومبت 2: حسم نوع قاعدة البيانات وتوليد مخطط العلاقات (ERD & State Machine)
* **الهدف:** توجيه الوكيل لتحليل بيانات مشروعك، وإثبات سبب اختيار PostgreSQL، وتوليد مخطط Mermaid ببادئات واضحة وآلة الحالات لكيان مشروعك الرئيسي.
```text
بصفتك مهندس بيانات أول (Senior Data Engineer) لمشروع [PROJECT_NAME]:
1. حلل متطلبات البيانات لنظام [PROJECT_NAME]، وقارن باختصار بين قواعد البيانات العلائقية SQL (PostgreSQL) وقواعد المستندات NoSQL، واشرح سبب اختيار PostgreSQL لمشروعي من حيث المعاملات المالية/التشغيلية (ACID)، وسلامة العلاقات (Foreign Keys)، وقفل التزامن (select_for_update).
2. أنشئ وثيقة ERD.md متضمنة مخطط Mermaid كامل لكافة الجداول والعلاقات [CORE_ENTITIES].
3. استخدم معرفات بادئة فريدة لكل جدول (مثل usr_*, item_*, req_*) لتسهيل التدقيق والربط.
4. حدد قيود السلامة (Unique, Check, Not Null) وسياسات الحذف المالي/التشغيلي الصارمة (RESTRICT مقابل Soft Delete).
5. ارسم مخطط آلة الحالات (State Machine) لدورة حياة الكيان الرئيسي [STATE_ENTITY] موضحاً شروط كل انتقال والحالات المغلقة نهائياً.
```

---

### 8.3 برومبت 3: صياغة وتوليد عقود الـ API ومطابقة الفرونت إند (API.md)
* **الهدف:** اشتقاق نقاط النهاية من الـ ERD والفرونت إند، وتوحيد التسمية وغلاف الاستجابة لمشروعك.
```text
أنت Backend API Designer لمشروع [PROJECT_NAME].
بناءً على وثيقة ERD.md ومتطلبات النظام:
1. أنشئ ملف API.md يوثق مسارات RESTful لجميع المستخدمين [TARGET_USERS].
2. اعتمد غلاف الاستجابة الموحد (Unified Response Envelope):
   - في حالة النجاح: { "success": true, "data": ..., "meta": ... }
   - في حالة الخطأ: { "success": false, "error": { "code": "...", "message": "...", "details": [...] } }
3. الزم جميع المدخلات والمخرجات بصيغة camelCase لمطابقة واجهة المستخدم مع الحفاظ على كود استجابة HTTP دقيق لكل عملية.
4. وثق مصفوفة الصلاحيات (RBAC Matrix): من يملك حق استدعاء كل Endpoint بحسب أدواره.
```

---

### 8.4 برومبت 4: تجهيز بيئة التشغيل السحابية والمحلية والأسرار (Docker & Supabase & .env)
* **الهدف:** إعداد Docker محلي للبيئة، وربط قاعدة بيانات Supabase المدارة، وحظر تسريب الأسرار.
```text
أنت DevOps Engineer لمشروع [PROJECT_NAME] المبني بـ Django و PostgreSQL:
1. أنشئ ملف docker-compose.yml لتشغيل خادم PostgreSQL محلي ومخزن Redis لتوحيد بيئة عمل المطورين والوكلاء.
2. أنشئ قالب .env.example نظيف وموثق يوضح متغيرات التشغيل الآمنة، وكيفية الاتصال بقاعدة بيانات Supabase المدارة سحابياً عبر متغير DATABASE_URL ومكتبة dj-database-url، مع إعدادات JWT ومفاتيح التطبيق دون وضع أي أسرار حقيقية.
3. أنشئ ملف .gitignore صارم يحظر تماماً رفع .env، ملفات sqlite، مخلفات pycache، ومجلدات مساحات العمل المؤقتة (.worktrees/).
```

---

### 8.5 برومبت 5: بناء البنية المشتركة والمعالجة المركزية (apps/common)
* **الهدف:** تهيئة الـ Middlewares ومعالج الاستثناءات الموحد ونظام الترقيم ومحول camelCase قبل البدء في كتابة أي ميزة برمجية.
```text
أنت Senior Django Developer لمشروع [PROJECT_NAME]:
1. أنشئ تطبيق المشتركات apps/common ليكون الأساس لجميع تطبيقات المشروع اللاحقة.
2. أنشئ معالج استثناءات مخصص custom_exception_handler يضمن إرجاع كافة الأخطاء (ValidationError, Http404, PermissionDenied, وغيرها) في الغلاف الموحد:
   { "success": false, "error": { "code": "...", "message": "...", "details": [...] } }
3. فعّل محول الأسماء التلقائي CamelCaseJSONRenderer و CamelCaseJSONParser لتحويل snake_case إلى camelCase والعكس تلقائياً.
4. أنشئ فئة ترقيم قياسية StandardResultsSetPagination تعيد البيانات مع بيانات الصفحات (page, limit, totalItems, totalPages).
5. لا تكتب أي منطق خاص بالميزات التجارية في هذا التطبيق.
```

---

### 8.6 برومبت 6: توجيه الوكيل لبناء تطبيق محدد وفق معمارية Django الطبقية الصارمة
* **الهدف:** منع الوكيل من النمط السطحي العشوائي (Fat Views) وإلزامه بعزل القراءة عن الكتابة (CQS) في التطبيق المستهدف [APP_NAME].
```text
أنت Senior Django Developer مكلف ببناء التطبيق [APP_NAME] لمشروع [PROJECT_NAME].
تلتزم إلزاماً صارماً بنمط المعمارية التالي:
Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs

المطلوب تنفيذه في [APP_NAME]:
1. النماذج في models.py: الحقول، القيود، والمفاتيح الأجنبية طبقاً لـ ERD.md.
2. المحددات في selectors.py: استعلامات القراءة فقط (CQS Read) مع تفعيل select_related و prefetch_related للقضاء على استعلامات N+1 (يُمنع منعاً باتاً أي تعديل أو كتابة داخل الـ Selectors).
3. الخدمات في services.py: كافة عمليات الإنشاء والتعديل والكتابة (CQS Write) داخل transaction.atomic() مع معالجة الاستثناءات وتطبيق أقفال select_for_update لمنع حالات السباق.
4. السياسات في policies.py: دوال بايثون نقية تفصل في إمكانية الإجراء منطقياً (معزولة تماماً عن كائنات الـ HTTP).
5. الصلاحيات في permissions.py: فحص هوية وأدوار المستخدمين عبر DRF.
6. الـ Views نحيفة تماماً (Thin Views): دورها التنسيق فقط واستدعاء الخدمة أو المحدد وتمرير النتيجة للـ Serializer.
7. تسجيل المسارات في urls.py وتفعيل المحول CamelCaseJSONRenderer.
```

---

### 8.7 برومبت 7: التغذية التجريبية السريعة بالبيانات الواقعية (seed_data)
* **الهدف:** إنشاء أمر إداري في Django يملأ قاعدة البيانات بحسابات وسجلات واقعية لتجربة الواجهة الأمامية فوراً دون إدخال يدوي.
```text
أنت Django Engineer لمشروع [PROJECT_NAME]:
1. أنشئ أمر إدارة مخصص في manage.py باسم seed_[APP_NAME] أو seed_data داخل apps/[APP_NAME]/management/commands/.
2. أنشئ بيانات واقعية منطقية لكيانات [CORE_ENTITIES] تشمل:
   - مستخدمين تجريبيين لكافة الأدوار [TARGET_USERS] بكلمة مرور موحدة واضحة للتطوير.
   - سجلات واقعية تمثل الكيان الرئيسي [STATE_ENTITY] في مختلف حالات آلة الحالات (مكتمل، ملغى، قيد الانتظار، نشط).
3. اجعل الأمر قابلاً لإعادة التشغيل بأمان (Idempotent) باستخدام update_or_create بحيث لا يضاعف السجلات عند تكراره.
4. اعرض ملخصاً مطبوعاً في الطرفية بما تم إنشاؤه من حسابات وبيانات.
```

---

### 8.8 برومبت 8: الاختبارات السلوكية الآلية للتحقق من سلامة المسارات والمعاملات (Automated Tests)
* **الهدف:** كتابة اختبارات آلية تفحص المسارات وعمليات الكتابة الذرية دون تعقيد، مع تزويد الطالب بأمر التشغيل المباشر.
```text
أنت QA & Test Automation Engineer لمشروع [PROJECT_NAME]:
1. اكتب حزمة اختبارات سلوكية لتطبيق [APP_NAME] داخل apps/[APP_NAME]/tests/.
2. غطِّ السيناريوهات التالية:
   - اختبار نجاح القراءة عبر الـ Selectors مع التأكد من عدم وجود استعلامات N+1.
   - اختبار نجاح عملية الكتابة الذرية عبر الـ Service داخل transaction.atomic().
   - اختبار رفض الانتقال غير القانوني في آلة الحالات لـ [STATE_ENTITY] وإرجاع كود الخطأ المناسب في الغلاف الموحد.
   - اختبار مصفوفة الصلاحيات: رفض وصول المستخدم غير المخول (403 Forbidden).
3. اعطني أمر الطرفية الدقيق لتشغيل هذه الاختبارات والتأكد من خروج النتيجة الخضراء (PASS).
```

---

### 8.9 برومبت 9: المراجع الكودي المستقل لفحص الكفاءة والتزامن والثغرات (Code Reviewer Persona)
* **الهدف:** محاكاة مهندس برمجيات مستقل يراجع كود الباك إند ويكتشف مشاكل التزامن أو تسريب الأسرار أو انتهاك الطبقات قبل التسليم.
```text
أنت Principal Software Engineer تقوم بمراجعة كود الباك إند لمشروع [PROJECT_NAME] المبني بـ Django و PostgreSQL:
راجع كود تطبيق [APP_NAME] بدقة صارمة وركز على:
1. هل تحترم كل طبقة مسؤوليتها؟ (هل توجد استعلامات ORM داخل Views أو Serializers؟ هل هناك عمليات كتابة داخل Selectors؟).
2. هل كافة عمليات تعديل [STATE_ENTITY] محمية بـ transaction.atomic() وأقفال select_for_update؟
3. هل هناك أي استعلامات N+1 في استعلامات القراءة؟
4. هل استجابات الخطأ والنجاح تطابق الغلاف الموحد بصيغة camelCase؟
5. هل هناك أي أسرار أو كلمات مرور مكتوبة مباشرة داخل الكود؟
قدّم تقرير مراجعة بجدول يحتوي على: (الملف، السطر، المشكلة المكتشفة، والتصحيح المقترح).
```

---

### 8.10 برومبت 10: قالب الـ Brief المقيد للتنفيذ المتوازي بالوكلاء عبر Git Worktree
* **الهدف:** إسناد تذكرة محددة لوكيل ذكاء اصطناعي ليعمل داخل مساحة عمل معزولة (`.worktrees/`) دون أن يخرب باقي ملفات المشروع أو يتعارض مع وكيل آخر:
```text
نفّذ التذكرة البرمجية التالية بدقة داخل مسار Git Worktree المخصص لك:

<goal>
تنفيذ تذكرة [TICKET_NAME] لتطبيق [APP_NAME] في مشروع [PROJECT_NAME] طبقاً لـ API.md و ERD.md.
</goal>

<context>
نلتزم بمعمارية Django الطبقية الصارمة مع CQS وعزل القراءة عن الكتابة والغلاف الموحد للاستجابات.
</context>

<allowed_scope>
backend/apps/[APP_NAME]/
backend/apps/[APP_NAME]/tests/
</allowed_scope>

<forbidden_scope>
backend/config/
backend/apps/common/
أو أي مجلد خارج نطاق [APP_NAME]
</forbidden_scope>

<instructions>
1. راجع النماذج والمحددات والخدمات والسياسات والواجهات المطلوبة لهذه التذكرة فقط.
2. نفذ الكود بدقة متناهية مع معالجة حالات الأخطاء وتوثيق الاستثناءات.
3. اكتب اختبارات الوحدة السلوكية للتأكد من نجاح العمليات وصحة رموز HTTP.
</instructions>

<verification>
python manage.py test apps.[APP_NAME].tests
</verification>

<contract>
ممنوع عمل Git Commit إطلاقاً؛ قدم ملخصاً بالتعديلات ونتائج الاختبارات والمنسق البشري هو من يراجع ويدمج الفرع.
</contract>
```

---

## 9. كتيب الطوارئ واستعادة التوازن وحل المشكلات الشائعة (Troubleshooting Playbook)

عندما ينحرف أحد الوكلاء عن المعمارية الطبقية أو يواجه بيئة التشغيل أخطاء اتصال أو CORS أو تضارب تهجيرات، لا تعيد بناء المشروع من الصفر؛ استخدم أدوات التدخل السريع المعتمدة:

### 9.1 برومبت إعادة الضبط المعماري الصارم (Emergency Architecture Reset)
إذا وضع الوكيل استعلامات داخل الـ Views أو كتب داخل الـ Selectors:
```text
توقف فوراً! (HALT IMMEDIATELY)
لقد انحرفت عن المعمارية الطبقية الصارمة المعتمدة لمشروع [PROJECT_NAME].
1. احذف أي استعلامات أو تعديلات من داخل views.py فوراً وانقل القراءة إلى selectors.py.
2. انقل كافة عمليات التعديل والإنشاء إلى services.py داخل transaction.atomic().
3. التزم بكون الـ View مقتصرة على الاستدعاء والتوجيه للغلاف الموحد بصيغة camelCase.
```

### 9.2 حل أشهر 5 أخطاء بيئة وتشغيل (Top 5 Runtime Fixes)
راجع جدول الاستجابة السريعة والبرومبتات العلاجية في:
[دليل برومبتات الباك إند الميسرة docs/STUDENT_BACKEND_PROMPTS_GUIDE.md#كتيب-الطوارئ-واستعادة-التوازن-عند-انحراف-الوكيل-emergency-reset--troubleshooting-playbook](file:///home/mahmoud/Desktop/كورس/Ai_agents/docs/STUDENT_BACKEND_PROMPTS_GUIDE.md#كتيب-الطوارئ-واستعادة-التوازن-عند-انحراف-الوكيل-emergency-reset--troubleshooting-playbook)
ويشمل الحلول الفورية لـ:
1. فشل اتصال قاعدة البيانات (`OperationalError`).
2. حظر طلبات المتصفح (`CORS Policy`).
3. تضارب ملفات التهجير الموازية (`Migration Conflicts`).
4. اختناق استعلامات N+1 وتكرار الاستعلامات.
5. أخطاء رفض الصلاحيات والتوكن (`403 Forbidden`).



