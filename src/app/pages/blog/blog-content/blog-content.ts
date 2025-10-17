import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { BlogService } from '../../../services/blog-service';

@Component({
  selector: 'app-blog-content',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './blog-content.html',
  styleUrl: './blog-content.css',
})
export class BlogContentComponent implements OnInit {
  readonly arrowIcon = ArrowLeft;
  private slug!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.slug = params.get('slug')!;
    });

    this._blogService.getBlogContent(this.slug).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {},
    });
  }
}
