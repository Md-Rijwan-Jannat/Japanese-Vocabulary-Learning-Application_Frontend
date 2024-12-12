'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateTutorialMutation } from '@/redux/features/tutorialsApi/tutorialsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { TTutorial } from '@/types';

interface EditTutorialFormProps {
  tutorial: TTutorial;
  onClose: () => void;
}

export function EditTutorialForm({ tutorial, onClose }: EditTutorialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: tutorial.title,
      description: tutorial.description,
      published: tutorial.published,
      videoLink: tutorial.videoLink,
    },
  });

  const [updateTutorial, { isLoading }] = useUpdateTutorialMutation();

  const onSubmit = async (data: any) => {
    try {
      await updateTutorial({ id: tutorial._id, data: { ...data } }).unwrap();
      toast.success('Tutorial updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update tutorial');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="videoLink">Video Link</Label>
        <Input
          id="videoLink"
          {...register('videoLink', { required: 'Video Link is required' })}
        />
        {errors.videoLink && (
          <p className="text-sm text-red-500">{errors.videoLink.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          defaultChecked={tutorial.published}
          onCheckedChange={(checked) => setValue('published', checked)}
        />
        <Label htmlFor="published">Published</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Tutorial'}
        </Button>
      </div>
    </form>
  );
}
