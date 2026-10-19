'use client';

import React from 'react';
import { TopicItem } from '@/src/types/topic';
import {
  applicationChecklistItemKey,
  EMPTY_APPLICATION_CHECKLIST,
  getApplicationChecklistSnapshot,
  subscribeApplicationChecklist,
  toggleApplicationChecklistItem,
} from '@/src/lib/applicationChecklist';

const storageMessages = {
  'read-error': 'تعذر قراءة الاختيارات المحفوظة. اختياراتك الحالية متاحة خلال هذه الجلسة؛ قد تفقدها عند إعادة تحميل الصفحة.',
  'write-error': 'تعذر حفظ الاختيارات على هذا الجهاز. اختياراتك الحالية متاحة خلال هذه الجلسة؛ قد تفقدها عند إعادة تحميل الصفحة.',
  invalid: 'بيانات القائمة المحفوظة غير صالحة؛ تُركت دون تغيير. اختياراتك الحالية متاحة خلال هذه الجلسة؛ قد تفقدها عند إعادة تحميل الصفحة.',
};

export function ApplicationChecklist({ topic, items }: { topic: TopicItem; items: string[] }) {
  const helpId = React.useId();
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  const subscribe = React.useCallback((listener: () => void) => subscribeApplicationChecklist(topic.slug, listener), [topic.slug]);
  const getSnapshot = React.useCallback(() => getApplicationChecklistSnapshot(topic.slug), [topic.slug]);
  const { selected, storageStatus } = React.useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_APPLICATION_CHECKLIST);
  const message = storageStatus in storageMessages ? storageMessages[storageStatus as keyof typeof storageMessages] : null;

  return (
    <div role="group" aria-label="قائمة تحقق التطبيق" aria-describedby={helpId} className="space-y-2.5">
      <p id={helpId} className="text-xs leading-6 text-[var(--text-muted)]">
        هذه قائمة تقييم ذاتي لتطبيقك، مستقلة عن قراءة المواضيع أو تقدم التصفح. تُحفظ الاختيارات محلياً في هذا المتصفح على هذا الجهاز فقط، وتُفقد عند مسح بيانات المتصفح ولا تنتقل إلى متصفح آخر.
      </p>
      {items.map((item) => {
        const key = applicationChecklistItemKey(item);
        return (
          <label key={key} className="flex min-h-11 items-start gap-2.5 py-2 text-xs sm:text-sm text-[var(--text-muted)] cursor-pointer">
            <input
              type="checkbox"
              disabled={!ready}
              checked={selected.has(key)}
              onChange={(event) => toggleApplicationChecklistItem(topic.slug, item, event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            />
            <span className="leading-5">{item}</span>
          </label>
        );
      })}
      {message && <p role="status" className="text-xs leading-6 text-amber-700 dark:text-amber-300">{message}</p>}
    </div>
  );
}
