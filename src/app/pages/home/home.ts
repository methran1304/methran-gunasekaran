import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';
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

  // The shader draws 45 x gridMul glyph columns/rows (at scale 3) across the
  // canvas whatever its shape. Size the grid from the viewport so cells stay
  // ~16.8 x 19.1 CSS px (the laptop look; 1512x860 gives the original [2, 1])
  // on any screen, instead of squeezing them on narrow ones.
  readonly crtGridMul = signal<[number, number]>(HomeComponent.gridMulFor());

  // Desktop stays at 1x. Phones are small enough to render near their real
  // pixel density (capped at 2x) for about the same cost as a laptop at 1x.
  readonly crtDpr = HomeComponent.crtDprFor();

  private readonly _destroyRef = inject(DestroyRef);

  // dark: phosphor green. light: the backdrop is colour-inverted in CSS,
  // so this pink inverts to a deep green (~#00633f).
  private readonly _themeService = inject(ThemeService);
  readonly crtTint = signal(this.tintFor(this._themeService.getTheme()));

  constructor(private _sanitizer: DomSanitizer) {
    this._themeService.themeSubject
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((theme) => this.crtTint.set(this.tintFor(theme)));

    if (typeof window !== 'undefined') {
      fromEvent(window, 'resize')
        .pipe(debounceTime(150), takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this.crtGridMul.set(HomeComponent.gridMulFor()));
    }
  }

  private static gridMulFor(): [number, number] {
    if (typeof window === 'undefined') return [2, 1];
    return [window.innerWidth / 756, window.innerHeight / 860];
  }

  private static crtDprFor(): number {
    if (typeof window === 'undefined') return 1;
    return window.innerWidth < 640
      ? Math.min(window.devicePixelRatio || 1, 2)
      : 1;
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
