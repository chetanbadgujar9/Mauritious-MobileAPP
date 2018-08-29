import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Config } from '../config/config';
import { SpinnerServiceProvider } from '../spinner-service/spinner-service';
import { AuthHttpProvider } from '../auth-http/auth-http';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http, public _spinnerService: SpinnerServiceProvider, public authHttp: AuthHttpProvider) {
    console.log('Hello LoginServiceProvider Provider');
  }
  getLoginUserDetails(credentials) {
    const url = Config.GetMemberURL('/api/Mauritius/Members/Authenticate');
    this._spinnerService.createSpinner('Please wait...');
    return this.authHttp.post(url, credentials)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  getAuthToken(credentials: any) {
    const authenticateUrl = Config.GetURL('/api/Auth/Token');
    const headers = new Headers();
    const credentialString: string = 'grant_type=password&username=' + credentials.UserName + '&password=' + credentials.Password;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(authenticateUrl, credentialString, options)
      .map((res: Response) => {
        this.setToken(res); // this.emitAuthEvent(true);
      })
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  /**Set Token in localstorage */
  private setToken(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json();
    localStorage.setItem('access_token', body.access_token);
    return body || {};
  }
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json();
    return body || {};
  }

  /**Error Handler */
  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
