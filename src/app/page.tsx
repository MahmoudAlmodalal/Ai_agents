'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HeartCrack } from 'lucide-react';
import { TOPICS, deriveCategoryCounts } from '@/src/data/topicsData.ts';
import { TopicCategory, ContentType, TopicItem } from '@/src/types/topic.ts';
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

const firstTopic = TOPICS[0];

export default function HomePage() {
  // State: Search & Filters
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<TopicCategory>('all');
  const [selectedContentType, setSelectedContentType] = React.useState<ContentType>('all');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState<boolean>(false);

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

        {/* Compact Hero Kicker & Stats Strip */}
        {!showFavoritesOnly && (
          <section className="mb-4 sm:mb-6 p-3.5 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] sm:text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider block">
                    MET Academy — سلاح العصر
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg font-bold text-[var(--text-main)] leading-snug">
                  من فكرة مشروعك إلى منتج Full-Stack: واجهات وخادم وبيانات واختبار ونشر
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-6">لمن يعرف أساسيات البرمجة ويبدأ تعلّم وكلاء الذكاء الاصطناعي (AI Agents)، ويريد تحويل فكرة تطبيق إلى مشروع واضح خطوة بخطوة.</p>
                <p className="mt-2 text-xs text-[var(--text-muted)] leading-6">المدة الرسمية للبرنامج: 40 ساعة. ترتيب المواضيع يتبع اعتماديات مشروعك؛ ليس توزيعًا زمنيًا للساعات.</p>
                <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-6"><strong>ستبدأ بـ {firstTopic.title}: </strong>{firstTopic.goal}</p>
                <p className="mt-2 text-xs text-[var(--text-muted)] leading-6"><strong>مخرجك الأول: </strong>{firstTopic.outputs.join('، ')}</p>
                <Link href={`/learn/${firstTopic.slug}`} className="mt-3 inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--brand-primary)] px-4 text-sm font-bold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]">ابدأ بالموضوع الأول</Link>
                <Link href="/start" className="mx-3 inline-flex min-h-10 items-center text-sm font-bold text-[var(--primary)] underline">ابدأ هنا: كيف تستخدم المسار؟</Link>
              </div>

              {/* Compact 4-Metric Grid */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-color)] shrink-0">
                <div className="bg-[var(--bg-card-subtle)] px-2 py-1.5 rounded-lg border border-[var(--border-color)] text-center">
                  <div className="text-sm sm:text-base font-black font-mono text-[var(--brand-primary)]">{TOPICS.length}</div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate">درسًا</div>
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
            <EntryQuestion />
          </section>
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
        {/* Dynamic Topic Grid */}
        {filteredTopics.length > 0 ? (
          <div id="topics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {filteredTopics.map((topic, index) => (
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
      </main>

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-3 px-3 text-center text-xs text-[var(--text-muted)] no-print">
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
