'use client';

import React from 'react';
import {
  useGetAllLessonsQuery,
  useGetAllCompleteLessonsQuery,
} from '@/redux/features/lessonApi/lessonApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllTutorialsQuery } from '@/redux/features/tutorialsApi/tutorialsApi';
import { useGetAllUsersQuery } from '@/redux/features/authApi/userApi';
import { useGetAllVocabulariesQuery } from '@/redux/features/vocabularyApi/vocabularyApi';

export default function DashboardStats() {
  const { data: tutorials } = useGetAllTutorialsQuery('sort=createdAt');
  const { data: users } = useGetAllUsersQuery('sort=createdAt');
  const { data: vocabularies } = useGetAllVocabulariesQuery('sort=createdAt');
  const { data: lessons } = useGetAllLessonsQuery('sort=createdAt');
  const { data: completeLessons } =
    useGetAllCompleteLessonsQuery('sort=createdAt');

  console.log(lessons);

  const stats = [
    {
      title: 'Total Tutorials',
      value: tutorials?.data?.length || 0,
      description: '+5% from last month',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-blue-500"
        >
          <path d="M4 4h16v16H4z" />
          <path d="M8 4v16M16 4v16" />
        </svg>
      ),
      color: 'text-blue-500',
    },
    {
      title: 'Total Users',
      value: users?.data?.length || 0,
      description: '+10% from last month',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-purple-500"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
      color: 'text-purple-500',
    },
    {
      title: 'Total Vocabularies',
      value: vocabularies?.data?.length || 0,
      description: '+8% from last month',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-black"
        >
          <path d="M2 7h20M2 12h20M2 17h20" />
        </svg>
      ),
      color: 'text-black',
    },
    {
      title: 'Total Lessons',
      value: lessons?.data?.length || 0,
      description: '+8% from last month',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-purple-500"
        >
          <path d="M4 19.5a2.5 2.5 0 0 1 2.5-2.5h13" />
          <path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 0 4 19.5z" />
          <path d="M4 15h16" />
        </svg>
      ),
      color: 'text-black',
    },
    {
      title: 'Completed Lessons',
      value: completeLessons?.data?.length || 0,
      description: '+15% from last week',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-purple-500"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10" />
        </svg>
      ),
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="relative mt-10 md:mt-0">
      <div className="bg-gradient-to-r from-blue-300 to-purple-300 absolute h-[130px] w-[350px] md:w-7/12 blur-2xl mt-10"></div>
      <Card className="bg-white/20 backdrop-blur-3xl w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-purple-500">
            Dashboard Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
