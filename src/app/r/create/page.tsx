'use client';

import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreateSubredditPayload } from '@/lib/validator/subreddit';

const Page = () => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };

      const { data } = await axios.post('/api/subreddit', payload);
      return data;
    },
    onError: (err) => {
      if (
        err instanceof Error &&
        err.message === 'Please sign in to create a community'
      ) {
        return toast.error('Please sign in to create a community', {
          action: {
            label: 'Sign In',
            onClick: () => router.push('/sign-in'),
          },
        });
      }

      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error('A subreddit with this name already exists');
        }

        if (err.response?.status === 422) {
          return toast.error(
            'Please provide a valid community name (3-21 characters)',
          );
        }

        if (err.response?.status === 401) {
          return toast.error('Please sign in to create a community', {
            action: {
              label: 'Sign In',
              onClick: () => router.push('/sign-in'),
            },
          });
        }

        const message =
          err.response?.data?.error || 'Failed to create community';
        return toast.error(message);
      }

      return toast.error('Something went wrong');
    },
    onSuccess: () => {
      router.push(`/r/${input}`);
      return toast.success('Community created successfully!');
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6 ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">Create a community</h1>
        </div>

        <hr className="bg-zinc-500 h-px " />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-500">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-5"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            variant="subtle"
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}
          >
            Create community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
