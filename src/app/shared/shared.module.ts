import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectMaterialModule } from '../core/common/project-material.module';
import { HomePageModule } from '../../pages/home/home-page.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    ProjectMaterialModule,
    FlexLayoutModule,
    HomePageModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule {
}
