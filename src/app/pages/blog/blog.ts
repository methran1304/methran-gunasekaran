import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  CornerDownRight,
  Share2,
  Calendar,
} from 'lucide-angular';
import { BlogService } from '../../services/blog-service';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog-entry';

@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class BlogComponent implements OnInit {
  readonly arrowIcon = CornerDownRight;
  readonly shareIcon = Share2;
  readonly calendarIcon = Calendar;

  blogs: BlogPost[] = [];
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
          };

          this.blogs.push(blogPost);
        })

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
