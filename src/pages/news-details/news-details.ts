import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';

/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  public id;
  public news: any;
  public errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _homeService: HomeServiceProvider) {
    this.id = navParams.get("newsId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
    this.getNewsByID(this.id);
  }
  getNewsByID(id) {
    this._homeService.getNewsByID(id)
      .subscribe(
      (results: any) => {
        this.news = results;
        console.log('news by id', this.news);
      },
      error => {
        this.errorMessage = <any>error;
        //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
      });
  }

}
