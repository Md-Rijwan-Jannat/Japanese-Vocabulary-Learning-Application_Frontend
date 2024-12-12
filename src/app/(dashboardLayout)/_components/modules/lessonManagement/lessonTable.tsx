'use client';

import React, { useState } from 'react';
import {
  useGetAllLessonsQuery,
  useDeleteLessonMutation,
} from '@/redux/features/lessonApi/lessonApi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TLesson } from '@/types';
import { EditLessonModal } from './editLessonModal';
import DynamicPagination from '@/components/shared/pagination';

export function LessonTable() {
  const [page, setPage] = useState(1);
  const [editingLesson, setEditingLesson] = useState<TLesson | null>(
    null as TLesson | null
  );
  const limit = 6;
  const [lessonToDelete, setLessonToDelete] = useState<TLesson | null>(null);
  const { data, error, isLoading } = useGetAllLessonsQuery(
    `limit=${limit}&page=${page}&sort=createdAt`
  );
  const [deleteLesson] = useDeleteLessonMutation();

  if (isLoading) return <div className="text-center">Loading...</div>;

  const lessons = data?.data || [];
  const { totalPage } = data?.meta || {};

  const handleDelete = async (id: string) => {
    try {
      await deleteLesson(id).unwrap();
      toast.success('Lesson deleted successfully');
      setLessonToDelete(null);
    } catch (error) {
      toast.error('Failed to delete lesson');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.map((lesson: TLesson) => (
                <TableRow key={lesson._id}>
                  <TableCell className="font-medium">{lesson.name}</TableCell>
                  <TableCell>{lesson.number}</TableCell>
                  <TableCell>{lesson.createdBy.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingLesson(lesson)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLessonToDelete(lesson)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPage > 1 && (
          <DynamicPagination
            currentPage={page}
            totalPages={totalPage}
            onPageChange={setPage}
          />
        )}
      </CardContent>
      {editingLesson && (
        <EditLessonModal
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
        />
      )}
      {lessonToDelete && (
        <AlertDialog
          open={!!lessonToDelete}
          onOpenChange={() => setLessonToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this lesson?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                lesson and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(lessonToDelete._id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Card>
  );
}
