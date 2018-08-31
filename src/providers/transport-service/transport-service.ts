import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Config } from '../config/config';
import { SpinnerServiceProvider } from '../spinner-service/spinner-service';
import { AuthHttpProvider } from '../auth-http/auth-http';

/*
  Generated class for the TransportServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransportServiceProvider {

  constructor(public http: Http, public _spinnerService: SpinnerServiceProvider, public authHttp: AuthHttpProvider) {
    console.log('Hello TransportServiceProvider Provider');
  }
  getSearchedTransportService(value) {
    const url = Config.GetURL('/api/Mauritius/Transport/Search?Prefix=' + value.Prefix + '&FromNumber=' + value.FromNumber + '&ToNumber=' + value.ToNumber);
    this._spinnerService.createSpinner('Please wait...');
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  checkAvailability(value) {
    const url = Config.GetURL('/api/Mauritius/Transport/IsRegistrationAvailable?RegistrationMark=' + value);
    this._spinnerService.createSpinner('Checking availability...');
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  submitNewRequest(value) {
    const url = Config.GetURL('/api/Mauritius/Transport/Post');
    this._spinnerService.createSpinner('Submitting data...');
    return this.authHttp.post(url, value)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
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
