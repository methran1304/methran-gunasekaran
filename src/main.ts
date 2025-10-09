import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { App } from './app/app';
import { routes } from './app/app.routes'; // create/export your routes
import { HttpClient, provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(), 
    provideMarkdown({ loader: HttpClient }),
    provideRouter(routes), // <-- important
  ],
});