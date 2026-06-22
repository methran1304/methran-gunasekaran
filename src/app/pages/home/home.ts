import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import techStack from '../../data/tech-stack.json';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import {
  LucideAngularModule,
  FileUser,
  FolderOpen,
  NotebookPen,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';

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
export class HomeComponent {
  languages = techStack.languages as TechItem[];
  frameworks = techStack.frameworks as TechItem[];
  tools = techStack.tools as TechItem[];

  readonly fileUserIcon = FileUser;
  readonly folderIcon = FolderOpen;
  readonly notebookPenIcon = NotebookPen;
  readonly routeConstants = ROUTE_CONSTANTS;

  constructor(private _sanitizer: DomSanitizer) {}

  trustSvg(svg: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(svg);
  }
}
