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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-purple-500">Edit Lesson</DialogTitle>
        </DialogHeader>
        <EditLessonForm lesson={lesson} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
