import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { CommentVoteValidator } from '@/lib/validator/vote';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { commentId, voteType } = CommentVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session?.user.id,
        commentId,
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await db.commentVote.delete({
          where: {
            commentId_userId: {
              commentId,
              userId: session?.user.id,
            },
          },
        });

        return new Response('Ok');
      } else {
        await db.commentVote.update({
          where: {
            commentId_userId: {
              commentId,
              userId: session?.user.id,
            },
          },
          data: {
            voteType: voteType,
          },
        });
        return new Response('Ok');
      }
    }

    await db.commentVote.create({
      data: {
        voteType: voteType,
        userId: session.user.id,
        commentId,
      },
    });

    return new Response('Ok');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data', { status: 422 });
    }

    return new Response('Could not register your vote, please try again', {
      status: 500,
    });
  }
}
