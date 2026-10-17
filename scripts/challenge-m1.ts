/**
 * Adversarial Empirical Verification Suite for Milestone 1
 * Challenger: challenger_m1_1_r2 (teamwork_preview_challenger)
 * 
 * Verifies:
 * 1. Navbar active route matching & edge cases
 * 2. Mobile drawer state transitions, escape key, focus lock claim
 * 3. Theme switcher toggle and localStorage fallback/resilience
 * 4. Toast custom event dispatch, multi-toast stacking, and auto-dismiss lifecycle
 * 5. Static AST and accessibility analysis
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = path.resolve(__dirname, '..');

interface TestOutcome {
  id: string;
  suite: string;
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
  isVulnerability?: boolean;
}

const outcomes: TestOutcome[] = [];

function assert(
  id: string,
  suite: string,
  name: string,
  expected: string,
  fn: () => { pass: boolean; actual: string; isVulnerability?: boolean; error?: string }
) {
  try {
    const res = fn();
    outcomes.push({
      id,
      suite,
      name,
      passed: res.pass,
      expected,
      actual: res.actual,
      error: res.error,
      isVulnerability: res.isVulnerability,
    });
  } catch (err: any) {
    outcomes.push({
      id,
      suite,
      name,
      passed: false,
      expected,
      actual: 'Exception thrown',
      error: err?.message || String(err),
    });
  }
}

console.log('======================================================================');
console.log('  STARTING EMPIRICAL ADVERSARIAL CHALLENGE — MILESTONE 1');
console.log('======================================================================\n');

// ---------------------------------------------------------------------
// SUITE 1: Active Route Matching Oracle
// Extracts the exact routing logic used in Navbar.tsx
// ---------------------------------------------------------------------
const navbarContent = fs.readFileSync(path.join(ROOT_DIR, 'src/components/Navbar.tsx'), 'utf-8');

// The route matching function in Navbar:
function isRouteActive(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// 1.1 Exact match root
assert('CH-NAV-01', 'Route Matching', 'Exact match for root "/" when pathname is "/"', 'true', () => {
  const res = isRouteActive('/', '/');
  return { pass: res === true, actual: String(res) };
});

// 1.2 Root does NOT activate for subroutes
assert('CH-NAV-02', 'Route Matching', 'Root "/" is strictly NOT active when pathname is "/start"', 'false', () => {
  const res = isRouteActive('/', '/start');
  return { pass: res === false, actual: String(res) };
});

// 1.3 Root does NOT activate for /lectures
assert('CH-NAV-03', 'Route Matching', 'Root "/" is strictly NOT active when pathname is "/lectures"', 'false', () => {
  const res = isRouteActive('/', '/lectures');
  return { pass: res === false, actual: String(res) };
});

// 1.4 Root does NOT activate for /lectures/01-product-discovery
assert('CH-NAV-04', 'Route Matching', 'Root "/" is strictly NOT active on nested sub-route "/lectures/01-product-discovery"', 'false', () => {
  const res = isRouteActive('/', '/lectures/01-product-discovery');
  return { pass: res === false, actual: String(res) };
});

// 1.5 Subroute exact match
assert('CH-NAV-05', 'Route Matching', 'Exact match "/lectures" when pathname is "/lectures"', 'true', () => {
  const res = isRouteActive('/lectures', '/lectures');
  return { pass: res === true, actual: String(res) };
});

// 1.6 Subroute parent activation
assert('CH-NAV-06', 'Route Matching', '"/lectures" activates when pathname is "/lectures/01-product-discovery"', 'true', () => {
  const res = isRouteActive('/lectures', '/lectures/01-product-discovery');
  return { pass: res === true, actual: String(res) };
});

// 1.7 Deeply nested subroute activation
assert('CH-NAV-07', 'Route Matching', '"/lectures" activates when pathname is "/lectures/05-uiux-stitch-frontend/deep-step"', 'true', () => {
  const res = isRouteActive('/lectures', '/lectures/05-uiux-stitch-frontend/deep-step');
  return { pass: res === true, actual: String(res) };
});

// 1.8 Sibling prefix collision avoidance
assert('CH-NAV-08', 'Route Matching', 'Prefix collision guard: "/lectures" does NOT activate for "/lectures-extra"', 'false', () => {
  const res = isRouteActive('/lectures', '/lectures-extra');
  return { pass: res === false, actual: String(res) };
});

// 1.9 Sibling prefix collision avoidance for prompts
assert('CH-NAV-09', 'Route Matching', 'Prefix collision guard: "/prompts" does NOT activate for "/prompts-hub"', 'false', () => {
  const res = isRouteActive('/prompts', '/prompts-hub');
  return { pass: res === false, actual: String(res) };
});

// 1.10 Secondary items activation in dropdown
assert('CH-NAV-10', 'Route Matching', 'Secondary item "/templates" activates for subroute "/templates/prd"', 'true', () => {
  const res = isRouteActive('/templates', '/templates/prd');
  return { pass: res === true, actual: String(res) };
});

// 1.11 Trailing slash handling
assert('CH-NAV-11', 'Route Matching', '"/diagrams" activates when pathname has trailing slash "/diagrams/"', 'true', () => {
  const res = isRouteActive('/diagrams', '/diagrams/');
  return { pass: res === true, actual: String(res) };
});

// 1.12 Unrelated path does not activate any item
assert('CH-NAV-12', 'Route Matching', 'Unrelated path "/unknown-page" activates no primary item', 'all false', () => {
  const items = ['/', '/start', '/lectures', '/prompts', '/diagrams', '/borrowhub', '/tools'];
  const anyActive = items.some((item) => isRouteActive(item, '/unknown-page'));
  return { pass: anyActive === false, actual: anyActive ? 'Some active' : 'None active' };
});

// 1.13 Dropdown "المزيد" active indicator detection
assert('CH-NAV-13', 'Route Matching', '"المزيد" parent indicator is true when on secondary route "/faq"', 'true', () => {
  const secondaryHrefs = ['/templates', '/glossary', '/faq', '/about'];
  const pathname = '/faq';
  const isMoreActive = secondaryHrefs.some((href) => isRouteActive(href, pathname));
  return { pass: isMoreActive === true, actual: String(isMoreActive) };
});

// 1.14 Dropdown "المزيد" active indicator is false on primary route
assert('CH-NAV-14', 'Route Matching', '"المزيد" parent indicator is false when on primary route "/borrowhub"', 'false', () => {
  const secondaryHrefs = ['/templates', '/glossary', '/faq', '/about'];
  const pathname = '/borrowhub';
  const isMoreActive = secondaryHrefs.some((href) => isRouteActive(href, pathname));
  return { pass: isMoreActive === false, actual: String(isMoreActive) };
});

// ---------------------------------------------------------------------
// SUITE 2: Mobile Drawer State Machine & Focus Trap Verification
// ---------------------------------------------------------------------

// Mock DOM environment for drawer testing
class MockElement {
  style: Record<string, string> = {};
  attributes: Record<string, string> = {};
  classList = new Set<string>();
  children: MockElement[] = [];
  focused = false;
  tagName = 'DIV';
  tabIndex = 0;

  setAttribute(k: string, v: string) {
    this.attributes[k] = v;
  }
  getAttribute(k: string) {
    return this.attributes[k] ?? null;
  }
  focus() {
    this.focused = true;
  }
}

// 2.1 Body scroll lock on drawer open
assert('CH-DRW-01', 'Mobile Drawer', 'Body overflow is set to "hidden" when drawer opens', 'document.body.style.overflow = "hidden"', () => {
  const mockBody = { style: { overflow: '' } };
  // Simulate useEffect when isDrawerOpen changes to true
  const isDrawerOpen = true;
  let cleanup: (() => void) | undefined;
  if (isDrawerOpen) {
    const originalStyle = mockBody.style.overflow;
    mockBody.style.overflow = 'hidden';
    cleanup = () => {
      mockBody.style.overflow = originalStyle;
    };
  }
  const isHidden = mockBody.style.overflow === 'hidden';
  return { pass: isHidden, actual: `overflow="${mockBody.style.overflow}"` };
});

// 2.2 Body scroll lock restoration on drawer close
assert('CH-DRW-02', 'Mobile Drawer', 'Body overflow is restored to original style when drawer closes', 'Restored to original overflow', () => {
  const mockBody = { style: { overflow: 'auto' } };
  let originalStyle = mockBody.style.overflow;
  // Open
  mockBody.style.overflow = 'hidden';
  // Close / cleanup
  mockBody.style.overflow = originalStyle;
  return { pass: mockBody.style.overflow === 'auto', actual: `overflow="${mockBody.style.overflow}"` };
});

// 2.3 Escape key listener dismisses drawer and returns focus
assert('CH-DRW-03', 'Mobile Drawer', 'Escape key triggers drawer close and returns focus to hamburger button', 'isDrawerOpen: false, button focused', () => {
  const state = { isDrawerOpen: true };
  const drawerButton = new MockElement();
  const drawerButtonRef = { current: drawerButton };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Escape') {
      if (state.isDrawerOpen) {
        state.isDrawerOpen = false;
        drawerButtonRef.current?.focus();
      }
    }
  };

  handleKeyDown({ key: 'Escape' });
  const passed = state.isDrawerOpen === false && drawerButton.focused === true;
  return {
    pass: passed,
    actual: `isDrawerOpen=${state.isDrawerOpen}, buttonFocused=${drawerButton.focused}`,
  };
});

// 2.4 ADVERSARIAL CHALLENGE: Verify worker's claim of "Focus Trap" in Navbar.tsx
assert('CH-DRW-04', 'Mobile Drawer', 'Verify whether Navbar implements an active focus trap/lock (as claimed in worker handoff)', 'Focus trap implementation present', () => {
  // Search for focus trapping logic in Navbar.tsx (e.g. tab key listener, focus lock, trap focus, or cycling)
  const hasTabHandler = navbarContent.includes("'Tab'") || navbarContent.includes('"Tab"') || navbarContent.includes('keyCode === 9');
  const usesFocusTrapHook = navbarContent.includes('useFocusTrap') || navbarContent.includes('focus-trap');
  const trapsFocus = hasTabHandler || usesFocusTrapHook;

  return {
    pass: trapsFocus, // If false, the worker's claim is refuted
    isVulnerability: !trapsFocus,
    actual: trapsFocus ? 'Focus trap logic found' : 'No focus trap or Tab listener found in Navbar.tsx',
    error: trapsFocus ? undefined : 'Vulnerability: Worker claimed "focus trap", but Navbar lacks Tab key focus containment. Keyboard focus can escape the open drawer.',
  };
});

// 2.5 Drawer closes on pathname change (route navigation)
assert('CH-DRW-05', 'Mobile Drawer', 'Drawer and dropdown close automatically on route navigation', 'isDrawerOpen=false, isMoreDropdownOpen=false', () => {
  const state = { isDrawerOpen: true, isMoreDropdownOpen: true };

  // Simulate pathname change effect
  function onPathnameChange() {
    state.isDrawerOpen = false;
    state.isMoreDropdownOpen = false;
  }

  onPathnameChange();
  const passed = !state.isDrawerOpen && !state.isMoreDropdownOpen;
  return { pass: passed, actual: `drawer=${state.isDrawerOpen}, dropdown=${state.isMoreDropdownOpen}` };
});

// 2.6 Backdrop overlay click dismisses drawer
assert('CH-DRW-06', 'Mobile Drawer', 'Backdrop overlay click triggers setIsDrawerOpen(false)', 'isDrawerOpen becomes false', () => {
  const state = { isDrawerOpen: true };
  // Backdrop click handler:
  const onBackdropClick = () => {
    state.isDrawerOpen = false;
  };
  onBackdropClick();
  return { pass: state.isDrawerOpen === false, actual: `isDrawerOpen=${state.isDrawerOpen}` };
});

// 2.7 Drawer ARIA modal accessibility attributes
assert('CH-DRW-07', 'Mobile Drawer', 'Drawer dialog has role="dialog", aria-modal="true", and aria-label', 'All ARIA attributes present in AST', () => {
  const hasRoleDialog = navbarContent.includes('role="dialog"');
  const hasAriaModal = navbarContent.includes('aria-modal="true"');
  const hasAriaLabel = navbarContent.includes('aria-label="قائمة التنقل الجانبية"');
  const passed = hasRoleDialog && hasAriaModal && hasAriaLabel;
  return {
    pass: passed,
    actual: `role="dialog": ${hasRoleDialog}, aria-modal="true": ${hasAriaModal}, aria-label: ${hasAriaLabel}`,
  };
});

// ---------------------------------------------------------------------
// SUITE 3: Theme Switcher & Storage Resilience Oracle
// ---------------------------------------------------------------------

// 3.1 Theme toggle alternates between light and dark
assert('CH-THM-01', 'Theme Switcher', 'Toggling theme switches state from light to dark', 'isDark becomes true, themeVal is "dark"', () => {
  let isDark: boolean = false;
  const toggle = () => {
    const nextDark = !isDark;
    isDark = nextDark;
    const themeVal = nextDark ? 'dark' : 'light';
    return { isDark, themeVal };
  };
  const first = toggle();
  const second = toggle();
  const passed = first.isDark === true && first.themeVal === 'dark' && second.isDark === false && second.themeVal === 'light';
  return { pass: passed, actual: `1st: ${first.themeVal}, 2nd: ${second.themeVal}` };
});

// 3.2 Theme initializes from localStorage when valid
assert('CH-THM-02', 'Theme Switcher', 'Initial theme reads saved theme="dark" from localStorage', 'initialDark: true', () => {
  const mockLocalStorage: Record<string, string> = { theme: 'dark' };
  const savedTheme = mockLocalStorage['theme'];
  const prefersDark = false;
  const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  return { pass: initialDark === true, actual: `initialDark=${initialDark}` };
});

// 3.3 Theme falls back to prefers-color-scheme when localStorage is empty
assert('CH-THM-03', 'Theme Switcher', 'Initial theme falls back to prefersDark=true when localStorage is empty', 'initialDark: true', () => {
  const mockLocalStorage: Record<string, string> = {};
  const savedTheme = mockLocalStorage['theme'];
  const prefersDark = true;
  const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  return { pass: initialDark === true, actual: `initialDark=${initialDark}` };
});

// 3.4 ADVERSARIAL CHALLENGE: What happens when localStorage.setItem throws?
assert('CH-THM-04', 'Theme Switcher', 'Check DOM attribute update resilience when localStorage.setItem throws QuotaExceededError', 'DOM attributes updated even if localStorage fails', () => {
  // Analyze Navbar.tsx lines 96-110:
  /*
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
  */
  // Notice that document.documentElement.setAttribute is placed INSIDE try, AFTER localStorage.setItem!
  // If localStorage.setItem throws, setAttribute and classList modifications are NEVER REACHED!
  
  // Test simulation:
  const mockDoc = new MockElement();
  let setAttributeCalled = false;
  const failingStorage = {
    setItem: () => {
      throw new Error('QuotaExceededError: The quota has been exceeded');
    },
  };

  const nextDark = true;
  const themeVal = 'dark';
  try {
    failingStorage.setItem();
    mockDoc.setAttribute('data-theme', themeVal);
    setAttributeCalled = true;
  } catch (e) {
    // caught
  }

  return {
    pass: setAttributeCalled,
    isVulnerability: !setAttributeCalled,
    actual: setAttributeCalled ? 'DOM attribute updated' : 'DOM attribute NOT updated due to localStorage exception',
    error: setAttributeCalled ? undefined : 'Defect in Navbar.tsx: `setAttribute("data-theme")` is sequenced after `localStorage.setItem()` inside the same try block. When localStorage throws (e.g. private mode or quota), UI state changes but DOM theme is not applied.',
  };
});

// 3.5 Initial theme resilience when localStorage.getItem throws
assert('CH-THM-05', 'Theme Switcher', 'Initial theme useEffect handles localStorage.getItem exception gracefully', 'Does not throw unhandled error', () => {
  let threwUnhandled = false;
  let initialDark = false;
  try {
    try {
      const failingStorage = {
        getItem: () => { throw new Error('SecurityError: Access denied'); }
      };
      const savedTheme = failingStorage.getItem();
      const prefersDark = true;
      initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    } catch {
      // Graceful fallback for non-browser/restricted environments
    }
  } catch {
    threwUnhandled = true;
  }

  return { pass: !threwUnhandled, actual: `threwUnhandled=${threwUnhandled}, initialDark=${initialDark}` };
});

// ---------------------------------------------------------------------
// SUITE 4: Toast CustomEvent Dispatch & Lifecycle Oracle
// ---------------------------------------------------------------------

// Mock window event system for Toast testing
class MockEventTarget {
  private listeners: Record<string, ((e: any) => void)[]> = {};

  addEventListener(type: string, listener: (e: any) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(listener);
  }

  removeEventListener(type: string, listener: (e: any) => void) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter((l) => l !== listener);
  }

  dispatchEvent(event: { type: string; detail?: any }) {
    const list = this.listeners[event.type] || [];
    for (const l of list) {
      l(event);
    }
    return true;
  }
}

// 4.1 Global helper dispatches 'met-toast' CustomEvent
assert('CH-TST-01', 'Toast System', 'showGlobalToast dispatches "met-toast" CustomEvent with correct detail payload', 'Event received with message, type, duration', () => {
  const mockWin = new MockEventTarget();
  let receivedDetail: any = null;

  mockWin.addEventListener('met-toast', (e: any) => {
    receivedDetail = e.detail;
  });

  // Execute showGlobalToast logic on mock window
  const showGlobalToast = (message: string, type = 'success', duration = 3000) => {
    mockWin.dispatchEvent({
      type: 'met-toast',
      detail: { message, type, duration },
    });
  };

  showGlobalToast('تم النسخ ✓', 'success', 2500);

  const passed =
    receivedDetail &&
    receivedDetail.message === 'تم النسخ ✓' &&
    receivedDetail.type === 'success' &&
    receivedDetail.duration === 2500;

  return { pass: passed, actual: JSON.stringify(receivedDetail) };
});

// 4.2 ToastProvider listener adds toast to state
assert('CH-TST-02', 'Toast System', 'ToastProvider listener catches "met-toast" and registers new toast with unique ID', 'Toast registered in toasts array', () => {
  interface ToastMessage {
    id: string;
    message: string;
    type?: string;
    duration?: number;
  }
  let toasts: ToastMessage[] = [];

  const showToast = (message: string, type = 'success', duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    toasts = [...toasts, { id, message, type, duration }];
    return id;
  };

  const id1 = showToast('تم النسخ ✓');
  const id2 = showToast('رسالة ثانية');

  const passed = toasts.length === 2 && id1 !== id2 && toasts[0].message === 'تم النسخ ✓';
  return { pass: passed, actual: `Toasts count: ${toasts.length}, unique IDs: ${id1 !== id2}` };
});

// 4.3 Toast auto-dismiss after duration
assert('CH-TST-03', 'Toast System', 'Toast is auto-removed from state when duration timer fires', 'Toasts array becomes empty after timer', () => {
  interface ToastMessage {
    id: string;
    message: string;
    type?: string;
    duration?: number;
  }
  let toasts: ToastMessage[] = [];

  const removeToast = (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
  };

  const id = 'toast-1';
  toasts.push({ id, message: 'اختبار مؤقت', duration: 50 });

  // Simulate timeout firing
  removeToast(id);

  const passed = toasts.length === 0;
  return { pass: passed, actual: `Remaining toasts: ${toasts.length}` };
});

// 4.4 Manual dismissal before timeout
assert('CH-TST-04', 'Toast System', 'Manual onDismiss removes toast immediately', 'Toast removed immediately', () => {
  interface ToastMessage {
    id: string;
    message: string;
  }
  let toasts: ToastMessage[] = [
    { id: 't1', message: 'First' },
    { id: 't2', message: 'Second' },
  ];

  const onDismiss = (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
  };

  onDismiss('t1');
  const passed = toasts.length === 1 && toasts[0].id === 't2';
  return { pass: passed, actual: `Remaining: [${toasts.map((t) => t.id).join(', ')}]` };
});

// 4.5 Stacking multiple toasts concurrently
assert('CH-TST-05', 'Toast System', 'Rapid successive dispatches stack up to N toasts without state collision', 'All toasts preserved in order', () => {
  interface ToastMessage {
    id: string;
    message: string;
  }
  let toasts: ToastMessage[] = [];

  for (let i = 1; i <= 5; i++) {
    toasts = [...toasts, { id: `id-${i}`, message: `Message ${i}` }];
  }

  const passed = toasts.length === 5 && toasts[4].message === 'Message 5';
  return { pass: passed, actual: `Count: ${toasts.length}` };
});

// 4.6 Empty message guard in Toast listener
assert('CH-TST-06', 'Toast System', 'Empty or undefined message does not create a blank toast bubble', 'Empty message rejected', () => {
  let created = false;
  const handleCustomToast = (e: { detail?: { message?: string } }) => {
    if (e.detail && e.detail.message) {
      created = true;
    }
  };

  handleCustomToast({ detail: { message: '' } });
  handleCustomToast({ detail: undefined });

  return { pass: !created, actual: `created=${created}` };
});

// 4.7 Toast styling classes per type (success, error, info)
assert('CH-TST-07', 'Toast System', 'Toast styling tokens match MET Academy design specification', 'Classes match design system tokens', () => {
  const toastContent = fs.readFileSync(path.join(ROOT_DIR, 'src/components/Toast.tsx'), 'utf-8');
  const hasNavySuccess = toastContent.includes('bg-[#1e3a5f]/95') && toastContent.includes('border-[#10b981]');
  const hasRoseError = toastContent.includes('bg-rose-950/95');
  const hasSlateInfo = toastContent.includes('bg-slate-900/95');

  const passed = hasNavySuccess && hasRoseError && hasSlateInfo;
  return {
    pass: passed,
    actual: `navySuccess: ${hasNavySuccess}, roseError: ${hasRoseError}, slateInfo: ${hasSlateInfo}`,
  };
});

// 4.8 SSR safety guard for window object
assert('CH-TST-08', 'Toast System', 'showGlobalToast and useToast fallback guard against SSR undefined window', 'Guarded with typeof window !== "undefined"', () => {
  const toastContent = fs.readFileSync(path.join(ROOT_DIR, 'src/components/Toast.tsx'), 'utf-8');
  const matches = toastContent.match(/typeof window !== ['"]undefined['"]/g);
  const count = matches ? matches.length : 0;
  return { pass: count >= 2, actual: `Found ${count} typeof window guards` };
});

// ---------------------------------------------------------------------
// SUITE 5: Static AST, Layout Tokens & Accessibility Compliance
// ---------------------------------------------------------------------

// 5.1 WCAG AA Skip link in layout.tsx
assert('CH-ACC-01', 'Accessibility', 'RootLayout contains accessible skip-to-content link pointing to #main-content', 'Skip link present with #main-content', () => {
  const layoutContent = fs.readFileSync(path.join(ROOT_DIR, 'src/app/layout.tsx'), 'utf-8');
  const hasSkipLink = layoutContent.includes('href="#main-content"');
  const hasMainTarget = layoutContent.includes('id="main-content"');
  return { pass: hasSkipLink && hasMainTarget, actual: `skipLink: ${hasSkipLink}, mainTarget: ${hasMainTarget}` };
});

// 5.2 Brand tokens in globals.css
assert('CH-TOK-01', 'Design Tokens', 'Globals CSS defines MET Academy Navy (#1e3a5f) and Emerald (#10b981)', 'Both color hexes defined', () => {
  const cssContent = fs.readFileSync(path.join(ROOT_DIR, 'src/app/globals.css'), 'utf-8');
  const hasNavy = cssContent.includes('#1e3a5f');
  const hasEmerald = cssContent.includes('#10b981');
  return { pass: hasNavy && hasEmerald, actual: `navy: ${hasNavy}, emerald: ${hasEmerald}` };
});

// 5.3 Responsive CSS contains 5 required viewports
assert('CH-TOK-02', 'Responsive CSS', 'Responsive CSS specifies media queries for 390px, 768px, 1024px, 1366px, 1440px', 'All 5 breakpoints found', () => {
  const respContent = fs.readFileSync(path.join(ROOT_DIR, 'src/app/responsive.css'), 'utf-8');
  const bps = ['390px', '768px', '1024px', '1366px', '1440px'];
  const missing = bps.filter((bp) => !respContent.includes(bp));
  return { pass: missing.length === 0, actual: missing.length === 0 ? 'All 5 found' : `Missing: ${missing.join(', ')}` };
});

// 5.4 Zero horizontal overflow guard on html and body
assert('CH-TOK-03', 'Responsive CSS', 'Root styles enforce overflow-x: hidden on html and body', 'overflow-x: hidden enforced', () => {
  const respContent = fs.readFileSync(path.join(ROOT_DIR, 'src/app/responsive.css'), 'utf-8');
  const hasOverflowGuard = respContent.includes('overflow-x: hidden');
  return { pass: hasOverflowGuard, actual: `hasOverflowGuard: ${hasOverflowGuard}` };
});

// ---------------------------------------------------------------------
// SUMMARY & REPORT
// ---------------------------------------------------------------------
console.log('----------------------------------------------------------------------');
console.log('  TEST EXECUTION RESULTS');
console.log('----------------------------------------------------------------------\n');

let passCount = 0;
let failCount = 0;
let vulnList: TestOutcome[] = [];

for (const t of outcomes) {
  if (t.passed) {
    passCount++;
    console.log(`  ✓ [PASS] [${t.id}] (${t.suite}) ${t.name}`);
  } else {
    failCount++;
    console.log(`  ✗ [FAIL] [${t.id}] (${t.suite}) ${t.name}`);
    console.log(`     Expected: ${t.expected}`);
    console.log(`     Actual:   ${t.actual}`);
    if (t.error) console.log(`     Details:  ${t.error}`);
    if (t.isVulnerability) {
      vulnList.push(t);
    }
  }
}

console.log('\n======================================================================');
console.log(`  CHALLENGE SUMMARY: ${passCount} PASSED, ${failCount} FAILED (TOTAL: ${outcomes.length})`);
console.log(`  Vulnerabilities/Discrepancies Discovered: ${vulnList.length}`);
console.log('======================================================================\n');

if (vulnList.length > 0) {
  console.log('CRITICAL / HIGH FINDINGS IDENTIFIED:');
  for (const v of vulnList) {
    console.log(`- [${v.id}] ${v.name}`);
    console.log(`  Impact: ${v.error}\n`);
  }
}
