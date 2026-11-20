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

  // calm shader settings: slow drift, very little glitch, no flicker
  readonly crt = { timeScale: 0.2, glitch: 0.1, flicker: 0, scanline: 0.25 };

  // The shader draws 45 x gridMul glyph columns/rows (at scale 3) across the
  // canvas whatever its shape. Size the grid from the viewport so cells stay
  // ~16.8 x 19.1 CSS px (the laptop look; 1512x860 gives the original [2, 1])
  // on any screen, instead of squeezing them on narrow ones.
  readonly crtGridMul = signal<[number, number]>(this.gridMulFor());

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
      // Rebuild the grid only when the CRT's real size changes. The grid uses
      // the large viewport height (100lvh), which stays put while a phone's
      // address bar slides in and out on scroll, so scrolling no longer
      // re-lays the glyphs out (that, plus canvas resizes, was the flicker).
      fromEvent(window, 'resize')
        .pipe(debounceTime(150), takeUntilDestroyed(this._destroyRef))
        .subscribe(() => {
          const next = this.gridMulFor();
          const [x, y] = this.crtGridMul();
          if (Math.abs(next[0] - x) > 0.001 || Math.abs(next[1] - y) > 0.001) {
            this.crtGridMul.set(next);
          }
        });
    }
  }

  private gridMulFor(): [number, number] {
    if (typeof window === 'undefined') return [2, 1];
    return [
      window.innerWidth / 756,
      HomeComponent.largeViewportHeight() / 860,
    ];
  }

  // height of 100lvh (the viewport with the mobile address bar hidden);
  // falls back to innerHeight where lvh isn't supported
  private static largeViewportHeight(): number {
    const probe = document.createElement('div');
    probe.style.cssText =
      'position:fixed;top:0;width:0;height:100lvh;visibility:hidden;pointer-events:none';
    document.body.appendChild(probe);
    const height = probe.offsetHeight || window.innerHeight;
    probe.remove();
    return height;
  }


  // Render above 1x for sharper glyphs, up to the screen's pixel density
  // (capped at 2x), within a per-frame budget of ~3 MP. On a 14" M-series
  // MacBook at 120 Hz: 2.9 MP held 120 fps, 3.6 MP ~119, 4.2 MP 102, 5 MP 88,
  // so 3 MP keeps headroom for slower GPUs. Gives ~1.5x on a 14" MacBook,
  // 2x on phones; large monitors fall back towards 1x.
  private static crtDprFor(): number {
    if (typeof window === 'undefined') return 1;
    const device = window.devicePixelRatio || 1;
    const budget = 3_000_000;
    const fit = Math.sqrt(budget / (window.innerWidth * window.innerHeight));
    return Math.max(1, Math.min(device, 2, fit));
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
