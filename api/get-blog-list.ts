import matter from 'gray-matter';

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
    const directoryResponse = await fetch(blogListUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
      signal: abortController.signal,
    });

    if (!directoryResponse.ok) {
      return new Response(directoryResponse.body, {
        status: directoryResponse.status,
      });
    }

    const files: any[] = await directoryResponse.json();

    const blogPromises = files
      .filter((file) => file.name.endsWith('.md'))
      .map(async (file) => {
        const fileResponse = await fetch(file.download_url);
        if (!fileResponse.ok) return null;

        const fileContent = await fileResponse.text();
        const { data } = matter(fileContent);

        return {
          title: data.title || 'Untitled Blog',
          slug: data.slug,
          description: data.description || '',
          tags: data.tags,
          publishedDate: data.date || new Date().toISOString()
        };
      });

    const blogs = (await Promise.all(blogPromises)).filter(
      (blog) => blog !== null
    );

    return new Response(JSON.stringify(blogs), {
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
