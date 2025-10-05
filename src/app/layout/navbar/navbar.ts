import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme-service';
import { Theme } from '../../enum/theme-enum';
import { LucideAngularModule, SunMedium, Moon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  readonly sunIcon = SunMedium;
  readonly moonIcon = Moon;
  
  menuOpen = false;
  isDarkTheme: boolean = false;
  navItems = [
    { href: '/home', label: 'Home'},
    { href: '/blog', label: 'Blogs'},
    { href: '/projects', label: 'Projects'},
    { href: '/about', label: 'About'},
    { href: '/contact', label: 'Contact'},
  ]

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    const currentTheme = this.themeService.getTheme();
    this.isDarkTheme = currentTheme === Theme.Dark;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.getTheme() === Theme.Dark;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
