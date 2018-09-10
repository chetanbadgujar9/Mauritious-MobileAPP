import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Config } from '../config/config';
import { SpinnerServiceProvider } from '../spinner-service/spinner-service';
import { AuthHttpProvider } from '../auth-http/auth-http';

/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: Http, public _spinnerService: SpinnerServiceProvider, public authHttp: AuthHttpProvider) {
    console.log('Hello HomeServiceProvider Provider');
  }
  // Load all github users
  load(): Observable<any[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <any[]>res.json());
  }
  getNewsData() {
    //const url = Config.GetURL('/api/Mauritius/News/Get');
    const url = Config.GetEventAndNewsURL('/api/Mauritius/News');
    this._spinnerService.createSpinner('Please wait...');
    return this.authHttp.get(url)
      .map(this.extractNewsData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  getEventsData() {
    //const url = Config.GetURL('/api/Mauritius/Events/Get');
    const url = Config.GetEventAndNewsURL('/api/Mauritius/Events');
    //this._spinnerService.createSpinner('Please wait...');
    return this.authHttp.get(url)
      .map(this.extractNewsData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  getNewsByID(id) {
    const url = Config.GetURL('/api/Mauritius/News/NewsByID/' + id);
    //this._spinnerService.createSpinner('Please wait...');
    return this.authHttp.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this._spinnerService.stopSpinner());
  }
  getEventByID(id) {
    const url = Config.GetURL('/api/Mauritius/Events/EventsByID/' + id);
    //this._spinnerService.createSpinner('Please wait...');
    return this.authHttp.get(url)
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
  private extractNewsData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.json();
    return body || null;
  }
  /**Error Handler */
  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
