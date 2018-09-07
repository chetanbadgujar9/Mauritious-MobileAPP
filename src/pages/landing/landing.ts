import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { NewsDetailsPage } from '../news-details/news-details';
import { EventDetailsPage } from '../event-details/event-details';
import { ServicesListPage } from "../services-list/services-list";
/**
 * Generated class for the ServicesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  newsData: any[];
  eventData: any[];
  newsDataLimit: any[];
  eventDataLimit: any[];
  errorMessage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _homeService: HomeServiceProvider) {
    this.newsData = [];
    this.eventData = [];
    this.newsDataLimit = [];
    this.eventDataLimit = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesListPage');
    this.getNewsData();
    //this.getEventsData();
  }
  getNewsData() {
    this._homeService.getNewsData()
      .subscribe(
      (results: any) => {
        if (results) {
          this.newsData = results;
          if (this.newsData.length > 0) {
            for (let i = 0; i < this.newsData.length; i++) {
              if (i < 4) {
                this.newsDataLimit.push(this.newsData[i]);
              }
            }
          }
        }
        console.log('news Data', this.newsData);
      },
      error => {
        this.errorMessage = <any>error;
        //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
      });
  }
  getEventsData() {
    this._homeService.getEventsData()
      .subscribe(
      (results: any) => {
        if (results) {
          this.eventData = results;
          if (this.eventData.length > 0) {
            for (let i = 0; i < this.eventData.length; i++) {
              if (i < 2) {
                this.eventDataLimit.push(this.eventData[i]);
              }
            }
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
        //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
      });
  }
  onServiceClick(service) {
    switch (service) {
      case 'news': this.navCtrl.push(HomePage, {
        text: 'news'
      });
        break;
      case 'events': this.navCtrl.push(HomePage, {
        text: 'events'
      });
        break;
      case 'apps': this.navCtrl.push(ServicesListPage, {
        text: 'apps'
      });
        break;
    }
  }
  onNewsList(e, news) {
    this.navCtrl.push(HomePage, {
      text: 'news'
    });
    this.navCtrl.push(NewsDetailsPage, {
      newsId: news.Id,
    });
  }
  onEventList(e, event) {
    this.navCtrl.push(HomePage, {
      text: 'events'
    })
    this.navCtrl.push(EventDetailsPage, {
      eventId: event.Id,
    });
  }
}

