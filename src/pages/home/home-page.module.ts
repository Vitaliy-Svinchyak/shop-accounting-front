import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectMaterialModule } from '../../app/core/common/project-material.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomePageService } from './home.page.service';

@NgModule({
  imports: [
    BrowserModule,
    ProjectMaterialModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
  ],
  exports: [
  ],
  declarations: [
    HomeComponent
  ],
  bootstrap: [],
  providers: [HomePageService]
})
export class HomePageModule {
}
