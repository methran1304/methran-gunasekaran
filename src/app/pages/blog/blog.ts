import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, CornerDownRight, Share2, Calendar } from 'lucide-angular';
import { BlogService } from '../../services/blog-service';
import { GithubContentResponse } from '../../models/github-content-response';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

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
  
  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this._blogService.getBlogList().subscribe(
      (result: any) => {console.log(result)},
      (error: HttpErrorResponse) => {
      }
    );
  }
}
