import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    RecaptchaModule.forRoot(),
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [LoginServiceProvider]
})
export class LoginPageModule { }
