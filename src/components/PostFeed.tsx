'use client';

import { ExtendedPosts } from '@/types/db';
import { useIntersection } from '@mantine/hooks';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_SCROLLING_PAGINATION_SCROLLING } from '../config';
import Post from './Post';

interface PostFeedProps {
  initPosts: ExtendedPosts[];
  subredditName?: string;
}

const PostFeed: FC<PostFeedProps> = ({
  initPosts,
  subredditName,
}: PostFeedProps) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();

  const { entry, ref } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `api/posts?limit=${INFINITE_SCROLLING_PAGINATION_SCROLLING}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : '');

      const { data } = await axios.get(query);
      return data as ExtendedPosts[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initPosts], pageParams: [1] },
    },
  );

  const posts = data?.pages.flatMap((page) => page) ?? initPosts;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.length > 0 ? (
        posts.map((post, index) => {
          const votesAmount = post.votes.reduce((acc, vote) => {
            if (vote.type === 'UP') return acc + 1;
            if (vote.type === 'DOWN') return acc - 1;
            return acc;
          }, 0);

          const currentVote = post.votes.find(
            (vote) => vote.userId === session?.user.id,
          );
          if (index === posts.length - 1) {
            return (
              <li
                key={post.id}
                ref={index === posts.length - 1 ? ref : undefined}
              >
                <Post
                  votesAmount={votesAmount}
                  currentVote={currentVote}
                  post={post}
                  subredditName={post.subreddit.name}
                  commentAmount={post.comments.length}
                />
              </li>
            );
          } else {
            <Post
              votesAmount={votesAmount}
              currentVote={currentVote}
              post={post}
              subredditName={post.subreddit.name}
              commentAmount={post.comments.length}
            />;
          }
        })
      ) : (
        <li>No posts available</li>
      )}
    </ul>
  );
};

export default PostFeed;
