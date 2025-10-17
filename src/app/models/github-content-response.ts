export interface GithubLinks {
  git: string | null;
  html: string | null;
  self: string;
}

export interface Entry {
  _links: GithubLinks;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
}

export interface GithubContentResponse {
  _links: GithubLinks;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
  content?: string;
  entries?: Entry[];
  encoding?: string;
}

// export interface GithubContentResponse {
//   githubContentEntries: GithubContentEntry[];
// }