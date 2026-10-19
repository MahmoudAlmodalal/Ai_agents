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
  themeColor: '#1e3a5f',
};

// 3. Comprehensive Educational Platform Metadata
export const metadata: Metadata = {
  title: {
    default: "سلاح العصر — MET Academy | Don't Just Prompt. Engineer.",
    template: '%s | سلاح العصر — MET Academy',
  },
  description:
    'الدورة التطبيقية المتكاملة لبناء وهندسة برمجيات الويب بالذكاء الاصطناعي — MET Academy. من الفكرة ووثيقة PRD والمخططات الهندسية إلى فرونت إند احترافي قابل للإنتاج. لا تكن ملقناً بل مهندساً.',
  keywords: [
    'سلاح العصر',
    'MET Academy',
    'هندسة البرمجيات بالذكاء الاصطناعي',
    'AI Agents',
    'Next.js 15 App Router',
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
  authors: [{ name: 'MET Academy' }],
  creator: 'MET Academy',
  publisher: 'MET Academy',
  metadataBase: new URL('https://met-academy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "سلاح العصر — MET Academy | Don't Just Prompt. Engineer.",
    description:
      'الدورة التطبيقية المتكاملة لبناء وهندسة برمجيات الويب بالذكاء الاصطناعي — MET Academy. لا تكن ملقناً بل مهندساً.',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'MET Academy — سلاح العصر',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سلاح العصر — MET Academy',
    description:
      'الدورة التطبيقية المتكاملة لبناء وهندسة برمجيات الويب بالذكاء الاصطناعي — MET Academy.',
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
      <body className="min-h-screen flex flex-col bg-[var(--bg-body)] text-[var(--text-main)] font-sans antialiased selection:bg-[#10b981] selection:text-white transition-colors">
        <ServiceWorkerRegister />
        <ToastProvider>
          {/* Accessible Skip-to-Content Link for Screen Readers & Keyboard Navigation (WCAG AA) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#10b981] focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a5f]"
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
