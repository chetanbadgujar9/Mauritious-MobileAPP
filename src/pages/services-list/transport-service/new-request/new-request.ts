import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportServiceProvider } from '../../../../providers/transport-service/transport-service';
import { ToasterServiceProvider } from '../../../../providers/toaster-service/toaster-service';
/**
 * Generated class for the NewRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-request',
  templateUrl: 'new-request.html',
  providers: [TransportServiceProvider]
})
export class NewRequestPage {
  errorMessage: any;
  availabilityMessage: any = '';
  mobnumPattern = "^[0-9]{8}$";
  phnnumPattern = "^[0-9]{6}$";
  addForm: FormGroup;
  errorFlag: boolean = false;
  disableFirstName: boolean = true;
  disableFamilyName: boolean = true;
  disableNIC: boolean = true;
  disableAddress: boolean = true;
  disableCity: boolean = true;
  disableCountry: boolean = true;
  disablePhn: boolean = true;
  disableMobile: boolean = true;
  showCompany: boolean = false;
  searchString: any = '';
  captchaPassed: boolean = false;
  captchaResponse: string;
  captchaErr: string = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public _transportServiceProvider: TransportServiceProvider,
    public _toasterService: ToasterServiceProvider,
    private zone: NgZone) {
    this.searchString = this.navParams.get('searchString') ? this.navParams.get('searchString') : '';
    this.addForm = formBuilder.group({
      ApplicantType: ['Individual Applicant', [Validators.required]],
      OnBehalf: ['No'],
      CompanyName: [''],
      RegisteredCoNumber: [''],
      FirstName: ['', [Validators.required]],
      FamilyName: ['', [Validators.required]],
      NIC: [''],
      Address: ['', [Validators.required]],
      City: [''],
      CountryOfResidence: ['', [Validators.required]],
      PhoneNumber: ['', Validators.pattern(this.phnnumPattern)],
      MobileNumber: ['', Validators.pattern(this.mobnumPattern)],
      RegistrationMark: ['', [Validators.required]],
      NYP: ['', [Validators.required]]
    });
    this.setFormDetails(this.addForm.controls['ApplicantType'].value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRequestPage');
  }
  captchaResolved(response: string): void {
    this.zone.run(() => {
      this.captchaPassed = true;
      this.captchaResponse = response;
      this.captchaErr = '';
    });
  }
  setFormDetails(val) {
    let userDetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.addForm.setValue({
      ApplicantType: val ? val : 'Individual Applicant',
      OnBehalf: 'No',
      CompanyName: '',
      RegisteredCoNumber: '',
      FirstName: userDetails ? userDetails.FirstName : '',
      FamilyName: userDetails ? userDetails.LastName : '',
      NIC: userDetails ? userDetails.NIC : '',
      Address: userDetails ? userDetails.Address : '',
      City: userDetails ? userDetails.City : '',
      CountryOfResidence: userDetails ? userDetails.CountryOfResidence : '',
      PhoneNumber: userDetails ? userDetails.PhoneNumber : '',
      MobileNumber: userDetails ? userDetails.MobileNumber : '',
      RegistrationMark: this.searchString,
      NYP: ''
    })
    this.disableFirstName = true;
    this.disableFamilyName = true;
    this.disableNIC = true;
    this.disableAddress = true;
    this.disableCity = true;
    this.disableCountry = true;
    this.disablePhn = true;
    this.disableMobile = true;
    if (this.searchString !== '') {
      this.availabilityMessage = 'Congrats! Selected Mark is available!';
    } else {
      this.availabilityMessage = '';
    }
    this.errorFlag = false;
    //this.addForm.controls['FirstName'].disable({ onlySelf: true });
  }
  onBehalfClick(value) {
    if (value === 'Yes') {
      //this.addForm.controls['FirstName'].enable({ onlySelf: true });
      this.disableFirstName = false;
      this.disableFamilyName = false;
      this.disableNIC = false;
      this.disableAddress = false;
      this.disableCity = false;
      this.disableCountry = false;
      this.disablePhn = false;
      this.disableMobile = false;
      this.addForm.controls['CompanyName'].setValue('');
      this.addForm.controls['RegisteredCoNumber'].setValue('');
      this.addForm.controls['FirstName'].setValue('');
      this.addForm.controls['FamilyName'].setValue('');
      this.addForm.controls['NIC'].setValue('');
      this.addForm.controls['Address'].setValue('');
      this.addForm.controls['City'].setValue('');
      this.addForm.controls['CountryOfResidence'].setValue('');
      this.addForm.controls['PhoneNumber'].setValue('');
      this.addForm.controls['MobileNumber'].setValue('');
      //this.addForm.controls['RegistrationMark'].setValue('');
      this.addForm.controls['NYP'].setValue('');
      //this.availabilityMessage = '';
      this.errorFlag = false;
      this.addForm.updateValueAndValidity();
    } else {
      this.setFormDetails(this.addForm.controls['ApplicantType'].value);
    }
  }
  onApplicationTypeClick(value) {
    if (value === 'Individual Applicant') {
      this.showCompany = false;
    } else {
      this.showCompany = true;
    }
  }
  checkAvailability() {
    if (this.addForm.controls['RegistrationMark'].value !== '') {
      this.availabilityMessage = '';
      this._transportServiceProvider.checkAvailability(this.addForm.controls['RegistrationMark'].value)
        .subscribe(
        (results: any) => {
          this.availabilityMessage = results.Message;
        },
        error => {
          this.errorMessage = <any>error;
          //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
        });
    } else {
      if (!this.errorFlag)
        this.availabilityMessage = 'Please enter registration mark'
    }
  }
  onSubmitSearch({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      if (this.availabilityMessage === 'Congrats! Selected Mark is available!') {
        if (this.captchaPassed) {
          this.captchaErr = '';
          console.log(value);
          this._transportServiceProvider.submitNewRequest(value)
            .subscribe(
            (results: any) => {
              this._toasterService.createToast('Data submitted successfully');
              this.navCtrl.pop();
            },
            error => {
              this.errorMessage = <any>error;
              //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
            });
        }
        else {
          this.captchaErr = 'Please select Captcha';
        }
      } else {
        this.availabilityMessage = 'Registration mark is not available. Please check availability';
      }
    } else {
      this.errorFlag = true;
      this.availabilityMessage = '';
    }
  }
  onCancel() {
    this.navCtrl.pop();
  }
  getClass() {
    if (this.availabilityMessage === 'Congrats! Selected Mark is available!') {
      return 'green';
    } else {
      return 'required';
    }
  }
}
