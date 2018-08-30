import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesListPage } from './services-list';
import { TransportServicePageModule } from './transport-service/transport-service.module';
import { TransportServiceProvider } from '../../providers/transport-service/transport-service';

@NgModule({
  declarations: [
    ServicesListPage,
  ],
  imports: [
    TransportServicePageModule,
    IonicPageModule.forChild(ServicesListPage),
  ],
  providers: [TransportServiceProvider]
})
export class ServicesListPageModule { }
