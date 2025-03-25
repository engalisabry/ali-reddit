import { Post, Vote, VoteType } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import PostVoteClient from './PostVoteClient';

interface PostVoteServerProps {
  postId: string;
  initVotesAmount?: number;
  initVote?: VoteType | null;
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
}

const PostVoteServer = async ({
  postId,
  initVotesAmount,
  initVote,
  getData,
}: PostVoteServerProps) => {
  const session = await getAuthSession();
  let _votesAmount: number = 0;
  let _currentVote: VoteType | null | undefined = undefined;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();
    _votesAmount = post.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1;
      if (vote.type === 'DOWN') return acc - 1;

      return acc;
    }, 0);

    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user.id,
    )?.type;
  } else {
    _votesAmount = initVotesAmount!;
    _currentVote = initVote;
  }

  return (
    <PostVoteClient
      postId={postId}
      initVotesAmount={_votesAmount}
      initVotes={_currentVote}
    />
  );
};

export default PostVoteServer;
