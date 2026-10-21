import type { Metadata, Viewport } from 'next';

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#17231f',
};

export const siteMetadata: Metadata = {
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
