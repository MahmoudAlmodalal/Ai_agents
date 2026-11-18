'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HeartCrack, ArrowLeft, BookOpen, Eye, Route, Compass, Layers, Sparkles, GraduationCap } from 'lucide-react';
import { TOPICS, CATEGORY_METADATA, deriveCategoryCounts } from '@/src/data/topicsData.ts';
import { TopicCategory, ContentType, TopicItem } from '@/src/types/topic.ts';

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  all: 'الكل',
  diagram: 'مخططات',
  prompt: 'برومبتات',
  code: 'أكواد',
  checklist: 'قوائم فحص',
  glossary: 'مصطلحات',
};
import { normalizeArabic, stripHtml } from '@/src/utils/searchUtils.ts';
import { SearchHeader } from '@/src/components/SearchHeader.tsx';
import { FilterToolbar } from '@/src/components/FilterToolbar.tsx';
import { TopicCard } from '@/src/components/TopicCard.tsx';
import { TopicDetailModal } from '@/src/components/TopicDetailModal.tsx';
import { AudioPlayerBar } from '@/src/components/AudioPlayerBar.tsx';
import { RecentlyViewedSection } from '@/src/components/RecentlyViewedSection.tsx';
import Link from 'next/link';
import { HistoricalSavedItems } from '@/src/components/HistoricalSavedItems';
import { EntryQuestion } from '@/src/components/EntryQuestion';

import {
  readSavedBookmarks,
  writeSavedBookmarks,
  readSavedRecentlyViewed,
  writeSavedRecentlyViewed,
  resolveCanonicalSlug,
  getTopicBySlug,
  getSavedBookmarksStatus,
  subscribeTopicStorage,
  type TopicStorageStatus,
} from '@/src/lib/topicRegistry.ts';
import { LearnerPersistenceNotice } from '@/src/components/LearnerPersistenceNotice';
import { renderWithTechTerms } from '@/src/components/TechTermTooltip.tsx';
import { InteractiveWorkflowExample } from '@/src/components/InteractiveWorkflowExample.tsx';
import { LearnerProgressBar } from '@/src/components/LearnerProgressBar.tsx';
import { getAllProposedGroups } from '@/src/lib/educationalRoadmap';

const firstTopic = TOPICS[0];
const proposedGroupCount = getAllProposedGroups().length;

export default function HomePage() {
  // State: Search & Filters
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<TopicCategory>('all');
  const [selectedContentType, setSelectedContentType] = React.useState<ContentType>('all');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState<boolean>(false);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  // State: Bookmarks / Favorites (stored in localStorage via canonical slugs adapter)
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState<boolean>(false);
  const [storageStatus, setStorageStatus] = React.useState<TopicStorageStatus>('loading');

  // State: Modal Detail Reader
  const [activeTopicId, setActiveTopicId] = React.useState<string | null>(null);
  const [previewDiagramRequested, setPreviewDiagramRequested] = React.useState(false);

  // State: Recently Viewed Topics (tracks last 5 topics, stored in localStorage via adapter)
  const [recentlyViewed, setRecentlyViewed] = React.useState<string[]>([]);

  React.useEffect(() => {
    const readSavedData = () => {
      setBookmarks(readSavedBookmarks());
      setRecentlyViewed(readSavedRecentlyViewed());
      setStorageStatus(getSavedBookmarksStatus());
    };
    readSavedData();
    const unsub = subscribeTopicStorage(readSavedData);
    window.addEventListener('storage', readSavedData);
    window.addEventListener('pageshow', readSavedData);
    return () => {
      unsub();
      window.removeEventListener('storage', readSavedData);
      window.removeEventListener('pageshow', readSavedData);
    };
  }, []);

  // Track opening a topic in Recently Viewed (persisting up to 5 topics)
  const handleOpenTopic = React.useCallback((topicId: string, section?: 'diagram') => {
    const slug = resolveCanonicalSlug(topicId);
    setActiveTopicId(slug);
    setPreviewDiagramRequested(section === 'diagram');
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== slug);
      const updated = writeSavedRecentlyViewed([slug, ...filtered]);
      setStorageStatus(getSavedBookmarksStatus());
      return updated;
    });
  }, []);

  // Clear recently viewed history
  const handleClearRecentlyViewed = React.useCallback(() => {
    setRecentlyViewed((previous) => {
      const updated = writeSavedRecentlyViewed(previous.filter((id) => !getTopicBySlug(id)));
      setStorageStatus(getSavedBookmarksStatus());
      return updated;
    });
  }, []);

  // State: Dark Mode (defaults to user preference or localStorage)
  const [isDark, setIsDark] = React.useState<boolean>(false);

  // State: Audio TTS
  const [ttsCurrentTopic, setTtsCurrentTopic] = React.useState<TopicItem | null>(null);
  const [isTTSPlaying, setIsTTSPlaying] = React.useState<boolean>(false);
  const [isTTSPaused, setIsTTSPaused] = React.useState<boolean>(false);
  const [ttsRate, setTtsRate] = React.useState<number>(1.0);
  const [isTTSActive, setIsTTSActive] = React.useState<boolean>(false);

  // Follow the global Navbar theme without overwriting it when returning home.
  React.useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.dataset.theme === 'dark');
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextDark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', nextDark);
    setIsDark(nextDark);
    try { localStorage.setItem('theme', nextDark ? 'dark' : 'light'); } catch { /* Theme remains usable without storage. */ }
  };

  React.useEffect(() => () => window.speechSynthesis?.cancel(), []);

  // Toggle bookmark handler with persistence
  const handleToggleBookmark = (topicIdOrSlug: string) => {
    const slug = resolveCanonicalSlug(topicIdOrSlug);
    setBookmarks((prev) => {
      const exists = prev.includes(slug);
      const updated = exists ? prev.filter((id) => id !== slug) : [...prev, slug];
      const saved = writeSavedBookmarks(updated);
      setStorageStatus(getSavedBookmarksStatus());
      return saved;
    });
  };

  // Compute searchable stripped texts once
  const strippedContentMap = React.useMemo(() => {
    const map = new Map<string, string>();
    TOPICS.forEach((t) => {
      map.set(t.id, normalizeArabic(stripHtml(t.htmlContent)));
    });
    return map;
  }, []);

  // Candidate topics matching bookmarks, content-type, and keyword search across metadata and stripped HTML
  const candidateTopics = React.useMemo(() => {
    const normQuery = normalizeArabic(searchQuery.trim());

    return TOPICS.filter((topic) => {
      // 1. Favorites Only Filter
      if (showFavoritesOnly && !bookmarks.includes(topic.slug) && !bookmarks.includes(topic.id)) {
        return false;
      }

      // 2. Content Type Filter
      if (selectedContentType !== 'all' && !topic.contentTypes.includes(selectedContentType)) {
        return false;
      }

      // 3. Keyword Search Match
      if (!normQuery) return true;

      const normTitle = normalizeArabic(topic.title);
      const normSubtitle = normalizeArabic(topic.subtitle);
      const normStage = normalizeArabic(topic.stageTag);
      const normSummary = normalizeArabic(topic.summary);
      const normTags = topic.tags.map((t) => normalizeArabic(t)).join(' ');
      const normContent = strippedContentMap.get(topic.id) || '';

      const matchTitle = normTitle.includes(normQuery);
      const matchSubtitle = normSubtitle.includes(normQuery);
      const matchStage = normStage.includes(normQuery);
      const matchSummary = normSummary.includes(normQuery);
      const matchTags = normTags.includes(normQuery);
      const matchContent = normContent.includes(normQuery);

      return matchTitle || matchSubtitle || matchStage || matchSummary || matchTags || matchContent;
    });
  }, [searchQuery, selectedContentType, showFavoritesOnly, bookmarks, strippedContentMap]);

  // Derived category counts before selected-category restriction
  const categoryCounts = React.useMemo(() => {
    return deriveCategoryCounts(candidateTopics);
  }, [candidateTopics]);

  // Filtered Topics with category filter applied
  const filteredTopics = React.useMemo(() => {
    if (selectedCategory === 'all') return candidateTopics;
    return candidateTopics.filter((topic) => topic.category === selectedCategory);
  }, [candidateTopics, selectedCategory]);

  const isFiltered =
    selectedCategory !== 'all' ||
    selectedContentType !== 'all' ||
    searchQuery.trim().length > 0 ||
    showFavoritesOnly;

  const INITIAL_TOPIC_COUNT = 9;

  const visibleTopics = React.useMemo(() => {
    if (isFiltered || isExpanded) {
      return filteredTopics;
    }
    return filteredTopics.slice(0, INITIAL_TOPIC_COUNT);
  }, [filteredTopics, isFiltered, isExpanded]);


  // Active topic object for modal
  const activeTopic = React.useMemo(() => {
    if (!activeTopicId) return null;
    return getTopicBySlug(activeTopicId) || TOPICS.find((t) => t.id === activeTopicId) || null;
  }, [activeTopicId]);

  const activeIndex = React.useMemo(() => {
    if (!activeTopic) return -1;
    return TOPICS.findIndex((t) => t.slug === activeTopic.slug || t.id === activeTopic.id);
  }, [activeTopic]);

  // Resolve Recently Viewed Topic Objects (max 5)
  const recentlyViewedTopics = React.useMemo(() => {
    return recentlyViewed
      .map((id) => getTopicBySlug(id) || TOPICS.find((t) => t.id === id))
      .filter((t): t is TopicItem => Boolean(t));
  }, [recentlyViewed]);

  const handleNavigateTopic = (direction: 'next' | 'prev') => {
    if (activeIndex === -1) return;
    const targetIdx = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (targetIdx >= 0 && targetIdx < TOPICS.length) {
      handleOpenTopic(TOPICS[targetIdx].slug);
    }
  };

  // Smooth scroll to results
  const scrollToResults = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        const target = document.getElementById('active-filter-bar') || document.getElementById('topics');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  const handleSelectCategory = React.useCallback((category: TopicCategory) => {
    setSelectedCategory(category);
    scrollToResults();
  }, [scrollToResults]);

  const handleSelectContentType = React.useCallback((contentType: ContentType) => {
    setSelectedContentType(contentType);
    scrollToResults();
  }, [scrollToResults]);

  const handleSearchChange = React.useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      scrollToResults();
    }
  }, [scrollToResults]);

  const handleToggleFavoritesOnly = React.useCallback(() => {
    setShowFavoritesOnly((prev) => {
      const next = !prev;
      if (next) scrollToResults();
      return next;
    });
  }, [scrollToResults]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedContentType('all');
    setShowFavoritesOnly(false);
    setIsExpanded(false);
  };

  // TTS Helper Functions
  const stopTTS = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsTTSPlaying(false);
    setIsTTSPaused(false);
  };

  const playTTSForTopic = (topic: TopicItem) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }
    stopTTS();
    setTtsCurrentTopic(topic);
    setIsTTSActive(true);

    const plainText = `${topic.title}. ${topic.subtitle}. ${topic.summary}. ${stripHtml(topic.htmlContent).slice(0, 1500)}`;
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'ar-SA';
    utterance.rate = ttsRate;

    utterance.onend = () => {
      setIsTTSPlaying(false);
      setIsTTSPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      setIsTTSPlaying(false);
      setIsTTSPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsTTSPlaying(true);
    setIsTTSPaused(false);
  };

  const pauseTTS = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsTTSPaused(true);
    }
  };

  const resumeTTS = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis && isTTSPaused) {
      window.speechSynthesis.resume();
      setIsTTSPaused(false);
    } else if (ttsCurrentTopic) {
      playTTSForTopic(ttsCurrentTopic);
    } else if (TOPICS.length > 0) {
      playTTSForTopic(TOPICS[0]);
    }
  };

  return (
    <>
      {/* 1. Onboarding Hero & Pathways directly under Navbar */}
      {!showFavoritesOnly && (
        <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          {/* Hero Section */}
          <section className="home-hero mb-6 sm:mb-8" aria-labelledby="home-hero-title">
            <div className="home-hero-copy">
              <span className="home-hero-kicker"><span dir="ltr" className="font-brand">Ai_agents</span> · التعلّم بالتطبيق</span>
              <h1 id="home-hero-title" className="home-hero-title">
                من فكرة أولية إلى منتج برمجي <em>تفهمه وتختبره</em>
              </h1>
              <p className="home-hero-description">
                تعلّم كيف توجّه وكلاء الذكاء الاصطناعي عبر المتطلبات والتصميم والبناء والاختبار، مع بقاء القرارات الهندسية واضحة لك.
              </p>
              <div className="home-hero-actions">
                <Link href={`/learn/${firstTopic.slug}`} className="home-hero-button home-hero-button-primary min-h-[44px]">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>ابدأ بالموضوع الأول</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="home-hero-button home-hero-button-secondary min-h-[44px]"
                  onClick={() => handleOpenTopic(firstTopic.id)}
                  aria-haspopup="dialog"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span>معاينة سريعة</span>
                </button>
              </div>
              <div className="home-hero-facts" aria-label="معلومات المسار">
                <span className="home-hero-fact">المدة الرسمية للبرنامج: 40 ساعة.</span>
                <span className="home-hero-fact"><strong dir="ltr">{TOPICS.length}</strong> موضوعًا متاحًا</span>
                <span className="home-hero-fact"><strong dir="ltr">{proposedGroupCount}</strong> مراحل لبناء المشروع</span>
                <span className="home-hero-fact"><Route className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" /> يمكنك فتح أي موضوع مباشرة</span>
              </div>
              <Link href="/start#project-path" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-md">
                استكشف خارطة رحلة المشروع <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="home-lesson-card" aria-label="معاينة الموضوع الأول">
              <div className="home-lesson-topline">
                <span dir="ltr" className="home-lesson-label">TOPIC 01 · START HERE</span>
                <span dir="ltr">Ai_agents / 01</span>
              </div>
              <h2>{renderWithTechTerms(firstTopic.title)}</h2>
              <p className="home-lesson-subtitle">{renderWithTechTerms(firstTopic.subtitle)}</p>
              <p className="home-lesson-goal">{renderWithTechTerms(firstTopic.goal)}</p>
              {firstTopic.outputs[0] && (
                <div className="home-lesson-output">
                  <small>مخرجك الأول</small>
                  <code dir="ltr">{firstTopic.outputs[0]}</code>
                </div>
              )}
              <p className="home-lesson-footer">ابدأ بمشروعك أنت، وكل موضوع يبني على مخرج واضح.</p>
            </div>
          </section>

          {/* Interactive Mini-Example */}
          <InteractiveWorkflowExample className="mb-6 sm:mb-8" />

          {/* New Section: كيف تبدأ حسب مستواك؟ */}
          <section className="mb-6 sm:mb-8" aria-labelledby="start-by-level-title">
            <div className="mb-4">
              <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                توجيه مخصص للمتعلم
              </span>
              <h2 id="start-by-level-title" className="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1">
                كيف تبدأ حسب مستواك؟
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                اختر المسار الأنسب لخبرتك وهدفك الحالي للوصول إلى المحتوى العملي الأكثر فائدة لك مباشرة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* بطاقة 1: مبتدئ تماماً (أول مشروع لي) */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 flex flex-col justify-between hover:border-[var(--primary-border)] hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                      <Compass className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                      المسار التأسيسي
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[var(--text-main)]">مبتدئ تمامًا (أول مشروع لي)</h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                    {renderWithTechTerms('نبدأ معك خطوة بخطوة من الصفر: صياغة فكرة مشروع حقيقية، تحديد نطاق النسخة الأولى (MVP)، وطرح أسئلة التحدي لبلورة الفكرة قبل كتابة الكود.')}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--border-color)]/60 flex flex-col gap-2">
                  <Link
                    href="/learn/project-idea-mvp"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-xs font-bold hover:bg-[var(--action-bg-hover)] transition-colors"
                  >
                    <span>ابدأ بفكرة المشروع (Topic 01)</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/start"
                    className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold"
                  >
                    <span>دليل البداية وخطوات الطالب الأولى ←</span>
                  </Link>
                </div>
              </div>

              {/* بطاقة 2: لدي فكرة وأريد التخطيط والتصميم */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 flex flex-col justify-between hover:border-[var(--primary-border)] hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                      <Layers className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100/60 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                      المعمارية والتصميم
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[var(--text-main)]">لدي فكرة وأريد التخطيط والتصميم</h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                    {renderWithTechTerms('فكرتك واضحة؟ انتقل مباشرة لتوثيق المتطلبات (PRD)، نمذجة مسارات النظام ومخططات UML وقواعد البيانات (ERD)، ثم تصميم الواجهات في Stitch.')}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--border-color)]/60 flex flex-col gap-2">
                  <Link
                    href="/learn/stitch-to-frontend"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-xs font-bold hover:bg-[var(--action-bg-hover)] transition-colors"
                  >
                    <span>جلسة تصميم الواجهات و <bdi dir="ltr">Stitch</bdi></span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/diagrams"
                    className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold"
                  >
                    <span>استكشف مخططات المعمارية والبيانات ←</span>
                  </Link>
                </div>
              </div>

              {/* بطاقة 3: أريد برومبتات ومخططات جاهزة */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 flex flex-col justify-between hover:border-[var(--primary-border)] hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100/60 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                      أدوات ومخرجات جاهزة
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[var(--text-main)]">أريد برومبتات ومخططات جاهزة</h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                    تبحث عن قوالب برومبتات مهندسة ومجربة لتوجيه وكلاء الذكاء الاصطناعي، أو مخططات تفاعلية جاهزة للنسخ والتعديل المباشر لمشروعك؟
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--border-color)]/60 flex flex-col gap-2">
                  <Link
                    href="/prompts"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-xs font-bold hover:bg-[var(--action-bg-hover)] transition-colors"
                  >
                    <span>استكشف مكتبة البرومبتات</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/diagrams"
                    className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold"
                  >
                    <span>مختبر المخططات التفاعلية (8 مخططات) ←</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 2. Search Header and Filter Toolbar placed below Hero & Pathways */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleTTS={() => {
          if (isTTSActive && isTTSPlaying) {
            stopTTS();
            setIsTTSActive(false);
          } else {
            setIsTTSActive(true);
            playTTSForTopic(activeTopic || TOPICS[0]);
          }
        }}
        isTTSActive={isTTSActive}
        isMobileSearchOpen={isMobileSearchOpen}
        onToggleMobileSearch={() => setIsMobileSearchOpen((prev) => !prev)}
        bookmarksCount={bookmarks.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={handleToggleFavoritesOnly}
      />

      <FilterToolbar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        selectedContentType={selectedContentType}
        onSelectContentType={handleSelectContentType}
        totalTopicsCount={TOPICS.length}
        filteredCount={filteredTopics.length}
        searchQuery={searchQuery}
        onResetFilters={handleResetFilters}
        bookmarksCount={bookmarks.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={handleToggleFavoritesOnly}
        categoryCounts={categoryCounts}
      />

      {/* 3. Main Topic Explorer */}
      <main className={`page-shell flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 ${isTTSActive ? 'pb-32 sm:pb-28' : 'pb-10'}`} style={isTTSActive && activeTopic ? { paddingBottom: '9rem' } : undefined}>
        {/* Favorites Active Banner */}
        {showFavoritesOnly && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">❤️</span>
              <span className="font-bold text-rose-800 dark:text-rose-200">
                أنت تتصفح قائمة المواضيع المحفوظة في المفضلة ({filteredTopics.length} موضوعاً)
              </span>
            </div>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="px-2.5 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              عرض كافة المواضيع ←
            </button>
          </div>
        )}

        {!showFavoritesOnly && <EntryQuestion />}

        {/* Guided practice session: one page across design → frontend */}
        {!showFavoritesOnly && (
          <Link
            href="/learn/stitch-to-frontend"
            className="mb-4 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-2xs transition-colors hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950/20 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white" aria-hidden="true">
                <Route className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  جلسة تطبيقية · 3 ساعات · تجمع المواضيع 18–37
                </p>
                <p className="mt-0.5 text-sm font-black text-[var(--text-main)]">
                  من تصميم Stitch إلى Frontend احترافي
                </p>
                <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">
                  فحص المشروع، خطة Next.js، دورة Spec Kit، ومراجعة UI/UX Pro Max — ثم تنفيذ مهمة واحدة قابلة للمراجعة.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-[var(--action-bg)] px-4 py-2 text-xs font-black text-[var(--action-text)] sm:self-auto">
              افتح الجلسة
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        )}

        {/* Persistence status notice */}
        <LearnerPersistenceNotice status={storageStatus} className="mb-4" />

        {/* Recently Viewed Section (tracks last 5 topics opened) */}
        {!showFavoritesOnly && (
          <RecentlyViewedSection
            topics={recentlyViewedTopics}
            onClear={handleClearRecentlyViewed}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        <HistoricalSavedItems bookmarks={bookmarks} recentlyViewed={recentlyViewed} />

        {/* Active Filter Indicator Bar */}
        {isFiltered && (
          <div
            id="active-filter-bar"
            className="mb-4 flex flex-wrap items-center justify-between gap-2.5 p-3 sm:px-4 rounded-xl border border-[var(--primary-border,var(--border-color))] bg-[var(--primary-light)]/40 text-xs shadow-2xs scroll-mt-36"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" aria-hidden="true" />
                الفلتر النشط:
              </span>
              {selectedCategory !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] font-semibold text-[var(--text-main)]">
                  قسم: {CATEGORY_METADATA.find((c) => c.id === selectedCategory)?.label ?? selectedCategory}
                </span>
              )}
              {selectedContentType !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] font-semibold text-[var(--text-main)]">
                  نوع: {CONTENT_TYPE_LABELS[selectedContentType] ?? selectedContentType}
                </span>
              )}
              {searchQuery.trim().length > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] font-semibold text-[var(--text-main)]">
                  بحث: &quot;{searchQuery}&quot;
                </span>
              )}
              {showFavoritesOnly && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                  ❤️ المفضلة
                </span>
              )}
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                ({filteredTopics.length} من أصل {TOPICS.length} موضوعاً)
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 rounded-lg bg-[var(--action-bg)] hover:bg-[var(--action-bg-hover)] text-[var(--action-text)] text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 shrink-0"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

        {/* Learner Progress Bar at top of topics index */}
        <LearnerProgressBar
          topics={TOPICS}
          selectedCategory={selectedCategory}
          className="mb-6"
        />

        {/* Dynamic Topic Grid */}
        {visibleTopics.length > 0 ? (
          <>
            <div id="topics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 scroll-mt-36">
              {visibleTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(index * 0.02, 0.2),
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <TopicCard
                    topic={topic}
                    searchQuery={searchQuery}
                    onOpenTopic={handleOpenTopic}
                    onListenTopic={(t) => playTTSForTopic(t)}
                    isCurrentlySpeaking={isTTSPlaying && ttsCurrentTopic?.id === topic.id}
                    isBookmarked={bookmarks.includes(topic.slug) || bookmarks.includes(topic.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                </motion.div>
              ))}
            </div>

            {/* Expand / Collapse Actions for Topics Grid */}
            {!isFiltered && filteredTopics.length > INITIAL_TOPIC_COUNT && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3">
                {!isExpanded ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsExpanded(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[var(--action-bg)] hover:bg-[var(--action-bg-hover)] text-[var(--action-text)] text-sm font-bold shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                    >
                      <span>عرض باقي المواضيع ({filteredTopics.length - INITIAL_TOPIC_COUNT} موضوعاً متبقياً)</span>
                      <ArrowLeft className="w-4 h-4 rotate-[-90deg]" aria-hidden="true" />
                    </button>
                    <p className="text-xs text-[var(--text-muted)] text-center">
                      نعرض افتراضياً أول {INITIAL_TOPIC_COUNT} مواضيع لتسهيل البداية بدون تشتت. يمكنك أيضاً استعراض كافة المراحل من صفحة{' '}
                      <Link href="/learn" className="text-[var(--primary)] font-bold hover:underline">
                        مسار التعلم الشامل
                      </Link>.
                    </p>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)] text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  >
                    <span>طي القائمة والعودة للمواضيع التأسيسية الأولى</span>
                    <ArrowLeft className="w-4 h-4 rotate-[90deg]" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : showFavoritesOnly ? (
          /* Empty Favorites State */
          <div className="text-center py-12 px-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xs">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-3 flex justify-center"
            >
              <HeartCrack className="w-10 h-10 text-rose-400" />
            </motion.div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] mb-1">
              قائمة المفضلة فارغة حالياً
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4 leading-normal">
              انقر على رمز القلب <span className="text-rose-500 font-bold">❤️</span> في أي بطاقة لحفظ الموضوع في قائمة المفضلة والرجوع إليه بسرعة.
            </p>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="h-9 px-4 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-xs font-bold shadow-2xs hover:bg-[var(--action-bg-hover)] transition-colors cursor-pointer"
            >
              استعراض كافة المواضيع
            </button>
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-10 px-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xs">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-2 flex justify-center"
            >
              <Search className="w-10 h-10 text-[var(--text-faint)]" />
            </motion.div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] mb-1">
              لم نعثر على نتائج مطابقة
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4 leading-normal">
              لا توجد مواضيع تطابق الكلمة{' '}
              <strong className="text-[var(--text-main)]">"{searchQuery}"</strong> في الفلاتر المحددة.
            </p>
            <button
              onClick={handleResetFilters}
              className="h-9 px-4 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-xs font-bold shadow-2xs hover:bg-[var(--action-bg-hover)] transition-colors cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-3 px-3 text-center text-xs text-[var(--text-muted)] no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p>
            Ai_agents — الدليل الهندسي لبناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي · فكّر بوضوح. ابنِ بثقة. © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-faint)]">
            <span>البحث: <kbd className="font-mono bg-[var(--border-color)] px-1 rounded">/</kbd></span>
            <span>الإغلاق: <kbd className="font-mono bg-[var(--border-color)] px-1 rounded">Esc</kbd></span>
          </div>
        </div>
      </footer>

      {/* 5. Deep Detail Reader Modal */}
      <AnimatePresence>
      {activeTopic && (
        <TopicDetailModal
          topic={activeTopic}
          onClose={() => setActiveTopicId(null)}
          onNavigateTopic={handleNavigateTopic}
          hasNext={activeIndex < TOPICS.length - 1}
          hasPrev={activeIndex > 0}
          totalTopics={TOPICS.length}
          openDiagramInitially={previewDiagramRequested}
          nextTopicPending={TOPICS[activeIndex + 1]?.publicationStatus === 'legacy-pending-migration'}
          onListen={(t) => playTTSForTopic(t)}
          isCurrentlySpeaking={isTTSPlaying && ttsCurrentTopic?.id === activeTopic.id}
          isBookmarked={bookmarks.includes(activeTopic.slug) || bookmarks.includes(activeTopic.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
      </AnimatePresence>

      {/* 6. Floating Audio Narration Bar */}
      <AnimatePresence>
      {isTTSActive && (
        <AudioPlayerBar
          currentTopic={ttsCurrentTopic}
          isPlaying={isTTSPlaying}
          isPaused={isTTSPaused}
          onPlay={resumeTTS}
          onPause={pauseTTS}
          onStop={stopTTS}
          onNext={() => {
            if (!ttsCurrentTopic) return;
            const idx = TOPICS.findIndex((t) => t.id === ttsCurrentTopic.id);
            if (idx + 1 < TOPICS.length) playTTSForTopic(TOPICS[idx + 1]);
          }}
          onPrev={() => {
            if (!ttsCurrentTopic) return;
            const idx = TOPICS.findIndex((t) => t.id === ttsCurrentTopic.id);
            if (idx - 1 >= 0) playTTSForTopic(TOPICS[idx - 1]);
          }}
          onClose={() => {
            stopTTS();
            setIsTTSActive(false);
          }}
          rate={ttsRate}
          onRateChange={(newRate) => {
            setTtsRate(newRate);
            if (isTTSPlaying && ttsCurrentTopic) {
              playTTSForTopic(ttsCurrentTopic);
            }
          }}
        />
      )}
      </AnimatePresence>
    </>
  );
}
