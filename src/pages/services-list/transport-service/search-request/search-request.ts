import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportServiceProvider } from '../../../../providers/transport-service/transport-service';
import { NewRequestPage } from '../new-request/new-request';

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
  providers: [TransportServiceProvider]
})
export class SearchRequestPage {
  searchForm: FormGroup;
  errorFlag: boolean = false;
  showPrefix1: boolean = false;
  showPrefix2: boolean = false;
  prefix1Data: any = [];
  prefix2Data: any = [];
  errorMessage: any;
  searchedData: any = [];
  showGraterErr: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public _transportServiceProvider: TransportServiceProvider) {
    this.searchedData = [];
    this.setPrefix1();
    this.setPrefix2();
    this.searchForm = formBuilder.group({
      //Prefix:[''],
      Prefix1: [''],
      Prefix2: [''],
      FromNumber: ['', [Validators.required]],
      ToNumber: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchRequestPage');
  }
  setPrefix1() {
    this.prefix1Data = [{ 'Title': 'A' }, { 'Title': 'B' }, { 'Title': 'C' }, { 'Title': 'D' }, { 'Title': 'E' }, { 'Title': 'F' },
    { 'Title': 'G' }, { 'Title': 'H' }, { 'Title': 'I' }, { 'Title': 'J' }, { 'Title': 'K' }, { 'Title': 'L' }, { 'Title': 'M' }, { 'Title': 'N' }
      , { 'Title': 'O' }, { 'Title': 'P' }, { 'Title': 'Q' }, { 'Title': 'R' }, { 'Title': 'S' }, { 'Title': 'T' }, { 'Title': 'U' }, { 'Title': 'V' }, { 'Title': 'W' }
      , { 'Title': 'X' }, { 'Title': 'Y' }, { 'Title': 'Z' }];
  }
  setPrefix2() {
    this.prefix2Data = [{ 'Title': 'A' }, { 'Title': 'B' }, { 'Title': 'C' }, { 'Title': 'D' }, { 'Title': 'E' }, { 'Title': 'F' },
    { 'Title': 'G' }, { 'Title': 'H' }, { 'Title': 'I' }, { 'Title': 'J' }, { 'Title': 'K' }, { 'Title': 'L' }, { 'Title': 'M' }];
  }
  radioChecked(value) {
    console.log(value);
    if (value === 'A') {
      this.showPrefix1 = false;
      this.showPrefix2 = false;
      this.searchForm.controls['Prefix1'].setValue('');
      this.searchForm.controls['Prefix2'].setValue('');
    }
    if (value === 'A1') {
      this.showPrefix1 = true;
      this.showPrefix2 = false;
      this.searchForm.controls['Prefix1'].setValue('A');
      this.setPrefix1();
    }
    if (value === 'AA1') {
      this.showPrefix1 = true;
      this.showPrefix2 = true;
      this.searchForm.controls['Prefix1'].setValue('A');
      this.searchForm.controls['Prefix2'].setValue('A');
      this.setPrefix1();
      this.setPrefix2();
    }
    if (value === 'AAA1') {
      this.showPrefix1 = true;
      this.showPrefix2 = true;
      this.prefix1Data = [{ 'Title': 'F' },
      { 'Title': 'G' }, { 'Title': 'H' }, { 'Title': 'I' }, { 'Title': 'J' }, { 'Title': 'K' }, { 'Title': 'L' }, { 'Title': 'M' }, { 'Title': 'N' }
        , { 'Title': 'O' }, { 'Title': 'P' }, { 'Title': 'Q' }, { 'Title': 'R' }, { 'Title': 'S' }, { 'Title': 'T' }, { 'Title': 'U' }, { 'Title': 'V' }, { 'Title': 'W' }
        , { 'Title': 'X' }, { 'Title': 'Y' }, { 'Title': 'Z' }];
      this.prefix2Data = [{ 'Title': 'N' }
        , { 'Title': 'O' }, { 'Title': 'P' }, { 'Title': 'Q' }, { 'Title': 'R' }, { 'Title': 'S' }, { 'Title': 'T' }, { 'Title': 'U' }, { 'Title': 'V' }, { 'Title': 'W' }
        , { 'Title': 'X' }, { 'Title': 'Y' }, { 'Title': 'Z' }];
      this.searchForm.controls['Prefix1'].setValue('F');
      this.searchForm.controls['Prefix2'].setValue('N');
    }
  }
  onCancel() {
    this.navCtrl.pop();
  }
  onSubmitSearch({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      if (Number(value.ToNumber) > Number(value.FromNumber)) {
        this.showGraterErr = false;
        value.Prefix = value.Prefix1 + value.Prefix2;
        this.errorFlag = false;
        console.log(value);
        this._transportServiceProvider.getSearchedTransportService(value)
          .subscribe(
          (results: any) => {
            this.searchedData = results;
          },
          error => {
            this.errorMessage = <any>error;
            //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
          });
      } else {
        this.showGraterErr = true;
      }
    } else {
      this.errorFlag = true;
    }
  }
  onApply(searchText) {
    this.navCtrl.push(NewRequestPage, {
      'searchString': searchText
    })
  }
}
