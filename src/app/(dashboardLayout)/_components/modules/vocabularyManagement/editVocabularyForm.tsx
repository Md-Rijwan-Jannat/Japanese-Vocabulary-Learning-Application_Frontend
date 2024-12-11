'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateVocabularyMutation } from '@/redux/features/vocabularyApi/vocabularyApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TVocabulary } from '@/types';
import { useGetAllLessonsQuery } from '@/redux/features/lessonApi/lessonApi';

interface EditVocabularyFormProps {
  vocabulary: TVocabulary;
  onClose: () => void;
}

export function EditVocabularyForm({
  vocabulary,
  onClose,
}: EditVocabularyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      word: vocabulary.word,
      pronunciation: vocabulary.pronunciation,
      meaning: vocabulary.meaning,
      whenToSay: vocabulary.whenToSay,
      lesson: vocabulary.lesson._id,
    },
  });

  const [updateVocabulary, { isLoading }] = useUpdateVocabularyMutation();
  const { data: lessonsData } = useGetAllLessonsQuery('');

  const onSubmit = async (data: any) => {
    try {
      await updateVocabulary({ id: vocabulary._id, ...data }).unwrap();
      toast.success('Vocabulary updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update vocabulary');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="word">Word</Label>
        <Input
          id="word"
          {...register('word', { required: 'Word is required' })}
        />
        {errors.word && (
          <p className="text-sm text-red-500">{errors.word.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="pronunciation">Pronunciation</Label>
        <Input
          id="pronunciation"
          {...register('pronunciation', {
            required: 'Pronunciation is required',
          })}
        />
        {errors.pronunciation && (
          <p className="text-sm text-red-500">{errors.pronunciation.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="meaning">Meaning</Label>
        <Input
          id="meaning"
          {...register('meaning', { required: 'Meaning is required' })}
        />
        {errors.meaning && (
          <p className="text-sm text-red-500">{errors.meaning.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="whenToSay">When to Say</Label>
        <Textarea
          id="whenToSay"
          {...register('whenToSay', { required: 'When to Say is required' })}
        />
        {errors.whenToSay && (
          <p className="text-sm text-red-500">{errors.whenToSay.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="lesson">Lesson</Label>
        <Select
          onValueChange={(value) => setValue('lesson', value)}
          defaultValue={vocabulary.lesson._id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a lesson" />
          </SelectTrigger>
          <SelectContent>
            {lessonsData?.data.map((lesson: any) => (
              <SelectItem key={lesson._id} value={lesson._id}>
                {lesson.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.lesson && (
          <p className="text-sm text-red-500">{errors.lesson.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Vocabulary'}
        </Button>
      </div>
    </form>
  );
}
