import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import { Theme } from '../../enums/theme-enum';
import { LucideAngularModule, SunMedium, Moon } from 'lucide-angular';

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
    { href: '/home', label: 'Home' },
    { href: '/blog', label: 'Blogs' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  constructor(private _themeService: ThemeService) {
    this.isDarkTheme = _themeService.getTheme() === Theme.Dark;
  }

  ngOnInit(): void {
    this._themeService.themeSubject.subscribe((currentTheme) => {
      this.isDarkTheme = currentTheme === Theme.Dark;
      console.log('theme changed: ' + currentTheme);
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
