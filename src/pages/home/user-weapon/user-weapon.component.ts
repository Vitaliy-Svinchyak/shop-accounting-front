import { Component, Input, ViewEncapsulation } from '@angular/core';

import { UserEquipment } from '../../../models/user/sub/user-equipment.model';

@Component({
  selector: 'app-user-weapon',
  templateUrl: './user-weapon.component.html',
  styleUrls: ['./user-weapon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserWeaponComponent {

  @Input() public equipment: UserEquipment;
}
