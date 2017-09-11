import { Model } from '../model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';
import { User } from '../user/user.model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { ProductToStock } from './product-to-stock.model';

export class Product extends Model {
  public id: number;
  public name: string;
  public firm: string;
  public buy_price: number;
  public sale_price: number;
  public descripition: string;
  @Autowired(User) public author: User;
  @MappedClass(ProductToStock) public productToStock: ProductToStock;

}
