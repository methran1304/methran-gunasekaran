import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  CornerDownRight,
  Share2,
  Calendar,
  Check,
  Search,
  X,
} from 'lucide-angular';
import { BlogService } from '../../services/blog-service';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog-entry';
import copy from 'copy-to-clipboard';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { PageUtils } from '../../utils/page-utils';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';

@Component({
  selector: 'app-blog-list',
  imports: [
    LucideAngularModule,
    RouterLink,
    NgxPaginationModule,
    DatePipe,
    FormsModule,
    NgxTypewriterComponent,
  ],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList implements OnInit {
  readonly arrowIcon = CornerDownRight;
  readonly shareIcon = Share2;
  readonly checkIcon = Check;
  readonly calendarIcon = Calendar;
  readonly searchIcon = Search;
  readonly xIcon = X;

  blogs: BlogPost[] | null = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  searchQuery: string = '';
  isSearchFocused: boolean = false;
  readonly routeConstants = ROUTE_CONSTANTS;

  get filteredBlogs(): BlogPost[] {
    if (!this.blogs || !this.searchQuery.trim()) {
      return this.blogs ?? [];
    }

    const query = this.searchQuery.toLowerCase().trim();
    return this.blogs.filter(
      (blog) =>
        blog.frontMatter.title.toLowerCase().includes(query) ||
        blog.frontMatter.description.toLowerCase().includes(query) ||
        blog.frontMatter.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  constructor(
    private _blogService: BlogService,
    private _pageUtils: PageUtils,
  ) {}

  ngOnInit(): void {
    this.getBlogList();
  }

  getBlogList(): void {
    this._blogService.getBlogList().subscribe({
      next: (res) => {
        res.forEach((post, index) => {
          const blogPost: BlogPost = {
            id: index,
            slug: post.slug,
            isLinkCopied: false,
            frontMatter: {
              title: post.frontMatter.title,
              description: post.frontMatter.description,
              tags: post.frontMatter.tags,
              publishedDate: post.frontMatter.publishedDate,
            },
          };

          this.blogs!.push(blogPost);
        });

        // sort blog based on date
        this.blogs?.sort(
          (x, y) =>
            y.frontMatter.publishedDate.getTime() -
            x.frontMatter.publishedDate.getTime(),
        );

        this.isLoading = false;
      },
      error: (err) => {
        this.blogs = null;
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  copyLink(index: number) {
    if (this.blogs === null) return;
    const post = this.filteredBlogs[index];
    const copyText = `https://methran.dev${this.routeConstants.Blog}/${post.slug}`;
    copy(copyText);
    post.isLinkCopied = true;

    // reset isCopied to false after 1 second
    setTimeout(() => {
      post.isLinkCopied = false;
    }, 2000);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 1;
  }

  pageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this._pageUtils.ScrollToTop();
  }
}
