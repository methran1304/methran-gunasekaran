import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogComponent } from './pages/blog/blog';
import { ProjectsComponent } from './pages/projects/projects';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { BlogContentComponent } from './pages/blog/blog-content/blog-content';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'blogs',
        component: BlogComponent
    },
    {
        path: 'blog/:slug',
        component: BlogContentComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
