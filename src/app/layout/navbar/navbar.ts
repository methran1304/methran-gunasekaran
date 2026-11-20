import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from '../../services/theme-service';
import { Theme } from '../../enums/theme-enum';
import { LucideAngularModule, SunMedium, Moon } from 'lucide-angular';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  readonly sunIcon = SunMedium;
  readonly moonIcon = Moon;

  menuOpen = false;
  isDarkTheme: boolean;
  navItems = [
    { href: ROUTE_CONSTANTS.Home, label: 'Home' },
    { href: ROUTE_CONSTANTS.Blog, label: 'Blogs' },
    { href: ROUTE_CONSTANTS.Projects, label: 'Projects' },
    { href: ROUTE_CONSTANTS.About, label: 'About' },
    { href: ROUTE_CONSTANTS.Contact, label: 'Contact' },
  ];

  /** the current page as a shell path: ~/blog for the blog and its posts,
   *  ~/projects, ...; empty on home, where a lone "~" reads as a stray mark */
  readonly path = signal('');

  constructor(private _themeService: ThemeService, router: Router) {
    this.isDarkTheme = _themeService.getTheme() === Theme.Dark;

    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => this.path.set(this.pathFor(e.urlAfterRedirects)));
  }

  private pathFor(url: string): string {
    const section = url.split(/[?#]/)[0].split('/').filter(Boolean)[0];
    return !section || section === 'home' ? '' : `~/${section}`;
  }

  ngOnInit(): void {
    this._themeService.themeSubject.subscribe((currentTheme) => {
      this.isDarkTheme = currentTheme === Theme.Dark;
    });
  }

  toggleTheme(): void {
    this._themeService.toggleTheme();
    this.isDarkTheme = this._themeService.getTheme() === Theme.Dark;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
