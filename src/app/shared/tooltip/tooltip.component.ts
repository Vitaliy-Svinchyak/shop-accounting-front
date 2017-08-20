import { Component, Injectable, ChangeDetectorRef } from '@angular/core';
import { UserInventoryItem } from '../../../models/user/sub/user-inventory-item.model';
import { RenderType } from './render-type.enum';
import { Armor } from '../../../models/item/armor.model';
import { Weapon } from '../../../models/item/weapon.model';
import { ItemType } from '../../../models/item/item-type.enum';

@Injectable()
@Component({
  selector: 'app-tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.css'],
})
export class TooltipComponent {

  public render: boolean = false;
  private renderType: RenderType;
  private item: any;

  public constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * @return {boolean}
   */
  public renderInventoryItemTooltip(inventoryItem: UserInventoryItem): void {
    if (this.render) {
      return;
    }

    this.render = true;

    switch (inventoryItem.item.item_type) {
      case (ItemType.WEAPON):
        this.renderWeapon(<Weapon>inventoryItem.item.entity);
        break;
      case (ItemType.ARMOR):
        this.renderArmor(<Armor>inventoryItem.item.entity);
        break;
      default:
        break;
    }

    this.changeDetectorRef.detectChanges();
  }

  public renderArmor(item: Armor): void {
    this.renderType = RenderType.ARMOR;
    this.item = item;
  }

  public renderWeapon(item: Weapon): void {

  }

  public hideTooltip(): void {
  }
}
