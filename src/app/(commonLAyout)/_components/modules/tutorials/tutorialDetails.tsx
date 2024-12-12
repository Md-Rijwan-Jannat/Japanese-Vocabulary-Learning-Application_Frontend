'use client';

import NavigationButtons from '@/components/shared/backButton';
import { Spinner } from '@/components/shared/spinner';
import {
  useGetAllTutorialsQuery,
  useGetTutorialByIdQuery,
} from '@/redux/features/tutorialsApi/tutorialsApi';
import { TTutorial } from '@/types';
import Link from 'next/link';
import React from 'react';

export default function TutorialDetails({
  tutorialId,
}: {
  tutorialId: string;
}) {
  const {
    data: tutorialData,
    isLoading,
    error,
  } = useGetTutorialByIdQuery(tutorialId);
  const {
    data: allTutorials,
    isLoading: allTutorialsLoading,
    error: allTutorialsError,
  } = useGetAllTutorialsQuery('sort=-createdAt');

  if (isLoading || allTutorialsLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (error || allTutorialsError) {
    return (
      <div className="text-center text-red-500">
        Error loading tutorial details.
      </div>
    );
  }

  const tutorial = tutorialData?.data;
  const recentTutorials = allTutorials?.data.slice(0, 3); // Get the first 3 tutorials for the right column

  return (
    <div className="">
      <NavigationButtons />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Tutorial Details */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          <h2 className="text-lg md:text-3xl font-semibold text-gray-800">
            {tutorial?.title}
          </h2>
          <p className="text-sm md:text-lg text-gray-600 mt-4">
            {tutorial?.description}
          </p>

          {/* Video Embed */}
          <div className="relative pb-[56.25%] mt-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={tutorial?.videoLink}
              title={tutorial?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Additional Details (created by, etc.) */}
          <div className="mt-6 p-4 border-t">
            <div className="flex items-center space-x-3">
              <img
                src={tutorial?.createdBy?.photo}
                alt={tutorial?.createdBy?.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-md font-semibold text-gray-700">
                  {tutorial?.createdBy?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {tutorial?.createdBy?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent 3 Tutorials */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Recent Tutorials
          </h3>
          <div className="space-y-4">
            {recentTutorials?.map((recentTutorial: TTutorial) => (
              <div key={recentTutorial._id} className="border-b pb-4">
                <h4 className="text-sm md:text-xl font-medium text-gray-800">
                  {recentTutorial.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {recentTutorial.description}
                </p>
                <Link
                  href={`/tutorials/${recentTutorial._id}`}
                  className="mt-3 text-blue-600 hover:text-blue-800"
                >
                  Watch Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
