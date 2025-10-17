import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  CornerDownRight,
  Share2,
  Calendar,
} from 'lucide-angular';
import { BlogService } from '../../services/blog-service';
import { RouterLink } from '@angular/router';
import { BlogEntry } from '../../models/blog-entry';
import { HttpErrorResponse } from '@angular/common/http';
import { GithubDirectoryResponse } from '../../models/github-content-response';

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

  blogs: BlogEntry[] = [];
  isLoading: boolean = true;

  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this._blogService.getBlogList().subscribe({
      next: (res) => {
        res.forEach((entry) => {
          console.log(entry.name);
          this.blogs.push({
            title: entry.name,
            id: 1,
            publishedDate: '',
          });
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
