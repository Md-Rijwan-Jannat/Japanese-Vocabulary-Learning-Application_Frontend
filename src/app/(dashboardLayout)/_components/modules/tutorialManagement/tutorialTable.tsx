'use client';

import React, { useState } from 'react';
import {
  useGetAllTutorialsQuery,
  useDeleteTutorialMutation,
} from '@/redux/features/tutorialsApi/tutorialsApi';
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
import { Pencil, Trash2, Plus } from 'lucide-react';
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
import { TTutorial } from '@/types';
import DynamicPagination from '@/components/shared/pagination';
import { EditTutorialModal } from './editTutorialsModal';
import { useRouter } from 'next/navigation';

export function TutorialTable() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [editingTutorial, setEditingTutorial] = useState<TTutorial | null>(
    null
  );
  const limit = 6;
  const [tutorialToDelete, setTutorialToDelete] = useState<TTutorial | null>(
    null
  );
  const { data, error, isLoading } = useGetAllTutorialsQuery(
    `limit=${limit}&page=${page}&sort=createdAt`
  );
  const [deleteTutorial] = useDeleteTutorialMutation();

  if (isLoading) return <div className="text-center">Loading...</div>;

  const tutorials = data?.data || [];
  const { totalPage } = data?.meta || {};

  const handleDelete = async (id: string) => {
    try {
      await deleteTutorial(id).unwrap();
      toast.success('Tutorial deleted successfully');
      setTutorialToDelete(null);
    } catch (error) {
      toast.error('Failed to delete tutorial');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Tutorials</CardTitle>
        <Button onClick={() => router.push('/admin-dashboard/add-tutorial')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Tutorial
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorials.map((tutorial: TTutorial) => (
                <TableRow key={tutorial._id}>
                  <TableCell className="font-medium">
                    {tutorial.title}
                  </TableCell>
                  <TableCell>
                    {tutorial.description.substring(0, 50)}...
                  </TableCell>
                  <TableCell>{tutorial.published ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTutorial(tutorial)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTutorialToDelete(tutorial)}
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
      {editingTutorial && (
        <EditTutorialModal
          tutorial={editingTutorial}
          onClose={() => setEditingTutorial(null)}
        />
      )}

      {tutorialToDelete && (
        <AlertDialog
          open={!!tutorialToDelete}
          onOpenChange={() => setTutorialToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this tutorial?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                tutorial and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(tutorialToDelete._id)}
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
