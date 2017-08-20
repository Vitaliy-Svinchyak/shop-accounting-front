import { Component, Input, ViewEncapsulation } from '@angular/core';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAvatarComponent {

  @Input() public user: User;
}
