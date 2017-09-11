import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AbstractService } from '../../services/http/abstract.service';
import { Product } from '../../models/shop/product.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockPageService extends AbstractService {
  protected url: string = 'stock';

  public getProducts(stockId: number): Observable<Product[]> {
    return super.get(`/${stockId}/products`)
      .map((r: any) => {
        return r.result.map((product: any) => new Product(product));
      });
  }
}
