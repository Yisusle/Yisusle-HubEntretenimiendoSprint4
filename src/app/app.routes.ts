import { Routes } from '@angular/router';
import { SettingsPageComponent } from '@modules/settings/pages/settings-page/settings-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {path: 'auth', loadChildren: () => import(`@modules/auth/auth.routes`).then(m => m.authRoutes)},
    { path: 'home',loadChildren: () => import('@modules/home/home.routes').then(m => m.homeRoutes)},
    { path: 'genres',loadChildren: () => import('@modules/genres/genres.route').then(m => m.genresRoutes)},
    {path: 'movies',loadChildren: () => import('@modules/movies/movies.routes').then(m => m.moviesRoutes)},
    { path: 'series',loadChildren: () => import('@modules/series/series.route').then(m => m.seriesRoutes)},
    {path: 'favorites',loadChildren: () => import('@modules/favorites/favorites.routes').then(m => m.favoritesRoutes)},
    { path: 'settings', component: SettingsPageComponent },
    { path:'**',redirectTo: '/auth/login'}
];
