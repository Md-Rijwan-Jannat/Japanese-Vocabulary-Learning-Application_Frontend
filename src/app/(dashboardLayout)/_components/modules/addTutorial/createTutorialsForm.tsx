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
import { buttonStyle } from '@/style';
import { CircleX } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useCreateTutorialMutation } from '@/redux/features/tutorialsApi/tutorialsApi';

interface IFormInput {
  title: string;
  description: string;
  published: boolean;
  videoLink: string;
}

export function CreateTutorialForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      published: false,
    },
  });
  const [createTutorialFn, { isLoading }] = useCreateTutorialMutation();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await createTutorialFn(data).unwrap();
      if (response.success) {
        toast.success('Tutorial created successfully!');
        setErrorMessage(null);
        reset();
      }
    } catch (error: any) {
      setErrorMessage(error.data?.message || 'Something went wrong.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create New Tutorial
        </CardTitle>
        <CardDescription className="text-center">
          Add a new tutorial to your learning platform
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
            {errorMessage} <CircleX className="h-4 w-4" />
          </motion.div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="e.g. English to Japanese - Counting Numbers"
              className="w-full"
            />
            {errors.title && (
              <motion.p
                className="text-sm text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.title.message}
              </motion.p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder="e.g. This tutorial teaches you how to count in Japanese, from 1 to 100, with pronunciation tips."
              className="w-full"
              rows={4}
            />
            {errors.description && (
              <motion.p
                className="text-sm text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.description.message}
              </motion.p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoLink">Video Link</Label>
            <Input
              id="videoLink"
              {...register('videoLink', { required: 'Video link is required' })}
              placeholder="e.g. https://www.youtube.com/embed/jvRC6-YR4RA"
              className="w-full"
            />
            {errors.videoLink && (
              <motion.p
                className="text-sm text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.videoLink.message}
              </motion.p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              onCheckedChange={(checked: boolean) =>
                setValue('published', checked)
              }
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
          <CardFooter className="px-0 pt-4">
            <Button
              type="submit"
              className={`${buttonStyle} w-full`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Tutorial'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
