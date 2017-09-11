import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectMaterialModule } from '../../app/core/common/project-material.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StockPageService } from './stock.page.service';
import { StockPageComponent } from './stock-page/stock.page.component';
import { CreateProductDialogComponent } from './create-product-dialog.component/create-product-dialog.component';

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
  declarations: [
    StockPageComponent,
    CreateProductDialogComponent
  ],
  exports: [
    StockPageComponent,
    CreateProductDialogComponent
  ],
  providers: [
    StockPageService
  ],
  bootstrap: [CreateProductDialogComponent],
})
export class StockPageModule {
}
