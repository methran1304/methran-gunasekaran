import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscribable } from 'rxjs';
import { Blog } from '../models/blog';
import { BlogConstants } from '../../../api/constants/blog-constants';
// import { SECRETS } from '../../../secrets';
import { GithubContentResponse } from '../models/github-content-response';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // private githubToken = SECRETS.GithubAPIToken;

  // constructor(private _httpClient: HttpClient) {}

  // public getBlogContent(path: string = ''): Observable<GithubContentResponse> {
  //   const url = `${BlogConstants.GetContentUrl}${path}`;

  //   return this._httpClient.get<GithubContentResponse>(url, {
  //     headers: {
  //       Accept: 'application/vnd.github.object',
  //       Authorization: `Bearer ${this.githubToken}`,
  //       'X-GitHub-Api-Version': '2022-11-28',
  //     },
  //   });
  // }
}
