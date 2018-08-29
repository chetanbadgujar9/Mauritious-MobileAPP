import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { TransportServicePage } from '../services-list/transport-service/transport-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginServiceProvider]
})
export class LoginPage {
  loginForm: FormGroup;
  errorFlag: boolean = false;
  errorMessage: any;
  fromMenu: any;
  model: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public _loginService: LoginServiceProvider) {
    this.fromMenu = this.navParams.get("text");
    this.loginForm = formBuilder.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onSubmitLogin({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.errorFlag = false;
      this.model = {
        'UserName': value.UserName,
        'Password': value.Password
      };
      this._loginService.getLoginUserDetails(this.model)
        .subscribe(
        (results: any) => {
          localStorage.setItem('UserDetails', JSON.stringify(results));
          this.getAuthToken(this.model);
        },
        error => {
          this.errorMessage = <any>error;
          //this._messageService.addMessage({ severity: 'error', summary: 'Error Message', detail: this.errorMessage });
        });
    } else {
      this.errorFlag = true;
    }
  }
  getAuthToken(model) {
    this.model = {
      'UserName': 'shailesh.sangekar',
      'Password': 'espl@123'
    };
    this._loginService.getAuthToken(this.model)
      .subscribe(
      (results: any) => {
        switch (this.fromMenu) {
          case 'transport': this.navCtrl.push(TransportServicePage);
            break;
          default: break;
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }
}
