import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private _themeService: ThemeService) {
    this.isDarkTheme = _themeService.getTheme() === Theme.Dark;
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
