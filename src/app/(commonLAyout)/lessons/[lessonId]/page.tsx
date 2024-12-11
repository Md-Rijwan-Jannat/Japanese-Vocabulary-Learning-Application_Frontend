import React, { Suspense } from 'react';
import LessonDetails from '../../_components/modules/lessonDetails';

// interface TLessonDetailsPageProps {
//   params: {
//     lessonId: string;
//   };
// }

export default function LessonDetailsPage({ params }: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LessonDetails lessonId={params.lessonId} />
    </Suspense>
  );
}
