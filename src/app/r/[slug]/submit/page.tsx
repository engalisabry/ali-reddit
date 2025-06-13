import { notFound } from 'next/navigation';
import BackHomeButton from '@/components/BackHomeButton';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';

interface pageProps {
  params: {
    postId: string;
  } & Promise<any> & {
      [Symbol.toStringTag]: string;
    };
}

const page = async ({ params }: pageProps) => {
  const { slug } = await params;

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
  });

  if (!subreddit) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5 w-full">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-2">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">
              Create post
            </h1>
            <p className="text-sm text-gray-500 mt-1">r/{slug}</p>
          </div>
          <BackHomeButton className="ml-auto" />
        </div>
      </div>

      {/* form */}

      <Editor subredditId={subreddit.id} />

      <div className="w-full flex justify-end">
        <Button
          className="w-full"
          type="submit"
          form="subreddit-post-form"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
