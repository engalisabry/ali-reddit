import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { postValidator } from '@/lib/validator/post';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { subredditId, title, content } = postValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session?.user.id,
      },
    });

    if (!subscriptionExists) return new Response('Subscribe to post', { status: 400 });

    await db.post.create({
      data: {
        subredditId,
        title,
        content,
        authorId: session.user.id,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data', { status: 422 });
    }

    return new Response(
      'Could not post to this subreddit at this time, please try again later',
      {
        status: 500,
      },
    );
  }
}
