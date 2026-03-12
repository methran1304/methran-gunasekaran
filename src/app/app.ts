import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet, Scroll } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { ThemeService } from './services/theme-service';
import { ArrowUp, LucideAngularModule } from 'lucide-angular'
import { PageUtils } from './utils/page-utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public readonly arrowUpIcon = ArrowUp;
  public showScrollToTopBtn: boolean = false;

  constructor(private _themeService: ThemeService,
    private _pageUtils: PageUtils
  ) {
    // Initialize theme based on user preference or system preference
    this._themeService.initializeTheme();
  }

  // scroll handler (show/hide scroll to top button)
  @HostListener('window:scroll', [])
  scrollButtonHandler() {
    this.showScrollToTopBtn =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  }

  // handle scroll to top request
  scrollToTop() {
    this.showScrollToTopBtn = false;
    this._pageUtils.ScrollToTop();
  }
}
