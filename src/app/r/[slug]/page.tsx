import { notFound } from 'next/navigation';
import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { INFINITE_SCROLLING_PAGINATION_SCROLLING } from '../../../../config';

type PageProps = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const { slug } = params;

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: INFINITE_SCROLLING_PAGINATION_SCROLLING,
      },
    },
  });

  if (!subreddit) notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed
        initPosts={subreddit.posts}
        subredditName={subreddit.name}
      />
    </>
  );
};

export default Page;
