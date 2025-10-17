import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { BlogService } from '../../../services/blog-service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog-content',
  imports: [RouterLink, LucideAngularModule, MarkdownComponent],
  templateUrl: './blog-content.html',
  styleUrl: './blog-content.css',
})
export class BlogContentComponent implements OnInit {
  readonly arrowIcon = ArrowLeft;
  private slug!: string;
  markdownContent!: string;

  isLoading: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getSlug();
    this.getBlogContent();
  }

  getSlug(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.slug = params.get('slug')!;
    });
  }

  getBlogContent(): void {
    this._blogService.getBlogContent(this.slug).subscribe({
      next: (rawContent) => {
        const frontMatterRegex = /^---[\s\S]*?---/;
        this.markdownContent = rawContent.content.replace(frontMatterRegex, '').trim();
        this.isLoading = false;
      },
      error: (err) => {
        this.markdownContent = '';
        this.isLoading = false;
      },
    });
  }
}
