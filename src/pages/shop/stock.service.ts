import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AbstractService } from '../../services/http/abstract.service';

@Injectable()
export class StockService extends AbstractService {
  protected url: string = 'stock';
}
