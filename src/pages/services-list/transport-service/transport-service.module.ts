import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransportServicePage } from './transport-service';
import { SearchRequestPageModule } from './search-request/search-request.module';

@NgModule({
  declarations: [
    TransportServicePage,
  ],
  imports: [
    SearchRequestPageModule,
    IonicPageModule.forChild(TransportServicePage),
  ],
})
export class TransportServicePageModule {}
