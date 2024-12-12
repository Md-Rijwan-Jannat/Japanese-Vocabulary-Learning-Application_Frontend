'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserCircle,
  FaEnvelope,
  FaCrown,
  FaCalendarAlt,
} from 'react-icons/fa';
import { useGetMeQuery } from '@/redux/features/authApi/userApi';
import { Spinner } from '@/components/shared/spinner';
import { TLesson, TUser } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import CompleteLessonTable from '../_components/modules/profile/colpleteLessons';
import Link from 'next/link';

export default function UserProfilePage() {
  const currentUser = useAppSelector(getUser);
  const { data, isLoading } = useGetMeQuery(currentUser?.id || '');

  if (isLoading) {
    return (
      <div className="text-center text-purple-500">
        <Spinner />
      </div>
    );
  }

  const user = data?.data || ({} as TUser);

  return (
    <div className="relative mt-10 md:mt-0">
      <div className="bg-gradient-to-r from-blue-300 to-purple-500 absolute h-[130px] w-[350px] blur-2xl mt-10"></div>
      <div className="flex flex-col items-center min-h-screen text-white space-y-6">
        <div className="bg-gradient-to-r from-blue-300 to-purple-400 absolute h-[130px] w-[350px] blur-2xl mt-10"></div>
        {/* Profile Header */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-3xl bg-white/20 p-6 flex flex-col md:flex-row items-center w-full justify-between gap-5">
            <CardHeader className="flex flex-col items-center justify-center">
              <CardTitle className="text-center mt-4 md:mt-0 text-2xl font-bold">
                {user?.name}
              </CardTitle>
              <CardDescription className="text-center text-sm text-gray-400">
                {user?.role}
              </CardDescription>
              {user?.photo ? (
                <Link href={'/setting'}>
                  <Image
                    className="size-32 rounded-xl object-cover border"
                    src={user.photo}
                    alt={user?.name || 'User'}
                    width={1000}
                    height={1000}
                  />
                </Link>
              ) : (
                <div className="rounded bg-gray-200 flex items-center justify-center size-32 text-xl font-bold text-purple-500">
                  {user?.name?.slice(0, 2).toUpperCase() || 'U'}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-purple-500 w-6 h-6 mr-3" />
                <span>{user?.name}</span>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-blue-500 w-6 h-6 mr-3" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center mb-4">
                <FaCrown className="text-purple-500 w-6 h-6 mr-3" />
                <span>{user?.role}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 w-6 h-6 mr-3" />
                <span>
                  Joined: {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Details */}

        {/* Completed Lessons */}
        <CompleteLessonTable lessons={user?.completeLessons} />
      </div>
    </div>
  );
}
