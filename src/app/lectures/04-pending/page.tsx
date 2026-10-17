import { redirect } from 'next/navigation';

/**
 * Compatibility route for the legacy lecture URL.
 * The approved Git/GitHub documentation is now organized by topic,
 * so the old unavailable lecture entry points to the complete topic page.
 */
export default function LegacyPendingLectureRoute() {
  redirect('/learn/github');
}
