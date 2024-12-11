import React, { Suspense } from 'react';
import LessonDetails from '../../_components/modules/lessonDetails';

export default function LessonDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LessonDetails lessonId={params.id} />
    </Suspense>
  );
}
