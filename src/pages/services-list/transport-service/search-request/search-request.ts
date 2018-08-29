import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SearchRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-request',
  templateUrl: 'search-request.html',
})
export class SearchRequestPage {
  searchForm: FormGroup;
  errorFlag: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      //Rule:['A'],
      //Prefix:[''],
      FromNumber: ['', [Validators.required]],
      ToNumber: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchRequestPage');
  }
  onSubmitSearch({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.errorFlag = false;
      console.log(value);
    } else {
      this.errorFlag = true;
    }
  }
}
