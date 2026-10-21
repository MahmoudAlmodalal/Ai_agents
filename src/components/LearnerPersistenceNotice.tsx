'use client';

import React from 'react';
import type { TopicStorageStatus } from '@/src/lib/topicRegistry';

export const storageFailureMessages: Record<'read-error' | 'write-error' | 'invalid', string> = {
  'read-error': 'تعذر قراءة البيانات المحفوظة على هذا المتصفح. اختياراتك الحالية متاحة خلال هذه الجلسة فقط وقد تفقدها عند إعادة تحميل الصفحة.',
  'write-error': 'تعذر حفظ التغييرات على هذا الجهاز. اختياراتك الحالية متاحة خلال هذه الجلسة فقط وقد تفقدها عند إعادة تحميل الصفحة.',
  invalid: 'بيانات المفضلة أو سجل المشاهدة المحفوظة غير صالحة؛ تُركت دون تغيير. اختياراتك الحالية متاحة خلال هذه الجلسة فقط ولم تُحفظ دائماً.',
};

export const LOCAL_STORAGE_EXPLANATION = 'المفضلة وسجل المشاهدة وقوائم التحقق تُحفظ محلياً في هذا المتصفح على هذا الجهاز فقط، وتُفقد عند مسح بيانات التصفح ولا تنتقل تلقائياً إلى متصفح أو جهاز آخر.';

interface LearnerPersistenceNoticeProps {
  status: TopicStorageStatus;
  showExplanation?: boolean;
  className?: string;
}

export function LearnerPersistenceNotice({
  status,
  showExplanation = true,
  className = '',
}: LearnerPersistenceNoticeProps) {
  const isFailure = status === 'read-error' || status === 'write-error' || status === 'invalid';
  const errorMessage = isFailure ? storageFailureMessages[status] : null;

  return (
    <div className={`space-y-2 text-xs leading-6 ${className}`}>
      {errorMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200"
        >
          <strong className="block font-bold">تنبيه الحفظ المحلي:</strong>
          <p>{errorMessage}</p>
        </div>
      )}
      {showExplanation && (
        <p className="text-[var(--text-muted)]">
          {LOCAL_STORAGE_EXPLANATION}
        </p>
      )}
    </div>
  );
}
