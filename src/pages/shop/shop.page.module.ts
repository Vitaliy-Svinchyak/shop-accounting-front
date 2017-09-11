import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectMaterialModule } from '../../app/core/common/project-material.module';
import { CreateShopDialogComponent } from './create-shop-dialog/create-shop-dialog.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopPageService } from './shop.page.service';
import { ShopPageComponent } from './shop-page/shop.page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    ProjectMaterialModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CreateShopDialogComponent,
    ShopPageComponent
  ],
  declarations: [
    CreateShopDialogComponent,
    ShopPageComponent
  ],
  providers: [ShopPageService],
  bootstrap: [CreateShopDialogComponent],
})
export class ShopPageModule {
}
