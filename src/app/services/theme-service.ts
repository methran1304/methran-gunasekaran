import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../enums/theme-enum';

interface UserPreference {
  theme: Theme;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme!: Theme;
  private _renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  public initializeTheme() {
    const preference = this.getPreference();
    if (preference && preference.theme !== undefined) {
      this.currentTheme = preference.theme;
      this.applyTheme();
    } else {
      // If no preference, use system setting
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? Theme.Dark : Theme.Light;
      this.setTheme(systemTheme);
    }
  }

  setTheme(selectedTheme: Theme) {
    this.currentTheme = selectedTheme;
    this.setPreference({ theme: selectedTheme });
    this.applyTheme();
  }

  getTheme() {
    return this.currentTheme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.setTheme(newTheme);
  }

  private applyTheme() {
    if (this.currentTheme === Theme.Light) {
      this._renderer.addClass(document.documentElement, 'light');
    } else {
      this._renderer.removeClass(document.documentElement, 'light');
    }
  }

  private setPreference(selectedPreference: UserPreference) {
    localStorage.setItem('userPreference', JSON.stringify(selectedPreference));
  }

  private getPreference(): UserPreference | null {
    const storedPreference = localStorage.getItem('userPreference');
    if (storedPreference) {
      try {
        return JSON.parse(storedPreference) as UserPreference;
      } catch (e) {
        localStorage.removeItem('userPreference');
        return null;
      }
    }
    return null;
  }
}