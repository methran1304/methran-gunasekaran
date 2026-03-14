import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogList } from './pages/blog-list/blog-list';
import { ProjectsComponent } from './pages/projects/projects';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { BlogContentComponent } from './pages/blog-list/blog-content/blog-content';

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
        path: 'blog',
        children: [
            {
                path: '',
                component: BlogList,
            },
            {
                path: ':slug',
                component: BlogContentComponent,
            }
        ]
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
