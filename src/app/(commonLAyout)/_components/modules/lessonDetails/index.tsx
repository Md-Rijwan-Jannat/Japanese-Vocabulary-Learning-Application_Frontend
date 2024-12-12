'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  useGetLessonByIdQuery,
  useCompleteLessonMutation,
} from '@/redux/features/lessonApi/lessonApi';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { buttonStyle } from '@/style';
import BackButton from '@/components/shared/backButton';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';
import { useGetMeQuery } from '@/redux/features/authApi/userApi';
import { CircleCheckBig } from 'lucide-react';
import { Spinner } from '@/components/shared/spinner';

export default function LessonDetails({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const user = useAppSelector(getUser);
  // Fetch lesson data using RTK Query
  const {
    data: lessonData,
    isLoading,
    error,
  } = useGetLessonByIdQuery(lessonId);
  const { data: userData } = useGetMeQuery(user?.id);
  const currentUser = userData?.data;

  const isLessonComplete = currentUser?.completeLessons?.some(
    (lesson: { _id: string }) => lesson._id === lessonId
  );

  console.log('isLessonComplete', isLessonComplete, currentUser, lessonId);

  // Mutation for completing the lesson
  const [completeLesson, { isLoading: isCompleting }] =
    useCompleteLessonMutation();

  // State for vocabulary navigation
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Get window size for confetti
  const { width, height } = useWindowSize();

  // Handle loading and error states
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error || !lessonData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Error loading lesson. Please try again later.
      </div>
    );
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

  const handleComplete = async () => {
    try {
      await completeLesson(lessonId).unwrap();
      setShowConfetti(true);

      // Hide confetti after 5 seconds and show success toast
      setTimeout(() => {
        setShowConfetti(false);
        toast.success('Lesson completed successfully! 🎉');
        router.push('/lessons');
      }, 5000);
    } catch (error: any) {
      console.log('error', error);
      toast.error(error.data.message);
    }
  };

  // Play pronunciation aloud
  const playPronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // Set language to Japanese
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackButton />
      <main className="flex-grow px-4">
        <h1 className="text-2xl text-blue-600 my-5 text-start drop-shadow-md">
          {lesson.name}
        </h1>

        {/* Confetti Animation */}
        {showConfetti && <Confetti width={width} height={height} />}

        <AnimatePresence mode="wait">
          {currentVocab && (
            <div className="relative">
              {/* Gradient Background */}
              <div className="bg-gradient-to-r from-blue-200 to-purple-500 h-[150px] w-1/2 mx-auto blur-[100px] absolute"></div>

              <motion.div
                key={currentVocabIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-[160px] bg-white/50 inset-0 rounded-lg border shadow-lg p-6 flex flex-col opacity-90 group-hover:opacity-100 transition-opacity duration-300 h-full max-w-5xl my-10 mx-auto"
              >
                <h2
                  className="text-3xl font-bold text-gray-700 cursor-pointer hover:text-purple-500 transition flex items-center justify-center gap-2 mb-3"
                  onClick={() => playPronunciation(currentVocab.word)}
                  title="Click to hear pronunciation"
                >
                  {currentVocab.word}{' '}
                  <p className="text-xl font-normal">
                    ({currentVocab.pronunciation})
                  </p>
                </h2>

                <p className="text-[16px] mb-2 text-gray-600">
                  <span className="text-[18px] text-purple-500">Meaning:</span>{' '}
                  {currentVocab.meaning}
                </p>
                <p className="text-[16px] text-gray-600">
                  <span className="text-[18px] text-purple-500">
                    When to say:
                  </span>{' '}
                  {currentVocab.whenToSay}
                </p>
              </motion.div>
              {isLessonComplete && (
                <div className="border bg-green-100 border-green-500 px-3 py-2 rounded-md text-green-600 text-xl flex items-center justify-center gap-3 w-full md:w-1/2 mx-auto">
                  This lesson is complete <CircleCheckBig />{' '}
                </div>
              )}
            </div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentVocabIndex === 0}
            className={`${buttonStyle}`}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentVocabIndex === vocabularies.length - 1}
            className={`${buttonStyle}`}
          >
            Next
          </Button>
        </div>

        {currentVocabIndex === vocabularies.length - 1 && (
          <motion.div className="flex items-center justify-center my-6">
            <Button
              onClick={handleComplete}
              disabled={isCompleting || isLessonComplete}
              className={`${buttonStyle}`}
            >
              {isCompleting ? 'Completing...' : 'Complete Lesson'}
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
