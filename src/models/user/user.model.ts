import { Model } from '../model';
import { UserHp } from './sub/user-hp.model';
import { UserCharacteristics } from './sub/user-characteristics.model';
import { UserEquipment } from './sub/user-equipment.model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { UserInventoryItem } from './sub/user-inventory-item.model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';

export class User extends Model {
  public name: string;
  public email: string;
  public avatar: string;
  public password: string;
  public tokenId: number;
  public token: string;
  @Autowired(UserHp) public hp: UserHp;
  @Autowired(UserCharacteristics) public characteristics: UserCharacteristics;
  @Autowired(UserEquipment) public equipment: UserEquipment;
  @MappedClass(UserInventoryItem) public inventory_items: UserInventoryItem[];
}
