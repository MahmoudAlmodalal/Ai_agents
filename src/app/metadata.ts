import type { Metadata, Viewport } from 'next';

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a5f',
};

export const siteMetadata: Metadata = {
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
