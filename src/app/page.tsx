'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HeartCrack } from 'lucide-react';
import { TOPICS } from '@/src/data/topicsData.ts';
import { TopicCategory, ContentType, TopicItem } from '@/src/types/topic.ts';
import { normalizeArabic, stripHtml } from '@/src/utils/searchUtils.ts';
import { SearchHeader } from '@/src/components/SearchHeader.tsx';
import { FilterToolbar } from '@/src/components/FilterToolbar.tsx';
import { TopicCard } from '@/src/components/TopicCard.tsx';
import { TopicDetailModal } from '@/src/components/TopicDetailModal.tsx';
import { AudioPlayerBar } from '@/src/components/AudioPlayerBar.tsx';
import { RecentlyViewedSection } from '@/src/components/RecentlyViewedSection.tsx';

import {
  readSavedBookmarks,
  writeSavedBookmarks,
  readSavedRecentlyViewed,
  writeSavedRecentlyViewed,
  resolveCanonicalSlug,
  getTopicBySlug,
} from '@/src/lib/topicRegistry.ts';

export default function HomePage() {
  // State: Search & Filters
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<TopicCategory>('all');
  const [selectedContentType, setSelectedContentType] = React.useState<ContentType>('all');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState<boolean>(false);

  // State: Bookmarks / Favorites (stored in localStorage via canonical slugs adapter)
  const [bookmarks, setBookmarks] = React.useState<string[]>(() => {
    return readSavedBookmarks();
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState<boolean>(false);

  // State: Modal Detail Reader
  const [activeTopicId, setActiveTopicId] = React.useState<string | null>(null);

  // State: Recently Viewed Topics (tracks last 5 topics, stored in localStorage via adapter)
  const [recentlyViewed, setRecentlyViewed] = React.useState<string[]>(() => {
    return readSavedRecentlyViewed();
  });

  // Track opening a topic in Recently Viewed (persisting up to 5 topics)
  const handleOpenTopic = React.useCallback((topicId: string) => {
    const slug = resolveCanonicalSlug(topicId);
    setActiveTopicId(slug);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== slug);
      const updated = [slug, ...filtered].slice(0, 5);
      writeSavedRecentlyViewed(updated);
      return updated;
    });
  }, []);

  // Clear recently viewed history
  const handleClearRecentlyViewed = React.useCallback(() => {
    setRecentlyViewed([]);
    writeSavedRecentlyViewed([]);
  }, []);

  // State: Dark Mode (defaults to user preference or localStorage)
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // State: Audio TTS
  const [ttsCurrentTopic, setTtsCurrentTopic] = React.useState<TopicItem | null>(null);
  const [isTTSPlaying, setIsTTSPlaying] = React.useState<boolean>(false);
  const [isTTSPaused, setIsTTSPaused] = React.useState<boolean>(false);
  const [ttsRate, setTtsRate] = React.useState<number>(1.0);
  const [isTTSActive, setIsTTSActive] = React.useState<boolean>(false);

  // Sync theme attribute with documentElement
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Toggle bookmark handler with persistence
  const handleToggleBookmark = (topicIdOrSlug: string) => {
    const slug = resolveCanonicalSlug(topicIdOrSlug);
    setBookmarks((prev) => {
      const exists = prev.includes(slug);
      const updated = exists ? prev.filter((id) => id !== slug) : [...prev, slug];
      writeSavedBookmarks(updated);
      return updated;
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

  // Filtered Topics with search and bookmarks filter
  const filteredTopics = React.useMemo(() => {
    const normQuery = normalizeArabic(searchQuery.trim());

    return TOPICS.filter((topic) => {
      // 1. Favorites Only Filter
      if (showFavoritesOnly && !bookmarks.includes(topic.slug) && !bookmarks.includes(topic.id)) {
        return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }

      // 3. Content Type Filter
      if (selectedContentType !== 'all' && !topic.contentTypes.includes(selectedContentType)) {
        return false;
      }

      // 4. Keyword Search Match
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
  }, [searchQuery, selectedCategory, selectedContentType, showFavoritesOnly, bookmarks, strippedContentMap]);

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

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedContentType('all');
    setShowFavoritesOnly(false);
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
      {/* 1. Header: Compact navigation, search, and theme switcher */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
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
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
      />

      {/* 2. Filter Toolbar (Categories, Content Types, and Favorites Chip) */}
      <FilterToolbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedContentType={selectedContentType}
        onSelectContentType={setSelectedContentType}
        totalTopicsCount={TOPICS.length}
        filteredCount={filteredTopics.length}
        searchQuery={searchQuery}
        onResetFilters={handleResetFilters}
        bookmarksCount={bookmarks.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
      />

      {/* 3. Main Topic Explorer */}
      <div className={`page-shell flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 ${isTTSActive ? 'pb-32 sm:pb-28' : 'pb-10'}`} style={isTTSActive && activeTopic ? { paddingBottom: '9rem' } : undefined}>
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

        {/* Learning path introduction and guide to the topic sequence */}
        {!showFavoritesOnly && (
          <section className="mb-5 sm:mb-7 overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
            <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] lg:items-center">
              <div className="min-w-0 max-w-3xl">
                <span className="mb-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                  دليل هندسي تفاعلي · تعلّم خطوة بخطوة
                </span>
                <h1 className="text-2xl font-black leading-tight text-[var(--text-main)] sm:text-3xl lg:text-4xl">
                  من فكرة واضحة إلى واجهة قابلة للتطوير
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                  ابدأ بفهم المشكلة وتوثيق المتطلبات، ثم نمذج التدفقات والعلاقات، وانتقل إلى تخطيط الواجهة ومراجعة جودتها. يشرح كل موضوع أين يقع ضمن هذا المسار وما الذي يساعدك على إنجازه.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link href="/start" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                    ابدأ من البداية <span aria-hidden="true">←</span>
                  </Link>
                  <a href="#topic-list" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border-color)] px-4 text-sm font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--bg-card-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                    استعرض الموضوعات
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2" aria-label="ملخص محتوى الدليل">
                <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-2.5 text-center">
                  <div className="font-mono text-lg font-black text-[var(--brand-primary)]">{TOPICS.length}</div>
                  <div className="text-xs text-[var(--text-muted)]">موضوعًا تعليميًا</div>
                </div>
                <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-2.5 text-center">
                  <div className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">8</div>
                  <div className="text-xs text-[var(--text-muted)]">أنواع من المخططات</div>
                </div>
                <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-2.5 text-center">
                  <div className="font-mono text-lg font-black text-indigo-600 dark:text-indigo-400">31</div>
                  <div className="text-xs text-[var(--text-muted)]">برومبتًا معتمدًا</div>
                </div>
                <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-2.5 text-center">
                  <div className="font-mono text-lg font-black text-rose-500">{bookmarks.length}</div>
                  <div className="text-xs text-[var(--text-muted)]">موضوعًا محفوظًا</div>
                </div>
              </div>
            </div>

            <ol className="grid gap-2 border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)]/60 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4" aria-label="مراحل مسار التعلم">
              {[
                { title: 'اكتشف الفكرة', description: 'حدّد المشكلة والأسئلة المهمة قبل اختيار الحل.' },
                { title: 'وثّق المتطلبات', description: 'حوّل القرارات إلى متطلبات واضحة قابلة للمراجعة.' },
                { title: 'نمذج النظام', description: 'استخدم التدفقات والمخططات لتوضيح أجزاء الحل.' },
                { title: 'خطّط وراجع', description: 'رتّب خطوات الواجهة ثم تحقّق من جودتها.' },
              ].map((stage, index) => (
                <li key={stage.title} className="flex min-w-0 items-start gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-primary)] font-mono text-xs font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <h2 className="text-sm font-extrabold text-[var(--text-main)]">{stage.title}</h2>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
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
            onOpenTopic={handleOpenTopic}
            onClear={handleClearRecentlyViewed}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Dynamic Topic Grid */}
        {filteredTopics.length > 0 ? (
          <div id="topic-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 scroll-mt-24">
            <AnimatePresence mode="popLayout">
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  layout
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
            </AnimatePresence>
          </div>
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
              className="h-9 px-4 rounded-xl bg-[var(--brand-primary)] dark:bg-[#162c46] text-white text-xs font-bold shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
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
              className="h-9 px-4 rounded-xl bg-[var(--brand-primary)] dark:bg-[#162c46] text-white text-xs font-bold shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      <aside aria-label="اختصارات لوحة المفاتيح" className="no-print border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-center text-xs text-[var(--text-faint)]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3">
          <span>البحث: <kbd className="rounded bg-[var(--border-color)] px-1 font-mono">/</kbd></span>
          <span>الإغلاق: <kbd className="rounded bg-[var(--border-color)] px-1 font-mono">Esc</kbd></span>
        </div>
      </aside>

      {/* 5. Deep Detail Reader Modal */}
      <AnimatePresence>
      {activeTopic && (
        <TopicDetailModal
          topic={activeTopic}
          onClose={() => setActiveTopicId(null)}
          onNavigateTopic={handleNavigateTopic}
          hasNext={activeIndex < TOPICS.length - 1}
          hasPrev={activeIndex > 0}
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
