import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../../models/user/user.model';
import { AbstractService } from '../../services/http/abstract.service';
import { UnexpectedResponse } from '../../services/http/unexpected.response';

@Injectable()
export class ShopPageService extends AbstractService {
  protected url: string = 'shop';
}
