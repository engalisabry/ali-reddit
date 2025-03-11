'use client';

import { X } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Button } from './ui/Button';

const CloseModel = () => {
  const router = useRouter();
  return (
    <Button
      variant="subtle"
      className="w-6 h-6 p-0"
      aria-label="close model"
      onClick={() => router.back()}
    >
      <X className="w-4 h-4" />
    </Button>
  );
};

export default CloseModel;
