import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscribable } from 'rxjs';
import { BlogPost } from '../models/blog-entry';
import { BlogContent } from '../models/blog-content';
// import { SECRETS } from '../../../secrets';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private _httpClient: HttpClient) {}

  public getBlogList(): Observable<BlogPost[]> {
    const url = `/api/blog-list`;
    return this._httpClient.get<BlogPost[]>(url);
  }

  public getBlogContent(slug: string): Observable<BlogContent> {
    const url = '/api/blog';
    const params = { slug: slug };
    return this._httpClient.get<BlogContent>(url, {params: params});
  }
}
