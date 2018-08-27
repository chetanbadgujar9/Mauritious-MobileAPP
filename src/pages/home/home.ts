import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { ToasterServiceProvider } from '../../providers/toaster-service/toaster-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeServiceProvider,ToasterServiceProvider]
})
export class HomePage {
  users: any[];
  errorMessage: string;
  newsData: any[];
  constructor(public navCtrl: NavController,
    private _homeService: HomeServiceProvider,
    private _toasterServiceProvider : ToasterServiceProvider
  ) {
    
  }
  ionViewDidEnter() {
    this.getGithubUsers();
    this.getNewsData();
  }
  getGithubUsers() {
    this._homeService.load().subscribe(users => {
      this.users = users;
      this._toasterServiceProvider.createToast('Data loaded successfully');
    }, error => {
      //this._spinnerService.stopSpinner();
    })
  }
  getNewsData() {
        this._homeService.getNewsData()
            .subscribe(
            (results: any) => {
                this.newsData = results;
                console.log('news Data',this.newsData);
            },
            error => {
                this.errorMessage = <any>error;
                //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
            });
    }
}
