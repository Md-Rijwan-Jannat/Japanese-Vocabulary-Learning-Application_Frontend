import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TVocabulary } from '@/types';
import { EditVocabularyForm } from './editVocabularyForm';

interface EditVocabularyModalProps {
  vocabulary: TVocabulary;
  onClose: () => void;
}

export function EditVocabularyModal({
  vocabulary,
  onClose,
}: EditVocabularyModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Vocabulary</DialogTitle>
        </DialogHeader>
        <EditVocabularyForm vocabulary={vocabulary} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
