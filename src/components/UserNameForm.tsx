'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { UserNameRequest, UserNameValidator } from '@/lib/validator/username';
import { Button } from './ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

interface UserNameFormProps {
  user: Pick<User, 'id' | 'username'>;
}

const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserNameRequest>({
    resolver: zodResolver(UserNameValidator),
    defaultValues: {
      name: user.username || '',
    },
  });

  const { mutate: upateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UserNameRequest) => {
      const payload: UserNameRequest = { name };

      const { data } = await axios.patch(`/api/username`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error('Username already taken');
        }

        const message =
          err.response?.data?.error || 'Failed to create community';
        return toast.error(message);
      }

      toast.error('Something went wrong');
    },
    onSuccess: () => {
      toast('Username has been updated.');
      router.refresh();
    },
  });

  return (
    <form onSubmit={handleSubmit((e) => upateUsername(e))}>
      <Card>
        <CardHeader>Your username</CardHeader>
        <CardDescription>
          please enter a display name you are comfortable with
        </CardDescription>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>

            <Label
              className="sr-only"
              htmlFor="name"
            >
              Name
            </Label>
            <Input
              {...register('name')}
              size={32}
              id="name"
              className="w-[400px] pl-6"
            />

            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button isLoading={isLoading}>Change name</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
