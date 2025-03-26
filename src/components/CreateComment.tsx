'use client';

import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { CommentRequest } from '@/lib/validator/comment';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
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

        return toast('There was an proplem, Please try again later');
      }
    },

    onSuccess: () => {
      router.refresh();
      setInput('');
    },
  });

  return (
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

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
