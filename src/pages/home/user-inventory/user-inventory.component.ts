import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserInventoryItem } from '../../../models/user/sub/user-inventory-item.model';

@Component({
  selector: 'app-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserInventoryComponent {
  @Input() public inventoryItems: UserInventoryItem[];

  /**
   * @returns {number[]}
   */
  public getEmptyBlocks(): number[] {
    const emptyCount: number = 25 - this.inventoryItems.length;

    return Array(emptyCount).fill(0);
  }
}
