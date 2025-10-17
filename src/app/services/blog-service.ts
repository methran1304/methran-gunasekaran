import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscribable } from 'rxjs';
import { BlogPost } from '../models/blog-entry';
// import { SECRETS } from '../../../secrets';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private _httpClient: HttpClient) {}

  public getBlogList(path: string = ''): Observable<BlogPost[]> {
    const url = `/api/blog-list`;
    return this._httpClient.get<BlogPost[]>(url);
  }
}
