export interface GithubLinks {
  git: string | null;
  html: string | null;
  self: string;
}

export interface GithubEntry {
  _links: GithubLinks;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir' | 'symlink' | 'submodule';
  url: string;
}

export interface GithubFileResponse extends GithubEntry {
  content?: string;     // Base64-encoded content (files only)
  encoding?: string;    // e.g. 'base64'
}

export type GithubDirectoryResponse = GithubEntry[];