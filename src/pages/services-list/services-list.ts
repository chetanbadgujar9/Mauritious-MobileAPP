import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransportServicePage } from './transport-service/transport-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ServicesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-list',
  templateUrl: 'services-list.html',
})
export class ServicesListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesListPage');
  }
  onServiceClick(service) {
    switch (service) {
      case 'transport': if (localStorage.getItem('access_token') !== null) {
        this.navCtrl.push(TransportServicePage);
      } else {
        this.navCtrl.push(LoginPage, {
          text: 'transport'
        });
      }
        break;
      case 'news': this.navCtrl.push(HomePage, {
        text: 'news'
      });
        break;
      case 'events': this.navCtrl.push(HomePage, {
        text: 'events'
      });
        break;
    }
  }
}
