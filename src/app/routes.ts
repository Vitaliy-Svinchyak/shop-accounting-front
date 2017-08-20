import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthService } from '../services/auth/auth.service';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [
      AuthService
    ]
  },
];
