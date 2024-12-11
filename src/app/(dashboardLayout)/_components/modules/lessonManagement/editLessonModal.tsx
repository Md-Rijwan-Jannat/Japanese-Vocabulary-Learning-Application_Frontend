import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EditLessonForm } from './editLessonForm';

interface EditLessonModalProps {
  lesson: any;
  onClose: () => void;
}

export function EditLessonModal({ lesson, onClose }: EditLessonModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
        </DialogHeader>
        <EditLessonForm lesson={lesson} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
