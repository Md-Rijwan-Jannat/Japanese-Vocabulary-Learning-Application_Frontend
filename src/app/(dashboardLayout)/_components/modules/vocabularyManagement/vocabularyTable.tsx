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
import { Pencil, Plus, Trash2 } from 'lucide-react';
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
import { buttonStyle } from '@/style';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/shared/spinner';
import { TruncatedCell } from '../../ui/truncatedCell';

export function VocabularyTable() {
  const router = useRouter();
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

  if (isLoading)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );

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
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Vocabularies</CardTitle>
        <Button
          className={buttonStyle}
          size={'sm'}
          onClick={() => router.push('/admin-dashboard/add-vocabulary')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Vocabulary
        </Button>
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
                    <TruncatedCell content={vocabulary.word} />
                  </TableCell>
                  <TableCell>
                    <TruncatedCell content={vocabulary.pronunciation} />
                  </TableCell>
                  <TableCell>
                    <TruncatedCell content={vocabulary.meaning} />
                  </TableCell>
                  <TableCell>
                    <TruncatedCell content={vocabulary.lesson?.name || ''} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingVocabulary(vocabulary)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVocabularyToDelete(vocabulary)}
                        className="text-red-600 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
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
              <AlertDialogTitle className="text-purple-500">
                Are you sure you want to delete this vocabulary?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                vocabulary and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-purple-500 hover:bg-purple-100 hover:text-purple-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-green-600 bg-green-100 border hover:bg-green-500 hover:text-white"
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
