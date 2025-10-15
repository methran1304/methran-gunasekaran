import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('methran-gunasekaran');

  constructor(private _themeService: ThemeService) {
    // Initialize theme based on user preference or system preference
    this._themeService.initializeTheme();
  }
}
