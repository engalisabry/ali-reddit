import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get('url');

  if (!href) {
    console.log('Invalid href provided');
    return new Response('Invalid href', { status: 400 });
  }

  try {
    console.log('Fetching URL:', href);
    const res = await axios.get(href, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BotName/1.0; +http://yoursite.com)'
      }
    });

    console.log('Response received, status:', res.status);
    console.log('Content type:', res.headers['content-type']);

    // More flexible title regex
    const titleMatch = res.data.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';
    console.log('Found title:', title);

    // More flexible description regex
    const descriptionMatch = res.data.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i) ||
                           res.data.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/i);
    const description = descriptionMatch ? descriptionMatch[1] : '';
    console.log('Found description:', description);

    // More flexible image regex
    const imageMatch = res.data.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                     res.data.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:image"[^>]*>/i) ||
                     res.data.match(/<meta[^>]*name="image"[^>]*content="([^"]*)"[^>]*>/i);
    const imageUrl = imageMatch ? imageMatch[1] : '';
    console.log('Found image URL:', imageUrl);

    return new Response(
      JSON.stringify({
        success: 1,
        meta: {
          title,
          description,
          image: {
            url: imageUrl,
          },
        },
      })
    );
  } catch (error) {
    console.error('Error fetching link:', error.message);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });
    }

    return new Response(
      JSON.stringify({
        success: 0,
        meta: {},
      }),
      { status: 200 } // Editor.js expects 200 even for failures
    );
  }
}



/* import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get('url');

  if (!href) {
    return new Response('Invalid href', { status: 401 });
  }

  const res = await axios.get(href);

  const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)"> /,
  );
  const description = descriptionMatch ? descriptionMatch[1] : '';

  const imageMatch = res.data.match(/<meta name="og:image" content="(.*?)" >/);
  const imageUrl = imageMatch ? imageMatch[1] : '';

  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    }),
  );
} 


import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get('url');

  if (!href) {
    return new Response('Invalid href', { status: 400 });
  }

  try {
    const res = await axios.get(href);

    // More flexible title regex
    const titleMatch = res.data.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';

    // More flexible description regex
    const descriptionMatch = res.data.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i) ||
                           res.data.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/i);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    // More flexible image regex - check both og:image and standard image meta
    const imageMatch = res.data.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                     res.data.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:image"[^>]*>/i) ||
                     res.data.match(/<meta[^>]*name="image"[^>]*content="([^"]*)"[^>]*>/i);
    const imageUrl = imageMatch ? imageMatch[1] : '';

    return new Response(
      JSON.stringify({
        success: 1,
        meta: {
          title,
          description,
          image: {
            url: imageUrl,
          },
        },
      }),
    );
  } catch (error) {
    // Return a proper error response that Editor.js can handle
    return new Response(
      JSON.stringify({
        success: 0,
        meta: {},
      }),
      { status: 200 }, // Editor.js expects 200 even for failures
    );
  }
}



import axios from 'axios'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const href = url.searchParams.get('url')

  if (!href) {
    return new Response('Invalid href', { status: 400 })
  }

  const res = await axios.get(href)

  // Parse the HTML using regular expressions
  const titleMatch = res.data.match(/<title>(.*?)<\/title>/)
  const title = titleMatch ? titleMatch[1] : ''

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)"/
  )
  const description = descriptionMatch ? descriptionMatch[1] : ''

  const imageMatch = res.data.match(/<meta property="og:image" content="(.*?)"/)
  const imageUrl = imageMatch ? imageMatch[1] : ''

  // Return the data in the format required by the editor tool
  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    })
  )
}

*/

