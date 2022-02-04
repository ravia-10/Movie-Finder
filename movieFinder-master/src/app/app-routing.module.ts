import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ShellComponent } from './home/shell/shell.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { Role } from '@auth/models/role';

const routes: Routes = [
  {
    path: '', component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'movies',
        canActivate: [AuthGuard],
        loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'play',
    canActivate: [AuthGuard],
    loadChildren: () => import('./player/player.module').then(m => m.PlayerModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
