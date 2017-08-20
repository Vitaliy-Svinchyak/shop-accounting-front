import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserHp } from '../../../models/user/sub/user-hp.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-hp',
  templateUrl: './user-hp.component.html',
  styleUrls: ['./user-hp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserHpComponent {

  @Input() private hp: UserHp;
  @Input() public name: string;

  private hpPercent: number = 0;

  /**
   * @return {number}
   */
  public getHpPercent(): number {
    if (!_.isNil(this.hp)) {
      this.hpPercent = this.hp.current_value * 100 / this.hp.max_value;
    }

    return this.hpPercent;
  }
}
