'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
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
  { title: 'مسار التعلم', href: '/learn/fundamentals-ai-agents', icon: GraduationCap, badge: 'موضوعات', isPrimary: true },
  { title: 'المتطلبات', href: '/learn/requirements-discovery', icon: Workflow, badge: 'Idea → PRD', isPrimary: true },
  { title: 'AI Studio وStitch', href: '/learn/google-ai-studio-stitch-workflow', icon: Sparkles, badge: 'Design → GitHub', isPrimary: true },
  { title: 'مكتبة البرومبتات', href: '/prompts', icon: Sparkles, badge: '30 برومبت', isPrimary: true },
  { title: 'مختبر المخططات', href: '/diagrams', icon: Workflow, badge: '8 مخططات', isPrimary: true },
  { title: 'ورشة BorrowHub', href: '/borrowhub', icon: FolderGit2, badge: 'حالة عملية', isPrimary: true },
  { title: 'الأدوات والتثبيت', href: '/tools', icon: Wrench, isPrimary: true },
  { title: 'الملفات والقوالب', href: '/templates', icon: Files, badge: '14 قالب', isPrimary: false, description: 'قوالب PRD و DESIGN.md ومخططات جاهزة' },
  { title: 'القاموس التقني', href: '/glossary', icon: BookOpen, badge: '35 مصطلح', isPrimary: false, description: 'دليل المصطلحات الإنجليزية والعربية' },
  { title: 'الأسئلة الشائعة', href: '/faq', icon: HelpCircle, badge: '12 سؤال', isPrimary: false, description: 'إجابات هندسية على استفسارات الطلاب' },
  { title: 'عن الدورة', href: '/about', icon: Info, isPrimary: false, description: 'رؤية MET Academy ومنهجية سلاح العصر' },
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
  }, []);

  // Toggle Theme handler
  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const themeVal = nextDark ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', themeVal);
      document.documentElement.setAttribute('data-theme', themeVal);
      if (nextDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
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
        className="sticky top-0 z-40 w-full bg-[var(--bg-surface)]/95 border-b border-[var(--border-color)] backdrop-blur-md transition-colors"
        dir="rtl"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* 1. Brand Logo & Identity (Right side in RTL) */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-lg p-1 transition-transform active:scale-95"
                aria-label="MET Academy سلاح العصر - الصفحة الرئيسية"
              >
                {/* MET Academy Hex/Badge Logo */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center font-black text-sm sm:text-base shadow-sm ring-1 ring-[#10b981]/40 overflow-hidden group-hover:ring-[#10b981] transition-all">
                  <span className="z-10 tracking-tighter">MET</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a5f] via-[#1e3a5f] to-[#10b981]/40 opacity-80" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#10b981] rounded-full blur-[2px]" />
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-sm sm:text-base font-extrabold text-[var(--text-main)] leading-tight group-hover:text-[#1e3a5f] dark:group-hover:text-[#10b981] transition-colors">
                    سلاح العصر
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] tracking-tight">
                    MET Academy — من الفكرة إلى الواجهات
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. Desktop Primary Navigation Links (Hidden on < lg) */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center max-w-4xl"
              aria-label="شريط التنقل الرئيسي"
            >
              {primaryItems.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] ${
                      active
                        ? 'bg-[#1e3a5f]/10 text-[#1e3a5f] dark:bg-[#10b981]/15 dark:text-[#10b981]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    <item.icon className={`w-3.5 h-3.5 ${active ? 'text-[#10b981]' : 'opacity-70'}`} />
                    <span>{item.title}</span>
                    {active && (
                      <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#10b981] rounded-full" />
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
                  aria-label="عرض المزيد من أقسام الدورة"
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] ${
                    isMoreActive || isMoreDropdownOpen
                      ? 'bg-[#1e3a5f]/10 text-[#1e3a5f] dark:bg-[#10b981]/15 dark:text-[#10b981]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 opacity-70" />
                  <span>المزيد</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isMoreDropdownOpen ? 'rotate-180 text-[#10b981]' : 'opacity-70'
                    }`}
                  />
                  {isMoreActive && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#10b981] rounded-full" />
                  )}
                </button>

                {/* Dropdown Content */}
                {isMoreDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl p-2 z-50">
                    <div className="text-[11px] font-extrabold text-[var(--text-faint)] px-3 py-1 border-b border-[var(--border-color)] mb-1">
                      أقسام ومراجع إضافية
                    </div>
                    {secondaryItems.map((item) => {
                      const active = isRouteActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            active
                              ? 'bg-[#1e3a5f]/10 text-[#1e3a5f] dark:bg-[#10b981]/15 dark:text-[#10b981]'
                              : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                              active
                                ? 'bg-[#10b981] text-white'
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
                              <p className="text-[11px] text-[var(--text-muted)] truncate mt-1">
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

            {/* 3. Action Utility Controls (Left side in RTL) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Quick CTA Button (Desktop only) */}
              <Link
                href="/start"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white bg-gradient-to-r from-[#1e3a5f] to-[#10b981] hover:opacity-95 shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
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
                className="w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
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
                className="lg:hidden w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
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
        className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
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
              <div className="w-8 h-8 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center font-black text-xs ring-1 ring-[#10b981]/40">
                MET
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-[var(--text-main)]">سلاح العصر</div>
                <div className="text-[10px] text-[var(--text-muted)]">دليل الدورة الكامل</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="إغلاق القائمة"
              className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body — Categorized Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {/* Group 1: الأساسيات والمسار التعليمي */}
            <div>
              <div className="text-[11px] font-extrabold text-[var(--text-faint)] px-3 mb-1.5 uppercase tracking-wider">
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
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#1e3a5f] text-white shadow-xs'
                          : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${active ? 'text-[#10b981]' : 'text-[var(--text-muted)]'}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            active ? 'bg-white/20 text-white' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
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
              <div className="text-[11px] font-extrabold text-[var(--text-faint)] px-3 mb-1.5 uppercase tracking-wider">
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
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#1e3a5f] text-white shadow-xs'
                          : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${active ? 'text-[#10b981]' : 'text-[var(--text-muted)]'}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            active ? 'bg-white/20 text-white' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
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
              <div className="text-[11px] font-extrabold text-[var(--text-faint)] px-3 mb-1.5 uppercase tracking-wider">
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
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#1e3a5f] text-white shadow-xs'
                          : 'text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${active ? 'text-[#10b981]' : 'text-[var(--text-muted)]'}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            active ? 'bg-white/20 text-white' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
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
              <div className="text-[11px] font-bold text-[#10b981]">Don&apos;t Just Prompt. Engineer.</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">MET Academy © 2026</div>
            </div>

            <Link
              href="/start"
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#1e3a5f] to-[#10b981] flex items-center justify-center gap-2 shadow-xs transition-opacity hover:opacity-95"
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
