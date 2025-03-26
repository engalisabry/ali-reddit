'use client';

import { Comment, CommentVote, User } from '@prisma/client';
import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { formatTimeToNow } from '@/lib/utils';
import { CommentRequest } from '@/lib/validator/comment';
import CommentVotes from './CommentVotes';
import UserAvatar from './UserAvatar';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  currentVote: CommentVote | undefined;
  votesAmount: number;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  currentVote,
  votesAmount,
  postId,
}) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment`,
        payload,
      );
      return data;
    },
    onError: () => {
      return toast.error(
        "Somethimg went wrong, Comment wasn't posted successfully, try again later",
      );
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment?.author.name || null,
            image: comment?.author.image || null,
          }}
          className="w-6 h-6"
        />

        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment?.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center flex-wrap">
        <CommentVotes
          commentId={comment.id}
          initVotesAmount={votesAmount}
          initVotes={currentVote}
        />

        <Button
          className=""
          variant="ghost"
          size="xs"
          onClick={() => {
            if (!session) return router.push('/sign-in');
            setIsReplying(true);
          }}
        >
          <MessageSquare className="w-4 h-4 mr-1.5" />
          Reply
        </Button>

        {isReplying ? (
          <div className="grid gap-1.5 w-full">
            <Label htmlFor="comment">Your comment</Label>
            <div className="mt-2">
              <Textarea
                id="comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                placeholder="What are your thoughts"
              />

              <div className="mt-2 flex justify-end gap-2">
                <Button
                  tabIndex={-1}
                  variant="subtle"
                  onClick={() => setIsReplying(false)}
                >
                  Cancle
                </Button>
                <Button
                  isLoading={isLoading}
                  disabled={input.length === 0}
                  onClick={() => {
                    if (!input) {
                      return postComment({
                        postId,
                        text: input,
                        replyToId: comment.replyToId ?? comment.id,
                      });
                    }
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostComment;
