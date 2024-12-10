'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useGetLessonByIdQuery } from '@/redux/features/lessonApi/lessonApi';

export default function LessonDetails() {
  const params = useParams();
  const lessonId = params.id as string;

  // Fetch lesson data using RTK Query
  const {
    data: lessonData,
    isLoading,
    error,
  } = useGetLessonByIdQuery(lessonId);

  // State for vocabulary navigation
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading lesson...</div>;
  }

  if (error || !lessonData?.data) {
    return <div>Error loading lesson. Please try again later.</div>;
  }

  const lesson = lessonData.data;
  const vocabularies = lesson.vocabularies || [];
  const currentVocab = vocabularies[currentVocabIndex];

  // Handlers for navigating vocabularies
  const handleNext = () => {
    if (currentVocabIndex < vocabularies.length - 1) {
      setCurrentVocabIndex(currentVocabIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVocabIndex > 0) {
      setCurrentVocabIndex(currentVocabIndex - 1);
    }
  };

  const handleComplete = () => {
    alert('Lesson completed!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">{lesson.name}</h1>
        {currentVocab && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-bold mb-2">{currentVocab.word}</h2>
            <p className="text-xl mb-2">
              Pronunciation: {currentVocab.pronunciation}
            </p>
            <p className="text-lg mb-2">Meaning: {currentVocab.meaning}</p>
            <p className="text-md">When to say: {currentVocab.whenToSay}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentVocabIndex === 0}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentVocabIndex === vocabularies.length - 1}
          >
            Next
          </Button>
        </div>
        {currentVocabIndex === vocabularies.length - 1 && (
          <Button onClick={handleComplete} className="mt-4 w-full">
            Complete Lesson
          </Button>
        )}
      </main>
    </div>
  );
}
