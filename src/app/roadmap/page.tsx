import { redirect } from 'next/navigation';

// The project path is generated from the same registry used by both readers.
export default function RoadmapPage() {
  redirect('/start#project-path');
}
