import { User, Vote, Post as postType } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import { FC, useRef } from 'react';
import { formatTimeToNow } from '@/lib/utils';
import EditorOutput from './EditorOutput';
import PostVoteClient from './post-vote/PostVoteClient';

type PartialVote = Pick<Vote, 'type'>;

interface PostProps {
  subredditName: string;
  post: postType & {
    author: User;
    votes: Vote[];
  };
  commentAmount: number;
  votesAmount: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  subredditName,
  post,
  commentAmount,
  votesAmount,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initVotes={currentVote?.type}
          initVotesAmount={votesAmount}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  className="underline underline-offset-2 text-zinc-900"
                  href={`r/${subredditName}`}
                >
                  r/{subredditName}
                </a>
                <span className="px-1">✺</span>
                {formatTimeToNow(new Date(post.createdAt))}
              </>
            ) : null}{' '}
            <span>posted by u/{post.author.username}</span>
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className="font-semibold text-lg py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />

            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
        <a
          className="w-fit flex items-center gap-2"
          href={`/r/${subredditName}/post/${post.id}`}
        >
          <MessageSquare className="h-4 w-4" /> {commentAmount} comments
        </a>
      </div>
    </div>
  );
};

export default Post;
