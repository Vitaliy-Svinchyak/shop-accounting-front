import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { AbstractService } from '../../services/http/abstract.service';

@Injectable()
export class UserService extends AbstractService {
  protected url: string = 'user';
  protected user: User;

  /**
   * @param {User} newUser
   *
   * @return {Observable<User>}
   */
  public createUser(newUser: User): Observable<User> {
    return super.create('/register', newUser).map(
      (user: any) => {
        return new User(user);
      }
    );
  }

  /**
   *
   * @param {User} user
   *
   * @return {Observable<User>}
   */
  public authUser(user: User): Observable<User> {
    return super.create('/auth', user).map(
      (authedUser: any) => {
        return new User(authedUser);
      }
    );
  }

  /**
   * @return {Observable<User>}
   */
  public getCurrentUser(): Observable<User> {
    return super.get('/current').map(
      (currentUser: any) => {
        return new User(currentUser);
      }
    );
  }
}
