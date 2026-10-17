import React from 'react';
import './globals.css';
import { metadata } from './metadata.ts';

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="next-app-root min-h-screen bg-[var(--bg-body)] text-[var(--text-main)] flex flex-col font-sans transition-colors selection:bg-blue-600 selection:text-white" dir="rtl" lang="ar">
      {/* Root Layout Header and Metas are dynamically bound */}
      {children}
    </div>
  );
}

export { metadata };
