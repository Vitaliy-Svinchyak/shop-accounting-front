import { Model } from '../model';

export class Stock extends Model {
  public id: number;
  public name: string;
  public logo: string;
  public geo: string;
}
