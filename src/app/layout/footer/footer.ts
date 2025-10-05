import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';

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

  navItems = [
    { href: '/home', label: 'Home'},
    { href: '/blog', label: 'Blogs'},
    { href: '/projects', label: 'Projects'},
    { href: '/about', label: 'About'},
    { href: '/contact', label: 'Contact'},
  ]
}
