'use client';
import { useState } from 'react';
import Link from 'next/link';
import { normalizeArabic } from '@/src/utils/searchUtils';

interface GlossaryTerm {
  term: string;
  meaning: string;
  slug: string;
}

// Source: Weapon_of_the_Era_Website_Content_AR.md, section 14.
const terms: GlossaryTerm[] = [
  {
    term: "PRD",
    meaning: "لماذا وما المنتج الذي نبنيه ولمن.",
    slug: "prd-specification"
  },
  {
    term: "SRS",
    meaning: "مواصفات سلوك النظام وكيف نختبرها.",
    slug: "srs"
  },
  {
    term: "MVP",
    meaning: "أصغر نطاق عملي لتحقيق هدف أساسي.",
    slug: "project-idea-mvp"
  },
  {
    term: "Business Rule",
    meaning: "قيد أو سياسة تحدد السلوك المقبول.",
    slug: "conceptual-domain-model"
  },
  {
    term: "User Story",
    meaning: "حاجة مستخدم بلغة بسيطة.",
    slug: "prd-specification"
  },
  {
    term: "Acceptance Criteria",
    meaning: "شروط قابلة للاختبار لإكمال ميزة.",
    slug: "srs"
  },
  {
    term: "Git",
    meaning: "تتبع نسخ الملفات والتغييرات.",
    slug: "git-project-docs"
  },
  {
    term: "GitHub",
    meaning: "استضافة المستودع والتعاون.",
    slug: "github-docs-collaboration"
  },
  {
    term: "Commit",
    meaning: "تسجيل تغيير ضمن تاريخ المشروع.",
    slug: "git-project-docs"
  },
  {
    term: "Branch",
    meaning: "خط تطوير منفصل.",
    slug: "git-project-docs"
  },
  {
    term: "Pull Request",
    meaning: "طلب دمج تغييرات مع مراجعة.",
    slug: "github-docs-collaboration"
  },
  {
    term: "User Flow",
    meaning: "رحلة المستخدم خطوة بخطوة.",
    slug: "user-flow-modeling"
  },
  {
    term: "Domain Model",
    meaning: "مفاهيم العمل والعلاقات بينها.",
    slug: "conceptual-domain-model"
  },
  {
    term: "Use Case",
    meaning: "الوظائف التي يقدمها النظام لأدواره.",
    slug: "use-case-diagram"
  },
  {
    term: "Activity Diagram",
    meaning: "تسلسل أنشطة عملية تجارية وقراراتها.",
    slug: "activity-diagram"
  },
  {
    term: "Sequence Diagram",
    meaning: "ترتيب الرسائل بين المشاركين.",
    slug: "sequence-diagram-modeling"
  },
  {
    term: "State Diagram",
    meaning: "حالات الكائن وكيف ينتقل بينها.",
    slug: "state-diagram"
  },
  {
    term: "Class Diagram",
    meaning: "بنية التصميم الكائني والعلاقات.",
    slug: "class-diagram-design"
  },
  {
    term: "ERD",
    meaning: "الجداول والعلاقات في قاعدة البيانات.",
    slug: "relational-erd-design"
  },
  {
    term: "DBML",
    meaning: "لغة نصية لوصف قاعدة البيانات.",
    slug: "dbml-dbdiagram-io"
  },
  {
    term: "PK / FK",
    meaning: "مفاتيح أساسية وأجنبية.",
    slug: "relational-erd-design"
  },
  {
    term: "Cardinality",
    meaning: "نوع العلاقة 1:1 / 1:N / N:M.",
    slug: "relational-erd-design"
  },
  {
    term: "UI",
    meaning: "المظهر والمكونات البصرية.",
    slug: "ui-ux-roles-navigation"
  },
  {
    term: "UX",
    meaning: "سهولة إنجاز المستخدم أهدافه.",
    slug: "ux-blueprint"
  },
  {
    term: "Screen Inventory",
    meaning: "قائمة منظمة بالشاشات المطلوبة.",
    slug: "screen-inventory"
  },
  {
    term: "Wireframe",
    meaning: "تخطيط مبدئي للعناصر.",
    slug: "screen-inventory"
  },
  {
    term: "Prototype",
    meaning: "نموذج تفاعلي قبل البرمجة.",
    slug: "interactive-prototype"
  },
  {
    term: "Design System",
    meaning: "قواعد وأصول التصميم المتكررة.",
    slug: "design-system-rules"
  },
  {
    term: "DESIGN.md",
    meaning: "مرجع قابل للقراءة آليًا وبشريًا للتصميم.",
    slug: "design-md-spec"
  },
  {
    term: "AI Agent",
    meaning: "مساعد يمكنه تنفيذ مهام باستخدام سياق وأدوات.",
    slug: "ai-coding-agent"
  },
  {
    term: "Skill",
    meaning: "تعليمات تخصصية مضافة للـAgent.",
    slug: "agent-skills"
  },
  {
    term: "MCP",
    meaning: "آلية وصل الـAgent بخدمة أو بيانات خارجية.",
    slug: "mcp-protocol"
  },
  {
    term: "Spec Kit",
    meaning: "تنظيم التطوير بالاعتماد على المواصفات.",
    slug: "spec-kit-workflow"
  },
  {
    term: "Mock Data",
    meaning: "بيانات تمثيلية للاختبار قبل الـBackend.",
    slug: "frontend-incremental-implementation"
  },
  {
    term: "QA",
    meaning: "تحقق من جودة التنفيذ وصحته.",
    slug: "integrated-project-qa"
  }
];
function normalize(value: string) {
  return normalizeArabic(value.normalize('NFKD').replace(/\u0640/g, ''));
}
export default function GlossarySearch() {
  const [query, setQuery] = useState('');
  const visible = terms.filter(item => normalize(`${item.term} ${item.meaning}`).includes(normalize(query)));
  return <section className="mt-6" aria-label="مصطلحات المسار">
    <label htmlFor="glossary-search" className="block font-bold">ابحث في المصطلحات</label>
    <input id="glossary-search" type="search" value={query} onChange={event => setQuery(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-[var(--text-main)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]" placeholder="مثال: مفاتيح أو ERD" />
    <p role="status" className="my-4 text-sm text-[var(--text-muted)]">{visible.length ? `${visible.length} من ${terms.length} مصطلحًا` : 'لا توجد نتائج؛ جرّب كلمة أخرى.'}</p>
    <div className="grid gap-3 md:grid-cols-2">
      {visible.map((item) => (
        <article key={item.term} className="flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
          <div>
            <h2 className="font-mono font-bold text-[var(--primary)]" dir="ltr">{item.term}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{item.meaning}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
            <Link
              href={`/learn/${item.slug}`}
              className="inline-block font-bold text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
            >
              اقرأ الموضوع
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>;
}
