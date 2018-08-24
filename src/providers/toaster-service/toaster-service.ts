import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToasterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToasterServiceProvider {
  public toast: any;

  constructor(public http: HttpClient, public toastCtrl: ToastController) {
    console.log('Hello ToasterServiceProvider Provider');
  }
  createToast(msg: string) {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    this.toast.present();
  }

}
