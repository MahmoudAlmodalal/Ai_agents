import { notFound, redirect } from 'next/navigation';
import { COURSE_LECTURES } from '@/src/lib/courseRoadmap';

export function generateStaticParams() {
  return COURSE_LECTURES.map(({ number }) => ({ number: String(number) }));
}

// Audited by original lecture meaning, independent of current topic positions.
// Composite lectures lead to the canonical index rather than selecting one part.
const destinations: Record<string, string> = {
  '4': '/learn/relational-erd-design', // Database Analysis / ERD
  '11': '/learn/backend-architecture-api-contracts', // Architecture / REST API
  '14': '/learn/auth-permissions', // Authentication / Authorization
  '20': '/learn/project-demo-day', // Demo Day
};

export default async function HistoricalRoadmapRoute({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  if (!COURSE_LECTURES.some((lecture) => String(lecture.number) === number)) notFound();
  redirect(destinations[number] ?? '/start#project-path');
}
