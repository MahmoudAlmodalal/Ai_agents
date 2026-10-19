'use client';
import { useState } from 'react';
import { normalizeArabic } from '@/src/utils/searchUtils';
// Source: Weapon_of_the_Era_Website_Content_AR.md, section 14.
const terms: string[][] = [
  [
    "PRD",
    "لماذا وما المنتج الذي نبنيه ولمن."
  ],
  [
    "SRS",
    "مواصفات سلوك النظام وكيف نختبرها."
  ],
  [
    "MVP",
    "أصغر نطاق عملي لتحقيق هدف أساسي."
  ],
  [
    "Business Rule",
    "قيد أو سياسة تحدد السلوك المقبول."
  ],
  [
    "User Story",
    "حاجة مستخدم بلغة بسيطة."
  ],
  [
    "Acceptance Criteria",
    "شروط قابلة للاختبار لإكمال ميزة."
  ],
  [
    "Git",
    "تتبع نسخ الملفات والتغييرات."
  ],
  [
    "GitHub",
    "استضافة المستودع والتعاون."
  ],
  [
    "Commit",
    "تسجيل تغيير ضمن تاريخ المشروع."
  ],
  [
    "Branch",
    "خط تطوير منفصل."
  ],
  [
    "Pull Request",
    "طلب دمج تغييرات مع مراجعة."
  ],
  [
    "User Flow",
    "رحلة المستخدم خطوة بخطوة."
  ],
  [
    "Domain Model",
    "مفاهيم العمل والعلاقات بينها."
  ],
  [
    "Use Case",
    "الوظائف التي يقدمها النظام لأدواره."
  ],
  [
    "Activity Diagram",
    "تسلسل أنشطة عملية تجارية وقراراتها."
  ],
  [
    "Sequence Diagram",
    "ترتيب الرسائل بين المشاركين."
  ],
  [
    "State Diagram",
    "حالات الكائن وكيف ينتقل بينها."
  ],
  [
    "Class Diagram",
    "بنية التصميم الكائني والعلاقات."
  ],
  [
    "ERD",
    "الجداول والعلاقات في قاعدة البيانات."
  ],
  [
    "DBML",
    "لغة نصية لوصف قاعدة البيانات."
  ],
  [
    "PK / FK",
    "مفاتيح أساسية وأجنبية."
  ],
  [
    "Cardinality",
    "نوع العلاقة 1:1 / 1:N / N:M."
  ],
  [
    "UI",
    "المظهر والمكونات البصرية."
  ],
  [
    "UX",
    "سهولة إنجاز المستخدم أهدافه."
  ],
  [
    "Screen Inventory",
    "قائمة منظمة بالشاشات المطلوبة."
  ],
  [
    "Wireframe",
    "تخطيط مبدئي للعناصر."
  ],
  [
    "Prototype",
    "نموذج تفاعلي قبل البرمجة."
  ],
  [
    "Design System",
    "قواعد وأصول التصميم المتكررة."
  ],
  [
    "DESIGN.md",
    "مرجع قابل للقراءة آليًا وبشريًا للتصميم."
  ],
  [
    "AI Agent",
    "مساعد يمكنه تنفيذ مهام باستخدام سياق وأدوات."
  ],
  [
    "Skill",
    "تعليمات تخصصية مضافة للـAgent."
  ],
  [
    "MCP",
    "آلية وصل الـAgent بخدمة أو بيانات خارجية."
  ],
  [
    "Spec Kit",
    "تنظيم التطوير بالاعتماد على المواصفات."
  ],
  [
    "Mock Data",
    "بيانات تمثيلية للاختبار قبل الـBackend."
  ],
  [
    "QA",
    "تحقق من جودة التنفيذ وصحته."
  ]
];
function normalize(value: string) {
  return normalizeArabic(value.normalize('NFKD').replace(/\u0640/g, ''));
}
export default function GlossarySearch() {
  const [query, setQuery] = useState('');
  const visible = terms.filter(term => normalize(term.join(' ')).includes(normalize(query)));
  return <section className="mt-6" aria-label="مصطلحات المسار">
    <label htmlFor="glossary-search" className="block font-bold">ابحث في المصطلحات</label>
    <input id="glossary-search" type="search" value={query} onChange={event => setQuery(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-[var(--text-main)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]" placeholder="مثال: مفاتيح أو ERD" />
    <p role="status" className="my-4 text-sm text-[var(--text-muted)]">{visible.length ? `${visible.length} من ${terms.length} مصطلحًا` : 'لا توجد نتائج؛ جرّب كلمة أخرى.'}</p>
    <div className="grid gap-3 md:grid-cols-2">{visible.map(([term, meaning]) => <article key={term} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4"><h2 className="font-mono font-bold text-[var(--primary)]" dir="ltr">{term}</h2><p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{meaning}</p></article>)}</div>
  </section>;
}
