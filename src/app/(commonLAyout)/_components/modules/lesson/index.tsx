'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetAllLessonsQuery } from '@/redux/features/lessonApi/lessonApi';
import { TLesson } from '@/types';
import { motion } from 'framer-motion';
import { buttonStyle } from '@/style';
import { useState } from 'react';
import DynamicPagination from '@/components/shared/pagination';
import BackButton from '@/components/shared/backButton';

export default function Lessons() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  // Fetch lessons using the RTK Query hook
  const {
    data: lessonData,
    isLoading,
    error,
  } = useGetAllLessonsQuery(
    `limit=${limit}&page=${currentPage}&sort=createdAt`
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading lessons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Failed to load lessons. Please try again later.
      </div>
    );
  }

  // Extract lesson data
  const lessons = lessonData?.data || ([] as TLesson[]);
  const meta = lessonData?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackButton />
      <main className="flex-grow mx-auto px-4">
        <h1 className="text-2xl text-blue-600 mt-5 mb-10 text-start drop-shadow-md">
          Learn Japanese - Lessons
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson: TLesson) => (
            <div key={lesson._id} className="relative group">
              {/* Gradient Background */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-[150px] w-[200px] blur-2xl absolute "></div>

              {/* Backdrop Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-3xl bg-white/30 inset-0 rounded-lg border shadow-lg p-6 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity duration-300 h-full"
              >
                <h2 className="text-xl font-bold text-purple-500 transition-colors duration-300 mb-4">
                  {lesson.number}. {lesson.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Explore and practice key vocabulary and phrases for this
                  lesson.
                </p>
                <Button
                  asChild
                  className={`${buttonStyle} w-[150px] mx-auto mt-5`}
                >
                  <Link href={`/lessons/${lesson._id}`}>Start Lesson</Link>
                </Button>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center my-5 w-full">
          {totalPages > 1 && (
            <DynamicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
