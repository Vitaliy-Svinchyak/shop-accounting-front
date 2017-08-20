import { Model } from '../model';
import { Armor } from './armor.model';
import { Weapon } from './weapon.model';
import * as _ from 'lodash';
import { ItemType } from './item-type.enum';

export class Item extends Model {
  public id: number;
  public armor_id: number;
  public weapon_id: number;
  public item_type: ItemType;

  public entity: Armor | Weapon;

  public constructor(params?: any) {
    super(params);

    if (_.isNil(params.armor_id)) {
      this.entity = new Weapon(params.entity);
    } else {
      this.entity = new Armor(params.entity);
    }
  }

  /**
   * @return {boolean}
   */
  public isWeaponOrArmor(): boolean {
    return this.isWeapon() || this.isArmor();
  }

  /**
   * @return {boolean}
   */
  public isWeapon(): boolean {
    return !_.isNil(this.weapon_id);
  }

  /**
   * @return {boolean}
   */
  public isArmor(): boolean {
    return !_.isNil(this.armor_id);
  }

  /**
   * @return {boolean}
   */
  public isUsable(): boolean {
    return false;
  }
}
