export async function GET(request: Request) {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'methran1304';
  const repoName = 'mg-blog-source';
  const contentUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;

  const abortController = new AbortController();

  request.signal.addEventListener('abort', () => {
    console.log('request aborted');
    abortController.abort();
  });

  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      throw new Error('Failed to retrieve slug from request');
    }

    const filePath = `${contentUrl}${slug}.md`;

    const fileResponse = await fetch(filePath, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      signal: abortController.signal,
    });

    if (!fileResponse.ok) {
      throw new Error(
        `Unable to retrieve blog content. status code: ${fileResponse.status}`
      );
    }

    const fileMetadata = await fileResponse.json();

    const fileContent = await fetch(fileMetadata.download_url);
    if (!fileContent.ok) {
      throw new Error(
        `Unable to retrieve blog content. status code: ${fileResponse.status}`
      );
    }

    const content = await fileContent.text();

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in blog-list function:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
