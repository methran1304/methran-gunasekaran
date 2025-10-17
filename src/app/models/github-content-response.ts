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

/**
 * Response for a single file (when type === 'file')
 * 
 * Includes Base64 content and encoding fields.
 */
export interface GithubFileResponse extends GithubEntry {
  content?: string;     // Base64-encoded content (only for files)
  encoding?: string;    // e.g. 'base64'
}

/**
 * Response for a directory listing (when type === 'dir')
 * 
 * GitHub returns an *array* of GithubEntry objects, not wrapped.
 */
export type GithubDirectoryResponse = GithubEntry[];