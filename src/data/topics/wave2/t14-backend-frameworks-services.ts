import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 41: DJANGO BACKEND & MIGRATIONS (بديل مستقل 1)
 * Sequence Position: 41
 * ========================================================================= */
export const topic41DjangoHtml = `
<section id="topic-41-django" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · تطوير الخادم الخلفي</span>
    <span class="step-pill">بديل مستقل 1 · خادم متكامل</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1)</h2>
      <div class="step-subtitle">إعداد خادم Django REST Framework، وتطبيق نماذج البيانات المشتقة من ERD، وإدارة التهجيرات الأصلية (Migrations)</div>
    </div>
  </div>

  <!-- Alternative Selection Banner -->
  <div class="callout tip my-6">
    <div class="callout-header">
      <span class="callout-icon">⚖️</span>
      <span>قرار المعمارية: بديلان مستقلان لخادم المشروع (Django أو FastAPI)</span>
    </div>
    <p class="leading-7">
      يمثل <strong>Django</strong> (الموضوع 41) و<strong>FastAPI</strong> (الموضوع 42) بديلين تقنيين مستقلين لتنفيذ خادم مشروعك.
      <strong>يختار الطالب إطار عمل واحد فقط لبناء خادم مشروعه، ولا يلزم إطلاقاً بإعادة بناء الخادم مرتين.</strong>
      إذا كان خيارك المعماري المعتمد هو Django، أكمل هذا الموضوع ثم انتقل مباشرة للمصادقة (الموضوع 43) متجاوزاً تطبيق FastAPI.
      وإذا اخترت FastAPI، يمكنك <a href="/learn/fastapi-backend" class="text-[var(--accent)] underline font-bold">الانتقال مباشرة لموضوع FastAPI (الموضوع 42)</a>.
    </p>
  </div>

  <!-- 1. Why Django: Batteries-Included Philosophy -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. فلسفة Django المتكاملة (Batteries-Included): متى يكون الخيار الأمثل؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يتميز إطار <strong>Django</strong> بفلسفة "البطاريات المدمجة"؛ فهو يوفر منظومة عمل كاملة ومجربة في أكبر المشروعات العالمية منذ أكثر من 15 عاماً. لا تحتاج مع Django للبحث عن مكتبات خارجية للمصادقة، أو أداة مستقلة للتهجيرات، أو كتابة لوحة تحكم إدارية من الصفر:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>محرك ORM العريق:</strong> تحويل مخططات الكيانات والعلاقات إلى كائنات برمجية دون كتابة SQL يدوي، مع نظام متقدم لحماية الاستعلامات ضد ثغرات SQL Injection.</li>
      <li><strong>نظام التهجيرات الأصيل (Native Migrations):</strong> أداة تعقب آلية لفروقات النماذج ومزامنتها لحظياً مع قاعدة بيانات PostgreSQL بدقة متناهية.</li>
      <li><strong>لوحة تحكم المشرف الجاهزة (Django Admin):</strong> توليد فوري لواجهات إدارة البيانات بمجرد تسجيل النماذج، مما يمنحك أداة تحقق فورية من بيانات النظام أثناء التطوير.</li>
      <li><strong>الأمان الافتراضي الصارم:</strong> حماية مدمجة ضد هجمات CSRF و XSS و Clickjacking، ونظام تشفير قياسي لكلمات المرور.</li>
    </ul>
  </div>

  <!-- 2. Project Architecture & Modular Apps -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. معمارية المشروع وتقسيم التطبيقات (Modular Django Apps)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يقسم مشروع Django النظيف إلى مجلد إعدادات مركزي (مثل <code>config/</code>) ومجموعة تطبيقات وظيفية معزولة (Apps) تحقق مبدأ المسؤولية المفردة. في دراسة الحالة المرافقة، نقسم الخادم إلى تطبيقات واضحة:
    </p>
    <div class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 my-4 font-mono text-sm leading-6 text-[var(--text-main)]" dir="ltr">
backend/<br />
├── manage.py<br />
├── config/<br />
│   ├── __init__.py<br />
│   ├── settings.py          # إعدادات PostgreSQL، DRF، JWT، والمتغيرات السرية<br />
│   ├── urls.py              # مسارات API المركزية<br />
│   └── wsgi.py<br />
├── apps/<br />
│   ├── users/               # نموذج المستخدم والأدوار والصلاحيات<br />
│   ├── equipment/           # كتالوج الأجهزة والتصنيفات وحالات الصيانة<br />
│   └── loans/               # طلبات الإعارة، منطق التحقق، والمعاملات الذرية<br />
└── requirements.txt
    </div>
  </div>

  <!-- SVG Architecture Diagram: Django Flow -->
  <div class="diagram-box my-8 bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)]">
    <div class="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center justify-between">
      <span>مخطط معمارية خادم Django ونظام التهجيرات الأصيل</span>
      <span class="text-xs text-[var(--accent)] font-mono">Django Backend Architecture</span>
    </div>
    <svg viewBox="0 0 800 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Django Architecture Diagram">
      <defs>
        <marker id="arrow-django" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent, #059669)" />
        </marker>
      </defs>
      <!-- Client -->
      <rect x="20" y="80" width="130" height="70" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="85" y="115" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">العميل / الواجهة</text>
      <text x="85" y="133" text-anchor="middle" fill="var(--text-muted)" font-size="11">Next.js Client</text>

      <!-- URL Router -->
      <path d="M 150 115 L 200 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-django)" />
      <rect x="210" y="80" width="130" height="70" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="275" y="115" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">URLs & Views</text>
      <text x="275" y="133" text-anchor="middle" fill="var(--text-muted)" font-size="11">DRF ViewSets</text>

      <!-- Models & Services -->
      <path d="M 340 115 L 390 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-django)" />
      <rect x="400" y="80" width="140" height="70" rx="10" fill="var(--bg-main)" stroke="var(--accent)" stroke-width="2" />
      <text x="470" y="112" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">Django Models</text>
      <text x="470" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">& Native ORM</text>

      <!-- Migrations Engine -->
      <rect x="400" y="170" width="140" height="50" rx="8" fill="var(--bg-card)" stroke="var(--border-subtle)" stroke-width="1.5" stroke-dasharray="4" />
      <text x="470" y="193" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="bold">makemigrations</text>
      <text x="470" y="209" text-anchor="middle" fill="var(--accent)" font-size="10">django_migrations</text>
      <path d="M 470 150 L 470 170" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3" />

      <!-- PostgreSQL Database -->
      <path d="M 540 115 L 590 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-django)" />
      <rect x="600" y="80" width="160" height="70" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="680" y="112" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">PostgreSQL DB</text>
      <text x="680" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">جداول ERD + العلاقات</text>

      <!-- Django Admin Tool -->
      <rect x="210" y="15" width="130" height="45" rx="8" fill="var(--bg-card)" stroke="var(--border-subtle)" stroke-width="1" />
      <text x="275" y="42" text-anchor="middle" fill="var(--text-muted)" font-size="11">Django Admin Dashboard</text>
      <path d="M 275 60 L 275 80" stroke="var(--border-subtle)" stroke-width="1.5" />
    </svg>
  </div>

  <!-- 3. Converting ERD to Django Models -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. تحويل مخطط ERD إلى نماذج Django Models دقيقة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تترجم كيانات <code>docs/ERD.md</code> إلى فئات ترث من <code>models.Model</code>. نطبق القيود العلائقية وفهارس الأداء والحقول النصية والخيارات المحددة بصرامة لمنع أي بيانات فاسدة في قاعدة البيانات:
    </p>

    <!-- Code Block: Django Models -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python · apps/equipment/models.py & apps/loans/models.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود نماذج Django">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>import uuid
from django.db import models
from django.conf import settings

class EquipmentCategory(models.Model):
    """تصنيفات المعدات المشتقة من ERD"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120, unique=True, verbose_name="اسم التصنيف")
    slug = models.SlugField(max_length=140, unique=True, db_index=True)
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "equipment_categories"
        verbose_name_plural = "Equipment Categories"

    def __str__(self):
        return self.name

class Equipment(models.Model):
    """الأصول والمعدات القابلة للإعارة"""
    STATUS_CHOICES = [
        ('available', 'متاح'),
        ('borrowed', 'معار'),
        ('maintenance', 'تحت الصيانة'),
        ('retired', 'خارج الخدمة'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(EquipmentCategory, on_delete=models.PROTECT, related_name="items")
    name = models.CharField(max_length=200, db_index=True)
    model_number = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available', db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "equipments"
        indexes = [
            models.Index(fields=['status', 'category']),
        ]

    def __str__(self):
        return f"{self.name} ({self.serial_number})"
</code></pre>
    </div>
  </div>

  <!-- 4. Native Migrations Mechanism -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. آلية التهجيرات الأصلية (Django Native Migrations)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا تحتاج في Django لأي أداة إضافية للتهجيرات؛ فنظام Migrations مدمج أصيل في نواة الإطار، ويعمل عبر مرحلتين حاسمتين:
    </p>
    <div class="space-y-4 my-4">
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-1">المرحلة الأولى: توليد ملفات التهجير (makemigrations)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          يقارن Django النماذج المكتوبة بالشيفرة مع حالة ملفات التهجيرات السابقة، ويولد ملفات Python نقية داخل مجلد <code>migrations/</code> تحتوي على عمليات صريحة (مثل <code>CreateModel</code> أو <code>AddField</code>).
        </p>
        <code class="block mt-2 text-xs bg-[var(--bg-main)] p-2 rounded text-[var(--accent)] font-mono" dir="ltr">python manage.py makemigrations</code>
      </div>
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-1">المرحلة الثانية: تطبيق التهجيرات على PostgreSQL (migrate)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          يترجم Django ملفات التهجيرات إلى أوامر SQL قياسية (DDL) وينفذها داخل معاملات ذرية على PostgreSQL، مع تسجيل كل ملف تم تطبيقه في جدول النظام <code>django_migrations</code> لمنع تكرار التنفيذ.
        </p>
        <code class="block mt-2 text-xs bg-[var(--bg-main)] p-2 rounded text-[var(--accent)] font-mono" dir="ltr">python manage.py migrate</code>
      </div>
    </div>

    <div class="callout warning my-6">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>القاعدة الذهبية لإدارة التهجيرات في Django</span>
      </div>
      <p class="leading-7">
        لا تعدل أبداً ملفات التهجيرات التي طُبقت بالفعل على بيئة الإنتاج أو شاركها زملاؤك في الفريق؛ إذا أردت تعديل حقل، أجرِ التعديل في النموذج البرمجي (Model) وولّد تهجيراً جديداً تالياً. احفظ كافة ملفات <code>migrations/*.py</code> في مستودع Git وتجاهل فقط ملفات التخزين المؤقت <code>__pycache__</code>.
      </p>
    </div>
  </div>

  <!-- 5. BorrowHub Boundary Note -->
  <div class="callout info my-6">
    <div class="callout-header">
      <span class="callout-icon">📌</span>
      <span>تنبيه منهجي: قواعد BorrowHub دراسة حالة إرشادية وليست قيوداً لمشروعك</span>
    </div>
    <p class="leading-7">
      نماذج الأجهزة وفئات التصنيف المعروضة أعلاه مأخوذة من دراسة حالة نظام BorrowHub لإعارة المعدات الجامعية.
      <strong>هذه القواعد والحقول ليست متطلبات إلزامية لمشروع الطالب الشخصي.</strong>
      عليك استخراج نماذج خادم مشروعك وحقولها وعلاقاتها مباشرة من وثيقة <code>docs/ERD.md</code> ومواصفة SRS الخاصة بفكرتك المعتمدة.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 42: FASTAPI BACKEND & ALEMBIC MIGRATIONS (بديل مستقل 2)
 * Sequence Position: 42
 * ========================================================================= */
export const topic42FastApiHtml = `
<section id="topic-42-fastapi" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · تطوير الخادم الخلفي</span>
    <span class="step-pill">بديل مستقل 2 · خادم فائق السرعة وغير متزامن</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2)</h2>
      <div class="step-subtitle">إعداد خادم غير متزامن (Async)، وتحديد مخططات Pydantic ونماذج SQLAlchemy، وإدارة التهجيرات باستخدام Alembic</div>
    </div>
  </div>

  <!-- Alternative Selection Banner -->
  <div class="callout tip my-6">
    <div class="callout-header">
      <span class="callout-icon">⚖️</span>
      <span>قرار المعمارية: بديلان مستقلان لخادم المشروع (FastAPI أو Django)</span>
    </div>
    <p class="leading-7">
      يمثل <strong>FastAPI</strong> البديل التقني الثاني المستقل لبناء خادم مشروعك.
      <strong>إذا اخترت FastAPI، فهذا هو مسارك البرمجي؛ لست بحاجة لبناء الخادم بـ Django في الموضوع 41 ولن تبني الخادم مرتين.</strong>
      بمجرد إنجاز هذا الموضوع، انتقل مباشرة إلى المصادقة والصلاحيات (الموضوع 43).
      وإذا كنت قد نفذت خادمك بالفعل بـ Django في الموضوع السابق، يمكنك <a href="/learn/auth-permissions" class="text-[var(--accent)] underline font-bold">الانتقال مباشرة إلى موضوع المصادقة (الموضوع 43)</a>.
    </p>
  </div>

  <!-- 1. Why FastAPI: Async Performance & OpenAPI -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. فلسفة FastAPI الحديثة: الأداء غير المتزامن وتوثيق OpenAPI التلقائي</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يعد <strong>FastAPI</strong> إطاراً حديثاً مبنياً على معيار ASGI السريع، ومصمماً للاستفادة الكاملة من تلميحات الأنواع في بايثون (Python Type Hints). يتميز بثلاث ركائز هندسية قوية:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>الأداء غير المتزامن الأصيل (Native Async I/O):</strong> كفاءة فائقة في معالجة آلاف الطلبات المتزامنة (Concurrent Requests) دون حجب خيوط المعالجة، بفضل محرك Starlette و <code>async/await</code>.</li>
      <li><strong>التحقق الصارم عبر Pydantic:</strong> فحص تلقائي وفوري لبنية البيانات المدخلة في طلبات HTTP، وتحويل الأنواع، وإرجاع أخطاء التحقق بصيغة JSON واضحة ومقروءة.</li>
      <li><strong>التوثيق التفاعلي الحي (Interactive API Docs):</strong> توليد فوري لمعياري OpenAPI و JSON Schema مع واجهتي Swagger UI و ReDoc بمجرد كتابة المسارات، دون أي إعداد يدوي.</li>
    </ul>
  </div>

  <!-- 2. Pydantic Schemas vs SQLAlchemy Models -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. الفصل المعماري الحاسم: مخططات Pydantic مقابل نماذج SQLAlchemy</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في FastAPI، من الضروري هندسياً الفصل التام بين طبقتين مختلفتين للبيانات:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
          <span class="text-base">📋</span>
          <span>مخططات التحقق (Pydantic Schemas)</span>
        </h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          تعرف شكل عقود طلبات الـ HTTP (Request Body) واستجاباتها (Response DTOs). مسؤولة عن التحقق من صحة الإدخال، حجب الحقول الحساسة (مثل كلمات المرور)، والتحويل بين JSON وكائنات بايثون.
        </p>
      </div>
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
          <span class="text-base">🗄️</span>
          <span>نماذج قاعدة البيانات (SQLAlchemy ORM)</span>
        </h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          تعرف جداول PostgreSQL الفعلية، وأنواع الأعمدة، والمفاتيح الأساسية والأجنبية، والقيود الفهارس. تمثل الحالة الدائمة المخزنة في قاعدة البيانات.
        </p>
      </div>
    </div>

    <!-- Code Block: FastAPI Schemas & Models -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python · app/schemas/equipment.py & app/models/equipment.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود FastAPI">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>import uuid
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import Column, String, ForeignKey, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

# ============================================================================
# 1. SQLAlchemy ORM Model (Database Representation)
# ============================================================================
class EquipmentModel(Base):
    __tablename__ = "equipments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False, index=True)
    serial_number = Column(String(100), unique=True, nullable=False)
    status = Column(String(20), default="available", nullable=False, index=True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("equipment_categories.id", ondelete="RESTRICT"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (
        Index("ix_equipments_status_category", "status", "category_id"),
    )

# ============================================================================
# 2. Pydantic Schemas (API Data Contract Validation)
# ============================================================================
class EquipmentCreateSchema(BaseModel):
    name: str = Field(..., min_length=3, max_length=200)
    serial_number: str = Field(..., min_length=2, max_length=100)
    category_id: uuid.UUID

class EquipmentResponseSchema(BaseModel):
    id: uuid.UUID
    name: str
    serial_number: str
    status: str
    category_id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
</code></pre>
    </div>
  </div>

  <!-- SVG Architecture Diagram: FastAPI Flow -->
  <div class="diagram-box my-8 bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)]">
    <div class="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center justify-between">
      <span>مخطط معمارية FastAPI والتهجيرات المستقلة مع Alembic</span>
      <span class="text-xs text-[var(--accent)] font-mono">FastAPI + Alembic Flow</span>
    </div>
    <svg viewBox="0 0 800 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FastAPI Architecture Diagram">
      <defs>
        <marker id="arrow-fastapi" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent, #059669)" />
        </marker>
      </defs>
      <!-- Request -->
      <rect x="20" y="80" width="130" height="70" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="85" y="112" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">طلب HTTP</text>
      <text x="85" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">JSON Payload</text>

      <!-- FastAPI & Pydantic -->
      <path d="M 150 115 L 200 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-fastapi)" />
      <rect x="210" y="80" width="140" height="70" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="280" y="112" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">FastAPI + Pydantic</text>
      <text x="280" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">Type Validation</text>

      <!-- AsyncSession & SQLAlchemy -->
      <path d="M 350 115 L 400 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-fastapi)" />
      <rect x="410" y="80" width="140" height="70" rx="10" fill="var(--bg-main)" stroke="var(--accent)" stroke-width="2" />
      <text x="480" y="112" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">SQLAlchemy ORM</text>
      <text x="480" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">AsyncSession (asyncpg)</text>

      <!-- Alembic Migrations Engine -->
      <rect x="410" y="170" width="140" height="50" rx="8" fill="var(--bg-card)" stroke="var(--border-subtle)" stroke-width="1.5" stroke-dasharray="4" />
      <text x="480" y="193" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="bold">Alembic Migration</text>
      <text x="480" y="209" text-anchor="middle" fill="var(--accent)" font-size="10">alembic_version table</text>
      <path d="M 480 150 L 480 170" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3" />

      <!-- PostgreSQL Database -->
      <path d="M 550 115 L 600 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-fastapi)" />
      <rect x="610" y="80" width="160" height="70" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="690" y="112" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">PostgreSQL DB</text>
      <text x="690" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">مخطط الجداول المشتق</text>

      <!-- Swagger / OpenAPI docs -->
      <rect x="210" y="15" width="140" height="45" rx="8" fill="var(--bg-card)" stroke="var(--border-subtle)" stroke-width="1" />
      <text x="280" y="42" text-anchor="middle" fill="var(--text-muted)" font-size="11">Swagger UI /docs</text>
      <path d="M 280 60 L 280 80" stroke="var(--border-subtle)" stroke-width="1.5" />
    </svg>
  </div>

  <!-- 3. Migrations Mechanism: Alembic -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. آلية التهجيرات المناسبة للبديل: Alembic وإدارة تغييرات المخطط</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      على عكس Django، لا يقدم FastAPI نظام تهجيرات مدمج؛ لأن فلسفته تقوم على كونه إطاراً مصغراً (Microframework). الأداة القياسية المعتمدة لإدارة تهجيرات SQLAlchemy هي <strong>Alembic</strong>:
    </p>
    <div class="space-y-4 my-4">
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-1">الخطوة 1: تهيئة Alembic وربط الـ Metadata</h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          ننشئ بيئة التهجيرات ونربط <code>target_metadata = Base.metadata</code> في ملف <code>alembic/env.py</code> لكي يستطيع Alembic قراءة كافة النماذج المعلنة:
        </p>
        <code class="block mt-2 text-xs bg-[var(--bg-main)] p-2 rounded text-[var(--accent)] font-mono" dir="ltr">alembic init alembic</code>
      </div>

      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-1">الخطوة 2: التوليد التلقائي لملف التهجير (Autogenerate Revision)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          يقارن Alembic نماذج بايثون بالجداول الحالية في PostgreSQL، ويولد كود التهجير (وظيفتي <code>upgrade()</code> و <code>downgrade()</code>):
        </p>
        <code class="block mt-2 text-xs bg-[var(--bg-main)] p-2 rounded text-[var(--accent)] font-mono" dir="ltr">alembic revision --autogenerate -m "create equipment tables"</code>
      </div>

      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-1">الخطوة 3: تطبيق التغييرات على قاعدة البيانات (Upgrade)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          تنفيذ دوال الترقية ومزامنة الجداول، مع تسجيل رقم النسخة في جدول <code>alembic_version</code>:
        </p>
        <code class="block mt-2 text-xs bg-[var(--bg-main)] p-2 rounded text-[var(--accent)] font-mono" dir="ltr">alembic upgrade head</code>
      </div>
    </div>
  </div>

  <!-- 4. Case Study Boundary Note -->
  <div class="callout info my-6">
    <div class="callout-header">
      <span class="callout-icon">📌</span>
      <span>تنبيه منهجي: أمثلة BorrowHub إرشادية وليست إلزامية لمشروع الطالب</span>
    </div>
    <p class="leading-7">
      مخططات ونماذج المعدات والتصنيفات المعروضة أعلاه تمثل دراسة حالة لنظام BorrowHub.
      <strong>قواعد BorrowHub وحقولها ليست متطلبات مفروضة على مشروعك الخاص.</strong>
      قم ببناء نماذج SQLAlchemy ومخططات Pydantic بما يطابق تحديداً وثيقة ERD وSRS الخاصة بمنتجك المستقل.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 43: AUTHENTICATION & PERMISSIONS (المصادقة والصلاحيات)
 * Sequence Position: 43
 * ========================================================================= */
export const topic43AuthPermissionsHtml = `
<section id="topic-43-auth-permissions" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · تطوير الخادم الخلفي</span>
    <span class="step-pill">المصادقة والصلاحيات · التحكم بالوصول</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC)</h2>
      <div class="step-subtitle">تطبيق تسجيل الدخول بـ JWT، وتشفير كلمات المرور، وتحديد صلاحيات الأدوار وحماية نقاط النهاية وفق إطار الخادم المختار</div>
    </div>
  </div>

  <!-- 1. Authentication vs Authorization -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. التفريق الهندسي الحاسم: المصادقة (من أنت؟) مقابل الصلاحيات (ماذا يحق لك؟)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يخلط الكثير من المطورين المبتدئين بين المصادقة والتفويض؛ ولتأمين خادم مشروعك بشكل احترافي، يجب فصل المفهومين معمارياً:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
          <span class="text-base">🔑</span>
          <span>المصادقة (Authentication)</span>
        </h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          التحقق الصارم من هوية المستخدم عند تسجيل الدخول عبر البريد وكلمة المرور المشفرة (باستخدام خوارزمية تجزئة غير قابلة للعكس مثل <strong>Argon2</strong> أو <strong>Bcrypt</strong>)، وإصدار رمز وصول رقمي مشفر (JWT Token).
        </p>
      </div>
      <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl">
        <h4 class="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
          <span class="text-base">🛡️</span>
          <span>الصلاحيات والتحكم بالوصول (Authorization / RBAC)</span>
        </h4>
        <p class="text-sm text-[var(--text-muted)] leading-6">
          تحديد الإجراءات والبيانات المسموح للمستخدم الموثق الوصول إليها، استناداً إلى مصفوفة الأدوار (Role-Based Access Control) أو ملكية المورد (Object-Level Ownership Permissions).
        </p>
      </div>
    </div>
  </div>

  <!-- 2. JWT Architecture: Access vs Refresh Tokens -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. معمارية رموز JWT: رمز الوصول السريع (Access) ورمز التجديد (Refresh)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تعتمد التطبيقات الحديثة المنفصلة (Decoupled Next.js + Python Backend) على معيار <strong>JSON Web Token (JWT)</strong> بنظام التوكن الثنائي لتقليل الحمل على قاعدة البيانات وتحقيق أقصى درجات الأمان:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>رمز الوصول (Access Token):</strong> قصير الأجل (15 دقيقة عادةً)، يحتوي على معرّف المستخدم ودوره مشفراً في الحمولة (Payload). يرسل في ترويسة <code>Authorization: Bearer &lt;token&gt;</code> مع كل طلب، ويتحقق منه الخادم رياضياً دون الحاجة للاستعلام عن قاعدة البيانات في كل نقرة.</li>
      <li><strong>رمز التجديد (Refresh Token):</strong> طويل الأجل (7 أيام إلى 30 يوماً)، يُستخدم حصراً في نقطة النهاية <code>/api/auth/refresh</code> لإصدار Access Token جديد دون مطالبة المستخدم بإعادة كتابة كلمة المرور.</li>
    </ul>
  </div>

  <!-- SVG Sequence Diagram: Authentication Flow -->
  <div class="diagram-box my-8 bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)]">
    <div class="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center justify-between">
      <span>مخطط تسلسل تدفق المصادقة وفحص الصلاحيات (JWT + RBAC Flow)</span>
      <span class="text-xs text-[var(--accent)] font-mono">Authentication & Authorization Sequence</span>
    </div>
    <svg viewBox="0 0 800 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Auth Sequence Diagram">
      <defs>
        <marker id="arrow-auth" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent, #059669)" />
        </marker>
      </defs>
      <!-- Lifeline Headers -->
      <rect x="50" y="20" width="120" height="35" rx="6" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="1.5" />
      <text x="110" y="42" text-anchor="middle" fill="var(--text-main)" font-size="12" font-weight="bold">العميل (Frontend)</text>

      <rect x="340" y="20" width="120" height="35" rx="6" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="1.5" />
      <text x="400" y="42" text-anchor="middle" fill="var(--text-main)" font-size="12" font-weight="bold">الخادم (Backend API)</text>

      <rect x="630" y="20" width="120" height="35" rx="6" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="1.5" />
      <text x="690" y="42" text-anchor="middle" fill="var(--text-main)" font-size="12" font-weight="bold">قاعدة البيانات (DB)</text>

      <!-- Lifelines -->
      <line x1="110" y1="55" x2="110" y2="260" stroke="var(--border-subtle)" stroke-width="1.5" stroke-dasharray="4" />
      <line x1="400" y1="55" x2="400" y2="260" stroke="var(--border-subtle)" stroke-width="1.5" stroke-dasharray="4" />
      <line x1="690" y1="55" x2="690" y2="260" stroke="var(--border-subtle)" stroke-width="1.5" stroke-dasharray="4" />

      <!-- Step 1: Login Request -->
      <path d="M 110 85 L 390 85" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-auth)" />
      <text x="250" y="78" text-anchor="middle" fill="var(--text-main)" font-size="11">1. POST /api/auth/login (email + password)</text>

      <!-- Step 2: DB verify hash -->
      <path d="M 400 115 L 680 115" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-auth)" />
      <text x="545" y="108" text-anchor="middle" fill="var(--text-main)" font-size="11">2. استعلام المستخدم وفحص تجزئة كلمة المرور</text>

      <!-- Step 3: DB user returned -->
      <path d="M 690 145 L 410 145" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="3" marker-end="url(#arrow-auth)" />
      <text x="550" y="138" text-anchor="middle" fill="var(--text-muted)" font-size="11">3. مطابقة صالحة + بيانات الدور (Role)</text>

      <!-- Step 4: Issue JWT Tokens -->
      <path d="M 400 175 L 120 175" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-auth)" />
      <text x="260" y="168" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="bold">4. إرجاع Access + Refresh Tokens</text>

      <!-- Step 5: Protected Request with Bearer Token -->
      <path d="M 110 215 L 390 215" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-auth)" />
      <text x="250" y="208" text-anchor="middle" fill="var(--text-main)" font-size="11">5. طلب محمي: Bearer &lt;access_token&gt;</text>

      <!-- Step 6: RBAC Check -->
      <rect x="360" y="225" width="80" height="25" rx="4" fill="var(--bg-card)" stroke="var(--accent)" stroke-width="1" />
      <text x="400" y="242" text-anchor="middle" fill="var(--accent)" font-size="10">فحص الصلاحية (RBAC)</text>
    </svg>
  </div>

  <!-- 3. Implementation for Both Framework Alternatives -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. التطبيق العملي للمصادقة والصلاحيات وفق الإطار الذي اخترته</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      طبق الشيفرة البرمجية المطابقة حصراً للبديل الذي اخترته لخادمك (Django أو FastAPI):
    </p>

    <!-- Code Block: Django Permissions & SimpleJWT -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python (Django Track) · apps/users/permissions.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود صلاحيات Django">نسخ كود Django</button>
      </div>
      <pre class="code-content"><code>from rest_framework import permissions

class IsStaffOrAdmin(permissions.BasePermission):
    """صلاحية خاصة بالمشرفين وموظفي النظام"""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (
            request.user.role in ['admin', 'staff'] or request.user.is_staff
        ))

class IsOwnerOrAdminOnly(permissions.BasePermission):
    """صلاحية على مستوى الكائن: صاحب السجل فقط أو المشرف"""
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role in ['admin', 'staff']:
            return True
        # التحقق من أن المستخدم هو صاحب الطلب نفسه
        return obj.user_id == request.user.id
</code></pre>
    </div>

    <p class="leading-7 text-[var(--text-muted)]">حارس JWT التالي مثال للتحقق من توقيع الرمز ووجود وقت انتهائه وبيانات هويته، وليس نظام دخول وتجديد مكتملًا. أدخل JWT_SECRET_KEY من بيئة الخادم، واضبط issuer وaudience بحسب عقدك، وتحقق من حساب المستخدم وحالة اعتماده قبل تنفيذ العملية؛ استمد الدور والصلاحيات الحالية من سجل الحساب الموثوق، لا من claim قديم في الرمز وحده. أضف إصدار الرموز وإبطالها وتجديدها واختبارات الرمز المنتهي والحساب المعطل؛ وجود الحارس وحده لا يثبت اكتمال المصادقة.</p>
    <!-- Code Block: FastAPI OAuth2 & Dependencies -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python (FastAPI Track) · app/auth/dependencies.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود صلاحيات FastAPI">نسخ كود FastAPI</button>
      </div>
      <pre class="code-content"><code>from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
SECRET_KEY = os.environ["JWT_SECRET_KEY"]  # inject server-side; no fallback secret
ALGORITHM = "HS256"

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="رمز التوثيق غير صالح أو منتهي الصلاحية",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM], options={"require": ["exp", "sub", "role"]})
        user_id: str = payload.get("sub")
        role: str = payload.get("role")
        if user_id is None or role is None:
            raise credentials_exception
        return {"id": user_id, "role": role}
    except jwt.InvalidTokenError:
        raise credentials_exception

def require_roles(allowed_roles: list[str]):
    """حارس الصلاحيات استناداً للأدوار (RBAC Guard)"""
    async def role_checker(current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="ليس لديك الصلاحية الكافية للوصول إلى هذا الإجراء"
            )
        return current_user
    return role_checker
</code></pre>
    </div>
  </div>

  <!-- 4. Linking Permissions to Requirements (PRD/SRS) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. ربط الصلاحيات بمصفوفة متطلبات المشروع (PRD & SRS)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا تُكتب الصلاحيات عشوائياً في الكود؛ بل تشتق مباشرة من جدول مصفوفة الصلاحيات المعتمد في وثيقة المتطلبات (SRS). على سبيل المثال:
    </p>
    <div class="overflow-x-auto my-4">
      <table class="w-full text-sm text-right border-collapse border border-[var(--border-subtle)]">
        <thead>
          <tr class="bg-[var(--bg-card)] text-[var(--text-main)] font-bold">
            <th class="p-3 border border-[var(--border-subtle)]">نقطة النهاية (Endpoint)</th>
            <th class="p-3 border border-[var(--border-subtle)]">العملية (Action)</th>
            <th class="p-3 border border-[var(--border-subtle)]">زائر عام (Public)</th>
            <th class="p-3 border border-[var(--border-subtle)]">مستخدم عادي (User)</th>
            <th class="p-3 border border-[var(--border-subtle)]">مشرف (Admin/Staff)</th>
          </tr>
        </thead>
        <tbody class="text-[var(--text-muted)]">
          <tr>
            <td class="p-3 border border-[var(--border-subtle)] font-mono text-xs" dir="ltr">GET /api/catalog</td>
            <td class="p-3 border border-[var(--border-subtle)]">استعراض العناصر المتاحة</td>
            <td class="p-3 border border-[var(--border-subtle)] text-emerald-600 font-bold">مسموح ✓</td>
            <td class="p-3 border border-[var(--border-subtle)] text-emerald-600 font-bold">مسموح ✓</td>
            <td class="p-3 border border-[var(--border-subtle)] text-emerald-600 font-bold">مسموح ✓</td>
          </tr>
          <tr>
            <td class="p-3 border border-[var(--border-subtle)] font-mono text-xs" dir="ltr">POST /api/requests</td>
            <td class="p-3 border border-[var(--border-subtle)]">إنشاء طلب جديد</td>
            <td class="p-3 border border-[var(--border-subtle)] text-rose-500 font-bold">محظور (401)</td>
            <td class="p-3 border border-[var(--border-subtle)] text-emerald-600 font-bold">مسموح ✓</td>
            <td class="p-3 border border-[var(--border-subtle)] text-emerald-600 font-bold">مسموح ✓</td>
          </tr>
          <tr>
            <td class="p-3 border border-[var(--border-subtle)] font-mono text-xs" dir="ltr">PATCH /api/requests/{id}/approve</td>
            <td class="p-3 border border-[var(--border-subtle)]">الموافقة على الطلب أو رفضه</td>
            <td class="p-3 border border-[var(--border-subtle)] text-rose-500 font-bold">محظور (401)</td>
            <td class="p-3 border border-[var(--border-subtle)] text-rose-500 font-bold">محظور (403)</td>
            <td class="p-3 border border-[var(--border-subtle)] text-emerald-600 font-bold">مسموح ✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 5. Case Study Boundary Note -->
  <div class="callout info my-6">
    <div class="callout-header">
      <span class="callout-icon">📌</span>
      <span>تنبيه منهجي: أدوار وصلاحيات BorrowHub دراسة حالة إرشادية وليست قيوداً لمشروعك</span>
    </div>
    <p class="leading-7">
      أدوار المستخدمين المذكورة في الأمثلة (طالب، مسؤول مستودع/موظف، مشرف نظام) والصلاحيات المقترنة بها خاصة بدراسة حالة نظام BorrowHub.
      <strong>لا تفرض هذه الأدوار على مشروعك ما لم تكن جزءاً من فكرتك.</strong>
      عليك الرجوع لوثيقتي PRD وSRS الخاصتين بمشروعك لتحديد أدوارك الحقيقية وصياغة مصفوفة الصلاحيات المطابقة لنطاق عملك.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 44: SERVICES & SELECTORS (الخدمات والمحددات ومنطق العمل)
 * Sequence Position: 44
 * ========================================================================= */
export const topic44ServicesSelectorsHtml = `
<section id="topic-44-services-selectors" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">المرحلة التطبيقية · تطوير الخادم الخلفي</span>
    <span class="step-pill">منطق العمل · المعاملات والاستعلامات النظيفة</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة</h2>
      <div class="step-subtitle">عزل العمليات التغييرية (Services) والمعاملات الذرية (Transactions) عن استعلامات القراءة النقية (Selectors) لكلا البديلين</div>
    </div>
  </div>

  <!-- 1. Architectural Problem: Fat Views & Fat Models Anti-Patterns -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. المعضلة المعمارية: لماذا تفشل بنية CRUD السطحية في المشروعات الحقيقية؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      عندما يبدأ المطورون في بناء الخادم الخلفي، غالباً ما يضعون منطق العمل المعقد داخل دوال المسارات (Controllers / Views) فيما يُعرف بـ <strong>Fat Views</strong>، أو يراكمون التحقق والتعديل داخل كائنات قاعدة البيانات فيما يُعرف بـ <strong>Fat Models</strong>. يؤدي هذا الخلط إلى عواقب هندسية وخيمة:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>استحالة إعادة استخدام المنطق:</strong> تكرار شروط التحقق من قواعد العمل بين نقاط النهاية والمهام الخلفية (Background Tasks).</li>
      <li><strong>صعوبة كتابة اختبارات الوحدة:</strong> الحاجة لمحاكاة طلب HTTP كامل لاختبار شرط عمل منطقي بسيط.</li>
      <li><strong>تلوث البيانات بسبب غياب الذرية:</strong> تعديل حالة أحد السجلات مع فشل السجل المرتبط به دون تراجع (Rollback)، مما يترك قاعدة البيانات في حالة متناقضة.</li>
    </ul>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>الحل المعماري القياسي: نمط Services & Selectors</span>
      </div>
      <p class="leading-7">
        نقوم بفصل المنطق إلى طبقتين صريحتين ونظيفين:
        <strong>طبقة الخدمات (Services)</strong> مسؤولة حصرياً عن العمليات التغييرية (Writes / Mutations) والتحقق من الشروط وإدارة المعاملات الذرية؛
        بينما <strong>طبقة المحددات (Selectors)</strong> مسؤولة حصرياً عن استعلامات القراءة النقية (Pure Reads) دون أي آثار جانبية (Side Effects).
      </p>
    </div>
  </div>

  <!-- 2. Atomic Transactions & Business Invariants -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. المعاملات الذرية (Atomic Transactions) وحماية قواعد العمل</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تضمن المعاملة الذرية (Atomic Transaction) مبدأ "الكل أو لا شيء": فإذا تضمنت العملية حجز معدة، وإنشاء سجل إعارة، وإرسال تنبيه، ثم فشلت أي خطوة أو كُسر أحد الشروط، تتراجع قاعدة البيانات فوراً وبشكل تلقائي (Rollback) عن كافة التغييرات التي تمت منذ بداية المعاملة:
    </p>
    <div class="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl my-4">
      <h4 class="font-bold text-[var(--text-main)] mb-2">منع التضارب وحالات السباق (Race Conditions & select_for_update)</h4>
      <p class="text-sm text-[var(--text-muted)] leading-6">
        عندما يحاول مستخدمان استعارة أو حجز نفس العنصر الوحيد المتاح في نفس الجزء من الثانية، فإن القراءة العادية ستخبر الاثنين أن العنصر متاح. الحل الهندسي هو قفل السجل المعني أثناء المعاملة باستخدام <code>select_for_update()</code> في كل من Django وSQLAlchemy، مما يجبر الطلب الثاني على الانتظار حتى تنتهي معاملة الأول إما بالنجاح وتغيير الحالة أو بالفشل.
      </p>
    </div>
  </div>

  <!-- SVG Clean Architecture Diagram: Services vs Selectors -->
  <div class="diagram-box my-8 bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)]">
    <div class="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center justify-between">
      <span>مخطط نمط Services & Selectors وفصل العمليات التغييرية عن القراءة النقية</span>
      <span class="text-xs text-[var(--accent)] font-mono">Clean Architecture Layering</span>
    </div>
    <svg viewBox="0 0 800 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Services and Selectors Diagram">
      <defs>
        <marker id="arrow-service" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent, #059669)" />
        </marker>
      </defs>
      <!-- API Controller Layer -->
      <rect x="20" y="80" width="140" height="90" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="90" y="115" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">API Router / View</text>
      <text x="90" y="135" text-anchor="middle" fill="var(--text-muted)" font-size="11">فحص التوكن والمدخلات</text>
      <text x="90" y="152" text-anchor="middle" fill="var(--text-muted)" font-size="10">(HTTP Transport Only)</text>

      <!-- Write Flow -> Service -->
      <path d="M 160 105 L 260 65" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-service)" />
      <text x="210" y="75" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="bold">كتابة (Write / Mutation)</text>
      <rect x="270" y="30" width="220" height="75" rx="10" fill="var(--bg-card)" stroke="var(--accent)" stroke-width="2" />
      <text x="380" y="55" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">طبقة الخدمات (Services)</text>
      <text x="380" y="73" text-anchor="middle" fill="var(--text-muted)" font-size="11">فحص قواعد العمل + معاملة ذرية</text>
      <text x="380" y="90" text-anchor="middle" fill="var(--accent)" font-size="10">atomic() / select_for_update()</text>

      <!-- Read Flow -> Selector -->
      <path d="M 160 145 L 260 185" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-service)" />
      <text x="210" y="180" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">قراءة (Pure Read)</text>
      <rect x="270" y="150" width="220" height="75" rx="10" fill="var(--bg-card)" stroke="#3b82f6" stroke-width="2" />
      <text x="380" y="175" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">طبقة المحددات (Selectors)</text>
      <text x="380" y="193" text-anchor="middle" fill="var(--text-muted)" font-size="11">استعلامات نقية دون أي تغيير</text>
      <text x="380" y="210" text-anchor="middle" fill="#3b82f6" font-size="10">تحسين الفهارس وحل مشكلة N+1</text>

      <!-- Database Layer -->
      <path d="M 490 68 L 590 108" stroke="var(--accent, #059669)" stroke-width="2" marker-end="url(#arrow-service)" />
      <path d="M 490 188 L 590 148" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-service)" />
      <rect x="600" y="80" width="170" height="90" rx="10" fill="var(--bg-main)" stroke="var(--border-subtle)" stroke-width="2" />
      <text x="685" y="115" text-anchor="middle" fill="var(--text-main)" font-size="13" font-weight="bold">PostgreSQL DB</text>
      <text x="685" y="135" text-anchor="middle" fill="var(--text-muted)" font-size="11">تطبيق المعاملات</text>
      <text x="685" y="152" text-anchor="middle" fill="var(--text-muted)" font-size="10">سجلات وجداول دائمة</text>
    </svg>
  </div>

  <!-- 3. Implementation in Both Framework Alternatives -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. الشيفرة البرمجية للخدمات والمحددات في كلا البديلين</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      طبق النمط البرمجي وفق الإطار الذي اعتمدته في مشروعك:
    </p>

    <div class="callout warning my-6"><p><strong>حدود المثال البرمجي:</strong> هذه مقاطع توضيحية لفصل القراءة والكتابة والمعاملات، وليست تنفيذ BorrowHub كاملًا أو عقد API جاهزًا. قبل استخدامها طابق أسماء الحقول والحالات مع نماذجك وعقد API، وأضف التحقق من اعتماد الحساب والسبب والتواريخ ووحدة الطلب وحالات الطلبات النشطة بحسب PRD. قفل المعدة وحده لا يحمي حد طلبات المستخدم عند طلب معدتين مختلفتين بالتزامن؛ يلزم تسلسل أو قفل مناسب للمستخدم واختبار تزامن. إنشاء طلب pending لا يساوي التسليم ولا يحوّل المعدة إلى borrowed. لا تعتمد المخرج قبل اختبارات الأهلية والحدود والتزامن والتسليم والإرجاع.</p></div>

    <!-- Code Block: Django Services & Selectors -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python (Django Track) · apps/loans/services.py & selectors.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ كود Django';},2000);})" aria-label="نسخ كود خدمات ومحددات Django">نسخ كود Django</button>
      </div>
      <pre class="code-content"><code>from django.db import transaction
from django.core.exceptions import ValidationError
from apps.loans.models import LoanRequest
from apps.equipment.models import Equipment

# ============================================================================
# 1. Service (Write Operation with Atomic Transaction & Rule Validation)
# ============================================================================
def create_loan_request(*, user, equipment_id: str, duration_days: int) -> LoanRequest:
    """خدمة إنشاء طلب إعارة: تتحقق من الشروط وتحدث الحالة في معاملة ذرية"""
    if not 1 <= duration_days <= 10:
        raise ValidationError("لا يمكن أن تتجاوز مدة الإعارة 10 أيام وفق متطلبات هذا النظام")

    with transaction.atomic():
        # قفل سجل المعدة لمنع الحجز المتزامن (Race Condition Protection)
        equipment = Equipment.objects.select_for_update().get(id=equipment_id)
        if equipment.status != 'available':
            raise ValidationError("المعدة المطلوبة غير متاحة حالياً للإعارة")

        # التحقق من شرط أقصى عدد للإعارات النشطة للمستخدم
        active_loans_count = LoanRequest.objects.filter(user=user, status__in=['pending', 'approved', 'active']).count()
        if active_loans_count >= 2:
            raise ValidationError("تجاوزت الحد الأقصى للإعارات المتزامنة المسموح بها")

        # إنشاء الطلب فقط؛ التسليم وتحديث المخزون عملية منفصلة
        loan = LoanRequest.objects.create(
            user=user,
            equipment=equipment,
            duration_days=duration_days,
            status='pending'
        )
        # الطلب pending لا يعني تسليم المعدة؛ حدّث المخزون عند الانتقال المعتمد للتسليم

        return loan

# ============================================================================
# 2. Selector (Pure Read Query with N+1 Optimization)
# ============================================================================
def get_user_active_loans(*, user):
    """محدد استعلام الإعارات النشطة: قراءة نقية محسنة وتجنب N+1 Queries"""
    return (
        LoanRequest.objects
        .filter(user=user, status__in=['pending', 'approved', 'active'])
        .select_related('equipment', 'equipment__category')
        .order_by('-created_at')
    )
</code></pre>
    </div>

    <!-- Code Block: FastAPI / SQLAlchemy Services & Selectors -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Python (FastAPI Track) · app/services/loan.py & app/selectors/loan.py</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ كود FastAPI';},2000);})" aria-label="نسخ كود خدمات ومحددات FastAPI">نسخ كود FastAPI</button>
      </div>
      <pre class="code-content"><code>from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.loan import LoanRequestModel
from app.models.equipment import EquipmentModel

# ============================================================================
# 1. Service (Async Write Operation with Transaction & Invariant Check)
# ============================================================================
async def request_loan_service(*, session: AsyncSession, user_id: UUID, equipment_id: UUID, days: int) -> LoanRequestModel:
    if not 1 <= days <= 10:
        raise HTTPException(status_code=400, detail="مدة الإعارة تتجاوز الحد الأقصى المسموح")

    async with session.begin():
        # قفل سجل المعدة لمنع الحجز المتزامن
        stmt = select(EquipmentModel).where(EquipmentModel.id == equipment_id).with_for_update()
        result = await session.execute(stmt)
        equipment = result.scalar_one_or_none()

        if not equipment or equipment.status != "available":
            raise HTTPException(status_code=400, detail="المعدة غير متاحة للإعارة")

        # فحص عدد الطلبات النشطة للمستخدم
        count_stmt = select(func.count(LoanRequestModel.id)).where(
            LoanRequestModel.user_id == user_id,
            LoanRequestModel.status.in_(["pending", "approved", "active"])
        )
        count_res = await session.execute(count_stmt)
        active_count = count_res.scalar_one()

        if active_count >= 2:
            raise HTTPException(status_code=400, detail="تجاوزت الحد الأقصى للطلبات النشطة")

        loan = LoanRequestModel(
            user_id=user_id,
            equipment_id=equipment_id,
            duration_days=days,
            status="pending"
        )
        session.add(loan)
        # لا تغيّر حالة المعدة إلى borrowed قبل تسليمها فعليًا وفق قواعد المشروع
        await session.flush()
        return loan

# ============================================================================
# 2. Selector (Async Pure Read Query with Eager Loading)
# ============================================================================
async def list_active_loans_selector(*, session: AsyncSession, user_id: UUID):
    stmt = (
        select(LoanRequestModel)
        .where(
            LoanRequestModel.user_id == user_id,
            LoanRequestModel.status.in_(["pending", "approved", "active"])
        )
        .options(selectinload(LoanRequestModel.equipment))
        .order_by(LoanRequestModel.created_at.desc())
    )
    result = await session.execute(stmt)
    return result.scalars().all()
</code></pre>
    </div>
  </div>

  <!-- 4. Mandatory Educational Boundary: BorrowHub Rules are NOT Project Rules -->
  <div class="callout warning my-6">
    <div class="callout-header">
      <span class="callout-icon">🚨</span>
      <span>تحذير منهجي صارم: لا تجعل قواعد BorrowHub قواعد إلزامية لمشروعك</span>
    </div>
    <p class="leading-7">
      الشروط الواردة في الأكواد أعلاه (مثل: <strong>ألا تتجاوز الإعارة 10 أيام</strong>، و<strong>ألا تزيد الطلبات النشطة عن 2</strong>) هي <strong>قواعد خاصة بدراسة حالة نظام BorrowHub حصراً</strong> لتوضيح كيفية تطبيق القيود وحمايتها بالمعاملات.
      <strong>يُحظر نسخ هذه القواعد حرفياً لمشروع الطالب الشخصي ما لم تكن جزءاً أصيلاً وموثقاً في وثيقة المتطلبات (PRD وSRS) الخاصة به.</strong>
      عليك تحديد شروط العمل، والحدود القصوى، والتحققات الخاصة بفكرة تطبيقك الفريدة وكتابتها في دوال Services الخاصة بك.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC ITEMS ARRAY EXPORT (Positions 41 to 44)
 * ========================================================================= */
export const t14Entries: TopicItem[] = [
  // -------------------------------------------------------------------------
  // TOPIC 41: DJANGO (Alternative 1)
  // -------------------------------------------------------------------------
  {
    id: 'django-backend',
    number: '41',
    slug: 'django-backend',
    title: 'Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1)',
    subtitle: 'إعداد خادم Django REST Framework، وتطبيق نماذج البيانات المشتقة من ERD، وإدارة التهجيرات الأصلية (Migrations)',
    category: 'architecture',
    categoryName: 'معمارية وتطوير الخادم',
    stageTag: 'المرحلة التطبيقية · تطوير الخادم الخلفي',
    summary: 'البديل الأول المستقل لخادم مشروع الطالب باستخدام Django وإطار DRF. تحويل كيانات ERD إلى نماذج Django قوية مع الفهارس والقيود، وإدارة دورة حياة التهجيرات المدمجة (Native Migrations) مع تعقبها في جدول django_migrations، وتفعيل لوحة تحكم الإدارة (Django Admin) لتسريع الفحص الأولي. بديل مستقل لـ FastAPI ولا يلزم الطالب ببناء الخادم مرتين.',
    tags: ['Django', 'DRF', 'PostgreSQL', 'Django ORM', 'Migrations', 'Django Admin', 'Alternative 1'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic41DjangoHtml),
    htmlContent: topic41DjangoHtml,

    goal: 'إعداد هيكل خادم Django وتطبيقاته المستقلة، وترجمة مخطط ERD إلى نماذج بيانات مكتوبة مع قيودها، وإدارة تهجيرات قاعدة البيانات الأصلية بنجاح دون أخطاء أو تدخلات يدوية هدامة، مع إدراك كونه بديلاً مستقلاً لـ FastAPI.',
    prerequisites: [
      'مخطط الكيانات والعلاقات المعتمد docs/ERD.md (الموضوع 14)',
      'تجهيز بيئة بايثون وأساسيات اللغة (الموضوع 38)',
      'إعداد قاعدة بيانات PostgreSQL والاتصال الآمن بها (الموضوع 39)',
      'معمارية الخادم وعقود API الموثقة في docs/API_CONTRACTS.md (الموضوع 40)'
    ],
    steps: [
      '1. أنشئ بيئة بايثون الافتراضية وثبّت حزم django وdjangorestframework وpsycopg2-binary وضبط ملف .env لربط PostgreSQL.',
      '2. أنشئ مشروع Django النظيف مع مجلد إعدادات مركزي config وقسم المنطق إلى تطبيقات معيارية (apps/users, apps/catalog, apps/loans).',
      '3. ابنِ نماذج البيانات في models.py مشتقة بدقة من docs/ERD.md مع تحديد المفاتيح الأساسية UUID والخيارات والعلاقات.',
      '4. شغّل أمر python manage.py makemigrations وتفحص ملفات التهجير الناتجة وتأكد من مطابقتها للتعديلات المطلوبة.',
      '5. نفّذ أمر python manage.py migrate وطبّق التهجيرات على PostgreSQL وتأكد من تسجيلها في جدول django_migrations.',
      '6. سجّل النماذج في admin.py وأنشئ مستخدماً خارقاً (createsuperuser) لفحص وتجربة إدخال البيانات في لوحة الإدارة.',
      '7. وثّق خطوات إعداد الخادم والتهجيرات في docs/DJANGO_BACKEND_SETUP.md وانتقل مباشرة لموضوع المصادقة (الموضوع 43) متجاوزاً موضوع FastAPI.'
    ],
    promptRefs: [
      'prompt-28-spec-kit-per-feature',
      'prompt-30-github-handoff'
    ],
    outputs: [
      'backend/config/settings.py',
      'backend/apps/*/models.py',
      'backend/apps/*/migrations/*.py',
      'docs/DJANGO_BACKEND_SETUP.md'
    ],
    checklist: [
      'إدراك أن Django وFastAPI بديلان مستقلان للخادم وأن اختيار أحدهما يكفي لبناء المشروع.',
      'هيكلة مشروع Django النظيف وتقسيم التطبيقات وفق مبدأ المسؤولية المعمارية المفردة.',
      'ترجمة كيانات مخطط docs/ERD.md إلى نماذج Django Models دقيقة مع القيود والفهارس.',
      'الاعتماد الحصري على نظام التهجيرات المدمج (makemigrations / migrate) وحفظ ملفاتها في Git.',
      'فصل قواعد دراسة الحالة BorrowHub وتطبيق القواعد الخاصة بمشروع الطالب المستقل فقط.',
      'توثيق أوامر الإعداد والتشغيل في docs/DJANGO_BACKEND_SETUP.md وجاهزية الخادم للانتقال للمصادقة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 41,
  },

  // -------------------------------------------------------------------------
  // TOPIC 42: FASTAPI (Alternative 2)
  // -------------------------------------------------------------------------
  {
    id: 'fastapi-backend',
    number: '42',
    slug: 'fastapi-backend',
    title: 'FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2)',
    subtitle: 'إعداد خادم غير متزامن (Async)، وتحديد مخططات Pydantic ونماذج SQLAlchemy، وإدارة التهجيرات باستخدام Alembic',
    category: 'architecture',
    categoryName: 'معمارية وتطوير الخادم',
    stageTag: 'المرحلة التطبيقية · تطوير الخادم الخلفي',
    summary: 'البديل الثاني المستقل لخادم مشروع الطالب باستخدام FastAPI فائق السرعة والمبني على معيار ASGI. الفصل المعماري التام بين مخططات التحقق (Pydantic Schemas) ونماذج قاعدة البيانات (SQLAlchemy ORM)، وإدارة دورة حياة تهجيرات المخطط باستخدام أداة Alembic المستقلة بدلاً من الأنظمة المدمجة، والاستفادة من توثيق Swagger التلقائي. بديل مستقل لـ Django ولا يلزم الطالب ببناء الخادم مرتين.',
    tags: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Async', 'Alternative 2'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic42FastApiHtml),
    htmlContent: topic42FastApiHtml,

    goal: 'إعداد خادم FastAPI غير متزامن (Async)، والفصل التام بين مخططات Pydantic ونماذج SQLAlchemy، وتهيئة أداة Alembic لتوليد وتطبيق تهجيرات الجداول على PostgreSQL بنجاح، كبديل مستقل لـ Django دون إعادة بناء الخادم مرتين.',
    prerequisites: [
      'مخطط الكيانات والعلاقات المعتمد docs/ERD.md (الموضوع 14)',
      'تجهيز بيئة بايثون وأساسيات اللغة والبرمجة غير المتزامنة async/await (الموضوع 38)',
      'إعداد قاعدة بيانات PostgreSQL وبروتوكول الاتصال (الموضوع 39)',
      'وثيقة معمارية الخادم وعقود API في docs/API_CONTRACTS.md (الموضوع 40)'
    ],
    steps: [
      '1. ثبّت حزم fastapi وuvicorn وpydantic وsqlalchemy وalembic وasyncpg في بيئة المشروع.',
      '2. ابنِ مخططات التحقق Pydantic Schemas للطلبات والاستجابات مع تحديد القيود الصارمة ومنع تسريب الحقول الحساسة.',
      '3. صغ نماذج SQLAlchemy ORM المطابقة لجداول docs/ERD.md مع تحديد الأعمدة والفهارس والمفاتيح الأجنبية.',
      '4. هيئ أداة Alembic عبر alembic init alembic واربط target_metadata بكائنات Base.metadata في env.py.',
      '5. ولّد ملف التهجير الأول عبر alembic revision --autogenerate -m "initial schema" وافحص كود الترقية والتراجع.',
      '6. طبّق التهجير على PostgreSQL عبر alembic upgrade head وتأكد من نشوء الجداول وتحديث alembic_version.',
      '7. شغّل الخادم عبر uvicorn app.main:app --reload وتصفح التوثيق التفاعلي /docs للتأكد من سلامة المسارات.',
      '8. وثّق خطوات إعداد خادم FastAPI والتهجيرات في docs/FASTAPI_BACKEND_SETUP.md وانتقل مباشرة للموضوع 43.'
    ],
    promptRefs: [
      'prompt-28-spec-kit-per-feature',
      'prompt-30-github-handoff'
    ],
    outputs: [
      'backend/app/main.py',
      'backend/app/schemas/*.py',
      'backend/app/models/*.py',
      'backend/alembic/versions/*.py',
      'docs/FASTAPI_BACKEND_SETUP.md'
    ],
    checklist: [
      'فهم طبيعة FastAPI كبديل ثانٍ مستقل لـ Django وعدم إلزام الطالب ببناء الخادم بالإطارين.',
      'الفصل الدقيق بين مخططات Pydantic (للتحقق والمدخلات) ونماذج SQLAlchemy (للجداول الدائمة).',
      'إعداد أداة Alembic وربط الـ metadata لتوليد التهجيرات آلياً وتطبيقها بنجاح.',
      'تفعيل جلسات قاعدة البيانات غير المتزامنة (AsyncSession) عبر موفر التبعيات Depends().',
      'الالتزام بعدم تعميم قواعد BorrowHub واقتصار التطبيق على متطلبات مشروع الطالب الشخصي.',
      'توثيق كافة الخطوات في docs/FASTAPI_BACKEND_SETUP.md والانتقال للمصادقة والصلاحيات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 42,
  },

  // -------------------------------------------------------------------------
  // TOPIC 43: AUTH & PERMISSIONS
  // -------------------------------------------------------------------------
  {
    id: 'auth-permissions',
    number: '43',
    slug: 'auth-permissions',
    title: 'المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC)',
    subtitle: 'تطبيق تسجيل الدخول بـ JWT، وتشفير كلمات المرور، وتحديد صلاحيات الأدوار وحماية نقاط النهاية وفق إطار الخادم المختار',
    category: 'architecture',
    categoryName: 'معمارية وتطوير الخادم',
    stageTag: 'المرحلة التطبيقية · تطوير الخادم الخلفي',
    summary: 'بناء منظومة متكاملة للأمان تشمل المصادقة والتحكم بالوصول (RBAC). التفريق الجوهري بين إثبات الهوية (Authentication) وتحديد الصلاحيات (Authorization). تطبيق تسجيل الدخول بـ JWT بالتوكن الثنائي (Access و Refresh)، وتشفير كلمات المرور بآليات قوية، وحماية نقاط النهاية وفق مصفوفة الأدوار المشتقة من وثائق PRD وSRS، مع تقديم الأكواد لكلا البديلين (Django و FastAPI) دون فرض أدوار BorrowHub كأدوار إلزامية.',
    tags: ['Authentication', 'Authorization', 'JWT', 'RBAC', 'Permissions', 'Security', 'Django', 'FastAPI'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic43AuthPermissionsHtml),
    htmlContent: topic43AuthPermissionsHtml,

    goal: 'تنفيذ منظومة متكاملة ومحكمة لتسجيل الدخول والتحقق من الهوية بـ JWT، وتطبيق حراس الصلاحيات المستندة للأدوار (RBAC) لحماية نقاط النهاية وفق الإطار البرمجي المعتمد لمشروع الطالب (Django أو FastAPI).',
    prerequisites: [
      'خادم مشروع مهيأ وقاعدة بيانات متصلة (الموضوع 41 أو الموضوع 42)',
      'وثيقة عقود نقاط النهاية docs/API_CONTRACTS.md (الموضوع 40)',
      'مصفوفة أدوار ومستخدمي النظام في docs/SRS.md (الموضوع 04)'
    ],
    steps: [
      '1. راجع مصفوفة الصلاحيات وأدوار المستخدمين المعتمدة في وثيقتي PRD وSRS لمشروعك.',
      '2. ثبّت حزم التشفير وJWT (SimpleJWT في مسار Django، أو pyjwt وpasslib في مسار FastAPI).',
      '3. أنشئ نقاط النهاية الخاصة بالمصادقة: مسار تسجيل الدخول (/api/auth/login) ومسار تجديد الرمز (/api/auth/refresh).',
      '4. ابنِ فئات أو توابع حماية الصلاحيات: BasePermission مخصصة في Django، أو توابع Depends(require_roles) في FastAPI.',
      '5. اربط نقاط النهاية الحساسة (إنشاء السجلات، التعديل، الحذف، الإدارة) بحراس الصلاحيات المناسبة وتأكد من رفض الطلبات غير المصرحة برمز 401 أو 403.',
      '6. اكتب اختبارات آلية للتحقق من رفض وصول المستخدم العادي للمسارات الإدارية وقبول الطلبات المصرحة فقط.',
      '7. وثّق استراتيجية الأمان ومصفوفة الصلاحيات في docs/AUTH_PERMISSIONS_SPEC.md.'
    ],
    promptRefs: [
      'prompt-28-spec-kit-per-feature',
      'prompt-30-github-handoff'
    ],
    outputs: [
      'backend/app/auth/ أو backend/apps/users/permissions.py',
      'docs/AUTH_PERMISSIONS_SPEC.md',
      'tests/test_auth_permissions.py'
    ],
    checklist: [
      'الفصل المعماري الصارم بين التحقق من الهوية (Authentication) وتحديد الصلاحيات (Authorization).',
      'اعتماد معيار JWT بالرمزين (Access Token قصير و Refresh Token مجدد) وتشفير كلمات المرور بأمان.',
      'تطبيق حراس الصلاحيات المستندة للأدوار (RBAC) على كافة مسارات API الحساسة وفق البديل المعتمد.',
      'حماية مسارات التعديل والحذف بصلاحيات ملكية المورد (Object-Level Permissions).',
      'تجنب فرض أدوار BorrowHub الخاصة والالتزام بأدوار وثيقة SRS لمشروع الطالب الشخصي.',
      'كتابة اختبارات آلية تؤكد استجابة المسارات برمز 401 للمجهول و 403 لمن يفتقد الصلاحية وتوثيقها.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 43,
  },

  // -------------------------------------------------------------------------
  // TOPIC 44: SERVICES & SELECTORS
  // -------------------------------------------------------------------------
  {
    id: 'services-selectors',
    number: '44',
    slug: 'services-selectors',
    title: 'Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة',
    subtitle: 'عزل العمليات التغييرية (Services) والمعاملات الذرية (Transactions) عن استعلامات القراءة النقية (Selectors) لكلا البديلين',
    category: 'architecture',
    categoryName: 'معمارية وتطوير الخادم',
    stageTag: 'المرحلة التطبيقية · تطوير الخادم الخلفي',
    summary: 'تطبيق نمط Services وSelectors المعماري لتنظيم منطق العمل وحماية نزاهة البيانات. تفريغ الـ Views والـ Controllers من المنطق الثقيل وعزل العمليات التغييرية (Mutations / Writes) داخل طبقة Services تحت مظلة المعاملات الذرية (Atomic Transactions) وقفل السجلات لمنع حالات السباق، وحصر عمليات القراءة (Queries) داخل طبقة Selectors النقية مع حل معضلة N+1. أمثلة كاملة للبديلين (Django و FastAPI) مع تأكيد حاسم على أن قواعد BorrowHub دراسة حالة توضيحية وليست قواعد مفروضة.',
    tags: ['Services', 'Selectors', 'Business Logic', 'Atomic Transactions', 'select_for_update', 'Clean Architecture', 'Django', 'FastAPI'],
    contentTypes: ['code', 'checklist', 'prompt', 'diagram'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic44ServicesSelectorsHtml),
    htmlContent: topic44ServicesSelectorsHtml,

    goal: 'فصل منطق العمل إلى طبقة Services مسؤولة عن التعديل والمعاملات الذرية وطبقة Selectors مسؤولة عن القراءة المحسنة، وتطبيق قواعد العمل المشتقة من وثائق مشروع الطالب دون نسخ قواعد دراسة الحالة.',
    prerequisites: [
      'نماذج قاعدة البيانات والتهجيرات المكتملة (الموضوع 41 أو الموضوع 42)',
      'نظام المصادقة والصلاحيات المعتمد (الموضوع 43)',
      'شروط وقواعد العمل المعتمدة في وثيقتي docs/PRD.md و docs/SRS.md (الموضوعان 03 و 04)'
    ],
    steps: [
      '1. حدد العمليات التغييرية في مشروعك التي تتطلب تعديل عدة جداول أو تطبيق شروط تحقق متتالية.',
      '2. أنشئ مجلد services/ وصغ دوال الخدمات لتنفيذ العمليات داخل معاملة ذرية (transaction.atomic في Django أو session.begin في FastAPI).',
      '3. استخدم قفل السجلات select_for_update لمنع التضارب وحالات السباق عند حجز أو تعديل الموارد المشتركة.',
      '4. أنشئ مجلد selectors/ وصغ دوال القراءة النقية التي تجلب البيانات وتطبق الفلاتر دون إحداث أي أثر جانبي.',
      '5. حسّن استعلامات Selectors باستخدام التحميل المسبق (select_related / prefetch_related أو joinedload / selectinload) للقضاء على مشكلة N+1.',
      '6. اربط Controllers أو ViewSets بطبقتي Services و Selectors وتأكد من بقائها نحيفة (Thin Views) تقتصر على النقل.',
      '7. اكتب اختبارات وحدة لقواعد العمل وتأكد من حدوث تراجع تلقائي (Rollback) عند فشل أي شرط، ووثّق ذلك في docs/SERVICES_SELECTORS_ARCHITECTURE.md.'
    ],
    promptRefs: [
      'prompt-28-spec-kit-per-feature',
      'prompt-30-github-handoff'
    ],
    outputs: [
      'backend/app/services/ أو backend/apps/*/services.py',
      'backend/app/selectors/ أو backend/apps/*/selectors.py',
      'docs/SERVICES_SELECTORS_ARCHITECTURE.md',
      'tests/test_services_business_rules.py'
    ],
    checklist: [
      'الفصل التام بين العمليات التغييرية (Services) واستعلامات القراءة النقية (Selectors).',
      'إدارة المعاملات الذرية (Atomic Transactions) وضمان تراجع التغييرات فوراً عند حدوث أي خطأ.',
      'استخدام قفل السجلات (select_for_update) لمنع حالات السباق وتضارب البيانات المتزامنة.',
      'القضاء على مشكلة N+1 Queries في طبقة Selectors باستخدام التحميل المسبق المناسب.',
      'الالتزام الصارم بعدم نسخ قواعد BorrowHub الخاصة (مثل حد الإعارتين و10 أيام) كقواعد إلزامية لمشروع الطالب.',
      'كتابة اختبارات وحدة تثبت صحة تنفيذ قواعد العمل وحالات التراجع وتوثيق المعمارية في docs/SERVICES_SELECTORS_ARCHITECTURE.md.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 44,
  },
];
