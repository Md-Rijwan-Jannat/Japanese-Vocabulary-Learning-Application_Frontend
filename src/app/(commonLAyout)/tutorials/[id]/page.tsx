import React, { Suspense } from 'react';
import TutorialDetails from '../../_components/modules/tutorials/tutorialDetails';
import { Spinner } from '@/components/shared/spinner';

export default function TutorialsDetailsPAge({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <TutorialDetails tutorialId={params.id} />
    </Suspense>
  );
}
