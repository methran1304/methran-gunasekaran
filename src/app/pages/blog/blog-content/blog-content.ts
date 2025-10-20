import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { BlogService } from '../../../services/blog-service';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { ViewportScroller } from '@angular/common';
import { Parser } from 'marked';

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
    private _markdownService: MarkdownService,
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService,
    private _viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getSlug();
    this.getBlogContent();

    this._markdownService.renderer.heading = ({ tokens, depth }) => {
      const text = Parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return (
        '<h' +
        depth +
        '>' +
        '<a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '">' +
        '<span class="header-link"></span>' +
        '</a>' +
        text +
        '</h' +
        depth +
        '>'
      );
    };
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
        this.markdownContent = rawContent.content
          .replace(frontMatterRegex, '')
          .trim();
        this.isLoading = false;
      },
      error: (err) => {
        this.markdownContent = '';
        this.isLoading = false;
      },
    });
  }

  onMarkdownClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // if the clicked element is an anchor tag
    if (target.tagName === 'A') {
      const anchor = target as HTMLAnchorElement;
      const href = anchor.getAttribute('href');

      // internal link (starts with '#')
      if (href && href.startsWith('#')) {
        event.preventDefault();

        // Use Angular's ViewportScroller to scroll to the element
        // The 'slice(1)' removes the '#' from the href
        this._viewportScroller.scrollToAnchor(href.slice(1));
      }
    }
  }
}
