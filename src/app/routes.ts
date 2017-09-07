import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthService } from '../services/auth/auth.service';
import { ShopPageComponent } from '../pages/shop/shop-page/shop.page.component';

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
  {
    path: 'shop/:id',
    component: ShopPageComponent,
    canActivate: [
      AuthService
    ]
  }
];
