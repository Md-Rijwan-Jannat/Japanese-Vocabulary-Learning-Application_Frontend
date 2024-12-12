import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const TruncatedCell: React.FC<{ content: string }> = ({ content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="max-w-[200px] truncate">{content}</div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs break-words">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
