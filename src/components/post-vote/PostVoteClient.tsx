'use client';

import { usePrevious } from '@mantine/hooks';
import { VoteType } from '@prisma/client';
import axios from 'axios';
import { ArrowBigUp } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
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
  const [votesAmounts, setVotesAmounts] = useState<number>(initVotesAmount);
  const [currentVote, setCurrentVote] = useState(initVotes);
  const prevVote = usePrevious(currentVote);

  const {} = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };

      await axios.patch('/api/subreddit/post/vote', payload);
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
