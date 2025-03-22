'use client';

import { usePrevious } from '@mantine/hooks';
import { VoteType } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { ArrowBigUp } from 'lucide-react';
import { toast } from 'sonner';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { PostVoteRequest } from '@/lib/validator/vote';
import { Button } from '../ui/Button';

interface PostVoteClientProps {
  postId: string;
  initVotesAmount: number;
  initVotes?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initVotesAmount,
  initVotes,
}) => {
  const [votesAmount, setVotesAmount] = useState<number>(initVotesAmount);
  const [currentVote, setCurrentVote] = useState(initVotes);
  const prevVote = usePrevious(currentVote);
  const router = useRouter();

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };

      await axios.patch('/api/subreddit/post/vote', payload);
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setVotesAmount((prev) => prev - 1);
      if (voteType === 'DOWN') setVotesAmount((prev) => prev + 1);

      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast('You need to sign in first', {
            action: {
              label: 'Sign In',
              onClick: () => router.push('/sign-in'),
            },
          });
        }
      }

      toast('something went wrong', {
        description: 'Your vote was not registered, please try again.',
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);

        if (type === 'UP') setVotesAmount((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmount((prev) => prev + 1);
      } else {
        setCurrentVote(type);
        if (type === 'UP')
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  useEffect(() => {
    setCurrentVote(initVotes);
  }, [initVotes]);

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        aria-label="upvote"
        size="sm"
        variant="ghost"
        onClick={() => vote('UP')}
      >
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
          })}
        />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        [votesAmounts]
      </p>

      <Button
        aria-label="downvote"
        size="sm"
        variant="ghost"
        onClick={() => vote('DOWN')}
      >
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
