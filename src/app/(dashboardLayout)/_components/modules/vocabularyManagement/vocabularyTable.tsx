'use client';

import React, { useState } from 'react';
import {
  useGetAllVocabulariesQuery,
  useDeleteVocabularyMutation,
} from '@/redux/features/vocabularyApi/vocabularyApi';
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
import DynamicPagination from '@/components/shared/pagination';
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
import { TVocabulary } from '@/types';
import { EditVocabularyModal } from './editVocabularyModal';

export function VocabularyTable() {
  const [page, setPage] = useState(1);
  const [editingVocabulary, setEditingVocabulary] =
    useState<TVocabulary | null>(null);
  const [vocabularyToDelete, setVocabularyToDelete] =
    useState<TVocabulary | null>(null);
  const limit = 6;
  const { data, isLoading } = useGetAllVocabulariesQuery(
    `limit=${limit}&page=${page}&sort=createdAt`
  );
  const [deleteVocabulary] = useDeleteVocabularyMutation();

  if (isLoading) return <div className="text-center">Loading...</div>;

  const vocabularies = data?.data || ([] as TVocabulary[]);
  const { totalPage } = data?.meta || {};

  console.log('vocabularies=>', vocabularies);

  const handleDelete = async (id: string) => {
    try {
      await deleteVocabulary(id).unwrap();
      toast.success('Vocabulary deleted successfully');
      setVocabularyToDelete(null);
    } catch (error) {
      toast.error('Failed to delete vocabulary');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Vocabularies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Pronunciation</TableHead>
                <TableHead>Meaning</TableHead>
                <TableHead>Lesson</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vocabularies.map((vocabulary: TVocabulary) => (
                <TableRow key={vocabulary._id}>
                  <TableCell className="font-medium">
                    {vocabulary.word}
                  </TableCell>
                  <TableCell>{vocabulary.pronunciation}</TableCell>
                  <TableCell>{vocabulary.meaning}</TableCell>
                  <TableCell>{vocabulary.lesson?.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingVocabulary(vocabulary)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVocabularyToDelete(vocabulary)}
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
      {editingVocabulary && (
        <EditVocabularyModal
          vocabulary={editingVocabulary}
          onClose={() => setEditingVocabulary(null)}
        />
      )}
      {vocabularyToDelete && (
        <AlertDialog
          open={!!vocabularyToDelete}
          onOpenChange={() => setVocabularyToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this vocabulary?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                vocabulary and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(vocabularyToDelete._id)}
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
