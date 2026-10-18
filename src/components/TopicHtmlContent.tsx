'use client';

import React from 'react';
import { useToast } from '@/src/components/Toast';
import type { TopicItem } from '@/src/types/topic';
import { attachLegacyHtmlChecklist } from '@/src/lib/legacyHtmlChecklist';

/** Shared interaction layer for the authored HTML in either reader. */
export function TopicHtmlContent({ html, topic }: { html: string; topic: Pick<TopicItem, 'id' | 'slug'> }) {
  const { showToast } = useToast();
  const root = React.useRef<HTMLDivElement>(null);
  const resetTimers = React.useRef(new Map<HTMLElement, ReturnType<typeof setTimeout>>());
  // Keep React from replacing authored DOM when toast context updates. That DOM
  // contains copy feedback, checklist state and native listeners installed below.
  const markup = React.useMemo(() => ({ __html: html }), [html]);

  React.useEffect(() => {
    // Older lessons contain inline copy code. The shared handler owns copying
    // and feedback so one click cannot start competing clipboard requests.
    root.current?.querySelectorAll<HTMLElement>('.copy-btn[onclick]').forEach((button) => {
      button.removeAttribute('onclick');
    });
  }, [html]);

  React.useEffect(() => {
    if (!root.current) return;
    return attachLegacyHtmlChecklist(root.current, { id: topic.id, slug: topic.slug });
  }, [html, topic.id, topic.slug]);

  React.useEffect(() => {
    const timers = resetTimers.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [html]);

  const handleCopy = async (event: React.MouseEvent<HTMLDivElement>) => {
    const button = (event.target as Element).closest<HTMLElement>('.copy-btn');
    if (!button || !event.currentTarget.contains(button)) return;
    const text = button.closest('.code-container')?.querySelector('code')?.textContent;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      // The topic may have changed while the clipboard request was pending.
      if (!button.isConnected) return;
      const originalText = button.dataset.originalCopyLabel ?? button.textContent ?? 'نسخ';
      button.dataset.originalCopyLabel = originalText;
      button.textContent = '✓ تم النسخ!';
      button.classList.add('copied');
      const previousTimer = resetTimers.current.get(button);
      if (previousTimer) clearTimeout(previousTimer);
      resetTimers.current.set(button, setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
        resetTimers.current.delete(button);
      }, 2000));
      showToast('تم نسخ المحتوى إلى الحافظة بنجاح');
    } catch {
      showToast('تعذّر النسخ إلى الحافظة. حدّد النص وانسخه يدويًا.', 'error');
    }
  };

  return (
    <div
      ref={root}
      className="prose dark:prose-invert max-w-none text-right"
      onClick={handleCopy}
      dangerouslySetInnerHTML={markup}
    />
  );
}
