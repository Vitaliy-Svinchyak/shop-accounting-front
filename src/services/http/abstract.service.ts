import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { HttpStatus } from '../../app/core/enum/http-status.enum';

@Injectable()
export class AbstractService {
  protected url: string;
  protected baseUrl: string = 'http://magaz-back/';

  public constructor(protected http: Http, protected authService: AuthService, protected router: Router) {
  }

  /**
   * @param {string} url
   * @param {RequestOptionsArgs} options
   * @param {any} filters
   *
   * @return {Observable<Response>}
   */
  public get(url: string, options: RequestOptionsArgs = {}, filters: any = {}): Observable<Response> {
    let filtersString: string = '';

    for (const filterName in filters) {
      if (filters.hasOwnProperty(filterName)) {
        if (filtersString.length > 0) {
          filtersString += '&';
        }
        filtersString += `${filterName}=${filters[filterName]}`;
      }
    }

    let fullUrl: string = this.collectUrl(url);

    if (filtersString.length > 0) {
      fullUrl += '?' + filtersString;
    }

    this.appendAuthorizationHeaders(options);

    return this.http.get(fullUrl, options).map(this.extractData)
      .catch((err: any) => {
        if (err.status === HttpStatus.Unauthorized) {
          this.router.navigate(['/auth']);

          return Observable.throw('Unauthorized');
        }
      });
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {RequestOptionsArgs} options
   *
   * @return {Observable<Response>}
   */
  public create(url: string, data: any, options: RequestOptionsArgs = {}): Observable<Response> {
    const fullUrl: string = this.collectUrl(url);
    this.appendAuthorizationHeaders(options);

    return this.http.post(fullUrl, data, options)
      .map(this.extractData);
  };

  /**
   * @param {string} url
   * @param {any} data
   * @param {RequestOptionsArgs} options
   *
   * @return {Observable<Response>}
   */
  public update(url: string, data: any, options: RequestOptionsArgs = {}): Observable<Response> {
    const fullUrl: string = this.collectUrl(url);
    this.appendAuthorizationHeaders(options);

    return this.http.put(fullUrl, data, options).map(this.extractData);
  }

  /**
   * @param {string} url
   * @param {RequestOptionsArgs} options
   *
   * @return{Observable<Response>}
   */
  public remove(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    const fullUrl: string = this.collectUrl(url);
    this.appendAuthorizationHeaders(options);

    return this.http.delete(fullUrl, options).map(this.extractData);
  }

  /**
   * @param response
   * @return {boolean}
   */
  public isUnexpectedResponse(response: any): boolean {
    return !_.isNil(response.unexpected_action);
  }

  /**
   * @param {string} url
   */
  private collectUrl(url: string): string {
    return this.baseUrl + this.url + url;
  }

  /**
   * @param res
   *
   * @return {any}
   */
  private extractData(res: Response): any {
    return res.json();
  }

  /**
   * @param {RequestOptionsArgs} options
   */
  private appendAuthorizationHeaders(options: RequestOptionsArgs): void {
    if (this.authService.userIsAuthed()) {
      if (_.isNil(options.headers)) {
        options.headers = new Headers();
      }

      const token: string = this.authService.getToken();
      options.headers.append('X-Auth-Token', token);
    }
  }
}
