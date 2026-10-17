import type { Metadata } from 'next';
import '../src/app/globals.css';

export const metadata: Metadata = {
  title: 'الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي',
  description: 'مرجع هندسي شامل لبناء المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي.',
  keywords: ['هندسة البرمجيات', 'الذكاء الاصطناعي', 'Next.js App Router', 'Mermaid', 'UML', 'ERD'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
