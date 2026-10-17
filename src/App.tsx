import React from 'react';
import RootLayout from '@/src/app/layout.tsx';
import HomePage from '@/src/app/page.tsx';

/**
 * App Root mounting the modern Next.js App Router architecture
 * Structure:
 * - src/app/layout.tsx: Root layout, HTML attributes, metadata & design tokens
 * - src/app/page.tsx: App Router page with 'use client' boundaries
 * - src/app/globals.css: Global styles, CSS custom properties & print media
 * - src/app/metadata.ts: Next.js metadata definition
 */
export default function App() {
  return (
    <RootLayout>
      <HomePage />
    </RootLayout>
  );
}
