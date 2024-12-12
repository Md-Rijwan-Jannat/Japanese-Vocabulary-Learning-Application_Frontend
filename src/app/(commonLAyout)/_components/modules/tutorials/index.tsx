'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useGetAllTutorialsQuery } from '@/redux/features/tutorialsApi/tutorialsApi';
import Link from 'next/link';
import NavigationButtons from '@/components/shared/backButton';
import { TTutorial } from '@/types';
import DynamicPagination from '@/components/shared/pagination';
import { Spinner } from '@/components/shared/spinner';

const Tutorials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const { data, isLoading, error } = useGetAllTutorialsQuery(
    `limit=${limit}&page=${currentPage}&sort=createdAt`
  );

  const totalPages = data?.meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading tutorials.</div>
    );
  }

  return (
    <div className="relative">
      <div className="backdrop-blur-3xl bg-white/20 mx-auto py-10">
        <NavigationButtons />
        <h1 className="text-2xl font-bold text-purple-500 mt-5 mb-10 text-center drop-shadow-md">
          Learn Japanese- Tutorials
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((tutorial: TTutorial) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={tutorial._id}
              className="relative flex justify-center"
            >
              <div className="absolute bg-gradient-to-r from-blue-200 to-purple-400 h-[150px] w-[300px] blur-2xl rotate-12"></div>
              <Card className="backdrop-blur-3xl bg-white/20 w-full max-w-xs shadow-lg rounded-lg">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {tutorial.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  <Link
                    href={`/tutorials/${tutorial._id}`}
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    Watch Tutorial
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Tutorials;
