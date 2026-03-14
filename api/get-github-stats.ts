interface RepoStats {
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  lastUpdated: string;
}

interface GitHubStatsCache {
  repos: Record<string, RepoStats>;
  lastUpdated: string;
}

// In-memory cache (persisted via Vercel KV or similar)
const GITHUB_API_BASE = 'https://api.github.com/repos';

// list of repos to track
const REPOS_TO_TRACK = [
  'ThreeMammals/Ocelot',
  'TheBoxyBear/charttools',
  'tldr-pages/tldr',
  'zen-browser/desktop',
];

async function fetchRepoStats(
  owner: string,
  repo: string,
  token?: string
): Promise<RepoStats | null> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'methran-dev-portfolio',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/${owner}/${repo}`, {
      headers,
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${owner}/${repo}: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      owner,
      repo,
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching ${owner}/${repo}:`, error);
    return null;
  }
}

export async function GET() {
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    const statsPromises = REPOS_TO_TRACK.map((repoPath) => {
      const [owner, repo] = repoPath.split('/');
      return fetchRepoStats(owner, repo, githubToken);
    });

    const results = await Promise.all(statsPromises);

    const cache: GitHubStatsCache = {
      repos: {},
      lastUpdated: new Date().toISOString(),
    };

    results.forEach((result) => {
      if (result) {
        cache.repos[`${result.owner}/${result.repo}`] = result;
      }
    });

    return new Response(JSON.stringify(cache), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
