import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { ToastProvider } from '@/src/components/Toast';
import { ServiceWorkerRegister } from '@/src/components/ServiceWorkerRegister';

// Responsive Viewport Configuration (Next.js 15 Standard)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#17231f',
};

// 3. Comprehensive Educational Platform Metadata
export const metadata: Metadata = {
  title: {
    default: 'Ai_agents — هندسة البرمجيات بالذكاء الاصطناعي',
    template: '%s | Ai_agents',
  },
  description:
    'مسار عملي لتعلّم هندسة البرمجيات بمساعدة وكلاء الذكاء الاصطناعي: من فهم الفكرة وتوثيق المتطلبات إلى التصميم والبناء والاختبار. يضم 58 موضوعًا ويحفظ نشاطك في متصفحك.',
  keywords: [
    'Ai_agents',
    'هندسة البرمجيات بالذكاء الاصطناعي',
    'AI Agents',
    'التعلم التطبيقي',
    'BorrowHub',
    'Mermaid Diagrams',
    'UML',
    'ERD',
    'وثيقة PRD',
    'Google Stitch',
    'Claude Code',
    'OpenCode',
    'Kimi K2',
    'Cline',
    'Manus',
    'مؤشر الموديلات',
    'أفضل موديل برمجة',
    'Tailwind CSS',
    'TypeScript',
  ],
  authors: [{ name: 'Ai_agents' }],
  creator: 'Ai_agents',
  publisher: 'Ai_agents',
  icons: { icon: [{ url: '/ai-agents-mark.svg', type: 'image/svg+xml' }] },
  openGraph: {
    title: 'Ai_agents — هندسة البرمجيات بالذكاء الاصطناعي',
    description:
      'حوّل فكرة مشروعك إلى متطلبات واضحة وتصميم وبرمجية يمكنك اختبارها وشرح قراراتها.',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'Ai_agents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ai_agents — هندسة البرمجيات بالذكاء الاصطناعي',
    description:
      'تعلّم هندسة البرمجيات بالتطبيق مع وكلاء الذكاء الاصطناعي.',
  },
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-body)] text-[var(--text-main)] font-sans antialiased selection:bg-[var(--accent-strong)] selection:text-[#17231f] transition-colors">
        <ServiceWorkerRegister />
        <ToastProvider>
          {/* Accessible Skip-to-Content Link for Screen Readers & Keyboard Navigation (WCAG AA) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent-strong)] focus:text-[#17231f] focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]"
          >
            تخطي إلى المحتوى الرئيسي
          </a>

          {/* Global Responsive Navigation Header */}
          <Navbar />

          {/* Semantic Main Content Shell */}
          <main id="main-content" className="flex-1 w-full flex flex-col focus:outline-none" tabIndex={-1}>
            {children}
          </main>

          {/* Global Platform Footer */}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
