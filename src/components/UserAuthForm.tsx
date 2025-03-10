'use client';

import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';
import { toast } from 'sonner';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setisLoading] = useState<boolean>();

  const loginWithGoogle = async () => {
    setisLoading(true);

    try {
      signIn('google');
    } catch (error) {
      toast('There was an error', {
        description: 'There was an error logging to google',
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
