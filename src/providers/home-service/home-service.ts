import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: Http) {
    console.log('Hello HomeServiceProvider Provider');
  }
  // Load all github users
  load(): Observable<any[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <any[]>res.json());
  }
}
