import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideMarkdown, SANITIZE } from 'ngx-markdown';
import { App } from './app/app';
import { routes } from './app/app.routes'; // create/export your routes
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject } from '@vercel/analytics';
import { SecurityContext } from '@angular/core';

// collect web analytics
inject();

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideMarkdown({
      loader: HttpClient,
      sanitize: { provide: SANITIZE, useValue: SecurityContext.NONE },
    }),
    provideRouter(routes), // <-- important
  ],
});
