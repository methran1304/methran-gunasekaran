import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { HomeComponent } from './pages/home/home';
import { BlogComponent } from './pages/blog/blog';
import { ProjectsComponent } from './pages/projects/projects';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { ThemeService } from './services/theme-service/theme-service';
import { NgxFaultyTerminalComponent } from "@omnedia/ngx-faulty-terminal";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    NgxFaultyTerminalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('methran-gunasekaran');

  constructor(private themeService: ThemeService) {
    // Initialize theme based on user preference or system preference
    this.themeService.initializeTheme();
  }
}
