import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { UserNameValidator } from '@/lib/validator/username';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { name } = UserNameValidator.parse(body);

    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    });

    if (username) {
      return new Response('Username is taken', { status: 409 });
    }

    // update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    });

    return new Response('Ok');
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response('Invalid request data', { status: 422 });
    }

    return new Response('Could not update username, please try again later', {
      status: 500,
    });
  }
}
