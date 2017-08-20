import { Model } from '../../model';
import { Item } from '../../item/item.model';
import { Autowired } from '../../../app/core/decorators/autowired.decorator';

export class UserInventoryItem extends Model {
  @Autowired(Item) public item: Item;
}
