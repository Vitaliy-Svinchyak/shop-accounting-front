import { Component } from '@angular/core';
import { FormComponent } from '../../../app/core/common/form.component';
import { ActivatedRoute, Params } from '@angular/router';
import { StockPageService } from '../stock.page.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CreateProductDialogComponent } from '../create-product-dialog.component/create-product-dialog.component';
import { Product } from '../../../models/shop/product.model';

@Component({
  selector: 'app-stock-page',
  templateUrl: 'stock.page.component.html',
  styleUrls: ['stock.page.component.css'],
})
export class StockPageComponent extends FormComponent {

  public products: Product[];

  public constructor(
    private service: StockPageService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
  ) {
    super();

    this.route.params.subscribe((params: Params) => {
      this.loadProducts(params);
    });
  }

  public loadProducts(params: Params): void {
    this.service.getProducts(params.id).subscribe(console.log);
  }

  public showAddProductModal(): void {
    const dialog: MdDialogRef<CreateProductDialogComponent> = this.dialog.open(CreateProductDialogComponent);

    dialog.componentInstance.onSubmit.subscribe((r: boolean) => dialog.close());
  }
}
