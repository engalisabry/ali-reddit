import { z } from 'zod';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditValidator } from '@/lib/validator/subreddit';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name } = SubredditValidator.parse(body);

    const SubredditExist = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (SubredditExist) {
      return new Response('Subreddit already exists', { status: 409 });
    }

    const subreddit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        subredditId: subreddit.id,
        userId: session.user.id,
      },
    });

    return new Response('Subreddit created', { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Internal server error', { status: 500 });
  }
}
