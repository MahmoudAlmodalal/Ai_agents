import React from 'react';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleTTS: () => void;
  isTTSActive: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  onToggleTTS,
  isTTSActive,
}) => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Pressing '/' focuses search input, 'Escape' clears it
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        onSearchChange('');
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] backdrop-blur-md shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-white bg-linear-to-r from-blue-700 to-blue-500 shadow-xs">
            <span>⚔️ سلاح العصر</span>
            <span className="opacity-60">|</span>
            <span>MET</span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-[var(--text-main)] leading-tight whitespace-nowrap">
              الدليل الهندسي الشامل
            </h1>
            <p className="hidden md:block text-xs text-[var(--text-muted)] font-medium">
              بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي
            </p>
          </div>
        </div>

        {/* Dynamic Search Input Bar */}
        <div className="flex-1 max-w-2xl min-w-0">
          <div className="relative flex items-center">
            <span className="absolute right-3.5 text-slate-400 pointer-events-none text-sm select-none" aria-hidden="true">
              🔍
            </span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث بالكلمات المفتاحية (مثال: Sequence, N+1, PRD, B-Tree, Swimlanes)..."
              className="w-full pr-10 pl-16 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] placeholder-slate-400 text-sm focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-blue-500/20 transition-all font-sans shadow-xs"
              aria-label="البحث في الدليل الهندسي"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-2.5 px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--border-color)] rounded transition-colors font-medium cursor-pointer"
                title="مسح البحث (Esc)"
              >
                مسح
              </button>
            ) : (
              <span className="hidden sm:inline-block absolute left-3 px-1.5 py-0.5 text-[10px] text-slate-400 border border-slate-300 dark:border-slate-700 rounded select-none font-mono">
                /
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleTTS}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              isTTSActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:bg-[var(--border-color)]'
            }`}
            title="القارئ الصوتي الذكي (Web Speech API)"
            aria-label="تبديل القارئ الصوتي"
          >
            <span>🎧</span>
            <span className="hidden lg:inline">{isTTSActive ? 'إيقاف الصوت' : 'القارئ الصوتي'}</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors cursor-pointer whitespace-nowrap"
            title="تبديل النمط النهاري / الليلي"
            aria-label="تبديل النمط"
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
            <span className="hidden lg:inline">{isDark ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors cursor-pointer whitespace-nowrap"
            title="طباعة الدليل أو تصدير PDF"
            aria-label="طباعة الدليل"
          >
            <span>🖨️</span>
            <span className="hidden xl:inline">طباعة</span>
          </button>
        </div>
      </div>
    </header>
  );
};
