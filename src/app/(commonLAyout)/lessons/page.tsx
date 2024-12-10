import React, { Suspense } from 'react';
import Lessons from '../_components/modules/lesson';

export default function LessonPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lessons />
    </Suspense>
  );
}
