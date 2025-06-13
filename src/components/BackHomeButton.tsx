import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const BackHomeButton = ({ className }: { className?: string }) => {
  return (
    <div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          `self-start -mt-20 ${className} `,
        )}
      >
        <ChevronLeft className="w-4 h-4 mr-2" /> Home
      </Link>
    </div>
  );
};

export default BackHomeButton;
