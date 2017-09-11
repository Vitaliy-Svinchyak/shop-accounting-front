import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AbstractService } from '../../services/http/abstract.service';
import { Stock } from '../../models/shop/stock.model';
import { Shop } from '../../models/shop/shop.model';

@Injectable()
export class ShopPageService extends AbstractService {
  protected url: string = 'shop';

  public getShops(): Observable<Shop[]> {
    return super.get('').map((r: any) => {
      return r.result.map((shop: any) => new Shop(shop));
    });
  }

  public getStocks(shopId: number): Observable<Stock[]> {
    return super.get(`/${shopId}/stocks`)
      .map((r: any) => {
        return r.result.map((stock: any) => new Stock(stock));
      });
  }
}
