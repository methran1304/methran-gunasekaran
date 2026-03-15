import { Component } from '@angular/core';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  readonly githubIcon = Github;
  readonly linkedInIcon = Linkedin;
  readonly mailIcon = Mail;
  showTitle: boolean = true;

  navItems = [
    { href: ROUTE_CONSTANTS.Home, label: 'Home' },
    { href: ROUTE_CONSTANTS.Blog, label: 'Blogs' },
    { href: ROUTE_CONSTANTS.Projects, label: 'Projects' },
    { href: ROUTE_CONSTANTS.About, label: 'About' },
    { href: ROUTE_CONSTANTS.Contact, label: 'Contact' },
  ]

  constructor(private _router: Router) {
    _router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showTitle = event.urlAfterRedirects !== '/home'
      }
    });
  }
}
