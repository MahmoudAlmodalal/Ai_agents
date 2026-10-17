'use client';

import React from 'react';
import { TOPICS } from '@/src/data/topicsData.ts';
import { TopicCategory, ContentType, TopicItem } from '@/src/types/topic.ts';
import { normalizeArabic, stripHtml } from '@/src/utils/searchUtils.ts';
import { SearchHeader } from '@/src/components/SearchHeader.tsx';
import { FilterToolbar } from '@/src/components/FilterToolbar.tsx';
import { TopicCard } from '@/src/components/TopicCard.tsx';
import { TopicDetailModal } from '@/src/components/TopicDetailModal.tsx';
import { AudioPlayerBar } from '@/src/components/AudioPlayerBar.tsx';
import { RecentlyViewedSection } from '@/src/components/RecentlyViewedSection.tsx';

export default function HomePage() {
  // State: Search & Filters
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<TopicCategory>('all');
  const [selectedContentType, setSelectedContentType] = React.useState<ContentType>('all');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState<boolean>(false);

  // State: Bookmarks / Favorites (stored in localStorage)
  const [bookmarks, setBookmarks] = React.useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('engineering_guide_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState<boolean>(false);

  // State: Modal Detail Reader
  const [activeTopicId, setActiveTopicId] = React.useState<string | null>(null);

  // State: Recently Viewed Topics (tracks last 5 topics, stored in localStorage)
  const [recentlyViewed, setRecentlyViewed] = React.useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('engineering_guide_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track opening a topic in Recently Viewed (persisting up to 5 topics)
  const handleOpenTopic = React.useCallback((topicId: string) => {
    setActiveTopicId(topicId);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== topicId);
      const updated = [topicId, ...filtered].slice(0, 5);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(updated));
        } catch (err) {
          console.warn('Failed to save recently viewed to localStorage:', err);
        }
      }
      return updated;
    });
  }, []);

  // Clear recently viewed history
  const handleClearRecentlyViewed = React.useCallback(() => {
    setRecentlyViewed([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('engineering_guide_recently_viewed');
      } catch (err) {
        console.warn('Failed to clear recently viewed from localStorage:', err);
      }
    }
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
  const handleToggleBookmark = (topicId: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(topicId);
      const updated = exists ? prev.filter((id) => id !== topicId) : [...prev, topicId];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(updated));
        } catch (err) {
          console.warn('Failed to save bookmark to localStorage:', err);
        }
      }
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
      if (showFavoritesOnly && !bookmarks.includes(topic.id)) {
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
    return TOPICS.find((t) => t.id === activeTopicId) || null;
  }, [activeTopicId]);

  const activeIndex = React.useMemo(() => {
    if (!activeTopicId) return -1;
    return TOPICS.findIndex((t) => t.id === activeTopicId);
  }, [activeTopicId]);

  // Resolve Recently Viewed Topic Objects (max 5)
  const recentlyViewedTopics = React.useMemo(() => {
    return recentlyViewed
      .map((id) => TOPICS.find((t) => t.id === id))
      .filter((t): t is TopicItem => Boolean(t));
  }, [recentlyViewed]);

  const handleNavigateTopic = (direction: 'next' | 'prev') => {
    if (activeIndex === -1) return;
    const targetIdx = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (targetIdx >= 0 && targetIdx < TOPICS.length) {
      handleOpenTopic(TOPICS[targetIdx].id);
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
      <main className="page-shell flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6">
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

        {/* Compact Hero Kicker & Stats Strip */}
        {!showFavoritesOnly && (
          <section className="mb-4 sm:mb-6 p-3.5 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] sm:text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    خريطة الطريق الهندسية · Next.js App Router
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Zero-API Ready
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg font-bold text-[var(--text-main)] leading-snug">
                  من استنطاق الفكرة ووثيقة PRD إلى نمذجة المعمارية وقواعد البيانات بالذكاء الاصطناعي
                </h2>
              </div>

              {/* Compact 4-Metric Grid */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-color)] shrink-0">
                <div className="bg-[var(--bg-card-subtle)] px-2 py-1.5 rounded-lg border border-[var(--border-color)] text-center">
                  <div className="text-sm sm:text-base font-black font-mono text-[var(--brand-primary)]">12</div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate">موضوعاً</div>
                </div>
                <div className="bg-[var(--bg-card-subtle)] px-2 py-1.5 rounded-lg border border-[var(--border-color)] text-center">
                  <div className="text-sm sm:text-base font-black font-mono text-emerald-600 dark:text-emerald-400">8</div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate">مخططات</div>
                </div>
                <div className="bg-[var(--bg-card-subtle)] px-2 py-1.5 rounded-lg border border-[var(--border-color)] text-center">
                  <div className="text-sm sm:text-base font-black font-mono text-indigo-600 dark:text-indigo-400">38+</div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate">برومبتاً</div>
                </div>
                <div className="bg-[var(--bg-card-subtle)] px-2 py-1.5 rounded-lg border border-[var(--border-color)] text-center">
                  <div className="text-sm sm:text-base font-black font-mono text-rose-500">
                    {bookmarks.length}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate">مفضلة</div>
                </div>
              </div>
            </div>
          </section>
        )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                searchQuery={searchQuery}
                onOpenTopic={handleOpenTopic}
                onListenTopic={(t) => playTTSForTopic(t)}
                isCurrentlySpeaking={isTTSPlaying && ttsCurrentTopic?.id === topic.id}
                isBookmarked={bookmarks.includes(topic.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : showFavoritesOnly ? (
          /* Empty Favorites State */
          <div className="text-center py-12 px-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xs">
            <span className="text-4xl mb-3 block" aria-hidden="true">
              💔
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] mb-1">
              قائمة المفضلة فارغة حالياً
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4 leading-normal">
              انقر على رمز القلب <span className="text-rose-500 font-bold">❤️</span> في أي بطاقة لحفظ الموضوع في قائمة المفضلة والرجوع إليه بسرعة.
            </p>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="h-9 px-4 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              استعراض كافة المواضيع
            </button>
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-10 px-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xs">
            <span className="text-3xl mb-2 block" aria-hidden="true">
              🔍
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] mb-1">
              لم نعثر على نتائج مطابقة
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4 leading-normal">
              لا توجد مواضيع تطابق الكلمة{' '}
              <strong className="text-[var(--text-main)]">"{searchQuery}"</strong> في الفلاتر المحددة.
            </p>
            <button
              onClick={handleResetFilters}
              className="h-9 px-4 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-3 px-3 text-center text-[11px] text-[var(--text-muted)] no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p>
            الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي · معمارية Next.js App Router © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-faint)]">
            <span>البحث: <kbd className="font-mono bg-[var(--border-color)] px-1 rounded">/</kbd></span>
            <span>الإغلاق: <kbd className="font-mono bg-[var(--border-color)] px-1 rounded">Esc</kbd></span>
          </div>
        </div>
      </footer>

      {/* 5. Deep Detail Reader Modal */}
      {activeTopic && (
        <TopicDetailModal
          topic={activeTopic}
          onClose={() => setActiveTopicId(null)}
          onNavigateTopic={handleNavigateTopic}
          hasNext={activeIndex < TOPICS.length - 1}
          hasPrev={activeIndex > 0}
          onListen={(t) => playTTSForTopic(t)}
          isCurrentlySpeaking={isTTSPlaying && ttsCurrentTopic?.id === activeTopic.id}
          isBookmarked={bookmarks.includes(activeTopic.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* 6. Floating Audio Narration Bar */}
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
    </>
  );
}
