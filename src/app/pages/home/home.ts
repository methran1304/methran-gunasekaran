import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import techStack from '../../data/tech-stack.json';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import {
  LucideAngularModule,
  FileUser,
  FolderOpen,
  NotebookPen,
  CornerDownRight,
  Calendar,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';
import { BlogService } from '../../services/blog-service';
import { BlogPost } from '../../models/blog-entry';

interface TechItem {
  key: string;
  icon: string;
  label: string;
  svg?: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NgxTypewriterComponent,
    NgxCrypticTextComponent,
    LucideAngularModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  languages = techStack.languages as TechItem[];
  frameworks = techStack.frameworks as TechItem[];
  tools = techStack.tools as TechItem[];

  readonly fileUserIcon = FileUser;
  readonly folderIcon = FolderOpen;
  readonly notebookPenIcon = NotebookPen;
  readonly arrowIcon = CornerDownRight;
  readonly calendarIcon = Calendar;
  readonly routeConstants = ROUTE_CONSTANTS;

  recentBlogs: BlogPost[] = [];

  constructor(
    private _blogService: BlogService,
    private _sanitizer: DomSanitizer,
  ) {}

  trustSvg(svg: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(svg);
  }

  ngOnInit(): void {
    this._blogService.getList().subscribe({
      next: (res) => {
        this.recentBlogs = [...res]
          .map((post, index) => ({
            id: index,
            slug: post.slug,
            isLinkCopied: false,
            frontMatter: {
              ...post.frontMatter,
              publishedDate: new Date(post.frontMatter.publishedDate),
            },
          }))
          .sort(
            (a, b) =>
              b.frontMatter.publishedDate.getTime() -
              a.frontMatter.publishedDate.getTime(),
          )
          .slice(0, 3);
      },
      error: () => {
        this.recentBlogs = [];
      },
    });
  }
}
