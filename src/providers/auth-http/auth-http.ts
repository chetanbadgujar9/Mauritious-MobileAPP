import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the AuthHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthHttpProvider {
  constructor(public http: Http) {
    this.http = http;
    console.log('Hello AuthHttpProvider Provider');
  }
  createAuthorizationHeader(headers: Headers) {
    if (localStorage.getItem('access_token') !== null) {
      headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    }
  }

  addServerType(headers: Headers) {
    headers.append('server_type', '');
  }

  addContentType(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token,x-my-custom-header');
  }
  get(url: string) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    this.addServerType(headers);
    this.addContentType(headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options);
  }

  post(url: string, data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    this.addContentType(headers);
    this.addServerType(headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options);
  }
}
