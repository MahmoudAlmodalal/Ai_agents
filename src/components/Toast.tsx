'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Hook to trigger feedback toasts from any client component
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (message: string, type: ToastType = 'success', duration = 3000) => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('ai-agents-toast', { detail: { message, type, duration } })
          );
        }
      },
    };
  }
  return context;
};

/**
 * Direct global helper callable from utilities or event handlers
 */
export const showGlobalToast = (message: string, type: ToastType = 'success', duration = 3000) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('ai-agents-toast', { detail: { message, type, duration } })
    );
  }
};

/**
 * Toast Provider wrapping the application root layout
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  useEffect(() => {
    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type?: ToastType; duration?: number }>;
      if (customEvent.detail && customEvent.detail.message) {
        showToast(
          customEvent.detail.message,
          customEvent.detail.type || 'success',
          customEvent.detail.duration || 3000
        );
      }
    };
    window.addEventListener('ai-agents-toast', handleCustomToast);
    return () => {
      window.removeEventListener('ai-agents-toast', handleCustomToast);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Floating Toast Container rendered at viewport edge
 */
export const ToastContainer: React.FC<{
  toasts?: ToastMessage[];
  onDismiss?: (id: string) => void;
}> = ({ toasts = [], onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full"
      dir="rtl"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
            toast.type === 'error'
              ? 'bg-rose-950/95 text-rose-100 border-rose-800'
              : toast.type === 'info'
              ? 'bg-[#151d19]/95 text-slate-100 border-slate-700'
              : 'bg-[#17231f]/95 text-white border-[#c7f36b]'
          }`}
          role="status"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#c7f36b] shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          {onDismiss && (
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 cursor-pointer"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
