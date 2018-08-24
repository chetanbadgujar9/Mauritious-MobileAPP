import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the SpinnerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpinnerServiceProvider {
  public loader: any;

  constructor(public http: HttpClient, public loading: LoadingController) {
    console.log('Hello SpinnerServiceProvider Provider');
  }
  createSpinner(msg: string) {
    this.loader = this.loading.create({
      content: msg
    });
    this.loader.present();
  }
  stopSpinner() {
    this.loader.dismiss().catch((err) => {
    });
  }
}
