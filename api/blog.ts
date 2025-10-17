export async function GET(request: Request) {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'methran1304';
  const repoName = 'mg-blog-source';
  const blogListUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;

  const abortController = new AbortController();

  request.signal.addEventListener('abort', () => {
    console.log('request aborted');
    abortController.abort();
  });

  try {
    const data = {
      content: request.url,
    };

    // return new Response(JSON.stringify(data), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // });

    const urlSearchParams = new URLSearchParams(request.url);
    const params = Object.fromEntries(urlSearchParams.entries());

    return new Response(JSON.stringify(params), {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    });

    // const directoryResponse = await fetch(blogListUrl, {
    //   headers: {
    //     Authorization: `Bearer ${githubToken}`,
    //   },
    //   signal: abortController.signal,
    // });

    // return new Response(JSON.stringify('test string'), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // });
  } catch (error) {
    console.error('Error in blog-list function:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
