import fs from 'fs';
import path from 'path';

import { topic01Html } from './topics/topic01.ts';
import { topic02Html } from './topics/topic02.ts';
import { topic03Html } from './topics/topic03.ts';
import { topic04Html } from './topics/topic04.ts';
import { topic05Html } from './topics/topic05.ts';
import { topic06Html } from './topics/topic06.ts';
import { topic07Html } from './topics/topic07.ts';
import { topic08Html } from './topics/topic08.ts';
import { topic09Html } from './topics/topic09.ts';
import { topic10Html } from './topics/topic10.ts';
import { topic11Html } from './topics/topic11.ts';
import { topic12Html } from './topics/topic12.ts';

const htmlTemplate = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي</title>
  <meta name="description" content="مرجع هندسي شامل ومفصل مقسم موضوعياً: من استنطاق الفكرة ووثيقة PRD والمخططات الهندسية الثمانية (UML & ERD) إلى هندسة قواعد البيانات وتصميم الواجهات وتطوير الفرونت إند.">
  <meta property="og:title" content="الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي">
  <meta property="og:description" content="مرجع هندسي شامل ومفصل مقسم موضوعياً: من استنطاق الفكرة ووثيقة PRD والمخططات الهندسية الثمانية (UML & ERD) إلى هندسة قواعد البيانات وتصميم الواجهات وتطوير الفرونت إند.">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Google Fonts: Cairo, Tajawal, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">

  <!-- Pinned Mermaid JS -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"></script>

  <style>
    /* CSS Custom Properties & Design Tokens */
    :root {
      --font-sans: 'Cairo', 'Tajawal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', 'Cairo', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

      /* Light Theme Colors */
      --bg-body: #f8fafc;
      --bg-surface: #ffffff;
      --bg-card: #ffffff;
      --bg-card-subtle: #f1f5f9;
      --border-color: #e2e8f0;
      --border-focus: #3b82f6;

      --text-main: #0f172a;
      --text-muted: #475569;
      --text-faint: #94a3b8;

      --brand-primary: #1d4ed8;
      --brand-primary-hover: #1e40af;
      --brand-light: #eff6ff;
      --brand-border: #bfdbfe;

      /* Callout Tokens */
      --callout-tip-bg: #f0fdf4;
      --callout-tip-border: #22c55e;
      --callout-tip-text: #14532d;

      --callout-warning-bg: #fffbeb;
      --callout-warning-border: #f59e0b;
      --callout-warning-text: #78350f;

      --callout-note-bg: #f0f9ff;
      --callout-note-border: #0ea5e9;
      --callout-note-text: #0c4a6e;

      --callout-mistake-bg: #fef2f2;
      --callout-mistake-border: #ef4444;
      --callout-mistake-text: #7f1d1d;

      /* Code Block Tokens */
      --code-bg: #0f172a;
      --code-header-bg: #1e293b;
      --code-text: #e2e8f0;
      --code-comment: #94a3b8;
      --code-keyword: #38bdf8;
      --code-string: #4ade80;
      --code-border: #334155;

      /* Layout & Dimensions */
      --header-height: 72px;
      --sidebar-width: 320px;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;

      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    [data-theme="dark"] {
      --bg-body: #0b0f19;
      --bg-surface: #111827;
      --bg-card: #1f2937;
      --bg-card-subtle: #172033;
      --border-color: #374151;
      --border-focus: #60a5fa;

      --text-main: #f9fafb;
      --text-muted: #9ca3af;
      --text-faint: #6b7280;

      --brand-primary: #3b82f6;
      --brand-primary-hover: #60a5fa;
      --brand-light: #1e293b;
      --brand-border: #1d4ed8;

      --callout-tip-bg: #064e3b;
      --callout-tip-border: #10b981;
      --callout-tip-text: #ecfdf5;

      --callout-warning-bg: #451a03;
      --callout-warning-border: #f59e0b;
      --callout-warning-text: #fef3c7;

      --callout-note-bg: #082f49;
      --callout-note-border: #0284c7;
      --callout-note-text: #e0f2fe;

      --callout-mistake-bg: #450a0a;
      --callout-mistake-border: #ef4444;
      --callout-mistake-text: #fee2e2;

      --code-bg: #030712;
      --code-header-bg: #111827;
      --code-text: #f3f4f6;
      --code-border: #1f2937;
    }

    /* Reset & Base Styles */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-body);
      color: var(--text-main);
      line-height: 1.75;
      direction: rtl;
      text-align: right;
      transition: background-color 0.25s ease, color 0.25s ease;
      overflow-x: hidden;
    }

    /* Reading Progress Bar */
    #progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: transparent;
      z-index: 1000;
    }
    #progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #3b82f6, #10b981);
      transition: width 0.1s ease;
    }

    /* Fixed Site Header */
    /* Fixed Site Header */
    header.site-header {
      position: sticky;
      top: 0;
      height: var(--header-height);
      background-color: var(--bg-surface);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.25rem;
      z-index: 900;
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      gap: 0.75rem;
    }

    .header-branding {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
      flex: 1;
    }

    .academy-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
      color: #ffffff;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 0.85rem;
      box-shadow: 0 2px 4px rgba(29, 78, 216, 0.25);
      flex-shrink: 0;
    }

    .header-title-wrap {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .header-title-wrap h1 {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .header-title-wrap span {
      font-size: 0.8rem;
      color: var(--text-muted);
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
      flex-wrap: nowrap;
    }

    .btn-control {
      background-color: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.45rem 0.8rem;
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      transition: all 0.2s ease;
      white-space: nowrap;
      user-select: none;
    }
    .btn-control:hover {
      background-color: var(--border-color);
      border-color: var(--border-focus);
    }
    .btn-control:active {
      transform: scale(0.96);
    }

    .mobile-menu-btn {
      display: none;
      background: var(--brand-light);
      border: 1px solid var(--brand-border);
      color: var(--brand-primary);
      font-weight: 700;
      padding: 0.4rem 0.65rem;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    /* Main Container & Layout */
    .app-layout {
      display: flex;
      min-height: calc(100vh - var(--header-height));
      max-width: 1720px;
      margin: 0 auto;
      position: relative;
    }

    /* Sidebar Table of Contents */
    aside.sidebar {
      width: var(--sidebar-width);
      flex-shrink: 0;
      background-color: var(--bg-surface);
      border-left: 1px solid var(--border-color);
      position: sticky;
      top: var(--header-height);
      height: calc(100vh - var(--header-height));
      overflow-y: auto;
      padding: 1.25rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sidebar-header {
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 0.5rem;
    }
    .sidebar-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .sidebar-header h3 {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
    }
    .sidebar-header p {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }
    .sidebar-close-btn {
      display: none;
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 700;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .sidebar-close-btn:hover {
      background: var(--border-color);
      color: var(--text-main);
    }

    /* Sidebar Drawer Backdrop Overlay (Mobile) */
    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 940;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }
    .sidebar-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .toc-search {
      width: 100%;
      padding: 0.45rem 0.75rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background-color: var(--bg-body);
      color: var(--text-main);
      font-family: var(--font-sans);
      font-size: 0.8rem;
      outline: none;
      margin-bottom: 0.5rem;
    }
    .toc-search:focus {
      border-color: var(--border-focus);
    }

    .toc-nav {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .toc-group-title {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--text-faint);
      margin-top: 0.85rem;
      margin-bottom: 0.2rem;
      padding: 0 0.5rem;
      letter-spacing: 0.05em;
    }

    .toc-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.65rem;
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.84rem;
      font-weight: 600;
      transition: all 0.15s ease;
      line-height: 1.4;
    }
    .toc-link:hover {
      background-color: var(--bg-card-subtle);
      color: var(--brand-primary);
    }
    .toc-link.active {
      background-color: var(--brand-light);
      color: var(--brand-primary);
      font-weight: 700;
      border-right: 3px solid var(--brand-primary);
    }
    .toc-link .badge-num {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
      background-color: var(--bg-card-subtle);
      color: var(--text-muted);
      font-weight: 700;
      flex-shrink: 0;
    }
    .toc-link.active .badge-num {
      background-color: var(--brand-primary);
      color: #ffffff;
    }

    /* Main Content Area */
    main.content-area {
      flex: 1;
      min-width: 0;
      padding: 2.5rem 3.5rem;
      max-width: 1400px;
    }

    /* Headings & Typography */
    h1, h2, h3, h4, h5 {
      color: var(--text-main);
      font-weight: 800;
      line-height: 1.35;
      margin-bottom: 0.75rem;
    }
    h1 {
      font-size: 2.2rem;
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }
    h2 {
      font-size: 1.55rem;
      margin-top: 2rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    h3 {
      font-size: 1.2rem;
      margin-top: 1.5rem;
    }
    h4 {
      font-size: 1.02rem;
      margin-top: 1rem;
    }
    p {
      margin-bottom: 1rem;
      color: var(--text-muted);
      font-size: 1rem;
    }
    strong {
      color: var(--text-main);
      font-weight: 700;
    }

    /* Topic Section Container */
    .topic-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 2.5rem 2.25rem;
      margin-bottom: 3.5rem;
      box-shadow: var(--shadow-sm);
      scroll-margin-top: calc(var(--header-height) + 1.5rem);
    }

    /* Step Badges and Pills */
    .step-badge-group {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .stage-tag {
      background-color: var(--brand-light);
      color: var(--brand-primary);
      border: 1px solid var(--brand-border);
      padding: 0.2rem 0.65rem;
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      font-weight: 800;
    }
    .step-pill {
      background-color: var(--bg-card-subtle);
      color: var(--text-muted);
      border: 1px solid var(--border-color);
      padding: 0.2rem 0.65rem;
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      font-family: var(--font-sans);
      font-weight: 700;
    }

    .step-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
    }
    .step-number {
      background: linear-gradient(135deg, var(--brand-primary) 0%, #3b82f6 100%);
      color: #ffffff;
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 1.2rem;
      font-weight: 800;
      flex-shrink: 0;
      box-shadow: var(--shadow-md);
    }
    .step-title-wrap {
      flex: 1;
      min-width: 0;
    }
    .step-title {
      font-size: 1.45rem;
      font-weight: 800;
      margin-bottom: 0.2rem;
    }
    .step-subtitle {
      font-size: 0.92rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Callout Boxes */
    .callout {
      border-right: 4px solid;
      border-radius: var(--radius-sm);
      padding: 1.15rem 1.4rem;
      margin: 1.35rem 0;
      font-size: 0.95rem;
      line-height: 1.7;
    }
    .callout-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 800;
      margin-bottom: 0.45rem;
      font-size: 1rem;
    }
    .callout.tip {
      background-color: var(--callout-tip-bg);
      border-color: var(--callout-tip-border);
      color: var(--callout-tip-text);
    }
    .callout.warning {
      background-color: var(--callout-warning-bg);
      border-color: var(--callout-warning-border);
      color: var(--callout-warning-text);
    }
    .callout.note {
      background-color: var(--callout-note-bg);
      border-color: var(--callout-note-border);
      color: var(--callout-note-text);
    }
    .callout.mistake {
      background-color: var(--callout-mistake-bg);
      border-color: var(--callout-mistake-border);
      color: var(--callout-mistake-text);
    }

    /* Step Cards and Nested Boxes */
    .step-card {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin: 1.5rem 0;
    }

    /* Code Blocks with Copy Button */
    .code-container {
      background-color: var(--code-bg);
      border: 1px solid var(--code-border);
      border-radius: var(--radius-md);
      margin: 1.35rem 0;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      direction: ltr;
      text-align: left;
    }
    .code-header {
      background-color: var(--code-header-bg);
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--code-border);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: #94a3b8;
    }
    .code-lang {
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .copy-btn {
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      padding: 0.25rem 0.65rem;
      border-radius: 4px;
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
    }
    .copy-btn:hover {
      background-color: rgba(255, 255, 255, 0.18);
      color: #ffffff;
    }
    .copy-btn.copied {
      background-color: #059669;
      border-color: #10b981;
      color: #ffffff;
    }
    pre.code-content {
      padding: 1.25rem 1.25rem;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      color: var(--code-text);
      line-height: 1.65;
    }
    pre.code-content code {
      font-family: inherit;
    }

    /* Tables */
    .table-container {
      width: 100%;
      overflow-x: auto;
      margin: 1.35rem 0;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: right;
      font-size: 0.92rem;
    }
    table.data-table th, table.data-table td {
      padding: 0.85rem 1.15rem;
      border-bottom: 1px solid var(--border-color);
    }
    table.data-table th {
      background-color: var(--bg-card-subtle);
      font-weight: 800;
      color: var(--text-main);
      font-size: 0.88rem;
    }
    table.data-table tr:last-child td {
      border-bottom: none;
    }
    table.data-table tr:hover td {
      background-color: var(--bg-card-subtle);
    }

    /* Diagram Containers */
    .diagram-box {
      background-color: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin: 1.5rem 0;
      text-align: center;
    }
    .diagram-box h4 {
      margin-bottom: 1rem;
      color: var(--text-main);
      font-size: 1.05rem;
      font-weight: 800;
    }
    .diagram-caption {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 0.85rem;
      font-style: italic;
    }

    /* Checklists */
    .checklist-card {
      background-color: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.25rem 1.5rem;
      margin: 1.25rem 0;
    }
    .checklist-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
    }
    .checklist-title {
      font-weight: 800;
      font-size: 0.95rem;
      color: var(--text-main);
    }
    .checklist-counter {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--brand-primary);
      background-color: var(--brand-light);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
    }
    .checklist-items {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: 0.92rem;
      color: var(--text-muted);
      cursor: pointer;
    }
    .checklist-item input[type="checkbox"] {
      margin-top: 0.3rem;
      accent-color: var(--brand-primary);
      width: 17px;
      height: 17px;
      cursor: pointer;
    }

    /* Accordions */
    details.example-accordion {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      margin: 1rem 0;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    details.example-accordion[open] {
      box-shadow: var(--shadow-sm);
    }
    summary.example-summary {
      padding: 0.9rem 1.25rem;
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--bg-card-subtle);
      user-select: none;
      transition: background-color 0.15s;
    }
    summary.example-summary:hover {
      background-color: var(--border-color);
    }
    .example-tag {
      font-size: 0.75rem;
      background: var(--brand-light);
      color: var(--brand-primary);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-family: var(--font-mono);
    }
    .example-body {
      padding: 1.25rem;
      border-top: 1px solid var(--border-color);
      font-size: 0.92rem;
      line-height: 1.7;
    }

    /* Floating Back to Top Button */
    #back-to-top {
      position: fixed;
      bottom: 6.5rem;
      left: 2rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: var(--brand-primary);
      color: #ffffff;
      border: none;
      box-shadow: var(--shadow-lg);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.25s ease;
      z-index: 800;
    }
    #back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    #back-to-top:hover {
      background-color: var(--brand-primary-hover);
      transform: translateY(-3px);
    }

    /* ============================================================
       TTS Web Speech Audio Player & Section Listeners (100% Free)
       ============================================================ */
    .tts-player {
      position: fixed;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(130%);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.05);
      border-radius: 9999px;
      padding: 0.55rem 1.25rem;
      z-index: 1000;
      width: 92%;
      max-width: 960px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
    }
    .tts-player.active {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .tts-drag-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .tts-info {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      flex: 1 1 240px;
      min-width: 0;
    }

    .tts-wave-indicator {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 20px;
      width: 24px;
      flex-shrink: 0;
    }
    .tts-wave-indicator span {
      width: 4px;
      background: var(--brand-primary);
      border-radius: 2px;
      height: 4px;
      transition: height 0.2s ease;
    }
    .tts-player.speaking .tts-wave-indicator span:nth-child(1) {
      animation: ttsWave 0.8s ease-in-out infinite alternate;
    }
    .tts-player.speaking .tts-wave-indicator span:nth-child(2) {
      animation: ttsWave 1.1s ease-in-out infinite alternate 0.2s;
    }
    .tts-player.speaking .tts-wave-indicator span:nth-child(3) {
      animation: ttsWave 0.9s ease-in-out infinite alternate 0.4s;
    }
    .tts-player.speaking .tts-wave-indicator span:nth-child(4) {
      animation: ttsWave 1.2s ease-in-out infinite alternate 0.1s;
    }
    @keyframes ttsWave {
      0% { height: 4px; background: var(--brand-primary); }
      100% { height: 20px; background: #10b981; }
    }

    .tts-text-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      white-space: nowrap;
    }

    .tts-badge-free {
      font-size: 0.68rem;
      font-weight: 700;
      color: #10b981;
      letter-spacing: 0.02em;
    }

    .tts-current-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-main);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tts-controls {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .tts-btn {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }
    .tts-btn:hover {
      background: var(--border-color);
      transform: scale(1.06);
    }
    .tts-btn-primary {
      background: var(--brand-primary);
      color: #ffffff;
      border-color: var(--brand-primary);
      width: 42px;
      height: 42px;
      font-size: 1.1rem;
    }
    .tts-btn-primary:hover {
      background: var(--brand-primary-hover);
      transform: scale(1.08);
    }

    .tts-settings {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .tts-speed-selector, .tts-voice-selector {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .tts-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .tts-select {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      font-family: inherit;
    }
    .tts-select:focus {
      outline: none;
      border-color: var(--brand-primary);
    }

    .tts-voice-selector select {
      max-width: 150px;
      text-overflow: ellipsis;
    }

    .tts-autoscroll-label {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.75rem;
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
    }

    .tts-btn-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1rem;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      transition: color 0.2s;
    }
    .tts-btn-close:hover {
      color: #ef4444;
    }

    /* Active Highlight on Section being read */
    .tts-active-reading {
      outline: 2px solid #3b82f6 !important;
      outline-offset: 3px;
      box-shadow: 0 0 25px rgba(59, 130, 246, 0.35) !important;
      transition: all 0.3s ease;
      position: relative;
    }
    .tts-active-reading::before {
      content: '🔊 جاري الاستماع الآن...';
      position: absolute;
      top: -12px;
      left: 20px;
      background: #3b82f6;
      color: #fff;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      z-index: 10;
    }

    /* Step listen button */
    .step-listen-btn {
      background: var(--bg-card-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      border-radius: 20px;
      font-size: 0.76rem;
      font-family: var(--font-sans);
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s ease;
    }
    .step-listen-btn:hover {
      background: var(--brand-primary);
      color: #ffffff;
      border-color: var(--brand-primary);
      transform: translateY(-1px);
    }
    .step-listen-btn.playing {
      background: #10b981;
      color: #ffffff;
      border-color: #10b981;
    }

    /* Responsive adjustments */
    @media (max-width: 1100px) {
      :root {
        --header-height: 60px;
      }
      header.site-header {
        height: 60px;
        padding: 0 0.85rem;
      }
      .academy-badge {
        display: none;
      }
      .header-title-wrap span {
        display: none;
      }
      .header-title-wrap h1 {
        font-size: 0.95rem;
        max-width: 280px;
      }
      .mobile-menu-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }
      .sidebar-close-btn {
        display: inline-flex;
      }
      aside.sidebar {
        position: fixed;
        right: -100%;
        top: 0;
        bottom: 0;
        height: 100vh;
        height: 100dvh;
        width: min(340px, 86vw);
        z-index: 960;
        box-shadow: -8px 0 30px rgba(0, 0, 0, 0.4);
        border-left: 1px solid var(--border-color);
      }
      aside.sidebar.open {
        right: 0;
      }
      main.content-area {
        padding: 1.75rem 1.25rem;
      }
    }

    @media (max-width: 768px) {
      body {
        font-size: 15px;
      }
      header.site-header {
        height: 56px;
        padding: 0 0.65rem;
        gap: 0.4rem;
      }
      .header-branding {
        gap: 0.45rem;
      }
      .header-title-wrap h1 {
        font-size: 0.9rem;
        max-width: 170px;
      }
      .header-controls {
        gap: 0.3rem;
        flex-wrap: nowrap;
      }
      .header-controls .btn-text {
        display: none !important;
      }
      .btn-control {
        padding: 0.35rem 0.5rem;
        min-width: 36px;
        height: 36px;
        font-size: 0.85rem;
        border-radius: var(--radius-sm);
      }
      .mobile-menu-btn .btn-text {
        display: inline-block;
        font-size: 0.8rem;
      }

      /* Content Area & Sections */
      main.content-area {
        padding: 1rem 0.65rem;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
      }
      .topic-section {
        padding: 1.25rem 0.85rem;
        margin-bottom: 2rem;
        border-radius: 12px;
        scroll-margin-top: calc(var(--header-height) + 1rem);
      }
      h1 {
        font-size: 1.45rem;
        line-height: 1.3;
      }
      h2 {
        font-size: 1.25rem;
        margin-top: 1.5rem;
      }
      h3 {
        font-size: 1.1rem;
      }

      /* Steps & Badges */
      .step-header {
        gap: 0.65rem;
        margin-bottom: 0.85rem;
      }
      .step-number {
        width: 36px;
        height: 36px;
        font-size: 1rem;
        border-radius: 8px;
      }
      .step-title {
        font-size: 1.15rem;
      }
      .step-subtitle {
        font-size: 0.84rem;
      }
      .step-badge-group {
        flex-wrap: wrap;
        gap: 0.35rem;
      }

      /* Cards & Containers */
      .callout {
        padding: 0.85rem 1rem;
        margin: 1rem 0;
        font-size: 0.88rem;
        line-height: 1.65;
      }
      .step-card {
        padding: 1rem 0.75rem;
        margin: 1rem 0;
        border-radius: var(--radius-sm);
      }
      .code-container {
        margin: 1rem 0;
        border-radius: var(--radius-sm);
      }
      .code-header {
        padding: 0.4rem 0.75rem;
        font-size: 0.72rem;
      }
      pre.code-content {
        padding: 0.85rem;
        font-size: 0.78rem;
        line-height: 1.55;
      }
      .table-container {
        margin: 1rem 0;
        border-radius: var(--radius-sm);
        -webkit-overflow-scrolling: touch;
      }
      table.data-table th, table.data-table td {
        padding: 0.55rem 0.7rem;
        font-size: 0.82rem;
      }
      .diagram-box {
        padding: 1rem 0.5rem;
        margin: 1rem 0;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      .diagram-box svg {
        max-width: 100% !important;
        height: auto !important;
      }
      .checklist-card {
        padding: 1rem 0.85rem;
      }
      details.example-accordion {
        margin: 0.75rem 0;
      }
      summary.example-summary {
        padding: 0.75rem 0.9rem;
        font-size: 0.88rem;
      }
      .example-body {
        padding: 0.9rem 0.85rem;
      }

      /* Back to Top */
      #back-to-top {
        bottom: 5.5rem;
        left: 0.85rem;
        width: 38px;
        height: 38px;
        font-size: 1.1rem;
      }

      /* TTS Player on Mobile */
      .tts-player {
        border-radius: 18px;
        padding: 0.65rem 0.85rem;
        bottom: 0.6rem;
        width: calc(100% - 1.25rem);
        max-width: 520px;
        transform: translateX(-50%) translateY(140%);
      }
      .tts-player.active {
        transform: translateX(-50%) translateY(0);
      }
      .tts-drag-header {
        gap: 0.4rem;
        justify-content: space-between;
      }
      .tts-info {
        flex: 1 1 auto;
        min-width: 0;
        gap: 0.5rem;
      }
      .tts-badge-free {
        display: none;
      }
      .tts-current-title {
        font-size: 0.78rem;
        max-width: 130px;
      }
      .tts-voice-selector {
        display: none;
      }
      .tts-controls {
        gap: 0.25rem;
      }
      .tts-btn {
        width: 32px;
        height: 32px;
        font-size: 0.82rem;
      }
      .tts-btn-primary {
        width: 38px;
        height: 38px;
        font-size: 0.95rem;
      }
      .tts-settings {
        gap: 0.35rem;
      }
      .tts-speed-selector select {
        padding: 0.2rem 0.35rem;
        font-size: 0.72rem;
      }
      .tts-autoscroll-label {
        font-size: 0.7rem;
      }
    }

    @media (max-width: 480px) {
      header.site-header {
        padding: 0 0.5rem;
      }
      .header-title-wrap h1 {
        font-size: 0.85rem;
        max-width: 130px;
      }
      .print-btn {
        display: none !important;
      }
      main.content-area {
        padding: 0.75rem 0.45rem;
      }
      .topic-section {
        padding: 1rem 0.65rem;
      }
      .tts-current-title {
        max-width: 90px;
      }
    }

    /* Print Stylesheet */
    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
        font-size: 12pt;
      }
      header.site-header, aside.sidebar, #progress-container, #back-to-top, .btn-control, .copy-btn, .tts-player {
        display: none !important;
      }
      main.content-area {
        padding: 0 !important;
        max-width: 100% !important;
      }
      .step-card, .diagram-box, .code-container, .table-container, .topic-section {
        page-break-inside: avoid;
        box-shadow: none !important;
        border: 1px solid #ccc !important;
      }
      details.example-accordion {
        page-break-inside: avoid;
      }
      details.example-accordion:not([open]) {
        display: block !important;
      }
      .example-body {
        display: block !important;
      }
    }
  </style>
</head>
<body>

  <!-- Reading Progress Bar -->
  <div id="progress-container">
    <div id="progress-bar"></div>
  </div>

  <!-- Header -->
  <header class="site-header">
    <div class="header-branding">
      <button class="btn-control mobile-menu-btn" id="toggle-sidebar" aria-label="فتح القائمة الجانبية">
        <span>☰</span>
        <span class="btn-text">الفهرس</span>
      </button>
      <div class="academy-badge">
        <span>⚔️ سلاح العصر</span>
        <span>|</span>
        <span>MET Academy</span>
      </div>
      <div class="header-title-wrap">
        <h1>الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي</h1>
        <span>من استنطاق الفكرة ووثيقة PRD والمخططات الهندسية إلى المعمارية وقواعد البيانات وتطوير الواجهات</span>
      </div>
    </div>

    <div class="header-controls">
      <button class="btn-control tts-header-btn" id="tts-toggle-btn" title="القارئ الصوتي الذكي (Web Speech API) - مجاني 100%" aria-label="القارئ الصوتي">
        <span id="tts-icon">🎧</span>
        <span class="btn-text" id="tts-header-text">القارئ الصوتي</span>
      </button>
      <button class="btn-control" id="theme-toggle" title="تبديل النمط النهاري / الليلي" aria-label="تبديل الوضع">
        <span id="theme-icon">🌙</span>
        <span class="btn-text" id="theme-text">الوضع الليلي</span>
      </button>
      <button class="btn-control" id="expand-all-btn" title="فتح أو غلق كافة الأمثلة العملية" aria-label="توسيع أو طي الأمثلة">
        <span>📂</span>
        <span class="btn-text" id="expand-all-text">توسيع الأمثلة</span>
      </button>
      <button class="btn-control print-btn" onclick="window.print()" title="طباعة الدليل أو حفظه بصيغة PDF" aria-label="طباعة الدليل">
        <span>🖨️</span>
        <span class="btn-text">طباعة</span>
      </button>
    </div>
  </header>

  <!-- Main App Layout -->
  <div class="app-layout">
    <!-- Backdrop Overlay for Mobile Sidebar Drawer -->
    <div id="sidebar-overlay" class="sidebar-overlay" aria-hidden="true"></div>

    <!-- Sticky Sidebar Table of Contents -->
    <aside class="sidebar" id="sidebar" aria-label="فهرس المواضيع">
      <div class="sidebar-header">
        <div class="sidebar-header-top">
          <h3>📑 خريطة المواضيع الهندسية</h3>
          <button id="close-sidebar-btn" class="sidebar-close-btn" aria-label="إغلاق الفهرس" title="إغلاق الفهرس">✕</button>
        </div>
        <p>التنقل السريع بين محاور ومنهجية البناء</p>
      </div>

      <input type="text" class="toc-search" id="toc-filter" placeholder="🔍 ابحث في عناصر الفهرس...">

      <nav class="toc-nav" id="toc-nav-list">
        <div class="toc-group-title">المرحلة التأسيسية والتحليل</div>
        <a href="#topic-01" class="toc-link active">
          <span class="badge-num">01</span> الأساسيات وبناء المشاريع دون تخمين
        </a>
        <a href="#topic-02" class="toc-link">
          <span class="badge-num">02</span> استجواب الفكرة ووثيقة PRD.md
        </a>
        <a href="#topic-03" class="toc-link">
          <span class="badge-num">03</span> نمذجة مسارات وتجربة المستخدم (User Flow)
        </a>

        <div class="toc-group-title">نمذجة الأنظمة والمعمارية</div>
        <a href="#topic-04" class="toc-link">
          <span class="badge-num">04</span> المخططات المعمارية السبعة (UML)
        </a>
        <a href="#topic-05" class="toc-link">
          <span class="badge-num">05</span> هندسة قواعد البيانات وأداء الاستعلامات
        </a>
        <a href="#topic-06" class="toc-link">
          <span class="badge-num">06</span> الصورة المعمارية الكبرى وتوزيع المسؤوليات
        </a>
        <a href="#topic-07" class="toc-link">
          <span class="badge-num">07</span> تنظيم ملفات المشروع وإدارة Git / GitHub
        </a>

        <div class="toc-group-title">الواجهات والتنفيذ البرمجي</div>
        <a href="#topic-08" class="toc-link">
          <span class="badge-num">08</span> تصميم الواجهات وأنظمة Google Stitch
        </a>
        <a href="#topic-09" class="toc-link">
          <span class="badge-num">09</span> بروتوكول Stitch MCP وتشريح DESIGN.md
        </a>
        <a href="#topic-10" class="toc-link">
          <span class="badge-num">10</span> تخطيط الفرونت إند والتنفيذ بـ Spec Kit
        </a>
        <a href="#topic-11" class="toc-link">
          <span class="badge-num">11</span> مصفوفة الفحص الشامل وضمان الجودة (QA)
        </a>

        <div class="toc-group-title">المرجعيات والقاموس</div>
        <a href="#topic-12" class="toc-link">
          <span class="badge-num">12</span> أسئلة الفهم، القواعد الذهبية، والقاموس
        </a>
      </nav>
    </aside>

    <!-- Main Content Body -->
    <main class="content-area" id="main-content">
` + topic01Html + topic02Html + topic03Html + topic04Html + topic05Html + topic06Html + topic07Html + topic08Html + topic09Html + topic10Html + topic11Html + topic12Html + `
    </main>
  </div>

  <!-- Floating Back to Top Button -->
  <button id="back-to-top" title="العودة إلى أعلى الصفحة">↑</button>

  <!-- Floating Text-to-Speech (TTS) Player Bar (100% Free - Web Speech API) -->
  <aside id="tts-player" class="tts-player" aria-label="مشغل القراءة الصوتية للدليل الهندسي" role="region">
    <div class="tts-drag-header" id="tts-header">
      <div class="tts-info">
        <div class="tts-wave-indicator" id="tts-wave" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="tts-text-info">
          <span class="tts-badge-free">✨ Web Speech API • مجاني وبدون أي تكلفة أو اشتراك</span>
          <div class="tts-current-title" id="tts-current-title">جاهز للاستماع للمحتوى الهندسي</div>
        </div>
      </div>
      
      <div class="tts-controls">
        <button class="tts-btn" id="tts-prev-btn" title="الموضوع السابق" aria-label="الموضوع السابق">⏮️</button>
        <button class="tts-btn tts-btn-primary" id="tts-play-btn" title="تشغيل / إيقاف مؤقت" aria-label="تشغيل">▶️</button>
        <button class="tts-btn" id="tts-stop-btn" title="إيقاف كلي" aria-label="إيقاف">⏹️</button>
        <button class="tts-btn" id="tts-next-btn" title="الموضوع التالي" aria-label="الموضوع التالي">⏭️</button>
      </div>

      <div class="tts-settings">
        <!-- Speed selector -->
        <div class="tts-speed-selector">
          <label for="tts-rate" class="tts-label">السرعة:</label>
          <select id="tts-rate" class="tts-select" aria-label="سرعة القراءة">
            <option value="0.85">0.85x</option>
            <option value="1.0" selected>1.0x</option>
            <option value="1.2">1.2x</option>
            <option value="1.35">1.35x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>

        <!-- Voice selector -->
        <div class="tts-voice-selector">
          <label for="tts-voice" class="tts-label">الصوت:</label>
          <select id="tts-voice" class="tts-select" aria-label="اختيار الصوت">
            <option value="">جاري البحث عن الأصوات...</option>
          </select>
        </div>

        <!-- Auto scroll toggle -->
        <label class="tts-autoscroll-label" title="التمرير التلقائي لمتابعة النص المقروء">
          <input type="checkbox" id="tts-autoscroll" checked>
          <span>تتبع</span>
        </label>

        <!-- Minimize / Close button -->
        <button class="tts-btn-close" id="tts-close-btn" title="إخفاء المشغل" aria-label="إخفاء المشغل">✕</button>
      </div>
    </div>
  </aside>

  <!-- Inline Core Scripts -->
  <script>
    // Initialize Mermaid with Theme Sync
    function initMermaid(isDark) {
      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: true,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'JetBrains Mono, Cairo, sans-serif'
        });
      }
    }

    // Reading Progress Bar
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const pBar = document.getElementById('progress-bar');
      if (pBar) pBar.style.width = scrolled + '%';

      // Back to top visibility
      const btt = document.getElementById('back-to-top');
      if (btt) {
        if (winScroll > 400) {
          btt.classList.add('visible');
        } else {
          btt.classList.remove('visible');
        }
      }
    });

    // Back to top click
    document.getElementById('back-to-top')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('doc-theme', theme);
      const isDark = theme === 'dark';
      if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
      if (themeText) themeText.textContent = isDark ? 'الوضع النهاري' : 'الوضع الليلي';
      initMermaid(isDark);
    }

    const savedTheme = localStorage.getItem('doc-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggleBtn?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Mobile Sidebar Drawer & Overlay Management
    const sidebarToggleBtn = document.getElementById('toggle-sidebar');
    const sidebarEl = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    function openSidebar() {
      sidebarEl?.classList.add('open');
      sidebarOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebarEl?.classList.remove('open');
      sidebarOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }

    sidebarToggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebarEl?.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    closeSidebarBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });

    sidebarOverlay?.addEventListener('click', () => {
      closeSidebar();
    });

    // Close sidebar on link click (mobile)
    document.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1100) {
          closeSidebar();
        }
      });
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebarEl?.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Filter Table of Contents
    const tocFilter = document.getElementById('toc-filter');
    tocFilter?.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('#toc-nav-list .toc-link').forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(term) ? 'flex' : 'none';
      });
    });

    // Expand/Collapse All Accordions
    let allExpanded = true;
    const expandAllBtn = document.getElementById('expand-all-btn');
    expandAllBtn?.addEventListener('click', () => {
      allExpanded = !allExpanded;
      document.querySelectorAll('details.example-accordion').forEach(acc => {
        acc.open = allExpanded;
      });
      const textSpan = document.getElementById('expand-all-text');
      if (textSpan) {
        textSpan.textContent = allExpanded ? 'طي الأمثلة' : 'توسيع الأمثلة';
      }
    });

    // Copy to Clipboard
    window.copyCode = function(button) {
      const container = button.closest('.code-container');
      const codeElement = container?.querySelector('pre.code-content code');
      if (!codeElement) return;

      const text = codeElement.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '✓ تم النسخ!';
        button.classList.add('copied');
        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.error('فشل النسخ إلى الحافظة:', err);
      });
    };

    // Checklist LocalStorage Persistence
    window.updateChecklist = function(stepId) {
      const card = document.querySelector(\`.checklist-card[data-step="\${stepId}"]\`);
      if (!card) return;

      const checkboxes = card.querySelectorAll('input[type="checkbox"]');
      const state = Array.from(checkboxes).map(cb => cb.checked);
      localStorage.setItem(\`checklist_\${stepId}\`, JSON.stringify(state));

      const checkedCount = state.filter(Boolean).length;
      const counter = document.getElementById(\`counter-\${stepId}\`);
      if (counter) {
        counter.textContent = \`\${checkedCount} / \${checkboxes.length} مكتمل\`;
      }
    };

    function loadChecklists() {
      document.querySelectorAll('.checklist-card').forEach(card => {
        const stepId = card.getAttribute('data-step');
        if (!stepId) return;

        const saved = localStorage.getItem(\`checklist_\${stepId}\`);
        if (saved) {
          try {
            const state = JSON.parse(saved);
            const checkboxes = card.querySelectorAll('input[type="checkbox"]');
            let checkedCount = 0;
            checkboxes.forEach((cb, idx) => {
              if (state[idx] !== undefined) {
                cb.checked = state[idx];
              }
              if (cb.checked) checkedCount++;
            });
            const counter = document.getElementById(\`counter-\${stepId}\`);
            if (counter) {
              counter.textContent = \`\${checkedCount} / \${checkboxes.length} مكتمل\`;
            }
          } catch (e) {
            console.error('Error loading checklist', e);
          }
        }
      });
    }

    // Scrollspy for Active TOC Link
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('.topic-section');
      let currentId = '';

      sections.forEach(sec => {
        const secTop = sec.offsetTop - 120;
        if (window.scrollY >= secTop) {
          currentId = sec.getAttribute('id') || '';
        }
      });

      if (currentId) {
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === \`#\${currentId}\`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Filter Glossary Table
    const glossarySearchInput = document.getElementById('glossary-search');
    glossarySearchInput?.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('#glossary-table tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });

    // ============================================================
    // Comprehensive Web Speech API Text-to-Speech Engine (100% Free)
    // ============================================================
    const ttsState = {
      isSupported: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
      isPlaying: false,
      isPaused: false,
      sections: [],
      currentIndex: 0,
      currentUtterance: null,
      voices: [],
      selectedVoice: null,
      rate: 1.0,
      autoScroll: true,
      textChunks: [],
      currentChunkIndex: 0
    };

    const ttsPlayer = document.getElementById('tts-player');
    const ttsToggleBtn = document.getElementById('tts-toggle-btn');
    const ttsPlayBtn = document.getElementById('tts-play-btn');
    const ttsStopBtn = document.getElementById('tts-stop-btn');
    const ttsPrevBtn = document.getElementById('tts-prev-btn');
    const ttsNextBtn = document.getElementById('tts-next-btn');
    const ttsRateSelect = document.getElementById('tts-rate');
    const ttsVoiceSelect = document.getElementById('tts-voice');
    const ttsAutoScrollCb = document.getElementById('tts-autoscroll');
    const ttsCloseBtn = document.getElementById('tts-close-btn');
    const ttsTitle = document.getElementById('tts-current-title');

    function initTTSSections() {
      ttsState.sections = [];
      const candidateElements = document.querySelectorAll('.topic-section, .step-card');

      candidateElements.forEach((el, idx) => {
        const titleEl = el.querySelector('.step-title') || el.querySelector('h2') || el.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.innerText.trim();
        
        const headerEl = el.querySelector('.step-header') || titleEl;
        if (headerEl && !headerEl.querySelector('.step-listen-btn')) {
          const btn = document.createElement('button');
          btn.className = 'step-listen-btn';
          btn.setAttribute('type', 'button');
          btn.setAttribute('title', \`استمع صوتياً لـ: \${title}\`);
          btn.innerHTML = '<span>🔊</span><span>استمع للموضوع</span>';
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSectionByIndex(idx);
          });
          if (headerEl.classList.contains('step-header')) {
            headerEl.appendChild(btn);
          } else {
            titleEl.insertAdjacentElement('afterend', btn);
          }
        }

        const clone = el.cloneNode(true);
        clone.querySelectorAll('svg, pre, code, .code-container, .checklist-card, .example-body, button, script, style').forEach(n => n.remove());
        
        let cleanText = clone.innerText
          .replace(/\\s+/g, ' ')
          .replace(/[#*\`_~]/g, '')
          .trim();

        const fullSpeech = \`الموضوع: \${title}. \${cleanText}\`;

        ttsState.sections.push({
          id: el.id || \`tts-sec-\${idx}\`,
          title: title,
          element: el,
          text: fullSpeech
        });
      });
    }

    function loadVoices() {
      if (!ttsState.isSupported) {
        if (ttsTitle) ttsTitle.textContent = 'المتصفح لا يدعم Web Speech API';
        return;
      }
      const voices = window.speechSynthesis.getVoices();
      ttsState.voices = voices;
      if (!ttsVoiceSelect) return;

      ttsVoiceSelect.innerHTML = '';
      const arVoices = voices.filter(v => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic'));
      const otherVoices = voices.filter(v => !v.lang.startsWith('ar') && !v.name.toLowerCase().includes('arabic'));

      if (arVoices.length > 0) {
        arVoices.forEach((v) => {
          const opt = document.createElement('option');
          opt.value = v.name;
          opt.textContent = \`🇸🇦 \${v.name} (\${v.lang})\`;
          ttsVoiceSelect.appendChild(opt);
        });
        ttsState.selectedVoice = arVoices[0];
      }

      otherVoices.slice(0, 10).forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        opt.textContent = \`🌐 \${v.name} (\${v.lang})\`;
        ttsVoiceSelect.appendChild(opt);
      });

      if (ttsVoiceSelect.children.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'الصوت الافتراضي للجهاز';
        ttsVoiceSelect.appendChild(opt);
      } else if (arVoices.length === 0 && voices.length > 0) {
        ttsState.selectedVoice = voices[0];
      }
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    function chunkText(text) {
      const sentences = text.match(/[^.،!؟\\n]+[.،!؟\\n]+/g) || [text];
      const chunks = [];
      let current = '';

      sentences.forEach(s => {
        if ((current + s).length < 180) {
          current += ' ' + s;
        } else {
          if (current.trim()) chunks.push(current.trim());
          current = s;
        }
      });
      if (current.trim()) chunks.push(current.trim());
      return chunks.length > 0 ? chunks : [text];
    }

    function playSectionByIndex(index) {
      if (!ttsState.isSupported) {
        alert('المتصفح الحالي لا يدعم Web Speech API للقراءة الصوتية.');
        return;
      }
      if (index < 0 || index >= ttsState.sections.length) return;

      stopSpeech();
      ttsState.currentIndex = index;
      const section = ttsState.sections[index];

      document.querySelectorAll('.tts-active-reading').forEach(el => el.classList.remove('tts-active-reading'));
      section.element.classList.add('tts-active-reading');

      if (ttsState.autoScroll) {
        section.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (ttsTitle) ttsTitle.textContent = section.title;
      ttsPlayer?.classList.add('active');
      ttsPlayer?.classList.add('speaking');
      if (ttsPlayBtn) ttsPlayBtn.textContent = '⏸️';

      ttsState.textChunks = chunkText(section.text);
      ttsState.currentChunkIndex = 0;
      ttsState.isPlaying = true;
      ttsState.isPaused = false;

      speakNextChunk();
    }

    function speakNextChunk() {
      if (!ttsState.isPlaying || ttsState.isPaused) return;

      if (ttsState.currentChunkIndex >= ttsState.textChunks.length) {
        if (ttsState.currentIndex + 1 < ttsState.sections.length) {
          playSectionByIndex(ttsState.currentIndex + 1);
        } else {
          stopSpeech();
          if (ttsTitle) ttsTitle.textContent = 'تم الانتهاء من قراءة الدليل كاملاً 🎉';
        }
        return;
      }

      const chunk = ttsState.textChunks[ttsState.currentChunkIndex];
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = ttsState.rate;
      if (ttsState.selectedVoice) {
        utterance.voice = ttsState.selectedVoice;
        utterance.lang = ttsState.selectedVoice.lang || 'ar-SA';
      } else {
        utterance.lang = 'ar-SA';
      }

      utterance.onend = () => {
        ttsState.currentChunkIndex++;
        speakNextChunk();
      };

      utterance.onerror = (e) => {
        console.warn('TTS chunk error:', e);
        ttsState.currentChunkIndex++;
        speakNextChunk();
      };

      ttsState.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    }

    function pauseSpeech() {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        ttsState.isPaused = true;
        ttsPlayer?.classList.remove('speaking');
        if (ttsPlayBtn) ttsPlayBtn.textContent = '▶️';
      }
    }

    function resumeSpeech() {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        ttsState.isPaused = false;
        ttsPlayer?.classList.add('speaking');
        if (ttsPlayBtn) ttsPlayBtn.textContent = '⏸️';
      } else if (!ttsState.isPlaying) {
        playSectionByIndex(ttsState.currentIndex || 0);
      }
    }

    function stopSpeech() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      ttsState.isPlaying = false;
      ttsState.isPaused = false;
      ttsState.currentChunkIndex = 0;
      ttsPlayer?.classList.remove('speaking');
      if (ttsPlayBtn) ttsPlayBtn.textContent = '▶️';
      document.querySelectorAll('.tts-active-reading').forEach(el => el.classList.remove('tts-active-reading'));
      document.querySelectorAll('.step-listen-btn.playing').forEach(btn => btn.classList.remove('playing'));
    }

    ttsPlayBtn?.addEventListener('click', () => {
      if (ttsState.isPlaying && !ttsState.isPaused) {
        pauseSpeech();
      } else if (ttsState.isPaused) {
        resumeSpeech();
      } else {
        playSectionByIndex(ttsState.currentIndex || 0);
      }
    });

    ttsStopBtn?.addEventListener('click', () => {
      stopSpeech();
      if (ttsTitle) ttsTitle.textContent = 'تم إيقاف القراءة';
    });

    ttsNextBtn?.addEventListener('click', () => {
      if (ttsState.currentIndex + 1 < ttsState.sections.length) {
        playSectionByIndex(ttsState.currentIndex + 1);
      }
    });

    ttsPrevBtn?.addEventListener('click', () => {
      if (ttsState.currentIndex - 1 >= 0) {
        playSectionByIndex(ttsState.currentIndex - 1);
      }
    });

    ttsRateSelect?.addEventListener('change', (e) => {
      ttsState.rate = parseFloat(e.target.value) || 1.0;
      if (ttsState.isPlaying && !ttsState.isPaused) {
        window.speechSynthesis.cancel();
        speakNextChunk();
      }
    });

    ttsVoiceSelect?.addEventListener('change', (e) => {
      const v = ttsState.voices.find(voice => voice.name === e.target.value);
      if (v) ttsState.selectedVoice = v;
      if (ttsState.isPlaying && !ttsState.isPaused) {
        window.speechSynthesis.cancel();
        speakNextChunk();
      }
    });

    ttsAutoScrollCb?.addEventListener('change', (e) => {
      ttsState.autoScroll = e.target.checked;
    });

    ttsCloseBtn?.addEventListener('click', () => {
      stopSpeech();
      ttsPlayer?.classList.remove('active');
    });

    ttsToggleBtn?.addEventListener('click', () => {
      ttsPlayer?.classList.toggle('active');
      if (ttsPlayer?.classList.contains('active') && !ttsState.isPlaying) {
        playSectionByIndex(ttsState.currentIndex || 0);
      }
    });

    setInterval(() => {
      if (ttsState.isPlaying && !ttsState.isPaused && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 12000);

    document.addEventListener('DOMContentLoaded', () => {
      initMermaid(document.documentElement.getAttribute('data-theme') === 'dark');
      loadChecklists();
      initTTSSections();
      loadVoices();
    });
  </script>
</body>
</html>
`;

const outputPath = path.resolve(process.cwd(), 'index.html');
fs.writeFileSync(outputPath, htmlTemplate, 'utf-8');
console.log('Successfully generated topic-based guide to:', outputPath);
