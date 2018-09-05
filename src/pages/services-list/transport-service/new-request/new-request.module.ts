import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRequestPage } from './new-request';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    NewRequestPage,
  ],
  imports: [
    RecaptchaModule.forRoot(),
    IonicPageModule.forChild(NewRequestPage),
  ],
})
export class NewRequestPageModule {}
