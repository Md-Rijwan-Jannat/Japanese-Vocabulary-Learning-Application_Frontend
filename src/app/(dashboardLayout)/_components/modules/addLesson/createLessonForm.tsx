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
import { useCreateLessonMutation } from '@/redux/features/lessonApi/lessonApi';
import { buttonStyle } from '@/style';
import { CircleX } from 'lucide-react';

interface IFormInput {
  name: string;
  number: number;
}

export function CreateLessonForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [createLessonFn, { isLoading }] = useCreateLessonMutation();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await createLessonFn(data).unwrap();
      if (response.success) {
        toast.success('Lesson created successfully!');
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
            Create New Lesson
          </CardTitle>
          <CardDescription className="text-center">
            Add a new lesson to your curriculum
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
            <div className="space-y-2">
              <Label htmlFor="name">Lesson Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Lesson name is required' })}
                placeholder="e.g. Basic Introductions in Japanese"
                className="w-full"
              />
              {errors.name && (
                <motion.p
                  className="text-sm text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Lesson Number</Label>
              <Input
                id="number"
                type="number"
                {...register('number', {
                  required: 'Lesson number is required',
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Lesson number must be at least 1',
                  },
                })}
                placeholder="e.g. 2"
                className="w-full"
              />
              {errors.number && (
                <motion.p
                  className="text-sm text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.number.message}
                </motion.p>
              )}
            </div>
            <CardFooter className="px-0 pt-4">
              <Button
                type="submit"
                className={`${buttonStyle} mx-auto`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Lesson'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
