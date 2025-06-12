import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { INFINITE_SCROLLING_PAGINATION_SCROLLING } from '../config';
import PostFeed from './PostFeed';

const CustomFeed = async ({}) => {
  try {
    const session = await getAuthSession();
    
    if (!session || !session.user.id) {
      // If no session, fall back to general feed
      const posts = await db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          votes: true,
          author: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_SCROLLING,
      });
      return <PostFeed initialPosts={posts} />;
    }

    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subreddit: true,
      },
    });
    
    // Handle case where user hasn't joined any communities
    if (followedCommunities.length === 0) {
      const posts = await db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          votes: true,
          author: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_SCROLLING,
      });
      return <PostFeed initialPosts={posts} />;
    }

    const posts = await db.post.findMany({
      where: {
        subreddit: {
          name: {
            in: followedCommunities.map(({ subreddit }) => subreddit.name),
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_SCROLLING_PAGINATION_SCROLLING,
    });

    return <PostFeed initialPosts={posts} />;
  } catch (error) {
    console.error('Error loading custom feed:', error);
    // Return empty post feed in case of error
    return <PostFeed initialPosts={[]} />;
  }
};

export default CustomFeed;
