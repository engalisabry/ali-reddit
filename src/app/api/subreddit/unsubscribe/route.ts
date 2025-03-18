import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditSubscriptionValidator } from '@/lib/validator/subreddit';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session?.user.id,
      },
    });

    if (!subscriptionExists) {
      new Response('You are not subscribed to this subreddit', { status: 400 });
    }

    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id,
      },
    });

    if (subreddit) {
      new Response("You can't unsubscribe from your own subreddit", {
        status: 400,
      });
    }

    await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    });

    new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data', { status: 422 });
    }

    return new Response('Could not unsubscribe, please try again later', {
      status: 500,
    });
  }
}
