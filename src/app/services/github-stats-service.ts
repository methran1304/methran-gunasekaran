import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, catchError } from 'rxjs';

export interface RepoStats {
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  lastUpdated: string;
}

export interface GitHubStatsCache {
  repos: Record<string, RepoStats>;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root',
})
export class GitHubStatsService {
  private http = inject(HttpClient);
  private cache$: Observable<GitHubStatsCache> | null = null;

  getStats(): Observable<GitHubStatsCache> {
    if (!this.cache$) {
      this.cache$ = this.http.get<GitHubStatsCache>('/api/github-stats').pipe(
        shareReplay(1),
        catchError(() => of({ repos: {}, lastUpdated: '' }))
      );
    }
    return this.cache$;
  }

  extractRepoPath(githubLink: string): string | null {
    if (!githubLink) return null;

    try {
      const url = new URL(githubLink);
      if (url.hostname !== 'github.com') return null;

      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return `${pathParts[0]}/${pathParts[1]}`;
      }
    } catch {
      return null;
    }
    return null;
  }
}
