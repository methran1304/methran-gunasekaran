import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import techStack from '../../data/tech-stack.json';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { NgxFaultyTerminalComponent } from '@omnedia/ngx-faulty-terminal';
import {
  LucideAngularModule,
  FileUser,
  FolderOpen,
  NotebookPen,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';
import { ThemeService } from '../../services/theme-service';
import { Theme } from '../../enums/theme-enum';

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
    NgxFaultyTerminalComponent,
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

  // CRT glyph backdrop: skipped for reduced-motion users and without WebGL
  readonly showCrt = HomeComponent.canShowCrt();

  // phones render a wider-than-screen canvas (see .crt-canvas), so draw it at
  // a lower resolution there to keep the GPU cost down
  readonly crtDpr =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 0.75 : 1;

  // dark: phosphor green. light: the backdrop is colour-inverted in CSS,
  // so this pink inverts to a deep green (~#00633f).
  private readonly _themeService = inject(ThemeService);
  readonly crtTint = signal(this.tintFor(this._themeService.getTheme()));

  constructor(private _sanitizer: DomSanitizer) {
    this._themeService.themeSubject
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((theme) => this.crtTint.set(this.tintFor(theme)));
  }

  private tintFor(theme: Theme): string {
    return theme === Theme.Light ? '#ff9cc0' : '#00ffb2';
  }

  private static canShowCrt(): boolean {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    try {
      return !!document.createElement('canvas').getContext('webgl');
    } catch {
      return false;
    }
  }

  trustSvg(svg: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(svg);
  }
}
