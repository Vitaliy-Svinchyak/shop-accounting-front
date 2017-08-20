import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { UserInventoryItem } from '../../../models/user/sub/user-inventory-item.model';
import { InventoryItemActions } from './inventory-item-actions.enum';
import { TooltipComponent } from '../../../app/shared/tooltip/tooltip.component';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    TooltipComponent
  ]
})
export class InventoryItemComponent {
  @Input() public inventoryItem: UserInventoryItem;
  @Input() public image: string = 'assets/images/box.png';
  public width: any = null;

  public showAction: boolean = false;

  public constructor(private tooltipComponent: TooltipComponent) {

  }

  public perfomAction(): void {
    const type: InventoryItemActions = this.getActionType();
  }

  /**
   * @return {string}
   */
  public getActionText(): string {
    const type: InventoryItemActions = this.getActionType();

    switch (type) {
      case InventoryItemActions.NONE:
        return '';
      case InventoryItemActions.PUT_ON:
        return 'Надеть';
      case InventoryItemActions.PUT_OFF:
        return 'Снять';
      case InventoryItemActions.USE:
        return 'Использовать';
      default:
        return '';
    }
  }

  /**
   * @param {MouseEvent} event
   */
  public onHover(): void {
    if (!_.isNil(this.inventoryItem)) {
      this.showAction = true;
      this.tooltipComponent.renderInventoryItemTooltip(this.inventoryItem);
    }
  }

  public onMouseLeave(): void {
    this.showAction = false;
    this.tooltipComponent.hideTooltip();
  }

  /**
   * @return {InventoryItemActions}
   */
  private getActionType(): InventoryItemActions {
    if (_.isNil(this.inventoryItem)) {
      return InventoryItemActions.NONE;
    }

    if (this.inventoryItem.item.isWeaponOrArmor()) {
      return InventoryItemActions.PUT_ON;
    }

    if (this.inventoryItem.item.isUsable()) {
      return InventoryItemActions.USE;
    }

    return InventoryItemActions.NONE;
  }
}
