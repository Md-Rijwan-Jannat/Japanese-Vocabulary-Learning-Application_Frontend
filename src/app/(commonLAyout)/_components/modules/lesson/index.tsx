'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetAllLessonsQuery } from '@/redux/features/lessonApi/lessonApi';
import { TLesson } from '@/types';

export default function Lessons() {
  // Fetch lessons using the RTK Query hook
  const {
    data: lessonData,
    isLoading,
    error,
  } = useGetAllLessonsQuery(undefined);

  if (isLoading) {
    return <p>Loading lessons...</p>;
  }

  if (error) {
    return <p>Failed to load lessons. Please try again later.</p>;
  }

  // Extract lesson data
  const lessons = lessonData?.data || ([] as TLesson[]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Lessons</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson: TLesson) => (
            <Button key={lesson._id} asChild className="h-32 text-xl">
              <Link href={`/lessons/${lesson._id}`}>
                {lesson.number}. {lesson.name}
              </Link>
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
