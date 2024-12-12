'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateVocabularyMutation } from '@/redux/features/vocabularyApi/vocabularyApi';
import { buttonStyle } from '@/style';
import { CircleX } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllLessonsQuery } from '@/redux/features/lessonApi/lessonApi';
import { TLesson } from '@/types';

interface IFormInput {
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lesson: string;
}

export function CreateVocabularyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormInput>();
  const [createVocabularyFn, { isLoading }] = useCreateVocabularyMutation();
  const { data: lessonsData, isLoading: isLoadingLessons } =
    useGetAllLessonsQuery('sort=createdAt');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const lessons = lessonsData?.data || ([] as TLesson[]);

  console.log('lessons=>', lessons);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await createVocabularyFn(data).unwrap();
      if (response.success) {
        toast.success('Vocabulary created successfully!');
        setErrorMessage(null);
        reset();
      }
    } catch (error: any) {
      setErrorMessage(error.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="relative flex items-center justify-center mt-10 md:mt-0">
      <div className="bg-gradient-to-r from-blue-300 to-purple-300 absolute h-[130px] w-[350px] blur-3xl mt-10"></div>
      <Card className="w-full mx-auto bg-white/20 backdrop-blur-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create New Vocabulary
          </CardTitle>
          <CardDescription className="text-center">
            Add a new vocabulary to your lesson
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <motion.div
              className="border bg-red-100 border-red-500 px-3 py-2 rounded-md text-red-600 flex items-center justify-center gap-2 w-full mx-auto mb-4 text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {errorMessage} <CircleX />
            </motion.div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="space-y-2 w-full">
                <Label htmlFor="word">Word</Label>
                <Input
                  id="word"
                  {...register('word', { required: 'Word is required' })}
                  placeholder="e.g. どこから来ましたか"
                  className="w-full"
                />
                {errors.word && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.word.message}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="pronunciation">Pronunciation</Label>
                <Input
                  id="pronunciation"
                  {...register('pronunciation', {
                    required: 'Pronunciation is required',
                  })}
                  placeholder="e.g. Doko kara kimashita ka"
                  className="w-full"
                />
                {errors.pronunciation && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.pronunciation.message}
                  </motion.p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="space-y-2 w-full">
                <Label htmlFor="meaning">Meaning</Label>
                <Input
                  id="meaning"
                  {...register('meaning', { required: 'Meaning is required' })}
                  placeholder="e.g. Where are you from?"
                  className="w-full"
                />
                {errors.meaning && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.meaning.message}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="lesson">Lesson</Label>
                <Select onValueChange={(value) => setValue('lesson', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingLessons ? (
                      <SelectItem value="loading">
                        Loading lessons...
                      </SelectItem>
                    ) : (
                      lessons?.map((lesson: any) => (
                        <SelectItem key={lesson._id} value={lesson._id}>
                          {lesson.name} (#{lesson.number})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errors.lesson && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.lesson.message}
                  </motion.p>
                )}
              </div>
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="whenToSay">When to Say</Label>
              <Textarea
                id="whenToSay"
                {...register('whenToSay', {
                  required: 'When to Say is required',
                })}
                placeholder="e.g. Used when asking someone's place of origin"
                className="w-full"
              />
              {errors.whenToSay && (
                <motion.p
                  className="text-sm text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.whenToSay.message}
                </motion.p>
              )}
            </div>

            <CardFooter className="px-0 pt-4">
              <Button
                type="submit"
                className={`${buttonStyle} mx-auto`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Vocabulary'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
