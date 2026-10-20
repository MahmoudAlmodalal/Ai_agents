'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Compass,
  GraduationCap,
  Sparkles,
  Workflow,
  FolderGit2,
  Wrench,
  Files,
  BookOpen,
  HelpCircle,
  Info,
  ChevronDown,
  Sun,
  Moon,
  Home,
  Rocket,
  Layers,
  Download,
  Gauge,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
  isPrimary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { title: 'الرئيسية', href: '/', icon: Home, isPrimary: true },
  { title: 'ابدأ هنا', href: '/start', icon: Compass, isPrimary: true },
  { title: 'مسار التعلم', href: '/learn/project-idea-mvp', icon: GraduationCap, badge: 'موضوعات', isPrimary: true },
  { title: 'المتطلبات', href: '/learn/discovery-grill-me', icon: Workflow, badge: 'Idea → PRD', isPrimary: false },
  { title: 'Stitch MCP وDESIGN.md', href: '/learn/stitch-mcp-integration', icon: Sparkles, badge: 'Design → Code', isPrimary: false },
  { title: 'خارطة تنفيذ المشروع', href: '/roadmap', icon: Workflow, badge: 'مسار متسلسل', isPrimary: true },
  { title: 'Cheatsheet البرومبتات', href: '/cheatsheet', icon: Sparkles, badge: 'نسخ مباشر', isPrimary: false },
  { title: 'مكتبة البرومبتات', href: '/prompts', icon: Sparkles, badge: 'بحث ونسخ', isPrimary: true },
  { title: 'مختبر المخططات', href: '/diagrams', icon: Workflow, badge: '8 مخططات', isPrimary: false },
  { title: 'ورشة BorrowHub', href: '/borrowhub', icon: FolderGit2, badge: 'حالة عملية', isPrimary: false },
  { title: 'المحتوى المحفوظ', href: '/saved', icon: Download, badge: 'أوفلاين', isPrimary: false },
  { title: 'الأدوات والتثبيت', href: '/tools', icon: Wrench, badge: '13 وكيلا', isPrimary: false },
  { title: 'مؤشر الموديلات', href: '/models', icon: Sparkles, badge: 'الأفضل الآن', isPrimary: false },
  { title: 'لوحة التقدم', href: '/dashboard', icon: Gauge, badge: 'محلي', isPrimary: false, description: 'راجع نشاطك المحفوظ على هذا الجهاز' },
  { title: 'الملفات والقوالب', href: '/templates', icon: Files, badge: '14 قالب', isPrimary: false, description: 'قوالب PRD و DESIGN.md ومخططات جاهزة' },
  { title: 'القاموس التقني', href: '/glossary', icon: BookOpen, badge: '35 مصطلح', isPrimary: false, description: 'دليل المصطلحات الإنجليزية والعربية' },
  { title: 'الأسئلة الشائعة', href: '/faq', icon: HelpCircle, badge: '12 سؤال', isPrimary: false, description: 'إجابات هندسية على استفسارات الطلاب' },
  { title: 'عن Ai_agents', href: '/about', icon: Info, isPrimary: false, description: 'مسار هندسة البرمجيات ووكلاء الذكاء الاصطناعي' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const primaryItems = NAV_ITEMS.filter((item) => item.isPrimary);
  const secondaryItems = NAV_ITEMS.filter((item) => !item.isPrimary);

  // Check active route
  const isRouteActive = useCallback(
    (href: string) => {
      if (href === '/') {
        return pathname === '/';
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const isMoreActive = secondaryItems.some((item) => isRouteActive(item.href));

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      setIsDark(initialDark);
      if (initialDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Graceful fallback for non-browser/restricted environments
    }
    const syncTheme = () => setIsDark(document.documentElement.dataset.theme === 'dark');
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    syncTheme();
    return () => observer.disconnect();
  }, []);

  // Toggle Theme handler
  const toggleTheme = () => {
    const nextDark = document.documentElement.dataset.theme !== 'dark';
    setIsDark(nextDark);
    const themeVal = nextDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeVal);
    document.documentElement.classList.toggle('dark', nextDark);
    try {
      localStorage.setItem('theme', themeVal);
    } catch (e) {
      console.warn('Failed to persist theme:', e);
    }
  };

  // Close menus on route change
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsMoreDropdownOpen(false);
  }, [pathname]);

  // Handle escape key to close drawer/dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
          drawerButtonRef.current?.focus();
        }
        if (isMoreDropdownOpen) {
          setIsMoreDropdownOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, isMoreDropdownOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isDrawerOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };
    if (isMoreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMoreDropdownOpen]);

  return (
    <>
      <header
        className="site-header-main sticky top-0 z-[var(--z-header)] w-full bg-[var(--bg-surface)]/95 border-b border-[var(--border-color)] backdrop-blur-md transition-colors"
        dir="rtl"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* 1. Brand Logo & Identity (Right side in RTL) */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="group flex min-h-11 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-lg p-1 transition-transform active:scale-95"
                aria-label="Ai_agents — الصفحة الرئيسية"
              >
                <Image src="/ai-agents-mark.svg" alt="" width={40} height={40} className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl shadow-sm transition-transform group-hover:scale-[1.03]" />

                <div className="flex flex-col text-right">
                  <span dir="ltr" className="font-brand text-sm sm:text-base font-extrabold text-[var(--text-main)] leading-tight group-hover:text-[var(--primary)] transition-colors">
                    Ai_agents
                  </span>
                  <span className="hidden xl:block text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] tracking-tight">
                    هندسة برمجيات بالذكاء الاصطناعي
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. Desktop Primary Navigation Links (Hidden on < lg) */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-start max-w-4xl min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="شريط التنقل الرئيسي"
            >
              {primaryItems.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative min-h-11 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 select-none whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                      active
                        ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    <item.icon className={`w-3.5 h-3.5 ${active ? 'text-[var(--primary)]' : 'opacity-70'}`} />
                    <span>{item.title}</span>
                    {active && (
                      <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[var(--primary)] rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* "More" Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  aria-expanded={isMoreDropdownOpen}
                  aria-haspopup="true"
                  aria-label="عرض المزيد من أقسام Ai_agents"
                  className={`min-h-11 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                    isMoreActive || isMoreDropdownOpen
                      ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 opacity-70" />
                  <span>المزيد</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isMoreDropdownOpen ? 'rotate-180 text-[var(--primary)]' : 'opacity-70'
                    }`}
                  />
                  {isMoreActive && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[var(--primary)] rounded-full" />
                  )}
                </button>

                {/* Dropdown Content */}
                {isMoreDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl p-2 z-[var(--z-dropdown)]">
                    <div className="text-xs font-extrabold text-[var(--text-muted)] px-3 py-1 border-b border-[var(--border-color)] mb-1">
                      أقسام ومراجع إضافية
                    </div>
                    {secondaryItems.map((item) => {
                      const active = isRouteActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex min-h-11 items-start gap-3 p-2.5 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                            active
                              ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                              : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                              active
                                ? 'bg-[var(--action-bg)] text-[var(--action-text)]'
                                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)]'
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold leading-none">{item.title}</span>
                              {item.badge && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-[var(--text-muted)] truncate mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* 3. Action Utility Controls (Left side in RTL) — isolated above nav layer */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative z-10 bg-[var(--bg-surface)]">
              {/* Quick CTA Button (Desktop only) */}
              <Link
                href="/start"
                className="hidden sm:inline-flex min-h-11 items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-[var(--action-text)] bg-[var(--action-bg)] hover:bg-[var(--action-bg-hover)] shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>ابدأ الآن</span>
              </Link>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'التحويل إلى النمط النهاري' : 'التحويل إلى النمط الليلي'}
                title={isDark ? 'التحويل إلى النمط النهاري' : 'التحويل إلى النمط الليلي'}
                className="w-11 h-11 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Mobile Drawer Trigger Hamburger Button (Hidden on lg+) */}
              <button
                ref={drawerButtonRef}
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-nav-drawer"
                aria-label="فتح قائمة التنقل الرئيسية"
                className="lg:hidden w-11 h-11 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Mobile Navigation Drawer (Slide-in from Right in RTL) */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-0 z-[var(--z-drawer)] lg:hidden transition-visibility duration-300 ${
          isDrawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="إغلاق القائمة"
        />

        {/* Drawer Content Panel (Right aligned in RTL) */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل الجانبية"
          dir="rtl"
          className={`absolute top-0 right-0 bottom-0 w-84 max-w-[85vw] bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="h-16 px-4 border-b border-[var(--border-color)] flex items-center justify-between gap-3 bg-[var(--bg-card-subtle)]/50">
            <div className="flex items-center gap-2.5">
              <Image src="/ai-agents-mark.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />
              <div className="text-right">
                <div dir="ltr" className="font-brand text-sm font-extrabold text-[var(--text-main)]">Ai_agents</div>
                <div className="text-[10px] text-[var(--text-muted)]">من الفكرة إلى منتج برمجي</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="إغلاق القائمة"
              className="w-11 h-11 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body — Categorized Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {/* Group 1: الأساسيات والمسار التعليمي */}
            <div>
              <div className="text-xs font-extrabold text-[var(--text-muted)] px-3 mb-1.5 uppercase tracking-wider">
                المسار الأساسي
              </div>
              <div className="space-y-1">
                {NAV_ITEMS.slice(0, 3).map((item) => {
                  const active = isRouteActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-11 items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                        active
                          ? 'bg-[var(--action-bg)] text-[var(--action-text)] shadow-xs'
                          : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${active ? 'text-[var(--action-text)]' : 'text-[var(--text-muted)]'}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            active ? 'bg-black/10 text-[var(--action-text)]' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Group 2: المختبرات والمشاريع العملية */}
            <div>
              <div className="text-xs font-extrabold text-[var(--text-muted)] px-3 mb-1.5 uppercase tracking-wider">
                المختبرات والمشاريع
              </div>
              <div className="space-y-1">
                {NAV_ITEMS.slice(3, 7).map((item) => {
                  const active = isRouteActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-11 items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                        active
                          ? 'bg-[var(--action-bg)] text-[var(--action-text)] shadow-xs'
                          : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${active ? 'text-[var(--action-text)]' : 'text-[var(--text-muted)]'}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            active ? 'bg-black/10 text-[var(--action-text)]' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Group 3: المراجع والملفات والأسئلة */}
            <div>
              <div className="text-xs font-extrabold text-[var(--text-muted)] px-3 mb-1.5 uppercase tracking-wider">
                المراجع والدعم
              </div>
              <div className="space-y-1">
                {NAV_ITEMS.slice(7).map((item) => {
                  const active = isRouteActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-11 items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                        active
                          ? 'bg-[var(--action-bg)] text-[var(--action-text)] shadow-xs'
                          : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${active ? 'text-[var(--action-text)]' : 'text-[var(--text-muted)]'}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            active ? 'bg-black/10 text-[var(--action-text)]' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)]/40 space-y-3">
            <div className="text-center">
              <div className="text-[11px] font-bold text-[var(--accent)]">من الفكرة إلى منتج برمجي</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Ai_agents © 2026</div>
            </div>

            <Link
              href="/start"
              onClick={() => setIsDrawerOpen(false)}
              className="w-full min-h-11 py-2.5 rounded-xl text-xs font-extrabold text-[var(--action-text)] bg-[var(--action-bg)] hover:bg-[var(--action-bg-hover)] flex items-center justify-center gap-2 shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              <Rocket className="w-4 h-4" />
              <span>ابدأ رحلة التعلم</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
