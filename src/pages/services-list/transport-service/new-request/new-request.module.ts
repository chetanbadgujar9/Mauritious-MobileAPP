import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRequestPage } from './new-request';

@NgModule({
  declarations: [
    NewRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRequestPage),
  ],
})
export class NewRequestPageModule {}
