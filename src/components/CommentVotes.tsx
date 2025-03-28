'use client';

import { usePrevious } from '@mantine/hooks';
import { CommentVote, VoteType } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { toast } from 'sonner';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CommentVoteRequest } from '@/lib/validator/vote';

interface CommentVotesProps {
  commentId: string;
  initVotesAmount: number;
  initVotes?: Pick<CommentVote, 'voteType'>;
}

const CommentVotes: FC<CommentVotesProps> = ({
  commentId,
  initVotesAmount,
  initVotes,
}) => {
  const [votesAmount, setVotesAmount] = useState<number>(initVotesAmount);
  const [currentVote, setCurrentVote] = useState(initVotes);
  const prevVote = usePrevious(currentVote);
  const router = useRouter();

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType,
      };

      await axios.patch('/api/subreddit/post/comment/vote', payload);
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setVotesAmount((prev) => prev - 1);
      if (voteType === 'DOWN') setVotesAmount((prev) => prev + 1);

      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error('You are not authorized', {
            action: {
              label: 'Sign In',
              onClick: () => router.push('/sign-in'),
            },
          });
        }
      }

      return toast.error(
        'Something went wrong, your vote was not registered, please try again.',
      );
    },
    onMutate: (voteType: VoteType) => {
      if (currentVote?.voteType === voteType) {
        setCurrentVote(undefined);

        if (voteType === 'UP') setVotesAmount((prev) => prev - 1);
        else if (voteType === 'DOWN') setVotesAmount((prev) => prev + 1);
      } else {
        setCurrentVote({ voteType });
        if (voteType === 'UP')
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        else if (voteType === 'DOWN')
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex gap-1">
      <Button
        aria-label="upvote"
        size="sm"
        variant="ghost"
        onClick={() => vote('UP')}
      >
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote?.voteType === 'UP',
          })}
        />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmount}
      </p>

      <Button
        aria-label="downvote"
        size="sm"
        variant="ghost"
        onClick={() => vote('DOWN')}
      >
        <ArrowBigDown
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote?.voteType === 'DOWN',
          })}
        />
      </Button>
    </div>
  );
};

export default CommentVotes;
