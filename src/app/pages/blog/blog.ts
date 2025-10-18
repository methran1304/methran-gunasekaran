import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  CornerDownRight,
  Share2,
  Calendar,
  Check
} from 'lucide-angular';
import { BlogService } from '../../services/blog-service';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog-entry';
import copy from 'copy-to-clipboard';

@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class BlogComponent implements OnInit {
  readonly arrowIcon = CornerDownRight;
  readonly shareIcon = Share2;
  readonly checkIcon = Check;
  readonly calendarIcon = Calendar;

  blogs: BlogPost[] | null = [];
  isLoading: boolean = true;

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
            description: post.description,
            publishedDate: post.publishedDate,
            isLinkCopied: false
          };

          this.blogs!.push(blogPost);
        });
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
    const post = this.blogs[index];
    const copyText = `https://methran.dev/blog/${post.slug}`;
    copy(copyText);
    post.isLinkCopied = true;

    // reset isCopied to false after 1 second
    setTimeout(() => {
      post.isLinkCopied = false;
    }, 2000);
  }
}
