import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Headphones, Sun, Moon, Printer, Heart } from 'lucide-react';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleTTS: () => void;
  isTTSActive: boolean;
  isMobileSearchOpen: boolean;
  onToggleMobileSearch: () => void;
  bookmarksCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  onToggleTTS,
  isTTSActive,
  isMobileSearchOpen,
  onToggleMobileSearch,
  bookmarksCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
}) => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Focus search input when mobile search is opened
  React.useEffect(() => {
    if (isMobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

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
    <header className="site-header-sub relative z-[var(--z-search)] bg-[var(--bg-surface)]/95 border-b border-[var(--border-color)] backdrop-blur-md transition-colors shadow-2xs">
      <div className="header-inner max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Header Bar: Exactly 52px on mobile, 60px on desktop */}
        <div className="h-[52px] sm:h-[60px] flex items-center justify-between gap-3">
          {/* Brand Wordmark (Right in RTL) */}
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-blue-700 to-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs select-none">
              AI
            </span>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-extrabold text-[var(--text-main)] truncate block leading-tight">
                الدليل الهندسي الشامل
              </span>
              <span className="hidden sm:block text-[11px] text-[var(--text-muted)] font-medium truncate">
                نمذجة وبناء المشاريع بالذكاء الاصطناعي
              </span>
            </div>
          </div>

          {/* Center Search on Desktop (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-4">
            <div className="relative w-full flex items-center">
              <Search className="absolute right-3 text-slate-400 pointer-events-none w-3.5 h-3.5" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث (Sequence, PRD, N+1, B-Tree, UML)..."
                className="w-full h-9 pr-8 pl-12 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] placeholder-slate-400 text-xs focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-blue-500/20 font-sans"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-2 px-1.5 py-0.5 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--border-color)] rounded transition-colors font-medium cursor-pointer"
                >
                  مسح
                </button>
              ) : (
                <span className="absolute left-2.5 px-1 text-[10px] text-slate-400 border border-slate-300 dark:border-slate-700 rounded font-mono select-none">
                  /
                </span>
              )}
            </div>
          </div>

          {/* Action Utility Controls (Left in RTL) */}
          <div className="header-actions flex items-center gap-1.5 shrink-0">
            {/* Mobile Search Toggle Button */}
            <button
              onClick={onToggleMobileSearch}
              className={`md:hidden w-9 h-9 rounded-lg border transition-colors flex items-center justify-center text-sm cursor-pointer ${
                isMobileSearchOpen || searchQuery
                  ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400'
                  : 'bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-main)]'
              }`}
              title="البحث في المواضيع"
              aria-label="البحث"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites View Toggle Button */}
            <button
              onClick={onToggleFavoritesOnly}
              className={`h-9 px-2 sm:px-2.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:border-rose-300 hover:text-rose-600'
              }`}
              title="عرض المواضيع المفضلة"
              aria-label="عرض المفضلة"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : 'fill-rose-500 stroke-none'}`}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="hidden xs:inline text-[11px]">المفضلة</span>
              <span
                className={`text-[10px] font-mono px-1 rounded-full ${
                  showFavoritesOnly ? 'bg-white/30 text-white' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
                }`}
              >
                {bookmarksCount}
              </span>
            </button>

            {/* Audio TTS Button */}
            <button
              onClick={onToggleTTS}
              className={`h-9 px-2 sm:px-2.5 rounded-lg border text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                isTTSActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:bg-[var(--border-color)]'
              }`}
              title="القارئ الصوتي الذكي (Web Speech API)"
              aria-label="القارئ الصوتي"
            >
              <Headphones className="w-4 h-4" />
              <span className="hidden lg:inline">{isTTSActive ? 'صوت نشط' : 'قراءة صوتية'}</span>
            </button>

            {/* Print as PDF Button */}
            <button
              onClick={() => window.print()}
              className="h-9 px-2 sm:px-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] hover:text-[var(--brand-primary)] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer no-print"
              title="طباعة الدليل أو حفظ كملف PDF (Ctrl+P)"
              aria-label="طباعة كملف PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span className="hidden sm:inline text-[11px]">طباعة PDF</span>
            </button>

            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleTheme}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors flex items-center justify-center text-sm cursor-pointer overflow-hidden"
              title="تبديل النمط النهاري / الليلي"
              aria-label="تبديل النمط"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Collapsible Mobile Search Bar (Only shown on mobile when toggled or search has text) */}
        <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mobile-search md:hidden overflow-hidden"
          >
            <div className="pb-2.5 pt-1 border-t border-[var(--border-color)]/60">
              <div className="relative flex items-center">
                <Search className="absolute right-3 text-slate-400 pointer-events-none w-3.5 h-3.5" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="ابحث (Sequence, PRD, N+1, UML, استعارة)..."
                  className="w-full h-10 pr-9 pl-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] placeholder-slate-400 text-xs focus:outline-none focus:border-[var(--brand-primary)] font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute left-2 px-2 py-1 text-[11px] text-[var(--text-muted)] bg-[var(--border-color)] rounded-md font-bold cursor-pointer"
                  >
                    مسح
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </header>
  );
};
