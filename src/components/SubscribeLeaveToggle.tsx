'use client';

import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { FC, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@/lib/validator/subreddit';
import { Button } from './ui/Button';

interface SubscribeLeaveToggleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  subredditName,
  isSubscribed,
}: SubscribeLeaveToggleProps) => {
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post('api/subreddit/subscribe', payload);

      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status == 401) {
          return toast('You are not authorized', {
            description: 'Please login to your account before subscribe',
            action: {
              label: 'Sign In',
              onClick: () => router.push('/sign-in'),
            },
          });
        }

        return toast.error('There was an proplem, try again later');
      }
    },

    onSuccess: () => {
      startTransition(() => router.refresh());

      return toast.success(
        `Subscribed!, You are now subscribe to r/${subredditName}`,
      );
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post('api/subreddit/unsubscribe', payload);

      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status == 401) {
          return toast('You are not authorized', {
            description: 'Please login to your account before subscribe',
            action: {
              label: 'Sign In',
              onClick: () => router.push('/sign-in'),
            },
          });
        }

        return toast.error('There was an proplem, try again later');
      }
    },

    onSuccess: () => {
      startTransition(() => router.refresh());
      return toast.success(
        `UnSubscribed! You are now unsubscribe from r/${subredditName}`,
      );
    },
  });

  return (
    <>
      {isSubscribed ? (
        <Button
          onClick={() => unsubscribe()}
          isLoading={isUnsubLoading}
          className="mt-1 mb-4 w-full"
        >
          Leave community
        </Button>
      ) : (
        <Button
          onClick={() => subscribe()}
          isLoading={isSubLoading}
          className="mt-1 mb-4 w-full"
        >
          Join to post
        </Button>
      )}
    </>
  );
};

export default SubscribeLeaveToggle;
