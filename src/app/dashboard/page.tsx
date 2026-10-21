import type { Metadata } from 'next';
import { DashboardExperience } from '@/src/components/DashboardExperience';
import { PROMPT_LIBRARY } from '@/src/lib/promptLibrary';

export const metadata: Metadata = {
  title: 'لوحة تعلّمي',
  description: 'راجع زياراتك ونتائجك وتقييماتك الذاتية المحفوظة محليًا على هذا الجهاز.',
};

export default function DashboardPage() {
  return <DashboardExperience prompts={PROMPT_LIBRARY} />;
}
