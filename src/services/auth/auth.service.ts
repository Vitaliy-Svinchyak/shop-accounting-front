import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { User } from '../../models/user/user.model';
import { CookieService } from 'ngx-cookie';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  protected token: string;

  public constructor(private cookieService: CookieService) {
  }

  /**
   * @return {boolean}
   */
  public canActivate(): boolean {
    return this.userIsAuthed();
  }

  /**
   * @param {user} user
   */
  public rememberUser(user: User): void {
    this.cookieService.put('token', user.token);
  }

  /**
   * @return {boolean}
   */
  public userIsAuthed(): boolean {
    this.checkCookies();

    return !_.isNil(this.token);
  }

  /**
   * @return {string}
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * Gets token from cookies and saves locally
   */
  private checkCookies(): void {
    if (_.isNil(this.token)) {
      this.token = this.cookieService.get('token');
    }
  }
}
