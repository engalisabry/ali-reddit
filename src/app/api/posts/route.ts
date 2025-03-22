import z from 'zod/lib';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const session = await getAuthSession();

  let followedCommunitesIds: string[] = [];

  if (session) {
    const followedCommunites = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subreddit: true,
      },
    });

    followedCommunitesIds = followedCommunites.map(
      ({ subreddit }) => subreddit.id,
    );
  }

  try {
    const {limit, page, subredditName} = z
      .object({
        limit: z.string(),
        page: z.string(),
        subredditName: z.string().nullish().optional(),
      })
      .parse({ 
        subredditName: url.searchParams.get('subredditName'),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page")
    });

    let whereCluse = {}

    if(subredditName) {
        whereCluse = {
            subreddit: {
                name: subredditName
            }
        }
    } else if(session) {
        whereCluse = {
            subreddit: {
                id: {
                    in: followedCommunitesIds
                }
            }
        }
    }

    const posts = await db.post.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: true,
            comments: true,
            votes: true,
            subreddit: true
        },
        where: whereCluse
    })

    return new Response(JSON.stringify(posts))
  } catch (err) {
    if (err instanceof z.ZodError) {
        return new Response('Invalid request data passed', { status: 422 });
      }
  
      return new Response('Could not fetch more posts', {
        status: 500,
      });
  }
}
