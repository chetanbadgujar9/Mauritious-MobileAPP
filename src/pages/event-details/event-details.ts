import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';

/**
 * Generated class for the EventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  public id;
  public event: any;
  public errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _homeService: HomeServiceProvider) {
    this.id = navParams.get("eventId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
    this.getEventByID(this.id);
  }

  getEventByID(id) {
    this._homeService.getEventByID(id)
      .subscribe(
      (results: any) => {
        this.event = results;
        console.log('event by id', this.event);
      },
      error => {
        this.errorMessage = <any>error;
        //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
      });
  }
}
