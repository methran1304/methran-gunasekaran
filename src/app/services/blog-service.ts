import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscribable } from 'rxjs';
// import { SECRETS } from '../../../secrets';
import { GithubContentResponse } from '../models/github-content-response';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private _httpClient: HttpClient) {}

  public getBlogList(path: string = ''): Observable<GithubContentResponse> {
    const url = `/api/blog-list`;
    return this._httpClient.get<GithubContentResponse>(url);
  }
}
