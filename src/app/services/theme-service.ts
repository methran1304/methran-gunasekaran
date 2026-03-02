import { Injectable, Renderer2, RendererFactory2, Inject, DOCUMENT } from '@angular/core';
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
  private darkPrism?: HTMLLinkElement;
  private lightPrism?: HTMLLinkElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
    this.createPrismStyles();
  }

  private createPrismStyles() {
    // Create dark prism link element
    this.darkPrism = this._renderer.createElement('link') as HTMLLinkElement;
    this._renderer.setProperty(this.darkPrism, 'rel', 'stylesheet');
    this._renderer.setProperty(this.darkPrism, 'href', 'prism-one-dark.css');

    // Create light prism link element
    this.lightPrism = this._renderer.createElement('link') as HTMLLinkElement;
    this._renderer.setProperty(this.lightPrism, 'rel', 'stylesheet');
    this._renderer.setProperty(this.lightPrism, 'href', 'prism-one-light.css');
  }

  public initializeTheme() {
    const preference = this.getPreference();
    if (preference && preference.theme !== undefined) {
      this.currentTheme = preference.theme;
      this.applyTheme();
    } else {
      // If no preference, use system setting
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
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
    const newTheme =
      this.currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.setTheme(newTheme);
  }

  private addPrismTheme(theme: Theme) {
    // Remove the opposite theme first
    if (theme === Theme.Dark) {
      if (this.lightPrism?.parentNode) {
        this._renderer.removeChild(this.document.head, this.lightPrism);
      }
      if (!this.darkPrism?.parentNode) {
        this._renderer.appendChild(this.document.head, this.darkPrism);
      }
    } else {
      if (this.darkPrism?.parentNode) {
        this._renderer.removeChild(this.document.head, this.darkPrism);
      }
      if (!this.lightPrism?.parentNode) {
        this._renderer.appendChild(this.document.head, this.lightPrism);
      }
    }
  }

  private applyTheme() {
    if (this.currentTheme === Theme.Light) {
      this._renderer.addClass(document.documentElement, 'light');
      this.addPrismTheme(Theme.Light);
    } else {
      this._renderer.removeClass(document.documentElement, 'light');
      this.addPrismTheme(Theme.Dark);
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
