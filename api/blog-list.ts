export function GET(request: Request) {
    const githubToken = process.env.GITHUB_TOKEN;

    

    return new Response(githubToken);
}