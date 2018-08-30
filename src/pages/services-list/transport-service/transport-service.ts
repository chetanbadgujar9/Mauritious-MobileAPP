import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchRequestPage } from './search-request/search-request';
import { ServicesListPage } from '../../services-list/services-list';
import { NewRequestPage } from './new-request/new-request';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
/**
 * Generated class for the TransportServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transport-service',
  templateUrl: 'transport-service.html',
})
export class TransportServicePage {
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportServicePage');
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.popTo(this.navCtrl.getByIndex(0));
    }
  }
  onSearchRequest() {
    this.navCtrl.push(SearchRequestPage);
  }
  onNewRequest() {
    this.navCtrl.push(NewRequestPage);
  }
}
