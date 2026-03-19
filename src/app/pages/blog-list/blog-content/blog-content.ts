import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { BlogService } from '../../../services/blog-service';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { ViewportScroller } from '@angular/common';
import { Parser } from 'marked';
import { ROUTE_CONSTANTS } from '../../../constants/route-contants';
import { FrontMatter } from '../../../models/blog-entry';
import { DatePipe } from '@angular/common';
import { Calendar } from 'lucide-angular';


@Component({
  selector: 'app-blog-content',
  imports: [RouterLink, LucideAngularModule, MarkdownComponent, DatePipe],
  templateUrl: './blog-content.html',
  styleUrl: './blog-content.css',
})
export class BlogContentComponent implements OnInit {
  readonly arrowIcon = ArrowLeft;
  readonly calendarIcon = Calendar;
  private slug!: string;
  frontMatter!: FrontMatter | undefined;
  markdownContent!: string;
  isLocalRun: boolean = false; // enable for debugging blog md
  isLoading: boolean = true;
  readonly routeConstants = ROUTE_CONSTANTS;

  constructor(
    private _markdownService: MarkdownService,
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService,
    private _viewportScroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.getSlug();

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
      this.getBlogFrontMatter();
      this.getBlogContent();
    });
  }

  // move this logic to api - return data, content from getBlogContent - PRIORITY
  getBlogFrontMatter(): void {
    this._blogService.getFrontMatterBySlug(this.slug).subscribe({
      next: (frontmatter) => {
        this.frontMatter = frontmatter;
      },
      error: (error) => console.error('error: getBlogFrontMatter', error)
    });
  }

  getBlogContent(): void {
    this._blogService.getContenBySlug(this.slug).subscribe({
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
        this._viewportScroller.scrollToAnchor(href.slice(1), {
          behavior: 'smooth',
        });
      }
    }
  }
}
