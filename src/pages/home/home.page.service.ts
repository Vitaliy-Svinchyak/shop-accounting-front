import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../../models/user/user.model';
import { AbstractService } from '../../services/http/abstract.service';
import { UnexpectedResponse } from '../../services/http/unexpected.response';

@Injectable()
export class HomePageService extends AbstractService {
  protected url: string = 'page/home';

  /**
   * @return {Observable<User>}
   */
  public getIndex(): Observable<User> {
    return super.get('').map(
      (response: any) => {
        if (this.isUnexpectedResponse(response)) {
          return new UnexpectedResponse(response);
        }

        return new User(response);
      }
    );
  }

  public createShop(shopName: string): Observable<Response> {
    return super.create('/shop', {name: shopName});
  }

}
