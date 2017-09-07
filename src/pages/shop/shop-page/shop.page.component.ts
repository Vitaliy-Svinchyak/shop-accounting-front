import { Component } from '@angular/core';
import { ShopPageService } from '../shop.page.service';
import { FormComponent } from '../../../app/core/common/form.component';
import { Stock } from '../../../models/shop/stock.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop-page',
  templateUrl: 'shop.page.component.html',
})
export class ShopPageComponent extends FormComponent {

  protected stocks: Stock[];

  public constructor(
    private service: ShopPageService,
    private route: ActivatedRoute
  ) {
    super();

    this.route.params.subscribe((params: Params) => {
      this.loadStocks(params);
    });
  }

  protected loadStocks(params: Params): void {
    this.service.getStocks(params.id).subscribe(console.log);
  }
}
