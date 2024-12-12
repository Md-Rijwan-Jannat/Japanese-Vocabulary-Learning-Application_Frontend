import React, { Suspense } from 'react';
import Lessons from '../_components/modules/lesson';
import { Spinner } from '@/components/shared/spinner';

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <Lessons />
    </Suspense>
  );
}
