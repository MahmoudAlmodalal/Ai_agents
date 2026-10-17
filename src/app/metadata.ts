export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: string;
    locale: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
  };
}

export const metadata: SiteMetadata = {
  title: 'الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي',
  description:
    'مرجع هندسي شامل ومفصل مقسم موضوعياً: من استنطاق الفكرة ووثيقة PRD والمخططات الهندسية الثمانية (UML & ERD) إلى هندسة قواعد البيانات وتصميم الواجهات وتطوير الفرونت إند.',
  keywords: [
    'هندسة البرمجيات',
    'الذكاء الاصطناعي',
    'Next.js App Router',
    'Mermaid Diagrams',
    'UML',
    'ERD',
    'وثيقة PRD',
    'معمارية الأنظمة',
    'قواعد البيانات',
    'مشاريع هندسية',
  ],
  openGraph: {
    title: 'الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي',
    description:
      'مرجع هندسي شامل ومفصل مقسم موضوعياً: من استنطاق الفكرة ووثيقة PRD والمخططات الهندسية الثمانية (UML & ERD) إلى هندسة قواعد البيانات وتصميم الواجهات وتطوير الفرونت إند.',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'دليل الهندسة البرمجية المتكامل',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي',
    description:
      'مرجع هندسي شامل ومفصل مقسم موضوعياً: من استنطاق الفكرة ووثيقة PRD والمخططات الهندسية الثمانية (UML & ERD) إلى هندسة قواعد البيانات وتصميم الواجهات وتطوير الفرونت إند.',
  },
};
