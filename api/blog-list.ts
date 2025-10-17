import { BlogConstants } from '../api/constants/blog-constants';

export async function GET(request: Request) {
  const githubToken = process.env.GITHUB_TOKEN;

  const abortController = new AbortController();

  request.signal.addEventListener('abort', () => {
    console.log('request aborted');
    abortController.abort();
  });

  try
  {
    const response = await fetch('https://api.github.com/repos/methran1304/mg-blog-source/contents/', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      signal: abortController.signal,
    });
  
    if (!response.ok) {
      return new Response(response.body, { status: response.status });
    }
  
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error}), {
      status: 500
    });
  }
}
