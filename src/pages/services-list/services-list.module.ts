import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesListPage } from './services-list';
import { TransportServicePageModule } from './transport-service/transport-service.module';

@NgModule({
  declarations: [
    ServicesListPage,
  ],
  imports: [
    TransportServicePageModule,
    IonicPageModule.forChild(ServicesListPage),
  ],
})
export class ServicesListPageModule {}
