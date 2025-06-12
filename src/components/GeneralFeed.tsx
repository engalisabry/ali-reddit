import { db } from '@/lib/db';
import { INFINITE_SCROLLING_PAGINATION_SCROLLING } from '../config';
import PostFeed from './PostFeed';

const GeneralFeed = async () => {
  try {
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
  } catch (error) {
    console.error('Error loading general feed:', error);
    // Return empty post feed in case of error
    return <PostFeed initialPosts={[]} />;
  }
};

export default GeneralFeed;
