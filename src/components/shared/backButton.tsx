import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buttonStyle } from '@/style';

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between my-5 mx-2">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        className={`${buttonStyle} flex items-center justify-center`}
      >
        <ChevronLeft className="mr-2 text-lg" />
        <span className="text-sm font-medium">Back</span>
      </Button>

      {/* Forward Button */}
      <Button
        onClick={() => router.forward()}
        className={`${buttonStyle} flex items-center justify-center`}
      >
        <span className="text-sm font-medium">Forward</span>
        <ChevronRight className="ml-2 text-lg" />
      </Button>
    </div>
  );
}
