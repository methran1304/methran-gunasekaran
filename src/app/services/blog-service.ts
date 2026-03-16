import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  firstValueFrom,
  fromEventPattern,
  map,
  Observable,
  ReplaySubject,
  share,
  timer,
} from 'rxjs';
import { BlogPost, FrontMatter } from '../models/blog-entry';
import { BlogContent } from '../models/blog-content';
// import { SECRETS } from '../../../secrets';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogListCache$!: Observable<BlogPost[]>;
  constructor(private _httpClient: HttpClient) {}

  public getList(): Observable<BlogPost[]> {
    if (this.blogListCache$) {
      console.log('cache present: ', this.blogListCache$);
    }
    if (!this.blogListCache$) {
      console.log('cache not present. fetching...');
      const url = `/api/get-blog-list`;
      this.blogListCache$ = this._httpClient.get<BlogPost[]>(url).pipe(
        share({
          connector: () => new ReplaySubject(),
          resetOnComplete: () => timer(900000),
          resetOnRefCountZero: false,
        }),
      );
    }
    return this.blogListCache$;
  }

  public getFrontMatterBySlug(slug: string): Observable<FrontMatter | undefined> {
    return (this.getList().pipe(
      map((res) => res.find((blog) => blog.slug === slug)?.frontMatter),
    ));
  }

  public getContenBySlug(slug: string): Observable<BlogContent> {
    const url = '/api/get-blog';
    const params = { slug: slug };
    return this._httpClient.get<BlogContent>(url, { params: params });
  }
}
