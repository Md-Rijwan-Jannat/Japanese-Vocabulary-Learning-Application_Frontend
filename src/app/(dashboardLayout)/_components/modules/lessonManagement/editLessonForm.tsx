'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateLessonMutation } from '@/redux/features/lessonApi/lessonApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TLesson } from '@/types';

interface EditLessonFormProps {
  lesson: TLesson;
  onClose: () => void;
}

export function EditLessonForm({ lesson, onClose }: EditLessonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: lesson.name,
      number: lesson.number,
    },
  });

  const [updateLesson, { isLoading }] = useUpdateLessonMutation();

  const onSubmit = async (data: any) => {
    try {
      await updateLesson({ id: lesson._id, ...data }).unwrap();
      toast.success('Lesson updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update lesson');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          type="number"
          {...register('number', {
            required: 'Number is required',
            valueAsNumber: true,
          })}
        />
        {errors.number && (
          <p className="text-sm text-red-500">{errors.number.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Lesson'}
        </Button>
      </div>
    </form>
  );
}
