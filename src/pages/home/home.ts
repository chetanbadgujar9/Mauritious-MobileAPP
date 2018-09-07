import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { ToasterServiceProvider } from '../../providers/toaster-service/toaster-service';
import { NewsDetailsPage } from '../news-details/news-details';
import { EventDetailsPage } from '../event-details/event-details';
import { ServicesListPage } from '../services-list/services-list';
import { LandingPage } from '../landing/landing';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeServiceProvider, ToasterServiceProvider]
})
export class HomePage {
  users: any[];
  errorMessage: string;
  newsData: any[];
  eventData: any[];
  homepageSegment: any = 'news';
  constructor(public navCtrl: NavController,
    private _homeService: HomeServiceProvider,
    private _toasterServiceProvider: ToasterServiceProvider,
    public navParams: NavParams
  ) {
    this.newsData = [];
    this.eventData = [];
    this.homepageSegment = this.navParams.get("text");
  }
  ionViewDidEnter() {
    //this.getGithubUsers();
    
      this.getNewsData();
    
      this.getEventsData();
    

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
        if(results){
          this.newsData = results;
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
        if(results){
          this.eventData = results;
        }
        console.log('event Data', this.eventData);
      },
      error => {
        this.errorMessage = <any>error;
        //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
      });
  }
  onSegmentSelected(e) {
    this.getEventsData();
  }
  onNewsList(e, news) {
    this.navCtrl.push(NewsDetailsPage, {
      newsId: news.Id,
    });
  }
  onEventList(e, event) {
    this.navCtrl.push(EventDetailsPage, {
      eventId: event.Id,
    });
  }
  openServices() {
    this.navCtrl.push(LandingPage);
    //this.navCtrl.push(LoginPage);
  }
}
