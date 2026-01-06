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

@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule, RouterLink, NgxPaginationModule, DatePipe, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class BlogComponent implements OnInit {
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

  get filteredBlogs(): BlogPost[] {
    if (!this.blogs || !this.searchQuery.trim()) {
      return this.blogs ?? [];
    }

    const query = this.searchQuery.toLowerCase().trim();
    return this.blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogList();
  }

  getBlogList(): void {
    this._blogService.getBlogList().subscribe({
      next: (res) => {
        res.forEach((post, index) => {
          const blogPost: BlogPost = {
            id: index,
            title: post.title,
            slug: post.slug,
            tags: post.tags,
            description: post.description,
            publishedDate: new Date(post.publishedDate),
            isLinkCopied: false,
          };

          this.blogs!.push(blogPost);
        });

        // sort blog based on date
        this.blogs?.sort((x, y) => y.publishedDate.getTime() - x.publishedDate.getTime());

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
    const copyText = `https://methran.dev/blog/${post.slug}`;
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
}
