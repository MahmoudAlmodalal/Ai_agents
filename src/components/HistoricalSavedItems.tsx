import Link from 'next/link';
import { getTopicBySlug, HISTORICAL_TOPICS } from '@/src/lib/topicRegistry';

export function HistoricalSavedItems({ bookmarks, recentlyViewed }: { bookmarks: string[]; recentlyViewed: string[] }) {
  const unresolved = Array.from(new Set([...bookmarks, ...recentlyViewed])).filter((id) => !getTopicBySlug(id));
  if (!unresolved.length) return null;
  return (
    <section aria-label="محفوظات تحتاج اختيارًا" className="mb-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <h2 className="font-bold">محفوظات تحتاج اختيارًا</h2>
      <p className="mt-2 text-sm leading-7">احتفظنا بهذه العناصر من المفضلة أو سجل المشاهدة. بعض المواد القديمة أصبحت عدة مواضيع؛ اختر ما تريد قراءته دون تغيير محفوظك تلقائيًا.</p>
      <ul className="mt-3 space-y-4">
        {unresolved.map((id) => {
          const historical = Object.hasOwn(HISTORICAL_TOPICS, id) ? HISTORICAL_TOPICS[id] : undefined;
          return <li key={id} className="text-sm leading-7">
            <strong>{historical?.title ?? 'عنصر قديم غير معروف'}</strong>{' '}<code dir="ltr">{id}</code>
            {historical?.choices?.length ? <div className="flex flex-wrap gap-x-4 gap-y-1">{historical.choices.map((slug) => {
              const topic = getTopicBySlug(slug);
              return topic && <Link className="text-[var(--primary)] underline" key={slug} href={`/learn/${slug}`}>{topic.title}</Link>;
            })}</div> : id === 'topic-11' ? <div><Link href="/prompts" className="underline">مكتبة البرومبتات</Link></div> : id === 'topic-12' ? <div className="flex gap-4"><Link href="/faq" className="underline">الأسئلة الشائعة</Link><Link href="/glossary" className="underline">القاموس</Link></div> : <p>تعذرت المطابقة؛ ما زال المعرّف محفوظًا على هذا الجهاز.</p>}
          </li>;
        })}
      </ul>
    </section>
  );
}
