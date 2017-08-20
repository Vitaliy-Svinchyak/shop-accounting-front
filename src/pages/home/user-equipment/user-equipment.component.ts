import { Component, Input, ViewEncapsulation } from '@angular/core';

import { UserEquipment } from '../../../models/user/sub/user-equipment.model';

@Component({
  selector: 'app-user-equipment',
  templateUrl: './user-equipment.component.html',
  styleUrls: ['./user-equipment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserEquipmentComponent {

  @Input() public equipment: UserEquipment;
}
