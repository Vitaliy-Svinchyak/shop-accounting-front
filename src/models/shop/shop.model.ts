import { Model } from '../model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';
import { Stock } from './stock.model';

export class Shop extends Model {
  public id: number;
  public name: string;
  public logo: string;
  @MappedClass(Stock) public stocks: Stock[];
}
