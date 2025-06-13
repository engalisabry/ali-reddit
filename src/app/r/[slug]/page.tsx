import { notFound } from 'next/navigation';
import BackHomeButton from '@/components/BackHomeButton';
import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { INFINITE_SCROLLING_PAGINATION_SCROLLING } from '../../../config';

type PageProps = {
  params: {
    slug: string;
  } & Promise<any> & {
      [Symbol.toStringTag]: string;
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
      <div className="flex justify-between items-center overflow-hidden">
        <h1 className="font-bold text-3xl md:text-4xl h-14">
          r/{subreddit.name}
        </h1>
        <BackHomeButton />
      </div>
      <MiniCreatePost session={session} />
      <PostFeed
        initialPosts={subreddit.posts}
        subredditName={subreddit.name}
      />
    </>
  );
};

export default Page;
