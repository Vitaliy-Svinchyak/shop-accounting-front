import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  OVERLAY_PROVIDERS,
  MdIconRegistry,
  InteractivityChecker,
} from '@angular/material';
import { appRoutes } from './routes';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { AuthComponent } from '../components/auth/auth.component';
import { HomePageModule } from '../pages/home/home-page.module';
import { SharedModule } from './shared/shared.module';
import { ProjectMaterialModule } from './core/common/project-material.module';
import 'hammerjs/hammer';
import { AuthService } from '../services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopPageModule } from '../pages/shop/shop.page.module';
import { StockPageModule } from '../pages/stock/stock.page.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ProjectMaterialModule,
    ReactiveFormsModule,
    HomePageModule,
    SharedModule,
    CookieModule.forRoot(),
    BrowserAnimationsModule,
    ShopPageModule,
    StockPageModule
  ],
  providers: [
    OVERLAY_PROVIDERS,
    MdIconRegistry,
    InteractivityChecker,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
