'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TTutorial } from '@/types';
import { EditTutorialForm } from './editTutorialForm';

interface EditTutorialModalProps {
  tutorial: TTutorial;
  onClose: () => void;
}

export function EditTutorialModal({
  tutorial,
  onClose,
}: EditTutorialModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-purple-500">Edit Tutorial</DialogTitle>
        </DialogHeader>
        <EditTutorialForm tutorial={tutorial} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
