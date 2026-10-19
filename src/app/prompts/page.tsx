import { PromptLibrary } from '@/src/components/PromptLibrary';
import { PROMPT_LIBRARY } from '@/src/lib/promptLibrary';

export const metadata = {
  title: 'مكتبة البرومبتات',
  description: 'ابحث وصفِّ البرومبتات الكاملة المرتبطة بمراحل بناء المشروع، وراجع مدخلاتها ومخرجاتها قبل نسخها.',
};

export default function PromptsPage() {
  return <PromptLibrary prompts={PROMPT_LIBRARY} />;
}
