import React, { Suspense } from 'react';
import Tutorials from '../_components/modules/tutorials';
import { Spinner } from '@/components/shared/spinner';

export default function TutorialsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <Tutorials />
    </Suspense>
  );
}
