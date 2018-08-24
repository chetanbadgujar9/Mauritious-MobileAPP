import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { SpinnerServiceProvider } from '../../providers/spinner-service/spinner-service';
import { ToasterServiceProvider } from '../../providers/toaster-service/toaster-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeServiceProvider, SpinnerServiceProvider,ToasterServiceProvider]
})
export class HomePage {
  users: any[]
  constructor(public navCtrl: NavController,
    private _homeService: HomeServiceProvider,
    private _spinnerService: SpinnerServiceProvider,
    private _toasterServiceProvider : ToasterServiceProvider
  ) {
    
  }
  ionViewDidEnter() {
    this.getGithubUsers();
  }
  getGithubUsers() {
    this._spinnerService.createSpinner('Please wait...');
    this._homeService.load().subscribe(users => {
      this.users = users;
      this._spinnerService.stopSpinner();
      this._toasterServiceProvider.createToast('Data loaded successfully');
    }, error => {
      this._spinnerService.stopSpinner();
    })
  }
}
