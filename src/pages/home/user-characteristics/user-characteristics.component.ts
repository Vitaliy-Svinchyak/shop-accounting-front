import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserCharacteristics } from '../../../models/user/sub/user-characteristics.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-characteristics',
  templateUrl: './user-characteristics.component.html',
  styleUrls: ['./user-characteristics.component.css'],
  // @todo fix that problem
  encapsulation: ViewEncapsulation.None
})
export class UserCharacteristicsComponent {

  @Input() public characteristics: UserCharacteristics;

  private biggestCharacteristicValue: number;

  /**
   * @param {number} characteristicValue
   *
   * @return {number}
   */
  public getPercent(characteristicValue: number): number {
    this.findTheBestCharacteristic();

    if (!_.isNil(this.characteristics)) {
      return characteristicValue * 100 / this.biggestCharacteristicValue;
    }

    return 0;
  }

  /**
   * Init the biggestCharacteristicValue
   */
  private findTheBestCharacteristic(): void {
    if (!_.isNil(this.characteristics) && _.isNil(this.biggestCharacteristicValue)) {
      this.biggestCharacteristicValue = _.max(_.values(this.characteristics));
    }
  }
}
