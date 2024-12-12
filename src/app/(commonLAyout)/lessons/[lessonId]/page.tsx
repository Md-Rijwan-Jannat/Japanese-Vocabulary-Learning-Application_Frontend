import React, { Suspense } from 'react';
import LessonDetails from '../../_components/modules/lessonDetails';
import { Spinner } from '@/components/shared/spinner';

// interface TLessonDetailsPageProps {
//   params: {
//     lessonId: string;
//   };
// }

export default function LessonDetailsPage({ params }: any) {
  return (
    <Suspense
      fallback={
        <div>
          {' '}
          <Spinner />
        </div>
      }
    >
      <LessonDetails lessonId={params.lessonId} />
    </Suspense>
  );
}
