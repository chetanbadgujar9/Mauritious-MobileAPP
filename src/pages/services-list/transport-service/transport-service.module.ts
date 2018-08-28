import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportServicePage } from './transport-service';

@NgModule({
  declarations: [
    TransportServicePage,
  ],
  imports: [
    IonicPageModule.forChild(TransportServicePage),
  ],
})
export class TransportServicePageModule {}
