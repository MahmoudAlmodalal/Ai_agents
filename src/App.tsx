import React from 'react';
import { TOPICS } from '@/src/data/topicsData.ts';
import { TopicCategory, ContentType, TopicItem } from '@/src/types/topic.ts';
import { normalizeArabic, stripHtml } from '@/src/utils/searchUtils.ts';
import { SearchHeader } from '@/src/components/SearchHeader.tsx';
import { FilterToolbar } from '@/src/components/FilterToolbar.tsx';
import { TopicCard } from '@/src/components/TopicCard.tsx';
import { TopicDetailModal } from '@/src/components/TopicDetailModal.tsx';
import { AudioPlayerBar } from '@/src/components/AudioPlayerBar.tsx';

export default function App() {
  // State: Search & Filters
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<TopicCategory>('all');
  const [selectedContentType, setSelectedContentType] = React.useState<ContentType>('all');

  // State: Modal Detail Reader
  const [activeTopicId, setActiveTopicId] = React.useState<string | null>(null);

  // State: Dark Mode (defaults to user preference or localStorage)
  const [isDark, setIsDark] = React.useState<boolean>(() => {
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
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Compute searchable stripped texts once
  const strippedContentMap = React.useMemo(() => {
    const map = new Map<string, string>();
    TOPICS.forEach((t) => {
      map.set(t.id, normalizeArabic(stripHtml(t.htmlContent)));
    });
    return map;
  }, []);

  // Filtered Topics with score calculation
  const filteredTopics = React.useMemo(() => {
    const normQuery = normalizeArabic(searchQuery.trim());

    return TOPICS.filter((topic) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
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
  }, [searchQuery, selectedCategory, selectedContentType, strippedContentMap]);

  // Active topic object for modal
  const activeTopic = React.useMemo(() => {
    if (!activeTopicId) return null;
    return TOPICS.find((t) => t.id === activeTopicId) || null;
  }, [activeTopicId]);

  const activeIndex = React.useMemo(() => {
    if (!activeTopicId) return -1;
    return TOPICS.findIndex((t) => t.id === activeTopicId);
  }, [activeTopicId]);

  const handleNavigateTopic = (direction: 'next' | 'prev') => {
    if (activeIndex === -1) return;
    const targetIdx = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (targetIdx >= 0 && targetIdx < TOPICS.length) {
      setActiveTopicId(TOPICS[targetIdx].id);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedContentType('all');
  };

  // TTS Helper Functions
  const stopTTS = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsTTSPlaying(false);
    setIsTTSPaused(false);
  };

  const playTTSForTopic = (topic: TopicItem) => {
    if (!window.speechSynthesis) {
      alert('عذراً، متصفحك لا يدعم ميزة Web Speech API');
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
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsTTSPaused(true);
    }
  };

  const resumeTTS = () => {
    if (window.speechSynthesis && isTTSPaused) {
      window.speechSynthesis.resume();
      setIsTTSPaused(false);
    } else if (ttsCurrentTopic) {
      playTTSForTopic(ttsCurrentTopic);
    } else if (TOPICS.length > 0) {
      playTTSForTopic(TOPICS[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-main)] flex flex-col font-sans transition-colors selection:bg-blue-600 selection:text-white">
      {/* 1. Header with live search input, theme toggle and audio button */}
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
      />

      {/* 2. Filter Toolbar (Categories & Content Types) */}
      <FilterToolbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedContentType={selectedContentType}
        onSelectContentType={setSelectedContentType}
        totalTopicsCount={TOPICS.length}
        filteredCount={filteredTopics.length}
        searchQuery={searchQuery}
        onResetFilters={handleResetFilters}
      />

      {/* 3. Main Topic Explorer */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Kicker & Stats Strip */}
        <section className="mb-8 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-2 block">
              خريطة الطريق المعتمدة لهندسة وبرمجة الأنظمة
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight mb-3">
              من استنطاق الفكرة ووثيقة PRD إلى هندسة المعمارية والواجهات بالذكاء الاصطناعي
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              ابحث في 12 موضوعاً تخصصياً، وتصفح المخططات المعمارية السبعة (UML)، وقواعد بيانات BorrowHub، وأوامر Spec Kit، والبرومبتات القابلة للنسخ المباشر.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--border-color)]">
            <div>
              <div className="text-2xl font-black font-mono text-[var(--brand-primary)]">12</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">موضوعاً هندسياً شاملاً</div>
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">8</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">مخططات UML & ERD تفاعلية</div>
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">38+</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">برومبتاً مهندساً قابلاً للنسخ</div>
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">100%</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">قراءة صوتية مجانية (TTS)</div>
            </div>
          </div>
        </section>

        {/* Dynamic Topic Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                searchQuery={searchQuery}
                onOpenTopic={(id) => setActiveTopicId(id)}
                onListenTopic={(t) => playTTSForTopic(t)}
                isCurrentlySpeaking={isTTSPlaying && ttsCurrentTopic?.id === topic.id}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl shadow-xs">
            <span className="text-4xl mb-3 block" aria-hidden="true">
              🔍
            </span>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">
              لم نعثر على نتائج مطابقة
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6">
              لم يتم العثور على أي موضوع يطابق الكلمة المفتاحية{' '}
              <strong className="text-[var(--text-main)]">"{searchQuery}"</strong> في الفلاتر المحددة.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
            >
              إعادة ضبط معايير البحث والفلترة
            </button>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-6 px-4 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span>اختصار البحث: <kbd className="font-mono bg-[var(--border-color)] px-1.5 py-0.5 rounded text-[11px]">/</kbd></span>
            <span>إغلاق النوافذ: <kbd className="font-mono bg-[var(--border-color)] px-1.5 py-0.5 rounded text-[11px]">Esc</kbd></span>
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
    </div>
  );
}
