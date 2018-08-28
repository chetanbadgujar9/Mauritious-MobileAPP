import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransportServicePage } from './transport-service/transport-service';

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
    if (service === 'transport') {
      this.navCtrl.push(TransportServicePage);
    }
  }
}
